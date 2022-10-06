import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Login do usuário', () => {
  test('Verifica se o caminho do login está correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toEqual('/');
  });
  test('Verifica se a tela inicial é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const pageTitle = screen.getByRole('heading', { name: /trybewallet/i });
    const loginTitle = screen.getByRole('heading', { name: /login/i });
    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const submitBtn = screen.getByRole('button', { name: /entrar/i });
    const loginElements = [
      pageTitle,
      loginTitle,
      emailInput,
      passwordInput,
      submitBtn,
    ];

    loginElements.forEach((e) => expect(e).toBeInTheDocument());
  });
  test('Verifica a validação do botão', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const submitBtn = screen.getByRole('button', { name: /entrar/i });

    const invalidEmails = ['x', 'x@y', 'x@y@z', 'x@y.z'];
    const invalidPassword = 'xxxxx';
    const validEmail = 'x@y.zz';
    const validPassword = '123456';

    invalidEmails.forEach((e) => {
      userEvent.type(emailInput, e);
      userEvent.type(passwordInput, invalidPassword);
      expect(submitBtn).toBeDisabled();

      userEvent.type(passwordInput, validPassword);
      expect(submitBtn).toBeDisabled();
    });

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, invalidPassword);
    expect(submitBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    expect(submitBtn).not.toBeDisabled();
  });
  test('Verifica a rota de quando se clica no botão de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const submitBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'ffmpenna@gmail.com');
    userEvent.type(passwordInput, '123456');
    expect(submitBtn).not.toBeDisabled();

    userEvent.click(submitBtn);

    expect(history.location.pathname).toEqual('/carteira');
  });
});
