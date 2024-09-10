import React from 'react';
import GPTSearchBar from './GPTSearchBar';
import GPTMovieSuggestions from './GPTMovieSuggestions';
import { BG_URL } from '../utils/constants';

const GPTSearch = () => {
  return (
    <div>
         <div className='absolute inset-0 '>
        <img 
          src={BG_URL}
          alt='Netflix back' className='object-cover h-full w-full'/>
      </div>
        <GPTSearchBar/>
    <GPTMovieSuggestions/>
    </div>
  )
}

export default GPTSearch;