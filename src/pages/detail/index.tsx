import { useRecipesApi } from '../../providers/recipes-api-provider';
import styles from './detail.module.css';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Chip } from '../../components/chip';
import DOMPurify from 'dompurify';
import { DetailCell } from '../../components/detail-cell';
import { List } from '../../components/list';

type Item = {
  id: number;
  image: string;
  localizedName: string;
  name: string;
};

type Step = {
  number: number;
  step: string;
  ingredients: Item[];
  equipment: Item[];
};

type AnalyzedInstruction = {
  name: string;
  steps: Step[];
};

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

  const {
    title,
    dishTypes,
    vegetarian,
    healthScore,
    summary,
    analyzedInstructions = [],
    extendedIngredients,
  } = detail;

  const [{ steps }] = analyzedInstructions as AnalyzedInstruction[];

  const ingredients = Array.from(extendedIngredients);

  return (
    <div
      data-testid="detail"
      className={`gap-l flex flex-wrap flex-justify-center`}
    >
      <DetailCell>
        <img className={styles.image} src={detail.image} alt="recipe" />
      </DetailCell>
      <DetailCell className="flex flex-column gap-s">
        <h2>{title}</h2>
        <div className={`flex flex-wrap flex-justify-center gap-s`}>
          {dishTypes.map((type, idx) => (
            <Chip name={type} key={idx} />
          ))}
          {vegetarian && <Chip name="vegetarian" />}
        </div>
        <div className="flex flex-wrap">
          <p>{`Health score: ${healthScore}`}</p>
        </div>
        <p
          className="text-left"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }}
        />
      </DetailCell>
      <DetailCell className="text-left">
        <List title="Ingredients">
          {ingredients.map((ingredient, idx) => {
            return (
              <li
                key={`${ingredient.id}-${idx}`}
              >{`${ingredient.original}`}</li>
            );
          })}
        </List>
      </DetailCell>
      <DetailCell>
        <List as="ol" title="Steps">
          {steps.map((step) => {
            return <li key={step.number}>{step.step}</li>;
          })}
        </List>
      </DetailCell>
    </div>
  );
};

export default Detail;
