import express from 'express';
import auth from './Auth';
import user from './User';
import vehicle from './Vehicle';
import trip from './Trip';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/vehicles', vehicle)
router.use('/trips', trip)

export default router;
