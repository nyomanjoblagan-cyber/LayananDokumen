'use client';
import { useFormSync } from '@/lib/useFormSync';


import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Eye, LayoutTemplate, AlertCircle, Scale, User, CheckCircle2, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ComplaintData {
  // Meta Surat
  tempatTanggal: string;
  perihal: string;
  lampiran: string;
  kategoriPengaduan: string;
  
  // Tujuan
  tujuan: string;
  alamatTujuan: string;
  
  // Data Pelapor
  namaPelapor: string;
  nikPelapor: string;
  alamatPelapor: string;
  pekerjaanPelapor: string;
  noTelpPelapor: string;
  emailPelapor: string;
  
  // Data Terlapor
  namaTerlapor: string;
  alamatTerlapor: string;
  kontakTerlapor: string;
  
  // Uraian Pengaduan
  kronologis: string;
  tuntutan: string;
  
  // Penutup
  namaSaksi: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ComplaintData = {
  tempatTanggal: 'Jakarta, 13 Juli 2026',
  perihal: 'Pengaduan Dugaan Pelanggaran Ketenagakerjaan',
  lampiran: '3 (Tiga) Berkas',
  kategoriPengaduan: 'Ketenagakerjaan',
  
  tujuan: 'Dinas Tenaga Kerja, Transmigrasi dan Energi Provinsi DKI Jakarta',
  alamatTujuan: 'Jl. Prapatan No. 52, Kwitang, Senen\nJakarta Pusat 10410',
  
  namaPelapor: 'Andi Saputra',
  nikPelapor: '3171234567890001',
  alamatPelapor: 'Jl. Merdeka Selatan No. 12, RT 01/RW 02, Jakarta Selatan',
  pekerjaanPelapor: 'Karyawan Swasta',
  noTelpPelapor: '0812-9876-5432',
  emailPelapor: 'andi.saputra@email.com',
  
  namaTerlapor: 'PT. MAJU BERSAMA',
  alamatTerlapor: 'Gedung Office Tower Lt. 5, Jl. Jend. Sudirman Kav. 10, Jakarta Selatan',
  kontakTerlapor: '(021) 555-1234',
  
  kronologis: 'Bahwa saya telah bekerja di PT. MAJU BERSAMA sejak 1 Januari 2020 hingga 30 Juni 2026. Pada tanggal 1 Juli 2026, saya diberhentikan secara sepihak tanpa diberikan Surat Peringatan (SP) sebelumnya dan tanpa diberikan kompensasi pesangon sesuai dengan ketentuan UU Cipta Kerja.\n\nBahwa selama bekerja, saya juga sering diminta melakukan lembur tanpa ada pembayaran upah lembur (overtime) dari pihak perusahaan.',
  
  tuntutan: '1. Memohon kebijaksanaan dari Bapak/Ibu Kepala Dinas Tenaga Kerja untuk memanggil pihak PT. MAJU BERSAMA.\n2. Menuntut pihak perusahaan agar membayarkan hak pesangon dan upah lembur sesuai ketentuan undang-undang yang berlaku.',
  
  namaSaksi: '1. Budi Santoso (Rekan Kerja)\n2. Siti Aminah (HR Staff)'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-black font-serif leading-snug text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PengaduanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Pengaduan...</div>}>
      <ComplaintBuilder />
    </Suspense>
  );
}

function ComplaintBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<ComplaintData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof ComplaintData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
        <style dangerouslySetInnerHTML={{__html: `
          .pengaduan-table td { padding: 4px 8px 4px 0; vertical-align: top; font-size: 11pt; }
          .pengaduan-table td:nth-child(1) { width: 30%; }
          .pengaduan-table td:nth-child(2) { width: 2%; }
          .pengaduan-table td:nth-child(3) { width: 68%; }
          .surat-header td { font-size: 11pt; padding: 2px 0; vertical-align: top; }
        `}} />

        {/* Header / Tanggal */}
        <div className="flex justify-between items-start mb-8 break-inside-avoid shrink-0">
          <div className="w-1/2">
            <table className="surat-header w-full">
              <tbody>
                <tr>
                  <td className="w-20">Perihal</td>
                  <td className="w-4">:</td>
                  <td className="font-bold uppercase underline">{data.perihal}</td>
                </tr>
                <tr>
                  <td>Lampiran</td>
                  <td>:</td>
                  <td>{data.lampiran}</td>
                </tr>
                <tr>
                  <td>Kategori</td>
                  <td>:</td>
                  <td>{data.kategoriPengaduan}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-right text-[11pt]">
            {data.tempatTanggal}
          </div>
        </div>

        {/* Tujuan */}
        <div className="mb-8 shrink-0">
          <p className="mb-1">Kepada Yth.,</p>
          <p className="font-bold text-lg mb-1 leading-tight">{data.tujuan}</p>
          <div className="whitespace-pre-line text-[11pt]">{data.alamatTujuan}</div>
        </div>

        {/* Pembuka */}
        <div className="mb-6">
          <p className="mb-2">Dengan hormat,</p>
          <p className="text-justify indent-8">
            Saya yang bertanda tangan di bawah ini selaku pelapor:
          </p>
        </div>

        {/* Identitas Pelapor */}
        <div className="mb-6 pl-4 border-l-[3px] border-slate-300">
          <table className="w-full pengaduan-table">
            <tbody>
              <tr>
                <td>Nama Lengkap</td>
                <td>:</td>
                <td className="font-bold">{data.namaPelapor}</td>
              </tr>
              <tr>
                <td>Nomor Induk Kependudukan (NIK)</td>
                <td>:</td>
                <td>{data.nikPelapor}</td>
              </tr>
              <tr>
                <td>Pekerjaan</td>
                <td>:</td>
                <td>{data.pekerjaanPelapor}</td>
              </tr>
              <tr>
                <td>Alamat Lengkap</td>
                <td>:</td>
                <td className="whitespace-pre-line">{data.alamatPelapor}</td>
              </tr>
              <tr>
                <td>No. Telepon / HP</td>
                <td>:</td>
                <td>{data.noTelpPelapor}</td>
              </tr>
              <tr>
                <td>Alamat Email</td>
                <td>:</td>
                <td>{data.emailPelapor}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Penghubung */}
        <div className="mb-6">
          <p className="text-justify indent-8">
            Melalui surat ini bermaksud mengajukan laporan / pengaduan resmi atas dugaan pelanggaran / tindakan yang merugikan yang dilakukan oleh pihak terlapor, yaitu:
          </p>
        </div>

        {/* Identitas Terlapor */}
        <div className="mb-6 pl-4 border-l-[3px] border-slate-800">
          <table className="w-full pengaduan-table">
            <tbody>
              <tr>
                <td>Nama / Instansi Terlapor</td>
                <td>:</td>
                <td className="font-bold uppercase text-red-800">{data.namaTerlapor}</td>
              </tr>
              <tr>
                <td>Alamat Terlapor</td>
                <td>:</td>
                <td className="whitespace-pre-line">{data.alamatTerlapor}</td>
              </tr>
              <tr>
                <td>Kontak Terlapor</td>
                <td>:</td>
                <td>{data.kontakTerlapor || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Kronologis & Tuntutan */}
        <div className="mb-8">
          <p className="font-bold uppercase border-b border-black mb-2 inline-block">A. Kronologis Kejadian</p>
          <div className="whitespace-pre-line text-justify mb-6">{data.kronologis}</div>

          <p className="font-bold uppercase border-b border-black mb-2 inline-block">B. Tuntutan / Harapan Pelapor</p>
          <div className="whitespace-pre-line text-justify mb-6">{data.tuntutan}</div>

          {data.namaSaksi && (
            <div className="">
              <p className="font-bold uppercase border-b border-black mb-2 inline-block">C. Saksi - Saksi</p>
              <div className="whitespace-pre-line text-justify mb-6">{data.namaSaksi}</div>
            </div>
          )}
        </div>

        {/* Penutup */}
        <div className="mb-12">
          <p className="text-justify indent-8 mb-2">
            Demikian surat pengaduan ini saya buat dengan sebenar-benarnya dalam keadaan sadar dan tanpa ada paksaan dari pihak manapun. Saya bersedia memberikan keterangan lebih lanjut beserta bukti-bukti pendukung apabila diperlukan.
          </p>
          <p className="text-justify indent-8">
            Atas perhatian, perlindungan, dan tindak lanjut dari Bapak/Ibu, saya sampaikan terima kasih.
          </p>
        </div>

        {/* Tanda Tangan */}
        <div className="flex justify-end pr-8 shrink-0 break-inside-avoid">
          <div className="w-64 text-center">
            <p className="mb-2">Hormat saya,</p>
            <p className="mb-24">Pelapor,</p>
            <div className="relative inline-block text-center w-full">
              <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-16 h-20 border border-slate-400 flex flex-col items-center justify-center bg-slate-50 opacity-60 print:opacity-100 -z-10">
                <span className="text-[7px] text-slate-400 text-center uppercase leading-none">Meterai<br/>10.000</span>
              </div>
              <p className="font-bold underline uppercase relative z-10 bg-white/50 print:bg-transparent">{data.namaPelapor}</p>
            </div>
          </div>
        </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .{ page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-rose-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Pengaduan</h1>
              <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Enterprise Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-rose-600 hover:bg-rose-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-rose-600 border-b-2 border-rose-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

 <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative ">
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
            <div>
              <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                <Scale size={18} className="text-rose-600" /> Editor Pengaduan
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lengkapi data laporan</p>
            </div>
            <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-lg transition-colors" title="Reset Formulir">
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            
            {/* 1. Info Surat */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-rose-800 text-sm">1. Info Surat & Tujuan</h3>
              <div className="grid grid-cols-2 gap-3">
                 <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kategori Pengaduan</label>
                    <select value={data.kategoriPengaduan} onChange={(e) => handleDataChange('kategoriPengaduan', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none">
                      <option value="Ketenagakerjaan">Ketenagakerjaan</option>
                      <option value="Perlindungan Konsumen">Perlindungan Konsumen</option>
                      <option value="Tindak Pidana Umum">Tindak Pidana Umum</option>
                      <option value="Sengketa Perdata">Sengketa Perdata</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tempat, Tanggal</label>
                    <input type="text" value={data.tempatTanggal} onChange={(e) => handleDataChange('tempatTanggal', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Lampiran</label>
                    <input type="text" value={data.lampiran} onChange={(e) => handleDataChange('lampiran', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Perihal</label>
                 <input type="text" value={data.perihal} onChange={(e) => handleDataChange('perihal', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
              <div className="pt-2">
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kepada Yth. (Pihak Dituju)</label>
                 <input type="text" value={data.tujuan} onChange={(e) => handleDataChange('tujuan', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Tujuan</label>
                 <textarea value={data.alamatTujuan} onChange={(e) => handleDataChange('alamatTujuan', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none resize-none" />
              </div>
            </div>

            {/* 2. Pelapor */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-600 text-sm flex items-center gap-2"><User size={14}/> 2. Identitas Pelapor</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                <input type="text" value={data.namaPelapor} onChange={(e) => handleDataChange('namaPelapor', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. KTP/NIK</label>
                    <input type="text" value={data.nikPelapor} onChange={(e) => handleDataChange('nikPelapor', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pekerjaan</label>
                    <input type="text" value={data.pekerjaanPelapor} onChange={(e) => handleDataChange('pekerjaanPelapor', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. Telepon</label>
                    <input type="text" value={data.noTelpPelapor} onChange={(e) => handleDataChange('noTelpPelapor', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                    <input type="text" value={data.emailPelapor} onChange={(e) => handleDataChange('emailPelapor', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Domisili</label>
                 <textarea value={data.alamatPelapor} onChange={(e) => handleDataChange('alamatPelapor', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
              </div>
            </div>

            {/* 3. Terlapor */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-red-600 text-sm flex items-center gap-2"><ShieldAlert size={14}/> 3. Identitas Terlapor</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama / Perusahaan Terlapor</label>
                <input type="text" value={data.namaTerlapor} onChange={(e) => handleDataChange('namaTerlapor', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Terlapor</label>
                 <textarea value={data.alamatTerlapor} onChange={(e) => handleDataChange('alamatTerlapor', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-red-500 outline-none resize-none" />
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kontak Terlapor (Jika Ada)</label>
                 <input type="text" value={data.kontakTerlapor} onChange={(e) => handleDataChange('kontakTerlapor', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-red-500 outline-none" />
              </div>
            </div>

            {/* 4. Tuntutan */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-emerald-600 text-sm flex items-center gap-2"><CheckCircle2 size={14}/> 4. Uraian & Tuntutan</h3>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kronologis Kejadian</label>
                 <textarea value={data.kronologis} onChange={(e) => handleDataChange('kronologis', e.target.value)} rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none resize-none leading-relaxed" />
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tuntutan / Harapan Pelapor</label>
                 <textarea value={data.tuntutan} onChange={(e) => handleDataChange('tuntutan', e.target.value)} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none resize-none leading-relaxed" />
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Saksi-Saksi (Jika Ada)</label>
                 <textarea value={data.namaSaksi} onChange={(e) => handleDataChange('namaSaksi', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none resize-none leading-relaxed" />
              </div>
            </div>

            <div className="pb-10"></div>
          </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide print:hidden`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Surat Pengaduan" price={5000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
