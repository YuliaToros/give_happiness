const OrderService = require("../services/order.service");

class OrderController {
  static getAllOrdersController = async (req, res) => {
    try {
      const Orders = await OrderService.getAllOrder();
      res.status(200).json({ message: "success", Orders: Orders }); // Даем клиенту данные с полем Orders
    } catch (error) {
      console.error("Ошибка на сервере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении документов", Orders: [] });
    }
  };

  static getOneOrderController = async (req, res) => {
    try {
      const Order = await OrderService.getOneOrder();
      res.status(200).json({ message: "succcess getone", Order });
    } catch (error) {
      res.status(500).json({ message: error.message, Orders: {} });
    }
  };

  static createOrderController = async (req, res) => {
    const { user_id, count } =
      req.body;

    const authUser = res.locals.user;

    if (!authUser) {
      res.status(401).json({ message: "Пользователь не авторизован" });
      return;
    }

    if (!user_id || !count) {
      res.status(400).json({ message: "Данные пустые" });
      return;
    }

    try {
      const Order = await OrderService.createOrder({
        user_id,
    
        count,
     
      });

      res.status(201).json({ message: "Успешно создано", Order });
    } catch (error) {
      console.error("Ошибка при создании документа:", error.message);
      res.status(500).json({ message: "Ошибка сервера", Order: {} });
    }
  };

  static deleteOrderController = async (req, res) => {
    const { id } = req.params;
    const authUserId = res.locals.user.id;
    try {
      const countDeletedOrders = await OrderService.deleteOrder(id, authUserId);
      if (countDeletedOrders > 0) {
        res.status(200).json({ message: "success delete" });
      } else {
        res.status(400).json({ message: "Not found to delete" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateOrderController = async (req, res) => {
    const { user_id, count} = req.body;
    const { id } = req.params;
    console.log("my id", id);
    if ( count === "" ) {
      res.status(400).json({ message: "данные пустые для обновления" });
      return;
    }
    try {
      const countUpdated = await OrderService.updateOrder(req.body, id);
      if (countUpdated > 0) {
        const Order = await OrderService.getOneOrder(id);
        res.status(200).json({ message: "success update", Order });
      } else {
        res.status(200).json({ message: "fail update" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, Order: {} });
    }
  };
}
module.exports = OrderController;
