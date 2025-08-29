import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import './Contact.scss';

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitStatus('loading');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form data:', data);
      setSubmitStatus('success');
      reset();
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'mario.oliveirag12@gmail.com',
      link: 'mailto:mario.oliveirag12@gmail.com'
    }
  ];

  return (
    <section id="contact" className="contact section">
      <div className="contact__container container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact__title">Vamos Conversar?</h2>
          <p className="contact__subtitle">
            Interessado em trabalhar juntos? Entre em contato e vamos criar algo incrível!
          </p>
        </motion.div>

        <div className="contact__content" ref={ref}>
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="contact__info-title">Informações de Contato</h3>
            <div className="contact__info-list">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  className="contact__info-item"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="contact__info-icon" />
                  <div className="contact__info-content">
                    <span className="contact__info-label">{item.label}</span>
                    <span className="contact__info-value">{item.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="contact__description">
              <p>
                Estou sempre aberto a discutir novos projetos, oportunidades 
                criativas ou parcerias. Não hesite em entrar em contato!
              </p>
            </div>
          </motion.div>

          <motion.div
            className="contact__form-container"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <FiUser />
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  placeholder="Seu nome completo"
                  {...register('name', {
                    required: 'Nome é obrigatório',
                    minLength: {
                      value: 2,
                      message: 'Nome deve ter pelo menos 2 caracteres'
                    }
                  })}
                />
                {errors.name && (
                  <span className="form-error">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <FiMail />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder="seu@email.com"
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Assunto
                </label>
                <input
                  id="subject"
                  type="text"
                  className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
                  placeholder="Assunto da mensagem"
                  {...register('subject', {
                    required: 'Assunto é obrigatório'
                  })}
                />
                {errors.subject && (
                  <span className="form-error">{errors.subject.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <FiMessageSquare />
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                  placeholder="Descreva seu projeto ou ideia..."
                  {...register('message', {
                    required: 'Mensagem é obrigatória',
                    minLength: {
                      value: 10,
                      message: 'Mensagem deve ter pelo menos 10 caracteres'
                    }
                  })}
                />
                {errors.message && (
                  <span className="form-error">{errors.message.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                className={`btn btn-primary contact__submit ${
                  submitStatus === 'loading' ? 'contact__submit--loading' : ''
                }`}
                disabled={submitStatus === 'loading'}
                whileHover={{ scale: submitStatus === 'loading' ? 1 : 1.05, y: submitStatus === 'loading' ? 0 : -2 }}
                whileTap={{ scale: submitStatus === 'loading' ? 1 : 0.95 }}
              >
                {submitStatus === 'loading' ? (
                  <>
                    <motion.div
                      className="loading-dot"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Enviando...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Enviar Mensagem
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="form-message form-message--success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <FiCheckCircle />
                  Mensagem enviada com sucesso! Retornarei em breve.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="form-message form-message--error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <FiAlertCircle />
                  Erro ao enviar mensagem. Tente novamente.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;