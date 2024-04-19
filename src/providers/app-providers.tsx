import { RecipesApiProvider } from './recipes-api-provider';
import { HashRouter } from 'react-router-dom';
import { ReactNode } from 'react';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <RecipesApiProvider>
      <HashRouter>{children}</HashRouter>
    </RecipesApiProvider>
  );
};
