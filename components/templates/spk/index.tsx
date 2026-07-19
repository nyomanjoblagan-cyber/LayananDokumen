'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: SPKPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Perintah Kerja (SPK) Commercial Ironclad - Enterprise Grade
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw,
  HardHat, Building2, UserCircle2, Wallet, Receipt
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. UTILITAS TERBILANG ---
function terbilang(angka: number): string {
  const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  let res = "";
  if (angka < 12) res = huruf[angka];
  else if (angka < 20) res = terbilang(angka - 10) + " Belas";
  else if (angka < 100) res = terbilang(Math.floor(angka / 10)) + " Puluh " + terbilang(angka % 10);
  else if (angka < 200) res = "Seratus " + terbilang(angka - 100);
  else if (angka < 1000) res = terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
  else if (angka < 2000) res = "Seribu " + terbilang(angka - 1000);
  else if (angka < 1000000) res = terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
  else if (angka < 1000000000) res = terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
  else if (angka < 1000000000000) res = terbilang(Math.floor(angka / 1000000000)) + " Milyar " + terbilang(angka % 1000000000);
  else if (angka < 1000000000000000) res = terbilang(Math.floor(angka / 1000000000000)) + " Triliun " + terbilang(angka % 1000000000000);
  return res.trim().replace(/\s+/g, ' ');
}

const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
  }).format(num);
};

function formatDateDisplay(dateStr: string) {
    if(!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        }
    } catch {}
    return dateStr;
}

// --- 2. TYPE DEFINITIONS ---
interface SpkData {
  docNo: string;
  docDate: string;
  city: string;
  
  pihak1Name: string;
  pihak1Nik: string;
  pihak1Birth: string;
  pihak1Job: string;
  pihak1Address: string;
  pihak1Role: string; 

  pihak2Name: string;
  pihak2Nik: string;
  pihak2Birth: string;
  pihak2Job: string;
  pihak2Address: string;
  pihak2Role: string;

  projectName: string;
  projectLocation: string;
  startDate: string;
  endDate: string;

  totalAmount: number;
  dpPercent: number;     
  retensiPercent: number;
  bankAccount: string;
  
  masaPemeliharaan: string; 
  dendaPerHari: string; 
}

// --- 3. DATA DEFAULT ---
const INITIAL_DATA: SpkData = {
  docNo: 'SPK/001/ENG/2026',
  docDate: '2026-08-15',
  city: 'Jakarta Selatan',
  
  pihak1Name: 'Hendra Kusuma, ST.',
  pihak1Nik: '3174092801850001',
  pihak1Birth: 'Jakarta, 28 Januari 1985',
  pihak1Job: 'Direktur Utama',
  pihak1Address: 'Jl. Jend. Sudirman Kav 50, Plaza Abadi Lantai 12, Kel. Karet Semanggi, Kec. Setiabudi, Jakarta Selatan',
  pihak1Role: 'PT. DINAMIKA CIPTA MANDIRI',
  
  pihak2Name: 'Budi Santoso, MT.',
  pihak2Nik: '3201011506820002',
  pihak2Birth: 'Bandung, 15 Juni 1982',
  pihak2Job: 'Direktur Operasional',
  pihak2Address: 'Komp. Ruko Sentral Niaga Blok B/15, Jl. Ahmad Yani, Bekasi Barat',
  pihak2Role: 'PT. KONTRAKTOR BERSAMA SENTOSA',

  projectName: 'Pekerjaan Renovasi Interior dan Instalasi ME Gedung Perkantoran Lantai 5',
  projectLocation: 'Gedung Office 8, SCBD, Jakarta Selatan',
  startDate: '2026-09-01',
  endDate: '2026-12-31',

  totalAmount: 1250000000,
  dpPercent: 20,
  retensiPercent: 5,
  bankAccount: 'Bank Mandiri 123-456-789-0 a.n PT. Kontraktor Bersama Sentosa',
  
  masaPemeliharaan: '3 (Tiga) Bulan',
  dendaPerHari: '1/1000 (Satu per seribu) dari Nilai Kontrak'
};

// --- 4. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[330mm] print:min-h-0 h-auto font-serif text-[10pt]">
    {children}
  </div>
);

// --- 5. KOMPONEN UTAMA ---
export default function SPKPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor SPK...</div>}>
      <SPKBuilder />
    </Suspense>
  );
}

function SPKBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'proyek' | 'pembayaran'>('pihak1');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<SpkData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof SpkData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-6 break-inside-avoid">
        <h2 className="font-bold text-xl underline uppercase tracking-widest">SURAT PERINTAH KERJA (SPK)</h2>
        <p className="font-bold mt-1">Nomor: {data.docNo}</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Pada hari ini, tanggal <strong>{formatDateDisplay(data.docDate)}</strong>, bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:</p>
      </div>

      {/* PIHAK PERTAMA */}
      <div className="mb-4 break-inside-avoid pl-4">
        <div className="flex mb-1"><div className="w-32 font-bold">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.pihak1Name}</div></div>
        <div className="flex mb-1"><div className="w-32">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pihak1Nik}</div></div>
        <div className="flex mb-1"><div className="w-32">TTL</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Birth}</div></div>
        <div className="flex mb-1"><div className="w-32">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Job}</div></div>
        <div className="flex mb-1"><div className="w-32">Instansi</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.pihak1Role}</div></div>
        <div className="flex mb-1"><div className="w-32">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Address}</div></div>
        <p className="mt-2">Dalam hal ini bertindak untuk dan atas nama Instansi/Perusahaan tersebut, selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong> (Pemberi Kerja).</p>
      </div>

      {/* PIHAK KEDUA */}
      <div className="mb-6 break-inside-avoid pl-4">
        <div className="flex mb-1"><div className="w-32 font-bold">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.pihak2Name}</div></div>
        <div className="flex mb-1"><div className="w-32">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pihak2Nik}</div></div>
        <div className="flex mb-1"><div className="w-32">TTL</div><div className="w-4">:</div><div className="flex-1">{data.pihak2Birth}</div></div>
        <div className="flex mb-1"><div className="w-32">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.pihak2Job}</div></div>
        <div className="flex mb-1"><div className="w-32">Perusahaan</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.pihak2Role}</div></div>
        <div className="flex mb-1"><div className="w-32">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.pihak2Address}</div></div>
        <p className="mt-2">Dalam hal ini bertindak untuk dan atas nama Instansi/Perusahaan tersebut, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong> (Pelaksana Pekerjaan).</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Kedua belah pihak sepakat untuk mengikatkan diri dalam Perjanjian/Surat Perintah Kerja ini dengan ketentuan dan syarat-syarat sebagai berikut:</p>
      </div>

      {/* PASAL-PASAL */}
      <div className="mb-6 text-justify break-inside-avoid">
        <h3 className="font-bold underline text-center mb-2">PASAL 1 : LINGKUP PEKERJAAN</h3>
        <p>PIHAK PERTAMA memberikan tugas dan PIHAK KEDUA menerima tugas tersebut untuk melaksanakan pekerjaan dengan rincian sebagai berikut:</p>
        <div className="pl-4 mt-2">
            <div className="flex mb-1"><div className="w-40">Nama Pekerjaan</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.projectName}</div></div>
            <div className="flex mb-1"><div className="w-40">Lokasi Proyek</div><div className="w-4">:</div><div className="flex-1">{data.projectLocation}</div></div>
        </div>
      </div>

      <div className="mb-6 text-justify break-inside-avoid">
        <h3 className="font-bold underline text-center mb-2">PASAL 2 : JANGKA WAKTU PELAKSANAAN</h3>
        <p>1. Pekerjaan tersebut pada Pasal 1 harus diselesaikan dalam waktu yang telah ditetapkan.</p>
        <p>2. Waktu pelaksanaan dimulai pada tanggal <strong>{formatDateDisplay(data.startDate)}</strong> dan harus selesai seluruhnya pada tanggal <strong>{formatDateDisplay(data.endDate)}</strong>.</p>
      </div>

      <div className="mb-6 text-justify break-inside-avoid">
        <h3 className="font-bold underline text-center mb-2">PASAL 3 : NILAI KONTRAK & PEMBAYARAN</h3>
        <p>1. Total Nilai Pekerjaan (Nilai Kontrak) disepakati sebesar <strong>{formatRupiah(data.totalAmount)}</strong> (<em>{terbilang(data.totalAmount)} Rupiah</em>), sudah termasuk pajak dan biaya-biaya lain yang timbul dalam pelaksanaan pekerjaan.</p>
        <p>2. Sistem pembayaran dilakukan secara bertahap:</p>
        <div className="pl-4 mt-2">
            <p>- Uang Muka (DP) sebesar <strong>{data.dpPercent}%</strong> dibayarkan setelah SPK ditandatangani.</p>
            <p>- Pembayaran Termin berikutnya diatur dalam lampiran/BAP tersendiri.</p>
            <p>- Retensi sebesar <strong>{data.retensiPercent}%</strong> dibayarkan setelah berakhirnya Masa Pemeliharaan.</p>
        </div>
        <p className="mt-2">3. Pembayaran ditransfer ke rekening PIHAK KEDUA: <strong>{data.bankAccount}</strong>.</p>
      </div>

      <div className="mb-8 text-justify break-inside-avoid">
        <h3 className="font-bold underline text-center mb-2">PASAL 4 : DENDA & MASA PEMELIHARAAN</h3>
        <p>1. Masa Pemeliharaan disepakati selama <strong>{data.masaPemeliharaan}</strong> terhitung sejak Berita Acara Serah Terima (BAST) I ditandatangani.</p>
        <p>2. Keterlambatan penyelesaian pekerjaan akan dikenakan denda sebesar <strong>{data.dendaPerHari}</strong> per hari keterlambatan.</p>
        <p>3. Apabila terjadi sengketa, akan diselesaikan secara musyawarah dan kekeluargaan.</p>
      </div>

      <div className="text-justify mb-8 break-inside-avoid">
        <p>Demikian Surat Perintah Kerja (SPK) ini dibuat dalam rangkap 2 (dua), bermaterai cukup dan masing-masing mempunyai kekuatan hukum yang sama.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-8">
        <div className="text-center w-64">
            <p className="mb-2 font-bold uppercase">PIHAK KEDUA<br/>(Pelaksana Kerja)</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Materai Rp10.000)</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak2Name}</p>
            <p className="text-sm">{data.pihak2Role}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-2 font-bold uppercase">PIHAK PERTAMA<br/>(Pemberi Kerja)</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Materai Rp10.000)</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak1Name}</p>
            <p className="text-sm">{data.pihak1Role}</p>
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
              <ArrowLeftCircle size={20} className="text-amber-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SPK B2B / Proyek</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><HardHat size={18} className="text-amber-600" /> Editor SPK</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak1' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pemberi</button>
                <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak2' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Pelaksana</button>
                <button onClick={() => setActiveTab('proyek')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'proyek' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Proyek</button>
                <button onClick={() => setActiveTab('pembayaran')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pembayaran' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>Bayar & Denda</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pihak1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Pihak Pertama (Pemberi Kerja)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Instansi / Perusahaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Role} onChange={e => handleChange('pihak1Role', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama PIC / Direktur</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Name} onChange={e => handleChange('pihak1Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan PIC</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Job} onChange={e => handleChange('pihak1Job', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP PIC</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Nik} onChange={e => handleChange('pihak1Nik', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tgl Lahir (Opsional)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Birth} onChange={e => handleChange('pihak1Birth', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan / PIC</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Address} onChange={e => handleChange('pihak1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pihak2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-emerald-600"/> Pihak Kedua (Pelaksana)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Vendor / Kontraktor</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Role} onChange={e => handleChange('pihak2Role', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama PIC / Direktur Vendor</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Name} onChange={e => handleChange('pihak2Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan PIC</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Job} onChange={e => handleChange('pihak2Job', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP PIC</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Nik} onChange={e => handleChange('pihak2Nik', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tgl Lahir (Opsional)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Birth} onChange={e => handleChange('pihak2Birth', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Vendor</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pihak2Address} onChange={e => handleChange('pihak2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'proyek' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <HardHat size={14} className="text-amber-600"/> Lingkup Proyek & Waktu
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Proyek / Pekerjaan</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.projectName} onChange={e => handleChange('projectName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Proyek</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.projectLocation} onChange={e => handleChange('projectLocation', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Mulai (Start)</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.startDate} onChange={e => handleChange('startDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Selesai (End)</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.endDate} onChange={e => handleChange('endDate', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Dokumen SPK</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.docNo} onChange={e => handleChange('docNo', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Dokumen</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.docDate} onChange={e => handleChange('docDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penandatanganan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pembayaran' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Wallet size={14} className="text-blue-600"/> Keuangan & Klausul Denda
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nilai Kontrak (Rp)</label>
                            <input type="number" className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.totalAmount} onChange={e => handleChange('totalAmount', Number(e.target.value))} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">DP Uang Muka (%)</label>
                                <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.dpPercent} onChange={e => handleChange('dpPercent', Number(e.target.value))} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Retensi (%)</label>
                                <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.retensiPercent} onChange={e => handleChange('retensiPercent', Number(e.target.value))} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Rekening Pembayaran</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.bankAccount} onChange={e => handleChange('bankAccount', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Pemeliharaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.masaPemeliharaan} onChange={e => handleChange('masaPemeliharaan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Denda Keterlambatan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.dendaPerHari} onChange={e => handleChange('dendaPerHari', e.target.value)} />
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
              <PrintWrapper documentName={`SPK_${data.docNo.split('/').join('_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
