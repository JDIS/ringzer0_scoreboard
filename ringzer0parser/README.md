# Scoreboard DB and scraper script

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
sqlite> INSERT INTO USER (user_id, name) VALUES (453456, "jon");
```

## Scraper 

Running the parser.py will populate the database with the users in the USER table.

To run the parser.py script, you should run a cronjob at the desired time.

```
$ crontab -e
```

Add something like this at the bottom to run each night at 11h00 pm.

```
# m h dom mon dow command
0 23 * * * python /path/to/ringzer0_scoreboard/ringzer0parser/parser.py /path/to/scoreboard.db
```
