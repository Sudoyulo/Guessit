-- drop table if exists
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS user_game CASCADE;
DROP TABLE IF EXISTS avatars CASCADE;

-- create tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  avatar_id INTEGER REFERENCES avatars(id),
  date_started DATETIME,
  player_id VARCHAR(255)
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  solution VARCHAR(255)
);

CREATE TABLE user_game (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  game_id INTEGER REFERENCES games(id),
  turns_taken INTEGER,
  completed_on: DATETIME,
  started_on: DATETIME,
);

CREATE TABLE avatars (
  id SERIAL PRIMARY KEY NOT NULL,
  avatar_url VARCHAR(255)
);