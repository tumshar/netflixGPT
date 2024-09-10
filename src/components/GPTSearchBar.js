import React, { useState } from 'react';
import { FaSearch, FaMicrophone, FaTimes } from 'react-icons/fa';

const GPTSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="pt-[7%] px-4">
      <form className='w-full md:w-2/3 mx-auto flex items-center space-x-2'>
        <div className='flex-grow relative bg-white rounded-lg shadow-md'>
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-12 pr-24 py-4 w-full rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition duration-300 text-lg'
            placeholder="What would you like to watch today?"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 bg-gray-200 rounded-full text-gray-600 hover:text-white hover:bg-gray-500 focus:outline-none transition duration-300"
              >
                <FaTimes size={14} />
              </button>
            )}
            <FaMicrophone className="text-gray-400 cursor-pointer hover:text-red-500 transition duration-300" size={20} />
          </div>
        </div>
        <button className='px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 font-semibold text-lg shadow-md flex items-center justify-center'>
          <FaSearch className="mr-2" />
          Search
        </button>
      </form>
    </div>
  )
}

export default GPTSearchBar;