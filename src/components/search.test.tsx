import { render } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { Search } from './search';

describe('Search tests', () => {
  it('should render search', () => {
    const { asFragment } = render(<Search onValueChange={vi.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
