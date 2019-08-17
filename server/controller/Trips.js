import jsonResponse from '../helper/responseHandler';
import { findVehicleByPlateNo, createVehicle, findVehicleById, updateVehicle, deleteVehicle, createTrip } from '../utils/queries';
import { uploadImage } from '../utils/upload';

/**
 * @exports
 * @class TripController
 */
class TripController {
  /**
   * Create trip
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async create(req, res) {
    const {
        vehicle, origin, destination, date, time, fare
      } = req.body;
  
      const findVehicle = await findVehicleById(vehicle);
  
      if (findVehicle.rowCount < 1) {
        return jsonResponse.error(res, 'error', 404, 'Vehicle does not exist');
      }

      if (findVehicle.rows[0].user_id !== req.user.user_id) return jsonResponse.error(res, 'error', 401, 'Unauthorized access');

    //   const currentDateTime = new Date();
    //   const tripDate = new Date(date + ' ' + time);
    //   console.log(currentDateTime <= tripDate, currentDateTime, tripDate);
    //   return;
  
      const newTrip = await createTrip(req.user.user_id, vehicle, origin, destination, date, time, fare);
  
      const data = {
        ...newTrip.rows[0],
      };
  
      return jsonResponse.success(res, 'success', 201, data);
    }

}

export default TripController;
