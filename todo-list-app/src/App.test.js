// src/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './App';

test('adds a new task', () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText('Add a new task...');
  const addButton = screen.getByRole('button');
  
  fireEvent.change(input, { target: { value: 'Test task' } });
  fireEvent.click(addButton);
  
  expect(screen.getByText('Test task')).toBeInTheDocument();
});

test('validates empty input', () => {
  render(<TodoApp />);
  const addButton = screen.getByRole('button');
  
  fireEvent.click(addButton);
  
  expect(screen.getByText('Task cannot be empty')).toBeInTheDocument();
});
