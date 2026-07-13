"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Printer, 
  ArrowLeftCircle,
  BookOpen,
  Edit3,
  RotateCcw
} from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

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

export default function ResignTemplate() {
  const printRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'resign' | 'klausul'>('pihak1');

  useEffect(() => {
    setIsClient(true);
  }, []);
  
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

  const [data, setData] = useState<ResignData>(getInitialData());

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
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

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Generator Kesepakatan Pengunduran Diri</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); handlePrint(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak I</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pihak II</button>
              <button onClick={() => setActiveTab('resign')} className={`flex-1 py-3 border-r ${activeTab === 'resign' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Resign</button>
              <button onClick={() => setActiveTab('klausul')} className={`flex-1 py-3 ${activeTab === 'klausul' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>Klausul</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:hidden print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Pihak Pertama (Perusahaan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap (Wakil)</label>
                  <input type="text" name="pihak1Nama" value={data.pihak1Nama} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm font-bold mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK Wakil Perusahaan</label>
                  <input type="text" name="pihak1NIK" value={data.pihak1NIK} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input type="text" name="pihak1TempatLahir" value={data.pihak1TempatLahir} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" name="pihak1TanggalLahir" value={data.pihak1TanggalLahir} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Wakil</label>
                  <input type="text" name="pihak1Pekerjaan" value={data.pihak1Pekerjaan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Wakil (KTP)</label>
                  <textarea name="pihak1Alamat" value={data.pihak1Alamat} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 h-20" />
                </div>
                
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 mt-6">Entitas Perusahaan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                  <input type="text" name="companyName" value={data.companyName} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm font-bold mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                  <textarea name="companyAddress" value={data.companyAddress} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 h-20" />
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Informasi Pihak Kedua (Karyawan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input type="text" name="pihak2Nama" value={data.pihak2Nama} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm font-bold mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK Karyawan</label>
                  <input type="text" name="pihak2NIK" value={data.pihak2NIK} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input type="text" name="pihak2TempatLahir" value={data.pihak2TempatLahir} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" name="pihak2TanggalLahir" value={data.pihak2TanggalLahir} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan / Jabatan Terakhir</label>
                  <input type="text" name="pihak2Pekerjaan" value={data.pihak2Pekerjaan} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat (KTP)</label>
                  <textarea name="pihak2Alamat" value={data.pihak2Alamat} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 h-20" />
                </div>
              </div>
              )}

              {activeTab === 'resign' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Waktu dan Tempat Kesepakatan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Penandatanganan</label>
                    <input type="text" name="tempatSurat" value={data.tempatSurat} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Dokumen</label>
                    <input type="date" name="tanggalSurat" value={data.tanggalSurat} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Efektif Pengunduran Diri</label>
                  <input type="date" name="tanggalEfektif" value={data.tanggalEfektif} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1 font-bold text-rose-700" />
                </div>
              </div>
              )}

              {activeTab === 'klausul' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-red-600 border-b pb-1 mb-4">Pengaturan Klausul & Finansial</h3>
                
                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="klausulHandover" checked={data.klausulHandover} onChange={handleInputChange} className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500" />
                    <span className="text-sm text-slate-700">
                      <strong className="block text-slate-900 mb-0.5">Wajib Handover</strong>
                      Karyawan wajib melakukan serah terima tugas sebelum hak-haknya dicairkan.
                    </span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="klausulAset" checked={data.klausulAset} onChange={handleInputChange} className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500" />
                    <span className="text-sm text-slate-700">
                      <strong className="block text-slate-900 mb-0.5">Pengembalian Aset</strong>
                      Kewajiban pengembalian aset (laptop, dokumen, dsb) dengan kewajiban ganti rugi jika hilang/rusak.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="klausulNDA" checked={data.klausulNDA} onChange={handleInputChange} className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500" />
                    <span className="text-sm text-slate-700">
                      <strong className="block text-slate-900 mb-0.5">Post-Employment NDA</strong>
                      Kewajiban menjaga kerahasiaan perusahaan (Non-Disclosure) secara penuh purna-kerja.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="klausulPelepasan" checked={data.klausulPelepasan} onChange={handleInputChange} className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500" />
                    <span className="text-sm text-slate-700">
                      <strong className="block text-slate-900 mb-0.5">Release & Discharge</strong>
                      Klausul bahwa kesepakatan ini bersifat final, membebaskan tuntutan, dan tanpa paksaan.
                    </span>
                  </label>
                </div>

                <div className="space-y-4 mt-6">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Metode Pembayaran Hak Akhir</label>
                    <select name="metodePembayaran" value={data.metodePembayaran} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1">
                      <option value="Transfer Bank">Transfer Bank</option>
                      <option value="Tunai">Tunai</option>
                      <option value="Cek Giro">Cek Giro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggungan Pajak Pembayaran</label>
                    <select name="tanggunganPajak" value={data.tanggunganPajak} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm mt-1">
                      <option value="Perusahaan">Ditanggung Perusahaan (Net)</option>
                      <option value="Karyawan">Ditanggung Karyawan (Gross)</option>
                    </select>
                  </div>
                </div>
              </div>
              )}
           </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="flex-1 h-full overflow-y-auto bg-slate-400 p-4 md:p-8 print:p-0 print:w-full print:bg-white print:overflow-visible flex justify-center print:hidden">
          <div id="print-only-root" className="w-full flex justify-center print:block print:h-auto print:static">
            <div ref={printRef}>
              <Kertas>
                <div className="text-center mb-8">
                  <h1 className="font-bold text-lg uppercase underline">KESEPAKATAN BERSAMA</h1>
                  <h2 className="font-bold text-md uppercase">PENYELESAIAN HUBUNGAN KERJA DAN PENGUNDURAN DIRI</h2>
                </div>

                <div className="mb-6 text-justify">
                  <p>
                    Pada hari ini, <strong>{getDayName(data.tanggalSurat)}</strong> tanggal <strong>{formatDateIndo(data.tanggalSurat)}</strong>, bertempat di <strong>{data.tempatSurat}</strong>, telah dibuat dan ditandatangani Kesepakatan Bersama Penyelesaian Hubungan Kerja dan Pengunduran Diri ("<strong>Perjanjian</strong>") oleh dan antara:
                  </p>
                </div>

                <div className="mb-6 space-y-4 text-justify">
                  <div className="flex">
                    <div className="w-8 shrink-0">1.</div>
                    <div className="flex-1">
                      <div className="space-y-1 mb-2">
                        <div className="flex"><span className="w-48 shrink-0">Nama Lengkap</span><span>: <strong>{data.pihak1Nama}</strong></span></div>
                        <div className="flex"><span className="w-48 shrink-0">NIK</span><span>: {data.pihak1NIK}</span></div>
                        <div className="flex"><span className="w-48 shrink-0">Tempat, Tanggal Lahir</span><span>: {data.pihak1TempatLahir}, {formatDateIndo(data.pihak1TanggalLahir)}</span></div>
                        <div className="flex"><span className="w-48 shrink-0">Pekerjaan</span><span>: {data.pihak1Pekerjaan}</span></div>
                        <div className="flex"><span className="w-48 shrink-0">Alamat (Sesuai KTP)</span><span>: {data.pihak1Alamat}</span></div>
                      </div>
                      <p>
                        Dalam hal ini bertindak dalam jabatannya tersebut, dari dan oleh karenanya sah bertindak untuk dan atas nama <strong>{data.companyName}</strong>, suatu badan hukum yang berkedudukan di {data.companyAddress}, selanjutnya dalam Perjanjian ini disebut sebagai "<strong>PIHAK PERTAMA</strong>".
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-8 shrink-0">2.</div>
                    <div className="flex-1">
                      <div className="space-y-1 mb-2">
                        <div className="flex"><span className="w-48 shrink-0">Nama Lengkap</span><span>: <strong>{data.pihak2Nama}</strong></span></div>
                        <div className="flex"><span className="w-48 shrink-0">NIK</span><span>: {data.pihak2NIK}</span></div>
                        <div className="flex"><span className="w-48 shrink-0">Tempat, Tanggal Lahir</span><span>: {data.pihak2TempatLahir}, {formatDateIndo(data.pihak2TanggalLahir)}</span></div>
                        <div className="flex"><span className="w-48 shrink-0">Pekerjaan</span><span>: {data.pihak2Pekerjaan}</span></div>
                        <div className="flex"><span className="w-48 shrink-0">Alamat (Sesuai KTP)</span><span>: {data.pihak2Alamat}</span></div>
                      </div>
                      <p>
                        Dalam hal ini bertindak untuk dan atas nama diri sendiri selaku karyawan, selanjutnya dalam Perjanjian ini disebut sebagai "<strong>PIHAK KEDUA</strong>".
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 text-justify">
                  <p className="mb-2">
                    PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut "<strong>PARA PIHAK</strong>" dan secara sendiri-sendiri disebut "<strong>PIHAK</strong>".
                  </p>
                  <p className="mb-2">
                    PARA PIHAK terlebih dahulu menerangkan hal-hal sebagai berikut:
                  </p>
                  <div className="ml-6 space-y-1">
                    <div className="flex"><span className="w-6 shrink-0">a.</span><p>Bahwa PIHAK KEDUA adalah karyawan PIHAK PERTAMA yang menjabat sebagai {data.pihak2Pekerjaan}.</p></div>
                    <div className="flex"><span className="w-6 shrink-0">b.</span><p>Bahwa PIHAK KEDUA telah mengajukan permohonan pengunduran diri secara sukarela dan tanpa paksaan dari pihak manapun dari jabatannya di perusahaan PIHAK PERTAMA.</p></div>
                    <div className="flex"><span className="w-6 shrink-0">c.</span><p>Bahwa PIHAK PERTAMA dapat menerima permohonan pengunduran diri yang diajukan oleh PIHAK KEDUA tersebut.</p></div>
                  </div>
                  <p className="mt-4">
                    Berdasarkan hal-hal tersebut di atas, PARA PIHAK sepakat untuk mengikatkan diri dalam Perjanjian ini dengan syarat-syarat dan ketentuan-ketentuan sebagai berikut:
                  </p>
                </div>

                {/* PASAL 1 */}
                <div className="mb-4">
                  <h3 className="font-bold text-center">PASAL 1</h3>
                  <h3 className="font-bold text-center mb-2">PERNYATAAN PENGUNDURAN DIRI</h3>
                  <div className="space-y-1 text-justify ml-4">
                    <div className="flex"><span className="w-6 shrink-0">1.</span><p>PIHAK KEDUA dengan ini menyatakan mengundurkan diri secara sukarela dan tanpa paksaan dari pihak manapun dari jabatannya di perusahaan PIHAK PERTAMA.</p></div>
                    <div className="flex"><span className="w-6 shrink-0">2.</span><p>PIHAK PERTAMA dengan ini menerima pengunduran diri PIHAK KEDUA, sehingga dengan demikian hubungan kerja antara PARA PIHAK secara resmi berakhir.</p></div>
                  </div>
                </div>

                {/* PASAL 2 */}
                <div className="mb-4">
                  <h3 className="font-bold text-center">PASAL 2</h3>
                  <h3 className="font-bold text-center mb-2">TANGGAL EFEKTIF DAN SERAH TERIMA TUGAS</h3>
                  <div className="space-y-1 text-justify ml-4">
                    <div className="flex"><span className="w-6 shrink-0">1.</span><p>PARA PIHAK sepakat bahwa tanggal efektif berakhirnya hubungan kerja adalah pada tanggal <strong>{formatDateIndo(data.tanggalEfektif)}</strong>.</p></div>
                    {data.klausulHandover && (
                      <>
                        <div className="flex"><span className="w-6 shrink-0">2.</span><p>Sebelum tanggal efektif sebagaimana dimaksud pada Ayat 1 Pasal ini, PIHAK KEDUA wajib melaksanakan serah terima tugas (<em>handover</em>) secara komprehensif kepada PIHAK PERTAMA atau pihak lain yang ditunjuk oleh PIHAK PERTAMA.</p></div>
                        <div className="flex"><span className="w-6 shrink-0">3.</span><p>PIHAK PERTAMA berhak menahan penyerahan Surat Keterangan Kerja (Paklaring) dan/atau hak-hak finansial PIHAK KEDUA apabila proses serah terima tugas belum diselesaikan dengan baik oleh PIHAK KEDUA.</p></div>
                      </>
                    )}
                  </div>
                </div>

                {/* PASAL 3 */}
                <div className="mb-4">
                  <h3 className="font-bold text-center">PASAL 3</h3>
                  <h3 className="font-bold text-center mb-2">PENYERAHAN ASET PERUSAHAAN</h3>
                  <div className="space-y-1 text-justify ml-4">
                    {data.klausulAset ? (
                      <>
                        <div className="flex"><span className="w-6 shrink-0">1.</span><p>PIHAK KEDUA wajib mengembalikan seluruh aset, inventaris, fasilitas, dan dokumen fisik maupun elektronik yang merupakan milik PIHAK PERTAMA selambat-lambatnya pada tanggal efektif pengunduran diri.</p></div>
                        <div className="flex"><span className="w-6 shrink-0">2.</span><p>Segala bentuk kerusakan atau kehilangan atas aset PIHAK PERTAMA yang disebabkan oleh kelalaian PIHAK KEDUA akan menjadi tanggung jawab penuh PIHAK KEDUA dan kewajiban ganti rugi tersebut dapat diperhitungkan secara langsung dengan hak-hak finansial PIHAK KEDUA.</p></div>
                      </>
                    ) : (
                      <div className="flex"><span className="w-6 shrink-0">1.</span><p>Mengenai penyelesaian aset atau inventaris perusahaan yang berada dalam penguasaan PIHAK KEDUA, PARA PIHAK akan menyelesaikannya secara musyawarah sebelum berakhirnya hubungan kerja.</p></div>
                    )}
                  </div>
                </div>

                {/* PASAL 4 */}
                <div className="mb-4">
                  <h3 className="font-bold text-center">PASAL 4</h3>
                  <h3 className="font-bold text-center mb-2">HAK DAN KEWAJIBAN FINANSIAL</h3>
                  <div className="space-y-1 text-justify ml-4">
                    <div className="flex"><span className="w-6 shrink-0">1.</span><p>PIHAK PERTAMA sepakat untuk membayarkan seluruh sisa gaji, uang penggantian hak, dan/atau hak-hak finansial lainnya yang timbul dari berakhirnya hubungan kerja ini kepada PIHAK KEDUA sesuai dengan peraturan perusahaan dan peraturan perundang-undangan ketenagakerjaan yang berlaku.</p></div>
                    <div className="flex"><span className="w-6 shrink-0">2.</span><p>Pembayaran hak-hak finansial tersebut akan dilakukan oleh PIHAK PERTAMA kepada PIHAK KEDUA melalui metode <strong>{data.metodePembayaran}</strong>.</p></div>
                    <div className="flex"><span className="w-6 shrink-0">3.</span><p>Segala kewajiban pajak yang timbul akibat pembayaran hak-hak finansial sebagaimana dimaksud pada Ayat 1 Pasal ini akan <strong>{data.tanggunganPajak === 'Perusahaan' ? 'ditanggung dan dibayarkan oleh PIHAK PERTAMA (Pajak Ditanggung Perusahaan / Net)' : 'ditanggung sepenuhnya oleh PIHAK KEDUA (Pajak Ditanggung Karyawan / Gross) sesuai dengan peraturan perundang-undangan perpajakan yang berlaku'}</strong>.</p></div>
                    <div className="flex"><span className="w-6 shrink-0">4.</span><p>Dengan dilakukannya pembayaran secara lunas sebagaimana dimaksud pada Ayat 1 dan 2 Pasal ini, maka PIHAK KEDUA menyatakan bahwa PIHAK PERTAMA telah memenuhi seluruh kewajiban finansialnya kepada PIHAK KEDUA secara penuh tanpa ada yang tertinggal.</p></div>
                  </div>
                </div>

                {/* PASAL 5 */}
                <div className="mb-4">
                  <h3 className="font-bold text-center">PASAL 5</h3>
                  <h3 className="font-bold text-center mb-2">KOMITMEN KERAHASIAAN (NON-DISCLOSURE AGREEMENT)</h3>
                  <div className="space-y-1 text-justify ml-4">
                    {data.klausulNDA ? (
                      <>
                        <div className="flex"><span className="w-6 shrink-0">1.</span><p>PIHAK KEDUA mengikatkan diri dan berjanji untuk senantiasa menjaga kerahasiaan seluruh informasi, data, rahasia dagang, strategi bisnis, daftar klien, kode sumber (<em>source code</em>), dan dokumen-dokumen milik PIHAK PERTAMA (selanjutnya disebut "<strong>Informasi Rahasia</strong>") secara berkelanjutan meskipun hubungan kerja antara PARA PIHAK telah berakhir.</p></div>
                        <div className="flex"><span className="w-6 shrink-0">2.</span><p>PIHAK KEDUA dilarang secara tegas untuk menyebarluaskan, membocorkan, menduplikasi, atau menggunakan Informasi Rahasia tersebut untuk kepentingan pribadi maupun pihak ketiga tanpa izin tertulis sebelumnya dari PIHAK PERTAMA.</p></div>
                        <div className="flex"><span className="w-6 shrink-0">3.</span><p>Setiap pelanggaran terhadap ketentuan komitmen kerahasiaan ini memberikan hak mutlak kepada PIHAK PERTAMA untuk menuntut ganti rugi secara perdata maupun memproses PIHAK KEDUA secara pidana sesuai dengan ketentuan hukum yang berlaku di Negara Republik Indonesia.</p></div>
                      </>
                    ) : (
                      <div className="flex"><span className="w-6 shrink-0">1.</span><p>PIHAK KEDUA diimbau untuk senantiasa menjaga nama baik PIHAK PERTAMA dan menjaga informasi penting perusahaan meskipun hubungan kerja telah berakhir dengan sebaik-baiknya.</p></div>
                    )}
                  </div>
                </div>

                {/* PASAL 6 */}
                <div className="mb-4">
                  <h3 className="font-bold text-center">PASAL 6</h3>
                  <h3 className="font-bold text-center mb-2">SIFAT FINAL DAN PELEPASAN TUNTUTAN</h3>
                  <div className="space-y-1 text-justify ml-4">
                    {data.klausulPelepasan ? (
                      <>
                        <div className="flex"><span className="w-6 shrink-0">1.</span><p>PARA PIHAK menyatakan dan sepakat bahwa Perjanjian ini bersifat final, mengikat, dan merupakan penyelesaian menyeluruh atas segala hak dan kewajiban yang timbul dari maupun berhubungan dengan hubungan kerja antara PARA PIHAK.</p></div>
                        <div className="flex"><span className="w-6 shrink-0">2.</span><p>PIHAK KEDUA dengan ini memberikan pembebasan dan pelepasan (<em>release and discharge</em>) secara mutlak dan penuh kepada PIHAK PERTAMA, para direktur, dewan komisaris, pemegang saham, karyawan, dan seluruh afiliasinya dari segala bentuk tuntutan, gugatan, atau klaim hukum di kemudian hari, baik di pengadilan maupun di luar pengadilan, di instansi ketenagakerjaan, kepolisian, maupun forum penyelesaian lainnya.</p></div>
                        <div className="flex"><span className="w-6 shrink-0">3.</span><p>PIHAK KEDUA menyatakan dan menjamin bahwa pengunduran diri serta penandatanganan Perjanjian ini dilakukan dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya tekanan, paksaan, paksaan finansial, atau ancaman dari pihak manapun juga.</p></div>
                      </>
                    ) : (
                      <>
                        <div className="flex"><span className="w-6 shrink-0">1.</span><p>PARA PIHAK menyatakan bahwa Perjanjian ini ditandatangani secara sukarela dan tanpa ada paksaan dari pihak manapun juga.</p></div>
                        <div className="flex"><span className="w-6 shrink-0">2.</span><p>PARA PIHAK sepakat untuk menyelesaikan segala urusan terkait pengakhiran hubungan kerja secara kekeluargaan dan beritikad baik.</p></div>
                      </>
                    )}
                  </div>
                </div>

                {/* PASAL 7 */}
                <div className="mb-4 break-inside-avoid">
                  <h3 className="font-bold text-center">PASAL 7</h3>
                  <h3 className="font-bold text-center mb-2">PENYELESAIAN SENGKETA</h3>
                  <div className="space-y-1 text-justify ml-4">
                    <div className="flex"><span className="w-6 shrink-0">1.</span><p>Segala perselisihan yang timbul di kemudian hari akibat penafsiran maupun pelaksanaan Perjanjian ini akan diselesaikan oleh PARA PIHAK secara musyawarah untuk mencapai mufakat.</p></div>
                    <div className="flex"><span className="w-6 shrink-0">2.</span><p>Apabila penyelesaian secara musyawarah tidak tercapai dalam waktu 30 (tiga puluh) hari kalender, maka PARA PIHAK sepakat untuk menyelesaikannya secara hukum melalui Kepaniteraan Pengadilan Hubungan Industrial pada Pengadilan Negeri setempat.</p></div>
                  </div>
                </div>

                {/* PASAL 8 */}
                <div className="mb-8 break-inside-avoid">
                  <h3 className="font-bold text-center">PASAL 8</h3>
                  <h3 className="font-bold text-center mb-2">PENUTUP</h3>
                  <div className="space-y-1 text-justify ml-4">
                    <div className="flex"><span className="w-6 shrink-0">1.</span><p>Demikian Perjanjian ini dibuat dan ditandatangani pada hari dan tanggal sebagaimana disebutkan pada awal Perjanjian, dibuat dalam rangkap 2 (dua) yang keduanya dibubuhi meterai yang cukup, dan masing-masing mempunyai kekuatan pembuktian hukum yang sama bagi PARA PIHAK.</p></div>
                  </div>
                </div>

                {/* SIGNATURES */}
                <div className="flex justify-between mt-12 pt-8 break-inside-avoid">
                  <div className="w-1/2 text-center">
                    <p className="mb-1"><strong>PIHAK PERTAMA</strong></p>
                    <p className="mb-24">{data.companyName}</p>
                    <p className="font-bold underline">{data.pihak1Nama}</p>
                    <p>{data.pihak1Pekerjaan}</p>
                  </div>
                  <div className="w-1/2 text-center">
                    <p className="mb-1"><strong>PIHAK KEDUA</strong></p>
                    <p className="mb-24">Karyawan</p>
                    <p className="font-bold underline">{data.pihak2Nama}</p>
                    <p>NIK: {data.pihak2NIK}</p>
                  </div>
                </div>
              </Kertas>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
