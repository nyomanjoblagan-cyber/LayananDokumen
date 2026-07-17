'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, 
    FileText, Tag, Calculator, UserCheck, MapPin
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface DiskonData {
    namaPerusahaan: string;
    alamatPerusahaan: string;
    kontakPerusahaan: string;

    nomorSurat: string;
    tanggalSurat: string;
    perihal: string;

    namaKlien: string;
    upKlien: string;
    alamatKlien: string;

    referensiPO: string;
    namaProyek: string;

    totalNilaiPO: number;
    persentaseDiskon: number;
    catatan: string;

    namaSales: string;
    jabatanSales: string;
    namaDirektur: string;
    jabatanDirektur: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DiskonData = {
    namaPerusahaan: 'PT. DISTRIBUTOR UTAMA NASIONAL',
    alamatPerusahaan: 'Kawasan Industri Terpadu Kav. 15-20, Cikarang',
    kontakPerusahaan: 'Telp: (021) 899-7766 | Email: sales@dun.co.id',
    
    nomorSurat: '045/SALES-DUN/VII/2026',
    tanggalSurat: '13 Juli 2026',
    perihal: 'Persetujuan Pengajuan Diskon Khusus',
    
    namaKlien: 'PT. RITEL MAKMUR SENTOSA',
    upKlien: 'Bpk. Hendra Gunawan (Purchasing Manager)',
    alamatKlien: 'Jl. Boulevard Raya Blok M No. 55, Kelapa Gading, Jakarta Utara',
    
    referensiPO: 'PO-RMS-26-07-010',
    namaProyek: 'Pengadaan Elektronik Cabang Baru (Q3)',
    
    totalNilaiPO: 500000000,
    persentaseDiskon: 15,
    catatan: '1. Diskon hanya berlaku untuk skema pembayaran Tempo 30 Hari (Net 30).\n2. Keterlambatan pelunasan tagihan akan membatalkan seluruh diskon secara otomatis dan tagihan akan kembali ke nilai Normal/Gross.',

    namaSales: 'Andi Prakoso',
    jabatanSales: 'Senior Sales Executive',
    namaDirektur: 'Hariyanto Wibawa',
    jabatanDirektur: 'Sales Director'
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function DiskonTemplate() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Diskon...</div>}>
      <DiskonBuilder />
    </Suspense>
  );
}

function DiskonBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DiskonData>(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: Number(e.target.value) });
  };

  // Kalkulasi
  const nilaiDiskon = (data.totalNilaiPO * data.persentaseDiskon) / 100;
  const nilaiSetelahDiskon = data.totalNilaiPO - nilaiDiskon;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="border-b-4 border-black pb-4 mb-8 break-inside-avoid text-center">
          <h1 className="font-black text-[18pt] uppercase tracking-wider mb-1">{data.namaPerusahaan}</h1>
          <p className="text-[10pt] mb-1">{data.alamatPerusahaan}</p>
          <p className="text-[10pt]">{data.kontakPerusahaan}</p>
      </div>
      
      {/* HEADER SURAT */}
      <div className="flex justify-between mb-8 break-inside-avoid">
          <div>
              <table className="text-[11pt]">
                  <tbody>
                      <tr><td className="w-24 pb-1">Nomor</td><td className="w-4 pb-1">:</td><td className="pb-1">{data.nomorSurat}</td></tr>
                      <tr><td className="w-24 pb-1">Hal</td><td className="w-4 pb-1">:</td><td className="pb-1 font-bold underline">{data.perihal}</td></tr>
                  </tbody>
              </table>
          </div>
          <div className="text-right">
              <p>{data.tanggalSurat}</p>
          </div>
      </div>
      
      {/* TUJUAN SURAT */}
      <div className="mb-8">
          <p className="mb-1">Kepada Yth.,</p>
          <p className="font-bold">{data.upKlien}</p>
          <p className="font-bold">{data.namaKlien}</p>
          <p className="max-w-md">{data.alamatKlien}</p>
      </div>

      {/* PEMBUKAAN */}
      <div className="mb-4 text-justify">
          <p className="mb-4">Dengan hormat,</p>
          <p className="mb-4 leading-relaxed indent-8">
              Menindaklanjuti permohonan Bapak/Ibu dan mengacu pada <strong>Purchase Order (PO) Nomor: {data.referensiPO}</strong> untuk keperluan <strong>{data.namaProyek}</strong>, dengan ini Manajemen {data.namaPerusahaan} menyampaikan persetujuan pemberian Diskon Khusus.
          </p>
          <p className="mb-4 leading-relaxed indent-8">
              Adapun rincian perhitungan transaksi dan diskon yang telah disetujui oleh manajemen adalah sebagai berikut:
          </p>
      </div>

      {/* TABEL KALKULASI */}
      <div className="mb-8 px-4 break-inside-avoid">
         <table className="w-full border-2 border-black border-collapse">
            <tbody>
               <tr>
                  <td className="border border-black p-3 font-bold text-slate-800">Total Nilai PO (Gross)</td>
                  <td className="border border-black p-3 text-right font-mono font-bold">{formatCurrency(data.totalNilaiPO)}</td>
               </tr>
               <tr className="bg-gray-100">
                  <td className="border border-black p-3 font-bold italic">Special Discount ({data.persentaseDiskon}%)</td>
                  <td className="border border-black p-3 text-right font-mono font-bold text-rose-700">({formatCurrency(nilaiDiskon)})</td>
               </tr>
               <tr>
                  <td className="border border-black p-4 font-bold uppercase text-[12pt]">Total Nilai Netto (Setelah Diskon)</td>
                  <td className="border border-black p-4 text-right font-mono font-black text-[14pt]">{formatCurrency(nilaiSetelahDiskon)}</td>
               </tr>
            </tbody>
         </table>
         <p className="text-[9pt] mt-2 italic">* Total Nilai Netto di atas belum termasuk Pajak Pertambahan Nilai (PPN) 11% jika berlaku.</p>
      </div>

      {/* SYARAT DAN KETENTUAN */}
      <div className="mb-8 text-justify break-inside-avoid">
          <p className="font-bold mb-2 underline">Syarat dan Ketentuan Berlakunya Diskon:</p>
          <div className="border border-black p-4 text-[10.5pt] leading-relaxed whitespace-pre-line bg-gray-50/50">
              {data.catatan}
          </div>
      </div>

      <div className="mb-12 text-justify">
          <p className="leading-relaxed indent-8">
              Demikian surat persetujuan diskon ini kami sampaikan. Kami berharap kerjasama yang baik ini dapat terus berlanjut dan saling menguntungkan di masa mendatang. Atas perhatian dan kepercayaan Bapak/Ibu terhadap layanan kami, kami ucapkan terima kasih.
          </p>
      </div>

      {/* PENGESAHAN (TANDA TANGAN) */}
      <div className="mt-4 break-inside-avoid">
         <div className="flex justify-between text-center items-stretch mb-4">
            <div className="w-[40%] flex flex-col justify-between">
               <p className="mb-1">Diajukan Oleh,</p>
               <p className="font-bold mb-4">{data.namaPerusahaan}</p>
               <div className="h-20"></div>
               <p className="font-bold underline">{data.namaSales}</p>
               <p>{data.jabatanSales}</p>
            </div>
            <div className="w-[40%] flex flex-col justify-between relative">
               {/* Stamp (Visual Only, CSS Based) */}
               <div className="absolute left-1/2 top-14 -translate-x-1/2 w-28 h-28 border-[3px] border-slate-300 rounded-full flex flex-col items-center justify-center transform -rotate-12 opacity-80 print:opacity-100 z-0">
                  <span className="text-[7px] font-bold uppercase tracking-widest text-slate-400">{data.namaPerusahaan}</span>
                  <span className="text-[16px] font-black text-slate-500 my-1">APPROVED</span>
               </div>
               
               <p className="mb-1">Disetujui Oleh,</p>
               <p className="font-bold mb-4">{data.namaPerusahaan}</p>
               <div className="h-20 relative z-10"></div>
               <p className="font-bold underline relative z-10">{data.namaDirektur}</p>
               <p className="relative z-10">{data.jabatanDirektur}</p>
            </div>
         </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Diskon</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                LEGAL FORMAL FORMAT
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-sky-600" /> Editor Surat Diskon
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. KOP SURAT */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-amber-600"/> Perusahaan Anda (Kop Surat)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Kop)</label>
                      <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea name="alamatPerusahaan" value={data.alamatPerusahaan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak (Telp/Email)</label>
                      <input type="text" name="kontakPerusahaan" value={data.kontakPerusahaan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. DETAIL SURAT */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <FileText size={14} className="text-sky-600"/> Informasi Surat
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                      <input type="text" name="nomorSurat" value={data.nomorSurat} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                      <input type="text" name="tanggalSurat" value={data.tanggalSurat} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 3. TUJUAN KLIENT */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-emerald-600"/> Tujuan (Klien)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Klien</label>
                      <input type="text" name="namaKlien" value={data.namaKlien} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">U.P (Untuk Perhatian / Kontak Person)</label>
                      <input type="text" name="upKlien" value={data.upKlien} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Klien</label>
                      <textarea name="alamatKlien" value={data.alamatKlien} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-emerald-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 4. TRANSAKSI & DISKON */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Calculator size={14} className="text-rose-600"/> Kalkulasi Transaksi & Diskon
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Referensi PO</label>
                        <input type="text" name="referensiPO" value={data.referensiPO} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Proyek</label>
                        <input type="text" name="namaProyek" value={data.namaProyek} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nilai PO Gross (Rp)</label>
                        <input type="number" name="totalNilaiPO" value={data.totalNilaiPO} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-black text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Diskon (%)</label>
                        <input type="number" name="persentaseDiskon" value={data.persentaseDiskon} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-black text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Syarat & Ketentuan Diskon</label>
                      <textarea name="catatan" value={data.catatan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-rose-800 h-28 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 5. TANDA TANGAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCheck size={14} className="text-purple-600"/> Pengesahan (Internal)
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-[11px] text-slate-800 border-b border-slate-100 pb-1">Pemohon (Sales)</h4>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                        <input type="text" name="namaSales" value={data.namaSales} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan</label>
                        <input type="text" name="jabatanSales" value={data.jabatanSales} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-[11px] text-slate-800 border-b border-slate-100 pb-1">Penyetuju (Direktur)</h4>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                        <input type="text" name="namaDirektur" value={data.namaDirektur} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan</label>
                        <input type="text" name="jabatanDirektur" value={data.jabatanDirektur} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat Persetujuan Diskon Khusus" price={10000} />
           </div>

        </div>
      </main>
    </div>
  );
}
