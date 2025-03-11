import { createSlice } from "@reduxjs/toolkit";

const movieSuggestionsSlice = createSlice({
  name: 'movieSuggestions',
  initialState: {
    suggestions: [],
    loading: false,
    error: null
  },
  reducers: {
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
      state.error = null;
    }
  }
});

export const { setSuggestions, setLoading, setError, clearSuggestions } = movieSuggestionsSlice.actions;
export default movieSuggestionsSlice.reducer;
