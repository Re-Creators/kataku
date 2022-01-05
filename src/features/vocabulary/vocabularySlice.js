import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  isFetching: false,
  data: null,
  selectedVocabulary: null,
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
  reducers: {
    setSelectedVocabulary: (state, { payload }) => {
      state.selectedVocabulary = payload;
    },
  },
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

export const { setSelectedVocabulary } = vocabularySlice.actions;
export const vocabularySelector = (state) => state.vocabulary;
export default vocabularySlice.reducer;
