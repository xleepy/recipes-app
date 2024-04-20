import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Fallback } from '.';

describe('Fallback tests', () => {
  it('should render fallback with error', () => {
    const { asFragment } = render(<Fallback error={new Error('test')} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
