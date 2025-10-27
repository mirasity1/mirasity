import emailService from '../services/emailService';

// Mock fetch global
global.fetch = jest.fn();

describe('EmailService', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    fetch.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('sendEmail', () => {
    const mockFormData = {
      name: 'João Silva',
      email: 'joao@example.com',
      subject: 'Teste de contacto',
      message: 'Esta é uma mensagem de teste.'
    };

    test('deve enviar email com sucesso', async () => {
      // Mock successful response
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Email enviado com sucesso'
        })
      });

      const result = await emailService.sendEmail(mockFormData);

      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'João Silva',
          email: 'joao@example.com',
          subject: 'Teste de contacto',
          message: 'Esta é uma mensagem de teste.'
        })
      });

      expect(result).toEqual({
        success: true,
        message: 'Email enviado com sucesso'
      });
    });

    test('deve lidar com erro de rede', async () => {
      // Mock network error
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(emailService.sendEmail(mockFormData))
        .rejects
        .toThrow('Network error');

      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'João Silva',
          email: 'joao@example.com',
          subject: 'Teste de contacto',
          message: 'Esta é uma mensagem de teste.'
        })
      });
    });

    test('deve lidar com resposta de erro do servidor', async () => {
      // Mock server error response
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          error: 'Validation error',
          message: 'Email inválido'
        })
      });

      await expect(emailService.sendEmail(mockFormData))
        .rejects
        .toThrow();

      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'João Silva',
          email: 'joao@example.com',
          subject: 'Teste de contacto',
          message: 'Esta é uma mensagem de teste.'
        })
      });
    });
  });

  describe('Validações', () => {
    test('deve validar formulário corretamente', () => {
      const validFormData = {
        name: 'João Silva',
        email: 'joao@example.com',
        subject: 'Teste de contacto',
        message: 'Esta é uma mensagem de teste válida com mais de 10 caracteres.'
      };

      const errors = emailService.validateForm(validFormData);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    test('deve detectar campos obrigatórios em falta', () => {
      const invalidFormData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      const errors = emailService.validateForm(invalidFormData);
      expect(errors.name).toBe('Nome é obrigatório');
      expect(errors.email).toBe('Email é obrigatório');
      expect(errors.subject).toBe('Assunto é obrigatório');
      expect(errors.message).toBe('Mensagem é obrigatória');
    });

    test('deve validar formato de email', () => {
      const invalidEmailData = {
        name: 'João Silva',
        email: 'email-invalido',
        subject: 'Teste',
        message: 'Esta é uma mensagem válida.'
      };

      const errors = emailService.validateForm(invalidEmailData);
      expect(errors.email).toBe('Email inválido');
    });

    test('deve validar tamanho mínimo da mensagem', () => {
      const shortMessageData = {
        name: 'João Silva',
        email: 'joao@example.com',
        subject: 'Teste',
        message: 'Curta'
      };

      const errors = emailService.validateForm(shortMessageData);
      expect(errors.message).toBe('Mensagem deve ter pelo menos 10 caracteres');
    });
  });
});