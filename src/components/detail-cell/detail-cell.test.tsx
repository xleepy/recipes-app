import { render } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';
import { DetailCell } from '.';

describe('Detail cell tests', () => {
  it('should render detail cell', () => {
    const { asFragment } = render(<DetailCell>test</DetailCell>);
    expect(asFragment()).toMatchSnapshot();
  });
});
