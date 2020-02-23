var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Snoopdogg1!",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
     // call first function here
});

// here is where the inquirer prompt may start...

