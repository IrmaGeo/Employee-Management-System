// Build a command - line application that at a minimum allows the user to:

var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ididit2@20",
    database: "schemaDB"
});

var department = "";
connection.connect(function (err) {
    if (err) throw err
    console.log("there is problem" + connection.threadId)
    connection.end()
});


inquirer.prompt(["what kind of operation would you like to choosen?"], function (answers) {
    type: "rawlist",
        message: "what kind of operation would you like to choosen?",
            name: "todo",
                choices:

    {
        "add department",
            "add role",
            "add employee",
            "view departments",
            "view roles",
            "view employees",
            "Update employee roles",
            "Update employee managers",
            "View employees by manager",
            "Delete departments",
            "Delete roles",
            "Delete employees",
            "View the total utilized budget of a department"
    }


});

console.table(['ID', 'First_Name', "Last_Name", "Meneger_Id", "Title", "Depatment", "Salary"], connection.query("select * from employee", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
}));

// view all roles
function afterConnection() {
    connection.query("select * from role", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}









