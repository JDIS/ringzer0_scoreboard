//Lets require/import the HTTP module
var sqlite3 = require('sqlite3').verbose();
var async = require('async');
var express = require('express');
var app = express();

const db = new sqlite3.Database('../ringzer0parser/scoreboard.sqlite');

//Lets define a port we want to listen to
const PORT=8000;

app.use(express.static(__dirname + '/public'));

app.get("/points", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  const users = [];
  const output = {};
  let out = "";

  db.each("SELECT user_id, name FROM USER", (err, user) => {
    if(err)
      console.log("MANAGE YOU ERRORS!!!!");

    users.push(user);
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
                console.log("YOU STILL HAVE SOME ERRORS");

              output[user.user_id].points.push({
                date: row.rec_date,
                points: row.points
              });
            }, (err, nbRows) => {
              callback();
            });
    }, (err) => {
      if(err)
        console.log("PLZ");

      res.end(JSON.stringify(output));
    });
  });
});

app.listen(PORT, () => {
  console.log("Express listening on: http://localhost:%s", PORT);
});
