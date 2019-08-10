import Joi from '@hapi/joi';
import { userSchema } from '../utils/joi';
import JSONResponse from '../helper/responseHandler';


const user = (req, res, next) => {
    const data = req.body;
    const { error } = Joi.validate(data, userSchema);

    const valid = error == null;

    if (!valid) {
      return JSONResponse.error(res, 'error', 422, error.details[0].message);
    }

    return next();
}

export default user;
