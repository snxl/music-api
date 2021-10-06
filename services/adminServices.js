import db from '../database/models/index.js';

const { sequelize } = db;

export default class AdminServices {
    static async deleteUser(id) {
        try {
            await db.User.destroy({
                where: {
                    id,
                },
            });

            return {
                status: 'OK',
                description: 'User deleted successfully',
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Failed to delete user',
            };
        }
    }

    static async userToProvider(id) {
        try {
            await db.User.update({
                provider: true,
            }, {
                where: {
                    id,
                },
            });

            return {
                status: 'OK',
                description: 'User updated successfully',
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Failed to updated user',
            };
        }
    }

    static async statusUpdate(id, status) {
        try {
            await db.Song.update({
                adminStatus: status,
            }, {
                where: {
                    id,
                },
            });

            return {
                status: 'OK',
                description: 'File updated successfully',
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Failed to updated file',
            };
        }
    }

    static async destroySong(id) {
        try {
            const destroyFile = await db.Song.destroy({
                where: {
                    id,
                },
            });
            return {
                status: 'OK',
                description: `lines deleted ${destroyFile}`,
            };
        } catch (error) {
            return {
                status: 'ERR',
                description: 'Failed to destroy file',
            };
        }
    }
}
