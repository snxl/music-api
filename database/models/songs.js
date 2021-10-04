module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('Song', {
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tittle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        songwriter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        adminStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        private: {
            type: DataTypes.BOOLEAN,
        },
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return {
                    https: `https://localhost:${process.env.PORT_TLS}/files/${this.path}`,
                    http: `http://localhost:${process.env.PORT}/files/${this.path}`,
                };
            },
        },
    }, {
        tableName: 'songs',
    });

    File.associate = (models) => {
        File.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return File;
};
