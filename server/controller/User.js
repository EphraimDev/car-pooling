import bcrypt from 'bcrypt';
import jsonResponse from '../helper/responseHandler';
import { updateUser } from '../utils/queries';
import { uploadImage } from '../utils/upload';

/**
 * @exports
 * @class UserController
 */
class UserController {
  /**
   * Update user profile
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async updateProfile(req, res) {
    const { userId } = req.params;

      const {
        firstname, lastname, admin, pass, street, city, state, country, dob,
      } = await UserController.bodyParams(req);

      const image = await uploadImage(req, req.user.img);

      const updatedUser = await updateUser(
        firstname, lastname, pass, image, admin, street, city, state, country, dob, userId,
      );

      return jsonResponse.success(res, 'success', 200, updatedUser.rows[0]);
    
  }

  /**
   * View user profile
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async viewProfile(req, res){
    
    return jsonResponse.success(res, 'success', 200, req.user);
  }

  static async bodyParams(req) {
    const {
      first_name, last_name, is_admin, password, street, city, state, country, dob,
    } = req.body;
    
    const findUser = req.user;

    const firstname = first_name !== undefined ? first_name : findUser.first_name;
    const lastname = last_name !== undefined ? last_name : findUser.last_name;
    const admin = is_admin !== undefined ? is_admin : findUser.is_admin;
    const pass = password !== undefined ? await bcrypt.hashSync(password, 10)
      : findUser.password;

    return {
      firstname, lastname, admin, pass, street, city, state, country, dob,
    };
  }
}

export default UserController;
