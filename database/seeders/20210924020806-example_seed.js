// 'use strict';

// const moment = require("moment")
// const bcrypt = require("bcryptjs")

// module.exports = {
//   up: async (queryInterface, Sequelize) => {

//     await queryInterface.bulkInsert('users',[{
//       name: "user test",
//       email: "teste1@gmail.com",
//       password: await bcrypt.hash("teste123", 12),
//       provider: false,
//       createdAt:moment().format("YYYY-MM-DD HH:MM"),
//       updatedAt:moment().format("YYYY-MM-DD HH:MM")
//     },{
//       name: "user test",
//       email: "teste2@gmail.com",
//       password: await bcrypt.hash("teste123", 12),
//       provider: false,
//       createdAt:moment().format("YYYY-MM-DD HH:MM"),
//       updatedAt:moment().format("YYYY-MM-DD HH:MM")
//     },{
//       name: "user test",
//       email: "teste3@gmail.com",
//       password: await bcrypt.hash("teste123", 12),
//       provider: true,
//       createdAt:moment().format("YYYY-MM-DD HH:MM"),
//       updatedAt:moment().format("YYYY-MM-DD HH:MM")
//     },{
//       name: "user test",
//       email: "teste4@gmail.com",
//       password: await bcrypt.hash("teste123", 12),
//       provider: true,
//       createdAt:moment().format("YYYY-MM-DD HH:MM"),
//       updatedAt:moment().format("YYYY-MM-DD HH:MM")
//     }],{})
//   },

//   down: async (queryInterface, Sequelize) => {

//     await queryInterface.bulkDelete('users', null, {});

//   }
// };
