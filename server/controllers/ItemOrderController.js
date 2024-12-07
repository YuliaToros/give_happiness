const ItemOrderService = require("../services/itemorder.service");

class ItemOrderController {
  static getAllItemOrdersController = async (req, res) => {
    try {
      const ItemOrders = await ItemOrderService.getAllItemOrder();
      res.status(200).json({ message: "success", ItemOrders: ItemOrders }); // Даем клиенту данные с полем ItemOrders
    } catch (error) {
      console.error("Ошибка на сервере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении документов", ItemOrders: [] });
    }
  };

  static getOneItemOrderController = async (req, res) => {
    try {
      const ItemOrder = await ItemOrderService.getOneItemOrder();
      res.status(200).json({ message: "succcess getone", ItemOrder });
    } catch (error) {
      res.status(500).json({ message: error.message, ItemOrders: {} });
    }
  };

  static createItemOrderController = async (req, res) => {
    const { item_id, order_id } =
      req.body;

    const authUser = res.locals.user;

    if (!authUser) {
      res.status(401).json({ message: "Пользователь не авторизован" });
      return;
    }

    if (!item_id || !order_id) {
      res.status(400).json({ message: "Данные пустые" });
      return;
    }

    try {
      const ItemOrder = await ItemOrderService.createItemOrder({
        item_id,
        order_id,
     
      });

      res.status(201).json({ message: "Успешно создано", ItemOrder });
    } catch (error) {
      console.error("Ошибка при создании документа:", error.message);
      res.status(500).json({ message: "Ошибка сервера", ItemOrder: {} });
    }
  };

  static deleteItemOrderController = async (req, res) => {
    const { id } = req.params;
    const authUserId = res.locals.user.id;
    try {
      const countDeletedItemOrders = await ItemOrderService.deleteItemOrder(id, authUserId);
      if (countDeletedItemOrders > 0) {
        res.status(200).json({ message: "success delete" });
      } else {
        res.status(400).json({ message: "Not found to delete" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // static updateItemOrderController = async (req, res) => {
  //   const { name, description, image, price, status, count } = req.body;
  //   const { id } = req.params;
  //   console.log("my id", id);
  //   if (name === "" || description === "" || price === "") {
  //     res.status(400).json({ message: "данные пустые для обновления" });
  //     return;
  //   }
  //   try {
  //     const countUpdated = await ItemOrderService.updateItemOrder(req.body, id);
  //     if (countUpdated > 0) {
  //       const ItemOrder = await ItemOrderService.getOneItemOrder(id);
  //       res.status(200).json({ message: "success update", ItemOrder });
  //     } else {
  //       res.status(200).json({ message: "fail update" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: error.message, ItemOrder: {} });
  //   }
  // };
}
module.exports = ItemOrderController;
