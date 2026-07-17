'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Building2, UserCircle2, CalendarRange, Target, 
    PackageSearch, FileText, LayoutTemplate
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface DistributorData {
  docNumber: string;
  docDay: string;
  docDate: string;
  city: string;

  pihak1Name: string;
  pihak1Nik: string;
  pihak1Pob: string;
  pihak1Dob: string;
  pihak1Occupation: string;
  pihak1Address: string;
  pihak1Company: string;
  pihak1Position: string;

  pihak2Name: string;
  pihak2Nik: string;
  pihak2Pob: string;
  pihak2Dob: string;
  pihak2Occupation: string;
  pihak2Address: string;
  pihak2Company: string; 
  pihak2Position: string;

  produk: string;
  wilayah: string;
  masaBerlaku: string;
  startDate: string;
  endDate: string;
  
  targetKuantitas: string;
  targetPeriode: string;
  
  paymentMethod: string;
  penaltyFee: string;
  
  pengadilan: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DistributorData = {
  docNumber: '088/DIST-PMJ/XII/2026',
  docDay: 'Rabu',
  docDate: '15 Desember 2026',
  city: 'Jakarta Selatan',

  pihak1Name: 'Andi Wijaya',
  pihak1Nik: '3174092801850001',
  pihak1Pob: 'Jakarta',
  pihak1Dob: '28 Januari 1985',
  pihak1Occupation: 'Wiraswasta',
  pihak1Address: 'Jl. Sudirman No. 45, RT.001/RW.002, Senayan, Kebayoran Baru, Jakarta Selatan',
  pihak1Company: 'PT PANGAN MAJU JAYA',
  pihak1Position: 'Direktur Utama',

  pihak2Name: 'Siti Aminah',
  pihak2Nik: '3171051508820004',
  pihak2Pob: 'Bandung',
  pihak2Dob: '15 Agustus 1982',
  pihak2Occupation: 'Wiraswasta',
  pihak2Address: 'Jl. Raya Bogor KM 24, RT.005/RW.003, Ciracas, Jakarta Timur',
  pihak2Company: 'CV BERKAH UTAMA',
  pihak2Position: 'Direktur',

  produk: 'Mesin Kopi Espresso Otomatis Seri X',
  wilayah: 'Daerah Khusus Ibukota Jakarta dan sekitarnya',
  masaBerlaku: '2 (dua) Tahun',
  startDate: '1 Januari 2027',
  endDate: '31 Desember 2028',
  
  targetKuantitas: '100 (Seratus)',
  targetPeriode: 'Kuartal',
  
  paymentMethod: 'Cash Before Delivery (CBD)',
  penaltyFee: '0.5%',
  
  pengadilan: 'Pengadilan Negeri Jakarta Selatan'
};

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PerjanjianDistributorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian...</div>}>
      <DistributorBuilder />
    </Suspense>
  );
}

function DistributorBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DistributorData>(INITIAL_DATA);
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
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> Modern Premium (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => (
    <Kertas templateId={templateId}>
       <div className="text-center font-bold mb-8">
          <h1 className="text-[14pt] uppercase underline decoration-2 underline-offset-4 mb-1">PERJANJIAN KEAGENAN DAN DISTRIBUSI</h1>
          <p className="text-[11pt]">Nomor: {data.docNumber}</p>
       </div>

       <div className="text-justify mb-6">
          <p className="mb-4">
            Pada hari ini, <b>{data.docDay}</b>, tanggal <b>{data.docDate}</b>, bertempat di <b>{data.city}</b>, yang bertanda tangan di bawah ini:
          </p>

          <ol className="list-decimal ml-5 space-y-6 mb-6">
             <li className="pl-2">
                <div className="mb-2">
                   <div className="flex mb-1"><span className="w-44 inline-block">Nama Lengkap</span><span className="mr-2">:</span><span className="font-bold uppercase">{data.pihak1Name}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block">N.I.K</span><span className="mr-2">:</span><span>{data.pihak1Nik}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block">Tempat/Tgl Lahir</span><span className="mr-2">:</span><span>{data.pihak1Pob}, {data.pihak1Dob}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block">Pekerjaan</span><span className="mr-2">:</span><span>{data.pihak1Occupation}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block align-top">Alamat (Sesuai KTP)</span><span className="mr-2 align-top">:</span><span className="inline-block flex-1">{data.pihak1Address}</span></div>
                </div>
                <p className="mt-2">
                   Dalam hal ini bertindak dalam jabatannya selaku <b>{data.pihak1Position}</b>, dari dan oleh karena itu sah bertindak untuk dan atas nama <b>{data.pihak1Company}</b>. Selanjutnya dalam Perjanjian ini disebut sebagai <b>PIHAK PERTAMA (Principal)</b>.
                </p>
             </li>

             <li className="pl-2">
                <div className="mb-2">
                   <div className="flex mb-1"><span className="w-44 inline-block">Nama Lengkap</span><span className="mr-2">:</span><span className="font-bold uppercase">{data.pihak2Name}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block">N.I.K</span><span className="mr-2">:</span><span>{data.pihak2Nik}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block">Tempat/Tgl Lahir</span><span className="mr-2">:</span><span>{data.pihak2Pob}, {data.pihak2Dob}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block">Pekerjaan</span><span className="mr-2">:</span><span>{data.pihak2Occupation}</span></div>
                   <div className="flex mb-1"><span className="w-44 inline-block align-top">Alamat (Sesuai KTP)</span><span className="mr-2 align-top">:</span><span className="inline-block flex-1">{data.pihak2Address}</span></div>
                </div>
                <p className="mt-2">
                   Dalam hal ini bertindak dalam jabatannya selaku <b>{data.pihak2Position}</b>, dari dan oleh karena itu sah bertindak untuk dan atas nama <b>{data.pihak2Company}</b>. Selanjutnya dalam Perjanjian ini disebut sebagai <b>PIHAK KEDUA (Distributor)</b>.
                </p>
             </li>
          </ol>

          <p className="mb-4">
             PIHAK PERTAMA dan PIHAK KEDUA (secara bersama-sama disebut "Para Pihak") terlebih dahulu menerangkan hal-hal sebagai berikut:
          </p>
          <ul className="list-disc ml-10 space-y-2 mb-6">
             <li>Bahwa PIHAK PERTAMA adalah perusahaan yang bergerak di bidang penyediaan dan/atau distribusi produk {data.produk}.</li>
             <li>Bahwa PIHAK KEDUA memiliki kemampuan dan jaringan yang memadai untuk bertindak sebagai distributor/agen penjual produk-produk tersebut.</li>
             <li>Bahwa Para Pihak sepakat untuk mengikatkan diri dalam Perjanjian Keagenan dan Distribusi ("Perjanjian") dengan tunduk pada syarat dan ketentuan yang diatur dalam Pasal-pasal berikut:</li>
          </ul>
       </div>

       {/* PASAL 1 */}
       <div className="mb-6 text-justify">
           <h3 className="text-center font-bold mb-2 uppercase">PASAL 1<br/>PENUNJUKAN DAN RUANG LINGKUP</h3>
           <ol className="list-decimal ml-6 space-y-2">
               <li className="pl-2">PIHAK PERTAMA menunjuk PIHAK KEDUA, dan PIHAK KEDUA menerima penunjukan tersebut, sebagai Distributor Resmi untuk memasarkan, menjual, dan mendistribusikan produk berupa <b>{data.produk}</b>.</li>
               <li className="pl-2">Wilayah pemasaran dan distribusi yang diberikan oleh PIHAK PERTAMA kepada PIHAK KEDUA adalah terbatas pada <b>{data.wilayah}</b>. PIHAK KEDUA dilarang melakukan penjualan di luar wilayah tersebut tanpa izin tertulis dari PIHAK PERTAMA.</li>
           </ol>
       </div>

       {/* PASAL 2 */}
       <div className="mb-6 text-justify">
           <h3 className="text-center font-bold mb-2 uppercase">PASAL 2<br/>JANGKA WAKTU PERJANJIAN</h3>
           <ol className="list-decimal ml-6 space-y-2">
               <li className="pl-2">Perjanjian ini berlaku selama <b>{data.masaBerlaku}</b>, terhitung efektif sejak tanggal <b>{data.startDate}</b> sampai dengan tanggal <b>{data.endDate}</b>.</li>
               <li className="pl-2">Perjanjian ini dapat diperpanjang atas kesepakatan tertulis dari Para Pihak selambat-lambatnya 30 (tiga puluh) hari sebelum jangka waktu Perjanjian berakhir.</li>
           </ol>
       </div>

       {/* PASAL 3 */}
       <div className="mb-6 text-justify">
           <h3 className="text-center font-bold mb-2 uppercase">PASAL 3<br/>TARGET PENJUALAN MINIMAL</h3>
           <ol className="list-decimal ml-6 space-y-2">
               <li className="pl-2">Sebagai syarat dipertahankannya status sebagai Distributor Resmi, PIHAK KEDUA wajib memenuhi target penjualan minimal sebanyak <b>{data.targetKuantitas}</b> unit produk setiap <b>{data.targetPeriode}</b>.</li>
               <li className="pl-2">Apabila PIHAK KEDUA gagal memenuhi target penjualan minimal tersebut secara berturut-turut, maka PIHAK PERTAMA berhak untuk meninjau ulang, mengurangi wilayah pemasaran, atau mengakhiri Perjanjian ini secara sepihak tanpa tuntutan ganti rugi.</li>
           </ol>
       </div>

       {/* PASAL 4 */}
       <div className="mb-6 text-justify break-inside-avoid">
           <h3 className="text-center font-bold mb-2 uppercase">PASAL 4<br/>SISTEM PEMBAYARAN DAN DENDA</h3>
           <ol className="list-decimal ml-6 space-y-2">
               <li className="pl-2">Setiap pemesanan produk oleh PIHAK KEDUA wajib dibayar menggunakan metode <b>{data.paymentMethod}</b>.</li>
               <li className="pl-2">Dalam hal terjadinya keterlambatan pembayaran tagihan (apabila menggunakan skema termin), maka PIHAK KEDUA akan dikenakan denda keterlambatan sebesar <b>{data.penaltyFee}</b> dari total nilai tagihan per hari keterlambatan.</li>
           </ol>
       </div>

       {/* PASAL 5 */}
       <div className="mb-10 text-justify break-inside-avoid">
           <h3 className="text-center font-bold mb-2 uppercase">PASAL 5<br/>PENYELESAIAN SENGKETA DAN PENUTUP</h3>
           <ol className="list-decimal ml-6 space-y-2">
               <li className="pl-2">Apabila terjadi perselisihan akibat Perjanjian ini, Para Pihak sepakat untuk menyelesaikannya secara kekeluargaan/musyawarah.</li>
               <li className="pl-2">Apabila musyawarah tidak tercapai dalam waktu 30 (tiga puluh) hari, Para Pihak sepakat menunjuk <b>{data.pengadilan}</b> sebagai domisili hukum penyelesaian sengketa.</li>
               <li className="pl-2">Perjanjian ini dibuat dalam 2 (dua) rangkap bermeterai cukup dan memiliki kekuatan hukum yang sama bagi masing-masing Pihak.</li>
           </ol>
       </div>

       {/* TANDA TANGAN */}
       <div className="mt-8 break-inside-avoid">
          <div className="flex justify-between text-center items-stretch mb-4">
             <div className="w-[45%] flex flex-col justify-between">
                <p className="font-bold mb-1 uppercase">PIHAK PERTAMA</p>
                <p className="mb-4">{data.pihak1Company}</p>
                <div className="h-24"></div>
                <p className="font-bold underline uppercase">{data.pihak1Name}</p>
                <p>{data.pihak1Position}</p>
             </div>
             <div className="w-[45%] flex flex-col justify-between">
                <p className="font-bold mb-1 uppercase">PIHAK KEDUA</p>
                <p className="mb-4">{data.pihak2Company}</p>
                <div className="h-24"></div>
                <p className="font-bold underline uppercase">{data.pihak2Name}</p>
                <p>{data.pihak2Position}</p>
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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Distributor</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-emerald-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-emerald-600" /> Editor Perjanjian
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 0. INFORMASI DOKUMEN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <FileText size={14} className="text-indigo-600"/> Informasi Dokumen
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Perjanjian</label>
                        <input type="text" name="docNumber" value={data.docNumber} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hari Penandatanganan</label>
                            <input type="text" name="docDay" value={data.docDay} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                            <input type="text" name="docDate" value={data.docDate} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penandatanganan</label>
                        <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

                {/* 1. PIHAK PERTAMA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-amber-600"/> Pihak Pertama (Principal)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Principal</label>
                        <input type="text" name="pihak1Company" value={data.pihak1Company} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Wakil</label>
                            <input type="text" name="pihak1Name" value={data.pihak1Name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Wakil</label>
                            <input type="text" name="pihak1Position" value={data.pihak1Position} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP Wakil</label>
                        <input type="text" name="pihak1Nik" value={data.pihak1Nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                            <input type="text" name="pihak1Pob" value={data.pihak1Pob} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                            <input type="text" name="pihak1Dob" value={data.pihak1Dob} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                        <input type="text" name="pihak1Occupation" value={data.pihak1Occupation} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP Lengkap</label>
                        <textarea name="pihak1Address" value={data.pihak1Address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 2. PIHAK KEDUA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-sky-600"/> Pihak Kedua (Distributor)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Distributor</label>
                        <input type="text" name="pihak2Company" value={data.pihak2Company} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Wakil</label>
                            <input type="text" name="pihak2Name" value={data.pihak2Name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Wakil</label>
                            <input type="text" name="pihak2Position" value={data.pihak2Position} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP Wakil</label>
                        <input type="text" name="pihak2Nik" value={data.pihak2Nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                            <input type="text" name="pihak2Pob" value={data.pihak2Pob} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                            <input type="text" name="pihak2Dob" value={data.pihak2Dob} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                        <input type="text" name="pihak2Occupation" value={data.pihak2Occupation} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP Lengkap</label>
                        <textarea name="pihak2Address" value={data.pihak2Address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 3. RUANG LINGKUP & JANGKA WAKTU */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <PackageSearch size={14} className="text-emerald-600"/> Objek & Jangka Waktu
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deskripsi Produk Utama</label>
                        <input type="text" name="produk" value={data.produk} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Wilayah Kerja Distribusi</label>
                        <textarea name="wilayah" value={data.wilayah} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-200">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Berlaku Total</label>
                            <input type="text" name="masaBerlaku" value={data.masaBerlaku} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Mulai Berlaku</label>
                            <input type="text" name="startDate" value={data.startDate} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Berakhir</label>
                        <input type="text" name="endDate" value={data.endDate} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

                {/* 4. TARGET & PEMBAYARAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Target size={14} className="text-rose-600"/> Target & Pembayaran
                  </h3>
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kuota Target Minimal</label>
                            <input type="text" name="targetKuantitas" value={data.targetKuantitas} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Per-Periode</label>
                            <select name="targetPeriode" value={data.targetPeriode} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                                <option value="Bulan">Bulan</option>
                                <option value="Kuartal">Kuartal</option>
                                <option value="Semester">Semester</option>
                                <option value="Tahun">Tahun</option>
                            </select>
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembayaran (Default)</label>
                        <input type="text" name="paymentMethod" value={data.paymentMethod} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Denda Keterlambatan (% per Hari)</label>
                        <input type="text" name="penaltyFee" value={data.penaltyFee} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-rose-800 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pengadilan Penyelesaian Sengketa</label>
                        <input type="text" name="pengadilan" value={data.pengadilan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Perjanjian Distributor (Korporat)" price={35000} />
           </div>

        </div>
      </main>
    </div>
  );
}
