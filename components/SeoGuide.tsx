import React from 'react';
import { Info, BookOpen, CheckCircle } from 'lucide-react';
import RelatedTemplates from './RelatedTemplates';

interface SeoGuideProps {
  slug: string;
  data: {
    title: string;
    description: string;
    seoGuide: string;
  };
}

export default function SeoGuide({ slug, data }: SeoGuideProps) {
  if (!data) return null;

  return (
    <div className="no-print max-w-4xl mx-auto mt-12 mb-20 px-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <BookOpen className="text-emerald-600" />
          Panduan: {data.title}
        </h2>
        
        <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600">
          <p>{data.seoGuide}</p>
          
          <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
              <Info size={16} className="text-blue-500" />
              Keunggulan Cetak Dokumen di LayananDokumen.com
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-1 shrink-0" />
                <span><strong>Otomatis & Cepat:</strong> Tidak perlu repot mengatur spasi, margin, atau *font* di Microsoft Word. Cukup isi form, dan sistem kami meraciknya secara presisi.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-1 shrink-0" />
                <span><strong>Format Resmi (A4):</strong> Layout dokumen didesain sesuai dengan standar dokumen administrasi formal di Indonesia.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-1 shrink-0" />
                <span><strong>Privasi Aman:</strong> Seluruh data yang Anda ketik diproses langsung di perangkat Anda (*browser*), tidak disimpan di *database* kami.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Jaring Laba-laba SEO / Internal Linking */}
        <RelatedTemplates currentSlug={slug} />
      </div>
    </div>
  );
}
