'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: UndurDiriPendidikanPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Pengunduran Diri Sekolah/Kampus (Standar Legal/Notaris)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, GraduationCap, Building2, UserCircle2, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface WithdrawalData {
  nomorSurat: string;
  kota: string;
  tanggalSurat: string;

  namaPihak1: string;
  nikPihak1: string;
  ttlPihak1: string;
  pekerjaanPihak1: string;
  alamatPihak1: string;
  nimNisn: string;
  programStudi: string;

  namaInstansi: string;
  namaPihak2: string;
  nikPihak2: string;
  ttlPihak2: string;
  jabatanPihak2: string;
  alamatPihak2: string;

  alasanMundur: string;
  metodePenyelesaian: string;
  tanggunganPajak: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: WithdrawalData = {
  nomorSurat: '045/RES/AKD/2026',
  kota: 'DENPASAR',
  tanggalSurat: '2026-08-15', 
  
  namaPihak1: 'BAGUS RAMADHAN',
  nikPihak1: '5171020202020001',
  ttlPihak1: 'Denpasar, 15 Agustus 2002',
  pekerjaanPihak1: 'Mahasiswa',
  alamatPihak1: 'Jl. Tukad Pakerisan No. 99, Kelurahan Panjer, Kecamatan Denpasar Selatan, Kota Denpasar, Bali',
  nimNisn: '2208561001',
  programStudi: 'Fakultas Teknik / Teknologi Informasi (Semester IV)',
  
  namaInstansi: 'UNIVERSITAS UDAYANA (UNUD)',
  namaPihak2: 'PROF. DR. IR. MADE SUASTIKA, M.T.',
  nikPihak2: '19650202 199003 1 001',
  ttlPihak2: 'Gianyar, 10 Februari 1965',
  jabatanPihak2: 'Dekan Fakultas Teknik',
  alamatPihak2: 'Kampus Bukit Jimbaran, Kabupaten Badung, Bali',
  
  alasanMundur: 'Pindah domisili mengikuti orang tua ke luar kota (Jakarta) sehingga tidak memungkinkan untuk melanjutkan studi secara tatap muka secara optimal.',
  metodePenyelesaian: 'Lunas/Tunai',
  tanggunganPajak: 'Ditanggung Pihak Pertama'
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
export default function UndurDiriPendidikanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <WithdrawalBuilder />
    </Suspense>
  );
}

function WithdrawalBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pemohon' | 'instansi' | 'alasan' | 'legal'>('pemohon');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<WithdrawalData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof WithdrawalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-lg underline uppercase tracking-wider">SURAT PERNYATAAN PENGUNDURAN DIRI AKADEMIK</h1>
        <p className="font-bold uppercase mt-1">Nomor: {data.nomorSurat}</p>
      </div>

      {/* MUKADIMAH */}
      <div className="text-justify mb-4">
        <p>Pada hari ini, bertempat di <strong>{data.kota}</strong> tanggal <strong>{formatDateDisplay(data.tanggalSurat)}</strong>, yang bertanda tangan di bawah ini:</p>
      </div>

      {/* PIHAK 1 (Siswa/Mahasiswa) */}
      <div className="mb-4">
        <div className="flex mb-1">
          <div className="w-8 font-bold">I.</div>
          <div className="flex-1">
            <div className="flex"><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.namaPihak1}</div></div>
            <div className="flex"><div className="w-48">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.nikPihak1}</div></div>
            <div className="flex"><div className="w-48">NIM / NISN</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.nimNisn}</div></div>
            <div className="flex"><div className="w-48">Program Studi/Kelas</div><div className="w-4">:</div><div className="flex-1">{data.programStudi}</div></div>
            <div className="flex"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.ttlPihak1}</div></div>
            <div className="flex"><div className="w-48">Pekerjaan / Status</div><div className="w-4">:</div><div className="flex-1">{data.pekerjaanPihak1}</div></div>
            <div className="flex"><div className="w-48">Alamat Domisili</div><div className="w-4">:</div><div className="flex-1">{data.alamatPihak1}</div></div>
          </div>
        </div>
        <div className="ml-8 mt-2 text-justify">
          <p>Dalam hal ini bertindak untuk dan atas nama diri sendiri / selaku wali (orang tua) yang sah secara hukum, untuk selanjutnya disebut sebagai <strong>PIHAK PERTAMA (PEMOHON)</strong>.</p>
        </div>
      </div>

      {/* PIHAK 2 (Instansi) */}
      <div className="mb-6">
        <div className="flex mb-1">
          <div className="w-8 font-bold">II.</div>
          <div className="flex-1">
            <div className="flex"><div className="w-48">Nama Instansi</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.namaInstansi}</div></div>
            <div className="flex"><div className="w-48">Nama Pejabat/Wakil</div><div className="w-4">:</div><div className="flex-1">{data.namaPihak2}</div></div>
            <div className="flex"><div className="w-48">Jabatan (Kapasitas)</div><div className="w-4">:</div><div className="flex-1">{data.jabatanPihak2}</div></div>
            <div className="flex"><div className="w-48">Alamat Instansi</div><div className="w-4">:</div><div className="flex-1">{data.alamatPihak2}</div></div>
          </div>
        </div>
        <div className="ml-8 mt-2 text-justify">
          <p>Dalam hal ini bertindak dalam jabatannya tersebut, sah mewakili secara hukum untuk dan atas nama {data.namaInstansi}, untuk selanjutnya disebut sebagai <strong>PIHAK KEDUA (INSTANSI)</strong>.</p>
        </div>
      </div>

      {/* ISI PASAL / PERNYATAAN */}
      <div className="mb-4 text-justify">
        <p className="mb-3">PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut <strong>PARA PIHAK</strong>. PIHAK PERTAMA dengan ini menyatakan pengunduran diri secara resmi dengan ketentuan sebagai berikut:</p>
        
        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 1: Pernyataan Pengunduran Diri</h3>
        <p>Bahwa PIHAK PERTAMA secara sadar, tanpa ada paksaan dari pihak mana pun, menyatakan <strong>MENGUNDURKAN DIRI</strong> sebagai siswa/mahasiswa aktif di {data.namaInstansi} terhitung sejak tanggal surat ini ditandatangani.</p>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 2: Alasan Pengunduran Diri</h3>
        <p>Bahwa alasan utama pengunduran diri PIHAK PERTAMA adalah: <em>"{data.alasanMundur}"</em>.</p>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 3: Penyelesaian Administrasi dan Keuangan</h3>
        <p>Bahwa segala urusan administrasi, tunggakan biaya SPP, uang pangkal, atau denda perpustakaan (jika ada) akan diselesaikan secara <strong>{data.metodePenyelesaian}</strong> dan {data.tanggunganPajak}.</p>

        <h3 className="font-bold uppercase mt-4 mb-1">Pasal 4: Pembebasan Tuntutan</h3>
        <p>Bahwa setelah surat pengunduran diri ini disetujui, PIHAK PERTAMA membebaskan PIHAK KEDUA dari segala tuntutan hukum (baik perdata maupun pidana) yang berhubungan dengan status akademik PIHAK PERTAMA di masa lalu, masa kini, maupun masa yang akan datang.</p>
      </div>

      <div className="text-justify mb-8 mt-6">
        <p>Demikian Surat Pernyataan Pengunduran Diri ini dibuat rangkap 2 (dua), bermeterai cukup, dan masing-masing memiliki kekuatan hukum yang sama bagi PARA PIHAK.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-8">
        <div className="text-center w-64">
            <p className="mb-2 uppercase font-bold">PIHAK KEDUA<br/>(Menyetujui)</p>
            <div className="h-20 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Stempel / Cap Institusi)</span>
            </div>
            <p className="font-bold underline uppercase">{data.namaPihak2}</p>
            <p className="text-sm">{data.jabatanPihak2}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-2 uppercase font-bold">{data.kota}, {formatDateDisplay(data.tanggalSurat)}<br/>PIHAK PERTAMA</p>
            <div className="h-20 flex justify-center items-center">
                <div className="border border-dashed border-gray-400 text-gray-400 text-[10px] w-24 h-12 flex items-center justify-center print:hidden">Meterai 10000</div>
            </div>
            <p className="font-bold underline uppercase">{data.namaPihak1}</p>
            <p className="text-sm">Pemohon / Wali</p>
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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Resign Akademik</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><ShieldCheck size={18} className="text-emerald-600" /> Editor Akademik</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pemohon')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pemohon' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pemohon</button>
                <button onClick={() => setActiveTab('instansi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'instansi' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Instansi</button>
                <button onClick={() => setActiveTab('alasan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'alasan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Alasan</button>
                <button onClick={() => setActiveTab('legal')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'legal' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>Legal</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pemohon' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-slate-600"/> Pihak 1 (Mahasiswa/Siswa/Wali)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPihak1} onChange={e => handleChange('namaPihak1', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nikPihak1} onChange={e => handleChange('nikPihak1', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIM / NISN</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nimNisn} onChange={e => handleChange('nimNisn', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Program Studi / Kelas</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.programStudi} onChange={e => handleChange('programStudi', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan / Status</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pekerjaanPihak1} onChange={e => handleChange('pekerjaanPihak1', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">TTL</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ttlPihak1} onChange={e => handleChange('ttlPihak1', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatPihak1} onChange={e => handleChange('alamatPihak1', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'instansi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-emerald-600"/> Pihak 2 (Instansi/Kampus/Sekolah)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Instansi</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.namaInstansi} onChange={e => handleChange('namaInstansi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat / Wakil (Kepsek/Dekan)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.namaPihak2} onChange={e => handleChange('namaPihak2', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK/NIP/NIDN</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nikPihak2} onChange={e => handleChange('nikPihak2', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Wakil</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.jabatanPihak2} onChange={e => handleChange('jabatanPihak2', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir Pejabat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.ttlPihak2} onChange={e => handleChange('ttlPihak2', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Instansi</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alamatPihak2} onChange={e => handleChange('alamatPihak2', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'alasan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Edit3 size={14} className="text-amber-600"/> Alasan & Penyelesaian
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Detail Pengunduran Diri</label>
                            <textarea className="w-full bg-amber-50 p-3 border border-amber-200 rounded-xl text-sm h-28 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.alasanMundur} onChange={e => handleChange('alasanMundur', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penyelesaian Tunggakan</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.metodePenyelesaian} onChange={e => handleChange('metodePenyelesaian', e.target.value)}>
                                    <option value="Lunas/Tunai">Lunas/Tunai</option>
                                    <option value="Cicilan">Cicilan / Bertahap</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggungan / Pembebasan</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggunganPajak} onChange={e => handleChange('tanggunganPajak', e.target.value)}>
                                    <option value="Ditanggung Pihak Pertama">Ditanggung Pihak 1</option>
                                    <option value="Bebas Biaya">Dibebaskan (Beasiswa)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'legal' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldCheck size={14} className="text-blue-600"/> Data Legalitas & Surat
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Referensi Surat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.kota} onChange={e => handleChange('kota', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
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
              <PrintWrapper documentName={`Resign_Akademik_${data.namaPihak1.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
