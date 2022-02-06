import { LinkProps } from 'next/link';
import type { FC } from 'react';
import Link from "../link"
import styles from './button.module.css';

const Button: FC<LinkProps & { href: string; }> = (props) => (
  <Link className={styles.button} {...props} />
);

export default Button;