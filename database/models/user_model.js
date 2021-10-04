const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordConfirm: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
        },
        provider: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        avatarId: {
            type: DataTypes.INTEGER,
            references: { model: 'File', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createdAt',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updatedAt',
        },
    }, {
        tableName: 'users',
        timestamps: true,
    });

    User.addHook('beforeSave', async (user) => {
        if (user.password) user.password = await bcrypt.hash(user.passwordConfirm, 12);
    });

    User.associate = (models) => {
        User.belongsTo(models.File, {
            foreignKey: 'avatarId',
            as: 'avatar',
        });

        User.hasMany(models.Song, {
            foreignKey: 'userId',
            as: 'song',
        });
    };

    return User;
};
