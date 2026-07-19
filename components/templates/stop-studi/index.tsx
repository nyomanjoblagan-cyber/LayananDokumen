'use client';

/**
 * FILE: StopStudiPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Permohonan Pengunduran Diri (Stop Studi) / Cuti Akademik
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw,
  GraduationCap, BookOpen, UserMinus, Building2, UserCircle2
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface StopStudiData {
  tempatTanggal: string;
  hal: string;
  
  tujuan: string;
  namaKampus: string;
  alamatKampus: string;
  
  namaMahasiswa: string;
  nim: string;
  programStudi: string;
  semester: string;
  ipk: string;
  alamatMahasiswa: string;
  noTelp: string;
  email: string;
  
  alasan: string;
  
  namaOrtu: string;
  pekerjaanOrtu: string;
  
  namaDPA: string;
  namaKaprodi: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: StopStudiData = {
  tempatTanggal: 'Yogyakarta, 13 Juli 2026',
  hal: 'Permohonan Pengunduran Diri (Stop Studi)',
  
  tujuan: 'Dekan Fakultas Ilmu Komputer',
  namaKampus: 'Universitas Teknologi Nusantara',
  alamatKampus: 'Jl. Pendidikan No. 123, Yogyakarta',
  
  namaMahasiswa: 'Ahmad Fauzi',
  nim: '2022105001',
  programStudi: 'S1 Teknik Informatika',
  semester: '8 (Delapan)',
  ipk: '3.45',
  alamatMahasiswa: 'Jl. Kaliurang KM 5 No. 10, Sleman, Yogyakarta',
  noTelp: '0812-9876-5432',
  email: 'fauzi.ahmad@student.utn.ac.id',
  
  alasan: 'Diterima bekerja sebagai Pegawai Negeri Sipil (PNS) di instansi pemerintahan yang mewajibkan ikatan dinas penuh waktu dan tidak mengizinkan status mahasiswa aktif.',
  
  namaOrtu: 'Budi Santoso',
  pekerjaanOrtu: 'Wiraswasta',
  
  namaDPA: 'Dr. Ir. Hendra Wijaya, M.Kom.',
  namaKaprodi: 'Siti Aminah, S.T., M.Cs.'
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
export default function StopStudiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Stop Studi...</div>}>
      <StopStudiBuilder />
    </Suspense>
  );
}

function StopStudiBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'kampus' | 'mahasiswa' | 'alasan'>('kampus');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<StopStudiData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof StopStudiData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* META SURAT */}
      <div className="flex justify-between items-start mb-6 break-inside-avoid">
        <div>
            <p className="mb-1">Hal : <strong>{data.hal}</strong></p>
        </div>
        <div className="text-right">
            <p>{data.tempatTanggal}</p>
        </div>
      </div>

      <div className="mb-8 break-inside-avoid">
        <p>Yth.</p>
        <p className="font-bold">{data.tujuan}</p>
        <p className="font-bold">{data.namaKampus}</p>
        <p>{data.alamatKampus}</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Dengan hormat,</p>
        <p>Saya yang bertanda tangan di bawah ini:</p>
      </div>

      {/* DATA MAHASISWA */}
      <div className="mb-6 break-inside-avoid pl-8 border-l-2 border-black ml-4">
        <div className="flex mb-1"><div className="w-32">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaMahasiswa}</div></div>
        <div className="flex mb-1"><div className="w-32">NIM / NPM</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.nim}</div></div>
        <div className="flex mb-1"><div className="w-32">Program Studi</div><div className="w-4">:</div><div className="flex-1">{data.programStudi}</div></div>
        <div className="flex mb-1"><div className="w-32">Semester</div><div className="w-4">:</div><div className="flex-1">{data.semester}</div></div>
        <div className="flex mb-1"><div className="w-32">IPK Terakhir</div><div className="w-4">:</div><div className="flex-1">{data.ipk}</div></div>
        <div className="flex mb-1"><div className="w-32">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.alamatMahasiswa}</div></div>
        <div className="flex mb-1"><div className="w-32">No. HP / Email</div><div className="w-4">:</div><div className="flex-1">{data.noTelp} / {data.email}</div></div>
      </div>

      <div className="mb-6 text-justify break-inside-avoid">
        <p className="mb-2">Bersama surat ini bermaksud untuk mengajukan permohonan <strong>Pengunduran Diri (Stop Studi)</strong> sebagai mahasiswa {data.namaKampus}, dikarenakan:</p>
        <div className="pl-4 italic text-justify leading-relaxed">
            "{data.alasan}"
        </div>
      </div>

      <div className="text-justify mb-8 break-inside-avoid">
        <p>Demikian surat permohonan ini saya buat dengan kesadaran penuh, tanpa ada unsur paksaan dari pihak manapun, serta telah berdiskusi dan mendapatkan persetujuan dari Orang Tua/Wali.</p>
        <p className="mt-2">Atas perhatian, bimbingan, serta ilmu yang telah diberikan selama ini, saya mengucapkan banyak terima kasih.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-8 mb-8">
        <div className="text-center w-64">
            <p className="mb-2 uppercase">Mengetahui,<br/>Orang Tua / Wali</p>
            <div className="h-20 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">{data.namaOrtu}</p>
            <p className="text-sm">{data.pekerjaanOrtu}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-2 uppercase">Pemohon,<br/>Mahasiswa</p>
            <div className="h-20 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Materai Rp10.000)</span>
            </div>
            <p className="font-bold underline uppercase">{data.namaMahasiswa}</p>
            <p className="text-sm">NIM. {data.nim}</p>
        </div>
      </div>

      <div className="flex justify-between px-4 break-inside-avoid">
        <div className="text-center w-64">
            <p className="mb-2 uppercase">Menyetujui,<br/>Dosen Pembimbing Akademik</p>
            <div className="h-20 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">{data.namaDPA}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-2 uppercase">Mengetahui,<br/>Ketua Program Studi</p>
            <div className="h-20 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">{data.namaKaprodi}</p>
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
              <ArrowLeftCircle size={20} className="text-rose-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Stop Studi Akademik</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><GraduationCap size={18} className="text-rose-600" /> Editor Akademik</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('kampus')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kampus' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Tujuan</button>
                <button onClick={() => setActiveTab('mahasiswa')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'mahasiswa' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Mahasiswa</button>
                <button onClick={() => setActiveTab('alasan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'alasan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Alasan & TTD</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'kampus' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Tujuan Kampus
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan (Kepada Yth.)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tujuan} onChange={e => handleChange('tujuan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kampus / Universitas</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaKampus} onChange={e => handleChange('namaKampus', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Kampus</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatKampus} onChange={e => handleChange('alamatKampus', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hal Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.hal} onChange={e => handleChange('hal', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat & Tanggal</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tempatTanggal} onChange={e => handleChange('tempatTanggal', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'mahasiswa' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-emerald-600"/> Data Mahasiswa
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Mahasiswa</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.namaMahasiswa} onChange={e => handleChange('namaMahasiswa', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIM / NPM</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nim} onChange={e => handleChange('nim', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Program Studi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.programStudi} onChange={e => handleChange('programStudi', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Semester</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.semester} onChange={e => handleChange('semester', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">IPK</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.ipk} onChange={e => handleChange('ipk', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor HP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.noTelp} onChange={e => handleChange('noTelp', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.email} onChange={e => handleChange('email', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Mahasiswa</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alamatMahasiswa} onChange={e => handleChange('alamatMahasiswa', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'alasan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <BookOpen size={14} className="text-amber-600"/> Alasan & Pengesahan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Pengunduran Diri</label>
                            <textarea className="w-full bg-amber-50 p-3 border border-amber-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.alasan} onChange={e => handleChange('alasan', e.target.value)} />
                        </div>
                        
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Data Orang Tua / Wali</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Ortu/Wali</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaOrtu} onChange={e => handleChange('namaOrtu', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.pekerjaanOrtu} onChange={e => handleChange('pekerjaanOrtu', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Pejabat Pengesahan (Opsional)</h4>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Dosen Pembimbing (DPA)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaDPA} onChange={e => handleChange('namaDPA', e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Ketua Program Studi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaKaprodi} onChange={e => handleChange('namaKaprodi', e.target.value)} />
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
              <PrintWrapper documentName={`StopStudi_${data.namaMahasiswa.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
