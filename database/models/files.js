module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        tableName: 'files',
    });

    return File;
};
