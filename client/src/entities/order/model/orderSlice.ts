import { createSlice } from "@reduxjs/toolkit";
import { OrderList } from ".";
import { getAllOrders } from "./orderThunk";

type OrdersState = {
    orders: OrderList | [];
    error: string | null;
    loading: boolean;
}

// Устанавливаем начальное состояние
const initialState: OrdersState = {
    orders: [],
    error: null,
    loading: false
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Get orders

            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Get all order: fail'
            })

    }
})

export default ordersSlice.reducer;