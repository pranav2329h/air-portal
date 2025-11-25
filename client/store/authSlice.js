// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as apiLogin,
  register as apiRegister,
  me as apiMe,
  logoutLocal,
} from "../api/auth";

// LOGIN
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await apiLogin({ username, password });
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Invalid username or password");
    }
  }
);

// REGISTER
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await apiRegister(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Register failed");
    }
  }
);

// LOAD USER FROM localStorage ON APP START
export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiMe();
      return data;
    } catch {
      return rejectWithValue("No user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      logoutLocal();
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // register
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })

      // load user from storage
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
