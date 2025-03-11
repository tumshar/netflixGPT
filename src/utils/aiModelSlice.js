// src/utils/aiModelSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { availableModels } from "./huggingFaceApi";

const aiModelSlice = createSlice({
  name: "aiModel",
  initialState: {
    selectedModel: availableModels[0].id, // Default to Mistral AI
    isProcessing: false,
    error: null,
    lastQuery: "",
    modelResponse: null
  },
  reducers: {
    setSelectedModel: (state, action) => {
      state.selectedModel = action.payload;
    },
    setIsProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLastQuery: (state, action) => {
      state.lastQuery = action.payload;
    },
    setModelResponse: (state, action) => {
      state.modelResponse = action.payload;
    }
  }
});

export const {
  setSelectedModel,
  setIsProcessing,
  setError,
  setLastQuery,
  setModelResponse
} = aiModelSlice.actions;

export default aiModelSlice.reducer;