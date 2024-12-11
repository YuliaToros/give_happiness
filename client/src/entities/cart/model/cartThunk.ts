import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartService } from "../api";
import { Cart, CartId } from ".";
import { AxiosError } from "axios";

type RejectValue = {
  message: string;
};

// Получить корзину пользователя
export const fetchUserCart = createAsyncThunk<
  Cart,
  void,
  { rejectValue: RejectValue }
>("cart/fetchUserCart", async (_, { rejectWithValue }) => {
  try {
    return await CartService.getUserCart();
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

// Добавить товар в корзину
export const addItemToCart = createAsyncThunk<
  Cart,
  { cart_id: number; item_id: number },
  { rejectValue: RejectValue }
>("cart/addItemToCart", async ({ cart_id, item_id }, { rejectWithValue }) => {
  try {
    const updatedCart = await CartService.addItemToCart(cart_id, item_id);
    return updatedCart;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

// Удалить товар из корзины
export const removeItemFromCart = createAsyncThunk<
  Cart,
  { item_id: number; cart_id: number;  },
  { rejectValue: RejectValue }
>(
  "cart/removeItemFromCart",
  async ({item_id, cart_id,  }, { rejectWithValue }) => {
    try {
      const updatedCart = await CartService.removeItemFromCart(
        item_id,
        cart_id,
        
      );
      return updatedCart;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

// // Синхронизация корзины
export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (_, { rejectWithValue }) => {
    try {
      const updatedCart = await CartService.getUserCart();
      return updatedCart; // Возвращаем обновленную корзину
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);
