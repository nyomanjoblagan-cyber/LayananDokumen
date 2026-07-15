'use client';

/**
 * FILE: IMBSederhanaPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - DPMPTSP FORMAT)
 * DESC: Generator Surat Permohonan IMB/PBG Resmi untuk DPMPTSP
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Home, Building2, UserCircle2, 
  Ruler, Edit3, Eye, RotateCcw, ArrowLeftCircle,
  FileText
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface IMBData {
  city: string;
  date: string;
  
  // Tujuan
  dpmptspName: string;
  
  // Data Pemohon
  applicantName: string;
  applicantNik: string;
  applicantJob: string;
  applicantAddress: string;
  applicantPhone: string;

  // Data Bangunan
  buildingFunction: string; 
  buildingType: string;     
  buildingName: string;     
  buildingFloors: string;   
  buildingArea: string;     
  landArea: string;         
  landStatus: string;       
  buildingAddress: string;  
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IMBData = {
  city: 'Denpasar',
  date: '', // Diisi useEffect
  
  dpmptspName: 'KEPALA DPMPTSP KOTA DENPASAR',
  
  applicantName: 'BAGUS RAMADHAN',
  applicantNik: '5171010101990001',
  applicantJob: 'Wiraswasta',
  applicantAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  applicantPhone: '081234567890',

  buildingFunction: 'Fungsi Hunian',
  buildingType: 'Rumah Tinggal (Permanen)',
  buildingName: 'Rumah Tinggal Pribadi',
  buildingFloors: '1 (Satu) Lantai',
  buildingArea: '80 m2',
  landArea: '150 m2',
  landStatus: 'Sertifikat Hak Milik (SHM) No. 442',
  buildingAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
};

// --- 3. KOMPONEN UTAMA ---
export default function IMBSederhanaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat PBG/IMB...</div>}>
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
        
        {/* HEADER / TANGGAL */}
        <div className="flex justify-between items-start mb-6 shrink-0">
            <div className="w-1/2">
               <table className="w-full text-[11pt]">
                 <tbody>
                    <tr><td className="w-20">Nomor</td><td className="w-2">:</td><td>-</td></tr>
                    <tr><td>Lampiran</td><td>:</td><td>1 (Satu) Berkas</td></tr>
                    <tr><td className="align-top">Perihal</td><td className="align-top">:</td><td className="font-bold underline decoration-1 underline-offset-2">Permohonan Izin Mendirikan Bangunan (IMB) / Persetujuan Bangunan Gedung (PBG)</td></tr>
                 </tbody>
               </table>
            </div>
            <div className="w-1/2 text-right">
               <p>{data.city}, {formatDateSafe(data.date)}</p>
            </div>
        </div>

        {/* KEPADA YTH */}
        <div className="mb-8 shrink-0">
            <p>Kepada Yth.</p>
            <p className="font-bold uppercase">{data.dpmptspName}</p>
            <p>di -</p>
            <p className="ml-10">Tempat</p>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow leading-relaxed text-justify overflow-hidden">
          <p className="mb-4">Dengan hormat,</p>
          <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
          
          <div className="ml-8 mb-6 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 break-inside-avoid">
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.applicantName}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Nomor Induk Kependudukan</span><span>:</span><span className="font-mono">{data.applicantNik}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.applicantJob}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.applicantAddress}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Nomor Telepon / HP</span><span>:</span><span className="font-mono">{data.applicantPhone}</span></div>
          </div>

          <p className="mb-4 break-inside-avoid">Dengan ini mengajukan permohonan Izin Mendirikan Bangunan (IMB) / Persetujuan Bangunan Gedung (PBG) untuk mendirikan / mengubah / memperluas / mengurangi bangunan gedung dengan rincian sebagai berikut:</p>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6 space-y-1.5 break-inside-avoid">
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Fungsi Bangunan</span><span>:</span><span className="font-bold">{data.buildingFunction}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Jenis Bangunan</span><span>:</span><span>{data.buildingType}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Nama Bangunan</span><span>:</span><span>{data.buildingName}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Jumlah Lantai</span><span>:</span><span>{data.buildingFloors}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Luas Bangunan</span><span>:</span><span>{data.buildingArea}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Luas Tanah</span><span>:</span><span>{data.landArea}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr]"><span>Status Tanah / Bukti Hak</span><span>:</span><span className="italic">{data.landStatus}</span></div>
              <div className="grid grid-cols-[170px_10px_1fr] align-top"><span>Lokasi Bangunan</span><span>:</span><span>{data.buildingAddress}</span></div>
          </div>

          <p className="mb-4 break-inside-avoid">
            Sebagai kelengkapan persyaratan, bersama ini kami lampirkan dokumen sebagai berikut:
          </p>
          <ol className="list-decimal ml-8 mb-6 break-inside-avoid text-[10pt] font-sans space-y-1">
             <li>Fotokopi Kartu Tanda Penduduk (KTP) Pemohon;</li>
             <li>Fotokopi Bukti Kepemilikan Hak Atas Tanah (Sertifikat);</li>
             <li>Gambar Rencana Arsitektur Bangunan;</li>
             <li>Perhitungan Konstruksi (jika dipersyaratkan);</li>
             <li>Surat Pernyataan Pertanggungjawaban Mutu dan Keselamatan Bangunan;</li>
             <li>Dokumen kelengkapan lainnya sesuai ketentuan yang berlaku.</li>
          </ol>

          <p className="break-inside-avoid text-justify">
             Demikian surat permohonan ini kami buat dengan sebenarnya. Apabila di kemudian hari ternyata dokumen yang kami lampirkan terbukti tidak benar/palsu, kami bersedia dituntut sesuai dengan ketentuan peraturan perundang-undangan. Atas perhatian dan persetujuan Bapak/Ibu, kami ucapkan terima kasih.
          </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                <td className="w-1/2"></td>
                <td className="w-1/2 text-center align-top">
                  <p className="mb-2">Pemohon,</p>
                  <div className="inline-block border border-dashed border-slate-400 px-4 py-3 text-[8pt] text-slate-400 my-2">
                     Meterai<br/>Rp10.000,-
                  </div>
                  <p className="font-bold underline uppercase text-[10.5pt] mt-4">{data.applicantName}</p>
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
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
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
               <FileText size={16} className="text-blue-400" /> <span className="uppercase tracking-tighter">Permohonan IMB/PBG</span>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
            <Printer size={16} /> <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full md:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans">
                <h2 className="font-bold text-slate-700 flex items-center gap-2 text-xs uppercase tracking-widest"><Edit3 size={16} /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar font-sans print:hidden print:overflow-visible print:bg-white">
              
              {/* TUJUAN PERMOHONAN */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><Building2 size={14} className="text-blue-500"/><h3 className="text-xs font-bold uppercase text-slate-700 tracking-tight">Tujuan Permohonan</h3></div>
                 <div className="space-y-3">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.dpmptspName} onChange={e => handleDataChange('dpmptspName', e.target.value)} placeholder="Kepada Yth (Instansi)" />
                    <div className="grid grid-cols-2 gap-3">
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota/Kab" />
                        <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* DATA PEMOHON */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><UserCircle2 size={14} className="text-blue-500"/><h3 className="text-xs font-bold uppercase text-slate-700 tracking-tight">Data Pemohon</h3></div>
                 <div className="space-y-3">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Pemohon" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} />
                    <div className="grid grid-cols-2 gap-3">
                        <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none" placeholder="NIK" value={data.applicantNik} onChange={e => handleDataChange('applicantNik', e.target.value)} />
                        <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none" placeholder="No. Telepon / HP" value={data.applicantPhone} onChange={e => handleDataChange('applicantPhone', e.target.value)} />
                    </div>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Pekerjaan" value={data.applicantJob} onChange={e => handleDataChange('applicantJob', e.target.value)} />
                    <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed" placeholder="Alamat Lengkap" value={data.applicantAddress} onChange={e => handleDataChange('applicantAddress', e.target.value)} />
                 </div>
              </div>

              {/* DATA BANGUNAN & LOKASI */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><Ruler size={14} className="text-emerald-500"/><h3 className="text-xs font-bold uppercase text-slate-700 tracking-tight">Data Bangunan & Lokasi</h3></div>
                 <div className="space-y-3">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingFunction} onChange={e => handleDataChange('buildingFunction', e.target.value)} placeholder="Fungsi Bangunan (e.g., Hunian)" />
                    <div className="grid grid-cols-2 gap-3">
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingType} onChange={e => handleDataChange('buildingType', e.target.value)} placeholder="Jenis Bangunan" />
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingFloors} onChange={e => handleDataChange('buildingFloors', e.target.value)} placeholder="Jumlah Lantai" />
                    </div>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingName} onChange={e => handleDataChange('buildingName', e.target.value)} placeholder="Nama Bangunan (Opsional)" />
                    
                    <div className="grid grid-cols-2 gap-3">
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Luas Tanah" />
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingArea} onChange={e => handleDataChange('buildingArea', e.target.value)} placeholder="Luas Bangunan" />
                    </div>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none italic" value={data.landStatus} onChange={e => handleDataChange('landStatus', e.target.value)} placeholder="Status Tanah / Bukti Hak (SHM No...)" />
                    <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.buildingAddress} onChange={e => handleDataChange('buildingAddress', e.target.value)} placeholder="Lokasi Lengkap Bangunan" />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 relative overflow-hidden flex flex-col items-center p-0 md:p-8 overflow-y-auto ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
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
         <PrintWrapper documentName="Permohonan_IMB_PBG" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
