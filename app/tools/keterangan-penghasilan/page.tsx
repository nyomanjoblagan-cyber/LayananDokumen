'use client';

/**
 * FILE: IncomeStatementPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Keterangan Penghasilan
 * FEATURES:
 * - Dual Template (Self Declaration vs Third Party Statement)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, X, 
  ChevronDown, Check, LayoutTemplate, 
  User, Wallet, MapPin, FileText, BadgeDollarSign, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface IncomeData {
  city: string;
  date: string;
  name: string;
  nik: string;
  address: string;
  businessType: string;
  monthlyIncome: number;
  monthlyIncomeText: string;
  purpose: string;
  signerName: string; // Penanda tangan (bisa diri sendiri atau HRD)
  signerJob: string; // Jabatan penanda tangan (jika ada)
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IncomeData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  name: 'AHMAD FAUZI',
  nik: '3171010101800001',
  address: 'Jl. Melati No. 12, Tebet, Jakarta Selatan',
  businessType: 'Freelance Graphic Designer',
  monthlyIncome: 7500000,
  monthlyIncomeText: 'Tujuh Juta Lima Ratus Ribu Rupiah',
  purpose: 'Persyaratan Pengajuan KPR',
  signerName: 'AHMAD FAUZI',
  signerJob: 'Pemilik Usaha'
};

// --- 3. KOMPONEN UTAMA ---
export default function IncomeStatementPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <IncomeToolBuilder />
    </Suspense>
  );
}

function IncomeToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IncomeData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof IncomeData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };
  
  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Pernyataan Diri (Wiraswasta)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Keterangan Pihak Ketiga
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Pernyataan Diri' : 'Pihak Ketiga';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[25mm] print:p-[25mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* TEMPLATE 1: PERNYATAAN DIRI */}
        {templateId === 1 && (
            <>
                <div className="text-center mb-10 shrink-0">
                   <h1 className="font-black text-xl uppercase underline tracking-widest leading-relaxed">SURAT PERNYATAAN PENGHASILAN</h1>
                </div>

                <div className="flex-grow">
                    <p className="mb-6">Saya yang bertanda tangan di bawah ini:</p>
                    
                    <div className="ml-8 mb-8 space-y-2">
                       <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
                       <div className="grid grid-cols-[150px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
                       <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                       <div className="grid grid-cols-[150px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.businessType}</span></div>
                    </div>

                    <p className="mb-4">Dengan ini menyatakan dengan sesungguhnya bahwa pada saat ini saya memiliki penghasilan rata-rata per bulan sebesar:</p>
                    
                    <div className="bg-slate-50 border-2 border-slate-200 p-4 text-center mb-6 print:bg-transparent print:border-black">
                       <div className="text-xl font-black text-slate-900">{formatRupiah(data.monthlyIncome)}</div>
                       <div className="text-sm italic font-medium">({data.monthlyIncomeText})</div>
                    </div>

                    <p className="mb-4 leading-relaxed text-justify">
                       Demikian surat pernyataan ini saya buat dengan sebenar-benarnya untuk dapat dipergunakan sebagai <strong>{data.purpose}</strong>.
                    </p>
                    
                    <p className="leading-relaxed text-justify">
                       Apabila di kemudian hari pernyataan ini terbukti tidak benar, maka saya bersedia mempertanggungjawabkannya sesuai dengan ketentuan hukum yang berlaku.
                    </p>
                </div>

                <div className="flex justify-end text-center mt-12 shrink-0" style={{ pageBreakInside: 'avoid' }}>
                   <div className="w-64">
                      <p className="mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
                      <p className="mb-4 font-bold">Hormat saya,</p>
                      <div className="h-24 flex items-center justify-center border border-dashed border-slate-200 text-[10px] text-slate-400 mb-2 print:border-black print:text-black">Materai 10.000</div>
                      <p className="font-bold underline uppercase leading-none">{data.name}</p>
                   </div>
                </div>
            </>
        )}

        {/* TEMPLATE 2: PIHAK KETIGA */}
        {templateId === 2 && (
            <div className="font-sans text-[10.5pt] leading-relaxed flex flex-col h-full">
                <div className="border-b-4 border-slate-800 pb-4 mb-8 shrink-0">
                   <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">SURAT KETERANGAN PENGHASILAN</h1>
                   <p className="text-slate-500 font-bold text-sm print:text-black">Pihak Ketiga / Perusahaan / Instansi</p>
                </div>

                <div className="flex-grow">
                    <p className="mb-6">Diterangkan bahwa orang yang tercantum di bawah ini:</p>

                    <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-transparent print:border-black">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 print:text-black">Nama Lengkap</span>
                          <span className="text-lg font-black text-slate-900 uppercase">{data.name}</span>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 print:text-black">Identitas NIK</span>
                             <span className="font-bold text-slate-700 font-mono print:text-black">{data.nik}</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 print:text-black">Pekerjaan</span>
                             <span className="font-bold text-slate-700 print:text-black">{data.businessType}</span>
                          </div>
                       </div>
                    </div>

                    <p className="mb-4 text-justify">Menerangkan bahwa yang bersangkutan memiliki pendapatan finansial bulanan rata-rata sebesar <strong>{formatRupiah(data.monthlyIncome)}</strong>.</p>
                    
                    <div className="border-l-4 border-emerald-500 pl-4 py-2 mb-8 italic text-slate-600 bg-emerald-50/30 print:bg-transparent print:text-black print:border-black">
                       "{data.monthlyIncomeText}"
                    </div>

                    <p className="mb-8 leading-relaxed">Surat keterangan ini diterbitkan atas permintaan yang bersangkutan untuk keperluan <strong>{data.purpose}</strong>.</p>
                </div>

                <div className="mt-auto flex justify-between items-end border-t pt-10 shrink-0" style={{ pageBreakInside: 'avoid' }}>
                   <div className="text-[9px] text-slate-400 italic max-w-[250px] leading-snug print:text-black">
                      Surat ini merupakan pernyataan tanggung jawab mutlak dari penanda tangan mengenai kondisi keuangan pihak terkait.
                   </div>
                   <div className="text-right w-64 text-center">
                      <p className="text-sm text-slate-500 mb-16 print:text-black">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
                      <p className="font-black text-slate-900 uppercase text-sm leading-none mb-1 border-b border-black pb-1">{data.signerName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest print:text-black">{data.signerJob}</p>
                   </div>
                </div>
            </div>
        )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>
      
      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Wallet size={16} className="text-emerald-500" /> <span>INCOME STATEMENT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Penghasilan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><User size={12}/> Identitas Diri</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded text-xs" value={data.businessType} onChange={e => handleDataChange('businessType', e.target.value)} placeholder="Pekerjaan" />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><Wallet size={12}/> Penghasilan</h3>
                 <input className="w-full p-2 border rounded text-sm font-black text-emerald-700" type="number" value={data.monthlyIncome} onChange={e => handleDataChange('monthlyIncome', parseInt(e.target.value))} />
                 <textarea className="w-full p-2 border rounded text-xs h-12 italic" value={data.monthlyIncomeText} onChange={e => handleDataChange('monthlyIncomeText', e.target.value)} placeholder="Terbilang..." />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-widest flex items-center gap-2"><FileText size={12}/> Keperluan & TTD</h3>
                 <textarea className="w-full p-2 border rounded text-xs h-12" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Surat" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 {templateId === 2 && (
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                        <input className="w-full p-2 border rounded text-xs font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Penandatangan" />
                        <input className="w-full p-2 border rounded text-xs" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan Penandatangan" />
                    </div>
                 )}
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                    <DocumentContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: 'auto' }} className="bg-white flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
