import { parseISO, format } from "date-fns";

const cachedDevPosts: DevPost[] = [];

export async function getDevPosts() {
  if (cachedDevPosts.length) {
    return cachedDevPosts;
  }

  const response = await fetch(
    "https://dev.to/api/articles?username=haydenbleasel"
  );
  const items: SourceDevPost[] = await response.json();

  const contentPromise = await Promise.all(
    items.map(async (item) => {
      const response = await fetch(`https://dev.to/api/articles/${item.id}`);

      const data = await response.json();

      return {
        id: item.id,
        content: data.body_html
      };
    })
  );

  const content = await contentPromise;

  const posts: DevPost[] = items.map(
    ({ id,
      title,
      description,
      published_timestamp,
      social_image,
      url,
      comments_count,
      public_reactions_count,
      reading_time_minutes,
      tag_list,
    }) => ({
      id: `${id}`,
      title,
      description,
      caption: format(parseISO(published_timestamp), "MMMM d, yyyy"),
      image: social_image,
      link: url,
      date: published_timestamp,
      comments: comments_count,
      reactions: public_reactions_count,
      duration: reading_time_minutes,
      tags: tag_list,
      content: content.find((item) => item.id === id)?.content,
    })
  );

  cachedDevPosts.push(...posts);

  return posts;
}