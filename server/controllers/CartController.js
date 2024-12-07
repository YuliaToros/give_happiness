const CartService = require("../services/cart.service");

class CartController {
  static getAllCartsController = async (req, res) => {
    try {
      const Carts = await CartService.getAllCart();
      res.status(200).json({ message: "success", Carts: Carts }); // Даем клиенту данные с полем Carts
    } catch (error) {
      console.error("Ошибка на сервере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении документов", Carts: [] });
    }
  };

  static getOneCartController = async (req, res) => {
    try {
      const Cart = await CartService.getOneCart();
      res.status(200).json({ message: "succcess getone", Cart });
    } catch (error) {
      res.status(500).json({ message: error.message, Carts: {} });
    }
  };

  static createCartController = async (req, res) => {
    const { user_id, sum, date } =
      req.body;

    const authUser = res.locals.user;

    if (!authUser) {
      res.status(401).json({ message: "Пользователь не авторизован" });
      return;
    }

    if (!user_id || !date) {
      res.status(400).json({ message: "Данные пустые" });
      return;
    }

    try {
      const Cart = await CartService.createCart({
        user_id,
        sum,
        date,
     
      });

      res.status(201).json({ message: "Успешно создано", Cart });
    } catch (error) {
      console.error("Ошибка при создании документа:", error.message);
      res.status(500).json({ message: "Ошибка сервера", Cart: {} });
    }
  };

  static deleteCartController = async (req, res) => {
    const { id } = req.params;
    const authUserId = res.locals.user.id;
    try {
      const countDeletedCarts = await CartService.deleteCart(id, authUserId);
      if (countDeletedCarts > 0) {
        res.status(200).json({ message: "success delete" });
      } else {
        res.status(400).json({ message: "Not found to delete" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateCartController = async (req, res) => {
    const { user_id, sum, date} = req.body;
    const { id } = req.params;
    console.log("my id", id);
    if (date === "" || sum === "" ) {
      res.status(400).json({ message: "данные пустые для обновления" });
      return;
    }
    try {
      const countUpdated = await CartService.updateCart(req.body, id);
      if (countUpdated > 0) {
        const Cart = await CartService.getOneCart(id);
        res.status(200).json({ message: "success update", Cart });
      } else {
        res.status(200).json({ message: "fail update" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, Cart: {} });
    }
  };
}
module.exports = CartController;
