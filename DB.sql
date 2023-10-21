CREATE TABLE users (id serial PRIMARY KEY, username VARCHAR(50), password VARCHAR(200), address VARCHAR(200), groupid int);

CREATE TABLE group (id serial PRIMARY KEY, name VARCHAR(50));

INSERT INTO group VALUES (1, 'ADMIN');
INSERT INTO group VALUES (2, 'SECRET');
INSERT INTO group VALUES (3, 'STANDARD');