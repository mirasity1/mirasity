import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginTest from '../components/LoginTest';

// Mock fetch
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
    console.error = jest.fn(); // Mock console.error para evitar logs nos testes
  });

  test('renders login form without errors', () => {
    renderLoginTest();

    // Apenas verificar que o componente carrega sem erros
    expect(screen.getByText(/Login de Teste/i)).toBeInTheDocument();
  });
});