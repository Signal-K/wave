import type { FC } from 'react';
import slugify from 'slugify';
import { getMediumPosts } from '../../utils/medium';
import { getDevPosts } from '../../utils/dev';
import Layout from '../../components/layout';
import List from '../../components/list';
import type { GetStaticProps } from 'next';

type WritingProps = {
  mediumPosts: MediumPost[];
  devPosts: DevPost[];
};

const Writing: FC<WritingProps> = ({ mediumPosts, devPosts }) => {
  const items = [
    ...mediumPosts.map((post) => ({
      name: post.title,
      description: post.description,
      url: `/writing/${slugify(post.title, { lower: true, strict: true })}`,
      caption: 'Medium',
      date: post.date,
    })),
    ...devPosts.map((post) => ({
      name: post.title,
      description: post.description,
      url: `/writing/${slugify(post.title, { lower: true, strict: true })}`,
      caption: 'dev.to',
      date: post.date,
    })),
  ].sort((postA, postB) => postB.date > postA.date ? 1 : -1);

  return (
    <Layout>
      <List title="Writing" items={items} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mediumPosts = await getMediumPosts();
  const devPosts = await getDevPosts();

  return {
    props: {
      mediumPosts,
      devPosts,
    },
  };
}

export default Writing;