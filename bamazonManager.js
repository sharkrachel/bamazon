var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Snoopdogg1!",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // call first function here
    managerMenu();
});

function managerMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select Option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"
            ],
            name: "menu"
        }
    ]).then(function (input) {

        switch (input.menu) {
            case "View Products for Sale":
                products();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;
        }
    })
}

function products() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
        console.table(res);
    })
}