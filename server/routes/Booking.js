import express from 'express';
import BookingsController from '../controller/Bookings';
import authorization from '../middlewares/auth';

const router = express.Router();


router.post(
  '/:tripId',
  authorization.authenticate,
  BookingsController.book
);
router.get(
  '/',
  authorization.authenticate,
  BookingsController.bookings
);

export default router;
