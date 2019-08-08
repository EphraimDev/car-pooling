import Joi from '@hapi/joi';
import { vehicleSchema } from '../utils/joi';
import JSONResponse from '../helper/responseHandler';


class VehicleValidations{
  static add(req, res, next) {
    const data = req.body;
    const { error } = Joi.validate(data, vehicleSchema);

    const valid = error == null;

    if (!valid) {
      return JSONResponse.error(res, 'error', 422, error.details[0].message);
    }

    return next();
  }
}

export default VehicleValidations;
