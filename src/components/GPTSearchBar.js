import React, { useState } from 'react';
import { FaSearch, FaMicrophone, FaTimes } from 'react-icons/fa';

const GPTSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="pt-[7%] px-4">
      <form className='w-full md:w-2/3 mx-auto p-4 bg-black rounded-lg shadow-lg'>
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input 
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 pr-36 py-3 w-full rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600'
            placeholder="What would you like to watch today?"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-32 p-1 bg-gray-600 rounded-full text-gray-400 hover:text-white hover:bg-gray-500 focus:outline-none"
            >
              <FaTimes size={14} />
            </button>
          )}
          <FaMicrophone className="absolute right-36 text-gray-400 cursor-pointer hover:text-red-600" />
          <button className='absolute right-0 h-full px-6 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition duration-300 font-semibold text-lg shadow-md flex items-center justify-center'>
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default GPTSearchBar;