import Router from 'preact-router';
import { Detail } from './pages/detail';
import { Home } from './pages/home';
import { RecipesApiProvider } from './providers/recipes-api-provider';

export function App() {
  return (
    <RecipesApiProvider>
      <Router>
        <Home path={`${import.meta.env.BASE_URL}`} />
        <Detail path={`${import.meta.env.BASE_URL}/detail/:id`} />
      </Router>
    </RecipesApiProvider>
  );
}
