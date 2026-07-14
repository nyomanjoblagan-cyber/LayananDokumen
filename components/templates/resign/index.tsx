'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, BookOpen
} from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ResignData {
  pihak1Nama: string;
  pihak1NIK: string;
  pihak1TempatLahir: string;
  pihak1TanggalLahir: string;
  pihak1Pekerjaan: string;
  pihak1Alamat: string;
  companyName: string;
  companyAddress: string;

  pihak2Nama: string;
  pihak2NIK: string;
  pihak2TempatLahir: string;
  pihak2TanggalLahir: string;
  pihak2Pekerjaan: string;
  pihak2Alamat: string;

  tempatSurat: string;
  tanggalSurat: string;
  tanggalEfektif: string;

  klausulHandover: boolean;
  klausulAset: boolean;
  klausulNDA: boolean;
  klausulPelepasan: boolean;

  metodePembayaran: string;
  tanggunganPajak: string;
}

// --- 2. DATA DEFAULT ---
const getInitialData = (): ResignData => {
  const today = new Date();
  const nextMonth = addMonths(today, 1);
  return {
    pihak1Nama: 'Hendro Wijaya',
    pihak1NIK: '3171234567890001',
    pihak1TempatLahir: 'Jakarta',
    pihak1TanggalLahir: '1980-05-15',
    pihak1Pekerjaan: 'HR Manager',
    pihak1Alamat: 'Jl. Sudirman Kav. 45, Jakarta Selatan',
    companyName: 'PT INDONESIA MAJU SEJAHTERA',
    companyAddress: 'Gedung Menara Mulia, Lantai 5, Jl. Gatot Subroto, Jakarta',

    pihak2Nama: 'Budi Santoso',
    pihak2NIK: '3201234567890002',
    pihak2TempatLahir: 'Bandung',
    pihak2TanggalLahir: '1990-10-20',
    pihak2Pekerjaan: 'Senior Software Engineer',
    pihak2Alamat: 'Jl. Merdeka No. 10, RT 01/RW 02, Kota Bandung',

    tempatSurat: 'Jakarta',
    tanggalSurat: format(today, 'yyyy-MM-dd'),
    tanggalEfektif: format(nextMonth, 'yyyy-MM-dd'),

    klausulHandover: true,
    klausulAset: true,
    klausulNDA: true,
    klausulPelepasan: true,
    
    metodePembayaran: 'Transfer Bank',
    tanggunganPajak: 'Perusahaan',
  };
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function ResignTemplatePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Resign...</div>}>
      <ResignBuilder />
    </Suspense>
  );
}

function ResignBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'resign' | 'klausul'>('pihak1');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'd MMMM yyyy', { locale: id });
    } catch (e) {
      return dateStr;
    }
  };

  const getDayName = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'EEEE', { locale: id });
    } catch (e) {
      return '';
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-10 break-inside-avoid">
        <h1 className="text-xl font-bold uppercase underline underline-offset-4 tracking-wide mb-1">
          KESEPAKATAN BERSAMA PENGUNDURAN DIRI
        </h1>
        <p className="text-[11pt]">ANTARA</p>
        <p className="text-[11pt] font-bold uppercase">{data.companyName}</p>
        <p className="text-[11pt]">DENGAN</p>
        <p className="text-[11pt] font-bold uppercase">{data.pihak2Nama}</p>
      </div>

      {/* PENDAHULUAN */}
      <div className="mb-6 text-justify break-inside-avoid">
        <p className="mb-4">
          Pada hari ini, <strong>{getDayName(data.tanggalSurat)}</strong> tanggal <strong>{formatDateIndo(data.tanggalSurat)}</strong>, bertempat di <strong>{data.tempatSurat}</strong>, dibuat dan ditandatangani Kesepakatan Bersama Pengunduran Diri (selanjutnya disebut "<strong>Kesepakatan Bersama</strong>") oleh dan antara:
        </p>
      </div>

      {/* PIHAK PERTAMA */}
      <div className="mb-6 break-inside-avoid">
        <p className="font-bold mb-2">1. Pihak Pertama (Perusahaan)</p>
        <table className="w-full ml-4">
          <tbody>
            <tr>
              <td className="w-[180px] py-1 align-top">Nama Perusahaan</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 align-top font-bold uppercase">{data.companyName}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Alamat Perusahaan</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.companyAddress}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Diwakili Oleh</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top font-bold">{data.pihak1Nama}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Jabatan</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.pihak1Pekerjaan}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 ml-4 text-justify">
          Dalam hal ini bertindak untuk dan atas nama {data.companyName}, yang selanjutnya disebut <strong>PIHAK PERTAMA</strong>.
        </p>
      </div>

      {/* PIHAK KEDUA */}
      <div className="mb-8 break-inside-avoid">
        <p className="font-bold mb-2">2. Pihak Kedua (Karyawan)</p>
        <table className="w-full ml-4">
          <tbody>
            <tr>
              <td className="w-[180px] py-1 align-top">Nama</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 align-top font-bold">{data.pihak2Nama}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">NIK</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.pihak2NIK}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Tempat, Tanggal Lahir</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.pihak2TempatLahir}, {formatDateIndo(data.pihak2TanggalLahir)}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Pekerjaan/Jabatan</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.pihak2Pekerjaan}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Alamat</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top text-justify">{data.pihak2Alamat}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 ml-4 text-justify">
          Selanjutnya disebut <strong>PIHAK KEDUA</strong>.
        </p>
      </div>

      <div className="mb-6 text-justify break-inside-avoid">
        <p>PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut <strong>PARA PIHAK</strong>, menerangkan dan menyepakati hal-hal sebagai berikut:</p>
      </div>

      {/* KLAUSUL - PASAL */}
      <div className="space-y-6 text-justify">
        <div className="break-inside-avoid">
          <p className="font-bold text-center mb-2">PASAL 1<br/>PENGUNDURAN DIRI KARYAWAN</p>
          <p className="ml-8 -indent-4 mb-2">
            1. PIHAK KEDUA telah mengajukan permohonan pengunduran diri secara sukarela dari jabatannya di perusahaan PIHAK PERTAMA.
          </p>
          <p className="ml-8 -indent-4">
            2. PIHAK PERTAMA menyetujui permohonan pengunduran diri tersebut, sehingga hubungan kerja antara PARA PIHAK berakhir terhitung sejak tanggal <strong>{formatDateIndo(data.tanggalEfektif)}</strong>.
          </p>
        </div>

        {data.klausulHandover && (
          <div className="break-inside-avoid break-before-auto">
            <p className="font-bold text-center mb-2 mt-6">PASAL 2<br/>SERAH TERIMA PEKERJAAN (HANDOVER)</p>
            <p className="ml-8 -indent-4">
              1. PIHAK KEDUA berkewajiban melakukan serah terima seluruh tugas, pekerjaan, data, dan tanggung jawab kepada PIHAK PERTAMA atau pihak lain yang ditunjuk oleh PIHAK PERTAMA, selambat-lambatnya sebelum tanggal efektif pengunduran diri.
            </p>
          </div>
        )}

        {data.klausulAset && (
          <div className="break-inside-avoid break-before-auto">
            <p className="font-bold text-center mb-2 mt-6">PASAL 3<br/>PENGEMBALIAN ASET PERUSAHAAN</p>
            <p className="ml-8 -indent-4">
              1. PIHAK KEDUA wajib mengembalikan seluruh fasilitas, barang, inventaris, dan/atau dokumen milik PIHAK PERTAMA (seperti laptop, kartu identitas, kunci akses, kendaraan, dll) dalam keadaan baik selambat-lambatnya pada hari terakhir bekerja.
            </p>
          </div>
        )}

        {(data.klausulNDA || data.klausulPelepasan) && (
          <div className="break-inside-avoid break-before-auto">
            <p className="font-bold text-center mb-2 mt-6">PASAL 4<br/>KLAUSUL TAMBAHAN</p>
            {data.klausulNDA && (
              <p className="ml-8 -indent-4 mb-2">
                - PIHAK KEDUA terikat pada kewajiban menjaga kerahasiaan data dan informasi rahasia milik PIHAK PERTAMA (Non-Disclosure Agreement) baik selama maupun setelah berakhirnya hubungan kerja.
              </p>
            )}
            {data.klausulPelepasan && (
              <p className="ml-8 -indent-4">
                - Dengan ditandatanganinya Kesepakatan Bersama ini, PARA PIHAK saling membebaskan dari segala tuntutan hukum, baik perdata maupun pidana, di masa yang akan datang sehubungan dengan pemutusan hubungan kerja ini.
              </p>
            )}
          </div>
        )}

        <div className="break-inside-avoid break-before-auto">
          <p className="font-bold text-center mb-2 mt-6">PASAL 5<br/>HAK DAN KEWAJIBAN KEUANGAN</p>
          <p className="ml-8 -indent-4 mb-2">
            1. PIHAK PERTAMA akan membayarkan seluruh hak PIHAK KEDUA (seperti sisa gaji, uang pisah, atau kompensasi cuti yang belum diambil jika ada) sesuai dengan Peraturan Perusahaan yang berlaku.
          </p>
          <p className="ml-8 -indent-4 mb-2">
            2. Pembayaran hak tersebut akan dilakukan melalui metode <strong>{data.metodePembayaran}</strong> ke rekening PIHAK KEDUA.
          </p>
          <p className="ml-8 -indent-4">
            3. Beban pajak atas hak yang diterima PIHAK KEDUA menjadi tanggungan <strong>{data.tanggunganPajak}</strong> sesuai peraturan perpajakan yang berlaku.
          </p>
        </div>
      </div>

      {/* PENUTUP */}
      <div className="mt-8 mb-12 text-justify break-inside-avoid">
        <p>
          Demikian Kesepakatan Bersama ini dibuat dengan sebenarnya dalam keadaan sadar dan tanpa paksaan dari pihak manapun, dibuat dalam rangkap 2 (dua) yang masing-masing dibubuhi meterai secukupnya dan mempunyai kekuatan hukum yang sama.
        </p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between items-end mt-16 px-8 break-inside-avoid shrink-0">
        <div className="text-center w-64">
          <p className="mb-24">PIHAK PERTAMA,<br/>{data.companyName}</p>
          <p className="font-bold underline">{data.pihak1Nama}</p>
          <p>{data.pihak1Pekerjaan}</p>
        </div>
        <div className="text-center w-64">
          <p className="mb-24">PIHAK KEDUA,<br/>Karyawan</p>
          <p className="font-bold underline">{data.pihak2Nama}</p>
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
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex flex-col">
               <span className="font-black text-sm tracking-widest uppercase text-white">Generator Resign</span>
               <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Corporate Legal</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] relative print:hidden">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 shrink-0">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-emerald-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak I</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak II</button>
              <button onClick={() => setActiveTab('resign')} className={`flex-1 py-3 border-r ${activeTab === 'resign' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Resign</button>
              <button onClick={() => setActiveTab('klausul')} className={`flex-1 py-3 ${activeTab === 'klausul' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>Klausul</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Pihak Pertama (Perusahaan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap (Wakil)</label>
                  <input type="text" name="pihak1Nama" value={data.pihak1Nama} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK Wakil Perusahaan</label>
                  <input type="text" name="pihak1NIK" value={data.pihak1NIK} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Wakil</label>
                  <input type="text" name="pihak1Pekerjaan" value={data.pihak1Pekerjaan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="pt-3 border-t">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input type="text" name="companyName" value={data.companyName} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm font-bold uppercase mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea name="companyAddress" value={data.companyAddress} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 h-20 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Informasi Pihak Kedua (Karyawan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Karyawan</label>
                  <input type="text" name="pihak2Nama" value={data.pihak2Nama} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm font-bold mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK KTP Karyawan</label>
                  <input type="text" name="pihak2NIK" value={data.pihak2NIK} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input type="text" name="pihak2TempatLahir" value={data.pihak2TempatLahir} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" name="pihak2TanggalLahir" value={data.pihak2TanggalLahir} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Saat Ini</label>
                  <input type="text" name="pihak2Pekerjaan" value={data.pihak2Pekerjaan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Sesuai KTP</label>
                  <textarea name="pihak2Alamat" value={data.pihak2Alamat} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 h-20 focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                </div>
              </div>
              )}

              {activeTab === 'resign' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Jadwal Pengunduran Diri</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Penandatanganan</label>
                  <input type="text" name="tempatSurat" value={data.tempatSurat} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal TTD Kesepakatan</label>
                    <input type="date" name="tanggalSurat" value={data.tanggalSurat} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Efektif Resign</label>
                    <input type="date" name="tanggalEfektif" value={data.tanggalEfektif} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500 outline-none font-bold text-amber-700" />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'klausul' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase text-red-600 border-b pb-1 mb-4">Pengaturan Klausul</h3>
                
                <div className="space-y-3 bg-red-50 p-4 rounded-xl border border-red-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="klausulHandover" checked={data.klausulHandover} onChange={handleInputChange} className="mt-1 accent-red-600" />
                    <div>
                      <span className="block text-sm font-bold text-red-800">Sertakan Klausul Handover</span>
                      <span className="block text-[10px] text-red-600">Kewajiban serah terima pekerjaan ke pihak perusahaan.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="klausulAset" checked={data.klausulAset} onChange={handleInputChange} className="mt-1 accent-red-600" />
                    <div>
                      <span className="block text-sm font-bold text-red-800">Sertakan Klausul Aset</span>
                      <span className="block text-[10px] text-red-600">Kewajiban mengembalikan barang/aset perusahaan.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="klausulNDA" checked={data.klausulNDA} onChange={handleInputChange} className="mt-1 accent-red-600" />
                    <div>
                      <span className="block text-sm font-bold text-red-800">Sertakan Klausul NDA</span>
                      <span className="block text-[10px] text-red-600">Kewajiban menjaga kerahasiaan perusahaan (Non-Disclosure).</span>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="klausulPelepasan" checked={data.klausulPelepasan} onChange={handleInputChange} className="mt-1 accent-red-600" />
                    <div>
                      <span className="block text-sm font-bold text-red-800">Sertakan Klausul Pelepasan Tuntutan</span>
                      <span className="block text-[10px] text-red-600">Kesepakatan tidak saling menuntut di kemudian hari.</span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Metode Pembayaran Hak/Pesangon</label>
                    <select name="metodePembayaran" value={data.metodePembayaran} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-red-500 outline-none">
                      <option value="Transfer Bank">Transfer Bank</option>
                      <option value="Cek Giro">Cek Giro</option>
                      <option value="Tunai Keras">Tunai Keras</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggungan Pajak Pesangon/Hak</label>
                    <select name="tanggunganPajak" value={data.tanggunganPajak} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-red-500 outline-none">
                      <option value="Perusahaan">Perusahaan</option>
                      <option value="Karyawan">Karyawan</option>
                      <option value="Ditanggung Bersama (50:50)">Ditanggung Bersama (50:50)</option>
                    </select>
                  </div>
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
         <PrintWrapper documentName="Kesepakatan_Resign" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
