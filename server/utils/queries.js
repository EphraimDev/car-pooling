import pool from '../model';
import query from '../helper/queries';
import moment from './moment';

export const findUserByEmail = async (email) => {
  const user = await pool.query(query.findUserByEmail, [email.toLowerCase()]);

  return user;
};

export const createUser = async (email, first_name, last_name, password, admin) => {
  const user = await pool.query(query.createUser, [email.toLowerCase(), first_name,
    last_name, password, admin, moment.createdAt]);

  return user;
};

export const updateUser = async (
  firstname, lastname, pass, image, admin, street, city, state, country, dob, userId,
) => {
  const user = await pool.query(query.updateUser,
    [firstname, lastname, pass, image, admin, street, city,
      state, country, dob, moment.updatedAt, userId]);

  return user;
};

export const findVehicleByPlateNo = async (number) => {
  const vehicle = await pool.query(query.findVehicleByPlateNo, [number.toLowerCase()]);

  return vehicle;
};

export const createVehicle = async (id, number_plate, manufacturer,
  model, year, capacity, color, img) => {
  const vehicle = await pool.query(query.createVehicle, [id,number_plate.toLowerCase(), manufacturer,
    model, year, capacity, color, img, moment.createdAt]);

  return vehicle;
};

export const findVehicleById = async (id) => {
  const vehicle = await pool.query(query.findVehicleById, [id]);

  return vehicle;
}

export const updateVehicle = async (
  number_plate, manufacturer, model, year, capacity, color, img, vehicle_id
) => {
  const vehicle = await pool.query(query.updateVehicle,
    [number_plate, manufacturer, model, year, capacity, color, img,moment.updatedAt, vehicle_id]);

  return vehicle;
};

export const deleteVehicle = async (id) => {
  const vehicle = await pool.query(query.deleteVehicle, [id]);

  return vehicle;
}

export const createTrip = async (id, vehicle, origin, destination, date, time, fare) => {
  const trip = await pool.query(query.createTrip, [id,vehicle, origin, destination, date, time, fare, moment.createdAt]);

  return trip;
};
