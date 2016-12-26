"use strict";
const cheerio = require('cheerio');
const rp = require('request-promise');
const DB = require('sqlite');

function getAllUsers(db) {
  return db.all("SELECT user_id, name FROM USER");
}

function fetch({user_id, name}) {
  return rp({
    uri: `https://ringzer0team.com/profile/${user_id}/${name}`,
    transform: (body) => {
      return cheerio.load(body);
    }
  });
}

function parse(body) {
  return body(".points").first().text();
}

function save(db, userId) {
  return (score) =>
    db.run('INSERT INTO score_records VALUES($date, $userId, $score)', {
      $date: Date.now(),
      $userId: userId,
      $score: score
    });
}

function performForAllUsers(dbPath) {
  DB.open(dbPath)
    .then(db =>
          getAllUsers(db)
          .then(users =>
                Promise.all(users.map(
                  user => Promise.resolve(user)
                    .then(fetch)
                    .then(parse)
                    .then(save(db, user.user_id))
                ))
               )
         ).catch(err => console.error(err));
}

module.exports.performForAllUsers = performForAllUsers;
