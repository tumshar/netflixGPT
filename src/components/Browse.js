import React from 'react'
import Header from './Header';
import useNowPlayingMovie from '../hooks/useNowPlayingMovies';
import MainContainer from './mainContainer';
import SecondaryContainer from './secondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRated from '../hooks/useTopRated';
import useTVSeries from '../hooks/useTVSeries';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GPTSearch from './GPTSearch';


const Browse = () => {
  useTopRated();
usePopularMovies();
useTVSeries();
useNowPlayingMovie();
useUpcomingMovies();

  return (
    <div>
      <Header/>
      <GPTSearch/>
      <MainContainer/>
      <SecondaryContainer/>
      </div>
  )
};

export default Browse;