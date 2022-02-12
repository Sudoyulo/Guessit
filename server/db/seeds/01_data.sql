INSERT INTO avatars (avatar_url) VALUES ('/Users/brenonparry/Desktop/avatars/user-astronaut-solid.svg');
INSERT INTO avatars (avatar_url) VALUES ('/Users/brenonparry/Desktop/avatars/user-ninja-solid.svg');
INSERT INTO avatars (avatar_url) VALUES ('/Users/brenonparry/Desktop/avatars/user-tie-solid.svg');
-- insert into table. initial data like games and players
INSERT INTO users (avatar_id, date_started, player_id) VALUES (1, '2022-01-01 00:00:00', 'x7d3k6');
INSERT INTO users (avatar_id, date_started, player_id) VALUES (2, '2022-01-01 00:00:00', 'h6m2b5');
INSERT INTO users (avatar_id, date_started, player_id) VALUES (3, '2022-01-01 00:00:00', 'j7m3d6');


INSERT INTO games (solution) VALUES ('adore');
INSERT INTO games (solution) VALUES ('honor');
INSERT INTO games (solution) VALUES ('metal');

INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (1, 1, 4, '2022-01-01 01:10:45', '2022-01-01 01:25:45');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (2, 1, 3, '2022-01-01 01:20:23', '2022-01-01 01:45:15');
INSERT INTO user_game (user_id, game_id, turns_taken, completed_on, started_on) VALUES (3, 1, 4, '2022-01-01 01:11:55', '2022-01-01 01:30:35');

