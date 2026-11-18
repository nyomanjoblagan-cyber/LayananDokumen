import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\lamaran\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: LamaranPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Lamaran Kerja Profesional
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  UserCircle, Briefcase, FileText
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LamaranData {
  tempatTanggal: string;
  lampiran: string;
  hal: string;
  
  namaPenerima: string;
  perusahaanTujuan: string;
  alamatTujuan: string;
  
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  pendidikan: string;
  alamatPelamar: string;
  noTelp: string;
  email: string;
  
  posisiDilamar: string;
  sumberInfo: string;
  pengalamanKeahlian: string;
  daftarLampiran: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LamaranData = {
  tempatTanggal: 'Jakarta, 14 Juli 2026',
  lampiran: '5 (Lima) Lembar',
  hal: 'Lamaran Pekerjaan',
  
  namaPenerima: 'HRD Manager',
  perusahaanTujuan: 'PT. INOVASI DIGITAL TEKNOLOGI',
  alamatTujuan: 'Gedung Cyber Lt. 10\\nJl. Kuningan Barat No. 8, Jakarta Selatan 12710',
  
  namaLengkap: 'Budi Hartanto, S.Kom.',
  tempatLahir: 'Bandung',
  tanggalLahir: '2000-08-15',
  jenisKelamin: 'Laki-laki',
  pendidikan: 'S1 Teknik Informatika - Institut Teknologi Bandung (IPK: 3.85)',
  alamatPelamar: 'Jl. Dago Asri No. 45, Coblong, Kota Bandung, Jawa Barat 40135',
  noTelp: '0812-3456-7890',
  email: 'budi.hartanto@email.com',
  
  posisiDilamar: 'Senior Frontend Developer',
  sumberInfo: 'portal lowongan kerja TechJobs.id pada tanggal 10 Juli 2026',
  pengalamanKeahlian: 'Saya memiliki pengalaman selama 3 tahun bekerja sebagai Frontend Engineer dengan fokus pada ekosistem React, Next.js, dan Tailwind CSS. Selama bekerja, saya telah berhasil memimpin tim dalam migrasi sistem legacy ke arsitektur modern yang meningkatkan performa aplikasi hingga 40%. Saya juga terbiasa bekerja dengan metodologi Agile/Scrum dan berkolaborasi erat dengan tim UI/UX serta Backend.',
  daftarLampiran: '1. Curriculum Vitae (CV)\\n2. Fotokopi Ijazah Terakhir\\n3. Fotokopi Transkrip Nilai\\n4. Portofolio Project\\n5. Pas Foto 4x6'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function LamaranPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Lamaran...</div>}>
      <LamaranBuilder />
    </Suspense>
  );
}

function LamaranBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LamaranData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'tujuan' | 'pelamar' | 'isi'>('tujuan');

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const formattedDate = `Jakarta, ${today.getDate()} ${today.toLocaleString('id-ID', {month: 'long'})} ${today.getFullYear()}`;
    setData(prev => ({ ...prev, tempatTanggal: formattedDate }));
  }, []);

  const handleDataChange = (field: keyof LamaranData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat lamaran ke awal?')) {
        const today = new Date();
        const formattedDate = `Jakarta, ${today.getDate()} ${today.toLocaleString('id-ID', {month: 'long'})} ${today.getFullYear()}`;
        setData({ ...INITIAL_DATA, tempatTanggal: formattedDate });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        if(dateString.includes('-')) {
            try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } catch { return dateString; }
        }
        return dateString;
    };

    return (
      <Kertas>
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8 break-inside-avoid">
            <div>
                <table className="text-[11pt]">
                    <tbody>
                        <tr><td className="w-20 align-top">Hal</td><td className="w-4 align-top">:</td><td className="font-bold">{data.hal}</td></tr>
                        <tr><td className="w-20 align-top">Lampiran</td><td className="w-4 align-top">:</td><td>{data.lampiran}</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="text-right">
                {data.tempatTanggal}
            </div>
        </div>

        {/* TUJUAN */}
        <div className="mb-8 break-inside-avoid">
            <p className="mb-1">Yth.</p>
            <p className="font-bold">{data.namaPenerima}</p>
            <p className="font-bold uppercase">{data.perusahaanTujuan}</p>
            <div className="whitespace-pre-line">{data.alamatTujuan}</div>
        </div>

        {/* SALAM PEMBUKA & DATA DIRI */}
        <div className="mb-4 text-justify break-inside-avoid">
            <p className="mb-3">Dengan hormat,</p>
            <p className="mb-4">
                Berdasarkan informasi lowongan pekerjaan yang saya peroleh melalui {data.sumberInfo}, 
                bersama surat ini saya bermaksud mengajukan diri untuk melamar pekerjaan pada posisi <strong>{data.posisiDilamar}</strong> di perusahaan yang Bapak/Ibu pimpin.
            </p>
            <p className="mb-2">Adapun data diri saya adalah sebagai berikut:</p>
            
            <div className="ml-8 mb-4">
                <table className="w-full text-[11pt]">
                    <tbody>
                        <tr><td className="w-40 py-1">Nama Lengkap</td><td className="w-4">:</td><td className="font-bold uppercase py-1">{data.namaLengkap}</td></tr>
                        <tr><td className="py-1">Tempat, Tanggal Lahir</td><td>:</td><td className="py-1">{data.tempatLahir}, {formatDateSafe(data.tanggalLahir)}</td></tr>
                        <tr><td className="py-1">Jenis Kelamin</td><td>:</td><td className="py-1">{data.jenisKelamin}</td></tr>
                        <tr><td className="py-1 align-top">Pendidikan Terakhir</td><td className="align-top">:</td><td className="py-1 align-top">{data.pendidikan}</td></tr>
                        <tr><td className="py-1 align-top">Alamat Domisili</td><td className="align-top">:</td><td className="py-1 align-top text-justify">{data.alamatPelamar}</td></tr>
                        <tr><td className="py-1">No. HP / WhatsApp</td><td>:</td><td className="py-1">{data.noTelp}</td></tr>
                        <tr><td className="py-1">Email</td><td>:</td><td className="py-1 font-sans">{data.email}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* ISI / KOMPETENSI */}
        <div className="mb-4 text-justify break-inside-avoid">
            <p className="whitespace-pre-line leading-relaxed">{data.pengalamanKeahlian}</p>
        </div>

        {/* LAMPIRAN */}
        <div className="mb-6 text-justify break-inside-avoid">
            <p className="mb-2">Sebagai bahan pertimbangan, saya lampirkan kelengkapan administrasi sebagai berikut:</p>
            <div className="ml-8 whitespace-pre-line leading-relaxed">
                {data.daftarLampiran}
            </div>
        </div>

        {/* PENUTUP */}
        <div className="mb-12 text-justify break-inside-avoid">
            <p>
                Demikian surat lamaran ini saya buat dengan sebenar-benarnya. Besar harapan saya agar Bapak/Ibu bersedia memberikan kesempatan wawancara agar saya dapat menjelaskan lebih detail mengenai kualifikasi dan potensi yang saya miliki.
            </p>
            <p className="mt-2">Atas perhatian dan waktu yang Bapak/Ibu berikan, saya ucapkan terima kasih.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-end text-center break-inside-avoid">
            <div className="w-64">
                <p className="mb-2">Hormat saya,</p>
                <div className="h-24"></div>
                <p className="font-bold underline uppercase">{data.namaLengkap}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Lamaran Kerja</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-blue-600" /> Data Lamaran</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('tujuan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'tujuan' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Tujuan Surat</button>
                <button onClick={() => setActiveTab('pelamar')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pelamar' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Biodata Pelamar</button>
                <button onClick={() => setActiveTab('isi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'isi' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Isi & Kualifikasi</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'tujuan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-slate-600"/> Tujuan Lamaran
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat & Tanggal Surat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tempatTanggal} onChange={e => handleDataChange('tempatTanggal', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jumlah Lampiran</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.lampiran} onChange={e => handleDataChange('lampiran', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Posisi Yang Dituju (Yth.)</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPenerima} onChange={e => handleDataChange('namaPenerima', e.target.value)} placeholder="Contoh: HRD Manager / Bapak Budi" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Tujuan</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.perusahaanTujuan} onChange={e => handleDataChange('perusahaanTujuan', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan Tujuan</label>
                        <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatTujuan} onChange={e => handleDataChange('alamatTujuan', e.target.value)} />
                    </div>
                  </div>
              )}

              {activeTab === 'pelamar' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle size={14} className="text-blue-600"/> Biodata Pelamar
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap & Gelar</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.namaLengkap} onChange={e => handleDataChange('namaLengkap', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tempatLahir} onChange={e => handleDataChange('tempatLahir', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tanggalLahir} onChange={e => handleDataChange('tanggalLahir', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.jenisKelamin} onChange={e => handleDataChange('jenisKelamin', e.target.value)}>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pendidikan Terakhir & IPK</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pendidikan} onChange={e => handleDataChange('pendidikan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.alamatPelamar} onChange={e => handleDataChange('alamatPelamar', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / WA</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.noTelp} onChange={e => handleDataChange('noTelp', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Aktif</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.email} onChange={e => handleDataChange('email', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'isi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-emerald-600"/> Posisi & Kualifikasi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Posisi Yang Dilamar</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-emerald-900" value={data.posisiDilamar} onChange={e => handleDataChange('posisiDilamar', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sumber Informasi Lowongan (Didapat dari mana & kapan)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.sumberInfo} onChange={e => handleDataChange('sumberInfo', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pengalaman Kerja & Keahlian Utama (Jual Diri Anda)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.pengalamanKeahlian} onChange={e => handleDataChange('pengalamanKeahlian', e.target.value)} />
                            <p className="text-[10px] text-slate-400 mt-1 italic">*Tuliskan dalam 1-2 paragraf singkat yang menonjolkan kekuatan utama Anda.</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Daftar Lampiran Berkas</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-28 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.daftarLampiran} onChange={e => handleDataChange('daftarLampiran', e.target.value)} />
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
              <PrintWrapper documentName={`Surat_Lamaran_${data.namaLengkap.replace(/\\s+/g, '_')}`} price={10000} />
           </div>

        </div>
      </main>

    </div>
  );
}
"""
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
