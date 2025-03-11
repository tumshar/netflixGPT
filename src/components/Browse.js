import React from 'react';
import Header from './Header';
import useNowPlayingMovie from '../hooks/useNowPlayingMovies';
import MainContainer from './mainContainer';
import SecondaryContainer from './secondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRated from '../hooks/useTopRated';
import useTVSeries from '../hooks/useTVSeries';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GPTSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  useTopRated();
  usePopularMovies();
  useTVSeries();
  useNowPlayingMovie();
  useUpcomingMovies();
  
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  return (
    <div>
      <Header/>
      {showGptSearch ? <GPTSearch/> : <>
        <MainContainer/>
        <SecondaryContainer/>
      </>}
    </div>
  );
};

export default Browse;
