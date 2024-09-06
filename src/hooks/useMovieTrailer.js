import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieslice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer=(movieID)=>{


    // fetch trailer videos and updating the store with the trailer video data
    const dispatch=useDispatch();



    const getMovieVideos=async ()=>{
      const data= await fetch("https://api.themoviedb.org/3/movie/"+movieID+"/videos?language=en-US ", API_OPTIONS) // options will come from my constants
     const json=await data.json();
     
  
    const filterData=json.results.filter(video=>video.type==="Trailer");
    const trailer =filterData.length? filterData[0]: json.results[0]; // this is written to handle errors
    
    dispatch(addTrailerVideo(trailer));
  
    };
  
    useEffect(()=>{
      getMovieVideos();
    },[]);
  
}


export default useMovieTrailer;