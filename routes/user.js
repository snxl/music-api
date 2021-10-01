import { Router } from 'express';
import UserController from '../controller/userController.js';
import Validate from '../middlewares/middlewareRegister.js';
import ValidateLogin from '../middlewares/middlewareLogin.js';
import UpdateValidator from '../middlewares/middlewareUpdate.js';
import * as multer from '../middlewares/multerMiddleware.js';
import Authenticator from '../middlewares/auth.js';

const router = Router();

const text = multer.uploadText.any();
const avatar = multer.uploadAvatar.single('avatar');

router.post('/login', text, ValidateLogin.validate, UserController.loginUser);
router.get('/allusers', Authenticator.auth, UserController.getAll);
router.get('/', Authenticator.auth, UserController.getProfile);
router.post('/', text, Validate.registerData, UserController.register);
router.put('/', avatar, Authenticator.auth, UpdateValidator.validade, UserController.updatedUser);
router.delete('/', Authenticator.auth, UserController.destroyProfile);

export default router;
