import express from 'express';
import TripController from '../controller/Trips';
import authorization from '../middlewares/auth';
import trip from '../validations/trip';

const router = express.Router();

router.post('/', authorization.authenticate, trip, TripController.create);

export default router;