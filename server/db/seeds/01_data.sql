INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977402.png?token=exp=1644783297~hmac=cb81c293070c515da2bbe9a4c6d561b1');
INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977359.png?token=exp=1644783300~hmac=531b2a25ac3fe2e562d405340e554f36');
INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977384.png?token=exp=1644783404~hmac=9c1d3dd712d9db1bbd23a5a49bd8c4bc');
INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977318.png?token=exp=1644783429~hmac=4bd70c84ff52f80d6b32dfef0fac59ce');
INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977333.png?token=exp=1644783464~hmac=2a65c8a15b3509a4fe07f5092803dd8f');

INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977380.png?token=exp=1644783480~hmac=d8ab8e1edc660c4195dd89e2b34cb0ef');
INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977311.png?token=exp=1644783493~hmac=fe8a3f41aaba396a0f8b396dd7fff109');
INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977392.png?token=exp=1644783533~hmac=f9a4a044eacb52aa8712783cb714d30e');
INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977351.png?token=exp=1644783545~hmac=8cf6862219c7906c8de863f16db8ec05');
INSERT INTO avatars (avatar_url) VALUES ('https://cdn-icons.flaticon.com/png/512/2977/premium/2977361.png?token=exp=1644783533~hmac=62a0eea150dc51dcd47f918fc1a486ae');

-- insert into table. initial data like games and players
INSERT INTO users (initials, avatar_id, date_started, player_id) VALUES ('MGS', 1, '2022-01-01 00:00:00', 'x7d3k6');
INSERT INTO users (initials, avatar_id, date_started, player_id) VALUES ('DCS', 2, '2022-01-02 00:00:00', 'h6m2b5');
INSERT INTO users (initials, avatar_id, date_started, player_id) VALUES ('PBH', 3, '2022-01-03 00:00:00', 'j7m3d6');

INSERT INTO games (solution) VALUES ('LIGHT');
INSERT INTO games (solution) VALUES ('ADORE');
INSERT INTO games (solution) VALUES ('HONOR');
INSERT INTO games (solution) VALUES ('METAL');
INSERT INTO games (solution) VALUES ('STEPS');

INSERT INTO games (solution) VALUES ('WATER');
INSERT INTO games (solution) VALUES ('JOUST');
INSERT INTO games (solution) VALUES ('CREAM');
INSERT INTO games (solution) VALUES ('PAPER');
INSERT INTO games (solution) VALUES ('BOARD');

INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (1, 1, 4, '2022-01-01 01:10:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (1, 2, 2, '2022-01-01 01:10:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (1, 3, 6, '2022-01-01 01:10:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (1, 4, 6, '2022-01-01 01:10:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (1, 5, 5, '2022-01-01 01:10:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (1, 6, 5, '2022-01-01 01:10:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (1, 7, 5, '2022-01-01 01:10:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (1, 8, 7, '2022-01-01 01:10:45', '2022-01-01 01:25:45');

INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (2, 2, 3, '2022-01-01 01:20:23', '2022-01-01 01:45:15');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (2, 4, 3, '2022-01-01 01:20:23', '2022-01-01 01:45:15');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (2, 5, 4, '2022-01-01 01:20:23', '2022-01-01 01:45:15');

INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (3, 1, 4, '2022-01-01 01:11:55', '2022-01-01 01:30:35');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (3, 2, 6, '2022-01-01 01:11:55', '2022-01-01 01:30:35');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (3, 3, 1, '2022-01-01 01:11:55', '2022-01-01 01:30:35');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (3, 4, 7, '2022-01-01 01:11:55', '2022-01-01 01:30:35');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (3, 5, 7, '2022-01-01 01:11:55', '2022-01-01 01:30:35');