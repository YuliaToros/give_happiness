"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ItemOrders",
      [
        {
        
          item_id: 1,
          order_id: 1,
        },
        {
        
          item_id: 2,
          order_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ItemOrders", null, {});
  },
};
