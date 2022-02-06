import type { FC } from 'react';
import styles from './content.module.css';

const Content: FC = ({ children }) => {
  return (
    <div className={styles.content}>
      <div className={styles.contentInner}>{children}</div>
    </div>
  );
}

export default Content;