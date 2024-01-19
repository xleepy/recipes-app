import { render, waitFor } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { Home } from '.';
import { RecipesApiProvider } from '../../providers/recipes-api-provider';
import { HashRouter } from 'react-router-dom';
import { SearchRecipes200Response } from '../../api';
import { SWRConfig } from 'swr';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockFn = vi.fn(() =>
  Promise.resolve({
    results: new Set([
      {
        title: 'test',
        protein: 'yes',
        imageType: 'png',
        image: 'none',
        id: 1,
        fat: 'test',
        carbs: 'test',
        calories: 1,
      },
    ]),
    totalResults: 1,
    offset: 1,
    number: 1,
  } as SearchRecipes200Response)
);

vi.mock('../../providers/recipes-api-provider', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as any),
    useRecipesApi: vi.fn(() => {
      return {
        searchRecipes: mockFn,
      };
    }),
  };
});

const queryClient = new QueryClient();

describe('Home tests', () => {
  const renderApp = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <RecipesApiProvider>
          <HashRouter>
            <Home />
          </HashRouter>
        </RecipesApiProvider>
      </QueryClientProvider>
    );
  };
  it('should render home', async () => {
    const { asFragment, queryByTestId } = renderApp();

    await waitFor(() => {
      expect(queryByTestId('card')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
