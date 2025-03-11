import React from 'react';
import GPTSearchBar from './GptSearchBar';
import GPTMovieSuggestions from './GptMovieSuggestions';
import AIModelResponse from './AIModelResponse';
import { BG_URL } from '../utils/constants';

const GPTSearch = () => {
  return (
    <div>
      <div className='absolute inset-0'>
        <img 
          src={BG_URL}
          alt='Netflix back' className='object-cover h-full w-full'/>
      </div>
      <div className="relative z-10 min-h-screen pb-16">
        <GPTSearchBar/>
        <AIModelResponse/>
        <GPTMovieSuggestions/>
      </div>
    </div>
  )
}

export default GPTSearch;