'use client';

/**
 * FILE: GadaiAsetPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Gadai (Enterprise Legal Standard)
 * FEATURES:
 * - Enterprise-grade Notary Standard Document
 * - The Teeth Protocol: Unilateral Collateral Execution Clause
 * - Detailed Form for Identity, Asset, and Rules
 * - Strict A4 Print Layout (Word-like Structure, No Grids for Text)
 * - Timezone-Safe Date Parsing
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Wallet, ShieldCheck, Scale, CalendarDays, FileText, User, Box, 
  Edit3, Eye, Briefcase, RotateCcw, ArrowLeftCircle, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface GadaiData {
  day: string;
  date: string;
  city: string;

  // Pihak 1 (Penerima Gadai)
  p1Name: string;
  p1Nik: string;
  p1Birth: string;
  p1Job: string;
  p1Address: string;
  
  // Pihak 2 (Pemberi Gadai)
  p2Name: string;
  p2Nik: string;
  p2Birth: string;
  p2Job: string;
  p2Address: string;
  
  // Detail Aset
  assetName: string;
  assetDetail: string;
  assetValue: number;
  
  // Pinjaman
  loanAmount: number;
  loanAmountText: string;
  dueDate: string;
  interest: string;
  toleranceDays: number;
  
  // Saksi & Klausul
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: GadaiData = {
  day: 'Senin',
  date: '', // Diisi useEffect
  city: 'JAKARTA',

  p1Name: 'BUDI SANTOSO', 
  p1Nik: '3171010101780001', 
  p1Birth: 'Jakarta, 17 Agustus 1978',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Merdeka No. 10, RT 001/RW 002, Kel. Kuningan, Kec. Setiabudi, Jakarta Selatan',
  
  p2Name: 'ANDI WIJAYA', 
  p2Nik: '3171020202920005',
  p2Birth: 'Bandung, 12 Januari 1992',
  p2Job: 'Pegawai Swasta',
  p2Address: 'Jl. Sudirman No. 45, RT 003/RW 005, Kel. Karet, Kec. Tanah Abang, Jakarta Pusat',
  
  assetName: '1 (satu) unit Sepeda Motor Honda Vario 150',
  assetDetail: 'Tahun 2022, Warna Hitam, No. Polisi B 1234 ABC, No. Rangka: MH123..., No. Mesin: JFG123... dilengkapi dengan STNK dan BPKB asli',
  assetValue: 15000000,

  loanAmount: 10000000,
  loanAmountText: 'Sepuluh Juta Rupiah',
  dueDate: '', // Diisi useEffect
  interest: '0% (Tanpa Bunga)',
  toleranceDays: 7,
  
  witness1: 'Hendra Saputra', 
  witness2: 'Siti Aminah',
};

// --- 3. KOMPONEN UTAMA ---
export default function GadaiAsetPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium font-sans bg-slate-50">Memuat Gadai Editor...</div>}>
      <GadaiBuilder />
    </Suspense>
  );
}

function GadaiBuilder() {
  // --- STATE ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor'); 
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<GadaiData>(INITIAL_DATA);
  
  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        dueDate: nextYear.toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  
  const handleDataChange = (field: keyof GadaiData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const nextYear = new Date(today);
        nextYear.setFullYear(today.getFullYear() + 1);
        setData({ ...INITIAL_DATA, date: today.toISOString().split('T')[0], dueDate: nextYear.toISOString().split('T')[0] });
    }
  };

  // --- KOMPONEN ISI DOKUMEN ---
  const ContentInside = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="font-serif text-[11pt] leading-snug text-black p-[20mm] print:p-0">
        <div className="text-center mb-8">
          <h1 className="font-bold text-lg uppercase tracking-wide underline">SURAT PERJANJIAN GADAI</h1>
        </div>

        <div className="mb-4 text-justify break-inside-avoid">
          <p>Pada hari ini, <strong>{data.day}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>
        </div>

        <div className="mb-4 pl-4 break-inside-avoid space-y-4">
          <div className="flex">
            <div className="w-6 font-bold">1.</div>
            <div className="flex-1 space-y-1">
              <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.p1Name}</div></div>
              <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1">{data.p1Nik}</div></div>
              <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1Birth}</div></div>
              <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
              <div className="flex"><div className="w-40">Alamat</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.p1Address}</div></div>
              <div className="pt-2 text-justify">
                Selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK PERTAMA (PENERIMA GADAI)</strong>.
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-6 font-bold">2.</div>
            <div className="flex-1 space-y-1">
              <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.p2Name}</div></div>
              <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1">{data.p2Nik}</div></div>
              <div className="flex"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2Birth}</div></div>
              <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
              <div className="flex"><div className="w-40">Alamat</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.p2Address}</div></div>
              <div className="pt-2 text-justify">
                Selanjutnya dalam perjanjian ini disebut sebagai <strong>PIHAK KEDUA (PEMBERI GADAI)</strong>.
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 text-justify break-inside-avoid">
          <p>PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut <strong>PARA PIHAK</strong>. PARA PIHAK menerangkan terlebih dahulu bahwa telah bersepakat untuk mengikatkan diri dalam Perjanjian Gadai dengan syarat-syarat dan ketentuan-ketentuan sebagai berikut:</p>
        </div>

        <div className="space-y-4">
          <div className="text-center font-bold uppercase mt-6 mb-2 break-inside-avoid">
            PASAL 1<br/>DEFINISI DAN NILAI PINJAMAN
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">1.</span>
            <p className="text-justify mb-2">PIHAK KEDUA telah menerima fasilitas pinjaman uang dari PIHAK PERTAMA sebesar <strong>{formatRupiah(data.loanAmount)} ({data.loanAmountText})</strong>.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">2.</span>
            <p className="text-justify mb-2">Pinjaman tersebut telah diserahkan secara utuh kepada PIHAK KEDUA pada saat ditandatanganinya Perjanjian ini, dan Perjanjian ini berlaku pula sebagai tanda terima yang sah (kuitansi) atas penerimaan uang tersebut.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">3.</span>
            <p className="text-justify mb-2">Bunga atau biaya yang disepakati oleh PARA PIHAK atas pinjaman ini adalah <strong>{data.interest}</strong>.</p>
          </div>

          <div className="text-center font-bold uppercase mt-6 mb-2 break-inside-avoid">
            PASAL 2<br/>OBJEK PERJANJIAN GADAI
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">1.</span>
            <div className="text-justify mb-2">
              Sebagai jaminan atas fasilitas pinjaman sebagaimana dimaksud dalam Pasal 1, PIHAK KEDUA dengan ini menyerahkan barang/aset miliknya secara sukarela kepada PIHAK PERTAMA berupa:
              <div className="ml-4 mt-2 mb-2 p-0">
                <div className="flex"><div className="w-36">Nama/Jenis Aset</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.assetName}</div></div>
                <div className="flex"><div className="w-36">Spesifikasi/Detail</div><div className="w-4">:</div><div className="flex-1">{data.assetDetail}</div></div>
              </div>
              (Selanjutnya dalam Perjanjian ini disebut "Objek Gadai").
            </div>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">2.</span>
            <p className="text-justify mb-2">Nilai estimasi/pasar dari Objek Gadai disepakati oleh PARA PIHAK adalah sebesar <strong>{formatRupiah(data.assetValue)}</strong>.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">3.</span>
            <p className="text-justify mb-2">PIHAK KEDUA menjamin secara mutlak bahwa Objek Gadai sepenuhnya merupakan hak milik sah PIHAK KEDUA, tidak sedang dijaminkan kepada pihak lain, tidak dalam sengketa, dan bebas dari segala sitaan maupun tuntutan hukum.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">4.</span>
            <p className="text-justify mb-2">Objek Gadai beserta seluruh kelengkapannya dan dokumen kepemilikannya akan berada dalam penguasaan PIHAK PERTAMA terhitung sejak ditandatanganinya Perjanjian ini hingga seluruh pinjaman dilunasi.</p>
          </div>

          <div className="text-center font-bold uppercase mt-6 mb-2 break-inside-avoid">
            PASAL 3<br/>JANGKA WAKTU DAN MASA TOLERANSI
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">1.</span>
            <p className="text-justify mb-2">Fasilitas pinjaman ini berlaku dan jatuh tempo selambat-lambatnya pada tanggal <strong>{formatDateSafe(data.dueDate)}</strong>.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">2.</span>
            <p className="text-justify mb-2">PIHAK KEDUA wajib mengembalikan dan melunasi seluruh jumlah pinjaman beserta bunga/biaya kepada PIHAK PERTAMA selambat-lambatnya pada tanggal jatuh tempo tersebut.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">3.</span>
            <p className="text-justify mb-2">Apabila PIHAK KEDUA gagal melunasi pinjaman pada tanggal jatuh tempo, PIHAK PERTAMA sepakat untuk memberikan masa toleransi selama <strong>{data.toleranceDays} ({data.toleranceDays}) hari kalender</strong> terhitung sejak tanggal jatuh tempo sebagaimana disebutkan pada ayat (1) pasal ini.</p>
          </div>

          <div className="text-center font-bold uppercase mt-6 mb-2 break-inside-avoid">
            PASAL 4<br/>HAK DAN KEWAJIBAN PARA PIHAK
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">1.</span>
            <div className="text-justify mb-2">
              Kewajiban PIHAK PERTAMA:
              <div className="ml-4 mt-1 relative">
                <span className="absolute left-0 top-0">a.</span>
                <p className="pl-5 mb-1">Menyimpan dan merawat Objek Gadai dengan sebaik-baiknya tanpa menggunakannya untuk kepentingan pribadi maupun memindahtangankannya kepada pihak lain sebelum terjadinya wanprestasi.</p>
              </div>
              <div className="ml-4 relative">
                <span className="absolute left-0 top-0">b.</span>
                <p className="pl-5 mb-1">Mengembalikan Objek Gadai beserta seluruh kelengkapannya dalam keadaan sebagaimana diterimanya secara seketika setelah PIHAK KEDUA melunasi seluruh jumlah pinjaman dan bunganya.</p>
              </div>
            </div>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">2.</span>
            <div className="text-justify mb-2">
              Kewajiban PIHAK KEDUA:
              <div className="ml-4 mt-1 relative">
                <span className="absolute left-0 top-0">a.</span>
                <p className="pl-5 mb-1">Melunasi seluruh kewajiban utang pokok beserta bunga kepada PIHAK PERTAMA sesuai jangka waktu yang telah disepakati.</p>
              </div>
              <div className="ml-4 relative">
                <span className="absolute left-0 top-0">b.</span>
                <p className="pl-5 mb-1">Menanggung dan mengganti segala biaya perawatan ekstra atas Objek Gadai (apabila ada) yang dikeluarkan oleh PIHAK PERTAMA secara wajar.</p>
              </div>
            </div>
          </div>

          <div className="text-center font-bold uppercase mt-6 mb-2 break-inside-avoid">
            PASAL 5<br/>EKSEKUSI JAMINAN SECARA SEPIHAK
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">1.</span>
            <p className="text-justify mb-2">Apabila setelah lewatnya masa toleransi sebagaimana dimaksud dalam Pasal 3 ayat (3), PIHAK KEDUA masih belum dapat melunasi seluruh utangnya, maka PIHAK KEDUA dengan ini <strong>menyatakan diri wanprestasi (lalai)</strong> dalam memenuhi kewajibannya tanpa diperlukan surat peringatan/teguran hukum (somasi) lagi dari PIHAK PERTAMA.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">2.</span>
            <p className="text-justify mb-2">Dengan terjadinya wanprestasi tersebut, PIHAK KEDUA dengan ini <strong>memberikan kuasa mutlak yang tidak dapat ditarik kembali</strong> oleh sebab apapun kepada PIHAK PERTAMA untuk melakukan pelelangan, penjualan, atau mengeksekusi Objek Gadai secara sepihak tanpa memerlukan penetapan Pengadilan maupun persetujuan tambahan dari PIHAK KEDUA.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">3.</span>
            <p className="text-justify mb-2">PIHAK PERTAMA berhak penuh menentukan harga jual, cara penjualan, serta pembeli atas Objek Gadai tanpa dapat digugat atau dihalang-halangi oleh PIHAK KEDUA, selama dilakukan dengan itikad baik untuk pelunasan utang.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">4.</span>
            <p className="text-justify mb-2">Apabila hasil penjualan Objek Gadai melebihi jumlah total utang PIHAK KEDUA (termasuk bunga dan biaya penjualan/eksekusi), maka kelebihan uang tersebut wajib dikembalikan oleh PIHAK PERTAMA kepada PIHAK KEDUA tanpa adanya bunga pengembalian.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">5.</span>
            <p className="text-justify mb-2">Sebaliknya, apabila hasil penjualan Objek Gadai belum mencukupi untuk melunasi seluruh utang, maka PIHAK KEDUA tetap bertanggung jawab untuk melunasi sisa kekurangannya tersebut kepada PIHAK PERTAMA.</p>
          </div>

          <div className="text-center font-bold uppercase mt-6 mb-2 break-inside-avoid">
            PASAL 6<br/>PENYELESAIAN SENGKETA
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">1.</span>
            <p className="text-justify mb-2">Segala perselisihan yang timbul sebagai akibat dari penafsiran atau pelaksanaan Perjanjian ini akan diselesaikan oleh PARA PIHAK secara musyawarah untuk mufakat.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">2.</span>
            <p className="text-justify mb-2">Apabila penyelesaian secara musyawarah tidak tercapai dalam jangka waktu 30 (tiga puluh) hari, maka PARA PIHAK sepakat untuk menyelesaikan sengketa tersebut melalui kepaniteraan Pengadilan Negeri di wilayah hukum domisili <strong>{data.city}</strong>.</p>
          </div>

          <div className="text-center font-bold uppercase mt-6 mb-2 break-inside-avoid">
            PASAL 7<br/>PENUTUP
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">1.</span>
            <p className="text-justify mb-2">Perjanjian ini dibuat dan ditandatangani oleh PARA PIHAK dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan, tekanan, atau pengaruh dari pihak manapun.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">2.</span>
            <p className="text-justify mb-2">Perjanjian ini dibuat dalam 2 (dua) rangkap asli, masing-masing dibubuhi materai yang cukup dan mempunyai kekuatan hukum pembuktian yang sama bagi PARA PIHAK.</p>
          </div>
          <div className="pl-6 relative break-inside-avoid">
            <span className="absolute left-0 top-0">3.</span>
            <p className="text-justify mb-2">Perjanjian ini mulai berlaku dan mengikat PARA PIHAK secara sah sejak tanggal ditandatanganinya Perjanjian ini oleh PARA PIHAK beserta saksi-saksi.</p>
          </div>
        </div>

        <div className="mt-8 mb-8 break-inside-avoid">
          <p className="text-justify">Demikian Surat Perjanjian Gadai ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-center mt-12 mb-12 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <div>
              <p className="mb-24 font-bold uppercase">Pihak Kedua<br/>(Pemberi Gadai)</p>
              <p className="font-bold uppercase underline leading-none">{data.p2Name}</p>
          </div>
          <div>
              <p className="mb-4 font-bold uppercase">Pihak Pertama<br/>(Penerima Gadai)</p>
              <div className="border border-slate-300 w-24 h-16 mx-auto mb-4 flex items-center justify-center text-[10px] text-slate-400 bg-slate-50 print:bg-white uppercase">Materai<br/>10.000</div>
              <p className="font-bold uppercase underline leading-none">{data.p1Name}</p>
          </div>
        </div>

        <div className="mt-8 mb-4 text-center font-bold uppercase break-inside-avoid">Saksi-Saksi:</div>
        <div className="grid grid-cols-2 gap-12 text-center break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <div><p className="mb-16 text-sm text-slate-600">Saksi I</p><p className="font-bold underline">{data.witness1}</p></div>
          <div><p className="mb-16 text-sm text-slate-600">Saksi II</p><p className="font-bold underline">{data.witness2}</p></div>
        </div>

      </div>
    );
  };

  if (!isClient) return null; // CRITICAL Fix for Deployment Hydration Error

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 overflow-x-hidden">
      
      {/* CSS PRINT FIXED - NO CSS GRIDS FOR TEXT, JUST FLEX AND MARGINS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #print-only-root { display: block !important; position: relative; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 11pt; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeftCircle size={20} className="text-emerald-400" /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-widest">
               <Briefcase size={16} className="text-blue-400" /> <span>GADAI ASET BUILDER (ENTERPRISE)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden print:block print:h-auto print:overflow-visible">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full lg:w-[500px] shrink-0 h-full overflow-y-auto pb-20 space-y-6 font-sans ${mobileView === 'preview' ? 'hidden lg:block' : 'block'} custom-scrollbar`}>
           
           <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 shadow-sm">
             <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={18} />
             <div>
               <h4 className="text-xs font-black text-yellow-800 uppercase tracking-wide">Enterprise Protocol Active</h4>
               <p className="text-[11px] text-yellow-700 mt-1 leading-relaxed">Dokumen ini telah dilengkapi dengan <strong>The Teeth Protocol</strong> (Klausul Eksekusi Penjualan Jaminan secara Sepihak) untuk proteksi maksimal Penerima Gadai.</p>
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2"><CalendarDays size={14} className="text-blue-500"/><h3 className="text-xs font-black uppercase text-slate-700">Waktu & Tempat</h3></div>
                <button onClick={handleReset} title="Reset Form" className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"><RotateCcw size={14}/></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Hari (Cth: Senin)" />
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Tanggal Perjanjian</label>
                  <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><User size={14} className="text-emerald-600"/><h3 className="text-xs font-black uppercase text-slate-700">Pihak 1: Penerima Gadai</h3></div>
              <div className="space-y-3">
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama Lengkap Sesuai KTP" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="NIK KTP (16 Digit)" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Tempat, Tanggal Lahir" value={data.p1Birth} onChange={e => handleDataChange('p1Birth', e.target.value)} />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Pekerjaan" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Alamat Lengkap Sesuai KTP" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><User size={14} className="text-red-500"/><h3 className="text-xs font-black uppercase text-slate-700">Pihak 2: Pemberi Gadai</h3></div>
              <div className="space-y-3">
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" placeholder="Nama Lengkap Sesuai KTP" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" placeholder="NIK KTP (16 Digit)" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" placeholder="Tempat, Tanggal Lahir" value={data.p2Birth} onChange={e => handleDataChange('p2Birth', e.target.value)} />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" placeholder="Pekerjaan" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-red-500 outline-none" placeholder="Alamat Lengkap Sesuai KTP" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Box size={14} className="text-blue-500"/><h3 className="text-xs font-black uppercase text-slate-700">Aset Jaminan</h3></div>
              <div className="space-y-3">
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Barang (Misal: 1 unit Motor Vario)" value={data.assetName} onChange={e => handleDataChange('assetName', e.target.value)} />
                <textarea className="w-full p-2 border rounded-lg text-xs h-20 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Detail Teknis (No Rangka, Mesin, Kondisi, Kelengkapan BPKB/Sertifikat)" value={data.assetDetail} onChange={e => handleDataChange('assetDetail', e.target.value)} />
                
                <div className="relative pt-2 border-t">
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Estimasi Nilai Pasar Aset (Rp)</label>
                  <span className="absolute left-3 bottom-2 text-slate-400 text-xs font-bold">Rp</span>
                  <input type="number" className="w-full pl-8 pr-4 py-2 border rounded-lg text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" value={data.assetValue} onChange={e => handleDataChange('assetValue', parseInt(e.target.value))} />
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Wallet size={14} className="text-blue-500"/><h3 className="text-xs font-black uppercase text-slate-700">Pinjaman, Bunga & Eksekusi</h3></div>
              <div className="space-y-3">
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Jumlah Pinjaman</label>
                  <span className="absolute left-3 bottom-2 text-slate-400 text-xs font-bold">Rp</span>
                  <input type="number" className="w-full pl-8 pr-4 py-2 border rounded-lg text-xs font-black text-blue-700 focus:ring-2 focus:ring-blue-500 outline-none" value={data.loanAmount} onChange={e => handleDataChange('loanAmount', parseInt(e.target.value))} />
                </div>
                <input className="w-full p-2 border rounded-lg text-xs italic bg-slate-50" placeholder="Terbilang (Cth: Sepuluh Juta Rupiah)" value={data.loanAmountText} onChange={e => handleDataChange('loanAmountText', e.target.value)} />
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Jatuh Tempo Pelunasan</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={data.dueDate} onChange={e => handleDataChange('dueDate', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Bunga / Biaya</label>
                      <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.interest} onChange={e => handleDataChange('interest', e.target.value)} placeholder="Misal: 0% atau 5% per bulan" />
                   </div>
                </div>

                <div className="bg-slate-50 border p-3 rounded-lg mt-2">
                   <label className="text-[10px] font-bold text-slate-700 block mb-1">Masa Toleransi Sebelum Eksekusi (Hari)</label>
                   <p className="text-[9px] text-slate-500 mb-2 leading-relaxed">Lewat dari masa toleransi ini, hak eksekusi jaminan secara sepihak langsung aktif.</p>
                   <div className="flex items-center gap-2">
                     <input type="number" min="0" max="90" className="w-20 p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none text-center" value={data.toleranceDays} onChange={e => handleDataChange('toleranceDays', parseInt(e.target.value))} />
                     <span className="text-xs font-bold text-slate-600">Hari Kalender</span>
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Scale size={14} className="text-blue-500"/><h3 className="text-xs font-black uppercase text-slate-700">Saksi-Saksi</h3></div>
              <div className="grid grid-cols-2 gap-3">
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Saksi 1" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Saksi 2" />
              </div>
           </div>

           <div className="h-20 lg:hidden"></div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-0 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col shadow-2xl">
                  <ContentInside />
                </div>
            </div>
        </div>

      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-[100] h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian_Gadai_Enterprise" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
            <ContentInside />
         </div>
      </div>

    </div>
  );
}
