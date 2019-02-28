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

connection.query('SELECT * from products', function(error, results) {
    if (error) throw error;

    results.filter(function(items) {
        table.push(
            [items.item_id, items.product_name, items.price]
        );
    });

    console.log(table.toString());
});