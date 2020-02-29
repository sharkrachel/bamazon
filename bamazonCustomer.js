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
    showItems();
});

// here is where the inquirer prompt may start...

function showItems() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.table(res)
        // for (var i = 0; i < res.length; i++) {
        //     console.log("Item ID: " + res[i].item_id + "\n" + "Product Name: " + res[i].product_name + "\n" + "Price: " + res[i].price + "\n-------------------------");
        // }
        orderItemsPrompt();
    });
}

function orderItemsPrompt() {
    inquirer.prompt([
        {
            name: "productSelection",
            type: "input",
            message: "Please enter the item number for the product you'd like to purchase",
            filter: Number
        },
        {
            name: "productSelectionQuantity",
            type: "input",
            message: "How many would you like to purchase?",
            filter: Number
        }

    ]).then(function (answer) {
        var requestedQuantity = answer.productSelectionQuantity;
        var requestedItem = answer.productSelection;
        processOrder(requestedItem, requestedQuantity);
    });

}

function processOrder(id, amount) {
    connection.query("SELECT * FROM products WHERE item_id = " + id, function (err, res) {
        if (err) throw err;
        if (amount <= res[0].stock_quantity) {
            var amountOwed = res[0].price * amount;
            console.log("Processing your oder...");
            console.log("You owe: " + amountOwed);

            // var statment = 
            connection.query("UPDATE products SET stock_quantity = stock_quantity -" + amount + " WHERE item_id = " + id, function (err, res) {
            showItems();
 
            });

            //   console.log(statement.sql);
        }
        else {
            console.log("Out of Stock");
            showItems();
        }
    });
}