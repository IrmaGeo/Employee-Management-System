
-- "add department"
insert into department
    (name, menejer_id)
values
    ("analitics", "1"),
    ("sales", 2),
    ("accounting", 1),
    ("developers", 2);

-- "add role"
insert into role
    (title, salary,department_id)
values
    ("QA tester", 3000, 1),
    ("analysts", 4000, 2),
    ("accounter", "5000", 1);
-- "add employee";
insert into employee
    (first_name, last_name,manager_id)
values
    ("irma", "modzgvrishvili", 1),
    ("nino", "Tabagari", 2),
    ("lile", "giorgadze", 1);



-- "view employees",

select employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, department.id, department.name

from employee
    inner join role on employee.role_id=role.id
    inner join department on role.departmen_id =department.id

-- "view roles",
select *
from role

--  "Update employee roles",
update employee set role_id=? where id=?

-- "Update employee managers",
update employee set meneger_id=? where id=?
-- "View employees by manager",
select *
from employee
where meneger_id=?

-- "Delete departments",
delete department where id=?
-- "Delete roles",
delete role where id=?

-- "Delete employees",
delete employee where id=?

-- "View the total utilized budget of a department"
select sum(salary)
from department inner join role on id=department_id
where id=?