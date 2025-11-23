import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as apiLogin, me } from "../api/auth";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await apiLogin(username, password);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      const meRes = await me();
      return meRes.data;

    } catch (err) {
      console.log(err);
      return rejectWithValue("Invalid username or password");
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
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
