'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: IMBSederhanaPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - DPMPTSP FORMAT)
 * DESC: Generator Surat Permohonan IMB/PBG Resmi untuk DPMPTSP
 */

import React, { useState, Suspense, useEffect } from 'react';
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

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
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
  const [data, setData] = useFormSync<IMBData>(INITIAL_DATA);
  
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
      <Kertas>
        {/* HEADER / TANGGAL */}
        <div className="flex justify-between items-start mb-6 shrink-0 break-inside-avoid">
            <div className="w-[60%]">
               <table className="w-full text-[11pt]">
                 <tbody>
                    <tr><td className="w-20">Nomor</td><td className="w-2">:</td><td>-</td></tr>
                    <tr><td>Lampiran</td><td>:</td><td>1 (Satu) Berkas</td></tr>
                    <tr><td className="align-top">Perihal</td><td className="align-top">:</td><td className="font-bold underline decoration-1 underline-offset-2">Permohonan Izin Mendirikan Bangunan (IMB) / Persetujuan Bangunan Gedung (PBG)</td></tr>
                 </tbody>
               </table>
            </div>
            <div className="w-[40%] text-right">
               <p>{data.city}, {formatDateSafe(data.date)}</p>
            </div>
        </div>

        {/* KEPADA YTH */}
        <div className="mb-8 shrink-0 break-inside-avoid">
            <p>Kepada Yth.</p>
            <p className="font-bold uppercase">{data.dpmptspName}</p>
            <p>di -</p>
            <p className="ml-10">Tempat</p>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow leading-relaxed text-justify">
          <div className="break-inside-avoid">
              <p className="mb-4">Dengan hormat,</p>
              <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-8 mb-6 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6">
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.applicantName}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Nomor Induk Kependudukan</span><span>:</span><span className="font-mono">{data.applicantNik}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.applicantJob}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.applicantAddress}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Nomor Telepon / HP</span><span>:</span><span className="font-mono">{data.applicantPhone}</span></div>
              </div>
          </div>

          <div className="break-inside-avoid">
              <p className="mb-4">Dengan ini mengajukan permohonan Izin Mendirikan Bangunan (IMB) / Persetujuan Bangunan Gedung (PBG) untuk mendirikan / mengubah / memperluas / mengurangi bangunan gedung dengan rincian sebagai berikut:</p>
    
              <div className="bg-slate-50 p-5 border border-slate-200 font-sans text-[10pt] mb-6 space-y-1.5">
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Fungsi Bangunan</span><span>:</span><span className="font-bold">{data.buildingFunction}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Jenis Bangunan</span><span>:</span><span>{data.buildingType}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Nama Bangunan</span><span>:</span><span>{data.buildingName}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Jumlah Lantai</span><span>:</span><span>{data.buildingFloors}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Luas Bangunan</span><span>:</span><span>{data.buildingArea}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Luas Tanah</span><span>:</span><span>{data.landArea}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr]"><span>Status Tanah / Bukti Hak</span><span>:</span><span className="italic">{data.landStatus}</span></div>
                  <div className="grid grid-cols-[170px_10px_1fr] align-top"><span>Lokasi Bangunan</span><span>:</span><span>{data.buildingAddress}</span></div>
              </div>
          </div>

          <div className="break-inside-avoid">
              <p className="mb-4">
                Sebagai kelengkapan persyaratan, bersama ini kami lampirkan dokumen sebagai berikut:
              </p>
              <ol className="list-decimal ml-8 mb-6 text-[10pt] font-sans space-y-1">
                 <li>Fotokopi Kartu Tanda Penduduk (KTP) Pemohon;</li>
                 <li>Fotokopi Bukti Kepemilikan Hak Atas Tanah (Sertifikat);</li>
                 <li>Gambar Rencana Arsitektur Bangunan;</li>
                 <li>Perhitungan Konstruksi (jika dipersyaratkan);</li>
                 <li>Surat Pernyataan Pertanggungjawaban Mutu dan Keselamatan Bangunan;</li>
                 <li>Dokumen kelengkapan lainnya sesuai ketentuan yang berlaku.</li>
              </ol>
          </div>

          <div className="break-inside-avoid text-justify">
             <p>Demikian surat permohonan ini kami buat dengan sebenarnya. Apabila di kemudian hari ternyata dokumen yang kami lampirkan terbukti tidak benar/palsu, kami bersedia dituntut sesuai dengan ketentuan peraturan perundang-undangan. Atas perhatian dan persetujuan Bapak/Ibu, kami ucapkan terima kasih.</p>
          </div>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-12 break-inside-avoid">
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
      </Kertas>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Permohonan IMB/PBG</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Eye size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-sky-600" /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {/* TUJUAN PERMOHONAN */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <Building2 size={14} className="text-blue-600"/> Tujuan Permohonan
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kepada Yth (Instansi)</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.dpmptspName} onChange={e => handleDataChange('dpmptspName', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota/Kab</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Surat</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                 </div>
              </div>

              {/* DATA PEMOHON */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <UserCircle2 size={14} className="text-emerald-600"/> Data Pemohon
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pemohon</label>
                      <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantNik} onChange={e => handleDataChange('applicantNik', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / HP</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantPhone} onChange={e => handleDataChange('applicantPhone', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantJob} onChange={e => handleDataChange('applicantJob', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.applicantAddress} onChange={e => handleDataChange('applicantAddress', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* DATA BANGUNAN & LOKASI */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <Ruler size={14} className="text-purple-600"/> Data Bangunan & Lokasi
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fungsi Bangunan</label>
                      <input className="w-full bg-purple-50 p-2.5 border border-purple-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.buildingFunction} onChange={e => handleDataChange('buildingFunction', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Bangunan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.buildingType} onChange={e => handleDataChange('buildingType', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jumlah Lantai</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.buildingFloors} onChange={e => handleDataChange('buildingFloors', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Bangunan (Opsional)</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.buildingName} onChange={e => handleDataChange('buildingName', e.target.value)} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Luas Tanah</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Luas Bangunan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.buildingArea} onChange={e => handleDataChange('buildingArea', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Tanah / Bukti Hak</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.landStatus} onChange={e => handleDataChange('landStatus', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Lengkap Bangunan</label>
                      <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.buildingAddress} onChange={e => handleDataChange('buildingAddress', e.target.value)} />
                    </div>
                 </div>
              </div>
            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Permohonan_IMB_PBG" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
