import { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { useScrollPosition } from './hooks/useScroll';

// Import components (will create these next)
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Main app content component
const AppContent = () => {
  const { state } = useAppContext();
  useScrollPosition(); // Initialize scroll tracking

  useEffect(() => {
    // Set theme attribute on document
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  if (state.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
    </div>
  );
};

// Main App component with provider
const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;