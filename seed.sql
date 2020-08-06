use schemaDB;
-- "add department"
insert into department
    (name,
    manager_name)
values
    ("analitics", "sophio"),
    ("sales", "sophio"),
    ("accounting", "nana"),
    ("developers", "nana");

-- "add role"
insert into role
    (title, salary,department_id)
values
    ("QA tester", 3000, 1),
    ("analysts", 4000, 2),
    ("accounter", "5000", 1);
-- "add employee";
insert into employee
    (first_name, last_name,manager_name, role_name)
values
    ("irma", "modzgvrishvili", "sophio", "tester"),
    ("nino", "Tabagari", "sophio", "QA tester"),
    ("lile", "giorgadze", "nana", "accounter");



-- --  "Update employee roles",
-- update employee set role_id=? where id=?

-- -- "Update employee managers",
-- update employee set meneger_id=? where id=?
-- -- "View employees by manager",
-- select *
-- from employee
-- where meneger_id=?

-- -- "Delete departments",
-- delete department where id=?
-- -- "Delete roles",
-- delete role where id=?

-- -- "Delete employees",
-- delete employee where id=?

