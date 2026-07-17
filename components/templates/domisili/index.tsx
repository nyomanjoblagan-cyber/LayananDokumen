'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Building2, UserCircle2, MapPin, FileText, LayoutTemplate, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface DomisiliData {
  nomorSurat: string;
  tanggalSurat: string;
  
  namaPihakPertama: string;
  jabatanPihakPertama: string;
  nipPihakPertama: string;
  instansiPihakPertama: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;

  namaPihakKedua: string;
  nikPihakKedua: string;
  tempatLahirPihakKedua: string;
  tanggalLahirPihakKedua: string;
  jenisKelaminPihakKedua: string;
  agamaPihakKedua: string;
  pekerjaanPihakKedua: string;
  alamatPihakKedua: string;

  jenisDomisili: 'Warga' | 'Perusahaan';
  statusBangunan: string;
  masaBerlaku: string;
  peruntukan: string;

  namaPerusahaan: string;
  aktaPendirian: string;
  npwpPerusahaan: string;
  bidangUsaha: string;
  alamatDomisili: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DomisiliData = {
  nomorSurat: '470/123/VII/2026',
  tanggalSurat: '13 Juli 2026',

  namaPihakPertama: 'Budi Santoso, S.E., M.Si.',
  jabatanPihakPertama: 'Kepala Desa',
  nipPihakPertama: '19700101 199503 1 001',
  instansiPihakPertama: 'Desa Sardonoharjo',
  kecamatan: 'Ngaglik',
  kabupaten: 'Sleman',
  provinsi: 'Daerah Istimewa Yogyakarta',

  namaPihakKedua: 'Andi Pratama',
  nikPihakKedua: '3404010101900001',
  tempatLahirPihakKedua: 'Sleman',
  tanggalLahirPihakKedua: '15 Mei 1990',
  jenisKelaminPihakKedua: 'Laki-laki',
  agamaPihakKedua: 'Islam',
  pekerjaanPihakKedua: 'Wiraswasta',
  alamatPihakKedua: 'Jl. Kaliurang KM 10, RT 01 RW 02, Sardonoharjo, Ngaglik, Sleman',

  jenisDomisili: 'Warga',
  statusBangunan: 'Milik Sendiri',
  masaBerlaku: '6 (Enam) Bulan',
  peruntukan: 'Persyaratan Administrasi Perbankan',

  namaPerusahaan: 'PT MAJU JAYA ABADI',
  aktaPendirian: 'Nomor 12 Tanggal 5 Mei 2020 oleh Notaris Anita, S.H.',
  npwpPerusahaan: '01.234.567.8-901.000',
  bidangUsaha: 'Perdagangan Umum',
  alamatDomisili: 'Jl. Palagan Tentara Pelajar KM 8, Sleman, DIY',
};

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function DomisiliPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <DomisiliBuilder />
    </Suspense>
  );
}

function DomisiliBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DomisiliData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal (Serif)' : 'Modern Premium (Sans)';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[9999]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 1 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 2 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Modern Premium (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => (
    <Kertas templateId={templateId}>
       {/* KOP SURAT */}
       <div className="text-center border-b-[4px] border-black pb-4 mb-8">
           <h1 className="font-bold text-xl uppercase tracking-wider">PEMERINTAH KABUPATEN {data.kabupaten}</h1>
           <h2 className="font-bold text-xl uppercase tracking-wider">KECAMATAN {data.kecamatan}</h2>
           <h3 className="font-black text-2xl uppercase tracking-widest">{data.instansiPihakPertama}</h3>
           <p className="text-[10pt] mt-1">
               Alamat Kantor: {data.instansiPihakPertama}, Kec. {data.kecamatan}, Kab. {data.kabupaten}, {data.provinsi}
           </p>
       </div>

       {/* JUDUL SURAT */}
       <div className="text-center mb-10">
           <h1 className="font-bold text-xl uppercase underline tracking-wide">
               SURAT KETERANGAN DOMISILI
           </h1>
           <p className="mt-1">Nomor: {data.nomorSurat}</p>
       </div>

       <div className="mb-6 text-justify">
           <p>Yang bertanda tangan di bawah ini, Pejabat Berwenang menerangkan dengan sesungguhnya bahwa:</p>
       </div>

       {/* IDENTITAS PIHAK KEDUA */}
       <div className="ml-8 mb-6 break-inside-avoid">
           <div className="flex mb-1"><span className="w-44 inline-block">Nama Lengkap</span><span className="mr-2">:</span><span className="font-bold uppercase">{data.namaPihakKedua}</span></div>
           <div className="flex mb-1"><span className="w-44 inline-block">NIK</span><span className="mr-2">:</span><span>{data.nikPihakKedua}</span></div>
           <div className="flex mb-1"><span className="w-44 inline-block">Tempat, Tgl Lahir</span><span className="mr-2">:</span><span>{data.tempatLahirPihakKedua}, {data.tanggalLahirPihakKedua}</span></div>
           <div className="flex mb-1"><span className="w-44 inline-block">Jenis Kelamin</span><span className="mr-2">:</span><span>{data.jenisKelaminPihakKedua}</span></div>
           <div className="flex mb-1"><span className="w-44 inline-block">Agama</span><span className="mr-2">:</span><span>{data.agamaPihakKedua}</span></div>
           <div className="flex mb-1"><span className="w-44 inline-block">Pekerjaan</span><span className="mr-2">:</span><span>{data.pekerjaanPihakKedua}</span></div>
           <div className="flex mb-1"><span className="w-44 inline-block align-top">Alamat Asal</span><span className="mr-2 align-top">:</span><span className="inline-block flex-1">{data.alamatPihakKedua}</span></div>
       </div>

       {data.jenisDomisili === 'Warga' ? (
           <div className="mb-6 text-justify leading-relaxed">
               <p>
                   Bahwa nama yang tersebut di atas adalah benar-benar penduduk/warga yang saat ini bertempat tinggal dan berdomisili di wilayah {data.instansiPihakPertama}, Kecamatan {data.kecamatan}, Kabupaten {data.kabupaten}.
               </p>
               <p className="mt-2">
                   Berdasarkan laporan dan pendataan kami, yang bersangkutan menempati bangunan dengan status penguasaan <b>{data.statusBangunan}</b>. Surat Keterangan Domisili ini dibuat untuk keperluan <b>{data.peruntukan}</b> dan berlaku selama <b>{data.masaBerlaku}</b> sejak diterbitkan.
               </p>
           </div>
       ) : (
           <div className="mb-6 text-justify leading-relaxed">
               <p className="mb-4">
                   Bahwa nama yang tersebut di atas adalah Penanggung Jawab / Pimpinan dari Perusahaan/Badan Usaha:
               </p>
               <div className="ml-8 mb-4 break-inside-avoid">
                   <div className="flex mb-1"><span className="w-44 inline-block">Nama Perusahaan</span><span className="mr-2">:</span><span className="font-bold uppercase">{data.namaPerusahaan}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block">Akta Pendirian</span><span className="mr-2">:</span><span>{data.aktaPendirian}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block">NPWP Perusahaan</span><span className="mr-2">:</span><span>{data.npwpPerusahaan}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block">Bidang Usaha</span><span className="mr-2">:</span><span>{data.bidangUsaha}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block align-top">Alamat Kedudukan</span><span className="mr-2 align-top">:</span><span className="inline-block flex-1 font-bold">{data.alamatDomisili}</span></div>
               </div>
               <p>
                   Berdasarkan laporan dan pengamatan kami, perusahaan/badan usaha tersebut di atas benar-benar berdomisili dan menjalankan kegiatan usahanya di alamat tersebut yang masuk dalam wilayah administratif {data.instansiPihakPertama}. Bangunan tempat usaha yang digunakan berstatus penguasaan <b>{data.statusBangunan}</b>.
               </p>
               <p className="mt-2">
                   Surat Keterangan Domisili Perusahaan ini dibuat untuk keperluan <b>{data.peruntukan}</b> dan berlaku selama <b>{data.masaBerlaku}</b> sejak diterbitkan.
               </p>
           </div>
       )}

       <div className="mb-12 text-justify">
           <p>
               Demikian Surat Keterangan Domisili ini dibuat dengan sebenarnya dan untuk dipergunakan sebagaimana mestinya. Kepada pihak-pihak yang berkepentingan mohon maklum adanya.
           </p>
       </div>

       {/* PENGESAHAN (TANDA TANGAN) */}
       <div className="mt-8 break-inside-avoid">
          <div className="flex justify-between text-center items-stretch mb-4">
             <div className="w-[45%] flex flex-col justify-between">
                <p className="mb-4 invisible">Tanda Tangan</p>
                <div className="h-24"></div>
             </div>
             <div className="w-[45%] flex flex-col justify-between relative">
                <p className="mb-1">{data.instansiPihakPertama}, {data.tanggalSurat}</p>
                <p className="font-bold mb-4">{data.jabatanPihakPertama}</p>
                <div className="h-24"></div>
                <p className="font-bold underline uppercase">{data.namaPihakPertama}</p>
                <p>NIP. {data.nipPihakPertama}</p>
             </div>
          </div>
       </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Domisili</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-sky-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-sky-600" /> Editor Surat Domisili
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INFORMASI SURAT & INSTANSI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-amber-600"/> Instansi & Surat
                  </h3>
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                            <input type="text" name="nomorSurat" value={data.nomorSurat} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                            <input type="text" name="tanggalSurat" value={data.tanggalSurat} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat</label>
                        <input type="text" name="namaPihakPertama" value={data.namaPihakPertama} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pejabat</label>
                            <input type="text" name="jabatanPihakPertama" value={data.jabatanPihakPertama} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP Pejabat</label>
                            <input type="text" name="nipPihakPertama" value={data.nipPihakPertama} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Instansi (Desa/Kelurahan)</label>
                            <input type="text" name="instansiPihakPertama" value={data.instansiPihakPertama} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kecamatan</label>
                            <input type="text" name="kecamatan" value={data.kecamatan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kabupaten</label>
                            <input type="text" name="kabupaten" value={data.kabupaten} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Provinsi</label>
                            <input type="text" name="provinsi" value={data.provinsi} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                  </div>
                </div>

                {/* 2. IDENTITAS PEMOHON */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-emerald-600"/> Identitas Pemohon
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pemohon</label>
                        <input type="text" name="namaPihakKedua" value={data.namaPihakKedua} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                        <input type="text" name="nikPihakKedua" value={data.nikPihakKedua} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                            <input type="text" name="tempatLahirPihakKedua" value={data.tempatLahirPihakKedua} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                            <input type="text" name="tanggalLahirPihakKedua" value={data.tanggalLahirPihakKedua} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                            <select name="jenisKelaminPihakKedua" value={data.jenisKelaminPihakKedua} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Agama</label>
                            <select name="agamaPihakKedua" value={data.agamaPihakKedua} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                                <option value="Islam">Islam</option>
                                <option value="Kristen">Kristen</option>
                                <option value="Katolik">Katolik</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Buddha">Buddha</option>
                                <option value="Konghucu">Konghucu</option>
                            </select>
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                        <input type="text" name="pekerjaanPihakKedua" value={data.pekerjaanPihakKedua} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP Lengkap</label>
                        <textarea name="alamatPihakKedua" value={data.alamatPihakKedua} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-emerald-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 3. PENGATURAN DOMISILI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-purple-600"/> Tipe Domisili
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Domisili</label>
                        <select name="jenisDomisili" value={data.jenisDomisili} onChange={handleStringChange} className="w-full bg-purple-50 border border-purple-200 rounded-xl p-2.5 text-sm font-bold text-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                            <option value="Warga">Warga / Pribadi</option>
                            <option value="Perusahaan">Badan Usaha / Perusahaan</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Bangunan</label>
                            <select name="statusBangunan" value={data.statusBangunan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                                <option value="Milik Sendiri">Milik Sendiri</option>
                                <option value="Sewa / Kontrak">Sewa / Kontrak</option>
                                <option value="Menumpang">Menumpang</option>
                                <option value="Fasilitas Kantor">Fasilitas Kantor</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Berlaku</label>
                            <select name="masaBerlaku" value={data.masaBerlaku} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                                <option value="1 (Satu) Bulan">1 Bulan</option>
                                <option value="3 (Tiga) Bulan">3 Bulan</option>
                                <option value="6 (Enam) Bulan">6 Bulan</option>
                                <option value="1 (Satu) Tahun">1 Tahun</option>
                                <option value="Selama Menetap/Berdomisili">Selamanya</option>
                            </select>
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Peruntukan Surat</label>
                        <input type="text" name="peruntukan" value={data.peruntukan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

                {/* 4. PERUSAHAAN (Jika Warga == Perusahaan) */}
                {data.jenisDomisili === 'Perusahaan' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Briefcase size={14} className="text-rose-600"/> Data Perusahaan
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan/Badan Usaha</label>
                        <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Akta Pendirian</label>
                        <input type="text" name="aktaPendirian" value={data.aktaPendirian} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPWP Perusahaan</label>
                        <input type="text" name="npwpPerusahaan" value={data.npwpPerusahaan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bidang Usaha</label>
                        <input type="text" name="bidangUsaha" value={data.bidangUsaha} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili Usaha</label>
                        <textarea name="alamatDomisili" value={data.alamatDomisili} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-rose-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>
                )}

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat Keterangan Domisili" price={10000} />
           </div>

        </div>
      </main>
    </div>
  );
}
