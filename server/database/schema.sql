-- SQLBook: Code
CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL,
  email VARCHAR(255) NOT NULL unique,
  photo VARCHAR(255) DEFAULT "user_profil.png",
  city VARCHAR(255) NOT NULL,
  zipCode INT NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'user',
  password VARCHAR(255) NOT NULL
);

CREATE TABLE brand (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE socket (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE model (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(255) NOT NULL,
  socket_id INT NOT NULL,
  brand_id INT NOT NULL,
  CONSTRAINT FOREIGN KEY  (socket_id) REFERENCES socket(id),
  CONSTRAINT FOREIGN KEY  (brand_id) REFERENCES brand(id)
);

CREATE table car (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  brand_id INT NOT NULL,
  model_id INT NOT NULL,
  socket_id INT NOT NULL,
  CONSTRAINT FOREIGN KEY  (brand_id) REFERENCES brand(id),
  CONSTRAINT FOREIGN KEY (model_id) REFERENCES model(id),
  CONSTRAINT FOREIGN KEY  (socket_id) REFERENCES socket(id)
);

CREATE TABLE user_car (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  car_id INT NOT NULL,
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  CONSTRAINT FOREIGN KEY (car_id) REFERENCES car(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS station (
  id_station VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS terminal (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  id_terminal VARCHAR(100) NOT NULL,
  power INT NOT NULL,
  is_type_ef BOOLEAN,
  is_type_2 BOOLEAN,
  is_type_combo_ccs BOOLEAN,
  is_type_chademo BOOLEAN,
  is_type_other BOOLEAN,
  is_available BOOLEAN,
  station_id VARCHAR(100) NOT NULL,
  FOREIGN KEY(station_id) REFERENCES station(id_station)
);

CREATE TABLE book_cost (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  price FLOAT NOT NULL
);


CREATE TABLE book (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  station_id VARCHAR(255),
  slot INT,
  start_book TIMESTAMP,
  end_book TIMESTAMP,
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(id),
  CONSTRAINT FOREIGN KEY (station_id) REFERENCES station(id_station)
);

CREATE TABLE contact (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  lastname VARCHAR(20) NOT NULL,
  firstname VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  subject VARCHAR(30) NOT NULL,
  message TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_treated BOOLEAN NOT NULL DEFAULT false
);
