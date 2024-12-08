const UserService = require("../services/user.service");

class UserController {
  static getAllUsersController = async (req, res) => {
    try {
      const Users = await UserService.getAllUser();
      res.status(200).json({ message: "success", Users: Users }); // Даем клиенту данные с полем Users
    } catch (error) {
      console.error("Ошибка на сервере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении документов", Users: [] });
    }
  };

  static getOneUserController = async (req, res) => {
    try {
      const User = await UserService.getOneUser();
      res.status(200).json({ message: "succcess getone", User });
    } catch (error) {
      res.status(500).json({ message: error.message, Users: {} });
    }
  };

  static createUserController = async (req, res) => {
    const { name, email, password, phone, verify_status, company_name, company_description, city_id, role_id } =
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
      const User = await UserService.createUser({
        name,
        email,
        password,
        phone,
        verify_status,
        company_name,
        company_description,
        city_id,
        role_id
      });

      res.status(201).json({ message: "Успешно создано", User });
    } catch (error) {
      console.error("Ошибка при создании документа:", error.message);
      res.status(500).json({ message: "Ошибка сервера", User: {} });
    }
  };

  static deleteUserController = async (req, res) => {
    const { id } = req.params;
    const authUserId = res.locals.user.id;
    try {
      const countDeletedUsers = await UserService.deleteUser(id, authUserId);
      if (countDeletedUsers > 0) {
        res.status(200).json({ message: "success delete" });
      } else {
        res.status(400).json({ message: "Not found to delete" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateUserController = async (req, res) => {
    const { name, email, password, phone, verify_status, company_name, company_description, city_id, role_id } = req.body;
    const { id } = req.params;
    console.log("my id", id);
    if (name === "" || email === "" || password === "") {
      res.status(400).json({ message: "данные пустые для обновления" });
      return;
    }
    try {
      const countUpdated = await UserService.updateUser(req.body, id);
      if (countUpdated > 0) {
        const User = await UserService.getOneUser(id);
        res.status(200).json({ message: "success update", User });
      } else {
        res.status(200).json({ message: "fail update" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, User: {} });
    }
  };
}
module.exports = UserController;
