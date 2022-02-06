import * as Figma from 'figma-api';

export async function getFigmaCommunityFiles() {
  const api = new Figma.Api({
    personalAccessToken: process.env.FIGMA_API_TOKEN!,
  });

  const { files } = await api.getProjectFiles(process.env.FIGMA_PROJECT_ID!);

  return files;
}