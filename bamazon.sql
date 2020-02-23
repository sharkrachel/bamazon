DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

USE bamazonDB;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Brush", "Pets", 10.00, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Big Television", "Electronics", 799.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("X-Box", "Electronics", 375.00, 178);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tea Kettle", "Kitchen", 16.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Couch", "Home Goods", 790.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wrench", "Tools", 18.75, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Painting", "Home Goods", 850.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Duvet Cover", "Home Goods", 85.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candle", "Home Goods", 10.00, 2500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Leash", "Pets", 17.95, 90);

SELECT * FROM products