import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders Tic tac toe', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tic tac toe/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getAllByTestId('square')).toHaveLength(9);
  expect(
    screen.getByRole('button', { name: 'Start again' }),
  ).toBeInTheDocument();
});

test('renders correct icon and changes the turn', () => {
  render(<App />);
  expect(screen.getByText('Next turn: Phone')).toBeInTheDocument();

  fireEvent.click(screen.getAllByTestId('square')[0]);
  expect(screen.getByAltText('phone')).toBeInTheDocument();
  expect(screen.getByText('Next turn: Watch')).toBeInTheDocument();
});

test('winning functionality works correctly', () => {
  render(<App />);
  expect(screen.getByText('Next turn: Phone')).toBeInTheDocument();

  fireEvent.click(screen.getAllByTestId('square')[0]);
  fireEvent.click(screen.getAllByTestId('square')[4]);
  fireEvent.click(screen.getAllByTestId('square')[1]);
  fireEvent.click(screen.getAllByTestId('square')[5]);
  fireEvent.click(screen.getAllByTestId('square')[2]);

  expect(screen.getByText("Congrats, phone! You've won!")).toBeInTheDocument();
});


test('draw functionality works correctly', () => {
  render(<App />);
  expect(screen.getByText('Next turn: Phone')).toBeInTheDocument();

  fireEvent.click(screen.getAllByTestId('square')[0]);
  fireEvent.click(screen.getAllByTestId('square')[3]);
  fireEvent.click(screen.getAllByTestId('square')[1]);
  fireEvent.click(screen.getAllByTestId('square')[4]);
  fireEvent.click(screen.getAllByTestId('square')[5]);
  fireEvent.click(screen.getAllByTestId('square')[2]);
  fireEvent.click(screen.getAllByTestId('square')[6]);
  fireEvent.click(screen.getAllByTestId('square')[7]);
  fireEvent.click(screen.getAllByTestId('square')[8]);

  expect(screen.getByText("Draw, please start again")).toBeInTheDocument();
});

test('start again functionality works correctly', () => {
  render(<App />);
  expect(screen.getByText('Next turn: Phone')).toBeInTheDocument();

  fireEvent.click(screen.getAllByTestId('square')[0]);
  expect(screen.getByAltText('phone')).toBeInTheDocument();
  expect(screen.getByText('Next turn: Watch')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Start again' }));
  expect(screen.queryByAltText('phone')).not.toBeInTheDocument()
  expect(screen.getByText('Next turn: Phone')).toBeInTheDocument();
});

