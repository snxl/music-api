module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('songs', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            path: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tittle: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            artist: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            songwriter: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            genre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            private: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('songs');
    },
};
