"use strict";
const cheerio = require('cheerio');
const rp = require('request-promise');
const DB = require('sqlite');
const ringzero = require('./ringzero');
const pwnable = require('./pwnable');

const sites = [ {}, ringzero, pwnable ];

function getAllUsers(db) {
  return db.all("SELECT id, site_id, site_user_id, name FROM USER");
}

function save(db, user, date) {
  return (score) =>
    db.run('INSERT INTO score_record VALUES($date, $userId, $siteId, $score)', {
      $date: date,
      $userId: user.id,
      $siteId: user.site_id,
      $score: score
    });
}

function performForAllUsers(dbPath) {
  const date = Date.now();
  DB.open(dbPath)
    .then(db =>
          getAllUsers(db)
          .then(users =>
                Promise.all(users.map(
                  user => Promise.resolve(user)
                    .then(sites[user.site_id].fetch)
                    .then(sites[user.site_id].parse)
                    .then(save(db, user, date))
                ))
              )
         ).catch(err => console.error(err));
}

module.exports.performForAllUsers = performForAllUsers;
