import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiCalendar } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../../context/AppContext';
import { translations } from '../../data/translations';
import './Projects.scss';

const Projects = () => {
  const { state } = useAppContext();
  const t = translations[state.language];
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Get project details with translations
  const getProjectDetails = (projectId) => {
    const details = t.projectDetails[projectId];
    return details || { title: projectId, description: '', highlights: [] };
  };

  // Featured projects (manual control - no GitHub API dependency)
  const featuredProjects = [
    {
      id: 'calculadora-react',
      ...getProjectDetails('calculadora-react'),
      technologies: ['React', 'JavaScript', 'CSS', 'HTML'],
      categories: ['react','frontend'],
      featured: true,
      demo: 'https://calculadora-react-mario.netlify.app',
      image: '/assets/images/projects/calculadora-react.jpg'
    },
    {
      id: 'crud-supabase',
      ...getProjectDetails('crud-supabase'),
      technologies: ['React', 'Supabase', 'JavaScript', 'CSS'],
      categories: ['fullstack'],
      featured: true,
      demo: 'https://crud-com-supabase.netlify.app',
      image: '/assets/images/projects/CRUD-COM-SUPABASE.png'
    },
    {
      id: 'react-context-api',
      ...getProjectDetails('react-context-api'),
      technologies: ['React', 'Context API', 'JavaScript', 'CSS'],
      categories: ['react' ,'frontend'],
      featured: true,
      demo: 'https://github.com/marioleme/ReactContextApi',
      image: '/assets/images/projects/meteora-app.gif'
    },
    {
      id: 'cobuccio',
      ...getProjectDetails('cobuccio'),
      technologies: ['JavaScript', 'HTML', 'CSS', 'Web APIs'],
      categories: ['frontend','react'],
      featured: true,
      demo: 'https://carteira-financeira-nextjs.netlify.app/auth',
      image: '/assets/images/projects/carteira.png'
    },
    {
      id: 'react-migrando-typescript',
      ...getProjectDetails('react-migrando-typescript'),
      technologies: ['React', 'TypeScript', 'JavaScript', 'Hooks'],
      categories: ['react','frontend'],
      featured: true,
      demo: 'https://react-migrando-typescript.netlify.app',
      github: 'https://github.com/marioleme/react-migrando-typescript',
      image: '/assets/images/projects/react-migrando-typescript.png'
    },
    {
      id: 'tailwind-css-estilizando',
      ...getProjectDetails('tailwind-css-estilizando'),
      technologies: ['HTML5', 'Tailwind CSS', 'CSS3', 'JavaScript'],
      categories: ['frontend'],
      featured: true,
      github: 'https://github.com/marioleme/tailwind-css-estilizando',
      image: '/assets/images/projects/tailwind-desktop.png'
    },
    
    {
      id: 'movie-react',
      ...getProjectDetails('movie-react'),
      technologies: ['React', 'SCSS', 'Axios', 'TMDb API'],
      categories: ['react','frontend'],
      featured: true,
      demo: 'https://catalogo-de-filmes.weboliveira.top',
      image: '/assets/images/projects/movie-react.gif'
    },
    {
      id: 'petshop-react-router',
      ...getProjectDetails('petshop-react-router'),
      technologies: ['React', 'React Router', 'JavaScript', 'CSS'],
      categories: ['react','frontend'],
      featured: true,
      github: 'https://github.com/marioleme/React-Router-Navega-o-em-uma-SPA/tree/main/petshop',
      image: '/assets/images/projects/petshop.gif'
    },
      {
      id: 'sinsa',
      ...getProjectDetails('sinsa'),
      technologies: ['Node.js', 'KnockoutJS', 'JavaScript', 'Less'],
      categories: ['ecommerce','frontend'],
      featured: true,
      image: '/assets/images/projects/sinsa.jpeg'
    },
         {
      id: 'farmaciasespecializadas',
      ...getProjectDetails('farmaciasespecializadas'),
      technologies: ['Node.js', 'KnockoutJS', 'JavaScript', 'Less'],
      categories: ['ecommerce','frontend'],
      featured: true,
      image: '/assets/images/projects/farmacia.jpeg'
    },
    {
      id: 'armazempb',
      ...getProjectDetails('armazempb'),
      technologies: ['Node.js', 'KnockoutJS', 'JavaScript', 'Less'],
      categories: ['ecommerce','frontend'],
      featured: true,
      image: '/assets/images/projects/armazempb.jpeg'
    },
      {
      id: 'polybalas',
      ...getProjectDetails('polybalas'),
      technologies: ['Node.js', 'KnockoutJS', 'JavaScript', 'Less'],
      categories: ['ecommerce','frontend'],
      featured: false,
      github: 'https://www.polybalas.com.br/',
      image: '/assets/images/projects/polybalas.jpeg'
    },
     {
      id: 'frigelar',
      ...getProjectDetails('frigelar'),
      technologies: ['Node.js', 'KnockoutJS', 'JavaScript', 'Less'],
      categories: ['ecommerce','frontend'],
      featured: false,
      image: '/assets/images/projects/frigelar.gif'
    },
    {
      id: 'Widoing',
      ...getProjectDetails('Widoing'),
      technologies: ['PHP', 'CodeIgniter4', 'SQL', 'JavaScript', 'CSS3', 'HTML5'],
      categories: ['frontend'],
  
      video: '/assets/images/projects/widoing.mp4'
    
    },
    {
      id: 'Ycons',
      ...getProjectDetails('Ycons'),
      technologies: ['PHP', 'CodeIgniter4', 'SQL', 'JavaScript', 'CSS3', 'HTML5'],
      categories: ['frontend'],
 
      video: '/assets/images/projects/Ycons.mp4'
    
    },



    /*
    {
      id: 'ecommerce-app',
      title: 'E-commerce App',
      description: 'Aplicação de e-commerce completa com carrinho, pagamento e painel admin',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      featured: true,
      highlights: ['Carrinho de compras', 'Pagamento online', 'Dashboard admin'],
      demo: 'https://ecommerce-demo.vercel.app',
      image: '/src/assets/images/projects/ecommerce.png' // Substitua pelo nome da sua imagem
    },
    {
      id: 'task-manager',
      title: 'Task Manager Pro',
      description: 'Sistema de gerenciamento de tarefas com colaboração em tempo real e notificações',
      technologies: ['React', 'TypeScript', 'Socket.io', 'Node.js'],
      category: 'react',
      featured: true,
      highlights: ['Tempo real', 'Colaboração', 'Notificações push'],
      demo: 'https://taskmanager-pro.vercel.app',
      image: '/src/assets/images/projects/task-manager.png' // Substitua pelo nome da sua imagem
    },
    {
      id: 'dashboard-analytics',
      title: 'Analytics Dashboard',
      description: 'Dashboard interativo para análise de dados com gráficos dinâmicos e relatórios',
      technologies: ['React', 'D3.js', 'Chart.js', 'API REST'],
      category: 'react',
      featured: true,
      highlights: ['Gráficos interativos', 'Relatórios PDF', 'Filtros avançados'],
      demo: 'https://analytics-dashboard.vercel.app'
    },
    {
      id: 'chat-realtime',
      title: 'Chat em Tempo Real',
      description: 'Aplicação de chat com salas, emojis, compartilhamento de arquivos e videochamadas',
      technologies: ['React', 'Socket.io', 'WebRTC', 'Express'],
      category: 'fullstack',
      featured: true,
      highlights: ['Videochamadas', 'Salas privadas', 'Compartilhamento'],
      demo: 'https://chat-realtime.vercel.app'
    },
    {
      id: 'weather-app',
      title: 'Weather Forecast',
      description: 'App de previsão do tempo com geolocalização, mapas interativos e alertas',
      technologies: ['React', 'API REST', 'Maps API', 'PWA'],
      category: 'react',
      featured: true,
      highlights: ['Geolocalização', 'Mapas interativos', 'PWA'],
      demo: 'https://weather-forecast.vercel.app'
    },
    {
      id: 'expense-tracker',
      title: 'Expense Tracker',
      description: 'Controle financeiro pessoal com categorização, metas e relatórios detalhados',
      technologies: ['React', 'Chart.js', 'localStorage', 'Material-UI'],
      category: 'react',
      featured: true,
      highlights: ['Metas financeiras', 'Categorização', 'Relatórios'],
      demo: 'https://expense-tracker.vercel.app'
    }
      */
  ];

  const projectHasCategory = (project, category) => {
    const categories = project.categories || project.category || [];
    return Array.isArray(categories) ? categories.includes(category) : categories === category;
  };

  // Filter options based on manual projects only
  const filterOptions = [
    { id: 'all', label: 'Todos', count: featuredProjects.length },
    { id: 'react', label: 'React', count: featuredProjects.filter(p => projectHasCategory(p, 'react')).length },
    { id: 'fullstack', label: 'Full Stack', count: featuredProjects.filter(p => projectHasCategory(p, 'fullstack')).length },
    { id: 'frontend', label: 'Frontend', count: featuredProjects.filter(p => projectHasCategory(p, 'frontend')).length },
    { id: 'ecommerce', label: 'E-commerce', count: featuredProjects.filter(p => projectHasCategory(p, 'ecommerce')).length }
  ];

  // Filter projects based on active filter
  const getFilteredProjects = () => {
    switch (activeFilter) {
      case 'react':
        return featuredProjects.filter(project => projectHasCategory(project, 'react')).slice(0, 6);
      case 'fullstack':
        return featuredProjects.filter(project => projectHasCategory(project, 'fullstack')).slice(0, 9);
      case 'frontend':
        return featuredProjects.filter(project => projectHasCategory(project, 'frontend')).slice(0, 9);
      case 'ecommerce':
        return featuredProjects.filter(project => projectHasCategory(project, 'ecommerce')).slice(0, 6);
      case 'all':
      default:
        return featuredProjects;
    }
  };

  const filteredProjects = getFilteredProjects();

  // Get technology color
  const getTechColor = (tech) => {
    const colors = {
      'JavaScript': '#002f51',
      'TypeScript': '#3178C6',
      'React': '#81E0FF',
      'Vue': '#4FC08D',
      'Node.js': '#339933',
      'Python': '#3776AB',
      'HTML': '#FB5227',
      'HTML5': '#FB5227',
      'CSS': '#1572B6',
      'CSS3': '#2D53E5',
      'SCSS': '#CF649A',
      'Tailwind CSS': '#06B6D4',
      'Hooks': '#61DAFB',
      'PHP': '#7B7FB5',
      'CodeIgniter4': '#F3992B',
      'SQL': '#BE6C08',
      'Supabase': '#3ECF8E',
      'Context API': '#61DAFB',
      'Web APIs': '#5A67D8',
      'Axios': '#5A29E4',
      'TMDb API': '#01B4E4',
      'React Router': '#CA4245',
      'KnockoutJS': '#E42D2C',
      'Less': '#000000',
    };
    return colors[tech] || '#666';
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
  };

  const ProjectCard = ({ project, index }) => {
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
          {project.video ? (
            <video
              className="project-card__image-img"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={project.title}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="project-card__image-img"
              loading="lazy"
            />
          ) : (
            <div className="project-card__image-placeholder">
              <FiCode size={48} />
            </div>
          )}
          {isFeatured && (
            <div className="project-card__badge">Destaque</div>
          )}
        </div>

        {/* Project Content */}
        <div className="project-card__content">
          <div className="project-card__header">
            <h3 className="project-card__title">
              {project.title}
            </h3>
            <div className="project-card__links">
              {project.github && (
                <motion.a
                  href={project.github}
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
              {project.demo && (
                <motion.a
                  href={project.demo}
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
            {project.description}
          </p>

          {/* Technologies */}
          <div className="project-card__technologies">
            {project.technologies?.map((tech) => (
              <span 
                key={tech}
                className="project-card__tech"
                style={{ backgroundColor: getTechColor(tech) }}
              >
                {tech}
              </span>
            ))}
          </div>

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
          <h2 className="projects__title">{t.projects.title}</h2>
          <p className="projects__subtitle">
            {t.projects.subtitle}
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

        {/* Projects Grid */}
        <motion.div
          className="projects__grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
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
            Ver mais projetos
          </motion.a>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="project-modal__content"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="project-modal__header">
              <h3 className="project-modal__title">{selectedProject.title}</h3>
              <button 
                className="project-modal__close"
                onClick={closeModal}
                aria-label="Fechar modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Media */}
            {(selectedProject.video || selectedProject.image) && (
              <div className="project-modal__image">
                {selectedProject.video ? (
                  <video controls playsInline preload="metadata">
                    <source src={selectedProject.video} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                  />
                )}
              </div>
            )}

            {/* Modal Body */}
            <div className="project-modal__body">
              <p className="project-modal__description">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              <div className="project-modal__section">
                <h4 className="project-modal__section-title">{t.projects.technologies}</h4>
                <div className="project-modal__technologies">
                  {selectedProject.technologies?.map((tech) => (
                    <span 
                      key={tech}
                      className="project-modal__tech"
                      style={{ backgroundColor: getTechColor(tech) }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {selectedProject.highlights && (
                <div className="project-modal__section">
                  <h4 className="project-modal__section-title">Destaques</h4>
                  <ul className="project-modal__highlights">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="project-modal__actions">
                {selectedProject.demo && (
                  <motion.a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink />
                    {t.projects.viewDemo}
                  </motion.a>
                )}
                {selectedProject.github && (
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub />
                    {t.projects.viewCode}
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;