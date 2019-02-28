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
    connection.query('SELECT * from products', function(error, results) {
        if (error) throw error;

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

        if (idFoundAt >= 0) {
            console.log('Found Item');
            askBuyQuantity();
            results.filter(function(items) {
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

function askBuyQuantity() {
    inquirer.prompt([{
        type: 'input',
        name: 'quantity',
        message: 'Type an item ID that you wish to purchase: '
    }]).then(function(answer) {


    });
}

displayItems();