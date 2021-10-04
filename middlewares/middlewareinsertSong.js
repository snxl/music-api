import * as yup from 'yup';

export default class InsertSong {
    static async validate(req, res, next) {
        const mimeTypesSongs = ['audio/flac', 'audio/mpegurl', 'audio/aac', 'audio/wav', 'audio/ogg', 'audio/mpeg'];
        const musicGenre = ['blues', 'country', 'eletrônica', 'gospel', 'pop', 'rock', 'sertanejo', 'outros'];

        const schema = yup.object().shape({
            tittle: yup
                .string()
                .required('tittle is required'),
            artist: yup
                .string()
                .required('artist is required'),
            songwriter: yup
                .string()
                .required('songwriter is required'),
            genre: yup
                .string()
                .required('genre is required'),
            private: yup
                .boolean(),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });

            if (!mimeTypesSongs.find((elm) => elm === req.file.mimetype)) {
                return res.status(400).json({
                    status: 'ERR',
                    description: 'Unsupported file type for operation',
                });
            }

            if (!musicGenre.find((elm) => elm
                .toLocaleLowerCase()
                === req
                    .body
                    .genre
                    .toLocaleLowerCase())) {
                return res.status(400).json({
                    status: 'ERR',
                    description: 'Unsupported genre type',
                });
            }

            req.body.private = JSON.parse(req.body.private.toLowerCase().trim());

            next();
        } catch (error) {
            return res.status(400).json({
                status: 'ERR',
                description: error.errors,
            });
        }
    }
}
