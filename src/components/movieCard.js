import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({ posterPath, title }) => {
  return (
    <div className='w-48 m-2 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out'>
      <div className='relative pb-[150%]'>
        <img 
          alt={title || "Movie poster"}
          src={IMG_CDN_URL + posterPath}
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
      </div>
      {title && (
        <div className='p-4'>
          <h3 className='text-sm font-semibold text-gray-800 truncate'>
            {title}
          </h3>
        </div>
      )}
    </div>
  )
}

export default MovieCard;