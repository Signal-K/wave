interface SourceDevPost {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id?: string;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image?: string;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string;
  crossposted_at?: string;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  user: any;
};

interface DevPost {
  id: string;
  title: string;
  link: string;
  caption: string;
  description: string;
  image: string;
  date: string;
  comments: number;
  reactions: number;
  duration: number;
  tags: string[];
  content?: string;
};