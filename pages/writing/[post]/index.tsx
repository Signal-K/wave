import type { FC } from 'react';
import slugify from 'slugify';
import { getMediumPosts } from '../../../utils/medium';
import { getDevPosts } from '../../../utils/dev';
import Layout from '../../../components/layout';
import List from '../../../components/list';
import Tags from '../../../components/tags';
import type { GetStaticProps, GetStaticPaths } from 'next';
import Content from '../../../components/content';
import styles from './post.module.css';
import { Clock, MessageSquare, Smile } from 'react-feather';

type PostProps = {
  mediumPosts: MediumPost[];
  devPosts: DevPost[];
  post: MediumPost | DevPost;
};

const Post: FC<PostProps> = ({ mediumPosts, devPosts, post }) => {
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
      <Content>
        <h1>{post.title}</h1>
        {post.tags && (
          <Tags tags={post.tags} />
        )}
        <div className={styles.metrics}>
          {!!post.comments && (
            <div className={styles.metric}>
              <MessageSquare width={16} height={16} />
              <span>{post.comments} comments</span>
            </div>
          )}
          {!!post.reactions && (
              <div className={styles.metric}>
              <Smile width={16} height={16} />
              <span>{post.reactions} reactions</span>
            </div>
          )}
          {!!post.duration && (
              <div className={styles.metric}>
              <Clock width={16} height={16} />
              <span>{post.duration} duration</span>
            </div>
          )}
        </div>
        {post.content && (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
      </Content>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const mediumPosts = await getMediumPosts();
  const devPosts = await getDevPosts();
  const post = [...mediumPosts, ...devPosts].find(({ title }) => slugify(title, { lower: true, strict: true }) === params?.post);

  return {
    props: {
      mediumPosts,
      devPosts,
      post,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const mediumPosts = await getMediumPosts();
  const devPosts = await getDevPosts();
  
  const paths = [...mediumPosts, ...devPosts].map(({ title }) => ({
    params: { post: slugify(title, { lower: true, strict: true }) }
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;