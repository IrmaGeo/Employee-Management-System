// Build a command - line application that at a minimum allows the user to:

const mysql = require("mysql");
const inquirer = require("inquirer");
const add = require("./add");
const update = require("./update");
const Delete = require("./delete")
const view = require("./view")
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

const QuestionsPrompt = async () => {
    await inquirer.prompt({
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
                view.department(QuestionsPrompt);
                break;
            case "view employees":
                request = "employee";
                view.employee(QuestionsPrompt);
                break;
            case "view roles":
                view.role(QuestionsPrompt);
                break;
            case "View employees by role":
                view.getEmployeeByRole(QuestionsPrompt)
                break;
            case "View employees by department":
                view.getEmployeeByDepartment(QuestionsPrompt)
                break;
            case "View the total utilized budget of a department":
                view.getTotalbudget(QuestionsPrompt)
                break;
            case "Update employee roles":
                update.updateRole(QuestionsPrompt)
                break;
            case "Update employee managers":
                update.updateManager(QuestionsPrompt)
                break;
            case "add department":
                add.addDepartment(QuestionsPrompt)
                break;
            case "add role":
                add.addRole(QuestionsPrompt)
                break;
            case "add employee":
                add.addEmployee(QuestionsPrompt)
                break;
            case "Delete departments":
                Delete.deleteDepartment(QuestionsPrompt)
                break;
            case "Delete roles":
                Delete.deleteRole(QuestionsPrompt)
                break;
            case "Delete employees":
                Delete.deleteEmployee(QuestionsPrompt)
                break;
            case "Exit":
                connection.end()
                break;
        }
    })
}

