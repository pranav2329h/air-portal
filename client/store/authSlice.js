import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as apiLogin,
  register as apiRegister,
  me,
  updateProfile,
  changePassword
} from "../api/auth";

// -----------------------------------------
// LOGIN (GET TOKEN + USER INFO)
// -----------------------------------------
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const { data } = await apiLogin(username, password);

      // Save tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      return data.user; // user already included
    } catch (err) {
      return thunkAPI.rejectWithValue("Invalid username or password");
    }
  }
);

// -----------------------------------------
// REGISTER
// -----------------------------------------
export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const { data } = await apiRegister({ username, email, password });
      return data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue("Registration failed");
    }
  }
);

// -----------------------------------------
// LOAD PROFILE (ME)
// -----------------------------------------
export const loadProfileThunk = createAsyncThunk(
  "auth/loadProfile",
  async (_, thunkAPI) => {
    try {
      const { data } = await me();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load profile");
    }
  }
);

// -----------------------------------------
// UPDATE PROFILE
// -----------------------------------------
export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (payload, thunkAPI) => {
    try {
      const { data } = await updateProfile(payload);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to update profile");
    }
  }
);

// -----------------------------------------
// CHANGE PASSWORD
// -----------------------------------------
export const changePasswordThunk = createAsyncThunk(
  "auth/changePassword",
  async ({ old_password, new_password }, thunkAPI) => {
    try {
      const { data } = await changePassword({
        old_password,
        new_password,
      });
      return data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to change password");
    }
  }
);

// -----------------------------------------
// SLICE
// -----------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    logout(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    // LOGIN
    builder
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
      });

    // REGISTER
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    // LOAD PROFILE
    builder.addCase(loadProfileThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    // UPDATE PROFILE
    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.message = "Profile updated successfully";
    });

    // CHANGE PASSWORD
    builder.addCase(changePasswordThunk.fulfilled, (state, action) => {
      state.message = action.payload; // "Password changed"
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
