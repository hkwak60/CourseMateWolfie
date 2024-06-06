CREATE DATABASE project;
USE project;

CREATE TABLE users (
	user_name nvarchar(100),
    user_password nvarchar(100)
);

CREATE TABLE online_user (
	user_id int,
    user_name nvarchar(100),
    user_password nvarchar(100)
);

CREATE TABLE course_eval (
	user_id int,
	course nvarchar(30),
    item nvarchar(200),
    average nvarchar(200),
    denom nvarchar(200),
    percentage varchar(200),
    classroom varchar(10),
    professor varchar(50),
    memo varchar(255)
);

TRUNCATE TABLE users;
SELECT * FROM users;
SELECT * FROM online_user;
SELECT * FROM course_eval;