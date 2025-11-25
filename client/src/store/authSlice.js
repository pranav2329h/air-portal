// client/src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as apiLogin, register as apiRegister, me as apiMe, logoutLocal } from "../api/auth";

// 🔐 LOGIN (Frontend-only, localStorage)
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await apiLogin({ username, password });
      return res.data; // return logged-in user
    } catch (err) {
      return rejectWithValue(err.message || "Invalid username or password");
    }
  }
);

// 🆕 REGISTER
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await apiRegister(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔄 LOAD USER FROM LOCALSTORAGE
export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiMe();
      return res.data;
    } catch {
      return rejectWithValue(null);
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
      logoutLocal(); // clear localStorage
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN ----------
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
        state.error = action.payload;
      })

      // REGISTER ----------
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // auto-login after register
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOAD USER ----------
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
