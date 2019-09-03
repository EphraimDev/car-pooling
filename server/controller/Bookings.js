import jsonResponse from '../helper/responseHandler';
import {
  findTripById,
  bookTrip,
  viewBooking,
  viewBookings
} from '../utils/queries';

/**
 * @exports
 * @class BookingsController
 */
class BookingsController {
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

      let bookings = await viewBooking(tripId);
      seatNumber = bookings.rows.length + 1;

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
  /**
   * View all booked trips
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async bookings(req, res) {      
      let booking = await viewBookings(req.user.user_id);
      if (booking.rows.length <=0) {
        return jsonResponse.error(res, 'error', 404, 'No bookings for this user');
      }
      return jsonResponse.success(res, 'success', 200, booking.rows);
    
  }
}

export default BookingsController;
