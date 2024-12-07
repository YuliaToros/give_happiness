const { Item, Cart } = require("../db/models");

class ItemCartService {
  static async getAllItemCart() {
    try {
      const ItemCart = await ItemCart.findAll({
        include: [{ model: Item }, { model: Cart }],
      });
      return ItemCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addItemCart(item_id, cart_id) {
    try {
      const ItemCart = await ItemCart.create({
        item_id,
        cart_id,
      });
      const newItemCart = await ItemCart.findOne({
        where: { id: ItemCart.id },
        include: [{ model: Item }, { model: Cart }],
      });
      return newItemCart;
    } catch (error) {
      throw new Error(error);
    }
  }
  //--------------
  static async getOneItemCart(id) {
    try {
      const ItemCart = await ItemCart.findByPk({
        where: {
          id,
        },
        include: Item,
        Cart,
      });
      return ItemCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteItemCart(id) {
    try {
      const countDeletedItemCart = await ItemCart.destroy({
        where: { id },
      });
      return countDeletedItemCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateItemCart(data, id) {
    try {
      const [countUpdated] = await ItemCart.update(data, { where: { id } });
      return countUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //--------------------

//   static async getItemCartByEmail(email) {
//     try {
//       const ItemCart = await ItemCart.findOne({ where: { email } });
//       console.log(ItemCart);
//       if (ItemCart) {
//         return ItemCart;
//       }
//       return null;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
}

module.exports = ItemCartService;
