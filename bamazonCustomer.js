var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

var table = new Table({
    head: ['ID', 'Product', 'Price per Unit (USD)'],
    colWidths: [10, 30, 15]
});

function displayItems() {
    connection.query('SELECT * FROM products', function(error, results) {
        if (error) throw error;

        console.log(results);
        var idArr = [];
        results.filter(function(items) {
            table.push(
                [items.item_id, items.product_name, items.price]
            );

            idArr.push(items.item_id);
        });

        console.log(table.toString());

        buyItem(idArr, results);
    });
}

function buyItem(itemsId, arrItems) {
    inquirer.prompt([{
        type: 'input',
        name: 'itemId',
        message: 'Type an item ID that you wish to purchase: '
    }]).then(function(answer) {
        var idFoundAt = itemsId.indexOf(parseInt(answer.itemId));
        var idArr = [];

        if (idFoundAt >= 0) {
            console.log('Found Item');
            askBuyQuantity(answer.itemId);
            arrItems.filter(function(items) {
                table.push(
                    [items.item_id, items.product_name, items.price]
                );

                idArr.push(items.item_id);
            });
        } else {
            console.log('================================\n');
            console.log('\nInvalid Product Id.\n');
            console.log('\n================================\n');
            // code below delays the function call in order to let the user see the Invalid result
            setTimeout(function() {
                displayItems();
            }, 1000);
        }
    });
}

function askBuyQuantity(id) {
    inquirer.prompt([{
        type: 'input',
        name: 'quantity',
        message: 'How many do you want to buy from the selected item: '
    }]).then(function(answer) {

        connection.query('SELECT stock_quantity, product_name FROM products where item_id =' + id, function (error, results) {
            if (error) throw error;

            results.filter(function (items) {
                if(items.stock_quantity > answer.quantity){
                    var newStock = items.stock_quantity - answer.quantity;
    
                    connection.query('UPDATE products SET stock_quantity=' + newStock + ' WHERE item_id=' + id, function (error, results) {
                        console.log('================================\n');
                        console.log('CONGRATULATION! You just bought: ');
                        console.log(answer.quantity + ' of the following product: ' + items.product_name + '\n' );
                        console.log('================================\n');

                        connection.end();
                    });
                } else {
                    console.log('================================\n');
                    console.log('\nNot enough in Stock. Please pick a lesser quantity\n');
                    console.log('\n================================\n');
                    askBuyQuantity(id);
                }
            });
        });
    });
}

displayItems();