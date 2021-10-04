import db from '../database/models/index.js';

export default class AdminValidator {
    static async providerValidate(req, res, next) {
        if (!Number(req.params.id)) {
            return res.status(400).json({
                status: 'ERR',
                description: 'id parameter must be a number',
            });
        }

        if (Number(req.params.id) === req.userAuth.id) {
            return res.status(401).json({
                status: 'ERR',
                description: 'The user must contain another id',
            });
        }

        if (req.userAuth.provider === false) {
            return res.status(403).json({
                status: 'ERR',
                description: 'User needs to be admin',
            });
        }

        const verify = await db.User.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (verify === null) {
            return res.status(400).json({
                status: 'ERR',
                description: 'user does not exist',
            });
        }

        next();
    }

    static async validateFileStatus(req, res, next) {
        if (!Number(req.params.id)) {
            return res.status(400).json({
                status: 'ERR',
                description: 'id parameter must be a number',
            });
        }

        if (req.params.status) {
            if (!(req.params.status === 'true' || req.params.status === 'false')) {
                return res.status(400).json({
                    status: 'ERR',
                    description: 'status parameter must be a boolean',
                });
            }

            req.validateStatus = JSON.parse(req.params.status);
        }

        if (req.userAuth.provider === false) {
            return res.status(403).json({
                status: 'ERR',
                description: 'User needs to be admin',
            });
        }

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

        next();
    }

    static async validateDestroySong(req, res, next) {
        if (!Number(req.params.id)) {
            return res.status(400).json({
                status: 'ERR',
                description: 'id parameter must be a number',
            });
        }

        if (req.userAuth.provider === false) {
            return res.status(403).json({
                status: 'ERR',
                description: 'User needs to be admin',
            });
        }

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

        if (verify.userId === req.userAuth.id) {
            return res.status(401).json({
                status: 'ERR',
                description: 'The user must contain another id',
            });
        }

        next();
    }
}
