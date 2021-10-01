import express from 'express';
import path, { resolve } from 'path';
import createError from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fs from 'fs';
import SwaggerUI from 'swagger-ui-express';

import userRoutes from './routes/user.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class EntryPoint {
    constructor() {
        this.app = express();
        this.middlewares();
        this.checkSecure();
        this.routes();
    }

    middlewares() {
        this.app.enable('trust proxy');
        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(
            '/files',
            express.static(resolve(__dirname, 'public', 'uploads')),
        );
    }

    routes() {
        this.app.use('/user', userRoutes);
        this.app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'))));
        this.error404();
    }

    checkSecure() {
        this.app.use((req, res, next) => {
            req.secure ? next() : res.json({
                status: 'ERR',
                description: `HTTP route request - would like to try: https://${req.headers.host}${req.url}`,
                url: `https://${req.headers.host}${req.url}`,
            });
        });
    }

    error404() {
        this.app.use((req, res, next) => {
            next(createError(404));
        });
    }
}
