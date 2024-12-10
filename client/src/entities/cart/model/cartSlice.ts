import { createSlice } from '@reduxjs/toolkit';
import { fetchUserCart, addItemToCart, removeItemFromCart, syncCart } from './cartThunk';
import {  Cart, CartList } from '../model';

interface CartState {
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

      // .addCase(syncCart.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(syncCart.fulfilled, (state, action) => {
      //   state.cart = state.cart!.map((cartItem)=>{
      //     return cartItem.id === action.payload.id ? action.payload : cartItem;
      //   }) // Обновляем корзину
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(syncCart.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })

      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload // Обновляем корзину с добавленным товаром
      
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Create cart: fail";
      })

      // .addCase(removeItemFromCart.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(removeItemFromCart.fulfilled, (state, action) => {
      //   state.cart = state.cart?.filter((el)=>el.id!==action.payload.id); // Обновляем корзину после удаления товара
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(removeItemFromCart.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
  },
});

export const cartReducer = cartSlice.reducer;
