const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/item/*', { target: 'http://localhost:5000' }));
  app.use(proxy('/user/*', { target: 'http://localhost:5000' }));
  app.use(proxy('/images/*', { target: 'http://localhost:5000' }));
  app.use(proxy('/order/*', { target: 'http://localhost:5000' }));
};
