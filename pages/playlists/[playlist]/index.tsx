import { useState } from 'react';
import type { FC } from 'react';
import slugify from 'slugify';
import { getPlaylists } from '../../../utils/spotify';
import Layout from '../../../components/layout';
import List from '../../../components/list';
import Image from 'next/image';
import type { GetStaticProps, GetStaticPaths } from 'next';
import Content from '../../../components/content';
import Button from '../../../components/button';
import Link from '../../../components/link';
import styles from './playlist.module.css';

type PlaylistProps = {
  playlists: SpotifyPlaylist[];
  playlist: SpotifyPlaylist;
};

const Playlist: FC<PlaylistProps> = ({ playlists, playlist }) => {
  const items = playlists.map((p) => ({
    name: p.name,
    description: p.artists,
    image: p.image,
    url: `/playlists/${slugify(p.name, { lower: true, strict: true })}`,
  }));
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [fadeIn, setFadeIn] = useState<NodeJS.Timer | null>(null);
  const [fadeOut, setFadeOut] = useState<NodeJS.Timer | null>(null);

  function play(preview: string) {
    if (audio || !preview) return;

    const newAudio = new Audio(preview);
    newAudio.volume = 0;
    newAudio.play();

    setFadeIn(
      setInterval(() => {
        if (newAudio.volume < 1) {
          newAudio.volume = +(newAudio.volume + 0.05).toFixed(2);
        }
        else if (fadeIn) {
          clearInterval(fadeIn);
        }
      }, 100)
    );

    setAudio(newAudio);
  }

  function pause() {

    if (!audio) return;

    const originalVolume = audio.volume;

    setAudio(null);

    if (fadeIn) {
      clearInterval(fadeIn);
    }

    setFadeOut(
      setInterval(() => {
        if (audio.volume > 0) {
          audio.volume = +(audio.volume - 0.05).toFixed(2);
        }
        else if (fadeOut) {
          clearInterval(fadeOut);
        }
      }, 100)
    );

    setTimeout(() => {
      audio.pause();
    }, originalVolume / 0.05 * 100);
  }

  return (
    <Layout>
      <List title="Playlists" items={items} />
      <Content>
        <Image src={playlist.image} alt={playlist.name} width={320} height={320} />
        <h1>{playlist.name}</h1>
        <p>Featuring {playlist.artists}</p>
        <p>{playlist.tracks.length} tracks · {(playlist.duration / 3600000).toFixed(1)} hours</p>
        <Button href={playlist.url}>Open in Spotify</Button>

        <section>
          <h2>Tracks</h2>
          <div className={styles.tracks}>
            {playlist.tracks.sort((a, b) => b.added_at < a.added_at ? 1 : -1).map((track) => (
              <Link href={track.urls.web} className={`${styles.track} ${audio?.src === track.preview ? styles.current : ''}`} key={track.id} onMouseOver={() => play(track.preview)} onMouseLeave={pause}>
                <div className={styles.meta}>
                  <div className={styles.image}>
                    <Image src={track.image} alt={track.name} width={48} height={48} />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.name}>{track.name}</p>
                    <p className={styles.album}>{track.artist} · {track.album}</p>
                  </div>
                </div>
                <div className={styles.arrow}>&rarr;</div>
              </Link>
            ))}
          </div>
        </section>
      </Content>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const playlists = await getPlaylists();
  const playlist = playlists.find((playlist) => slugify(playlist.name, { lower: true, strict: true }) === params?.playlist as string);

  return {
    props: {
      playlists,
      playlist,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const playlists = await getPlaylists();

  const paths = playlists.map(({ name }) => ({
    params: { playlist: slugify(name, { lower: true, strict: true }) }
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Playlist;