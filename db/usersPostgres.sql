DROP DATABASE IF EXISTS userlist2;
CREATE DATABASE userlist2;

\c userlist2;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR,
  UNIQUE(username)
);

  -- UNIQUE(username), IS A LIFE SAVER.... smh


INSERT INTO users (username, password_digest)
  VALUES ('James1', 'password'), ('James2', 'password1'), ('James3', 'password2');
