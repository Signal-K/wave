import Parser from "rss-parser";
import { JSDOM } from "jsdom";
import { parseISO, format } from "date-fns";

const cachedPosts: MediumPost[] = [];

export async function getMediumPosts() {

  if (cachedPosts.length) {
    return cachedPosts;
  }

  const parser = new Parser();

  const { items } = await parser.parseURL(
    "https://medium.com/feed/@haydenbleasel"
  );

  const posts: MediumPost[] = (items as SourceMediumPost[]).map((item) => {
    const content = item["content:encoded"];
    const dom = new JSDOM(content);

    return {
      id: item.guid,
      title: item.title,
      description: dom.window.document.querySelector("h4")?.textContent!,
      caption: format(parseISO(item.isoDate), "MMMM d, yyyy"),
      image: dom.window.document.querySelector("img")?.src.replace("max/1024", "max/3840")!,
      link: item.link,
      date: item.isoDate,
      tags: item.categories,
      content,
    };
  });

  cachedPosts.push(...posts);

  return posts;
}