import { render } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';
import { App } from './app';

// skipped till issue will be resolved
// https://github.com/vitest-dev/vitest/issues/5004
describe.skip('App tests', () => {
  it('should render app', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
