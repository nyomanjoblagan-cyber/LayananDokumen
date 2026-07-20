'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: PajakTanahPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Keterangan PBB (Tingkat Desa/Kelurahan)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  UserCircle2, Landmark, Map, FileText, CheckCircle2, Navigation
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface DesaTaxData {
  village: string;
  district: string;
  regency: string;
  province: string;
  
  letterNumber: string;
  date: string;
  
  wpName: string;
  wpNik: string;
  wpAddress: string;
  wpJob: string;
  
  nop: string;
  taxYear: string;
  landArea: string;
  buildingArea: string;
  objLocation: string;
  
  taxAmount: number;
  paymentStatus: string;
  
  villageHead: string;
  villageHeadNip: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DesaTaxData = {
  village: 'SARDONOHARJO',
  district: 'NGAGLIK',
  regency: 'SLEMAN',
  province: 'DAERAH ISTIMEWA YOGYAKARTA',
  
  letterNumber: '973/045/VIII/2026',
  date: '2026-08-01', 
  
  wpName: 'BAMBANG SUDARSO',
  wpNik: '3404010101740001',
  wpAddress: 'Dusun Tegalrejo RT 02 RW 05, Sardonoharjo',
  wpJob: 'Wiraswasta',
  
  nop: '34.04.050.001.012-0345.0',
  taxYear: '2026',
  landArea: '500',
  buildingArea: '150',
  objLocation: 'Jalan Kaliurang KM 10, Tegalrejo',
  
  taxAmount: 1250000,
  paymentStatus: 'LUNAS',
  
  villageHead: 'SUGIYANTO, S.E.',
  villageHeadNip: '19700101 199903 1 005'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PajakTanahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Keterangan PBB...</div>}>
      <TaxBuilder />
    </Suspense>
  );
}

function TaxBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<DesaTaxData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'kop' | 'wp' | 'objek' | 'status'>('kop');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const handleDataChange = (field: keyof DesaTaxData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir surat keterangan PBB?')) {
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
        {/* KOP SURAT */}
        <div className="text-center border-b-[3px] border-black pb-3 mb-6 relative">
            <h1 className="font-bold uppercase text-sm tracking-wide">PEMERINTAH KABUPATEN {data.regency}</h1>
            <h2 className="font-bold uppercase text-md tracking-wider">KECAMATAN {data.district}</h2>
            <h3 className="font-black uppercase text-2xl tracking-widest mt-1">DESA {data.village}</h3>
            <p className="text-[9pt] italic mt-1">Alamat Kantor Desa / Kelurahan {data.village}</p>
        </div>

        {/* JUDUL SURAT */}
        <div className="text-center mb-8">
            <h4 className="font-bold text-lg uppercase tracking-wider underline">SURAT KETERANGAN PAJAK BUMI DAN BANGUNAN (PBB)</h4>
            <p className="mt-1 font-mono text-sm">Nomor: {data.letterNumber}</p>
        </div>

        {/* PEMBUKA */}
        <div className="mb-4 text-justify">
            <p>
                Yang bertanda tangan di bawah ini Kepala Desa/Lurah {data.village}, Kecamatan {data.district}, Kabupaten {data.regency}, Provinsi {data.province}, dengan ini menerangkan bahwa:
            </p>
        </div>

        {/* WAJIB PAJAK */}
        <div className="mb-6 ml-6">
            <div className="flex mb-1"><div className="w-48 font-bold">Nama Wajib Pajak</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.wpName}</div></div>
            <div className="flex mb-1"><div className="w-48">Nomor Induk Kependudukan (NIK)</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.wpNik}</div></div>
            <div className="flex mb-1"><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.wpJob}</div></div>
            <div className="flex mb-1"><div className="w-48 align-top">Alamat Wajib Pajak</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.wpAddress}</div></div>
        </div>

        <div className="mb-4 text-justify">
            <p>
                Bahwa nama tersebut di atas adalah benar terdaftar sebagai Wajib Pajak pada Objek Pajak Bumi dan Bangunan (PBB) yang terletak di wilayah administrasi Desa {data.village}, dengan rincian objek pajak sebagai berikut:
            </p>
        </div>

        {/* OBJEK PAJAK */}
        <div className="mb-6 ml-6 border border-gray-400 p-4">
            <div className="flex mb-1"><div className="w-44 font-bold">Nomor Objek Pajak (NOP)</div><div className="w-4">:</div><div className="flex-1 font-mono font-bold tracking-wider">{data.nop}</div></div>
            <div className="flex mb-1"><div className="w-44">Tahun Pajak</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.taxYear}</div></div>
            <div className="flex mb-1"><div className="w-44 align-top">Letak Objek Pajak</div><div className="w-4 align-top">:</div><div className="flex-1">{data.objLocation}, Ds. {data.village}, Kec. {data.district}</div></div>
            <div className="flex mb-1"><div className="w-44">Luas Bumi (Tanah)</div><div className="w-4">:</div><div className="flex-1">{data.landArea} m&sup2;</div></div>
            <div className="flex mb-1"><div className="w-44">Luas Bangunan</div><div className="w-4">:</div><div className="flex-1">{data.buildingArea} m&sup2;</div></div>
            <div className="w-full border-t border-dashed border-gray-400 my-2"></div>
            <div className="flex mb-1"><div className="w-44 font-bold text-lg">Ketetapan PBB</div><div className="w-4 text-lg font-bold">:</div><div className="flex-1 font-bold text-lg underline">{formatRupiah(data.taxAmount)}</div></div>
        </div>

        {/* STATUS PEMBAYARAN */}
        <div className="mb-6 text-justify">
            <p>
                Berdasarkan basis data administrasi PBB Desa {data.village} tahun pajak {data.taxYear}, status pembayaran objek pajak tersebut di atas dinyatakan <strong>{data.paymentStatus.toUpperCase()}</strong>.
            </p>
        </div>

        {/* PENUTUP */}
        <div className="mb-12 text-justify">
            <p>
                Surat Keterangan ini dibuat dan diberikan kepada yang bersangkutan untuk dapat dipergunakan sebagaimana mestinya, antara lain untuk keperluan administrasi pertanahan, perbankan, atau urusan kedinasan lainnya.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-end text-center break-inside-avoid pr-8">
            <div className="w-72">
                <p className="mb-1">{data.village}, {formatDateSafe(data.date)}</p>
                <p className="mb-2 font-bold uppercase">Kepala Desa {data.village}</p>
                <div className="h-24 relative">
                   {/* CAP DESA TEMPLATE (OPSIONAL) */}
                   <div className="absolute top-4 left-4 w-16 h-16 border-[3px] border-blue-800/10 rounded-full flex items-center justify-center -rotate-12">
                      <span className="text-[6px] text-blue-800/10 font-bold uppercase text-center leading-tight">CAP<br/>KANTOR<br/>DESA</span>
                   </div>
                </div>
                <p className="font-bold underline uppercase">{data.villageHead}</p>
                {data.villageHeadNip && <p className="mt-1">NIP. {data.villageHeadNip}</p>}
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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Ket. PBB Desa</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-emerald-600" /> Draft Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('kop')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kop' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Instansi</button>
                <button onClick={() => setActiveTab('wp')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'wp' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Wajib Pajak</button>
                <button onClick={() => setActiveTab('objek')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'objek' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Objek PBB</button>
                <button onClick={() => setActiveTab('status')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'status' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Status</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'kop' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Landmark size={14} className="text-slate-600"/> Data Pemerintahan Desa/Kelurahan
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Desa / Kelurahan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.village} onChange={e => handleDataChange('village', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kecamatan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.district} onChange={e => handleDataChange('district', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kabupaten / Kota</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.regency} onChange={e => handleDataChange('regency', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Provinsi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.province} onChange={e => handleDataChange('province', e.target.value)} />
                        </div>
                    </div>
                    <div className="border-t border-slate-100 my-4"></div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.letterNumber} onChange={e => handleDataChange('letterNumber', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kepala Desa</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP Kades (Jika ada)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.villageHeadNip} onChange={e => handleDataChange('villageHeadNip', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'wp' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Data Wajib Pajak (WP)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Wajib Pajak / Pemilik</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.wpName} onChange={e => handleDataChange('wpName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP WP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.wpNik} onChange={e => handleDataChange('wpNik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.wpJob} onChange={e => handleDataChange('wpJob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap Wajib Pajak</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.wpAddress} onChange={e => handleDataChange('wpAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'objek' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Map size={14} className="text-emerald-600"/> Rincian Objek PBB
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Objek Pajak (NOP)</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold font-mono tracking-widest text-emerald-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nop} onChange={e => handleDataChange('nop', e.target.value)} placeholder="Misal: 34.04.050.001.012-0345.0" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Luas Bumi / Tanah (m²)</label>
                                <div className="flex bg-slate-50 rounded-xl border border-slate-200 overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500">
                                    <input className="w-full p-2.5 text-sm bg-transparent outline-none" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} />
                                    <span className="px-3 py-2.5 bg-slate-100 text-slate-500 text-sm border-l border-slate-200">m²</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Luas Bangunan (m²)</label>
                                <div className="flex bg-slate-50 rounded-xl border border-slate-200 overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500">
                                    <input className="w-full p-2.5 text-sm bg-transparent outline-none" value={data.buildingArea} onChange={e => handleDataChange('buildingArea', e.target.value)} />
                                    <span className="px-3 py-2.5 bg-slate-100 text-slate-500 text-sm border-l border-slate-200">m²</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat / Letak Objek Pajak</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.objLocation} onChange={e => handleDataChange('objLocation', e.target.value)} placeholder="Jalan / RT RW letak tanah/bangunan" />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'status' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CheckCircle2 size={14} className="text-amber-600"/> Tagihan & Pembayaran
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tahun Pajak (SPPT)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.taxYear} onChange={e => handleDataChange('taxYear', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Pembayaran</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-emerald-700" value={data.paymentStatus} onChange={e => handleDataChange('paymentStatus', e.target.value)}>
                                    <option value="Lunas">LUNAS</option>
                                    <option value="Belum Lunas">BELUM LUNAS</option>
                                    <option value="Menunggu Pembayaran">MENUNGGU PEMBAYARAN</option>
                                    <option value="Bebas Pajak">BEBAS PAJAK (Nihil)</option>
                                </select>
                            </div>
                        </div>

                        <div className="border border-amber-200 p-4 rounded-xl bg-amber-50 space-y-3">
                            <div>
                                <label className="block text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1.5">Ketetapan Pajak Terutang (Rp)</label>
                                <div className="flex bg-white rounded-xl border border-amber-200 overflow-hidden focus-within:ring-2 focus-within:ring-amber-500 shadow-inner">
                                    <div className="px-4 py-3 bg-amber-100 font-black text-amber-800 border-r border-amber-200">Rp</div>
                                    <input type="number" className="w-full p-3 text-lg font-mono font-bold text-amber-900 outline-none" value={data.taxAmount} onChange={e => handleDataChange('taxAmount', Number(e.target.value))} />
                                </div>
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
              <PrintWrapper documentName={`Ket_PBB_${data.wpName.replace(/\s+/g, '_')}_${data.taxYear}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
