'use client';

/**
 * FILE: PengaduanKonsumenPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pengaduan Konsumen (Complaint Letter)
 * FEATURES:
 * - Single Formal Template (Professional Complaint)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, MessageSquareWarning, UserCircle2, Building2, 
  ShoppingBag, AlertCircle, Edit3, Eye, X, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
  date: '', // Diisi useEffect
  
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const ComplaintContent = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      {/* HEADER TANGGAL */}
      <div className="text-right mb-8 font-sans text-[10pt] shrink-0">
         {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}
      </div>

      {/* TUJUAN */}
      <div className="mb-8 leading-tight shrink-0">
         <p>Kepada Yth,</p>
         <p className="font-bold">{data.companyDepartment}</p>
         <p className="font-bold uppercase">{data.companyName}</p>
         <p className="italic text-slate-600 print:text-black text-[10pt]">{data.companyAddress}</p>
      </div>

      {/* PERIHAL */}
      <div className="mb-8 shrink-0">
         <p className="font-bold uppercase border-b-2 border-black inline-block">Surat Pengaduan Konsumen</p>
      </div>

      {/* ISI SURAT */}
      <div className="space-y-5 leading-relaxed flex-grow">
        <p>Dengan hormat,</p>
        <p>Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 py-1 print:border-slate-300">
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.customerName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>No. Telepon</span><span>:</span><span>{data.customerPhone}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.customerAddress}</span></div>
        </div>

        <p className="text-justify">Menyampaikan keluhan resmi terkait pembelian produk dengan rincian:</p>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-sans text-[9.5pt] print:bg-transparent print:border-black">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>ID Pesanan</span><span>:</span><span className="font-mono">{data.orderId}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Produk</span><span>:</span><span className="font-bold">{data.productName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Tgl Pembelian</span><span>:</span><span>{isClient && data.purchaseDate ? new Date(data.purchaseDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</span></div>
        </div>

        <div className="space-y-4">
            <div>
              <h4 className="font-bold text-[10pt] uppercase flex items-center gap-2 mb-1">Detail Permasalahan:</h4>
              <p className="text-justify italic text-slate-700 print:text-black">"{data.complaintDetail}"</p>
            </div>
            
            <div className="bg-emerald-50/50 p-4 border-l-4 border-emerald-500 print:bg-transparent print:border-black">
              <h4 className="font-bold text-[10pt] uppercase text-emerald-800 mb-1 print:text-black">Tuntutan Saya:</h4>
              <p className="font-bold text-emerald-900 print:text-black leading-snug">{data.demand}</p>
            </div>
        </div>

        <p className="text-justify pt-2">Demikian surat ini saya sampaikan dengan harapan mendapatkan solusi terbaik. Atas perhatiannya, saya ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-12 flex justify-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
         <div className="text-center w-64">
            <p className="mb-20 text-[10pt] uppercase font-bold text-slate-400 print:text-black">Hormat Saya,</p>
            <p className="font-bold underline uppercase text-[11pt]">{data.customerName}</p>
         </div>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400 uppercase tracking-widest text-xs">Initializing...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <MessageSquareWarning size={16} className="text-red-400" /> <span>Complaint Builder</span>
            </div>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
            <Printer size={16} /> <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pengaduan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Pengadu</h3>
                 <input className="w-full p-2 border rounded text-xs" value={data.customerName} onChange={e => handleDataChange('customerName', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded text-xs" value={data.customerPhone} onChange={e => handleDataChange('customerPhone', e.target.value)} placeholder="No. Telepon" />
                 <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.customerAddress} onChange={e => handleDataChange('customerAddress', e.target.value)} placeholder="Alamat Lengkap" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Perusahaan Tujuan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Nama Perusahaan" />
                 <input className="w-full p-2 border rounded text-xs" value={data.companyDepartment} onChange={e => handleDataChange('companyDepartment', e.target.value)} placeholder="Divisi (Cth: Customer Service)" />
                 <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} placeholder="Alamat Perusahaan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><AlertCircle size={12}/> Detail Keluhan</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.orderId} onChange={e => handleDataChange('orderId', e.target.value)} placeholder="ID Pesanan" />
                    <input className="w-full p-2 border rounded text-xs" value={data.productName} onChange={e => handleDataChange('productName', e.target.value)} placeholder="Nama Produk" />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none" value={data.complaintDetail} onChange={e => handleDataChange('complaintDetail', e.target.value)} placeholder="Deskripsikan masalahnya..." />
                 <textarea className="w-full p-2 border rounded text-xs h-16 border-emerald-200 bg-emerald-50 text-emerald-800" value={data.demand} onChange={e => handleDataChange('demand', e.target.value)} placeholder="Tuntutan (Refund/Ganti Baru)" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                    <ComplaintContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <ComplaintContent />
         </div>
      </div>

    </div>
  );
}
