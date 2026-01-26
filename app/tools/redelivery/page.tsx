'use client';

/**
 * FILE: RedeliveryPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Permohonan Pengiriman Ulang Paket (Redelivery)
 * FEATURES:
 * - Dual Template (Formal Request vs Operational Brief)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Truck, MapPin, Navigation, 
  RefreshCcw, Phone, Edit3, Eye, LayoutTemplate, 
  ChevronDown, Check, Building2, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface RedeliveryData {
  city: string;
  date: string;
  docNo: string;
  
  // Ekspedisi & Paket
  courierBranch: string;
  awbNumber: string;
  failedReason: string;
  
  // Penerima Baru
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  landmark: string;
  
  // Instruksi
  deliveryTime: string;
  specialNote: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RedeliveryData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  docNo: 'REQ/REDELIVERY/004/I/2026',
  
  courierBranch: 'J&T EXPRESS CARGO - DC DENPASAR',
  awbNumber: 'JT1234567890',
  failedReason: 'Rumah Kosong / Alamat Tidak Ditemukan',
  
  receiverName: 'MADE WIRA KUSUMA',
  receiverPhone: '0812-3456-7890',
  receiverAddress: 'Jl. Teuku Umar No. 88, Banjar Dauh Puri, Denpasar Barat',
  landmark: 'Gerbang Putih, sebelah warung makan Padang.',
  
  deliveryTime: 'Pukul 09:00 - 17:00 WITA',
  specialNote: 'Mohon hubungi nomor telepon di atas sebelum kurir berangkat menuju lokasi. Jika tidak ada di tempat, paket bisa dititipkan ke security/satpam kompleks.'
};

// --- 3. KOMPONEN UTAMA ---
export default function RedeliveryPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Loading Editor...</div>}>
      <RedeliveryBuilder />
    </Suspense>
  );
}

function RedeliveryBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RedeliveryData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof RedeliveryData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Formal
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Ringkas
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Formal' : 'Format Ringkas';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0 leading-tight">
        <h1 className="text-xl font-black underline uppercase decoration-1 underline-offset-8">SURAT PERMOHONAN PENGIRIMAN ULANG</h1>
        <p className="text-[9pt] font-sans mt-3 italic uppercase tracking-[0.2em] text-slate-500 print:text-black">Logistik & Distribusi Paket</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow space-y-6 text-left">
        <p>Kepada Yth,<br/><b>Bagian Operasional / Admin {data.courierBranch}</b><br/>Di Tempat</p>
        
        <p className="text-justify leading-relaxed">Melalui surat ini, saya bermaksud mengajukan permohonan pengiriman ulang (redelivery) atas kiriman paket saya yang sebelumnya gagal terkirim dengan rincian sebagai berikut:</p>
        
        <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-blue-100 pl-4 italic print:border-slate-300">
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Nomor Resi (AWB)</span><span>:</span><span className="font-bold">{data.awbNumber}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Penerima</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.receiverName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Alasan Gagal</span><span>:</span><span className="text-red-600 font-bold print:text-black">{data.failedReason}</span></div>
        </div>

        <div>
            <p className="font-bold underline mb-2">Detail Alamat Pengiriman Ulang:</p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] space-y-2 print:bg-transparent print:border-black">
                <p className="leading-relaxed"><b>Alamat Lengkap:</b><br/>{data.receiverAddress}</p>
                <p className="text-blue-700 italic print:text-black"><b>Patokan (Landmark):</b> {data.landmark}</p>
                <div className="grid grid-cols-[150px_10px_1fr] pt-1 border-t border-slate-200 print:border-black">
                    <span>No. Kontak</span><span>:</span><span className="font-bold">{data.receiverPhone}</span>
                </div>
            </div>
        </div>

        <div>
            <p className="font-bold underline mb-2">Instruksi Khusus Kurir:</p>
            <div className="text-slate-800 italic bg-white p-4 border-2 border-dashed border-slate-200 rounded-xl print:border-black">
                <p>Waktu Pengiriman Ideal: <b>{data.deliveryTime}</b></p>
                <p className="mt-2 text-[9.5pt] leading-relaxed">"{data.specialNote}"</p>
            </div>
        </div>

        <p className="text-justify leading-relaxed">Demikian permohonan ini saya sampaikan, besar harapan saya agar paket tersebut dapat segera dikirimkan kembali. Atas kerja samanya, saya ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="grid grid-cols-2 gap-10 text-center">
            <div className="flex flex-col h-36">
               <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Petugas (Admin),</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase italic opacity-30 text-[8pt] print:opacity-100 mb-6">(Stempel & TTD)</p>
                  <div className="border-b border-slate-300 w-3/4 mx-auto print:border-black"></div>
                  <p className="text-[8pt] mt-1">Ekspedisi Terkait</p>
               </div>
            </div>

            <div className="flex flex-col h-36">
               <p className="text-[9pt] font-bold mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Pemohon / Penerima,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.receiverName}</p>
                  <p className="text-[8pt] mt-1 italic">Pihak Penerima</p>
               </div>
            </div>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <RefreshCcw size={16} /> <span>Redelivery Request Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pengiriman</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Truck size={12}/> Info Ekspedisi</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.courierBranch} onChange={e => handleDataChange('courierBranch', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} placeholder="No Resi" />
                    <input className="w-full p-2 border rounded text-xs text-red-600 font-bold" value={data.failedReason} onChange={e => handleDataChange('failedReason', e.target.value)} placeholder="Alasan Gagal" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><MapPin size={12}/> Alamat Baru</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.receiverPhone} onChange={e => handleDataChange('receiverPhone', e.target.value)} placeholder="No HP" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} placeholder="Alamat Lengkap" />
                 <input className="w-full p-2 border rounded text-xs italic text-blue-600" value={data.landmark} onChange={e => handleDataChange('landmark', e.target.value)} placeholder="Patokan Rumah" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Navigation size={12}/> Instruksi</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.deliveryTime} onChange={e => handleDataChange('deliveryTime', e.target.value)} placeholder="Waktu Kirim" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.specialNote} onChange={e => handleDataChange('specialNote', e.target.value)} placeholder="Catatan Khusus" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-xs font-bold" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
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
                    <DocumentContent />
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
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
