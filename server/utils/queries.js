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
