import express from 'express';
import auth from '../controller/Auth';
import AuthValidations from '../validations/auth';

const router = express.Router();

router.post('/signup', AuthValidations.signup, auth.signup);
router.post('/signin', AuthValidations.signin, auth.signin);

export default router;
