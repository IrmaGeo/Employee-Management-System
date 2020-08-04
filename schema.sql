DROP DATABASE IF EXISTS schema_;
CREATE DATABASE schema_;
USE schema_

CREATE TABLE employee(
id int AI
first_name varchar(30),
last_name varchar(30),
PRIMARY KEY id,
FOREIGN KEY role_id, menejer_id

)

CREATE TABLE role(
    id int AI,
    title varchar(30)
    salary decimal
    FOREIGN key department_id,
    PRIMARY key id

)
CREATE TABLE department(
   id int AI,
   name varchar(30),
   PRIMARY key id

)