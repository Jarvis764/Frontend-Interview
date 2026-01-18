export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime?: string;
}

export type CreateBlogInput = Omit<Blog, 'id'>;