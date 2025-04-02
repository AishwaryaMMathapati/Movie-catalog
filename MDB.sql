-- Set character set and collation
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS SequelizeMeta;

-- Create users table
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create movies table (Updated with fewer columns)
CREATE TABLE movies (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  release_year INT NOT NULL,
  director VARCHAR(255) NOT NULL,
  rating DECIMAL(3,1) DEFAULT NULL, -- IMDb-style rating (e.g., 8.6)
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Create SequelizeMeta table for tracking migrations
CREATE TABLE SequelizeMeta (
  name VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Insert initial data into users
INSERT INTO users (id, username, password, email) VALUES 
(1, 'jointheteam', '$2b$10$VR9.SZ8OViNiGb6xQsvHJeQLsdIG0TYtG9mFKwCwAVXd7sImrhEoC', 'jointheteam@aglet.co.za'),
(2, 'khomotjo', '$2b$10$lJMu191wgPObtPl420/Jjunj1n3EI7w3offsN4lQG1MFrkJ0lfKkK', 'khomotjomodipa4@gmail.com');

-- Insert initial data into movies
INSERT INTO movies (id, title, genre, release_year, director, rating) VALUES 
(1, 'Inception', 'Sci-Fi', 2010, 'Christopher Nolan', 8.8),
(2, 'Interstellar', 'Sci-Fi', 2014, 'Christopher Nolan', 8.6),
(3, 'The Dark Knight', 'Action', 2008, 'Christopher Nolan', 9.0);


-- Insert initial data into SequelizeMeta (migration tracking)
INSERT INTO SequelizeMeta (name) VALUES 
('20210216150026-usertable.js'),
('20210219053422-moviedb.js'),
('20210219085146-movietable.js');

-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE favourites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

CREATE TABLE watchlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

