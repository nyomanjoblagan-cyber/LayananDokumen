'use client';
import { useFormSync } from '@/lib/useFormSync';


import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, FileText, 
    Building2, Target, Lightbulb, TrendingUp, Users, Banknote, MapPin
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface BusinessData {
  city: string;
  date: string;
  
  // Info Bisnis
  companyName: string;
  tagline: string;
  owner: string;
  industry: string;

  // Executive Summary
  problem: string;
  solution: string;
  
  // Market Analysis
  targetMarket: string;
  marketSize: string;
  competitors: string;

  // Revenue Model
  revenueStream: string;
  fundingNeed: string;

  // Tim
  team: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: BusinessData = {
  city: 'DENPASAR',
  date: '2026-08-20',
  
  companyName: 'BALI TECH LOGISTICS (BTL)',
  tagline: 'Smart Solutions for Island Distribution',
  owner: 'BAGUS RAMADHAN',
  industry: 'Logistik & Teknologi (SaaS)',

  problem: 'Mahalnya biaya distribusi antar wilayah di Bali akibat sistem logistik tradisional yang tidak terintegrasi.',
  solution: 'Platform agregator logistik berbasis AI yang mengoptimalkan rute dan muatan kendaraan secara real-time.',
  
  targetMarket: 'UMKM Lokal Bali, Distributor Ritel, dan Sektor Pariwisata.',
  marketSize: 'Estimasi 50.000 UMKM di Bali dengan kebutuhan logistik harian.',
  competitors: 'Jasa logistik konvensional dan kurir instan yang belum memiliki optimasi rute cerdas.',

  revenueStream: 'Komisi 10% per transaksi dan Paket Langganan Premium (SaaS) untuk korporasi.',
  fundingNeed: 'Rp 500.000.000,- (Untuk Pengembangan App & Marketing)',

  team: 'CEO (Bagus Ramadhan), CTO (Expert Software Engineer), Head of Operations (Logistics Specialist).'
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group">
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-bold text-[12pt] uppercase border-b-2 border-black pb-1 mb-3 mt-6">{children}</h3>
);

// --- 4. KOMPONEN UTAMA ---
export default function BusinessPlanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Bisnis...</div>}>
      <BusinessPlanBuilder />
    </Suspense>
  );
}

function BusinessPlanBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<BusinessData>(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '___________';
      return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
  };

  const DocumentContent = () => (
    <Kertas>
      {/* COVER / JUDUL PROPOSAL */}
      <div className="text-center mb-10 break-inside-avoid border-[4px] border-double border-black p-8">
          <h1 className="font-black text-[22pt] uppercase tracking-widest leading-tight">{data.companyName}</h1>
          <p className="italic text-[12pt] mt-2 mb-6">"{data.tagline}"</p>
          <div className="w-24 h-1 border-t-2 border-black mx-auto mb-6"></div>
          <h2 className="font-bold text-[14pt] uppercase tracking-widest">BUSINESS PLAN / PROPOSAL USAHA</h2>
          <p className="text-[11pt] mt-4 font-bold uppercase">Industri: {data.industry}</p>
      </div>
      
      {/* 1. EXECUTIVE SUMMARY */}
      <SectionTitle>1. Ringkasan Eksekutif (Executive Summary)</SectionTitle>
      <div className="text-justify mb-4">
          <p className="font-bold mb-1">Pernyataan Masalah (Problem):</p>
          <p className="pl-4 mb-3">{data.problem}</p>
          <p className="font-bold mb-1">Solusi yang Ditawarkan (Solution):</p>
          <p className="pl-4">{data.solution}</p>
      </div>

      {/* 2. ANALISIS PASAR */}
      <SectionTitle>2. Analisis Pasar (Market Analysis)</SectionTitle>
      <div className="text-justify mb-4">
          <p className="font-bold mb-1">Target Pasar (Target Market):</p>
          <p className="pl-4 mb-3">{data.targetMarket}</p>
          <p className="font-bold mb-1">Ukuran Pasar (Market Size):</p>
          <p className="pl-4 mb-3">{data.marketSize}</p>
          <p className="font-bold mb-1">Kompetitor (Competitors):</p>
          <p className="pl-4">{data.competitors}</p>
      </div>

      {/* 3. MODEL BISNIS & KEUANGAN */}
      <SectionTitle>3. Model Bisnis & Kebutuhan Dana</SectionTitle>
      <div className="text-justify mb-4">
          <p className="font-bold mb-1">Sumber Pendapatan (Revenue Stream):</p>
          <p className="pl-4 mb-3">{data.revenueStream}</p>
          <p className="font-bold mb-1">Kebutuhan Pendanaan (Funding Required):</p>
          <p className="pl-4 font-bold italic">{data.fundingNeed}</p>
      </div>

      {/* 4. MANAJEMEN TIM */}
      <SectionTitle>4. Tim Manajemen (Management Team)</SectionTitle>
      <div className="text-justify mb-8">
          <p className="pl-4">{data.team}</p>
      </div>

      <div className="mb-8 text-justify">
          <p className="indent-8 leading-loose">
              Proposal rencana bisnis ini disusun dengan sebenar-benarnya sebagai proyeksi dari operasional dan potensi komersial perusahaan kami.
          </p>
      </div>

      {/* PENUTUP & TANDA TANGAN */}
      <div className="mt-16 break-inside-avoid">
          <div className="flex justify-end px-8">
              <div className="w-[45%] text-center">
                  <p className="mb-2">Dibuat di : <strong>{data.city}</strong></p>
                  <p className="mb-10">Pada tanggal : <strong>{formatDateSafe(data.date)}</strong></p>
                  <p className="font-bold mb-24 uppercase">Founder / CEO</p>
                  <p className="font-bold underline uppercase">{data.owner}</p>
              </div>
          </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Business Plan / Proposal Usaha</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                LEGAL FORMAL FORMAT
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Editor Business Plan
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. LOKASI & TANGGAL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-sky-600"/> Lokasi & Tanggal
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota</label>
                      <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                      <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. IDENTITAS PERUSAHAAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-emerald-600"/> Identitas Perusahaan
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan / Startup</label>
                      <input type="text" name="companyName" value={data.companyName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tagline Bisnis</label>
                      <input type="text" name="tagline" value={data.tagline} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sektor Industri</label>
                      <input type="text" name="industry" value={data.industry} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Founder / CEO</label>
                      <input type="text" name="owner" value={data.owner} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 3. EXECUTIVE SUMMARY */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Lightbulb size={14} className="text-amber-600"/> Problem & Solution
                  </h3>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masalah yang Diselesaikan (Problem)</label>
                    <textarea name="problem" value={data.problem} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-amber-800 h-24 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"></textarea>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Solusi / Produk (Solution)</label>
                    <textarea name="solution" value={data.solution} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-amber-800 h-24 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"></textarea>
                  </div>
                </div>

                {/* 4. ANALISIS PASAR */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Target size={14} className="text-purple-600"/> Market Analysis
                  </h3>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Pasar</label>
                    <textarea name="targetMarket" value={data.targetMarket} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ukuran Pasar (Market Size)</label>
                    <textarea name="marketSize" value={data.marketSize} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kompetitor</label>
                    <textarea name="competitors" value={data.competitors} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                  </div>
                </div>
                
                {/* 5. FINANSIAL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Banknote size={14} className="text-emerald-600"/> Revenue & Funding
                  </h3>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Model Pendapatan (Revenue Stream)</label>
                    <textarea name="revenueStream" value={data.revenueStream} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-emerald-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kebutuhan Pendanaan</label>
                    <input type="text" name="fundingNeed" value={data.fundingNeed} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                </div>

                {/* 6. TIM */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Users size={14} className="text-blue-600"/> Management Team
                  </h3>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Susunan Tim</label>
                    <textarea name="team" value={data.team} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-blue-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Business Plan / Proposal Usaha" price={10000} />
           </div>

        </div>
      </main>
    </div>
  );
}
