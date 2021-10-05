import * as yup from 'yup';
import db from '../database/models/index.js';

export default class Validate {
    static async registerData(req, res, next) {
        const schema = yup.object().shape({
            name: yup
                .string()
                .required('Name is required')
                .min(1, 'Name cannot be an empty field'),

            email: yup
                .string()
                .email('Must be an email')
                .required('Email is required'),

            password: yup
                .string()
                .required('Password is required')
                .min(8, 'Minimum 8 characters')
                .strict(true)
                .matches(RegExp('(.*[a-z].*)'), 'Minuscule is required')
                .matches(RegExp('(.*[A-Z].*)'), 'Capital is required')
                .matches(RegExp('(.*\\d.*)'), 'Number is required'),

            passwordConfirm: yup
                .string()
                .required('Password validation is required')
                .when('password', {
                    is: (value) => value.length > 0,
                    then: yup
                        .string()
                        .oneOf([yup.ref('password')], 'Incorrect password'),
                }),
        });
        try {
            await schema.validate(req.body, { abortEarly: false });

            const verify = await db.User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (verify !== null) {
                return res.status(401).json({
                    status: 'ERR',
                    description: 'user exists',
                });
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
