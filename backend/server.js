// server.js - Exemplo de backend simples com Express e Nodemailer
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do Nodemailer
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: parseInt(process.env.SMTP_PORT) === 465, // true para 465, false para outras portas
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  };

  console.log('Configuração SMTP:', { 
    host: config.host, 
    port: config.port, 
    secure: config.secure, 
    user: config.auth.user 
  });

  return nodemailer.createTransport(config);
};

// Rota para enviar email
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, from, subject, html, replyTo } = req.body;

    // Validação básica
    if (!to || !from || !subject || !html) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios',
        received: { to, from, subject: !!subject, html: !!html }
      });
    }

    console.log('Tentando enviar email para:', to);
    console.log('De:', from);
    console.log('Assunto:', subject);

    const transporter = createTransporter();

    // Teste de conexão SMTP
    await transporter.verify();
    console.log('Conexão SMTP verificada com sucesso');

    // Configuração do email
    const mailOptions = {
      from: `"Portfolio Mirasity" <${process.env.SMTP_USER}>`,
      to: to,
      replyTo: replyTo || from,
      subject: subject,
      html: html
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email enviado com sucesso:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Erro detalhado ao enviar email:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao enviar email',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor'
    });
  }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API funcionando!', 
    timestamp: new Date().toISOString(),
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? '***configurado***' : 'não configurado'
    }
  });
});

// Rota para testar configuração SMTP
app.get('/api/test-smtp', async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    res.json({ 
      success: true, 
      message: 'Configuração SMTP válida!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rota 404 para APIs não encontradas - deve vir DEPOIS das rotas definidas
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    message: `The endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: [
      'POST /api/send-email',
      'GET /api/test',
      'GET /api/test-smtp',
      'GET /health'
    ]
  });
});

// Fallback final - redirecionar qualquer outra coisa para o frontend
app.use('*', (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'https://mirasity.pt';
  res.redirect(301, frontendUrl);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'https://mirasity.pt'}`);
  console.log('Rotas disponíveis:');
  console.log('  POST /api/send-email - Enviar email de contato');
  console.log('  GET /api/test-smtp - Testar configuração SMTP');
  console.log('  GET /health - Health check');
  console.log('  * Qualquer outra rota → Redirect para frontend');
});

module.exports = app;