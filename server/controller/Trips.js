import jsonResponse from '../helper/responseHandler';
import { findVehicleById, createTrip, findTripById, updateTrip } from '../utils/queries';

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

     /**
   * Update trip
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async update(req, res) {
    const { tripId } = req.params;
    const {
      vehicle, origin, destination, date, time, fare, status
    } = req.body;

    const findTrip = await findTripById(tripId);

    if (findTrip.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Trip does not exist');
    }

    if (findTrip.rows[0].user_id !== req.user.user_id) {
      return jsonResponse.error(res, 'error', 401, 'Unauthorized user');
    }

    if (findTrip.rows[0].status !== 'Pending' && status === 'Pending') {
      return jsonResponse.error(res, 'error', 400, 'Trip cannot be changed back to pending');
    }

     if (findTrip.rows[0].status !== 'Pending' && (findTrip.rows[0].origin !== origin 
      || findTrip.rows[0].destination !== destination 
      || findTrip.rows[0].trip_date !== date 
      || findTrip.rows[0].trip_time !== time 
      || findTrip.rows[0].fare !== fare)) {
      return jsonResponse.error(res, 'error', 400, 'Trip cannot be modified');
     }

      const result = await updateTrip(
        vehicle, origin, destination, date, time, fare, status, tripId
      );

      return jsonResponse.success(res, 'success', 200, result.rows[0]);
    
  }

}

export default TripController;
