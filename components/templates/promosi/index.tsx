'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: SuratPromosiPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Keputusan Promosi Jabatan
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  User, Building, FileText, BadgeDollarSign, ChevronDown, Trophy
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// --- 1. TYPE DEFINITIONS ---
interface PromosiData {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  teleponPerusahaan: string;
  emailPerusahaan: string;
  
  nomorSurat: string;
  tanggalSurat: string;
  tempatPenetapan: string;
  
  namaKaryawan: string;
  nik: string;
  
  jabatanLama: string;
  departemenLama: string;
  
  jabatanBaru: string;
  departemenBaru: string;
  
  tanggalEfektif: string;
  gajiLama: number;
  tunjanganLama: number;
  gajiBaru: number;
  tunjanganBaru: number;
  masaPercobaan: string;
  
  namaPenandatangan: string;
  jabatanPenandatangan: string;
  
  menimbang: string;
  mengingat: string;
  tembusan: string;
}

// --- 2. DATA DEFAULT ---
const DEFAULT_DATA: PromosiData = {
  namaPerusahaan: "PT MAJU MUNDUR SEJAHTERA",
  alamatPerusahaan: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110",
  teleponPerusahaan: "(021) 555-0198",
  emailPerusahaan: "hrd@majumundur.co.id",
  
  nomorSurat: "045/SK-DIR/VI/2026",
  tanggalSurat: "2026-06-15",
  tempatPenetapan: "Jakarta",
  
  namaKaryawan: "Budi Santoso",
  nik: "EMP-2021-089",
  
  jabatanLama: "Senior Staff",
  departemenLama: "Marketing",
  jabatanBaru: "Manager Marketing",
  departemenBaru: "Marketing",
  
  tanggalEfektif: "2026-07-01",
  gajiLama: 8000000,
  tunjanganLama: 1500000,
  gajiBaru: 15000000,
  tunjanganBaru: 3000000,
  masaPercobaan: "3 (tiga)",
  
  namaPenandatangan: "Andi Wijaya",
  jabatanPenandatangan: "Direktur Utama",
  
  menimbang: "a. Bahwa untuk kelancaran kegiatan operasional perusahaan dan mendukung pencapaian target bisnis, perlu dilakukan pengisian jabatan pada Departemen Marketing.\nb. Bahwa berdasarkan hasil penilaian kinerja, Saudara/i Budi Santoso dinilai memenuhi syarat, memiliki kapabilitas, dan dedikasi yang baik untuk menduduki jabatan Manager Marketing.\nc. Bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a dan b, perlu ditetapkan dengan Surat Keputusan Direksi.",
  mengingat: "1. Anggaran Dasar Perusahaan beserta seluruh perubahannya.\n2. Peraturan Perusahaan (PP) / Perjanjian Kerja Bersama (PKB) yang berlaku di lingkungan PT Maju Mundur Sejahtera.\n3. Hasil Keputusan Rapat Direksi PT Maju Mundur Sejahtera tanggal 10 Juni 2026.",
  tembusan: "1. Board of Directors\n2. HRD & GA Department\n3. Finance & Accounting Department\n4. Atasan Langsung\n5. Arsip",
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
export default function SuratPromosiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Keputusan Promosi...</div>}>
      <PromosiBuilder />
    </Suspense>
  );
}

function PromosiBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'karyawan' | 'promosi' | 'sk'>('perusahaan');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<PromosiData>(DEFAULT_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof PromosiData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat keputusan ke awal?')) {
        setData(DEFAULT_DATA);
    }
  };

  const totalGajiLama = (data.gajiLama || 0) + (data.tunjanganLama || 0);
  const totalGajiBaru = (data.gajiBaru || 0) + (data.tunjanganBaru || 0);

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER SURAT KEPUTUSAN */}
      <div className="text-center mb-6 border-b-2 border-black pb-4">
        <h1 className="font-bold text-xl uppercase tracking-wider">{data.namaPerusahaan}</h1>
        <p className="text-sm">{data.alamatPerusahaan}</p>
        <p className="text-sm">Telp: {data.teleponPerusahaan} | Email: {data.emailPerusahaan}</p>
      </div>

      <div className="text-center mb-8">
        <h2 className="font-bold text-lg underline uppercase">SURAT KEPUTUSAN DIREKSI</h2>
        <p className="font-bold uppercase tracking-wider mt-1">Nomor: {data.nomorSurat}</p>
        <p className="font-bold uppercase tracking-wider mt-2">TENTANG<br/>PROMOSI JABATAN KARYAWAN</p>
      </div>

      {/* MENIMBANG & MENGINGAT */}
      <div className="mb-6 text-justify">
          <div className="flex mb-2">
              <div className="w-28 font-bold uppercase">Menimbang</div>
              <div className="w-4">:</div>
              <div className="flex-1 whitespace-pre-line">{data.menimbang}</div>
          </div>
          <div className="flex">
              <div className="w-28 font-bold uppercase">Mengingat</div>
              <div className="w-4">:</div>
              <div className="flex-1 whitespace-pre-line">{data.mengingat}</div>
          </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="font-bold uppercase text-lg tracking-wider">MEMUTUSKAN</h3>
      </div>

      {/* PASAL 1 - PENETAPAN */}
      <div className="mb-4 text-justify">
        <h3 className="font-bold uppercase mb-2">Pasal 1: Penetapan Promosi</h3>
        <p className="mb-2">Mempromosikan dan menetapkan jabatan karyawan di bawah ini:</p>
        <div className="ml-8 mb-2">
            <div className="flex"><div className="w-48 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaKaryawan}</div></div>
            <div className="flex"><div className="w-48 font-bold">NIK</div><div className="w-4">:</div><div className="flex-1">{data.nik}</div></div>
        </div>
        
        <div className="flex gap-4 ml-8">
            <div className="flex-1 border p-2">
                <p className="font-bold text-xs uppercase bg-slate-200 text-center mb-1">Status Lama</p>
                <div className="flex text-sm"><div className="w-24">Jabatan</div><div>: {data.jabatanLama}</div></div>
                <div className="flex text-sm"><div className="w-24">Dept</div><div>: {data.departemenLama}</div></div>
            </div>
            <div className="flex-1 border p-2 border-black">
                <p className="font-bold text-xs uppercase bg-black text-white text-center mb-1">Status Baru</p>
                <div className="flex font-bold text-sm"><div className="w-24">Jabatan</div><div>: {data.jabatanBaru}</div></div>
                <div className="flex font-bold text-sm"><div className="w-24">Dept</div><div>: {data.departemenBaru}</div></div>
            </div>
        </div>
      </div>

      {/* PASAL 2 - KOMPENSASI */}
      <div className="mb-4 text-justify">
        <h3 className="font-bold uppercase mb-2">Pasal 2: Kompensasi dan Hak</h3>
        <p className="mb-2">Seiring dengan promosi ini, maka struktur kompensasi karyawan disesuaikan menjadi:</p>
        <div className="ml-8 mb-2 border border-black max-w-md p-3">
            <div className="flex justify-between border-b pb-1 mb-1">
                <span>Gaji Pokok:</span>
                <span className="font-bold">{formatCurrency(data.gajiBaru)}</span>
            </div>
            <div className="flex justify-between border-b pb-1 mb-1">
                <span>Tunjangan Jabatan:</span>
                <span className="font-bold">{formatCurrency(data.tunjanganBaru)}</span>
            </div>
            <div className="flex justify-between bg-slate-100 p-1 font-bold">
                <span>Total Kompensasi Baru:</span>
                <span>{formatCurrency(totalGajiBaru)}</span>
            </div>
        </div>
      </div>

      {/* PASAL 3 - KETENTUAN LAIN */}
      <div className="mb-6 text-justify">
        <h3 className="font-bold uppercase mb-2">Pasal 3: Ketentuan Lain-Lain</h3>
        <p>
            1. Keputusan ini berlaku efektif sejak tanggal <strong>{formatDateDisplay(data.tanggalEfektif)}</strong>.<br/>
            2. Karyawan akan menjalani masa percobaan/evaluasi jabatan baru selama <strong>{data.masaPercobaan} bulan</strong>.<br/>
            3. Seluruh hak, kewajiban, dan tanggung jawab jabatan disesuaikan dengan uraian tugas (Job Description) jabatan baru.<br/>
            4. Apabila di kemudian hari terdapat kekeliruan dalam keputusan ini, akan diadakan perbaikan sebagaimana mestinya.
        </p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between break-inside-avoid mt-8">
        <div className="w-1/2">
            <p className="font-bold uppercase underline mb-2">Tembusan:</p>
            <p className="text-sm whitespace-pre-line leading-relaxed">{data.tembusan}</p>
        </div>
        <div className="w-56 text-center">
            <p className="mb-2">Ditetapkan di: {data.tempatPenetapan}<br/>Pada tanggal: {formatDateDisplay(data.tanggalSurat)}</p>
            <p className="font-bold uppercase">{data.namaPerusahaan}</p>
            <div className="h-24"></div>
            <p className="font-bold underline uppercase">{data.namaPenandatangan}</p>
            <p className="text-xs uppercase">{data.jabatanPenandatangan}</p>
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
              <ArrowLeftCircle size={20} className="text-violet-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SK Promosi Jabatan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak SK</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Trophy size={18} className="text-violet-600" /> Editor Promosi</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'perusahaan' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Instansi</button>
                <button onClick={() => setActiveTab('sk')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'sk' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Detail SK</button>
                <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'karyawan' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Pegawai</button>
                <button onClick={() => setActiveTab('promosi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'promosi' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Kompensasi</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'perusahaan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building size={14} className="text-slate-600"/> Data Perusahaan / Instansi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Kop Surat)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Telepon</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.teleponPerusahaan} onChange={e => handleChange('teleponPerusahaan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.emailPerusahaan} onChange={e => handleChange('emailPerusahaan', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4"></div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Direktur / Penandatangan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPenandatangan} onChange={e => handleChange('namaPenandatangan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan TTD</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.jabatanPenandatangan} onChange={e => handleChange('jabatanPenandatangan', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'sk' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-amber-600"/> Detail Surat Keputusan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat (SK)</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Penetapan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tempatPenetapan} onChange={e => handleChange('tempatPenetapan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Penetapan</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Konsideran Menimbang</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.menimbang} onChange={e => handleChange('menimbang', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Konsideran Mengingat</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.mengingat} onChange={e => handleChange('mengingat', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tembusan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tembusan} onChange={e => handleChange('tembusan', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'karyawan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-blue-600"/> Data Pegawai
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Karyawan</label>
                                <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.namaKaryawan} onChange={e => handleChange('namaKaryawan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.nik} onChange={e => handleChange('nik', e.target.value)} />
                            </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <h4 className="font-bold text-xs uppercase mb-2">Posisi Lama</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Jabatan Lama</label>
                                    <input className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.jabatanLama} onChange={e => handleChange('jabatanLama', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Departemen Lama</label>
                                    <input className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.departemenLama} onChange={e => handleChange('departemenLama', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <h4 className="font-bold text-xs uppercase mb-2 text-blue-800">Posisi Baru (Promosi)</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-blue-500 uppercase mb-1">Jabatan Baru</label>
                                    <input className="w-full bg-white p-2 border border-blue-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.jabatanBaru} onChange={e => handleChange('jabatanBaru', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-blue-500 uppercase mb-1">Departemen Baru</label>
                                    <input className="w-full bg-white p-2 border border-blue-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.departemenBaru} onChange={e => handleChange('departemenBaru', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Efektif Menjabat</label>
                                <input type="date" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tanggalEfektif} onChange={e => handleChange('tanggalEfektif', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Masa Percobaan (Bulan)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.masaPercobaan} onChange={e => handleChange('masaPercobaan', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'promosi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <BadgeDollarSign size={14} className="text-emerald-600"/> Penyesuaian Kompensasi
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <h4 className="font-bold text-xs uppercase mb-2">Kompensasi Lama</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Gaji Pokok Lama (Rp)</label>
                                    <input type="number" className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.gajiLama} onChange={e => handleChange('gajiLama', parseFloat(e.target.value) || 0)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tunj. Jabatan Lama (Rp)</label>
                                    <input type="number" className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tunjanganLama} onChange={e => handleChange('tunjanganLama', parseFloat(e.target.value) || 0)} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                            <h4 className="font-bold text-xs uppercase mb-2 text-emerald-800">Kompensasi Baru (Promosi)</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Gaji Pokok Baru (Rp)</label>
                                    <input type="number" className="w-full bg-white p-2 border border-emerald-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.gajiBaru} onChange={e => handleChange('gajiBaru', parseFloat(e.target.value) || 0)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Tunj. Jabatan Baru (Rp)</label>
                                    <input type="number" className="w-full bg-white p-2 border border-emerald-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tunjanganBaru} onChange={e => handleChange('tunjanganBaru', parseFloat(e.target.value) || 0)} />
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
              <PrintWrapper documentName={`SK_Promosi_${data.namaKaryawan.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
