'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: TerbilangPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Kwitansi & Kalkulator Terbilang
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Banknote, Building2, UserCircle2, CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface KwitansiData {
  noKwitansi: string;
  tempatTanggal: string;
  namaPerusahaan: string;
  
  telahDiterimaDari: string;
  uangSejumlah: number;
  untukPembayaran: string;
  
  namaPenerima: string;
  jabatanPenerima: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: KwitansiData = {
  noKwitansi: 'KWT/2026/07-0089',
  tempatTanggal: 'Jakarta, 13 Juli 2026',
  namaPerusahaan: 'PT. TEKNOLOGI DIGITAL ASIA',
  
  telahDiterimaDari: 'PT. MAKMUR SEJAHTERA',
  uangSejumlah: 125500000,
  untukPembayaran: 'Pembayaran DP 50% Project Pengembangan Aplikasi Web E-Commerce B2B (PO Ref: RMS-2026-045)',
  
  namaPenerima: 'Andi Wijaya',
  jabatanPenerima: 'Finance Manager'
};

// Fungsi Terbilang Bahasa Indonesia
const terbilang = (angka: number): string => {
  const bilangan = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  let hasil = "";
  if (angka < 12) {
    hasil = " " + bilangan[angka];
  } else if (angka < 20) {
    hasil = terbilang(angka - 10) + " Belas";
  } else if (angka < 100) {
    hasil = terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
  } else if (angka < 200) {
    hasil = " Seratus" + terbilang(angka - 100);
  } else if (angka < 1000) {
    hasil = terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
  } else if (angka < 2000) {
    hasil = " Seribu" + terbilang(angka - 1000);
  } else if (angka < 1000000) {
    hasil = terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
  } else if (angka < 1000000000) {
    hasil = terbilang(Math.floor(angka / 1000000)) + " Juta" + terbilang(angka % 1000000);
  } else if (angka < 1000000000000) {
    hasil = terbilang(Math.floor(angka / 1000000000)) + " Miliar" + terbilang(angka % 1000000000);
  } else if (angka < 1000000000000000) {
    hasil = terbilang(Math.floor(angka / 1000000000000)) + " Triliun" + terbilang(angka % 1000000000000);
  }
  return hasil.trim();
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[148mm] print:min-h-0 h-auto font-sans text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function TerbilangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Kwitansi...</div>}>
      <TerbilangBuilder />
    </Suspense>
  );
}

function TerbilangBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'info' | 'transaksi' | 'ttd'>('info');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<KwitansiData>(INITIAL_DATA);
  const [terbilangStr, setTerbilangStr] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (data.uangSejumlah > 0) {
      setTerbilangStr(terbilang(data.uangSejumlah) + " Rupiah");
    } else {
      setTerbilangStr("Nol Rupiah");
    }
  }, [data.uangSejumlah]);

  const handleChange = (field: keyof KwitansiData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER KWITANSI */}
      <div className="flex justify-between items-end border-b-[3px] border-black pb-4 mb-8">
        <div>
            <h1 className="text-2xl font-black uppercase tracking-widest text-slate-800">{data.namaPerusahaan}</h1>
        </div>
        <div className="text-right">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-400">KWITANSI</h2>
            <p className="text-sm font-bold mt-1">No. {data.noKwitansi}</p>
        </div>
      </div>

      {/* BODY KWITANSI */}
      <div className="mb-8">
        <div className="flex mb-4"><div className="w-48 font-bold italic">Telah Diterima Dari</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase border-b border-dotted border-black">{data.telahDiterimaDari}</div></div>
        
        <div className="flex mb-4">
            <div className="w-48 font-bold italic">Uang Sejumlah</div><div className="w-4">:</div>
            <div className="flex-1 font-bold bg-slate-100 p-3 border border-slate-300 italic">#{terbilangStr}#</div>
        </div>
        
        <div className="flex mb-8"><div className="w-48 font-bold italic">Untuk Pembayaran</div><div className="w-4">:</div><div className="flex-1 border-b border-dotted border-black pb-1 leading-relaxed">{data.untukPembayaran}</div></div>
      </div>

      {/* FOOTER KWITANSI */}
      <div className="flex justify-between items-end px-4 mt-12">
        <div className="bg-slate-100 border-2 border-black p-4 text-2xl font-black tracking-wider">
            Rp {formatCurrency(data.uangSejumlah)},-
        </div>
        <div className="text-center w-64">
            <p className="mb-2">{data.tempatTanggal}</p>
            <div className="h-20 flex justify-center items-center">
                 <span className="text-gray-300 text-[10px] print:hidden">(TTD & Stempel)</span>
            </div>
            <p className="font-bold underline uppercase">{data.namaPenerima}</p>
            <p className="text-sm">{data.jabatanPenerima}</p>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Generator Kwitansi</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Banknote size={18} className="text-emerald-600" /> Editor Kwitansi</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('info')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'info' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Info Kwitansi</button>
                <button onClick={() => setActiveTab('transaksi')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'transaksi' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Transaksi</button>
                <button onClick={() => setActiveTab('ttd')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ttd' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Pengesahan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'info' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Penerbit
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Penerbit</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Kwitansi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.noKwitansi} onChange={e => handleChange('noKwitansi', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat & Tanggal</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tempatTanggal} onChange={e => handleChange('tempatTanggal', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'transaksi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Banknote size={14} className="text-emerald-600"/> Data Transaksi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Telah Diterima Dari</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.telahDiterimaDari} onChange={e => handleChange('telahDiterimaDari', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Sejumlah (Nominal Angka)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-lg font-bold font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.uangSejumlah || ''} onChange={e => handleChange('uangSejumlah', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang Otomatis</label>
                            <div className="w-full bg-slate-100 p-3 border border-slate-200 rounded-xl text-sm italic font-bold text-slate-700">
                                {terbilangStr}
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Untuk Pembayaran</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.untukPembayaran} onChange={e => handleChange('untukPembayaran', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ttd' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-amber-600"/> Pengesahan Penerima
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Terang Penerima</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaPenerima} onChange={e => handleChange('namaPenerima', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Penerima</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.jabatanPenerima} onChange={e => handleChange('jabatanPenerima', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Kwitansi_${data.noKwitansi.replace(/\s+/g, '_').replace(/\//g, '-')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
