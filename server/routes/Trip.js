import express from 'express';
import TripController from '../controller/Trips';
import authorization from '../middlewares/auth';
import trip from '../validations/trip';

const router = express.Router();

router.post('/', authorization.authenticate, trip, TripController.create);
router.patch('/tripId', authorization.authenticate, trip, TripController.update);

export default router;