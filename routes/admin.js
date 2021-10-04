import { Router } from 'express';
import Authenticator from '../middlewares/auth.js';
import AdminController from '../controller/admin.js';
import AdminValidator from '../middlewares/adminMiddleware.js';

const router = Router();

router.delete('/user/:id', Authenticator.auth, AdminValidator.providerValidate, AdminController.deleteProfile);
router.delete('/file/:id');
router.patch('/user/:id', Authenticator.auth, AdminValidator.providerValidate, AdminController.toProvider);
router.patch('/file/private/status/:id');
export default router;
