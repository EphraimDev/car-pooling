import jsonResponse from '../helper/responseHandler';
import {
  findVehicleById,
  createTrip,
  findTripById,
  viewTrips,
  updateTrip,
  cancelTrip

} from '../utils/queries';

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
    
    if (findTrip.rows[0].status !== 'Pending')
      return jsonResponse.error(res, 'error', 400, 'Trip cannot be cancelled');
    
    const trip = await cancelTrip(tripId);
    return jsonResponse.success(res, 'success', 200, trip.rows[0]);
  }

  /**
   * View all trips data
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async viewAll(req, res) {
    const trips = await viewTrips();

    if (trips.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'No trip found');
    }
    if (trips.rows.map(stat => stat.status === 'Pending')) {
      return jsonResponse.success(res, 'success', 200, trips.rows);
    } else {
      return jsonResponse.error(res, 'error', 404, 'No active trips');
    }
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

    if (findTrip.rows[0].status === 'Cancelled' || findTrip.rows[0].status === 'Ended') {
      return jsonResponse.error(res, 'error', 400, 'Trip is no more active');
    }

    if ((findTrip.rows[0].status === 'Started' && status !== 'Ended') 
    || status === "Cancelled" 
    || (findTrip.rows[0].status === 'Pending' && status !== 'Started')) {
      return jsonResponse.error(res, 'error', 400, 'Invalid trip update');
    }

    const result = await updateTrip(
      vehicle, origin, destination, date, time, fare, status, tripId
    );

    return jsonResponse.success(res, 'success', 200, result.rows[0]);
    
  }
}

export default TripController;
