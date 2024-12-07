// Импортируем функцию createAsyncThunk из reduxjs/toolkit для создания асинхронных thunk-функций
import { createAsyncThunk } from "@reduxjs/toolkit";

// Импортируем тип AxiosError из axios для обработки ошибок API
import { AxiosError } from "axios";

// Импортируем тип AuthResponse из локального индекса
import {  UserWithoutPasswordType } from './index';

// Импортируем класс UserService из папки api для работы с API
import { UserService } from "../api";

// Определяем тип RejectValue для значения rejectWithValue
type RejectValue = {
    message: string;
};

type AuthResponse = {
    accessToken: string;
    user: UserWithoutPasswordType;
}

// Создаем перечисление с префиксом типов для уникальных имен действий
enum USER_THUNK_TYPES_PREFIX {
    USER_REFRESH_ACCESS_TOKEN = 'user/refreshAccessToken',
    USER_AUTHORIZATION = 'user/authorization',
    USER_REGISTRATION = 'user/registration',
    USER_LOGOUT = 'user/logout',
};

// Создаем асинхронную thunk-функцию для обновления токена доступа, _ — опциональный параметр
export const refreshAccessToken = createAsyncThunk<
    AuthResponse, 
    void, 
    { rejectValue: RejectValue }
    >(USER_THUNK_TYPES_PREFIX.USER_REFRESH_ACCESS_TOKEN, async (_, { rejectWithValue }) => {

    try {
        // Пытаемся выполнить запрос к API для обновления токена
        return await UserService.refreshAccessToken();
    } catch (error) {
        // Обрабатываем ошибку, приводя ее к типу AxiosError
        const err = error as AxiosError<{ message: string }>

        // Возвращаем значение rejectWithValue с сообщением об ошибке
        return rejectWithValue({
            message: err.response?.data.message || err.message
        });
    }
});

// Создаем асинхронную thunk-функцию для авторизации
export const authorization = createAsyncThunk<
    AuthResponse, 
    { email: string, password: string }, 
    { rejectValue: RejectValue }
    >(USER_THUNK_TYPES_PREFIX.USER_AUTHORIZATION, async ({ email, password }, { rejectWithValue }) => {

    try {
        // Пытаемся выполнить запрос к API для авторизации пользователя
        return await UserService.authorization(email, password);
    } catch (error) {
        // Обрабатываем ошибку, приводя ее к типу AxiosError
        const err = error as AxiosError<{ message: string }>

        // Возвращаем значение rejectWithValue с сообщением об ошибке
        return rejectWithValue({
            message: err.response?.data.message || err.message
        });
    }
});

// Создаем асинхронную thunk-функцию для регистрации
export const registration = createAsyncThunk<
    AuthResponse, 
    { email: string, password: string, name:string , role_id:number}, 
    { rejectValue: RejectValue }
    >(USER_THUNK_TYPES_PREFIX.USER_REGISTRATION, async ({ email, password,name,role_id }, { rejectWithValue }) => {

    try {
        // Пытаемся выполнить запрос к API для регистрации пользователя
        return await UserService.registration(email, password, name, role_id );
    } catch (error) { 
        // Обрабатываем ошибку, приводя ее к типу AxiosError
        const err = error as AxiosError<{ message: string }>

        // Возвращаем значение rejectWithValue с сообщением об ошибке
        return rejectWithValue({
            message: err.response?.data.message || err.message
        });
    }
});

// Создаем асинхронную thunk-функцию для выхода
export const logout = createAsyncThunk<
    void, 
    void, 
    { rejectValue: RejectValue }
    >(USER_THUNK_TYPES_PREFIX.USER_LOGOUT, async (_, { rejectWithValue }) => {

    try {
        // Пытаемся выполнить запрос к API для выхода
        await UserService.logout();
    } catch (error) {
        // Обрабатываем ошибку, приводя ее к типу AxiosError
        const err = error as AxiosError<{ message: string }>

        // Возвращаем значение rejectWithValue с сообщением об ошибке
        return rejectWithValue({
            message: err.response?.data.message || err.message
        });
    }
});
//--------------------------------------------ROLES---------------------------------------------
