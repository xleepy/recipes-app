import { Suspense, useState } from 'react';
import { Search } from '../../components/search/search';
import styles from './home.module.css';
import { Card } from '../../components/card/card';
import { useRecipesApi } from '../../providers/recipes-api-provider';
import { useDebounceCallback } from '../../hooks';
import { SearchRecipes200ResponseResultsInner } from '../../api';
import { use } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const SEARCH_KEY = 'cached-search-key';

type ListProps = {
  recipesPromise: Promise<SearchRecipes200ResponseResultsInner[]>;
};

const List = ({ recipesPromise }: ListProps) => {
  const data = use(recipesPromise);
  return (
    <ul className={styles.cardContainer}>
      {data.map(({ id, image, title }) => {
        return <Card key={id} id={id} image={image} title={title} />;
      })}
    </ul>
  );
};

export const Home = () => {
  const [search, setSearch] = useState<string>(() => {
    return sessionStorage.getItem(SEARCH_KEY) ?? 'pasta';
  });

  const api = useRecipesApi();

  const queryChange = useDebounceCallback(
    (event: Event) => {
      const value = (event.target as HTMLInputElement).value.trim();
      if (value.length) {
        setSearch(value);
        sessionStorage.setItem(SEARCH_KEY, value);
      }
    },
    500,
    []
  );

  const promise = api
    .searchRecipes({ query: search, number: 100, instructionsRequired: true })
    .then(({ results }) => Array.from(results));

  return (
    <div>
      <Search value={search} onValueChange={queryChange} />
      <ErrorBoundary resetKeys={[search]} fallback={<p>Failed to fetch</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <List recipesPromise={promise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
