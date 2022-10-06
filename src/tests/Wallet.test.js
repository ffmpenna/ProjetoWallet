import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testes página Wallet', () => {
  test('Verifica se os elementos do formulário estão sendo renderizados', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId(/value-input/i);
    const descriptionInput = screen.getByTestId(/description-input/i);
    const currencyInput = screen.getByTestId(/currency-input/i);
    const methodInput = screen.getByTestId(/method-input/i);
    const tagInput = screen.getByTestId(/tag-input/i);
    const addBtn = screen.getByTestId(/add-btn/i);

    const formElements = [
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
      addBtn,
    ];

    formElements.forEach((e) => expect(e).toBeInTheDocument());
  });

  test('Verifica a utilização do formulário e a renderização da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const valueInput = screen.getByTestId(/value-input/i);
    const descriptionInput = screen.getByTestId(/description-input/i);
    const currencyInput = await screen.findByTestId(/currency-input/i);
    await within(currencyInput).findAllByRole('option');
    const methodInput = screen.getByTestId(/method-input/i);
    const tagInput = screen.getByTestId(/tag-input/i);
    const addBtn = screen.getByTestId(/add-btn/i);

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'teste 1');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Alimentação');

    userEvent.click(addBtn);

    const description = await screen.findByRole('cell', { name: /teste 1/i });
    const editBtn = screen.getByRole('button', { name: /editar/i });
    const removeBtn = screen.getByRole('button', { name: /x/i });

    const tableElements = [description, editBtn, removeBtn];

    tableElements.forEach((e) => expect(e).toBeInTheDocument());

    userEvent.click(editBtn);
    userEvent.type(descriptionInput, 'teste de alteração');

    const addEditBtn = screen.getByRole('button', { name: /editar despesa/i });

    expect(addEditBtn).toBeInTheDocument();

    userEvent.click(addEditBtn);

    const editedDescription = await screen.findByRole('cell', {
      name: /teste de alteração/i,
    });

    expect(editedDescription).toBeInTheDocument();

    userEvent.click(removeBtn);

    expect(editedDescription).not.toBeInTheDocument();
  });
});
