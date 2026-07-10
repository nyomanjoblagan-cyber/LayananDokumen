'use client';

/**
 * FILE: PengaduanKonsumenPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pengaduan Konsumen (Complaint Letter)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, MessageSquareWarning, UserCircle2, Building2, 
  ShoppingBag, AlertCircle, Edit3, Eye, X, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ComplaintData {
  city: string;
  date: string;
  
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  
  companyName: string;
  companyDepartment: string;
  companyAddress: string;
  
  orderId: string;
  purchaseDate: string;
  productName: string;
  
  complaintDetail: string;
  demand: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ComplaintData = {
  city: 'JAKARTA',
  date: '', 
  
  customerName: 'BUDI SETIAWAN',
  customerPhone: '0812-9988-7766',
  customerAddress: 'Jl. Melati No. 12, Tebet, Jakarta Selatan',
  
  companyName: 'PT. ELEKTRONIK MAJU JAYA',
  companyDepartment: 'Customer Service Manager',
  companyAddress: 'Kawasan Industri Pulogadung, Jakarta Timur',
  
  orderId: 'ORD-2026-X123',
  purchaseDate: '2026-01-02',
  productName: 'Smart TV 55 Inch - Model Ultra HD',
  
  complaintDetail: 'Layar televisi mengalami kerusakan (dead pixel) di bagian tengah setelah 2 hari pemakaian. Saya sudah mencoba menghubungi call center namun tidak mendapatkan respon yang memuaskan.',
  demand: 'Saya menuntut penggantian unit baru (replacement) atau pengembalian dana penuh (refund) sesuai dengan kartu garansi yang berlaku.'
};

// --- 3. KOMPONEN UTAMA ---
export default function PengaduanKonsumenPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <ComplaintBuilder />
    </Suspense>
  );
}

function ComplaintBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ComplaintData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ComplaintData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const ComplaintContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle: 'long'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* HEADER TANGGAL */}
        <div className="text-right mb-8 font-sans text-[10pt] shrink-0">
           {data.city}, {formatDateSafe(data.date)}
        </div>

        {/* TUJUAN */}
        <div className="mb-8 leading-tight shrink-0">
           <p>Kepada Yth,</p>
           <p className="font-bold">{data.companyDepartment}</p>
           <p className="font-bold uppercase">{data.companyName}</p>
           <p className="italic text-slate-500 print:text-black text-[10pt]">{data.companyAddress}</p>
        </div>

        {/* PERIHAL */}
        <div className="mb-8 shrink-0">
           <p className="font-bold uppercase border-b-2 border-slate-900 inline-block tracking-tight">Surat Pengaduan Konsumen Resmi</p>
        </div>

        {/* ISI SURAT */}
        <div className="space-y-6 leading-relaxed flex-grow">
          <p>Dengan hormat,</p>
          <p>Saya yang bertanda tangan di bawah ini:</p>
          
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 print:border-slate-300 break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.customerName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>No. Telepon</span><span>:</span><span>{data.customerPhone}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.customerAddress}</span></div>
          </div>

          <p className="text-justify">Melalui surat ini, saya ingin menyampaikan keluhan resmi terkait produk yang saya beli dengan rincian sebagai berikut:</p>
          
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] print:bg-transparent print:border-black break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr] gap-y-1">
                <span>ID Pesanan / Invoice</span><span>:</span><span className="font-mono font-bold">{data.orderId}</span>
                <span>Nama Produk</span><span>:</span><span className="font-bold text-slate-700">{data.productName}</span>
                <span>Tanggal Pembelian</span><span>:</span><span>{formatDateSafe(data.purchaseDate)}</span>
              </div>
          </div>

          <div className="space-y-4">
              <div className="break-inside-avoid">
                <h4 className="font-bold text-[10pt] uppercase flex items-center gap-2 mb-2 text-slate-500">
                  <AlertCircle size={14} className="text-red-500" /> Detail Permasalahan:
                </h4>
                <p className="text-justify italic text-slate-800 bg-slate-50/50 p-3 rounded-lg border-l-2 border-slate-200 print:bg-transparent">"{data.complaintDetail}"</p>
              </div>
              
              <div className="bg-emerald-50/50 p-5 border-l-4 border-emerald-500 print:bg-transparent print:border-black break-inside-avoid">
                <h4 className="font-bold text-[10pt] uppercase text-emerald-800 mb-2 print:text-black">Solusi Yang Diharapkan:</h4>
                <p className="font-bold text-emerald-900 print:text-black leading-snug">{data.demand}</p>
              </div>
          </div>

          <p className="text-justify">Demikian surat pengaduan ini saya buat dengan harapan pihak <strong>{data.companyName}</strong> dapat segera memberikan respon dan solusi yang adil. Atas perhatiannya, saya ucapkan terima kasih.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="mt-12 flex justify-end shrink-0 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
           <div className="text-center w-64 font-sans">
              <p className="mb-20 text-[10pt] uppercase font-bold text-slate-300 print:text-black">Hormat Saya,</p>
              <p className="font-bold underline uppercase text-[11pt] font-serif">{data.customerName}</p>
           </div>
        </div>
      </div>
    );
  };

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

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <MessageSquareWarning size={16} className="text-red-400" /> <span>Complaint Builder</span>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Pengaduan</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Identitas Anda</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.customerName} onChange={e => handleDataChange('customerName', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.customerPhone} onChange={e => handleDataChange('customerPhone', e.target.value)} placeholder="No. Telepon" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.customerAddress} onChange={e => handleDataChange('customerAddress', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Target Perusahaan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Nama Perusahaan" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.companyDepartment} onChange={e => handleDataChange('companyDepartment', e.target.value)} placeholder="Divisi Tujuan" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-slate-500 outline-none" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} placeholder="Alamat Perusahaan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><ShoppingBag size={12}/> Detail Produk</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-mono" value={data.orderId} onChange={e => handleDataChange('orderId', e.target.value)} placeholder="ID Pesanan" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.purchaseDate} onChange={e => handleDataChange('purchaseDate', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-bold" value={data.productName} onChange={e => handleDataChange('productName', e.target.value)} placeholder="Nama Barang" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-red-500 outline-none leading-relaxed" value={data.complaintDetail} onChange={e => handleDataChange('complaintDetail', e.target.value)} placeholder="Jelaskan masalah produk..." />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none border-emerald-200 bg-emerald-50 text-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none font-bold" value={data.demand} onChange={e => handleDataChange('demand', e.target.value)} placeholder="Apa tuntutan Anda?" />
                 <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <ComplaintContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><ComplaintContent /></div></div>
    </div>
  );
}