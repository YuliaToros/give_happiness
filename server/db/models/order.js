"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsToMany(models.Item, { through: "ItemOrder", foreignKey:"order_id", as: "items" }),
      Order.belongsTo(models.User, {foreignKey: "user_id", as: "user", });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      sum: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
