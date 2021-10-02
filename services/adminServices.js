import db from '../database/models/index.js';

const { sequelize } = db;

export default class AdminServices {
    static async deleteUser(id) {
        const t = await sequelize.transaction();
        try {
            await db.User.destroy({
                where: {
                    id,
                },
                transaction: t,
            });

            await t.commit();
            return {
                status: 'OK',
                description: 'User deleted successfully',
            };
        } catch (error) {
            await t.rollback();
            return {
                status: 'ERR',
                description: 'Failed to delete user',
            };
        }
    }

    static async userToProvider(id) {
        const t = await sequelize.transaction();
        try {
            await db.User.update({
                provider: true,
            }, {
                where: {
                    id,
                },
                transaction: t,
            });

            await t.commit();
            return {
                status: 'OK',
                description: 'User updated successfully',
            };
        } catch (error) {
            await t.rollback();
            return {
                status: 'ERR',
                description: 'Failed to updated user',
            };
        }
    }
}