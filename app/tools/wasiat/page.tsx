'use client';

/**
 * FILE: SuratWasiatPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Wasiat Profesional dengan Daftar Ahli Waris Dinamis (2 Halaman)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Heart, UserCircle2, 
  X, ShieldCheck, UserPlus, Trash2, FileText,
  ChevronDown, Check, LayoutTemplate, Edit3, Eye, Gavel, Scroll, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

// --- 1. TYPE DEFINITIONS ---
interface Beneficiary {
  name: string;
  item: string;
}

interface WillData {
  city: string;
  date: string;
  testatorName: string;
  testatorNik: string;
  testatorAddress: string;
  executorName: string;
  beneficiaries: Beneficiary[];
  specialMessage: string;
  witness1: string;
  witness2: string;
}

// --- 2. GLOBAL CONSTANTS ---
const TEMPLATES = [
  { id: 1, name: "Format Klasik Serif", desc: "Tampilan formal kaku (Legal)" },
  { id: 2, name: "Format Modern Sans", desc: "Tampilan bersih & kontemporer" }
];

// --- 3. DATA DEFAULT ---
const INITIAL_DATA: WillData = {
  city: 'Yogyakarta',
  date: '', 
  testatorName: 'H. MUHAMMAD YUSUF',
  testatorNik: '3471010101700001',
  testatorAddress: 'Jl. Malioboro No. 10, Sosromenduran, Yogyakarta',
  executorName: 'ABDULLAH SALIM, S.H.',
  beneficiaries: [
    { name: 'SITI FATIMAH', item: 'Rumah tinggal permanen yang berlokasi di Jl. Malioboro No. 10 beserta seluruh isinya.' },
    { name: 'AHMAD RIZKY', item: 'Seluruh saldo tabungan di Bank Mandiri Cabang Sudirman atas nama testator.' }
  ],
  specialMessage: 'Saya berwasiat agar seluruh keluarga tetap menjaga tali silaturahmi, saling membantu satu sama lain, dan menjaga nama baik keluarga besar setelah kepergian saya.',
  witness1: 'Ir. BAMBANG SUTRISNO',
  witness2: 'Drs. HARTONO'
};

export default function SuratWasiatPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor Wasiat...</div>}>
      <WillLetterBuilder />
    </Suspense>
  );
}

function WillLetterBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [showDonation, setShowDonation] = useState(false);

  const [data, setData] = useState<WillData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof WillData, val: any) => setData({ ...data, [field]: val });
  
  const addBeneficiary = () => setData({ ...data, beneficiaries: [...data.beneficiaries, { name: '', item: '' }] });
  
  const removeBeneficiary = (idx: number) => {
    if(data.beneficiaries.length > 1) {
        const newItems = [...data.beneficiaries];
        newItems.splice(idx, 1);
        setData({ ...data, beneficiaries: newItems });
    }
  };
  
  const updateBeneficiary = (idx: number, field: keyof Beneficiary, val: string) => {
    const newItems = [...data.beneficiaries];
    newItems[idx][field] = val;
    setData({ ...data, beneficiaries: newItems });
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset semua data wasiat?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`text-slate-900 leading-normal print:text-black ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* HALAMAN 1 */}
        <div className="w-[210mm] min-h-[296mm] p-[20mm] md:p-[25mm] bg-white shadow-2xl print:shadow-none box-border flex flex-col mb-10 print:mb-0 print:break-after-page overflow-hidden border-b print:border-none relative text-left">
          <div className="text-center mb-12 shrink-0">
            <h1 className={`text-3xl font-black underline uppercase tracking-[0.3em] leading-none mb-4 text-slate-900 ${templateId === 2 ? 'no-underline tracking-tight' : ''}`}>SURAT WASIAT</h1>
            <p className="text-[10pt] font-sans font-black tracking-[0.2em] text-slate-400 print:text-black italic">"BISMILLAHIRRAHMANIRRAHIM"</p>
          </div>

          <div className="text-justify space-y-6 flex-grow">
            <p>Saya yang bertanda tangan di bawah ini (selanjutnya disebut sebagai <strong>TESTATOR</strong>):</p>
            <div className={`ml-8 space-y-1.5 font-sans border-l-4 ${templateId === 1 ? 'border-slate-100' : 'border-blue-600'} pl-8 py-1 italic print:border-slate-300 text-[10.5pt]`}>
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase text-slate-900 not-italic">{data.testatorName}</span></div>
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor NIK</span><span>:</span><span className="font-mono not-italic">{data.testatorNik}</span></div>
                <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span className="not-italic leading-snug">{data.testatorAddress}</span></div>
            </div>

            <div className="space-y-4">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 1: PERNYATAAN STATUS</p>
              <p className="leading-relaxed">Bahwa TESTATOR dalam keadaan sehat jasmani dan rohani, bertindak secara sadar, tanpa ada paksaan atau tekanan dari pihak manapun, menyatakan wasiat ini sebagai bentuk kehendak terakhir yang sah secara hukum.</p>
            </div>

            <div className="space-y-4">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 2: PEMBATALAN WASIAT SEBELUMNYA</p>
              <p className="leading-relaxed">TESTATOR dengan ini membatalkan, mencabut, dan menyatakan tidak berlaku setiap dan seluruh surat wasiat atau dokumen hibah serupa yang pernah dibuat oleh TESTATOR sebelum tanggal ditandatangani dokumen ini.</p>
            </div>

            <div className="space-y-4">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 3: PENETAPAN AHLI WARIS</p>
              <div className="space-y-5 ml-4">
                  {data.beneficiaries.map((b, i) => (
                      <div key={i} className="flex gap-4 items-start break-inside-avoid">
                          <span className="font-black text-blue-600 print:text-black">{i + 1}.</span>
                          <p className="leading-relaxed">Memberikan unit harta berupa <strong>{b.item || '...'}</strong> kepada <strong>{b.name || '...'}</strong> secara mutlak sebagai hak milik yang sah.</p>
                      </div>
                  ))}
              </div>
            </div>
          </div>
          <p className="mt-auto text-center italic text-slate-300 text-[8pt] pb-4 uppercase tracking-[0.2em]">--- Bersambung ke halaman 2 ---</p>
        </div>

        {/* HALAMAN 2 */}
        <div className="w-[210mm] min-h-[296mm] p-[20mm] md:p-[25mm] bg-white shadow-2xl print:shadow-none box-border flex flex-col relative overflow-hidden text-left">
          <div className="text-justify space-y-8 flex-grow">
            <div className="space-y-4">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 4: PELAKSANA WASIAT (EXECUTOR)</p>
              <p className="leading-relaxed">Untuk menjamin terlaksananya seluruh isi wasiat ini tanpa hambatan, TESTATOR menunjuk <strong>{data.executorName}</strong> sebagai pelaksana wasiat yang diberikan wewenang penuh untuk pengurusan administratif dan legalitas.</p>
            </div>

            <div className="space-y-4">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 5: AMANAT KHUSUS & PESAN TERAKHIR</p>
              <div className={`${templateId === 1 ? 'bg-slate-50 border-slate-200' : 'bg-blue-50 border-blue-100'} p-6 rounded-2xl border-2 print:bg-transparent print:border-black italic text-[11pt] leading-relaxed text-slate-800 print:text-black shadow-inner print:shadow-none`}>
                "{data.specialMessage}"
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 6: PENUTUP</p>
              <p className="leading-relaxed">Demikian Surat Wasiat ini dibuat dalam keadaan sadar, ditandatangani di hadapan para saksi yang TESTATOR kenal baik. TESTATOR menyatakan bertanggung jawab penuh atas segala konsekuensi hukum yang timbul.</p>
            </div>

            <div className="pt-6 text-right font-bold text-slate-400 print:text-black font-sans">
              <p>{data.city}, {formatDateSafe(data.date)}</p>
            </div>
          </div>

          {/* AREA TANDA TANGAN */}
          <div className={`mt-auto pt-8 border-t-2 ${templateId === 1 ? 'border-slate-900' : 'border-blue-600 print:border-black'} font-sans`}>
              <div className="grid grid-cols-2 gap-x-10 text-center mb-10">
                <div className="flex flex-col items-center">
                  <p className="font-black uppercase text-[8pt] mb-16 tracking-widest text-slate-300 print:text-black">Saksi I</p>
                  <p className="font-bold underline uppercase text-[10pt] text-slate-900">({data.witness1})</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-black uppercase text-[8pt] mb-16 tracking-widest text-slate-300 print:text-black">Saksi II</p>
                  <p className="font-bold underline uppercase text-[10pt] text-slate-900">({data.witness2})</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-center w-80 break-inside-avoid">
                   <p className="font-black uppercase text-[8pt] mb-4 tracking-[0.4em] text-blue-600 print:text-black">Pembuat Wasiat (Testator),</p>
                   <div className="border border-slate-200 w-24 h-16 mx-auto mb-4 flex items-center justify-center text-[7pt] text-slate-300 italic uppercase print:border-black print:text-black">Materai 10.000</div>
                   <p className={`font-black underline uppercase text-[13pt] leading-none text-slate-900 ${templateId === 1 ? 'italic' : ''}`}>{data.testatorName}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white !important; margin: 0 !important; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors font-bold uppercase tracking-widest text-xs">
               <ArrowLeftCircle size={20} className="text-emerald-400" /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-tighter italic">
               <Gavel size={18} /> <span>Will Builder Professional Edition</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg border border-slate-700 text-xs font-bold transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden p-1 text-slate-900">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Print (2 Hal)</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Wasiat</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors"><RotateCcw size={16}/></button></div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Data Testator</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.testatorName} onChange={e => handleDataChange('testatorName', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.testatorNik} onChange={e => handleDataChange('testatorNik', e.target.value)} placeholder="NIK / KTP" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.testatorAddress} onChange={e => handleDataChange('testatorAddress', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-2"><Scroll size={12}/> Daftar Warisan</h3>
                    <button onClick={addBeneficiary} className="bg-emerald-100 text-emerald-700 p-1 px-3 rounded-lg text-[10px] font-black hover:bg-emerald-600 hover:text-white transition-all">+ AHLI WARIS</button>
                 </div>
                 <div className="space-y-4">
                    {data.beneficiaries.map((b, idx) => (
                       <div key={idx} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 relative group space-y-3">
                          <button onClick={() => removeBeneficiary(idx)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                          <input className="w-full p-2 bg-white border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={b.name} onChange={e => updateBeneficiary(idx, 'name', e.target.value)} placeholder="Nama Penerima Waris" />
                          <textarea className="w-full p-2 bg-white border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={b.item} onChange={e => updateBeneficiary(idx, 'item', e.target.value)} placeholder="Detail Harta Warisan..." />
                       </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 tracking-widest flex items-center gap-2"><Heart size={12}/> Amanat & Otoritas</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed italic" value={data.specialMessage} onChange={e => handleDataChange('specialMessage', e.target.value)} placeholder="Pesan / Amanat Terakhir..." />
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none text-indigo-600" value={data.executorName} onChange={e => handleDataChange('executorName', e.target.value)} placeholder="Nama Pelaksana Wasiat" />
                 <div className="grid grid-cols-2 gap-3 pt-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi I" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi II" />
                 </div>
                 <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}