'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Eye, LayoutTemplate, ShieldCheck, Award, Clock, Settings, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
  warrantyNo: 'GAR/2026/01/0045',
  
  vendorName: 'CV. TEKNO MANDIRI SEJAHTERA',
  vendorAddress: 'Ruko Permata Blok B2 No. 10, Jakarta Selatan',
  vendorPhone: '021-55566677',

  clientName: 'PT. SINAR JAYA ABADI',
  clientAddress: 'Jl. Sudirman Kav 45-46, Jakarta Pusat',
  
  productName: 'Unit Server Rackmount PowerEdge R750',
  serialNumber: 'SN-7890-XYZ-2026',
  purchaseDate: '', 
  
  duration: '12 Bulan (1 Tahun)',
  coverage: 'Kerusakan pada komponen internal (Hardware) dan jasa perbaikan. Tidak termasuk kerusakan akibat kelalaian penggunaan, bencana alam, atau modifikasi pihak ketiga.',
  claimMethod: 'Menghubungi layanan pelanggan kami dan melampirkan kartu garansi asli beserta bukti pembelian.'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-sans leading-snug text-[10pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratJaminanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Garansi...</div>}>
      <WarrantyBuilder />
    </Suspense>
  );
}

function WarrantyBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<WarrantyData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: prev.date || today,
        purchaseDate: prev.purchaseDate || today 
    }));
  }, []);

  const handleDataChange = (field: keyof WarrantyData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, purchaseDate: today });
    }
  };

  const formatDateSafe = (dateString: string) => {
    if(!dateString) return '...';
    try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle:'long'});
    } catch { return dateString; }
  };

  const DocumentContent = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: SERTIFIKAT (GOLD) ---
      return (
        <Kertas className="border-8 border-double border-amber-200">
           {/* HEADER */}
           <div className="flex justify-between items-center border-b-2 border-slate-900 pb-6 mb-8 shrink-0 break-inside-avoid">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-900 rounded-lg text-white">
                   <Award size={32} />
                </div>
                <div>
                   <h1 className="text-xl font-black uppercase tracking-tighter leading-none text-slate-900">{data.vendorName}</h1>
                   <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Quality Assurance & Warranty</p>
                </div>
             </div>
             <div className="text-right">
                <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded text-[10px] font-black uppercase inline-block border border-amber-200">Official Warranty</div>
                <p className="text-[10px] mt-1 font-mono text-slate-600">No: {data.warrantyNo}</p>
             </div>
           </div>

           <div className="text-center mb-10 shrink-0 break-inside-avoid">
             <h2 className="text-3xl font-black uppercase tracking-widest text-amber-600 font-serif">SERTIFIKAT GARANSI</h2>
             <div className="w-32 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
           </div>

           <div className="space-y-6 flex-grow font-serif text-[11pt] leading-relaxed px-4 text-slate-800">
             <p className="text-justify break-inside-avoid">Dengan ini <b>{data.vendorName}</b> memberikan jaminan kualitas dan layanan purnajual kepada pelanggan kami:</p>
             
             <div className="ml-6 space-y-1 border-l-4 border-amber-200 pl-4 py-2 break-inside-avoid">
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Pelanggan</span><span>:</span><span className="font-bold uppercase">{data.clientName}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.clientAddress}</span></div>
             </div>

             <p className="break-inside-avoid">Atas pembelian produk/jasa sebagai berikut:</p>
             <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 break-inside-avoid">
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-amber-800 uppercase tracking-widest block border-b border-amber-200 pb-1">Detail Barang</label>
                      <p className="font-bold text-sm text-slate-800">{data.productName}</p>
                      <p className="text-xs font-mono text-slate-500 uppercase">S/N: {data.serialNumber}</p>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-amber-800 uppercase tracking-widest block border-b border-amber-200 pb-1">Masa Berlaku</label>
                      <p className="font-bold text-sm text-emerald-600 uppercase">{data.duration}</p>
                      <p className="text-xs text-slate-500">Mulai: {formatDateSafe(data.purchaseDate)}</p>
                   </div>
                </div>
             </div>

             <div className="space-y-4 pt-2">
                <div className="space-y-1 break-inside-avoid">
                   <h4 className="font-bold text-sm uppercase flex items-center gap-2 text-amber-700 tracking-tight"><ShieldCheck size={14}/> Lingkup Jaminan:</h4>
                   <p className="text-sm text-slate-600 italic leading-relaxed text-justify">{data.coverage}</p>
                </div>
                <div className="space-y-1 break-inside-avoid">
                   <h4 className="font-bold text-sm uppercase flex items-center gap-2 text-blue-700 tracking-tight"><Clock size={14}/> Prosedur Klaim:</h4>
                   <p className="text-sm text-slate-600 leading-relaxed text-justify">{data.claimMethod}</p>
                </div>
             </div>
           </div>

           {/* FOOTER */}
           <div className="shrink-0 mt-8 flex justify-between items-end border-t-2 border-slate-100 pt-6 px-4 break-inside-avoid">
              <div className="text-center w-48">
                 <div className="p-2 border-2 border-dashed border-slate-200 rounded-lg mb-2 opacity-50">
                    <Settings size={24} className="mx-auto text-slate-400" />
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">Stamp Area</p>
                 </div>
              </div>
              <div className="text-center w-64">
                 <p className="text-xs text-slate-500 mb-14 uppercase tracking-tighter font-bold">{data.city}, {formatDateSafe(data.date)}</p>
                 <div className="relative inline-block">
                    <p className="font-bold underline uppercase text-sm leading-none text-slate-900">{data.vendorName}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Authorized Signature</p>
                 </div>
              </div>
           </div>
        </Kertas>
      );
    } else {
      // --- TEMPLATE 2: SURAT RESMI (FORMAL) ---
      return (
        <Kertas className="font-serif">
           <div className="text-center mb-8 border-b-2 border-slate-900 pb-4 shrink-0 break-inside-avoid">
              <h1 className="text-xl font-bold uppercase tracking-wide text-slate-900">{data.vendorName}</h1>
              <p className="text-sm font-sans text-slate-700">{data.vendorAddress} | Telp: {data.vendorPhone}</p>
           </div>

           <div className="text-center mb-8 shrink-0 break-inside-avoid">
              <h2 className="text-lg font-bold underline uppercase text-slate-900">SURAT JAMINAN GARANSI</h2>
              <p className="text-sm font-bold mt-1 text-slate-700">Nomor: {data.warrantyNo}</p>
           </div>

           <div className="space-y-6 text-justify flex-grow text-[11pt] leading-relaxed text-slate-900">
              <div className="break-inside-avoid">
                <p className="mb-2">Yang bertanda tangan di bawah ini:</p>
                <div className="ml-4">
                   <table className="w-full text-sm">
                      <tbody>
                         <tr><td className="w-32 font-bold align-top">Perusahaan</td><td className="w-4 align-top">:</td><td className="font-bold">{data.vendorName}</td></tr>
                         <tr><td className="font-bold align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.vendorAddress}</td></tr>
                      </tbody>
                   </table>
                </div>
              </div>

              <div className="break-inside-avoid">
                <p className="mb-2">Dengan ini memberikan jaminan garansi penuh atas kualitas produk/jasa kepada:</p>
                <div className="ml-4">
                   <table className="w-full text-sm">
                      <tbody>
                         <tr><td className="w-32 font-bold align-top">Nama Pelanggan</td><td className="w-4 align-top">:</td><td className="font-bold uppercase">{data.clientName}</td></tr>
                         <tr><td className="font-bold align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.clientAddress}</td></tr>
                      </tbody>
                   </table>
                </div>
              </div>

              <div className="break-inside-avoid">
                <p className="mb-2">Adapun rincian barang/jasa yang dijamin adalah sebagai berikut:</p>
                <table className="w-full mt-2 border-collapse border border-slate-900 text-sm">
                   <tbody>
                     <tr><td className="border border-slate-900 p-2 font-bold w-1/3 bg-slate-100">Nama Produk/Jasa</td><td className="border border-slate-900 p-2 uppercase font-bold">{data.productName}</td></tr>
                     <tr><td className="border border-slate-900 p-2 font-bold w-1/3 bg-slate-100">Nomor Seri / S/N</td><td className="border border-slate-900 p-2 font-mono">{data.serialNumber}</td></tr>
                     <tr><td className="border border-slate-900 p-2 font-bold w-1/3 bg-slate-100">Tanggal Pembelian</td><td className="border border-slate-900 p-2">{formatDateSafe(data.purchaseDate)}</td></tr>
                     <tr><td className="border border-slate-900 p-2 font-bold w-1/3 bg-slate-100">Masa Garansi</td><td className="border border-slate-900 p-2 font-bold underline decoration-double">{data.duration}</td></tr>
                   </tbody>
                </table>
              </div>

              <div className="space-y-4 break-inside-avoid pt-2">
                 <div>
                    <p className="font-bold underline mb-1">Syarat dan Ketentuan (Lingkup Jaminan):</p>
                    <p className="italic">{data.coverage}</p>
                 </div>
                 <div>
                    <p className="font-bold underline mb-1">Prosedur Klaim Garansi:</p>
                    <p>{data.claimMethod}</p>
                 </div>
              </div>
           </div>

           <div className="shrink-0 mt-12 grid grid-cols-2 gap-8 break-inside-avoid">
              <div className="text-center w-56 flex flex-col justify-end">
                 <p className="mb-20 text-sm">Mengetahui/Menerima,</p>
                 <p className="font-bold underline uppercase text-sm leading-none">({data.clientName})</p>
                 <p className="text-[10px] mt-1 text-slate-500">Pihak Pelanggan</p>
              </div>
              <div className="text-center w-56 ml-auto flex flex-col justify-end">
                 <p className="text-sm mb-2">{data.city}, {formatDateSafe(data.date)}</p>
                 <p className="mb-14 text-sm">Pihak Penjamin,</p>
                 <p className="font-bold underline uppercase text-sm leading-none">({data.vendorName})</p>
                 <p className="text-[10px] mt-1 text-slate-500">Authorized Signature</p>
              </div>
           </div>
        </Kertas>
      );
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Garansi</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Enterprise Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
               <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors">
                  <LayoutTemplate size={16}/> {templateId === 1 ? 'Sertifikat (Gold)' : 'Surat (Formal)'}
               </button>
               {showTemplateMenu && (
                 <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-amber-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-amber-50 text-amber-700' : ''}`}>
                        <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-amber-500' : 'bg-slate-300'}`}></div> 
                        Sertifikat (Gold)
                    </button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
                        <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
                        Surat (Formal)
                    </button>
                 </div>
               )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:hidden">
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
            <div>
              <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                <Briefcase size={18} className="text-emerald-600" /> Editor Garansi
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lengkapi data sertifikat</p>
            </div>
            <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-lg transition-colors" title="Reset Formulir">
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {/* 1. Header Invoice */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">1. Detail Dokumen</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. Garansi</label>
                  <input type="text" value={data.warrantyNo} onChange={(e) => handleDataChange('warrantyNo', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tgl. Terbit</label>
                  <input type="date" value={data.date} onChange={(e) => handleDataChange('date', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kota Penerbitan</label>
                 <input type="text" value={data.city} onChange={(e) => handleDataChange('city', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            {/* 2. Pihak Penjual */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">2. Data Penjamin (Vendor)</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Perusahaan / Vendor</label>
                <input type="text" value={data.vendorName} onChange={(e) => handleDataChange('vendorName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Penjamin</label>
                <textarea value={data.vendorAddress} onChange={(e) => handleDataChange('vendorAddress', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor Telepon</label>
                 <input type="text" value={data.vendorPhone} onChange={(e) => handleDataChange('vendorPhone', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            {/* 3. Pihak Pembeli */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">3. Data Pelanggan (Client)</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Pelanggan</label>
                <input type="text" value={data.clientName} onChange={(e) => handleDataChange('clientName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Pelanggan</label>
                <textarea value={data.clientAddress} onChange={(e) => handleDataChange('clientAddress', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            {/* 4. Rincian Produk & Garansi */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">4. Rincian Barang & Garansi</h3>
              
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Produk / Barang</label>
                 <input type="text" value={data.productName} onChange={(e) => handleDataChange('productName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor Seri / SN</label>
                    <input type="text" value={data.serialNumber} onChange={(e) => handleDataChange('serialNumber', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tgl. Pembelian</label>
                    <input type="date" value={data.purchaseDate} onChange={(e) => handleDataChange('purchaseDate', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
              </div>

              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Masa Garansi</label>
                 <input type="text" value={data.duration} onChange={(e) => handleDataChange('duration', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cth: 12 Bulan / 1 Tahun" />
              </div>

              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Syarat & Ketentuan (Coverage)</label>
                 <textarea value={data.coverage} onChange={(e) => handleDataChange('coverage', e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Prosedur Klaim</label>
                 <textarea value={data.claimMethod} onChange={(e) => handleDataChange('claimMethod', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div className="pb-10"></div>
          </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Surat Garansi" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}