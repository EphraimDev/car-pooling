import express from 'express';
import auth from '../controller/Auth';
import user from '../validations/user';
import authorization from '../middlewares/auth';

const router = express.Router();

router.post('/signup', user, auth.signup);
router.post('/signin', user, auth.signin);
router.get('/', authorization.authenticate, auth.loadUser);

export default router;
