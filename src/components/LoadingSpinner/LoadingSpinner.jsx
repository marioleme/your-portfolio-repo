import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';
import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <motion.div
        className="loading-spinner__icon"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <FiCode />
      </motion.div>
      <motion.p
        className="loading-spinner__text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Carregando...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;