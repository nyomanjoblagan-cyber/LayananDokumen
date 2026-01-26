'use client';

/**
 * FILE: SaweriaBox.tsx
 * DESC: Komponen Donasi Melayang untuk Saweria
 */

import { Coffee, Heart, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SaweriaBox() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Munculkan setelah 15 detik user mencoba tools (biar gak kaget)
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[100] no-print font-sans">
      {isExpanded ? (
        /* PANEL SAAT DIBUKA */
        <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 w-80 animate-in fade-in zoom-in slide-in-from-bottom-5 duration-300 relative overflow-hidden">
          {/* Aksesoris Visual */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-50 rounded-full blur-2xl opacity-60"></div>
          
          <button 
            onClick={() => setIsExpanded(false)} 
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <X size={18} />
          </button>
          
          <div className="flex flex-col items-center text-center space-y-4 relative z-10">
            <div className="bg-orange-100 p-4 rounded-2xl">
              <Coffee className="text-[#fa6400]" size={28} />
            </div>
            
            <div>
              <h3 className="font-black text-sm uppercase text-slate-800 tracking-tight flex items-center justify-center gap-2">
                Traktir Kopi? <Sparkles size={14} className="text-amber-400 fill-amber-400" />
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-2 px-1">
                Urusan beres? Yuk traktir kopi biar admin makin semangat jaga web ini tetap gratis & tanpa iklan pop-up! 🙏
              </p>
            </div>

            <a 
              href="https://saweria.co/joblagan" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#fa6400] text-white py-3 rounded-2xl text-[11px] font-black uppercase hover:bg-[#e55a00] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100 active:scale-95"
            >
              <Heart size={14} className="fill-white" />
              Dukung Lewat Saweria
            </a>
            
            <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">
              Dukungan Anda = Nyawa Server
            </p>
          </div>
        </div>
      ) : (
        /* TOMBOL KECIL (FLOATING) */
        <button 
          onClick={() => setIsExpanded(true)}
          className="bg-white border-2 border-orange-100 p-4 rounded-full shadow-2xl hover:shadow-orange-200 transition-all text-[#fa6400] active:scale-90 group relative"
        >
          <Coffee size={28} className="group-hover:rotate-12 transition-transform" />
          
          {/* Notifikasi Titik Merah */}
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border-2 border-white"></span>
          </span>

          {/* Label Melayang saat Hover */}
          <span className="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all font-black uppercase tracking-widest shadow-2xl border border-white/10">
            Traktir Kopi Admin ☕
          </span>
        </button>
      )}
    </div>
  );
}
