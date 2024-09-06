import React, { useEffect } from 'react'
import Header from './Header';
import useNowPlayingMovie from '../hooks/useNowPlayingMovies';


const Browse = () => {

useNowPlayingMovie();

  return (
    <div>
      <Header/>
      Browse</div>
  )
};

export default Browse;