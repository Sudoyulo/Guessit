INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/albatross--v3.png');
INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/spider.png');
INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/cow--v2.png');
INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/dog--v3.png');
INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/crab--v1.png');

INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/starfish--v1.png');
INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/bear.png');
INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/jellyfish--v2.png');
INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/cat--v4.png');
INSERT INTO avatars (avatar_url) VALUES ('https://img.icons8.com/cotton/344/owl--v2.png');

-- insert into table. initial data like games and players
INSERT INTO users (initials, avatar_id, date_started, player_id) VALUES ('MGS', 1, '2022-01-01 00:00:00', 'x7d3k6');
INSERT INTO users (initials, avatar_id, date_started, player_id) VALUES ('DCS', 2, '2022-01-02 00:00:00', 'h6m2b5');
INSERT INTO users (initials, avatar_id, date_started, player_id) VALUES ('PBH', 3, '2022-01-03 00:00:00', 'j7m3d6');
INSERT INTO users (initials, avatar_id, date_started, player_id) VALUES ('LHL', 1, '2022-01-03 00:00:00', 'fourth');
INSERT INTO users (initials, avatar_id, date_started, player_id) VALUES ('LHL', 1, '2022-01-03 00:00:00', 'fiveth');

INSERT INTO games (solution) VALUES ('LIGHT');
INSERT INTO games (solution) VALUES ('ADORE');
INSERT INTO games (solution) VALUES ('HONOR');
INSERT INTO games (solution) VALUES ('METAL');
INSERT INTO games (solution) VALUES ('DRESS');

INSERT INTO games (solution) VALUES ('WATER');
INSERT INTO games (solution) VALUES ('JOUST');
INSERT INTO games (solution) VALUES ('CREAM');
INSERT INTO games (solution) VALUES ('PAPER');
INSERT INTO games (solution) VALUES ('BOARD');

INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (1, 1, 4, '2022-01-01 01:30:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (1, 2, 2, '2022-01-01 01:30:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (1, 3, 6, '2022-01-01 01:30:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, started_on) VALUES (1, 4, '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (1, 5, 5, '2022-01-01 01:30:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (1, 6, 5, '2022-01-01 01:30:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, started_on) VALUES (1, 7, '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, started_on) VALUES (1, 8, '2022-01-01 01:25:45');

INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (2, 2, 3, '2022-01-01 01:50:23', '2022-01-01 01:45:15');
INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (2, 4, 3, '2022-01-01 01:50:23', '2022-01-01 01:45:15');
INSERT INTO user_game (user_id, game_id, started_on) VALUES (2, 5, '2022-01-01 01:45:15');

INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (3, 1, 4, '2022-01-01 01:35:55', '2022-01-01 01:30:35');
INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (3, 2, 6, '2022-01-01 01:35:55', '2022-01-01 01:30:35');
INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES (3, 3, 1, '2022-01-01 01:35:55', '2022-01-01 01:30:35');
INSERT INTO user_game (user_id, game_id, started_on) VALUES (3, 4, '2022-01-01 01:30:35');
INSERT INTO user_game (user_id, game_id, started_on) VALUES (3, 5, '2022-01-01 01:30:35');

INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (1, 'HOUSE', '12:00');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (1, 'LAKES', '12:05');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (1, 'ABBEY', '12:10');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (1, 'LIGHT', '12:15');

INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (2, 'HOUSE', '12:00');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (2, 'LIGHT', '12:05');

INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (3, 'HOUSE', '12:00');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (3, 'LAKES', '12:05');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (3, 'ABBEY', '12:10');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (3, 'SEVEN', '12:15');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (3, 'EIGHT', '12:20');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (3, 'LIGHT', '12:25');

INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (4, 'LAKES', '12:00');

INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (5, 'LAKES', '12:05');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (5, 'ABBEY', '12:10');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (5, 'SEVEN', '12:15');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (5, 'EIGHT', '12:20');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (5, 'LIGHT', '12:25');

INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (6, 'LAKES', '12:00');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (6, 'ABBEY', '12:05');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (6, 'SEVEN', '12:10');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (6, 'EIGHT', '12:15');
INSERT INTO guesses (user_game_id, guess, guessTimestamp ) VALUES (6, 'LIGHT', '12:20');

INSERT INTO follows (i_am, you_are) VALUES (1,2); --1,2
INSERT INTO follows (i_am, you_are) VALUES (1,3); --1,3
INSERT INTO follows (i_am, you_are) VALUES (2,1); --2,1
INSERT INTO follows (i_am, you_are) VALUES (3,1); --3,1

INSERT INTO user_game (user_id, game_id, started_on) VALUES (4, 1, '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, started_on) VALUES (5, 1, '2022-01-01 01:25:45');