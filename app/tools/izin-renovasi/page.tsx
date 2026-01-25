'use client';

/**
 * FILE: IzinRenovasiPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Izin Renovasi Rumah
 * FEATURES:
 * - Dual Template (Formal RT/RW vs Neighbor Consent)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Hammer, UserCircle2, MapPin, Info, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface RenovasiData {
  city: string;
  date: string;
  ownerName: string;
  phone: string;
  address: string;
  renovationType: string;
  startDate: string;
  endDate: string;
  workerCount: string;
  rt: string;
  rw: string;
  ketuaRt: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RenovasiData = {
  city: 'SLEMAN',
  date: '', 
  ownerName: 'BUDI SANTOSO',
  phone: '0812-3456-7890',
  address: 'Perumahan Griya Indah, Blok C No. 12, Sleman',
  renovationType: 'Perbaikan Atap dan Penambahan Dapur',
  startDate: '',
  endDate: '', 
  workerCount: '3',
  rt: '04',
  rw: '12',
  ketuaRt: 'Bapak Mulyono'
};

// --- 3. KOMPONEN UTAMA ---
export default function IzinRenovasiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <RenovasiBuilder />
    </Suspense>
  );
}

function RenovasiBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RenovasiData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: nextWeek.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof RenovasiData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            startDate: today.toISOString().split('T')[0], 
            endDate: nextWeek.toISOString().split('T')[0] 
        });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Formal (RT/RW)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Izin Tetangga
        </button>
    </div>
  );

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
        
        {templateId === 1 ? (
            // TEMPLATE 1: FORMAL RT/RW
            <>
                {/* HEADER KANAN */}
                <div className="text-right text-sm mb-8 shrink-0">
                    <p>{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
                </div>

                {/* HEADER PERIHAL */}
                <div className="mb-6 shrink-0">
                    <p>Hal : <strong>Permohonan Izin Renovasi Rumah</strong></p>
                    <p>Lamp : -</p>
                </div>

                {/* TUJUAN */}
                <div className="mb-10 shrink-0">
                    <p>Kepada Yth,</p>
                    <p><strong>Ketua RT {data.rt} / RW {data.rw}</strong></p>
                    <p>Di Tempat</p>
                </div>

                {/* ISI SURAT */}
                <div className="space-y-4 flex-grow text-justify">
                    <p>Dengan hormat,</p>
                    <p>Saya yang bertanda tangan di bawah ini:</p>
                    
                    <div className="ml-6 space-y-1 text-[11pt]">
                        <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Pemilik</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span></div>
                        <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                        <div className="grid grid-cols-[150px_10px_1fr]"><span>No. Telepon/HP</span><span>:</span><span>{data.phone}</span></div>
                    </div>

                    <p className="mt-4">
                        Melalui surat ini, saya bermaksud untuk memohon izin kepada Bapak Ketua RT/RW dan warga sekitar guna melakukan pekerjaan <strong>{data.renovationType}</strong> pada bangunan rumah saya tersebut di atas.
                    </p>

                    <p>
                        Adapun pekerjaan renovasi ini direncanakan akan berlangsung mulai tanggal <strong>{isClient && data.startDate ? new Date(data.startDate).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</strong> sampai dengan <strong>{isClient && data.endDate ? new Date(data.endDate).toLocaleDateString('id-ID', {dateStyle:'long'}) : 'selesai'}</strong>, dengan estimasi pekerja sebanyak {data.workerCount} orang.
                    </p>

                    <p>
                        Selama pengerjaan renovasi berlangsung, saya akan berusaha semaksimal mungkin untuk menjaga kebersihan lingkungan serta meminimalisir gangguan suara maupun debu material. Saya juga memohon maaf yang sebesar-besarnya kepada Bapak dan warga sekitar atas ketidaknyamanan yang mungkin timbul selama proses pengerjaan ini.
                    </p>

                    <p className="mt-4">Demikian surat permohonan ini saya sampaikan. Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih.</p>
                </div>

                {/* TANDA TANGAN */}
                <div className="shrink-0 mt-8 mb-4" style={{ pageBreakInside: 'avoid' }}>
                    <div className="flex justify-between items-end text-[11pt]">
                        <div className="text-center w-60">
                            <p className="mb-20 font-bold uppercase text-xs">Mengetahui,<br/>Ketua RT {data.rt}</p>
                            <p className="font-bold underline uppercase">{data.ketuaRt}</p>
                        </div>
                        
                        <div className="text-center w-60">
                            <p className="mb-20 font-bold uppercase text-xs">Hormat Saya,</p>
                            <p className="font-bold underline uppercase">{data.ownerName}</p>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            // TEMPLATE 2: IZIN TETANGGA
            <>
                <div className="text-center mb-8 border-b-2 border-black pb-4">
                    <h1 className="text-xl font-black uppercase underline tracking-widest">SURAT IZIN TETANGGA</h1>
                </div>

                <p className="mb-4 text-justify">
                    Kami yang bertanda tangan di bawah ini adalah warga tetangga (sebelah kanan, kiri, depan, dan belakang) dari lokasi bangunan:
                </p>

                <div className="bg-slate-50 border border-slate-300 p-4 mb-6 text-sm rounded">
                    <div className="grid grid-cols-[140px_10px_1fr] gap-1">
                        <span>Pemilik Bangunan</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span>
                        <span>Alamat Lokasi</span><span>:</span><span>{data.address}</span>
                        <span>Jenis Pekerjaan</span><span>:</span><span>{data.renovationType}</span>
                    </div>
                </div>

                <p className="mb-4 text-justify">
                    Dengan ini menyatakan <strong>TIDAK KEBERATAN</strong> atas rencana renovasi/pembangunan yang akan dilakukan oleh Bapak/Ibu {data.ownerName}, selama pengerjaan tersebut tidak membahayakan keselamatan warga dan menjaga kebersihan lingkungan.
                </p>

                <div className="mb-6 flex-grow">
                    <table className="w-full border-collapse border border-black text-sm">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="border border-black py-2 w-10">No</th>
                                <th className="border border-black py-2">Nama Tetangga</th>
                                <th className="border border-black py-2 w-32">Posisi Rumah</th>
                                <th className="border border-black py-2 w-32">Tanda Tangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-10">
                                <td className="border border-black text-center">1.</td>
                                <td className="border border-black px-2"></td>
                                <td className="border border-black px-2 text-center text-xs text-slate-500">(Kanan)</td>
                                <td className="border border-black px-2"></td>
                            </tr>
                            <tr className="h-10">
                                <td className="border border-black text-center">2.</td>
                                <td className="border border-black px-2"></td>
                                <td className="border border-black px-2 text-center text-xs text-slate-500">(Kiri)</td>
                                <td className="border border-black px-2"></td>
                            </tr>
                            <tr className="h-10">
                                <td className="border border-black text-center">3.</td>
                                <td className="border border-black px-2"></td>
                                <td className="border border-black px-2 text-center text-xs text-slate-500">(Depan)</td>
                                <td className="border border-black px-2"></td>
                            </tr>
                            <tr className="h-10">
                                <td className="border border-black text-center">4.</td>
                                <td className="border border-black px-2"></td>
                                <td className="border border-black px-2 text-center text-xs text-slate-500">(Belakang)</td>
                                <td className="border border-black px-2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="text-right mt-auto">
                    <p className="mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
                    <p className="mb-20 font-bold uppercase text-xs">Pemilik Bangunan,</p>
                    <p className="font-bold underline uppercase">{data.ownerName}</p>
                </div>
            </>
        )}
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal (RT/RW)' : 'Izin Tetangga';

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
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
               <Hammer size={16} className="text-amber-500" /> <span>RENOVATION PERMIT BUILDER</span>
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
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Renovasi</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              {/* Identitas */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-amber-600 tracking-widest"><UserCircle2 size={14}/> Identitas Pemilik</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pemilik" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" placeholder="No. HP" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" placeholder="Alamat Rumah" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
              </div>

              {/* Detail Renovasi */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><Info size={14}/> Detail Renovasi</h3>
                 <input className="w-full p-2 border rounded text-xs" placeholder="Jenis Pekerjaan (Misal: Cat Ulang)" value={data.renovationType} onChange={e => handleDataChange('renovationType', e.target.value)} />
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                       <label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Mulai</label>
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Selesai (Est)</label>
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                    </div>
                 </div>
                 <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Jumlah Tukang</label>
                    <input className="w-full p-2 border rounded text-xs" placeholder="3 Orang" value={data.workerCount} onChange={e => handleDataChange('workerCount', e.target.value)} />
                 </div>
              </div>

              {/* Wilayah */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-slate-400 tracking-widest"><MapPin size={14}/> Wilayah RT/RW</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded text-xs" placeholder="RT" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} />
                    <input className="w-full p-2 border rounded text-xs" placeholder="RW" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" placeholder="Nama Ketua RT" value={data.ketuaRt} onChange={e => handleDataChange('ketuaRt', e.target.value)} />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
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
