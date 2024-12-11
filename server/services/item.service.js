const { Item, User } = require("../db/models");

class ItemService {
  static async getAllItem() {
    try {
      const items = await Item.findAll(
        {
        include: [{ model: User, as: "user" }],
      }
    );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createItem({
    name,
    description,
    image,
    price,
    count,
    status,
    user_id,
  })
   {
    try {
      const item = await Item.create({
        name,
        description,
        image,
        price,
        count,
        status,
        user_id,
      });
      const newItem = await Item.findOne({
        where: { id: item.user_id },
        include: [
          { model: User, as: "user" },
        ],
      });
      return newItem;
    } catch (error) {
      throw new Error(error);
    }
  }
  //--------------
  static async getOneItem(id) {
    try {
      const item = await Item.findByPk({
        where: {
          id,
        },
        include: User,
      });
      return item;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteItem(id, authUserId) {
    try {
      const countDeletedUser = await Item.destroy({
        where: { id, user_id: authUserId },
      });
      return countDeletedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateItem(data, id, user_id) {
    try {
      const [countUpdated] = await Item.update(data, { where: { id, user_id } });
      return countUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //--------------------

  static async getItemByName(name) {
    try {
      const item = await Item.findOne({ where: { name } });
      console.log(item);
      if (item) {
        return item;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ItemService;
