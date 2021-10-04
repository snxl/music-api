import multer from 'multer';
import * as multerConfig from '../configs/multer.js';

export const uploadAvatar = multer({ storage: multerConfig.storage });

export const uploadSongs = multer({ storage: multerConfig.storage });

export const uploadText = multer({ storage: null });
