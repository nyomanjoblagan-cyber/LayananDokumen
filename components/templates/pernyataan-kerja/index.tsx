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
  tujuanSurat: string;
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
    setData(prev => ({ ...prev, tanggalTtd: new Date().toISOString().split("T")[0] }));
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData({ ...DEFAULT_DATA, tanggalTtd: new Date().toISOString().split("T")[0] });
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

      <div className="mb-6 break-inside-avoid text-justify">
        <p>Yang bertanda tangan di bawah ini saya:</p>
        <div className="ml-8 mt-4 space-y-2">
            <div className="flex"><div className="w-48 align-top">Nama Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.nama}</div></div>
            <div className="flex"><div className="w-48 align-top">Nomor Induk Kependudukan (NIK)</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono tracking-wider align-top">{data.nik}</div></div>
            <div className="flex"><div className="w-48 align-top">Tempat, Tanggal Lahir</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.tempatLahir}, {formatDate(data.tanggalLahir)}</div></div>
            <div className="flex"><div className="w-48 align-top">Jenis Kelamin</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.jenisKelamin}</div></div>
            <div className="flex"><div className="w-48 align-top">Agama</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.agama}</div></div>
            <div className="flex"><div className="w-48 align-top">Pendidikan Terakhir</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.pendidikan}</div></div>
            <div className="flex"><div className="w-48 align-top">Alamat Domisili Sesuai KTP</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.alamat}</div></div>
        </div>
      </div>

      <div className="mb-6 break-inside-avoid text-justify">
        <p>Dalam rangka <strong>{data.tujuanSurat}</strong>, dengan ini menyatakan secara sadar, tanpa paksaan dari pihak mana pun, hal-hal sebagai berikut:</p>
        <ol className="list-decimal pl-8 mt-4 space-y-3">
          <li>{data.poin1}</li>
          <li>{data.poin2}</li>
          <li>{data.poin3}</li>
        </ol>
      </div>

      <div className="mb-10 break-inside-avoid text-justify">
        <p>Demikian surat pernyataan ini saya buat dengan sesungguhnya dan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* Tanda Tangan */}
      <div className="flex justify-end text-center break-inside-avoid mt-8 pr-4">
        <div className="w-64">
          <p className="mb-1">{data.tempatTtd}, {formatDate(data.tanggalTtd)}</p>
          <p className="font-bold mb-2 uppercase">Yang Membuat Pernyataan,</p>
          <div className="h-4"></div>
          <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
          <div className="h-4"></div>
          <p className="font-bold underline uppercase">{data.nama}</p>
        </div>
      </div>
    </Kertas>
  );

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
              <ArrowLeftCircle size={20} className="text-cyan-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Pernyataan Kerja</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-cyan-600" /> Form Pernyataan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('identitas')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'identitas' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Identitas</button>
                <button onClick={() => setActiveTab('isi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'isi' ? 'bg-white border-t-2 border-cyan-500 text-cyan-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Isi Pernyataan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'identitas' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-slate-600"/> Data Diri Pelamar
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nama} onChange={e => handleInputChange('nama', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nik} onChange={e => handleInputChange('nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pendidikan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pendidikan} onChange={e => handleInputChange('pendidikan', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tempatLahir} onChange={e => handleInputChange('tempatLahir', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalLahir} onChange={e => handleInputChange('tanggalLahir', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.jenisKelamin} onChange={e => handleInputChange('jenisKelamin', e.target.value)}>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Agama</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.agama} onChange={e => handleInputChange('agama', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili / KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamat} onChange={e => handleInputChange('alamat', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'isi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-cyan-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CheckCircle size={14} className="text-cyan-600"/> Klausul Pernyataan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Surat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.tujuanSurat} onChange={e => handleInputChange('tujuanSurat', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Poin 1 (Status Ikatan Kerja)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none text-justify" value={data.poin1} onChange={e => handleInputChange('poin1', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Poin 2 (Kepatuhan Aturan)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none text-justify" value={data.poin2} onChange={e => handleInputChange('poin2', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Poin 3 (Sanksi Pelanggaran)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none text-justify" value={data.poin3} onChange={e => handleInputChange('poin3', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota TTD</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.tempatTtd} onChange={e => handleInputChange('tempatTtd', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal TTD</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.tanggalTtd} onChange={e => handleInputChange('tanggalTtd', e.target.value)} />
                            </div>
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
              <PrintWrapper documentName={`Pernyataan_Kerja_${data.nama.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
