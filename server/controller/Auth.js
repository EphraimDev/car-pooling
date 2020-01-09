import bcrypt from 'bcrypt';
import Authorization from '../middlewares/auth';
import jsonResponse from '../helper/responseHandler';
import { findUserByEmail, createUser } from '../utils/queries';

/**
 * @exports
 * @class AuthController
 */
class AuthController {
  /**
   * Creates a new user
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async signup(req, res) {
    const {
      first_name, last_name, email, password, is_admin,
    } = req.body;

    const findUser = await findUserByEmail(email);

    if (findUser.rowCount >= 1) {
      return jsonResponse.error(res, 'error', 409, 'User exists already');
    }

    const admin = is_admin === 'true';
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = await createUser(email, first_name, last_name, hashedPassword, admin);

    const token = await Authorization.generateToken(newUser.rows[0]);

    const data = {
      token,
      ...newUser.rows[0],
    };

    return jsonResponse.success(res, 'success', 201, data);
  }

  /**
   * Login a user
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async signin(req, res) {
    const { email, password } = req.body;

    const findUser = await findUserByEmail(email);

    if (findUser.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'User does not exist');
    }

    const verify = await AuthController.verifyPassword(password, findUser.rows[0].password);

    if (verify === true) {
      const token = await Authorization.generateToken(findUser.rows[0]);

      const data = {
        token,
        ...findUser.rows[0],
      };

      return jsonResponse.success(res, 'success', 200, data);
    }

    return jsonResponse.error(res, 'error', 401, 'Email or password incorrect');
  }

  /**
   * @method verifyPassword
   * @memberof Users
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  static loadUser(req, res) {
    return jsonResponse.success(res, 'success', 200, req.user)
  }
}

export default AuthController;
