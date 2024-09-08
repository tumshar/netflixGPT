import React from 'react'
import MovieCard from './movieCard';

const MovieList = ({title, movies}) => {
console.log(movies);
  return (
    <div>
        <div>
            <h1>{title}</h1>
        
        <div>
            {movies?.map((movie)=>(
             <MovieCard key={movie.id} posterPath={movie.poster_path}/>
            ))}
       
        </div>
        </div>
    </div>
  )
}

export default MovieList;