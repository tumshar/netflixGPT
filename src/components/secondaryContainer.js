import React from 'react'
import MovieList from './movieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className='bg-neutral-900'>
        <div className='-mt-52 pl-2 relative z-20'>
          <MovieList title="Top Rated" movies={movies.topRated} titleClass="text-2xl font-bold text-white mb-4 uppercase tracking-wider"/>
          <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} titleClass="text-2xl font-bold text-yellow-400 mb-4 italic"/>
          <MovieList title="TV Series" movies={movies.tvSeries} titleClass="text-2xl font-bold text-blue-400 mb-4 underline"/>
          <MovieList title="Now Playing" movies={movies.nowPlayingMovies} titleClass="text-2xl font-bold text-green-400 mb-4 capitalize"/>
          <MovieList title="Popular" movies={movies.popularMovies} titleClass="text-2xl font-bold text-red-400 mb-4 shadow-sm"/>
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;