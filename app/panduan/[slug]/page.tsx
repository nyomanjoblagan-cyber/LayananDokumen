'use client';

import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
// Import fungsi data dari file pusat
import { getArticleBySlug } from '@/lib/blogData'; 
import { 
  ArrowLeft, 
  Calendar, 
  Share2, 
  ShieldCheck, 
  Tag, 
  Clock, 
  Check, 
  MessageCircle 
} from 'lucide-react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params (Next.js 15 pattern)
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  // Ambil data
  const post = getArticleBySlug(slug);

  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  // Sinkronisasi URL untuk fitur share
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Jika slug tidak ditemukan di database
  if (!post) {
    return notFound();
  }

  const handleShareWA = () => {
    const text = `*${post.title}*\n\nBaca panduan lengkapnya di sini:\n${currentUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: `Baca panduan lengkap ini: ${post.title}`,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Batal share');
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Gagal copy', err);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      <style jsx global>{`
        html { scroll-behavior: smooth !important; }
        .prose h2, .prose h3 { color: #0f172a; font-weight: 800; margin-top: 1.5em; margin-bottom: 0.5em; }
        .prose p { margin-bottom: 1em; line-height: 1.75; }
        .prose ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
        .prose li { margin-bottom: 0.5em; }
        .prose a { 
          color: #10b981; 
          font-weight: 800; 
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      `}</style>

      {/* HEADER NAVIGASI */}
      <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/panduan" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-all group">
            <div className="bg-slate-100 group-hover:bg-emerald-100 p-1.5 rounded-lg">
              <ArrowLeft size={18} />
            </div>
            <span className="text-sm font-bold">Kembali</span>
          </Link>
          <div className="text-slate-900 font-bold text-sm flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" /> 
            <span>LayananDokumen</span>
          </div>
        </div>
      </header>

      {/* BODY ARTIKEL */}
      <article className="relative z-10 max-w-3xl mx-auto px-6 pt-10">
        
        {/* HEADER INFO */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest">
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 flex items-center gap-1">
              <Tag size={12} strokeWidth={3}/> {post.category}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar size={12} strokeWidth={2.5}/> {post.date || 'Update Terbaru'}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock size={12} strokeWidth={2.5}/> 5 Menit Baca
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            {post.title}
          </h1>
        </div>

        {/* GAMBAR UTAMA */}
        {post.imageUrl && (
            <div className="relative w-full aspect-video mb-12 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
            <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
            />
            </div>
        )}

        {/* ISI KONTEN */}
        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
           {/* Jika content berupa HTML string */}
           {typeof post.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
           ) : (
              /* Jika content berupa JSX component */
              post.content
           )}
        </div>

        {/* KOTAK CTA (CALL TO ACTION) */}
        <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
          
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl font-black text-white mb-2">Butuh Dokumen Ini?</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Gunakan generator otomatis kami untuk hasil instan dan profesional.
            </p>
          </div>
          
          <Link 
            href={post.toolLink} 
            className="relative z-10 bg-emerald-500 text-white font-black text-sm px-8 py-4 rounded-2xl hover:bg-emerald-400 transition-all shadow-lg active:scale-95"
          >
            {post.toolText || "BUAT SEKARANG"}
          </Link>
        </div>

        {/* BAGIAN SHARE */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Share2 size={20} className="text-slate-400" />
            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Bagikan Panduan</span>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleShareWA}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-2xl font-black text-xs hover:shadow-lg transition-all"
            >
              <MessageCircle size={18} strokeWidth={2.5}/> WHATSAPP
            </button>

            <button 
              onClick={handleShare}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-xs border-2 transition-all ${
                isCopied 
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                : 'bg-white text-slate-600 border-slate-100 hover:border-emerald-500 hover:text-emerald-600'
              }`}
            >
              {isCopied ? <Check size={18} strokeWidth={3}/> : <Share2 size={18} strokeWidth={2.5}/>}
              {isCopied ? 'TERSALIN' : 'SALIN LINK'}
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}