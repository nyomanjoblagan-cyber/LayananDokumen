'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: KatalogDeskripsiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Katalog Produk & Spesifikasi
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  ShoppingBag, Box, Image as ImageIcon, BookOpen, List
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface KatalogData {
  namaPerusahaan: string;
  website: string;
  kontak: string;
  
  namaProduk: string;
  kategori: string;
  sku: string;
  hargaBiasa: number;
  hargaDiskon: number;
  
  deskripsiUtama: string;
  specList: string;
  fiturList: string;
  syaratKetentuan: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: KatalogData = {
  namaPerusahaan: 'PT. TEKNOLOGI MASA DEPAN',
  website: 'www.tekno-masa.com',
  kontak: 'Sales: 0811-2233-4455 | Email: sales@tekno-masa.com',
  
  namaProduk: 'Mesin Kopi Espresso Otomatis Seri X-900',
  kategori: 'Peralatan Dapur Komersial',
  sku: 'TM-X900-ESP',
  hargaBiasa: 45000000,
  hargaDiskon: 42500000,
  
  deskripsiUtama: 'Mesin kopi profesional dengan sistem dual-boiler dan pompa putar (rotary pump) yang mampu menghasilkan ekstraksi espresso sempurna secara konsisten. Sangat cocok untuk coffee shop dengan volume tinggi (hingga 300 cup per hari).',
  
  specList: 'Daya Listrik: 2.200 Watt\\nTegangan: 220V / 50Hz\\nKapasitas Boiler: 5 Liter\\nDimensi (PxLxT): 55cm x 45cm x 50cm\\nBerat: 35 Kg\\nMaterial: Stainless Steel 304',
  
  fiturList: 'Layar sentuh TFT 3.5 inci\\nProfil suhu ekstraksi yang dapat diatur (PID)\\nPre-infusion otomatis\\nSteam wand anti-panas (cool touch)',
  
  syaratKetentuan: 'Garansi resmi 1 tahun untuk sparepart dan 2 tahun untuk service (heating element). Pengiriman gratis untuk wilayah Jabodetabek. Instalasi dan training dasar penggunaan termasuk dalam harga.'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[10pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function KatalogDeskripsiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Katalog...</div>}>
      <KatalogBuilder />
    </Suspense>
  );
}

function KatalogBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<KatalogData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'produk' | 'deskripsi' | 'syarat'>('produk');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof KatalogData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    return (
      <Kertas>
        {/* HEADER / BRAND */}
        <div className="border-b-4 border-slate-900 pb-4 mb-6 flex justify-between items-end break-inside-avoid">
            <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{data.namaPerusahaan}</h1>
                <p className="text-sm font-bold text-slate-600 tracking-widest mt-1">PRODUCT SPECIFICATION SHEET</p>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-0.5">
                <p>{data.website}</p>
                <p>{data.kontak}</p>
            </div>
        </div>

        {/* PRODUK INFO UTAMA */}
        <div className="flex gap-6 mb-8 break-inside-avoid">
            {/* GAMBAR PLACEHOLDER */}
            <div className="w-48 h-48 bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0">
                <div className="text-center text-slate-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-[10px] uppercase font-bold tracking-widest">FOTO PRODUK</p>
                </div>
            </div>

            <div className="flex-1">
                <div className="mb-4">
                    <span className="inline-block bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm mb-2">{data.kategori}</span>
                    <h2 className="text-3xl font-black text-slate-900 uppercase leading-tight mb-2">{data.namaProduk}</h2>
                    <p className="text-sm text-slate-500 font-mono">SKU: {data.sku}</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                    {data.hargaDiskon > 0 ? (
                        <>
                            <div className="text-xs text-slate-500 line-through mb-1">Harga Normal: {formatCurrency(data.hargaBiasa)}</div>
                            <div className="text-2xl font-black text-rose-600">{formatCurrency(data.hargaDiskon)}</div>
                        </>
                    ) : (
                        <div className="text-2xl font-black text-slate-900">{formatCurrency(data.hargaBiasa)}</div>
                    )}
                </div>
            </div>
        </div>

        {/* DESKRIPSI UTAMA */}
        <div className="mb-8 break-inside-avoid text-justify text-[11pt] leading-relaxed text-slate-800">
            {data.deskripsiUtama}
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
            {/* SPESIFIKASI */}
            <div className="break-inside-avoid">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-300 pb-2 mb-4">Spesifikasi Teknis</h3>
                <table className="w-full text-sm">
                    <tbody>
                        {data.specList.split('\\n').filter(Boolean).map((spec, i) => {
                            const [key, val] = spec.split(':');
                            return (
                                <tr key={i} className="border-b border-slate-100 last:border-0">
                                    <td className="py-2 pr-4 font-bold text-slate-600 w-2/5 align-top">{key?.trim()}</td>
                                    <td className="py-2 font-medium text-slate-900 align-top">{val?.trim()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* FITUR */}
            <div className="break-inside-avoid">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-300 pb-2 mb-4">Fitur Unggulan</h3>
                <ul className="space-y-3">
                    {data.fiturList.split('\\n').filter(Boolean).map((fitur, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-[10px]">✓</span>
                            <span className="text-slate-800 leading-snug">{fitur}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* FOOTER / S&K */}
        <div className="border-t border-slate-300 pt-6 mt-12 break-inside-avoid">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Syarat & Ketentuan Pembelian</h4>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">{data.syaratKetentuan}</p>
        </div>

      </Kertas>
    );
  };

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
              <ArrowLeftCircle size={20} className="text-fuchsia-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Katalog & Deskripsi</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-fuchsia-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-fuchsia-600" /> Editor Katalog</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('produk')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'produk' ? 'bg-white border-t-2 border-fuchsia-500 text-fuchsia-700' : 'text-slate-500 hover:bg-slate-200'}`}>1. Brand & Produk</button>
                <button onClick={() => setActiveTab('deskripsi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'deskripsi' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Detail Info</button>
                <button onClick={() => setActiveTab('syarat')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'syarat' ? 'bg-white border-t-2 border-slate-700 text-slate-800' : 'text-slate-500 hover:bg-slate-200'}`}>3. S&K</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'produk' && (
                <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <BookOpen size={14} className="text-slate-600"/> Identitas Brand
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan / Toko</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.namaPerusahaan} onChange={e => handleDataChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Website</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none lowercase" value={data.website} onChange={e => handleDataChange('website', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kontak} onChange={e => handleDataChange('kontak', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-fuchsia-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Box size={14} className="text-fuchsia-600"/> Data Produk Utama
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Produk</label>
                            <input className="w-full bg-fuchsia-50 p-2.5 border border-fuchsia-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none uppercase" value={data.namaProduk} onChange={e => handleDataChange('namaProduk', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kategori</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none uppercase" value={data.kategori} onChange={e => handleDataChange('kategori', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kode SKU</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none uppercase" value={data.sku} onChange={e => handleDataChange('sku', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Harga Normal (Rp)</label>
                                <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none" value={data.hargaBiasa} onChange={e => handleDataChange('hargaBiasa', Number(e.target.value))} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Harga Diskon/Promo (Rp)</label>
                                <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.hargaDiskon} onChange={e => handleDataChange('hargaDiskon', Number(e.target.value))} />
                            </div>
                        </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'deskripsi' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <ShoppingBag size={14} className="text-emerald-600"/> Deskripsi Utama
                      </h3>
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Narasi Produk</label>
                          <textarea className="w-full bg-emerald-50 p-3 border border-emerald-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.deskripsiUtama} onChange={e => handleDataChange('deskripsiUtama', e.target.value)} />
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <List size={14} className="text-slate-600"/> Spek & Fitur
                      </h3>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Spesifikasi (Format: "Key: Value") Tiap Baris</label>
                              <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm font-mono h-32 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.specList} onChange={e => handleDataChange('specList', e.target.value)} placeholder="Daya Listrik: 2.200 Watt&#10;Tegangan: 220V" />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fitur Unggulan (Tiap Baris)</label>
                              <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.fiturList} onChange={e => handleDataChange('fiturList', e.target.value)} placeholder="Layar sentuh TFT 3.5 inci&#10;Pre-infusion otomatis" />
                          </div>
                      </div>
                   </div>
                 </>
              )}

              {activeTab === 'syarat' && (
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <BookOpen size={14} className="text-slate-600"/> Garansi / Syarat Pembelian
                    </h3>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Syarat & Ketentuan</label>
                        <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-40 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none leading-relaxed" value={data.syaratKetentuan} onChange={e => handleDataChange('syaratKetentuan', e.target.value)} />
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
              <PrintWrapper documentName="Katalog_Deskripsi" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
