import multer from 'multer';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import path, { resolve, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const storage = multer.diskStorage({
    destination: resolve(__dirname, '..', 'public', 'uploads'),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, value) => {
            if (err) cb(err);
            return cb(null, value.toString('hex') + extname(file.originalname));
        });
    },
});
