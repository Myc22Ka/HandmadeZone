DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password)
VALUES
    ('john_doe', 'john.doe@example.com', 'password123'),
    ('jane_smith', 'jane.smith@example.com', 'password456'),
    ('alice_jones', 'alice.jones@example.com', 'password789');