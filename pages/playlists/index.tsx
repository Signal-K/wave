import type { FC } from 'react';
import slugify from 'slugify';
import { getPlaylists } from '../../utils/spotify';
import Layout from '../../components/layout';
import List from '../../components/list';
import type { GetStaticProps } from 'next';

type PlaylistProps = {
  playlists: SpotifyPlaylist[];
};

const Playlists: FC<PlaylistProps> = ({ playlists }) => {
  const items = playlists.map((playlist) => ({
    name: playlist.name,
    description: playlist.artists,
    image: playlist.image,
    url: `/playlists/${slugify(playlist.name, { lower: true, strict: true })}`,
  }));

  return (
    <Layout>
      <List title="Playlists" items={items} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const playlists = await getPlaylists();

  return {
    props: {
      playlists,
    },
  };
}

export default Playlists;