CREATE DATABASE bamazon;

CREATE TABLE products (
    item_id INT(4) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DOUBLE NULL,
    stock_quantity INT(3),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('samsung tv 55"', 'electronics', 250, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('lphone XI', 'electronics', 1399.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('tv stand', 'furniture', 149.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('monopoly game', 'games', 19.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('summer t-shirt', 'clothing', 9.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('plywood', 'construction', 5.89, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('shampoo', 'body care', 8.89, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('frozen pizza', 'food', 6.99, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('spider-man dvd', 'electronics', 19.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('laptop', 'electronics', 499.99, 4);
