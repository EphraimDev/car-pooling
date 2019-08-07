import Joi from '@hapi/joi';
import { updateUserSchema } from '../utils/joi';
import JSONResponse from '../helper/responseHandler';


class UserValidations {
  static updateUser(req, res, next) {
    const data = req.body;
    const { error } = Joi.validate(data, updateUserSchema);

    const valid = error == null;

    if (!valid) {
      return JSONResponse.error(res, 'error', 422, error.details[0].message);
    }

    return next();
  }
}

export default UserValidations;
