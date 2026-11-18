import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\pesangon\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: PesangonPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Kesepakatan Bersama PHK & Pesangon (Bipartit)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Building, User, CreditCard, CalendarDays, ShieldAlert,
  Scale
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. TYPE DEFINITIONS ---
interface PesangonData {
  city: string;
  date: string;
  
  // Pihak 1 (Perusahaan/Perwakilan)
  p1Name: string;
  p1Nik: string;
  p1Pob: string;
  p1Dob: string;
  p1Occupation: string;
  p1Address: string;
  companyName: string;
  companyTitle: string;
  
  // Pihak 2 (Karyawan)
  p2Name: string;
  p2Nik: string;
  p2Pob: string;
  p2Dob: string;
  p2Occupation: string;
  p2Address: string;
  empStartDate: string;
  empTitle: string;

  // Detail PHK & Pesangon
  phkDate: string;
  severanceAmount: number;
  paymentMethod: 'Tunai' | 'Transfer';
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  taxPayer: 'Ditanggung Perusahaan' | 'Ditanggung Pihak Kedua';
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PesangonData = {
  city: 'Jakarta',
  date: '2026-08-01',
  
  p1Name: 'Budi Santoso',
  p1Nik: '3171234567890001',
  p1Pob: 'Jakarta',
  p1Dob: '1980-05-15',
  p1Occupation: 'Direktur HR',
  p1Address: 'Jl. Sudirman Kav 21, RT 001/RW 002, Senayan, Kebayoran Baru, Jakarta Selatan',
  companyName: 'PT Maju Bersama Sejahtera',
  companyTitle: 'Direktur HRD',
  
  p2Name: 'Andi Setiawan',
  p2Nik: '3171234567890002',
  p2Pob: 'Bandung',
  p2Dob: '1990-08-20',
  p2Occupation: 'Karyawan Swasta',
  p2Address: 'Jl. Kebon Jeruk No. 10, RT 005/RW 003, Kebon Jeruk, Jakarta Barat',
  empStartDate: '2020-01-10',
  empTitle: 'Senior Marketing Staff',

  phkDate: '2026-07-13',
  severanceAmount: 55000000,
  paymentMethod: 'Transfer',
  bankName: 'BCA',
  bankAccount: '1234567890',
  bankAccountName: 'Andi Setiawan',
  taxPayer: 'Ditanggung Perusahaan',
};

// --- HELPERS ---
function terbilang(angka: number): string {
    const bilangan = [
        "", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"
    ];

    if (angka < 12) {
        return bilangan[angka];
    } else if (angka < 20) {
        return terbilang(angka - 10) + " Belas";
    } else if (angka < 100) {
        return terbilang(Math.floor(angka / 10)) + " Puluh " + terbilang(angka % 10);
    } else if (angka < 200) {
        return "Seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
        return terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
    } else if (angka < 2000) {
        return "Seribu " + terbilang(angka - 1000);
    } else if (angka < 1000000) {
        return terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
    } else if (angka < 1000000000) {
        return terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
    } else if (angka < 1000000000000) {
        return terbilang(Math.floor(angka / 1000000000)) + " Miliar " + terbilang(angka % 1000000000);
    }
    return "";
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PesangonPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Bipartit...</div>}>
      <PesangonBuilder />
    </Suspense>
  );
}

function PesangonBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PesangonData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'phk'>('pihak1');

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split("T")[0] }));
  }, []);

  const handleChange = (field: keyof PesangonData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat kesepakatan ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split("T")[0] });
    }
  };

  const formatDateSafe = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER */}
      <div className="text-center mb-6 break-inside-avoid">
        <h1 className="font-bold text-lg tracking-wider uppercase underline">PERJANJIAN BERSAMA (BIPARTIT)</h1>
        <p className="font-bold tracking-widest text-sm mt-1">PENYELESAIAN PEMUTUSAN HUBUNGAN KERJA (PHK)</p>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>Pada hari ini, tanggal <strong>{formatDateSafe(data.date)}</strong> bertempat di <strong>{data.city}</strong>, telah disepakati Perjanjian Bersama Penyelesaian Pemutusan Hubungan Kerja (selanjutnya disebut "Perjanjian") oleh dan antara:</p>
      </div>

      {/* PIHAK PERTAMA */}
      <div className="mb-4 break-inside-avoid">
        <h3 className="font-bold mb-1">I. PIHAK PERTAMA (PERUSAHAAN)</h3>
        <div className="ml-6">
            <div className="flex mb-1"><div className="w-48 align-top">Nama Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.p1Name}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">NIK / KTP</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono align-top">{data.p1Nik}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Tempat, Tanggal Lahir</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.p1Pob}, {formatDateSafe(data.p1Dob)}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Jabatan</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.p1Occupation}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Bertindak Untuk & Atas Nama</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold align-top">{data.companyName} ({data.companyTitle})</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Alamat Perusahaan</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify align-top">{data.p1Address}</div></div>
        </div>
      </div>

      {/* PIHAK KEDUA */}
      <div className="mb-6 break-inside-avoid">
        <h3 className="font-bold mb-1">II. PIHAK KEDUA (KARYAWAN)</h3>
        <div className="ml-6">
            <div className="flex mb-1"><div className="w-48 align-top">Nama Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.p2Name}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">NIK / KTP</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono align-top">{data.p2Nik}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Tempat, Tanggal Lahir</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.p2Pob}, {formatDateSafe(data.p2Dob)}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Posisi Terakhir</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold align-top">{data.empTitle}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Mulai Bekerja Tanggal</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{formatDateSafe(data.empStartDate)}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Alamat Sesuai KTP</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify align-top">{data.p2Address}</div></div>
        </div>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>
            Pihak Pertama dan Pihak Kedua secara bersama-sama disebut "Para Pihak". Para Pihak dengan itikad baik telah mencapai kesepakatan mufakat terkait Pemutusan Hubungan Kerja dengan ketentuan dan syarat-syarat sebagai berikut:
        </p>
      </div>

      {/* KLAUSUL PASAL-PASAL */}
      <div className="mb-6 break-inside-avoid text-justify space-y-4">
        <div>
            <h3 className="font-bold text-center mb-1">Pasal 1<br/>PEMUTUSAN HUBUNGAN KERJA</h3>
            <p>
                Para Pihak sepakat bahwa Hubungan Kerja antara PIHAK PERTAMA dan PIHAK KEDUA berakhir terhitung efektif sejak tanggal <strong>{formatDateSafe(data.phkDate)}</strong>. Dengan demikian, segala hak dan kewajiban ketenagakerjaan antara Para Pihak dinyatakan berakhir, kecuali hal-hal yang diatur dalam Perjanjian Bersama ini.
            </p>
        </div>
        
        <div>
            <h3 className="font-bold text-center mb-1">Pasal 2<br/>KOMPENSASI PESANGON DAN HAK LAINNYA</h3>
            <p className="mb-2">
                Sebagai akibat dari berhentinya Hubungan Kerja sebagaimana dimaksud dalam Pasal 1, PIHAK PERTAMA sepakat untuk membayarkan total uang kompensasi/pesangon/penghargaan masa kerja kepada PIHAK KEDUA sebesar:
            </p>
            <div className="bg-slate-100 p-2 border border-slate-300 text-center font-bold text-lg mb-2 mx-8">
                {formatCurrency(data.severanceAmount)}<br/>
                <span className="text-sm italic font-normal">(Terbilang: {terbilang(data.severanceAmount)} Rupiah)</span>
            </div>
            <p>
                Nominal kompensasi tersebut bersifat final (lunas) dan merupakan total keseluruhan hak PIHAK KEDUA yang wajib dibayarkan oleh PIHAK PERTAMA. Adapun kewajiban pajak terkait pembayaran tersebut akan <strong>{data.taxPayer}</strong>.
            </p>
        </div>

        <div>
            <h3 className="font-bold text-center mb-1">Pasal 3<br/>METODE PEMBAYARAN</h3>
            <p>
                Pembayaran kompensasi sebagaimana dimaksud pada Pasal 2 akan dilakukan secara <strong>{data.paymentMethod}</strong>.
                {data.paymentMethod === 'Transfer' && (
                  <span> Menggunakan sarana transfer antar bank yang ditujukan ke rekening PIHAK KEDUA sebagai berikut:<br/>
                  - Bank: <strong>{data.bankName}</strong><br/>
                  - No. Rekening: <strong>{data.bankAccount}</strong><br/>
                  - Atas Nama: <strong>{data.bankAccountName}</strong>
                  </span>
                )}
            </p>
        </div>

        <div>
            <h3 className="font-bold text-center mb-1">Pasal 4<br/>PELEPASAN HAK (ACQUIT ET DECHARGE) DAN PENYELESAIAN</h3>
            <p>
                Dengan ditandatanganinya Perjanjian ini dan diterimanya seluruh kompensasi pembayaran, maka PIHAK KEDUA membebaskan PIHAK PERTAMA beserta seluruh pengurus dan manajemennya dari segala macam tuntutan hukum perdata, pidana, maupun ketenagakerjaan, baik pada instansi Pemerintah (Disnaker/PHI) maupun Pengadilan di kemudian hari.
            </p>
        </div>
      </div>

      <div className="mb-10 text-justify break-inside-avoid">
        <p>Demikian Perjanjian Bersama (Bipartit) ini dibuat dalam keadaan sadar, sehat jasmani dan rohani, bermeterai cukup dan memiliki kekuatan hukum yang mengikat Para Pihak.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between text-center break-inside-avoid px-4">
        <div className="w-56">
            <p className="mb-2 font-bold uppercase">PIHAK PERTAMA<br/>({data.companyName})</p>
            <div className="h-4"></div>
            <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
            <div className="h-4"></div>
            <p className="font-bold underline uppercase">{data.p1Name}</p>
            <p className="text-xs uppercase">{data.p1Occupation}</p>
        </div>
        
        <div className="w-56">
            <p className="mb-2 font-bold uppercase">PIHAK KEDUA<br/>(Karyawan)</p>
            <div className="h-4"></div>
            <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
            <div className="h-4"></div>
            <p className="font-bold underline uppercase">{data.p2Name}</p>
            <p className="text-xs uppercase">NIK: {data.p2Nik}</p>
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
              <ArrowLeftCircle size={20} className="text-indigo-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Kesepakatan Pesangon (Bipartit)</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Scale size={18} className="text-indigo-600" /> Form Bipartit</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak1' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Perusahaan</button>
                <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak2' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Karyawan</button>
                <button onClick={() => setActiveTab('phk')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'phk' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Detail Pesangon</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pihak1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building size={14} className="text-slate-600"/> Pihak Pertama (Perusahaan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat HR/Direktur</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.p1Name} onChange={e => handleChange('p1Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.p1Nik} onChange={e => handleChange('p1Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan/Jabatan (Pribadi)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.p1Occupation} onChange={e => handleChange('p1Occupation', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.p1Pob} onChange={e => handleChange('p1Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.p1Dob} onChange={e => handleChange('p1Dob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.companyName} onChange={e => handleChange('companyName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan di Perusahaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.companyTitle} onChange={e => handleChange('companyTitle', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.p1Address} onChange={e => handleChange('p1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pihak2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-blue-600"/> Pihak Kedua (Karyawan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Karyawan</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Name} onChange={e => handleChange('p2Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Nik} onChange={e => handleChange('p2Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan Umum</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Occupation} onChange={e => handleChange('p2Occupation', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Pob} onChange={e => handleChange('p2Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Dob} onChange={e => handleChange('p2Dob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Posisi/Jabatan Karyawan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.empTitle} onChange={e => handleChange('empTitle', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mulai Bekerja (Tgl Join)</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.empStartDate} onChange={e => handleChange('empStartDate', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Address} onChange={e => handleChange('p2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'phk' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CreditCard size={14} className="text-amber-600"/> Kompensasi & PHK
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Efektif PHK / Berhenti</label>
                            <input type="date" className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.phkDate} onChange={e => handleChange('phkDate', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Total Nominal Pesangon (IDR)</label>
                            <input type="number" className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.severanceAmount} onChange={e => handleChange('severanceAmount', parseFloat(e.target.value) || 0)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembayaran</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.paymentMethod} onChange={e => handleChange('paymentMethod', e.target.value)}>
                                <option value="Transfer">Transfer Bank</option>
                                <option value="Tunai">Tunai Keras (Cash)</option>
                            </select>
                        </div>
                        
                        {data.paymentMethod === 'Transfer' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3 border border-slate-200 rounded-xl">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Bank</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={data.bankName} onChange={e => handleChange('bankName', e.target.value)} />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Atas Nama</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={data.bankAccountName} onChange={e => handleChange('bankAccountName', e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Rekening</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={data.bankAccount} onChange={e => handleChange('bankAccount', e.target.value)} />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggungan Pajak Pesangon (PPh 21)</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.taxPayer} onChange={e => handleChange('taxPayer', e.target.value)}>
                                <option value="Ditanggung Perusahaan">Ditanggung Perusahaan (Nett)</option>
                                <option value="Ditanggung Pihak Kedua">Dipotong dari Pesangon Karyawan (Gross)</option>
                            </select>
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota TTD</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal TTD</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
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
              <PrintWrapper documentName={`Perjanjian_Bipartit_Pesangon_${data.p2Name.replace(/\\s+/g, '_')}`} price={85000} />
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
