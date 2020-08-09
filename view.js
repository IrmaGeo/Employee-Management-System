const mysql = require("mysql");
const inquirer = require("inquirer");

var view = {
    getEmployeeByRole: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });

        connection.query("select distinct(title) from role", function (err, res) {
            if (err) throw err;
            let array = [];
            for (i = 0; i < res.length; i++) {
                array.push(res[i].title)
            }
            inquirer.prompt({
                type: "list",
                message: "choose role's name:",
                name: "role",
                choices: array
            }).then(function (answer) {
                var select = "select employee.id as ID, employee.first_name, employee.last_name, role.title as Role, role.salary, department.name as Department from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id where ?"
                connection.query(select, [{ "role.title": answer.role }], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    callback()
                    connection.end()
                });
            })

        })
    },
    getTotalbudget: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });

        var select = "select department.name,sum(salary) as budget from department inner join role on role.department_id = department.id group by department.id"
        connection.query(select, function (err, res) {
            if (err) throw err;
            console.table(res);
            callback()
            connection.end()
        });

    },
    getEmployeeByDepartment: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });
        //choose department
        connection.query("select distinct(name) from department", function (err, res) {
            if (err) throw err;
            let array = [];
            for (i = 0; i < res.length; i++) {
                array.push(res[i].name)
            }
            inquirer.prompt({
                type: "list",
                message: "what is Department's name?",
                name: "department",
                choices: array
            }).then(function (answer) {
                // get employee by department
                var select = "select employee.id, employee.first_name, employee.last_name, role.title as Role, role.salary, department.name as Department from employee left join role on employee.role_id=role.id left join department on department.id = role.department_id where ?"
                connection.query(select, [{ "department.name": answer.department }], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    callback()
                    connection.end()
                });

            })

        })
    },
    department: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });

        var select = "select * from department"
        connection.query(select, function (err, res) {
            if (err) throw err;
            console.table(res);
            callback()
            connection.end()
        });
    },

    role: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });

        var select = "select role.id, role.title, role.salary, department.name as Department from role left join department on role.department_id=department.id"
        connection.query(select, function (err, res) {
            if (err) throw err;
            console.table(res);
            callback()
            connection.end()
        });
    },
    employee: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });

        var select = "select employee.id, employee.first_name as FirstName, employee.last_name as LastName, employee.manager_id as Manager, role.title, role.salary, department.name as Department from  employee left join role  on employee.role_id=role.id left join department on role.department_id=department.id"
        connection.query(select, function (err, res) {
            if (err) throw err;
            console.table(res);
            callback()
            connection.end()
        });
    },




}
module.exports = view