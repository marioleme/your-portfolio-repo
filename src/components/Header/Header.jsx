import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import { useSmoothScroll } from '../../hooks/useScroll';
import logo2 from '../../assets/images/logo2.png';
import './Header.scss';

const Header = () => {
  const { state, actions } = useAppContext();
  const { scrollToSection } = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Início', href: '#hero' },
    { id: 'projects', label: 'Projetos', href: '#projects' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'about', label: 'Sobre', href: '#about' },
    { id: 'contact', label: 'Contato', href: '#contact' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    actions.setActiveSection(sectionId);
    
    // Close mobile menu if open
    if (state.isMobileMenuOpen) {
      actions.toggleMobileMenu();
    }
  };

  const handleThemeToggle = () => {
    actions.toggleTheme();
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header__container container">
        {/* Logo */}
        <motion.div
          className="header__logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={logo2} alt="Dev Logo" className="header__logo-img" />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="header__nav-item">
                <motion.button
                  className={`header__nav-link ${
                    state.activeSection === item.id ? 'header__nav-link--active' : ''
                  }`}
                  onClick={() => handleNavClick(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header__actions">
          {/* Social Links */}
          <div className="header__social">
            <motion.a
              href={`https://github.com/${state.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="header__social-link"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub Profile"
            >
              <FiGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/marioooliveira/"
              target="_blank"
              rel="noopener noreferrer"
              className="header__social-link"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin />
            </motion.a>
          </div>

          {/* Theme Toggle */}
          <motion.button
            className="header__theme-toggle"
            onClick={handleThemeToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Theme"
          >
            {state.theme === 'light' ? <FiMoon /> : <FiSun />}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="header__mobile-toggle"
            onClick={actions.toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Mobile Menu"
          >
            {state.isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`header__mobile-menu ${
            state.isMobileMenuOpen ? 'header__mobile-menu--open' : ''
          }`}
          initial={false}
          animate={{
            opacity: state.isMobileMenuOpen ? 1 : 0,
            y: state.isMobileMenuOpen ? 0 : -20
          }}
          transition={{ duration: 0.3 }}
        >
          <nav className="header__mobile-nav">
            <ul className="header__mobile-nav-list">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  className="header__mobile-nav-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: state.isMobileMenuOpen ? 1 : 0,
                    x: state.isMobileMenuOpen ? 0 : -20
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: state.isMobileMenuOpen ? index * 0.1 : 0 
                  }}
                >
                  <button
                    className={`header__mobile-nav-link ${
                      state.activeSection === item.id ? 'header__mobile-nav-link--active' : ''
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      {state.isMobileMenuOpen && (
        <motion.div
          className="header__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={actions.toggleMobileMenu}
        />
      )}
    </motion.header>
  );
};

export default Header;