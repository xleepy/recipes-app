import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Home } from '.';
import {
  GetRecipeInformation200Response,
  SearchRecipes200Response,
} from '../../api';
import { MemoryRouter } from 'react-router-dom';
import { RecipesApiProvider } from '../../providers/recipes-api-provider';

vi.mock('../../api/apis/RecipesApi', () => {
  const MockInstance = vi.fn(() => {
    return {
      searchRecipes: vi.fn(() => {
        return Promise.resolve<SearchRecipes200Response>({
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
        });
      }),
      getRecipeInformation: vi.fn(() => {
        return Promise.resolve<GetRecipeInformation200Response>({
          title: 'test',
          imageType: 'png',
          image: 'none',
          id: 1,
          servings: 1,
          vegan: true,
          whole30: false,
          weightWatcherSmartPoints: 1,
          veryPopular: false,
          veryHealthy: true,
          vegetarian: true,
          sustainable: true,
          summary: 'lorem ipsum',
          spoonacularScore: 1,
          spoonacularSourceUrl: 'test',
          sourceUrl: 'test',
          sourceName: 'test',
          readyInMinutes: 15,
          pricePerServing: 1,
          occasions: [],
          lowFodmap: false,
          license: 'test',
          ketogenic: false,
          instructions: 'test',
          healthScore: 12,
          glutenFree: false,
          gaps: 'test',
          extendedIngredients: new Set(),
          dishTypes: [],
          diets: [],
          dairyFree: false,
          cuisines: [],
          creditsText: 'test',
          cheap: false,
          analyzedInstructions: [{ steps: [] }],
          aggregateLikes: 1,
          winePairing: {
            pairedWines: [],
            pairingText: 'test',
            productMatches: new Set(),
          },
        });
      }),
    };
  });
  return {
    RecipesApi: MockInstance,
  };
});

// skipped till issue will be resolved
// https://github.com/vitest-dev/vitest/issues/5004
describe('Home tests', () => {
  const renderApp = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <RecipesApiProvider>
          <Home />
        </RecipesApiProvider>
      </MemoryRouter>
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
