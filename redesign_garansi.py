import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\garansi\index.tsx"
    
    new_content = """'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    LayoutTemplate, ShieldCheck, Briefcase, UserCircle2, Box, Settings
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
  city: 'Jakarta',
  date: '2026-07-20', 
  warrantyNo: 'GAR/2026/01/0045',
  
  vendorName: 'CV. TEKNO MANDIRI SEJAHTERA',
  vendorAddress: 'Ruko Permata Blok B2 No. 10, Jakarta Selatan',
  vendorPhone: '021-55566677',

  clientName: 'PT. SINAR JAYA ABADI',
  clientAddress: 'Jl. Sudirman Kav 45-46, Jakarta Pusat',
  
  productName: 'Unit Server Rackmount PowerEdge R750',
  serialNumber: 'SN-7890-XYZ-2026',
  purchaseDate: '2026-07-20', 
  
  duration: '12 Bulan (1 Tahun)',
  coverage: 'Kerusakan pada komponen internal (Hardware) dan jasa perbaikan. Tidak termasuk kerusakan akibat kelalaian penggunaan, bencana alam, atau modifikasi pihak ketiga.',
  claimMethod: 'Menghubungi layanan pelanggan kami dan melampirkan kartu garansi asli beserta bukti pembelian.'
};

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
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

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, purchaseDate: today });
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatDateString = (dateString: string) => {
      if(!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal (Serif)' : 'Modern Premium (Sans)';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[9999]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 1 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 2 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Modern Premium (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => {
      return (
        <Kertas templateId={templateId}>
          <div className="text-center mb-8 border-b-2 border-slate-800 pb-4">
             <h1 className="font-bold text-xl md:text-2xl uppercase tracking-wide">SERTIFIKAT GARANSI RESMI</h1>
             <p className="mt-2 text-sm tracking-widest">NO: {data.warrantyNo}</p>
          </div>

          <div className="mb-8 text-justify">
             <p>Sertifikat ini diterbitkan sebagai bukti jaminan kualitas dan perlindungan atas produk yang dibeli. Dengan ini kami menyatakan bahwa produk yang tercantum di bawah ini dilindungi oleh Garansi Resmi sesuai dengan syarat dan ketentuan yang berlaku.</p>
          </div>

          {/* INFORMASI PRODUK */}
          <div className="mb-6 border border-slate-300 p-4 break-inside-avoid relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-slate-800 text-white text-[10px] font-bold px-3 py-1 uppercase">Informasi Produk</div>
             <table className="w-full mt-3">
                 <tbody>
                     <tr><td className="w-40 py-1.5 align-top text-slate-500 text-xs font-bold uppercase tracking-wider">Nama Produk</td><td className="w-4 align-top text-slate-400">:</td><td className="py-1.5 font-bold uppercase">{data.productName}</td></tr>
                     <tr><td className="w-40 py-1.5 align-top text-slate-500 text-xs font-bold uppercase tracking-wider">Serial Number</td><td className="w-4 align-top text-slate-400">:</td><td className="py-1.5 font-mono bg-slate-100 px-2 rounded w-max inline-block">{data.serialNumber}</td></tr>
                     <tr><td className="w-40 py-1.5 align-top text-slate-500 text-xs font-bold uppercase tracking-wider">Tanggal Pembelian</td><td className="w-4 align-top text-slate-400">:</td><td className="py-1.5">{formatDateString(data.purchaseDate)}</td></tr>
                 </tbody>
             </table>
          </div>

          {/* INFORMASI PELANGGAN & VENDOR */}
          <div className="grid grid-cols-2 gap-4 mb-8 break-inside-avoid">
              <div className="border border-slate-300 p-4">
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Diberikan Kepada (Pelanggan)</p>
                  <p className="font-bold uppercase text-sm mb-1">{data.clientName}</p>
                  <p className="text-xs text-slate-700">{data.clientAddress}</p>
              </div>
              <div className="border border-slate-300 p-4 bg-slate-50">
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Diterbitkan Oleh (Vendor)</p>
                  <p className="font-bold uppercase text-sm mb-1">{data.vendorName}</p>
                  <p className="text-xs text-slate-700 mb-1">{data.vendorAddress}</p>
                  <p className="text-xs font-mono text-slate-600">Tel: {data.vendorPhone}</p>
              </div>
          </div>

          {/* KETENTUAN GARANSI */}
          <div className="mb-8 break-inside-avoid">
             <h2 className="font-bold text-sm uppercase mb-3 border-b border-slate-200 pb-1">Syarat & Ketentuan Garansi</h2>
             
             <div className="mb-4">
                 <p className="font-bold text-xs uppercase text-slate-500 mb-1">1. Masa Berlaku Garansi</p>
                 <p className="ml-4 font-bold">{data.duration} terhitung sejak Tanggal Pembelian.</p>
             </div>
             
             <div className="mb-4">
                 <p className="font-bold text-xs uppercase text-slate-500 mb-1">2. Cakupan Perlindungan</p>
                 <p className="ml-4 text-justify">{data.coverage}</p>
             </div>
             
             <div className="mb-4">
                 <p className="font-bold text-xs uppercase text-slate-500 mb-1">3. Prosedur Klaim</p>
                 <p className="ml-4 text-justify">{data.claimMethod}</p>
             </div>
          </div>

          {/* TANDA TANGAN */}
          <div className="mt-16 break-inside-avoid">
              <div className="flex justify-end text-center">
                  <div className="w-64">
                      <p className="mb-1">{data.city}, {formatDateString(data.date)}</p>
                      <p className="font-bold mb-24 uppercase">{data.vendorName}</p>
                      
                      <div className="border-t border-slate-800 pt-2 w-48 mx-auto">
                          <p className="font-bold uppercase text-xs">Authorized Signature</p>
                      </div>
                  </div>
              </div>
          </div>
          
          <div className="mt-12 text-center border-t border-dashed border-slate-300 pt-4 opacity-50">
              <p className="text-[9px] uppercase tracking-widest">Sertifikat ini sah dan mengikat apabila dilengkapi dengan bukti pembelian yang valid.</p>
          </div>
        </Kertas>
      );
  };

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
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Sertifikat Garansi</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-sky-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
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
                  <ShieldCheck size={18} className="text-sky-600" /> Editor Garansi Produk
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INFORMASI METADATA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Settings size={14} className="text-slate-600"/> Metadata Garansi
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Garansi</label>
                        <input type="text" name="warrantyNo" value={data.warrantyNo} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Terbit</label>
                        <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penerbitan</label>
                    <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                  </div>
                </div>

                {/* 2. IDENTITAS PRODUK */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Box size={14} className="text-indigo-600"/> Identitas Produk
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama / Tipe Produk</label>
                        <input type="text" name="productName" value={data.productName} onChange={handleStringChange} className="w-full bg-indigo-50 border border-indigo-200 rounded-xl p-2.5 text-sm font-bold text-indigo-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Serial Number</label>
                            <input type="text" name="serialNumber" value={data.serialNumber} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Pembelian</label>
                            <input type="date" name="purchaseDate" value={data.purchaseDate} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                          </div>
                      </div>
                  </div>
                </div>

                {/* 3. SYARAT & KETENTUAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <ShieldCheck size={14} className="text-emerald-600"/> Syarat & Ketentuan Garansi
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Berlaku (Durasi)</label>
                        <input type="text" name="duration" value={data.duration} onChange={handleStringChange} className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Cakupan Perlindungan (S&K)</label>
                        <textarea name="coverage" value={data.coverage} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-24 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Prosedur Klaim</label>
                        <textarea name="claimMethod" value={data.claimMethod} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 4. PIHAK TERLIBAT */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Briefcase size={14} className="text-amber-600"/> Vendor & Pelanggan
                  </h3>
                  <div className="space-y-6">
                      
                      <div className="space-y-4">
                          <p className="text-[10px] font-bold uppercase text-amber-600 tracking-wider">A. Vendor (Penerbit)</p>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Vendor/Toko</label>
                            <input type="text" name="vendorName" value={data.vendorName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon Vendor</label>
                            <input type="text" name="vendorPhone" value={data.vendorPhone} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Vendor</label>
                            <textarea name="vendorAddress" value={data.vendorAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"></textarea>
                          </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 space-y-4">
                          <p className="text-[10px] font-bold uppercase text-amber-600 tracking-wider">B. Klien (Pelanggan)</p>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pelanggan / Perusahaan</label>
                            <input type="text" name="clientName" value={data.clientName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Pelanggan</label>
                            <textarea name="clientAddress" value={data.clientAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"></textarea>
                          </div>
                      </div>

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
              <PrintWrapper documentName="Sertifikat Garansi Resmi" price={10000} />
           </div>

        </div>
      </main>
    </div>
  );
}
"""
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
