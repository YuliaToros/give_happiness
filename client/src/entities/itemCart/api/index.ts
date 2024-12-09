import { axiosInstance } from "@/shared/lib/axiosInstance";
import { Cart, CartList } from "../../cart/model/";

export class ItemCartService {
  // Получить все записи в ItemCart (связь товаров и корзин)
  static async getAllItemCarts(): Promise<CartList> {
    try {
      const response = await axiosInstance.get("/api/icart");
      return response.data;  // Данные всех связей товаров и корзин
    } catch (error) {
      console.error("Error fetching item carts:", error);
      throw new Error("Failed to fetch item carts");
    }
  }

  // Создать запись в ItemCart (добавить товар в корзину)
  static async createItemCart(cart_id: number, item_id: number): Promise<void> {
    try {
      await axiosInstance.post("/api/icart", { cart_id, item_id });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw new Error("Failed to add item to cart");
    }
  }

  // Удалить товар из корзины
  static async deleteItemCart(cart_id: number, item_id: number): Promise<void> {
    try {
      await axiosInstance.delete(`/api/icart/${cart_id}/${item_id}`);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw new Error("Failed to remove item from cart");
    }
  }
}
