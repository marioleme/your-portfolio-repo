import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

// Custom hook for scroll position tracking
export const useScrollPosition = () => {
  const { actions } = useAppContext();
  const [scrollY, setScrollY] = useState(0);
  const currentActiveSection = useRef('hero');
  const lastUpdateTime = useRef(0);
  const isScrolling = useRef(false);
  const actionsRef = useRef(actions);
  
  // Keep actions ref updated
  actionsRef.current = actions;

  const handleScroll = useCallback(() => {
    const now = Date.now();
    const currentScrollY = window.scrollY;
    
    // Throttle scroll position updates to prevent excessive re-renders
    if (now - lastUpdateTime.current > 16) { // ~60fps
      setScrollY(currentScrollY);
      lastUpdateTime.current = now;
    }

    // Debounce section detection to avoid rapid changes
    if (isScrolling.current) {
      clearTimeout(isScrolling.current);
    }
    
    isScrolling.current = setTimeout(() => {
      // Determine active section based on scroll position
      const sections = ['hero', 'projects', 'skills', 'about', 'contact'];
      let activeSection = 'hero';

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
          if (isVisible) {
            activeSection = section;
          }
        }
      });

      // Only update if the active section has actually changed
      if (activeSection !== currentActiveSection.current) {
        currentActiveSection.current = activeSection;
        actionsRef.current.setActiveSection(activeSection);
      }
      
      // Update scroll position in context
      actionsRef.current.setScrollPosition(currentScrollY);
      isScrolling.current = false;
    }, 100); // 100ms debounce
  }, []); // No dependencies to prevent recreation

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clear any pending timeout
      if (isScrolling.current) {
        clearTimeout(isScrolling.current);
        isScrolling.current = false;
      }
    };
  }, [handleScroll]);

  const previousScrollY = useRef(scrollY);
  const isScrollingUp = scrollY < previousScrollY.current;
  previousScrollY.current = scrollY;

  return { scrollY, isScrollingUp };
};

// Custom hook for smooth scrolling to sections
export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      const headerHeight = 80; // Adjust based on your header height
      
      window.scrollTo({
        top: offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollToSection };
};

// Custom hook for intersection observer (for animations)
export const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState([]);

  const { threshold = 0.1, root = null, rootMargin = '0px' } = options;

  const observer = useCallback((node) => {
    if (node !== null) {
      const obs = new IntersectionObserver(
        (observedEntries) => {
          setEntries(observedEntries);
        },
        { threshold, root, rootMargin }
      );
      obs.observe(node);
      return () => obs.disconnect();
    }
  }, [threshold, root, rootMargin]);

  return [observer, entries];
};