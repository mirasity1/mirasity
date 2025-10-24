// Email service configuration
class EmailService {
  constructor() {
    // SMTP Configuration - você pode configurar aqui suas credenciais
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
          to: this.config.from,
          from: formData.email,
          subject: `Portfolio Contact: ${formData.subject}`,
          html: this.generateEmailHTML(formData),
          replyTo: formData.email
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }


  // Método usando Netlify Functions (se você usar Netlify)
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

  // Gera HTML para o email
  generateEmailHTML(formData) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #374151; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #3b82f6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nova Mensagem do Portfolio</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nome:</div>
                <div class="value">${formData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${formData.email}</div>
              </div>
              <div class="field">
                <div class="label">Assunto:</div>
                <div class="value">${formData.subject}</div>
              </div>
              <div class="field">
                <div class="label">Mensagem:</div>
                <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
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