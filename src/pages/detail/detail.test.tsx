import { render, waitFor } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import Detail from '.';
import { GetRecipeInformation200Response } from '../../api';
import { RecipesApiProvider } from '../../providers/recipes-api-provider';
import { SWRConfig } from 'swr';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient();

describe('Detail tests', () => {
  it('should render detail', async () => {
    const { asFragment, queryByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <RecipesApiProvider>
          <Detail />
        </RecipesApiProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(queryByTestId('detail')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
