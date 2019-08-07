import express from 'express';
import user from '../controller/User';
import authorization from '../middlewares/auth';
import upload from '../utils/multer';
import UserValidations from '../validations/user';

const router = express.Router();

router.patch('/:userId', authorization.authenticate, authorization.authorize, upload.single('image'), UserValidations.updateUser, user.updateProfile);
router.get('/:userId', authorization.authenticate, authorization.authorize, user.viewProfile);

export default router;
