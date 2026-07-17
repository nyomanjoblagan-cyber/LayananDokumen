import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\mou\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: MOUPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Kerjasama (MOU) / Nota Kesepahaman Kelas Enterprise
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Edit3, RotateCcw, Handshake, LayoutTemplate, ArrowLeftCircle,
  UserCircle2, FileText, Scale, Landmark
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface MOUData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1
  p1Name: string; 
  p1Nik: string;
  p1Pob: string;
  p1Dob: string;
  p1Occupation: string;
  p1Address: string;
  
  // Pihak 2
  p2Name: string; 
  p2Nik: string;
  p2Pob: string;
  p2Dob: string;
  p2Occupation: string;
  p2Address: string;
  
  // Isi Kerjasama
  cooperationTitle: string;
  scope: string;
  rightsP1: string;
  obsP1: string;
  rightsP2: string;
  obsP2: string;
  financingAmount: string;
  paymentMethod: 'Tunai / Sekaligus' | 'Bertahap / Termin';
  taxBorneBy: 'Pihak Pertama' | 'Pihak Kedua' | 'Ditanggung Bersama';
  period: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: MOUData = {
  day: 'Senin',
  date: '2026-08-01', 
  city: 'Jakarta',
  
  p1Name: 'Budi Santoso, S.E.', 
  p1Nik: '3171234567890001',
  p1Pob: 'Jakarta',
  p1Dob: '1980-05-15',
  p1Occupation: 'Direktur Utama PT Alpha Sentosa',
  p1Address: 'Jl. Sudirman No. 123, RT 001 RW 002, Kel. Senayan, Kec. Kebayoran Baru, Jakarta Selatan',
  
  p2Name: 'Siti Aminah, M.Kom.', 
  p2Nik: '3179876543210002',
  p2Pob: 'Bandung',
  p2Dob: '1985-10-20',
  p2Occupation: 'Konsultan IT Independen',
  p2Address: 'Jl. Gatot Subroto No. 45, RT 003 RW 004, Kel. Menteng, Kec. Menteng, Jakarta Pusat',
  
  cooperationTitle: 'Pengembangan Pemasaran Digital & Branding Terpadu',
  scope: 'Pihak Pertama menunjuk Pihak Kedua sebagai mitra pelaksana untuk mengelola media sosial, pembuatan konten digital, dan strategi periklanan online dalam rangka meningkatkan brand awareness dan penjualan.',
  rightsP1: 'menerima hasil pengelolaan media sosial, aset konten digital, dan laporan performa sesuai dengan target capaian (KPI) yang telah disepakati bersama.',
  obsP1: 'menyediakan materi dasar produk, informasi penunjang operasional, dan membayarkan anggaran promosi beserta fee profesional secara tepat waktu.',
  rightsP2: 'menerima pembayaran fee profesional atau kompensasi biaya sesuai dengan kesepakatan nilai pembiayaan dan jadwal termin yang ditentukan.',
  obsP2: 'melaksanakan pengelolaan media sosial secara profesional, membuat timeline konten bulanan, menjaga kerahasiaan data (NDA), dan memberikan laporan performa.',
  financingAmount: 'Rp 50.000.000 (Lima Puluh Juta Rupiah)',
  paymentMethod: 'Bertahap / Termin',
  taxBorneBy: 'Ditanggung Bersama',
  period: '1 (Satu) Tahun',
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function MOUPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <MOUBuilder />
    </Suspense>
  );
}

function MOUBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<MOUData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'p1' | 'p2' | 'isi'>('info');

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    setData(prev => ({ ...prev, day: days[today.getDay()], date: today.toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof MOUData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset draft perjanjian ke setelan awal?')) {
        const today = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        setData({ ...INITIAL_DATA, day: days[today.getDay()], date: today.toISOString().split('T')[0] });
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
        {/* JUDUL */}
        <div className="text-center mb-8 break-inside-avoid">
            <h1 className="font-bold text-lg uppercase tracking-wider underline">SURAT PERJANJIAN KERJASAMA (MOU)</h1>
            <p className="mt-1 font-bold">Tentang {data.cooperationTitle}</p>
        </div>

        {/* PEMBUKA */}
        <div className="mb-6 text-justify break-inside-avoid">
            <p>
                Pada hari ini, <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:
            </p>
        </div>

        {/* PIHAK PERTAMA */}
        <div className="mb-6 ml-6 break-inside-avoid">
            <div className="flex mb-1"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
            <div className="flex mb-1"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
            <div className="flex mb-1"><div className="w-40">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1Pob}, {formatDateSafe(data.p1Dob)}</div></div>
            <div className="flex mb-1"><div className="w-40">Pekerjaan / Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.p1Occupation}</div></div>
            <div className="flex mb-1"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p1Address}</div></div>
            <div className="mt-2 text-justify">
                Dalam hal ini bertindak untuk dan atas nama diri sendiri / perusahaannya, yang selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.
            </div>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-6 ml-6 break-inside-avoid">
            <div className="flex mb-1"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
            <div className="flex mb-1"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
            <div className="flex mb-1"><div className="w-40">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2Pob}, {formatDateSafe(data.p2Dob)}</div></div>
            <div className="flex mb-1"><div className="w-40">Pekerjaan / Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.p2Occupation}</div></div>
            <div className="flex mb-1"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p2Address}</div></div>
            <div className="mt-2 text-justify">
                Dalam hal ini bertindak untuk dan atas nama diri sendiri / perusahaannya, yang selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.
            </div>
        </div>

        <div className="mb-6 text-justify break-inside-avoid">
            <p>
                PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut <strong>PARA PIHAK</strong>. 
                Dengan ini PARA PIHAK sepakat untuk mengikatkan diri dalam Perjanjian Kerjasama dengan ketentuan dan syarat-syarat (Pasal-pasal) sebagai berikut:
            </p>
        </div>

        {/* PASAL 1 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 1<br/>RUANG LINGKUP KERJASAMA</h3>
            <p>
                Ruang lingkup kerjasama ini adalah {data.scope}
            </p>
        </div>

        {/* PASAL 2 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 2<br/>HAK DAN KEWAJIBAN PIHAK PERTAMA</h3>
            <ol className="list-decimal pl-5 space-y-1">
                <li><strong>Hak Pihak Pertama:</strong> {data.rightsP1}</li>
                <li><strong>Kewajiban Pihak Pertama:</strong> {data.obsP1}</li>
            </ol>
        </div>

        {/* PASAL 3 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 3<br/>HAK DAN KEWAJIBAN PIHAK KEDUA</h3>
            <ol className="list-decimal pl-5 space-y-1">
                <li><strong>Hak Pihak Kedua:</strong> {data.rightsP2}</li>
                <li><strong>Kewajiban Pihak Kedua:</strong> {data.obsP2}</li>
            </ol>
        </div>

        {/* PASAL 4 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 4<br/>NILAI PEMBIAYAAN DAN PEMBAYARAN</h3>
            <ol className="list-decimal pl-5 space-y-1">
                <li>Nilai total pembiayaan atas kerjasama ini adalah sebesar <strong>{data.financingAmount}</strong>.</li>
                <li>Metode pembayaran akan dilakukan secara <strong>{data.paymentMethod}</strong> sesuai dengan tagihan atau termin yang disepakati.</li>
                <li>Pajak-pajak yang timbul akibat pelaksanaan perjanjian ini akan <strong>{data.taxBorneBy}</strong> sesuai dengan ketentuan peraturan perundang-undangan perpajakan yang berlaku.</li>
            </ol>
        </div>

        {/* PASAL 5 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 5<br/>JANGKA WAKTU</h3>
            <p>
                Perjanjian ini berlaku selama <strong>{data.period}</strong> terhitung sejak tanggal ditandatanganinya perjanjian ini, 
                dan dapat diperpanjang atau diakhiri berdasarkan kesepakatan tertulis dari PARA PIHAK.
            </p>
        </div>

        {/* PASAL 6: ENTERPRISE CLAUSES */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 6<br/>FORCE MAJEURE (KEADAAN KAHAR)</h3>
            <p>
                PARA PIHAK dibebaskan dari tanggung jawab atas keterlambatan atau kegagalan dalam memenuhi kewajiban yang disebabkan oleh keadaan memaksa (Force Majeure) seperti bencana alam, huru-hara, perang, atau kebijakan pemerintah yang menghalangi pelaksanaan kewajiban. Pihak yang mengalami Force Majeure wajib memberitahukan secara tertulis kepada pihak lainnya selambat-lambatnya 7 (tujuh) hari kalender sejak kejadian.
            </p>
        </div>

        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-2">PASAL 7<br/>PENYELESAIAN SENGKETA & DOMISILI HUKUM</h3>
            <p>
                Apabila di kemudian hari timbul sengketa atau perselisihan akibat pelaksanaan perjanjian ini, PARA PIHAK sepakat untuk menyelesaikannya secara musyawarah untuk mufakat. Apabila musyawarah tidak mencapai mufakat, maka PARA PIHAK sepakat untuk menyelesaikan sengketa tersebut melalui Kantor Kepaniteraan Pengadilan Negeri setempat.
            </p>
        </div>

        {/* PENUTUP */}
        <div className="mb-12 text-justify break-inside-avoid">
            <p>
                Demikian Perjanjian Kerjasama (MOU) ini dibuat dalam rangkap 2 (dua), masing-masing bermeterai cukup dan mempunyai kekuatan hukum yang sama, ditandatangani oleh PARA PIHAK dalam keadaan sadar dan tanpa paksaan dari pihak manapun.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-between text-center break-inside-avoid px-8 mt-12">
            <div className="w-64">
                <p className="mb-2 font-bold">PIHAK PERTAMA,</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.p1Name}</p>
            </div>
            
            <div className="w-64">
                <p className="mb-2 font-bold">PIHAK KEDUA,</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.p2Name}</p>
            </div>
        </div>

        {/* SAKSI-SAKSI */}
        <div className="flex justify-between text-center break-inside-avoid px-8 mt-12">
            <div className="w-64">
                <p className="mb-16">Saksi Pihak Pertama,</p>
                <p className="font-bold underline uppercase">______________________</p>
            </div>
            
            <div className="w-64">
                <p className="mb-16">Saksi Pihak Kedua,</p>
                <p className="font-bold underline uppercase">______________________</p>
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
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">MOU / Perjanjian Kerjasama</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-blue-600" /> Draft Perjanjian</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'info' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Info</button>
                <button onClick={() => setActiveTab('p1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p1' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Pihak 1</button>
                <button onClick={() => setActiveTab('p2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p2' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Pihak 2</button>
                <button onClick={() => setActiveTab('isi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'isi' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Pasal-Pasal</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'info' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <LayoutTemplate size={14} className="text-slate-600"/> Informasi Kontrak
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hari Penandatanganan</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none font-bold" value={data.day} onChange={e => handleDataChange('day', e.target.value)}>
                                <option value="Senin">Senin</option><option value="Selasa">Selasa</option><option value="Rabu">Rabu</option>
                                <option value="Kamis">Kamis</option><option value="Jumat">Jumat</option><option value="Sabtu">Sabtu</option><option value="Minggu">Minggu</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Penandatanganan</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Tempat Penandatanganan</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Judul / Topik Kerjasama</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.cooperationTitle} onChange={e => handleDataChange('cooperationTitle', e.target.value)} />
                    </div>
                  </div>
              )}

              {activeTab === 'p1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Biodata Pihak Pertama
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap & Gelar</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Pob} onChange={e => handleDataChange('p1Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Dob} onChange={e => handleDataChange('p1Dob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan / Jabatan / Nama Badan Usaha</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Occupation} onChange={e => handleDataChange('p1Occupation', e.target.value)} placeholder="Contoh: Direktur PT X / Wiraswasta" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'p2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-amber-600"/> Biodata Pihak Kedua
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap & Gelar</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.p2Pob} onChange={e => handleDataChange('p2Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.p2Dob} onChange={e => handleDataChange('p2Dob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan / Jabatan / Nama Badan Usaha</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.p2Occupation} onChange={e => handleDataChange('p2Occupation', e.target.value)} placeholder="Contoh: Manajer Operasional / Freelancer" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'isi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Scale size={14} className="text-emerald-600"/> Pasal-Pasal Perjanjian
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pasal 1: Ruang Lingkup Kerjasama</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.scope} onChange={e => handleDataChange('scope', e.target.value)} />
                        </div>

                        <div className="border border-slate-200 p-4 rounded-xl bg-slate-50 space-y-3">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider border-b pb-2">Pasal 2: Pihak Pertama</h4>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Hak Pihak Pertama</label>
                                <textarea className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.rightsP1} onChange={e => handleDataChange('rightsP1', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Kewajiban Pihak Pertama</label>
                                <textarea className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.obsP1} onChange={e => handleDataChange('obsP1', e.target.value)} />
                            </div>
                        </div>

                        <div className="border border-slate-200 p-4 rounded-xl bg-slate-50 space-y-3">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider border-b pb-2">Pasal 3: Pihak Kedua</h4>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Hak Pihak Kedua</label>
                                <textarea className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.rightsP2} onChange={e => handleDataChange('rightsP2', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1">Kewajiban Pihak Kedua</label>
                                <textarea className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.obsP2} onChange={e => handleDataChange('obsP2', e.target.value)} />
                            </div>
                        </div>

                        <div className="border border-slate-200 p-4 rounded-xl bg-amber-50 border-amber-200 space-y-3">
                            <h4 className="text-[10px] font-bold text-amber-800 uppercase tracking-wider border-b border-amber-200 pb-2 flex items-center gap-1"><Landmark size={12}/> Pasal 4: Finansial & Pajak</h4>
                            <div>
                                <label className="block text-[10px] font-bold text-amber-700 mb-1">Total Nilai Pembiayaan / Kontrak</label>
                                <input className="w-full bg-white p-2 border border-amber-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.financingAmount} onChange={e => handleDataChange('financingAmount', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-amber-700 mb-1">Metode Pembayaran</label>
                                    <select className="w-full bg-white p-2 border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)}>
                                        <option value="Tunai / Sekaligus">Tunai / Sekaligus</option>
                                        <option value="Bertahap / Termin">Bertahap / Termin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-amber-700 mb-1">Pajak Ditanggung Oleh</label>
                                    <select className="w-full bg-white p-2 border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={data.taxBorneBy} onChange={e => handleDataChange('taxBorneBy', e.target.value)}>
                                        <option value="Pihak Pertama">Pihak Pertama</option>
                                        <option value="Pihak Kedua">Pihak Kedua</option>
                                        <option value="Ditanggung Bersama">Ditanggung Bersama</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pasal 5: Jangka Waktu Perjanjian</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-bold" value={data.period} onChange={e => handleDataChange('period', e.target.value)} placeholder="Misal: 1 (Satu) Tahun atau 6 (Enam) Bulan" />
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
              <PrintWrapper documentName={`MOU_Kerjasama_${data.p1Name.replace(/\\s+/g, '_')}`} price={40000} />
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
