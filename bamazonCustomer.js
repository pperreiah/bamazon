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

        // // Log all results of the SELECT statement  --but this fails to format the table correctly
        // console.log("ID" + "|" + " Product Name  " + "|" + " Department Name" + "|" + "Price");
        // console.log("--|--------------|-----------------|------");
        // for (var i = 0; i < res.length; i++) {
        //     console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
        // }
        // console.log("------------------------------------------------\n\n");

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

                console.log(results); //shows correct object is being returned
                console.log("stock_quantity = " + results.stock_quantity) //shows results.stock_quantity is not accessing the value 
                console.log("price = " + results.price) //shows results.price is not accessing the value 

                if (results.stock_quantity < inquirerResponse.quantity_request) {
                    console.log("Sorry, we do not have sufficient stock of Item #" + inquirerResponse.item_id + " to  fill your order.");
                } else {
                    var newStockQty = results.stock_quantity - inquirerResponse.quantity_request;
                    connection.query('UPDATE products SET stock_quantity = newStockQty WHERE item_id = inquirerResponse.item_id');
                    console.log("Your order is being filled and will cost $" + results.price * inquirerResponse.quantity_request + ".  Thank you for your business.");
                } //else

            }); //connection.query

        }); // then
}; //function getCustomerOrder