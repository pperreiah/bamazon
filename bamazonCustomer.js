var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

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
    queryAllProducts(getCustomerOrder);

});

function queryAllProducts(cb) {
    console.log("\n\n Displaying all products for your selection...\n");
    connection.query("SELECT * FROM products", function(err, res) {

        if (err) throw err;
        console.table(res); //this creates the displayed table

        cb(); //call getCustomerOrder()

    }); //connection query
}; //function


//Get user product selection
function getCustomerOrder() {

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
            //console.log("===>  Item selected = #" + inquirerResponse.item_id + "; Item Quantity Requested = " + inquirerResponse.quantity_request + " units.");
            connection.query("SELECT stock_quantity, price FROM products WHERE item_id = ?", [inquirerResponse.item_id], function(err, results) {

                // if (err) console.error(err);
                var stockqty = results[0].stock_quantity;
                var pricefix = results[0].price;
                if (stockqty < inquirerResponse.quantity_request) {
                    console.log("Sorry, we do not have sufficient stock of Item #" + inquirerResponse.item_id + " to  fill your order.");
                } else {
                    var newStockQty = stockqty - inquirerResponse.quantity_request;
                    connection.query('UPDATE products SET stock_quantity = newStockQty WHERE item_id = inquirerResponse.item_id');
                    console.log("Your order is being filled and will cost $" + pricefix*inquirerResponse.quantity_request + ".  Thank you for your business.");
                } //else

            }); //connection.query

        }); // then
}; //function getCustomerOrder