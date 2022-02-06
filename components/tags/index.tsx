import type { FC } from 'react';
import styles from './tags.module.css';

type TagsProps = {
  tags: string[];
}

const Tags: FC<TagsProps> = ({ tags }) => (
  <div className={styles.tags}>
    {tags.map((tag) => (
      <p className={styles.tag} key={tag}>{tag}</p>
    ))}
  </div>
);

export default Tags;