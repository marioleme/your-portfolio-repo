import { createContext, useContext, useReducer } from 'react';

// Initial state for the application
const initialState = {
  activeSection: 'hero',
  theme: 'dark',
  language: 'pt', // 'pt' ou 'en'
  isLoading: false,
  githubUsername: 'marioleme', // Username real do GitHub para integração com API
  scrollPosition: 0,
  isMobileMenuOpen: false
};

// Action types
const actionTypes = {
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
  TOGGLE_THEME: 'TOGGLE_THEME',
  TOGGLE_LANGUAGE: 'TOGGLE_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  SET_SCROLL_POSITION: 'SET_SCROLL_POSITION',
  TOGGLE_MOBILE_MENU: 'TOGGLE_MOBILE_MENU',
  SET_GITHUB_USERNAME: 'SET_GITHUB_USERNAME'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_SECTION:
      return { ...state, activeSection: action.payload };
    case actionTypes.TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case actionTypes.TOGGLE_LANGUAGE:
      return { ...state, language: state.language === 'pt' ? 'en' : 'pt' };
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case actionTypes.SET_SCROLL_POSITION:
      return { ...state, scrollPosition: action.payload };
    case actionTypes.TOGGLE_MOBILE_MENU:
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    case actionTypes.SET_GITHUB_USERNAME:
      return { ...state, githubUsername: action.payload };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setActiveSection: (section) => 
      dispatch({ type: actionTypes.SET_ACTIVE_SECTION, payload: section }),
    toggleTheme: () => 
      dispatch({ type: actionTypes.TOGGLE_THEME }),
    toggleLanguage: () => 
      dispatch({ type: actionTypes.TOGGLE_LANGUAGE }),
    setLoading: (loading) => 
      dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setScrollPosition: (position) => 
      dispatch({ type: actionTypes.SET_SCROLL_POSITION, payload: position }),
    toggleMobileMenu: () => 
      dispatch({ type: actionTypes.TOGGLE_MOBILE_MENU }),
    setGithubUsername: (username) => 
      dispatch({ type: actionTypes.SET_GITHUB_USERNAME, payload: username })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};