const ItemCartService = require("../services/itemcart.service");

class ItemCartController {
  static getAllItemCartsController = async (req, res) => {
    try {
      const ItemCarts = await ItemCartService.getAllItemCart();
      res.status(200).json({ message: "success", ItemCarts: ItemCarts }); // Даем клиенту данные с полем ItemCarts
    } catch (error) {
      console.error("Ошибка на сервере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении документов", ItemCarts: [] });
    }
  };

  static getOneItemCartController = async (req, res) => {
    try {
      const ItemCart = await ItemCartService.getOneItemCart();
      res.status(200).json({ message: "succcess getone", ItemCart });
    } catch (error) {
      res.status(500).json({ message: error.message, ItemCarts: {} });
    }
  };

  static createItemCartController = async (req, res) => {
    const { item_id, cart_id } =
      req.body;

    const authUser = res.locals.user;

    if (!authUser) {
      res.status(401).json({ message: "Пользователь не авторизован" });
      return;
    }

    if (!item_id || !cart_id) {
      res.status(400).json({ message: "Данные пустые" });
      return;
    }

    try {
      const ItemCart = await ItemCartService.addItemCart({
        item_id,
        cart_id,
     
      });

      res.status(201).json({ message: "Успешно создано", ItemCart });
    } catch (error) {
      console.error("Ошибка при создании документа:", error.message);
      res.status(500).json({ message: "Ошибка сервера", ItemCart: {} });
    }
  };

  static deleteItemCartController = async (req, res) => {
    const { id } = req.params;
    const authUserId = res.locals.user.id;
    try {
      const countDeletedItemCarts = await ItemCartService.deleteItemCart(id, authUserId);
      if (countDeletedItemCarts > 0) {
        res.status(200).json({ message: "success delete" });
      } else {
        res.status(400).json({ message: "Not found to delete" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // static updateItemCartController = async (req, res) => {
  //   const { name, description, image, price, status, count } = req.body;
  //   const { id } = req.params;
  //   console.log("my id", id);
  //   if (name === "" || description === "" || price === "") {
  //     res.status(400).json({ message: "данные пустые для обновления" });
  //     return;
  //   }
  //   try {
  //     const countUpdated = await ItemCartService.updateItemCart(req.body, id);
  //     if (countUpdated > 0) {
  //       const ItemCart = await ItemCartService.getOneItemCart(id);
  //       res.status(200).json({ message: "success update", ItemCart });
  //     } else {
  //       res.status(200).json({ message: "fail update" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: error.message, ItemCart: {} });
  //   }
  // };
}
module.exports = ItemCartController;
