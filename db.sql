CREATE DATABASE IF NOT EXISTS icecream_pos;
USE icecream_pos;

CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    items TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO menu (name, price) VALUES
('Vanilla Cone', 50.00),
('Chocolate Sundae', 75.00),
('Strawberry Scoop', 65.00);
