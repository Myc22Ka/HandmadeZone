DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS offers CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    login VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    cash DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (first_name, last_name, login, email, password,cash)
VALUES
    ('John', 'Doe', 'john_doe', 'john.doe@example.com', 'password123', '1000.00'),
    ('Jane', 'Smith', 'jane_smith', 'jane.smith@example.com', 'password456', '10000.00'),
    ('Alice', 'Jones', 'alice_jones', 'alice.jones@example.com', 'password789', '20000.00');

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);

-- Sample categories 
INSERT INTO categories 
    (name, description, image_url)
VALUES
    ('Electronics', 'All electronic products including gadgets, devices, and accessories.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.researchgate.net%2Fprofile%2FGabriel-Drabik&psig=AOvVaw3GJIMEZGSOY4mZtTJpix0D&ust=1736432276490000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjK87io5ooDFQAAAAAdAAAAABAE'),
    ('Fashion', 'Clothing, footwear, and fashion accessories for men and women.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.researchgate.net%2Fprofile%2FJerzy-Bodzenta&psig=AOvVaw3xHvHwz1j08ou6zxnjyw0s&ust=1736432317334000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCzyM-o5ooDFQAAAAAdAAAAABAE'),
    ('Home', 'Furniture, home decor, and appliances for household use.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpl.linkedin.com%2Fin%2Fjaroslaw-paduch-537a0719&psig=AOvVaw1pu90mw3NZSmayZVArlPcA&ust=1736432357295000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDg_eKo5ooDFQAAAAAdAAAAABAE');

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER NOT NULL,
    manufacturer VARCHAR(255) NOT NULL,
    dimensions_height INTEGER NOT NULL,
    dimensions_width INTEGER NOT NULL,
    dimensions_depth INTEGER NOT NULL,
    dimensions_unit VARCHAR(10) NOT NULL,
    weight_amount INTEGER NOT NULL,
    weight_unit VARCHAR(10) NOT NULL,
    material VARCHAR(255) NOT NULL,
    rating FLOAT CHECK (rating BETWEEN 1 AND 5),
    reviews INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Sample products
INSERT INTO products 
    (name, category_id, manufacturer, dimensions_height, dimensions_width, dimensions_depth, dimensions_unit, weight_amount, weight_unit, material, rating, reviews, image_url) 
VALUES 
    ('Leather Sofa', 3, 'Comfort Creations', 85, 200, 90, 'cm', 50, 'kg', 'Leather', 4.8, 45, 'sofa.jpg'),
    ('Bluetooth Headphones', 1, 'AudioTech', 15, 20, 5, 'cm', 0.3, 'kg', 'Plastic', 4.3, 210, 'headphones.jpg'),
    ('Stainless Steel Toaster', 3, 'Home Essentials', 25, 40, 20, 'cm', 3, 'kg', 'Stainless Steel', 4.6, 75, 'toaster.jpg'),
    ('Running Shoes', 2, 'RunMaster', 12, 30, 10, 'cm', 1, 'kg', 'Synthetic', 4.4, 120, 'shoes.jpg'),
    ('Smartwatch Series 5', 1, 'GadgetPro', 5, 5, 1, 'cm', 0.1, 'kg', 'Aluminium', 4.7, 180, 'smartwatch.jpg');

DROP TYPE IF EXISTS offer_type;
DROP TYPE IF EXISTS offer_status;

CREATE TYPE offer_type AS ENUM ('QUICK_PURCHASE', 'AUCTION');
CREATE TYPE offer_status AS ENUM ('ACTIVE', 'EXPIRED', 'SOLD');

CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    type offer_type NOT NULL,
    product_id INTEGER NOT NULL,
    start_date TIMESTAMP NOT NULL DEFAULT NOW(),
    end_date TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '7 days',
    status offer_status NOT NULL DEFAULT 'ACTIVE',
    view_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sample offers
INSERT INTO offers 
    (title, price, user_id, description, type, product_id, start_date, end_date, status, view_count)
VALUES
    ('Self Driving Pen Writing Tool - Auction', 500, 1, 'Bid on this amazing self-driving pen.', 'AUCTION', 1, NOW(), NOW() + INTERVAL '7 days', 'ACTIVE', 0),
    ('Handcrafted Wooden Table - Quick Purchase', 1500, 2, 'Beautiful handcrafted wooden table.', 'QUICK_PURCHASE', 2, NOW(), NOW() + INTERVAL '30 days', 'ACTIVE', 5);