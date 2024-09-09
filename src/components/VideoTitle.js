import React, { useEffect, useState } from 'react'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'

const VideoTitle = ({title, overview}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className='w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-t from-black via-transparent to-transparent'>
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className='text-7xl font-bold mb-4 text-shadow-lg'>{title}</h1>
        <p className='py-4 text-xl w-1/3 leading-relaxed text-shadow-md'>{overview}</p>
        <div className="flex space-x-6 mt-8">
          <button className="bg-white text-black py-4 px-12 text-2xl font-bold rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center">
            <FaPlay className="mr-3 text-3xl" /> Play
          </button>
          <button className="bg-gray-800 text-white py-4 px-12 text-2xl font-bold rounded-md hover:bg-gray-700 transition-all duration-300 flex items-center">
            <FaInfoCircle className="mr-3 text-3xl" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;