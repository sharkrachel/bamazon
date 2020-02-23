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
     showItems();
});

// here is where the inquirer prompt may start...

function showItems() {
    connection.query ("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\n" + "Product Name: " + res[i].product_name + "\n" + "Price: " + res[i].price + "\n-------------------------");
        }
    });
}