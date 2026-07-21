'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: sktm.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Keterangan Tidak Mampu (SKTM) - Standar Legal Enterprise / Kelurahan Definitif
 */

import React, { useState, Suspense, useEffect } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, UserCircle2, Building2, Users, FileWarning
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SktmData {
  regencyName: string;
  subdistrictName: string;
  villageName: string;
  villageAddress: string;
  headName: string;
  headNip: string;
  headTitle: string;
  
  date: string;
  docNumber: string;

  pihak1Name: string;
  pihak1Nik: string;
  pihak1Pob: string;
  pihak1Dob: string;
  pihak1Job: string;
  pihak1Address: string;

  childName: string;
  childNik: string;
  childPob: string;
  childDob: string;
  childJob: string;
  childAddress: string;

  keperluan: string; 
  penghasilan: string; 
  metodePenyaluran: string;
  tanggunganPajak: string;
  penyelesaianSengketa: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SktmData = {
  regencyName: 'Bantul',
  subdistrictName: 'Kasihan',
  villageName: 'Tirtonirmolo',
  villageAddress: 'Jl. Padokan No. 1, Kasihan, Bantul, DI Yogyakarta',
  headName: 'H. MUHAMMAD ILHAM, S.E.',
  headNip: '19700101 199903 1 002',
  headTitle: 'Kepala Desa',
  
  date: '2026-07-11',
  docNumber: '400 / 085 / VII / 2026',

  pihak1Name: 'SUPARDI',
  pihak1Nik: '3402050101700001',
  pihak1Pob: 'Bantul',
  pihak1Dob: '1970-05-12',
  pihak1Job: 'Buruh Harian Lepas',
  pihak1Address: 'Dusun Mrisi RT 04, Desa Tirtonirmolo, Kec. Kasihan, Kab. Bantul',

  childName: 'BUDI SANTOSO',
  childNik: '3402050101990003',
  childPob: 'Bantul',
  childDob: '1999-08-20',
  childJob: 'Pelajar/Mahasiswa',
  childAddress: 'Dusun Mrisi RT 04, Desa Tirtonirmolo, Kec. Kasihan, Kab. Bantul',

  keperluan: 'Beasiswa Pendidikan Jalur Prasejahtera',
  penghasilan: 'Rp 1.000.000 - Rp 1.500.000',
  metodePenyaluran: 'Tunai Sekaligus',
  tanggunganPajak: 'Ditanggung Pemerintah',
  penyelesaianSengketa: 'Musyawarah Mufakat'
};

// --- HELPERS ---
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
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SktmPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <SktmBuilder />
    </Suspense>
  );
}

function SktmBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<SktmData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'anak' | 'instansi' | 'ketentuan'>('pihak1');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof SktmData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form SKTM ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="flex items-center border-b-4 border-double border-black pb-4 mb-6">
        <div className="flex-1 text-center px-4">
            <h2 className="text-lg font-bold uppercase tracking-wide leading-tight">PEMERINTAH KABUPATEN {data.regencyName}</h2>
            <h2 className="text-lg font-bold uppercase tracking-wide leading-tight">KECAMATAN {data.subdistrictName}</h2>
            <h1 className="text-xl font-black uppercase tracking-wider my-1 leading-tight">DESA {data.villageName}</h1>
            <p className="text-[10px] leading-tight">{data.villageAddress}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8">
        <h2 className="font-bold text-lg underline uppercase tracking-widest">SURAT KETERANGAN TIDAK MAMPU (SKTM)</h2>
        <p className="font-bold mt-1">Nomor: {data.docNumber}</p>
      </div>

      <div className="text-justify mb-4">
        <p>Yang bertanda tangan di bawah ini Kepala Desa <strong>{data.villageName}</strong>, Kecamatan <strong>{data.subdistrictName}</strong>, Kabupaten <strong>{data.regencyName}</strong>, menerangkan dengan sebenarnya bahwa:</p>
      </div>

      {/* PIHAK 1 (Orang Tua / Wali) */}
      <div className="mb-4 pl-8">
        <p className="font-bold underline mb-2 uppercase text-sm">I. Data Orang Tua / Wali Pemohon</p>
        <div className="flex"><div className="w-48 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.pihak1Name}</div></div>
        <div className="flex"><div className="w-48">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pihak1Nik}</div></div>
        <div className="flex"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Pob}, {formatDateDisplay(data.pihak1Dob)}</div></div>
        <div className="flex"><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Job}</div></div>
        <div className="flex"><div className="w-48">Alamat Domisili</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Address}</div></div>
      </div>

      {/* ANAK / TANGGUNGAN */}
      <div className="mb-6 pl-8">
        <p className="mb-2">Adalah benar yang bersangkutan merupakan orang tua / wali / penanggung jawab dari:</p>
        <p className="font-bold underline mb-2 uppercase text-sm">II. Data Tanggungan / Anak</p>
        <div className="flex"><div className="w-48 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.childName}</div></div>
        <div className="flex"><div className="w-48">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.childNik}</div></div>
        <div className="flex"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.childPob}, {formatDateDisplay(data.childDob)}</div></div>
        <div className="flex"><div className="w-48">Pekerjaan / Status</div><div className="w-4">:</div><div className="flex-1">{data.childJob}</div></div>
        <div className="flex"><div className="w-48">Alamat Domisili</div><div className="w-4">:</div><div className="flex-1">{data.childAddress}</div></div>
      </div>

      <div className="mb-8 text-justify">
        <p className="mb-4">Orang tersebut di atas, berdasarkan Surat Keterangan Pengantar RT/RW dan catatan/register kependudukan pada Kantor Desa {data.villageName}, adalah benar warga desa kami yang keadaan ekonomi/sosialnya termasuk dalam kategori <strong>Keluarga Pra-Sejahtera (Tidak Mampu)</strong> dengan penghasilan keluarga rata-rata per bulan <strong>{data.penghasilan}</strong>.</p>
        
        <p className="mb-2">Surat Keterangan ini dibuat dan diberikan untuk keperluan:</p>
        <p className="font-bold uppercase text-center bg-gray-100 p-2 border border-gray-300 rounded mb-4">"{data.keperluan}"</p>

        <p>Demikian Surat Keterangan Tidak Mampu (SKTM) ini dibuat agar dapat dipergunakan sebagaimana mestinya oleh pihak-pihak yang berkepentingan. Apabila di kemudian hari terbukti keterangan ini tidak benar, maka yang bersangkutan bersedia dituntut sesuai hukum yang berlaku tanpa melibatkan Pihak Kelurahan/Desa.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end px-4 break-inside-avoid mt-12">
        <div className="text-center w-72">
            <p className="mb-1">{data.villageName}, {formatDateDisplay(data.date)}</p>
            <p className="mb-2 font-bold uppercase">{data.headTitle} {data.villageName}</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Stempel Kelurahan/Desa)</span>
            </div>
            <p className="font-bold underline uppercase">{data.headName}</p>
            <p className="text-sm">NIP. {data.headNip}</p>
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
              <ArrowLeftCircle size={20} className="text-teal-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SKTM Desa/Kelurahan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><FileWarning size={18} className="text-teal-600" /> Editor SKTM</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pihak1' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Wali / Ortu</button>
                <button onClick={() => setActiveTab('anak')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'anak' ? 'bg-white border-t-2 border-teal-500 text-teal-700' : 'text-slate-500 hover:bg-slate-200'}`}>Tanggungan</button>
                <button onClick={() => setActiveTab('ketentuan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ketentuan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Keterangan</button>
                <button onClick={() => setActiveTab('instansi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'instansi' ? 'bg-white border-t-2 border-red-500 text-red-700' : 'text-slate-500 hover:bg-slate-200'}`}>Desa / Lurah</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pihak1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-slate-600"/> Data Orang Tua / Wali
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Wali</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Name} onChange={e => handleChange('pihak1Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP Wali</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Nik} onChange={e => handleChange('pihak1Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Job} onChange={e => handleChange('pihak1Job', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Pob} onChange={e => handleChange('pihak1Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Dob} onChange={e => handleChange('pihak1Dob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Address} onChange={e => handleChange('pihak1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'anak' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-teal-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Users size={14} className="text-teal-600"/> Data Anak / Tanggungan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Anak</label>
                            <input className="w-full bg-teal-50 p-2.5 border border-teal-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.childName} onChange={e => handleChange('childName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK / NISN Anak</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.childNik} onChange={e => handleChange('childNik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan/Status Anak</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.childJob} onChange={e => handleChange('childJob', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir Anak</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.childPob} onChange={e => handleChange('childPob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir Anak</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.childDob} onChange={e => handleChange('childDob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili Anak</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={data.childAddress} onChange={e => handleChange('childAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ketentuan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileWarning size={14} className="text-amber-600"/> Detail Keterangan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keperluan Pengajuan SKTM</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.keperluan} onChange={e => handleChange('keperluan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Estimasi Penghasilan Per Bulan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.penghasilan} onChange={e => handleChange('penghasilan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 hidden">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penyaluran</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.metodePenyaluran} onChange={e => handleChange('metodePenyaluran', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pajak</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggunganPajak} onChange={e => handleChange('tanggunganPajak', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'instansi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-red-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-red-600"/> Data Kepala Desa / Lurah
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kabupaten / Kota</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.regencyName} onChange={e => handleChange('regencyName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kecamatan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.subdistrictName} onChange={e => handleChange('subdistrictName', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Desa / Kelurahan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.villageName} onChange={e => handleChange('villageName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Kantor Desa Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.villageAddress} onChange={e => handleChange('villageAddress', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Tanda Tangan Pejabat Pengesah</h4>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap & Gelar</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.headName} onChange={e => handleChange('headName', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan (Kades/Lurah)</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.headTitle} onChange={e => handleChange('headTitle', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP Pejabat (Bila Ada)</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.headNip} onChange={e => handleChange('headNip', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Diterbitkan</label>
                                    <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Indeks Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.docNumber} onChange={e => handleChange('docNumber', e.target.value)} />
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
              <PrintWrapper documentName={`SKTM_${data.pihak1Nik}_${data.pihak1Name.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
