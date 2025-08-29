import { useState, useEffect, useRef } from 'react';

// Custom hook for typing animation
export const useTypingAnimation = (texts, speed = 100, delay = 2000) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentFullText = texts[currentTextIndex];

    if (isTyping) {
      if (currentText.length < currentFullText.length) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        }, speed);
      } else {
        setIsTyping(false);
        timeoutRef.current = setTimeout(() => {
          setIsTyping(true);
          setCurrentText('');
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          
          // Mark as complete after first cycle
          if (currentTextIndex === texts.length - 1) {
            setIsComplete(true);
          }
        }, delay);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentText, currentTextIndex, isTyping, texts, speed, delay]);

  return { 
    currentText, 
    isTyping, 
    isComplete,
    currentTextIndex 
  };
};