const ItemService = require("../services/item.service");

class ItemController {
  static getAllItemsController = async (req, res) => {
    try {
      const Items = await ItemService.getAllItem();
      res.status(200).json({ message: "success", Items: Items }); // Даем клиенту данные с полем Items
    } catch (error) {
      console.error("Ошибка на сервере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении документов", Items: [] });
    }
  };

  static getOneItemController = async (req, res) => {
    try {
      const Item = await ItemService.getOneItem();
      res.status(200).json({ message: "succcess getone", Item });
    } catch (error) {
      res.status(500).json({ message: error.message, Items: {} });
    }
  };

  static createItemController = async (req, res) => {
    const { name, description, image, price, status, count, user_id } =
      req.body;

    const authUser = res.locals.user;

    if (!authUser) {
      res.status(401).json({ message: "Пользователь не авторизован" });
      return;
    }

    if (!name || !category_id) {
      res.status(400).json({ message: "Данные пустые" });
      return;
    }

    try {
      const Item = await ItemService.createItem({
        name,
        description,
        image,
        price,
        status,
        count,
        user_id: authUser.id,
      });

      res.status(201).json({ message: "Успешно создано", Item });
    } catch (error) {
      console.error("Ошибка при создании документа:", error.message);
      res.status(500).json({ message: "Ошибка сервера", Item: {} });
    }
  };

  static deleteItemController = async (req, res) => {
    const { id } = req.params;
    const authUserId = res.locals.user.id;
    try {
      const countDeletedItems = await ItemService.deleteItem(id, authUserId);
      if (countDeletedItems > 0) {
        res.status(200).json({ message: "success delete" });
      } else {
        res.status(400).json({ message: "Not found to delete" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateItemController = async (req, res) => {
    const { name, description, image, price, status, count } = req.body;
    const { id } = req.params;
    console.log("my id", id);
    if (name === "" || description === "" || price === "") {
      res.status(400).json({ message: "данные пустые для обновления" });
      return;
    }
    try {
      const countUpdated = await ItemService.updateItem(req.body, id);
      if (countUpdated > 0) {
        const Item = await ItemService.getOneItem(id);
        res.status(200).json({ message: "success update", Item });
      } else {
        res.status(200).json({ message: "fail update" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, Item: {} });
    }
  };
}
module.exports = ItemController;
