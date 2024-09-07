import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS, API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const useNowPlayingMovie =()=> {
    const dispatch=useDispatch();



const getNowPlayingMovies=async ()=>{
  const data=await fetch(API_URL, API_OPTIONS);        // line 8-23  . fetching data from api and putting it into the store
  const  json = await data.json();
  
  dispatch(addNowPlayingMovies(json.results));

};

useEffect(()=> {
getNowPlayingMovies();
},[]) // [] is necessary to avoid infinite loop

};

export default useNowPlayingMovie;