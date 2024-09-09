import { useEffect } from "react";
import {   addUpcomingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";

const useUpcomingMovies =()=> {
    const dispatch=useDispatch();



const getUpcomingMovies=async ()=>{
  const data=await fetch("https://api.themoviedb.org/3/movie/upcoming",API_OPTIONS);        // line 8-23  . fetching data from api and putting it into the store
  const  json = await data.json();
  
  dispatch(addUpcomingMovies(json.results));

};

useEffect(()=> {
getUpcomingMovies();
},[]) // [] is necessary to avoid infinite loop

};

export default useUpcomingMovies;