"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "Полное расслабление",
          description:'Самая востребованная программа СПА-центра',
          image:`${process.env.IMAGE_URL}/seed1.png`,
          price: 5000,
          status:"moder",
          count:10,
          user_id:1,
        },
        {
          name: "Восковые свечи",
          description:'Премиальные свечи ручной работы',
          image: `${process.env.IMAGE_URL}/seed2.png`,
          price: 1000,
          status:"inmoder",
          count: 10,
          user_id:2,
        },
        {
          name: "Здоровье и красота",
          description:'Подарочный сертифика на спа или йогу',
          image:`${process.env.IMAGE_URL}/seed3.png`,
          price: 3000,
          status:"inmoder",
          count: 10,
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
