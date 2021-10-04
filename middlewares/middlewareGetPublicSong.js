import db from '../database/models/index.js';

export default class GetPublicSongMiddleware {
    static async validate(req, res, next) {
        try {
            const verify = await db.Song.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if (verify === null) {
                return res.status(400).json({
                    status: 'ERR',
                    description: 'Song does not exist',
                });
            }

            if (verify.adminStatus) {
                return res.status(401).json({
                    status: 'ERR',
                    description: 'Music blocked by administrators',
                });
            }

            if (verify.private) {
                return res.status(401).json({
                    status: 'ERR',
                    description: 'Music blocked by creator',
                });
            }

            next();
        } catch (error) {
            return res.status(400).json({
                status: 'ERR',
                description: 'Failed to validate user data',
            });
        }
    }
}
