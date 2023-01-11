import Router from 'preact-router';
import { Detail } from './components/detail';
import { Home } from './components/home';
import { AppProvider } from './app-context';
import { getCorrectBasePath } from './utils';

export function App() {
  return (
    <AppProvider>
      <Router>
        <Home path={`${import.meta.env.BASE_URL}`} />
        <Detail path={getCorrectBasePath(`detail/:name`)} />
      </Router>
    </AppProvider>
  );
}
