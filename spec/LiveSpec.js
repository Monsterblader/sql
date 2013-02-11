/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request");

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function() {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    /* TODO - You'll need to fill this out with your mysql username
     * and password. */
    dbConnection.connect();

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    var tablename = "messages"; // TODO fill this out

    // DANGER!  THIS IS ASYNC, BUT THERE'S NO GOOD WAY TO HANDLE.
    setTimeout(function(){
      dbConnection.query("DELETE FROM " + tablename);}, 0);
  });

  afterEach(function() {
    dbConnection.end();
  });
             
  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    var test = function(){
      request({method: "POST",
             uri: "http://127.0.0.1:8080/classes/room1",
             form: {username: "Valjean",
                    message: "In mercy's name, three days is all I need."}
            },
            function(error, response, body) {
              console.log(new Date().getMilliseconds());
              console.log(2);
              console.log(body);
              /* Now if we look in the database, we should find the
               * posted message there. */
              var queryString = "SELECT * FROM messages WHERE username = ?";
              var queryArgs = ["Valjean"];
               // TODO - The exact query string and query args to use
               // * here depend on the schema you design, so I'll leave
               // * them up to you. 
              dbConnection.query( queryString, queryArgs,
                function(err, results, fields) {
                  // Should have one result:
                  expect(results.length).toEqual(1);
                  expect(results[0].username).toEqual("Valjean");
                  expect(results[0].message).toEqual("In mercy's name, three days is all I need.");
                  /* TODO You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */
                  done();
                });
            });
    };
    setTimeout(test, 100);
  });

  // it("Should output all messages from the DB", function(done) {
  //   // Let's insert a message into the db
  //   var test2 = function() {
  //     var queryString = "INSERT into messages (username, message) values ('Javert', 'Men like you can never change!')";
  //     var queryArgs = []; //["Javert", "Men like you can never change!"];
  //     /* TODO - The exact query string and query args to use
  //      * here depend on the schema you design, so I'll leave
  //      * them up to you. */
  //     dbConnection.query( queryString, queryArgs,
  //       function(err, results, fields) {
  //          Now query the Node chat server and see if it returns
  //          * the message we just inserted: 
  //          // console.log("err "+err+"\nresults "+results+"\nfields"+fields);
  //         request("http://127.0.0.1:8080/classes/room1",
  //           function(error, response, body) {
  //             // console.log("You are here");
  //             console.log(body);
  //             var messageLog = JSON.parse(body);
  //             expect(messageLog[0].username).toEqual("Javert");
  //             expect(messageLog[0].message).toEqual("Men like you can never change!");
  //             done();
  //           });
  //       });      
  //   }
  //   setTimeout(test2, 1000);
  // });
});