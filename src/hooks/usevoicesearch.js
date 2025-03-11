// hooks/useVoiceSearch.js
import { useState, useEffect } from 'react';

const useVoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let recognition;

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false; // Stop after one sentence
      recognition.interimResults = false; // Only final results
      recognition.lang = 'en-US'; // Set language

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        setIsListening(false); // Stop listening after getting the result
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    } else {
      console.warn('Speech recognition not supported in this browser.');
    }

    if (isListening) {
      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

  const startListening = () => {
    setTranscript(''); // Clear previous transcript
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
};

export default useVoiceSearch;