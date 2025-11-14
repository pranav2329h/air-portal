import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as apiLogin, me } from "../api/auth";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const { data } = await apiLogin(username, password);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    const meRes = await me();
    return meRes.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    logout(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
