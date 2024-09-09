import React from 'react'
import MovieList from './movieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies=useSelector(store=>store.movies);
  return (
    movies.nowPlayingMovies && (
    <div className=' bg-neutral-900'>
      <div className='-mt-52 pl-2 relative z-20'>
      <MovieList title={"Top Rated"} movies={movies.topRated}/>
      <MovieList title={"upcoming movies"} movies={movies.upcomingMovies}/>
      <MovieList title={"TV Series"} movies={movies.tvSeries}/>
      <MovieList title={"now Playing"} movies={movies.nowPlayingMovies}/>
     
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
   
    </div>
    </div>
  )
);
};

export default SecondaryContainer;