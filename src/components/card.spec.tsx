import { h } from 'preact';
import { render } from '@testing-library/preact';
import { Card } from './card';

describe('Card tests', () => {
  it('should render component', () => {
    const { asFragment } = render(<Card recipe={{ label: 'test' }} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
