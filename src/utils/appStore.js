import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import movieSuggestionsReducer from "./movieSuggestionsSlice";
import aiModelReducer from "./aiModelSlice";

const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            movies: moviesReducer,
            gpt: gptReducer,
            movieSuggestions: movieSuggestionsReducer,
            aiModel: aiModelReducer
        },
    },
);

export default appStore;