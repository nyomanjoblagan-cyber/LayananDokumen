'use client';

/**
 * FILE: IzinSekolahPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Izin Tidak Masuk Sekolah/Kampus
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, Building2, CalendarDays, FileText, Stethoscope
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface IzinData {
  kotaSurat: string;
  tanggalSurat: string;

  jenisTujuan: 'Sekolah' | 'Kampus';
  namaTujuan: string;
  alamatTujuan: string;

  namaPemohon: string;
  nomorIdentitas: string;
  kelasAtauProdi: string;

  alasanIzin: 'Sakit' | 'Acara Keluarga' | 'Lainnya';
  tanggalMulai: string;
  tanggalSelesai: string;
  
  keteranganSakit: string;
  lampiranDokter: boolean;

  jenisAcara: string;
  alasanLainnya: string;

  namaPenandatangan: string;
  hubunganPenandatangan: 'Diri Sendiri' | 'Orang Tua' | 'Wali';
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IzinData = {
  kotaSurat: 'Jakarta',
  tanggalSurat: '', // Diisi oleh useEffect
  
  jenisTujuan: 'Sekolah',
  namaTujuan: 'SMA Negeri 1 Jakarta',
  alamatTujuan: 'Jl. Budi Utomo No. 7, Jakarta Pusat',
  
  namaPemohon: 'Budi Santoso',
  nomorIdentitas: '1029384756',
  kelasAtauProdi: 'XII IPA 1',
  
  alasanIzin: 'Sakit',
  tanggalMulai: '',
  tanggalSelesai: '',
  
  keteranganSakit: 'demam tinggi dan harus istirahat total',
  lampiranDokter: true,
  
  jenisAcara: '',
  alasanLainnya: '',
  
  namaPenandatangan: 'Andi Santoso',
  hubunganPenandatangan: 'Orang Tua'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function IzinSekolahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <IzinBuilder />
    </Suspense>
  );
}

function IzinBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IzinData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        tanggalSurat: today,
        tanggalMulai: today,
        tanggalSelesai: today
    }));
  }, []);

  const handleDataChange = (field: keyof IzinData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ 
            ...INITIAL_DATA, 
            tanggalSurat: today,
            tanggalMulai: today,
            tanggalSelesai: today
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

    const isSakit = data.alasanIzin === 'Sakit';
    const isAcara = data.alasanIzin === 'Acara Keluarga';
    const isLainnya = data.alasanIzin === 'Lainnya';
    const isSingleDay = data.tanggalMulai === data.tanggalSelesai;

    return (
      <Kertas>
        {/* TANGGAL SURAT */}
        <div className="text-right mb-8">
            <p>{data.kotaSurat}, {formatDateSafe(data.tanggalSurat)}</p>
        </div>

        {/* TUJUAN SURAT */}
        <div className="mb-8">
            <p>Kepada Yth,</p>
            <p className="font-bold">Bapak/Ibu Guru Wali Kelas / Dosen Pengampu</p>
            <p className="font-bold uppercase">{data.namaTujuan}</p>
            <p>di -</p>
            <p className="ml-8">{data.alamatTujuan}</p>
        </div>

        {/* SALAM PEMBUKA */}
        <div className="mb-4">
            <p>Dengan hormat,</p>
            <p>Yang bertanda tangan di bawah ini:</p>
        </div>

        {/* DATA SISWA / MAHASISWA */}
        <div className="ml-8 mb-6 break-inside-avoid">
            <div className="flex mb-1">
                <div className="w-40">Nama</div>
                <div className="w-4">:</div>
                <div className="flex-1 font-bold uppercase">{data.namaPemohon}</div>
            </div>
            <div className="flex mb-1">
                <div className="w-40">{data.jenisTujuan === 'Sekolah' ? 'NIS/NISN' : 'NIM'}</div>
                <div className="w-4">:</div>
                <div className="flex-1 font-mono">{data.nomorIdentitas}</div>
            </div>
            <div className="flex mb-1">
                <div className="w-40">{data.jenisTujuan === 'Sekolah' ? 'Kelas' : 'Program Studi'}</div>
                <div className="w-4">:</div>
                <div className="flex-1 uppercase">{data.kelasAtauProdi}</div>
            </div>
        </div>

        {/* ISI SURAT / ALASAN */}
        <div className="mb-4 text-justify break-inside-avoid leading-relaxed">
            <p>
                Melalui surat ini kami memohonkan izin bagi {data.jenisTujuan === 'Sekolah' ? 'Siswa' : 'Mahasiswa'} tersebut di atas untuk <strong>TIDAK DAPAT MENGIKUTI</strong> kegiatan pembelajaran / perkuliahan pada:
            </p>
        </div>

        <div className="ml-8 mb-6 font-bold break-inside-avoid">
            {isSingleDay ? (
                <p>Hari/Tanggal : {formatDateSafe(data.tanggalMulai)}</p>
            ) : (
                <p>Tanggal : {formatDateSafe(data.tanggalMulai)} s.d {formatDateSafe(data.tanggalSelesai)}</p>
            )}
        </div>

        <div className="mb-8 text-justify break-inside-avoid leading-relaxed">
            {isSakit && (
                <p>
                    Hal ini dikarenakan yang bersangkutan sedang dalam keadaan <strong>sakit ({data.keteranganSakit})</strong> dan memerlukan waktu untuk istirahat pemulihan.{' '}
                    {data.lampiranDokter && <span>Sebagai bukti, turut kami lampirkan Surat Keterangan Sakit dari Dokter/Klinik.</span>}
                </p>
            )}
            
            {isAcara && (
                <p>
                    Hal ini dikarenakan ada kepentingan keluarga berupa <strong>{data.jenisAcara}</strong> yang mengharuskan yang bersangkutan untuk hadir dan tidak dapat ditinggalkan.
                </p>
            )}

            {isLainnya && (
                <p>
                    Hal ini dikarenakan ada keperluan penting yaitu <strong>{data.alasanLainnya}</strong> yang tidak dapat ditinggalkan.
                </p>
            )}
        </div>

        {/* PENUTUP */}
        <div className="mb-12 text-justify break-inside-avoid">
            <p>
                Demikian surat permohonan izin ini kami sampaikan. Kami berharap Bapak/Ibu dapat memakluminya dan memberikan izin yang seperlunya. Atas perhatian dan izin yang diberikan, kami ucapkan banyak terima kasih.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-end text-center break-inside-avoid">
            <div className="w-64">
                <p className="mb-1">{data.hubunganPenandatangan === 'Diri Sendiri' ? 'Hormat Saya,' : 'Hormat Kami,'}</p>
                <p className="mb-16">{data.hubunganPenandatangan === 'Diri Sendiri' ? 'Pemohon' : data.hubunganPenandatangan}</p>
                <p className="font-bold underline uppercase">{data.namaPenandatangan}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Izin Akademik</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-500'}`}>
          <Eye size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-emerald-600" /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {/* TUJUAN SURAT */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <Building2 size={14} className="text-blue-600"/> Tujuan Instansi
                 </h3>
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tingkat Pendidikan</label>
                          <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-blue-700 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={data.jenisTujuan} onChange={e => handleDataChange('jenisTujuan', e.target.value)}>
                            <option value="Sekolah">Sekolah (SD/SMP/SMA)</option>
                            <option value="Kampus">Perguruan Tinggi (Kampus)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Terbit Surat</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama {data.jenisTujuan}</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.namaTujuan} onChange={e => handleDataChange('namaTujuan', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap (Opsional)</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.alamatTujuan} onChange={e => handleDataChange('alamatTujuan', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* DATA SISWA / MAHASISWA */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <UserCircle2 size={14} className="text-emerald-600"/> Data Siswa / Mahasiswa
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Siswa/Mahasiswa</label>
                      <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.namaPemohon} onChange={e => handleDataChange('namaPemohon', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{data.jenisTujuan === 'Sekolah' ? 'NIS / NISN' : 'NIM'}</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nomorIdentitas} onChange={e => handleDataChange('nomorIdentitas', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{data.jenisTujuan === 'Sekolah' ? 'Kelas' : 'Program Studi'}</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.kelasAtauProdi} onChange={e => handleDataChange('kelasAtauProdi', e.target.value)} />
                        </div>
                    </div>
                 </div>
              </div>

              {/* ALASAN IZIN & JADWAL */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <CalendarDays size={14} className="text-purple-600"/> Detail Izin
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Utama</label>
                      <select className="w-full bg-purple-50 p-3 border border-purple-200 rounded-xl text-sm font-bold text-purple-700 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500" value={data.alasanIzin} onChange={e => handleDataChange('alasanIzin', e.target.value)}>
                        <option value="Sakit">Sakit / Masalah Kesehatan</option>
                        <option value="Acara Keluarga">Ada Acara/Kepentingan Keluarga</option>
                        <option value="Lainnya">Lainnya (Tulis Manual)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Mulai Izin</label>
                          <input type="date" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none" value={data.tanggalMulai} onChange={e => handleDataChange('tanggalMulai', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Selesai</label>
                          <input type="date" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none" value={data.tanggalSelesai} onChange={e => handleDataChange('tanggalSelesai', e.target.value)} />
                        </div>
                    </div>

                    {data.alasanIzin === 'Sakit' && (
                      <div className="space-y-4 p-4 border border-rose-200 bg-rose-50 rounded-xl">
                        <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase mb-2">
                           <Stethoscope size={14}/> Keterangan Sakit
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sakit apa?</label>
                          <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none" value={data.keteranganSakit} onChange={e => handleDataChange('keteranganSakit', e.target.value)} placeholder="Misal: Demam berdarah / tifus" />
                        </div>
                        <label className="flex items-center gap-3 p-2 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500" checked={data.lampiranDokter} onChange={e => handleDataChange('lampiranDokter', e.target.checked)} />
                            <span className="text-xs font-bold text-slate-700">Lampirkan Surat Keterangan Dokter</span>
                        </label>
                      </div>
                    )}

                    {data.alasanIzin === 'Acara Keluarga' && (
                      <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Acara apa?</label>
                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={data.jenisAcara} onChange={e => handleDataChange('jenisAcara', e.target.value)} placeholder="Misal: Pernikahan kakak kandung" />
                      </div>
                    )}

                    {data.alasanIzin === 'Lainnya' && (
                      <div className="p-4 border border-slate-200 bg-slate-50 rounded-xl">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ketik Alasan Detail</label>
                        <textarea className="w-full bg-white p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:ring-2 focus:ring-purple-500 outline-none" value={data.alasanLainnya} onChange={e => handleDataChange('alasanLainnya', e.target.value)} placeholder="Misal: Harus mengurus dokumen imigrasi di luar kota..." />
                      </div>
                    )}
                 </div>
              </div>

              {/* TANDA TANGAN */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <Edit3 size={14} className="text-sky-600"/> Penandatangan Surat
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Siapa yang menandatangani?</label>
                      <select className="w-full bg-sky-50 p-2.5 border border-sky-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-sky-500" value={data.hubunganPenandatangan} onChange={e => handleDataChange('hubunganPenandatangan', e.target.value as any)}>
                        <option value="Orang Tua">Orang Tua (Ayah/Ibu)</option>
                        <option value="Wali">Wali Murid</option>
                        <option value="Diri Sendiri">Diri Sendiri (Hanya Mahasiswa)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Penandatangan</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.namaPenandatangan} onChange={e => handleDataChange('namaPenandatangan', e.target.value)} />
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
              <PrintWrapper documentName="Surat_Izin_Akademik" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
