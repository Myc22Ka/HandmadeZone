DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

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

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);

-- Insert categories with properly escaped URLs
INSERT INTO categories (name, description, image_url)
VALUES
    ('Electronics', 'All electronic products including gadgets, devices, and accessories.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.researchgate.net%2Fprofile%2FGabriel-Drabik&psig=AOvVaw3GJIMEZGSOY4mZtTJpix0D&ust=1736432276490000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjK87io5ooDFQAAAAAdAAAAABAE'),
    ('Fashion', 'Clothing, footwear, and fashion accessories for men and women.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.researchgate.net%2Fprofile%2FJerzy-Bodzenta&psig=AOvVaw3xHvHwz1j08ou6zxnjyw0s&ust=1736432317334000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCzyM-o5ooDFQAAAAAdAAAAABAE'),
    ('Home', 'Furniture, home decor, and appliances for household use.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpl.linkedin.com%2Fin%2Fjaroslaw-paduch-537a0719&psig=AOvVaw1pu90mw3NZSmayZVArlPcA&ust=1736432357295000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDg_eKo5ooDFQAAAAAdAAAAABAE');

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
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