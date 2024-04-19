import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { List } from '.';

describe('List tests', () => {
  it('should render as ordered list', () => {
    const { asFragment } = render(
      <List title="Lorem ipsum" as="ol">
        <li>test</li>
      </List>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as unordered list', () => {
    const { asFragment } = render(
      <List title="Lorem ipsum" as="ul">
        <li>test</li>
      </List>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
