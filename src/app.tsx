import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { RecipesApiProvider } from './providers/recipes-api-provider';
import { Suspense, lazy } from 'preact/compat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Detail = lazy(() => import('./pages/detail'));
const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipesApiProvider>
        <HashRouter>
          <Routes>
            <Route element={<Home />} index />
            <Route
              path="/detail/:id"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <Detail />
                </Suspense>
              }
            />
          </Routes>
        </HashRouter>
      </RecipesApiProvider>
    </QueryClientProvider>
  );
}
