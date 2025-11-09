import { motion } from 'framer-motion';
import { FiDownload, FiMapPin, FiCalendar, FiGithub } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../../context/AppContext';
import { translations } from '../../data/translations';
import './About.scss';

const About = () => {
  const { state } = useAppContext();
  const t = translations[state.language];
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Manual GitHub stats to avoid API rate limiting
  const githubStats = {
    totalRepos: 8,
    totalStars: 45,
    followers: 25,
    totalForks: 12,
    languages: {
      'JavaScript': 45000,
      'TypeScript': 28000,
      'PHP': 32000,
      'HTML': 22000,
      'CSS': 18000,
      'Python': 15000
    }
  };

  // Get timeline from translations
  const timeline = t.about.timeline;

  return (
    <section id="about" className="about section">
      <div className="about__container container">
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about__title">{t.about.title}</h2>
          <p className="about__subtitle">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="about__content" ref={ref}>
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="about__description">
              <p>{t.about.description.p1}</p>
              <p>{t.about.description.p2}</p>
              <p>{t.about.description.p3}</p>
            </div>

                        <motion.a
              href="/assets/curriculo-mario-oliveira.pdf"
              download="Mario_Oliveira_CV.pdf"
              className="btn btn-primary about__cv-button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload />
              {t.about.downloadCV}
            </motion.a>
          </motion.div>

          <motion.div
            className="about__stats"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="github-stats">
              <h3 className="github-stats__title">
                <FiGithub />
                {t.about.githubStats}
              </h3>
              
              <div className="github-stats__grid">
                <div className="github-stat-item">
                  <span className="github-stat-item__value">{githubStats.totalRepos}</span>
                  <span className="github-stat-item__label">{t.about.repositories}</span>
                </div>
                <div className="github-stat-item">
                  <span className="github-stat-item__value">{githubStats.totalStars}</span>
                  <span className="github-stat-item__label">{t.about.stars}</span>
                </div>
                <div className="github-stat-item">
                  <span className="github-stat-item__value">{githubStats.followers}</span>
                  <span className="github-stat-item__label">{t.about.followers}</span>
                </div>
                <div className="github-stat-item">
                  <span className="github-stat-item__value">{githubStats.totalForks}</span>
                  <span className="github-stat-item__label">{t.about.forks}</span>
                </div>
              </div>

              <div className="languages">
                <h4 className="languages__title">{t.about.mostUsedLanguages}</h4>
                <div className="languages__list">
                  {Object.entries(githubStats.languages)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([lang, bytes]) => (
                      <div key={lang} className="language-item">
                        <span className="language-item__name">{lang}</span>
                        <div className="language-item__bar">
                          <motion.div
                            className="language-item__fill"
                            initial={{ width: 0 }}
                            animate={inView ? { 
                              width: `${(bytes / Math.max(...Object.values(githubStats.languages))) * 100}%` 
                            } : {}}
                            transition={{ duration: 1, delay: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about__timeline"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="about__timeline-title">{t.about.professionalJourney}</h3>
          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                <div className="timeline-item__year">
                  <div className="timeline-item__year__text">{item.year}</div></div>

                <div className="timeline-item__content">
                  <h4 className="timeline-item__title">{item.title}</h4>
                  <p className="timeline-item__description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;