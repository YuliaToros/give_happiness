const { Item, Order } = require("../db/models");

class ItemOrderService {
  static async getAllItemOrder() {
    try {
      const ItemOrder = await ItemOrder.findAll({
        include: [{ model: Item }, { model: Order }],
      });
      return ItemOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addItemOrder(item_id, order_id) {
    try {
      const ItemOrder = await ItemOrder.create({
        item_id,
        order_id,
      });
      const newItemOrder = await ItemOrder.findOne({
        where: { id: ItemOrder.id },
        include: [{ model: Item }, { model: Order }],
      });
      return newItemOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
  //--------------
  static async getOneItemOrder(id) {
    try {
      const ItemOrder = await ItemOrder.findByPk({
        where: {
          id,
        },
        include: Item,
        Order,
      });
      return ItemOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteItemOrder(id) {
    try {
      const countDeletedItemOrder = await ItemOrder.destroy({
        where: { id },
      });
      return countDeletedItemOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateItemOrder(data, id) {
    try {
      const [countUpdated] = await ItemOrder.update(data, { where: { id } });
      return countUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //--------------------

//   static async getItemOrderByEmail(email) {
//     try {
//       const ItemOrder = await ItemOrder.findOne({ where: { email } });
//       console.log(ItemOrder);
//       if (ItemOrder) {
//         return ItemOrder;
//       }
//       return null;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
}

module.exports = ItemOrderService;
