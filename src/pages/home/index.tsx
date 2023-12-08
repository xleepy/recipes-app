import { RoutableProps } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { Search } from '../../components/search';
import { fetchRecipes, Recipe } from '../../api';
import styles from './home.module.css';

export const Home = (props: RoutableProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('pasta');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchRecipes(query).then((results) => setRecipes(results as any));
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  console.log(recipes);

  return (
    <div className={styles.homeContainer}>
      <Search value={query} onValueChange={setQuery} />
      <ul className={styles.cardContainer}>
        {recipes.map((recipe, idx) => {
          return <li key={idx}>{recipe.title}</li>;
        })}
      </ul>
    </div>
  );
};
