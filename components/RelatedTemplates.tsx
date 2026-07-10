import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';

interface RelatedTemplatesProps {
  currentSlug: string;
}

export default function RelatedTemplates({ currentSlug }: RelatedTemplatesProps) {
  const currentTemplate = TEMPLATES[currentSlug];
  if (!currentTemplate || !currentTemplate.category) return null;

  const currentCategory = currentTemplate.category;

  // Cari template lain dengan kategori yang sama, kecualikan yang sedang dibuka
  const relatedSlugs = Object.keys(TEMPLATES)
    .filter((slug) => slug !== currentSlug && TEMPLATES[slug].category === currentCategory)
    // Acak urutannya sedikit
    .sort(() => 0.5 - Math.random())
    // Ambil maksimal 4
    .slice(0, 4);

  if (relatedSlugs.length === 0) return null;

  return (
    <div className="mt-8 border-t border-slate-200 pt-8">
      <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
        <FileText size={16} className="text-emerald-600" />
        Rekomendasi Dokumen Terkait ({currentCategory})
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {relatedSlugs.map((slug) => {
          const t = TEMPLATES[slug];
          return (
            <Link
              key={slug}
              href={`/tools/${slug}`}
              className="group flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
            >
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 truncate">
                  {t.title}
                </span>
                <span className="text-xs text-slate-500 truncate mt-0.5">
                  Generator otomatis
                </span>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-emerald-600 shrink-0 ml-3 transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
