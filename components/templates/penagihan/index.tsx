'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: PenagihanPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Penagihan / Invoice / Somasi Pembayaran
 */

import React, { useState, Suspense, useEffect } from 'react';
import { Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, User, FileText, Banknote, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PenagihanData {
  // Header Surat
  nomorSurat: string;
  tanggalSurat: string;
  lampiran: string;
  sifatSurat: string;
  perihal: string;
  
  // Data Perusahaan Pengirim
  namaPengirim: string;
  alamatPengirim: string;
  teleponPengirim: string;
  emailPengirim: string;
  websitePengirim: string;

  // Data Klien / Penerima
  namaKlien: string;
  upKlien: string;
  alamatKlien: string;
  
  // Rincian Tagihan & Kontrak
  nomorKontrak: string;
  tanggalKontrak: string;
  nomorInvoice: string;
  tanggalInvoice: string;
  jatuhTempo: string;
  nilaiPokok: number;
  persentaseDenda: number;
  hariKeterlambatan: number;
  biayaAdmin: number;
  
  // Rekening Pembayaran
  namaBank: string;
  cabangBank: string;
  namaRekening: string;
  nomorRekening: string;
  
  // Pejabat Berwenang
  namaPejabat: string;
  jabatanPejabat: string;

  // Tembusan
  tembusan1: string;
  tembusan2: string;
}

const INITIAL_DATA: PenagihanData = {
  nomorSurat: '045/LGL-COLL/VIII/2026',
  tanggalSurat: '2026-08-01',
  lampiran: '1 (satu) Berkas - Rincian Transaksi',
  sifatSurat: 'PENTING DAN SEGERA',
  perihal: 'SOMASI I (PERTAMA) - PERINGATAN JATUH TEMPO PEMBAYARAN',
  
  namaPengirim: 'PT. KARYA CIPTA TEKNOLOGI NUSANTARA',
  alamatPengirim: 'Gedung Sudirman Tower Lt. 21, Jl. Jend. Sudirman Kav. 86, Jakarta Selatan 12920',
  teleponPengirim: '(021) 2988-1234',
  emailPengirim: 'legal.collection@kctn.co.id',
  websitePengirim: 'www.kctn.co.id',

  namaKlien: 'PT. MAJU BERSAMA TECHNOLOGY',
  upKlien: 'Bpk. Budi Santoso - Direktur Utama',
  alamatKlien: 'Kawasan Industri Pulogadung, Jl. Rawa Bali II No. 5, Jakarta Timur 13920',
  
  nomorKontrak: 'PKS-012/KCTN-MBT/I/2026',
  tanggalKontrak: '2026-01-10',
  nomorInvoice: 'INV-2026-05-089',
  tanggalInvoice: '2026-05-15',
  jatuhTempo: '2026-06-14',
  nilaiPokok: 250000000,
  persentaseDenda: 0.2, // 0.2% per hari
  hariKeterlambatan: 29, 
  biayaAdmin: 1500000,
  
  namaBank: 'Bank Mandiri (Persero) Tbk.',
  cabangBank: 'KCP Jakarta Sudirman',
  namaRekening: 'PT. KARYA CIPTA TEKNOLOGI NUSANTARA',
  nomorRekening: '122-00-9876543-2',
  
  namaPejabat: 'Dr. Hendra Wijaya, S.H., M.H.',
  jabatanPejabat: 'Head of Legal & Collections',

  tembusan1: 'Direktur Keuangan PT. KARYA CIPTA TEKNOLOGI NUSANTARA',
  tembusan2: 'Arsip'
};

// --- 2. ATURAN KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[10.5pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 3. KOMPONEN UTAMA ---
export default function PenagihanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Penagihan...</div>}>
      <PenagihanBuilder />
    </Suspense>
  );
}

function PenagihanBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pengirim' | 'klien' | 'tagihan' | 'bank'>('pengirim');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<PenagihanData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggalSurat: today }));
  }, []);

  const handleChange = (field: keyof PenagihanData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggalSurat: today });
    }
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  // Kalkulasi Otomatis
  const nilaiDenda = Math.round(data.nilaiPokok * (data.persentaseDenda / 100) * data.hariKeterlambatan);
  const totalTagihan = data.nilaiPokok + nilaiDenda + data.biayaAdmin;

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } catch { return dateString; }
    };

    return (
      <Kertas>
        {/* KOP SURAT */}
        <div className="text-center border-b-[3px] border-double border-slate-900 pb-4 mb-6 relative">
            <h1 className="font-black uppercase text-2xl tracking-widest text-slate-900">{data.namaPengirim}</h1>
            <p className="text-[10pt] mt-1">{data.alamatPengirim}</p>
            <p className="text-[9pt] font-sans mt-1">Telp: {data.teleponPengirim} | Email: {data.emailPengirim} | Web: {data.websitePengirim}</p>
        </div>

        {/* METADATA SURAT */}
        <div className="flex justify-between mb-8 break-inside-avoid">
            <div>
                <table className="text-[10pt]">
                    <tbody>
                        <tr><td className="w-20 align-top">Nomor</td><td className="w-4 align-top">:</td><td>{data.nomorSurat}</td></tr>
                        <tr><td className="w-20 align-top">Sifat</td><td className="w-4 align-top">:</td><td className="font-bold underline">{data.sifatSurat}</td></tr>
                        <tr><td className="w-20 align-top">Lampiran</td><td className="w-4 align-top">:</td><td>{data.lampiran}</td></tr>
                        <tr><td className="w-20 align-top">Perihal</td><td className="w-4 align-top">:</td><td className="font-bold uppercase tracking-wider">{data.perihal}</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="text-right">
                <p>{formatDateSafe(data.tanggalSurat)}</p>
            </div>
        </div>

        {/* TUJUAN */}
        <div className="mb-6">
            <p>Kepada Yth,</p>
            <p className="font-bold uppercase">{data.namaKlien}</p>
            <p className="font-bold underline">U.P: {data.upKlien}</p>
            <p className="w-1/2">{data.alamatKlien}</p>
            <p className="mt-2">di -</p>
            <p className="ml-4 font-bold">Tempat</p>
        </div>

        <div className="mb-4 text-justify">
            <p>Dengan hormat,</p>
            <p className="mt-2 indent-8">
                Merujuk pada Perjanjian Kerja Sama Nomor: <strong>{data.nomorKontrak}</strong> tanggal <strong>{formatDateSafe(data.tanggalKontrak)}</strong> antara {data.namaPengirim} dengan {data.namaKlien}, 
                bersama surat ini kami ingin menyampaikan teguran keras sekaligus menagih kewajiban pembayaran yang telah jatuh tempo.
            </p>
            <p className="mt-2 indent-8">
                Berdasarkan catatan keuangan kami, Saudara masih memiliki kewajiban yang belum diselesaikan atas Tagihan (Invoice) Nomor: <strong>{data.nomorInvoice}</strong> tertanggal <strong>{formatDateSafe(data.tanggalInvoice)}</strong> 
                dengan batas akhir pembayaran (jatuh tempo) pada <strong>{formatDateSafe(data.jatuhTempo)}</strong>.
            </p>
        </div>

        {/* RINCIAN TAGIHAN */}
        <div className="mb-6 px-8">
            <p className="font-bold mb-2">Adapun rincian tagihan beserta sanksi denda keterlambatan adalah sebagai berikut:</p>
            <table className="w-full border-collapse border border-slate-400 text-[10pt]">
                <tbody>
                    <tr className="border border-slate-400">
                        <td className="border border-slate-400 p-2 w-10 text-center bg-slate-100">1</td>
                        <td className="border border-slate-400 p-2">Pokok Tagihan (Invoice: {data.nomorInvoice})</td>
                        <td className="border border-slate-400 p-2 text-right font-mono">{formatRupiah(data.nilaiPokok)}</td>
                    </tr>
                    <tr className="border border-slate-400">
                        <td className="border border-slate-400 p-2 w-10 text-center bg-slate-100">2</td>
                        <td className="border border-slate-400 p-2">Denda Keterlambatan ({data.persentaseDenda}% x {data.hariKeterlambatan} Hari)</td>
                        <td className="border border-slate-400 p-2 text-right font-mono text-rose-700">{formatRupiah(nilaiDenda)}</td>
                    </tr>
                    <tr className="border border-slate-400">
                        <td className="border border-slate-400 p-2 w-10 text-center bg-slate-100">3</td>
                        <td className="border border-slate-400 p-2">Biaya Administrasi & Penagihan</td>
                        <td className="border border-slate-400 p-2 text-right font-mono">{formatRupiah(data.biayaAdmin)}</td>
                    </tr>
                    <tr className="border border-slate-400 bg-slate-200 font-bold">
                        <td colSpan={2} className="border border-slate-400 p-2 text-right uppercase tracking-wider">Total Tagihan Keseluruhan</td>
                        <td className="border border-slate-400 p-2 text-right font-mono text-lg">{formatRupiah(totalTagihan)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="mb-6 text-justify">
            <p className="indent-8">
                Kami meminta Saudara untuk segera melakukan pelunasan Total Tagihan sebesar <strong>{formatRupiah(totalTagihan)}</strong> selambat-lambatnya 
                dalam waktu <strong>3 (tiga) hari kerja</strong> sejak diterimanya surat ini, melalui transfer bank ke rekening operasional kami:
            </p>
        </div>

        {/* BANK */}
        <div className="mb-6 ml-8 p-4 border border-slate-300 bg-slate-50">
            <table className="font-bold text-[10pt]">
                <tbody>
                    <tr><td className="w-32">Nama Bank</td><td className="w-4">:</td><td className="uppercase">{data.namaBank} {data.cabangBank}</td></tr>
                    <tr><td>Nama Rekening</td><td>:</td><td className="uppercase">{data.namaRekening}</td></tr>
                    <tr><td>Nomor Rekening</td><td>:</td><td className="font-mono text-lg">{data.nomorRekening}</td></tr>
                </tbody>
            </table>
        </div>

        <div className="mb-8 text-justify">
            <p className="indent-8 font-bold text-rose-800 print:text-black">
                Apabila dalam batas waktu yang telah ditentukan Saudara tidak juga melakukan pelunasan atau menunjukkan iktikad baik, 
                maka kami selaku kuasa hukum/departemen legal berhak melakukan tindakan hukum lebih lanjut, baik secara Perdata (Gugatan Wanprestasi) 
                maupun Pidana, serta melaporkan rekam jejak perusahaan Saudara ke otoritas pengawasan kredit terkait tanpa pemberitahuan lebih lanjut.
            </p>
            <p className="mt-2 indent-8">
                Demikian surat somasi dan penagihan ini kami sampaikan agar menjadi perhatian serius. Atas kerja samanya, kami ucapkan terima kasih.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-end text-center break-inside-avoid pr-8">
            <div className="w-80">
                <p className="mb-2 uppercase">Hormat Kami,</p>
                <p className="font-bold uppercase mb-20">{data.namaPengirim}</p>
                <p className="font-bold underline uppercase">{data.namaPejabat}</p>
                <p className="text-sm">{data.jabatanPejabat}</p>
            </div>
        </div>

        {/* TEMBUSAN */}
        <div className="mt-12 text-[9pt]">
            <p className="font-bold underline mb-1">Tembusan:</p>
            <ol className="list-decimal list-inside pl-2">
                <li>{data.tembusan1}</li>
                <li>{data.tembusan2}</li>
            </ol>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Penagihan / Somasi</h1>
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
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-rose-600" /> Form Penagihan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pengirim')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pengirim' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Pengirim</button>
                <button onClick={() => setActiveTab('klien')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'klien' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Klien</button>
                <button onClick={() => setActiveTab('tagihan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'tagihan' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Nominal & Denda</button>
                <button onClick={() => setActiveTab('bank')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'bank' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Pembayaran</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pengirim' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Perusahaan / Kreditor
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Kop Surat)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPengirim} onChange={e => handleChange('namaPengirim', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatPengirim} onChange={e => handleChange('alamatPengirim', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Telepon</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.teleponPengirim} onChange={e => handleChange('teleponPengirim', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.emailPengirim} onChange={e => handleChange('emailPengirim', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat Penagihan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama TTD (Manajer/Direktur)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPejabat} onChange={e => handleChange('namaPejabat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan (TTD)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.jabatanPejabat} onChange={e => handleChange('jabatanPejabat', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'klien' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-blue-600"/> Data Debitur / Klien
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Klien (Penerima)</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.namaKlien} onChange={e => handleChange('namaKlien', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">U.P. (Untuk Perhatian / Person in Charge)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.upKlien} onChange={e => handleChange('upKlien', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap Klien</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.alamatKlien} onChange={e => handleChange('alamatKlien', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'tagihan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <AlertTriangle size={14} className="text-rose-600"/> Rincian Nominal & Keterlambatan
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Kontrak / SPK Dasar</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.nomorKontrak} onChange={e => handleChange('nomorKontrak', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Kontrak</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.tanggalKontrak} onChange={e => handleChange('tanggalKontrak', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Invoice Tertunggak</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.nomorInvoice} onChange={e => handleChange('nomorInvoice', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Invoice & Jatuh Tempo</label>
                                <div className="flex gap-2">
                                    <input type="date" title="Tgl Invoice" className="w-1/2 bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.tanggalInvoice} onChange={e => handleChange('tanggalInvoice', e.target.value)} />
                                    <input type="date" title="Jatuh Tempo" className="w-1/2 bg-rose-50 p-2.5 border border-rose-200 text-rose-900 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.jatuhTempo} onChange={e => handleChange('jatuhTempo', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="border border-rose-200 p-4 rounded-xl bg-rose-50 space-y-3">
                            <div>
                                <label className="block text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-1.5">Pokok Tagihan (Tanpa Denda)</label>
                                <div className="flex bg-white rounded-xl border border-rose-200 overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 shadow-inner">
                                    <div className="px-4 py-3 bg-rose-100 font-black text-rose-800 border-r border-rose-200">Rp</div>
                                    <input type="number" className="w-full p-3 text-lg font-mono font-bold text-rose-900 outline-none" value={data.nilaiPokok} onChange={e => handleChange('nilaiPokok', Number(e.target.value))} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-1.5">Bunga Denda (%) per Hari</label>
                                    <div className="flex bg-white rounded-xl border border-rose-200 overflow-hidden focus-within:ring-2 focus-within:ring-rose-500">
                                        <input type="number" step="0.1" className="w-full p-2.5 text-sm font-mono text-rose-900 outline-none" value={data.persentaseDenda} onChange={e => handleChange('persentaseDenda', Number(e.target.value))} />
                                        <div className="px-3 py-2.5 bg-rose-100 text-rose-800 font-bold border-l border-rose-200">%</div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-1.5">Total Hari Terlambat</label>
                                    <div className="flex bg-white rounded-xl border border-rose-200 overflow-hidden focus-within:ring-2 focus-within:ring-rose-500">
                                        <input type="number" className="w-full p-2.5 text-sm font-mono text-rose-900 outline-none" value={data.hariKeterlambatan} onChange={e => handleChange('hariKeterlambatan', Number(e.target.value))} />
                                        <div className="px-3 py-2.5 bg-rose-100 text-rose-800 font-bold border-l border-rose-200">Hari</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-1.5">Biaya Admin / Legal (Opsional)</label>
                                <div className="flex bg-white rounded-xl border border-rose-200 overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 shadow-inner">
                                    <div className="px-3 py-2 bg-rose-100 font-black text-rose-800 border-r border-rose-200">Rp</div>
                                    <input type="number" className="w-full p-2 text-sm font-mono font-bold text-rose-900 outline-none" value={data.biayaAdmin} onChange={e => handleChange('biayaAdmin', Number(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'bank' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Banknote size={14} className="text-amber-600"/> Instruksi Pembayaran Bank
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Bank</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaBank} onChange={e => handleChange('namaBank', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kantor Cabang</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.cabangBank} onChange={e => handleChange('cabangBank', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pemilik Rekening (A.N)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaRekening} onChange={e => handleChange('namaRekening', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Rekening Tujuan</label>
                            <input className="w-full bg-amber-50 text-amber-900 p-4 border border-amber-200 rounded-xl text-2xl font-black font-mono tracking-widest focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-center shadow-inner" value={data.nomorRekening} onChange={e => handleChange('nomorRekening', e.target.value)} />
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
              <PrintWrapper documentName={`Somasi_Penagihan_${data.namaKlien.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
