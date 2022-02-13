-- drop table if exists
DROP TABLE IF EXISTS avatars CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS user_game CASCADE;

-- create tables
CREATE TABLE avatars (
  id SERIAL PRIMARY KEY NOT NULL,
  avatar_url VARCHAR(255)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  initials VARCHAR(255),
  avatar_id INTEGER REFERENCES avatars(id) ON DELETE CASCADE,
  date_started TIMESTAMP,
  player_id VARCHAR(255)
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  solution VARCHAR(255)
);

CREATE TABLE user_game (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  turns_taken INTEGER,
  completed_on TIMESTAMP,
  started_on TIMESTAMP
);
