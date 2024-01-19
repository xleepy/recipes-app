import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentChildren } from 'preact';
import { RecipesApiProvider } from './recipes-api-provider';
import { HashRouter } from 'react-router-dom';

type AppProvidersProps = {
  children: ComponentChildren;
};

const queryClient = new QueryClient();

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipesApiProvider>
        <HashRouter>{children}</HashRouter>
      </RecipesApiProvider>
    </QueryClientProvider>
  );
};
