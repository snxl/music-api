import db from '../database/models/index.js';

export default class DeleteMiddleware {
    static async validate(req, res, next) {
        try {
            if (!Number(req.params.id)) {
                return res.status(400).json({
                    status: 'ERR',
                    description: 'id parameter must be a number',
                });
            }

            const { userId } = await db.Song.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if (userId !== req.userAuth.id) {
                return res.status(401).json({
                    status: 'ERR',
                    description: 'User not authorized to delete music from other users',
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
