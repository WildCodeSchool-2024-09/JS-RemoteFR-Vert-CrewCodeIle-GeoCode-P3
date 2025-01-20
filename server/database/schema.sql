CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL,
  email VARCHAR(255) NOT NULL unique,
  photo VARCHAR(255) DEFAULT "/images/user_profil.png",
  city VARCHAR(255) NOT NULL,
  zipCode INT NOT NULL,
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
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(id),
  CONSTRAINT FOREIGN KEY (car_id) REFERENCES car(id)
);

CREATE TABLE IF NOT EXISTS station (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_station VARCHAR(100),
  name VARCHAR(100),
  address VARCHAR(255),
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS terminal (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  power INT NOT NULL,
  id_terminal VARCHAR(100) NOT NULL,
  is_type_ef BOOLEAN,
  is_type_2 BOOLEAN,
  is_type_combo_ccs BOOLEAN,
  is_type_chademo BOOLEAN,
  is_type_other BOOLEAN,
  is_available BOOLEAN,
  station_id INT,
  CONSTRAINT FOREIGN KEY(station_id) REFERENCES station(id)
);

CREATE TABLE book_cost (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  price FLOAT NOT NULL
);

CREATE TABLE book (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  terminal_id INT NOT NULL,
  book_cost_id INT NOT NULL,
  star_book DATETIME DEFAULT CURRENT_TIMESTAMP,
  end_book DATETIME,
  cost FLOAT NOT NULL,
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(id),
  CONSTRAINT FOREIGN KEY (terminal_id) REFERENCES terminal(id),
  CONSTRAINT FOREIGN KEY (book_cost_id) REFERENCES book_cost(id)
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


INSERT INTO brand (label )
VALUES
  ( "Renault"),
  ( "Wolkswagen"),
  ( "BMW"),
  ( "Tesla"),
  ( "Hyundai"),
  ( "Volvo"),
  ( "Audi");

  INSERT INTO socket(label)
VALUES
 ("type 1"),
 ("type 2"),
 ("type 3"),
 ("type Chademo");

  INSERT INTO model (label, socket_id, brand_id )
VALUES
  ( "Model 3 Propulsion", 1 , 4),
  ( "Model 3 Performance", 2 , 4),
  ( "Model Y Propulsion", 2 , 4),
  ( "Model X Dual Motor", 3 , 4),
  ( "Model X Plaid", 1 , 4),
  ( "Model S Dual Motor", 1 , 4),
  ( "Model S Plaid", 3 , 4),
  ( "i5 eDrive40", 2 , 3),
  ( "i5 Touring M60 xDrive", 3 , 3),
  ( "iX2 eDrive20", 1 , 3),
  ( "i7 M70", 4 , 3),
  ( "i4 eDrive40", 2 , 3),
  ( "iX1 eDrive20", 3 , 3),
  ( "Megane E-Tech 130ch Autonomie Urbaine", 3 , 1),
  ( "Kangoo Van E-Tech EV45 DC 80kw", 3 , 1),
  ( "5 E-Tech 150hp Autonomie Confort", 1 , 1),
  ( " Scenic E-Tech 220ch", 4 , 1),
  ( "Kangoo E-Tech EV45 11kW", 3 , 1),
  ( "Twingo E-Tech E-Tech", 2 , 1),
  ( "iD.7 PRO", 1 , 2),
  ( "iD.5 GTX", 3 , 2),
  ( "iD.4 GTX", 4 , 2),
  ( "iD.4 PRO 4Motion", 2 , 2),
  ( "ID.Buzz iD.Buzz", 2 , 2),
  ( "ID.Buzz Cargo Cargo", 3 , 2),
  ( "Inster Long Range", 4 , 5),
  ( "IONIQ 5 N", 1 , 5),
  ( "IONIQ 6 HTRAC", 1 , 5),
  ( "IONIQ 6 RWD", 3 , 5),
  ( "ID.Kona Electric 64 kWh", 2 , 5),
  ( "C40 Extended Range", 2 , 6),
  ( "EX90 Single", 3 , 6),
  ( "C40 Recharge Twin", 1 , 6),
  ( "EX40 Recharge Twin", 4 , 6),
  ( "EX30 Twin Motor Performance", 3 , 6),
  ( "Q8 e-tron Sportback S", 4, 7),
  ( "Q8 e-tron Sportback 55 quattro", 1 , 7),
  ( "Q4 e-tron 50 quattro", 2 , 7),
  ( "Q4 e-tron Sportback 45 quattro", 2 , 7),
  ( "e-tron GT GT quattro RS", 3 , 7);


