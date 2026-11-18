import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\franchise\index.tsx"
    
    new_content = """'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    LayoutTemplate, Store, UserCircle2, Coins, MapPin, Building2, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface FranchiseData {
  city: string;
  date: string;
  docNo: string;
  
  // Pihak 1 (Franchisor)
  p1Name: string;
  p1KTP: string;
  p1POB: string;
  p1DOB: string;
  p1Job: string;
  p1Address: string;
  p1Company: string;
  p1Title: string;
  p1Brand: string;

  // Pihak 2 (Franchisee)
  p2Name: string;
  p2KTP: string;
  p2POB: string;
  p2DOB: string;
  p2Job: string;
  p2Address: string;
  p2Location: string;

  // Komersial
  franchiseFee: string;
  royaltyFee: string;
  marketingFee: string;
  penaltyFee: string;
  contractDuration: string;
  exclusiveRadius: string;

  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: FranchiseData = {
  city: 'Jakarta',
  date: '2026-07-20', 
  docNo: 'FRA/LGL/2026/012',
  
  p1Name: 'Dodi Prasetyo',
  p1KTP: '3171234567890001',
  p1POB: 'Jakarta',
  p1DOB: '1980-05-15',
  p1Job: 'Wiraswasta',
  p1Address: 'Menara Bisnis Lt. 12, Jl. HR Rasuna Said, RT 001/RW 002, Kuningan, Jakarta Selatan',
  p1Company: 'PT. Kuliner Nusantara Jaya',
  p1Title: 'Direktur Utama',
  p1Brand: 'Kopi Kenangan Rakyat',
  
  p2Name: 'Iwan Setiawan',
  p2KTP: '3273012345670001',
  p2POB: 'Bandung',
  p2DOB: '1985-08-20',
  p2Job: 'Karyawan Swasta',
  p2Address: 'Jl. Merdeka No. 88, RT 003/RW 005, Sumur Bandung, Kota Bandung, Jawa Barat',
  p2Location: 'Cihampelas Walk, Bandung (Unit G-05)',
  
  franchiseFee: 'Rp 150.000.000,- (Seratus Lima Puluh Juta Rupiah)',
  royaltyFee: '5% (Lima Persen)',
  marketingFee: '1% (Satu Persen)',
  penaltyFee: 'Rp 500.000.000,- (Lima Ratus Juta Rupiah)',
  contractDuration: '5 (Lima)',
  exclusiveRadius: '5 (Lima) Kilometer',
  
  witness1: 'Siti Rahmawati, S.H.',
  witness2: 'Bambang Susilo'
};

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function FranchisePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Franchise Editor...</div>}>
      <FranchiseBuilder />
    </Suspense>
  );
}

function FranchiseBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<FranchiseData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: prev.date || today
    }));
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatDateString = (dateString: string) => {
      if(!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
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
             <h1 className="font-bold text-xl uppercase underline tracking-wide">PERJANJIAN WARALABA (FRANCHISE)</h1>
             <p className="mt-1">Nomor: {data.docNo}</p>
          </div>

          <div className="mb-4 text-justify">
             <p>Pada hari ini, tanggal <b>{formatDateString(data.date)}</b>, bertempat di <b>{data.city}</b>, telah dibuat dan ditandatangani Perjanjian Waralaba (selanjutnya disebut "Perjanjian") oleh dan antara:</p>
          </div>

          {/* PIHAK PERTAMA */}
          <div className="mb-4 ml-4 text-justify">
             <p className="font-bold mb-2">1. PIHAK PERTAMA (Franchisor)</p>
             <div className="ml-4 mb-2">
                 <table className="w-full">
                     <tbody>
                         <tr><td className="w-40 py-1 align-top">Nama</td><td className="w-4 align-top">:</td><td className="py-1 font-bold">{data.p1Name}</td></tr>
                         <tr><td className="w-40 py-1 align-top">No. KTP</td><td className="w-4 align-top">:</td><td className="py-1">{data.p1KTP}</td></tr>
                         <tr><td className="w-40 py-1 align-top">TTL</td><td className="w-4 align-top">:</td><td className="py-1">{data.p1POB}, {formatDateString(data.p1DOB)}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Pekerjaan</td><td className="w-4 align-top">:</td><td className="py-1">{data.p1Job}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Alamat</td><td className="w-4 align-top">:</td><td className="py-1">{data.p1Address}</td></tr>
                     </tbody>
                 </table>
             </div>
             <p className="ml-4 mt-2">Dalam hal ini bertindak dalam jabatannya selaku <b>{data.p1Title}</b> dari dan oleh karenanya sah mewakili <b>{data.p1Company}</b>, selaku pemilik merek dagang <b>"{data.p1Brand}"</b>, untuk selanjutnya disebut <b>PIHAK PERTAMA</b>.</p>
          </div>

          {/* PIHAK KEDUA */}
          <div className="mb-6 ml-4 text-justify">
             <p className="font-bold mb-2">2. PIHAK KEDUA (Franchisee)</p>
             <div className="ml-4 mb-2">
                 <table className="w-full">
                     <tbody>
                         <tr><td className="w-40 py-1 align-top">Nama</td><td className="w-4 align-top">:</td><td className="py-1 font-bold">{data.p2Name}</td></tr>
                         <tr><td className="w-40 py-1 align-top">No. KTP</td><td className="w-4 align-top">:</td><td className="py-1">{data.p2KTP}</td></tr>
                         <tr><td className="w-40 py-1 align-top">TTL</td><td className="w-4 align-top">:</td><td className="py-1">{data.p2POB}, {formatDateString(data.p2DOB)}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Pekerjaan</td><td className="w-4 align-top">:</td><td className="py-1">{data.p2Job}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Alamat</td><td className="w-4 align-top">:</td><td className="py-1">{data.p2Address}</td></tr>
                     </tbody>
                 </table>
             </div>
             <p className="ml-4 mt-2">Dalam hal ini bertindak untuk dan atas nama diri sendiri, untuk selanjutnya disebut <b>PIHAK KEDUA</b>.</p>
          </div>

          <div className="mb-4 text-justify">
              <p>PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut "Para Pihak". Para Pihak terlebih dahulu menerangkan hal-hal sebagai berikut:</p>
              <ul className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Bahwa PIHAK PERTAMA adalah pemilik sah atas merek dagang <b>"{data.p1Brand}"</b> dan memiliki sistem operasional (waralaba) yang telah teruji.</li>
                  <li>Bahwa PIHAK KEDUA bermaksud untuk menjalankan usaha dengan menggunakan merek, sistem, dan standar operasi milik PIHAK PERTAMA di lokasi yang disepakati.</li>
              </ul>
              <p className="mt-2">Berdasarkan hal-hal tersebut, Para Pihak sepakat untuk mengikatkan diri dalam Perjanjian Waralaba ini dengan syarat dan ketentuan sebagai berikut:</p>
          </div>

          <div className="text-center font-bold mt-6 mb-4">PASAL 1<br/>OBJEK DAN LOKASI USAHA</div>
          <div className="text-justify mb-4">
              <p>PIHAK PERTAMA memberikan hak kepada PIHAK KEDUA untuk menjalankan usaha dengan merek <b>"{data.p1Brand}"</b> secara eksklusif di lokasi operasional berikut:</p>
              <p className="font-bold mt-2 text-center bg-slate-50 border border-slate-300 p-2">{data.p2Location}</p>
          </div>

          <div className="text-center font-bold mt-6 mb-4 break-before-page">PASAL 2<br/>JANGKA WAKTU</div>
          <div className="text-justify mb-4">
              <p>Perjanjian ini berlaku untuk jangka waktu <b>{data.contractDuration} Tahun</b> terhitung sejak tanggal penandatanganan Perjanjian ini, dan dapat diperpanjang atas kesepakatan tertulis Para Pihak paling lambat 3 (tiga) bulan sebelum berakhirnya Perjanjian.</p>
          </div>

          <div className="text-center font-bold mt-6 mb-4">PASAL 3<br/>BIAYA WARALABA DAN ROYALTI</div>
          <div className="text-justify mb-4">
              <ol className="list-decimal pl-5 space-y-2">
                  <li><b>Franchise Fee (Biaya Awal):</b> PIHAK KEDUA wajib membayar biaya waralaba (franchise fee) kepada PIHAK PERTAMA sebesar <b>{data.franchiseFee}</b> pada saat penandatanganan Perjanjian ini.</li>
                  <li><b>Royalty Fee:</b> PIHAK KEDUA wajib membayar royalti sebesar <b>{data.royaltyFee}</b> dari total pendapatan kotor bulanan setiap tanggal 10 pada bulan berikutnya.</li>
                  <li><b>Marketing Fee:</b> PIHAK KEDUA wajib berkontribusi untuk biaya pemasaran nasional sebesar <b>{data.marketingFee}</b> dari total pendapatan kotor bulanan.</li>
              </ol>
          </div>

          <div className="text-center font-bold mt-6 mb-4">PASAL 4<br/>HAK EKSKLUSIVITAS WILAYAH</div>
          <div className="text-justify mb-4">
              <p>PIHAK PERTAMA menjamin bahwa selama Perjanjian ini berlaku, PIHAK PERTAMA tidak akan membuka atau memberikan izin waralaba kepada pihak ketiga lainnya untuk merek <b>"{data.p1Brand}"</b> di dalam radius <b>{data.exclusiveRadius}</b> dari lokasi operasional PIHAK KEDUA.</p>
          </div>

          <div className="text-center font-bold mt-6 mb-4">PASAL 5<br/>LARANGAN PINDAH TANGAN (SUB-LEASE)</div>
          <div className="text-justify mb-4">
              <p>PIHAK KEDUA dilarang keras untuk mengalihkan, memindahtangankan, menyewakan kembali, atau mensub-waralabakan (sub-franchise) hak operasi ini kepada pihak ketiga mana pun tanpa persetujuan tertulis sebelumnya dari PIHAK PERTAMA. Pelanggaran atas ketentuan ini akan mengakibatkan pemutusan sepihak oleh PIHAK PERTAMA.</p>
          </div>

          <div className="text-center font-bold mt-6 mb-4">PASAL 6<br/>DENDA DAN SANKSI (PENALTY)</div>
          <div className="text-justify mb-4">
              <p>Dalam hal PIHAK KEDUA secara sengaja membocorkan rahasia dagang, resep standar, tata cara operasional (SOP), atau memproduksi bahan baku di luar standar PIHAK PERTAMA, maka PIHAK KEDUA wajib membayar denda penalti kepada PIHAK PERTAMA sebesar <b>{data.penaltyFee}</b> dan Perjanjian ini batal demi hukum.</p>
          </div>

          <div className="text-center font-bold mt-6 mb-4">PASAL 7<br/>PENYELESAIAN SENGKETA & FORCE MAJEURE</div>
          <div className="text-justify mb-8">
              <ol className="list-decimal pl-5 space-y-2">
                  <li>Segala perselisihan yang timbul akan diselesaikan secara musyawarah untuk mufakat. Apabila tidak tercapai kesepakatan, Para Pihak memilih domisili hukum yang tetap di Pengadilan Negeri {data.city}.</li>
                  <li>Keterlambatan atau kegagalan Para Pihak akibat Keadaan Kahar (Force Majeure) seperti bencana alam, perang, atau huru-hara tidak akan dianggap sebagai pelanggaran kontrak.</li>
              </ol>
          </div>

          {/* TANDA TANGAN */}
          <div className="mt-12 break-inside-avoid">
              <p className="text-center mb-8">Demikian Perjanjian ini dibuat dalam rangkap 2 (dua) bermaterai cukup dan memiliki kekuatan hukum yang sama bagi Para Pihak.</p>
              
              <div className="flex justify-between text-center mb-16">
                  <div className="w-[45%]">
                      <p className="font-bold mb-24">PIHAK PERTAMA (Franchisor)</p>
                      <p className="font-bold underline uppercase">{data.p1Name}</p>
                      <p>{data.p1Title} - {data.p1Company}</p>
                  </div>
                  <div className="w-[45%]">
                      <p className="font-bold mb-24">PIHAK KEDUA (Franchisee)</p>
                      <p className="font-bold underline uppercase">{data.p2Name}</p>
                      <p>Pemegang Hak Waralaba</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Kontrak Franchise B2B</h1>
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
                  <Store size={18} className="text-sky-600" /> Editor Klausul Waralaba
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INFORMASI DOKUMEN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Store size={14} className="text-amber-600"/> Metadata Kontrak
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Dokumen Hukum</label>
                        <input type="text" name="docNo" value={data.docNo} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Perjanjian</label>
                            <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                            <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                  </div>
                </div>

                {/* 2. PIHAK 1 (FRANCHISOR) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-sky-600"/> Pihak 1 (Pemberi Waralaba)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Merek / Brand Usaha</label>
                        <input type="text" name="p1Brand" value={data.p1Brand} onChange={handleStringChange} className="w-full bg-sky-50 border border-sky-200 rounded-xl p-2.5 text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Entitas Perusahaan</label>
                        <input type="text" name="p1Company" value={data.p1Company} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Direktur/Wakil</label>
                            <input type="text" name="p1Name" value={data.p1Name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan (Contoh: Direktur)</label>
                            <input type="text" name="p1Title" value={data.p1Title} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor KTP (NIK)</label>
                            <input type="text" name="p1KTP" value={data.p1KTP} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input type="text" name="p1Job" value={data.p1Job} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                            <input type="text" name="p1POB" value={data.p1POB} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                            <input type="date" name="p1DOB" value={data.p1DOB} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP (Wakil)</label>
                        <textarea name="p1Address" value={data.p1Address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 3. PIHAK 2 (FRANCHISEE) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-emerald-600"/> Pihak 2 (Penerima Waralaba)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Franchisee</label>
                        <input type="text" name="p2Name" value={data.p2Name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor KTP (NIK)</label>
                            <input type="text" name="p2KTP" value={data.p2KTP} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input type="text" name="p2Job" value={data.p2Job} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                            <input type="text" name="p2POB" value={data.p2POB} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                            <input type="date" name="p2DOB" value={data.p2DOB} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP Franchisee</label>
                        <textarea name="p2Address" value={data.p2Address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 4. KLAUSUL & BIAYA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Coins size={14} className="text-purple-600"/> Klausul Finansial & Operasi
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Cabang yang Disetujui</label>
                        <textarea name="p2Location" value={data.p2Location} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-purple-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Biaya Waralaba Awal (Franchise Fee)</label>
                        <input type="text" name="franchiseFee" value={data.franchiseFee} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Royalty Fee</label>
                            <input type="text" name="royaltyFee" value={data.royaltyFee} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Marketing Fee</label>
                            <input type="text" name="marketingFee" value={data.marketingFee} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Durasi Kontrak (Tahun)</label>
                            <input type="text" name="contractDuration" value={data.contractDuration} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Proteksi Radius (Jarak)</label>
                            <input type="text" name="exclusiveRadius" value={data.exclusiveRadius} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div className="pt-2 border-t border-dashed border-slate-200">
                        <label className="block text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1.5 flex items-center gap-1"><ShieldAlert size={12}/> Denda Pelanggaran Kontrak (Penalty)</label>
                        <input type="text" name="penaltyFee" value={data.penaltyFee} onChange={handleStringChange} className="w-full bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>
                
                {/* 5. SAKSI HUKUM */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Edit3 size={14} className="text-slate-600"/> Saksi Hukum
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
              <PrintWrapper documentName="Kontrak Franchise B2B" price={30000} />
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
