import Router from 'preact-router';
import { Detail } from './pages/detail';
import { Home } from './pages/home';

export function App() {
  return (
    <Router>
      <Home path={`${import.meta.env.BASE_URL}`} />
      <Detail path={`${import.meta.env.BASE_URL}/detail/:name`} />
    </Router>
  );
}
