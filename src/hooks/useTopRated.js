import { useEffect } from "react";
import {  addTopRated } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";

const useTopRated =()=> {
    const dispatch=useDispatch();



const getTopRated=async ()=>{
  const data=await fetch("https://api.themoviedb.org/3/movie/top_rated",API_OPTIONS);        // line 8-23  . fetching data from api and putting it into the store
  const  json = await data.json();
  
  dispatch(addTopRated(json.results));

};

useEffect(()=> {
getTopRated();
},[]) // [] is necessary to avoid infinite loop

};

export default useTopRated;