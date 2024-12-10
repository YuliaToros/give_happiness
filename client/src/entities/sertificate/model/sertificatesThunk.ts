import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SertificateService } from "../api";
import { Sertificate, SertificateId, SertificateList } from ".";

type RejectValue = {
  message: string;
};

enum SERTIFICATES_THUNK_TYPES_PREFIX {
  INIT_SERTIFICATES = "sertificates/initSertificates",
  ADD_SERTIFICATE = "sertificates/addSertificate",
  DELETE_SERTIFICATE = "sertificates/deleteSertificate",
  UPDATE_SERTIFICATE = "sertificates/updateSertificate",
}

export const createSertificate = createAsyncThunk<
  Sertificate,
  { name: string, description: string, image: string, price: number, count: number, status: string },
  { rejectValue: RejectValue }
  >(SERTIFICATES_THUNK_TYPES_PREFIX.ADD_SERTIFICATE,
  async ({ name, description, image, price, count, status }, { rejectWithValue }) => {
    try {
      return await SertificateService.createSertificate(
        name,
        description,
        image,
        price,
        count,
        status
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

// Создаем асинхронную thunk-функцию для удаления книги
export const deleteSertificate = createAsyncThunk<
  SertificateId,
  number,
  { rejectValue: RejectValue }
  >(SERTIFICATES_THUNK_TYPES_PREFIX.DELETE_SERTIFICATE, async (id, { rejectWithValue }) => {
  try {
    return await SertificateService.deleteSertificate(id);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

// Создаем асинхронную thunk-функцию для получения книг
export const getAllSertificates = createAsyncThunk<
  SertificateList,
  void,
  { rejectValue: RejectValue }
  >(SERTIFICATES_THUNK_TYPES_PREFIX.INIT_SERTIFICATES, async (_, { rejectWithValue }) => {
  try {
    return await SertificateService.getAllSertificates();
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

// Создаем асинхронную thunk-функцию для обновления книги
export const updateSertificate = createAsyncThunk<
  Sertificate,
  { id: number, name: string, description: string, image: string, price: number, count: number, status: string },
  { rejectValue: RejectValue }
  >(SERTIFICATES_THUNK_TYPES_PREFIX.UPDATE_SERTIFICATE,
  async ({ id, name, description, image, price, count, status }, { rejectWithValue }) => {
    try {
      return await SertificateService.updateSertificate(id, name, description, image, price, count, status);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);
