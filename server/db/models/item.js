"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsToMany(models.Order, { through: "ItemOrder", foreignKey:"item_id", as: "orders" });
      Item.belongsToMany(models.Cart, { through: "ItemCart", foreignKey:"item_id", as: "carts"  });
      Item.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ["unmoder", "inmoder", "moder"], // Указаны значения ENUM
        defaultValue: "unmoder", // Значение по умолчанию
      },
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
