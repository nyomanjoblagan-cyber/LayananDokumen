'use client';

/**
 * FILE: HutangPiutangPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Perjanjian Hutang Piutang
 * FEATURES:
 * - Dual Template (Formal Legal vs Simple)
 * - Auto Date Logic
 * - Quick Preset Data
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Wallet, Landmark, Users, CalendarClock, Edit3, Eye, Briefcase, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface DebtData {
  city: string;
  date: string;

  // Pihak 1 (Kreditur)
  p1Name: string;
  p1Nik: string;
  p1Job: string;
  p1Address: string;

  // Pihak 2 (Debitur)
  p2Name: string;
  p2Nik: string;
  p2Job: string;
  p2Address: string;

  // Rincian Hutang
  amount: number;
  amountText: string;
  loanDate: string;
  
  // Cara Bayar
  paymentType: string;
  dueDate: string;
  installmentAmount: string;
  paymentMethod: string;

  // Jaminan & Sanksi
  collateral: string;
  penalty: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DebtData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect

  p1Name: 'BUDI SANTOSO',
  p1Nik: '3171010101800001',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Menteng Atas No. 5, Jakarta Selatan',

  p2Name: 'ASEP SAEPULOH',
  p2Nik: '3201010101900002',
  p2Job: 'Karyawan Swasta',
  p2Address: 'Jl. Raya Bogor KM 30, Depok',

  amount: 50000000,
  amountText: 'Lima Puluh Juta Rupiah',
  loanDate: '', // Diisi useEffect
  
  paymentType: 'Cicilan Bertahap',
  dueDate: '', // Diisi useEffect
  installmentAmount: 'Rp 2.500.000 per bulan',
  paymentMethod: 'Transfer ke BCA 1234567890 a.n Budi Santoso',

  collateral: 'BPKB Motor Honda PCX Tahun 2022 (Plat B 1234 XYZ)',
  penalty: 'Apabila terlambat membayar, dikenakan denda 1% per hari.',
  
  witness1: 'Iwan (Adik Pihak 2)',
  witness2: 'Ketua RT 05'
};

// --- 3. KOMPONEN UTAMA ---
export default function HutangPiutangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Keuangan...</div>}>
      <DebtAgreementBuilder />
    </Suspense>
  );
}

function DebtAgreementBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DebtData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        loanDate: today.toISOString().split('T')[0],
        dueDate: nextYear.toISOString().split('T')[0]
    }));
  }, []);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleDataChange = (field: keyof DebtData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const applyPreset = (type: 'personal' | 'business') => {
    if (type === 'personal') {
      setData(prev => ({
        ...prev,
        amount: 5000000,
        amountText: 'Lima Juta Rupiah',
        paymentType: 'Lunas Sekaligus',
        installmentAmount: '-',
        collateral: 'Tanpa Jaminan',
        penalty: 'Musyawarah kekeluargaan.',
      }));
      setTemplateId(2); 
    } else if (type === 'business') {
      setData(prev => ({
        ...prev,
        amount: 100000000,
        amountText: 'Seratus Juta Rupiah',
        paymentType: 'Cicilan Bertahap',
        installmentAmount: 'Rp 10.000.000 setiap tanggal 5',
        collateral: 'Sertifikat Tanah SHM No. 12345',
        penalty: 'Denda 5% per bulan keterlambatan.',
      }));
      setTemplateId(1); 
    }
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            loanDate: today.toISOString().split('T')[0],
            dueDate: nextYear.toISOString().split('T')[0] 
        });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Legal Formal (Lengkap)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Sederhana (Ringkas)
        </button>
    </div>
  );

  // --- ISI DOKUMEN ---
  const DocumentContent = () => (
    <div className="w-full h-full relative text-slate-900 font-serif text-[11pt]">
      
      {/* TEMPLATE 1: FORMAL (2 HALAMAN MANUAL SPLIT) */}
      {templateId === 1 && (
        <div className="flex flex-col gap-10 print:block print:gap-0">
           
           {/* HALAMAN 1 */}
           <div className="bg-white w-[210mm] min-h-[297mm] p-[25mm] shadow-2xl print:shadow-none relative flex flex-col page-break">
               <div className="text-center mb-6 pb-2 border-b-2 border-black">
                  <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN HUTANG PIUTANG</h1>
               </div>

               <p className="mb-4 text-justify leading-relaxed">Pada hari ini, <strong>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {weekday:'long'}) : '...'}</strong>, tanggal <strong>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</strong>, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:</p>

               <div className="space-y-4 mb-6 text-sm">
                  {/* PIHAK 1 */}
                  <div className="ml-4">
                    <div className="font-bold underline text-xs uppercase mb-1">I. PIHAK PERTAMA (PEMBERI HUTANG)</div>
                    <table className="w-full leading-snug">
                        <tbody>
                          <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                          <tr><td>NIK</td><td>:</td><td>{data.p1Nik}</td></tr>
                          <tr><td>Pekerjaan</td><td>:</td><td>{data.p1Job}</td></tr>
                          <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                        </tbody>
                    </table>
                  </div>

                  {/* PIHAK 2 */}
                  <div className="ml-4">
                    <div className="font-bold underline text-xs uppercase mb-1">II. PIHAK KEDUA (PENERIMA HUTANG)</div>
                    <table className="w-full leading-snug">
                        <tbody>
                          <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                          <tr><td>NIK</td><td>:</td><td>{data.p2Nik}</td></tr>
                          <tr><td>Pekerjaan</td><td>:</td><td>{data.p2Job}</td></tr>
                          <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                        </tbody>
                    </table>
                  </div>
               </div>

               <p className="mb-4 leading-relaxed">Para Pihak sepakat untuk mengadakan perjanjian hutang piutang dengan ketentuan dan syarat-syarat sebagai berikut:</p>

               <div className="space-y-4 text-sm flex-grow">
                  {/* PASAL 1-3 DI HALAMAN 1 AGAR PADAT */}
                  <div>
                      <div className="font-bold uppercase text-xs underline mb-1">PASAL 1 : JUMLAH PINJAMAN</div>
                      <p className="text-justify leading-relaxed">
                         Pihak Pertama memberikan pinjaman uang kepada Pihak Kedua sebesar <strong>{formatRupiah(data.amount)}</strong> (<em>{data.amountText}</em>). 
                         Pihak Kedua mengakui telah menerima uang tersebut secara lengkap pada tanggal {isClient && data.loanDate ? new Date(data.loanDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}.
                      </p>
                  </div>

                  <div>
                      <div className="font-bold uppercase text-xs underline mb-1">PASAL 2 : MEKANISME PENGEMBALIAN</div>
                      <ul className="list-decimal ml-5 space-y-1 text-justify leading-relaxed">
                         <li>Pihak Kedua berjanji akan mengembalikan hutang tersebut dengan sistem <strong>{data.paymentType.toUpperCase()}</strong>.</li>
                         {data.paymentType === 'Cicilan Bertahap' && <li>Besaran angsuran yang disepakati adalah: {data.installmentAmount}.</li>}
                         <li>Pembayaran akan dilakukan melalui {data.paymentMethod}.</li>
                         <li>Seluruh hutang tersebut wajib LUNAS selambat-lambatnya pada tanggal <strong>{isClient && data.dueDate ? new Date(data.dueDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</strong>.</li>
                      </ul>
                  </div>
                  
                  <div>
                      <div className="font-bold uppercase text-xs underline mb-1">PASAL 3 : JAMINAN (AGUNAN)</div>
                      <p className="text-justify leading-relaxed">Sebagai jaminan pelunasan hutang, Pihak Kedua menyerahkan: <strong>{data.collateral}</strong>. Jaminan akan dikembalikan utuh kepada Pihak Kedua segera setelah seluruh kewajiban hutang lunas.</p>
                  </div>
               </div>
               
               <div className="mt-8 text-center text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
           </div>

           {/* HALAMAN 2 */}
           <div className="bg-white w-[210mm] min-h-[297mm] p-[25mm] shadow-2xl print:shadow-none relative flex flex-col justify-between">
               <div>
                   {/* ISI LANJUTAN */}
                   <div className="space-y-6 text-sm">
                      <div>
                          <div className="font-bold uppercase text-xs underline mb-2">PASAL 4 : SANKSI & KETERLAMBATAN</div>
                          <p className="text-justify leading-relaxed">{data.penalty}</p>
                          <p className="text-justify mt-2 leading-relaxed">Apabila Pihak Kedua Wanprestasi atau tidak dapat melunasi hutang hingga jatuh tempo, maka Pihak Pertama memiliki hak penuh untuk menjual/melelang barang jaminan yang disebutkan pada Pasal 3 guna menutupi sisa hutang Pihak Kedua.</p>
                      </div>

                      <div>
                          <div className="font-bold uppercase text-xs underline mb-2">PASAL 5 : PENYELESAIAN PERSELISIHAN</div>
                          <p className="text-justify leading-relaxed">Apabila terjadi perselisihan sehubungan dengan perjanjian ini, kedua belah pihak sepakat untuk menyelesaikannya secara kekeluargaan (musyawarah untuk mufakat). Apabila tidak tercapai kata sepakat, maka akan diselesaikan melalui jalur hukum yang berlaku.</p>
                      </div>
                   </div>

                   <p className="mt-8 mb-8 text-justify italic text-sm leading-relaxed">Demikian Surat Perjanjian ini dibuat dalam rangkap 2 (dua) bermaterai cukup dan masing-masing pihak memiliki kekuatan hukum yang sama.</p>

                   {/* TANDA TANGAN */}
                   <div className="mt-8">
                       <div className="flex justify-center gap-16 text-center mb-12">
                          <div className="w-56">
                             <p className="mb-20 font-bold uppercase text-xs tracking-widest">Pihak Kedua (Debitur)</p>
                             <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[9px] text-slate-400">MATERAI</div>
                             <p className="font-bold underline uppercase text-xs leading-tight">{data.p2Name}</p>
                          </div>
                          <div className="w-56">
                             <p className="mb-24 font-bold uppercase text-xs tracking-widest">Pihak Pertama (Kreditur)</p>
                             <p className="font-bold underline uppercase text-xs leading-tight">{data.p1Name}</p>
                          </div>
                       </div>

                       <div className="flex justify-center gap-16 text-center text-xs">
                          <div className="w-56">
                             <p className="mb-16 font-bold text-slate-400 uppercase tracking-widest">Saksi I</p>
                             <p className="border-b border-black w-full pb-1 leading-none">{data.witness1}</p>
                          </div>
                          <div className="w-56">
                             <p className="mb-16 font-bold text-slate-400 uppercase tracking-widest">Saksi II</p>
                             <p className="border-b border-black w-full pb-1 leading-none">{data.witness2}</p>
                          </div>
                       </div>
                   </div>
               </div>

               <div className="text-center text-[10px] text-slate-400 italic mt-8">Halaman 2 dari 2</div>
           </div>
        </div>
      )}

      {/* TEMPLATE 2: SIMPLE (1 HALAMAN) */}
      {templateId === 2 && (
        <div className="font-serif text-[10pt] leading-relaxed p-[25mm] print:p-[25mm] bg-white w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none mx-auto">
            <div className="text-center mb-6 border-b-2 border-black pb-2">
              <h1 className="font-bold text-lg uppercase underline tracking-widest">SURAT PERNYATAAN HUTANG</h1>
            </div>

            <p className="mb-4 text-justify">Saya yang bertanda tangan di bawah ini:</p>

            <div className="ml-4 mb-4 text-sm">
              <table className="w-full">
                  <tbody>
                    <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="uppercase font-bold">{data.p2Name}</td></tr>
                    <tr><td>NIK</td><td>:</td><td>{data.p2Nik}</td></tr>
                    <tr><td>Alamat</td><td>:</td><td>{data.p2Address}</td></tr>
                  </tbody>
              </table>
            </div>

            <p className="mb-4 text-justify">
               Dengan ini menyatakan sesungguhnya bahwa saya memiliki hutang kepada:
            </p>

            <div className="ml-4 mb-4 text-sm">
               <table className="w-full">
                  <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="uppercase font-bold">{data.p1Name}</td></tr>
                      <tr><td>Alamat</td><td>:</td><td>{data.p1Address}</td></tr>
                  </tbody>
               </table>
            </div>

            <div className="bg-slate-50 border border-slate-300 p-4 mb-4 text-sm rounded">
               <table className="w-full">
                  <tbody>
                      <tr><td className="w-28 font-bold">Nominal</td><td>:</td><td className="font-bold">{formatRupiah(data.amount)}</td></tr>
                      <tr><td className="font-bold">Terbilang</td><td>:</td><td className="italic">{data.amountText}</td></tr>
                      <tr><td className="font-bold">Jatuh Tempo</td><td>:</td><td className="font-bold text-red-600">{isClient && data.dueDate ? new Date(data.dueDate).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</td></tr>
                      <tr><td className="font-bold align-top">Jaminan</td><td className="align-top">:</td><td className="italic">{data.collateral}</td></tr>
                  </tbody>
               </table>
            </div>

            <p className="mb-8 text-justify">
               Saya berjanji akan melunasi hutang tersebut tepat waktu. Apabila melanggar, saya bersedia dituntut sesuai hukum yang berlaku atau menyerahkan jaminan.
            </p>

            <div className="flex justify-end text-center mt-auto mb-4">
               <div className="w-56">
                  <p className="mb-1 text-xs">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</p>
                  <p className="mb-2 font-bold text-xs uppercase tracking-widest">Yang Menyatakan,</p>
                  <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[7pt] text-slate-300">MATERAI</div>
                  <p className="font-bold underline uppercase text-sm">{data.p2Name}</p>
               </div>
            </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          .page-break { page-break-after: always !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            z-index: 9999; 
            background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Briefcase size={16} /> <span>DEBT AGREEMENT EDITOR</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT (SLIDING ANIMATION) */}
        <div className={`no-print w-full md:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Perjanjian</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              {/* Quick Preset */}
              <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                   <Wallet size={14} className="text-emerald-600" />
                   <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis</h3>
                </div>
                <div className="p-4 grid grid-cols-2 gap-2">
                   <button onClick={() => applyPreset('personal')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                      <Users size={12} className="mr-1"/> Personal (Keluarga)
                   </button>
                   <button onClick={() => applyPreset('business')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                      <Landmark size={12} className="mr-1"/> Bisnis (Besar)
                   </button>
                </div>
              </div>

              {/* Identitas */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-6">
                <div className="border-l-4 border-green-500 pl-3">
                   <h4 className="text-xs font-bold text-green-600 mb-2 uppercase">Pemberi Hutang (Pihak 1)</h4>
                   <div className="space-y-2">
                      <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                         <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                      </div>
                      <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                   </div>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                   <h4 className="text-xs font-bold text-red-600 mb-2 uppercase">Penerima Hutang (Pihak 2)</h4>
                   <div className="space-y-2">
                      <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                         <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                      </div>
                      <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                   </div>
                </div>
              </div>

              {/* Rincian Hutang */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                <div className="flex items-center gap-2 border-b pb-2"><Wallet size={14}/><h3 className="text-xs font-bold uppercase">Rincian Hutang</h3></div>
                <div className="space-y-3">
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Jumlah Pinjaman</label>
                      <input type="number" className="w-full p-2 border rounded text-sm font-bold" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} />
                      <div className="text-[10px] font-bold text-emerald-600 text-right">{formatRupiah(data.amount)}</div>
                   </div>
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Terbilang</label>
                      <textarea className="w-full p-2 border rounded text-xs h-12" value={data.amountText} onChange={e => handleDataChange('amountText', e.target.value)} />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div>
                         <label className="text-[10px] text-slate-500 font-bold block mb-1">Tanggal Pinjam</label>
                         <input type="date" className="w-full p-2 border rounded text-xs" value={data.loanDate} onChange={e => handleDataChange('loanDate', e.target.value)} />
                      </div>
                      <div>
                         <label className="text-[10px] text-slate-500 font-bold block mb-1">Jatuh Tempo</label>
                         <input type="date" className="w-full p-2 border rounded text-xs" value={data.dueDate} onChange={e => handleDataChange('dueDate', e.target.value)} />
                      </div>
                   </div>
                </div>
              </div>

              {/* Pembayaran & Jaminan */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                <div className="flex items-center gap-2 border-b pb-2"><CalendarClock size={14}/><h3 className="text-xs font-bold uppercase">Pembayaran & Jaminan</h3></div>
                <div className="space-y-3">
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Sistem Pembayaran</label>
                      <select className="w-full p-2 border rounded text-xs bg-white" value={data.paymentType} onChange={e => handleDataChange('paymentType', e.target.value)}>
                         <option value="Lunas Sekaligus">Lunas Sekaligus (Di Akhir)</option>
                         <option value="Cicilan Bertahap">Cicilan Bertahap</option>
                      </select>
                   </div>
                   {data.paymentType === 'Cicilan Bertahap' && (
                      <div>
                         <label className="text-[10px] text-slate-500 font-bold block mb-1">Rincian Cicilan</label>
                         <input className="w-full p-2 border rounded text-xs" value={data.installmentAmount} onChange={e => handleDataChange('installmentAmount', e.target.value)} placeholder="Contoh: 1 Juta per bulan" />
                      </div>
                   )}
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Metode Transfer/Tunai</label>
                      <input className="w-full p-2 border rounded text-xs" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Jaminan (Agunan)</label>
                      <textarea className="w-full p-2 border rounded text-xs h-16" value={data.collateral} onChange={e => handleDataChange('collateral', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Sanksi Denda</label>
                      <textarea className="w-full p-2 border rounded text-xs h-16" value={data.penalty} onChange={e => handleDataChange('penalty', e.target.value)} />
                   </div>
                </div>
              </div>

              {/* SAKSI */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                <div className="flex items-center gap-2 border-b pb-2"><Users size={14}/><h3 className="text-xs font-bold uppercase">Saksi-Saksi</h3></div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Saksi 1</label>
                      <input className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Saksi 2</label>
                      <input className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] text-slate-500 font-bold block mb-1">Kota</label>
                   <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-0 md:p-8 overflow-y-auto overflow-x-auto h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full max-w-full flex justify-center items-start pt-4 md:pt-0 min-w-[210mm] md:min-w-0">
             <div className="relative origin-top-left md:origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-0 shadow-2xl">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                  <DocumentContent />
                </div>
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
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
