import { normalizeArticle } from './blogNormalizer';
import { BlogPost } from './types';

/**
 * DATA MENTAH
 * Jangan dikasih type ribet
 */
const RAW_ARTICLES: any[] = [
  // <<< ISI DATA KAMU DI SINI (YANG 20RB BARIS ITU) >>>
];

export function getAllArticles(): BlogPost[] {
  return RAW_ARTICLES
    .map((a) => normalizeArticle(a))
    .filter((a) => a.slug && a.title);
}

export function getArticleBySlug(slug: string): BlogPost | null {
  const found = RAW_ARTICLES.find((a) => {
    const s = a.slug ? a.slug : '';
    return s === slug;
  });

  return found ? normalizeArticle(found) : null;
}
