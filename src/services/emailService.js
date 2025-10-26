// Email service configuration
class EmailService {
  constructor() {
    // SMTP Configuration - pode configurar aqui as suas credenciais
    this.config = {
      host: process.env.REACT_APP_SMTP_HOST || 'smtp.gmail.com',
      port: process.env.REACT_APP_SMTP_PORT || 587,
      secure: false, // true para 465, false para outras portas
      user: process.env.REACT_APP_SMTP_USER || '',
      pass: process.env.REACT_APP_SMTP_PASS || '',
      from: process.env.REACT_APP_FROM_EMAIL || 'filipe.ac.braga@gmail.com'
    };
  }

  // Método para enviar email usando fetch para seu backend
  async sendEmail(formData) {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }


  // Método usando Netlify Functions (se usar Netlify)
  async sendEmailWithNetlify(formData) {
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email with Netlify:', error);
      throw error;
    }
  }

  // Validação do formulário
  validateForm(formData) {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Assunto é obrigatório';
    }

    if (!formData.message.trim()) {
      errors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    return errors;
  }
}

const emailService = new EmailService();
export default emailService;