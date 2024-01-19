import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Suspense, lazy } from 'preact/compat';
import { AppProviders } from './providers/app-providers';

const Detail = lazy(() => import('./pages/detail'));

export function App() {
  return (
    <AppProviders>
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
    </AppProviders>
  );
}
