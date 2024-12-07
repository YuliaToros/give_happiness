import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoleList } from ".";
import { UserService } from "../api";
import { AxiosError } from "axios";

type RejectValue = {
  message: string;
};

export enum ROLE_ACTION_TYPE {
  INIT_ROLES = "INIT_ROLES",
}

export const initRoles = createAsyncThunk<
  RoleList,
  void,
  { rejectValue: RejectValue }
>(ROLE_ACTION_TYPE.INIT_ROLES, async (_, { rejectWithValue }) => {
  try {
   
    return await UserService.getRoles();
  } catch (error) {

    const err = error as AxiosError<{ message: string }>;


    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});
