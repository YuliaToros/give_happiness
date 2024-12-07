'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Cart.belongsTo(models.User, {foreignKey:"user_id" , as: "user"})
        Cart.belongsToMany(models.Item, {through:"ItemCart" ,   foreignKey: "cart_id", as: "items"})
    }
  }
  Cart.init({
    user_id: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};