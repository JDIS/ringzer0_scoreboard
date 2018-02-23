//Lets require/import the HTTP module
const DB = require('sqlite');
const express = require('express');
const app = express();
const parser = require('./parser.js');

const dbPath = './scoreboard.db';
//Lets define a port we want to listen to
const PORT=8000;

async function main() {
  const db = await DB.open(dbPath);

  app.use(express.static(__dirname + '/public'));

  app.get("/points", async (req, res) => {
    try {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      const records = await db.all(`SELECT
         rec_date, score, site.name as site_name, site.url, user.name, user.site_user_id
         FROM SCORE_RECORD
         JOIN SITE ON site.id=score_record.site_id
         JOIN USER ON user.id=score_record.user_id
         ORDER BY rec_date`);

      const out = records.reduce((res, record) => {
        const site = {};
        site[record.site_user_id] = {
          username: record.name,
          points:[
            {
              date: record.rec_date,
              points: record.score
            }
          ]
        };
        if(record.site_name in res
           && record.site_user_id in res[record.site_name])
          res[record.site_name][record.site_user_id].points.push(site[record.site_user_id].points[0]);
        else if(record.site_name in res)
          res[record.site_name][record.site_user_id] = site[record.site_user_id];
        else
          res[record.site_name] = site;
        return res;
      }, {});

      res.end(JSON.stringify(out));
    } catch (e) {
      console.log("YOUR CODE IS BAD >:(");
      console.log(e);
    }
  });

  app.listen(PORT, () => {
    console.log("Express listening on: http://localhost:%s", PORT);
  });
}

main();

parser.performForAllUsers(dbPath);
setTimeout(() => {
  parser.performForAllUsers(dbPath);
}, 1000 * 60 * 60 * 24);
