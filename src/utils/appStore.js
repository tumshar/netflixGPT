import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./GPTSlice";

const appStore=configureStore(
    {
        reducer:{
            user:userReducer,
            movies:moviesReducer,
            gpt:gptReducer, // why can i not use GPTSlice.reducer directly?
        },
    },
);

export default appStore;



