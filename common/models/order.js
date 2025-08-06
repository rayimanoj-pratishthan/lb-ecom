'use strict';

const disableAllExcept = function(model, methodsToExpose) {
  model.sharedClass.methods().forEach(method => {
    if (methodsToExpose.indexOf(method.name) < 0) {
      model.disableRemoteMethodByName(method.name, method.isStatic);
    }
  });
};

module.exports = function(Order) {
  disableAllExcept(Order, [
    'create',
    'find',
    'findById',
    'deleteById',
    'prototype.patchAttributes',
  ]);

  // Hook: Before saving an order
  Order.observe('before save', async function(ctx) {
    // Only act on creation
    if (!ctx.instance) return;

    const data = ctx.instance;
    const productId = data.productId;
    const orderQuantity = data.quantity;

    const Product = Order.app.models.Product;
    const product = await Product.findById(productId);

    if (!product) {
      const err = new Error(`Product with ID ${productId} not found`);
      err.statusCode = 400;
      throw err;
    }

    if (product.quantity < orderQuantity) {
      const err = new Error(`Not enough product in stock. Available: ${product.quantity}`);
      err.statusCode = 400;
      throw err;
    }

    product.quantity -= orderQuantity;
    await product.save();
  });
};
