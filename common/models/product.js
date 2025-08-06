'use strict';

const disableAllExcept = function(model, methodsToExpose) {
  model.sharedClass.methods().forEach(method => {
    if (methodsToExpose.indexOf(method.name) < 0) {
      model.disableRemoteMethodByName(method.name, method.isStatic);
    }
  });
};

module.exports = function(Product) {
  disableAllExcept(Product, [
    'create',
    'find',
    'findById',
    'deleteById',
    'prototype.patchAttributes',
  ]);
};
