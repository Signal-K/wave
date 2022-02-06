import type { FC } from 'react';
import slugify from 'slugify';
import Layout from '../../../components/layout';
import List from '../../../components/list';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { getAchievements, getGames } from '../../../utils/steam';
import type { Game, PlayerAchievements, PlayerStats } from 'steamapi';
import Image from 'next/image';
import Content from '../../../components/content';
import { Clock, Star } from 'react-feather';

type GamesProps = {
  games: Game[];
  game: Game;
  achievements: PlayerAchievements;
  stats: PlayerStats;
};

const Games: FC<GamesProps> = ({ games, game, achievements }) => {
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

  const duration = game.playTime < 60 ? `${game.playTime} min` : `${Math.floor(game.playTime / 60)} hours`;

  return (
    <Layout>
      <List title="Games" items={items} />
      <Content>
        <Image src={game.logoURL} alt={game.name} width={184} height={69} />
        <h1>{game.name}</h1>
        <p><Clock width={16} height={16} /> Played for {duration}</p>
        <p><Star width={16} height={16} /> {achievements.achievements.filter(({ achieved }) => achieved).length} / {achievements.achievements.length} achievements unlocked</p>
      </Content>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const games = await getGames();
  const game = games.find((game) => (
    slugify(game.name, { lower: true, strict: true }) === params?.game
  ))!;
  const achievements = await getAchievements(game.appID);

  return {
    props: {
      games,
      game,
      achievements,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const games = await getGames();

  return {
    paths: games.map(({ name }) => ({
      params: {
        game: slugify(name, { lower: true, strict: true }),
      },
    })),
    fallback: false,
  };
}

export default Games;