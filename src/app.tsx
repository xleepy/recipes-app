import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { AppProviders } from './providers/app-providers';
import { lazy } from 'react';

const Detail = lazy(() => import('./pages/detail'));

export function App() {
  return (
    <AppProviders>
      <Routes>
        <Route element={<Home />} index />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </AppProviders>
  );
}
