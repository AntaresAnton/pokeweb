import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders main navigation elements', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders Pokedex section', () => {
    render(<App />);
    const pokedexElement = screen.getByTestId('pokedex-section');
    expect(pokedexElement).toBeInTheDocument();
  });
});
