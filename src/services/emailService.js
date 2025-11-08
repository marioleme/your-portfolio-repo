import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Para configurar, crie uma conta em https://www.emailjs.com/
// e adicione suas credenciais aqui

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};

// Modo de teste local (desenvolvimento)
const isDevelopment = import.meta.env.DEV;
const isTestMode = import.meta.env.VITE_EMAIL_TEST_MODE === 'true';

/**
 * Envia um email usando EmailJS
 * @param {Object} formData - Dados do formulário (name, email, message)
 * @returns {Promise} - Promise com o resultado do envio
 */
export const sendEmail = async (formData) => {
  // MODO DE TESTE LOCAL - Simula envio sem usar EmailJS
  if (isTestMode) {
    console.log('🧪 MODO DE TESTE - Email não será enviado');
    console.log('📧 Dados do formulário:', formData);
    console.log('-----------------------------------');
    console.log(`De: ${formData.name} <${formData.email}>`);
    console.log(`Mensagem: ${formData.message}`);
    console.log('-----------------------------------');
    
    // Simula delay de envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: 'Email testado com sucesso! (Modo de teste - não foi enviado)',
      testMode: true,
      data: formData
    };
  }

  // MODO REAL - Envia email via EmailJS
  try {
    // Valida se as credenciais estão configuradas
    if (!EMAILJS_CONFIG.serviceId || EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
      throw new Error('EmailJS não configurado. Configure as credenciais em .env');
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Mario Oliveira', // Seu nome
      reply_to: formData.email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Email enviado com sucesso!', response);

    return {
      success: true,
      message: 'Email enviado com sucesso!',
      response
    };
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    
    // Mensagem de erro mais amigável
    let errorMessage = 'Erro ao enviar email. Tente novamente.';
    
    if (error.text === 'The public key is invalid') {
      errorMessage = 'Configuração inválida. Verifique suas credenciais EmailJS.';
    } else if (error.text === 'Template not found') {
      errorMessage = 'Template de email não encontrado. Verifique o Template ID.';
    }

    return {
      success: false,
      message: errorMessage,
      error
    };
  }
};

/**
 * Inicializa o EmailJS com a public key
 */
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

export default {
  sendEmail,
  initEmailJS,
  config: EMAILJS_CONFIG
};
