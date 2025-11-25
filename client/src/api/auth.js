// src/api/auth.js

const USERS_KEY = "airportal_users";
const CURRENT_USER_KEY = "airportal_current_user";

// ---- helpers ----
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// REGISTER (no backend)
export async function register(data) {
  const users = loadUsers();

  const exists = users.find((u) => u.username === data.username);
  if (exists) {
    const err = new Error("User already exists");
    err.code = "USER_EXISTS";
    throw err;
  }

  const newUser = {
    id: Date.now(),
    username: data.username,
    email: data.email || "",
    password: data.password,
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    mobile: data.mobile || "",
    passport_id: data.passport_id || "",
  };

  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return { data: newUser };
}

// LOGIN (no backend)
export async function login({ username, password }) {
  const users = loadUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    const err = new Error("Invalid username or password");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { data: user };
}

// CURRENT USER
export async function me() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) {
    const err = new Error("Not logged in");
    err.code = "NO_USER";
    throw err;
  }
  return { data: JSON.parse(raw) };
}

// UPDATE PROFILE
export async function updateProfile(updates) {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) {
    const err = new Error("Not logged in");
    err.code = "NO_USER";
    throw err;
  }

  const currentUser = JSON.parse(raw);
  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === currentUser.id);
  if (idx === -1) {
    const err = new Error("User not found");
    err.code = "NO_USER";
    throw err;
  }

  const updatedUser = { ...users[idx], ...updates };
  users[idx] = updatedUser;
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

  return { data: updatedUser };
}

// LOGOUT
export function logoutLocal() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
