var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("you connected mayyne");
    showProducts();
})

function showProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        for(var i = 0; i < res.length; i++){
            console.log(res[i].item_id + " - " + res[i].product_name + " : $" + res[i].price )
            
        }

        inquirer.prompt([{
            name: "id",
            message: "Type in the id number of the product you'd like to buy..."
            },{
            name: "amProduct",
            message: "How many do you want?"
        }]).then(function(answers){
            // console.log("Product id: " + answers.id + "\n" + "Quantity: " + answers.amProduct);
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {item_id: answers.id}, function(err, res){
                // console.log(res);
                var moneyCount = res[0].price * answers.amProduct;
                   if(answers.amProduct > res[0].stock_quantity){
                            console.log("Na dude, thats too much... \n");
                            console.log("____________________________________");
                            showProducts();
                        }else{
                             var newStock = res[0].stock_quantity - answers.amProduct;
                            connection.query(
                            "UPDATE products SET ? WHERE ?", [
                                {
                                stock_quantity: newStock
                                },
                                {
                                    item_id: answers.id
                                }], function(err, res){
                                    console.log("Thanks")
                                   }
                            );
                            console.log("Your total amount is: $" + moneyCount);
                        connection.end();
                        }
                        // var moneyCount = res[0].price * answers.amProduct;

                        // console.log("Your total amount is: $" + moneyCount);
                        // connection.end();
                })
        




        });
    })    
}

function price(){
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, {item_id: answers.id}, function(err, res){
        var moneyCount = res[0].price * answers.amProduct;

        console.log("Your total amount is: $" + moneyCount);
        

    
    
    });

    connection.end();
}
// connection.end();
// if (isNaN(value) === false