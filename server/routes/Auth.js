import express from 'express';
import auth from '../controller/Auth';
import user from '../validations/user';

const router = express.Router();

router.post('/signup', user, auth.signup);
router.post('/signin', user, auth.signin);

export default router;
