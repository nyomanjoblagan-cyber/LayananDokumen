'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: JualBeliKendaraanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Surat Perjanjian Jual Beli Kendaraan Bermotor
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  UserCircle2, Car, Banknote, ShieldCheck, FileText
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SaleData {
  day: string; date: string; city: string;
  p1Name: string; p1Nik: string; p1BirthPlace: string; p1BirthDate: string; p1Job: string; p1Address: string;
  p2Name: string; p2Nik: string; p2BirthPlace: string; p2BirthDate: string; p2Job: string; p2Address: string;
  brand: string; type: string; year: string; color: string; nopol: string;
  frameNo: string; engineNo: string; bpkbNo: string;
  price: number; priceText: string; 
  paymentMethod: string; 
  paymentDetails: string;
  downPayment: number; downPaymentText: string;
  latePenaltyPerDay: number; latePenaltyText: string;
  taxObligation: string;
  witness1: string; witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SaleData = {
  day: 'Senin', date: '', city: 'JAKARTA SELATAN',
  p1Name: 'AGUS SETIAWAN', p1Nik: '3174010101850001', p1BirthPlace: 'Jakarta', p1BirthDate: '1985-01-01', p1Job: 'Karyawan Swasta', p1Address: 'Jl. Fatmawati No. 10, RT 001 RW 002, Kel. Cilandak Barat, Kec. Cilandak, Jakarta Selatan',
  p2Name: 'DONI PRATAMA', p2Nik: '3674010101900002', p2BirthPlace: 'Tangerang', p2BirthDate: '1990-02-02', p2Job: 'Wiraswasta', p2Address: 'Jl. Bintaro Utama Sektor 5, RT 003 RW 004, Kel. Jurang Mangu Timur, Kec. Pondok Aren, Tangerang Selatan',
  brand: 'Toyota', type: 'Avanza Veloz 1.5 AT', year: '2019', color: 'Putih Metalik', nopol: 'B 1234 ABC',
  frameNo: 'MHF1234567890', engineNo: '1NR-FE-123456', bpkbNo: 'N-12345678',
  price: 185000000, priceText: 'Seratus Delapan Puluh Lima Juta Rupiah', 
  paymentMethod: 'Transfer Bank', paymentDetails: 'Transfer ke Rekening BCA No. 1234567890 a.n AGUS SETIAWAN',
  downPayment: 10000000, downPaymentText: 'Sepuluh Juta Rupiah',
  latePenaltyPerDay: 500000, latePenaltyText: 'Lima Ratus Ribu Rupiah',
  taxObligation: 'Pihak Kedua (Pembeli)',
  witness1: 'Iwan', witness2: 'Santi'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function JualBeliKendaraanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Transaksi...</div>}>
      <VehicleSaleBuilder />
    </Suspense>
  );
}

function VehicleSaleBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<SaleData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'identitas' | 'kendaraan' | 'finansial'>('identitas');

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[today.getDay()];
    const dateString = today.toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: dateString, day: dayName }));
  }, []);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const handleDataChange = (field: keyof SaleData, val: any) => setData(prev => ({ ...prev, [field]: val }));
  
  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        setData({ ...INITIAL_DATA, date: today.toISOString().split('T')[0], day: days[today.getDay()] });
    }
  };

  const applyPreset = (type: 'motor' | 'mobil') => {
    if (type === 'motor') {
      setData(prev => ({ ...prev, brand: 'Honda', type: 'Vario 150 CBS ISS', year: '2021', color: 'Hitam Doff', nopol: 'B 4567 TZY', price: 18500000, priceText: 'Delapan Belas Juta Lima Ratus Ribu Rupiah', downPayment: 2000000, downPaymentText: 'Dua Juta Rupiah', latePenaltyPerDay: 100000, latePenaltyText: 'Seratus Ribu Rupiah' }));
    } else if (type === 'mobil') {
      setData(prev => ({ ...prev, brand: 'Honda', type: 'Brio Satya E CVT', year: '2020', color: 'Kuning (Carnival Yellow)', nopol: 'D 1888 AA', price: 145000000, priceText: 'Seratus Empat Puluh Lima Juta Rupiah', downPayment: 15000000, downPaymentText: 'Lima Belas Juta Rupiah', latePenaltyPerDay: 500000, latePenaltyText: 'Lima Ratus Ribu Rupiah' }));
    }
  }

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
            <h1 className="font-bold text-lg uppercase underline tracking-wide">PERJANJIAN JUAL BELI KENDARAAN BERMOTOR</h1>
            <p className="text-sm mt-1">Nomor: {data.nopol.replace(/\s+/g, '')}/{data.date.replace(/-/g, '')}</p>
        </div>

        <p className="mb-4 text-justify">
            Pada hari ini, <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong> bertempat di <strong>{data.city}</strong>, telah disepakati perjanjian jual beli kendaraan bermotor oleh dan antara pihak-pihak di bawah ini:
        </p>

        {/* PIHAK PERTAMA */}
        <div className="mb-4 ml-4 break-inside-avoid">
            <p className="font-bold mb-2">PIHAK PERTAMA (I) - PENJUAL</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
                <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1BirthPlace}, {formatDateSafe(data.p1BirthDate)}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
                <div className="flex"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p1Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Selanjutnya disebut sebagai <strong>PIHAK PERTAMA (PENJUAL)</strong>.</p>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-6 ml-4 break-inside-avoid">
            <p className="font-bold mb-2">PIHAK KEDUA (II) - PEMBELI</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
                <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2BirthPlace}, {formatDateSafe(data.p2BirthDate)}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
                <div className="flex"><div className="w-40 align-top">Alamat</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p2Address}</div></div>
            </div>
            <p className="mt-2 text-justify">Selanjutnya disebut sebagai <strong>PIHAK KEDUA (PEMBELI)</strong>.</p>
        </div>

        <p className="mb-4 text-justify">
            PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut <strong>"Para Pihak"</strong>. Para Pihak dengan ini menerangkan bahwa telah sepakat untuk mengikatkan diri dalam Perjanjian Jual Beli Kendaraan Bermotor dengan syarat dan ketentuan sebagai berikut:
        </p>

        {/* PASAL 1 OBJEK */}
        <div className="mb-4 text-justify space-y-4">
            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1">Pasal 1</h3>
                <h3 className="font-bold text-center mb-2">OBJEK JUAL BELI</h3>
                <p>PIHAK PERTAMA setuju untuk menjual dan menyerahkan kepada PIHAK KEDUA, dan PIHAK KEDUA setuju untuk membeli dan menerima dari PIHAK PERTAMA, 1 (satu) unit kendaraan bermotor dengan identitas sebagai berikut:</p>
                <div className="ml-8 mt-2 space-y-1">
                    <div className="flex"><div className="w-40">Merk / Pabrikan</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.brand}</div></div>
                    <div className="flex"><div className="w-40">Tipe / Model</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.type}</div></div>
                    <div className="flex"><div className="w-40">Tahun Pembuatan</div><div className="w-4">:</div><div className="flex-1">{data.year}</div></div>
                    <div className="flex"><div className="w-40">Warna</div><div className="w-4">:</div><div className="flex-1">{data.color}</div></div>
                    <div className="flex"><div className="w-40">Nomor Polisi (Plat)</div><div className="w-4">:</div><div className="flex-1 font-bold underline uppercase">{data.nopol}</div></div>
                    <div className="flex"><div className="w-40">Nomor Rangka</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.frameNo}</div></div>
                    <div className="flex"><div className="w-40">Nomor Mesin</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.engineNo}</div></div>
                    <div className="flex"><div className="w-40">Nomor BPKB</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.bpkbNo}</div></div>
                </div>
            </div>

            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 2</h3>
                <h3 className="font-bold text-center mb-2">HARGA DAN CARA PEMBAYARAN</h3>
                <ol className="list-decimal ml-8 my-2 space-y-1">
                    <li>Harga jual beli atas Objek Jual Beli tersebut disepakati oleh Para Pihak sebesar <strong>{formatRupiah(data.price)} ({data.priceText})</strong>.</li>
                    <li>Pembayaran dilakukan dengan cara <strong>{data.paymentMethod}</strong> dengan rincian instruksi: {data.paymentDetails}.</li>
                    <li>PIHAK KEDUA telah membayarkan Uang Muka (*Down Payment*/DP) atau Tanda Jadi sebesar <strong>{formatRupiah(data.downPayment)} ({data.downPaymentText})</strong> pada saat penandatanganan Surat Perjanjian ini.</li>
                    <li>Sisa pembayaran akan dilunasi secara penuh sebelum atau pada saat penyerahan unit kendaraan beserta dokumen legalitasnya.</li>
                </ol>
            </div>

            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 3</h3>
                <h3 className="font-bold text-center mb-2">JAMINAN DAN LEGALITAS</h3>
                <ol className="list-decimal ml-8 my-2 space-y-1">
                    <li>PIHAK PERTAMA menjamin sepenuhnya bahwa kendaraan yang dijual adalah sah miliknya, tidak dalam sengketa hukum, tidak sedang dijaminkan kepada pihak lain, dan tidak tersangkut tindak pidana.</li>
                    <li>PIHAK PERTAMA wajib menyerahkan seluruh dokumen kendaraan (BPKB asli, STNK asli, faktur pembelian, kwitansi kosong yang ditandatangani) kepada PIHAK KEDUA pada saat pelunasan terjadi.</li>
                    <li>Jika di kemudian hari terbukti ada cacat hukum atas kendaraan tersebut, maka PIHAK PERTAMA bersedia mempertanggungjawabkannya secara hukum dan mengembalikan seluruh uang yang telah diterima tanpa potongan.</li>
                </ol>
            </div>

            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 4</h3>
                <h3 className="font-bold text-center mb-2">KONDISI KENDARAAN DAN BALIK NAMA</h3>
                <ol className="list-decimal ml-8 my-2 space-y-1">
                    <li>Kendaraan dijual dalam kondisi sebagaimana adanya saat dilihat dan dicoba oleh PIHAK KEDUA (*as is condition*). Segala perbaikan atau kerusakan setelah penyerahan menjadi tanggung jawab PIHAK KEDUA.</li>
                    <li>Segala biaya yang timbul untuk keperluan balik nama (*Mutasi/BBN-KB*) serta pajak kendaraan setelah tanggal penyerahan sepenuhnya ditanggung oleh <strong>{data.taxObligation}</strong>.</li>
                </ol>
            </div>

            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 5</h3>
                <h3 className="font-bold text-center mb-2">SANKSI KETERLAMBATAN & PEMBATALAN</h3>
                <ol className="list-decimal ml-8 my-2 space-y-1">
                    <li>Jika PIHAK KEDUA terlambat melakukan pelunasan sisa pembayaran dari batas waktu yang disepakati, akan dikenakan denda sebesar <strong>{formatRupiah(data.latePenaltyPerDay)} ({data.latePenaltyText}) per hari keterlambatan</strong>.</li>
                    <li>Apabila PIHAK KEDUA membatalkan transaksi secara sepihak, maka Uang Muka (*DP*) yang telah disetorkan dinyatakan <strong>HANGUS</strong> dan menjadi hak PIHAK PERTAMA sepenuhnya.</li>
                </ol>
            </div>

            <div className="break-inside-avoid">
                <h3 className="font-bold text-center mb-1 mt-6">Pasal 6</h3>
                <h3 className="font-bold text-center mb-2">PENUTUP</h3>
                <p>Demikian Surat Perjanjian ini dibuat dalam rangkap 2 (dua) yang masing-masing bermeterai cukup dan mempunyai kekuatan hukum yang sama. Ditandatangani dalam keadaan sadar dan tanpa paksaan dari pihak manapun.</p>
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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Jual Beli Kendaraan</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      {/* PRESET BUTTONS */}
      <div className="no-print bg-slate-800 border-b border-slate-700 py-2 px-4 flex gap-2 overflow-x-auto hide-scrollbar">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center mr-2">Preset:</span>
          <button onClick={() => applyPreset('mobil')} className="shrink-0 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">🚗 Template Mobil</button>
          <button onClick={() => applyPreset('motor')} className="shrink-0 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">🏍️ Template Motor</button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-112px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[580px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-emerald-600" /> Editor Kontrak</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('identitas')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'identitas' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>1. Identitas</button>
                <button onClick={() => setActiveTab('kendaraan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kendaraan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Kendaraan</button>
                <button onClick={() => setActiveTab('finansial')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'finansial' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Finansial</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'identitas' && (
                <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Kop Surat & Saksi
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
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi 1</label>
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
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1BirthPlace} onChange={e => handleDataChange('p1BirthPlace', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1BirthDate} onChange={e => handleDataChange('p1BirthDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
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
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2BirthPlace} onChange={e => handleDataChange('p2BirthPlace', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.p2BirthDate} onChange={e => handleDataChange('p2BirthDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none uppercase" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'kendaraan' && (
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Car size={14} className="text-amber-600"/> Detail Kendaraan (Objek Jual Beli)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Merk / Pabrikan</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.brand} onChange={e => handleDataChange('brand', e.target.value)} placeholder="Contoh: TOYOTA" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tipe / Model</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.type} onChange={e => handleDataChange('type', e.target.value)} placeholder="Contoh: AVANZA VELOZ" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tahun</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.year} onChange={e => handleDataChange('year', e.target.value)} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Warna</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.color} onChange={e => handleDataChange('color', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Polisi (Plat Kendaraan)</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold text-amber-700 text-center uppercase tracking-widest focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.nopol} onChange={e => handleDataChange('nopol', e.target.value)} placeholder="B 1234 ABC" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Rangka</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.frameNo} onChange={e => handleDataChange('frameNo', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Mesin</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.engineNo} onChange={e => handleDataChange('engineNo', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor BPKB</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.bpkbNo} onChange={e => handleDataChange('bpkbNo', e.target.value)} />
                        </div>
                    </div>
                 </div>
              )}

              {activeTab === 'finansial' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <Banknote size={14} className="text-emerald-600"/> Kesepakatan Harga & Pembayaran
                      </h3>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Harga Sepakat (Rp)</label>
                              <input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.price} onChange={e => handleDataChange('price', Number(e.target.value))} />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (Harga Sepakat)</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.priceText} onChange={e => handleDataChange('priceText', e.target.value)} />
                          </div>
                          
                          <div className="border-t border-slate-100 pt-4"></div>

                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Muka / DP (Rp)</label>
                              <input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.downPayment} onChange={e => handleDataChange('downPayment', Number(e.target.value))} />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (DP)</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.downPaymentText} onChange={e => handleDataChange('downPaymentText', e.target.value)} />
                          </div>

                          <div className="border-t border-slate-100 pt-4"></div>

                          <div className="grid grid-cols-2 gap-3">
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembayaran</label>
                                  <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)} placeholder="Misal: Transfer Bank / Tunai" />
                              </div>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggung Jawab Pajak & Balik Nama</label>
                                  <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.taxObligation} onChange={e => handleDataChange('taxObligation', e.target.value)}>
                                      <option value="Pihak Kedua (Pembeli)">Pembeli (Pihak 2)</option>
                                      <option value="Pihak Pertama (Penjual)">Penjual (Pihak 1)</option>
                                      <option value="Ditanggung Bersama (50:50)">Ditanggung Bersama</option>
                                  </select>
                              </div>
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keterangan / Rekening Transfer</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.paymentDetails} onChange={e => handleDataChange('paymentDetails', e.target.value)} />
                          </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                        <ShieldCheck size={14} className="text-rose-600"/> Denda Keterlambatan
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Denda Per Hari (Rp)</label>
                              <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.latePenaltyPerDay} onChange={e => handleDataChange('latePenaltyPerDay', Number(e.target.value))} />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (Denda)</label>
                              <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.latePenaltyText} onChange={e => handleDataChange('latePenaltyText', e.target.value)} />
                          </div>
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
              <PrintWrapper documentName="Jual_Beli_Kendaraan" price={10000} />
           </div>

        </div>
      </main>

    </div>
  );
}
