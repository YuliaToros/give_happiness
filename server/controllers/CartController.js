const CartService = require("../services/cart.service");
const ItemCartService = require("../services/itemcart.service");
const ItemCartController = require("./ItemCartController");

class CartController {
  static getUserCartController = async (req, res) => {
    try {
      const cart = await CartService.getUserCart(res.locals.user.id);
      console.log("cart =====>>>>>>", cart);

      res.status(200).json({ message: "success", cart });
    } catch (error) {
      console.error("Ошибка на сервере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении корзин", cart: null });
    }
  };

  static addItemToCartController = async (req, res) => {
    try {
      const { cartId } = req.params;
      const { itemId } = req.body;
      const newEntry = await ItemCartService.addItemCart(itemId, cartId);
      if (newEntry) {
        const cart = await CartService.getUserCart(res.locals.user.id);
        res.status(200).json({ message: "success", cart });
      }
    } catch (error) {
      console.error("Ошибка на сервере:", error);
      res
        .status(500)
        .json({ message: "Ошибка при получении корзин", cart: null });
    }
  };

  static createCartController = async (req, res) => {
    const { user_id, sum, date } = req.body;
    const authUser = res.locals.user;

    if (!authUser) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    if (!user_id || !date) {
      return res
        .status(400)
        .json({ message: "Недостаточно данных для создания корзины" });
    }

    try {
      const cart = await CartService.createCart(user_id, sum, date);
      res.status(201).json({ message: "Корзина успешно создана", cart });
    } catch (error) {
      console.error("Ошибка при создании корзины:", error.message);
      res.status(500).json({ message: "Ошибка сервера", cart: {} });
    }
  };

  static deleteCartController = async (req, res) => {
    const { id } = req.params;
    const authUserId = res.locals.user.id;
    try {
      const countDeletedCarts = await CartService.deleteCart(id);
      if (countDeletedCarts > 0) {
        res.status(200).json({ message: "Корзина успешно удалена" });
      } else {
        res.status(400).json({ message: "Корзина не найдена для удаления" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = CartController;
