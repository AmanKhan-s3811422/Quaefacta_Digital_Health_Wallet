import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Smoke Test', () => {
  render(<App />);
  const smokeTest = screen.getByText("Welcome to Quaefacta Health");
  expect(smokeTest).toBeInTheDocument();
});
