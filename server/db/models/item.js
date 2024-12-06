"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsToMany(models.Order, { through: "ItemOrder", as: "item_id" });
      Item.belongsToMany(models.Cart, { through: "ItemCart", as: "item_id" });
      Item.belongsTo(models.User, {foreignKey:"user_id", as:"user"})
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.ENUM,
      count: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
