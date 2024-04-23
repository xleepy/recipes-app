import type { ReactNode } from 'react';
import styles from './detail-cell.module.css';

type DetailCellProps = {
  children: ReactNode;
  className?: string;
};

export const DetailCell = ({ children, className = '' }: DetailCellProps) => {
  return (
    <div className={`flex-1 ${styles.detailCell} ${className} `}>
      {children}
    </div>
  );
};
