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
                "add department",
                "add role",
                "add employee",
                "Update employee roles",
                "Update employee managers",
                "Delete departments",
                "Delete roles",
                "Delete employees"
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
    connection.query("select distinct(manager_name) from department", function (err, res) {
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
            var select = "select * from employee where ?"
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
            var select = "select * from employee where ?"
            connection.query(select, [{ "role_name": answer.role }], function (err, res) {
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
            var select = "select department.name,role.title from employee inner join role on employee.role_name=role.title inner join department on department.id = role.department_id where ?"
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











