// Build a command - line application that at a minimum allows the user to:

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "",
    database: "schema_"
});

connection.connect(function (err) {
    if (err) throw err
    console.log("there is problem" + connection.threadId)
    connection.end()

});

// questions:
// what would you like todo:

view
// (view all
//  view with department,
// view with role, 
// view with last name, 
// first name, 
// ID,
//     role,
//     salary)
// View employees by manager
// View the total utilized budget of a department-- ie the combined salaries of all employees in that department


Add
// Add departments, roles, employees

update

// Update employee roles
// Update employee managers

DELETE

// Delete departments, roles, and employees






