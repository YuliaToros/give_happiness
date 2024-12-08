'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order,{foreignKey:"user_id", as:"order"})
      User.hasMany(models.Cart,{foreignKey:"user_id", as:"cart"})
      User.hasMany(models.Item,{foreignKey:"user_id", as:"item"})
      User.belongsTo(models.City, {foreignKey:"city_id",as:"city"})
      User.belongsTo(models.Role, {foreignKey:"role_id",as:"role"})
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    verify_status: {
      type: DataTypes.ENUM,
      values:['verify','in_progress','not_verify']
    },
    company_name: DataTypes.STRING,
    company_description: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};