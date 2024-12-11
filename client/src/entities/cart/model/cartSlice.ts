import { createSlice } from '@reduxjs/toolkit';
import { fetchUserCart, addItemToCart, removeItemFromCart, syncCart } from './cartThunk';
import {  Cart } from '../model';

type CartState = {
  cart: Cart|null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
          state.error = action.payload?.message || "get cart: fail";
      })

      .addCase(syncCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(syncCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.items.push(action.payload); // Добавляем новый item в массив items
          state.cart.count += 1; // Обновляем количество товаров в корзине
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Create cart: fail";
      })

      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        // state.cart = state.cart?.filter((el)=>el.id!==action.payload.id); // Обновляем корзину после удаления товара
        state.cart = action.payload
        console.log("act",action.payload);
        
        state.loading = false;
        state.error = null;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "destroy cart: fail";
      })
  },
});

export const cartReducer = cartSlice.reducer;
