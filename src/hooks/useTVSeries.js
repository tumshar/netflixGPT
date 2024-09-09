import { useEffect } from "react";
import {   addTVSeries } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";

const useTVSeries =()=> {
    const dispatch=useDispatch();



const getTVSeries=async ()=>{
  const data=await fetch("https://api.themoviedb.org/3/trending/tv/day",API_OPTIONS);        // line 8-23  . fetching data from api and putting it into the store
  const  json = await data.json();
  
  dispatch(addTVSeries(json.results));

};

useEffect(()=> {
getTVSeries();
},[]) // [] is necessary to avoid infinite loop

};

export default useTVSeries;