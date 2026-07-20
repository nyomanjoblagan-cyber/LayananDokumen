'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: UsiaPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Keterangan Usia / Belum Cukup Umur
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Baby, Users, Building, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface UsiaData {
  namaInstansi: string;
  alamatInstansi: string;
  kontakInstansi: string;
  
  nomorSurat: string;
  tanggalSurat: string;
  
  namaPejabat: string;
  jabatanPejabat: string;
  
  namaAnak: string;
  tempatLahirAnak: string;
  tanggalLahirAnak: string;
  jenisKelaminAnak: string;
  agamaAnak: string;
  alamatAnak: string;
  
  namaOrtu: string;
  umurOrtu: string;
  pekerjaanOrtu: string;
  alamatOrtu: string;
  
  keperluan: string;
  keteranganTambahan: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: UsiaData = {
  namaInstansi: 'PEMERINTAH KABUPATEN DEMAK\nKECAMATAN KARANGANYAR\nDESA SUKAMAJU',
  alamatInstansi: 'Jl. Balai Desa No. 1, Kec. Karanganyar, Kab. Demak 59582',
  kontakInstansi: 'Telp: (0291) 123456 | Email: pemdes.sukamaju@demak.go.id',
  
  nomorSurat: '474.2/015/VII/2026',
  tanggalSurat: '2026-07-13',
  
  namaPejabat: 'Budi Hartono, S.E.',
  jabatanPejabat: 'Kepala Desa Sukamaju',
  
  namaAnak: 'Bagas Aditya',
  tempatLahirAnak: 'Demak',
  tanggalLahirAnak: '2012-08-15',
  jenisKelaminAnak: 'Laki-laki',
  agamaAnak: 'Islam',
  alamatAnak: 'Dusun Krajan RT 01 / RW 02, Desa Sukamaju, Kec. Karanganyar, Kab. Demak',
  
  namaOrtu: 'Sutrisno',
  umurOrtu: '45 Tahun',
  pekerjaanOrtu: 'Wiraswasta',
  alamatOrtu: 'Dusun Krajan RT 01 / RW 02, Desa Sukamaju, Kec. Karanganyar, Kab. Demak',
  
  keperluan: 'Persyaratan Pendaftaran Sekolah Menengah Atas (SMA)',
  keteranganTambahan: 'Berdasarkan data kependudukan yang ada, nama tersebut di atas benar merupakan warga kami dan pada saat surat ini dikeluarkan masih berusia di bawah 17 Tahun (Belum Cukup Umur / Belum Memiliki KTP).',
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

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function UsiaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Usia...</div>}>
      <UsiaBuilder />
    </Suspense>
  );
}

function UsiaBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'instansi' | 'anak' | 'ortu' | 'keterangan'>('instansi');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<UsiaData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof UsiaData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="border-b-[3px] border-black pb-2 mb-6 text-center">
        <h1 className="text-xl font-bold uppercase whitespace-pre-line leading-tight">{data.namaInstansi}</h1>
        <p className="text-sm mt-1">{data.alamatInstansi}</p>
        <p className="text-sm">{data.kontakInstansi}</p>
      </div>

      {/* JUDUL SURAT */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold underline uppercase tracking-wide">SURAT KETERANGAN USIA</h2>
        <p className="mt-1">Nomor: {data.nomorSurat}</p>
      </div>

      <div className="text-justify mb-4">
        <p>Yang bertanda tangan di bawah ini {data.jabatanPejabat}, menerangkan dengan sesungguhnya bahwa:</p>
      </div>

      {/* DATA ANAK */}
      <div className="mb-6 pl-4 border-l-2 border-black ml-4">
        <div className="flex mb-1"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaAnak}</div></div>
        <div className="flex mb-1"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.tempatLahirAnak}, {formatDateDisplay(data.tanggalLahirAnak)}</div></div>
        <div className="flex mb-1"><div className="w-40">Jenis Kelamin</div><div className="w-4">:</div><div className="flex-1">{data.jenisKelaminAnak}</div></div>
        <div className="flex mb-1"><div className="w-40">Agama</div><div className="w-4">:</div><div className="flex-1">{data.agamaAnak}</div></div>
        <div className="flex mb-1"><div className="w-40">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.alamatAnak}</div></div>
      </div>

      <div className="text-justify mb-4">
        <p>Anak tersebut adalah benar-benar anak kandung dari:</p>
      </div>

      {/* DATA ORTU */}
      <div className="mb-6 pl-4 border-l-2 border-black ml-4">
        <div className="flex mb-1"><div className="w-40">Nama Orang Tua</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.namaOrtu}</div></div>
        <div className="flex mb-1"><div className="w-40">Umur</div><div className="w-4">:</div><div className="flex-1">{data.umurOrtu}</div></div>
        <div className="flex mb-1"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.pekerjaanOrtu}</div></div>
        <div className="flex mb-1"><div className="w-40">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.alamatOrtu}</div></div>
      </div>

      <div className="text-justify mb-8 leading-relaxed">
        <p className="mb-3">Adapun Surat Keterangan Usia ini dibuat dan dipergunakan untuk: <strong>"{data.keperluan}"</strong>.</p>
        <p className="mb-3 italic">Catatan Tambahan: {data.keteranganTambahan}</p>
        <p>Demikian Surat Keterangan ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end px-4 break-inside-avoid mt-8">
        <div className="text-center w-64">
            <p className="mb-2">{data.namaInstansi.split('\n')[0].replace('PEMERINTAH KABUPATEN ', '').replace('PEMERINTAH KOTA ', '')}, {formatDateDisplay(data.tanggalSurat)}<br/>{data.jabatanPejabat}</p>
            <div className="h-24 flex justify-center items-center">
                 <span className="text-gray-300 text-[10px] print:hidden">(TTD & Stempel)</span>
            </div>
            <p className="font-bold underline uppercase">{data.namaPejabat}</p>
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
              <ArrowLeftCircle size={20} className="text-cyan-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Keterangan Usia</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Baby size={18} className="text-cyan-600" /> Editor Usia</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('instansi')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'instansi' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Instansi</button>
                <button onClick={() => setActiveTab('anak')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'anak' ? 'bg-white border-t-2 border-cyan-500 text-cyan-700' : 'text-slate-500 hover:bg-slate-200'}`}>Anak</button>
                <button onClick={() => setActiveTab('ortu')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ortu' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Orang Tua</button>
                <button onClick={() => setActiveTab('keterangan')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'keterangan' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>Keperluan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'instansi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building size={14} className="text-slate-600"/> Data Instansi & Pejabat
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Instansi / Desa</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold text-center" value={data.namaInstansi} onChange={e => handleChange('namaInstansi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Instansi</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatInstansi} onChange={e => handleChange('alamatInstansi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak Instansi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kontakInstansi} onChange={e => handleChange('kontakInstansi', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pejabat Pembuat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPejabat} onChange={e => handleChange('namaPejabat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pejabat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.jabatanPejabat} onChange={e => handleChange('jabatanPejabat', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'anak' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-cyan-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Baby size={14} className="text-cyan-600"/> Data Anak
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Anak</label>
                            <input className="w-full bg-cyan-50 p-2.5 border border-cyan-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.namaAnak} onChange={e => handleChange('namaAnak', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.tempatLahirAnak} onChange={e => handleChange('tempatLahirAnak', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.tanggalLahirAnak} onChange={e => handleChange('tanggalLahirAnak', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.jenisKelaminAnak} onChange={e => handleChange('jenisKelaminAnak', e.target.value)}>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Agama</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.agamaAnak} onChange={e => handleChange('agamaAnak', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.alamatAnak} onChange={e => handleChange('alamatAnak', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ortu' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Users size={14} className="text-amber-600"/> Data Orang Tua / Wali
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Orang Tua</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaOrtu} onChange={e => handleChange('namaOrtu', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Umur</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.umurOrtu} onChange={e => handleChange('umurOrtu', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.pekerjaanOrtu} onChange={e => handleChange('pekerjaanOrtu', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Orang Tua</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.alamatOrtu} onChange={e => handleChange('alamatOrtu', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'keterangan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldCheck size={14} className="text-rose-600"/> Keperluan & Keterangan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keperluan Keterangan Usia</label>
                            <textarea className="w-full bg-rose-50 p-3 border border-rose-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none font-bold" value={data.keperluan} onChange={e => handleChange('keperluan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Catatan/Keterangan Tambahan (Opsional)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-28 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed" value={data.keteranganTambahan} onChange={e => handleChange('keteranganTambahan', e.target.value)} />
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
              <PrintWrapper documentName={`KeteranganUsia_${data.namaAnak.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
