import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\sk-non-bantuan\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: NonBantuanPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Perjanjian Deklarasi Mutlak Status Non-Bansos/Beasiswa
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, UserCircle2, 
  MapPin, ShieldCheck, FileWarning, Scale
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LegalData {
  pihak1Nama: string;
  pihak1Nik: string;
  pihak1TempatLahir: string;
  pihak1TanggalLahir: string;
  pihak1Pekerjaan: string;
  pihak1Alamat: string;

  pihak2Nama: string;
  pihak2Nik: string;
  pihak2TempatLahir: string;
  pihak2TanggalLahir: string;
  pihak2Pekerjaan: string;
  pihak2Alamat: string;

  kategoriBantuan: string;
  instansiTujuan: string;
  periodeBerlaku: string;
  metodePemeriksaan: string;
  sanksiPelanggaran: string;
  kotaPembuatan: string;
  tanggalPembuatan: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LegalData = {
  pihak1Nama: 'BIMA ARYA MAHENDRA',
  pihak1Nik: '3201012345678901',
  pihak1TempatLahir: 'Bogor',
  pihak1TanggalLahir: '2001-08-15',
  pihak1Pekerjaan: 'Mahasiswa',
  pihak1Alamat: 'Jl. Padjajaran No. 45, RT 02/03, Kelurahan Bantarjati, Kecamatan Bogor Utara, Kota Bogor, Jawa Barat',

  pihak2Nama: 'DR. H. AHMAD SYUKRI, M.PD.',
  pihak2Nik: '197501011999031002',
  pihak2TempatLahir: 'Jakarta',
  pihak2TanggalLahir: '1975-01-01',
  pihak2Pekerjaan: 'Kepala Bagian Kemahasiswaan',
  pihak2Alamat: 'Gedung Rektorat Lt. 2, Kampus Utama Jaya Makmur, Jakarta Selatan',

  kategoriBantuan: 'Beasiswa Pendidikan Pemerintah',
  instansiTujuan: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
  periodeBerlaku: 'Tahun Akademik 2026/2027',
  metodePemeriksaan: 'Verifikasi Silang Sistem Nasional',
  sanksiPelanggaran: 'Pengembalian Dana Penuh 100% beserta Denda 50%',
  kotaPembuatan: 'JAKARTA',
  tanggalPembuatan: '2026-06-01',
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
export default function NonBantuanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <NonBantuanBuilder />
    </Suspense>
  );
}

function NonBantuanBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pemohon' | 'pejabat' | 'legal'>('pemohon');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LegalData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof LegalData, val: any) => {
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
      <div className="text-center mb-6 break-inside-avoid">
        <h1 className="font-bold text-lg underline uppercase tracking-wider">SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK</h1>
        <p className="font-bold mt-1">TIDAK SEDANG MENERIMA BANTUAN/BEASISWA LAIN</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Yang bertanda tangan di bawah ini:</p>
      </div>

      {/* IDENTITAS */}
      <div className="mb-6 break-inside-avoid pl-4">
        <div className="flex"><div className="w-48 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.pihak1Nama}</div></div>
        <div className="flex"><div className="w-48">NIK / KTP</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pihak1Nik}</div></div>
        <div className="flex"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.pihak1TempatLahir}, {formatDateDisplay(data.pihak1TanggalLahir)}</div></div>
        <div className="flex"><div className="w-48">Pekerjaan / Status</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Pekerjaan}</div></div>
        <div className="flex"><div className="w-48">Alamat Domisili KTP</div><div className="w-4">:</div><div className="flex-1">{data.pihak1Alamat}</div></div>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p className="mb-3">Sehubungan dengan persyaratan administrasi untuk <strong>{data.instansiTujuan}</strong> pada <strong>{data.periodeBerlaku}</strong>, dengan ini menyatakan dengan sebenar-benarnya bahwa:</p>
        
        <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Saya saat ini <strong>TIDAK SEDANG MENERIMA</strong> beasiswa, ikatan dinas, atau bantuan sosial lain dalam bentuk apapun dari Instansi Pemerintah (Pusat/Daerah), BUMN/BUMD, maupun instansi swasta manapun.</li>
            <li>Segala dokumen dan data yang saya sampaikan untuk pengajuan <strong>{data.kategoriBantuan}</strong> adalah benar dan dapat dipertanggungjawabkan secara hukum.</li>
            <li>Saya bersedia tunduk terhadap pemeriksaan data oleh instansi terkait melalui metode pengawasan: <em>"{data.metodePemeriksaan}"</em>.</li>
            <li>Apabila di kemudian hari terbukti bahwa pernyataan ini tidak benar, saya bersedia menerima sanksi berupa: <strong>{data.sanksiPelanggaran}</strong> serta sanksi hukum pidana pemalsuan dokumen.</li>
        </ol>
      </div>

      {/* PEJABAT MENGETAHUI (Opsional) */}
      <div className="mb-6 mt-6 break-inside-avoid">
        <p className="mb-2">Demikian pernyataan ini dibuat dalam keadaan sadar tanpa paksaan, diketahui dan dibenarkan oleh Pejabat Berwenang / Pihak Kampus / Instansi:</p>
        <div className="pl-4">
            <div className="flex"><div className="w-48">Nama Pejabat</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.pihak2Nama}</div></div>
            <div className="flex"><div className="w-48">NIP / NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pihak2Nik}</div></div>
            <div className="flex"><div className="w-48">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.pihak2Pekerjaan}</div></div>
        </div>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-4 break-inside-avoid mt-12">
        <div className="text-center w-64">
            <p className="mb-2 uppercase font-bold">MENGETAHUI / MENGESAHKAN<br/>Pejabat Berwenang</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Stempel / Cap)</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak2Nama}</p>
            <p className="text-sm">NIP: {data.pihak2Nik}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-2 uppercase font-bold">{data.kotaPembuatan}, {formatDateDisplay(data.tanggalPembuatan)}<br/>Yang Membuat Pernyataan</p>
            <div className="h-24 flex justify-center items-center relative">
                <div className="border border-dashed border-gray-400 text-gray-400 text-[10px] w-24 h-12 flex items-center justify-center print:hidden absolute left-1/2 transform -translate-x-1/2 mt-4 z-0">Meterai 10000</div>
            </div>
            <p className="font-bold underline uppercase relative z-10">{data.pihak1Nama}</p>
            <p className="text-sm">NIK: {data.pihak1Nik}</p>
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
              <ArrowLeftCircle size={20} className="text-orange-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SK Non-Bantuan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Scale size={18} className="text-orange-600" /> Editor Legal</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pemohon')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pemohon' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pemohon</button>
                <button onClick={() => setActiveTab('pejabat')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pejabat' ? 'bg-white border-t-2 border-orange-500 text-orange-700' : 'text-slate-500 hover:bg-slate-200'}`}>Pejabat</button>
                <button onClick={() => setActiveTab('legal')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'legal' ? 'bg-white border-t-2 border-red-500 text-red-700' : 'text-slate-500 hover:bg-slate-200'}`}>Klausul</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pemohon' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-slate-600"/> Data Pembuat Pernyataan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Nama} onChange={e => handleChange('pihak1Nama', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Nik} onChange={e => handleChange('pihak1Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Pekerjaan} onChange={e => handleChange('pihak1Pekerjaan', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1TempatLahir} onChange={e => handleChange('pihak1TempatLahir', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1TanggalLahir} onChange={e => handleChange('pihak1TanggalLahir', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat KTP Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.pihak1Alamat} onChange={e => handleChange('pihak1Alamat', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pejabat' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-orange-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-orange-600"/> Data Pejabat Mengetahui
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat / Pihak Kampus</label>
                            <input className="w-full bg-orange-50 p-2.5 border border-orange-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none" value={data.pihak2Nama} onChange={e => handleChange('pihak2Nama', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP/NIK Pejabat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none" value={data.pihak2Nik} onChange={e => handleChange('pihak2Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pejabat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none" value={data.pihak2Pekerjaan} onChange={e => handleChange('pihak2Pekerjaan', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Lahir (Opsional)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none" value={data.pihak2TempatLahir} onChange={e => handleChange('pihak2TempatLahir', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir (Opsional)</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none" value={data.pihak2TanggalLahir} onChange={e => handleChange('pihak2TanggalLahir', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Instansi Pejabat</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none" value={data.pihak2Alamat} onChange={e => handleChange('pihak2Alamat', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'legal' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-red-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldCheck size={14} className="text-red-600"/> Klausul & Detail Tujuan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan Pengajuan (Bantuan/Beasiswa)</label>
                            <input className="w-full bg-red-50 p-2.5 border border-red-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.kategoriBantuan} onChange={e => handleChange('kategoriBantuan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Instansi Pemberi Bantuan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.instansiTujuan} onChange={e => handleChange('instansiTujuan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Periode Berlaku Syarat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.periodeBerlaku} onChange={e => handleChange('periodeBerlaku', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Verifikasi Hukum</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.metodePemeriksaan} onChange={e => handleChange('metodePemeriksaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sanksi Hukum/Denda Jika Berbohong</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.sanksiPelanggaran} onChange={e => handleChange('sanksiPelanggaran', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pembuatan Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.kotaPembuatan} onChange={e => handleChange('kotaPembuatan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.tanggalPembuatan} onChange={e => handleChange('tanggalPembuatan', e.target.value)} />
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
              <PrintWrapper documentName={`SK_NonBantuan_${data.pihak1Nama.replace(/\\s+/g, '_')}`} price={30000} />
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
