import express from 'express';
import auth from './Auth';
import user from './User';
import vehicle from './Vehicle';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/vehicles', vehicle)

export default router;
