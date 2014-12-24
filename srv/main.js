var http = require('http');
var httpProxy = require('http-proxy');
var finalhandler = require('finalhandler')
var serveStatic = require('serve-static');

var proxy = httpProxy.createProxyServer({});
var serve = serveStatic('../build');

http.createServer(function(req, res) {
  if (req.url.indexOf('/webdav/') == 0) {
    req.headers.host = 'food.slashdev.ca';
    proxy.web(req, res, { target: 'http://food.slashdev.ca' });
  } else {
    serve(req, res, finalhandler(req, res));
  }
}).listen(8080);