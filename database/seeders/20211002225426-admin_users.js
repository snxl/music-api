const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('users', [{
            name: 'Adm',
            email: 'admin@admin.com',
            password: await bcrypt.hash('Teste1234', 12),
            provider: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', null, {});
    },
};
