import jsonResponse from '../helper/responseHandler';
import {
  findVehicleById,
  createTrip,
  findTripById,
  viewTrips,
  updateTrip,
  bookTrip,
  viewBookings
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
    if (findTrip.rows[0].status === 'Pending') {
      await cancelTrip(tripId);
      return jsonResponse.success(res, 'success', 200, req.user);
    } else {
      return jsonResponse.error(res, 'error', 401, 'Trip cannot be cancelled');
    }
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
    const { vehicle, origin, destination, date, time, fare, status } = req.body;

    console.log(vehicle, origin, destination, date, time, fare, status);

    const findTrip = await findTripById(tripId);

    if (findTrip.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Trip does not exist');
    }

    if (findTrip.rows[0].user_id !== req.user.user_id) {
      return jsonResponse.error(res, 'error', 401, 'Unauthorized user');
    }

    if (
      findTrip.rows[0].status === 'Cancelled' ||
      findTrip.rows[0].status === 'Ended'
    ) {
      return jsonResponse.error(res, 'error', 400, 'Trip is no more active');
    }

    
    if (findTrip.rows[0].status === 'Started' && status !== 'Ended') {
      return jsonResponse.error(res, 'error', 400, 'Invalid trip update');
    }

    const result = await updateTrip(
      vehicle,
      origin,
      destination,
      date,
      time,
      fare,
      status,
      tripId
    );

    return jsonResponse.success(res, 'success', 200, result.rows[0]);
  }
  /**
   * Book a trip
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async book(req, res) {
    const { tripId } = req.params;

    const trip = await findTripById(tripId);

    if (trip.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'No trip found');
    }

    if (trip.rows[0].status === 'Pending') {
      let seatNumber = 0;

      let bookings = await viewBookings(tripId);

      if (bookings.rows.length === 0) seatNumber = 1;
      if (bookings.rows.length === 1) seatNumber = 2;
      if (bookings.rows.length === 2) seatNumber = 3;
      if (bookings.rows.length === 3) seatNumber = 4;
      if (bookings.rows.length === 4) seatNumber = 5;

      if (bookings.rows.length + 1 > trip.rows[0].capacity) {
        return jsonResponse.error(res, 'error', 404, 'Capacity full');
      }
      const booking = await bookTrip(tripId, req.user.user_id, seatNumber);

      return jsonResponse.success(res, 'success', 200, booking.rows);
    } else if (
      trip.rows[0].status === 'Cancelled' ||
      trip.rows[0].status === 'Ended' ||
      trip.rows[0].status === 'Started' 
    ) {
      return jsonResponse.error(res, 'error', 400, 'Trip is no more active');
    } else {
      return jsonResponse.error(res, 'error', 404, 'Unable to book trip');
    }
  }
}

export default TripController;
