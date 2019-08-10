import express from 'express';
import VehicleController from '../controller/Vehicles';
import authorization from '../middlewares/auth';
import upload from '../utils/multer';
import vehicle from '../validations/vehicle';

const router = express.Router();

router.post('/', authorization.authenticate, upload.single('image'), vehicle, VehicleController.addVehicle);
router.patch('/:vehicleId', authorization.authenticate, upload.single('image'), vehicle, VehicleController.update);
router.get('/:vehicleId', authorization.authenticate, VehicleController.view);

export default router;