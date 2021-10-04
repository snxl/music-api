import { Router } from 'express';
import Authenticator from '../middlewares/auth.js';
import * as multer from '../middlewares/multerMiddleware.js';
import Files from '../controller/filesController.js';
import InsertSong from '../middlewares/middlewareinsertSong.js';
import DeleteMiddleware from '../middlewares/middlewareDeleteSong.js';
import UpdatedSong from '../middlewares/middlewareUpdateSong.js';

const router = Router();

router.post('/', Authenticator.auth, multer.uploadSongs.single('song'), InsertSong.validate, Files.insertSong);
router.delete('/:id', Authenticator.auth, DeleteMiddleware.validate, Files.detroySong);
router.put('/:id', multer.uploadText.none(), Authenticator.auth, UpdatedSong.validate, Files.updatedSong);
router.get('/:id', Authenticator.auth, Files.getPrivaeSong);
router.get('/public/:id', Files.getPublicSongs);

export default router;
