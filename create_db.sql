CREATE TABLE IF NOT EXISTS USER(
   user_id INT PRIMARY KEY     NOT NULL,
   name           TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS SCORE_RECORDS(
  rec_date  DATE  NOT NULL,
  user_id   INT   NOT NULL,
  points    INT   NOT NULL,
  FOREIGN KEY (user_id) REFERENCES USER(user_id),
  PRIMARY KEY (rec_date, user_id)
);

