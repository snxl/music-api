import * as yup from 'yup';
import db from '../database/models/index.js';

export default class UpdatedSong {
    static async validate(req, res, next) {
        const musicGenre = ['blues', 'country', 'eletrônica', 'gospel', 'pop', 'rock', 'sertanejo', 'outros'];
        const schema = yup.object().shape({
            tittle: yup
                .string(),
            artist: yup
                .string(),
            songwriter: yup
                .string(),
            genre: yup
                .string(),
            private: yup
                .string()
                .matches(RegExp('^(true|false)$'), {
                    excludeEmptyString: true,
                    message: 'Must be a boolean',
                }),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });

            if (req.body.genre
                 && !musicGenre.find((elm) => elm.toLocaleLowerCase() === req.body.genre.toLocaleLowerCase())) {
                return res.status(400).json({
                    status: 'ERR',
                    description: 'Unsupported file type for operation',
                });
            }

            for (const updated in req.body) {
                if (!req.body[updated]) req.body[updated] = undefined;
            }

            if (!Number(req.params.id)) {
                return res.status(400).json({
                    status: 'ERR',
                    description: 'id parameter must be a number',
                });
            }

            const { userId } = await db.Song.findOne({
                where: {
                    id: Number(req.params.id),
                },
            });

            if (userId !== req.userAuth.id) {
                return res.status(401).json({
                    status: 'ERR',
                    description: 'User not authorized to update data',
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
