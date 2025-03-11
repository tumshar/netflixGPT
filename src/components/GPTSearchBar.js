// GptSearchBar.js
import React, { useState, useEffect } from 'react';
import { FaSearch, FaMicrophone, FaTimes, FaRobot, FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import useVoiceSearch from '../hooks/usevoicesearch';
import { availableModels, query, mistralAICompletion, getMistralMovieRecommendations } from '../utils/huggingFaceApi';
import { setSelectedModel, setIsProcessing, setError, setLastQuery, setModelResponse } from '../utils/aiModelSlice';

const GPTSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModelSelector, setShowModelSelector] = useState(false);
  const { isListening, transcript, startListening, stopListening } = useVoiceSearch();
  
  const dispatch = useDispatch();
  const selectedModel = useSelector((store) => store.aiModel.selectedModel);
  const isProcessing = useSelector((store) => store.aiModel.isProcessing);
  const error = useSelector((store) => store.aiModel.error);
  
  // Get selected model name for display
  const selectedModelName = availableModels.find(model => model.id === selectedModel)?.name || 'Select Model';

  // Update search term when transcript changes
  useEffect(() => {
    if (transcript) {
      setSearchTerm(transcript);
    }
  }, [transcript]);

  const handleClear = () => {
    setSearchTerm('');
  };

  const handleModelSelect = (modelId) => {
    dispatch(setSelectedModel(modelId));
    setShowModelSelector(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    dispatch(setIsProcessing(true));
    dispatch(setError(null));
    dispatch(setLastQuery(searchTerm));
    
    try {
      let response;
      
      // Determine the type of query based on the selected model
      if (selectedModel === 'mistralai/Mistral-7B-Instruct-v0.2') {
        response = await mistralAICompletion(searchTerm);
      } else if (selectedModel === 'facebook/bart-large-cnn') {
        // For summarization model
        response = await query(selectedModel, searchTerm);
      } else if (selectedModel === 'distilbert-base-uncased-finetuned-sst-2-english') {
        // For sentiment analysis model
        response = await query(selectedModel, searchTerm);
      } else {
        // Default query for other models
        response = await query(selectedModel, searchTerm);
      }
      
      dispatch(setModelResponse(response));
      
      // If this is a movie search, also get movie recommendations
      if (searchTerm.toLowerCase().includes('movie') || 
          searchTerm.toLowerCase().includes('film') || 
          searchTerm.toLowerCase().includes('watch')) {
        const movieRecs = await getMistralMovieRecommendations(searchTerm);
        // Handle movie recommendations (you'll need to update your movieSuggestions state)
        // This would connect to your existing movie suggestion functionality
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setIsProcessing(false));
    }
  };

  return (
    <div className="pt-[7%] px-4">
      <form onSubmit={handleSubmit} className="w-full md:w-2/3 mx-auto">
        <div className="flex flex-col space-y-3">
          {/* Model selector dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowModelSelector(!showModelSelector)}
              className="flex items-center justify-between w-full md:w-1/3 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <FaRobot className="mr-2 text-red-500" />
                <span>{selectedModelName}</span>
              </div>
              <FaChevronDown className={`transition-transform ${showModelSelector ? 'rotate-180' : ''}`} />
            </button>
            
            {showModelSelector && (
              <div className="absolute z-30 mt-1 w-full md:w-1/3 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {availableModels.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => handleModelSelect(model.id)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${
                      selectedModel === model.id ? 'bg-red-50 text-red-600' : ''
                    }`}
                  >
                    <FaRobot className="mr-2 text-red-500" />
                    {model.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Search input area */}
          <div className="flex items-center space-x-2">
            <div className="flex-grow relative bg-white rounded-lg shadow-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-24 py-4 w-full rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition duration-300 text-lg"
                placeholder={`Ask ${selectedModelName} anything...`}
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
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`p-1.5 rounded-full ${
                    isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                  } hover:text-white hover:bg-gray-500 focus:outline-none transition duration-300`}
                >
                  <FaMicrophone size={20} />
                </button>
              </div>
            </div>
            <button 
              type="submit"
              disabled={isProcessing}
              className="z-20 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 font-semibold text-lg shadow-md flex items-center justify-center disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </span>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  {lang.spanish.search}
                </>
              )}
            </button>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm mt-1 px-2">
              Error: {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default GPTSearchBar;