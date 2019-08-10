import jsonResponse from '../helper/responseHandler';
import { findVehicleByPlateNo, createVehicle, findVehicleById, updateVehicle } from '../utils/queries';
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

    /**
   * Update vehicle
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async update(req, res) {
    const { vehicleId } = req.params;
    const {
      number_plate, manufacturer, model, year, capacity, color
    } = req.body;

    const findVehicle = await findVehicleById(vehicleId);

    if (findVehicle.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Vehicle does not exist');
    }

    if (findVehicle.rows[0].user_id !== req.user.user_id) {
      return jsonResponse.error(res, 'error', 401, 'Unauthorized user');
    }

      const img = await uploadImage(req, findVehicle.rows[0].img);

      const result = await updateVehicle(
        number_plate, manufacturer, model, year, capacity, color, img, vehicleId
      );

      return jsonResponse.success(res, 'success', 200, result.rows[0]);
    
  }

  /**
   * View vehicle data
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async view(req, res){
    const { vehicleId } = req.params;

    const findVehicle = await findVehicleById(vehicleId);

    if (findVehicle.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Vehicle does not exist');
    }
    
    return jsonResponse.success(res, 'success', 200, findVehicle.rows[0]);
  }

}

export default VehicleController;
