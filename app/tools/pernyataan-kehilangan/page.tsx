'use client';

/**
 * FILE: KehilanganPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pernyataan Kehilangan
 * FEATURES:
 * - Dual Template (Personal vs Corporate Asset)
 * - Dynamic Item List
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  FileWarning, Plus, Trash2, MapPin, Clock, Calendar, Check, ChevronDown, Edit3, Eye, User, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface LossItem {
  id: number;
  name: string;
  desc: string;
}

interface LossData {
  city: string;
  signDate: string;
  
  name: string;
  nik: string;
  job: string;
  phone: string;
  address: string;
  
  lostDate: string;
  lostTime: string;
  lostPlace: string;
  chronology: string;
  
  items: LossItem[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LossData = {
  city: 'JAKARTA',
  signDate: '', // Diisi useEffect
  
  name: 'BUDI SANTOSO',
  nik: '3171010203040005',
  job: 'Karyawan Swasta',
  phone: '0812-3456-7890',
  address: 'Jl. Merpati No. 12, RT 01 RW 02, Tebet, Jakarta Selatan',
  
  lostDate: '2026-01-04',
  lostTime: '18.30 WIB',
  lostPlace: 'Sekitar Stasiun Manggarai s.d Tebet',
  chronology: 'Saya melakukan perjalanan pulang kerja menggunakan KRL. Dompet saya simpan di dalam tas. Sesampainya di stasiun tujuan, saya menyadari tas saya sudah terbuka dan dompet beserta isinya sudah tidak ada.',
  
  items: [
    { id: 1, name: 'KTP Asli', desc: 'a.n Budi Santoso' },
    { id: 2, name: 'SIM C', desc: 'Masa berlaku s.d 2027' },
    { id: 3, name: 'Kartu ATM BCA', desc: 'Warna Biru (Debit)' },
  ]
};

// --- 3. KOMPONEN UTAMA ---
export default function KehilanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <LossStatementBuilder />
    </Suspense>
  );
}

function LossStatementBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LossData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, signDate: today }));
  }, []);

  const handleDataChange = (field: keyof LossData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const addItem = () => {
    setData(prev => ({ ...prev, items: [...prev.items, { id: Date.now(), name: '', desc: '' }] }));
  };
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };
  
  const updateItem = (idx: number, field: keyof LossItem, val: string) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addPresetItem = (type: string) => {
    let newItem = { id: Date.now(), name: '', desc: '' };
    if (type === 'ktp') newItem = { ...newItem, name: 'KTP (Kartu Tanda Penduduk)', desc: 'Asli a.n Pelapor' };
    if (type === 'sim') newItem = { ...newItem, name: 'SIM A / C', desc: 'No. SIM: ...' };
    if (type === 'atm') newItem = { ...newItem, name: 'Kartu ATM Bank ...', desc: 'Debit / Kredit' };
    setData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, signDate: today });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Pribadi (Compact)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Aset Kantor (Resmi)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Pribadi' : 'Aset Kantor';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {templateId === 1 ? (
            <div className="flex flex-col h-full">
                <div className="text-center mb-6 border-b-4 border-double border-black pb-3 shrink-0">
                    <h2 className="font-bold text-lg uppercase underline tracking-wide">SURAT PERNYATAAN KEHILANGAN</h2>
                </div>

                <div className="flex-grow space-y-4">
                    <p>Saya yang bertanda tangan di bawah ini:</p>
                    <div className="ml-8 mb-4">
                        <table className="w-full leading-snug">
                            <tbody>
                                <tr><td className="w-32 py-0.5">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.name}</td></tr>
                                <tr><td className="py-0.5">NIK / KTP</td><td>:</td><td>{data.nik}</td></tr>
                                <tr><td className="py-0.5">Pekerjaan</td><td>:</td><td>{data.job}</td></tr>
                                <tr><td className="py-0.5">No. HP</td><td>:</td><td>{data.phone}</td></tr>
                                <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.address}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <p>Menyatakan dengan sesungguhnya bahwa saya telah kehilangan barang/dokumen sebagai berikut:</p>

                    <div className="border border-black overflow-hidden mx-2">
                        <table className="w-full text-[10pt]">
                            <thead>
                                <tr className="bg-slate-100 border-b border-black print:bg-transparent">
                                    <th className="py-1 px-2 w-10 border-r border-black">No</th>
                                    <th className="py-1 px-2 text-left border-r border-black">Barang / Dokumen</th>
                                    <th className="py-1 px-2 text-left">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((item, idx) => (
                                    <tr key={item.id} className="border-b border-black last:border-0">
                                        <td className="py-1 px-2 text-center border-r border-black">{idx + 1}</td>
                                        <td className="py-1 px-2 font-bold border-r border-black">{item.name}</td>
                                        <td className="py-1 px-2">{item.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p>Kejadian tersebut terjadi pada:</p>
                    <div className="ml-8">
                        <table className="w-full leading-snug">
                            <tbody>
                                <tr><td className="w-32 py-0.5">Waktu</td><td className="w-3">:</td><td className="py-0.5 font-bold">{isClient && data.lostDate ? new Date(data.lostDate).toLocaleDateString('id-ID', {weekday: 'long', day:'numeric', month:'long', year:'numeric'}) : ''}, {data.lostTime}</td></tr>
                                <tr><td className="py-0.5">Lokasi</td><td className="py-0.5">:</td><td className="py-0.5">{data.lostPlace}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <p className="font-bold underline text-[10pt]">Kronologi Singkat:</p>
                        <p className="text-justify italic bg-slate-50 p-3 rounded border border-black/10 print:bg-transparent print:border-black text-[10pt]">
                            "{data.chronology}"
                        </p>
                    </div>

                    <p className="text-justify pt-2">Demikian surat pernyataan ini saya buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
                </div>

                <div className="mt-8 shrink-0 flex justify-end text-center" style={{ pageBreakInside: 'avoid' }}>
                    <div className="w-64">
                        <p className="mb-1">{data.city}, {isClient && data.signDate ? new Date(data.signDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</p>
                        <p className="mb-20 font-bold uppercase text-[9pt] text-slate-400 print:text-black">Yang Menyatakan,</p>
                        <p className="font-bold underline uppercase">{data.name}</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col h-full font-sans text-[10pt]">
                <div className="text-center mb-10 pb-4 border-b-2 border-black shrink-0">
                    <h1 className="text-2xl font-black uppercase tracking-tighter">BERITA ACARA KEHILANGAN</h1>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 print:text-black">Internal Report</div>
                </div>
                <div className="space-y-8 flex-grow">
                   <div className="grid grid-cols-2 gap-10">
                      <div>
                          <h3 className="text-[9px] font-black text-blue-600 uppercase border-b pb-1 mb-2 print:text-black print:border-black">1. Pelapor</h3>
                          <div className="font-bold uppercase text-sm">{data.name}</div>
                          <div className="text-slate-500 print:text-black">{data.nik}</div>
                      </div>
                      <div>
                          <h3 className="text-[9px] font-black text-blue-600 uppercase border-b pb-1 mb-2 print:text-black print:border-black">2. Insiden</h3>
                          <div className="font-bold text-sm">{data.lostDate}</div>
                          <div className="text-slate-500 italic print:text-black">{data.lostPlace}</div>
                      </div>
                   </div>
                   <div>
                      <h3 className="text-[9px] font-black text-blue-600 uppercase mb-3 print:text-black">3. Daftar Aset/Barang</h3>
                      <div className="space-y-1">
                         {data.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3 border-b border-slate-100 py-2 print:border-black">
                               <span className="font-bold text-slate-400 print:text-black">{idx+1}.</span>
                               <span className="font-bold">{item.name} <span className="font-normal text-slate-500 print:text-black">— {item.desc}</span></span>
                            </div>
                         ))}
                      </div>
                   </div>
                   <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl italic text-slate-600 print:bg-transparent print:border-black print:text-black">
                      "{data.chronology}"
                   </div>
                </div>
                <div className="mt-12 pt-8 border-t flex justify-between items-end shrink-0 print:border-black" style={{ pageBreakInside: 'avoid' }}>
                   <div className="text-[8pt] text-slate-400 w-1/2 print:text-black">Dokumen rahasia internal. Dilarang menggandakan tanpa izin manajemen.</div>
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 mb-16 uppercase print:text-black">{data.city}, {data.signDate}</p>
                      <p className="font-black text-lg border-t-2 border-black pt-1 uppercase">{data.name}</p>
                   </div>
                </div>
            </div>
        )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          /* FORCE COLORS */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

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
               <FileWarning size={16} className="text-emerald-500" /> <span>LOSS STATEMENT BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Kehilangan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Identitas Pelapor</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded text-xs" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} placeholder="No. HP" />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><MapPin size={12}/> Kejadian</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded text-xs font-bold" value={data.lostDate} onChange={e => handleDataChange('lostDate', e.target.value)} />
                    <input className="w-full p-2 border rounded text-xs" value={data.lostTime} onChange={e => handleDataChange('lostTime', e.target.value)} placeholder="Jam Kejadian" />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} placeholder="Kronologi Singkat" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-2"><Plus size={12}/> Daftar Barang</h3>
                    <div className="flex gap-1">
                       <button onClick={() => addPresetItem('ktp')} className="text-[8px] bg-slate-100 px-1 py-0.5 rounded border">+ KTP</button>
                       <button onClick={() => addPresetItem('sim')} className="text-[8px] bg-slate-100 px-1 py-0.5 rounded border">+ SIM</button>
                    </div>
                 </div>
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded border relative group">
                       <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                       <input className="w-full p-1 bg-transparent border-b mb-2 text-xs font-bold" placeholder="Nama Barang" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                       <input className="w-full p-1 bg-transparent text-xs text-slate-500" placeholder="Keterangan" value={item.desc} onChange={e => updateItem(idx, 'desc', e.target.value)} />
                    </div>
                 ))}
                 <button onClick={addItem} className="w-full py-2 border border-dashed border-slate-300 rounded text-[10px] text-slate-400 font-bold uppercase hover:bg-slate-50">+ Tambah Baris</button>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
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
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
