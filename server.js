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
        type: "rawlist",
        message: "what kind of operation would you like to choosen?",
        name: "todo",
        choices:

            [
                "view departments",
                "view employees",
                "view roles",
                "add department",
                "add role",
                "add employee",
                "Update employee roles",
                "Update employee managers",
                "View employees by manager",
                "Delete departments",
                "Delete roles",
                "Delete employees",
                "View the total utilized budget of a department"
            ]

    }).then(function (answer) {
        if (answer.todo === "view departments") {
            request = "department"
        } else {
            if (answer.todo === "view employees") {
                request = "employee"

            } else {
                if (answer.todo === "view roles") {
                    request = "role"
                } else { connection.end() }

            }

        }

        getTable(request)

    })
}




// view all roles
// function afterConnection() {
//     connection.query("select * from role", function (err, res) {
//         if (err) throw err;
//         console.log(res);
//         connection.end();
//     })
// }

function getTable(request) {
    var select = "select * from" + " " + request
    connection.query(select, function (err, res) {
        console.log(select +
            " select")
        if (err) throw err;
        console.table(res)
    });

}







