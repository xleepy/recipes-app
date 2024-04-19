import { render } from '@testing-library/react';
import { Card } from './card';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('Card tests', () => {
  it('should render card', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Card title="test" image="test" id={1} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
