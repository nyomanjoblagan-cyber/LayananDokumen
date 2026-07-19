'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: JualBeliTanahPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Perjanjian Jual Beli Tanah
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, Map, Banknote, ShieldCheck, GripHorizontal, Users
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LandSaleData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1 (Penjual)
  p1Name: string; p1Pob: string; p1Dob: string; p1Job: string; p1Address: string; p1Nik: string; 
  p1Spouse: string; 
  
  // Pihak 2 (Pembeli)
  p2Name: string; p2Pob: string; p2Dob: string; p2Job: string; p2Address: string; p2Nik: string;
  
  // Detail Tanah
  landCertType: string; landCertNo: string; landArea: string; landAddress: string;
  bNorth: string; bSouth: string; bEast: string; bWest: string;
  
  // Transaksi
  price: number; priceText: string;
  dp: number; dpText: string;
  paymentMethod: string;
  bankName: string;
  accountNumber: string;
  accountName: string;

  // Wanprestasi
  penaltyLateHandover: number; penaltyLateHandoverText: string;
  sellerCancelPenalty: number;
  
  // Lainnya
  handoverDate: string;
  taxBorneBy: string;
  
  // Saksi
  witness1: string; 
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LandSaleData = {
  day: 'Jumat', date: '', city: 'Sleman',
  
  p1Name: 'BAMBANG SUDARSO', p1Pob: 'Sleman', p1Dob: '1974-05-12', p1Job: 'Pensiunan PNS', p1Address: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta', p1Nik: '3404010101740001', 
  p1Spouse: 'Siti Aminah', 
  
  p2Name: 'ANDI PRATAMA', p2Pob: 'Bantul', p2Dob: '1996-08-20', p2Job: 'Wiraswasta', p2Address: 'Jl. Gejayan No. 15, Depok, Sleman', p2Nik: '3471010101960002',
  
  landCertType: 'Sertifikat Hak Milik (SHM)', landCertNo: '01234/Sardonoharjo', landArea: '500', landAddress: 'Desa Sardonoharjo, Kec. Ngaglik, Kab. Sleman',
  bNorth: 'Tanah Bapak Joko', bSouth: 'Jalan Desa (Aspal)', bEast: 'Selokan Mataram', bWest: 'Rumah Ibu Ani',
  
  price: 1500000000, priceText: 'Satu Miliar Lima Ratus Juta Rupiah',
  dp: 500000000, dpText: 'Lima Ratus Juta Rupiah',
  paymentMethod: 'Transfer Bank', bankName: 'Bank BCA', accountNumber: '846392019', accountName: 'BAMBANG SUDARSO',
  
  penaltyLateHandover: 1000000, penaltyLateHandoverText: 'Satu Juta Rupiah',
  sellerCancelPenalty: 2,

  handoverDate: '', taxBorneBy: 'Ditanggung Bersama oleh PARA PIHAK secara proporsional',
  
  witness1: 'Ketua RT 05 (Bpk Rahmat)', witness2: 'Ahmad Faisal'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function JualBeliTanahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Transaksi...</div>}>
      <LandSaleBuilder />
    </Suspense>
  );
}

function LandSaleBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<LandSaleData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'identitas' | 'tanah' | 'finansial'>('identitas');

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0], 
        day: days[today.getDay()],
        handoverDate: nextMonth.toISOString().split('T')[0]
    }));
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const handleDataChange = (field: keyof LandSaleData, val: any) => setData(prev => ({ ...prev, [field]: val }));
  
  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            day: days[today.getDay()],
            handoverDate: nextMonth.toISOString().split('T')[0]
        });
    }
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
        <div className="text-center mb-6 break-inside-avoid">
            <h1 className="font-bold text-lg uppercase underline tracking-wide">PERJANJIAN PENGIKATAN JUAL BELI TANAH</h1>
        </div>

        <p className="mb-4 text-justify">
            Perjanjian Pengikatan Jual Beli Tanah ("Perjanjian") ini dibuat dan ditandatangani pada hari ini, <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong> di <strong>{data.city}</strong>, oleh dan antara:
        </p>

        {/* PIHAK PERTAMA */}
        <div className="mb-4 ml-4 break-inside-avoid">
            <p className="font-bold mb-2 underline">PIHAK PERTAMA (PENJUAL)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
                <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1Pob}, {formatDateSafe(data.p1Dob)}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
                <div className="flex"><div className="w-40 align-top">Alamat Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p1Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Dalam hal ini bertindak untuk diri sendiri, dan telah mendapat persetujuan penuh dari suami/istrinya bernama <strong>{data.p1Spouse}</strong>. Selanjutnya disebut <strong>PIHAK PERTAMA</strong>.</p>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-6 ml-4 break-inside-avoid">
            <p className="font-bold mb-2 underline">PIHAK KEDUA (PEMBELI)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
                <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2Pob}, {formatDateSafe(data.p2Dob)}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
                <div className="flex"><div className="w-40 align-top">Alamat Lengkap</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p2Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Dalam hal ini bertindak untuk diri sendiri. Selanjutnya disebut <strong>PIHAK KEDUA</strong>.</p>
        </div>

        <p className="mb-4 text-justify">
            PARA PIHAK dengan ini menerangkan bahwa PIHAK PERTAMA sepakat untuk menjual, dan PIHAK KEDUA sepakat untuk membeli Sebidang Tanah dengan syarat dan ketentuan dalam pasal-pasal berikut:
        </p>

        {/* PASAL 1 - OBJEK */}
        <div className="mb-4 text-justify space-y-4">
            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1">Pasal 1</h3>
                <h3 className="font-bold text-center mb-2">OBJEK JUAL BELI</h3>
                <p>Objek dari perjanjian ini adalah Sebidang Tanah milik PIHAK PERTAMA dengan rincian identitas sebagai berikut:</p>
                <div className="ml-8 mt-2 space-y-1">
                    <div className="flex"><div className="w-40">Bukti Kepemilikan</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.landCertType} Nomor: {data.landCertNo}</div></div>
                    <div className="flex"><div className="w-40">Luas Tanah</div><div className="w-4">:</div><div className="flex-1">{data.landArea} Meter Persegi (m²)</div></div>
                    <div className="flex"><div className="w-40">Lokasi Tanah</div><div className="w-4">:</div><div className="flex-1">{data.landAddress}</div></div>
                </div>
                <p className="mt-2">Batas-batas tanah tersebut berbatasan dengan:</p>
                <div className="ml-8 mt-2 space-y-1">
                    <div className="flex"><div className="w-20">Utara</div><div className="w-4">:</div><div className="flex-1">{data.bNorth}</div></div>
                    <div className="flex"><div className="w-20">Selatan</div><div className="w-4">:</div><div className="flex-1">{data.bSouth}</div></div>
                    <div className="flex"><div className="w-20">Timur</div><div className="w-4">:</div><div className="flex-1">{data.bEast}</div></div>
                    <div className="flex"><div className="w-20">Barat</div><div className="w-4">:</div><div className="flex-1">{data.bWest}</div></div>
                </div>
            </div>

            {/* PASAL 2 - HARGA & PEMBAYARAN */}
            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 2</h3>
                <h3 className="font-bold text-center mb-2">HARGA DAN MEKANISME PEMBAYARAN</h3>
                <ol className="list-decimal ml-8 my-2 space-y-1">
                    <li>Harga jual beli disepakati sebesar <strong>{formatRupiah(data.price)} ({data.priceText})</strong>.</li>
                    <li>PIHAK KEDUA telah menyerahkan Uang Muka (*Down Payment*) sebesar <strong>{formatRupiah(data.dp)} ({data.dpText})</strong> pada saat penandatanganan perjanjian ini, sebagai Tanda Jadi yang sah.</li>
                    <li>Pembayaran dilakukan melalui <strong>{data.paymentMethod}</strong> ke rekening PIHAK PERTAMA: {data.bankName} No. {data.accountNumber} a.n {data.accountName}.</li>
                    <li>Sisa pembayaran wajib dilunasi paling lambat pada saat penandatanganan Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT).</li>
                </ol>
            </div>

            {/* PASAL 3 - JAMINAN */}
            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 3</h3>
                <h3 className="font-bold text-center mb-2">JAMINAN PIHAK PERTAMA</h3>
                <p>PIHAK PERTAMA menjamin sepenuhnya bahwa:</p>
                <ol className="list-decimal ml-8 my-2 space-y-1">
                    <li>Tanah tersebut adalah benar milik dan haknya sendiri, tidak ada orang/pihak lain yang turut mempunyai hak.</li>
                    <li>Tanah tersebut tidak sedang diagunkan/dijaminkan kepada pihak bank/rentenir manapun.</li>
                    <li>Tanah tersebut bebas dari sengketa, sitaan, maupun perkara hukum pengadilan.</li>
                </ol>
            </div>

            {/* PASAL 4 - PENYERAHAN */}
            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 4</h3>
                <h3 className="font-bold text-center mb-2">PENYERAHAN FISIK DAN SURAT</h3>
                <ol className="list-decimal ml-8 my-2 space-y-1">
                    <li>PIHAK PERTAMA berjanji menyerahkan fisik tanah dalam keadaan kosong beserta sertifikat asli dan seluruh surat-surat terkait selambat-lambatnya pada tanggal <strong>{formatDateSafe(data.handoverDate)}</strong>.</li>
                    <li>Keterlambatan penyerahan akan dikenakan denda kepada PIHAK PERTAMA sebesar <strong>{formatRupiah(data.penaltyLateHandover)} ({data.penaltyLateHandoverText}) per hari keterlambatan</strong> yang dipotong langsung dari sisa pembayaran pelunasan PIHAK KEDUA.</li>
                </ol>
            </div>

            {/* PASAL 5 - WANPRESTASI & PEMBATALAN */}
            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 5</h3>
                <h3 className="font-bold text-center mb-2">KLAUSUL PEMBATALAN (WANPRESTASI)</h3>
                <ol className="list-decimal ml-8 my-2 space-y-1">
                    <li>Apabila PIHAK KEDUA (Pembeli) membatalkan transaksi ini sepihak, maka Uang Muka (*DP*) yang telah dibayarkan dinyatakan HANGUS dan menjadi hak mutlak PIHAK PERTAMA.</li>
                    <li>Apabila PIHAK PERTAMA (Penjual) membatalkan transaksi ini sepihak, maka PIHAK PERTAMA wajib mengembalikan Uang Muka (*DP*) yang telah diterima dan membayar penalti sebesar <strong>{data.sellerCancelPenalty}x (kali lipat)</strong> dari jumlah Uang Muka tersebut kepada PIHAK KEDUA selambat-lambatnya 7 hari kerja.</li>
                </ol>
            </div>

            {/* PASAL 6 - PAJAK */}
            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 6</h3>
                <h3 className="font-bold text-center mb-2">PAJAK DAN BIAYA BALIK NAMA</h3>
                <p>Segala pajak, termasuk namun tidak terbatas pada Pajak Penghasilan (PPh), Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB), honorarium Notaris/PPAT, serta biaya balik nama sertifikat, akan <strong>{data.taxBorneBy}</strong>.</p>
            </div>

            {/* PASAL 7 - PENUTUP */}
            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 7</h3>
                <h3 className="font-bold text-center mb-2">PENUTUP</h3>
                <p>Demikian Perjanjian ini dibuat dalam rangkap 2 (dua), bermeterai cukup dan ditandatangani oleh PARA PIHAK tanpa ada paksaan dari pihak manapun.</p>
            </div>
        </div>

        {/* TANDA TANGAN */}
        <div className="break-inside-avoid pt-8">
            <div className="flex justify-between items-start text-center mb-8">
              <div className="w-[45%]">
                <p className="font-bold mb-2">PIHAK PERTAMA (PENJUAL)</p>
                <div className="h-6"></div>
                <div className="w-24 h-14 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <p className="font-bold underline uppercase mt-2">{data.p1Name}</p>
                <p className="mt-8 text-sm">Persetujuan Suami/Istri Penjual,</p>
                <div className="h-12"></div>
                <p className="font-bold underline uppercase text-sm">{data.p1Spouse}</p>
              </div>
              <div className="w-[45%]">
                <p className="font-bold mb-2">PIHAK KEDUA (PEMBELI)</p>
                <div className="h-6"></div>
                <div className="w-24 h-14 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <p className="font-bold underline uppercase mt-2">{data.p2Name}</p>
              </div>
            </div>
            
            <div className="mt-8 text-center border-t border-gray-400 pt-8">
              <p className="font-bold mb-6">SAKSI - SAKSI</p>
              <div className="flex justify-between">
                <div className="w-[45%]">
                    <div className="h-16"></div>
                    <p className="font-bold underline uppercase">{data.witness1}</p>
                    <p className="text-sm">Saksi I</p>
                </div>
                <div className="w-[45%]">
                    <div className="h-16"></div>
                    <p className="font-bold underline uppercase">{data.witness2}</p>
                    <p className="text-sm">Saksi II</p>
                </div>
              </div>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Perjanjian Jual Beli Tanah</h1>
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
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-rose-600" /> Editor Kontrak</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('identitas')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'identitas' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>1. Identitas</button>
                <button onClick={() => setActiveTab('tanah')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'tanah' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Lahan</button>
                <button onClick={() => setActiveTab('finansial')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'finansial' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Harga</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'identitas' && (
                <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <GripHorizontal size={14} className="text-slate-600"/> Kop Surat & Saksi
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi 1 (RT/RW)</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi 2</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> PIHAK PERTAMA (Penjual)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Suami/Istri (Wajib)</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Spouse} onChange={e => handleDataChange('p1Spouse', e.target.value)} placeholder="Untuk TTD Persetujuan" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Pob} onChange={e => handleDataChange('p1Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Dob} onChange={e => handleDataChange('p1Dob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-12 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-sky-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-sky-600"/> PIHAK KEDUA (Pembeli)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                <input className="w-full bg-sky-50 p-2.5 border border-sky-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Pob} onChange={e => handleDataChange('p2Pob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.p2Dob} onChange={e => handleDataChange('p2Dob', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-12 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'tanah' && (
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Map size={14} className="text-amber-600"/> Detail Legalitas Lahan
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Sertifikat</label>
                                <select className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.landCertType} onChange={e => handleDataChange('landCertType', e.target.value)}>
                                    <option value="Sertifikat Hak Milik (SHM)">Sertifikat Hak Milik (SHM)</option>
                                    <option value="Sertifikat Hak Guna Bangunan (SHGB)">SHGB</option>
                                    <option value="Girik / Letter C">Girik / Letter C</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Sertifikat</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.landCertNo} onChange={e => handleDataChange('landCertNo', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Luas Tanah (Meter Persegi)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lokasi Tanah</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.landAddress} onChange={e => handleDataChange('landAddress', e.target.value)} />
                        </div>
                        
                        <div className="border-t border-slate-100 pt-3">
                            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-3">Batas - Batas Lahan:</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-[10px] font-bold text-slate-500 mb-1">Sebelah Utara</label><input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm" value={data.bNorth} onChange={e => handleDataChange('bNorth', e.target.value)} /></div>
                                <div><label className="block text-[10px] font-bold text-slate-500 mb-1">Sebelah Selatan</label><input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm" value={data.bSouth} onChange={e => handleDataChange('bSouth', e.target.value)} /></div>
                                <div><label className="block text-[10px] font-bold text-slate-500 mb-1">Sebelah Timur</label><input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm" value={data.bEast} onChange={e => handleDataChange('bEast', e.target.value)} /></div>
                                <div><label className="block text-[10px] font-bold text-slate-500 mb-1">Sebelah Barat</label><input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm" value={data.bWest} onChange={e => handleDataChange('bWest', e.target.value)} /></div>
                            </div>
                        </div>
                    </div>
                 </div>
              )}

              {activeTab === 'finansial' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <Banknote size={14} className="text-emerald-600"/> Harga & Cara Bayar
                      </h3>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Harga Sepakat Jual Beli (Rp)</label>
                              <input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.price} onChange={e => handleDataChange('price', Number(e.target.value))} />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (Harga Sepakat)</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.priceText} onChange={e => handleDataChange('priceText', e.target.value)} />
                          </div>
                          
                          <div className="border-t border-slate-100 pt-4"></div>

                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Muka / Tanda Jadi (Rp)</label>
                              <input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.dp} onChange={e => handleDataChange('dp', Number(e.target.value))} />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (DP)</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.dpText} onChange={e => handleDataChange('dpText', e.target.value)} />
                          </div>

                          <div className="border-t border-slate-100 pt-4"></div>

                          <div className="grid grid-cols-2 gap-3">
                              <div className="col-span-2">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembayaran</label>
                                  <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)} placeholder="Misal: Transfer Bank / Tunai" />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Bank</label>
                                  <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.bankName} onChange={e => handleDataChange('bankName', e.target.value)} />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No Rekening</label>
                                  <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.accountNumber} onChange={e => handleDataChange('accountNumber', e.target.value)} />
                              </div>
                              <div className="col-span-2">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Atas Nama Rekening</label>
                                  <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.accountName} onChange={e => handleDataChange('accountName', e.target.value)} />
                              </div>
                          </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <ShieldCheck size={14} className="text-rose-600"/> Denda & Wanprestasi
                      </h3>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Serah Terima Fisik</label>
                              <input type="date" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.handoverDate} onChange={e => handleDataChange('handoverDate', e.target.value)} />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Biaya Pajak & Balik Nama</label>
                              <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.taxBorneBy} onChange={e => handleDataChange('taxBorneBy', e.target.value)}>
                                  <option value="Ditanggung sepenuhnya oleh PIHAK KEDUA (Pembeli)">Ditanggung Pembeli</option>
                                  <option value="Ditanggung sepenuhnya oleh PIHAK PERTAMA (Penjual)">Ditanggung Penjual</option>
                                  <option value="Ditanggung Bersama oleh PARA PIHAK secara proporsional">Ditanggung Bersama (50:50)</option>
                              </select>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Denda Telat Serah Terima (Rp/Hari)</label>
                              <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.penaltyLateHandover} onChange={e => handleDataChange('penaltyLateHandover', Number(e.target.value))} />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (Denda/Hari)</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.penaltyLateHandoverText} onChange={e => handleDataChange('penaltyLateHandoverText', e.target.value)} />
                          </div>
                      </div>
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penalti Penjual Batal Sepihak (Kali Lipat DP)</label>
                          <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.sellerCancelPenalty} onChange={e => handleDataChange('sellerCancelPenalty', Number(e.target.value))} />
                      </div>
                   </div>
                 </>
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
              <PrintWrapper documentName="Jual_Beli_Tanah" price={10000} />
           </div>

        </div>
      </main>

    </div>
  );
}
