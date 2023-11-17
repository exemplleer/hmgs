CREATE USER hmgs_admin WITH PASSWORD 'password';

CREATE DATABASE hotel_management_system WITH OWNER hmgs_admin ENCODING 'UTF8';

GRANT ALL ON DATABASE hotel_management_system TO hmgs_admin;
