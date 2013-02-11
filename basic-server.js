/* Import node's http module: */
var http = require('http');
var url = require('url');
var defaultCorsHeaders = require("./lib/cors.js").defaultCorsHeaders;
// var handleRequest = require("./request-handler.js").handleRequest;

var requestListener = function (request, response) {
  var parsedURL = url.parse(request.url, true);
  var statusCode = 200;

  var headers = defaultCorsHeaders();
  headers['Content-Type'] = "text/plain";

  switch(parsedURL.pathname) {
    case "/" || "/index.html" || "/index.htm" :
      // Not implemented
      statusCode = 501;
      break;
    case "/classes/messages":

      if (request.method === 'GET') {
        headers['Content-Type'] = 'text/json';
        response.write(JSON.stringify(messageStorage));
      }

      if (request.method === 'POST') {
        request.on('data', function(chunk) {
          console.log(data);
        });
      }

      break;
    default:
      statusCode = 404;
  }

  response.writeHead(statusCode, headers);
  response.end('\n');
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(requestListener);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);