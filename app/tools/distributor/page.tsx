'use client';

/**
 * FILE: PerjanjianResellerPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Perjanjian Kerjasama (MOU/SPK) Distributor/Reseller
 * FEATURES:
 * - Dual Template (Contract vs Appointment Letter)
 * - Strict A4 Print Layout
 * - Mobile Menu Fixed
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Handshake, Building2, UserCircle2, 
  MapPin, ShoppingCart, CalendarRange, Scale, LayoutTemplate, 
  ChevronDown, Check, ArrowLeftCircle, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface ContractData {
  city: string;
  date: string;
  contractNo: string;
  
  // Pihak Pertama (Supplier)
  providerName: string;
  providerOwner: string;
  providerAddress: string;

  // Pihak Kedua (Reseller)
  resellerName: string;
  resellerStore: string;
  resellerAddress: string;
  
  // Ketentuan
  region: string;
  target: string;
  paymentTerms: string;
  duration: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ContractData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  contractNo: 'SPK/RES/2026/088',
  
  providerName: 'CV. PANGAN MAJU JAYA',
  providerOwner: 'ANDI WIJAYA',
  providerAddress: 'Kawasan Niaga Sudirman Blok C5, Jakarta Pusat',

  resellerName: 'SITI AMINAH',
  resellerStore: 'TOKO BERKAH UTAMA',
  resellerAddress: 'Jl. Raya Bogor KM 24, Ciracas, Jakarta Timur',
  
  region: 'Jabodetabek & Banten',
  target: 'Minimal 100 unit per bulan',
  paymentTerms: 'Cash Before Delivery (CBD)',
  duration: '12 (Dua Belas) Bulan'
};

// --- 3. KOMPONEN UTAMA ---
export default function PerjanjianResellerPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian...</div>}>
      <ContractBuilder />
    </Suspense>
  );
}

function ContractBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<ContractData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof ContractData, val: any) => {
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
            Perjanjian Resmi (Kontrak)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Surat Penunjukan (SPK)
        </button>
    </div>
  );

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    if (templateId === 1) {
      // --- TEMPLATE 1: PERJANJIAN RESMI (Formal) ---
      return (
        <div className="font-serif text-[11pt] leading-relaxed text-black">
           
           {/* JUDUL */}
           <div className="text-center mb-8 shrink-0 pb-4 border-b-2 border-black">
              <h1 className="text-lg font-black uppercase tracking-wide">PERJANJIAN KERJASAMA DISTRIBUTOR</h1>
              <p className="text-[10pt] font-sans mt-1">Nomor: {data.contractNo}</p>
           </div>

           {/* ISI SURAT */}
           <div className="space-y-4 text-justify px-1">
              <p>Pada hari ini, tanggal <b>{formatDate(data.date)}</b>, bertempat di <b>{data.city}</b>, yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-2 space-y-4">
                 <div className="bg-slate-50 p-4 border border-slate-300">
                    <p className="mb-1">1. <b>{data.providerOwner}</b>, bertindak atas nama <b>{data.providerName}</b>, berkedudukan di {data.providerAddress}.</p>
                    <p className="italic text-sm">Selanjutnya disebut sebagai <b>PIHAK PERTAMA (Supplier)</b>.</p>
                 </div>
                 <div className="bg-slate-50 p-4 border border-slate-300">
                    <p className="mb-1">2. <b>{data.resellerName}</b>, pemilik <b>{data.resellerStore}</b>, beralamat di {data.resellerAddress}.</p>
                    <p className="italic text-sm">Selanjutnya disebut sebagai <b>PIHAK KEDUA (Reseller)</b>.</p>
                 </div>
              </div>

              <p>Kedua belah pihak sepakat untuk mengikatkan diri dalam perjanjian kerjasama dengan ketentuan sebagai berikut:</p>

              <div className="space-y-4 ml-2 border-l-4 border-black pl-4 py-2">
                 <div>
                    <p className="font-bold uppercase text-[10pt] mb-1">Pasal 1: Wilayah & Hak Jual</p>
                    <p>Pihak Pertama memberikan hak kepada Pihak Kedua untuk mendistribusikan produk di wilayah <b>{data.region}</b>. Pihak Kedua wajib menjaga nama baik produk dan perusahaan Pihak Pertama.</p>
                 </div>
                 <div>
                    <p className="font-bold uppercase text-[10pt] mb-1">Pasal 2: Harga & Pembayaran</p>
                    <p>Pihak Kedua wajib mengikuti kebijakan harga yang ditetapkan oleh Pihak Pertama. Sistem pembayaran dilakukan secara <b>{data.paymentTerms}</b> sebelum barang dikirimkan.</p>
                 </div>
                 <div>
                    <p className="font-bold uppercase text-[10pt] mb-1">Pasal 3: Target Penjualan</p>
                    <p>Pihak Kedua berkomitmen untuk mencapai target penjualan sebesar <b>{data.target}</b> sebagai syarat evaluasi perpanjangan kontrak.</p>
                 </div>
                 <div>
                    <p className="font-bold uppercase text-[10pt] mb-1">Pasal 4: Masa Berlaku</p>
                    <p>Perjanjian ini berlaku untuk jangka waktu <b>{data.duration}</b> dan dapat diperpanjang melalui kesepakatan tertulis kedua belah pihak.</p>
                 </div>
              </div>
              
              <p className="indent-12">Demikian surat perjanjian ini dibuat dalam rangkap 2 (dua) bermaterai cukup dan memiliki kekuatan hukum yang sama.</p>
           </div>

           {/* TANDA TANGAN */}
           <div className="shrink-0 mt-12 pt-4 border-t border-black" style={{ pageBreakInside: 'avoid' }}>
              <div className="grid grid-cols-2 gap-10 text-center">
                 <div className="flex flex-col items-center">
                    <p className="mb-24 font-bold uppercase text-[10pt]">Pihak Pertama<br/>(Supplier)</p>
                    <p className="font-bold underline uppercase border-b border-black w-full pb-1">{data.providerOwner}</p>
                 </div>
                 <div className="flex flex-col items-center">
                    <p className="mb-24 font-bold uppercase text-[10pt]">Pihak Kedua<br/>(Reseller)</p>
                    <p className="font-bold underline uppercase border-b border-black w-full pb-1">{data.resellerName}</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: SURAT PENUNJUKAN (SPK) ---
      return (
        <div className="font-sans text-[11pt] text-slate-900 leading-relaxed">
           <div className="border-b-4 border-double border-slate-900 pb-4 mb-8 text-center">
              <h1 className="text-xl font-black uppercase tracking-wide">{data.providerName}</h1>
              <p className="text-sm">{data.providerAddress}</p>
           </div>

           <div className="text-center mb-8">
              <h2 className="text-lg font-bold underline uppercase decoration-2 underline-offset-4">SURAT PENUNJUKAN DISTRIBUTOR</h2>
              <p className="text-sm font-bold mt-1">No: {data.contractNo}</p>
           </div>

           <div className="space-y-6 px-1">
              <p>Dengan ini, Manajemen <b>{data.providerName}</b> menunjuk secara resmi:</p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                 <h3 className="font-black text-xl uppercase text-slate-800 mb-1">{data.resellerStore}</h3>
                 <p className="text-lg font-bold text-slate-600 mb-2">({data.resellerName})</p>
                 <p className="text-sm italic">{data.resellerAddress}</p>
              </div>

              <div className="text-center py-2">
                 <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Sebagai Distributor Resmi</span>
              </div>

              <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-100 text-sm">
                 <p className="font-bold text-emerald-800 mb-3 underline">KETENTUAN PENUNJUKAN:</p>
                 <ul className="list-disc ml-5 space-y-2 text-emerald-900">
                    <li>Wilayah Pemasaran: <b>{data.region}</b></li>
                    <li>Target Penjualan: <b>{data.target}</b></li>
                    <li>Masa Berlaku: <b>{data.duration}</b></li>
                 </ul>
              </div>

              <p className="text-justify text-sm">
                 Surat penunjukan ini berlaku efektif sejak tanggal ditandatangani dan dapat dicabut sewaktu-waktu apabila Pihak Kedua melanggar ketentuan perusahaan atau tidak mencapai target yang ditetapkan selama 3 bulan berturut-turut.
              </p>
           </div>

           <div className="mt-12 text-right" style={{ pageBreakInside: 'avoid' }}>
              <p className="mb-1">{data.city}, {formatDate(data.date)}</p>
              <p className="mb-24 font-bold">Hormat Kami,</p>
              <p className="font-bold underline uppercase">{data.providerOwner}</p>
              <p className="text-xs font-bold text-slate-500">Business Development Manager</p>
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
            body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 15mm; display: table-header-group; } 
            .print-table tfoot { height: 15mm; display: table-footer-group; } 
            .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
            tr, .keep-together { page-break-inside: avoid !important; break-inside: avoid; }
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Kontrak Reseller <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Perjanjian Resmi' : 'Surat Penunjukan'}</span><ChevronDown size={14} className="text-slate-500"/>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Kontrak</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               {/* 1. PIHAK 1 */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Pihak Pertama (Supplier)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Perusahaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.providerName} onChange={e => handleDataChange('providerName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pemilik / Penanggung Jawab</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.providerOwner} onChange={e => handleDataChange('providerOwner', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.providerAddress} onChange={e => handleDataChange('providerAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* 2. PIHAK 2 */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Pihak Kedua (Reseller)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.resellerName} onChange={e => handleDataChange('resellerName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Toko</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.resellerStore} onChange={e => handleDataChange('resellerStore', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.resellerAddress} onChange={e => handleDataChange('resellerAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. KETENTUAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Scale size={12}/> Syarat & Ketentuan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Wilayah</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.region} onChange={e => handleDataChange('region', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Durasi Kontrak</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Target Penjualan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.target} onChange={e => handleDataChange('target', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Sistem Pembayaran</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.paymentTerms} onChange={e => handleDataChange('paymentTerms', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-200">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nomor Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.contractNo} onChange={e => handleDataChange('contractNo', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                      </div>
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
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
