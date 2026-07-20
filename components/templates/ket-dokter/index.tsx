'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: KetDokterPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Keterangan Sakit / Dokter
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, Activity, Stethoscope, Building2, CalendarDays, BadgePlus
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface MedicalData {
  clinicName: string;
  clinicAddress: string;
  doctorName: string;
  doctorSip: string;
  city: string;
  date: string;
  
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientJob: string;
  patientAddress: string;
  
  examinationResult: string;
  restDays: number;
  restStartDate: string;
  restEndDate: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: MedicalData = {
  clinicName: 'KLINIK KESEHATAN MEDIKA UTAMA',
  clinicAddress: 'Jl. Jenderal Sudirman No. 123, Sleman, Daerah Istimewa Yogyakarta 55281',
  doctorName: 'dr. Budi Santoso, Sp.PD',
  doctorSip: '123/SIP/DKK/2026',
  city: 'Sleman',
  date: '2026-07-13',
  
  patientName: 'ANDI PRATAMA',
  patientAge: '28 Tahun',
  patientGender: 'Laki-laki',
  patientJob: 'Karyawan Swasta',
  patientAddress: 'Jl. Gejayan No. 15, Depok, Sleman',
  
  examinationResult: 'Demam Berdarah Dengue (DBD) grade I. Pasien mengeluhkan demam tinggi sejak 3 hari yang lalu disertai nyeri sendi dan ruam.',
  restDays: 3,
  restStartDate: '2026-07-13',
  restEndDate: '2026-07-15',
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function KetDokterPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <MedicalBuilder />
    </Suspense>
  );
}

function MedicalBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<MedicalData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'klinik' | 'pasien' | 'medis'>('pasien');

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const future = new Date(today);
    future.setDate(today.getDate() + 2);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        restStartDate: today.toISOString().split('T')[0],
        restEndDate: future.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof MedicalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const future = new Date(today);
        future.setDate(today.getDate() + 2);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0],
            restStartDate: today.toISOString().split('T')[0],
            restEndDate: future.toISOString().split('T')[0]
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
        {/* KOP SURAT ELEGANT */}
        <div className="flex items-center gap-6 mb-4 pb-4 border-b-[4px] border-emerald-800 relative">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-800 shrink-0">
                <BadgePlus className="w-10 h-10 text-emerald-800" />
            </div>
            <div className="flex-1 text-center pr-20">
                <h1 className="font-black text-xl uppercase tracking-widest text-emerald-900 mb-1">{data.clinicName}</h1>
                <p className="text-sm font-semibold text-slate-700 leading-snug">{data.clinicAddress}</p>
                <p className="text-xs text-slate-500 mt-1">S.I.P: {data.doctorSip}</p>
            </div>
        </div>

        <div className="text-center mb-6">
            <h2 className="font-bold text-lg uppercase underline tracking-wider">SURAT KETERANGAN SAKIT</h2>
        </div>

        <p className="mb-4 text-justify">
            Yang bertanda tangan di bawah ini menerangkan dengan sesungguhnya bahwa:
        </p>

        {/* DATA PASIEN */}
        <div className="mb-6 ml-8">
            <div className="flex mb-1"><div className="w-32">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.patientName}</div></div>
            <div className="flex mb-1"><div className="w-32">Umur</div><div className="w-4">:</div><div className="flex-1">{data.patientAge}</div></div>
            <div className="flex mb-1"><div className="w-32">Jenis Kelamin</div><div className="w-4">:</div><div className="flex-1">{data.patientGender}</div></div>
            <div className="flex mb-1"><div className="w-32">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.patientJob}</div></div>
            <div className="flex mb-1"><div className="w-32 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.patientAddress}</div></div>
        </div>

        <p className="mb-4 text-justify">
            Berdasarkan hasil pemeriksaan medis yang telah dilakukan pada hari ini, pasien tersebut di atas dinyatakan dalam kondisi <strong>SAKIT</strong> dengan diagnosa / keluhan sebagai berikut:
        </p>

        {/* DIAGNOSA */}
        <div className="mb-6 p-4 border border-slate-300 bg-slate-50 text-justify italic">
            "{data.examinationResult}"
        </div>

        <p className="mb-8 text-justify">
            Sehubungan dengan kondisi kesehatannya, pasien memerlukan istirahat penuh selama <strong>{data.restDays} ({data.restDays.toString()}) hari</strong>, terhitung mulai tanggal <strong>{formatDateSafe(data.restStartDate)}</strong> sampai dengan tanggal <strong>{formatDateSafe(data.restEndDate)}</strong>.
        </p>

        <p className="mb-12 text-justify">
            Demikian surat keterangan ini diberikan agar dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan.
        </p>

        {/* TANDA TANGAN */}
        <div className="flex justify-end text-center break-inside-avoid">
            <div className="w-64">
                <p className="mb-2">{data.city}, {formatDateSafe(data.date)}</p>
                <p className="mb-2">Dokter Pemeriksa,</p>
                <div className="h-24"></div>
                <p className="font-bold underline uppercase">{data.doctorName}</p>
                <p className="text-sm">SIP: {data.doctorSip}</p>
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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Keterangan Dokter / Sakit</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[580px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-emerald-600" /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pasien')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pasien' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>1. Pasien</button>
                <button onClick={() => setActiveTab('medis')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'medis' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Diagnosa</button>
                <button onClick={() => setActiveTab('klinik')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'klinik' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Klinik</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pasien' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Data Pasien
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pasien</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Umur</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientAge} onChange={e => handleDataChange('patientAge', e.target.value)} placeholder="Contoh: 28 Tahun" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientGender} onChange={e => handleDataChange('patientGender', e.target.value)}>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.patientJob} onChange={e => handleDataChange('patientJob', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Pasien</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.patientAddress} onChange={e => handleDataChange('patientAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'medis' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <Activity size={14} className="text-rose-600"/> Hasil Pemeriksaan & Diagnosa
                      </h3>
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keterangan Sakit / Diagnosa</label>
                          <textarea className="w-full bg-rose-50 p-3 border border-rose-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed" value={data.examinationResult} onChange={e => handleDataChange('examinationResult', e.target.value)} placeholder="Tuliskan diagnosa dokter..." />
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <CalendarDays size={14} className="text-amber-600"/> Rekomendasi Istirahat
                      </h3>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jumlah Hari Istirahat</label>
                              <input type="number" className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold text-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.restDays} onChange={e => handleDataChange('restDays', Number(e.target.value))} />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mulai Tanggal</label>
                                  <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.restStartDate} onChange={e => handleDataChange('restStartDate', e.target.value)} />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sampai Tanggal</label>
                                  <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.restEndDate} onChange={e => handleDataChange('restEndDate', e.target.value)} />
                              </div>
                          </div>
                      </div>
                   </div>
                 </>
              )}

              {activeTab === 'klinik' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-emerald-600"/> Instansi & Dokter
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Klinik / Rumah Sakit</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.clinicName} onChange={e => handleDataChange('clinicName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Instansi</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.clinicAddress} onChange={e => handleDataChange('clinicAddress', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-100 pt-3">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Dokter Pemeriksa</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">SIP Dokter</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.doctorSip} onChange={e => handleDataChange('doctorSip', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Keterangan_Sakit" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
