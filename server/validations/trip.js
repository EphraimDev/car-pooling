import Joi from '@hapi/joi';
import { tripSchema } from '../utils/joi';
import JSONResponse from '../helper/responseHandler';


const trip = (req, res, next) => {
    const data = req.body;
    const { error } = Joi.validate(data, tripSchema);

    const valid = error == null;

    if (!valid) {
      return JSONResponse.error(res, 'error', 422, error.details[0].message);
    }

    return next();
}

export default trip;
