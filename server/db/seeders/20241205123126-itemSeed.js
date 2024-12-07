"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "Какой-то предмет",
          description:'Какое-то описание',
          image:'https://i.playground.ru/p/uGy4Spd-rUMzqygeCr1WHA.png',
          price:15,
          status:"moder",
          count:1,
          user_id:1,
        },
        {
          name: "Какой-то предмет номер 2",
          description:'Какое-то описание номер 2',
          image:'https://i.playground.ru/p/uGy4Spd-rUMzqygeCr1WHA.png',
          price:30,
          status:"inmoder",
          count:1,
          user_id:1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {});
  },
};
