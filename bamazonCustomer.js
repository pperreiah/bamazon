
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Pizzas10!",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
});

function queryAllProducts() {
    console.log("\n\n Displaying all products for your selection...\n");
    connection.query("SELECT * FROM products", function(err, res) {

        if (err) throw err;

        // Log all results of the SELECT statement
        console.log("ID" + "|" + " Product Name  " + "|" + " Department Name" + "|" + "Price");
        console.log("--|--------------|-----------------|------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
        }
        console.log("------------------------------------------------\n\n");

        //Get user product selection
        inquirer
            .prompt([{
                    type: "input",
                    message: "Type the ID number of the product you would like to purchase:",
                    name: "item_id"
                },
                {
                    type: "input",
                    message: "How many units of this product would you like to purchase?",
                    name: "quantity_request"
                }
            ])
            .then(function(inquirerResponse) {
                console.log("===>  Item selected = #" + inquirerResponse.item_id + "; Item Quantity Requested = " + inquirerResponse.quantity_request + " units.");
                connection.query("SELECT stock_quantity, price FROM products WHERE item_id = ??", [inquirerResponse.item_id], function(err, res) {

                    // if (err) throw err;

                    console.log("Item #" + inquirerResponse.item_id + " stock quantity = " + res.stock_quantity);
                    if (res.stock_quantity < inquirerResponse.quantity_request) {
                        console.log("Sorry, we do not have sufficient stock of Item #" + inquirerResponse.item_id + " to  fill your order.");
                    } else {
                        var newStockQty = res.stock_quantity - inquirerResponse.quantity_request;
                        connection.query('UPDATE products SET stock_quantity = newStockQty WHERE item_id = inquirerResponse.item_id');
                        console.log("Your order is being filled and will cost $" + res.price * inquirerResponse.quantity_request + ".  Thank you for your business.");
                    } //else

                }); //connection.query		  
            }); //prompt -then

        connection.end();

    }); //connection
}; //function queryAllProducts 