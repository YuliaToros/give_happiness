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

  static async deleteItemCart(item_id, cart_id) {
    try {
      console.log(1,item_id,cart_id);
      
      return await ItemCart.destroy({
        where: { item_id, cart_id},
      });
      
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ItemCartService;
