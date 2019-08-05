import Joi from '@hapi/joi';
import { signupSchema, signinSchema } from '../utils/joi';
import JSONResponse from '../helper/responseHandler';


class AuthValidations {
  static signup(req, res, next) {
    const data = req.body;
    const { error } = Joi.validate(data, signupSchema);

    const valid = error == null;

    if (!valid) {
      return JSONResponse.error(res, 'error', 422, error.details[0].message);
    }

    return next();
  }

  static signin(req, res, next) {
    const data = req.body;
    const { error } = Joi.validate(data, signinSchema);

    const valid = error == null;

    if (!valid) {
      return JSONResponse.error(res, 'error', 422, error.details[0].message);
    }

    return next();
  }
}

export default AuthValidations;
