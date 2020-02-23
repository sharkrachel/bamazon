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
        managerMenu()
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        console.table(res);
        managerMenu()
    });
}

function itemLookUp() {
    return new Promise(function(resolve, reject) {
        connection.query("SELECT item_id, product_name FROM products", function(err, res){
            resolve(res);
        })
    })  
}

function addInventory() {

    //original - [{product_name:"dogbrush"},{product_name:"couch"}]
    //transformed array according to return  -["5 - dogbrush"," 7 couch"]
    itemLookUp().then(function(res) {
        var listProducts = res.map(function(res){
            return res.item_id + " - " + res.product_name;
        })
        inquirer.prompt([
            {
                type: "list",
                message: "Please select a product",
                choices: listProducts,
                name: "productList"
            },
            {
                type: "input",
                message: "Quantity?",
                name: "quantity"
            }
        ]).then(function(input) {
               var item_id = input.productList.split(" - ")[0]

               connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [input.quantity, item_id], function(err, res){
                products();
               })
               
        })
    })
}