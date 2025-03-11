// src/components/GptMovieSuggestions.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IMG_CDN_URL } from '../utils/constants';
import { fetchMovieDetailsFromTMDB } from '../utils/huggingFaceApi';

const GPTMovieSuggestions = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const modelResponse = useSelector((store) => store.aiModel.modelResponse);
  const lastQuery = useSelector((store) => store.aiModel.lastQuery);
  
  // Extract movie titles from the model response
  const extractMovieTitles = (response) => {
    if (!response) return [];
    
    // Check if we might have movie recommendations in the response
    const isMovieRelatedQuery = lastQuery.toLowerCase().includes('movie') || 
                              lastQuery.toLowerCase().includes('film') || 
                              lastQuery.toLowerCase().includes('watch');
                              
    if (!isMovieRelatedQuery) return [];
    
    try {
      // Try to extract a JSON array from the response
      let jsonStr = '';
      if (typeof response === 'string') {
        const match = response.match(/\[.*\]/s);
        if (match) jsonStr = match[0];
      } else if (Array.isArray(response)) {
        jsonStr = response[0]?.generated_text || '';
        const match = jsonStr.match(/\[.*\]/s);
        if (match) jsonStr = match[0];
      } else if (response.generated_text) {
        jsonStr = response.generated_text;
        const match = jsonStr.match(/\[.*\]/s);
        if (match) jsonStr = match[0];
      }
      
      if (jsonStr) {
        try {
          const movies = JSON.parse(jsonStr);
          return Array.isArray(movies) ? movies.map(movie => movie.title) : [];
        } catch (error) {
          console.error('Failed to parse movie JSON', error);
        }
      }
      
      // If JSON parsing fails, try regex extraction
      const text = typeof response === 'string' 
        ? response 
        : Array.isArray(response) 
          ? response[0]?.generated_text || '' 
          : response.generated_text || '';
          
      // Extract movie titles using regex (looks for patterns like "1. Movie Title (2008)" or just "Movie Title")
      const movieMatches = text.match(/(?:\d+\.\s*|\-\s*)([^(]+)(?:\((\d{4})\))?/g) || [];
      return movieMatches.map(match => {
        // Clean up the match to get just the title
        return match.replace(/^\d+\.\s*|\-\s*/, '').replace(/\(\d{4}\)$/, '').trim();
      });
    } catch (error) {
      console.error('Error extracting movie titles', error);
      return [];
    }
  };
  
  useEffect(() => {
    const fetchMovies = async () => {
      // Only run if we have a model response
      if (!modelResponse) return;
      
      const titles = extractMovieTitles(modelResponse);
      if (titles.length === 0) return;
      
      setLoading(true);
      
      try {
        // Fetch details for each movie from TMDB
        const detailsPromises = titles.map(title => fetchMovieDetailsFromTMDB(title));
        const results = await Promise.all(detailsPromises);
        
        // Filter out any null results and limit to max 5 movies
        const validResults = results.filter(movie => movie !== null).slice(0, 5);
        setMovieDetails(validResults);
      } catch (error) {
        console.error('Error fetching movie details', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [modelResponse, lastQuery]);
  
  if (loading) {
    return (
      <div className="w-full md:w-2/3 mx-auto mt-6 p-6 bg-white rounded-lg shadow-md text-center">
        <div className="flex justify-center items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Finding the best movies for you...</span>
        </div>
      </div>
    );
  }
  
  if (movieDetails.length === 0) {
    return null;
  }
  
  return (
    <div className="w-full md:w-2/3 mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movieDetails.map(movie => (
          <div key={movie.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            {movie.poster_path ? (
              <img 
                src={`${IMG_CDN_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1 truncate" title={movie.title}>{movie.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{movie.release_date?.split('-')[0] || 'N/A'}</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">
                  ★ {movie.vote_average?.toFixed(1) || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;