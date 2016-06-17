//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');
var sqlite3 = require('sqlite3').verbose();
var dict = require("dict");
var async = require('async');
var fs = require('fs');
var express = require('express');
var app = express();

var db = new sqlite3.Database('../ringzer0parser/scoreboard.sqlite');


//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

app.use(express.static(__dirname + '/public'));

app.get("/points", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
   
    var users = []
    var output = {};
    var out = "";
     
    db.each("SELECT user_id, name FROM USER", (err, user) => {
      if(err)
        console.log("MANAGE YOU ERRORS!!!!")
     
      users.push(user);
      var points = [];
      output[user.user_id.toString()] = { username: user.name, points: [] };
    }, (err, nbRows) => {
      async.each(users, (user, callback) => {

        userOutput = output[user.user_id]['username'];
        out += userOutput;

        // retrieve points for current user
        db.each(`SELECT rec_date, user_id, points 
            FROM SCORE_RECORDS 
            WHERE user_id == ${user.user_id}
            ORDER BY rec_date`, (err, row) => {
          if(err)
            console.log("YOU STILL HAVE SOME ERRORS")
            
          // console.log(user);    
          output[user.user_id].points.push({ 
            date: row.rec_date,
            points: row.points
          });
        }, function(err, nbRows) {
          callback();
        });
      }, (err) => {
        if(err)
          console.log("PLZ")
     
        res.end(JSON.stringify(output));
      });
    });
});

//Create a server
// var server = http.createServer(handleRequest);

// //Lets start our server
// server.listen(PORT, function(){
//     //Callback triggered when server is successfully listening. Hurray!
//     console.log("Server listening on: http://localhost:%s", PORT);
// });

app.listen(PORT, function() {
    console.log("Express listening on: http://localhost:%s", PORT);
})