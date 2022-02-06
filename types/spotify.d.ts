interface SpotifyPlaylist {
  id: string;
  name: string;
  url: string;
  image: string;
  tracks: {
    added_at: string,
    name: string,
    album: string,
    id: string,
    image: string;
    preview: string;
    artist: string;
    urls: {
      web: string,
      app: string,
    },
  }[];
  duration: number;
  artists: string;
};