'use client';

/**
 * FILE: GadaiAsetPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Gadai
 * FEATURES:
 * - Dual Template (Formal Legal vs Simple Receipt)
 * - Strict A4 Print Layout
 * - Timezone-Safe Date Parsing
 * - Integrated Ad Banner Space & Saweria Donation Modal
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Wallet, ShieldCheck, Scale, CalendarDays, FileText, User, Box, 
  Edit3, Eye, Briefcase, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

// --- 1. TYPE DEFINITIONS ---
interface GadaiData {
  day: string;
  date: string;
  city: string;

  // Pihak 1 (Penerima Gadai)
  p1Name: string;
  p1Nik: string;
  p1Address: string;
  
  // Pihak 2 (Pemberi Gadai)
  p2Name: string;
  p2Nik: string;
  p2Address: string;
  
  // Detail Aset
  assetName: string;
  assetDetail: string;
  
  // Pinjaman
  loanAmount: number;
  loanAmountText: string;
  dueDate: string;
  interest: string;
  
  // Saksi & Klausul
  witness1: string;
  witness2: string;
  additionalClause: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: GadaiData = {
  day: 'Senin',
  date: '', // Diisi useEffect
  city: 'JAKARTA',

  p1Name: 'BUDI SANTOSO', 
  p1Nik: '3171010101780001', 
  p1Address: 'Jl. Merdeka No. 10, Jakarta Selatan',
  
  p2Name: 'ANDI WIJAYA', 
  p2Nik: '3171020202920005',
  p2Address: 'Jl. Sudirman No. 45, Jakarta Pusat',
  
  assetName: '1 (satu) unit Sepeda Motor Honda Vario 150',
  assetDetail: 'Tahun 2022, Warna Hitam, No. Polisi B 1234 ABC, No. Rangka: MH123..., No. Mesin: JFG123... dilengkapi dengan STNK dan BPKB asli.',
  
  loanAmount: 10000000,
  loanAmountText: 'Sepuluh Juta Rupiah',
  dueDate: '', // Diisi useEffect
  interest: '0% (Tanpa Bunga)',
  
  witness1: 'Hendra Saputra', 
  witness2: 'Siti Aminah',

  additionalClause: 'Apabila sampai jatuh tempo Pihak Kedua tidak melunasi hutangnya, maka Pihak Pertama berhak menjual aset tersebut untuk pelunasan.' 
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
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor'); 
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<GadaiData>(INITIAL_DATA);
  const [showDonation, setShowDonation] = useState(false);

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

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Formal (Lengkap)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Ringkas (1 Halaman)
        </button>
    </div>
  );

  // --- KOMPONEN ISI DOKUMEN ---
  const ContentInside = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            // FIX: Append T00:00:00 to prevent day shift in local timezone
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    if (templateId === 1) {
      // --- TEMPLATE 1: FORMAL LEGAL ---
      return (
        <div className="font-serif text-[11pt] leading-relaxed text-black p-[20mm] print:p-0">
          <div className="text-center mb-8 pb-4 border-b-2 border-black">
            <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN GADAI ASET</h1>
          </div>

          <p className="mb-4 text-justify break-inside-avoid">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong>, kami yang bertanda tangan di bawah ini:</p>

          <div className="ml-4 mb-4 space-y-4">
            <div className="text-sm border-l-4 border-slate-300 pl-3 break-inside-avoid">
              <table className="w-full leading-snug">
                  <tbody>
                    <tr><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p1Name}</td></tr>
                    <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top">{data.p1Nik}</td></tr>
                    <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                  </tbody>
              </table>
              <div className="mt-1 italic text-slate-600">Selanjutnya disebut <strong>PIHAK PERTAMA (PENERIMA GADAI)</strong>.</div>
            </div>

            <div className="text-sm border-l-4 border-slate-800 pl-3 break-inside-avoid">
              <table className="w-full leading-snug">
                  <tbody>
                    <tr><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p2Name}</td></tr>
                    <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top">{data.p2Nik}</td></tr>
                    <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                  </tbody>
              </table>
              <div className="mt-1 italic text-slate-600">Selanjutnya disebut <strong>PIHAK KEDUA (PEMBERI GADAI)</strong>.</div>
            </div>
          </div>

          <p className="mb-4 text-justify break-inside-avoid">Kedua belah pihak telah bersepakat untuk mengadakan perjanjian gadai dengan ketentuan sebagai berikut:</p>

          <div className="space-y-6">
            <div className="break-inside-avoid">
              <div className="font-bold uppercase mb-2 text-sm border-b border-black inline-block">PASAL 1 : NILAI PINJAMAN</div>
              <p className="text-sm text-justify">PIHAK KEDUA telah meminjam uang kepada PIHAK PERTAMA sebesar <strong>{formatRupiah(data.loanAmount)}</strong> ({data.loanAmountText}) yang telah diterima secara tunai/transfer pada saat penandatanganan surat ini.</p>
            </div>

            <div className="break-inside-avoid">
              <div className="font-bold uppercase mb-2 text-sm border-b border-black inline-block">PASAL 2 : OBJEK GADAI</div>
              <p className="text-sm">Sebagai jaminan atas pinjaman tersebut, PIHAK KEDUA menyerahkan aset kepada PIHAK PERTAMA berupa:</p>
              <div className="ml-4 mt-2 p-3 bg-slate-50 print:bg-white border border-slate-200 rounded text-sm italic">
                <strong>{data.assetName}</strong><br/>
                {data.assetDetail}
              </div>
            </div>

            <div className="break-inside-avoid">
                <div className="font-bold uppercase mb-2 text-sm border-b border-black inline-block">PASAL 3 : JANGKA WAKTU</div>
                <p className="text-sm text-justify">PIHAK KEDUA berjanji akan melunasi pinjaman tersebut paling lambat pada tanggal <strong>{formatDateSafe(data.dueDate)}</strong>. Apabila pinjaman telah lunas, PIHAK PERTAMA wajib mengembalikan aset gadai dalam kondisi baik.</p>
            </div>

            <div className="break-inside-avoid">
                <div className="font-bold uppercase mb-2 text-sm border-b border-black inline-block">PASAL 4 : WANPRESTASI</div>
                <p className="text-sm text-justify">Apabila sampai batas waktu yang ditentukan PIHAK KEDUA belum melunasi hutangnya, maka PIHAK PERTAMA berhak untuk mengambil tindakan hukum atau menjual aset jaminan tersebut untuk menutupi hutang PIHAK KEDUA.</p>
            </div>

            {data.additionalClause && (
              <div className="break-inside-avoid">
                <div className="font-bold uppercase mb-2 text-sm border-b border-black inline-block">PASAL 5 : LAIN-LAIN</div>
                <p className="text-sm whitespace-pre-wrap text-justify">{data.additionalClause}</p>
              </div>
            )}
          </div>

          <p className="mt-8 mb-8 text-sm text-justify text-slate-600 italic break-inside-avoid">Demikian perjanjian ini dibuat rangkap 2 (dua) di atas kertas bermaterai cukup dan mempunyai kekuatan hukum yang sama.</p>

          <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div>
                <p className="mb-20 font-bold uppercase underline">Pihak Kedua</p>
                <p className="font-bold uppercase leading-none">{data.p2Name}</p>
            </div>
            <div>
                <p className="mb-4 font-bold uppercase underline">Pihak Pertama</p>
                <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400 bg-slate-50 print:bg-white uppercase">Materai</div>
                <p className="font-bold uppercase leading-none">{data.p1Name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 text-center text-sm break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div><p className="mb-16 font-bold text-xs uppercase tracking-widest text-slate-400">Saksi I</p><p className="border-b border-black">{data.witness1}</p></div>
            <div><p className="mb-16 font-bold text-xs uppercase tracking-widest text-slate-400">Saksi II</p><p className="border-b border-black">{data.witness2}</p></div>
          </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: RINGKAS ---
      return (
        <div className="font-serif text-[11pt] text-black p-[20mm] print:p-0">
            <div className="text-center mb-6 border-b-2 border-black pb-2">
              <h1 className="font-bold text-xl uppercase underline tracking-tighter">SURAT BUKTI GADAI</h1>
            </div>
            <p className="mb-4 text-justify text-sm italic break-inside-avoid">Kami yang bertanda tangan di bawah ini sepakat melakukan serah terima aset gadai sebagai jaminan hutang:</p>

            <div className="grid grid-cols-2 gap-4 mb-6 text-[10px] font-sans break-inside-avoid">
              <div className="border border-slate-300 p-3 rounded bg-slate-50 print:bg-white">
                <div className="font-bold uppercase mb-2 border-b border-slate-300 pb-1">Penerima Gadai (Pihak I)</div>
                <div className="space-y-1">
                   <p><span className="font-bold">Nama:</span> {data.p1Name}</p>
                   <p><span className="font-bold">Alamat:</span> {data.p1Address}</p>
                </div>
              </div>
              <div className="border border-slate-300 p-3 rounded bg-slate-50 print:bg-white">
                <div className="font-bold uppercase mb-2 border-b border-slate-300 pb-1">Pemberi Gadai (Pihak II)</div>
                <div className="space-y-1">
                   <p><span className="font-bold">Nama:</span> {data.p2Name}</p>
                   <p><span className="font-bold">Alamat:</span> {data.p2Address}</p>
                </div>
              </div>
            </div>

            <div className="mb-6 border-2 border-black p-4 text-sm bg-white break-inside-avoid rounded-lg">
              <div className="font-bold border-b border-black mb-2 text-center bg-black text-white p-1 uppercase tracking-widest text-xs">Objek Jaminan</div>
              <p className="font-bold text-lg text-center my-2 uppercase">{data.assetName}</p>
              <p className="text-xs text-slate-600 text-center italic">{data.assetDetail}</p>
            </div>

            <div className="mb-6 text-sm space-y-2 border-l-4 border-slate-400 pl-4 py-2 break-inside-avoid">
              <p>1. Pihak II meminjam sebesar <strong className="text-lg">{formatRupiah(data.loanAmount)}</strong>.</p>
              <p>2. Jatuh tempo pelunasan pada: <strong>{formatDateSafe(data.dueDate)}</strong>.</p>
              <p>3. Jika tidak lunas, aset menjadi milik Pihak I atau dijual.</p>
            </div>

            <div className="flex justify-between text-center mt-12 mb-12 text-sm break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
              <div className="w-40">
                  <p className="mb-20 font-bold uppercase underline">Pihak II</p>
                  <p className="font-bold uppercase">{data.p2Name}</p>
              </div>
              <div className="w-40">
                  <p className="mb-4 font-bold uppercase underline">Pihak I</p>
                  <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-300 uppercase">Materai</div>
                  <p className="font-bold uppercase">{data.p1Name}</p>
              </div>
            </div>
        </div>
      );
    }
  };

  if (!isClient) return null; // CRITICAL Fix for Deployment Hydration Error

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 overflow-x-hidden">
      
      {/* CSS PRINT FIXED */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 11pt; }
          .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          .print-table thead { height: 15mm; display: table-header-group; } 
          .print-table tfoot { height: 15mm; display: table-footer-group; } 
          .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
          .break-inside-avoid, tr, td { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      `}</style>

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeftCircle size={20} className="text-emerald-400" /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-widest">
               <Briefcase size={16} className="text-blue-400" /> <span>GADAI ASET BUILDER</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[160px] justify-between">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{templateId === 1 ? 'Formal (Lengkap)' : 'Ringkas (1 Hal)'}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pb-20 space-y-6 font-sans ${mobileView === 'preview' ? 'hidden lg:block' : 'block'} custom-scrollbar`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2"><CalendarDays size={14} className="text-blue-500"/><h3 className="text-xs font-black uppercase text-slate-700">Waktu & Tempat</h3></div>
                <button onClick={handleReset} title="Reset Form" className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"><RotateCcw size={14}/></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Hari" />
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                <div className="col-span-2"><input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><User size={14} className="text-blue-500"/><h3 className="text-xs font-black uppercase text-slate-700">Pihak Terlibat</h3></div>
              <div className="space-y-4">
                <div className="p-3 border rounded-xl bg-slate-50/50 space-y-2">
                  <label className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block mb-1">Penerima Gadai (Pihak I)</label>
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama Lengkap" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="NIK KTP" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                  <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Alamat Sesuai KTP" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                </div>
                <div className="p-3 border rounded-xl bg-slate-50/50 space-y-2">
                  <label className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-1">Pemberi Gadai (Pihak II)</label>
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Lengkap" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="NIK KTP" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                  <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Alamat Sesuai KTP" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Box size={14} className="text-blue-500"/><h3 className="text-xs font-black uppercase text-slate-700">Aset Jaminan</h3></div>
              <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Barang (Misal: Motor Vario)" value={data.assetName} onChange={e => handleDataChange('assetName', e.target.value)} />
              <textarea className="w-full p-2 border rounded-lg text-xs h-20 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Detail Teknis (No Rangka, Mesin, Kondisi, Kelengkapan)" value={data.assetDetail} onChange={e => handleDataChange('assetDetail', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Wallet size={14} className="text-blue-500"/><h3 className="text-xs font-black uppercase text-slate-700">Pinjaman & Jatuh Tempo</h3></div>
              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Rp</span>
                  <input type="number" className="w-full pl-8 pr-4 py-2 border rounded-lg text-xs font-black text-blue-700 focus:ring-2 focus:ring-blue-500 outline-none" value={data.loanAmount} onChange={e => handleDataChange('loanAmount', parseInt(e.target.value))} />
                </div>
                <input className="w-full p-2 border rounded-lg text-xs italic bg-slate-50" placeholder="Terbilang (Cth: Sepuluh Juta Rupiah)" value={data.loanAmountText} onChange={e => handleDataChange('loanAmountText', e.target.value)} />
                <div className="grid grid-cols-2 gap-3 pt-2">
                   <div>
                      <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Jatuh Tempo</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={data.dueDate} onChange={e => handleDataChange('dueDate', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Bunga / Biaya (%)</label>
                      <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.interest} onChange={e => handleDataChange('interest', e.target.value)} />
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Scale size={14} className="text-blue-500"/><h3 className="text-xs font-black uppercase text-slate-700">Legalitas & Saksi</h3></div>
              <div className="grid grid-cols-2 gap-3">
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Saksi 1" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Saksi 2" />
              </div>
              <textarea className="w-full p-2 border rounded-lg text-xs h-24 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed" value={data.additionalClause} onChange={e => handleDataChange('additionalClause', e.target.value)} placeholder="Klausul Tambahan (Opsional)..." />
           </div>
           <div className="h-20 lg:hidden"></div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-0 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col shadow-2xl">
                  <ContentInside />
                </div>
            </div>
            
            {/* INJEKSI KOMPONEN MONETISASI */}
            <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
        </div>

      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-[100] h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
            <ContentInside />
         </div>
      </div>

    </div>
  );
}