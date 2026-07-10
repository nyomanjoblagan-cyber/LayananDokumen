'use client';

/**
 * FILE: SewaKendaraanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Sewa Kendaraan (Rental Agreement)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Car, Building2, UserCircle2, 
  MapPin, LayoutTemplate, ChevronDown, X, PenTool, ShieldCheck, Key, FileWarning,
  Edit3, Eye, Check, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RentalData {
  city: string;
  date: string;
  docNo: string;
  
  // PIHAK PERTAMA (PEMILIK)
  ownerName: string;
  ownerNik: string;
  ownerAddress: string;
  
  // PIHAK KEDUA (PENYEWA)
  renterName: string;
  renterNik: string;
  renterAddress: string;
  
  // KENDARAAN
  vehicleModel: string;
  plateNumber: string;
  frameNumber: string;
  engineNumber: string;
  
  // KETENTUAN
  rentalDuration: string;
  startDate: string;
  endDate: string;
  rentalPrice: string;
  totalPrice: string;
  fineRate: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RentalData = {
  city: 'DENPASAR',
  date: '', 
  docNo: 'RENT/2026/01/007',
  
  ownerName: 'I MADE WIGUNA',
  ownerNik: '5171010101880001',
  ownerAddress: 'Jl. Sunset Road No. 88, Kuta, Bali',
  
  renterName: 'JOHN DOE',
  renterNik: '3172020202950003',
  renterAddress: 'Villa Seminyak, No. 12A, Badung, Bali',
  
  vehicleModel: 'TOYOTA AVANZA VELOZ 2024',
  plateNumber: 'DK 1234 AB',
  frameNumber: 'MHFW123456789',
  engineNumber: '1NR-FE12345',
  
  rentalDuration: '3 (Tiga) Hari',
  startDate: '2026-01-10',
  endDate: '2026-01-13',
  
  rentalPrice: 'Rp 450.000,- / Hari',
  totalPrice: 'Rp 1.350.000,-',
  fineRate: 'Rp 50.000,- / Jam (Keterlambatan)'
};

export default function SewaKendaraanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor Perjanjian...</div>}>
      <VehicleRentalBuilder />
    </Suspense>
  );
}

function VehicleRentalBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RentalData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof RentalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Klasik (Legal)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Modern (Clean)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Klasik' : 'Format Modern';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
        
        {/* JUDUL */}
        <div className="text-center mb-6 shrink-0 leading-tight">
          <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-8 tracking-widest">SURAT PERJANJIAN SEWA KENDARAAN</h2>
          <p className="text-[9pt] font-sans mt-3 italic uppercase tracking-widest text-slate-400 print:text-black">Nomor Register: {data.docNo}</p>
        </div>

        {/* ISI SURAT */}
        <div className="space-y-4 flex-grow text-justify overflow-hidden leading-relaxed">
          <p>Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong>, yang bertempat di {data.city}, kami yang bertanda tangan di bawah ini sepakat mengadakan perjanjian sewa menyewa:</p>
          
          <div className="space-y-4 break-inside-avoid">
              <div className="flex gap-4">
                  <span className="w-5 font-black text-slate-200 print:text-black">01.</span>
                  <div className="flex-grow border-l-4 border-slate-100 pl-4 py-1">
                      <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight text-slate-900">{data.ownerName}</span></div>
                      <div className="grid grid-cols-[130px_10px_1fr]"><span>NIK / KTP</span><span>:</span><span className="font-mono">{data.ownerNik}</span></div>
                      <div className="grid grid-cols-[130px_10px_1fr]"><span>Alamat Domisili</span><span>:</span><span className="leading-snug">{data.ownerAddress}</span></div>
                      <p className="mt-2 font-black text-[8px] uppercase tracking-widest text-blue-600">Pihak Pertama (Pemilik)</p>
                  </div>
              </div>

              <div className="flex gap-4">
                  <span className="w-5 font-black text-slate-200 print:text-black">02.</span>
                  <div className="flex-grow border-l-4 border-slate-100 pl-4 py-1">
                      <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight text-slate-900">{data.renterName}</span></div>
                      <div className="grid grid-cols-[130px_10px_1fr]"><span>NIK / KTP</span><span>:</span><span className="font-mono">{data.renterNik}</span></div>
                      <div className="grid grid-cols-[130px_10px_1fr]"><span>Alamat Domisili</span><span>:</span><span className="leading-snug">{data.renterAddress}</span></div>
                      <p className="mt-2 font-black text-[8px] uppercase tracking-widest text-emerald-600">Pihak Kedua (Penyewa)</p>
                  </div>
              </div>
          </div>

          <p>Kedua belah pihak telah sepakat untuk melakukan transaksi sewa menyewa satu unit kendaraan dengan identitas fisik sebagai berikut:</p>
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 font-sans text-[9.5pt] grid grid-cols-2 gap-x-10 gap-y-2 print:bg-transparent print:border-black break-inside-avoid">
              <div className="flex justify-between border-b border-slate-200 print:border-black pb-1"><span className="text-slate-400 font-bold uppercase text-[8px]">Merk / Tipe</span><span className="font-black text-slate-900">{data.vehicleModel}</span></div>
              <div className="flex justify-between border-b border-slate-200 print:border-black pb-1"><span className="text-slate-400 font-bold uppercase text-[8px]">No. Polisi</span><span className="font-black text-blue-700 print:text-black">{data.plateNumber}</span></div>
              <div className="flex justify-between border-b border-slate-200 print:border-black pb-1"><span className="text-slate-400 font-bold uppercase text-[8px]">No. Rangka</span><span className="font-mono">{data.frameNumber}</span></div>
              <div className="flex justify-between border-b border-slate-200 print:border-black pb-1"><span className="text-slate-400 font-bold uppercase text-[8px]">No. Mesin</span><span className="font-mono">{data.engineNumber}</span></div>
          </div>

          <div className="space-y-4 pt-2">
              <div className="break-inside-avoid">
                <p className="font-black text-[9pt] uppercase tracking-widest border-b-2 border-slate-100 inline-block mb-1">Pasal 1: Durasi & Kompensasi</p>
                <p>Pihak Kedua menyewa kendaraan tersebut selama <strong>{data.rentalDuration}</strong> terhitung mulai tanggal <strong>{formatDateSafe(data.startDate)}</strong> sampai dengan <strong>{formatDateSafe(data.endDate)}</strong>. Adapun total biaya sewa yang telah disepakati adalah sebesar <strong>{data.totalPrice}</strong> ({data.rentalPrice}).</p>
              </div>
              <div className="break-inside-avoid">
                <p className="font-black text-[9pt] uppercase tracking-widest border-b-2 border-slate-100 inline-block mb-1">Pasal 2: Kerusakan & Kehilangan</p>
                <p>Pihak Kedua bertanggung jawab penuh secara hukum dan finansial atas segala bentuk kerusakan (fisik/mesin), kecelakaan, kehilangan unit, atau pelanggaran lalu lintas (E-TLE) yang terjadi selama masa sewa tersebut di atas.</p>
              </div>
              <div className="break-inside-avoid">
                <p className="font-black text-[9pt] uppercase tracking-widest border-b-2 border-slate-100 inline-block mb-1">Pasal 3: Keterlambatan</p>
                <p>Apabila terjadi keterlambatan dalam pengembalian unit, Pihak Kedua bersedia dikenakan denda administratif sebesar <strong>{data.fineRate}</strong> sesuai ketentuan pemilik.</p>
              </div>
          </div>
          
          <p className="pt-2">Demikian surat perjanjian ini dibuat dengan sebenar-benarnya tanpa paksaan dari pihak manapun untuk dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-8 pt-8 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="grid grid-cols-2 gap-10 text-center font-sans">
              <div className="flex flex-col h-44">
                  <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-1">Pihak Pertama,</p>
                  <p className="uppercase text-[7pt] font-bold text-slate-400 mb-8 italic">(Pemilik Kendaraan)</p>
                  <div className="mt-auto">
                     <p className="font-black underline uppercase text-[10.5pt] tracking-tight text-slate-900 leading-none">{data.ownerName}</p>
                  </div>
              </div>

              <div className="flex flex-col h-44">
                  <p className="text-[10pt] font-bold text-slate-400 mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                  <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-1">Pihak Kedua,</p>
                  <div className="mt-auto flex flex-col items-center">
                     <div className="border border-slate-200 w-24 h-12 flex items-center justify-center text-[7pt] text-slate-300 italic mb-2 uppercase">Materai</div>
                     <p className="font-black underline uppercase text-[10.5pt] tracking-tight text-slate-900 leading-none">{data.renterName}</p>
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
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Car size={16} /> <span>Vehicle Rental Agreement Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Perjanjian</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Sewa</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Key size={12}/> Pihak I (Pemilik)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Pemilik Kendaraan" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} placeholder="NIK Pemilik" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} placeholder="Alamat Lengkap Pemilik" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Pihak II (Penyewa)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.renterName} onChange={e => handleDataChange('renterName', e.target.value)} placeholder="Nama Penyewa" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.renterNik} onChange={e => handleDataChange('renterNik', e.target.value)} placeholder="NIK Penyewa" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.renterAddress} onChange={e => handleDataChange('renterAddress', e.target.value)} placeholder="Alamat Penyewa" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><Car size={12}/> Kendaraan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-red-500 outline-none" value={data.vehicleModel} onChange={e => handleDataChange('vehicleModel', e.target.value)} placeholder="Merk & Tipe Kendaraan" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-black uppercase" value={data.plateNumber} onChange={e => handleDataChange('plateNumber', e.target.value)} placeholder="No. Polisi" />
                    <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-red-500 outline-none font-mono uppercase" value={data.frameNumber} onChange={e => handleDataChange('frameNumber', e.target.value)} placeholder="No. Rangka" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileWarning size={12}/> Ketentuan Sewa</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400">TGL MULAI</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400">TGL SELESAI</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.totalPrice} onChange={e => handleDataChange('totalPrice', e.target.value)} placeholder="Total Biaya" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota TTD" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-amber-500 outline-none font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
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