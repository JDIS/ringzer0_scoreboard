# Scoreboard Web UI

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
var db = new sqlite3.Database('/home/jon/Projects/ringzer0_scoreboard/ringzer0parser/scoreboard.sqlite');
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
