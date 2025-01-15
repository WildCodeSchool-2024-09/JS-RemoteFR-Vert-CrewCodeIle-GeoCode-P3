create table user (
  id int primary key auto_increment not null,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL,
  email varchar(255) not null unique,
  city VARCHAR(255) NOT NULL,
  zipCode INT NOT NULL,
  password varchar(255) not null
);

create table brand (
  id int primary key auto_increment not null,
  label varchar(255) not null
);
create table socket (
  id int primary key auto_increment not null,
  label varchar(255) not null
);

create table model (
  id int primary key auto_increment not null,
  label varchar(255) not null,
  socket_id int not null,
  brand_id int not null,
  CONSTRAINT Foreign Key (socket_id) REFERENCES socket(id),
  CONSTRAINT Foreign Key (brand_id) REFERENCES brand(id)
);

CREATE table car (
  id int primary key auto_increment not null,
  brand_id int not null,
  model_id int not null,
  socket_id int not null,
  CONSTRAINT Foreign Key (brand_id) REFERENCES brand(id),
  CONSTRAINT Foreign Key (model_id) REFERENCES model(id),
  CONSTRAINT Foreign Key (socket_id) REFERENCES socket(id)
);






insert into brand (label )
values
  ( "Renault"),
  ( "Wolkswagen"),
  ( "Lexus"),
  ( "tesla"),
  ( "Peugeot");

  insert into socket(label)
values
 ("type 1"),
 ("type 2"),
 ("type 3"),
 ("type Chademo");

  insert into model (label, socket_id, brand_id )
values
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


