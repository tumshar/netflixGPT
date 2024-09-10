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
import { useSelector } from 'react-redux';



const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useTopRated();
  usePopularMovies();
  useTVSeries();
  useNowPlayingMovie();
  useUpcomingMovies();

  return (
    <div>
    <Header/>
    {showGptSearch ? (
      <GPTSearch/>
    ) : ( 
      <>
        <MainContainer/>
        <SecondaryContainer/>
      </>
    )}
  </div>
  
  )
};

export default Browse;