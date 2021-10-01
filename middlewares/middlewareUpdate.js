import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import db from '../database/models/index.js';

export default class UpdateValidator {
    static async validade(req, res, next) {
        const schema = yup.object().shape({
            name: yup.string(),
            email: yup.string().email('Must be a valid email'),
            password: yup.string()
                .matches(RegExp('(.*[a-z].*)'), {
                    excludeEmptyString: true,
                    message: 'Minuscule is required',
                })
                .matches(RegExp('(.*[A-Z].*)'), {
                    excludeEmptyString: true,
                    message: 'Capital is required',
                })
                .matches(RegExp('(.*\\d.*)'), {
                    excludeEmptyString: true,
                    message: 'Number is required',
                })
                .matches(/.{8,}/, {
                    excludeEmptyString: true,
                    message: 'Password must be 8 characters',
                }),
            passwordConfirm: yup.string()
                .when('password', {
                    is: (value) => value.length >= 0,
                    then: yup.string().oneOf([yup.ref('password')], 'Incorrect password'),
                }),
            oldPassword: yup.string()
                .when('password', {
                    is: (value) => value.length > 0,
                    then: yup.string().required('oldPassword is required'),
                }),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });

            const {
                email, oldPassword,
            } = req.body;

            const user = await db.User.findByPk(req.userAuth.id);

            if (email === user.email) {
                const userExists = await db.User.findOne({ where: { email } });

                if (userExists) {
                    return res.status(400).json({
                        status: 'ERR',
                        description: 'User already exists',
                    });
                }
            }

            if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
                return res.status(401).json({
                    status: 'ERR',
                    description: 'Password does not match',
                });
            }

            for (const updated in req.body) {
                if (!req.body[updated]) req.body[updated] = undefined;
            }

            next();
        } catch (error) {
            return res.status(400).json({
                status: 'ERR',
                description: 'Validation fails',
                errors: error.errors,
            });
        }
    }
}
