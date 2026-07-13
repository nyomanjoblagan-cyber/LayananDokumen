'use client';

/**
 * FILE: IMBSederhanaPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan IMB Sederhana / Ijin Bangunan Desa
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Home, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, Ruler,
  Edit3, Eye, Briefcase, RotateCcw, ChevronDown, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface IMBData {
  city: string;
  date: string;
  docNo: string;
  
  // Instansi
  issuerOffice: string;
  villageHead: string;
  villageJob: string;

  // Data Pemilik
  ownerName: string;
  ownerNik: string;
  ownerAddress: string;

  // Data Bangunan
  buildingType: string;
  buildingLocation: string;
  landArea: string;
  buildingArea: string;
  landStatus: string;
  
  purpose: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IMBData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  docNo: '640/021/DPP/I/2026',
  
  issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
  villageHead: 'I NYOMAN GEDE, S.E.',
  villageJob: 'Perbekel Pemecutan Kaja',

  ownerName: 'BAGUS RAMADHAN',
  ownerNik: '5171010101990001',
  ownerAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

  buildingType: 'Rumah Tinggal (Permanen)',
  buildingLocation: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  landArea: '150 m2',
  buildingArea: '80 m2',
  landStatus: 'Sertifikat Hak Milik (SHM) No. 442',
  
  purpose: 'Sebagai syarat administrasi permohonan PBG/IMB Hunian Sederhana.'
};

// --- 3. KOMPONEN UTAMA ---
export default function IMBSederhanaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat IMB...</div>}>
      <IMBBuilder />
    </Suspense>
  );
}

function IMBBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IMBData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof IMBData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-0 text-slate-900 font-serif text-[11pt]" 
           style={{ width: '210mm', minHeight: '297mm' }}>
        
        {/* KOP SURAT */}
        <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
          <div className="flex items-center gap-6 w-full px-4 text-center">
             <div className="flex-grow">
                <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase tracking-tighter italic">
                   {data.issuerOffice}
                </div>
             </div>
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-10 shrink-0">
          <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT KETERANGAN IJIN BANGUNAN</h2>
          <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow leading-relaxed text-justify overflow-hidden">
          <p className="mb-4">Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
          
          <div className="ml-8 mb-6 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.ownerName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.ownerNik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Pemilik</span><span>:</span><span>{data.ownerAddress}</span></div>
          </div>

          <p className="mb-4">Bahwa yang bersangkutan berencana membangun/merenovasi bangunan dengan spesifikasi sebagai berikut:</p>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6 space-y-1 break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Jenis Bangunan</span><span>:</span><span className="font-bold">{data.buildingType}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Lokasi Bangunan</span><span>:</span><span>{data.buildingLocation}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Luas Tanah</span><span>:</span><span>{data.landArea}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Luas Bangunan</span><span>:</span><span>{data.buildingArea}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Status Tanah</span><span>:</span><span className="italic">{data.landStatus}</span></div>
          </div>

          <p className="mb-6 break-inside-avoid">
            Berdasarkan tinjauan kami, lokasi tersebut tidak dalam sengketa dan pembangunannya tidak mengganggu ketertiban umum. Surat keterangan ini diberikan untuk digunakan sebagai <b>{data.purpose}</b>.
          </p>

          <p className="break-inside-avoid">Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN SIMETRIS */}
        <div className="shrink-0 mt-10" style={{ pageBreakInside: 'avoid' }}>
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                <td className="text-center align-top">
                  <div className="h-6 mb-2"></div>
                  <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20">Pemilik Bangunan,</p>
                  <p className="font-bold underline uppercase text-[10.5pt]">({data.ownerName})</p>
                </td>
                <td className="text-center align-top">
                  <p className="text-[10.5pt] font-bold h-6 mb-2 uppercase">{data.city}, {formatDateSafe(data.date)}</p>
                  <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20">{data.villageJob},</p>
                  <p className="font-bold underline uppercase text-[10.5pt]">{data.villageHead}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT - FIXED TypeScript 2322 */}
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
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Home size={16} className="text-blue-400" /> <span className="uppercase tracking-tighter">IMB Creator</span>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
            <Printer size={16} /> <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full md:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans">
                <h2 className="font-bold text-slate-700 flex items-center gap-2 text-xs uppercase tracking-widest"><Edit3 size={16} /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar font-sans print:block print:overflow-visible print:bg-white">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><Building2 size={14} className="text-blue-500"/><h3 className="text-xs font-bold uppercase text-slate-700 tracking-tight">Instansi / Desa</h3></div>
                 <div className="space-y-3">
                    <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} placeholder="Kop Surat" />
                    <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
                    <div className="grid grid-cols-2 gap-3">
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.villageJob} onChange={e => handleDataChange('villageJob', e.target.value)} placeholder="Jabatan Pejabat" />
                        <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Pejabat" />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><UserCircle2 size={14} className="text-blue-500"/><h3 className="text-xs font-bold uppercase text-slate-700 tracking-tight">Data Pemilik</h3></div>
                 <div className="space-y-3">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Pemilik" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} />
                    <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none" placeholder="NIK" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} />
                    <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed" placeholder="Alamat Pemilik" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><Ruler size={14} className="text-emerald-500"/><h3 className="text-xs font-bold uppercase text-slate-700 tracking-tight">Spesifikasi Bangunan</h3></div>
                 <div className="space-y-3">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingType} onChange={e => handleDataChange('buildingType', e.target.value)} placeholder="Jenis Bangunan" />
                    <textarea className="w-full p-2 border rounded-lg text-xs h-12 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingLocation} onChange={e => handleDataChange('buildingLocation', e.target.value)} placeholder="Lokasi Bangunan" />
                    <div className="grid grid-cols-2 gap-3">
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Luas Tanah" />
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingArea} onChange={e => handleDataChange('buildingArea', e.target.value)} placeholder="Luas Bangunan" />
                    </div>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none italic" value={data.landStatus} onChange={e => handleDataChange('landStatus', e.target.value)} placeholder="Status Tanah" />
                    <div className="grid grid-cols-2 gap-3">
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                    <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Surat" />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 relative overflow-hidden flex flex-col items-center p-0 md:p-8 overflow-y-auto ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}