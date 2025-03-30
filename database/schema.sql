CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_edited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  icon TEXT
);

CREATE TABLE password (
  id SERIAL PRIMARY KEY,
  categoryId INTEGER NOT NULL,
  usage TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_edited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES category(id)
);

INSERT INTO category (name, type, icon) VALUES ('Steam', 'Games', NULL);

INSERT INTO password (categoryId, usage, username, password) VALUES (10, 'Spotify', 'nehimomo', 'nehimomopassword');
INSERT INTO password (categoryId, usage, username, password) VALUES (10, 'chess.com', 'nehimomo', 'nehimomomo');
INSERT INTO password (categoryId, usage, username, password) VALUES (2, 'NAB', 'alexandereffendy', 'somuchmoney');

INSERT INTO password (categoryId, usage, username, password) VALUES (1, 'geoserver ', 'admin', 'adminpass_987');
INSERT INTO password (categoryId, usage, username, password) VALUES (1, 'bala website', 'demo_user', 'bowsuG-1mihhy-qymzup');
INSERT INTO password (categoryId, usage, username, password) VALUES (1, 'root', 'sudo su', 'alex');