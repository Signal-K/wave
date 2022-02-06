import type { FC } from 'react';
import { Code, Eye, GitBranch, Star, Users } from 'react-feather';
import { parseISO, format } from 'date-fns';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { getRepos } from '../../../utils/github';
import Layout from '../../../components/layout';
import List from '../../../components/list';
import { getRepo } from '../../../utils/github';
import Content from '../../../components/content';
import Button from '../../../components/button';
import Tags from '../../../components/tags';
import styles from './repo.module.css';
import Link from '../../../components/link';

type RepositoryProps = {
  repos: any[];
  repo: any;
};

const Repositories: FC<RepositoryProps> = ({ repos, repo }) => {
  const items = repos.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    url: `/repositories/${repo.name}`,
    caption: `Last updated ${format(parseISO(repo.updated_at), 'MMMM d, yyyy')}`,
  }));

  return (
    <Layout>
      <List title="Repositories" items={items} />
      <Content>
        <h1>{repo.name}</h1>
        {!!repo.source && (
          <p className={styles.source}>└ Forked from {repo.source.full_name}</p>
        )}
        
        <Tags tags={repo.topics} />
        
        <p>{repo.description}</p>
        <p>Last updated {format(parseISO(repo.updated_at), 'MMMM d, yyyy')}</p>
        
        <div className={styles.metrics}>
          <div className={styles.metric}>
            <GitBranch width={16} height={16} />
            <span>{repo.forks_count} forks</span>
          </div>
          <div className={styles.metric}>
            <Star width={16} height={16} />
            <span>{repo.stargazers_count} stars</span>
          </div>
          <div className={styles.metric}>
            <Users width={16} height={16} />
            <span>{repo.subscribers_count} stars</span>
          </div>
          <div className={styles.metric}>
            <Eye width={16} height={16} />
            <span>{repo.watchers_count} watchers</span>
          </div>
          <div className={styles.metric}>
            <Code width={16} height={16} />
            <span>Written in {repo.language}</span>
          </div>
        </div>

        <Button href={repo.html_url}>View on GitHub</Button>

        <section>
          <h2>Commits</h2>
          <div className={styles.commits}>
            {repo.activity.map((commit: any) => (
              <Link href={commit.html_url} className={styles.commit} key={commit.sha}>
                <div className={styles.meta}>
                  <p className={styles.message}>{commit.commit.message}</p>
                  <p className={styles.sha}>{commit.sha}</p>
                </div>
                <p className={styles.date}>{format(parseISO(commit.commit.author.date), 'MMMM d, yyyy')}</p>
              </Link>
            ))}
          </div>
        </section>
      </Content>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const repos = await getRepos();
  const repo = await getRepo(params?.repo as string);

  return {
    props: {
      repos,
      repo,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repos = await getRepos();

  const paths = repos.map(({ name }) => ({
    params: { repo: name }
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Repositories;