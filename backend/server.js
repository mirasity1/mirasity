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

// Função para gerar HTML do email
const generateEmailHTML = (name, email, subject, message) => {
  return `
    <!DOCTYPE html>
    <html lang="pt">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Mensagem do Portfolio</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
            color: white;
            padding: 30px 25px;
            text-align: center;
          }
          .email-header h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
          }
          .email-header p {
            font-size: 16px;
            opacity: 0.9;
          }
          .email-content {
            padding: 30px 25px;
          }
          .field-group {
            margin-bottom: 25px;
          }
          .field-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .field-value {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-left: 4px solid #3b82f6;
            border-radius: 8px;
            padding: 15px;
            font-size: 16px;
            color: #111827;
            word-wrap: break-word;
          }
          .field-value.message {
            min-height: 100px;
            white-space: pre-wrap;
          }
          .email-footer {
            background: #f8fafc;
            padding: 20px 25px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          }
          .email-footer p {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 5px;
          }
          .email-footer .timestamp {
            font-size: 12px;
            color: #9ca3af;
          }
          .security-note {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 12px;
            margin-top: 20px;
            font-size: 13px;
            color: #92400e;
          }
          @media (max-width: 600px) {
            body {
              padding: 10px;
            }
            .email-header,
            .email-content,
            .email-footer {
              padding: 20px 15px;
            }
            .email-header h1 {
              font-size: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>📧 Nova Mensagem do Portfolio</h1>
            <p>Mensagem recebida através de mirasity.pt</p>
          </div>
          
          <div class="email-content">
            <div class="field-group">
              <label class="field-label">👤 Nome do Remetente</label>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field-group">
              <label class="field-label">📧 Email de Contacto</label>
              <div class="field-value">${email}</div>
            </div>
            
            <div class="field-group">
              <label class="field-label">📝 Assunto</label>
              <div class="field-value">${subject}</div>
            </div>
            
            <div class="field-group">
              <label class="field-label">💬 Mensagem</label>
              <div class="field-value message">${message}</div>
            </div>
            
            <div class="security-note">
              <strong>⚠️ Informação de Segurança:</strong> Este email foi enviado através do formulário de contacto em mirasity.pt. Responda diretamente ao email do remetente.
            </div>
          </div>
          
          <div class="email-footer">
            <p><strong>Portfolio Mirasity</strong> - mirasity.pt</p>
            <p class="timestamp">Enviado em ${new Date().toLocaleString('pt-PT', { 
              timeZone: 'Europe/Lisbon',
              day: '2-digit',
              month: '2-digit', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
const createTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT) || 587;
  const isMXRouting = process.env.SMTP_PROVIDER === 'mxrouting' || 
                     (process.env.SMTP_HOST && process.env.SMTP_HOST.includes('mxrouting'));
  
  const config = {
    host: process.env.SMTP_HOST,
    port: port,
    secure: port === 465, // true para 465, false para 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  };

  // Configurações específicas para MXRouting (ainda mais agressivas)
  if (isMXRouting) {
    Object.assign(config, {
      connectionTimeout: 30000,  // Aumentado para 30s (MXRouting pode ser lento)
      greetingTimeout: 20000,    // Aumentado para 20s
      socketTimeout: 30000,      // Aumentado para 30s
      requireTLS: false,         // MXRouting não precisa
      ignoreTLS: false,          // Permitir TLS mas não forçar
      tls: {
        rejectUnauthorized: false,
        servername: process.env.SMTP_HOST,
        ciphers: 'HIGH:MEDIUM:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA'
        // Removido secureProtocol e minVersion que causam conflito
      },
      pool: false,               // Desabilitar pooling
      maxConnections: 1,
      maxMessages: 1,
      // Configurações de retry específicas para MXRouting
      retryDelay: 1000,
      maxRetries: 3,
      // Desabilitar debug em produção mas manter logger para troubleshooting
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development'
    });
  } else {
    // Configurações padrão para outros provedores
    Object.assign(config, {
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
      requireTLS: port !== 465,
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      pool: false,
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development'
    });
  }

  console.log('Configuração SMTP:', { 
    provider: isMXRouting ? 'MXRouting' : 'Generic',
    host: config.host, 
    port: config.port, 
    secure: config.secure, 
    user: config.auth.user,
    connectionTimeout: config.connectionTimeout,
    environment: process.env.NODE_ENV
  });

  return nodemailer.createTransport(config);
};

// Rota para enviar email
app.post('/api/send-email', async (req, res) => {
  console.log('=== ROTA /api/send-email ACIONADA ===');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('📧 Dados recebidos:', { 
      hasName: !!name, 
      hasEmail: !!email, 
      hasSubject: !!subject, 
      hasMessage: !!message 
    });

    // Validação dos campos obrigatórios
    if (!name || !email || !subject || !message) {
      console.log('❌ Campos obrigatórios em falta');
      return res.status(400).json({ 
        success: false,
        error: 'Todos os campos são obrigatórios: nome, email, assunto e mensagem'
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Email inválido:', email);
      return res.status(400).json({ 
        success: false,
        error: 'Email inválido' 
      });
    }

    console.log('✅ Validações passaram, gerando HTML...');

    // Gerar HTML do email usando a função
    const emailHTML = generateEmailHTML(name, email, subject, message);

    console.log('Tentando enviar email para:', process.env.SMTP_USER);
    console.log('De:', name, '<' + email + '>');
    console.log('Assunto:', subject);

    let transporter = createTransporter();
    const isMXRouting = process.env.SMTP_PROVIDER === 'mxrouting' || 
                       (process.env.SMTP_HOST && process.env.SMTP_HOST.includes('mxrouting'));

    // Para MXRouting, pular verificação e ir direto ao envio (muito mais rápido)
    if (!isMXRouting) {
      console.log('Verificando conexão SMTP...');
      try {
        await Promise.race([
          transporter.verify(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('SMTP verification timeout')), 15000)
          )
        ]);
        console.log('Conexão SMTP verificada com sucesso');
      } catch (verifyError) {
        console.error('Erro na verificação SMTP:', verifyError.message);
        console.error('Continuando sem verificação...');
      }
    } else {
      console.log('🚀 MXRouting detectado - pulando verificação para velocidade máxima');
    }

    // Configuração do email
    const mailOptions = {
      from: `"Portfolio Mirasity" <${process.env.SMTP_USER}>`, // Usar o email MXRouting
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: emailHTML,
      // Headers adicionais para MXRouting
      headers: {
        'X-Mailer': 'Portfolio Mirasity',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal'
      }
    };

    // Enviar email com timeout otimizado e fallback para MXRouting
    console.log('Enviando email...');
    const emailTimeout = isMXRouting ? 45000 : 60000; // 45s para MXRouting, 60s para outros
    
    let emailSent = false;
    let lastError = null;
    
    try {
      const info = await Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email send timeout')), emailTimeout)
        )
      ]);
      
      console.log('✅ Email enviado com sucesso:', info.messageId);
      emailSent = true;
      
      res.status(200).json({
        success: true,
        message: 'Email enviado com sucesso!',
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });
      
    } catch (sendError) {
      lastError = sendError;
      
      // Se for MXRouting e falhar na porta 465, tentar porta 587
      if (isMXRouting && process.env.SMTP_PORT === '465' && 
          (sendError.code === 'ETIMEDOUT' || sendError.code === 'ECONNREFUSED')) {
        
        console.log('⚠️ Porta 465 falhou, tentando porta 587 para MXRouting...');
        
        try {
          // Criar novo transporter com porta 587
          const fallbackConfig = {
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            },
            connectionTimeout: 30000,
            greetingTimeout: 20000,
            socketTimeout: 30000,
            requireTLS: true,
            tls: {
              rejectUnauthorized: false,
              servername: process.env.SMTP_HOST,
              ciphers: 'HIGH:MEDIUM:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA'
            },
            pool: false
          };
          
          const fallbackTransporter = nodemailer.createTransport(fallbackConfig);
          
          const info = await Promise.race([
            fallbackTransporter.sendMail(mailOptions),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Fallback email timeout')), emailTimeout)
            )
          ]);
          
          console.log('✅ Email enviado via fallback (porta 587):', info.messageId);
          emailSent = true;
          
          res.status(200).json({
            success: true,
            message: 'Email enviado com sucesso via fallback!',
            messageId: info.messageId,
            method: 'fallback-587',
            timestamp: new Date().toISOString()
          });
          
        } catch (fallbackError) {
          lastError = fallbackError;
          console.error('❌ Fallback também falhou:', fallbackError.message);
        }
      }
      
      // Se ainda não enviou, retornar erro
      if (!emailSent) {
        throw lastError;
      }
    }

  } catch (error) {
    console.error('❌ Erro detalhado ao enviar email:', error);
    
    // Logging detalhado do erro
    if (error.code) {
      console.error('Código do erro:', error.code);
    }
    if (error.response) {
      console.error('Resposta do servidor SMTP:', error.response);
    }
    
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor. Tente novamente mais tarde.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
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
    console.log('=== TESTE SMTP INICIADO ===');
    const transporter = createTransporter();
    const isMXRouting = process.env.SMTP_PROVIDER === 'mxrouting' || 
                       (process.env.SMTP_HOST && process.env.SMTP_HOST.includes('mxrouting'));
    
    if (!isMXRouting) {
      // Teste básico de conexão para outros provedores
      console.log('Testando conexão SMTP...');
      await Promise.race([
        transporter.verify(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('SMTP verification timeout (15s)')), 15000)
        )
      ]);
      
      console.log('SMTP verificado com sucesso!');
      res.json({ 
        success: true, 
        message: 'Configuração SMTP válida!',
        provider: 'Generic SMTP',
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        timestamp: new Date().toISOString()
      });
    } else {
      // Para MXRouting, testar envio direto
      console.log('🚀 MXRouting detectado - testando envio direto...');
      
      const testEmail = {
        from: `"Test Portfolio" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: 'Teste SMTP MXRouting - Portfolio',
        html: `
          <h2>✅ Teste SMTP Funcionando!</h2>
          <p>Este email foi enviado via MXRouting através do Railway.</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-PT')}</p>
          <hr>
          <small>Portfolio Mirasity - Sistema de Email</small>
        `
      };
      
      await Promise.race([
        transporter.sendMail(testEmail),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Test email timeout')), 20000)
        )
      ]);
      
      res.json({ 
        success: true, 
        message: 'MXRouting SMTP funcionando perfeitamente!',
        provider: 'MXRouting (Optimized)',
        host: process.env.SMTP_HOST,
        note: 'Teste direto sem verificação prévia',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Erro no teste SMTP:', error.message);
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: error.code,
      provider: process.env.SMTP_PROVIDER || 'unknown'
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