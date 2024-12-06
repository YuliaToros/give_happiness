"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ItemCarts",
      [
        {
          cart_id:1,
          item_id:1
        },
        {
          cart_id:2,
          item_id:2
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ItemCarts", null, {});
  },
};
