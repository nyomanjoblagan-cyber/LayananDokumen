import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\phk\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: SuratPHKTemplate.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Keputusan Pemutusan Hubungan Kerja (PHK)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Building2, User, CreditCard, AlertTriangle, FileText
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PHKData {
  // Pihak Pertama (Perusahaan)
  namaPihakPertama: string;
  nikPihakPertama: string;
  pekerjaanPihakPertama: string;
  alamatPihakPertama: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;

  // Pihak Kedua (Karyawan)
  namaPihakKedua: string;
  nikPihakKedua: string;
  pekerjaanPihakKedua: string;
  alamatPihakKedua: string;

  // Detail Surat
  hariTanggalPerjanjian: string;
  tempatPerjanjian: string;
  tanggalMulaiKerja: string;
  tanggalEfektifPHK: string;

  // Alasan
  alasanPHK: string;
  detailAlasan: string;

  // Kompensasi
  uangPesangon: number;
  uangPenghargaanMasaKerja: number;
  uangPenggantianHak: number;
  uangPisah: number;

  // Pembayaran
  metodePembayaran: string;
  tanggalPembayaran: string;
  rekeningBank: string;
  nomorRekening: string;
  atasNamaRekening: string;
  tanggunganPajak: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PHKData = {
  namaPihakPertama: "Budi Santoso",
  nikPihakPertama: "3171234567890001",
  pekerjaanPihakPertama: "Direktur HRD",
  alamatPihakPertama: "Jl. Sudirman No. 123, Jakarta Selatan",
  namaPerusahaan: "PT Contoh Perusahaan Maju",
  alamatPerusahaan: "Gedung Menara Merdeka, Jl. Jend. Sudirman Kav 1, Jakarta",

  namaPihakKedua: "Ahmad Fauzi",
  nikPihakKedua: "3179876543210002",
  pekerjaanPihakKedua: "Senior Staff Marketing",
  alamatPihakKedua: "Jl. Merdeka No. 45, RT 01/RW 02, Jakarta Barat",

  hariTanggalPerjanjian: "Senin, 11 Agustus 2026",
  tempatPerjanjian: "Jakarta",
  tanggalMulaiKerja: "2020-02-01",
  tanggalEfektifPHK: "2026-08-31",

  alasanPHK: "Efisiensi",
  detailAlasan: "Perusahaan melakukan restrukturisasi organisasi dan efisiensi operasional secara menyeluruh guna menjaga keberlangsungan usaha.",

  uangPesangon: 10000000,
  uangPenghargaanMasaKerja: 5000000,
  uangPenggantianHak: 1500000,
  uangPisah: 500000,

  metodePembayaran: "Transfer",
  tanggalPembayaran: "2026-08-31",
  rekeningBank: "Bank Central Asia (BCA)",
  nomorRekening: "1234567890",
  atasNamaRekening: "Ahmad Fauzi",
  tanggunganPajak: "Dipotong langsung sesuai PPh Pasal 21"
};

// --- HELPERS ---
function formatCurrency(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

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

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratPHKTemplate() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Keputusan...</div>}>
      <PHKBuilder />
    </Suspense>
  );
}

function PHKBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PHKData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'karyawan' | 'alasan' | 'kompensasi'>('perusahaan');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof PHKData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat keputusan ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const totalKompensasi = (data.uangPesangon || 0) + (data.uangPenghargaanMasaKerja || 0) + (data.uangPenggantianHak || 0) + (data.uangPisah || 0);

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER SURAT KEPUTUSAN */}
      <div className="text-center mb-6 break-inside-avoid border-b-2 border-black pb-4">
        <h1 className="font-bold text-xl uppercase tracking-wider">{data.namaPerusahaan}</h1>
        <p className="text-sm">{data.alamatPerusahaan}</p>
      </div>

      <div className="text-center mb-8 break-inside-avoid">
        <h2 className="font-bold text-lg underline uppercase">SURAT KEPUTUSAN</h2>
        <p className="font-bold uppercase tracking-wider mt-1">TENTANG PEMUTUSAN HUBUNGAN KERJA (PHK)</p>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>Pada hari ini, <strong>{data.hariTanggalPerjanjian}</strong>, bertempat di <strong>{data.tempatPerjanjian}</strong>, yang bertanda tangan di bawah ini:</p>
      </div>

      {/* PIHAK PERTAMA */}
      <div className="mb-4 break-inside-avoid">
        <div className="ml-6">
            <div className="flex mb-1"><div className="w-48 align-top">Nama</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.namaPihakPertama}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Jabatan</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.pekerjaanPihakPertama}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Mewakili</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold align-top">{data.namaPerusahaan}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify align-top">{data.alamatPihakPertama}</div></div>
        </div>
        <p className="mt-2 text-justify">Selanjutnya dalam Surat Keputusan ini disebut sebagai <strong>PIHAK PERTAMA (Perusahaan)</strong>.</p>
      </div>

      {/* PIHAK KEDUA */}
      <div className="mb-6 break-inside-avoid">
        <div className="ml-6">
            <div className="flex mb-1"><div className="w-48 align-top">Nama</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.namaPihakKedua}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">NIK / KTP</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono align-top">{data.nikPihakKedua}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Jabatan / Posisi</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold align-top">{data.pekerjaanPihakKedua}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify align-top">{data.alamatPihakKedua}</div></div>
        </div>
        <p className="mt-2 text-justify">Selanjutnya dalam Surat Keputusan ini disebut sebagai <strong>PIHAK KEDUA (Karyawan)</strong>.</p>
      </div>

      {/* KLAUSUL PASAL-PASAL KEPUTUSAN */}
      <div className="mb-6 break-inside-avoid text-justify space-y-4">
        <div>
            <h3 className="font-bold underline uppercase mb-2">MEMUTUSKAN:</h3>
            <p>
                Menetapkan Pemutusan Hubungan Kerja (PHK) antara PIHAK PERTAMA dan PIHAK KEDUA dengan alasan: <strong>{data.alasanPHK}</strong>, yang secara detail dijelaskan bahwa {data.detailAlasan}.
                Hubungan kerja tersebut dinyatakan berakhir secara efektif terhitung sejak tanggal <strong>{formatDateDisplay(data.tanggalEfektifPHK)}</strong>.
            </p>
        </div>
        
        <div>
            <h3 className="font-bold underline mb-2">KOMPENSASI DAN PESANGON:</h3>
            <p className="mb-2">
                Atas keputusan PHK ini, PIHAK PERTAMA berkewajiban membayarkan kompensasi kepada PIHAK KEDUA sesuai dengan ketentuan perundang-undangan ketenagakerjaan yang berlaku, dengan rincian sebagai berikut:
            </p>
            <div className="ml-6 space-y-1 mb-2">
                <div className="flex"><div className="w-64">1. Uang Pesangon</div><div>: {formatCurrency(data.uangPesangon)}</div></div>
                <div className="flex"><div className="w-64">2. Uang Penghargaan Masa Kerja</div><div>: {formatCurrency(data.uangPenghargaanMasaKerja)}</div></div>
                <div className="flex"><div className="w-64">3. Uang Penggantian Hak</div><div>: {formatCurrency(data.uangPenggantianHak)}</div></div>
                <div className="flex"><div className="w-64">4. Uang Pisah</div><div>: {formatCurrency(data.uangPisah)}</div></div>
                <div className="flex font-bold border-t border-black mt-2 pt-1"><div className="w-64">TOTAL KOMPENSASI</div><div>: {formatCurrency(totalKompensasi)}</div></div>
            </div>
            <p>Total kompensasi tersebut bersifat kotor (gross) dan <strong>{data.tanggunganPajak}</strong>.</p>
        </div>

        <div>
            <h3 className="font-bold underline mb-2">METODE PEMBAYARAN:</h3>
            <p>
                Kompensasi sebagaimana dimaksud akan dibayarkan secara <strong>{data.metodePembayaran}</strong> pada tanggal <strong>{formatDateDisplay(data.tanggalPembayaran)}</strong>. 
                {data.metodePembayaran.toLowerCase().includes('transfer') && (
                  <span> Pembayaran akan ditransfer ke rekening PIHAK KEDUA sebagai berikut: Bank <strong>{data.rekeningBank}</strong>, No. Rek: <strong>{data.nomorRekening}</strong> atas nama <strong>{data.atasNamaRekening}</strong>.</span>
                )}
            </p>
        </div>

        <div>
            <h3 className="font-bold underline mb-2">KLAUSUL PENUTUP:</h3>
            <p>
                Surat Keputusan ini dibuat dan diserahkan kepada PIHAK KEDUA sebagai pemberitahuan resmi. Dengan diselesaikannya segala kewajiban pembayaran kompensasi, maka kedua belah pihak sepakat membebaskan satu sama lain dari segala tuntutan hukum ketenagakerjaan di kemudian hari.
            </p>
        </div>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between text-center break-inside-avoid px-4 mt-10">
        <div className="w-56">
            <p className="mb-1">{data.tempatPerjanjian}, {formatDateDisplay(data.tanggalEfektifPHK)}</p>
            <p className="mb-2 font-bold uppercase">Mewakili Perusahaan,<br/>PIHAK PERTAMA</p>
            <div className="h-24 flex items-center justify-center">
                {/* Space for Signature */}
            </div>
            <p className="font-bold underline uppercase">{data.namaPihakPertama}</p>
            <p className="text-xs uppercase">{data.pekerjaanPihakPertama}</p>
        </div>
        
        <div className="w-56">
            <p className="mb-1 text-transparent">.</p>
            <p className="mb-2 font-bold uppercase">Menerima & Menyetujui,<br/>PIHAK KEDUA</p>
            <div className="h-24 flex items-center justify-center">
                <div className="w-24 h-12 border border-dashed border-gray-400 text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
            </div>
            <p className="font-bold underline uppercase">{data.namaPihakKedua}</p>
            <p className="text-xs uppercase">Karyawan</p>
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
              <ArrowLeftCircle size={20} className="text-red-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SK PHK</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak SK</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-red-600" /> Form SK PHK</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'perusahaan' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Perusahaan</button>
                <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'karyawan' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Karyawan</button>
                <button onClick={() => setActiveTab('alasan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'alasan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Alasan</button>
                <button onClick={() => setActiveTab('kompensasi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kompensasi' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Kompensasi</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'perusahaan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Perusahaan (Pihak 1)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Kop Surat)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan (Kop Surat)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 mt-4 pt-4"></div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat Penandatangan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPihakPertama} onChange={e => handleChange('namaPihakPertama', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan (Contoh: Direktur HRD)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pekerjaanPihakPertama} onChange={e => handleChange('pekerjaanPihakPertama', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'karyawan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-blue-600"/> Data Karyawan (Pihak 2)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Karyawan</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.namaPihakKedua} onChange={e => handleChange('namaPihakKedua', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.nikPihakKedua} onChange={e => handleChange('nikPihakKedua', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Posisi / Jabatan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.pekerjaanPihakKedua} onChange={e => handleChange('pekerjaanPihakKedua', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mulai Bekerja Tanggal</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tanggalMulaiKerja} onChange={e => handleChange('tanggalMulaiKerja', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Karyawan Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.alamatPihakKedua} onChange={e => handleChange('alamatPihakKedua', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'alasan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <AlertTriangle size={14} className="text-amber-600"/> Alasan PHK & Tanggal
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Efektif Berhenti</label>
                                <input type="date" className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggalEfektifPHK} onChange={e => handleChange('tanggalEfektifPHK', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kategori Alasan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.alasanPHK} onChange={e => handleChange('alasanPHK', e.target.value)} placeholder="Contoh: Efisiensi, Kinerja" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penjelasan Detail Alasan PHK</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-28 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-justify" value={data.detailAlasan} onChange={e => handleChange('detailAlasan', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat TTD (Kota)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tempatPerjanjian} onChange={e => handleChange('tempatPerjanjian', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'kompensasi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CreditCard size={14} className="text-rose-600"/> Rincian Kompensasi & Pesangon
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">1. Uang Pesangon (Rp)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.uangPesangon} onChange={e => handleChange('uangPesangon', parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">2. Uang Penghargaan Masa Kerja (Rp)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.uangPenghargaanMasaKerja} onChange={e => handleChange('uangPenghargaanMasaKerja', parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">3. Uang Penggantian Hak (Rp)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.uangPenggantianHak} onChange={e => handleChange('uangPenggantianHak', parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">4. Uang Pisah (Rp)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.uangPisah} onChange={e => handleChange('uangPisah', parseFloat(e.target.value) || 0)} />
                        </div>
                        
                        <div className="bg-slate-900 text-white p-3 rounded-xl flex justify-between font-bold text-sm mt-2">
                            <span>TOTAL KESELURUHAN:</span>
                            <span>{formatCurrency(totalKompensasi)}</span>
                        </div>
                        
                        <div className="border-t border-slate-100 my-4"></div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Bayar</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.metodePembayaran} onChange={e => handleChange('metodePembayaran', e.target.value)}>
                                    <option value="Transfer">Transfer Bank</option>
                                    <option value="Tunai Keras">Tunai Keras</option>
                                    <option value="Bilyet Giro / Cek">Bilyet Giro / Cek</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggungan Pajak</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.tanggunganPajak} onChange={e => handleChange('tanggunganPajak', e.target.value)}>
                                    <option value="Dipotong langsung sesuai PPh Pasal 21">Gross (Dipotong PPh 21)</option>
                                    <option value="Ditanggung oleh Perusahaan sepenuhnya">Nett (Ditanggung Perusahaan)</option>
                                </select>
                            </div>
                        </div>

                        {data.metodePembayaran.includes('Transfer') && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3 border border-slate-200 rounded-xl mt-2">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Bank</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none" value={data.rekeningBank} onChange={e => handleChange('rekeningBank', e.target.value)} />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No Rekening</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none" value={data.nomorRekening} onChange={e => handleChange('nomorRekening', e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Atas Nama</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none" value={data.atasNamaRekening} onChange={e => handleChange('atasNamaRekening', e.target.value)} />
                                </div>
                            </div>
                        )}
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
              <PrintWrapper documentName={`SK_PHK_${data.namaPihakKedua.replace(/\\s+/g, '_')}`} price={75000} />
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
