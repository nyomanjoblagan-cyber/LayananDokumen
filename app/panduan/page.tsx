'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  ArrowLeft, BookOpen, ChevronRight, FileText, 
  ShieldCheck, Search
} from 'lucide-react';
// Import data dari file pusat
import { getAllArticles } from '@/lib/blogData';

export default function BlogIndexPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Ambil data dari library
  const ARTICLES = getAllArticles();

  // Logic Filter & Search
  const filteredArticles = ARTICLES.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Semua', ...Array.from(new Set(ARTICLES.map(a => a.category)))];

  return (
    <main className="min-h-screen font-sans text-slate-900 bg-[#f8fafc]">
      <style jsx global>{` html { scroll-behavior: smooth !important; } `}</style>

      {/* BACKGROUND GRAPHICS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-slate-100 group-hover:bg-emerald-100 text-slate-500 group-hover:text-emerald-600 p-1.5 rounded-lg transition-colors">
                <ArrowLeft size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900 leading-none">Kembali ke Alat</h1>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Beranda Utama</p>
              </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
              <BookOpen size={14} />
              <span>Pusat Panduan Dokumen</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-12 pb-6 px-6 text-center">
         <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
               Panduan <span className="text-emerald-600">Dokumen</span> <br/> 
               Lengkap & Praktis.
            </h1>
            <p className="text-slate-600 text-sm md:text-lg max-w-xl mx-auto">
               Cari tahu prosedur birokrasi, cara buat surat, dan tips legalitas dalam satu tempat.
            </p>

            {/* SEARCH */}
            <div className="max-w-md mx-auto mt-8 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative flex items-center bg-white rounded-xl border border-slate-200 shadow-sm p-1.5">
                   <Search className="text-slate-400 ml-3" size={20}/>
                   <input 
                      type="text" 
                      placeholder="Cari panduan (misal: waris, kpr, cv)..." 
                      className="w-full p-2 outline-none text-sm font-medium bg-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
            </div>
         </div>
      </section>

      {/* CATEGORY FILTER */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max md:justify-center">
            {categories.map((cat) => (
               <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg border transition-all ${
                     selectedCategory === cat 
                     ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                     : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-500 hover:text-emerald-600'
                  }`}
               >
                  {cat}
               </button>
            ))}
          </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
         {filteredArticles.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map((art, idx) => (
                 <article key={idx} className="group bg-white rounded-2xl border border-slate-200 p-5 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-4">
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-tighter border border-emerald-100">
                           {art.category}
                        </span>
                        <Link href={`/panduan/${art.slug}`}>
                           <h2 className="text-base font-bold text-slate-900 mt-3 group-hover:text-emerald-600 leading-snug line-clamp-2 cursor-pointer">
                              {art.title}
                           </h2>
                        </Link>
                        <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                           {art.excerpt}
                        </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                        <Link href={`/panduan/${art.slug}`} className="text-[10px] font-black text-slate-400 group-hover:text-slate-900 flex items-center gap-1 uppercase tracking-widest">
                           Baca <ChevronRight size={14}/>
                        </Link>
                        <Link href={art.toolLink} className="bg-slate-100 text-slate-700 text-[9px] font-black px-3 py-1.5 rounded-md hover:bg-emerald-600 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1.5">
                           <FileText size={12}/> Buat Surat
                        </Link>
                    </div>
                 </article>
              ))}
           </div>
         ) : (
           <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">Data tidak ditemukan.</p>
              <button onClick={() => {setSearchTerm(''); setSelectedCategory('Semua')}} className="text-emerald-600 text-sm font-bold mt-2 hover:underline">Reset</button>
           </div>
         )}
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-200 bg-white py-12">
          <div className="max-w-5xl mx-auto px-6">
             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 text-slate-900 font-black">
                   <ShieldCheck size={20} className="text-emerald-600" /> 
                   <span className="tracking-tighter">LAYANANDOKUMEN.COM</span>
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                   &copy; 2026 Seluruh Hak Cipta Dilindungi.
                </p>
                <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase">
                   <Link href="/privacy" className="hover:text-emerald-600">Privacy</Link>
                   <Link href="/terms" className="hover:text-emerald-600">Terms</Link>
                </div>
             </div>
          </div>
      </footer>
    </main>
  );
}