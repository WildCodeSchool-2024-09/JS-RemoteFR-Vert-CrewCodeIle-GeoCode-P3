CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL,
  email VARCHAR(255) NOT NULL, unique,
  city VARCHAR(255) NOT NULL,
  zipCode INT NOT NULL,
  password VARCHAR(255) NOT NULL,
);

CREATE TABLE brand (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(255) NOT NULL,
);
CREATE TABLE socket (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(255) NOT NULL,
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



INSERT INTO brand (label )
VALUES
  ( "Renault"),
  ( "Wolkswagen"),
  ( "Lexus"),
  ( "tesla"),
  ( "Peugeot");

  INSERT INTO socket(label)
VALUES
 ("type 1"),
 ("type 2"),
 ("type 3"),
 ("type Chademo");

  INSERT INTO model (label, socket_id, brand_id )
VALUES
  ( "kangoo", 1 , 1),
  ( "transporter", 2 , 2),
  ( "voyager", 2 , 3),
  ( "typeS extra", 3 , 4),
  ( "205", 1 , 5),
  ( "partner", 1 , 1),
  ( "405", 3 , 2),
  ( "vito", 2 , 3),
  ( "typeS top", 3 , 4),
  ( "2006", 1 , 5);


