-- add departments
insert into department
    (name)
values
    ("Developers"),
    ("QA engineers"),
    ("Analysts"),
    ("Accounters");

-- add roles
insert into role
    (title, salary,department_id)
values
    ("QA tester", 3000, 2),
    ("Busitness Analys", 4000, 3),
    ("Accounter", "5000", 4);

-- "add employee";
insert into employee
    (first_name, last_name,role_id, manager_id)
values
    ("irma", "modzgvrishvili", 3, 2),
    ("nino", "Tabagari", 3, 3),
    ("lile", "giorgadze", 1, 1),
    ("sophio", "burjaliani", 2, 2),
    ("lile", "giorgadze", 1, 2);


-- view departments
    -- select *
    -- from department
-- view roles

-- select role.id, role.title, role.salary, department.name as Department
    -- from role inner join department on role.department_id=department.id

-- view employee
    -- select employee.id as ID, employee.first_name, employee.last_name, role.title as Role, role.salary, department.name as Department
    -- from employee inner join role on employee.role_id=role.id
    --     inner join department on role.department_id=department.id
-- view employee by manager
    -- select employee.id as ID, employee.first_name, employee.last_name, role.title as Role, role.salary, department.name as Department
    -- from employee inner join role on employee.role_id=role.id
    --     inner join department on role.department_id=department.id
    -- where employee.manager_id=?

-- View employees by role

    -- select employee.id as ID, employee.first_name, employee.last_name, role.title as Role, role.salary, department.name as Department
    -- from employee inner join role on employee.role_id=role.id
    --     inner join department on role.department_id=department.id
    -- where role.title=?

--  View employees by department
    -- select employee.id as ID, employee.first_name, employee.last_name, role.title as Role, role.salary, department.name as Department
    -- from employee inner join role on employee.role_id=role.id
    --     inner join department on role.department_id=department.id
    -- where department.name=?