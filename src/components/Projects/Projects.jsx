import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiCode, FiCalendar, FiEye } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../../context/AppContext';
import { useRepositories } from '../../hooks/useGitHub';
import './Projects.scss';

const Projects = () => {
  const { state } = useAppContext();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Fetch GitHub repositories
  const { data: repositories, loading: reposLoading, error: reposError } = useRepositories(
    state.githubUsername, 
    4
  );

  // Featured projects (you can customize this)
  const featuredProjects = [
    {
      id: 'portfolio-react',
      title: 'Portfolio React',
      description: 'Portfolio pessoal desenvolvido com React, Framer Motion e integração com API do GitHub',
      technologies: ['React', 'SCSS', 'Framer Motion', 'GitHub API'],
      category: 'react',
      featured: true,
      highlights: ['Animações fluidas', 'Design responsivo', 'Integração GitHub'],
      demo: 'https://seu-portfolio.vercel.app'
    },
    {
      id: 'ecommerce-app',
      title: 'E-commerce App',
      description: 'Aplicação de e-commerce completa com carrinho, pagamento e painel admin',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      featured: true,
      highlights: ['Carrinho de compras', 'Pagamento online', 'Dashboard admin'],
      demo: 'https://ecommerce-demo.vercel.app'
    }
  ];

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'Todos', count: repositories?.length || 0 },
    { id: 'react', label: 'React', count: repositories?.filter(repo => 
      repo.language === 'JavaScript' || repo.language === 'TypeScript'
    ).length || 0 },
    { id: 'javascript', label: 'JavaScript', count: repositories?.filter(repo => 
      repo.language === 'JavaScript'
    ).length || 0 },
    { id: 'featured', label: 'Destaque', count: featuredProjects.length }
  ];

  // Filter repositories based on active filter
  const getFilteredProjects = () => {
    if (!repositories) return featuredProjects;

    let filtered = [...repositories];
    
    switch (activeFilter) {
      case 'react':
        filtered = repositories.filter(repo => 
          repo.language === 'JavaScript' || repo.language === 'TypeScript'
        );
        break;
      case 'javascript':
        filtered = repositories.filter(repo => repo.language === 'JavaScript');
        break;
      case 'featured':
        return featuredProjects;
      default:
        break;
    }

    // Combine with featured projects if showing all
    if (activeFilter === 'all') {
      return [...featuredProjects, ...filtered.slice(0, 2)].slice(0, 4);
    }

    return filtered.slice(0, 4);
  };

  const filteredProjects = getFilteredProjects();

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Get technology color
  const getTechColor = (tech) => {
    const colors = {
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'React': '#61DAFB',
      'Vue': '#4FC08D',
      'Node.js': '#339933',
      'Python': '#3776AB',
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'SCSS': '#CF649A'
    };
    return colors[tech] || '#666';
  };

  const ProjectCard = ({ project, index }) => {
    const isRepo = project.clone_url; // GitHub repo has clone_url
    const isFeatured = project.featured;

    return (
      <motion.div
        className={`project-card ${isFeatured ? 'project-card--featured' : ''}`}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        onClick={() => setSelectedProject(project)}
      >
        {/* Project Image/Preview */}
        <div className="project-card__image">
          <div className="project-card__image-placeholder">
            <FiCode size={48} />
          </div>
          {isFeatured && (
            <div className="project-card__badge">Destaque</div>
          )}
        </div>

        {/* Project Content */}
        <div className="project-card__content">
          <div className="project-card__header">
            <h3 className="project-card__title">
              {isRepo ? project.name.replace(/-/g, ' ') : project.title}
            </h3>
            <div className="project-card__links">
              {isRepo && (
                <motion.a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiGithub />
                </motion.a>
              )}
              {(project.homepage || project.demo) && (
                <motion.a
                  href={project.homepage || project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink />
                </motion.a>
              )}
            </div>
          </div>

          <p className="project-card__description">
            {project.description || `Projeto desenvolvido com ${project.language || 'JavaScript'}`}
          </p>

          {/* Technologies */}
          <div className="project-card__technologies">
            {isRepo ? (
              project.language && (
                <span 
                  className="project-card__tech"
                  style={{ backgroundColor: getTechColor(project.language) }}
                >
                  {project.language}
                </span>
              )
            ) : (
              project.technologies?.map((tech) => (
                <span 
                  key={tech}
                  className="project-card__tech"
                  style={{ backgroundColor: getTechColor(tech) }}
                >
                  {tech}
                </span>
              ))
            )}
          </div>

          {/* Stats */}
          {isRepo && (
            <div className="project-card__stats">
              <div className="project-card__stat">
                <FiStar />
                <span>{project.stargazers_count}</span>
              </div>
              <div className="project-card__stat">
                <FiGitBranch />
                <span>{project.forks_count}</span>
              </div>
              <div className="project-card__stat">
                <FiCalendar />
                <span>{formatDate(project.updated_at)}</span>
              </div>
            </div>
          )}

          {/* Highlights for featured projects */}
          {project.highlights && (
            <div className="project-card__highlights">
              {project.highlights.map((highlight, idx) => (
                <span key={idx} className="project-card__highlight">
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="projects section">
      <div className="projects__container container">
        {/* Section Header */}
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="projects__title">Projetos</h2>
          <p className="projects__subtitle">
            Uma seleção dos meus trabalhos mais recentes e projetos em destaque
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          ref={ref}
        >
          {filterOptions.map((filter) => (
            <motion.button
              key={filter.id}
              className={`projects__filter ${
                activeFilter === filter.id ? 'projects__filter--active' : ''
              }`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className="projects__filter-count">({filter.count})</span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {reposLoading && (
          <div className="projects__loading">
            <div className="loading-spinner">
              <FiCode className="loading-spinner__icon" />
              <span>Carregando projetos do GitHub...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {reposError && (
          <div className="projects__error">
            <p>Erro ao carregar projetos: {reposError}</p>
            <p>Mostrando projetos em destaque:</p>
          </div>
        )}

        {/* Projects Grid */}
        <motion.div
          className="projects__grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id || project.name}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {/* View All GitHub Link */}
        <motion.div
          className="projects__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href={`https://github.com/${state.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary projects__github-link"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub />
            Ver todos no GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;