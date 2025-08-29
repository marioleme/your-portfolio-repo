import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiTool } from 'react-icons/fi';
import { SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiNodedotjs, SiGit, SiFigma, SiNextdotjs, SiVisualstudiocode, SiMicrosoftazure, SiPhp, SiGulp, SiVercel, SiBootstrap } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';
import './Skills.scss';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skillsData = {
    frontend: [
      { name: 'React', icon: SiReact, level: 90, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, level: 85, color: '#000000' },
      { name: 'JavaScript', icon: SiJavascript, level: 95, color: '#F7DF1E' },
      { name: 'KnockoutJS', icon: SiJavascript, level: 80, color: '#FF6600' },
      { name: 'TypeScript', icon: SiTypescript, level: 85, color: '#3178C6' },
      { name: 'HTML5', icon: SiHtml5, level: 98, color: '#E34F26' },
      { name: 'CSS3/SCSS', icon: SiCss3, level: 92, color: '#1572B6' },
      { name: 'Bootstrap', icon: SiBootstrap, level: 88, color: '#7952B3' },
      { name: 'Gulp/Grunt', icon: SiGulp, level: 78, color: '#CF4647' }
    ],
    backend: [
      { name: 'Node.js', icon: SiNodedotjs, level: 80, color: '#339933' },
      { name: 'JavaScript', icon: SiJavascript, level: 90, color: '#F7DF1E' },
      { name: 'PHP', icon: SiPhp, level: 75, color: '#777BB4' }
    ],
    tools: [
      { name: 'Git', icon: SiGit, level: 88, color: '#F05032' },
      { name: 'Figma', icon: SiFigma, level: 75, color: '#F24E1E' },
      { name: 'VS Code', icon: SiVisualstudiocode, level: 95, color: '#007ACC' },
      { name: 'Azure', icon: SiMicrosoftazure, level: 72, color: '#0078D4' },
      { name: 'Vercel', icon: SiVercel, level: 90, color: '#000000' },
      { name: 'Core Web Vitals', icon: FiTool, level: 85, color: '#4285F4' }
    ]
  };

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: FiCode },
    { id: 'backend', label: 'Backend', icon: FiLayers },
    { id: 'tools', label: 'Ferramentas', icon: FiTool }
  ];

  return (
    <section id="skills" className="skills section">
      <div className="skills__container container">
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="skills__title">Habilidades</h2>
          <p className="skills__subtitle">
            Tecnologias e ferramentas que domino no desenvolvimento frontend
          </p>
        </motion.div>

        <motion.div
          className="skills__categories"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={ref}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`skills__category ${
                activeCategory === category.id ? 'skills__category--active' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="skills__grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {skillsData[activeCategory]?.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="skill-card__header">
                <div className="skill-card__icon" style={{ color: skill.color }}>
                  <skill.icon />
                </div>
                <h3 className="skill-card__name">{skill.name}</h3>
              </div>
              <div className="skill-card__progress">
                <div className="skill-card__progress-bar">
                  <motion.div
                    className="skill-card__progress-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
                <span className="skill-card__level">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;