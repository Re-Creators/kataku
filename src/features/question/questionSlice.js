import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const getQuestions = createAsyncThunk(
  "question/fetch",
  async (numQuestion) => {
    try {
      const { data } = await axios.get(`/questions/${numQuestion}`);
      return data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getQuestions.rejected, (state) => {
        state.loading = false;
        state.error = "Cannot get the weather!";
      });
  },
});

export const selectQuestions = (state) => state.question.data;
export const selectLoading = (state) => state.question.loading;
export const selectError = (state) => state.question.error;

export default questionSlice.reducer;
