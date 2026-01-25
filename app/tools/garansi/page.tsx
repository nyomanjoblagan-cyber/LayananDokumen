'use client';

/**
 * FILE: SuratJaminanPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Jaminan Garansi Produk/Jasa
 * FEATURES:
 * - Dual Template (Certificate vs Formal Letter)
 * - Auto Date
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  ShieldCheck, Building2, UserCircle2, CalendarDays, FileText, 
  Settings, Award, Clock, Edit3, Eye, Briefcase, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface WarrantyData {
  city: string;
  date: string;
  warrantyNo: string;
  
  // Penerbit
  vendorName: string;
  vendorAddress: string;
  vendorPhone: string;

  // Pelanggan
  clientName: string;
  clientAddress: string;
  
  // Detail
  productName: string;
  serialNumber: string;
  purchaseDate: string;
  
  // Garansi
  duration: string;
  coverage: string;
  claimMethod: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: WarrantyData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  warrantyNo: 'GAR/2026/01/0045',
  
  vendorName: 'CV. TEKNO MANDIRI SEJAHTERA',
  vendorAddress: 'Ruko Permata Blok B2 No. 10, Jakarta Selatan',
  vendorPhone: '021-55566677',

  clientName: 'PT. SINAR JAYA ABADI',
  clientAddress: 'Jl. Sudirman Kav 45-46, Jakarta Pusat',
  
  productName: 'Unit Server Rackmount PowerEdge R750',
  serialNumber: 'SN-7890-XYZ-2026',
  purchaseDate: '', // Diisi useEffect
  
  duration: '12 Bulan (1 Tahun)',
  coverage: 'Kerusakan pada komponen internal (Hardware) dan jasa perbaikan. Tidak termasuk kerusakan akibat kelalaian penggunaan, bencana alam, atau modifikasi pihak ketiga.',
  claimMethod: 'Menghubungi layanan pelanggan kami dan melampirkan kartu garansi asli beserta bukti pembelian.'
};

// --- 3. KOMPONEN UTAMA ---
export default function SuratJaminanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Garansi...</div>}>
      <WarrantyBuilder />
    </Suspense>
  );
}

function WarrantyBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<WarrantyData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: today,
        purchaseDate: today 
    }));
  }, []);

  const handleDataChange = (field: keyof WarrantyData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, purchaseDate: today });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Sertifikat Garansi (Gold)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Surat Jaminan (Formal)
        </button>
    </div>
  );

  // --- KOMPONEN ISI SURAT ---
  const WarrantyContent = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: SERTIFIKAT (GOLD) ---
      return (
        <div className="bg-white mx-auto flex flex-col box-border w-full h-full text-slate-900 border-8 border-double border-amber-200 p-[15mm]">
           {/* HEADER */}
           <div className="flex justify-between items-center border-b-2 border-slate-900 pb-6 mb-8 shrink-0">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-900 rounded-lg text-white">
                   <Award size={32} />
                </div>
                <div>
                   <h1 className="text-xl font-black uppercase tracking-tighter leading-none">{data.vendorName}</h1>
                   <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Quality Assurance & Warranty Division</p>
                </div>
             </div>
             <div className="text-right">
                <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded text-[10px] font-black uppercase inline-block border border-amber-200">Official Warranty</div>
                <p className="text-[10px] mt-1 font-mono">No: {data.warrantyNo}</p>
             </div>
           </div>

           <div className="text-center mb-10 shrink-0">
             <h2 className="text-3xl font-black uppercase tracking-widest text-amber-600 font-serif">SERTIFIKAT GARANSI</h2>
             <div className="w-32 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
           </div>

           <div className="space-y-6 flex-grow font-serif text-[11pt] leading-relaxed px-4">
             <p className="text-justify">Dengan ini <b>{data.vendorName}</b> memberikan jaminan kualitas dan layanan purnajual kepada pelanggan kami:</p>
             
             <div className="ml-6 space-y-1 border-l-4 border-amber-200 pl-4 py-2">
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Pelanggan</span><span>:</span><span className="font-bold uppercase">{data.clientName}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.clientAddress}</span></div>
             </div>

             <p>Atas pembelian produk/jasa sebagai berikut:</p>
             <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-amber-800 uppercase tracking-widest block border-b border-amber-200 pb-1">Detail Barang</label>
                      <p className="font-bold text-sm text-slate-800">{data.productName}</p>
                      <p className="text-xs font-mono text-slate-500">S/N: {data.serialNumber}</p>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-amber-800 uppercase tracking-widest block border-b border-amber-200 pb-1">Masa Berlaku</label>
                      <p className="font-bold text-sm text-emerald-600">{data.duration}</p>
                      <p className="text-xs text-slate-500">Mulai: {isClient && data.purchaseDate ? new Date(data.purchaseDate).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</p>
                   </div>
                </div>
             </div>

             <div className="space-y-4 pt-2">
                <div className="space-y-1">
                   <h4 className="font-bold text-sm uppercase flex items-center gap-2"><ShieldCheck size={14} className="text-amber-500"/> Lingkup Jaminan:</h4>
                   <p className="text-sm text-slate-600 italic leading-relaxed">{data.coverage}</p>
                </div>
                <div className="space-y-1">
                   <h4 className="font-bold text-sm uppercase flex items-center gap-2"><Clock size={14} className="text-blue-500"/> Prosedur Klaim:</h4>
                   <p className="text-sm text-slate-600 leading-relaxed">{data.claimMethod}</p>
                </div>
             </div>

             <p className="text-sm text-center italic text-slate-500 mt-8">Demikian sertifikat ini diterbitkan sebagai bukti komitmen kami.</p>
           </div>

           {/* FOOTER */}
           <div className="shrink-0 mt-8 flex justify-between items-end border-t-2 border-slate-100 pt-6 px-4" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center w-48">
                 <div className="p-2 border-2 border-dashed border-slate-200 rounded-lg mb-2 opacity-50">
                    <Settings size={24} className="mx-auto text-slate-400" />
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">Stamp Area</p>
                 </div>
              </div>
              <div className="text-center w-64">
                 <p className="text-xs text-slate-500 mb-14">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</p>
                 <div className="relative inline-block">
                    <p className="font-bold underline uppercase text-sm leading-none">{data.vendorName}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Authorized Signature</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: SURAT RESMI (FORMAL) ---
      return (
        <div className="font-serif text-[11pt] leading-relaxed p-[20mm] text-black">
           <div className="text-center mb-8 border-b-2 border-black pb-4">
              <h1 className="text-xl font-bold uppercase tracking-wide">{data.vendorName}</h1>
              <p className="text-sm">{data.vendorAddress} | Telp: {data.vendorPhone}</p>
           </div>

           <div className="text-center mb-8">
              <h2 className="text-lg font-bold underline uppercase">SURAT JAMINAN GARANSI</h2>
              <p className="text-sm font-bold">Nomor: {data.warrantyNo}</p>
           </div>

           <div className="space-y-4 text-justify">
              <p>Yang bertanda tangan di bawah ini:</p>
              <div className="ml-4">
                 <table className="w-full text-sm">
                    <tbody>
                       <tr><td className="w-32 font-bold">Nama Perusahaan</td><td>: {data.vendorName}</td></tr>
                       <tr><td className="font-bold">Alamat</td><td>: {data.vendorAddress}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p>Dengan ini memberikan jaminan garansi kepada:</p>
              <div className="ml-4">
                 <table className="w-full text-sm">
                    <tbody>
                       <tr><td className="w-32 font-bold">Nama Pelanggan</td><td>: {data.clientName}</td></tr>
                       <tr><td className="font-bold">Alamat</td><td>: {data.clientAddress}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p>Untuk produk/jasa:</p>
              <div className="ml-4 bg-slate-50 p-4 border border-slate-300">
                 <table className="w-full text-sm">
                    <tbody>
                       <tr><td className="w-32 font-bold">Nama Produk</td><td>: {data.productName}</td></tr>
                       <tr><td className="font-bold">Serial Number</td><td>: {data.serialNumber}</td></tr>
                       <tr><td className="font-bold">Tanggal Beli</td><td>: {isClient && data.purchaseDate ? new Date(data.purchaseDate).toLocaleDateString('id-ID', {dateStyle:'long'}) : '-'}</td></tr>
                       <tr><td className="font-bold">Masa Garansi</td><td>: {data.duration}</td></tr>
                    </tbody>
                 </table>
              </div>

              <div className="space-y-2">
                 <p className="font-bold underline text-sm">Syarat & Ketentuan:</p>
                 <p className="text-sm pl-4">{data.coverage}</p>
              </div>

              <p>Demikian surat jaminan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
           </div>

           <div className="mt-12 text-right">
              <p className="mb-20">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</p>
              <p className="font-bold underline uppercase">{data.vendorName}</p>
              <p className="text-xs font-bold">Layanan Purna Jual</p>
           </div>
        </div>
      );
    }
  };

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 overflow-x-hidden">
      
      {/* CSS PRINT FIXED */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
          .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          .print-table thead { height: 10mm; display: table-header-group; } 
          .print-table tfoot { height: 10mm; display: table-footer-group; } 
          .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
          tr, .break-inside-avoid { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Briefcase size={16} /> <span>WARRANTY EDITOR</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[160px] justify-between">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{templateId === 1 ? 'Sertifikat Gold' : 'Surat Formal'}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 font-sans ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Building2 size={14}/><h3 className="text-xs font-bold uppercase">Penerbit Garansi</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Nama Perusahaan" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.vendorAddress} onChange={e => handleDataChange('vendorAddress', e.target.value)} placeholder="Alamat Lengkap" />
              <input className="w-full p-2 border rounded text-xs" value={data.vendorPhone} onChange={e => handleDataChange('vendorPhone', e.target.value)} placeholder="No. Telepon" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><UserCircle2 size={14}/><h3 className="text-xs font-bold uppercase">Pelanggan</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} placeholder="Nama Pelanggan" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.clientAddress} onChange={e => handleDataChange('clientAddress', e.target.value)} placeholder="Alamat Pelanggan" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><FileText size={14}/><h3 className="text-xs font-bold uppercase">Objek Garansi</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.productName} onChange={e => handleDataChange('productName', e.target.value)} placeholder="Nama Produk/Jasa" />
              <input className="w-full p-2 border rounded text-xs font-mono" value={data.serialNumber} onChange={e => handleDataChange('serialNumber', e.target.value)} placeholder="Serial Number / ID" />
              <div className="grid grid-cols-2 gap-2">
                 <div><label className="text-[9px] font-bold">Masa Garansi</label><input className="w-full p-2 border rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} /></div>
                 <div><label className="text-[9px] font-bold">Tgl Pembelian</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.purchaseDate} onChange={e => handleDataChange('purchaseDate', e.target.value)} /></div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Settings size={14}/><h3 className="text-xs font-bold uppercase">Syarat & Ketentuan</h3></div>
              <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.coverage} onChange={e => handleDataChange('coverage', e.target.value)} placeholder="Cakupan Garansi..." />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.claimMethod} onChange={e => handleDataChange('claimMethod', e.target.value)} placeholder="Cara Klaim..." />
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed">
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                 <input className="w-full p-2 border rounded text-xs font-mono" value={data.warrantyNo} onChange={e => handleDataChange('warrantyNo', e.target.value)} placeholder="No. Dokumen" />
              </div>
           </div>
           <div className="h-20 lg:hidden"></div>
        </div>

        {/* --- PREVIEW AREA --- */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-0 md:p-8 overflow-y-auto overflow-x-auto h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full max-w-full flex justify-center items-start pt-4 md:pt-0 min-w-[210mm] md:min-w-0">
             <div className="relative origin-top-left md:origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-0 shadow-2xl">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                  <WarrantyContent />
                </div>
             </div>
           </div>
        </div>

      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-[100] h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
            <WarrantyContent />
         </div>
      </div>

    </div>
  );
}
