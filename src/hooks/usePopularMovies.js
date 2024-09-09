import { useEffect } from "react";
import {  addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";

const usePopularMovies =()=> {
    const dispatch=useDispatch();



const getPopularMovies=async ()=>{
  const data=await fetch("https://api.themoviedb.org/3/movie/popular",API_OPTIONS);        // line 8-23  . fetching data from api and putting it into the store
  const  json = await data.json();
  
  dispatch(addPopularMovies(json.results));

};

useEffect(()=> {
getPopularMovies();
},[]) // [] is necessary to avoid infinite loop

};

export default usePopularMovies;