import { render, screen } from '@testing-library/react';
import Pokemon from '../Pokemon';

describe('Pokemon Component', () => {
  const mockPokemon = {
    name: 'Pikachu',
    types: ['electric'],
    stats: [
      { base_stat: 35, stat: { name: 'hp' } },
      { base_stat: 55, stat: { name: 'attack' } }
    ]
  };

  test('renders Pokemon card with correct data', () => {
    render(<Pokemon data={mockPokemon} />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
  });
});
