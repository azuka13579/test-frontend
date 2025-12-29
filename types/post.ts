import { Author } from "./author";
import { Comment } from "./comment";

type Post = {
  id: string;
  title: string;
  content: string;
  likes_count: string;
  image_url: string;
  created_at: string;
  author: Author;
  comments: Comment[];
};
export type { Post };
