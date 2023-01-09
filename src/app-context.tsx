import { createContext, ComponentChildren } from 'preact';
import { useContext, useState, useCallback, useEffect } from 'preact/hooks';
import { ApiResponse, Recipe } from './api';
import { route } from 'preact-router';

// TODO: fix params type
type QueryParams = Record<string, any>;

type AppContext = {
  isLoading: boolean;
  recipes: Recipe[];
  recipe: Recipe | null;
  selectRecipe: (index: number) => void;
  searchRecipesByParams: (params: QueryParams) => void;
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

function findRecipes(props: QueryParams) {
  const queryString = makeQueryString({
    ...props,
    type: 'public',
    app_id: import.meta.env.VITE_APP_ID,
    app_key: import.meta.env.VITE_APP_KEY,
  });
  return fetch(`https://api.edamam.com/api/recipes/v2?${queryString}`).then(
    (resp) => resp.json() as ApiResponse
  );
}

const AppProviderContext = createContext<AppContext | null>(null);

export const AppProvider = ({ children }: { children: ComponentChildren }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedIdx, setRecipeIndex] = useState<number>(-1);

  const selectRecipeByIndex = useCallback((index: number) => {
    setRecipeIndex(index);
  }, []);

  const searchRecipesByParams = useCallback((params: QueryParams) => {
    setLoading(true);
    findRecipes(params)
      .then(({ hits = [] }) => {
        setRecipes(hits?.map((hit) => hit.recipe));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const selectedRecipe = recipes?.[selectedIdx];

  const label = selectedRecipe?.label;

  useEffect(() => {
    if (label) {
      route(`/detail/${label}`);
    }
  }, [label]);

  return (
    <AppProviderContext.Provider
      value={{
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
