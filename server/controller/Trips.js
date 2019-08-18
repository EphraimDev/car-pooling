import jsonResponse from '../helper/responseHandler';
import {
  findVehicleByPlateNo,
  createVehicle,
  findVehicleById,
  updateVehicle,
  deleteVehicle,
  createTrip,
  findTripById,
  cancelTrip,
  updateTrip
} from '../utils/queries';
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
    const { vehicle, origin, destination, date, time, fare } = req.body;
    const findVehicle = await findVehicleById(vehicle);

    if (findVehicle.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Vehicle does not exist');
    }

    if (findVehicle.rows[0].user_id !== req.user.user_id)
      return jsonResponse.error(res, 'error', 401, 'Unauthorized access');

    //   const currentDateTime = new Date();
    //   const tripDate = new Date(date + ' ' + time);
    //   console.log(currentDateTime <= tripDate, currentDateTime, tripDate);
    //   return;

    const newTrip = await createTrip(
      req.user.user_id,
      vehicle,
      origin,
      destination,
      date,
      time,
      fare
    );

    const data = {
      ...newTrip.rows[0]
    };

    return jsonResponse.success(res, 'success', 201, data);
  }
  /**
   * Find trip data
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async view(req, res) {
    const { tripId } = req.params;

    const findTrip = await findTripById(tripId);

    if (findTrip.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Trip does not exist');
    }

    return jsonResponse.success(res, 'success', 200, findTrip.rows[0]);
  }
  /**
   * Cancel trip
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async cancel(req, res) {
    const { tripId } = req.params;
    const findTrip = await findTripById(tripId);

    if (findTrip.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Trip not found');
    }

    if (findTrip.rows[0].user_id !== req.user.user_id)
      return jsonResponse.error(res, 'error', 401, 'Unauthorized access');
    if (findTrip.rows[0].status === 'Pending') {
      await cancelTrip(tripId);
          return jsonResponse.success(res, 'success', 200, req.user);

    } else {
      return jsonResponse.error(res, 'error', 401, 'Trip cannot be cancelled');
    }
  }
  /**
   * Update trip
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async update(req, res) {
    const { origin, destination, date, time, fare } = req.body;
    const { tripId } = req.params;

    const findTrip = await findTripById(tripId);

    if (findTrip.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Trip does not exist');
    }

    if (findTrip.rows[0].user_id !== req.user.user_id) {
      return jsonResponse.error(res, 'error', 401, 'Unauthorized user');
    }
    const vehicleId = findTrip.rows[0].vehicle_id;
    if (findTrip.rows[0].status === 'Pending') {
      const result = await updateTrip(
        vehicleId,
        origin,
        destination,
        date,
        time,
        fare,
        tripId
      );
      return jsonResponse.success(res, 'success', 200, result.rows[0]);
    } else {
      return jsonResponse.error(res, 'error', 401, 'Trip cannot be updated');
    }
 }
}

export default TripController;
