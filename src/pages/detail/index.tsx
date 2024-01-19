import { useRecipesApi } from '../../providers/recipes-api-provider';
import styles from './detail.module.css';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useQuery } from '@tanstack/react-query';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const api = useRecipesApi();
  const { data: detail, isLoading } = useQuery({
    queryKey: [id],
    queryFn: ({ queryKey, signal }) => {
      const [key] = queryKey;
      return api.getRecipeInformation({ id: Number(key) }, { signal });
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!detail) {
    return <p>Failed to fetch</p>;
  }

  return (
    <div data-testid="detail" className={styles.detail}>
      <img src={detail.image} />
      {/* TODO fix dangerously set html */}
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detail.summary) }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(detail.instructions),
        }}
      />
    </div>
  );
};

export default Detail;
