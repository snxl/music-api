import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import db from '../database/models/index.js';

export default class ValidateLogin {
    static async validate(req, res, next) {
        const schema = yup.object().shape({
            email: yup.string().required('Email is required'),
            password: yup.string().required('Password is required'),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });

            const { email, password } = req.body;

            const user = await db.User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({
                    status: 'ERR',
                    description: 'user not found',
                });
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({
                    status: 'ERR',
                    description: 'Password does not match!',
                });
            }

            const { id, name, provider } = user;

            req.user = {
                id, name, email, provider,
            };

            next();
        } catch (error) {
            return res.status(403).json({
                status: 'ERR',
                description: 'Validation fails',
                errors: error.errors,
            });
        }
    }
}
