### Schema

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
	item_id int NOT NULL AUTO_INCREMENT,
	product_name varchar(255) NOT NULL,
	department_name varchar(255) NOT NULL,
	price decimal(15,2) NOT NULL,
	stock_quantity int NOT NULL,
	PRIMARY KEY (item_id)
);


INSERT INTO products SET
	product_name = "No 2 Pencil",
    department_name = "Office Supplies",
    price = "3",
    stock_quantity = "100";
    
INSERT INTO products SET
	product_name = "Blue gel pen",
    department_name = "Office Supplies",
    price = "10",
    stock_quantity = "40";   
    
INSERT INTO products SET
	product_name = "Black gel pen",
    department_name = "Office Supplies",
    price = "10",
    stock_quantity = "60";   
    
INSERT INTO products SET
	product_name = "White copy paper",
    department_name = "Office Supplies",
    price = "16",
    stock_quantity = "200";    
    
INSERT INTO products SET
	product_name = "Notebook",
    department_name = "Office Supplies",
    price = "5",
    stock_quantity = "30"; 
    
INSERT INTO products SET
	product_name = "Potato Chips 5 oz",
    department_name = "Snacks",
    price = "1.25",
    stock_quantity = "100";
    
INSERT INTO products SET
	product_name = "Cheetos 4.25 oz",
    department_name = "Snacks",
    price = "1.25",
    stock_quantity = "140";   
    
INSERT INTO products SET
	product_name = "Hammer",
    department_name = "Tools",
    price = "18",
    stock_quantity = "60";   
    
INSERT INTO products SET
	product_name = "Pliers",
    department_name = "Tools",
    price = "11.25",
    stock_quantity = "40";    
    
INSERT INTO products SET
	product_name = "Drill",
    department_name = "Tools",
    price = "75",
    stock_quantity = "20";      
    
    
    
    
    
    
    