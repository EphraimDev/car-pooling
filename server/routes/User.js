import express from 'express';
import UserController from '../controller/User';
import authorization from '../middlewares/auth';
import upload from '../utils/multer';
import user from '../validations/user';

const router = express.Router();

router.patch('/:userId', authorization.authenticate, authorization.authorize, upload.single('image'), user, UserController.updateProfile);
router.get('/:userId', authorization.authenticate, authorization.authorize, UserController.viewProfile);

export default router;
