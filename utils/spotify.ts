import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const cachedPlaylists: SpotifyPlaylist[] = [];

type ArtistProps = {
  name: string;
  count: number;
};

async function fetchPlaylist(id: string) {
  const { body } = await spotifyApi.getPlaylistTracks(id);
  let duration = 0;
  const sortedArtists: ArtistProps[] = [];

  const allArtists = body.items.map(({ track }) => {
    duration += track.duration_ms;
    const artistsArray = track.artists.map(({ name }) => name.split(","));

    return artistsArray.flat();
  }).flat();

  allArtists.forEach((artist) => {
    const currentArtist = sortedArtists.findIndex(({ name }) => name === artist);

    if (currentArtist === -1) {
      sortedArtists.push({
        name: artist,
        count: 1,
      });
    } else {
      sortedArtists[currentArtist].count += 1;
    }
  });

  sortedArtists.sort((a: ArtistProps, b: ArtistProps) => b.count > a.count ? 1 : -1);
  const artistsMap = sortedArtists.map(({ name }) => name).slice(0, 8);
  const artists = `${artistsMap.slice(0, -1).join(", ")} and ${artistsMap.slice(-1)}`;

  const tracks = body.items.filter(({ is_local }) => !is_local).map(({ added_at, track }) => ({
    added_at: added_at,
    name: track.name,
    album: track.album.name,
    id: track.id,
    preview: track.preview_url,
    image: track.album.images[0].url,
    artist: track.artists.map(({ name }) => name).join(", "),
    urls: {
      web: track.external_urls.spotify,
      app: track.uri,
    },
  }));

  return {
    id,
    duration,
    artists,
    tracks,
  };
}

export async function getPlaylists() {

  if (cachedPlaylists.length) {
    return cachedPlaylists;
  }

  const grant = await spotifyApi.clientCredentialsGrant();

  spotifyApi.setAccessToken(grant.body.access_token);

  const { body } = await spotifyApi.getUserPlaylists("haydenbleasel");
  const ids = body.items.map(({ id }) => id);

  const playlistData = await Promise.all(
    ids.map(fetchPlaylist)
  );

  const playlists: SpotifyPlaylist[] = body.items.map(
    ({ external_urls, id, images, name }) => {
      const data: any = playlistData.find((playlist) => playlist.id === id);

      return {
        id,
        name,
        url: external_urls.spotify,
        image: images[0].url,
        duration: data.duration,
        artists: data.artists,
        tracks: data.tracks,
      };
    }
  );

  cachedPlaylists.push(...playlists);

  return playlists;
}