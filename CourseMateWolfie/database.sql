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
    percentage nvarchar(200),
    classroom nvarchar(50),
    professor nvarchar(100),
    memo nvarchar(500)
);

CREATE TABLE todo (
	user_id int,
	course nvarchar(30),
    task nvarchar(100),
    posted_date nvarchar(100),
    due_date nvarchar(100),
    memo varchar(500)
);

TRUNCATE TABLE users;
SELECT * FROM users;
SELECT * FROM online_user;
SELECT * FROM course_eval;