create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

insert into item(id, title, user_id)
values
  (1, "Stuff", 1),
  (2, "Doodads", 1);



CREATE TABLE station (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100),
  operator VARCHAR(100),
  adress VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT,
  nb_bornes INT
);

INSERT INTO station(id, name, operator, adress, latitude, longitude, nb_bornes)
VALUES
  (1, "Market", "Carrefour", "1, rue de la paix - paris", 48.8566, 2.3522, 10),
  (2, "Paris | Avenue de la République 5", "", "5 Avenue de la République 75011 Paris", 48.86661, 2.36784, 1),
  (3, "Boulevard Voltaire  8", "", "8 Boulevard Voltaire 75011 Paris", 48.8657658, 2.3664376, 5),
  (4, "Boulevard du Temple 27", "", "140 Boulevard du Temple 75011 Paris", 48.8623505, 2.3648513, 6),
  (5, "Place de la République 17", "", "17 Place de la République 75003 Paris", 48.86502, 2.360503, 10);
