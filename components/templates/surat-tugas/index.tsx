'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: SuratTugasPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Tugas Resmi / Corporate Assignment Letter
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, BookOpen,
  Briefcase, MapPin, UserCheck, CheckCircle2, UserCircle2
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface BebanBiaya {
  id: string;
  jenis: string;
  ditanggungOleh: string;
  keterangan: string;
}

interface SuratTugasData {
  nomorSurat: string;
  tanggalSurat: string;
  kota: string;
  
  pemberiTugas: {
    nama: string;
    jabatan: string;
    nip: string;
    instansi: string;
  };
  penerimaTugas: {
    nama: string;
    jabatan: string;
    nip: string;
  };
  tujuanTugas: string;
  lokasi: string;
  waktuMulai: string;
  waktuSelesai: string;
  bebanBiaya: BebanBiaya[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SuratTugasData = {
  nomorSurat: '001/ST-HRD/2026',
  tanggalSurat: '2026-07-13',
  kota: 'Jakarta Pusat',
  pemberiTugas: {
    nama: 'Dr. Budi Santoso, M.M.',
    jabatan: 'Direktur Utama',
    nip: '19800101 200501 1 001',
    instansi: 'PT. KORPORAT LINTAS NUSANTARA'
  },
  penerimaTugas: {
    nama: 'Andi Wijaya, S.Kom.',
    jabatan: 'Staff IT & Jaringan',
    nip: '19900202 201502 1 002'
  },
  tujuanTugas: 'Melakukan instalasi server, konfigurasi jaringan baru, dan audit keamanan sistem pada Data Center Cabang.',
  lokasi: 'Kantor Cabang Regional Jawa Barat (Gedung Sate Lt. 3, Bandung)',
  waktuMulai: '2026-07-20',
  waktuSelesai: '2026-07-23',
  bebanBiaya: [
    { id: '1', jenis: 'Akomodasi & Penginapan', ditanggungOleh: 'Perusahaan', keterangan: 'Maks. Rp750.000/malam' },
    { id: '2', jenis: 'Transportasi', ditanggungOleh: 'Perusahaan', keterangan: 'Pesawat / Kereta Eksekutif' },
    { id: '3', jenis: 'Uang Harian (Per Diem)', ditanggungOleh: 'Perusahaan', keterangan: 'Sesuai Golongan/Rate Kebijakan' }
  ]
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
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratTugasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Tugas...</div>}>
      <SuratTugasBuilder />
    </Suspense>
  );
}

function SuratTugasBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pemberi' | 'penerima' | 'tugas' | 'biaya'>('pemberi');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<SuratTugasData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof SuratTugasData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleNestedChange = (category: 'pemberiTugas' | 'penerimaTugas', field: string, val: any) => {
    setData(prev => ({
        ...prev,
        [category]: {
            ...prev[category],
            [field]: val
        }
    }));
  };

  const handleBiayaChange = (id: string, field: string, val: string) => {
      setData(prev => ({
          ...prev,
          bebanBiaya: prev.bebanBiaya.map(b => b.id === id ? { ...b, [field]: val } : b)
      }));
  };
  
  const addBiaya = () => {
      setData(prev => ({
          ...prev,
          bebanBiaya: [...prev.bebanBiaya, { id: Date.now().toString(), jenis: '', ditanggungOleh: '', keterangan: '' }]
      }));
  };

  const removeBiaya = (id: string) => {
      setData(prev => ({
          ...prev,
          bebanBiaya: prev.bebanBiaya.filter(b => b.id !== id)
      }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="flex flex-col items-center border-b-[3px] border-black pb-4 mb-6">
        <h1 className="text-2xl font-black uppercase tracking-widest">{data.pemberiTugas.instansi}</h1>
        <p className="text-sm mt-1 text-center">SURAT TUGAS KEDINASAN</p>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-6">
        <h2 className="font-bold text-xl underline uppercase tracking-widest">SURAT TUGAS</h2>
        <p className="font-bold mt-1">Nomor: {data.nomorSurat}</p>
      </div>

      <div className="text-justify mb-4">
        <p>Yang bertanda tangan di bawah ini:</p>
      </div>

      {/* PEMBERI TUGAS */}
      <div className="mb-4 pl-8 border-l-2 border-black ml-4">
        <div className="flex mb-1"><div className="w-32 font-bold">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.pemberiTugas.nama}</div></div>
        <div className="flex mb-1"><div className="w-32">NIP/NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pemberiTugas.nip}</div></div>
        <div className="flex mb-1"><div className="w-32">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.pemberiTugas.jabatan}</div></div>
        <div className="flex mb-1"><div className="w-32">Instansi</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.pemberiTugas.instansi}</div></div>
      </div>

      <div className="text-justify mb-4">
        <p>Dengan ini memberikan tugas dan perintah kepada:</p>
      </div>

      {/* PENERIMA TUGAS */}
      <div className="mb-6 pl-8 border-l-2 border-black ml-4">
        <div className="flex mb-1"><div className="w-32 font-bold">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.penerimaTugas.nama}</div></div>
        <div className="flex mb-1"><div className="w-32">NIP/NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.penerimaTugas.nip}</div></div>
        <div className="flex mb-1"><div className="w-32">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.penerimaTugas.jabatan}</div></div>
      </div>

      <div className="text-center mb-6">
        <h3 className="font-bold underline text-lg tracking-widest uppercase">--- UNTUK MELAKSANAKAN TUGAS ---</h3>
      </div>

      {/* TUGAS */}
      <div className="mb-6">
        <div className="pl-4">
            <div className="flex mb-2"><div className="w-48 font-bold">Tujuan / Uraian Tugas</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.tujuanTugas}</div></div>
            <div className="flex mb-2"><div className="w-48 font-bold">Lokasi Penugasan</div><div className="w-4">:</div><div className="flex-1">{data.lokasi}</div></div>
            <div className="flex mb-2"><div className="w-48 font-bold">Tanggal Pelaksanaan</div><div className="w-4">:</div><div className="flex-1">
                {formatDateDisplay(data.waktuMulai)} <strong>s/d</strong> {formatDateDisplay(data.waktuSelesai)}
            </div></div>
        </div>
      </div>

      <div className="mb-6 text-justify">
        <p className="font-bold underline mb-2">KETENTUAN BIAYA & FASILITAS:</p>
        <table className="w-full border-collapse border border-black mb-4">
            <thead>
                <tr className="bg-gray-100 print:bg-gray-100">
                    <th className="border border-black p-2 text-left">No.</th>
                    <th className="border border-black p-2 text-left">Jenis Komponen Biaya</th>
                    <th className="border border-black p-2 text-left">Ditanggung Oleh</th>
                    <th className="border border-black p-2 text-left">Keterangan Tambahan</th>
                </tr>
            </thead>
            <tbody>
                {data.bebanBiaya.map((b, i) => (
                    <tr key={b.id}>
                        <td className="border border-black p-2 text-center">{i + 1}</td>
                        <td className="border border-black p-2">{b.jenis}</td>
                        <td className="border border-black p-2">{b.ditanggungOleh}</td>
                        <td className="border border-black p-2">{b.keterangan}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="text-justify mb-8">
        <p>Demikian Surat Tugas ini dibuat untuk dapat dilaksanakan dengan penuh tanggung jawab. Kepada instansi atau pihak terkait, dimohon bantuan dan kerjasamanya agar tugas ini dapat berjalan dengan lancar. Setelah selesai melaksanakan tugas, yang bersangkutan wajib memberikan laporan kepada Pemberi Tugas.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-16">
        <div className="text-center w-64">
            <div className="mb-1 h-6"></div>
            <p className="mb-2 font-bold uppercase">PENERIMA TUGAS</p>
            <div className="h-24 flex justify-center items-center">
            </div>
            <p className="font-bold underline uppercase">{data.penerimaTugas.nama}</p>
            <p className="text-sm">NIP. {data.penerimaTugas.nip}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-1">{data.kota}, {formatDateDisplay(data.tanggalSurat)}</p>
            <p className="mb-2 font-bold uppercase">PEMBERI TUGAS</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Stempel Instansi)</span>
            </div>
            <p className="font-bold underline uppercase">{data.pemberiTugas.nama}</p>
            <p className="text-sm">NIP. {data.pemberiTugas.nip}</p>
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
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Tugas Dinas</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Surat Tugas</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><BookOpen size={18} className="text-blue-600" /> Editor Surat Tugas</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pemberi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pemberi' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pemberi Tugas</button>
                <button onClick={() => setActiveTab('penerima')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'penerima' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Penerima</button>
                <button onClick={() => setActiveTab('tugas')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'tugas' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Detail Tugas</button>
                <button onClick={() => setActiveTab('biaya')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'biaya' ? 'bg-white border-t-2 border-indigo-500 text-indigo-700' : 'text-slate-500 hover:bg-slate-200'}`}>Fasilitas & Biaya</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pemberi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-slate-600"/> Data Pemberi Tugas (Atasan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Instansi / Perusahaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiTugas.instansi} onChange={e => handleNestedChange('pemberiTugas', 'instansi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat / Atasan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiTugas.nama} onChange={e => handleNestedChange('pemberiTugas', 'nama', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP / NIK Atasan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiTugas.nip} onChange={e => handleNestedChange('pemberiTugas', 'nip', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Atasan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pemberiTugas.jabatan} onChange={e => handleNestedChange('pemberiTugas', 'jabatan', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kota} onChange={e => handleChange('kota', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat Tugas</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'penerima' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-emerald-600"/> Data Penerima Tugas (Bawahan)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pegawai</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTugas.nama} onChange={e => handleNestedChange('penerimaTugas', 'nama', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP / NIK Pegawai</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTugas.nip} onChange={e => handleNestedChange('penerimaTugas', 'nip', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pegawai</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTugas.jabatan} onChange={e => handleNestedChange('penerimaTugas', 'jabatan', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'tugas' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CheckCircle2 size={14} className="text-amber-600"/> Detail Penugasan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan / Uraian Tugas</label>
                            <textarea className="w-full bg-amber-50 p-3 border border-amber-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.tujuanTugas} onChange={e => handleChange('tujuanTugas', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Tujuan / Kota / Instansi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.lokasi} onChange={e => handleChange('lokasi', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Mulai Tugas</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.waktuMulai} onChange={e => handleChange('waktuMulai', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Selesai Tugas</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.waktuSelesai} onChange={e => handleChange('waktuSelesai', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'biaya' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-indigo-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <MapPin size={14} className="text-indigo-600"/> Komponen Pembiayaan
                    </h3>
                    <div className="space-y-4">
                        {data.bebanBiaya.map((b, index) => (
                            <div key={b.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative group">
                                <button onClick={() => removeBiaya(b.id)} className="absolute -top-3 -right-3 bg-red-100 text-red-500 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-colors border border-red-200" title="Hapus Biaya">
                                    X
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Biaya</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" value={b.jenis} onChange={e => handleBiayaChange(b.id, 'jenis', e.target.value)} placeholder="Contoh: Akomodasi"/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ditanggung Oleh</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={b.ditanggungOleh} onChange={e => handleBiayaChange(b.id, 'ditanggungOleh', e.target.value)} placeholder="Contoh: Perusahaan" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keterangan / Max Rate</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={b.keterangan} onChange={e => handleBiayaChange(b.id, 'keterangan', e.target.value)} placeholder="Contoh: Rp. 500.000 / hari"/>
                                </div>
                            </div>
                        ))}
                        <button onClick={addBiaya} className="w-full py-3 border-2 border-dashed border-indigo-200 text-indigo-500 font-bold text-sm uppercase rounded-xl hover:bg-indigo-50 hover:border-indigo-400 transition-colors">
                            + Tambah Komponen Biaya
                        </button>
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
              <PrintWrapper documentName={`SuratTugas_${data.penerimaTugas.nama.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
