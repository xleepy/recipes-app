import { HashRouter, Route, Routes } from 'react-router-dom';
import { Detail } from './pages/detail';
import { Home } from './pages/home';
import { RecipesApiProvider } from './providers/recipes-api-provider';

export function App() {
  return (
    <RecipesApiProvider>
      <HashRouter>
        <Routes>
          <Route element={<Home />} index />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </HashRouter>
    </RecipesApiProvider>
  );
}
