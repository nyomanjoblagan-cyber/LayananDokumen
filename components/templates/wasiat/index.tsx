'use client';

/**
 * FILE: TestamentDocumentPage.tsx
 * DESC: Generator Surat Wasiat (Last Will and Testament) Legal Premium
 * STATUS: PRODUCTION READY (ZERO TRUNCATION)
 * FEATURES: Premium UI, Dynamic Beneficiaries, Legal Clauses, 100% Full Code
 */

import React, { useState, useEffect, Suspense } from 'react';
import { 
  Printer, Trash2, LayoutTemplate, Edit3, Gavel, Scroll, RotateCcw, 
  ArrowLeftCircle, UserCircle2, Heart, Scale, FileSignature, BookKey,
  Building, MapPin, ChevronDown, CheckCircle2, AlertCircle, Eye
} from 'lucide-react';
import Link from 'next/link';

// Asumsi menggunakan PrintWrapper dari project
import PrintWrapper from '@/components/PrintWrapper';

// --- TYPE DEFINITIONS ---
interface Beneficiary {
  id: string;
  name: string;
  nik: string;
  relation: string;
  item: string;
}

interface TestamentData {
  testatorName: string;
  testatorNik: string;
  testatorAddress: string;
  testatorBirthPlace: string;
  testatorBirthDate: string;
  testatorJob: string;
  
  executorName: string;
  executorNik: string;
  executorRelation: string;

  beneficiaries: Beneficiary[];
  
  specialMessage: string;
  
  witness1Name: string;
  witness1Nik: string;
  witness2Name: string;
  witness2Nik: string;
  
  notaryName: string;
  notaryRegion: string;
  
  city: string;
  date: string;
}

// --- GLOBAL CONSTANTS & INITIAL DATA ---
const TEMPLATES = [
  { id: 1, name: "Legal Standard (Notariil)", desc: "Format resmi standar notaris Indonesia" },
  { id: 2, name: "Classic Heritage", desc: "Format klasik dengan tipografi elegan" }
];

const INITIAL_DATA: TestamentData = {
  testatorName: 'H. MUHAMMAD YUSUF, S.E.',
  testatorNik: '3471010101700001',
  testatorAddress: 'Jl. Malioboro No. 10, RT 01/RW 02, Sosromenduran, Gedong Tengen, Kota Yogyakarta, DIY 55271',
  testatorBirthPlace: 'Yogyakarta',
  testatorBirthDate: '1970-05-15',
  testatorJob: 'Wiraswasta',
  
  executorName: 'ABDULLAH SALIM, S.H.',
  executorNik: '3471020202800002',
  executorRelation: 'Pengacara Keluarga (Kuasa Hukum)',

  beneficiaries: [
    { 
      id: '1', 
      name: 'SITI FATIMAH', 
      nik: '3471030303900003', 
      relation: 'Istri', 
      item: 'Satu unit rumah tinggal permanen beserta hak atas tanahnya (SHM No. 12345/Sosromenduran) yang terletak di Jl. Malioboro No. 10, Yogyakarta, beserta seluruh isinya.' 
    },
    { 
      id: '2', 
      name: 'AHMAD RIZKY', 
      nik: '3471040404000004', 
      relation: 'Anak Kandung', 
      item: 'Seluruh portofolio investasi saham, obligasi, dan reksa dana yang tercatat di PT Sinarmas Sekuritas atas nama pewasiat.' 
    }
  ],
  
  specialMessage: 'Saya berwasiat agar seluruh keluarga tetap menjaga kerukunan, mengutamakan musyawarah mufakat dalam pembagian harta, tidak berselisih, dan senantiasa menyisihkan sebagian harta untuk disedekahkan atas nama saya.',
  
  witness1Name: 'Ir. BAMBANG SUTRISNO',
  witness1Nik: '3471050505700005',
  witness2Name: 'Drs. HARTONO',
  witness2Nik: '3471060606700006',
  
  notaryName: 'ANITA WIJAYA, S.H., M.Kn.',
  notaryRegion: 'Kota Yogyakarta',
  
  city: 'Yogyakarta',
  date: ''
};

// --- HELPER COMPONENTS & FUNCTIONS ---
const generateId = () => Math.random().toString(36).substr(2, 9);

const formatDateIndo = (dateStr: string) => {
  if (!dateStr) return '..............................';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch {
    return dateStr;
  }
};

export default function TestamentDocumentPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Scale className="w-12 h-12 text-amber-600" />
          <span className="text-slate-500 font-bold tracking-widest text-sm uppercase">Memuat Sistem Legal...</span>
        </div>
      </div>
    }>
      <TestamentBuilder />
    </Suspense>
  );
}

function TestamentBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<TestamentData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const updateData = (field: keyof TestamentData, value: any) => setData(prev => ({ ...prev, [field]: value }));
  
  const addBeneficiary = () => {
    setData(prev => ({
      ...prev,
      beneficiaries: [...prev.beneficiaries, { id: generateId(), name: '', nik: '', relation: '', item: '' }]
    }));
  };
  
  const removeBeneficiary = (id: string) => {
    if (data.beneficiaries.length <= 1) return alert('Minimal harus ada 1 ahli waris/penerima wasiat.');
    setData(prev => ({
      ...prev,
      beneficiaries: prev.beneficiaries.filter(b => b.id !== id)
    }));
  };

  const updateBeneficiary = (id: string, field: keyof Beneficiary, value: string) => {
    setData(prev => ({
      ...prev,
      beneficiaries: prev.beneficiaries.map(b => b.id === id ? { ...b, [field]: value } : b)
    }));
  };

  const resetData = () => {
    if(window.confirm('Apakah Anda yakin ingin mereset seluruh data dokumen wasiat ini?')) {
      setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- DOCUMENT COMPONENT (RENDERED FOR PREVIEW AND PRINT) ---
  const DocumentRenderer = () => {
    const isClassic = templateId === 2;
    
    return (
      <div className={`text-black leading-relaxed print:text-black ${isClassic ? 'font-serif' : 'font-sans'} text-[11pt]`}>
        
        {/* --- HALAMAN 1 : PENDAHULUAN & IDENTITAS --- */}
        <div className="w-[210mm] min-h-[297mm] p-[25mm] print:p-0 bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] print:shadow-none mx-auto mb-8 print:mb-0 box-border flex flex-col relative break-after-page print:w-full print:h-auto print:min-h-0 print:m-0 border border-slate-200 print:border-none">
          
          {/* Header */}
          <div className="text-center mb-12 border-b-4 border-double border-slate-900 pb-6 print:border-black">
            <h1 className={`text-2xl font-black uppercase tracking-[0.2em] mb-2 ${isClassic ? 'font-serif' : 'font-sans'}`}>
              Surat Wasiat
            </h1>
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-500 print:text-slate-600">
              (Last Will and Testament)
            </h2>
          </div>

          <div className="flex-grow space-y-6 text-justify">
            <p className="indent-8">
              Pada hari ini, tanggal <strong>{formatDateIndo(data.date)}</strong>, di kota <strong>{data.city}</strong>, saya yang bertanda tangan di bawah ini:
            </p>

            <div className="pl-4 border-l-2 border-slate-300 print:border-black space-y-2 py-2 ml-4">
              <div className="grid grid-cols-[180px_15px_1fr] items-start">
                <span className="font-semibold">Nama Lengkap</span><span>:</span>
                <span className="font-bold uppercase">{data.testatorName}</span>
              </div>
              <div className="grid grid-cols-[180px_15px_1fr] items-start">
                <span className="font-semibold">Nomor Induk Kependudukan</span><span>:</span>
                <span className="font-mono">{data.testatorNik}</span>
              </div>
              <div className="grid grid-cols-[180px_15px_1fr] items-start">
                <span className="font-semibold">Tempat, Tanggal Lahir</span><span>:</span>
                <span>{data.testatorBirthPlace}, {formatDateIndo(data.testatorBirthDate)}</span>
              </div>
              <div className="grid grid-cols-[180px_15px_1fr] items-start">
                <span className="font-semibold">Pekerjaan</span><span>:</span>
                <span>{data.testatorJob}</span>
              </div>
              <div className="grid grid-cols-[180px_15px_1fr] items-start">
                <span className="font-semibold">Alamat Lengkap</span><span>:</span>
                <span>{data.testatorAddress}</span>
              </div>
            </div>

            <p>
              (Selanjutnya dalam surat wasiat ini disebut sebagai <strong>"PEWASIAT"</strong>).
            </p>

            <p className="indent-8">
              Dengan kesadaran penuh, berakal sehat, tanpa adanya paksaan, tekanan, atau pengaruh dari pihak manapun, serta dalam keadaan sehat jasmani dan rohani, dengan ini menerangkan dan menyatakan kehendak terakhir saya sebagai berikut:
            </p>

            <div className="space-y-4 pt-4">
              <h3 className="font-black text-center uppercase tracking-widest text-sm border-y border-slate-300 print:border-black py-2 my-6">
                Pasal 1: Pencabutan Wasiat Terdahulu
              </h3>
              <p>
                Bahwa dengan ditandatanganinya Surat Wasiat ini, saya mencabut, membatalkan, dan menyatakan tidak berlaku lagi segala macam surat wasiat, hibah wasiat, atau pesan-pesan pesanan (codicil) yang mungkin pernah saya buat atau tandatangani sebelum tanggal Surat Wasiat ini.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-black text-center uppercase tracking-widest text-sm border-y border-slate-300 print:border-black py-2 my-6">
                Pasal 2: Penunjukan Pelaksana Wasiat (Executeur Testamentair)
              </h3>
              <p>
                Untuk memastikan seluruh ketentuan dalam Surat Wasiat ini dilaksanakan dengan sebaik-baiknya, saya menunjuk dan mengangkat:
              </p>
              <div className="pl-8 space-y-1">
                <div className="grid grid-cols-[140px_15px_1fr]"><span>Nama</span><span>:</span><span className="font-bold">{data.executorName}</span></div>
                <div className="grid grid-cols-[140px_15px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.executorNik}</span></div>
                <div className="grid grid-cols-[140px_15px_1fr]"><span>Hubungan</span><span>:</span><span>{data.executorRelation}</span></div>
              </div>
              <p>
                Sebagai Pelaksana Wasiat, yang kepadanya saya berikan hak, wewenang, dan kuasa penuh untuk mengurus, menyelesaikan, dan membagi-bagikan harta peninggalan saya sesuai dengan isi Surat Wasiat ini.
              </p>
            </div>
          </div>
          
          <div className="mt-auto pt-8 flex justify-between items-end text-[9pt] text-slate-400 print:text-black italic">
            <span>Paraf Pewasiat: ________</span>
            <span>Halaman 1 dari 3</span>
          </div>
        </div>

        {/* --- HALAMAN 2 : PEMBAGIAN HARTA --- */}
        <div className="w-[210mm] min-h-[297mm] p-[25mm] print:p-0 bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] print:shadow-none mx-auto mb-8 print:mb-0 box-border flex flex-col relative break-after-page print:w-full print:h-auto print:min-h-0 print:m-0 border border-slate-200 print:border-none">
          <div className="flex-grow space-y-6 text-justify">
            
            <div className="space-y-6">
              <h3 className="font-black text-center uppercase tracking-widest text-sm border-y border-slate-300 print:border-black py-2 mb-6">
                Pasal 3: Penetapan & Pembagian Harta Warisan
              </h3>
              <p>
                Bahwa dari harta kekayaan yang saya tinggalkan setelah saya meninggal dunia kelak, baik berupa barang bergerak maupun barang tidak bergerak, hak-hak, dan kewajiban-kewajiban (setelah dikurangi biaya pemakaman dan pelunasan hutang-hutang sah), saya hibah wasiatkan (legaat) dan berikan kepada nama-nama di bawah ini:
              </p>

              <div className="space-y-8 pl-4">
                {data.beneficiaries.map((ben, idx) => (
                  <div key={ben.id} className="relative break-inside-avoid">
                    <div className="absolute -left-6 font-bold">{idx + 1}.</div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-[140px_15px_1fr] bg-slate-50 print:bg-transparent p-2 rounded">
                        <span className="font-semibold">Nama Penerima</span><span>:</span>
                        <span className="font-bold uppercase">{ben.name}</span>
                      </div>
                      <div className="grid grid-cols-[140px_15px_1fr] px-2">
                        <span>NIK</span><span>:</span>
                        <span className="font-mono">{ben.nik}</span>
                      </div>
                      <div className="grid grid-cols-[140px_15px_1fr] px-2">
                        <span>Hubungan Keluarga</span><span>:</span>
                        <span>{ben.relation}</span>
                      </div>
                      <div className="grid grid-cols-[140px_15px_1fr] items-start px-2 mt-2">
                        <span className="font-semibold text-slate-700 print:text-black">Objek Wasiat</span><span>:</span>
                        <span className="italic leading-relaxed">{ben.item}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8">
                Penyerahan harta warisan sebagaimana disebutkan di atas harus dilakukan oleh Pelaksana Wasiat sesegera mungkin setelah seluruh kewajiban administrasi, pajak waris (jika ada), dan hutang piutang Pewasiat diselesaikan dengan tuntas.
              </p>
            </div>

          </div>
          
          <div className="mt-auto pt-8 flex justify-between items-end text-[9pt] text-slate-400 print:text-black italic">
            <span>Paraf Pewasiat: ________</span>
            <span>Halaman 2 dari 3</span>
          </div>
        </div>

        {/* --- HALAMAN 3 : AMANAT & PENGESAHAN --- */}
        <div className="w-[210mm] min-h-[297mm] p-[25mm] print:p-0 bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] print:shadow-none mx-auto mb-8 print:mb-0 box-border flex flex-col relative break-after-page print:w-full print:h-auto print:min-h-0 print:m-0 border border-slate-200 print:border-none">
          <div className="flex-grow space-y-6 text-justify">
            
            <div className="space-y-4">
              <h3 className="font-black text-center uppercase tracking-widest text-sm border-y border-slate-300 print:border-black py-2 mb-6">
                Pasal 4: Pesan & Amanat Khusus
              </h3>
              <div className="p-6 border-2 border-slate-200 print:border-black rounded-lg bg-slate-50 print:bg-transparent italic text-lg text-center leading-relaxed font-serif">
                "{data.specialMessage}"
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h3 className="font-black text-center uppercase tracking-widest text-sm border-y border-slate-300 print:border-black py-2 mb-6">
                Pasal 5: Ketentuan Penutup
              </h3>
              <p>
                Demikian Surat Wasiat ini saya buat dan tanda tangani pada hari, tanggal, dan tempat sebagaimana disebutkan pada awal surat. Surat Wasiat ini dibuat dan ditandatangani di hadapan 2 (dua) orang saksi yang memenuhi syarat hukum.
              </p>
              {data.notaryName && (
                <p>
                  Salinan asli/waarmerking dari dokumen ini dicatatkan pada kantor Notaris <strong>{data.notaryName}</strong> yang berkedudukan di <strong>{data.notaryRegion}</strong> untuk menjamin kepastian hukum.
                </p>
              )}
            </div>

            {/* Area Tanda Tangan */}
            <div className="pt-16 mt-8 break-inside-avoid">
              <div className="text-right mb-16">
                <p>{data.city}, {formatDateIndo(data.date)}</p>
                <p className="font-bold">PEWASIAT,</p>
              </div>
              
              <div className="flex justify-end mb-16 relative">
                <div className="w-24 h-16 border border-slate-300 print:border-black absolute right-12 -top-10 flex items-center justify-center text-[8px] text-slate-400 print:text-black italic uppercase text-center p-1 bg-white">
                  Materai<br/>Rp 10.000
                </div>
                <div className="border-b border-black w-64 text-center pb-1">
                  <span className="font-black uppercase tracking-wider">{data.testatorName}</span>
                </div>
              </div>

              <div className="mt-20 pt-8 border-t border-slate-300 print:border-black">
                <p className="mb-16 font-bold">Saksi-saksi yang membenarkan identitas dan tanda tangan Pewasiat:</p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="mb-24 uppercase font-bold text-sm tracking-widest">Saksi I</p>
                    <div className="border-b border-black w-4/5 mx-auto pb-1 font-bold uppercase">{data.witness1Name}</div>
                    <p className="text-xs mt-1 font-mono">NIK: {data.witness1Nik}</p>
                  </div>
                  <div className="text-center">
                    <p className="mb-24 uppercase font-bold text-sm tracking-widest">Saksi II</p>
                    <div className="border-b border-black w-4/5 mx-auto pb-1 font-bold uppercase">{data.witness2Name}</div>
                    <p className="text-xs mt-1 font-mono">NIK: {data.witness2Nik}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
          
          <div className="mt-auto pt-8 flex justify-between items-end text-[9pt] text-slate-400 print:text-black italic">
            <span>Paraf Pewasiat: ________</span>
            <span>Halaman 3 dari 3</span>
          </div>
        </div>

      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 overflow-hidden">
      
      {/* GLOBAL PRINT STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-area { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-after-page { page-break-after: always !important; break-after: page !important; }
        }
      ` }} />

      {/* --- PREMIUM NAVBAR --- */}
      <nav className="no-print h-16 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-40 shadow-xl shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all">
            <ArrowLeftCircle className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-amber-500" />
            <span className="font-bold text-xs uppercase tracking-widest hidden sm:block">Dashboard</span>
          </Link>
          <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
          <div className="flex items-center gap-2">
            <div className="bg-amber-500/20 p-1.5 rounded-lg text-amber-500">
              <Scale size={18} />
            </div>
            <div>
              <h1 className="font-black text-sm tracking-tight text-white leading-none">Testament Pro</h1>
              <p className="text-[10px] text-amber-500 font-medium uppercase tracking-widest">Legal Heritage Builder</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block text-left">
            <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold transition-all shadow-inner">
              <LayoutTemplate size={14} className="text-blue-400" /> 
              {TEMPLATES.find(t => t.id === templateId)?.name} 
              <ChevronDown size={14} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
            </button>
            {showTemplateMenu && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden p-2 text-slate-900 transform origin-top-right transition-all">
                {TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 ${templateId === t.id ? 'bg-blue-50/50 ring-1 ring-blue-200' : ''}`}>
                    <div className={`mt-0.5 ${templateId === t.id ? 'text-blue-600' : 'text-slate-400'}`}>
                      {templateId === t.id ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-xs text-slate-500 leading-snug mt-0.5">{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 px-5 py-2 rounded-xl font-black text-xs uppercase shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2 border border-amber-400/50">
            <Printer size={16} /> <span className="hidden sm:inline">Cetak Dokumen</span>
          </button>
        </div>
      </nav>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-1 flex overflow-hidden relative print:block print:h-auto print:overflow-visible">
        
        {/* --- LEFT PANEL: EDITOR --- */}
        <div className={`no-print absolute inset-0 md:relative md:inset-auto md:w-[500px] lg:w-[600px] bg-white border-r border-slate-200 flex flex-col z-20 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
          <div className="h-14 bg-slate-50 border-b flex items-center justify-between px-6 shrink-0">
            <h2 className="font-black text-xs uppercase tracking-widest text-slate-600 flex items-center gap-2">
              <Edit3 size={14} className="text-blue-500" /> Editor Wasiat
            </h2>
            <button onClick={resetData} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Formulir">
              <RotateCcw size={16}/>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 custom-scrollbar bg-slate-50/50 print:block print:overflow-visible print:bg-white">
            
            {/* Section: Identitas Pewasiat */}
            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600"><UserCircle2 size={16}/></div>
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-800">Identitas Pewasiat</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">Nama Lengkap & Gelar</label>
                  <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.testatorName} onChange={e => updateData('testatorName', e.target.value)} placeholder="Contoh: H. AHMAD JUNAEDI, S.H." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">Nomor NIK</label>
                    <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.testatorNik} onChange={e => updateData('testatorNik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">Pekerjaan</label>
                    <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.testatorJob} onChange={e => updateData('testatorJob', e.target.value)} placeholder="Contoh: Wiraswasta" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">Tempat Lahir</label>
                    <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.testatorBirthPlace} onChange={e => updateData('testatorBirthPlace', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">Tanggal Lahir</label>
                    <input type="date" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.testatorBirthDate} onChange={e => updateData('testatorBirthDate', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1">Alamat Sesuai KTP</label>
                  <textarea className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm min-h-[80px] resize-y focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" value={data.testatorAddress} onChange={e => updateData('testatorAddress', e.target.value)} placeholder="Alamat domisili lengkap" />
                </div>
              </div>
            </section>

            {/* Section: Ahli Waris */}
            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600"><BookKey size={16}/></div>
                  <h3 className="font-black text-xs uppercase tracking-widest text-slate-800">Daftar Ahli Waris</h3>
                </div>
                <button onClick={addBeneficiary} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-black transition-colors border border-emerald-200">
                  + TAMBAH
                </button>
              </div>
              
              <div className="space-y-4">
                {data.beneficiaries.map((ben, idx) => (
                  <div key={ben.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group transition-all hover:border-emerald-300 hover:shadow-md">
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black text-[10px] shadow-sm border-2 border-white">
                      {idx + 1}
                    </div>
                    <button onClick={() => removeBeneficiary(ben.id)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors p-1 bg-white rounded-md shadow-sm border border-slate-100">
                      <Trash2 size={14}/>
                    </button>
                    
                    <div className="space-y-3 mt-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={ben.name} onChange={e => updateBeneficiary(ben.id, 'name', e.target.value)} placeholder="Nama Lengkap Ahli Waris" />
                        <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={ben.nik} onChange={e => updateBeneficiary(ben.id, 'nik', e.target.value)} placeholder="NIK Ahli Waris" />
                      </div>
                      <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={ben.relation} onChange={e => updateBeneficiary(ben.id, 'relation', e.target.value)} placeholder="Hubungan (Misal: Istri / Anak Kandung)" />
                      <textarea className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm min-h-[80px] resize-y focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={ben.item} onChange={e => updateBeneficiary(ben.id, 'item', e.target.value)} placeholder="Deskripsikan dengan detail Harta/Objek Warisan yang diberikan..." />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Pelaksana & Pesan */}
            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <div className="bg-rose-100 p-1.5 rounded-lg text-rose-600"><Heart size={16}/></div>
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-800">Amanat Khusus</h3>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 ml-1 flex items-center gap-1">
                  <AlertCircle size={10} /> Pesan & Nasihat Terakhir
                </label>
                <textarea className="w-full bg-amber-50/50 border border-amber-200 p-3 rounded-xl text-sm min-h-[100px] resize-y focus:ring-2 focus:ring-amber-500 focus:bg-amber-50 transition-all outline-none italic leading-relaxed text-slate-800" value={data.specialMessage} onChange={e => updateData('specialMessage', e.target.value)} placeholder="Tuliskan amanat, pesan moral, atau instruksi khusus pemakaman..." />
              </div>
            </section>

            {/* Section: Otoritas Hukum */}
            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600"><Gavel size={16}/></div>
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-800">Otoritas Legal</h3>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4 mb-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Pelaksana Wasiat (Executor)</h4>
                <div>
                  <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-indigo-500 outline-none" value={data.executorName} onChange={e => updateData('executorName', e.target.value)} placeholder="Nama Lengkap Executor" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none" value={data.executorNik} onChange={e => updateData('executorNik', e.target.value)} placeholder="NIK Executor" />
                  <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.executorRelation} onChange={e => updateData('executorRelation', e.target.value)} placeholder="Hubungan (Misal: Pengacara)" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <label className="block text-[10px] font-black text-slate-400 uppercase">Saksi Pertama</label>
                  <input className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-indigo-500 outline-none" value={data.witness1Name} onChange={e => updateData('witness1Name', e.target.value)} placeholder="Nama Saksi 1" />
                  <input className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-none" value={data.witness1Nik} onChange={e => updateData('witness1Nik', e.target.value)} placeholder="NIK Saksi 1" />
                </div>
                <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <label className="block text-[10px] font-black text-slate-400 uppercase">Saksi Kedua</label>
                  <input className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-indigo-500 outline-none" value={data.witness2Name} onChange={e => updateData('witness2Name', e.target.value)} placeholder="Nama Saksi 2" />
                  <input className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-none" value={data.witness2Nik} onChange={e => updateData('witness2Nik', e.target.value)} placeholder="NIK Saksi 2" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Keterangan Pengesahan (Opsional)</h4>
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.notaryName} onChange={e => updateData('notaryName', e.target.value)} placeholder="Nama Notaris (Opsional)" />
                   <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.notaryRegion} onChange={e => updateData('notaryRegion', e.target.value)} placeholder="Wilayah Notaris" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-bold" value={data.city} onChange={e => updateData('city', e.target.value)} placeholder="Kota Penandatanganan" />
                    <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.date} onChange={e => updateData('date', e.target.value)} />
                 </div>
              </div>
            </section>
          </div>
        </div>

        {/* --- RIGHT PANEL: LIVE PREVIEW --- */}
        <div className={`no-print flex-1 bg-slate-300 overflow-y-auto relative p-4 sm:p-8 flex-col items-center custom-scrollbar shadow-inner ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
           <div className="w-full max-w-[210mm] mx-auto origin-top transition-transform duration-300">
               {/* Wrapper untuk scaling agar fit layar di ukuran kecil */}
               <div className="transform scale-[0.45] sm:scale-75 lg:scale-90 xl:scale-100 origin-top mb-[-150mm] sm:mb-[-50mm] xl:mb-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                  <DocumentRenderer />
               </div>
           </div>
        </div>

      </main>

      {/* --- MOBILE NAVIGATION TABS --- */}
      <div className="no-print md:hidden fixed bottom-4 left-4 right-4 z-50 h-14 bg-slate-900/90 backdrop-blur-xl rounded-2xl flex p-1.5 shadow-2xl font-sans font-bold border border-slate-700/50">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}>
            <Edit3 size={14} /> Editor
          </button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${mobileView === 'preview' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
            <Eye size={14} /> Preview
          </button>
      </div>

      {/* --- PRINT MOUNT AREA --- */}
      <div id="print-options" className="no-print w-full max-w-[210mm] mx-auto p-4 mb-20 md:mb-10">
         <PrintWrapper documentName={`Surat_Wasiat_${data.testatorName.replace(/\s+/g, '_')}`} price={35000} />
      </div>

      {/* Hidden print area for printing styles */}
      <div id="print-area" className="hidden">
        <DocumentRenderer />
      </div>

    </div>
  );
}
