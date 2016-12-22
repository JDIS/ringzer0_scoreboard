# Ringzer0 Scoreboard

The purpose of this project is for tracking the number of points on www.ringzer0team.com 
for multiple users in order to instore friendly competition and encourage progress.

Since there is no available API, the points are scraped directly from the HTML (oh well, it works).
The points are stored in a sqlite3 database with the associated date and are displayed with a 
nodejs server serving a REST API and a HTML page.

## Scraper and Database

The code for scraping and building the database is in [ringzer0parser/](ringzer0parser/).

The code for the server and web UI is in [scoreboard/](scoreboard/).
