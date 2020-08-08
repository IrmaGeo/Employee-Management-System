// Build a command - line application that at a minimum allows the user to:

var mysql = require("mysql");
var inquirer = require("inquirer");
var request = "";


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ididit2@20",
    database: "schemaDB"
});


connection.connect(function (err) {
    if (err) throw err
    console.log("there is problem" + connection.threadId)
    QuestionsPrompt()
});

function QuestionsPrompt() {
    inquirer.prompt({
        type: "list",
        message: "what kind of operation would you like to choosen?",
        name: "todo",
        choices:

            [
                "view departments",
                "view employees",
                "view roles",
                "View employees by role",
                "View employees by department",
                "View the total utilized budget of a department",
                "Update employee roles",
                "Update employee managers",
                "add department",
                "add role",
                "add employee",
                "Delete departments",
                "Delete roles",
                "Delete employees",
                "Exit"
            ]

    }).then(function (answer) {
        switch (answer.todo) {
            case "view departments":
                request = "department";
                getTable(request);
                break;

            case "view employees":
                request = "employee";
                getTable(request);
                break;
            case "view roles":
                request = "role";
                getTable(request);
                break;
            case "View employees by role":
                getEmployeeByRole()
                break;
            case "View employees by department":
                getEmployeeByDepartment()
                break;
            case "View the total utilized budget of a department":
                getTotalbudget()
                break;
            case "Update employee roles":
                updateRole()
                break;
            case "Update employee managers":
                updateManager()
                break;
            case "add department":
                addDepartment()
                break;
            case "add role":
                addRole()
                break;
            case "add employee":
                addEmployee()
                break;
            case "Delete departments":
                deleteDepartment()
                break;
            case "Delete roles":
                deleteRole()
                break;
            case "Delete employees":
                deleteEmployee()
                break;
            case "Exit":
                connection.end()
                break;
        }
    })
}

//  handler functions
function getTable(request) {
    var select = "select * from" + " " + request
    connection.query(select, function (err, res) {
        if (err) throw err;
        console.table(res);
        QuestionsPrompt()
    });
}

function getEmployeeByRole() {

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
                QuestionsPrompt()
            });
        })

    })
}

function getEmployeeByDepartment() {
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
            var select = "select employee.id, employee.first_name, employee.last_name, role.title as Role, role.salary, department.name as Department from employee left join role on employee.role_id=role.id left join department on department.id = role.department_id where ?"
            connection.query(select, [{ "department.name": answer.department }], function (err, res) {
                if (err) throw err;
                console.table(res);
                QuestionsPrompt()
            });
        })

    })
}


function getTotalbudget() {
    var select = "select department.name,sum(salary) as budget from department inner join role on role.department_id = department.id group by department.id"
    connection.query(select, function (err, res) {
        if (err) throw err;
        console.table(res);
        QuestionsPrompt()
    });

}


function addDepartment() {
    inquirer.prompt([
        {
            // prompt questions
            type: "input",
            message: "put departments name",
            name: "department"

        }
    ]
    ).then(function (answer) {

        var sql = "insert into department (name) values ?"
        var values = [[answer.department]]
        // insert department
        connection.query(sql, [values], function (err, res) {
            if (err) throw err
            getTable("department")

        }
        )
        QuestionsPrompt()
    })


}

function addRole() {
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
                        getTable("role")
                        QuestionsPrompt()

                    }
                    )

                }
                )

            })

    })
}

function addEmployee() {
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
                        getTable("employee")
                        QuestionsPrompt()

                    }
                    )

                }
                )
            })

    })
}
function deleteDepartment() {
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
            // delete all employee in this department
            let sql = " delete e, r, d from employee as e inner join role as r on r.id = e.role_id inner join department as d on r.department_id = d.id where d.name =?";
            connection.query(sql, [answer.department], function (err, res) {
                if (err) throw err
                console.table(res)
                QuestionsPrompt()
            })
        })
    })
}
function deleteRole() {
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
            let sql = " delete e, r from employee as e inner join role as r on r.id = e.role_id where r.title = ?";
            connection.query(sql, [answer.role], function (err, res) {
                if (err) throw err
                console.table(res)
                QuestionsPrompt()
            })
        })
    })
}
function deleteEmployee() {
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
                console.table(res)
                QuestionsPrompt()
            })
        })
    })
}


function updateRole() {
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
                            QuestionsPrompt()
                        })
                    })
                })
            })

        })
    })
}


function updateManager() {
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
                        QuestionsPrompt()
                    })
                })
            })
        })

    })



}

