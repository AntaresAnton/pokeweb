import { capitalizeFirstLetter, formatPokemonId } from '../helpers';

describe('Helper Functions', () => {
  test('capitalizeFirstLetter works correctly', () => {
    expect(capitalizeFirstLetter('pikachu')).toBe('Pikachu');
    expect(capitalizeFirstLetter('CHARIZARD')).toBe('Charizard');
  });

  test('formatPokemonId adds leading zeros', () => {
    expect(formatPokemonId(1)).toBe('001');
    expect(formatPokemonId(25)).toBe('025');
  });
});
