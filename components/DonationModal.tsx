'use client';

import { X, Coffee, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  saweriaLink?: string;
}

export default function DonationModal({ isOpen, onClose, saweriaLink = "https://saweria.co/joblagan" }: DonationModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-opacity duration-300">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all duration-500 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors">
          <X size={20} />
        </button>

        <div className="bg-emerald-50 p-6 flex flex-col items-center border-b border-emerald-100">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 relative">
            <Coffee size={32} className="text-emerald-600" />
            <Heart size={16} className="text-red-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h3 className="text-xl font-black text-slate-800 text-center">Dokumen Berhasil Dicetak!</h3>
        </div>

        <div className="p-6 text-center">
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            LayananDokumen.com disediakan <strong>100% Gratis</strong>. Jika alat ini mempermudah urusan Anda hari ini, pertimbangkan untuk mentraktir developer kopi agar server tetap hidup.
          </p>
          
          <a href={saweriaLink} target="_blank" rel="noopener noreferrer" onClick={onClose} className="w-full flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#F2C900] text-slate-900 font-bold text-sm py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95">
            ☕ Traktir via Saweria
          </a>
          
          <button onClick={onClose} className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 underline decoration-slate-300 underline-offset-4">
            Mungkin Lain Kali
          </button>
        </div>
      </div>
    </div>
  );
}
