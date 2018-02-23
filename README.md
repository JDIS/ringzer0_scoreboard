# Ringzer0 Scoreboard

The purpose of this project is for tracking the number of points on www.ringzer0team.com 
for multiple users in order to instore friendly competition and encourage progress.

Since there is no available API, the points are scraped directly from the HTML (oh well, it works).
The points are stored in a sqlite3 database with the associated date and are displayed with a 
nodejs server serving a REST API and a HTML page.

## DB setup

Create the database using sqlite3.

```
sqlite3 scoreboard.db < create_db.sql
```


You have to enter each user manually like a sad human being.
For example, to add jon, navigate to this jon person profile, i.e: `https://ringzer0team.com/profile/453456/jon`

The user will be:

```sql
$ sqlite3 scoreboard.db
sqlite> SELECT * from SITE;
1|ringzer0team|https://ringzer0team.com/
2|pwnable.tw|https://pwnable.tw/
sqlite> INSERT INTO USER (site_id, site_user_id, name) VALUES (1, 453456, "jon");
```

### DB Backup

Restore a db backup, i.e:

```
sqlite3 scoreboard.db < backup/scoreboard-2016-06-17.sql
```

## Web UI

To start the server,

Make sure you have the required dependencies:

```
npm install
```

Run the server:

```
node scoreboard.js
```

The server connects to the db with a hardcoded string (how inconvenient, we should do something about this).
You will want to change this path to point to your scoreboard.db.

```js
var db = new sqlite3.Database('/home/jon/Projects/ringzer0_scoreboard/ringzer0parser/scoreboard.db');
```

The server will be hosted on `port 8000` by default (maybe it should be a program argument):

```
const PORT=8000;
```

The server then serves the pages in `public/`; the scoreboard page.

This page retrieves, in JSON, the points for all users at `points/`, i.e:

```json
{
	"2361": {
		"username": "carapas",
		"points": [{
			"date": "2016-06-17",
			"points": 191
		}]
	}
}
```
