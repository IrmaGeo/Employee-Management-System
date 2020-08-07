// Build a command - line application that at a minimum allows the user to:

var mysql = require("mysql");
var inquirer = require("inquirer");
const { fetchAsyncQuestionPropertyQuestionProperty } = require("inquirer/lib/utils/utils");
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
    // afterConnection()
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
                "View employees by manager",
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
            case "View employees by manager":
                getEmployeeByManager()
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

function getEmployeeByManager() {
    connection.query("select distinct(first_name, last_name) from employee where ?", { manager_id: "" }, function (err, res) {
        if (err) throw err;
        let array = [];
        for (i = 0; i < res.length; i++) {
            array.push(res[i].manager_name)
        }
        inquirer.prompt({
            type: "list",
            message: "Choose manager's name:",
            name: "manager",
            choices: array

        }).then(function (answer) {
            var select = "select employee.id as ID, employee.first_name, employee.last_name, role.title as Role, role.salary, department.name as Department from employee inner join role on employee.role_id = role.id inner join department on role.department_id = department.id where  ?"
            connection.query(select, [{ "manager_name": answer.manager }], function (err, res) {
                if (err) throw err;
                console.table(res);
                QuestionsPrompt()
            });
        })

    })
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

function updateRole() {
    // choose employe and keep input id
    // choose role name and keep choosen id
    // update role_name in employee table with employee id
}


function updateManager() {
    // choose employe with first and last name and get id.
    // choose manager name 
    // update maneger_name in employee table

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
            QuestionsPrompt()
        }
        )
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

                    }
                    )
                    QuestionsPrompt()
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
        console.log(array)
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

                    }
                    )
                    QuestionsPrompt()
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
                QuestionsPrompt()
            })
        })
    })
}
function deleteEmployee() {
    // choose employee
    // delete employee
}



