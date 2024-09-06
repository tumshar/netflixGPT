import React, { useEffect } from 'react'
import Header from './Header';
import { API_OPTIONS } from '../utils/constants';
import { API_URL } from '../utils/constants';

const Browse = () => {

const getNowPlayingMovies=async ()=>{
  const data=await fetch(API_URL, API_OPTIONS);
  const  json = await data.json();
  console.log(json.results);




};

useEffect(()=> {
getNowPlayingMovies();
},[]) // [] is necessary to avoid infinite loop



  return (
    <div>
      <Header/>
      Browse</div>
  )
};

export default Browse;