'use client';

/**
 * FILE: PerintahBayarPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perintah Bayar (SPB) / Payment Order
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML & Optimasi Layout Responsif
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Banknote, Building2, LayoutTemplate, 
  ChevronDown, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI (Pastikan file ini ada di path tersebut)
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PaymentData {
  city: string;
  date: string;
  docNo: string;
  companyName: string;
  companyAddress: string;
  recipientName: string;
  recipientBank: string;
  recipientAccount: string;
  amount: number;
  amountText: string;
  purpose: string;
  approverName: string;
  approverJob: string;
  treasurerName: string;
  treasurerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PaymentData = {
  city: 'JAKARTA',
  date: '',
  docNo: 'SPB/001/I/2026',
  companyName: 'PT. DINAMIKA CIPTA MANDIRI',
  companyAddress: 'Gedung Office 8, Lantai 12, Senopati, Jakarta Selatan',
  recipientName: 'RIZKY RAMADHAN',
  recipientBank: 'Bank Central Asia (BCA)',
  recipientAccount: '123-456-7890',
  amount: 15500000,
  amountText: 'Lima Belas Juta Lima Ratus Ribu Rupiah',
  purpose: 'Pembayaran tagihan invoice vendor IT support periode bulan Desember 2025.',
  approverName: 'HENDRA KUSUMA',
  approverJob: 'Direktur Operasional',
  treasurerName: 'SITI AMINAH',
  treasurerJob: 'Bendahara Keuangan'
};

export default function PerintahBayarPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 text-xs bg-slate-50 uppercase tracking-widest font-bold">Memuat Editor...</div>}>
      <PaymentOrderBuilder />
    </Suspense>
  );
}

function PaymentOrderBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PaymentData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PaymentData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto font-sans text-[10.5pt]">
      
      {/* HEADER / KOP */}
      <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="p-3 bg-slate-900 text-white rounded-lg shrink-0 print:border-2 print:border-black print:text-black print:bg-transparent">
          <Building2 size={32} />
        </div>
        <div className="text-left flex-grow">
           <h1 className="text-xl font-black uppercase tracking-tighter leading-none text-slate-900">{data.companyName}</h1>
           <p className="text-[9pt] mt-1 text-slate-500 print:text-black italic leading-tight">{data.companyAddress}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-8 tracking-widest text-slate-900">SURAT PERINTAH BAYAR (SPB)</h2>
        <p className="text-[10pt] mt-4 font-mono font-bold text-slate-400 print:text-black">Nomor: {data.docNo}</p>
      </div>

      {/* BODY */}
      <div className="space-y-8 flex-grow overflow-visible text-left leading-relaxed">
        <div className="font-medium">
            <p>Kepada Yth.</p>
            <p className="font-black text-lg uppercase tracking-tight">{data.treasurerName}</p>
            <p className="text-slate-500 print:text-black">{data.treasurerJob}</p>
        </div>

        <p>Dengan hormat, harap segera melakukan pembayaran dana tunai/transfer dengan rincian instruksi sebagai berikut:</p>
        
        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 space-y-4 print:bg-transparent print:border-2 print:border-black break-inside-avoid">
           <div className="grid grid-cols-[160px_10px_1fr]">
              <span className="font-bold text-slate-400 uppercase text-[8px] tracking-widest">Penerima Dana</span>
              <span>:</span>
              <span className="font-black uppercase text-slate-900 text-[11pt] tracking-tight">{data.recipientName}</span>
           </div>
           <div className="grid grid-cols-[160px_10px_1fr] items-center">
              <span className="font-bold text-slate-400 uppercase text-[8px] tracking-widest">Nominal</span>
              <span>:</span>
              <span className="font-black text-2xl text-emerald-700 print:text-black leading-none">{formatRupiah(data.amount)}</span>
           </div>
           <div className="grid grid-cols-[160px_10px_1fr] italic text-[10pt] text-slate-600 print:text-black border-t border-slate-200 print:border-black pt-3">
              <span className="not-italic font-bold text-slate-400 uppercase text-[8px] tracking-widest">Terbilang</span>
              <span>:</span>
              <span className="font-bold uppercase tracking-tighter"># {data.amountText} #</span>
           </div>
           <div className="pt-3 border-t border-dashed border-slate-200 print:border-black text-[9.5pt]">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Bank Tujuan</span><span>:</span><span className="font-bold">{data.recipientBank}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor Rekening</span><span>:</span><span className="font-mono font-black text-blue-700 print:text-black">{data.recipientAccount}</span></div>
           </div>
        </div>

        <div className="space-y-3">
           <h4 className="font-black text-[8px] uppercase tracking-[0.3em] text-slate-400">Tujuan Penggunaan Dana:</h4>
           <div className="text-[10.5pt] bg-amber-50 p-5 rounded-2xl border-l-4 border-amber-400 italic text-slate-800 print:bg-transparent print:border-2 print:border-black leading-relaxed">
              "{data.purpose}"
           </div>
        </div>
      </div>

      {/* FOOTER / TTD */}
      <div className="mt-12 pt-8 border-t-2 border-slate-50 print:border-black break-inside-avoid">
         <div className="grid grid-cols-2 gap-10 text-center font-sans">
            <div className="flex flex-col h-44">
               <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest mb-1">Disetujui Oleh,</p>
               <div className="mt-auto">
                  <p className="font-black underline uppercase tracking-tight leading-none text-[11pt] text-slate-900">{data.approverName}</p>
                  <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-tighter">{data.approverJob}</p>
               </div>
            </div>
            <div className="flex flex-col h-44">
               <p className="text-[10pt] font-bold text-slate-400 mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest mb-1">Bendahara,</p>
               <div className="mt-auto">
                  <p className="font-black underline uppercase tracking-tight leading-none text-[11pt] text-slate-900">{data.treasurerName}</p>
                  <p className="text-[9pt] font-bold text-emerald-600 mt-1 uppercase tracking-tighter italic">Pelaksana Bayar</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase text-xs">
            <ArrowLeftCircle size={20} className="text-emerald-400" /> Dashboard
          </Link>
          <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
          <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase italic tracking-tighter">
            <Banknote size={18} /> <span>Payment Order Builder</span>
          </div>
        </div>
        <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
          <Printer size={16}/> Cetak SPB
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
                <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2">
                  <Edit3 size={16} className="text-blue-500" /> Editor Keuangan
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32">
                <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                  <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2">
                    <Building2 size={12}/> Info Instansi
                  </h3>
                  <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Nama Perusahaan" />
                  <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} placeholder="Alamat Kantor" />
                  <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                  <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2">
                    <Banknote size={12}/> Detail Pembayaran
                  </h3>
                  <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientName} onChange={e => handleDataChange('recipientName', e.target.value)} placeholder="Nama Penerima Dana" />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs font-black focus:ring-2 focus:ring-emerald-500 outline-none" type="number" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} placeholder="Nominal Rp" />
                    <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientBank} onChange={e => handleDataChange('recipientBank', e.target.value)} placeholder="Nama Bank" />
                  </div>
                  <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientAccount} onChange={e => handleDataChange('recipientAccount', e.target.value)} placeholder="Nomor Rekening" />
                  <textarea className="w-full p-2 border rounded-lg text-xs h-24 focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Keperluan Pembayaran..." />
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2">
                    <ChevronDown size={12}/> Otoritas Penanda Tangan
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.approverName} onChange={e => handleDataChange('approverName', e.target.value)} placeholder="Penyetuju" />
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.treasurerName} onChange={e => handleDataChange('treasurerName', e.target.value)} placeholder="Bendahara" />
                  </div>
                </div>
            </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl z-50 font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      {/* HIDDEN PRINT TARGET */}
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden">
        <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}