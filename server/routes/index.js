import express from 'express';
import auth from './Auth';
import user from './User';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);

export default router;
