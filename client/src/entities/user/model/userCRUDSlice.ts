import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./userCRUDThunk";
import { UserList } from ".";

// Определяем тип состояния для хранилища пользователя
type UserState = {
  userCRUD: UserList ;
  error: string | null;
  loading: boolean;
};

// Устанавливаем начальное состояние
const initialState: UserState = {
  userCRUD: [],
  error: null,
  loading: false,
};

const userCRUDSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //init
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        //console.log("Payload:", action.payload);
        state.userCRUD = action.payload;
        //console.log("Updated userCRUD:", state.userCRUD);
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "getAllUsers: fail";
      });
  },
});
export default userCRUDSlice.reducer;