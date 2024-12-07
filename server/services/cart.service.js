const { User } = require("../db/models");

class CartService {
  static async getAllCart() {
    try {
      const Cart = await Cart.findAll({
        include: [{ model: User }],
      });
      return Cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addCart(user_id,count) {
    try {
      const Cart = await Cart.create({
        user_id,
        count,
      });
      const newCart = await Cart.findOne({
        where: { id: Cart.id },
        include: [{ model: User }],
      });
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }
  //--------------
  static async getOneCart(id) {
    try {
      const Cart = await Cart.findByPk({
        where: {
          id,
        },
        include: User,

      });
      return Cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteCart(id) {
    try {
      const countDeletedCart = await Cart.destroy({
        where: { id },
      });
      return countDeletedCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateDoc(data, id) {
    try {
      const [countUpdated] = await Cart.update(data, { where: { id } });
      return countUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //--------------------

//   static async getCartByEmail(email) {
//     try {
//       const Cart = await Cart.findOne({ where: { email } });
//       console.log(Cart);
//       if (Cart) {
//         return Cart;
//       }
//       return null;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
}

module.exports = CartService;
