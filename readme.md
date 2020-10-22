# Readme


- md5 password encryption
- user session, token, authentication


=============================================

## Create User Table
DROP TABLE `users`;
CREATE TABLE `users`(
 `user_id` int NOT NULL AUTO_INCREMENT,
 `username` varchar(32) NOT NULL,
 `password` varchar(32) NOT NULL,
 `name` varchar(128) NOT NULL,
 `phone` varchar(11) NULL,
 `address` varchar(512),
 PRIMARY KEY(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `users` ADD UNIQUE(`username`);

=============================================
