'use client';

/**
 * FILE: components/templates/sp-karyawan/index.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE LEGAL DRAFTING)
 * DESC: Generator Surat Peringatan Karyawan (SP 1, 2, 3)
 * FEATURES:
 * - Enterprise Legal Drafting Standard
 * - Dynamic Dropdown for SP Level (1, 2, 3)
 * - Tabel Rincian Pelanggaran & Pasal PP
 * - Print-Safe CSS (A4 Format)
 * - No Truncation
 */

import React, { useState, useEffect, Suspense } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw,
  AlertTriangle, Briefcase, FileText, Scale
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface IdentitasPerusahaan {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  namaPimpinan: string;
  jabatanPimpinan: string;
}

interface IdentitasKaryawan {
  nama: string;
  nik: string;
  jabatan: string;
  departemen: string;
}

interface SPData {
  kotaPembuatan: string;
  tanggalPembuatan: string;
  nomorSurat: string;
  tingkatSP: '1' | '2' | '3';
  masaBerlaku: string;
  
  perusahaan: IdentitasPerusahaan;
  karyawan: IdentitasKaryawan;
  
  pelanggaran: string;
  pasalDilanggar: string;
  kerugian: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SPData = {
  kotaPembuatan: 'JAKARTA SELATAN',
  tanggalPembuatan: '', 
  nomorSurat: '045/HRD-SP/VII/2026',
  tingkatSP: '1',
  masaBerlaku: '6 (Enam) Bulan',
  
  perusahaan: {
    namaPerusahaan: 'PT. TEKNOLOGI NUSANTARA JAYA',
    alamatPerusahaan: 'Gedung Cyber, Jl. Kuningan Barat No. 8, Jakarta Selatan',
    namaPimpinan: 'BAPAK JAYA WICAKSONO',
    jabatanPimpinan: 'HR Director'
  },
  
  karyawan: {
    nama: 'ANDI PRAKOSO',
    nik: 'EMP-2023-0145',
    jabatan: 'Senior Frontend Developer',
    departemen: 'IT & Engineering'
  },
  
  pelanggaran: 'Mangkir dari jam kerja selama 3 (tiga) hari berturut-turut tanpa pemberitahuan tertulis maupun bukti keterangan medis yang sah.',
  pasalDilanggar: 'Pasal 15 Ayat (2) huruf (a) dan (b) Peraturan Perusahaan (PP) terkait Kedisiplinan Kehadiran.',
  kerugian: 'Menghambat target sprint bulanan dan merugikan produktivitas tim Engineering secara keseluruhan.'
};

// --- 3. KOMPONEN UTAMA ---
export default function SPKaryawanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor SP Karyawan...</div>}>
      <SPToolBuilder />
    </Suspense>
  );
}

function SPToolBuilder() {
  const [data, setData] = useState<SPData>(INITIAL_DATA);
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  useEffect(() => {
    setData(prev => ({
      ...INITIAL_DATA,
      tanggalPembuatan: new Date().toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof SPData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handlePerusahaanChange = (field: keyof IdentitasPerusahaan, val: string) => {
    setData(prev => ({ ...prev, perusahaan: { ...prev.perusahaan, [field]: val } }));
  };

  const handleKaryawanChange = (field: keyof IdentitasKaryawan, val: string) => {
    setData(prev => ({ ...prev, karyawan: { ...prev.karyawan, [field]: val } }));
  };

  const handleReset = () => {
    if(window.confirm('Reset semua data ke default?')) {
        setData({ ...INITIAL_DATA, tanggalPembuatan: new Date().toISOString().split('T')[0] });
    }
  };

  const formatDate = (dateString: string) => {
    if(!dateString) return '...';
    try {
        const safeDate = new Date(dateString + 'T00:00:00');
        return safeDate.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
    } catch { return dateString; }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col print:block font-sans text-slate-800">
      
      {/* CSS PRINT PARITY - NO GRID/FLEX FOR PASAL CONTENT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static; width: 100%; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-amber-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">SP Karyawan <span className="text-amber-400">Enterprise</span></h1></div>
            </div>
            
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setIsMobilePreview(!isMobilePreview)}
                 className="md:hidden bg-slate-800 text-slate-200 px-4 py-2 rounded-xl text-sm font-bold"
               >
                 {isMobilePreview ? 'Edit Data' : 'Lihat Hasil'}
               </button>
               <button 
                 onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} 
                 className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95"
               >
                 <Printer size={18}/> <span className="hidden sm:inline">Cetak Dokumen</span>
               </button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row print:block print:h-auto print:overflow-visible overflow-hidden h-[calc(100vh-64px)] relative">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${isMobilePreview ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={18} className="text-amber-600" /> Form SP Karyawan</h2>
                <button onClick={handleReset} title="Reset" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar print:block print:overflow-visible print:bg-white">
               
               {/* 1. DATA ADMINISTRASI */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><FileText size={14} className="text-amber-500"/> Administrasi Surat</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tingkat Surat Peringatan</label>
                          <select 
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold text-amber-700 focus:ring-2 focus:ring-amber-500 outline-none"
                            value={data.tingkatSP}
                            onChange={(e) => handleDataChange('tingkatSP', e.target.value)}
                          >
                             <option value="1">Surat Peringatan I (Pertama)</option>
                             <option value="2">Surat Peringatan II (Kedua)</option>
                             <option value="3">Surat Peringatan III (Ketiga / Terakhir)</option>
                          </select>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nomor Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-amber-500 outline-none" value={data.nomorSurat} onChange={e => handleDataChange('nomorSurat', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Kota Pembuatan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.kotaPembuatan} onChange={e => handleDataChange('kotaPembuatan', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tanggal Pembuatan</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.tanggalPembuatan} onChange={e => handleDataChange('tanggalPembuatan', e.target.value)} /></div>
                      </div>
                  </div>
               </div>

               {/* 2. IDENTITAS KARYAWAN */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><Briefcase size={14} className="text-blue-500"/> Identitas Karyawan Terkait</h3>
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 shadow-sm space-y-3">
                      <div className="space-y-1"><input className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Lengkap Karyawan" value={data.karyawan.nama} onChange={e => handleKaryawanChange('nama', e.target.value)} /></div>
                      <div className="space-y-1"><input className="w-full px-3 py-2 border border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ID Karyawan / NIK" value={data.karyawan.nik} onChange={e => handleKaryawanChange('nik', e.target.value)} /></div>
                      <div className="space-y-1"><input className="w-full px-3 py-2 border border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jabatan" value={data.karyawan.jabatan} onChange={e => handleKaryawanChange('jabatan', e.target.value)} /></div>
                      <div className="space-y-1"><input className="w-full px-3 py-2 border border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Departemen" value={data.karyawan.departemen} onChange={e => handleKaryawanChange('departemen', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. RINCIAN PELANGGARAN */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><AlertTriangle size={14} className="text-red-500"/> Rincian Pelanggaran Hukum</h3>
                  <div className="bg-red-50/50 p-4 rounded-2xl border border-red-200 shadow-sm space-y-4">
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Deskripsi Pelanggaran</label>
                          <textarea className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-red-500 outline-none" value={data.pelanggaran} onChange={e => handleDataChange('pelanggaran', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Kutipan Pasal PP / UU yang dilanggar</label>
                          <textarea className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-red-500 outline-none" value={data.pasalDilanggar} onChange={e => handleDataChange('pasalDilanggar', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Dampak / Kerugian Perusahaan</label>
                          <textarea className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-red-500 outline-none" value={data.kerugian} onChange={e => handleDataChange('kerugian', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Masa Berlaku Sanksi</label>
                          <input className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.masaBerlaku} onChange={e => handleDataChange('masaBerlaku', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 4. IDENTITAS PERUSAHAAN / PENERBIT */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2 px-1"><Scale size={14} className="text-slate-500"/> Pejabat Berwenang / HRD</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Nama Perusahaan (PT...)" value={data.perusahaan.namaPerusahaan} onChange={e => handlePerusahaanChange('namaPerusahaan', e.target.value)} /></div>
                      <div className="space-y-1"><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-12 resize-none focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Alamat Perusahaan" value={data.perusahaan.alamatPerusahaan} onChange={e => handlePerusahaanChange('alamatPerusahaan', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Nama Pejabat HRD" value={data.perusahaan.namaPimpinan} onChange={e => handlePerusahaanChange('namaPimpinan', e.target.value)} /></div>
                         <div className="space-y-1"><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" placeholder="Jabatan Pejabat HRD" value={data.perusahaan.jabatanPimpinan} onChange={e => handlePerusahaanChange('jabatanPimpinan', e.target.value)} /></div>
                      </div>
                  </div>
               </div>

            </div>
         </div>

         {/* LIVE PREVIEW AREA */}
         <div className="flex-1 bg-slate-300 print:bg-white print:overflow-visible print:static print:block relative overflow-hidden flex flex-col items-center">
            <div className="flex-1 overflow-y-auto print:overflow-visible print:w-full print:block w-full flex justify-center p-4 md:p-8 custom-scrollbar print:bg-white">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 print:scale-100 print:transform-none print:w-full print:m-0 print:block w-full flex flex-col items-center">
                  
                  <div id="print-only-root" className="bg-white shadow-2xl relative print:static flex-shrink-0 h-max print:shadow-none print:w-full print:min-w-0 print:min-h-0 print:h-auto" style={{ width: '210mm', minHeight: '297mm' }}>
                     <div className="p-[15mm] text-black font-serif text-[11pt] leading-[1.6]">
                  
                  {/* KOP SURAT (OPSIONAL/DIBUAT MANUAL UNTUK CETAK) */}
                  <div className="border-b-[3px] border-black pb-4 mb-8 text-center break-inside-avoid">
                     <h1 className="text-[16pt] font-black uppercase tracking-wider">{data.perusahaan.namaPerusahaan}</h1>
                     <p className="text-[10pt]">{data.perusahaan.alamatPerusahaan}</p>
                  </div>

                  {/* JUDUL SURAT */}
                  <div className="text-center mb-10 break-inside-avoid">
                     <h2 className="text-[14pt] font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 mb-2">SURAT PERINGATAN {data.tingkatSP === '1' ? 'I (PERTAMA)' : data.tingkatSP === '2' ? 'II (KEDUA)' : 'III (KETIGA / TERAKHIR)'}</h2>
                     <p className="font-bold">Nomor: {data.nomorSurat}</p>
                  </div>

                  <div className="text-justify space-y-6">
                     <div className="break-inside-avoid">
                         <p className="mb-4">Surat Peringatan ini ditujukan dan diberikan kepada:</p>
                         <div className="ml-8 space-y-1">
                             <p><span className="inline-block w-40">Nama</span><span>: <strong>{data.karyawan.nama}</strong></span></p>
                             <p><span className="inline-block w-40">Nomor Induk Karyawan</span><span>: {data.karyawan.nik}</span></p>
                             <p><span className="inline-block w-40">Jabatan</span><span>: {data.karyawan.jabatan}</span></p>
                             <p><span className="inline-block w-40">Departemen</span><span>: {data.karyawan.departemen}</span></p>
                         </div>
                     </div>

                     <div className="break-inside-avoid">
                         <p>Sebagai bentuk pembinaan dan penegakan kedisiplinan kerja perusahaan, kami menerbitkan Surat Peringatan {data.tingkatSP} ini sehubungan dengan pelanggaran tata tertib dan/atau Peraturan Perusahaan (PP) yang telah Saudara/i lakukan, dengan rincian sebagai berikut:</p>
                     </div>

                     <div className="break-inside-avoid ml-4 border border-black p-4 bg-slate-50/50">
                         <p className="font-bold mb-2 uppercase text-[10pt]">I. Rincian Pelanggaran:</p>
                         <p className="mb-4 pl-4">{data.pelanggaran}</p>
                         
                         <p className="font-bold mb-2 uppercase text-[10pt]">II. Pasal yang Dilanggar:</p>
                         <p className="mb-4 pl-4">{data.pasalDilanggar}</p>

                         <p className="font-bold mb-2 uppercase text-[10pt]">III. Dampak pada Perusahaan:</p>
                         <p className="pl-4">{data.kerugian}</p>
                     </div>

                     <div className="break-inside-avoid">
                         <p className="font-bold mb-2">Ketetapan dan Konsekuensi Hukum:</p>
                         <ol className="list-decimal pl-6 space-y-3">
                             <li className="pl-2">Surat Peringatan {data.tingkatSP} ini diterbitkan sebagai teguran keras agar Saudara/i segera memperbaiki sikap, perilaku, dan kinerja, serta tidak mengulangi pelanggaran yang sama maupun pelanggaran bentuk lainnya.</li>
                             <li className="pl-2">Masa berlaku Surat Peringatan ini adalah selama <strong>{data.masaBerlaku}</strong> terhitung sejak tanggal diterbitkannya surat ini.</li>
                             {data.tingkatSP === '3' ? (
                                <li className="pl-2">Mengingat ini adalah <strong>Surat Peringatan Ketiga (Terakhir)</strong>, apabila Saudara/i kembali melakukan pelanggaran dalam masa berlaku SP ini, maka Perusahaan berhak mengambil tindakan Pemutusan Hubungan Kerja (PHK) secara sepihak sesuai dengan Undang-Undang Ketenagakerjaan yang berlaku.</li>
                             ) : (
                                <li className="pl-2">Apabila Saudara/i terbukti melakukan pelanggaran kembali selama masa berlaku surat ini, maka Perusahaan akan meningkatkan sanksi administratif ke tingkat Surat Peringatan selanjutnya (Surat Peringatan {parseInt(data.tingkatSP) + 1}) yang dapat berujung pada Pemutusan Hubungan Kerja (PHK).</li>
                             )}
                             <li className="pl-2">Selama masa berlakunya Surat Peringatan ini, penilaian kinerja (KPI) Saudara/i akan dievaluasi secara ketat oleh pihak Manajemen.</li>
                         </ol>
                     </div>

                     <div className="break-inside-avoid pt-6">
                         <p>Demikian Surat Peringatan ini dibuat agar dapat diperhatikan dan dilaksanakan dengan penuh rasa tanggung jawab. Dibuat di <strong>{data.kotaPembuatan}</strong> pada tanggal <strong>{formatDate(data.tanggalPembuatan)}</strong>.</p>
                     </div>
                  </div>

                  {/* AREA TTD */}
                  <div className="mt-16 pt-8 break-inside-avoid flex justify-between items-start">
                     <div className="w-1/2 text-center pr-4">
                        <p className="mb-24 uppercase">Karyawan Yang Bersangkutan,</p>
                        <p className="font-bold underline uppercase">{data.karyawan.nama}</p>
                        <p className="text-[10pt] mt-1">{data.karyawan.nik}</p>
                     </div>
                     <div className="w-1/2 text-center pl-4">
                        <p className="mb-24 uppercase">Atas Nama Perusahaan,</p>
                        <p className="font-bold underline uppercase">{data.perusahaan.namaPimpinan}</p>
                        <p className="text-[10pt] mt-1">{data.perusahaan.jabatanPimpinan}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

            {/* PRINT WRAPPER / PAYWALL */}
            <div className="mt-8 w-full max-w-[210mm] mx-auto">
               <PrintWrapper documentName="Surat_Peringatan_Karyawan" price={15000} />
            </div>

            <div className="h-20 md:hidden"></div>
         </div>
      </div>
      </main>
    </div>
  );
}
