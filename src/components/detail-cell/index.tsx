import { ComponentChildren } from 'preact';
import styles from './detail-cell.module.css';

type DetailCellProps = {
  children: ComponentChildren;
  className?: string;
};

export const DetailCell = ({ children, className = '' }: DetailCellProps) => {
  return (
    <div className={`flex-1 ${styles.detailCell} ${className} `}>
      {children}
    </div>
  );
};
