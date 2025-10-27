import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginTest from '../components/LoginTest';

// Mock fetch global
global.fetch = jest.fn();

const renderLoginTest = () => {
  return render(
    <BrowserRouter>
      <LoginTest />
    </BrowserRouter>
  );
};

describe('LoginTest Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders login form with all elements', () => {
    renderLoginTest();
    
    expect(screen.getByText('Login de Teste')).toBeInTheDocument();
    expect(screen.getByLabelText(/nome de utilizador/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/palavra-passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /fazer login/i })).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument(); // Password hint
  });

  test('shows validation errors for empty fields', async () => {
    renderLoginTest();
    
    const submitButton = screen.getByRole('button', { name: /fazer login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Nome de utilizador é obrigatório')).toBeInTheDocument();
    });
  });

  test('shows password length validation', async () => {
    renderLoginTest();
    
    const usernameInput = screen.getByLabelText(/nome de utilizador/i);
    const passwordInput = screen.getByLabelText(/palavra-passe/i);
    const submitButton = screen.getByRole('button', { name: /fazer login/i });

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Palavra-passe deve ter pelo menos 6 caracteres')).toBeInTheDocument();
    });
  });

  test('handles wrong password error from API', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      headers: {
        get: () => 'application/json'
      },
      json: async () => ({
        success: false,
        error: 'Palavra-passe incorreta',
        message: 'A palavra-passe que inseriu está incorreta. Tente novamente.'
      })
    });

    renderLoginTest();
    
    const usernameInput = screen.getByLabelText(/nome de utilizador/i);
    const passwordInput = screen.getByLabelText(/palavra-passe/i);
    const submitButton = screen.getByRole('button', { name: /fazer login/i });

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    // Check loading state
    await waitFor(() => {
      expect(screen.getByText(/a fazer login/i)).toBeInTheDocument();
    });

    // Check error message
    await waitFor(() => {
      expect(screen.getByText('Palavra-passe incorreta')).toBeInTheDocument();
    });
  });

  test('handles correct password but login disabled', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      headers: {
        get: () => 'application/json'
      },
      json: async () => ({
        success: false,
        error: 'Login desabilitado',
        message: 'Esta é uma página de teste - login está desabilitado para demonstrar error handling'
      })
    });

    renderLoginTest();
    
    const usernameInput = screen.getByLabelText(/nome de utilizador/i);
    const passwordInput = screen.getByLabelText(/palavra-passe/i);
    const submitButton = screen.getByRole('button', { name: /fazer login/i });

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Login desabilitado')).toBeInTheDocument();
    });
  });

  test('handles network/JSON parse errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: {
        get: () => 'text/html'
      },
      text: async () => '<!DOCTYPE html><html>Error</html>'
    });

    renderLoginTest();
    
    const usernameInput = screen.getByLabelText(/nome de utilizador/i);
    const passwordInput = screen.getByLabelText(/palavra-passe/i);
    const submitButton = screen.getByRole('button', { name: /fazer login/i });

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Erro de conectividade com o servidor')).toBeInTheDocument();
    });
  });

  test('toggles password visibility', () => {
    renderLoginTest();
    
    const passwordInput = screen.getByLabelText(/palavra-passe/i);
    const toggleButton = screen.getByRole('button', { name: '' }); // Eye icon button

    expect(passwordInput.type).toBe('password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  test('clears field errors when user types', () => {
    renderLoginTest();
    
    const usernameInput = screen.getByLabelText(/nome de utilizador/i);
    const submitButton = screen.getByRole('button', { name: /fazer login/i });

    // Trigger validation error
    fireEvent.click(submitButton);
    
    // Type in field to clear error
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    
    // Error should be cleared
    expect(screen.queryByText('Nome de utilizador é obrigatório')).not.toBeInTheDocument();
  });

  test('disables form during loading', async () => {
    fetch.mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: false,
          status: 401,
          headers: { get: () => 'application/json' },
          json: async () => ({ error: 'Test error' })
        }), 100)
      )
    );

    renderLoginTest();
    
    const usernameInput = screen.getByLabelText(/nome de utilizador/i);
    const passwordInput = screen.getByLabelText(/palavra-passe/i);
    const submitButton = screen.getByRole('button', { name: /fazer login/i });

    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    // Check that form is disabled during loading
    await waitFor(() => {
      expect(usernameInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });
  });
});