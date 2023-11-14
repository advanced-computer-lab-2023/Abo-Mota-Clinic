// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userRole: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setUserRole } = userSlice.actions;

export const userReducer = userSlice.reducer;
