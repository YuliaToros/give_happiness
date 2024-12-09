import { axiosInstance } from '@/shared/lib/axiosInstance';
import { Cart, CartList } from '../model';

export class CartService {
  static async getUserCart(): Promise<Cart> {
    try {
      const response = await axiosInstance.get(`/cart`);
      
      return response.data.cart;
    } catch (error) {
      console.error('Error fetching user cart:', error);
      throw new Error('Failed to fetch user cart');
    }
  }

  static async getAllUserCarts(userId: number): Promise<CartList> {
    try {
      const response = await axiosInstance.get(`/cart/${userId}`);
      
      return response.data.cart;
    } catch (error) {
      console.error('Error fetching user cart:', error);
      throw new Error('Failed to fetch user cart');
    }
  }

  static async addItemToCart(cartId: number, itemId: number): Promise<Cart> {
    try {
      const response = await axiosInstance.post(`/cart/${cartId}`, { itemId });
      return response.data.cart;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  }

  static async removeItemFromCart(cartId: number, itemId: number): Promise<Cart> {
    try {
      const response = await axiosInstance.delete(`/cart/${cartId}/items/${itemId}`);
      return response.data.cart;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw new Error('Failed to remove item from cart');
    }
  }
}
