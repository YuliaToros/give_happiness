// Импортируем функцию createAsyncThunk из reduxjs/toolkit для создания асинхронных thunk-функций
import { createAsyncThunk } from "@reduxjs/toolkit";

// Импортируем тип AxiosError из axios для обработки ошибок API
import { AxiosError } from "axios";

// Импортируем класс UserService из папки api для работы с API
import { OrderList} from ".";
import { OrderService } from "../api";

// Определяем тип RejectValue для значения rejectWithValue
type RejectValue = {
    message: string;
};

// Создаем перечисление с префиксом типов для уникальных имен действий
enum ORDERS_THUNK_TYPES_PREFIX {
    INIT_ORDERS = 'order/initOrders',
};

export const getAllOrders = createAsyncThunk<OrderList, void, { rejectValue: RejectValue }>(ORDERS_THUNK_TYPES_PREFIX.INIT_ORDERS, async (_, { rejectWithValue }) => {
    try {
        return await OrderService.getAllOrders();
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue({ message: err.response?.data.message || err.message });
    }
});