import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserList } from ".";
import { UserService } from "../api";
import { AxiosError } from "axios";

type RejectValue = {
  message: string;
};

// Создаем перечисление с префиксом типов для уникальных имен действий
enum USER_THUNK_TYPES_PREFIX {
  USER_GETALL = "GETALL_USERS",
}

export const getAllUsers = createAsyncThunk<
  UserList,
  void,
  { rejectValue: RejectValue }
>(USER_THUNK_TYPES_PREFIX.USER_GETALL, async (_, { rejectWithValue }) => {
  try {
    return await UserService.getUsers();
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});
