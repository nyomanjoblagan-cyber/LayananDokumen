'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Copy, Check, Hash, Type, 
  Banknote, Sparkles, RefreshCcw, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';

export default function TerbilangPage() {
  return (
    <TerbilangTool />
  );
}

function TerbilangTool() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [style, setStyle] = useState<'title' | 'upper' | 'lower'>('title');
  const [copied, setCopied] = useState(false);

  // LOGIC TERBILANG (IDR)
  const terbilang = (nilai: number): string => {
    const angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let temp = "";
    if (nilai < 12) temp = " " + angka[nilai];
    else if (nilai < 20) temp = terbilang(nilai - 10) + " Belas";
    else if (nilai < 100) temp = terbilang(Math.floor(nilai / 10)) + " Puluh" + terbilang(nilai % 10);
    else if (nilai < 200) temp = " Seratus" + terbilang(nilai - 100);
    else if (nilai < 1000) temp = terbilang(Math.floor(nilai / 100)) + " Ratus" + terbilang(nilai % 100);
    else if (nilai < 2000) temp = " Seribu" + terbilang(nilai - 1000);
    else if (nilai < 1000000) temp = terbilang(Math.floor(nilai / 1000)) + " Ribu" + terbilang(nilai % 1000);
    else if (nilai < 1000000000) temp = terbilang(Math.floor(nilai / 1000000)) + " Juta" + terbilang(nilai % 1000000);
    else if (nilai < 1000000000000) temp = terbilang(Math.floor(nilai / 1000000000)) + " Milyar" + terbilang(nilai % 1000000000);
    return temp;
  };

  useEffect(() => {
    const num = parseInt(amount.replace(/\D/g, ''));
    if (!amount || isNaN(num)) {
      setResult('');
      return;
    }
    let text = terbilang(num).trim() + " Rupiah";
    if (style === 'upper') text = text.toUpperCase();
    else if (style === 'lower') text = text.toLowerCase();
    setResult(text);
  }, [amount, style]);

  const displayAmount = amount ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseInt(amount.replace(/\D/g, '') || '0')) : 'Rp 0';

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* NAVBAR */}
      <nav className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
          <h1 className="font-black text-sm uppercase tracking-tighter text-emerald-400 italic flex items-center gap-2">
            <Sparkles size={18} /> Terbilang <span className="text-white not-italic opacity-40 font-normal">Automator</span>
          </h1>
        </div>
        <button 
          onClick={handleCopy}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg disabled:opacity-50"
          disabled={!result}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied!' : 'Salin Teks'}
        </button>
      </nav>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* INPUT PANEL */}
        <div className={`w-full md:w-[450px] bg-white border-r overflow-y-auto p-6 lg:p-10 space-y-8 h-full ${mobileView === 'preview' ? 'hidden md:block' : 'block'}`}>
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                <Banknote size={12}/> Nominal Uang
              </label>
              <div className="relative group">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300 group-focus-within:text-emerald-500 transition-colors">Rp</span>
                <input 
                  type="text"
                  className="w-full pl-10 py-3 text-4xl font-black text-slate-800 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 focus:outline-none transition-all font-mono"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <p className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg inline-block mt-2">
                {displayAmount}
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Gaya Tulisan</label>
              <div className="grid grid-cols-3 gap-2">
                {(['title', 'upper', 'lower'] as const).map((s) => (
                  <button 
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`py-2 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${style === s ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Hasil Konversi</label>
              <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-left">
                <p className="text-lg font-serif italic font-medium leading-relaxed text-slate-700">
                  {result ? `"${result}"` : "Angka akan muncul di sini..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* VISUAL PREVIEW (KUITANSI) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
          <div className="w-full max-w-2xl transform scale-[0.85] lg:scale-100 transition-all">
            <div className="bg-white p-8 lg:p-12 shadow-2xl rounded-sm border-t-[12px] border-emerald-600 relative overflow-hidden">
              {/* Receipt Decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Banknote size={120} />
              </div>
              
              <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Kuitansi</h2>
                  <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase mt-1">Official Payment Voucher</p>
                </div>
                <div className="text-right font-mono text-sm font-bold text-slate-400">
                  No. 0829/PRO/{new Date().getFullYear()}
                </div>
              </div>

              <div className="space-y-8 text-left font-serif">
                <div className="flex border-b border-dotted border-slate-300 pb-2">
                  <span className="w-40 text-xs font-bold uppercase text-slate-400 pt-1">Terima Dari</span>
                  <span className="flex-1 text-sm font-bold text-slate-800 italic uppercase">Bendahara Utama</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase text-slate-400">Sejumlah Uang</span>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-base lg:text-xl font-bold italic leading-relaxed text-slate-700 shadow-inner">
                    {result || "................................................................................"}
                  </div>
                </div>
                <div className="flex border-b border-dotted border-slate-300 pb-2">
                  <span className="w-40 text-xs font-bold uppercase text-slate-400 pt-1">Keperluan</span>
                  <span className="flex-1 text-sm text-slate-600 italic">Pembayaran Invoice Pro-Legal Dokumen Terlampir</span>
                </div>
              </div>

              <div className="mt-12 flex justify-between items-end">
                <div className="bg-slate-900 text-emerald-400 px-6 py-3 text-2xl font-black font-mono rounded-lg shadow-xl transform -rotate-1 border-b-4 border-emerald-700">
                  {displayAmount}
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-12">Authorized Signatory</p>
                  <p className="font-bold underline text-slate-900 uppercase">System Automator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE NAV (SERAGAM) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50">
        <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>
    </div>
  );
}