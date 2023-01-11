import { RoutableProps } from 'preact-router';
import { useSelectionContext } from '../app-context';

type Props = RoutableProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Detail = (_: Props) => {
  const { recipe } = useSelectionContext();
  return (
    <div>
      {'TODO detail'}
      {JSON.stringify(recipe)}
    </div>
  );
};
