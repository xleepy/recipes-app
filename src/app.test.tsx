import { render } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';
import { App } from './app';

describe('App tests', () => {
  it('should render app', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
