import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\nda\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: NDAPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Non-Disclosure Agreement (Corporate Warfare Standard)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, ShieldCheck, 
  User, AlertOctagon, Edit3, RotateCcw,
  Building2, Scale, FileText, Lock
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface NdaData {
  city: string;
  date: string;
  
  // Pihak Pertama (Penguasa)
  name1: string;
  nik1: string;
  pob1: string;
  dob1: string;
  occupation1: string;
  address1: string;
  institution1: string;
  position1: string;
  
  // Pihak Kedua (Penerima)
  name2: string;
  nik2: string;
  pob2: string;
  dob2: string;
  occupation2: string;
  address2: string;
  
  purpose: string;
  penaltyAmount: string;
  penaltyAmountText: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: NdaData = {
  city: 'JAKARTA',
  date: '2026-08-01',
  
  name1: 'VICTORIA BLACKWOOD, S.H., M.B.A.',
  nik1: '3171012304850001',
  pob1: 'Jakarta',
  dob1: '1985-04-23',
  occupation1: 'Direktur Eksekutif',
  address1: 'Menara Korporat Lantai 50, Jl. Jend. Sudirman Kav 1, Jakarta Selatan',
  institution1: 'PT MEGA KORPORA Tbk',
  position1: 'CEO',

  name2: 'ALEXANDRIA WONG',
  nik2: '3171056708920004',
  pob2: 'Surabaya',
  dob2: '1992-08-15',
  occupation2: 'Konsultan Independen',
  address2: 'Jl. Merak No. 9, RT 01/RW 03, Kel. Rawa Barat, Kec. Kebayoran Baru, Jakarta Selatan',

  purpose: 'Audit Strategis dan Analisis Kerentanan Infrastruktur Siber (Cyber Vulnerability Analysis)',
  penaltyAmount: '50.000.000.000',
  penaltyAmountText: 'Lima Puluh Miliar Rupiah'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function NDAPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor NDA...</div>}>
      <NdaToolBuilder />
    </Suspense>
  );
}

function NdaToolBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<NdaData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'p1' | 'p2' | 'isi'>('info');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof NdaData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke pengaturan korporat awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } catch { return dateString; }
    };

    return (
      <Kertas>
        {/* HEADER / JUDUL */}
        <div className="text-center mb-8 border-b-2 border-black pb-4 break-inside-avoid">
            <h1 className="font-black text-xl tracking-widest uppercase">NON-DISCLOSURE AGREEMENT</h1>
            <p className="font-bold tracking-widest mt-1">PERJANJIAN KERAHASIAAN INFORMASI</p>
        </div>

        {/* PEMBUKA */}
        <div className="mb-4 text-justify break-inside-avoid">
            <p>
                Perjanjian Kerahasiaan Informasi ini ("Perjanjian") ditandatangani di <strong>{data.city}</strong> pada tanggal <strong>{formatDateSafe(data.date)}</strong>, oleh dan antara:
            </p>
        </div>

        {/* PIHAK PERTAMA (PENGUNGKAP) */}
        <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold mb-2">I. PIHAK PENGUNGKAP (DISCLOSING PARTY)</h3>
            <div className="ml-6">
                <div className="flex mb-1"><div className="w-40">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.name1}</div></div>
                <div className="flex mb-1"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.nik1}</div></div>
                <div className="flex mb-1"><div className="w-40">Jabatan / Institusi</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.position1} {data.institution1 ? `- ${data.institution1}` : ''}</div></div>
                <div className="flex mb-1"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.address1}</div></div>
                <div className="mt-2 text-justify italic">
                    Dalam hal ini bertindak untuk dan atas nama {data.institution1 || 'diri sendiri'}, selanjutnya disebut sebagai <strong>"PIHAK PERTAMA"</strong>.
                </div>
            </div>
        </div>

        {/* PIHAK KEDUA (PENERIMA) */}
        <div className="mb-6 break-inside-avoid">
            <h3 className="font-bold mb-2">II. PIHAK PENERIMA (RECEIVING PARTY)</h3>
            <div className="ml-6">
                <div className="flex mb-1"><div className="w-40">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.name2}</div></div>
                <div className="flex mb-1"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.nik2}</div></div>
                <div className="flex mb-1"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.occupation2}</div></div>
                <div className="flex mb-1"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.address2}</div></div>
                <div className="mt-2 text-justify italic">
                    Dalam hal ini bertindak untuk dan atas nama diri sendiri, selanjutnya disebut sebagai <strong>"PIHAK KEDUA"</strong>.
                </div>
            </div>
        </div>

        <div className="mb-6 text-justify break-inside-avoid">
            <p>
                PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut "Para Pihak". Para Pihak bermaksud untuk berdiskusi, mengevaluasi, dan/atau menjalankan kerjasama terkait: <strong>{data.purpose}</strong> (selanjutnya disebut "Tujuan").
            </p>
        </div>

        {/* PASAL 1 */}
        <div className="mb-4 text-justify break-inside-avoid">
            <h3 className="font-bold mb-1">Pasal 1: Definisi Informasi Rahasia</h3>
            <p className="pl-4">
                "Informasi Rahasia" berarti segala informasi, data, teknologi, rancangan sistem, kode sumber (source code), strategi bisnis, rahasia dagang, data keuangan, data pelanggan, atau materi apa pun yang diungkapkan oleh PIHAK PERTAMA kepada PIHAK KEDUA, baik secara lisan, tertulis, grafik, atau elektronik.
            </p>
        </div>

        {/* PASAL 2 */}
        <div className="mb-4 text-justify break-inside-avoid">
            <h3 className="font-bold mb-1">Pasal 2: Kewajiban Kerahasiaan</h3>
            <p className="pl-4 mb-2">PIHAK KEDUA dengan ini secara tegas dan tanpa syarat setuju untuk:</p>
            <ol className="list-lower-alpha pl-10 space-y-1">
                <li>Menjaga kerahasiaan Informasi Rahasia dengan standar kehati-hatian tertinggi (highest degree of care).</li>
                <li>Tidak mengungkapkan, mendistribusikan, mempublikasikan, atau menyalin Informasi Rahasia kepada pihak ketiga mana pun tanpa persetujuan tertulis sebelumnya dari PIHAK PERTAMA.</li>
                <li>Hanya menggunakan Informasi Rahasia semata-mata untuk pelaksanaan Tujuan yang telah disepakati.</li>
            </ol>
        </div>

        {/* PASAL 3 */}
        <div className="mb-4 text-justify break-inside-avoid">
            <h3 className="font-bold mb-1">Pasal 3: Pengecualian</h3>
            <p className="pl-4">
                Kewajiban kerahasiaan tidak berlaku untuk informasi yang: (a) telah menjadi domain publik tanpa pelanggaran oleh PIHAK KEDUA; (b) secara sah diterima dari pihak ketiga tanpa kewajiban kerahasiaan; atau (c) diwajibkan untuk diungkapkan oleh putusan pengadilan atau otoritas pemerintah yang berwenang, dengan syarat PIHAK KEDUA segera memberitahu PIHAK PERTAMA secara tertulis.
            </p>
        </div>

        {/* PASAL 4: KLAUSUL SANKSI (CORPORATE WARFARE) */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold mb-1">Pasal 4: Sanksi dan Ganti Rugi Pelanggaran</h3>
            <p className="pl-4">
                Apabila PIHAK KEDUA terbukti melakukan pelanggaran, kelalaian, atau pembocoran Informasi Rahasia, maka PIHAK KEDUA wajib membayar ganti rugi (Liquidated Damages) secara tunai dan seketika kepada PIHAK PERTAMA sebesar <strong>Rp {data.penaltyAmount} ({data.penaltyAmountText})</strong>. Pembayaran sanksi ini tidak menghapuskan hak PIHAK PERTAMA untuk menuntut secara pidana maupun perdata atas kerugian lanjutan.
            </p>
        </div>

        {/* PASAL 5 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold mb-1">Pasal 5: Pengembalian Dokumen</h3>
            <p className="pl-4">
                Segera setelah permintaan tertulis dari PIHAK PERTAMA, atau pada saat berakhirnya kerjasama, PIHAK KEDUA wajib mengembalikan atau memusnahkan secara permanen seluruh dokumen, hard drive, atau media penyimpanan lain yang berisi Informasi Rahasia.
            </p>
        </div>

        {/* PENUTUP */}
        <div className="mb-12 text-justify break-inside-avoid">
            <p>
                Demikian Perjanjian ini dibuat dalam 2 (dua) rangkap bermeterai cukup dan berkekuatan hukum tetap, ditandatangani secara sadar tanpa paksaan dari pihak mana pun pada hari dan tanggal yang telah disebutkan di awal.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-between text-center break-inside-avoid px-8 mt-12">
            <div className="w-64">
                <p className="mb-2 font-bold">PIHAK PERTAMA<br/>(Disclosing Party)</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.name1}</p>
            </div>
            
            <div className="w-64">
                <p className="mb-2 font-bold">PIHAK KEDUA<br/>(Receiving Party)</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.name2}</p>
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
              <ArrowLeftCircle size={20} className="text-rose-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">NDA / Kerahasiaan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-rose-600" /> Draft NDA</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'info' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Info</button>
                <button onClick={() => setActiveTab('p1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p1' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Pihak 1 (Utama)</button>
                <button onClick={() => setActiveTab('p2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p2' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Pihak 2 (Terikat)</button>
                <button onClick={() => setActiveTab('isi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'isi' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Sanksi & Tujuan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'info' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Informasi Kontrak NDA
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Tempat TTD</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Perjanjian</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'p1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-blue-600"/> Pihak Pengungkap (Disclosing Party)
                    </h3>
                    <p className="text-[10px] text-slate-500 italic mb-2">Ini adalah pihak yang memiliki rahasia dan ingin melindunginya (Misal: Perusahaan Anda).</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Penanda Tangan</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.name1} onChange={e => handleDataChange('name1', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.nik1} onChange={e => handleDataChange('nik1', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan / Pekerjaan Pribadi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.occupation1} onChange={e => handleDataChange('occupation1', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pob1} onChange={e => handleDataChange('pob1', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.dob1} onChange={e => handleDataChange('dob1', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Institusi / Perusahaan (Mewakili Siapa?)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={data.institution1} onChange={e => handleDataChange('institution1', e.target.value)} placeholder="Contoh: PT MEGA KORPORA Tbk" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan di Institusi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.position1} onChange={e => handleDataChange('position1', e.target.value)} placeholder="Contoh: CEO / Direktur" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap (Perusahaan/Pribadi)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.address1} onChange={e => handleDataChange('address1', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'p2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-amber-600"/> Pihak Penerima (Receiving Party)
                    </h3>
                    <p className="text-[10px] text-slate-500 italic mb-2">Ini adalah pihak yang akan menerima informasi rahasia dan dilarang membocorkannya (Karyawan/Mitra).</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pelaksana</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.name2} onChange={e => handleDataChange('name2', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.nik2} onChange={e => handleDataChange('nik2', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.occupation2} onChange={e => handleDataChange('occupation2', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.pob2} onChange={e => handleDataChange('pob2', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.dob2} onChange={e => handleDataChange('dob2', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap Domisili</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.address2} onChange={e => handleDataChange('address2', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'isi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Lock size={14} className="text-rose-600"/> Tujuan Kerjasama & Klausul Penalti
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Spesifik Pengungkapan Informasi (Pasal Pembuka)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                        </div>

                        <div className="border border-rose-200 p-4 rounded-xl bg-rose-50 space-y-3">
                            <h4 className="text-[10px] font-bold text-rose-800 uppercase tracking-wider border-b border-rose-200 pb-2 flex items-center gap-1"><AlertOctagon size={12}/> Klausul Ganti Rugi Pelanggaran (Liquidated Damages)</h4>
                            <p className="text-[10px] text-rose-600 italic">Sanksi ini langsung mengikat jika terbukti membocorkan rahasia. Isi dengan nilai hukuman yang memberatkan.</p>
                            
                            <div>
                                <label className="block text-[10px] font-bold text-rose-700 mb-1">Nominal Sanksi (Angka)</label>
                                <div className="flex bg-white rounded-lg border border-rose-200 overflow-hidden focus-within:ring-2 focus-within:ring-rose-500">
                                    <div className="px-3 py-2 bg-rose-100 font-bold text-rose-800 text-sm border-r border-rose-200">Rp</div>
                                    <input className="w-full p-2 text-sm font-mono font-bold text-rose-900 outline-none" value={data.penaltyAmount} onChange={e => handleDataChange('penaltyAmount', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-rose-700 mb-1">Nominal Terbilang (Huruf)</label>
                                <input className="w-full bg-white p-2 border border-rose-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none" value={data.penaltyAmountText} onChange={e => handleDataChange('penaltyAmountText', e.target.value)} />
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
              <PrintWrapper documentName={`NDA_${data.name2.replace(/\\s+/g, '_')}`} price={75000} />
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
