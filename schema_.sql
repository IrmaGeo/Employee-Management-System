DROP DATABASE IF EXISTS schemaDB;

CREATE DATABASE schemaDB;

USE schemaDB;

CREATE TABLE employee
(
    id int(10)
    AUTO_INCREMENT NOT NULL,
            first_name varchar
    (30) not null,
            last_name varchar
    (30) not null,
    role_id int
    (10) not null,
    
manager_id int
    (10) null,
            PRIMARY KEY
    (id)
    );


    CREATE TABLE role
    (
        id integer(10)
        AUTO_INCREMENT
NOT NULL,
    title varchar
        (30),
        salary decimal
        (10,2) null,
        department_id int
        (10) not null,
    PRIMARY KEY
        (id)
);
        CREATE TABLE department
        (
            id integer(10)
            AUTO_INCREMENT not null,
    name varchar
            (30),
   
    PRIMARY KEY
            (id)

);