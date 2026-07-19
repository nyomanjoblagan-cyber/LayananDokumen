'use client';

/**
 * FILE: PaklaringPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Pengalaman Kerja (Paklaring)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, User, Briefcase, Stamp
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PaklaringData {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  kontakPerusahaan: string;
  nomorSurat: string;
  namaPimpinan: string;
  jabatanPimpinan: string;
  namaKaryawan: string;
  nikKaryawan: string;
  jabatanTerakhir: string;
  departemen: string;
  masaKerjaMulai: string;
  masaKerjaAkhir: string;
  alasanBerhenti: string;
  penilaian: string;
  tempatTerbit: string;
  tanggalTerbit: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PaklaringData = {
  namaPerusahaan: 'PT. MAJU BERSAMA SEJAHTERA',
  alamatPerusahaan: 'Jl. Jend. Sudirman Kav. 21, Gedung Perkantoran Lt. 15, Jakarta Selatan 12190',
  kontakPerusahaan: 'Telp: (021) 555-0198 | Email: hrd@majubersama.co.id',
  nomorSurat: '045/HRD-MBS/SKPK/VIII/2026',
  
  namaPimpinan: 'Budi Santoso, S.E., M.M.',
  jabatanPimpinan: 'Direktur HRD',
  
  namaKaryawan: 'Andi Pratama, S.Kom.',
  nikKaryawan: 'MBS-2021-089',
  jabatanTerakhir: 'Senior Software Engineer',
  departemen: 'Information Technology (IT)',
  masaKerjaMulai: '2021-01-15',
  masaKerjaAkhir: '2026-06-30',
  
  alasanBerhenti: 'mengundurkan diri atas kemauan sendiri dengan cara yang baik',
  penilaian: 'telah menunjukkan dedikasi, loyalitas, dan kinerja yang sangat baik serta tidak pernah terlibat dalam tindakan yang merugikan perusahaan maupun melanggar hukum',
  
  tempatTerbit: 'Jakarta',
  tanggalTerbit: '2026-08-01',
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PaklaringPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Keterangan Kerja (Paklaring)...</div>}>
      <PaklaringBuilder />
    </Suspense>
  );
}

function PaklaringBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'karyawan' | 'keterangan'>('perusahaan');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PaklaringData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggalTerbit: today }));
  }, []);

  const handleChange = (field: keyof PaklaringData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggalTerbit: today });
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } catch { return dateString; }
    };

    return (
      <Kertas>
        {/* KOP SURAT (CORPORATE) */}
        <div className="text-center border-b-[3px] border-black pb-4 mb-8 break-inside-avoid relative">
            <h1 className="font-black uppercase text-2xl tracking-widest text-blue-900 print:text-black">{data.namaPerusahaan}</h1>
            <p className="text-[10pt] mt-1">{data.alamatPerusahaan}</p>
            <p className="text-[10pt] font-mono">{data.kontakPerusahaan}</p>
        </div>

        {/* JUDUL SURAT */}
        <div className="text-center mb-8 break-inside-avoid">
            <h4 className="font-bold text-xl uppercase tracking-wider underline">SURAT KETERANGAN PENGALAMAN KERJA</h4>
            <p className="mt-1 font-mono text-sm tracking-widest uppercase">CERTIFICATE OF EMPLOYMENT</p>
            <p className="mt-1 font-mono text-sm">No: {data.nomorSurat}</p>
        </div>

        {/* PEMBUKA */}
        <div className="mb-4 text-justify break-inside-avoid">
            <p>
                Yang bertanda tangan di bawah ini:
            </p>
        </div>

        <div className="mb-6 ml-6 break-inside-avoid">
            <div className="flex mb-1"><div className="w-48">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaPimpinan}</div></div>
            <div className="flex mb-1"><div className="w-48">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.jabatanPimpinan}</div></div>
            <div className="flex mb-1"><div className="w-48">Perusahaan</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaPerusahaan}</div></div>
        </div>

        <div className="mb-4 text-justify break-inside-avoid">
            <p>
                Dengan ini menerangkan dengan sesungguhnya bahwa:
            </p>
        </div>

        {/* KARYAWAN */}
        <div className="mb-6 ml-6 break-inside-avoid">
            <div className="flex mb-1"><div className="w-48 font-bold">Nama Karyawan</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaKaryawan}</div></div>
            <div className="flex mb-1"><div className="w-48">Nomor Induk Karyawan (NIK)</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.nikKaryawan}</div></div>
            <div className="flex mb-1"><div className="w-48">Jabatan Terakhir</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.jabatanTerakhir}</div></div>
            <div className="flex mb-1"><div className="w-48">Departemen / Divisi</div><div className="w-4">:</div><div className="flex-1">{data.departemen}</div></div>
        </div>

        {/* ISI KETERANGAN */}
        <div className="mb-4 text-justify break-inside-avoid leading-relaxed">
            <p>
                Telah bekerja pada perusahaan kami, <strong>{data.namaPerusahaan}</strong> terhitung sejak tanggal <strong>{formatDateSafe(data.masaKerjaMulai)}</strong> sampai dengan tanggal <strong>{formatDateSafe(data.masaKerjaAkhir)}</strong>.
            </p>
            <p className="mt-3">
                Yang bersangkutan telah berhenti bekerja di perusahaan kami karena <strong>{data.alasanBerhenti}</strong>. 
                Selama masa kerjanya, yang bersangkutan {data.penilaian}.
            </p>
            <p className="mt-3">
                Kami mewakili manajemen perusahaan mengucapkan terima kasih atas segala bentuk kontribusi dan dedikasi yang telah diberikan selama masa baktinya, serta mendoakan keberhasilan yang bersangkutan di masa mendatang.
            </p>
        </div>

        {/* PENUTUP */}
        <div className="mb-16 text-justify break-inside-avoid">
            <p>
                Demikian Surat Keterangan Pengalaman Kerja (Paklaring) ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-end text-center break-inside-avoid pr-8">
            <div className="w-72">
                <p className="mb-1">{data.tempatTerbit}, {formatDateSafe(data.tanggalTerbit)}</p>
                <p className="mb-2 font-bold uppercase">{data.namaPerusahaan}</p>
                <div className="h-24 relative">
                   {/* CAP PERUSAHAAN (OPSIONAL) */}
                   <div className="absolute top-2 left-4 w-20 h-20 border-[3px] border-blue-900/10 rounded-full flex flex-col items-center justify-center -rotate-12">
                      <span className="text-[6px] text-blue-900/10 font-black uppercase text-center leading-tight">{data.namaPerusahaan.substring(0, 15)}</span>
                      <span className="text-[12px] text-blue-900/10 mt-1"><Stamp size={16} /></span>
                   </div>
                </div>
                <p className="font-bold underline uppercase">{data.namaPimpinan}</p>
                <p className="mt-1 text-sm">{data.jabatanPimpinan}</p>
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
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Paklaring / Ket. Kerja</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-blue-600" /> Draft Paklaring</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'perusahaan' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Perusahaan</button>
                <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'karyawan' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Karyawan</button>
                <button onClick={() => setActiveTab('keterangan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'keterangan' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Keterangan & Kinerja</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'perusahaan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Identitas Perusahaan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Kop Surat)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak Perusahaan (Telp / Email / Web)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kontakPerusahaan} onChange={e => handleChange('kontakPerusahaan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Penanda Tangan (HRD/Direktur)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPimpinan} onChange={e => handleChange('namaPimpinan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Penanda Tangan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.jabatanPimpinan} onChange={e => handleChange('jabatanPimpinan', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'karyawan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-blue-600"/> Data Mantan Karyawan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Karyawan</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.namaKaryawan} onChange={e => handleChange('namaKaryawan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (Karyawan)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.nikKaryawan} onChange={e => handleChange('nikKaryawan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Departemen / Divisi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.departemen} onChange={e => handleChange('departemen', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Terakhir</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.jabatanTerakhir} onChange={e => handleChange('jabatanTerakhir', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Mulai Bekerja (Join)</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.masaKerjaMulai} onChange={e => handleChange('masaKerjaMulai', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Berhenti (Resign/PHK)</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.masaKerjaAkhir} onChange={e => handleChange('masaKerjaAkhir', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'keterangan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-emerald-600"/> Alasan & Kinerja
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat Paklaring</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penetapan & Tanggal</label>
                                <div className="flex gap-2">
                                    <input className="w-1/3 bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tempatTerbit} onChange={e => handleChange('tempatTerbit', e.target.value)} placeholder="Kota" />
                                    <input type="date" className="w-2/3 bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tanggalTerbit} onChange={e => handleChange('tanggalTerbit', e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Berhenti</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alasanBerhenti} onChange={e => handleChange('alasanBerhenti', e.target.value)}>
                                <option value="mengundurkan diri atas kemauan sendiri dengan cara yang baik">Resign / Kemauan Sendiri</option>
                                <option value="berakhirnya masa kontrak kerja (PKWT) dengan perusahaan">Berakhir Kontrak (PKWT)</option>
                                <option value="kebijakan rasionalisasi / PHK dari perusahaan">Rasionalisasi / PHK</option>
                                <option value="memasuki masa purnabakti (pensiun)">Pensiun / Purnabakti</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penilaian Kinerja Terakhir</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penilaian} onChange={e => handleChange('penilaian', e.target.value)} />
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
              <PrintWrapper documentName={`Paklaring_${data.namaKaryawan.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
