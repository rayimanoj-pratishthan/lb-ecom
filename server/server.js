// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const swaggerUi = require('swagger-ui-express');
const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // Serve Swagger UI at /docs using swagger-ui-express
  const swaggerDocumentUrl = 'http://localhost:3000/explorer/swagger.json';

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, {
    swaggerUrl: swaggerDocumentUrl,
    explorer: true,
    customSiteTitle: "My LoopBack API Docs"
  }));

  if (require.main === module) app.start();
});
