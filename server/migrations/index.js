/* eslint-disable no-console */
import pool from '../model/index';

const queryText = `DROP TABLE IF EXISTS booking, trip, vehicle, users CASCADE;

  DROP TYPE IF EXISTS action;

  CREATE TYPE action AS ENUM
  ('Pending', 'Started', 'Cancelled', 'Ended');
  
  CREATE TABLE users
  (
      user_id SERIAL NOT NULL,
      email VARCHAR(128) NOT NULL,
      first_name VARCHAR(128) NOT NULL,
      last_name VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      img VARCHAR(500),
      dob DATE,
      street VARCHAR(500),
      city VARCHAR(500),
      state VARCHAR(500),
      country VARCHAR(500),
      is_admin BOOLEAN NOT NULL,
      deleted BOOLEAN Default '0',
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP,
      PRIMARY KEY(user_id)
  );
  
  CREATE TABLE vehicle
  (
      vehicle_id SERIAL NOT NULL,
      user_id INT REFERENCES users(user_id) NOT NULL,
      number_plate VARCHAR(128),
      manufacturer VARCHAR(128),
      model VARCHAR(128),
      year INT,
      capacity INT,
      color VARCHAR(128),
      img VARCHAR(500),
      deleted BOOLEAN Default '0',
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP,
      PRIMARY KEY(vehicle_id)
  );
  
  CREATE TABLE trip
  (
      trip_id SERIAL NOT NULL,
      user_id INT REFERENCES users(user_id) NOT NULL,
      vehicle_id INT REFERENCES vehicle(vehicle_id) NOT NULL,
      origin VARCHAR(500) NOT NULL,
      destination VARCHAR(500) NOT NULL,
      trip_date VARCHAR(20) NOT NULL,
      trip_time VARCHAR(20) NOT NULL,
      fare VARCHAR(128) NOT NULL,
      status action default 'Pending',
      deleted BOOLEAN Default '0',
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP,
      PRIMARY KEY(trip_id)
  );
  
  CREATE TABLE booking
  (
      booking_id SERIAL NOT NULL,
      trip_id INT REFERENCES trip(trip_id) NOT NULL,
      user_id INT REFERENCES users(user_id) NOT NULL,
      seat_number INT,
      deleted BOOLEAN Default '0',
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP,
      PRIMARY KEY(booking_id)
  );`;

pool
  .query(queryText)
  .then(() => {
    pool.end();
  })
  .catch((err) => {
    pool.end();
  });
