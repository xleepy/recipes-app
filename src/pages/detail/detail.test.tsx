import { render, waitFor } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import Detail from '.';
import { GetRecipeInformation200Response } from '../../api';
import { AppProviders } from '../../providers/app-providers';

const mockFn = vi.fn(() =>
  Promise.resolve({
    title: 'test',
    summary: 'test',
    instructions: 'test',
    image: 'none',
  } as GetRecipeInformation200Response)
);

vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as any),
    useParams: () => ({ id: 'test' }),
  };
});

vi.mock('../../providers/recipes-api-provider', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as any),
    useRecipesApi: vi.fn(() => {
      return {
        getRecipeInformation: mockFn,
      };
    }),
  };
});

// skipped till issue will be resolved
// https://github.com/vitest-dev/vitest/issues/5004
describe.skip('Detail tests', () => {
  it('should render detail', async () => {
    const { asFragment, queryByTestId } = render(
      <AppProviders>
        <Detail />
      </AppProviders>
    );

    await waitFor(() => {
      expect(queryByTestId('detail')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
