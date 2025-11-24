import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    const users = loadUsers();

    if (users.find((u) => u.username === payload.username)) {
      return rejectWithValue("Username already exists");
    }

    const newUser = {
      id: Date.now(),
      username: payload.username,
      email: payload.email || "",
      password: payload.password,
      first_name: payload.first_name || "",
      last_name: payload.last_name || "",
      mobile: payload.mobile || "",
      passport_id: payload.passport_id || "",
      age: payload.age || "",
      gender: payload.gender || "",
      address: payload.address || "",
      profile_image: payload.profile_image || "",
      loyalty_points: 0,
    };

    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return newUser;
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    const users = loadUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return rejectWithValue("Invalid username or password");
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
);

const storedUser = localStorage.getItem(CURRENT_USER_KEY);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.user));

      const users = loadUsers();
      const idx = users.findIndex((u) => u.id === state.user.id);
      if (idx !== -1) {
        users[idx] = state.user;
        saveUsers(users);
      }
    },
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem(CURRENT_USER_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload || "Registration failed";
      })
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
      });
  },
});

export const { logout, setUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
