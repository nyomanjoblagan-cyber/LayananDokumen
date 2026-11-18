import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\nikah\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: PengantarNikahPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Perjanjian Pranikah / Lampiran Pengantar Nikah (Model Legal Corporate/Notaris)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Heart, Building2, UserCircle2, 
  MapPin, LayoutTemplate, Edit3, RotateCcw,
  Scale, FileText, Briefcase
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PrenupData {
  city: string;
  date: string;
  docNo: string;
  
  // Pihak Pertama
  p1Name: string;
  p1Nik: string;
  p1PlaceBirth: string;
  p1DateBirth: string;
  p1Job: string;
  p1Address: string;

  // Pihak Kedua
  p2Name: string;
  p2Nik: string;
  p2PlaceBirth: string;
  p2DateBirth: string;
  p2Job: string;
  p2Address: string;

  // Klausul Dinamis
  hartaKekayaan: string; // 'pisah' | 'campur'
  tanggunganPajak: string; // 'masing-masing' | 'bersama'
  hakAsuhAnak: string; // 'kesepakatan' | 'hukum'
  penyelesaianSengketa: string; // 'musyawarah' | 'pengadilan'
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PrenupData = {
  city: 'Jakarta Selatan',
  date: '2026-08-01', 
  docNo: '045/PRANIKAH/LGL/2026',
  
  p1Name: 'BIMA ARYA WICAKSANA, M.Sc.',
  p1Nik: '3174010101900001',
  p1PlaceBirth: 'Jakarta',
  p1DateBirth: '1990-05-15',
  p1Job: 'Direktur Utama PT Teknologi Nusantara',
  p1Address: 'Jl. Sudirman Kav 20, Kebayoran Baru, Jakarta Selatan',
  
  p2Name: 'AYU KIRANA, dr. Sp.A.',
  p2Nik: '3174020202950002',
  p2PlaceBirth: 'Bandung',
  p2DateBirth: '1995-08-20',
  p2Job: 'Dokter Spesialis Anak',
  p2Address: 'Jl. Kemang Raya No. 15, Bangka, Jakarta Selatan',

  hartaKekayaan: 'pisah',
  tanggunganPajak: 'masing-masing',
  hakAsuhAnak: 'kesepakatan',
  penyelesaianSengketa: 'pengadilan',
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PengantarNikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian Pranikah...</div>}>
      <PrenupBuilder />
    </Suspense>
  );
}

function PrenupBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PrenupData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'p1' | 'p2' | 'isi'>('info');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PrenupData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir perjanjian pranikah ke pengaturan awal?')) {
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
        <div className="text-center mb-8 break-inside-avoid">
            <h1 className="font-bold text-lg tracking-wider uppercase underline">PERJANJIAN PRANIKAH<br/>(PRENUPTIAL AGREEMENT)</h1>
            <p className="mt-1 font-mono text-sm">Nomor: {data.docNo}</p>
        </div>

        {/* PEMBUKA */}
        <div className="mb-4 text-justify break-inside-avoid">
            <p>
                Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, dibuat dan ditandatangani Perjanjian Pranikah oleh dan antara pihak-pihak di bawah ini:
            </p>
        </div>

        {/* PIHAK PERTAMA */}
        <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold mb-2">I. PIHAK PERTAMA (CALON SUAMI)</h3>
            <div className="ml-6">
                <div className="flex mb-1"><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                <div className="flex mb-1"><div className="w-48">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
                <div className="flex mb-1"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1PlaceBirth}, {formatDateSafe(data.p1DateBirth)}</div></div>
                <div className="flex mb-1"><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
                <div className="flex mb-1"><div className="w-48 align-top">Alamat Domisili</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p1Address}</div></div>
            </div>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-6 break-inside-avoid">
            <h3 className="font-bold mb-2">II. PIHAK KEDUA (CALON ISTRI)</h3>
            <div className="ml-6">
                <div className="flex mb-1"><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                <div className="flex mb-1"><div className="w-48">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
                <div className="flex mb-1"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2PlaceBirth}, {formatDateSafe(data.p2DateBirth)}</div></div>
                <div className="flex mb-1"><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
                <div className="flex mb-1"><div className="w-48 align-top">Alamat Domisili</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p2Address}</div></div>
            </div>
        </div>

        <div className="mb-6 text-justify break-inside-avoid">
            <p>
                Pihak Pertama dan Pihak Kedua secara bersama-sama selanjutnya disebut "Para Pihak". 
                Bahwa Para Pihak bermaksud untuk melangsungkan perkawinan yang sah menurut ketentuan hukum dan agama yang berlaku di Republik Indonesia. 
                Sebelum perkawinan dilangsungkan, Para Pihak sepakat untuk mengatur secara tegas mengenai akibat hukum perkawinan terhadap harta benda, utang-piutang, dan hal-hal lain dalam Perjanjian ini, dengan ketentuan (Pasal-pasal) sebagai berikut:
            </p>
        </div>

        {/* PASAL 1 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 1<br/>PEMISAHAN HARTA KEKAYAAN</h3>
            <p>
                {data.hartaKekayaan === 'pisah' 
                    ? "Terdapat pemisahan harta kekayaan secara menyeluruh (Absolute Separation of Property) antara Pihak Pertama dan Pihak Kedua. Segala harta bawaan sebelum perkawinan maupun harta perolehan selama masa perkawinan, baik benda bergerak maupun tidak bergerak, akan menjadi milik eksklusif dari masing-masing pihak yang memperoleh atau membelinya, tanpa adanya percampuran (Harta Gono-Gini)."
                    : "Para Pihak sepakat bahwa harta bawaan masing-masing sebelum perkawinan tetap menjadi milik masing-masing. Namun, segala harta perolehan selama masa perkawinan akan dicampur menjadi satu kesatuan (Harta Bersama / Harta Gono-Gini) yang pengelolaannya menjadi hak dan tanggung jawab bersama."
                }
            </p>
        </div>

        {/* PASAL 2 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 2<br/>UTANG PIUTANG DAN TANGGUNGAN FINANSIAL</h3>
            <p>
                Segala utang piutang, kewajiban finansial, maupun perjanjian kredit yang dibuat secara sepihak oleh masing-masing pihak, baik sebelum maupun sesudah perkawinan dilangsungkan, akan menjadi beban dan tanggung jawab mutlak secara pribadi dari pihak yang bersangkutan. Pihak lainnya dibebaskan dari segala tuntutan hukum yang diakibatkan oleh gagal bayar (default).
            </p>
        </div>

        {/* PASAL 3 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 3<br/>TANGGUNG JAWAB PAJAK (TAX LIABILITY)</h3>
            <p>
                {data.tanggunganPajak === 'masing-masing'
                    ? "Setiap kewajiban perpajakan, baik Pajak Penghasilan (PPh), Pajak Bumi dan Bangunan (PBB), maupun pajak-pajak lainnya atas aset yang terdaftar atas nama masing-masing pihak, akan dilaporkan (NPWP Terpisah) dan dibayarkan secara mandiri oleh pihak yang bersangkutan."
                    : "Kewajiban perpajakan selama masa perkawinan akan ditanggung secara bersama-sama, dengan pelaporan pajak yang disatukan (Satu NPWP) di bawah nama Kepala Keluarga sesuai dengan peraturan perundang-undangan perpajakan yang berlaku."
                }
            </p>
        </div>

        {/* PASAL 4 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 4<br/>BIAYA HIDUP DAN RUMAH TANGGA</h3>
            <p>
                Biaya hidup rutin dan keperluan operasional rumah tangga, termasuk namun tidak terbatas pada pemeliharaan tempat tinggal, pendidikan, dan kesehatan anak-anak (apabila ada), akan ditanggung dan didiskusikan bersama sesuai dengan porsi proporsional kemampuan finansial masing-masing pihak.
            </p>
        </div>

        {/* PASAL 5 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 5<br/>PENGAWASAN DAN HAK ASUH ANAK (CHILD CUSTODY)</h3>
            <p>
                Apabila terjadi perpisahan, perceraian, atau berakhirnya perkawinan secara hukum, maka pengaturan hak asuh anak dan tunjangan pemeliharaan anak 
                {data.hakAsuhAnak === 'kesepakatan'
                    ? " akan ditentukan kemudian melalui kesepakatan tertulis (Musyawarah) oleh Para Pihak dengan mengutamakan kepentingan terbaik bagi masa depan psikologis dan pendidikan anak."
                    : " akan diserahkan dan diputus secara mutlak oleh Majelis Hakim pada Pengadilan Agama/Negeri yang berwenang, sesuai dengan regulasi hukum keluarga yang berlaku di wilayah hukum Republik Indonesia."
                }
            </p>
        </div>

        {/* PASAL 6 */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 6<br/>HUKUM YANG BERLAKU DAN PENYELESAIAN SENGKETA</h3>
            <p>
                Perjanjian Pranikah ini tunduk dan ditafsirkan berdasarkan Hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan terkait interpretasi maupun implementasi dari Perjanjian ini akan diselesaikan secara 
                {data.penyelesaianSengketa === 'musyawarah'
                    ? " kekeluargaan melalui musyawarah mufakat, tanpa melibatkan campur tangan pihak ketiga maupun instansi pengadilan, kecuali diwajibkan oleh undang-undang."
                    : " yudisial melalui kantor Kepaniteraan Pengadilan tingkat pertama tempat domisili hukum di mana Perjanjian ini dibuat dan dicatatkan."
                }
            </p>
        </div>

        {/* PENUTUP */}
        <div className="mb-12 text-justify break-inside-avoid">
            <p>
                Demikian Perjanjian Pranikah ini dibuat, disepakati, dan ditandatangani oleh Para Pihak dalam keadaan sehat jasmani dan rohani, tanpa adanya paksaan, tekanan, maupun ancaman dari pihak mana pun. Perjanjian ini dibuat rangkap 2 (dua), masing-masing bermeterai cukup dan memiliki kekuatan hukum pembuktian yang sama.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-between text-center break-inside-avoid px-8 mt-12">
            <div className="w-64">
                <p className="mb-2 font-bold uppercase">PIHAK PERTAMA</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.p1Name}</p>
            </div>
            
            <div className="w-64">
                <p className="mb-2 font-bold uppercase">PIHAK KEDUA</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.p2Name}</p>
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
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Perjanjian Pranikah</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-purple-600" /> Draft Perjanjian</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'info' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Info</button>
                <button onClick={() => setActiveTab('p1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p1' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Suami</button>
                <button onClick={() => setActiveTab('p2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p2' ? 'bg-white border-t-2 border-pink-500 text-pink-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Istri</button>
                <button onClick={() => setActiveTab('isi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'isi' ? 'bg-white border-t-2 border-purple-500 text-purple-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Klausul</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'info' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Informasi Registrasi
                    </h3>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Dokumen (Opsional)</label>
                        <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penetapan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Penandatanganan</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'p1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Data Calon Suami (Pihak 1)
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
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1PlaceBirth} onChange={e => handleDataChange('p1PlaceBirth', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1DateBirth} onChange={e => handleDataChange('p1DateBirth', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan / Profesi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'p2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-pink-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-pink-600"/> Data Calon Istri (Pihak 2)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap & Gelar</label>
                            <input className="w-full bg-pink-50 p-2.5 border border-pink-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none uppercase" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.p2PlaceBirth} onChange={e => handleDataChange('p2PlaceBirth', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.p2DateBirth} onChange={e => handleDataChange('p2DateBirth', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan / Profesi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'isi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-purple-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Scale size={14} className="text-purple-600"/> Klausul Hukum Pranikah
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">1. Sistem Harta Kekayaan</label>
                            <select className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" value={data.hartaKekayaan} onChange={e => handleDataChange('hartaKekayaan', e.target.value)}>
                                <option value="pisah">Pisah Harta Mutlak (Tidak ada Gono-Gini)</option>
                                <option value="campur">Harta Bersama (Ada Gono-Gini selama nikah)</option>
                            </select>
                            <p className="text-[9px] text-slate-500 mt-2">Menentukan apakah aset yang dibeli saat menikah jadi milik bersama atau sendiri-sendiri.</p>
                        </div>

                        <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">2. Kewajiban & Pelaporan Pajak</label>
                            <select className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" value={data.tanggunganPajak} onChange={e => handleDataChange('tanggunganPajak', e.target.value)}>
                                <option value="masing-masing">Masing-Masing (NPWP Terpisah)</option>
                                <option value="bersama">Bersama (1 NPWP Kepala Keluarga)</option>
                            </select>
                        </div>

                        <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">3. Pengawasan Hak Asuh Anak</label>
                            <select className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" value={data.hakAsuhAnak} onChange={e => handleDataChange('hakAsuhAnak', e.target.value)}>
                                <option value="kesepakatan">Diselesaikan secara Kekeluargaan (Musyawarah)</option>
                                <option value="hukum">Diserahkan mutlak pada Keputusan Pengadilan</option>
                            </select>
                        </div>

                        <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">4. Penyelesaian Sengketa Hubungan</label>
                            <select className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" value={data.penyelesaianSengketa} onChange={e => handleDataChange('penyelesaianSengketa', e.target.value)}>
                                <option value="pengadilan">Pengadilan Agama/Negeri</option>
                                <option value="musyawarah">Musyawarah Kekeluargaan Terlebih Dahulu</option>
                            </select>
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
              <PrintWrapper documentName={`Perjanjian_Pranikah_${data.p1Name.replace(/\\s+/g, '_')}`} price={85000} />
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
