'use client';

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
  nomorSurat: '045/HRD-MBS/SKPK/VII/2026',
  
  namaPimpinan: 'Budi Santoso, S.E., M.M.',
  jabatanPimpinan: 'Direktur HRD',
  
  namaKaryawan: 'Andi Pratama, S.Kom.',
  nikKaryawan: 'MBS-2021-089',
  jabatanTerakhir: 'Senior Software Engineer',
  departemen: 'Information Technology (IT)',
  masaKerjaMulai: '15 Januari 2021',
  masaKerjaAkhir: '30 Juni 2026',
  
  alasanBerhenti: 'mengundurkan diri atas kemauan sendiri dengan cara yang baik',
  penilaian: 'telah menunjukkan dedikasi, loyalitas, dan kinerja yang sangat baik serta tidak pernah terlibat dalam tindakan yang merugikan perusahaan maupun melanggar hukum',
  
  tempatTerbit: 'Jakarta',
  tanggalTerbit: '13 Juli 2026',
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-snug text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
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
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    setData(prev => ({ ...prev, tanggalTerbit: today.toLocaleDateString('id-ID', options) }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        setData({ ...INITIAL_DATA, tanggalTerbit: today.toLocaleDateString('id-ID', options) });
    }
  };

  const DocumentContent = () => (
    <Kertas>
      <style dangerouslySetInnerHTML={{__html: `
        .keterangan-table td { padding: 4px 8px 4px 0; vertical-align: top; font-size: 11pt; }
        .keterangan-table td:nth-child(1) { width: 30%; }
        .keterangan-table td:nth-child(2) { width: 2%; }
        .keterangan-table td:nth-child(3) { width: 68%; }
      `}} />

      {/* KOP SURAT */}
      <div className="flex items-center border-b-4 border-black pb-4 mb-8 break-inside-avoid">
        <div className="w-24 h-24 bg-gray-100 border-2 border-gray-400 flex items-center justify-center text-center text-gray-500 font-bold text-xs shrink-0">
          LOGO<br/>PERUSAHAAN
        </div>
        <div className="flex-1 text-center px-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider mb-1" style={{ fontSize: '18pt' }}>{data.namaPerusahaan}</h1>
          <p className="text-sm mb-1">{data.alamatPerusahaan}</p>
          <p className="text-sm">{data.kontakPerusahaan}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 break-inside-avoid">
        <h2 className="text-xl font-bold uppercase tracking-wide border-b border-black inline-block pb-1">Surat Keterangan Pengalaman Kerja</h2>
        <p className="mt-2 text-[11pt] uppercase">Nomor: {data.nomorSurat}</p>
      </div>

      {/* ISI */}
      <div className="text-justify mb-8 break-inside-avoid">
        <p className="mb-4 text-[11pt]">Yang bertanda tangan di bawah ini:</p>
        <table className="w-full mb-6 ml-6 keterangan-table">
          <tbody>
            <tr>
              <td>Nama</td>
              <td>:</td>
              <td className="font-bold">{data.namaPimpinan}</td>
            </tr>
            <tr>
              <td>Jabatan</td>
              <td>:</td>
              <td>{data.jabatanPimpinan}</td>
            </tr>
            <tr>
              <td>Perusahaan</td>
              <td>:</td>
              <td>{data.namaPerusahaan}</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-4 text-[11pt] break-inside-avoid">Dengan ini menerangkan dengan sesungguhnya bahwa:</p>
        <table className="w-full mb-8 ml-6 keterangan-table break-inside-avoid">
          <tbody>
            <tr>
              <td>Nama Lengkap</td>
              <td>:</td>
              <td className="font-bold">{data.namaKaryawan}</td>
            </tr>
            <tr>
              <td>Nomor Induk Karyawan</td>
              <td>:</td>
              <td>{data.nikKaryawan}</td>
            </tr>
            <tr>
              <td>Jabatan Terakhir</td>
              <td>:</td>
              <td>{data.jabatanTerakhir}</td>
            </tr>
            <tr>
              <td>Departemen</td>
              <td>:</td>
              <td>{data.departemen}</td>
            </tr>
            <tr>
              <td>Masa Kerja</td>
              <td>:</td>
              <td>{data.masaKerjaMulai} s.d. {data.masaKerjaAkhir}</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-4 indent-8 text-[11pt] break-inside-avoid">
          Bahwa yang bersangkutan benar-benar telah bekerja dan mengabdi pada perusahaan kami, <strong>{data.namaPerusahaan}</strong>, dalam kurun waktu sebagaimana yang telah disebutkan di atas. Selama masa kerjanya, Saudara/i <strong>{data.namaKaryawan}</strong> {data.penilaian}.
        </p>
        
        <p className="mb-4 indent-8 text-[11pt] break-inside-avoid">
          Yang bersangkutan mengakhiri masa tugasnya di perusahaan kami dengan alasan {data.alasanBerhenti}. Kami mengucapkan terima kasih yang sebesar-besarnya atas segala kontribusi dan tenaga yang telah diberikan kepada perusahaan selama ini dan mendoakan kesuksesan di masa yang akan datang.
        </p>

        <p className="indent-8 text-[11pt] break-inside-avoid">
          Demikian Surat Keterangan Pengalaman Kerja (<em>Certificate of Employment</em>) ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya oleh yang bersangkutan.
        </p>
      </div>

      {/* TTD */}
      <div className="flex justify-end mt-16 pr-8 break-inside-avoid shrink-0">
        <div className="text-center w-64">
          <p className="mb-1 text-[11pt]">{data.tempatTerbit}, {data.tanggalTerbit}</p>
          <p className="font-bold mb-24 text-[11pt]">{data.namaPerusahaan}</p>
          
          <div className="relative">
            {/* Stamp */}
            <div className="absolute -left-12 -top-16 w-32 h-32 border-4 border-blue-800 rounded-full flex items-center justify-center  transform -rotate-12 ">
              <div className="border-2 border-blue-800 rounded-full w-28 h-28 flex items-center justify-center p-2 text-center">
                <span className="text-blue-800 font-bold text-xs uppercase">
                  {data.namaPerusahaan}
                  <br/><span className="text-[9px]">* HRD DEPARTMENT *</span>
                </span>
              </div>
            </div>
            
            <p className="font-bold underline text-[11pt]">{data.namaPimpinan}</p>
            <p className="text-[11pt]">{data.jabatanPimpinan}</p>
          </div>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Keterangan Kerja</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Paklaring / Employment Certificate</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans shrink-0">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

 <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative ">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <Building2 size={18} className="text-blue-600" /> Editor Paklaring
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase shrink-0">
              <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 border-r ${activeTab === 'perusahaan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Perusahaan</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-indigo-600 border-b-2 border-b-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('keterangan')} className={`flex-1 py-3 ${activeTab === 'keterangan' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Keterangan</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                
                {activeTab === 'perusahaan' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 flex items-center gap-2"><Building2 size={14}/> Profil Perusahaan</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                      <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                      <textarea name="alamatPerusahaan" value={data.alamatPerusahaan} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kontak Perusahaan (Telp/Email)</label>
                      <input type="text" name="kontakPerusahaan" value={data.kontakPerusahaan} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="pt-3 border-t">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat Paklaring</label>
                      <input type="text" name="nomorSurat" value={data.nomorSurat} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 mt-6 flex items-center gap-2"><User size={14}/> Penandatangan (HRD/Direksi)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap & Gelar</label>
                      <input type="text" name="namaPimpinan" value={data.namaPimpinan} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Pimpinan</label>
                      <input type="text" name="jabatanPimpinan" value={data.jabatanPimpinan} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                </div>
                )}

                {activeTab === 'karyawan' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-indigo-600 border-b pb-1 mb-4 flex items-center gap-2"><Briefcase size={14}/> Data Eks Karyawan</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Karyawan</label>
                      <input type="text" name="namaKaryawan" value={data.namaKaryawan} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-indigo-500 outline-none uppercase" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID Karyawan</label>
                      <input type="text" name="nikKaryawan" value={data.nikKaryawan} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Terakhir</label>
                      <input type="text" name="jabatanTerakhir" value={data.jabatanTerakhir} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen / Divisi</label>
                      <input type="text" name="departemen" value={data.departemen} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Kerja Mulai</label>
                        <input type="text" name="masaKerjaMulai" value={data.masaKerjaMulai} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="15 Jan 2021" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Kerja Selesai</label>
                        <input type="text" name="masaKerjaAkhir" value={data.masaKerjaAkhir} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="30 Jun 2026" />
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {activeTab === 'keterangan' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4 flex items-center gap-2"><Stamp size={14}/> Keterangan Khusus & Waktu Terbit</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Penilaian Kinerja / Testimoni</label>
                      <textarea name="penilaian" value={data.penilaian} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-32 resize-none focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"></textarea>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Berhenti</label>
                      <textarea name="alasanBerhenti" value={data.alasanBerhenti} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Terbit</label>
                        <input type="text" name="tempatTerbit" value={data.tempatTerbit} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Terbit</label>
                        <input type="text" name="tanggalTerbit" value={data.tanggalTerbit} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
                )}

                <div className="pb-10"></div>
            </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Paklaring_Keterangan_Kerja" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
