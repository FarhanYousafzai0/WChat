import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, clearUser } from "./UserService";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
  userLoading: false,
  userError: false,
  userSuccess: false,
  userMessage: "",
  myInfo: [],
  allUsers: [],
};

// ✅ Register
export const createUserData = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await createUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Register failed");
    }
  }
);

// ✅ Login
export const loginUserData = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await loginUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.userLoading = false;
      state.userError = false;
      state.userSuccess = false;
      state.userMessage = "";
    },
    logoutUser: (state) => {
      clearUser();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(createUserData.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(createUserData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.user = action.payload;
      })
      .addCase(createUserData.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
        state.user = null;
      })

      // Login
      .addCase(loginUserData.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(loginUserData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUserData.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
        state.user = null;
      });
  },
});

export const { resetUserState, logoutUser } = userSlice.actions;
export default userSlice.reducer;
