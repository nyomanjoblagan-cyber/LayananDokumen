'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: KuasaPajakPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Dokumen Surat Kuasa Khusus Wajib Pajak
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  UserCircle2, ShieldCheck, Briefcase, FileText, 
  Building2, Scale, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ProxyData {
  city: string;
  date: string;
  docNo: string;
  
  // PEMBERI KUASA (PIHAK PERTAMA)
  p1Capacity: 'Pribadi' | 'Wakil Badan';
  p1Name: string;
  p1Nik: string;
  p1Npwp: string;
  p1Pob: string;
  p1Dob: string;
  p1Job: string;
  p1Address: string;
  
  // Jika Wakil Badan
  p1Company: string;
  p1NpwpBadan: string;
  p1Jabatan: string;
  p1CompanyAddress: string;

  // PENERIMA KUASA (PIHAK KEDUA)
  p2Name: string;
  p2Nik: string;
  p2Npwp: string;
  p2Pob: string;
  p2Dob: string;
  p2Address: string;
  p2Job: string;
  p2License: string; 

  // DETAIL URUSAN PAJAK
  taxType: string;
  taxPeriod: string;
  kppName: string;
  
  // RUANG LINGKUP
  scopeLaporMasa: boolean;
  scopeLaporTahunan: boolean;
  scopeAmbilDokumen: boolean;
  scopeSengketa: boolean;
  
  // BATASAN
  laranganRestitusi: boolean;
  
  // KLAUSUL TAMBAHAN
  substitutionRight: 'Ya' | 'Tidak';
  honorarium: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ProxyData = {
  city: 'Jakarta',
  date: '2026-08-01', 
  docNo: 'SKP/2026/001-XYZ',
  
  p1Capacity: 'Wakil Badan',
  p1Name: 'BUDI SANTOSO',
  p1Nik: '3171234567890001',
  p1Npwp: '12.345.678.9-012.000',
  p1Pob: 'Surabaya',
  p1Dob: '1980-05-15',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Sudirman Kav 10, RT 001 RW 002, Kel. Senayan, Kec. Kebayoran Baru, Jakarta Selatan',
  
  p1Company: 'PT MAJU BERSAMA PAJAK',
  p1NpwpBadan: '01.987.654.3-012.000',
  p1Jabatan: 'Direktur Utama',
  p1CompanyAddress: 'Gedung Menara Merdeka Lantai 5, Jl. MH Thamrin No.1, Jakarta Pusat',

  p2Name: 'DR. SITI AMINAH, S.E., M.Ak., BKP',
  p2Nik: '3179876543210002',
  p2Npwp: '98.765.432.1-012.000',
  p2Pob: 'Bandung',
  p2Dob: '1975-10-20',
  p2Address: 'Jl. Melati No. 45, Kebayoran Baru, Jakarta Selatan',
  p2Job: 'Konsultan Pajak',
  p2License: 'KEP-123/PJ/2020',

  taxType: 'Pajak Pertambahan Nilai (PPN) & Pajak Penghasilan (PPh) Badan',
  taxPeriod: 'Tahun Pajak 2026',
  kppName: 'KPP Wajib Pajak Besar Satu',
  
  scopeLaporMasa: true,
  scopeLaporTahunan: true,
  scopeAmbilDokumen: true,
  scopeSengketa: false,
  
  laranganRestitusi: true,
  
  substitutionRight: 'Tidak',
  honorarium: 'Sesuai Kontrak Terpisah'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function KuasaPajakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <KuasaBuilder />
    </Suspense>
  );
}

function KuasaBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<ProxyData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'p1' | 'p2' | 'pajak'>('p1');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ProxyData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir Surat Kuasa ke awal?')) {
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
    
    const isBadan = data.p1Capacity === 'Wakil Badan';

    return (
      <Kertas>
        {/* JUDUL */}
        <div className="text-center mb-8">
            <h1 className="font-bold text-lg uppercase tracking-wider underline">SURAT KUASA KHUSUS WAJIB PAJAK</h1>
            <p className="mt-1">Nomor: {data.docNo}</p>
        </div>

        {/* PEMBUKA */}
        <div className="mb-4 text-justify">
            <p>Yang bertanda tangan di bawah ini:</p>
        </div>

        {/* PEMBERI KUASA */}
        <div className="mb-4 ml-6">
            <div className="flex mb-1"><div className="w-40 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
            <div className="flex mb-1"><div className="w-40">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
            <div className="flex mb-1"><div className="w-40">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1Pob}, {formatDateSafe(data.p1Dob)}</div></div>
            <div className="flex mb-1"><div className="w-40 align-top">Alamat Domisili</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p1Address}</div></div>
            
            {isBadan ? (
                <div className="mt-2 text-justify">
                    Bertindak dalam kedudukannya sebagai <strong>{data.p1Jabatan}</strong>, dari dan karenanya sah mewakili Badan Usaha:
                    <div className="mt-2 ml-4">
                        <div className="flex mb-1"><div className="w-36 font-bold">Nama Badan Usaha</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Company}</div></div>
                        <div className="flex mb-1"><div className="w-36 font-bold">NPWP Badan</div><div className="w-4">:</div><div className="flex-1 font-bold font-mono text-lg">{data.p1NpwpBadan}</div></div>
                        <div className="flex mb-1"><div className="w-36 align-top">Alamat Badan</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p1CompanyAddress}</div></div>
                    </div>
                    <div className="mt-2">Selanjutnya disebut sebagai <strong>PEMBERI KUASA</strong>.</div>
                </div>
            ) : (
                <div className="mt-2 text-justify">
                    Bertindak untuk dan atas nama diri sendiri dengan <strong>NPWP Pribadi: <span className="font-mono text-lg font-bold">{data.p1Npwp}</span></strong>, yang selanjutnya disebut sebagai <strong>PEMBERI KUASA</strong>.
                </div>
            )}
        </div>

        <div className="mb-4 text-justify font-bold">
            Dengan ini memberi kuasa dengan hak substitusi ({data.substitutionRight}) kepada:
        </div>

        {/* PENERIMA KUASA */}
        <div className="mb-6 ml-6">
            <div className="flex mb-1"><div className="w-40 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
            <div className="flex mb-1"><div className="w-40 font-bold">NPWP</div><div className="w-4">:</div><div className="flex-1 font-bold font-mono text-lg">{data.p2Npwp}</div></div>
            <div className="flex mb-1"><div className="w-40">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
            <div className="flex mb-1"><div className="w-40">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2Pob}, {formatDateSafe(data.p2Dob)}</div></div>
            <div className="flex mb-1"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
            <div className="flex mb-1"><div className="w-40">Izin Konsultan (Jika Ada)</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2License || '-'}</div></div>
            <div className="flex mb-1"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p2Address}</div></div>
            <div className="mt-2 text-justify">
                Selanjutnya disebut sebagai <strong>PENERIMA KUASA</strong>.
            </div>
        </div>

        {/* KLAUSUL KHUSUS */}
        <div className="text-center font-bold mb-4 tracking-widest">
            ------------------------------- K H U S U S -------------------------------
        </div>

        <div className="mb-4 text-justify">
            Untuk dan atas nama PEMBERI KUASA, mewakili, mendampingi, dan/atau mengurus hak dan kewajiban perpajakan pada <strong>{data.kppName}</strong>, terkait dengan jenis pajak dan masa/tahun pajak sebagai berikut:
        </div>

        <div className="mb-4 ml-6 font-bold">
            <ul className="list-disc pl-5">
                <li>Jenis Pajak: {data.taxType}</li>
                <li>Tahun/Masa Pajak: {data.taxPeriod}</li>
            </ul>
        </div>

        <div className="mb-4 text-justify">
            Adapun ruang lingkup wewenang yang diberikan kepada PENERIMA KUASA terbatas pada hal-hal berikut:
            <ol className="list-decimal pl-5 mt-2 space-y-1">
                {data.scopeLaporMasa && <li>Menyiapkan, menandatangani, dan menyampaikan Surat Pemberitahuan (SPT) Masa terkait.</li>}
                {data.scopeLaporTahunan && <li>Menyiapkan, menandatangani, dan menyampaikan Surat Pemberitahuan (SPT) Tahunan PPh.</li>}
                {data.scopeAmbilDokumen && <li>Menerima, mengambil, dan/atau menyerahkan dokumen/surat-surat dari dan/atau kepada Direktorat Jenderal Pajak.</li>}
                {data.scopeSengketa && <li>Mendampingi dalam proses pemeriksaan, keberatan, pengurangan/penghapusan sanksi administrasi, atau pengurangan/pembatalan ketetapan pajak.</li>}
                <li>Melakukan koordinasi, klarifikasi, dan memberikan penjelasan secara lisan maupun tertulis kepada pejabat berwenang di lingkungan DJP terkait urusan di atas.</li>
            </ol>
        </div>

        {data.laranganRestitusi && (
            <div className="mb-4 text-justify font-bold border border-black p-3 bg-gray-50">
                PENGECUALIAN / BATASAN: Surat Kuasa Khusus ini secara tegas TIDAK MEMBERIKAN WEWENANG kepada PENERIMA KUASA untuk menerima restitusi pajak/pencairan dana pengembalian kelebihan pembayaran pajak milik PEMBERI KUASA.
            </div>
        )}

        <div className="mb-8 text-justify">
            <p>
                Segala akibat hukum yang timbul dari pelaksanaan Surat Kuasa Khusus ini sepenuhnya menjadi tanggung jawab PEMBERI KUASA. Surat Kuasa ini berlaku sejak tanggal ditandatangani dan tidak dapat ditarik kembali kecuali dengan pemberitahuan tertulis.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-between text-center break-inside-avoid">
            <div className="w-64">
                <p className="mb-2"><strong>PENERIMA KUASA</strong><br/><span className="text-sm">(Kuasa Wajib Pajak)</span></p>
                <div className="h-20"></div>
                <p className="font-bold underline uppercase">{data.p2Name}</p>
                <p className="text-xs">NPWP: {data.p2Npwp}</p>
            </div>
            
            <div className="w-64">
                <p className="mb-2"><strong>{data.city}, {formatDateSafe(data.date)}</strong><br/><strong>PEMBERI KUASA</strong><br/><span className="text-sm">(Wajib Pajak)</span></p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.p1Name}</p>
                {isBadan ? (
                    <p className="text-xs">{data.p1Jabatan} - {data.p1Company}</p>
                ) : (
                    <p className="text-xs">NPWP: {data.p1Npwp}</p>
                )}
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Kuasa Pajak (DJP)</h1>
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
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-rose-600" /> Data Surat Kuasa</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('p1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p1' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Wajib Pajak (WP)</button>
                <button onClick={() => setActiveTab('p2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p2' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Penerima Kuasa</button>
                <button onClick={() => setActiveTab('pajak')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pajak' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Urusan Pajak</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'p1' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Setup Surat
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Referensi Surat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-slate-600"/> Data Wajib Pajak (Pemberi Kuasa)
                    </h3>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Kapasitas Wajib Pajak</label>
                        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                            <button onClick={() => handleDataChange('p1Capacity', 'Wakil Badan')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${data.p1Capacity === 'Wakil Badan' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>Wakil Badan (PT/CV)</button>
                            <button onClick={() => handleDataChange('p1Capacity', 'Pribadi')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${data.p1Capacity === 'Pribadi' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>Pribadi (OP)</button>
                        </div>
                    </div>

                    {data.p1Capacity === 'Wakil Badan' && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-3 mb-4">
                            <h4 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1"><Building2 size={12}/> Data Badan Usaha</h4>
                            <div>
                                <label className="block text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1.5">Nama Badan Usaha</label>
                                <input className="w-full bg-white p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase text-blue-900" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1.5">NPWP Badan (15/16 Digit)</label>
                                <input className="w-full bg-white p-2.5 border border-blue-200 rounded-xl text-sm font-bold font-mono focus:ring-2 focus:ring-blue-500 outline-none text-blue-900" value={data.p1NpwpBadan} onChange={e => handleDataChange('p1NpwpBadan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1.5">Alamat Domisili Badan</label>
                                <textarea className="w-full bg-white p-3 border border-blue-200 rounded-xl text-sm h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1CompanyAddress} onChange={e => handleDataChange('p1CompanyAddress', e.target.value)} />
                            </div>
                        </div>
                    )}

                    <div className="space-y-4 pt-2">
                        <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1"><UserCircle2 size={12}/> Data Diri Penanda Tangan (Pimpinan/WP Pribadi)</h4>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Sesuai KTP</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{data.p1Capacity === 'Pribadi' ? 'NPWP Pribadi' : 'Jabatan (Mis: Direktur)'}</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.p1Capacity === 'Pribadi' ? data.p1Npwp : data.p1Jabatan} onChange={e => handleDataChange(data.p1Capacity === 'Pribadi' ? 'p1Npwp' : 'p1Jabatan', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP Penanda Tangan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
                  </>
              )}

              {activeTab === 'p2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-blue-600"/> Data Penerima Kuasa (Konsultan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap & Gelar (Sesuai Izin)</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPWP Pribadi (Wajib)</label>
                                <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-blue-900" value={data.p2Npwp} onChange={e => handleDataChange('p2Npwp', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Izin Konsultan Pajak / Karyawan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2License} onChange={e => handleDataChange('p2License', e.target.value)} placeholder="Contoh: KEP-123/PJ/2020 atau 'Karyawan Internal'" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili Penerima Kuasa</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pajak' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Scale size={14} className="text-rose-600"/> Ruang Lingkup Urusan Pajak
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Pajak Yang Diurus</label>
                            <input className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-rose-900" value={data.taxType} onChange={e => handleDataChange('taxType', e.target.value)} placeholder="Misal: PPh Pasal 21, PPN, Pemeriksaan All Taxes" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tahun / Masa Pajak</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.taxPeriod} onChange={e => handleDataChange('taxPeriod', e.target.value)} placeholder="Misal: Tahun Pajak 2026" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama KPP Terdaftar</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.kppName} onChange={e => handleDataChange('kppName', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldCheck size={14} className="text-emerald-600"/> Hak & Wewenang Penerima Kuasa
                    </h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100">
                            <input type="checkbox" className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500" checked={data.scopeLaporMasa} onChange={e => handleDataChange('scopeLaporMasa', e.target.checked)} />
                            <div className="flex-1">
                                <p className="font-bold text-sm text-slate-800">Lapor SPT Masa</p>
                                <p className="text-[10px] text-slate-500">Menyiapkan & TTD SPT Masa (PPN/PPh)</p>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100">
                            <input type="checkbox" className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500" checked={data.scopeLaporTahunan} onChange={e => handleDataChange('scopeLaporTahunan', e.target.checked)} />
                            <div className="flex-1">
                                <p className="font-bold text-sm text-slate-800">Lapor SPT Tahunan</p>
                                <p className="text-[10px] text-slate-500">Menyiapkan & TTD SPT Tahunan Badan/OP</p>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100">
                            <input type="checkbox" className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500" checked={data.scopeSengketa} onChange={e => handleDataChange('scopeSengketa', e.target.checked)} />
                            <div className="flex-1">
                                <p className="font-bold text-sm text-slate-800">Urusan Sengketa / Pemeriksaan</p>
                                <p className="text-[10px] text-slate-500">Mendampingi pemeriksaan, keberatan, banding pajak</p>
                            </div>
                        </label>
                        
                        <div className="border-t border-slate-200 pt-4 mt-2">
                             <label className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-200 rounded-xl cursor-pointer hover:bg-rose-100">
                                <input type="checkbox" className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500" checked={data.laranganRestitusi} onChange={e => handleDataChange('laranganRestitusi', e.target.checked)} />
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-rose-800 flex items-center gap-1"><AlertCircle size={14}/> Larangan Restitusi (Disarankan)</p>
                                    <p className="text-[10px] text-rose-600">Konsultan DILARANG menerima/mencairkan dana pengembalian kelebihan pajak (restitusi).</p>
                                </div>
                            </label>
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
              <PrintWrapper documentName={`Kuasa_Pajak_${data.p1Name.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
