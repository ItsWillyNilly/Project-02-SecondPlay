DROP DATABASE IF EXISTS SecondPlay_db;
CREATE DATABASE SecondPlay_db;
\c SecondPlay_db

CREATE TABLE sellers (
    seller_id SERIAL PRIMARY KEY,
    seller_name VARCHAR(255) NOT NULL
);

CREATE TABLE equipment_types (
    equiptment_id SERIAL PRIMARY KEY,
    equipment_type VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    seller_id INT REFERENCES sellers(seller_id),
    equipment_id INT REFERENCES equipment_types(equipment_id),
    product_name VARCHAR(255) NOT NULL,
    Description TEXT,
    condition VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    icon_path VARCHAR(255)
);