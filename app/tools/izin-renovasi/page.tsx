'use client';

/**
 * FILE: IzinRenovasiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Izin Renovasi Rumah
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Hammer, UserCircle2, MapPin, Info, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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

export default function IzinRenovasiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <RenovasiBuilder />
    </Suspense>
  );
}

function RenovasiBuilder() {
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
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

  const activeTemplateName = templateId === 1 ? 'Formal (RT/RW)' : 'Izin Tetangga';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[25mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
          
          {templateId === 1 ? (
              <>
                  <div className="text-right text-sm mb-8 shrink-0">
                      <p>{data.city}, {formatDateSafe(data.date)}</p>
                  </div>

                  <div className="mb-6 shrink-0">
                      <p>Hal : <strong>Permohonan Izin Renovasi Rumah</strong></p>
                      <p>Lamp : -</p>
                  </div>

                  <div className="mb-10 shrink-0">
                      <p>Kepada Yth,</p>
                      <p><strong>Ketua RT {data.rt} / RW {data.rw}</strong></p>
                      <p>Di Tempat</p>
                  </div>

                  <div className="space-y-4 flex-grow text-justify">
                      <p>Dengan hormat,</p>
                      <p>Saya yang bertanda tangan di bawah ini:</p>
                      
                      <div className="ml-6 space-y-1 text-[11pt] break-inside-avoid">
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Pemilik</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span></div>
                          <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>No. Telepon/HP</span><span>:</span><span>{data.phone}</span></div>
                      </div>

                      <p className="mt-4 break-inside-avoid">
                          Melalui surat ini, saya bermaksud untuk memohon izin guna melakukan pekerjaan <strong>{data.renovationType}</strong> pada bangunan rumah saya tersebut di atas.
                      </p>

                      <p className="break-inside-avoid">
                          Adapun pekerjaan renovasi ini direncanakan akan berlangsung mulai tanggal <strong>{formatDateSafe(data.startDate)}</strong> sampai dengan <strong>{formatDateSafe(data.endDate)}</strong>, dengan estimasi pekerja sebanyak {data.workerCount} orang.
                      </p>

                      <p className="break-inside-avoid">
                          Selama pengerjaan renovasi berlangsung, saya akan berusaha semaksimal mungkin untuk menjaga kebersihan lingkungan serta meminimalisir gangguan suara maupun debu material.
                      </p>

                      <p className="mt-4 break-inside-avoid">Demikian surat permohonan ini saya sampaikan. Atas perhatiannya, saya ucapkan terima kasih.</p>
                  </div>

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
              <>
                  <div className="text-center mb-8 border-b-2 border-black pb-4">
                      <h1 className="text-xl font-black uppercase underline tracking-widest">SURAT IZIN TETANGGA</h1>
                  </div>
                  <p className="mb-4 text-justify">Kami yang bertanda tangan di bawah ini adalah warga tetangga dari lokasi bangunan:</p>
                  <div className="bg-slate-50 border border-slate-300 p-4 mb-6 text-sm rounded break-inside-avoid">
                      <div className="grid grid-cols-[140px_10px_1fr] gap-1">
                          <span>Pemilik Bangunan</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span>
                          <span>Alamat Lokasi</span><span>:</span><span>{data.address}</span>
                          <span>Jenis Pekerjaan</span><span>:</span><span>{data.renovationType}</span>
                      </div>
                  </div>
                  <p className="mb-4 text-justify break-inside-avoid">Dengan ini menyatakan <strong>TIDAK KEBERATAN</strong> atas rencana renovasi yang akan dilakukan, selama tetap menjaga ketertiban umum.</p>
                  <div className="mb-6 flex-grow">
                      <table className="w-full border-collapse border border-black text-sm">
                          <thead>
                              <tr className="bg-slate-100">
                                  <th className="border border-black py-2 w-10">No</th>
                                  <th className="border border-black py-2">Nama Tetangga</th>
                                  <th className="border border-black py-2 w-32">Posisi</th>
                                  <th className="border border-black py-2 w-32">Paraf</th>
                              </tr>
                          </thead>
                          <tbody>
                              {[{n:1, p:'Kanan'}, {n:2, p:'Kiri'}, {n:3, p:'Depan'}, {n:4, p:'Belakang'}].map((item) => (
                                  <tr key={item.n} className="h-12 break-inside-avoid">
                                      <td className="border border-black text-center">{item.n}.</td>
                                      <td className="border border-black px-2"></td>
                                      <td className="border border-black px-2 text-center text-xs text-slate-500">({item.p})</td>
                                      <td className="border border-black px-2 text-[9px] text-slate-300 align-bottom">{item.n}.</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
                  <div className="text-right mt-auto shrink-0 break-inside-avoid">
                      <p className="mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                      <p className="mb-20 font-bold uppercase text-xs">Pemilik Bangunan,</p>
                      <p className="font-bold underline uppercase">{data.ownerName}</p>
                  </div>
              </>
          )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Hammer size={16} className="text-amber-500" /> <span className="uppercase tracking-tighter">RENOVATION PERMIT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Formal (RT/RW) {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Izin Tetangga {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-amber-600 tracking-widest"><UserCircle2 size={14}/> Identitas Pemilik</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Pemilik" />
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} placeholder="No. HP" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Rumah" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><Info size={14}/> Detail Renovasi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.renovationType} onChange={e => handleDataChange('renovationType', e.target.value)} placeholder="Jenis Pekerjaan" />
                 <div className="grid grid-cols-2 gap-3">
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.workerCount} onChange={e => handleDataChange('workerCount', e.target.value)} placeholder="Jumlah Tukang" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-slate-400 tracking-widest"><MapPin size={14}/> Wilayah RT/RW</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} placeholder="RT" />
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} placeholder="RW" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.ketuaRt} onChange={e => handleDataChange('ketuaRt', e.target.value)} placeholder="Ketua RT" />
                 <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE