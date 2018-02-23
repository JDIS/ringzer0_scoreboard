CREATE TABLE IF NOT EXISTS SITE(
  id  INTEGER,
  name  TEXT  NOT NULL,
  url  TEXT  NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS USER(
   id      INTEGER,
   site_id INT  NOT NULL,
   site_user_id INT  NOT NULL,
   name    TEXT  NOT NULL,
   FOREIGN KEY (site_id) REFERENCES SITE(id),
   PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS SCORE_RECORD(
  rec_date  DATE  NOT NULL,
  user_id   INT   NOT NULL,
  site_id   INT   NOT NULL,
  score     INT   NOT NULL,
  FOREIGN KEY (user_id) REFERENCES USER(id),
  FOREIGN KEY (site_id) REFERENCES SITE(id),
  PRIMARY KEY (rec_date, user_id, site_id)
);

INSERT INTO SITE (name, url)
VALUES
("ringzer0team", "https://ringzer0team.com/"),
("pwnable.tw", "https://pwnable.tw/");
