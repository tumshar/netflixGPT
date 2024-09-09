import React from 'react'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div className="flex space-x-4">
        <button 
          className="bg-white text-black py-4 px-10 text-2xl rounded-full hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
        >
          <FaPlay className="mr-3 text-3xl" /> Play
        </button>
        <button 
          className="bg-gray-500 text-white py-4 px-10 text-2xl bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
        >
          <FaInfoCircle className="mr-3 text-3xl" /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;