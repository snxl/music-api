import JsonWebToken from '../utils/jwt.js';
import db from '../database/models/index.js';

const { Sequelize } = db;

const { Op } = Sequelize;

export default class UserServices {
    static async store(data) {
        try {
            const {
                id, name, email, provider,
            } = await db.User.create(data);

            return {
                status: 'OK',
                token: await JsonWebToken.createToken({
                    id, name, email, provider,
                }),
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Fail to create data',
            };
        }
    }

    static async findProfileWithToken(data) {
        try {
            return {
                status: 'OK',
                description: await db.User.findOne({
                    where: {
                        id: data.id,
                    },
                    attributes: ['id', 'name', 'email', 'provider', 'createdAt', 'updatedAt'],
                    include: [{
                        model: db.File,
                        as: 'avatar',
                        required: false,
                    }, {
                        model: db.Song,
                        as: 'song',
                        required: false,
                    }],
                    order: [['song', 'id', 'ASC']],
                }),
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Fail to get data',
            };
        }
    }

    static async destroy(data) {
        try {
            return {
                status: 'OK',
                affectedRows: await db.User.destroy({
                    where: {
                        id: data.id,
                    },
                }),
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Fail to destroy account',
            };
        }
    }

    static async login(data) {
        try {
            const {
                id, name, email, provider,
            } = await db.User.findOne({
                where: {
                    email: data.email,
                },
                attributes: ['id', 'name', 'email', 'provider', 'createdAt', 'updatedAt'],
            });
            return {
                status: 'OK',
                token: await JsonWebToken.createToken({
                    id, name, email, provider,
                }),
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Fail to create data',
            };
        }
    }

    static async update(unique, file, data) {
        try {
            const user = await db.User.findOne({
                where: {
                    id: unique.id,
                },
                attributes: ['id', 'name', 'email', 'provider', 'createdAt', 'updatedAt'],
                include: [{
                    model: db.File,
                    as: 'avatar',
                    required: false,
                }],
            });

            const fileOperation = {
                id: undefined,
            };

            if (file && !user.avatar) {
                const { id } = await db.File.create({
                    name: file.originalname,
                    path: file.filename,
                });

                fileOperation.id = id;
            } else if (file && user.avatar) {
                const { id } = db.File.update({
                    name: file.originalname,
                    path: file.filename,
                }, {
                    where: {
                        id: user.avatar.id,
                    },
                });

                fileOperation.id = id;
            }
            const userUpdated = await db.User.update({
                ...data,
                avatarId: fileOperation.id,
            }, {
                where: {
                    [Op.or]: [{
                        id: unique.id,
                    }, {
                        email: unique.email,
                    }],
                },
                returning: true,
                plain: true,
            });

            const {
                id, name, email, provider,
            } = userUpdated[1];

            return {
                status: 'OK',
                token: await JsonWebToken.createToken({
                    id, name, email, provider,
                }),
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Fail to update data',
            };
        }
    }

    static async allUser(offset, limit) {
        try {
            return {
                status: 'OK',
                description: await db.User.findAll({
                    offset,
                    limit,
                    attributes: ['id', 'name', 'email', 'provider', 'createdAt', 'updatedAt', 'avatarId'],
                    include: [{
                        model: db.File,
                        as: 'avatar',
                        required: false,
                    }],
                }),
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Fail to get data',
            };
        }
    }
}
