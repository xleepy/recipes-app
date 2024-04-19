import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Chip } from '.';

describe('Chip tests', () => {
  it('should render chip element', () => {
    const { asFragment } = render(<Chip name="lorem" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
