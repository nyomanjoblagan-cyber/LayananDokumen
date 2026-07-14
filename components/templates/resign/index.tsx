'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, FileText, User, Building2
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ResignData {
  tempatTanggal: string;
  namaPenerima: string;
  jabatanPenerima: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;
  
  namaKaryawan: string;
  jabatanKaryawan: string;
  departemenKaryawan: string;
  
  tanggalEfektif: string;
  alasanResign: string;
  ucapanTerimaKasih: string;
}

// --- 2. DATA DEFAULT ---
const getInitialData = (): ResignData => {
  const today = new Date();
  
  // Format Tanggal: Jakarta, 14 Juli 2026
  const formatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedToday = formatter.format(today);
  
  // Tanggal Efektif default = 30 hari dari sekarang (One Month Notice)
  const nextMonth = new Date(today);
  nextMonth.setDate(nextMonth.getDate() + 30);
  const formattedNextMonth = formatter.format(nextMonth);

  return {
    tempatTanggal: `Jakarta, ${formattedToday}`,
    namaPenerima: 'Bpk. Budi Santoso',
    jabatanPenerima: 'HRD Manager',
    namaPerusahaan: 'PT INDONESIA MAJU SEJAHTERA',
    alamatPerusahaan: 'Gedung Menara Mulia, Lantai 5\nJl. Gatot Subroto, Jakarta',
    
    namaKaryawan: 'Andi Pratama, S.Kom.',
    jabatanKaryawan: 'Senior Software Engineer',
    departemenKaryawan: 'Information Technology (IT)',
    
    tanggalEfektif: formattedNextMonth,
    alasanResign: '', // Dikosongkan agar opsional
    ucapanTerimaKasih: 'Saya mengucapkan banyak terima kasih atas kesempatan yang telah diberikan kepada saya untuk belajar dan berkembang bersama perusahaan ini. Saya juga memohon maaf yang sebesar-besarnya apabila selama saya bekerja terdapat kesalahan maupun kekurangan.\n\nSaya berharap perusahaan akan terus berkembang dan semakin sukses di masa yang akan datang. Saya bersedia untuk membantu proses transisi pekerjaan (handover) agar berjalan dengan lancar hingga tanggal terakhir saya bekerja.',
  };
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratResignPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Resign...</div>}>
      <ResignBuilder />
    </Suspense>
  );
}

function ResignBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'tujuan' | 'karyawan' | 'isi'>('tujuan');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ResignData>(getInitialData());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(getInitialData());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const DocumentContent = () => (
    <Kertas>
      <style dangerouslySetInnerHTML={{__html: `
        .resign-table td { padding: 4px 8px 4px 0; vertical-align: top; font-size: 11pt; }
        .resign-table td:nth-child(1) { width: 30%; }
        .resign-table td:nth-child(2) { width: 2%; }
        .resign-table td:nth-child(3) { width: 68%; }
        p { font-size: 11pt; margin-bottom: 12px; line-height: 1.5; text-align: justify; }
      `}} />

      {/* Header / Tanggal */}
      <div className="text-right text-[11pt] mb-8 break-inside-avoid">
        {data.tempatTanggal}
      </div>
      
      {/* Perihal & Tujuan */}
      <div className="mb-10 text-[11pt] break-inside-avoid">
        <table className="w-full mb-6">
          <tbody>
            <tr>
              <td className="w-20 align-top">Hal</td>
              <td className="w-4 align-top">:</td>
              <td className="font-bold align-top">Surat Pengunduran Diri (Resign)</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-0">Kepada Yth.</p>
        <p className="font-bold mb-0">{data.namaPenerima} / {data.jabatanPenerima}</p>
        <p className="font-bold mb-0">{data.namaPerusahaan}</p>
        <div className="whitespace-pre-line leading-relaxed">{data.alamatPerusahaan}</div>
      </div>

      {/* Pembuka */}
      <div className="mb-6 break-inside-avoid">
        <p>Dengan hormat,</p>
        <p>Melalui surat ini, saya yang bertanda tangan di bawah ini:</p>
      </div>

      {/* Identitas Karyawan */}
      <div className="mb-6 pl-8 break-inside-avoid">
        <table className="w-full resign-table">
          <tbody>
            <tr>
              <td>Nama Lengkap</td>
              <td>:</td>
              <td className="font-bold">{data.namaKaryawan}</td>
            </tr>
            <tr>
              <td>Jabatan</td>
              <td>:</td>
              <td>{data.jabatanKaryawan}</td>
            </tr>
            {data.departemenKaryawan && (
            <tr>
              <td>Departemen</td>
              <td>:</td>
              <td>{data.departemenKaryawan}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Isi Surat */}
      <div className="mb-6 break-inside-avoid">
        <p className="indent-8">
          Bermaksud menyampaikan permohonan untuk mengundurkan diri dari jabatan saya sebagai <strong>{data.jabatanKaryawan}</strong> di <strong>{data.namaPerusahaan}</strong>, terhitung efektif mulai tanggal <strong>{data.tanggalEfektif}</strong>.
        </p>
        {data.alasanResign && (
          <p className="indent-8">
            Keputusan ini saya ambil karena {data.alasanResign}.
          </p>
        )}
      </div>

      {/* Ucapan Terima Kasih */}
      <div className="mb-6 break-inside-avoid whitespace-pre-line text-justify indent-8">
        {data.ucapanTerimaKasih}
      </div>

      <div className="mb-8 break-inside-avoid text-justify">
        <p className="indent-8">
          Demikian surat pengunduran diri ini saya sampaikan dengan sebenarnya. Atas perhatian dan kerjasamanya, saya ucapkan terima kasih.
        </p>
      </div>

      {/* Tanda Tangan */}
      <div className="flex justify-end text-center break-inside-avoid shrink-0">
        <div className="w-64">
          <p className="mb-16">Hormat saya,</p>
          <p className="font-bold underline">{data.namaKaryawan}</p>
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

      {/* TOP NAVIGATION BAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex flex-col">
               <span className="font-black text-sm tracking-widest uppercase text-white">Surat Pengunduran Diri (Resign)</span>
               <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Career Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans shrink-0">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden relative print:hidden h-[calc(100vh-64px)]">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] bg-white border-r border-slate-200 h-full md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
           <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b border-slate-200 bg-slate-100 text-[10px] font-bold uppercase shrink-0">
              <button onClick={() => setActiveTab('tujuan')} className={`flex-1 py-3 border-r border-slate-200 ${activeTab === 'tujuan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Tujuan</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r border-slate-200 ${activeTab === 'karyawan' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('isi')} className={`flex-1 py-3 ${activeTab === 'isi' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Isi & Alasan</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'tujuan' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b border-slate-200 pb-1 mb-4 flex items-center gap-2"><Building2 size={14}/> Perusahaan & Penerima</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat, Tanggal Surat</label>
                  <input type="text" name="tempatTanggal" value={data.tempatTanggal} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="pt-2 border-t border-slate-200 mt-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penerima (Misal HRD/Atasan)</label>
                  <input type="text" name="namaPenerima" value={data.namaPenerima} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Penerima</label>
                  <input type="text" name="jabatanPenerima" value={data.jabatanPenerima} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="pt-2 border-t border-slate-200 mt-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold uppercase mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea name="alamatPerusahaan" value={data.alamatPerusahaan} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm mt-1 h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
              </div>
              )}

              {activeTab === 'karyawan' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b border-slate-200 pb-1 mb-4 flex items-center gap-2"><User size={14}/> Identitas Karyawan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Karyawan</label>
                  <input type="text" name="namaKaryawan" value={data.namaKaryawan} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Anda Saat Ini</label>
                  <input type="text" name="jabatanKaryawan" value={data.jabatanKaryawan} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen / Divisi (Opsional)</label>
                  <input type="text" name="departemenKaryawan" value={data.departemenKaryawan} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              )}

              {activeTab === 'isi' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b border-slate-200 pb-1 mb-4 flex items-center gap-2"><FileText size={14}/> Isi Surat & Tanggal</h3>
                <div>
                  <label className="text-[10px] font-bold text-amber-700 uppercase">Tanggal Efektif Resign (Hari Terakhir Kerja)</label>
                  <input type="text" name="tanggalEfektif" value={data.tanggalEfektif} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold text-amber-700 bg-amber-50 mt-1 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Cth: 15 Agustus 2026" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Resign (Opsional)</label>
                  <p className="text-[10px] text-slate-400 mb-2">Boleh dikosongkan. Jika diisi, akan otomatis diawali dengan kata "Keputusan ini saya ambil karena..."</p>
                  <textarea name="alasanResign" value={data.alasanResign} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm mt-1 h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Cth: saya ingin melanjutkan pendidikan S2 di luar negeri"></textarea>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Ucapan Terima Kasih / Permohonan Maaf</label>
                  <textarea name="ucapanTerimaKasih" value={data.ucapanTerimaKasih} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm mt-1 h-40 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed"></textarea>
                </div>
              </div>
              )}
           </div>
        </aside>

        {/* Right Panel: Preview */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </main>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Surat_Pengunduran_Diri" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
