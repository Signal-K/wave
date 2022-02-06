import type { FC } from 'react';
import { getRepos } from '../../utils/github';
import Layout from '../../components/layout';
import List from '../../components/list';
import { parseISO, format } from 'date-fns';
import type { GetStaticProps } from 'next';

type RepositoriesProps = {
  repos: any[];
};

const Repositories: FC<RepositoriesProps> = ({ repos }) => {
  const items = repos.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    url: `/repositories/${repo.name}`,
    caption: `Last updated ${format(parseISO(repo.updated_at), 'MMMM d, yyyy')}`,
  }));

  return (
    <Layout>
      <List title="Repositories" items={items} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const repos = await getRepos();

  return {
    props: {
      repos,
    },
  };
}

export default Repositories;