import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiCalendar } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../../context/AppContext';
import './Projects.scss';

const Projects = () => {
  const { state } = useAppContext();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Featured projects (manual control - no GitHub API dependency)
  const featuredProjects = [
    {
      id: 'calculadora-react',
      title: 'Calculadora React',
      description: 'Calculadora desenvolvida em React com funcionalidades completas de operações matemáticas, interface intuitiva e responsiva',
      technologies: ['React', 'JavaScript', 'CSS', 'HTML'],
      category: 'react',
      featured: true,
      highlights: ['Interface responsiva', 'Operações matemáticas', 'Design moderno'],
      demo: 'https://calculadora-react-mario.netlify.app',
      image: '/assets/images/projects/calculadora-react.jpg'
    },
    {
      id: 'crud-supabase',
      title: 'CRUD com Supabase',
      description: 'Aplicação CRUD completa desenvolvida com React e Supabase, incluindo autenticação, gerenciamento de dados em tempo real e interface moderna',
      technologies: ['React', 'Supabase', 'JavaScript', 'CSS'],
      category: 'fullstack',
      featured: true,
      highlights: ['Autenticação', 'Tempo real', 'Database cloud'],
      demo: 'https://crud-com-supabase.netlify.app',
      image: '/assets/images/projects/CRUD-COM-SUPABASE.png'
    },
    {
      id: 'react-context-api',
      title: 'React Context API',
      description: 'Aplicação demonstrando o uso avançado do Context API do React para gerenciamento de estado global, incluindo boas práticas e padrões de desenvolvimento',
      technologies: ['React', 'Context API', 'JavaScript', 'CSS'],
      category: 'react',
      featured: true,
      highlights: ['Estado global', 'Context API', 'Boas práticas'],
      demo: 'https://github.com/marioleme/ReactContextApi',
      image: '/assets/images/projects/meteora-app.gif'
    },
    {
      id: 'cobuccio',
      title: 'Cobuccio - Carteira',
      description: 'Aplicação web moderna desenvolvida com tecnologias front-end avançadas, focada em interface intuitiva e experiência do usuário otimizada',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Web APIs'],
      category: 'frontend',
      featured: true,
      highlights: ['Interface moderna', 'UX otimizada', 'Web APIs'],
      demo: 'https://carteira-financeira-nextjs.netlify.app/auth',
      image: '/assets/images/projects/carteira.png'
    },
    /*
    {
      id: 'portfolio-react',
      title: 'Portfolio React',
      description: 'Portfolio pessoal desenvolvido com React, Framer Motion e integração com API do GitHub',
      technologies: ['React', 'SCSS', 'Framer Motion', 'GitHub API'],
      category: 'react',
      featured: true,
      highlights: ['Animações fluidas', 'Design responsivo', 'Integração GitHub'],
      demo: 'https://seu-portfolio.vercel.app',
      image: '/src/assets/images/projects/portfolio.png' // Substitua pelo nome da sua imagem
    },
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

  // Filter options based on manual projects only
  const filterOptions = [
    { id: 'all', label: 'Todos', count: featuredProjects.length },
    { id: 'react', label: 'React', count: featuredProjects.filter(p => p.category === 'react').length },
    { id: 'fullstack', label: 'Full Stack', count: featuredProjects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', label: 'Frontend', count: featuredProjects.filter(p => p.category === 'frontend').length },
    { id: 'featured', label: 'Destaque', count: featuredProjects.length }
  ];

  // Filter projects based on active filter
  const getFilteredProjects = () => {
    switch (activeFilter) {
      case 'react':
        return featuredProjects.filter(project => project.category === 'react').slice(0, 4);
      case 'fullstack':
        return featuredProjects.filter(project => project.category === 'fullstack').slice(0, 4);
      case 'frontend':
        return featuredProjects.filter(project => project.category === 'frontend').slice(0, 4);
      case 'featured':
      case 'all':
      default:
        return featuredProjects.slice(0, 4); // Show max 4 projects
    }
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
          {project.image ? (
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
    </section>
  );
};

export default Projects;