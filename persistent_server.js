var mysql = require('mysql');
var url = require('url');
var http = require('http');
var querystring = require('querystring');
var defaultCorsHeaders = require("./cors.js").defaultCorsHeaders;
var runNumber = 0;
var requestListener = function (request, response) {
  var parsedURL = url.parse(request.url, true);
  var statusCode = 200;
  var headers = defaultCorsHeaders();
  headers['Content-Type'] = "text/plain";
  // console.log("request "+request.method+"\nresponse "+ response);
  if (request.method === 'POST') {
    request.on('data', function(chunk) {
      var data = querystring.parse(chunk.toString());
      var query = 'INSERT into messages (username, message) values ("' + data.username + '", "' + data.message + '")';
      dbConnection.query(query, function(){
        response.writeHead(statusCode, headers);
        var userQuery = "SELECT userID FROM users WHERE username = " + data.username;
        dbConnection.query(query, function(err, results){
          response.end(JSON.stringify(results));
          dbConnection.end();          
        })
      });
    });
  }
  if (request.method === 'GET') {
    var query = 'SELECT * FROM messages';
    dbConnection.query(query, function(err, results, fields){
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(results));
      // dbConnection.end();
    });
  }
  console.log("You are done");
};

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});
var tablename = "messages";
var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(requestListener);

console.log("Listening on http://" + ip + ":" + port);
dbConnection.connect();
server.listen(port, ip);
/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */
