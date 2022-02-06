import type { FC } from 'react';
import { getFigmaCommunityFiles } from '../../utils/figma';
import Layout from '../../components/layout';
import List from '../../components/list';
import type { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';

type DesignAssetsProps = {
  files: SourceFigmaFile[];
};

const DesignAssetss: FC<DesignAssetsProps> = ({ files }) => {
  const items = files.map((file) => ({
    name: `${file.name} ↗`,
    description: `Last updated ${format(parseISO(file.last_modified), 'MMMM d, yyyy')}`,
    url: 'https://www.figma.com/@haydenbleasel'
  }));

  return (
    <Layout>
      <List title="Figma Community Files" items={items} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = await getFigmaCommunityFiles();

  return {
    props: {
      files,
    },
  };
}

export default DesignAssetss;