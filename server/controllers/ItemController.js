const ItemService = require("../services/item.service");

class ItemController {
  static getAllItemsController = async (req, res) => {
    try {
      const items = await ItemService.getAllItem();
      res.status(200).json({ message: "success", items: items }); // Даем клиенту данные с полем Items
    } catch (error) {
      console.error("Ошибка на сервере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении документов", items: [] });
    }
  };

  static getOneItemController = async (req, res) => {
    try {
      const item = await ItemService.getOneItem();
      res.status(200).json({ message: "succcess getone", item });
    } catch (error) {
      res.status(500).json({ message: error.message, items: {} });
    }
  };

  static createItemController = async (req, res) => {
    const { name, description, image, price, count, status} = req.body;
    const authUser = res.locals.user;

    if (!authUser) {
      res.status(401).json({ message: "Пользователь не авторизован" });
      return;
    }
    console.log("name =>>",name, typeof name);
    console.log(req.body);
    
    if (
      !name 
      || !description 
      || !image 
      || !price 
      || !count 
      || !status) {
      res.status(400).json({ message: "Данные пустые" });
      return;
    }
    
    
    try {
      const item = await ItemService.createItem({
        name, description, image, price, count, status,
        user_id: authUser.id,
      });
      console.log(item);
      
      res.status(201).json({ message: "Успешно создано", item });
    } catch (error) {
      console.error("Ошибка при создании документа:", error.message);
      res.status(500).json({ message: error.message, item: {} });
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
    const { name, description, image, price, count, status } = req.body;
    const { id } = req.params;

    if (name === "" || description === "" || image === "" || price === "" || count === "" || status === "") {
      res.status(400).json({ message: "данные пустые для обновления" });
      return;
    }
    try {
      const countUpdated = await ItemService.updateItem(req.body, id);
      if (countUpdated > 0) {
        const item = await ItemService.getOneItem(id);
        res.status(200).json({ message: "success update", item });
      } else {
        res.status(200).json({ message: "fail update" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, item: {} });
    }
  };
}
module.exports = ItemController;
