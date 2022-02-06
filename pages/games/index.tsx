import type { FC } from 'react';
import slugify from 'slugify';
import Layout from '../../components/layout';
import List from '../../components/list';
import type { GetStaticProps } from 'next';
import { getGames } from '../../utils/steam';
import SteamAPI from 'steamapi';

type GamesProps = {
  games: SteamAPI.Game[];
};

const Games: FC<GamesProps> = ({ games }) => {
  const items = games.filter(({ playTime }) => (
    Boolean(playTime)
  )).map((game) => {
    const duration = game.playTime < 60 ? `${game.playTime} min` : `${Math.floor(game.playTime / 60)} hours`;

    return {
      name: game.name,
      description: `Played for ${duration}`,
      image: game.iconURL,
      url: `/games/${slugify(game.name, { lower: true, strict: true })}`,
    };
  });

  return (
    <Layout>
      <List title="Games" items={items} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const games = await getGames();

  return {
    props: {
      games,
    },
  };
}

export default Games;