import bs4
import requests
import datetime
import dataset

def innerHTML(element):
    return element.decode_contents(formatter=None)

db = dataset.connect('sqlite:///scoreboard.sqlite')
for user in db['user']:
	user_id = user['user_id']		
	profile_url = 'https://ringzer0team.com/profile/' + str(user_id) + '/' + user['name']
	print("Profile: " + profile_url)

	soup = bs4.BeautifulSoup(requests.get(profile_url).text, "lxml")
	points = innerHTML(soup.select(".points")[0])
	print("Points : " + points)

	score_table = db['score_records']
	score_table.insert(dict(rec_date=datetime.date.today(), user_id=user_id, points=int(float(points))))
