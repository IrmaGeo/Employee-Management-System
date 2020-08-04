DROP DATABASE IF EXISTS schema_;
CREATE DATABASE schema_;
USE schema_;

CREATE TABLE employ
(
    id int(10)
    auto_increment not null,
first_name varchar
    (30) not null,
last_name varchar
    (30) not null,
menejer_name varchar
    (30),
PRIMARY KEY
    (id)
-- FOREIGN KEY (role_id)references role.id,
-- FOREIGN KEY (manager_id)references department.menejer_name
);

    CREATE TABLE role
    (
        id int(10)
        auto_increment not null,
    title varchar
        (30),
        salary decimal
        (10,2) null
    PRIMARY KEY
        (id)
	-- FOREIGN KEY (department_id)references DEPARTMENT.id
);
        CREATE TABLE department
        (
            id int(10)
            auto_increment not null,
   name varchar
            (30),
   menejer_name varchar
            (30),
   PRIMARY KEY
            (id)

)

            select *
            from employ;
            select *
            from role;
            select *
            from department;