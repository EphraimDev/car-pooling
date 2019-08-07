import jwt from 'jsonwebtoken';
import secret from '../config/jwt';
import JSONResponse from '../helper/responseHandler';
import { findUserByEmail } from '../utils/queries';

/**
 * @exports
 * @class Authorization
 */
class Authorization {
  /**
   * @method generateToken
   * @memberof Authorization
   * @param {object} user
   * @returns {string} token
   * expires in 48 hours
   */
  static async generateToken(user) {
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        password: user.password,
        admin: user.is_admin,
      },
      secret,
      {
        expiresIn: '48h',
      },
    );

    return token;
  }

  /**
   * Authenticate user
   * @method authenticate
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static async authenticate(req, res, next) {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];

      const decoded = await jwt.verify(token, secret);

      const foundUser = await findUserByEmail(decoded.email);

      [req.user] = foundUser.rows;

      return next();
    } catch (err) {
      return JSONResponse.error(res, 'error', 401, 'Token is invalid or not provided');
    }
  }

  /**
   * Authorize user
   * @method authorize
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static async authorize(req, res, next) {
    if (Number(req.params.userId) !== req.user.user_id) {
      return JSONResponse.error(res, 'error', 404, 'User does not exist');
    }

    return next();
  }
}

export default Authorization;
