CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_edited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  icon TEXT
);

INSERT INTO category (name, type, icon) VALUES ('Steam', 'Games', NULL);