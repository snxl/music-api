import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default class JsonWebToken {
    static async createToken(data) {
        return promisify(jwt.sign)(data, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRES,
        });
    }

    static async readToken(data) {
        return promisify(jwt.verify)(data, process.env.TOKEN_SECRET);
    }
}
