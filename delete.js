const mysql = require("mysql");
const inquirer = require("inquirer");


var Delete = {

    deleteDepartment: (callback = () => { }) => {

        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });
        // choose department
        connection.query("select distinct(name) from department", function (err, res) {
            if (err) throw err
            let array = [];
            for (i = 0; i < res.length; i++) {
                array.push(res[i].name)

            }
            inquirer.prompt([
                {
                    type: "list",
                    message: "choose department",
                    name: "department",
                    choices: array
                }
            ]).then(function (answer) {
                // delete all employee in this department, delete all role under this department and delete department
                let sql = " delete e, r, d from department as d left join role as r on r.department_id = d.id left join employee as e on r.id = e.role_id where d.name =?";
                connection.query(sql, [answer.department], function (err, res) {
                    if (err) throw err
                    console.table("department deleted")
                    callback()
                    connection.end()
                })
            })
        })
    },


    deleteRole: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });
        // choose role
        connection.query("select distinct(title) from role", function (err, res) {
            if (err) throw err
            let array = [];
            for (i = 0; i < res.length; i++) {
                array.push(res[i].title)
            }
            inquirer.prompt([
                {
                    type: "list",
                    message: "choose role:",
                    name: "role",
                    choices: array
                }
            ]).then(function (answer) {
                // delete all employee under this role and delete role
                let sql = " delete e, r from role as r left join employee as e on r.id = e.role_id where r.title = ?";
                connection.query(sql, [answer.role], function (err, res) {
                    if (err) throw err
                    console.log("role deleted")
                    callback()
                    connection.end()
                })

            })
        })
    },

    deleteEmployee: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });
        // choose employee
        connection.query("select * from employee", function (err, res) {
            if (err) throw err
            let array = { name: [], id: [] };
            for (i = 0; i < res.length; i++) {
                let name = res[i].first_name + " " + res[i].last_name
                let id = res[i].id
                array.name.push(name)
                array.id.push(id)
            }
            inquirer.prompt([
                {
                    type: "list",
                    message: "choose employee:",
                    name: "employee",
                    choices: array.name
                }
            ]).then(function (answer) {
                //  get employee id
                let id;
                for (i = 0; i < array.name.length; i++) {
                    if (array.name[i] === answer.employee) {
                        id = array.id[i]
                    }
                }
                // delete employee
                let sql = "delete from employee where id=?"
                connection.query(sql, [id], function (err, res) {
                    if (err) throw err
                    console.log("employee is deleted")
                    callback()
                    connection.end()
                })
            })
        })
    }


}
module.exports = Delete