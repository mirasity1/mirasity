const request = require('supertest');

// Mock do nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'mock-msg-id', response: '250 OK' }),
    verify: jest.fn().mockResolvedValue(true)
  }))
}));

// Mock do fetch para Discord webhook  
global.fetch = jest.fn();

describe('Backend API Tests', () => {
  let app;

  beforeAll(() => {
    // Importar servidor
    app = require('../server.js');
  });

  beforeEach(() => {
    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
    
    // Mock fetch para Discord webhook
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200
    });
  });

  describe('POST /api/send-email', () => {
    const validEmailData = {
      name: 'João Silva',
      email: 'joao@example.com',
      subject: 'Teste de contacto',
      message: 'Esta é uma mensagem de teste.'
    };

    test('deve aceitar dados válidos para email', async () => {
      const response = await request(app)
        .post('/api/send-email')
        .send(validEmailData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
    });

    test('deve rejeitar dados inválidos - campos obrigatórios', async () => {
      const invalidData = {
        name: '',
        email: 'email-invalido',
        subject: '',
        message: ''
      };

      const response = await request(app)
        .post('/api/send-email')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });

    test('deve rejeitar email com formato inválido', async () => {
      const invalidEmailData = {
        ...validEmailData,
        email: 'email-invalido'
      };

      const response = await request(app)
        .post('/api/send-email')
        .send(invalidEmailData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toContain('Email inválido');
    });
  });

  describe('POST /api/login', () => {
    test('deve rejeitar login com password incorreta', async () => {
      const loginData = {
        username: 'teste',
        password: 'senha-errada'
      };

      const response = await request(app)
        .post('/api/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Palavra-passe incorreta');
    });

    test('deve rejeitar login mesmo com password correta (teste)', async () => {
      const loginData = {
        username: 'teste', 
        password: '123456'
      };

      const response = await request(app)
        .post('/api/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('code', 'LOGIN_DISABLED_FOR_TESTING');
    });

    test('deve validar campos obrigatórios', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toContain('obrigatórios');
    });
  });

  describe('GET /health', () => {
    test('deve retornar status de saúde do servidor', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/test', () => {
    test('deve retornar informações da API', async () => {
      const response = await request(app)
        .get('/api/test')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'API funcionando!');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Error Handling', () => {
    test('deve retornar 404 para rotas API não encontradas', async () => {
      const response = await request(app)
        .get('/api/rota-inexistente')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'API endpoint not found');
      expect(response.body).toHaveProperty('availableEndpoints');
    });
  });
});