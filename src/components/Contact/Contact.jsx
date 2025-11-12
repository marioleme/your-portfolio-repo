import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { sendEmail } from '../../services/emailService';
import './Contact.scss';

const Contact = () => {
  const { state } = useAppContext();
  const t = translations[state.language];
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
      // Envia o email usando EmailJS
      const result = await sendEmail(data);
      
      if (result.success) {
        console.log('Email enviado:', result);
        setSubmitStatus('success');
        reset();
        
        // Show success toast
        toast.success(t.contact.successMessage, {
          icon: '🚀'
        });
      } else {
        throw new Error(result.message);
      }
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setSubmitStatus('error');
      
      // Show error toast
      toast.error(t.contact.errorMessage, {
        icon: '❌'
      });
      
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
          <h2 className="contact__title">{t.contact.title}</h2>
          <p className="contact__subtitle">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="contact__content" ref={ref}>
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="contact__info-title">{t.contact.getInTouch}</h3>
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
                {t.contact.availability}
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
                  {t.contact.name}
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  placeholder={t.contact.namePlaceholder}
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
                  {t.contact.email}
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder={t.contact.emailPlaceholder}
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
                  {t.contact.subject}
                </label>
                <input
                  id="subject"
                  type="text"
                  className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
                  placeholder={t.contact.subjectPlaceholder}
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
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                  placeholder={t.contact.messagePlaceholder}
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
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    <FiSend />
                    {t.contact.send}
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
                  {t.contact.successMessage}
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
                  {t.contact.errorMessage}
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