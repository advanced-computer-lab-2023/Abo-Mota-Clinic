// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticatedClinic: false,
  userRoleClinic: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticatedClinic = true;
      state.userRoleClinic = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticatedClinic = false;
      state.userRoleClinic = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
