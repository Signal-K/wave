interface SourceMediumPost {
  creator: string;
  title: string;
  link: string;
  "content:encoded": string;
  guid: string;
  isoDate: string;
  categories: string[];
};

interface MediumPost {
  id: string;
  title: string;
  link: string;
  caption: string;
  description: string;
  image: string;
  date: string;
  comments?: number;
  reactions?: number;
  duration?: number;
  tags?: string[];
  content: string;
};