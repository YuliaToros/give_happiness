const { ItemCart } = require("../db/models");

class ItemCartService {
  static async addItemCart(item_id, cart_id) {
    try {
      return await ItemCart.create({
        item_id,
        cart_id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteItemCart(id) {
    try {
      return await ItemCart.destroy({
        where: { id },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ItemCartService;
