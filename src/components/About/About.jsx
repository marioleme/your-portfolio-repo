import { motion } from 'framer-motion';
import { FiDownload, FiMapPin, FiCalendar, FiGithub } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../../context/AppContext';
import { useGitHubData } from '../../hooks/useGitHub';
import './About.scss';

const About = () => {
  const { state } = useAppContext();
  const { data: githubData, loading, error } = useGitHubData(state.githubUsername);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const timeline = [
    {
      year: '2024',
      title: 'Desenvolvedor Frontend Sênior',
      description: 'Especialização em React e desenvolvimento de SPAs modernas'
    },
    {
      year: '2023',
      title: 'Desenvolvedor Frontend',
      description: 'Desenvolvimento de aplicações web responsivas e performáticas'
    },
    {
      year: '2022',
      title: 'Início da Carreira',
      description: 'Primeiros passos no desenvolvimento web com foco em JavaScript'
    }
  ];

  return (
    <section id="about" className="about section">
      <div className="about__container container">
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about__title">Sobre Mim</h2>
          <p className="about__subtitle">
            Conheça mais sobre minha trajetória e paixão pelo desenvolvimento frontend
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
              <p>
                Sou um desenvolvedor frontend apaixonado por criar experiências web 
                excepcionais. Com foco em React e JavaScript moderno, transformo 
                ideias em interfaces elegantes e funcionais.
              </p>
              <p>
                Minha jornada no desenvolvimento começou com curiosidade sobre como 
                os sites funcionam, e hoje tenho o privilégio de construir aplicações 
                que impactam a vida de milhares de usuários.
              </p>
              <p>
                Estou sempre em busca de novos desafios e oportunidades para aplicar 
                as melhores práticas de desenvolvimento, performance e acessibilidade.
              </p>
            </div>

            <motion.button
              className="btn btn-primary about__cv-button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload />
              Download CV
            </motion.button>
          </motion.div>

          <motion.div
            className="about__stats"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {githubData && !loading && !error ? (
              <div className="github-stats">
                <h3 className="github-stats__title">
                  <FiGithub />
                  Estatísticas GitHub
                </h3>
                
                <div className="github-stats__grid">
                  <div className="github-stat-item">
                    <span className="github-stat-item__value">{githubData.totalRepos}</span>
                    <span className="github-stat-item__label">Repositórios</span>
                  </div>
                  <div className="github-stat-item">
                    <span className="github-stat-item__value">{githubData.totalStars}</span>
                    <span className="github-stat-item__label">Stars</span>
                  </div>
                  <div className="github-stat-item">
                    <span className="github-stat-item__value">{githubData.followers}</span>
                    <span className="github-stat-item__label">Seguidores</span>
                  </div>
                  <div className="github-stat-item">
                    <span className="github-stat-item__value">{githubData.totalForks}</span>
                    <span className="github-stat-item__label">Forks</span>
                  </div>
                </div>

                {githubData.languages && (
                  <div className="languages">
                    <h4 className="languages__title">Linguagens mais usadas</h4>
                    <div className="languages__list">
                      {Object.entries(githubData.languages)
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
                                  width: `${(bytes / Math.max(...Object.values(githubData.languages))) * 100}%` 
                                } : {}}
                                transition={{ duration: 1, delay: 0.8 }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : error ? (
              <div className="about__error">
                <p>⚠️ {error}</p>
                <div className="about__info">
                  <div className="info-item">
                    <FiMapPin />
                    <span>Brasil</span>
                  </div>
                  <div className="info-item">
                    <FiCalendar />
                    <span>Disponível para novos projetos</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="about__info">
                <div className="info-item">
                  <FiMapPin />
                  <span>Brasil</span>
                </div>
                <div className="info-item">
                  <FiCalendar />
                  <span>Disponível para novos projetos</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="about__timeline"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="about__timeline-title">Trajetória Profissional</h3>
          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                <div className="timeline-item__year">{item.year}</div>
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