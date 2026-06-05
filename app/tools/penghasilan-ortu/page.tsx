'use client';

/**
 * FILE: PenghasilanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan Penghasilan Orang Tua
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Wallet, Building2, UserCircle2, 
  MapPin, LayoutTemplate, ShieldCheck, Coins, FileText, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface IncomeData {
  city: string;
  date: string;
  docNo: string;
  
  // DATA ORANG TUA
  parentName: string;
  parentNik: string;
  parentJob: string;
  parentAddress: string;

  // DATA ANAK
  childName: string;
  childSchool: string;
  purpose: string;

  // RINCIAN PENGHASILAN
  baseIncome: string;
  otherIncome: string;
  totalIncome: string;

  // PENGESAH
  issuerJob: string;
  issuerName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IncomeData = {
  city: 'SURABAYA',
  date: '', 
  docNo: '400/12/RT.03/2026',
  
  parentName: 'SLAMET MULYONO',
  parentNik: '3578000000000001',
  parentJob: 'Wiraswasta / Pedagang',
  parentAddress: 'Jl. Gubeng Kertajaya No. 15, RT 003/RW 005, Surabaya',

  childName: 'RIZKY ADITYA',
  childSchool: 'Universitas Airlangga (UNAIR)',
  purpose: 'Persyaratan Pendaftaran Beasiswa KIP-Kuliah',

  baseIncome: 'Rp 2.500.000,-',
  otherIncome: 'Rp 500.000,-',
  totalIncome: 'Rp 3.000.000,-',

  issuerJob: 'Ketua RT 003',
  issuerName: 'BAMBANG HERMANTO'
};

// --- 3. KOMPONEN UTAMA ---
export default function PenghasilanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Penghasilan...</div>}>
      <IncomeStatementBuilder />
    </Suspense>
  );
}

function IncomeStatementBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IncomeData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof IncomeData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const IncomeContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* JUDUL */}
        <div className="text-center mb-10 shrink-0">
          <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8 tracking-tight">SURAT KETERANGAN PENGHASILAN</h1>
          <p className="text-[10pt] font-sans mt-4 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow space-y-6">
          <p>Saya yang bertanda tangan di bawah ini:</p>
          
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 print:border-slate-300 break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.parentName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.parentNik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.parentJob}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.parentAddress}</span></div>
          </div>

          <p>Menyatakan dengan sebenarnya bahwa saat ini saya memiliki penghasilan rata-rata per bulan sebesar:</p>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans text-[10pt] print:bg-transparent print:border-black break-inside-avoid">
              <div className="grid grid-cols-[180px_10px_1fr] mb-1"><span>Penghasilan Pokok</span><span>:</span><span className="font-bold">{data.baseIncome}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr] mb-3 border-b border-slate-200 pb-2 print:border-black"><span>Penghasilan Tambahan</span><span>:</span><span>{data.otherIncome}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr] text-blue-800 print:text-black"><span>Total Penghasilan</span><span>:</span><span className="font-black text-[13pt]">{data.totalIncome}</span></div>
          </div>

          <p>Pernyataan ini dibuat sebagai kelengkapan administrasi bagi anak saya:</p>
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Anak</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.childName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Instansi/Sekolah</span><span>:</span><span>{data.childSchool}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Keperluan</span><span>:</span><span className="italic font-medium">{data.purpose}</span></div>
          </div>

          <p className="text-justify">Demikian surat pernyataan ini saya buat dengan sebenarnya tanpa ada paksaan dari pihak manapun, dan saya bersedia mempertanggungjawabkan secara hukum apabila di kemudian hari ditemukan data yang tidak benar.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="mt-auto pt-10 shrink-0 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <table className="w-full table-fixed font-sans">
            <tbody>
              <tr>
                <td className="w-1/2"></td>
                <td className="text-center font-bold text-[10.5pt] pb-8">
                  {data.city}, {formatDateSafe(data.date)}
                </td>
              </tr>
              <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center print:text-black">
                <td className="pb-4">Mengetahui,</td>
                <td className="pb-4">Hormat Saya,</td>
              </tr>
              <tr>
                <td className="text-center align-bottom">
                  <div className="h-32 flex flex-col justify-end items-center">
                     <p className="font-bold underline uppercase text-[11pt] font-serif tracking-tight leading-none">({data.issuerName})</p>
                     <p className="text-[9pt] font-sans mt-1 uppercase text-slate-500 font-bold">{data.issuerJob}</p>
                  </div>
                </td>
                <td className="text-center align-bottom">
                  <div className="h-32 flex flex-col justify-end items-center">
                     <div className="border border-slate-200 w-24 h-12 flex items-center justify-center text-[7pt] text-slate-300 italic mb-4 uppercase">Materai</div>
                     <p className="font-bold underline uppercase text-[11pt] font-serif tracking-tight leading-none">{data.parentName}</p>
                     <p className="text-[9pt] font-sans mt-1 text-slate-500 italic uppercase">Orang Tua / Wali</p>
                  </div>
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
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Wallet size={16} className="text-blue-500" /> <span>Income Statement Builder</span>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Pihak Orang Tua</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Lengkap Orang Tua" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} placeholder="NIK" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentJob} onChange={e => handleDataChange('parentJob', e.target.value)} placeholder="Pekerjaan" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} placeholder="Alamat Lengkap" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Coins size={12}/> Rincian Penghasilan</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.baseIncome} onChange={e => handleDataChange('baseIncome', e.target.value)} placeholder="Gaji Pokok" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.otherIncome} onChange={e => handleDataChange('otherIncome', e.target.value)} placeholder="Tunjangan/Lainnya" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs font-black text-blue-600 bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none" value={data.totalIncome} onChange={e => handleDataChange('totalIncome', e.target.value)} placeholder="Total Penghasilan Per Bulan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Data Anak & Keperluan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} placeholder="Nama Anak" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.childSchool} onChange={e => handleDataChange('childSchool', e.target.value)} placeholder="Nama Sekolah/Universitas" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Pembuatan Surat" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><ShieldCheck size={12}/> Legitimasi</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none font-bold" value={data.issuerName} onChange={e => handleDataChange('issuerName', e.target.value)} placeholder="Nama Ketua RT/RW" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.issuerJob} onChange={e => handleDataChange('issuerJob', e.target.value)} placeholder="Jabatan Pengesah" />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <IncomeContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><IncomeContent /></div></div>
    </div>
  );
}