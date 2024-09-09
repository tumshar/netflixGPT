import React from 'react'
import Header from './Header';
import useNowPlayingMovie from '../hooks/useNowPlayingMovies';
import MainContainer from './mainContainer';
import SecondaryContainer from './secondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRated from '../hooks/useTopRated';
import useTVSeries from '../hooks/useTVSeries';
import useUpcomingMovies from '../hooks/useUpcomingMovies';


const Browse = () => {
  useTopRated();
usePopularMovies();
useTVSeries();
useNowPlayingMovie();
useUpcomingMovies();

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
      </div>
  )
};

export default Browse;