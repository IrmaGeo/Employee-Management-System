const mysql = require("mysql");
const inquirer = require("inquirer");



var update = {
    updateRole: (callback = () => { }) => {
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
                        userId = array.id[i]
                    }
                }
                // choose role and update employee role
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
                        // get role id
                        connection.query("select id from role where?", { title: answer.role }, function (err, res) {
                            if (err) throw err
                            let roleId = res[0].id

                            // update role
                            connection.query("update employee set? where?", [{ role_id: roleId }, { id: userId }], function (err, res) {
                                if (err) throw err
                                console.log("role updated")
                                callback()
                                connection.end()
                            })
                        })
                    })
                })

            })
        })
    },


    updateManager: (callback = () => { }) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Ididit2@20",
            database: "schemaDB"
        });
        // choose employe with first and last name and get id.
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
                        employeeId = array.id[i]
                    }
                }
                //    choose manager name 
                connection.query("select distinct(employee.id), employee.first_name, employee.last_name  from employee inner join role on role.id=employee.role_id where role.title=?", "manager", function (err, res) {
                    if (err) throw err
                    let manager = { name: [], id: [] };
                    for (i = 0; i < res.length; i++) {
                        manager.name.push(res[i].first_name + " " + res[i].last_name)
                        manager.id.push(res[i].id)
                    }
                    inquirer.prompt([
                        {
                            type: "list",
                            message: "choose role:",
                            name: "manager",
                            choices: manager.name
                        }
                    ]).then(function (answer) {
                        let id;
                        for (i = 0; i < manager.name.length; i++) {
                            if (manager.name[i] === answer.manager) {
                                managerId = manager.id[i]
                            }
                        }
                        // update maneger_name in employee table
                        connection.query("update employee set? where?", [{ manager_id: managerId }, { id: employeeId }], function (err, res) {
                            if (err) throw err
                            console.log("manager updated")
                            callback()
                            connection.end()
                        })
                    })
                })
            })

        })



    }




}

module.exports = update