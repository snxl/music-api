import { Router } from 'express';
import * as multer from '../middlewares/multerMiddleware.js';
import Authenticator from '../middlewares/auth.js';

const router = Router();

// const text = multer.uploadText.any();

export default router;
