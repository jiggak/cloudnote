var http = require('http');
var httpProxy = require('http-proxy');
var serveStatic = require('serve-static');

var proxy = httpProxy.createProxyServer({});
var serve = serveStatic('../web', {'index': ['index.html']});

http.createServer(function(req, res) {
  if (req.url.indexOf('/webdav/') == 0) {
    req.headers.host = 'food.slashdev.ca';
    proxy.web(req, res, { target: 'http://food.slashdev.ca' });
  } else {
    serve(req, res, function (req, res) {
      // not found?
    });
  }
}).listen(8080);