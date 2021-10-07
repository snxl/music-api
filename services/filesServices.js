import db from '../database/models/index.js';

export default class FilesServices {
    static async store(data, file, user) {
        try {
            return {
                status: 'OK',
                decription: await db.Song.create({
                    ...data,
                    path: file.filename,
                    userId: user.id,
                }),
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Failed to create data',
            };
        }
    }

    static async destroy(id) {
        try {
            await db.Song.destroy({
                where: {
                    id,
                },
            });

            return {
                status: 'OK',
                description: 'File deleted successfully',
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Failed to delete file',
            };
        }
    }

    static async getPrivateSong(id, userId) {
        try {
            return {
                status: 'OK',
                description: await db.Song.findOne({
                    where: {
                        id,
                        userId,
                    },
                    include: [{
                        model: db.User,
                        as: 'user',
                        required: true,
                        attributes: ['id', 'name', 'email', 'provider', 'createdAt', 'updatedAt', 'avatarId'],
                    }],
                }) || 'music by another author or does not exist',
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Failed to get data',
            };
        }
    }

    static async getPublicSong(id) {
        const err = () => { throw new Error(); };
        try {
            return {
                status: 'OK',
                description: await db.Song.findOne({
                    where: {
                        id,
                        private: false,
                        adminStatus: false,
                    },
                    include: [{
                        model: db.User,
                        as: 'user',
                        required: true,
                        attributes: ['id', 'name', 'email', 'provider', 'createdAt', 'updatedAt', 'avatarId'],
                    }],
                }) || err(),
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Failed to get data',
            };
        }
    }

    static async updatedFile(data, id) {
        try {
            return {
                status: 'OK',
                description: await db.Song.update({
                    ...data,
                }, {
                    where: {
                        id,
                    },
                    returning: true,
                    plain: true,
                }),
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Failed to updated file',
            };
        }
    }
}
