'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: IzinRenovasiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Izin Renovasi (Building Management Standard)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, Hammer, Building2, HardHat, CalendarDays, Briefcase
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RenovasiData {
  city: string;
  date: string;
  ownerName: string;
  phone: string;
  unit: string;
  tower: string;
  renovationType: string;
  startDate: string;
  endDate: string;
  vendorName: string;
  picName: string;
  picPhone: string;
  workerCount: string;
  bmName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RenovasiData = {
  city: 'JAKARTA',
  date: '', 
  ownerName: 'BUDI SANTOSO',
  phone: '081234567890',
  unit: '12-A',
  tower: 'TOWER B',
  renovationType: 'Pemasangan Partisi dan Instalasi Listrik',
  startDate: '',
  endDate: '', 
  vendorName: 'PT. MAJU BERSAMA',
  picName: 'AGUS SETIAWAN',
  picPhone: '081987654321',
  workerCount: '5',
  bmName: 'BAPAK HENDRA (BUILDING MANAGER)'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function IzinRenovasiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <RenovasiBuilder />
    </Suspense>
  );
}

function RenovasiBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<RenovasiData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: nextWeek.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof RenovasiData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            startDate: today.toISOString().split('T')[0], 
            endDate: nextWeek.toISOString().split('T')[0] 
        });
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
        <div className="flex flex-col h-full border border-black p-6 break-inside-avoid">
            
            <div className="text-center border-b-2 border-black pb-4 mb-6">
                <h1 className="text-xl font-black uppercase tracking-widest">SURAT PERMOHONAN IZIN RENOVASI</h1>
                <p className="text-sm mt-1 uppercase">Pengelola Gedung / Building Management</p>
            </div>

            <div className="flex justify-between mb-8 text-[10pt]">
                <div className="w-[60%]">
                    <p>Kepada Yth,</p>
                    <p className="font-bold uppercase">Building Management / Pengelola Gedung</p>
                    <p>Up. <span className="font-bold uppercase">{data.bmName}</span></p>
                    <p>Di Tempat</p>
                </div>
                <div className="w-[40%] text-right">
                    <p className="uppercase">{data.city}, {formatDateSafe(data.date)}</p>
                </div>
            </div>

            <div className="mb-6">
                <p className="mb-4">Dengan hormat,</p>
                <p>Saya yang bertanda tangan di bawah ini selaku Pemilik / Penyewa Unit:</p>
            </div>

            <div className="ml-4 mb-6 border-l-4 border-gray-300 pl-4 break-inside-avoid">
                <div className="flex mb-1">
                    <div className="w-40 font-semibold">Nama Lengkap</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 font-bold uppercase">{data.ownerName}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-40 font-semibold">No. Telepon / HP</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.phone}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-40 font-semibold">Nomor Unit / Ruang</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 font-bold uppercase">{data.unit}</div>
                </div>
                <div className="flex mb-1">
                    <div className="w-40 font-semibold">Lantai / Tower</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 uppercase">{data.tower}</div>
                </div>
            </div>

            <div className="mb-4 break-inside-avoid">
                <p>Bersama surat ini, bermaksud untuk mengajukan izin pelaksanaan pekerjaan renovasi / *fit out* pada unit tersebut di atas dengan rincian sebagai berikut:</p>
            </div>

            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 break-inside-avoid">
                <div className="flex mb-2">
                    <div className="w-40 font-semibold">Jenis Pekerjaan</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 uppercase text-justify">{data.renovationType}</div>
                </div>
                <div className="flex mb-2">
                    <div className="w-40 font-semibold">Jadwal Pekerjaan</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 uppercase">{formatDateSafe(data.startDate)} s/d {formatDateSafe(data.endDate)}</div>
                </div>
                <div className="flex mb-2">
                    <div className="w-40 font-semibold">Nama Kontraktor/Vendor</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 font-bold uppercase">{data.vendorName}</div>
                </div>
                <div className="flex mb-2">
                    <div className="w-40 font-semibold">Penanggung Jawab (PIC)</div>
                    <div className="w-4">:</div>
                    <div className="flex-1 uppercase">{data.picName} ({data.picPhone})</div>
                </div>
                <div className="flex mb-0">
                    <div className="w-40 font-semibold">Estimasi Pekerja</div>
                    <div className="w-4">:</div>
                    <div className="flex-1">{data.workerCount} Orang</div>
                </div>
            </div>

            <div className="mb-8 text-justify break-inside-avoid">
                <p className="mb-2">Sebagai Pemilik / Penyewa Unit, saya menjamin bahwa selama masa pelaksanaan renovasi:</p>
                <ol className="list-decimal ml-8 space-y-1">
                    <li>Pekerjaan hanya akan dilakukan pada jam kerja yang diizinkan oleh pihak pengelola.</li>
                    <li>Kontraktor dan seluruh pekerja akan mematuhi semua tata tertib keamanan dan keselamatan kerja (K3) di lingkungan gedung.</li>
                    <li>Akan menjaga kebersihan area umum (*public area*) dan tidak meletakkan material bangunan sembarangan.</li>
                    <li>Bersedia bertanggung jawab penuh dan mengganti rugi apabila terjadi kerusakan pada fasilitas umum / unit lain akibat kelalaian pekerja kami.</li>
                </ol>
            </div>

            <div className="mb-12">
                <p>Demikian surat permohonan izin ini dibuat. Atas perhatian dan persetujuan dari pihak Building Management, kami ucapkan terima kasih.</p>
            </div>

            <div className="flex justify-between items-start text-center mb-8 break-inside-avoid">
                <div className="w-[45%]">
                    <p className="mb-16">Pemohon / Pemilik Unit,</p>
                    <p className="font-bold underline uppercase">{data.ownerName}</p>
                </div>
                <div className="w-[45%]">
                    <p className="mb-16">Disetujui Oleh, Pengelola Gedung,</p>
                    <p className="font-bold underline uppercase">{data.bmName}</p>
                </div>
            </div>

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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Izin Renovasi Unit</h1>
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
              
              {/* PENGAJUAN */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <Building2 size={14} className="text-blue-600"/> Pengajuan & Tujuan
                 </h3>
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Surat</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kepada / BM Name</label>
                      <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.bmName} onChange={e => handleDataChange('bmName', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* DATA PEMILIK / PENYEWA */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <UserCircle2 size={14} className="text-emerald-600"/> Data Pemilik / Penyewa Unit
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pemilik/Penyewa</label>
                      <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Unit / Ruang</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.unit} onChange={e => handleDataChange('unit', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lantai / Tower</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.tower} onChange={e => handleDataChange('tower', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / HP</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* DATA RENOVASI */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <Hammer size={14} className="text-purple-600"/> Pekerjaan Renovasi
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Pekerjaan</label>
                      <textarea className="w-full bg-purple-50 p-3 border border-purple-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none uppercase leading-relaxed font-bold" value={data.renovationType} onChange={e => handleDataChange('renovationType', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Mulai</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Selesai (Target)</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none text-purple-700 font-bold" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                        </div>
                    </div>
                 </div>
              </div>

              {/* VENDOR & PEKERJA */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <HardHat size={14} className="text-amber-600"/> Vendor Kontraktor
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Vendor / Kontraktor</label>
                      <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">PIC / Penanggung Jawab</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.picName} onChange={e => handleDataChange('picName', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. HP PIC</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.picPhone} onChange={e => handleDataChange('picPhone', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Estimasi Jumlah Pekerja (Orang)</label>
                      <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.workerCount} onChange={e => handleDataChange('workerCount', e.target.value)} />
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
              <PrintWrapper documentName="Surat_Izin_Renovasi" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
