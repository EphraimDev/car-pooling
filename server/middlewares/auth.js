import jwt from 'jsonwebtoken';
import secret from '../config/jwt';

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
}

export default Authorization;
