// Импортируем редьюсер для пользователя из файла user.ts
import userReducer from '@/entities/user/model/userSlice';
import sertificatesReducer from "@/entities/sertificate/model/sertificatesSlice";
import userCRUDReducer from '@/entities/user/model/userCRUDSlice';
import ordersReducer from '@/entities/order/model/orderSlice';
// Импортируем функцию configureStore из Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import  {roleReducer}  from '@/entities/user/model/roleSlice';

const store = configureStore({
    reducer: {
        userCRUD: userCRUDReducer,
        user: userReducer,
        sertificates: sertificatesReducer,
        role:roleReducer,
        orders: ordersReducer,
    }
});

// Используем typeof для получения типа getState функции хранилища
export type RootState = ReturnType<typeof store.getState>;

// Определяем тип диспатча для отправки действий
export type AppDispatch = typeof store.dispatch;

export default store;