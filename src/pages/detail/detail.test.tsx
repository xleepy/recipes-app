import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DetailPage from '.';
import { MemoryRouter } from 'react-router-dom';
import { RecipesApiProvider } from '../../providers/recipes-api-provider';
import { GetRecipeInformation200Response } from '../../api';

vi.mock('../../api/apis/RecipesApi', () => {
  const MockInstance = vi.fn(() => {
    return {
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

describe('Detail tests', () => {
  it('should render detail', async () => {
    const { asFragment, queryByTestId } = render(
      <MemoryRouter>
        <RecipesApiProvider>
          <DetailPage />
        </RecipesApiProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(queryByTestId('detail')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
