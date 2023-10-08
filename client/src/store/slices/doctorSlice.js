import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const doctorSlice = createSlice({
    name: 'doctorSlice',
    initialState,
    reducers: {
        getDoctors(state, action) {
            state = action.payload;
        }
    },
});

export const { getDoctors } = doctorSlice.actions;

export const doctorReducer  = doctorSlice.reducer;
