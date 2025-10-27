const request = require('supertest');
const express = require('express');

// Mock do nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn()
  }))
}));

// Mock do fetch para Discord webhook
global.fetch = jest.fn();

describe('Backend API Tests', () => {
  let app;
  let server;

  beforeEach(() => {
    // Limpar mocks
    jest.clearAllMocks();
    
    // Importar servidor após limpar mocks
    delete require.cache[require.resolve('../../backend/server.js')];
    app = require('../../backend/server.js');
  });

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  describe('POST /api/contact', () => {
    const validContactData = {
      name: 'João Silva',
      email: 'joao@example.com',
      subject: 'Teste de contacto',
      message: 'Esta é uma mensagem de teste.',
      mathAnswer: '5'
    };

    test('deve aceitar dados válidos e enviar email', async () => {
      // Mock successful email send
      const nodemailer = require('nodemailer');
      const mockTransporter = nodemailer.createTransport();
      mockTransporter.sendMail.mockResolvedValue({
        messageId: 'test-message-id',
        response: '250 OK'
      });

      // Mock successful Discord webhook
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      });

      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Email enviado com sucesso!'
      });

      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: expect.stringContaining('@'),
          to: expect.stringContaining('@'),
          subject: expect.stringContaining('Teste de contacto'),
          html: expect.stringContaining('João Silva')
        })
      );
    });

    test('deve rejeitar dados inválidos - campos obrigatórios', async () => {
      const invalidData = {
        name: '',
        email: 'email-invalido',
        subject: '',
        message: ''
      };

      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: expect.stringContaining('obrigatório')
      });
    });

    test('deve rejeitar email com formato inválido', async () => {
      const invalidEmailData = {
        ...validContactData,
        email: 'email-invalido'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(invalidEmailData)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: expect.stringContaining('inválido')
      });
    });

    test('deve rejeitar mensagem muito curta', async () => {
      const shortMessageData = {
        ...validContactData,
        message: 'abc'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(shortMessageData)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: expect.stringContaining('muito curta')
      });
    });

    test('deve prevenir spam com rate limiting', async () => {
      // Simular múltiplos requests rápidos
      const requests = Array(6).fill().map(() => 
        request(app)
          .post('/api/contact')
          .send(validContactData)
      );

      const responses = await Promise.all(requests);
      
      // Pelo menos uma resposta deve ser rate limited (429)
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });

    test('deve lidar com erro de envio de email', async () => {
      // Mock failed email send
      const nodemailer = require('nodemailer');
      const mockTransporter = nodemailer.createTransporter();
      mockTransporter.sendMail.mockRejectedValue(new Error('SMTP Error'));

      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: expect.stringContaining('erro')
      });
    });

    test('deve enviar webhook Discord mesmo se email falhar', async () => {
      // Mock failed email but successful Discord
      const nodemailer = require('nodemailer');
      const mockTransporter = nodemailer.createTransporter();
      mockTransporter.sendMail.mockRejectedValue(new Error('SMTP Error'));

      // Mock successful Discord webhook
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      });

      await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(500);

      // Verificar se Discord webhook foi chamado
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('discord'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('João Silva')
        })
      );
    });
  });

  describe('GET /api/health', () => {
    test('deve retornar status de saúde do servidor', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'OK',
        timestamp: expect.any(String),
        uptime: expect.any(Number)
      });
    });
  });

  describe('CORS e Security Headers', () => {
    test('deve ter headers CORS corretos', async () => {
      const response = await request(app)
        .options('/api/contact')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBeTruthy();
      expect(response.headers['access-control-allow-methods']).toContain('POST');
    });

    test('deve ter headers de segurança', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-frame-options']).toBe('DENY');
    });
  });

  describe('Error Handling', () => {
    test('deve retornar 404 para rotas não encontradas', async () => {
      const response = await request(app)
        .get('/api/rota-inexistente')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        message: 'Rota não encontrada'
      });
    });

    test('deve lidar com JSON malformado', async () => {
      const response = await request(app)
        .post('/api/contact')
        .set('Content-Type', 'application/json')
        .send('{"invalid": json}')
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: expect.stringContaining('JSON')
      });
    });
  });
});