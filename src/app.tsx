import Router from 'preact-router';
import { Detail } from './components/detail';
import { Home } from './components/home';
import { AppProvider } from './app-context';

export function App() {
  return (
    <AppProvider>
      <Router>
        <Home path={`${import.meta.env.BASE_URL}`} />
        <Detail path={`${import.meta.env.BASE_URL}detail/:name`} />
      </Router>
    </AppProvider>
  );
}
