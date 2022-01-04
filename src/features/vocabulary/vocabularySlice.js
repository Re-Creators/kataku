import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  isFetching: false,
  data: null,
};

export const getVocabularies = createAsyncThunk(
  "vocabulary/fetch",
  async () => {
    try {
      const { data } = await axios.get("/vocabularies");
      return data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

export const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState,
  reducers: {},
  extraReducers: {
    [getVocabularies.pending]: (state) => {
      state.isFetching = true;
    },
    [getVocabularies.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.data = payload;
    },
  },
});

export const vocabularySelector = (state) => state.vocabulary;
export default vocabularySlice.reducer;
