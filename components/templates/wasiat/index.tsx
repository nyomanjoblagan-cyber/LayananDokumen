'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: TestamentDocumentPage.tsx
 * DESC: Generator Surat Wasiat (Last Will and Testament) Legal Premium
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 */

import React, { useState, useEffect, Suspense } from 'react';
import { 
  Printer, Trash2, LayoutTemplate, Edit3, Gavel, Scroll, RotateCcw, 
  ArrowLeftCircle, UserCircle2, Heart, Scale, FileSignature, BookKey,
  Building, MapPin, ChevronDown, CheckCircle2, AlertCircle, Eye, PlusCircle
} from 'lucide-react';
import Link from 'next/link';
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
  date: '2026-07-13'
};

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

// --- KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- KOMPONEN UTAMA ---
export default function TestamentDocumentPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Wasiat...</div>}>
      <TestamentBuilder />
    </Suspense>
  );
}

function TestamentBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pewasiat' | 'eksekutor' | 'ahliwaris' | 'saksi'>('pewasiat');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<TestamentData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof TestamentData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleBeneficiaryChange = (id: string, field: keyof Beneficiary, value: any) => {
    const newBeneficiaries = data.beneficiaries.map(b => b.id === id ? { ...b, [field]: value } : b);
    handleChange('beneficiaries', newBeneficiaries);
  };

  const addBeneficiary = () => {
    const newB: Beneficiary = { id: Date.now().toString(), name: '', nik: '', relation: '', item: '' };
    handleChange('beneficiaries', [...data.beneficiaries, newB]);
  };

  const removeBeneficiary = (id: string) => {
    if (data.beneficiaries.length > 1) {
        handleChange('beneficiaries', data.beneficiaries.filter(b => b.id !== id));
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-10 break-inside-avoid">
        <h1 className="text-2xl font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">SURAT WASIAT</h1>
        <p className="mt-2 text-sm font-semibold tracking-widest">(LAST WILL AND TESTAMENT)</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Pada hari ini, tanggal {formatDateDisplay(data.date)}, bertempat di {data.city}, saya yang bertanda tangan di bawah ini:</p>
      </div>

      {/* PEWASIAT */}
      <div className="mb-6 pl-4 border-l-2 border-black ml-4 break-inside-avoid">
        <div className="flex mb-1"><div className="w-40 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.testatorName}</div></div>
        <div className="flex mb-1"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.testatorNik}</div></div>
        <div className="flex mb-1"><div className="w-40">Tempat, Tgl Lahir</div><div className="w-4">:</div><div className="flex-1">{data.testatorBirthPlace}, {formatDateDisplay(data.testatorBirthDate)}</div></div>
        <div className="flex mb-1"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.testatorJob}</div></div>
        <div className="flex mb-1"><div className="w-40">Alamat</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.testatorAddress}</div></div>
      </div>

      <div className="text-justify mb-6 break-inside-avoid leading-relaxed">
        <p>Selanjutnya disebut sebagai <strong>"PEWASIAT"</strong>.</p>
        <p className="mt-3">Dengan keadaan sehat jasmani dan rohani, sadar sepenuhnya tanpa adanya paksaan, tekanan, atau pengaruh dari pihak manapun, dengan ini menyatakan kehendak terakhir dan wasiat (<i>Testament</i>) saya sebagai berikut:</p>
      </div>

      {/* PASAL 1 - EKSEKUTOR */}
      <div className="mb-6 text-justify break-inside-avoid">
        <h3 className="font-bold mb-2">PASAL 1 - PENUNJUKAN PELAKSANA WASIAT (EKSEKUTOR)</h3>
        <p className="mb-2">Saya menunjuk dan memberi kuasa penuh kepada:</p>
        <div className="pl-4 border-l-2 border-black ml-4 mb-2">
            <div className="flex mb-1"><div className="w-32">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.executorName}</div></div>
            <div className="flex mb-1"><div className="w-32">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.executorNik}</div></div>
            <div className="flex mb-1"><div className="w-32">Hubungan</div><div className="w-4">:</div><div className="flex-1">{data.executorRelation}</div></div>
        </div>
        <p>Sebagai Pelaksana Wasiat (Eksekutor) tunggal untuk melaksanakan, mengurus, dan menyelesaikan seluruh ketentuan dalam Surat Wasiat ini.</p>
      </div>

      {/* PASAL 2 - PEMBAGIAN */}
      <div className="mb-6 text-justify break-inside-avoid">
        <h3 className="font-bold mb-2">PASAL 2 - PEMBAGIAN HARTA WARISAN (AHLI WARIS / PENERIMA WASIAT)</h3>
        <p className="mb-3">Saya memberikan dan mewasiatkan harta benda milik saya kepada pihak-pihak di bawah ini, dengan rincian sebagai berikut:</p>
        
        {data.beneficiaries.map((b, i) => (
            <div key={b.id} className="mb-4 pl-4 border-l-2 border-black ml-4 break-inside-avoid">
                <p className="font-bold">2.{i+1} Diberikan Kepada: <span className="uppercase">{b.name}</span></p>
                <div className="flex mb-1"><div className="w-32">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{b.nik}</div></div>
                <div className="flex mb-1"><div className="w-32">Status/Hubungan</div><div className="w-4">:</div><div className="flex-1">{b.relation}</div></div>
                <div className="flex mb-1"><div className="w-32">Objek Wasiat</div><div className="w-4">:</div><div className="flex-1 italic">{b.item}</div></div>
            </div>
        ))}
      </div>

      {/* PASAL 3 - PESAN KHUSUS */}
      <div className="mb-6 text-justify break-inside-avoid">
        <h3 className="font-bold mb-2">PASAL 3 - PESAN DAN KEHENDAK KHUSUS</h3>
        <p className="italic pl-4 border-l-2 border-gray-400 ml-4 leading-relaxed">
            "{data.specialMessage}"
        </p>
      </div>

      {/* PASAL 4 - PENUTUP */}
      <div className="mb-8 text-justify break-inside-avoid">
        <h3 className="font-bold mb-2">PASAL 4 - KETENTUAN PENUTUP</h3>
        <p className="leading-relaxed">
            Surat Wasiat ini membatalkan dan mencabut semua wasiat, hibah wasiat, atau janji-janji pembagian harta yang pernah saya buat sebelumnya. Apabila terdapat bagian dari Surat Wasiat ini yang dianggap tidak sah secara hukum, maka tidak akan membatalkan pasal-pasal lain yang sah.
        </p>
        <p className="mt-3">Demikian Surat Wasiat ini saya buat dan saya tanda tangani di hadapan saksi-saksi dan/atau Notaris.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end px-4 break-inside-avoid mb-10">
        <div className="text-center w-64">
            <p className="mb-2">{data.city}, {formatDateDisplay(data.date)}<br/>Pewasiat,</p>
            <div className="h-24 flex justify-center items-center">
                 <span className="text-gray-300 text-[10px] print:hidden">(Materai Rp10.000 & TTD)</span>
            </div>
            <p className="font-bold underline uppercase">{data.testatorName}</p>
        </div>
      </div>

      <div className="flex justify-between px-4 break-inside-avoid">
        <div className="text-center w-64">
            <p className="mb-2">Saksi I,</p>
            <div className="h-16 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">{data.witness1Name}</p>
            <p className="text-sm">NIK. {data.witness1Nik}</p>
        </div>
        <div className="text-center w-64">
            <p className="mb-2">Saksi II,</p>
            <div className="h-16 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">{data.witness2Name}</p>
            <p className="text-sm">NIK. {data.witness2Nik}</p>
        </div>
      </div>

      <div className="flex justify-center px-4 break-inside-avoid text-center mt-12">
        <div className="w-72">
            <p className="mb-2">Mengetahui/Mencatat,<br/>Notaris {data.notaryRegion}</p>
            <div className="h-24 flex justify-center items-center">
                 <span className="text-gray-300 text-[10px] print:hidden">(Stempel & TTD Notaris)</span>
            </div>
            <p className="font-bold underline uppercase">{data.notaryName}</p>
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
              <ArrowLeftCircle size={20} className="text-amber-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Wasiat Legal</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Scroll size={18} className="text-amber-600" /> Editor Wasiat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('pewasiat')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pewasiat' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pewasiat</button>
                <button onClick={() => setActiveTab('eksekutor')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'eksekutor' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Eksekutor</button>
                <button onClick={() => setActiveTab('ahliwaris')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ahliwaris' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Penerima</button>
                <button onClick={() => setActiveTab('saksi')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'saksi' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>Saksi/Notaris</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pewasiat' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-slate-600"/> Data Pewasiat (Testator)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pewasiat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.testatorName} onChange={e => handleChange('testatorName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.testatorNik} onChange={e => handleChange('testatorNik', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.testatorBirthPlace} onChange={e => handleChange('testatorBirthPlace', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.testatorBirthDate} onChange={e => handleChange('testatorBirthDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.testatorJob} onChange={e => handleChange('testatorJob', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.testatorAddress} onChange={e => handleChange('testatorAddress', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penetapan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Penetapan</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'eksekutor' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Scale size={14} className="text-emerald-600"/> Pelaksana Wasiat (Eksekutor)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Eksekutor</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.executorName} onChange={e => handleChange('executorName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK Eksekutor</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.executorNik} onChange={e => handleChange('executorNik', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hubungan / Status Eksekutor</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.executorRelation} onChange={e => handleChange('executorRelation', e.target.value)} placeholder="Contoh: Pengacara / Anak Tertua"/>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ahliwaris' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Heart size={14} className="text-amber-600"/> Penerima Wasiat & Pembagian
                    </h3>
                    <div className="space-y-4">
                        {data.beneficiaries.map((item, index) => (
                            <div key={item.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative group">
                                <button onClick={() => removeBeneficiary(item.id)} className="absolute -top-3 -right-3 bg-red-100 text-red-500 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-colors border border-red-200" title="Hapus Ahli Waris">
                                    <Trash2 size={12} />
                                </button>
                                <div className="mb-3">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Penerima</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:ring-2 focus:ring-amber-500 outline-none" value={item.name} onChange={e => handleBeneficiaryChange(item.id, 'name', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-amber-500 outline-none" value={item.nik} onChange={e => handleBeneficiaryChange(item.id, 'nik', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hubungan</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={item.relation} onChange={e => handleBeneficiaryChange(item.id, 'relation', e.target.value)} placeholder="Anak/Istri"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Objek Wasiat / Harta Diberikan</label>
                                    <textarea className="w-full bg-white p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none" value={item.item} onChange={e => handleBeneficiaryChange(item.id, 'item', e.target.value)} placeholder="Detail Harta / Barang / Saham dll"/>
                                </div>
                            </div>
                        ))}
                        <button onClick={addBeneficiary} className="w-full py-3 border-2 border-dashed border-amber-200 text-amber-600 font-bold text-sm uppercase rounded-xl hover:bg-amber-50 hover:border-amber-400 transition-colors flex items-center justify-center gap-2">
                            <PlusCircle size={16} /> Tambah Penerima
                        </button>
                        
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pesan Khusus (Pasal Tambahan)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-28 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.specialMessage} onChange={e => handleChange('specialMessage', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'saksi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Edit3 size={14} className="text-rose-600"/> Pengesahan Saksi & Notaris
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi 1</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none uppercase" value={data.witness1Name} onChange={e => handleChange('witness1Name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK Saksi 1</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.witness1Nik} onChange={e => handleChange('witness1Nik', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi 2</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none uppercase" value={data.witness2Name} onChange={e => handleChange('witness2Name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK Saksi 2</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.witness2Nik} onChange={e => handleChange('witness2Nik', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Pengesahan Notaris (Opsional)</h4>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Notaris / Pejabat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none uppercase" value={data.notaryName} onChange={e => handleChange('notaryName', e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Wilayah Kedudukan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.notaryRegion} onChange={e => handleChange('notaryRegion', e.target.value)} />
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
              <PrintWrapper documentName={`Wasiat_${data.testatorName.replace(/\s+/g, '_')}`} price={10000} />
           </div>

        </div>
      </main>

    </div>
  );
}
