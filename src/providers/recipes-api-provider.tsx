import { createContext, ComponentChildren } from 'preact';
import { RecipesApi } from '../api/apis/RecipesApi';
import { Configuration } from '../api/runtime';
import { useContext, useMemo } from 'preact/hooks';

type RecipesProviderContextValue = RecipesApi | null;

const RecipesProviderContext = createContext<RecipesProviderContextValue>(null);

export const RecipesApiProvider = ({
  children,
}: {
  children: ComponentChildren;
}) => {
  const api = useMemo(() => {
    return new RecipesApi(
      new Configuration({ apiKey: import.meta.env.VITE_APP_ID })
    );
  }, []);
  return (
    <RecipesProviderContext.Provider value={api}>
      {children}
    </RecipesProviderContext.Provider>
  );
};

export const useRecipesApi = () => {
  const context = useContext(RecipesProviderContext);
  if (!context) {
    throw new Error('Api not provided');
  }
  return context;
};
