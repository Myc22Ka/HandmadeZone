DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    login VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (first_name, last_name, login, email, password)
VALUES
    ('John', 'Doe', 'john_doe', 'john.doe@example.com', 'password123'),
    ('Jane', 'Smith', 'jane_smith', 'jane.smith@example.com', 'password456'),
    ('Alice', 'Jones', 'alice_jones', 'alice.jones@example.com', 'password789');

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    Image VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, category, author, Image)
VALUES
    ('Handmade Chair', 'Furniture', 'John Doe', 'chair.jpg'),
    ('Wooden Table', 'Furniture', 'Jane Smith', 'table.jpg'),
    ('Leather Wallet', 'Accessories', 'Alice Johnson', 'wallet.jpg');