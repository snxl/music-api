import JsonWebToken from '../utils/jwt.js';
import db from '../database/models/index.js';

export default class Authenticator {
    static async auth(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: 'ERR',
                description: 'Token not provided',
            });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decode = await JsonWebToken.readToken(token);

            req.userAuth = decode;

            const user = await db.User.findByPk(decode.id);

            if (user) next();
            else throw new Error();
        } catch (error) {
            return res.status(401).json({
                status: 'ERR',
                error: 'Invalid Token',
            });
        }
    }
}
