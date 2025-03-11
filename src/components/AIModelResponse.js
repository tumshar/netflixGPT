// src/components/AIModelResponse.js
import React from 'react';
import { useSelector } from 'react-redux';
import { availableModels } from '../utils/huggingFaceApi';

const AIModelResponse = () => {
  const { selectedModel, lastQuery, modelResponse, isProcessing, error } = useSelector((store) => store.aiModel);
  
  // Get the selected model name for display
  const selectedModelName = availableModels.find(model => model.id === selectedModel)?.name || 'AI Model';
  
  // Format the response based on the model type
  const formatResponse = (response) => {
    if (!response) return null;
    
    // For sentiment analysis model
    if (selectedModel === 'distilbert-base-uncased-finetuned-sst-2-english') {
      if (Array.isArray(response)) {
        return (
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Sentiment Analysis</h3>
            {response.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    {(item.score * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
    
    // For BART summarization model
    if (selectedModel === 'facebook/bart-large-cnn') {
      if (Array.isArray(response) && response[0]?.summary_text) {
        return (
          <div>
            <h3 className="font-medium text-lg mb-2">Summary</h3>
            <p className="p-4 bg-gray-50 rounded-lg">{response[0].summary_text}</p>
          </div>
        );
      }
    }
    
    // For text generation models (Mistral, Llama, etc.)
    // Handle different response formats
    if (typeof response === 'string') {
      return <p className="whitespace-pre-line">{response}</p>;
    } else if (Array.isArray(response)) {
      return <p className="whitespace-pre-line">{response[0]?.generated_text || JSON.stringify(response, null, 2)}</p>;
    } else if (response.generated_text) {
      return <p className="whitespace-pre-line">{response.generated_text}</p>;
    } else {
      // Default fallback for unknown formats
      return <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">{JSON.stringify(response, null, 2)}</pre>;
    }
  };

  if (!lastQuery && !modelResponse && !isProcessing && !error) {
    return (
      <div className="w-full md:w-2/3 mx-auto mt-6 p-6 bg-white rounded-lg shadow-md text-center">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Ask Anything!</h3>
          <p>Select a model and ask a question to see AI-powered responses</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {availableModels.slice(0, 3).map((model) => (
            <div key={model.id} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-1">{model.name}</h4>
              <p className="text-sm text-gray-500">
                {model.id.includes('mistral') ? 'General purpose AI assistant' : 
                 model.id.includes('bart') ? 'Text summarization' :
                 model.id.includes('distilbert') ? 'Sentiment analysis' :
                 'Text generation'}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/3 mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      {lastQuery && (
        <div className="mb-4">
          <div className="flex items-start space-x-3">
            <div className="bg-red-100 p-2 rounded-full">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium">You</p>
              <p className="text-gray-700">{lastQuery}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t pt-4">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-medium">{selectedModelName}</p>
            
            {isProcessing ? (
              <div className="flex items-center space-x-2 text-gray-500 my-4">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Thinking...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 my-4">
                <p className="font-medium">Error</p>
                <p>{error}</p>
                <p className="text-sm mt-2">Try a different model or rephrase your question.</p>
              </div>
            ) : modelResponse ? (
              <div className="my-4">
                {formatResponse(modelResponse)}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModelResponse;