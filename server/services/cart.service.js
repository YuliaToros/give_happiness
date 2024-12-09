const { User, Cart, Item } = require("../db/models");

class CartService {
  static async getUserCart(user_id) {
    // Переименуем метод, чтобы он корректно отражал получение всех корзин
    try {
      const cart = await Cart.findOne({
        where: { user_id },
        include: [{ model: Item, as: "items" }],
      });
      return cart;
    } catch (error) {
      throw new Error("Error fetching all carts: " + error.message);
    }
  }

  static async addCart(user_id, count) {
    try {
      const newCart = await Cart.create({
        user_id,
        count,
      });
      return newCart;
    } catch (error) {
      throw new Error("Error adding cart: " + error.message);
    }
  }

  static async getOneCart(id) {
    try {
      const cart = await Cart.findByPk(id, {
        include: User,
      });
      return cart;
    } catch (error) {
      throw new Error("Error fetching cart by ID: " + error.message);
    }
  }

  static async deleteCart(id) {
    try {
      const countDeleted = await Cart.destroy({
        where: { id },
      });
      return countDeleted;
    } catch (error) {
      throw new Error("Error deleting cart: " + error.message);
    }
  }

  static async createCart(userId) {
    try {
      const newCart = await Cart.create({
        user_id: userId, // связываем корзину с пользователем
        count: 0, // начальное количество товаров в корзине
      });
      return newCart;
    } catch (error) {
      throw new Error("Error creating cart: " + error.message);
    }
  }

  static async updateCart(data, id) {
    try {
      const [countUpdated] = await Cart.update(data, { where: { id } });
      return countUpdated;
    } catch (error) {
      throw new Error("Error updating cart: " + error.message);
    }
  }
}

module.exports = CartService;
