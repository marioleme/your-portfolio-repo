import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiChevronDown } from 'react-icons/fi';
import { SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiNodedotjs } from 'react-icons/si';
import { useTypingAnimation } from '../../hooks/useTypingAnimation';
import { useAppContext } from '../../context/AppContext';
import { useSmoothScroll } from '../../hooks/useScroll';
import { translations } from '../../data/translations';
import './Hero.scss';

const Hero = () => {
  const { state } = useAppContext();
  const { scrollToSection } = useSmoothScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  // Get current language translations
  const t = translations[state.language];

  // Typing animation texts from translations
  const { currentText, isTyping } = useTypingAnimation(t.hero.titles, 150, 2000);

  // Technology stack
  const techStack = [
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
    { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScrollToProjects = () => {
    scrollToSection('projects');
  };

  const handleDownloadCV = () => {
    // Replace with actual CV download logic
    console.log('Download CV');
  };

  return (
    <section id="hero" className="hero section">
      <div className="hero__container container">
        <div className="hero__content">
          {/* Main Content */}
          <motion.div
            className="hero__main"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Greeting */}
            <motion.p
              className="hero__greeting"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.hero.greeting}
            </motion.p>

            {/* Name */}
            <motion.h1
              className="hero__name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="hero__name-highlight">{t.hero.name}</span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              className="hero__title"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="hero__title-text">
                {currentText}
                <span className={`hero__cursor ${isTyping ? 'hero__cursor--blink' : ''}`}>|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="hero__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {t.hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.button
                className="btn btn-primary hero__cta-button"
                onClick={handleScrollToProjects}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.hero.viewProjects}
              </motion.button>

              <motion.a
                href="https://drive.google.com/file/d/1XLbCxjgMEN2-n-8sJKvnRq0tSQgWe1LU/view"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary hero__cta-button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload />
                {t.hero.downloadCV}
              </motion.a>
            </motion.div>
            

            {/* Social Links */}
            <motion.div
              className="hero__social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.a
                href={`https://github.com/${state.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <FiGithub />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/mariooliveira"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </motion.a>
              <motion.a
                href="mailto:mario.oliveirag12@gmail.com"
                className="hero__social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <FiMail />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="hero__tech"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="hero__tech-title">{t.hero.techStack}</h3>
            <div className="hero__tech-grid">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="hero__tech-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + index * 0.1,
                    ease: 'easeOut'
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <tech.icon 
                    className="hero__tech-icon" 
                    style={{ color: tech.color }}
                  />
                  <span className="hero__tech-name">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.button
            className="hero__scroll-button"
            onClick={handleScrollToProjects}
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            whileHover={{ scale: 1.1 }}
            aria-label="Scroll to projects"
          >
            <FiChevronDown />
          </motion.button>
          <span className="hero__scroll-text">{t.hero.scrollText}</span>
        </motion.div>

        {/* Background Animation */}
        <div className="hero__background" >
          <motion.div
            className="hero__bg-element hero__bg-element--1"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
          />
          <motion.div
            className="hero__bg-element hero__bg-element--2"
            animate={{ 
              rotate: -360,
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
          />
          <motion.div
            className="hero__bg-element hero__bg-element--3"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;