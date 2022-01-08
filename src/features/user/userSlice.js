import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient from "../../axios";

const backend_url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api"
    : "https://kataku-backend.herokuapp.com/";

const initialState = {
  user: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const signup = createAsyncThunk(
  "user/signup",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        `${backend_url}/auth/register`,
        { username, email, password }
      );

      if (status === 200) {
        localStorage.setItem("kataku_token", data.token);
        console.log(data.user);

        return data.user;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const { data, status } = await axiosClient.get("/user");
      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      if (e.response.status === 400) {
        localStorage.clear("kataku_token");
        window.location.href =
          process.env.NODE_ENV === "development"
            ? "http://localhost:8080/login"
            : "https://kataku-io.netlify.app/login";
      }
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      if (status === 200) {
        localStorage.setItem("kataku_token", data.token);
        return data.user;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    logout: (state) => {
      localStorage.clear("kataku_token");
      window.location.href = "http://localhost:3000/login";
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: {
    [signup.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload;
    },
    [signup.pending]: (state) => {
      state.isFetching = true;
    },
    [signup.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [login.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [login.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload;
    },
    [fetchUser.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState, logout, updateUser } = userSlice.actions;

export const userSelector = (state) => state.user;
export default userSlice.reducer;
