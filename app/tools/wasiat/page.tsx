'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Heart, UserCircle2, 
  X, ShieldCheck, UserPlus, Trash2, FileText,
  ChevronDown, Check, LayoutTemplate, Edit3, Eye, Gavel, Scroll
} from 'lucide-react';
import Link from 'next/link';

export default function SuratWasiatPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Wasiat...</div>}>
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
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
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });
  const addBeneficiary = () => setData({ ...data, beneficiaries: [...data.beneficiaries, { name: '', item: '' }] });
  const removeBeneficiary = (idx: number) => {
    const newItems = [...data.beneficiaries];
    newItems.splice(idx, 1);
    setData({ ...data, beneficiaries: newItems });
  };
  const updateBeneficiary = (idx: number, field: string, val: string) => {
    const newItems = [...data.beneficiaries];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, beneficiaries: newItems });
  };

  const TEMPLATES = [
    { id: 1, name: "Format Klasik Serif", desc: "Tampilan formal dengan font kaku" },
    { id: 2, name: "Format Modern Sans", desc: "Tampilan bersih dengan font modern" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white text-slate-900 leading-relaxed ${templateId === 1 ? 'font-serif' : 'font-sans text-[10.5pt]'} print:text-black`}>
      
      {/* HALAMAN 1 */}
      <div className="w-[210mm] h-[296mm] p-[25mm] shadow-2xl print:shadow-none bg-white box-border flex flex-col mb-10 print:mb-0 print:break-after-page overflow-hidden border-b print:border-none relative">
        <div className="text-center mb-12 shrink-0">
          <h1 className={`text-3xl font-black underline uppercase tracking-[0.3em] leading-none mb-4 ${templateId === 2 ? 'no-underline tracking-tighter' : ''}`}>SURAT WASIAT</h1>
          <p className="text-[10pt] font-sans font-bold tracking-widest text-slate-500 print:text-black italic">"Bismillahirrahmanirrahim"</p>
        </div>

        <div className="text-justify space-y-8 flex-grow">
          <p>Saya yang bertanda tangan di bawah ini (selanjutnya disebut sebagai <b>TESTATOR</b>):</p>
          <div className={`ml-8 space-y-1 ${templateId === 1 ? 'font-sans' : 'font-serif'} border-l-4 ${templateId === 1 ? 'border-slate-100' : 'border-blue-600'} pl-6 italic print:border-slate-300`}>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.testatorName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.testatorNik}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.testatorAddress}</span></div>
          </div>

          <div className="space-y-4">
            <h3 className={`font-bold uppercase text-[10pt] border-b pb-1 ${templateId === 2 ? 'text-blue-700 border-blue-100' : 'border-slate-900'}`}>PASAL 1: PERNYATAAN STATUS</h3>
            <p>Bahwa TESTATOR dalam keadaan sehat jasmani dan rohani, bertindak secara sadar, tanpa ada paksaan atau tekanan dari pihak manapun, menyatakan wasiat ini sebagai bentuk kehendak terakhir yang sah.</p>
          </div>

          <div className="space-y-4">
            <h3 className={`font-bold uppercase text-[10pt] border-b pb-1 ${templateId === 2 ? 'text-blue-700 border-blue-100' : 'border-slate-900'}`}>PASAL 2: PEMBATALAN WASIAT</h3>
            <p>TESTATOR dengan ini membatalkan, mencabut, dan menyatakan tidak berlaku setiap dan seluruh surat wasiat yang pernah dibuat oleh TESTATOR sebelum tanggal ditandatanganinya dokumen ini.</p>
          </div>

          <div className="space-y-4">
            <h3 className={`font-bold uppercase text-[10pt] border-b pb-1 ${templateId === 2 ? 'text-blue-700 border-blue-100' : 'border-slate-900'}`}>PASAL 3: PENETAPAN AHLI WARIS</h3>
            <div className="space-y-4 ml-4">
                {data.beneficiaries.map((b, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <span className="font-bold">{i + 1}.</span>
                        <p>Memberikan <b>{b.item || '...'}</b> kepada <b>{b.name || '...'}</b> secara mutlak sebagai hak milik.</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
        <p className="text-center italic text-slate-400 text-[8pt] pb-4">--- Bersambung ke halaman berikutnya ---</p>
      </div>

      {/* HALAMAN 2 */}
      <div className="w-[210mm] h-[296mm] p-[25mm] print:pt-[35mm] bg-white shadow-2xl print:shadow-none box-border flex flex-col relative overflow-hidden">
        <div className="text-justify space-y-8 flex-grow">
          <div className="space-y-4">
            <h3 className={`font-bold uppercase text-[10pt] border-b pb-1 ${templateId === 2 ? 'text-blue-700 border-blue-100' : 'border-slate-900'}`}>PASAL 4: PELAKSANA WASIAT</h3>
            <p>Untuk menjamin terlaksananya isi wasiat ini, TESTATOR menunjuk <b>{data.executorName}</b> sebagai pelaksana wasiat yang diberikan wewenang penuh untuk pengurusan administratif.</p>
          </div>

          <div className="space-y-4">
            <h3 className={`font-bold uppercase text-[10pt] border-b pb-1 ${templateId === 2 ? 'text-blue-700 border-blue-100' : 'border-slate-900'}`}>PASAL 5: AMANAT KHUSUS</h3>
            <div className={`${templateId === 1 ? 'bg-slate-50' : 'bg-blue-50'} p-6 rounded-2xl border ${templateId === 1 ? 'border-slate-200' : 'border-blue-100'} print:bg-transparent print:border-black italic leading-relaxed`}>
              "{data.specialMessage}"
            </div>
          </div>

          <div className="space-y-4">
            <h3 className={`font-bold uppercase text-[10pt] border-b pb-1 ${templateId === 2 ? 'text-blue-700 border-blue-100' : 'border-slate-900'}`}>PASAL 6: PENUTUP</h3>
            <p>Demikian Surat Wasiat ini dibuat dalam keadaan sadar, ditandatangani di hadapan para saksi yang TESTATOR kenal baik. TESTATOR menyatakan bertanggung jawab penuh atas segala konsekuensi hukum.</p>
          </div>

          <div className="pt-8 text-right font-bold text-[12pt]">
            <p>{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
          </div>
        </div>

        {/* TANDA TANGAN */}
        <div className={`shrink-0 mt-8 pt-10 border-t-2 ${templateId === 1 ? 'border-slate-900' : 'border-blue-600 print:border-black'}`}>
           <div className="grid grid-cols-2 gap-x-10 text-center mb-10">
              <div className="flex flex-col items-center">
                <p className="font-black uppercase text-[8pt] mb-20 tracking-widest text-slate-400 print:text-black">Saksi I,</p>
                <p className="font-bold underline uppercase text-[10pt]">({data.witness1})</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-black uppercase text-[8pt] mb-20 tracking-widest text-slate-400 print:text-black">Saksi II,</p>
                <p className="font-bold underline uppercase text-[10pt]">({data.witness2})</p>
              </div>
           </div>
           
           <div className="flex flex-col items-center">
              <div className="text-center w-72 mb-4">
                 <p className="font-black uppercase text-[9pt] mb-4 tracking-[0.4em] text-blue-600 print:text-black">Pembuat Wasiat,</p>
                 <div className="border border-slate-200 w-28 h-16 mx-auto mb-4 flex items-center justify-center text-[7pt] text-slate-300 italic uppercase print:border-black print:text-black">Materai 10.000</div>
                 <p className={`font-bold underline uppercase text-[14pt] leading-none ${templateId === 1 ? 'italic' : ''}`}>{data.testatorName}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 border-b border-slate-700">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4 text-left">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <h1 className="hidden md:flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-tighter italic">
               <Gavel size={16} /> <span>Professional Will Builder</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative font-sans text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Print 2 Halaman</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* EDITOR LENGKAP */}
        <div className={`no-print w-full md:w-[450px] lg:w-[500px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden md:block' : 'block'}`}>
           <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4 font-sans text-left text-xs">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Testator</h3>
              <input className="w-full p-2 border rounded font-bold uppercase bg-white shadow-sm" value={data.testatorName} onChange={e => handleDataChange('testatorName', e.target.value)} placeholder="Nama Pembuat" />
              <input className="w-full p-2 border rounded bg-white shadow-sm" value={data.testatorNik} onChange={e => handleDataChange('testatorNik', e.target.value)} placeholder="NIK Pembuat" />
              <input className="w-full p-2 border rounded font-bold text-indigo-600 bg-white" value={data.executorName} onChange={e => handleDataChange('executorName', e.target.value)} placeholder="Nama Pelaksana Wasiat" />
           </div>

           <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4 font-sans text-left text-xs">
              <div className="flex justify-between items-center border-b pb-1">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-2"><Scroll size={12}/> Pembagian Harta</h3>
                 <button onClick={addBeneficiary} className="bg-emerald-100 text-emerald-700 p-1 px-2 rounded-md text-[9px] font-black flex items-center gap-1"><UserPlus size={12}/> TAMBAH</button>
              </div>
              {data.beneficiaries.map((b, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border relative space-y-2">
                   <button onClick={() => removeBeneficiary(idx)} className="absolute top-2 right-2 text-red-400"><Trash2 size={14}/></button>
                   <input className="w-full p-1 border-b bg-transparent font-bold" value={b.name} onChange={e => updateBeneficiary(idx, 'name', e.target.value)} placeholder="Penerima" />
                   <textarea className="w-full p-1 text-[10px] h-12 bg-white border rounded resize-none" value={b.item} onChange={e => updateBeneficiary(idx, 'item', e.target.value)} placeholder="Item..." />
                </div>
              ))}
           </div>

           <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4 font-sans text-left text-xs pb-16">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><ShieldCheck size={12}/> Otoritas</h3>
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded bg-white" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi I" />
                 <input className="w-full p-2 border rounded bg-white" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi II" />
              </div>
              <input className="w-full p-2 border rounded font-bold uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
              <textarea className="w-full p-2 border rounded h-20 italic bg-white" value={data.specialMessage} onChange={e => handleDataChange('specialMessage', e.target.value)} placeholder="Pesan Khusus..." />
           </div>
        </div>

        {/* PREVIEW SCALE 0.43 */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden md:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex flex-col items-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12 shadow-2xl">
                 <DocumentContent />
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}