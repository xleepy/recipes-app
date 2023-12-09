import { RoutableProps } from 'preact-router';
import { useState } from 'preact/hooks';
import { Search } from '../../components/search';
import styles from './home.module.css';
import { useDebounce } from '../../hooks';
import { Card } from '../../components/card';
import { useRecipesApi } from '../../providers/recipes-api-provider';
import { SearchRecipes200ResponseResultsInner } from '../../api';

export const Home = (props: RoutableProps) => {
  const [recipes, setRecipes] = useState<
    SearchRecipes200ResponseResultsInner[]
  >([]);

  const api = useRecipesApi();

  const searchForRecipes = useDebounce(
    (query) => {
      api.searchRecipes({ query, number: 100 }).then(({ results }) => {
        setRecipes(Array.from(results));
      });
    },
    200,
    [api]
  );

  return (
    <div className={styles.homeContainer}>
      <Search onValueChange={searchForRecipes} />
      <ul className={styles.cardContainer}>
        {recipes.map(({ id, image, title }) => {
          return <Card key={id} id={id} image={image} title={title} />;
        })}
      </ul>
    </div>
  );
};
