import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getRepos() {
  const { data } = await octokit.rest.repos.listForUser({
    username: 'haydenbleasel',
    type: 'owner',
  });

  return data.sort((a: any, b: any) => b.updated_at > a.updated_at ? 1 : -1);
}

export async function getRepo(id: string) {
  const repo = await octokit.rest.repos.get({
    owner: 'haydenbleasel',
    repo: id,
  });
  const activity = await octokit.rest.repos.listCommits({
    owner: 'haydenbleasel',
    repo: id,
  })

  return {
    ...repo.data,
    activity: activity.data,
  };
}