import express from 'express';
import vehicle from '../controller/Vehicles';
import authorization from '../middlewares/auth';
import upload from '../utils/multer';
import VehicleValidations from '../validations/vehicle';

const router = express.Router();

router.post('/', authorization.authenticate, upload.single('image'), VehicleValidations.add, vehicle.addVehicle);
router.patch('/:vehicleId', authorization.authenticate, upload.single('image'), VehicleValidations.add, vehicle.update);

export default router;