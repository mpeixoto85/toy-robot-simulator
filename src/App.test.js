import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App Component Integration', () => {
  test('renders the App component with initial state', () => {
    render(<App />);
    expect(screen.getByText(/Toy Robot Simulator/i)).toBeInTheDocument();
  });

  test('processes PLACE command and renders Robot in correct cell', () => {
    render(<App />);

    const textarea = screen.getByPlaceholderText(/Enter commands, one per line/i);
    const submitButton = screen.getByRole('button', { name: /Execute/i });

    fireEvent.change(textarea, { target: { value: 'PLACE 1,2,EAST' } });
    fireEvent.click(submitButton);


    expect(screen.getByTestId('robot')).toBeInTheDocument();
  });

  test('executes a sequence of commands and generates correct report', () => {
    render(<App />);

    const textarea = screen.getByPlaceholderText(/Enter commands, one per line/i);
    const submitButton = screen.getByRole('button', { name: /Execute/i });

    fireEvent.change(textarea, { target: { value: 'PLACE 0,0,NORTH\nMOVE\nREPORT' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Output:/i)).toHaveTextContent('Output: 0,1,NORTH');
  });

  test('processes LEFT and RIGHT commands correctly', () => {
    render(<App />);

    const textarea = screen.getByPlaceholderText(/Enter commands, one per line/i);
    const submitButton = screen.getByRole('button', { name: /Execute/i });

    fireEvent.change(textarea, { target: { value: 'PLACE 2,2,EAST\nLEFT\nREPORT' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Output:/i)).toHaveTextContent('Output: 2,2,NORTH');

    fireEvent.change(textarea, { target: { value: 'RIGHT\nREPORT' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Output:/i)).toHaveTextContent('Output: 2,2,EAST');
  });

  test('ignores MOVE command if PLACE has not been called', () => {
    render(<App />);

    const textarea = screen.getByPlaceholderText(/Enter commands, one per line/i);
    const submitButton = screen.getByRole('button', { name: /Execute/i });

    fireEvent.change(textarea, { target: { value: 'MOVE' } });
    fireEvent.click(submitButton);

    expect(screen.queryByTestId('robot')).not.toBeInTheDocument();
  });
});
