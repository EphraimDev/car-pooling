import express from 'express';
import auth from './Auth';

const router = express.Router();

router.use('/auth', auth);

export default router;
