const { User, Order } = require("../db/models");

class OrderService {
  static async getAllOrder() {
    try {
      const Orders = await Order.findAll({
        order: [["id", "ASC"]],
        include: [{ model: User, as: 'user' }],
      });
      return Orders;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addOrder(user_id,sum,date) {
    try {
      const Order = await Order.create({
        user_id,
        sum,
        date,
      });
      const newOrder = await Order.findOne({
        where: { id: Order.id },
        include: [{ model: User, as: 'user' }],
      });
      return newOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
  //--------------
  static async getOneOrder(id) {
    try {
      const Order = await Order.findByPk({
        where: {
          id,
        },
        include: User,
      });
      return Order;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteOrder(id) {
    try {
      const countDeletedOrder = await Order.destroy({
        where: { id },
      });
      return countDeletedOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateOrder(data, id) {
    try {
      const [countUpdated] = await Order.update(data, { where: { id } });
      return countUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //--------------------

  //   static async getOrderByEmail(email) {
  //     try {
  //       const Order = await Order.findOne({ where: { email } });
  //       console.log(Order);
  //       if (Order) {
  //         return Order;
  //       }
  //       return null;
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   }
}

module.exports = OrderService;
