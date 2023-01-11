import { createContext, ComponentChildren } from 'preact';
import { useContext, useState, useCallback } from 'preact/hooks';
import { ApiResponse, Recipe } from './api';
import { route } from 'preact-router';
import { getCorrectBasePath } from './utils';

// TODO: fix params type
type QueryParams = Record<string, any>;

type AppContext = {
  isLoading: boolean;
  recipes: Recipe[];
  recipe: Recipe | null;
  selectRecipe: (index: number) => void;
  searchRecipesByParams: (params: QueryParams) => void;
  loadMore: () => void;
};

const makeQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        return `${key}=${value.join(',')}`;
      }
      return `${key}=${value}`;
    })
    .join('&');
};

type RecipeData = {
  nextLink?: string;
  recipes: Recipe[];
};

const getRecipesFromResponse = (promise: Promise<Response>) => {
  return promise
    .then((resp) => resp.json())
    .then(({ hits, _links }: ApiResponse) => {
      const recipes =
        hits?.map((hit) => {
          hit.recipe.id = Date.now();
          return hit.recipe;
        }) ?? [];
      return {
        recipes,
        nextLink: _links?.next?.href,
      };
    });
};

function findRecipes(props: QueryParams): Promise<RecipeData> {
  const queryString = makeQueryString({
    ...props,
    type: 'public',
    app_id: import.meta.env.VITE_APP_ID,
    app_key: import.meta.env.VITE_APP_KEY,
  });
  return getRecipesFromResponse(
    fetch(`https://api.edamam.com/api/recipes/v2?${queryString}`)
  );
}

const AppProviderContext = createContext<AppContext | null>(null);

export const AppProvider = ({ children }: { children: ComponentChildren }) => {
  const [{ recipes, nextLink }, setRecipes] = useState<RecipeData>({
    recipes: [],
  });
  const [isLoading, setLoading] = useState(false);
  const [selectedIdx, setRecipeIndex] = useState<number>(-1);

  const loadMore = useCallback(() => {
    if (!nextLink) {
      return;
    }
    getRecipesFromResponse(fetch(nextLink)).then(({ recipes, nextLink }) => {
      setRecipes((state) => {
        return {
          recipes: [...state.recipes, ...recipes],
          nextLink,
        };
      });
    });
  }, [nextLink]);

  const selectRecipeByIndex = useCallback(
    (index: number) => {
      setRecipeIndex(index);
      const recipe = recipes?.[index];
      if (recipe) {
        route(getCorrectBasePath(`detail/${recipe.label}`));
      }
    },
    [recipes]
  );

  const searchRecipesByParams = useCallback((params: QueryParams) => {
    setLoading(true);
    findRecipes(params)
      .then(setRecipes)
      .finally(() => setLoading(false));
  }, []);

  const selectedRecipe = recipes?.[selectedIdx];

  return (
    <AppProviderContext.Provider
      value={{
        loadMore,
        isLoading,
        recipe: selectedRecipe,
        recipes,
        searchRecipesByParams,
        selectRecipe: selectRecipeByIndex,
      }}
    >
      {children}
    </AppProviderContext.Provider>
  );
};

export function useSelectionContext() {
  const context = useContext(AppProviderContext);
  if (!context) {
    throw new Error('App context not found');
  }
  return context;
}
