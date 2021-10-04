module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('songs', 'adminStatus', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('songs', 'avatarId');
    },
};
