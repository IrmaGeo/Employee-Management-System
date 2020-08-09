const mysql = require("mysql");
const inquirer = require("inquirer");



var add = {

    addDepartment: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });
        inquirer.prompt([
            {
                // prompt questions
                type: "input",
                message: "put departments name",
                name: "department"

            }
        ]).then(function (answer) {

            var sql = "insert into department (name) values ?"
            var values = [[answer.department]]
            // insert department
            connection.query(sql, [values], function (err, res) {
                if (err) throw err
                // getTable("department")
                console.log("Department edded")
                callback()
                connection.end()
            })
        })
    },

    addRole: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });
        // prompt questions from role table and choose department
        // title, salary, department_id)
        connection.query("select distinct(name) from department", function (err, res) {
            if (err) throw err;
            let array = [];
            for (i = 0; i < res.length; i++) {
                array.push(res[i].name)
            }
            inquirer.prompt([
                {
                    // prompt questions
                    type: "input",
                    message: "put role title",
                    name: "title"

                },
                {
                    type: "input",
                    message: "put salary",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "what is Department's name?",
                    name: "name",
                    choices: array
                }]).then(function (answer) {
                    // insert role
                    connection.query("select id from department where?", { name: answer.name }, function (err, res) {
                        if (err) throw err
                        let depID = res[0].id
                        let sql = "insert into role (title, salary,department_id) values ?"
                        var values = [[answer.title, answer.salary, depID]]
                        // insert department
                        connection.query(sql, [values], function (err, res) {
                            if (err) throw err
                            // getTable("role")
                            console.log("Role edded")
                            callback()
                            connection.end()


                        }
                        )

                    }
                    )

                })

        })
    },

    addEmployee: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });
        // prompt questions, choose role

        connection.query("select distinct(title) from role", function (err, res) {
            if (err) throw err;
            let array = [];
            for (i = 0; i < res.length; i++) {
                array.push(res[i].title)
            }
            inquirer.prompt([
                {
                    // prompt questions
                    type: "input",
                    message: "put employee's first name",
                    name: "first_name"

                },
                {
                    type: "input",
                    message: "put employee's last name",
                    name: "last_name"
                },
                {
                    type: "list",
                    message: "chooose role for employee:",
                    name: "name",
                    choices: array
                }]).then(function (answer) {
                    // insert employee
                    connection.query("select id from role where?", { title: answer.name }, function (err, res) {
                        if (err) throw err
                        let roleID = res[0].id
                        let sql = "insert into employee (first_name, last_name,role_id, manager_id) values ?"
                        var values = [[answer.first_name, answer.last_name, roleID, null]]
                        // insert department
                        connection.query(sql, [values], function (err, res) {
                            if (err) throw err
                            console.log("employee edded")
                            callback()
                            connection.end()

                        }
                        )

                    }
                    )
                })

        })
    }

}


module.exports = add