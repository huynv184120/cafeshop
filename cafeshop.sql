CREATE DATABASE cafeshop;
USE cafeshop;
CREATE TABLE Product(
	product_id INT UNSIGNED AUTO_INCREMENT,
	product_name VARCHAR(255),
    price INT UNSIGNED,
    discount INT UNSIGNED DEFAULT 0,
	description_content VARCHAR(255),
    product_status int,
    PRIMARY KEY(product_id)
);

CREATE TABLE OrderBill(
	order_id INT UNSIGNED AUTO_INCREMENT,
    order_status int,
    note VARCHAR(255),
    order_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    total int unsigned,
    address varchar(255),
    PRIMARY KEY(order_id)
);

CREATE TABLE OrderDetail(
	order_id INT UNSIGNED ,
    product_id INT UNSIGNED,
    amount int unsigned,
    total INT UNSIGNED,
	FOREIGN KEY(order_id) REFERENCES OrderBill(order_id),
	FOREIGN KEY(product_id) REFERENCES Product(product_id) 
);

CREATE TABLE Divice(
	divice_id CHAR(5),
    divice_name VARCHAR(255),
    divice_status int,
    PRIMARY KEY(divice_id)
);