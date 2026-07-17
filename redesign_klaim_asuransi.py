import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\klaim-asuransi\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: SuratKlaimAsuransiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Klaim Asuransi
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, ShieldAlert, Building2, Wallet, CalendarDays, FileText
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface KlaimData {
  nomorSurat: string;
  lampiran: string;
  tanggalSurat: string;
  
  jenisAsuransi: string;
  namaPerusahaanAsuransi: string;
  alamatAsuransi: string;
  
  namaTertanggung: string;
  noPolis: string;
  noIdentitas: string;
  alamatTertanggung: string;
  noTelepon: string;
  email: string;
  
  tanggalKejadian: string;
  waktuKejadian: string;
  lokasiKejadian: string;
  penyebabKejadian: string;
  estimasiKerugian: number;
  kronologis: string;
  
  namaBank: string;
  cabangBank: string;
  noRekening: string;
  namaRekening: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: KlaimData = {
  nomorSurat: '001/KLAIM/2026',
  lampiran: '5 (Lima) Berkas',
  tanggalSurat: '2026-07-13',
  
  jenisAsuransi: 'Kendaraan Bermotor',
  namaPerusahaanAsuransi: 'PT Asuransi Maju Jaya',
  alamatAsuransi: 'Gedung Asuransi Tower, Jl. Sudirman No. 45\\nJakarta Pusat, 10220',
  
  namaTertanggung: 'Budi Santoso',
  noPolis: 'POL-9988-7766-5544',
  noIdentitas: '3171234567890001',
  alamatTertanggung: 'Jl. Merdeka Raya No. 12, Kebayoran Baru, Jakarta Selatan',
  noTelepon: '0812-3456-7890',
  email: 'budi.santoso@email.com',
  
  tanggalKejadian: '2026-07-12',
  waktuKejadian: '14:30',
  lokasiKejadian: 'Jalan Tol Dalam Kota KM 14, Jakarta',
  penyebabKejadian: 'Kecelakaan Lalu Lintas (Tabrakan Beruntun)',
  estimasiKerugian: 45000000,
  kronologis: 'Saat sedang melaju di jalur kanan dengan kecepatan 60 km/jam, kendaraan di depan mengerem mendadak sehingga menyebabkan tabrakan beruntun. Kendaraan saya mengalami kerusakan parah di bagian bumper depan dan kap mesin.',
  
  namaBank: 'Bank Central Asia (BCA)',
  cabangBank: 'KCP Sudirman',
  noRekening: '1234567890',
  namaRekening: 'Budi Santoso',
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratKlaimAsuransiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <KlaimBuilder />
    </Suspense>
  );
}

function KlaimBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<KlaimData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'surat' | 'tertanggung' | 'kejadian'>('surat');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggalSurat: today, tanggalKejadian: today }));
  }, []);

  const handleDataChange = (field: keyof KlaimData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggalSurat: today, tanggalKejadian: today });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="flex justify-between items-start mb-6 break-inside-avoid">
            <div>
                <table className="text-sm">
                    <tbody>
                        <tr><td className="w-24 font-bold">Nomor</td><td className="w-4">:</td><td>{data.nomorSurat}</td></tr>
                        <tr><td className="w-24 font-bold">Lampiran</td><td className="w-4">:</td><td>{data.lampiran}</td></tr>
                        <tr><td className="w-24 font-bold">Perihal</td><td className="w-4">:</td><td className="font-bold underline uppercase">Permohonan Klaim Asuransi {data.jenisAsuransi}</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="text-right">
                <p>{formatDateSafe(data.tanggalSurat)}</p>
            </div>
        </div>

        <div className="mb-6 break-inside-avoid">
            <p>Kepada Yth.,</p>
            <p className="font-bold uppercase">{data.namaPerusahaanAsuransi}</p>
            <div className="whitespace-pre-line">{data.alamatAsuransi}</div>
        </div>

        <p className="mb-4 text-justify">Dengan hormat,</p>
        <p className="mb-4 text-justify">Yang bertanda tangan di bawah ini, Pemegang Polis/Tertanggung:</p>

        {/* TERTANGGUNG */}
        <div className="mb-6 ml-8 break-inside-avoid">
            <div className="flex mb-1"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaTertanggung}</div></div>
            <div className="flex mb-1"><div className="w-40">Nomor Polis</div><div className="w-4">:</div><div className="flex-1 font-bold font-mono">{data.noPolis}</div></div>
            <div className="flex mb-1"><div className="w-40">Nomor KTP/Identitas</div><div className="w-4">:</div><div className="flex-1">{data.noIdentitas}</div></div>
            <div className="flex mb-1"><div className="w-40">No. Telepon / HP</div><div className="w-4">:</div><div className="flex-1">{data.noTelepon}</div></div>
            <div className="flex mb-1"><div className="w-40">Email</div><div className="w-4">:</div><div className="flex-1">{data.email}</div></div>
            <div className="flex mb-1"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.alamatTertanggung}</div></div>
        </div>

        <p className="mb-4 text-justify">Bersama surat ini, saya bermaksud untuk mengajukan klaim atas kerugian yang saya alami pada pertanggungan asuransi tersebut, dengan rincian kejadian sebagai berikut:</p>

        {/* KEJADIAN */}
        <div className="mb-6 ml-8 break-inside-avoid">
            <div className="flex mb-1"><div className="w-40">Waktu Kejadian</div><div className="w-4">:</div><div className="flex-1 font-bold">{formatDateSafe(data.tanggalKejadian)} / Jam {data.waktuKejadian}</div></div>
            <div className="flex mb-1"><div className="w-40 align-top">Lokasi Kejadian</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold text-justify">{data.lokasiKejadian}</div></div>
            <div className="flex mb-1"><div className="w-40">Penyebab</div><div className="w-4">:</div><div className="flex-1 text-rose-700 font-bold">{data.penyebabKejadian}</div></div>
            <div className="flex mb-1"><div className="w-40">Estimasi Kerugian</div><div className="w-4">:</div><div className="flex-1 font-bold">{formatCurrency(data.estimasiKerugian)}</div></div>
            <div className="flex mt-2"><div className="w-40 align-top">Kronologis Singkat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.kronologis}</div></div>
        </div>

        <p className="mb-4 text-justify">
            Sebagai kelengkapan administrasi pengajuan klaim ini, turut saya lampirkan dokumen-dokumen pendukung sesuai dengan persyaratan yang tercantum dalam polis.
        </p>

        <p className="mb-4 text-justify">
            Apabila klaim ini disetujui, mohon pembayaran ganti rugi dapat ditransfer ke rekening:
        </p>

        {/* REKENING */}
        <div className="mb-8 ml-8 break-inside-avoid">
            <div className="flex mb-1"><div className="w-40">Nama Bank</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaBank}</div></div>
            <div className="flex mb-1"><div className="w-40">Kantor Cabang</div><div className="w-4">:</div><div className="flex-1">{data.cabangBank}</div></div>
            <div className="flex mb-1"><div className="w-40">Nomor Rekening</div><div className="w-4">:</div><div className="flex-1 font-bold font-mono text-lg">{data.noRekening}</div></div>
            <div className="flex mb-1"><div className="w-40">Atas Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaRekening}</div></div>
        </div>

        <p className="mb-12 text-justify">
            Demikian surat permohonan klaim ini saya buat dengan sebenar-benarnya dan tanpa paksaan dari pihak manapun. Atas perhatian dan kerja sama yang baik, saya ucapkan terima kasih.
        </p>

        {/* TANDA TANGAN */}
        <div className="flex justify-end text-center break-inside-avoid">
            <div className="w-64">
                <p className="mb-2">Hormat saya,<br/>Tertanggung,</p>
                <div className="h-6"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-2"></div>
                <p className="font-bold underline uppercase mt-2">{data.namaTertanggung}</p>
                <p className="text-sm">Polis: {data.noPolis}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Formulir Klaim Asuransi</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[580px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-rose-600" /> Data Klaim</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'surat' ? 'bg-white border-t-2 border-slate-500 text-slate-700' : 'text-slate-500 hover:bg-slate-200'}`}>1. Surat & Asuransi</button>
                <button onClick={() => setActiveTab('tertanggung')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'tertanggung' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Tertanggung & Bank</button>
                <button onClick={() => setActiveTab('kejadian')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kejadian' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Kejadian</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'surat' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-600">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Data Surat Pengantar
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.nomorSurat} onChange={e => handleDataChange('nomorSurat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lampiran</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.lampiran} onChange={e => handleDataChange('lampiran', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                        </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-emerald-600"/> Perusahaan Asuransi Tujuan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Asuransi (Perihal)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.jenisAsuransi} onChange={e => handleDataChange('jenisAsuransi', e.target.value)} placeholder="Misal: Kendaraan Bermotor, Jiwa, Kesehatan" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Asuransi</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.namaPerusahaanAsuransi} onChange={e => handleDataChange('namaPerusahaanAsuransi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Kantor Asuransi</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alamatAsuransi} onChange={e => handleDataChange('alamatAsuransi', e.target.value)} />
                        </div>
                    </div>
                  </div>
                  </>
              )}

              {activeTab === 'tertanggung' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Data Tertanggung (Pemohon)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Tertanggung Sesuai Polis</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.namaTertanggung} onChange={e => handleDataChange('namaTertanggung', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Polis</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.noPolis} onChange={e => handleDataChange('noPolis', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Identitas (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.noIdentitas} onChange={e => handleDataChange('noIdentitas', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / HP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.noTelepon} onChange={e => handleDataChange('noTelepon', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.email} onChange={e => handleDataChange('email', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.alamatTertanggung} onChange={e => handleDataChange('alamatTertanggung', e.target.value)} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Wallet size={14} className="text-amber-600"/> Data Rekening Penerima
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Bank</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.namaBank} onChange={e => handleDataChange('namaBank', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kantor Cabang</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.cabangBank} onChange={e => handleDataChange('cabangBank', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Rekening</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.noRekening} onChange={e => handleDataChange('noRekening', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Atas Nama Rekening</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.namaRekening} onChange={e => handleDataChange('namaRekening', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
                  </>
              )}

              {activeTab === 'kejadian' && (
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldAlert size={14} className="text-rose-600"/> Data Kejadian Klaim
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Kejadian</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.tanggalKejadian} onChange={e => handleDataChange('tanggalKejadian', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Waktu Kejadian (Jam)</label>
                                <input type="time" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.waktuKejadian} onChange={e => handleDataChange('waktuKejadian', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penyebab Kejadian Utama</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-rose-700 font-bold" value={data.penyebabKejadian} onChange={e => handleDataChange('penyebabKejadian', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Kejadian</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none uppercase" value={data.lokasiKejadian} onChange={e => handleDataChange('lokasiKejadian', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Estimasi Total Kerugian (Rp)</label>
                            <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.estimasiKerugian} onChange={e => handleDataChange('estimasiKerugian', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kronologis Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed" value={data.kronologis} onChange={e => handleDataChange('kronologis', e.target.value)} placeholder="Ceritakan bagaimana kejadian terjadi secara rinci..." />
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
              <PrintWrapper documentName="Klaim_Asuransi" price={15000} />
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
