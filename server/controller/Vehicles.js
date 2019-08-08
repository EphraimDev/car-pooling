import jsonResponse from '../helper/responseHandler';
import { findVehicleByPlateNo, createVehicle } from '../utils/queries';
import { uploadImage } from '../utils/upload';

/**
 * @exports
 * @class VehicleController
 */
class VehicleController {
  /**
   * Update user profile
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async addVehicle(req, res) {
    const {
        number_plate, manufacturer, model, year, capacity, color
      } = req.body;
  
      const findVehicle = await findVehicleByPlateNo(number_plate);
  
      if (findVehicle.rowCount >= 1) {
        return jsonResponse.error(res, 'error', 409, 'A vehicle with same plate number already exists');
      }
  
      const img = uploadImage(req);
      const newVehicle = await createVehicle(req.user.user_id, number_plate, manufacturer, model, year, capacity, color, img);
  
      const data = {
        ...newVehicle.rows[0],
      };
  
      return jsonResponse.success(res, 'success', 201, data);
    }

}

export default VehicleController;
