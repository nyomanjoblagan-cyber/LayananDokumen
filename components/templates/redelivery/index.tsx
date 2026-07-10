'use client';

/**
 * FILE: RedeliveryPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Permohonan Pengiriman Ulang Paket (Redelivery)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Truck, MapPin, Navigation, 
  RefreshCcw, Phone, Edit3, Eye, LayoutTemplate, 
  ChevronDown, Check, Building2, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
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

export default function RedeliveryPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Loading Editor...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Formal' : 'Format Ringkas';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* JUDUL */}
        <div className="text-center mb-10 shrink-0 leading-tight">
          <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8 tracking-tight">SURAT PERMOHONAN PENGIRIMAN ULANG</h1>
          <p className="text-[9pt] font-sans mt-4 italic uppercase tracking-[0.3em] text-slate-400 print:text-black">Logistik & Distribusi Paket</p>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow space-y-6 text-left">
          <div className="leading-tight">
            <p>Kepada Yth,</p>
            <p className="font-bold text-lg uppercase tracking-tighter">Bagian Operasional / Admin {data.courierBranch}</p>
            <p>Di Tempat</p>
          </div>
          
          <p className="text-justify leading-relaxed">Melalui surat ini, saya bermaksud mengajukan permohonan pengiriman ulang (redelivery) atas kiriman paket saya yang sebelumnya gagal terkirim dengan rincian identitas sebagai berikut:</p>
          
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-blue-500 pl-6 italic py-1 break-inside-avoid">
              <div className="grid grid-cols-[150px_10px_1fr]"><span>Nomor Resi (AWB)</span><span>:</span><span className="font-mono font-bold text-blue-700">{data.awbNumber}</span></div>
              <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Penerima</span><span>:</span><span className="font-bold uppercase tracking-tight text-slate-900">{data.receiverName}</span></div>
              <div className="grid grid-cols-[150px_10px_1fr]"><span>Status Sebelumnya</span><span>:</span><span className="text-red-600 font-bold">{data.failedReason}</span></div>
          </div>

          <div>
              <p className="font-bold underline mb-3 uppercase text-[9pt] tracking-widest text-slate-400">Detail Alamat Pengiriman Ulang:</p>
              <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 font-sans text-[10pt] space-y-3 print:bg-transparent print:border-black break-inside-avoid">
                  <div className="leading-relaxed">
                    <span className="font-black text-[8px] uppercase text-slate-400 block mb-1">Destinasi Utama</span>
                    <p className="text-slate-900 font-medium">{data.receiverAddress}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 print:border-black">
                    <span className="font-black text-[8px] uppercase text-blue-500 block mb-1">Patokan / Landmark</span>
                    <p className="italic text-blue-700 font-bold print:text-black leading-snug">"{data.landmark}"</p>
                  </div>
                  <div className="grid grid-cols-[150px_10px_1fr] pt-2 border-t border-slate-200 print:border-black">
                      <span className="font-bold">No. Kontak Aktif</span><span>:</span><span className="font-black text-lg leading-none">{data.receiverPhone}</span>
                  </div>
              </div>
          </div>

          <div className="break-inside-avoid">
              <p className="font-bold underline mb-3 uppercase text-[9pt] tracking-widest text-slate-400">Instruksi Khusus Kurir:</p>
              <div className="text-slate-800 italic bg-white p-5 border-2 border-dashed border-slate-200 rounded-2xl print:border-black">
                  <p className="text-[10pt]">Waktu Pengiriman Ideal: <b className="text-emerald-700">{data.deliveryTime}</b></p>
                  <p className="mt-3 text-[10pt] leading-relaxed border-t pt-3 border-slate-100 print:border-black">
                    <span className="font-black text-[8px] uppercase not-italic text-slate-300 block mb-1">Pesan Tambahan</span>
                    "{data.specialNote}"
                  </p>
              </div>
          </div>

          <p className="text-justify leading-relaxed">Demikian permohonan ini saya sampaikan dengan harapan agar paket tersebut dapat segera sampai ke tujuan. Atas kerja samanya, saya ucapkan terima kasih.</p>
        </div>

        <div className="shrink-0 mt-10 pt-8 border-t border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <div className="grid grid-cols-2 gap-10 text-center font-sans">
            <div className="flex flex-col h-40">
                <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest mb-1">Petugas Administrasi,</p>
                <div className="mt-auto">
                   <div className="border-b-2 border-slate-200 w-3/4 mx-auto mb-1 print:border-black"></div>
                   <p className="text-[8pt] font-bold text-slate-400 uppercase">Logistik Dept.</p>
                </div>
            </div>

            <div className="flex flex-col h-40">
                <p className="text-[10pt] font-bold text-slate-400 mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest mb-1">Pemohon,</p>
                <div className="mt-auto">
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight text-slate-900 leading-none">{data.receiverName}</p>
                   <p className="text-[8pt] mt-1 italic text-slate-400">Pihak Penerima Paket</p>
                </div>
            </div>
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

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <RefreshCcw size={16} /> <span>Redelivery Request Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-blue-700 bg-blue-50' : ''}`}>Format Formal {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-blue-700 bg-blue-50' : ''}`}>Format Ringkas {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Kiriman</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Truck size={12}/> Ekspedisi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.courierBranch} onChange={e => handleDataChange('courierBranch', e.target.value)} placeholder="Nama Cabang Kurir" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} placeholder="No Resi (AWB)" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.failedReason} onChange={e => handleDataChange('failedReason', e.target.value)} placeholder="Alasan Gagal" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><MapPin size={12}/> Alamat Tujuan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} placeholder="Nama Penerima" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-bold" value={data.receiverPhone} onChange={e => handleDataChange('receiverPhone', e.target.value)} placeholder="No HP / WhatsApp" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} placeholder="Alamat Lengkap Redelivery" />
                 <input className="w-full p-2 border rounded-lg text-xs italic focus:ring-2 focus:ring-emerald-500 outline-none" value={data.landmark} onChange={e => handleDataChange('landmark', e.target.value)} placeholder="Patokan (cth: Sebelah Indomaret)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Navigation size={12}/> Instruksi Kurir</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.deliveryTime} onChange={e => handleDataChange('deliveryTime', e.target.value)} placeholder="Waktu Kirim Ideal" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.specialNote} onChange={e => handleDataChange('specialNote', e.target.value)} placeholder="Catatan Khusus (cth: Titip Security)" />
                 <div className="grid grid-cols-2 gap-3 pt-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
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
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}