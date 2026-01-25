'use client';

/**
 * FILE: FranchisePage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Perjanjian Waralaba / Franchise Agreement
 * FEATURES:
 * - Dual Template (Classic Legal vs Modern Corporate)
 * - Strict A4 Print Layout
 * - Mobile Menu Fixed
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Store, ShieldCheck, User, 
  FileText, BadgeCheck, Coins, LayoutTemplate, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface FranchiseData {
  city: string;
  date: string;
  docNo: string;
  
  // Franchisor
  p1Name: string;
  p1Title: string;
  p1Company: string;
  p1Brand: string;
  p1Address: string;

  // Franchisee
  p2Name: string;
  p2ID: string;
  p2Address: string;
  p2Location: string;

  // Detail Bisnis
  franchiseFee: string;
  royaltyFee: string;
  marketingFee: string;
  contractDuration: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: FranchiseData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  docNo: 'FRA/LGL/2026/012',
  
  p1Name: 'DODI PRASETYO',
  p1Title: 'Direktur Utama',
  p1Company: 'PT. KULINER NUSANTARA JAYA',
  p1Brand: 'Kopi Kenangan Rakyat',
  p1Address: 'Menara Bisnis Lt. 12, Jl. HR Rasuna Said, Jakarta Selatan',

  p2Name: 'IWAN SETIAWAN',
  p2ID: '3273012345670001',
  p2Address: 'Jl. Merdeka No. 88, Bandung, Jawa Barat',
  p2Location: 'Cihampelas Walk, Bandung (Unit G-05)',

  franchiseFee: 'Rp 150.000.000,-',
  royaltyFee: '5% dari Omzet Kotor',
  marketingFee: '1% dari Omzet Kotor',
  contractDuration: '5 (Lima) Tahun',
  
  witness1: 'SITI RAHMAWATI, S.H.',
  witness2: 'ANDI WIJAYA'
};

// --- 3. KOMPONEN UTAMA ---
export default function FranchisePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium font-sans">Memuat Editor Franchise...</div>}>
      <FranchiseBuilder />
    </Suspense>
  );
}

function FranchiseBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<FranchiseData>(INITIAL_DATA);
  const [isClient, setIsClient] = useState(false);

  // Hydration Fix
  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  const handleDataChange = (field: keyof FranchiseData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Klasik Formal (Serif)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Corporate (Sans)
        </button>
    </div>
  );

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    if (templateId === 1) {
      // --- TEMPLATE 1: KLASIK SERIF ---
      return (
        <div className="font-serif text-[11pt] leading-relaxed text-justify text-black">
          <div className="text-center mb-8">
            <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-4">PERJANJIAN WARALABA</h1>
            <p className="text-[10pt] font-sans mt-2 italic text-slate-500">Nomor: {data.docNo}</p>
          </div>

          <p className="mb-4">
            Pada hari ini, <b>{formatDate(data.date)}</b>, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:
          </p>
          
          <div className="mb-6 pl-4 space-y-4">
              <div className="flex break-inside-avoid">
                  <span className="w-8 font-bold">1.</span>
                  <div className="flex-1">
                    <table className="w-full">
                      <tbody>
                        <tr><td className="w-24 font-bold">Nama</td><td>: <b>{data.p1Name}</b></td></tr>
                        <tr><td className="font-bold">Jabatan</td><td>: {data.p1Title}</td></tr>
                        <tr><td className="font-bold">Perusahaan</td><td>: {data.p1Company}</td></tr>
                        <tr><td className="font-bold align-top">Alamat</td><td>: {data.p1Address}</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-2">Bertindak untuk dan atas nama <b>{data.p1Company}</b> selaku Pemilik Merek <b>"{data.p1Brand}"</b>, selanjutnya disebut <b>PIHAK PERTAMA (FRANCHISOR)</b>.</p>
                  </div>
              </div>
              <div className="flex break-inside-avoid">
                  <span className="w-8 font-bold">2.</span>
                  <div className="flex-1">
                    <table className="w-full">
                      <tbody>
                        <tr><td className="w-24 font-bold">Nama</td><td>: <b>{data.p2Name}</b></td></tr>
                        <tr><td className="font-bold">No. KTP</td><td>: {data.p2ID}</td></tr>
                        <tr><td className="font-bold align-top">Alamat</td><td>: {data.p2Address}</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-2">Bertindak atas nama pribadi, bermaksud menjalankan usaha di <b>{data.p2Location}</b>, selanjutnya disebut <b>PIHAK KEDUA (FRANCHISEE)</b>.</p>
                  </div>
              </div>
          </div>

          <p className="mb-4">Para Pihak sepakat mengikatkan diri dalam Perjanjian Waralaba dengan ketentuan:</p>

          <div className="space-y-4 mb-8">
              <div className="break-inside-avoid">
                <h3 className="font-bold text-center underline uppercase mb-1">Pasal 1: PEMBERIAN HAK</h3>
                <p>Pihak Pertama memberikan hak eksklusif kepada Pihak Kedua untuk menggunakan merek dan sistem <b>{data.p1Brand}</b> di lokasi <b>{data.p2Location}</b>.</p>
              </div>

              <div className="break-inside-avoid">
                <h3 className="font-bold text-center underline uppercase mb-1">Pasal 2: BIAYA & ROYALTI</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Franchise Fee: <b>{data.franchiseFee}</b> dibayar di muka.</li>
                  <li>Royalty Fee: <b>{data.royaltyFee}</b> dibayar setiap bulan.</li>
                  <li>Marketing Fee: <b>{data.marketingFee}</b> dibayar setiap bulan.</li>
                </ol>
              </div>

              <div className="break-inside-avoid">
                <h3 className="font-bold text-center underline uppercase mb-1">Pasal 3: JANGKA WAKTU</h3>
                <p>Perjanjian ini berlaku selama <b>{data.contractDuration}</b> terhitung sejak tanggal ditandatanganinya perjanjian ini.</p>
              </div>

              <div className="break-inside-avoid">
                  <h3 className="font-bold text-center underline uppercase mb-1">Pasal 4: PENYELESAIAN PERSELISIHAN</h3>
                  <p>Segala perselisihan akan diselesaikan secara musyawarah. Apabila tidak tercapai kata sepakat, akan diselesaikan di Pengadilan Negeri {data.city}.</p>
              </div>
          </div>

          <p className="mb-8">
            Demikian perjanjian ini dibuat dalam 2 (dua) rangkap bermaterai cukup.
          </p>

          <div className="break-inside-avoid mt-8 pt-4">
            <table className="w-full text-center">
              <tbody>
                <tr>
                  <td className="pb-24 font-bold w-1/2 align-top">PIHAK PERTAMA</td>
                  <td className="pb-24 font-bold w-1/2 align-top">PIHAK KEDUA</td>
                </tr>
                <tr>
                  <td className="uppercase font-bold underline">({data.p1Name})</td>
                  <td className="uppercase font-bold underline">({data.p2Name})</td>
                </tr>
                <tr>
                  <td className="pt-12 pb-16 font-bold text-xs text-slate-500 align-top" colSpan={2}>Saksi-Saksi:</td>
                </tr>
                <tr>
                  <td className="uppercase font-bold text-sm">({data.witness1})</td>
                  <td className="uppercase font-bold text-sm">({data.witness2})</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: MODERN CORPORATE ---
      return (
        <div className="font-sans text-[10pt] leading-snug text-slate-800">
          <div className="flex justify-between items-start border-b-4 border-blue-900 pb-4 mb-6">
              <div>
                 <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tighter leading-none">Perjanjian Waralaba</h1>
                 <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mt-1">{data.p1Brand}</p>
              </div>
              <div className="text-right">
                 <div className="text-[10px] font-bold text-slate-400 uppercase">Nomor Dokumen</div>
                 <div className="font-mono font-bold text-slate-900">{data.docNo}</div>
              </div>
          </div>

          <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 mb-6 text-xs flex justify-between">
              <p>Tanggal: <b>{formatDate(data.date)}</b></p>
              <p>Lokasi: <b>{data.city}</b></p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50/50 p-4 rounded border border-blue-100 break-inside-avoid">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-widest border-b border-blue-200 pb-1">Franchisor</h3>
                 <div className="space-y-1 text-xs">
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Perusahaan</span> <span className="font-bold">{data.p1Company}</span></p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Diwakili Oleh</span> {data.p1Name} ({data.p1Title})</p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Alamat</span> {data.p1Address}</p>
                 </div>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded border border-emerald-100 break-inside-avoid">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 mb-2 tracking-widest border-b border-emerald-200 pb-1">Franchisee</h3>
                 <div className="space-y-1 text-xs">
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Nama Mitra</span> <span className="font-bold">{data.p2Name}</span></p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Identitas</span> {data.p2ID}</p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Lokasi Usaha</span> {data.p2Location}</p>
                 </div>
              </div>
          </div>

          <div className="space-y-4 mb-8">
              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Pasal 1 &mdash; Lisensi</h4>
                 <p className="text-justify text-slate-600 text-xs">Franchisor memberikan lisensi kepada Franchisee untuk menggunakan merek <b>{data.p1Brand}</b> secara eksklusif di lokasi yang disepakati.</p>
              </div>
              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Pasal 2 &mdash; Biaya</h4>
                 <div className="grid grid-cols-3 gap-2 mt-1">
                    <div className="bg-slate-100 p-2 rounded">
                       <span className="block text-[8px] uppercase font-bold text-slate-500">Franchise Fee</span>
                       <span className="font-bold text-xs">{data.franchiseFee}</span>
                    </div>
                    <div className="bg-slate-100 p-2 rounded">
                       <span className="block text-[8px] uppercase font-bold text-slate-500">Royalty Fee</span>
                       <span className="font-bold text-xs">{data.royaltyFee}</span>
                    </div>
                    <div className="bg-slate-100 p-2 rounded">
                       <span className="block text-[8px] uppercase font-bold text-slate-500">Marketing Fee</span>
                       <span className="font-bold text-xs">{data.marketingFee}</span>
                    </div>
                 </div>
              </div>
              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Pasal 3 &mdash; Ketentuan</h4>
                 <p className="text-justify text-slate-600 text-xs">Berlaku selama <b>{data.contractDuration}</b>. Franchisee wajib mematuhi SOP dan menjaga kerahasiaan bisnis.</p>
              </div>
          </div>

          <div className="flex items-end justify-between pt-8 border-t-2 border-slate-900 mt-auto break-inside-avoid">
              <div className="text-center w-1/3">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-16">Pihak Pertama</p>
                 <p className="font-bold border-b border-slate-900 pb-1 text-xs">{data.p1Name}</p>
                 <p className="text-[8px] text-slate-500 mt-1">Direktur Utama</p>
              </div>
              <div className="text-center w-1/4">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-4">Saksi-Saksi</p>
                 <div className="space-y-8 text-[9px]">
                    <p className="border-b border-slate-300 pb-1">{data.witness1}</p>
                    <p className="border-b border-slate-300 pb-1">{data.witness2}</p>
                 </div>
              </div>
              <div className="text-center w-1/3">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-16">Pihak Kedua</p>
                 <p className="font-bold border-b border-slate-900 pb-1 text-xs">{data.p2Name}</p>
                 <p className="text-[8px] text-slate-500 mt-1">Mitra Usaha</p>
              </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT FIXED */}
      <style jsx global>{`
        @media print {
            @page { size: A4 portrait; margin: 0; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; display: block !important; }
            #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 25mm; display: table-header-group; } 
            .print-table tfoot { height: 25mm; display: table-footer-group; } 
            .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
            tr, .break-inside-avoid { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Franchise <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Klasik Formal' : 'Modern Corporate'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               {/* MOBILE MENU TRIGGER */}
               <div className="relative md:hidden">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">
                    Template <ChevronDown size={14}/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Kontrak</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               {/* 1. DOKUMEN UTAMA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileText size={12}/> Dokumen Utama</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <input className="w-full p-2 border rounded text-xs font-bold font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Dokumen" />
                      <div className="grid grid-cols-2 gap-3">
                         <input type="text" className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                         <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 2. FRANCHISOR */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><BadgeCheck size={12}/> Franchisor (Pihak 1)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <input className="w-full p-2 border rounded text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Penanggung Jawab" />
                      <input className="w-full p-2 border rounded text-xs" value={data.p1Title} onChange={e => handleDataChange('p1Title', e.target.value)} placeholder="Jabatan" />
                      <input className="w-full p-2 border rounded text-xs" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama Perusahaan" />
                      <input className="w-full p-2 border rounded text-xs" value={data.p1Brand} onChange={e => handleDataChange('p1Brand', e.target.value)} placeholder="Merek Dagang" />
                      <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat Perusahaan" />
                  </div>
               </div>

               {/* 3. FRANCHISEE */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Store size={12}/> Franchisee (Pihak 2)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <input className="w-full p-2 border rounded text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Mitra" />
                      <input className="w-full p-2 border rounded text-xs" value={data.p2ID} onChange={e => handleDataChange('p2ID', e.target.value)} placeholder="No KTP" />
                      <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Mitra" />
                      <input className="w-full p-2 border rounded text-xs" value={data.p2Location} onChange={e => handleDataChange('p2Location', e.target.value)} placeholder="Lokasi Outlet" />
                  </div>
               </div>

               {/* 4. DETAIL */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Coins size={12}/> Biaya & Durasi</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <input className="w-full p-2 border rounded text-xs" value={data.franchiseFee} onChange={e => handleDataChange('franchiseFee', e.target.value)} placeholder="Franchise Fee" />
                      <input className="w-full p-2 border rounded text-xs" value={data.royaltyFee} onChange={e => handleDataChange('royaltyFee', e.target.value)} placeholder="Royalty Fee" />
                      <input className="w-full p-2 border rounded text-xs" value={data.marketingFee} onChange={e => handleDataChange('marketingFee', e.target.value)} placeholder="Marketing Fee" />
                      <input className="w-full p-2 border rounded text-xs font-bold" value={data.contractDuration} onChange={e => handleDataChange('contractDuration', e.target.value)} placeholder="Durasi Kontrak" />
                  </div>
               </div>

               {/* 5. SAKSI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldCheck size={12}/> Saksi</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <input className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Saksi 1" />
                      <input className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Saksi 2" />
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '25mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '25mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
