// src/components/HeaderAIToggle.js
import React from 'react';
import { FaRobot } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGptSearchView } from '../utils/gptSlice';

const HeaderAIToggle = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  
  return (
    <button 
      onClick={() => dispatch(toggleGptSearchView())}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
        showGptSearch 
          ? 'bg-red-600 text-white hover:bg-red-700' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      <FaRobot className="mr-2" />
      {showGptSearch ? 'Back to Browse' : 'AI Search'}
    </button>
  );
};

export default HeaderAIToggle;