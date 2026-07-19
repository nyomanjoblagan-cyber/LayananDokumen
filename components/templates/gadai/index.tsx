'use client';
import { useFormSync } from '@/lib/useFormSync';


import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    LayoutTemplate, Wallet, Scale, Box, UserCircle2, Coins, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface GadaiData {
  day: string;
  date: string;
  city: string;

  // Pihak 1 (Penerima Gadai)
  p1Name: string;
  p1Nik: string;
  p1Birth: string;
  p1Job: string;
  p1Address: string;
  
  // Pihak 2 (Pemberi Gadai)
  p2Name: string;
  p2Nik: string;
  p2Birth: string;
  p2Job: string;
  p2Address: string;
  
  // Detail Aset
  assetName: string;
  assetDetail: string;
  assetValue: number;
  
  // Pinjaman
  loanAmount: number;
  loanAmountText: string;
  dueDate: string;
  interest: string;
  toleranceDays: number;
  
  // Saksi & Klausul
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: GadaiData = {
  day: 'Senin',
  date: '2026-07-20',
  city: 'Jakarta',

  p1Name: 'Budi Santoso', 
  p1Nik: '3171010101780001', 
  p1Birth: 'Jakarta, 17 Agustus 1978',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Merdeka No. 10, RT 001/RW 002, Kel. Kuningan, Kec. Setiabudi, Jakarta Selatan',
  
  p2Name: 'Andi Wijaya', 
  p2Nik: '3171020202920005',
  p2Birth: 'Bandung, 12 Januari 1992',
  p2Job: 'Pegawai Swasta',
  p2Address: 'Jl. Sudirman No. 45, RT 003/RW 005, Kel. Karet, Kec. Tanah Abang, Jakarta Pusat',
  
  assetName: '1 (satu) unit Sepeda Motor Honda Vario 150',
  assetDetail: 'Tahun 2022, Warna Hitam, No. Polisi B 1234 ABC, No. Rangka: MH123..., No. Mesin: JFG123... dilengkapi dengan STNK dan BPKB asli',
  assetValue: 15000000,

  loanAmount: 10000000,
  loanAmountText: 'Sepuluh Juta Rupiah',
  dueDate: '2026-08-20',
  interest: '0% (Tanpa Bunga)',
  toleranceDays: 7,
  
  witness1: 'Hendra Saputra', 
  witness2: 'Siti Aminah',
};

// --- HELPER TERBILANG ---
const terbilang = (angka: number): string => {
  const bil = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  if (angka < 12) return " " + bil[angka];
  if (angka < 20) return terbilang(angka - 10) + " Belas";
  if (angka < 100) return terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
  if (angka < 200) return " Seratus" + terbilang(angka - 100);
  if (angka < 1000) return terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
  if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
  if (angka < 1000000000) return terbilang(Math.floor(angka / 1000000)) + " Juta" + terbilang(angka % 1000000);
  if (angka < 1000000000000) return terbilang(Math.floor(angka / 1000000000)) + " Miliar" + terbilang(angka % 1000000000);
  return "";
};

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function GadaiAsetPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Gadai Editor...</div>}>
      <GadaiBuilder />
    </Suspense>
  );
}

function GadaiBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<GadaiData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const todayStr = new Date().toISOString().split('T')[0];
    const todayObj = new Date();
    const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    
    // Default 1 month ahead
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    setData(prev => ({ 
        ...prev, 
        date: prev.date || todayStr,
        day: prev.day || days[todayObj.getDay()],
        dueDate: prev.dueDate || nextMonth.toISOString().split('T')[0]
    }));
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      if(e.target.name === 'loanAmount') {
          setData({ ...data, loanAmount: val, loanAmountText: val > 0 ? terbilang(val).trim() + " Rupiah" : "" });
      } else {
          setData({ ...data, [e.target.name]: val });
      }
  };

  const formatDateString = (dateString: string) => {
      if(!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
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

  const DocumentContent = () => {
      return (
        <Kertas templateId={templateId}>
          <div className="text-center mb-8">
             <h1 className="font-bold text-xl uppercase underline tracking-wide">SURAT PERJANJIAN GADAI BARANG</h1>
          </div>

          <div className="mb-4 text-justify">
             <p>Pada hari ini, <b>{data.day}</b> tanggal <b>{formatDateString(data.date)}</b>, bertempat di <b>{data.city}</b>, telah disepakati Perjanjian Gadai oleh dan antara:</p>
          </div>

          {/* PIHAK PERTAMA */}
          <div className="mb-4 ml-4 text-justify">
             <div className="ml-4 mb-2">
                 <table className="w-full">
                     <tbody>
                         <tr><td className="w-40 py-1 align-top">Nama</td><td className="w-4 align-top">:</td><td className="py-1 font-bold">{data.p1Name}</td></tr>
                         <tr><td className="w-40 py-1 align-top">No. KTP</td><td className="w-4 align-top">:</td><td className="py-1">{data.p1Nik}</td></tr>
                         <tr><td className="w-40 py-1 align-top">TTL</td><td className="w-4 align-top">:</td><td className="py-1">{data.p1Birth}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Pekerjaan</td><td className="w-4 align-top">:</td><td className="py-1">{data.p1Job}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Alamat</td><td className="w-4 align-top">:</td><td className="py-1">{data.p1Address}</td></tr>
                     </tbody>
                 </table>
             </div>
             <p className="ml-4 mt-2">Selanjutnya dalam Perjanjian ini disebut sebagai <b>PIHAK PERTAMA (Penerima Gadai/Pemberi Pinjaman)</b>.</p>
          </div>

          {/* PIHAK KEDUA */}
          <div className="mb-6 ml-4 text-justify">
             <div className="ml-4 mb-2">
                 <table className="w-full">
                     <tbody>
                         <tr><td className="w-40 py-1 align-top">Nama</td><td className="w-4 align-top">:</td><td className="py-1 font-bold">{data.p2Name}</td></tr>
                         <tr><td className="w-40 py-1 align-top">No. KTP</td><td className="w-4 align-top">:</td><td className="py-1">{data.p2Nik}</td></tr>
                         <tr><td className="w-40 py-1 align-top">TTL</td><td className="w-4 align-top">:</td><td className="py-1">{data.p2Birth}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Pekerjaan</td><td className="w-4 align-top">:</td><td className="py-1">{data.p2Job}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Alamat</td><td className="w-4 align-top">:</td><td className="py-1">{data.p2Address}</td></tr>
                     </tbody>
                 </table>
             </div>
             <p className="ml-4 mt-2">Selanjutnya dalam Perjanjian ini disebut sebagai <b>PIHAK KEDUA (Pemberi Gadai/Peminjam)</b>.</p>
          </div>

          <div className="mb-4 text-justify">
              <p>PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama sepakat untuk mengikatkan diri dalam Perjanjian Gadai dengan syarat dan ketentuan sebagai berikut:</p>
          </div>

          <div className="break-inside-avoid">
              <div className="font-bold mt-6 mb-2">PASAL 1 : OBJEK GADAI & NILAI PINJAMAN</div>
              <div className="text-justify mb-4">
                  <ol className="list-decimal pl-5 space-y-2">
                      <li>PIHAK KEDUA dengan ini menggadaikan barang miliknya yang sah dan bebas dari sengketa/sitaan hukum berupa: <b>{data.assetName}</b>. Detail aset: <i>{data.assetDetail}</i>. Nilai taksir aset tersebut disepakati sebesar <b>{formatCurrency(data.assetValue)}</b>.</li>
                      <li>Atas penyerahan barang gadai tersebut, PIHAK PERTAMA memberikan pinjaman uang tunai kepada PIHAK KEDUA sebesar <b>{formatCurrency(data.loanAmount)} ({data.loanAmountText})</b>.</li>
                      <li>Bunga/Biaya Administrasi atas pinjaman ini disepakati sebesar: <b>{data.interest}</b>.</li>
                  </ol>
              </div>
          </div>

          <div className="break-inside-avoid">
              <div className="font-bold mt-6 mb-2">PASAL 2 : JANGKA WAKTU & JATUH TEMPO</div>
              <div className="text-justify mb-4">
                  <p>Jangka waktu pinjaman ditetapkan sampai dengan tanggal <b>{formatDateString(data.dueDate)}</b>. PIHAK KEDUA wajib melunasi pokok pinjaman beserta biayanya (jika ada) paling lambat pada tanggal jatuh tempo tersebut.</p>
              </div>
          </div>

          <div className="break-inside-avoid">
              <div className="font-bold mt-6 mb-2">PASAL 3 : PENITIPAN BARANG</div>
              <div className="text-justify mb-4">
                  <p>Barang gadai diserahkan dan dititipkan sepenuhnya kepada PIHAK PERTAMA. Selama masa gadai, PIHAK PERTAMA tidak diperkenankan menggunakan barang tersebut untuk kepentingan pribadi dan wajib menjaganya dengan baik.</p>
              </div>
          </div>

          <div className="break-inside-avoid">
              <div className="font-bold mt-6 mb-2">PASAL 4 : EKSEKUSI JAMINAN (WANPRESTASI)</div>
              <div className="text-justify mb-4">
                  <p>Apabila PIHAK KEDUA tidak dapat melunasi pinjaman pada tanggal jatuh tempo dan telah melewati masa toleransi selama <b>{data.toleranceDays} ({terbilang(data.toleranceDays).trim()}) hari kalender</b>, maka PIHAK PERTAMA secara sah dan tanpa perlu putusan pengadilan berhak <b>menjual/melelang barang gadai tersebut</b> untuk melunasi kewajiban hutang PIHAK KEDUA.</p>
              </div>
          </div>

          {/* TANDA TANGAN */}
          <div className="mt-12 break-inside-avoid">
              <p className="text-justify mb-8">Demikian Perjanjian Gadai ini dibuat dalam keadaan sadar, tanpa paksaan, dan ditandatangani di atas materai yang cukup agar memiliki kekuatan hukum yang sah.</p>
              
              <div className="flex justify-between text-center mb-16">
                  <div className="w-[45%]">
                      <p className="font-bold mb-24">PIHAK PERTAMA<br/>(Penerima Gadai)</p>
                      <p className="font-bold underline uppercase">{data.p1Name}</p>
                  </div>
                  <div className="w-[45%]">
                      <p className="font-bold mb-24">PIHAK KEDUA<br/>(Pemberi Gadai)</p>
                      <p className="font-bold underline uppercase">{data.p2Name}</p>
                  </div>
              </div>

              <div className="text-center">
                  <p className="font-bold mb-6">SAKSI-SAKSI</p>
                  <div className="flex justify-center gap-16">
                      <div className="w-40">
                          <div className="h-16"></div>
                          <p className="font-bold underline uppercase">{data.witness1}</p>
                          <p>Saksi I</p>
                      </div>
                      <div className="w-40">
                          <div className="h-16"></div>
                          <p className="font-bold underline uppercase">{data.witness2}</p>
                          <p>Saksi II</p>
                      </div>
                  </div>
              </div>
          </div>
        </Kertas>
      );
  };

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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Gadai Aset</h1>
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
                  <Wallet size={18} className="text-sky-600" /> Editor Klausul Gadai
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INFORMASI WAKTU */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <LayoutTemplate size={14} className="text-amber-600"/> Waktu & Tempat
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hari</label>
                        <input type="text" name="day" value={data.day} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Perjanjian</label>
                        <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                    <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                  </div>
                </div>

                {/* 2. PIHAK 1 (PENERIMA GADAI / PEMBERI UANG) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-sky-600"/> Pihak 1 (Pemberi Uang/Penerima Gadai)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Sesuai KTP</label>
                        <input type="text" name="p1Name" value={data.p1Name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor KTP (NIK)</label>
                            <input type="text" name="p1Nik" value={data.p1Nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input type="text" name="p1Job" value={data.p1Job} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                        <input type="text" name="p1Birth" value={data.p1Birth} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                        <textarea name="p1Address" value={data.p1Address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 3. PIHAK 2 (PEMBERI GADAI / PEMINJAM UANG) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-emerald-600"/> Pihak 2 (Peminjam Uang/Pemberi Gadai)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Sesuai KTP</label>
                        <input type="text" name="p2Name" value={data.p2Name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor KTP (NIK)</label>
                            <input type="text" name="p2Nik" value={data.p2Nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input type="text" name="p2Job" value={data.p2Job} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                        <input type="text" name="p2Birth" value={data.p2Birth} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                        <textarea name="p2Address" value={data.p2Address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 4. BARANG JAMINAN & UANG */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Box size={14} className="text-purple-600"/> Aset Gadai & Pinjaman
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Singkat Barang Jaminan</label>
                        <input type="text" name="assetName" value={data.assetName} onChange={handleStringChange} className="w-full bg-purple-50 border border-purple-200 rounded-xl p-2.5 text-sm font-bold text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Spesifikasi Lengkap / Ciri Khusus</label>
                        <textarea name="assetDetail" value={data.assetDetail} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Taksiran Nilai Aset (Rp)</label>
                            <input type="number" name="assetValue" value={data.assetValue || ''} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Pinjaman Gadai (Rp)</label>
                            <input type="number" name="loanAmount" value={data.loanAmount || ''} onChange={handleNumberChange} className="w-full bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-sm font-black text-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1.5">Tanggal Jatuh Tempo</label>
                            <input type="date" name="dueDate" value={data.dueDate} onChange={handleStringChange} className="w-full bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bunga / Biaya (Opsional)</label>
                            <input type="text" name="interest" value={data.interest} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="pt-2 border-t border-dashed border-slate-200">
                        <label className="block text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1.5 flex items-center gap-1"><ShieldAlert size={12}/> Hari Toleransi Keterlambatan (Sebelum Lelang)</label>
                        <input type="number" name="toleranceDays" value={data.toleranceDays} onChange={handleNumberChange} className="w-full bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

                {/* 5. SAKSI HUKUM */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Edit3 size={14} className="text-slate-600"/> Saksi Kesepakatan
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi Pihak Pertama</label>
                        <input type="text" name="witness1" value={data.witness1} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi Pihak Kedua</label>
                        <input type="text" name="witness2" value={data.witness2} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none transition-all" />
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
              <PrintWrapper documentName="Surat Gadai Aset" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
