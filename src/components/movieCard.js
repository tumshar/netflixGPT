import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({ posterPath, title }) => {
  return (
    <div className='w-64 m-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-300'>
      <div className='relative pb-[150%]'>
        <img 
          alt={title || "Movie poster"}
          src={IMG_CDN_URL + posterPath}
          className='absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 hover:opacity-90'
        />
      </div>
      {title && (
        <div className='p-5 border-t border-gray-300'>
          <h3 className='text-base font-semibold text-gray-800 truncate'>
            {title}
          </h3>
        </div>
      )}
    </div>
  )
}

export default MovieCard;