import { createSlice } from "@reduxjs/toolkit";
import { RoleList } from ".";
import { initRoles } from "./roleThunk";
//------------------------------------------------

type RoleState = {
  roles: RoleList;
  error: string | null;
  loading: boolean;
};

const initialState: RoleState = {
  roles: [],
  error: null,
  loading: false,
};

export const roleSlice  = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //init
      .addCase(initRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(initRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(initRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "initRole: fail";
      });
  },
});
export const roleReducer = roleSlice.reducer;