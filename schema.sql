DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
 /* Describe your table here.*/
 messageID varchar(10),
 username varchar(30),
 receiveUser varchar(30),
 message text,
 messageWhen date,
 room varchar(20)
);

CREATE TABLE users (
 username varchar(30),
 userID varchar(10)
);

INSERT into messages (messageID, message) values
  ("abcd1234", "Hello."),
  ("abcd2345", "Goodbye."),
  ("abcd3456", "Whatever.");

INSERT INTO users (username, userID) values ("Valjean", "24601"), ("Javert", "sdef456"), ("Here", "ghi789");

SELECT * from messages where messageID LIKE "%abcd%";

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql   
 *  to create the database and the tables.*/