CREATE TABLE users (
  user_id serial primary key,
  user_name varchar(255) not null,
  user_email varchar(255) not null unique,
  user_password varchar(255) not null
);

CREATE TABLE contact_form (
  contact_form_id serial primary key,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  phone varchar(255) not null,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)