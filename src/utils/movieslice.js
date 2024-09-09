
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    name:'movies',

    initialState:{

        nowPlayingMovies:null,
    },

    reducers:{


        addNowPlayingMovies:(state,action)=>{

            state.nowPlayingMovies=action.payload;
        },
        addPopularMovies:(state,action)=>{

            state.popularMovies=action.payload;
        },
        addTopRated:(state,action)=>{

            state.topRated=action.payload;
        },
        addTVSeries:(state,action)=>{

            state.tvSeries=action.payload;
        },
        addUpcomingMovies:(state,action)=>{

            state.upcomingMovies=action.payload;
        },
        addTrailerVideo: (state, action) => { // Add this reducer
            state.trailerVideo = action.payload;
        }
    }
});

export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addTopRated,addTVSeries,addUpcomingMovies}=moviesSlice.actions;

export default moviesSlice.reducer;