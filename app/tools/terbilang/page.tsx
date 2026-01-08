'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Copy, Check, Hash, Type, 
  Banknote, Sparkles, RefreshCcw
} from 'lucide-react';
import Link from 'next/link';

export default function TerbilangPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <TerbilangTool />
    </div>
  );
}

function TerbilangTool() {
  // --- STATE ---
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [style, setStyle] = useState<'title' | 'upper' | 'lower'>('title');
  const [copied, setCopied] = useState(false);

  // LOGIC TERBILANG
  const terbilang = (nilai: number): string => {
    const angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let temp = "";
    
    if (nilai < 12) {
      temp = " " + angka[nilai];
    } else if (nilai < 20) {
      temp = terbilang(nilai - 10) + " Belas";
    } else if (nilai < 100) {
      temp = terbilang(Math.floor(nilai / 10)) + " Puluh" + terbilang(nilai % 10);
    } else if (nilai < 200) {
      temp = " Seratus" + terbilang(nilai - 100);
    } else if (nilai < 1000) {
      temp = terbilang(Math.floor(nilai / 100)) + " Ratus" + terbilang(nilai % 100);
    } else if (nilai < 2000) {
      temp = " Seribu" + terbilang(nilai - 1000);
    } else if (nilai < 1000000) {
      temp = terbilang(Math.floor(nilai / 1000)) + " Ribu" + terbilang(nilai % 1000);
    } else if (nilai < 1000000000) {
      temp = terbilang(Math.floor(nilai / 1000000)) + " Juta" + terbilang(nilai % 1000000);
    } else if (nilai < 1000000000000) {
      temp = terbilang(Math.floor(nilai / 1000000000)) + " Milyar" + terbilang(nilai % 1000000000);
    } else if (nilai < 1000000000000000) {
      temp = terbilang(Math.floor(nilai / 1000000000000)) + " Trilyun" + terbilang(nilai % 1000000000000);
    }
    return temp;
  };

  // EFFECT UPDATE
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

  // FORMAT VISUAL
  const displayAmount = amount ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseInt(amount.replace(/\D/g, '') || '0')) : 'Rp 0';

  // COPY HANDLER
  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      
      {/* --- LEFT PANEL: INPUT & CONTROL --- */}
      <div className="w-full lg:w-1/2 bg-white p-6 lg:p-12 flex flex-col justify-between overflow-y-auto border-r border-slate-200 relative z-10">
        
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <Link href="/" className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-all text-slate-600">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                Terbilang Rupiah <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">Pro</span>
              </h1>
            </div>
          </div>

          {/* Main Input */}
          <div className="space-y-8">
            <div className="relative group">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Masukkan Nominal Angka</label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 font-black text-3xl group-focus-within:text-emerald-500 transition-colors">Rp</span>
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-4 text-4xl lg:text-5xl font-black text-slate-800 bg-transparent border-b-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-200 font-mono tracking-tight"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                />
              </div>
              <div className="mt-3 flex justify-between items-center">
                <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block">
                  {displayAmount}
                </p>
                {amount && (
                  <button onClick={() => setAmount('')} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                    <RefreshCcw size={12}/> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Styling Options */}
            <div className="bg-slate-50 p-1 rounded-xl flex gap-1 w-full sm:w-fit">
              <button 
                onClick={() => setStyle('title')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${style === 'title' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Type size={14}/> Title Case
              </button>
              <button 
                onClick={() => setStyle('upper')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${style === 'upper' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <span className="text-[10px]">AA</span> Uppercase
              </button>
              <button 
                onClick={() => setStyle('lower')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${style === 'lower' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <span className="text-[10px] lowercase">aa</span> Lowercase
              </button>
            </div>
          </div>
        </div>

        {/* Result & Action */}
        <div className="mt-10 lg:mt-0">
          <div className={`transition-all duration-500 ${result ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Hasil Terbilang</label>
            <div className="p-6 bg-slate-900 rounded-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10"></div>
              
              <div className="relative z-10">
                <p className="text-xl lg:text-2xl leading-relaxed text-white font-medium font-serif italic min-h-[80px] flex items-center">
                  {result ? `"${result}"` : <span className="text-slate-600 not-italic font-sans text-base">Silakan ketik angka di atas...</span>}
                </p>
                
                <div className="mt-6 pt-6 border-t border-slate-700 flex justify-end">
                  <button 
                    onClick={handleCopy}
                    disabled={!result}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-200'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {copied ? <Check size={16} strokeWidth={3} /> : <Copy size={16} strokeWidth={2.5} />}
                    {copied ? 'Tersalin!' : 'Salin Teks'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- RIGHT PANEL: VISUAL PREVIEW --- */}
      <div className="hidden lg:flex w-1/2 bg-slate-100 relative items-center justify-center p-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        
        {/* Kuitansi Preview */}
        <div className="w-full max-w-lg relative perspective-1000">
          <div className="bg-white p-8 shadow-xl border border-slate-200 relative transform rotate-1 transition-transform duration-500 hover:rotate-0">
            {/* Paper Texture */}
            <div className="absolute inset-0 bg-[#fffdf5] opacity-50 pointer-events-none"></div>
            <div className="absolute left-0 top-0 bottom-0 w-8 border-r-2 border-dashed border-slate-300 bg-slate-50"></div>

            <div className="relative z-10 pl-8">
              <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="font-black text-2xl tracking-tighter text-slate-800 uppercase">KUITANSI</h3>
                  <p className="text-[10px] text-slate-500 font-bold tracking-widest">NO. 001/INV/2026</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400">Tanggal</div>
                  <div className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString('id-ID')}</div>
                </div>
              </div>

              <div className="space-y-4 font-serif">
                <div className="flex">
                  <div className="w-32 text-xs font-bold text-slate-500 uppercase pt-1">Sudah Terima Dari</div>
                  <div className="flex-1 border-b border-dotted border-slate-400 pb-1 text-sm">Bapak/Ibu Pelanggan</div>
                </div>
                <div className="flex">
                  <div className="w-32 text-xs font-bold text-slate-500 uppercase pt-1">Banyaknya Uang</div>
                  <div className="flex-1 bg-slate-100 p-3 text-sm italic font-medium leading-relaxed border border-slate-200 text-slate-700 min-h-[60px]">
                    {result || "................................................"}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-32 text-xs font-bold text-slate-500 uppercase pt-1">Untuk Pembayaran</div>
                  <div className="flex-1 border-b border-dotted border-slate-400 pb-1 text-sm">Transaksi Pembelian / Jasa</div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-end">
                <div className="bg-slate-800 text-white px-4 py-2 text-lg font-bold font-mono rounded shadow-lg transform -rotate-2">
                  {displayAmount}
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-8">Penerima,</p>
                  <p className="font-bold underline text-sm border-b border-slate-800 pb-1">Admin Keuangan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 font-medium">
              <Sparkles size={14} className="inline mr-1 text-amber-500"/>
              Lihat, langsung jadi kuitansi profesional kan?
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}