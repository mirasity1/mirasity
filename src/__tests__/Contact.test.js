import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import Contact from '../components/Contact';
import { LanguageProvider } from '../contexts/LanguageContext';

// Mock do emailService
jest.mock('../services/emailService', () => ({
  sendEmail: jest.fn(),
}));

// Mock do Google Analytics
jest.mock('../components/GoogleAnalytics', () => ({
  trackContactFormSubmit: jest.fn(),
  trackContactFormError: jest.fn(),
}));

const emailService = require('../services/emailService');
const { trackContactFormSubmit, trackContactFormError } = require('../components/GoogleAnalytics');

// Componente wrapper para testes
const TestWrapper = ({ children }) => (
  <HelmetProvider>
    <LanguageProvider>
      {children}
    </LanguageProvider>
  </HelmetProvider>
);

describe('Contact Component', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
  });

  test('deve renderizar o formulário corretamente', () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    // Verificar se os campos estão presentes
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar mensagem/i })).toBeInTheDocument();
  });

  test('deve mostrar erros de validação para campos obrigatórios', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });
    
    // Tentar submeter formulário vazio
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/assunto é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument();
    });
  });

  test('deve validar formato de email inválido', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });

    // Inserir email inválido
    await user.type(emailInput, 'email-invalido');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
  });

  test('deve submeter formulário com dados válidos', async () => {
    const user = userEvent.setup();
    
    // Mock successful email send
    emailService.sendEmail.mockResolvedValue({ success: true });
    
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    // Preencher formulário
    await user.type(screen.getByLabelText(/nome/i), 'João Silva');
    await user.type(screen.getByLabelText(/email/i), 'joao@example.com');
    await user.type(screen.getByLabelText(/assunto/i), 'Teste de contacto');
    await user.type(screen.getByLabelText(/mensagem/i), 'Esta é uma mensagem de teste.');

    // Resolver questão matemática (assumindo que é 2+3=5)
    const mathInput = screen.getByDisplayValue('');
    if (mathInput) {
      await user.type(mathInput, '5');
    }

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailService.sendEmail).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@example.com',
        subject: 'Teste de contacto',
        message: 'Esta é uma mensagem de teste.',
        mathAnswer: '5'
      });
      expect(trackContactFormSubmit).toHaveBeenCalled();
    });
  });

  test('deve mostrar mensagem de sucesso após envio', async () => {
    const user = userEvent.setup();
    
    // Mock successful email send
    emailService.sendEmail.mockResolvedValue({ success: true });
    
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    // Preencher e submeter formulário válido
    await user.type(screen.getByLabelText(/nome/i), 'Maria Santos');
    await user.type(screen.getByLabelText(/email/i), 'maria@example.com');
    await user.type(screen.getByLabelText(/assunto/i), 'Consulta');
    await user.type(screen.getByLabelText(/mensagem/i), 'Gostaria de saber mais informações.');

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();
    });
  });

  test('deve mostrar mensagem de erro quando envio falha', async () => {
    const user = userEvent.setup();
    
    // Mock failed email send
    emailService.sendEmail.mockRejectedValue(new Error('Erro de rede'));
    
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    // Preencher formulário
    await user.type(screen.getByLabelText(/nome/i), 'Pedro Costa');
    await user.type(screen.getByLabelText(/email/i), 'pedro@example.com');
    await user.type(screen.getByLabelText(/assunto/i), 'Erro de teste');
    await user.type(screen.getByLabelText(/mensagem/i), 'Teste de erro.');

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao enviar mensagem/i)).toBeInTheDocument();
      expect(trackContactFormError).toHaveBeenCalled();
    });
  });

  test('deve limpar erros quando utilizador começa a digitar', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    const nameInput = screen.getByLabelText(/nome/i);
    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });

    // Submeter formulário vazio para gerar erros
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    });

    // Começar a digitar no campo nome
    await user.type(nameInput, 'A');

    await waitFor(() => {
      expect(screen.queryByText(/nome é obrigatório/i)).not.toBeInTheDocument();
    });
  });

  test('deve desabilitar botão durante envio', async () => {
    const user = userEvent.setup();
    
    // Mock delayed email send
    emailService.sendEmail.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000))
    );
    
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    // Preencher formulário válido
    await user.type(screen.getByLabelText(/nome/i), 'Ana Silva');
    await user.type(screen.getByLabelText(/email/i), 'ana@example.com');
    await user.type(screen.getByLabelText(/assunto/i), 'Teste');
    await user.type(screen.getByLabelText(/mensagem/i), 'Mensagem de teste.');

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });
    await user.click(submitButton);

    // Verificar se botão está desabilitado durante envio
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/enviando/i)).toBeInTheDocument();
  });
});