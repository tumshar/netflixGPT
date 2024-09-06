import React, { useEffect } from 'react'
import Header from './Header';
import useNowPlayingMovie from '../hooks/useNowPlayingMovies';
import MainContainer from './mainContainer';
import SecondaryContainer from './secondaryContainer';


const Browse = () => {

useNowPlayingMovie();

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
      </div>
  )
};

export default Browse;