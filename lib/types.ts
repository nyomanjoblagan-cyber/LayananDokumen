import { ReactNode } from 'react';

export type BlogPost = {
  title: string;
  category: string;
  date?: string;
  imageUrl?: string;
  excerpt?: string;
  toolLink: string;
  toolText?: string;
  slug: string;
  content: ReactNode | string;
  readingTime?: string;
  tags?: string[];
};
