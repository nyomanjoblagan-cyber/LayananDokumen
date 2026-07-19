'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: JointVenturePage.tsx
 * STATUS: PRODUCTION READY (CORPORATE WARFARE EDITION)
 * DESC: Generator Perjanjian Kerja Sama (Joint Venture) Skala Enterprise
 * FEATURES: Loss Sharing, Exit Strategy, 8 Pasal Ekstensif, Form Dinamis, Print MS Word HTML-pure.
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Briefcase, Handshake, LayoutTemplate, 
  Scale, Coins, ShieldCheck, Edit3, Building2, RotateCcw, ArrowLeftCircle, User, AlertTriangle, Eye
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface JVData {
  city: string;
  date: string;
  docNo: string;
  
  // Pihak 1
  p1Name: string;
  p1Nik: string;
  p1Pob: string;
  p1Dob: string;
  p1Job: string;
  p1Address: string;
  p1Role: string;
  p1Company: string;

  // Pihak 2
  p2Name: string;
  p2Nik: string;
  p2Pob: string;
  p2Dob: string;
  p2Job: string;
  p2Address: string;
  p2Role: string;
  p2Company: string;

  // Proyek
  projectName: string;
  projectLocation: string;
  investmentAmount: string;
  capitalP1: string;
  capitalP2: string;
  durationMonths: string;
  
  // Profit & Loss Sharing
  profitP1: string;
  profitP2: string;
  lossP1: string;
  lossP2: string;
  
  // Exit Strategy
  exitNoticeDays: string;
  exitPenalty: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT (DUMMY CORPORATE) ---
const INITIAL_DATA: JVData = {
  city: 'JAKARTA',
  date: '', // Diisi oleh useEffect
  docNo: 'JV/CORP-OPS/VIII/2026/099',
  
  p1Name: 'HENDRA KUSUMAH',
  p1Nik: '3171234567890001',
  p1Pob: 'Jakarta',
  p1Dob: '1980-05-15',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Sudirman Kav 21, RT 01 RW 02, Kel. Karet, Kec. Setiabudi, Jakarta Selatan',
  p1Role: 'Investor Utama',
  p1Company: 'PT. MAJU MUNDUR SEJAHTERA',

  p2Name: 'REZA ADRIAN',
  p2Nik: '3271234567890002',
  p2Pob: 'Bandung',
  p2Dob: '1985-08-20',
  p2Job: 'Direktur Operasional',
  p2Address: 'Jl. Merdeka No. 45, RT 03 RW 04, Kel. Babakan, Kec. Sumur Bandung, Bandung',
  p2Role: 'Pengelola Operasional',
  p2Company: 'CV. KREATIF MUDA KARYA',

  projectName: 'Pengembangan Perangkat Lunak Sistem ERP Enterprise',
  projectLocation: 'DKI Jakarta',
  investmentAmount: 'Rp 5.000.000.000,- (Lima Miliar Rupiah)',
  capitalP1: 'Rp 3.500.000.000,-',
  capitalP2: 'Rp 1.500.000.000,-',
  durationMonths: '60',
  
  profitP1: '70',
  profitP2: '30',
  lossP1: '70',
  lossP2: '30',
  
  exitNoticeDays: '90',
  exitPenalty: 'Rp 500.000.000,-',
  
  witness1: 'Tito Karnavian (Notaris/Legal)',
  witness2: 'Agus Salim (Saksi Independen)'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function JointVenturePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <JVBuilder />
    </Suspense>
  );
}

function JVBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<JVData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'identitas' | 'proyek' | 'finansial' | 'exit'>('identitas');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof JVData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="text-center mb-8 border-b-2 border-black pb-2 break-inside-avoid">
          <h1 className="font-bold text-lg uppercase tracking-wider underline">PERJANJIAN KERJA SAMA (JOINT VENTURE)</h1>
          <p className="text-sm font-semibold mt-1">Nomor: {data.docNo}</p>
        </div>

        <p className="mb-4 text-justify">
          Perjanjian Kerja Sama (*Joint Venture*) ini dibuat dan ditandatangani pada hari ini, di <strong>{data.city}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong>, oleh dan antara:
        </p>

        {/* PIHAK PERTAMA */}
        <div className="mb-6 break-inside-avoid">
          <p className="font-bold mb-2 underline">PIHAK PERTAMA (I)</p>
          <div className="ml-8 space-y-1">
            <div className="flex">
                <div className="w-48 font-semibold">Nama Lengkap</div>
                <div className="w-4">:</div>
                <div className="flex-1 font-bold uppercase">{data.p1Name}</div>
            </div>
            <div className="flex">
                <div className="w-48 font-semibold">Nomor Identitas (KTP)</div>
                <div className="w-4">:</div>
                <div className="flex-1 font-mono">{data.p1Nik}</div>
            </div>
            <div className="flex">
                <div className="w-48 font-semibold">Alamat</div>
                <div className="w-4">:</div>
                <div className="flex-1 text-justify">{data.p1Address}</div>
            </div>
            <div className="flex">
                <div className="w-48 font-semibold">Bertindak atas nama</div>
                <div className="w-4">:</div>
                <div className="flex-1 font-bold">{data.p1Company}</div>
            </div>
          </div>
          <p className="mt-2 text-justify">
            Dalam perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>, yang memegang peran sebagai <strong>{data.p1Role}</strong>.
          </p>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-6 break-inside-avoid">
          <p className="font-bold mb-2 underline">PIHAK KEDUA (II)</p>
          <div className="ml-8 space-y-1">
            <div className="flex">
                <div className="w-48 font-semibold">Nama Lengkap</div>
                <div className="w-4">:</div>
                <div className="flex-1 font-bold uppercase">{data.p2Name}</div>
            </div>
            <div className="flex">
                <div className="w-48 font-semibold">Nomor Identitas (KTP)</div>
                <div className="w-4">:</div>
                <div className="flex-1 font-mono">{data.p2Nik}</div>
            </div>
            <div className="flex">
                <div className="w-48 font-semibold">Alamat</div>
                <div className="w-4">:</div>
                <div className="flex-1 text-justify">{data.p2Address}</div>
            </div>
            <div className="flex">
                <div className="w-48 font-semibold">Bertindak atas nama</div>
                <div className="w-4">:</div>
                <div className="flex-1 font-bold">{data.p2Company}</div>
            </div>
          </div>
          <p className="mt-2 text-justify">
            Dalam perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>, yang memegang peran sebagai <strong>{data.p2Role}</strong>.
          </p>
        </div>

        <p className="mb-4 text-justify">
          PIHAK PERTAMA dan PIHAK KEDUA (selanjutnya secara bersama-sama disebut <strong>"PARA PIHAK"</strong>) dengan ini menerangkan terlebih dahulu bahwa PARA PIHAK telah sepakat untuk mengadakan Perjanjian Kerja Sama (*Joint Venture*) dengan syarat dan ketentuan sebagaimana diatur dalam pasal-pasal berikut:
        </p>

        {/* PASAL 1 - 3 */}
        <div className="mb-4 text-justify space-y-4">
          <div className="break-inside-avoid">
              <h3 className="font-bold text-center mb-1">Pasal 1</h3>
              <h3 className="font-bold text-center mb-2">MAKSUD DAN TUJUAN</h3>
              <p>PARA PIHAK sepakat untuk mendirikan usaha bersama dan/atau melaksanakan proyek dengan rincian sebagai berikut:</p>
              <ul className="list-disc ml-8 mt-2 space-y-1">
                <li><strong>Nama Proyek/Usaha:</strong> {data.projectName}</li>
                <li><strong>Lokasi Pelaksanaan:</strong> {data.projectLocation}</li>
                <li><strong>Jangka Waktu:</strong> {data.durationMonths} Bulan, terhitung sejak perjanjian ini ditandatangani, dan dapat diperpanjang atas kesepakatan tertulis PARA PIHAK.</li>
              </ul>
          </div>
          
          <div className="break-inside-avoid">
              <h3 className="font-bold text-center mb-1 mt-6">Pasal 2</h3>
              <h3 className="font-bold text-center mb-2">NILAI INVESTASI DAN MODAL</h3>
              <p>1. Total nilai investasi yang dibutuhkan untuk pelaksanaan kerja sama ini adalah sebesar <strong>{data.investmentAmount}</strong>.</p>
              <p>2. Proporsi penyertaan modal oleh PARA PIHAK disepakati sebagai berikut:</p>
              <ul className="list-disc ml-8 my-2">
                <li>PIHAK PERTAMA menyetorkan modal sebesar: <strong>{data.capitalP1}</strong></li>
                <li>PIHAK KEDUA menyetorkan modal sebesar: <strong>{data.capitalP2}</strong></li>
              </ul>
              <p>3. Seluruh dana disetorkan ke rekening bersama yang akan dibuka khusus atas persetujuan PARA PIHAK selambat-lambatnya 7 (tujuh) hari kerja setelah perjanjian ini ditandatangani.</p>
          </div>

          <div className="break-inside-avoid">
              <h3 className="font-bold text-center mb-1 mt-6">Pasal 3</h3>
              <h3 className="font-bold text-center mb-2">PEMBAGIAN KEUNTUNGAN DAN KERUGIAN</h3>
              <p>1. <strong>*Profit Sharing* (Bagi Hasil):</strong> Keuntungan bersih (*Net Profit*) dari hasil kerja sama ini akan dibagikan dengan proporsi:</p>
              <ul className="list-disc ml-8 my-2">
                <li>PIHAK PERTAMA: <strong>{data.profitP1}%</strong></li>
                <li>PIHAK KEDUA: <strong>{data.profitP2}%</strong></li>
              </ul>
              <p>2. <strong>*Loss Sharing* (Tanggung Renteng Kerugian):</strong> Apabila dalam perjalanannya usaha ini mengalami kerugian secara finansial yang dibuktikan melalui audit pembukuan, maka kerugian tersebut akan ditanggung oleh PARA PIHAK dengan proporsi:</p>
              <ul className="list-disc ml-8 my-2">
                <li>PIHAK PERTAMA: <strong>{data.lossP1}%</strong></li>
                <li>PIHAK KEDUA: <strong>{data.lossP2}%</strong></li>
              </ul>
          </div>
        </div>
        
        {/* PASAL 4 - 6 */}
        <div className="mb-4 text-justify space-y-4">
          <div className="break-inside-avoid">
              <h3 className="font-bold text-center mb-1 mt-6">Pasal 4</h3>
              <h3 className="font-bold text-center mb-2">HAK DAN KEWAJIBAN</h3>
              <p><strong>Hak dan Kewajiban PIHAK PERTAMA:</strong></p>
              <ol className="list-decimal ml-8 my-2">
                <li>Menyediakan modal sesuai dengan nilai yang disebutkan pada Pasal 2.</li>
                <li>Berhak menerima laporan keuangan dan operasional secara berkala (bulanan/kuartalan).</li>
                <li>Berhak melakukan audit independen terhadap pembukuan usaha.</li>
              </ol>
              <p><strong>Hak dan Kewajiban PIHAK KEDUA:</strong></p>
              <ol className="list-decimal ml-8 my-2">
                <li>Mengelola, menjalankan, dan mengawasi operasional bisnis sehari-hari dengan itikad baik (*Good Corporate Governance*).</li>
                <li>Wajib memberikan laporan keuangan, laporan progres operasional, dan neraca laba/rugi kepada PIHAK PERTAMA secara transparan dan tepat waktu.</li>
                <li>Tidak diperkenankan membuat keputusan strategis yang mengubah esensi bisnis tanpa persetujuan tertulis PIHAK PERTAMA.</li>
              </ol>
          </div>
          
          <div className="break-inside-avoid">
              <h3 className="font-bold text-center mb-1 mt-6">Pasal 5</h3>
              <h3 className="font-bold text-center mb-2">STRATEGI KELUAR (*EXIT STRATEGY*) DAN PENALTI</h3>
              <p>1. Apabila salah satu pihak berniat untuk mengundurkan diri atau menarik modalnya sebelum berakhirnya Jangka Waktu (Pasal 1), pihak tersebut wajib memberikan pemberitahuan tertulis (*Notice*) selambat-lambatnya <strong>{data.exitNoticeDays} hari kalender</strong> sebelumnya.</p>
              <p>2. Pengunduran diri secara sepihak tanpa alasan *Force Majeure* akan dikenakan penalti/denda sebesar <strong>{data.exitPenalty}</strong>, yang harus dibayarkan kepada pihak yang dirugikan sebelum penarikan modal dilakukan.</p>
              <p>3. Pihak yang bertahan memiliki Hak Penolakan Pertama (*Right of First Refusal*) untuk membeli saham/porsi modal pihak yang keluar berdasarkan valuasi independen.</p>
          </div>

          <div className="break-inside-avoid">
              <h3 className="font-bold text-center mb-1 mt-6">Pasal 6</h3>
              <h3 className="font-bold text-center mb-2">KEADAAN KAHAR (*FORCE MAJEURE*)</h3>
              <p>1. PARA PIHAK dibebaskan dari tanggung jawab atas kegagalan pemenuhan kewajiban jika disebabkan oleh *Force Majeure* (bencana alam, perang, kebijakan pemerintah yang memblokir usaha secara langsung, huru-hara).</p>
              <p>2. Pihak yang terdampak wajib memberitahukan secara tertulis paling lambat 7x24 jam setelah kejadian, dengan melampirkan bukti dari otoritas berwenang.</p>
          </div>
        </div>

        {/* PASAL 7 - 8 */}
        <div className="mb-12 text-justify space-y-4">
          <div className="break-inside-avoid">
              <h3 className="font-bold text-center mb-1 mt-6">Pasal 7</h3>
              <h3 className="font-bold text-center mb-2">PENYELESAIAN SENGKETA</h3>
              <p>1. Segala perselisihan yang timbul akan diselesaikan secara musyawarah mufakat.</p>
              <p>2. Apabila musyawarah gagal, PARA PIHAK sepakat untuk menyelesaikannya secara hukum melalui Pengadilan Negeri sesuai wilayah yurisdiksi di {data.city}.</p>
          </div>
          
          <div className="break-inside-avoid">
              <h3 className="font-bold text-center mb-1 mt-6">Pasal 8</h3>
              <h3 className="font-bold text-center mb-2">PENUTUP</h3>
              <p>Perjanjian ini dibuat dalam rangkap 2 (dua), bermeterai cukup (Rp 10.000) dan ditandatangani oleh PARA PIHAK dalam keadaan sehat, sadar, tanpa paksaan, serta masing-masing memiliki kekuatan hukum yang sama.</p>
          </div>
        </div>

        {/* TANDA TANGAN */}
        <div className="break-inside-avoid">
            <div className="flex justify-between items-start text-center mb-8">
              <div className="w-[45%]">
                <p className="font-bold mb-2">PIHAK PERTAMA</p>
                <div className="h-6"></div>
                <div className="w-24 h-14 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <p className="font-bold underline uppercase mt-2">{data.p1Name}</p>
                <p className="text-sm">{data.p1Company}</p>
              </div>
              <div className="w-[45%]">
                <p className="font-bold mb-2">PIHAK KEDUA</p>
                <div className="h-6"></div>
                <div className="w-24 h-14 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <p className="font-bold underline uppercase mt-2">{data.p2Name}</p>
                <p className="text-sm">{data.p2Company}</p>
              </div>
            </div>
            
            <div className="mt-8 text-center border-t border-gray-400 pt-8">
              <p className="font-bold mb-6">SAKSI - SAKSI</p>
              <div className="flex justify-between">
                <div className="w-[45%]">
                    <div className="h-16"></div>
                    <p className="font-bold underline uppercase">{data.witness1}</p>
                    <p className="text-sm">Saksi I</p>
                </div>
                <div className="w-[45%]">
                    <div className="h-16"></div>
                    <p className="font-bold underline uppercase">{data.witness2}</p>
                    <p className="text-sm">Saksi II</p>
                </div>
              </div>
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
              <ArrowLeftCircle size={20} className="text-amber-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">B2B Joint Venture</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-amber-600 hover:bg-amber-500 text-slate-900 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      {/* MOBILE TABS MENU */}
      <div className="md:hidden flex overflow-x-auto bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans hide-scrollbar">
        <button onClick={() => setActiveTab('identitas')} className={`shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${activeTab === 'identitas' ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50' : 'text-slate-500'}`}>
           <User size={14}/> Identitas
        </button>
        <button onClick={() => setActiveTab('proyek')} className={`shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${activeTab === 'proyek' ? 'text-amber-700 border-b-2 border-amber-700 bg-amber-50' : 'text-slate-500'}`}>
           <Building2 size={14}/> Proyek
        </button>
        <button onClick={() => setActiveTab('finansial')} className={`shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${activeTab === 'finansial' ? 'text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50' : 'text-slate-500'}`}>
           <Coins size={14}/> Finansial
        </button>
        <button onClick={() => setActiveTab('exit')} className={`shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${activeTab === 'exit' ? 'text-rose-700 border-b-2 border-rose-700 bg-rose-50' : 'text-slate-500'}`}>
           <AlertTriangle size={14}/> Exit
        </button>
        <button onClick={() => setMobileView('preview')} className={`shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-slate-900 border-b-2 border-slate-900 bg-slate-100' : 'text-slate-500'}`}>
           <Eye size={14}/> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[580px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-amber-600" /> Editor JV</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="hidden md:flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('identitas')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'identitas' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>1. Identitas</button>
                <button onClick={() => setActiveTab('proyek')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'proyek' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Proyek</button>
                <button onClick={() => setActiveTab('finansial')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'finansial' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Finansial</button>
                <button onClick={() => setActiveTab('exit')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'exit' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Exit Plan</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'identitas' && (
                <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <LayoutTemplate size={14} className="text-blue-600"/> Kop Surat
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No Dokumen</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota & Tanggal</label>
                          <div className="flex gap-1">
                             <input className="w-1/2 bg-slate-50 p-2.5 border border-slate-200 rounded-l-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                             <input type="date" className="w-1/2 bg-slate-50 p-2.5 border border-slate-200 rounded-r-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-blue-600"/> PIHAK PERTAMA (Investor / Owner)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No Identitas (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mewakili Entitas/PT</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Peran / Jabatan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Role} onChange={e => handleDataChange('p1Role', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-12 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-sky-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-sky-600"/> PIHAK KEDUA (Operator / Partner)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-sky-50 p-2.5 border border-sky-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No Identitas (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mewakili Entitas/PT</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Company} onChange={e => handleDataChange('p2Company', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Peran / Jabatan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Role} onChange={e => handleDataChange('p2Role', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-12 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'proyek' && (
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-amber-600"/> Ruang Lingkup Proyek
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Proyek / Usaha</label>
                            <textarea className="w-full bg-amber-50 p-3 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none h-16 resize-none" value={data.projectName} onChange={e => handleDataChange('projectName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Pelaksanaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.projectLocation} onChange={e => handleDataChange('projectLocation', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jangka Waktu (Bulan)</label>
                                <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none font-bold text-amber-700" value={data.durationMonths} onChange={e => handleDataChange('durationMonths', e.target.value)} />
                            </div>
                        </div>
                    </div>
                 </div>
              )}

              {activeTab === 'finansial' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <Coins size={14} className="text-emerald-600"/> Permodalan (CAPEX)
                      </h3>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Total Nilai Investasi Keseluruhan</label>
                              <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.investmentAmount} onChange={e => handleDataChange('investmentAmount', e.target.value)} />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Setoran Pihak 1 (Rupiah/Aset)</label>
                                  <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.capitalP1} onChange={e => handleDataChange('capitalP1', e.target.value)} />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Setoran Pihak 2 (Rupiah/Aset)</label>
                                  <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.capitalP2} onChange={e => handleDataChange('capitalP2', e.target.value)} />
                              </div>
                          </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-indigo-500">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <Scale size={14} className="text-indigo-600"/> Profit & Loss Sharing (%)
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                              <h4 className="text-[10px] font-bold bg-indigo-100 text-indigo-700 py-1 px-2 rounded uppercase text-center">Bagi Hasil (Profit)</h4>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 mb-1.5">Pihak 1 (%)</label>
                                  <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-center" value={data.profitP1} onChange={e => handleDataChange('profitP1', e.target.value)} />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 mb-1.5">Pihak 2 (%)</label>
                                  <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-center" value={data.profitP2} onChange={e => handleDataChange('profitP2', e.target.value)} />
                              </div>
                          </div>
                          <div className="space-y-3">
                              <h4 className="text-[10px] font-bold bg-rose-100 text-rose-700 py-1 px-2 rounded uppercase text-center">Tanggung Rugi (Loss)</h4>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 mb-1.5">Pihak 1 (%)</label>
                                  <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-center text-rose-600" value={data.lossP1} onChange={e => handleDataChange('lossP1', e.target.value)} />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 mb-1.5">Pihak 2 (%)</label>
                                  <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-center text-rose-600" value={data.lossP2} onChange={e => handleDataChange('lossP2', e.target.value)} />
                              </div>
                          </div>
                      </div>
                   </div>
                 </>
              )}

              {activeTab === 'exit' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <AlertTriangle size={14} className="text-rose-600"/> Exit Strategy & Penalti
                      </h3>
                      <div className="space-y-4">
                          <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg">
                              <p className="text-[10px] text-rose-700 font-semibold leading-relaxed">
                                Fitur ini melindungi investasi dari pengunduran diri sepihak (*hit-and-run*). Tentukan periode *notice* dan besaran ganti rugi (Penalti).
                              </p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Notice Mundur (Hari)</label>
                                  <input type="number" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none" value={data.exitNoticeDays} onChange={e => handleDataChange('exitNoticeDays', e.target.value)} />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Denda Penalti (Rp)</label>
                                  <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-rose-700 focus:ring-2 focus:ring-rose-500 outline-none" value={data.exitPenalty} onChange={e => handleDataChange('exitPenalty', e.target.value)} />
                              </div>
                          </div>
                      </div>
                   </div>
                   
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <ShieldCheck size={14} className="text-slate-600"/> Saksi
                      </h3>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi 1 (Opsional/Notaris)</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi 2</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} />
                          </div>
                      </div>
                   </div>
                 </>
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
              <PrintWrapper documentName="B2B_Joint_Venture" price={10000} />
           </div>

        </div>
      </main>

    </div>
  );
}
