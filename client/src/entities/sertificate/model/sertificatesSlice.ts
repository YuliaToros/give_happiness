import { createSlice } from "@reduxjs/toolkit";
import { SertificateList } from ".";
import { createSertificate, getAllSertificates, deleteSertificate, updateSertificate } from "./sertificatesThunk";

type SertificatesState = {
    sertificates: SertificateList | [];
    error: string | null;
    loading: boolean;
}

const initialState: SertificatesState = {
    sertificates: [],
    error: null,
    loading: false
}

const sertificatesSlice = createSlice({
    name: 'sertificates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSertificate.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSertificate.fulfilled, (state, action) => {
                state.sertificates = [...state.sertificates, action.payload];
                state.loading = false;
                state.error = null;
            })
            .addCase(createSertificate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Create sertificate: fail';
            })

            .addCase(deleteSertificate.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSertificate.fulfilled, (state, action) => {
                state.sertificates = state.sertificates?.filter(el => el.id !== action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteSertificate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Delete sertificate: fail'
            })

            .addCase(getAllSertificates.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSertificates.fulfilled, (state, action) => {
                state.sertificates = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllSertificates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Get all sertificates: fail'
            })

            .addCase(updateSertificate.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSertificate.fulfilled, (state, action) => {
                state.sertificates = state.sertificates.map(sertificateItem => {
                    return sertificateItem.id === action.payload.id ? action.payload : sertificateItem
                });
                state.loading = false;
                state.error = null;
            })
            .addCase(updateSertificate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Update sertificate: fail'
            })
    }
})

export default sertificatesSlice.reducer;