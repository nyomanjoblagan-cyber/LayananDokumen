'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, User, FileText, CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. TYPE DEFINITIONS ---
interface PernyataanKerjaData {
  nama: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  agama: string;
  pendidikan: string;
  alamat: string;
  tujuanSurat: string; // e.g. "Pendaftaran CPNS 2026", "Melamar Pekerjaan di PT XYZ"
  poin1: string;
  poin2: string;
  poin3: string;
  tempatTtd: string;
  tanggalTtd: string;
}

// --- 2. DATA DEFAULT ---
const DEFAULT_DATA: PernyataanKerjaData = {
  nama: 'Ahmad Faisal',
  nik: '3201123456780001',
  tempatLahir: 'Bandung',
  tanggalLahir: '1995-08-15',
  jenisKelamin: 'Laki-laki',
  agama: 'Islam',
  pendidikan: 'S1 Teknik Informatika',
  alamat: 'Jl. Merdeka No. 45, RT 01 RW 02, Kel. Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat',
  
  tujuanSurat: 'persyaratan melamar pekerjaan',
  
  poin1: 'Tidak sedang terikat kontrak kerja atau ikatan dinas dengan instansi pemerintah, BUMN, maupun perusahaan swasta manapun.',
  poin2: 'Bersedia mematuhi segala peraturan dan ketentuan yang berlaku di perusahaan/instansi yang saya lamar.',
  poin3: 'Bersedia dikenakan sanksi hukum atau pembatalan kelulusan apabila di kemudian hari ditemukan bahwa pernyataan ini tidak benar.',
  
  tempatTtd: 'Bandung',
  tanggalTtd: new Date().toISOString().split("T")[0],
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PernyataanKerjaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Pernyataan...</div>}>
      <PernyataanBuilder />
    </Suspense>
  );
}

function PernyataanBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'identitas' | 'isi'>('identitas');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PernyataanKerjaData>(DEFAULT_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(DEFAULT_DATA);
    }
  };

  const handleInputChange = (field: keyof PernyataanKerjaData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* Judul Surat */}
      <div className="text-center mb-10 break-inside-avoid">
        <h1 className="text-xl font-bold uppercase tracking-wide border-b-2 border-black inline-block pb-1">SURAT PERNYATAAN TIDAK TERIKAT KERJA</h1>
      </div>

      {/* Pembuka */}
      <div className="mb-4 break-inside-avoid text-justify">
        <p>Yang bertanda tangan di bawah ini:</p>
      </div>

      {/* Identitas */}
      <div className="mb-6 pl-4 break-inside-avoid text-justify">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="w-[180px] py-1 align-top">Nama Lengkap</td>
              <td className="w-4 py-1 align-top">:</td>
              <td className="py-1 font-bold uppercase align-top">{data.nama}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Nomor Induk Kependudukan</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.nik}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Tempat, Tanggal Lahir</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.tempatLahir}, {formatDate(data.tanggalLahir)}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Jenis Kelamin</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.jenisKelamin}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Agama</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.agama}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Pendidikan Terakhir</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top">{data.pendidikan}</td>
            </tr>
            <tr>
              <td className="py-1 align-top">Alamat Domisili</td>
              <td className="py-1 align-top">:</td>
              <td className="py-1 align-top text-justify">{data.alamat}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Isi Pernyataan */}
      <div className="mb-8 break-inside-avoid text-justify">
        <p className="indent-8 mb-4">
          Dengan ini menyatakan dengan sesungguhnya bahwa saya <strong>{data.poin1}</strong>
        </p>
        <p className="indent-8 mb-4">
          {data.poin2}
        </p>
        <p className="indent-8 mb-4">
          {data.poin3}
        </p>
        <p className="indent-8 mt-6">
          Demikian surat pernyataan ini saya buat dengan sebenar-benarnya dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan dari pihak manapun, untuk dipergunakan sebagai <strong>{data.tujuanSurat}</strong>.
        </p>
      </div>

      {/* Tanda Tangan */}
      <div className="flex justify-end mt-16 pr-8 break-inside-avoid shrink-0">
        <div className="text-center w-64">
          <p className="mb-1">{data.tempatTtd}, {formatDate(data.tanggalTtd)}</p>
          <p className="mb-2">Yang Membuat Pernyataan,</p>
          
          <div className="h-20 flex items-center justify-center relative my-2">
             <div className="absolute text-[10px] text-slate-400 border border-slate-300 px-2 py-6 border-dashed z-0">Materai<br/>10.000</div>
          </div>
          
          <p className="font-bold underline uppercase relative z-10">{data.nama}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Pernyataan Tidak Terikat Kerja</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Career Tools</span>
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

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:hidden">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-blue-600" /> Editor Surat Pernyataan
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase shrink-0">
              <button onClick={() => setActiveTab('identitas')} className={`flex-1 py-3 border-r ${activeTab === 'identitas' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Identitas Pembuat</button>
              <button onClick={() => setActiveTab('isi')} className={`flex-1 py-3 ${activeTab === 'isi' ? 'bg-white text-indigo-600 border-b-2 border-b-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}>Isi Pernyataan</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent pb-32">
                
                {activeTab === 'identitas' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 flex items-center gap-2"><User size={14}/> Data Diri Pembuat Pernyataan</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                    <input type="text" value={data.nama} onChange={(e) => handleInputChange('nama', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                    <input type="text" value={data.nik} onChange={(e) => handleInputChange('nik', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                      <input type="text" value={data.tempatLahir} onChange={(e) => handleInputChange('tempatLahir', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                      <input type="date" value={data.tanggalLahir} onChange={(e) => handleInputChange('tanggalLahir', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                      <select value={data.jenisKelamin} onChange={(e) => handleInputChange('jenisKelamin', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none">
                         <option>Laki-laki</option>
                         <option>Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                      <input type="text" value={data.agama} onChange={(e) => handleInputChange('agama', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Pendidikan Terakhir</label>
                    <input type="text" value={data.pendidikan} onChange={(e) => handleInputChange('pendidikan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                    <textarea value={data.alamat} onChange={(e) => handleInputChange('alamat', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                  </div>
                </div>
                )}

                {activeTab === 'isi' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-indigo-600 border-b pb-1 mb-4 flex items-center gap-2"><CheckCircle size={14}/> Poin Pernyataan</h3>
                  
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tujuan / Keperluan Surat</label>
                    <input type="text" value={data.tujuanSurat} onChange={(e) => handleInputChange('tujuanSurat', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Cth: persyaratan melamar kerja di PT XYZ" />
                  </div>

                  <div className="space-y-3 mt-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Pernyataan 1</label>
                        <textarea value={data.poin1} onChange={(e) => handleInputChange('poin1', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-16 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Pernyataan 2</label>
                        <textarea value={data.poin2} onChange={(e) => handleInputChange('poin2', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-16 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Pernyataan 3 (Sanksi)</label>
                        <textarea value={data.poin3} onChange={(e) => handleInputChange('poin3', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-16 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                      </div>
                  </div>

                  <h3 className="text-xs font-black uppercase text-indigo-600 border-b pb-1 mb-4 mt-6">Tempat & Tanggal</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                      <input type="text" value={data.tempatTtd} onChange={(e) => handleInputChange('tempatTtd', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                      <input type="date" value={data.tanggalTtd} onChange={(e) => handleInputChange('tanggalTtd', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                </div>
                )}

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
         <PrintWrapper documentName="Surat_Pernyataan_Tidak_Terikat_Kerja" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
