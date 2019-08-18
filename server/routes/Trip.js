import express from 'express';
import TripController from '../controller/Trips';
import authorization from '../middlewares/auth';
import trip from '../validations/trip';

const router = express.Router();

router.post('/', authorization.authenticate, trip, TripController.create);
router.get('/:tripId', authorization.authenticate,TripController.view);
router.delete('/:tripId', authorization.authenticate,TripController.cancel);
router.patch(
  '/:tripId',
  authorization.authenticate,
  trip,
  TripController.update
);

export default router;