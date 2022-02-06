import { useRouter } from 'next/router';
import Image from 'next/image';
import { FC, useRef } from 'react';
import Link from '../link';
import styles from './list.module.css';
import { useScroll } from 'react-use';

type ListProps = {
  items: {
    name: string;
    description: string;
    image?: string;
    url: string;
    caption?: string;
  }[];
  title: string;
}

const List: FC<ListProps> = ({ title, items, children }) => {
  const nav = useRef<HTMLDivElement>(null);
  const { asPath } = useRouter();
  const { y } = useScroll(nav);
  const maxY = Math.max(0, Math.min(12, y));

  return (
    <div className={styles.list}>
      <nav className={styles.nav} ref={nav}>
        <header className={styles.header} style={{ boxShadow: `rgb(0 0 0 / ${maxY}%) 0px 1px 3px` }}>
          {title}
        </header>
        <ul className={styles.navList}>
          {items.map(({ name, url, description, image, caption }) => (
            <li key={name} className={styles.navItem}>
              <Link href={url} className={`${styles.navLink} ${asPath === url ? styles.current : ''}`}>
                {!!image && (
                  <span className={styles.image}>
                    <Image objectFit="cover" src={image} alt={name} width={48} height={48} quality={100} />
                  </span>
                )}
                <span>
                  <span className={styles.name}>{name}</span>
                  <span className={styles.description}>{description}</span>
                  {!!caption && (
                    <span className={styles.caption}>{caption}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default List;