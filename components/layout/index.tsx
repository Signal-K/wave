import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import Link from '../link';
import styles from './layout.module.css';
import { BookOpen, Circle, Dribbble, Code, Figma, GitHub, GitPullRequest, Headphones, Instagram, Linkedin, Twitter } from 'react-feather';
import React from 'react';
import { useScroll } from 'react-use';

const routes = [
  {
    category: 'Content',
    items: [
      {
        name: 'Playlists',
        href: '/playlists',
        Icon: Headphones,
        beta: false,
      },
      {
        name: 'Writing',
        href: '/writing',
        Icon: BookOpen,
        beta: false,
      },
      {
        name: 'Repositories',
        href: '/repositories',
        Icon: GitPullRequest,
        beta: false,
      },
      {
        name: 'Games',
        href: '/games',
        Icon: Circle,
        beta: false,
      },
      {
        name: 'Design Assets',
        href: '/design-assets',
        Icon: Figma,
        beta: true,
      },
    ]
  },
  {
    category: 'Apps',
    items: [
      {
        name: 'Neutral',
        href: "https://neutral.sh/",
        Icon: Circle,
        beta: false,
      },
    ],
  },
  {
    category: 'Social',
    items: [
      {
        name: 'Twitter',
        href: "https://twitter.com/haydenbleasel",
        Icon: Twitter,
        beta: false,
      },
      {
        name: 'Dribbble',
        href: "https://dribbble.com/haydenbleasel",
        Icon: Dribbble,
        beta: false,
      },
      {
        name: 'Instagram',
        href: "https://www.instagram.com/hayden.bleasel/",
        Icon: Instagram,
        beta: false,
      },
      {
        name: 'GitHub',
        href: "https://github.com/haydenbleasel/",
        Icon: GitHub,
        beta: false,
      },
      {
        name: 'LinkedIn',
        href: "https://www.linkedin.com/in/haydenbleasel",
        Icon: Linkedin,
        beta: false,
      },
      {
        name: 'ProductHunt',
        href: "https://www.producthunt.com/@haydenbleasel",
        Icon: Circle,
        beta: false,
      },
      {
        name: 'Spotify',
        href: "https://open.spotify.com/user/haydenbleasel",
        Icon: Circle,
        beta: false,
      },
      {
        name: 'Dev.to',
        href: "https://dev.to/haydenbleasel",
        Icon: Circle,
        beta: false,
      },
      {
        name: 'Figma',
        href: "https://www.figma.com/@haydenbleasel",
        Icon: Figma,
        beta: false,
      },
      {
        name: 'Medium',
        href: "https://haydenbleasel.medium.com/",
        Icon: Circle,
        beta: false,
      },
    ]
  }
]

const Layout: FC = ({ children }) => {
  const { asPath } = useRouter();
  const nav = useRef<HTMLDivElement>(null);
  const { y } = useScroll(nav);
  const maxY = Math.max(0, Math.min(12, y));

  return (
    <div className={styles.layout}>
      <nav className={styles.nav} ref={nav}>
        <header className={styles.header} style={{ boxShadow: `rgb(0 0 0 / ${maxY}%) 0px 1px 3px` }}>
          <Link className={styles.headerLink} href="/">
            <span>HaydOS</span>
            <span className={styles.beta}>Beta</span>
          </Link>
        </header>
        <ul className={styles.navList}>
          {routes.map(({ category, items }) => (
            <li key={category} className={styles.navLabel}>
              <span className={styles.category}>{category}</span>
              <ul className={styles.itemsList}>
                {items.map(({ name, href, Icon, beta }) => (
                  <li key={href} className={styles.navItem}>
                    <Link href={href} className={`${styles.navLink} ${asPath.includes(href) ? styles.current : ''}`}>
                      <span className={styles.navMeta}>
                        <Icon width={16} height={16} />
                        <span className={styles.navLinkName}>{name}</span>
                      </span>
                      <div>
                        {beta && (
                          <span className={styles.beta}>
                            Beta
                          </span>
                        )}
                        {!href.startsWith("/") && (
                          <span className={styles.navArrow}>↗</span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <footer className={styles.footer}>
          <Link className={styles.navLink} href="https://github.com/haydenbleasel/haydos">
            <span className={styles.navMeta}>
              <Code width={16} height={16} />
              <span className={styles.navLinkName}>Source Code</span>
            </span>
            <span className={styles.navArrow}>↗</span>
          </Link>
        </footer>
      </nav>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;