'use client';
import { Coffee, Heart, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DonationBox() {
  const [isOpen, setIsOpen] = useState(false);

  // Munculkan otomatis setelah 30 detik user pakai tools (opsional)
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-[100] no-print">
      {isOpen ? (
        <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 w-72 animate-in slide-in-from-bottom-5 duration-300">
          <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
          
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="bg-amber-100 p-3 rounded-full">
              <Coffee className="text-amber-600" size={24} />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase text-slate-800">Traktir Kopi?</h3>
              <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                Web ini gratis & tanpa iklan mengganggu. Bantu kami bayar server dengan donasi seikhlasnya.
              </p>
            </div>
            <a 
              href="https://saweria.co/usernameMas" // Ganti linknya
              target="_blank"
              className="w-full bg-slate-900 text-white py-2 rounded-xl text-xs font-bold uppercase hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Heart size={14} className="text-red-500 fill-red-500" />
              Kirim Donasi
            </a>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white border border-slate-200 p-3 rounded-full shadow-lg hover:shadow-xl transition-all text-amber-600 active:scale-95 group"
        >
          <Coffee size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity font-bold uppercase tracking-widest">
            Bantu Server
          </span>
        </button>
      )}
    </div>
  );
}
