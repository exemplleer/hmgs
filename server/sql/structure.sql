CREATE TABLE person (
  id              serial,
  first_name      varchar(255) NOT NULL,
  last_name       varchar(255) NOT NULL,
  role_value      varchar(64) DEFAULT 'guest' NOT NULL,
  phone           varchar(20) NOT NULL,
  email           varchar(255)
);

ALTER TABLE person ADD CONSTRAINT pk_person PRIMARY KEY (id);

CREATE UNIQUE INDEX ak_person_phone ON person (phone);

CREATE TABLE booking (
  id            serial,
  person_id     integer NOT NULL,
  total_price   numeric(18, 2) DEFAULT 0 NOT NULL,
  status_value  varchar(64) NOT NULL
);

ALTER TABLE booking ADD CONSTRAINT pk_booking PRIMARY KEY (id);
ALTER TABLE booking ADD CONSTRAINT fk_person_booking FOREIGN KEY (person_id) REFERENCES person (id);

CREATE TABLE payment (
  id            serial,
  booking_id    integer NOT NULL,
  pay_date      timestamp NOT NULL,
  pay_method    varchar(64) NOT NULL,
  pay_amount    numeric(18, 2) NOT NULL,
  status_value  varchar(64) NOT NULL
);

ALTER TABLE payment ADD CONSTRAINT pk_payment PRIMARY KEY (id);
ALTER TABLE payment ADD CONSTRAINT fk_booking_payment FOREIGN KEY (booking_id) REFERENCES booking (id);

CREATE TABLE room (
  id        serial,
  title     varchar(255) NOT NULL,
  price     numeric(18, 2) NOT NULL,
  capacity  integer NOT NULL,
  numbr     integer NOT NULL,
  descr     text
);

ALTER TABLE room ADD CONSTRAINT pk_room PRIMARY KEY (id);

CREATE UNIQUE INDEX ak_room_numbr ON room (numbr);

CREATE TABLE room_status (
  id            serial,
  room_id       integer NOT NULL,
  begin_date    timestamp NOT NULL,
  end_date      timestamp NOT NULL
  is_avalible   boolean NOT NULL,
);

ALTER TABLE room_status ADD CONSTRAINT pk_room_status PRIMARY KEY (id);
ALTER TABLE room_status ADD CONSTRAINT fk_room_room_status FOREIGN KEY (room_id) REFERENCES room (id);

CREATE TABLE amenity (
  id            serial,
  title         varchar(255) NOT NULL,
  is_avalible   boolean NOT NULL,
  descr         text
);

ALTER TABLE amenity ADD CONSTRAINT pk_amenity PRIMARY KEY (id);

CREATE TABLE room_amenity (
  id          serial,
  room_id     integer NOT NULL,
  amenity_id  integer NOT NULL,
  price       numeric(18, 2) NOT NULL
);

ALTER TABLE room_amenity ADD CONSTRAINT pk_room_amenity PRIMARY KEY (id);
ALTER TABLE room_amenity ADD CONSTRAINT fk_room_room_amenity FOREIGN KEY (room_id) REFERENCES room (id);
ALTER TABLE room_amenity ADD CONSTRAINT fk_amenity_room_amenity FOREIGN KEY (amenity_id) REFERENCES amenity (id);

CREATE TABLE booking_room (
  id            serial,
  booking_id    integer NOT NULL,
  room_id       integer NOT NULL,
  people_num    integer NOT NULL,
  begin_date    timestamp NOT NULL,
  end_date      timestamp NOT NULL,
  status_value  varchar(64) NOT NULL
);

ALTER TABLE booking_room ADD CONSTRAINT pk_booking_room PRIMARY KEY (id);
ALTER TABLE booking_room ADD CONSTRAINT fk_booking_booking_room FOREIGN KEY (booking_id) REFERENCES booking (id);
ALTER TABLE booking_room ADD CONSTRAINT fk_room_booking_room FOREIGN KEY (room_id) REFERENCES room (id);

CREATE TABLE booking_amenity (
  booking_room_id integer NOT NULL,
  room_amenity_id integer NOT NULL
);

ALTER TABLE booking_amenity ADD CONSTRAINT fk_booking_room FOREIGN KEY (booking_room_id) REFERENCES booking_room (id);
ALTER TABLE booking_amenity ADD CONSTRAINT fk_booking_room_amenity FOREIGN KEY (room_amenity_id) REFERENCES room_amenity (id);
ALTER TABLE booking_amenity ADD CONSTRAINT pk_booking_amenity PRIMARY KEY (booking_room_id, room_amenity_id);
