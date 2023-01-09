import Router from 'preact-router';
import { Detail } from './components/detail';
import { Home } from './components/home';
import { AppProvider } from './app-context';

export function App() {
  return (
    <AppProvider>
      <Router>
        <Home path="/" />
        <Detail path="/detail/:name" />
      </Router>
    </AppProvider>
  );
}
