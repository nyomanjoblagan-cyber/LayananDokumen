import { BlogPost } from './types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function normalizeArticle(raw: any): BlogPost {
  const contentText =
    typeof raw.content === 'string'
      ? raw.content.replace(/<[^>]+>/g, '')
      : '';

  const wordCount = contentText.split(/\s+/).filter(Boolean).length;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} Menit Baca`;

  return {
    title: raw.title ?? 'Tanpa Judul',
    category: raw.category ?? 'Umum',
    date: raw.date ?? '',
    imageUrl: raw.imageUrl ?? '',
    excerpt: raw.excerpt ?? '',
    toolLink: raw.toolLink ?? '#',
    toolText: raw.toolText ?? 'BUAT SURAT',
    content: raw.content ?? '',
    slug: raw.slug ? raw.slug : slugify(raw.title ?? 'artikel'),
    readingTime,
    tags: raw.tags ?? [],
  };
}
