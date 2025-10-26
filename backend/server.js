// server.js - Exemplo de backend simples com Express e Nodemailer
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['https://mirasity.pt', 'https://www.mirasity.pt', 'http://localhost:3000', 'https://backend.mirasity.pt'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Host:', req.get('host'));
  console.log('User-Agent:', req.get('user-agent'));
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// Adicionar headers para Railway
app.use((req, res, next) => {
  res.header('X-Powered-By', 'Railway');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Configuração do Nodemailer
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: parseInt(process.env.SMTP_PORT) === 465, // true para 465, false para outras portas
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    // Aumentar timeouts para Railway
    connectionTimeout: 60000, // 60 segundos
    greetingTimeout: 30000,    // 30 segundos
    socketTimeout: 60000,      // 60 segundos
    // Pool de conexões
    pool: true,
    maxConnections: 1,
    maxMessages: 3
  };

  console.log('Configuração SMTP:', { 
    host: config.host, 
    port: config.port, 
    secure: config.secure, 
    user: config.auth.user,
    connectionTimeout: config.connectionTimeout,
    environment: process.env.NODE_ENV
  });

  return nodemailer.createTransporter(config);
};

// Rota para enviar email
app.post('/api/send-email', async (req, res) => {
  console.log('=== ROTA /api/send-email ACIONADA ===');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body received:', req.body);
  
  try {
    const { to, from, subject, html, replyTo } = req.body;

    // Validação básica
    if (!to || !from || !subject || !html) {
      console.log('Erro de validação - campos obrigatórios faltando');
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios',
        received: { to, from, subject: !!subject, html: !!html }
      });
    }

    console.log('Tentando enviar email para:', to);
    console.log('De:', from);
    console.log('Assunto:', subject);

    const transporter = createTransporter();

    // Teste de conexão SMTP com timeout
    console.log('Verificando conexão SMTP...');
    try {
      await Promise.race([
        transporter.verify(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('SMTP verification timeout')), 30000)
        )
      ]);
      console.log('Conexão SMTP verificada com sucesso');
    } catch (verifyError) {
      console.error('Erro na verificação SMTP:', verifyError.message);
      // Continuar mesmo com erro de verificação em produção
      if (process.env.NODE_ENV !== 'production') {
        throw verifyError;
      }
    }

    // Configuração do email
    const mailOptions = {
      from: `"Portfolio Mirasity" <${process.env.SMTP_USER}>`,
      to: to,
      replyTo: replyTo || from,
      subject: subject,
      html: html
    };

    // Enviar email com timeout
    console.log('Enviando email...');
    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 60000)
      )
    ]);

    console.log('Email enviado com sucesso:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
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

// Rota de debug para listar todas as rotas
app.get('/api/routes', (req, res) => {
  const routes = [];
  
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  
  res.json({
    message: 'Rotas registradas',
    timestamp: new Date().toISOString(),
    routes: routes,
    totalRoutes: routes.length
  });
});

// Rota 404 para APIs não encontradas - deve vir DEPOIS das rotas definidas
app.use('/api/*', (req, res) => {
  console.log('=== ROTA 404 ACIONADA ===');
  console.log('Method:', req.method);
  console.log('Original URL:', req.originalUrl);
  console.log('Path:', req.path);
  console.log('All routes registered:');
  
  res.status(404).json({
    error: 'API endpoint not found',
    message: `The endpoint ${req.originalUrl} does not exist`,
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString(),
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'https://mirasity.pt'}`);
  console.log(`Railway URL: ${process.env.RAILWAY_STATIC_URL || 'N/A'}`);
  console.log(`Railway Domain: ${process.env.RAILWAY_PUBLIC_DOMAIN || 'N/A'}`);
  console.log('Rotas disponíveis:');
  console.log('  POST /api/send-email - Enviar email de contato');
  console.log('  GET /api/test - Testar API');
  console.log('  GET /api/test-smtp - Testar configuração SMTP');
  console.log('  GET /api/routes - Listar rotas (debug)');
  console.log('  GET /health - Health check');
  console.log('  * Qualquer outra rota → Redirect para frontend');
});

module.exports = app;