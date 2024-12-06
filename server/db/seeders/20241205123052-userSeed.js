const bcrypt = require("bcrypt");
const { verify } = require("jsonwebtoken");
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "john@mail.ru",
          password: bcrypt.hashSync("1", saltRounds),
          phone: 678456,
          verify_status: "verify",
          company_name:"Компания №1",
          company_description:"Что-то о компании 1",
          city_id:1,
          role_id:3
        },
        {
          name: "Admin",
          email: "admin@mail.ru",
          password: bcrypt.hashSync("1", saltRounds),
          phone: 123123,
          verify_status: "verify",
          company_name:"Компания №2",
          company_description:"Что-то о компании 2",
          city_id:1,
          role_id:1
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
