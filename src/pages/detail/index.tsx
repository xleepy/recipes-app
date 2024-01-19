import { useRecipesApi } from '../../providers/recipes-api-provider';
import styles from './detail.module.css';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Chip } from '../../components/chip';
import DOMPurify from 'dompurify';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const api = useRecipesApi();
  const { data: detail, error } = useSuspenseQuery({
    queryKey: [id],
    queryFn: ({ queryKey, signal }) => {
      const [key] = queryKey;
      return api.getRecipeInformation({ id: Number(key) }, { signal });
    },
  });

  if (!detail) {
    return <p>{error}</p>;
  }

  const { title, dishTypes, vegetarian, healthScore, summary } = detail;

  console.log(detail);

  return (
    <div data-testid="detail" className={`${styles.detail} flex flex-wrap`}>
      <div className="flex-1">
        <img className={styles.image} src={detail.image} alt="recipe" />
      </div>
      <div className="flex-1 flex flex-column gap-s">
        <h2>{title}</h2>
        <div className={`flex flex-wrap flex-justify-center gap-s`}>
          {dishTypes.map((type, idx) => (
            <Chip name={type} key={idx} />
          ))}
        </div>
        {vegetarian && <Chip name="vegetarian" />}
        <div className="flex flex-wrap">
          <p>{`Health score: ${healthScore}`}</p>
        </div>
        <p
          className="text-left"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }}
        />
      </div>
    </div>
  );
};

export default Detail;
