import { useEffect, lazy, Suspense } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { useScrollPosition } from './hooks/useScroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import critical components (above the fold)
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import BackToTop from './components/BackToTop/BackToTop';

// Lazy load components below the fold for better performance
const Projects = lazy(() => import('./components/Projects/Projects'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const About = lazy(() => import('./components/About/About'));
const Contact = lazy(() => import('./components/Contact/Contact'));

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
      {/* Skip Navigation for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Pular para o conteúdo principal
      </a>
      
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
          <Skills />
          <About />
          <Contact />
        </Suspense>
      </main>
      <BackToTop />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={state.theme}
      />
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