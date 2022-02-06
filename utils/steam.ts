import SteamAPI from 'steamapi';

const steam = new SteamAPI(process.env.STEAM_API_KEY!);

const cachedGames: SteamAPI.Game[] = [];

export async function getBadges() {
  const id = await steam.resolve('https://steamcommunity.com/id/haydenbleasel');
  const data = await steam.getUserBadges(id);

  return JSON.parse(JSON.stringify(data));
}

export async function getGames() {

  if (cachedGames.length) {
    return cachedGames;
  }

  const id = await steam.resolve('https://steamcommunity.com/id/haydenbleasel');
  const data = await steam.getUserOwnedGames(id);
  const parsedData: SteamAPI.Game[] = JSON.parse(JSON.stringify(data));
  const games: SteamAPI.Game[] = [];

  parsedData.map((game) => {
    const existingGame = games.findIndex((p) => p.name === game.name);
    
    if (existingGame !== -1) {
      games[existingGame].playTime += game.playTime;
      games[existingGame].playTime2 += game.playTime2;
      return;
    }

    games.push(game);
  });

  cachedGames.push(...games);

  return games.sort((a, b) => (
    b.playTime > a.playTime ? 1 : -1
  ));
}

export async function getAchievements(app: number) {
  try {
    const id = await steam.resolve('https://steamcommunity.com/id/haydenbleasel');
    const data = await steam.getUserAchievements(id, `${app}`);

    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    // console.warn(error);
    return { achievements: [] };
  }
}

export async function getStats(app: number) {
  const id = await steam.resolve('https://steamcommunity.com/id/haydenbleasel');
  const data = await steam.getUserStats(id, `${app}`);

  return JSON.parse(JSON.stringify(data));
}