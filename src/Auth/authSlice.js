import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuth: false,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.role = action.payload.role;
      state.loading = false;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  signUpSuccess,
  logout,
  setError,
  setLoading,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
