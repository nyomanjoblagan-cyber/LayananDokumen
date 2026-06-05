'use client';

/**
 * FILE: KetDokterSederhanaPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan Sakit (A5/A4)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Stethoscope, Building2, UserCircle2, 
  CalendarDays, Check, ChevronDown, LayoutTemplate, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface MedicalData {
  city: string;
  date: string;
  clinicName: string;
  clinicAddress: string;
  patientName: string;
  patientJob: string;
  patientAge: string;
  restingDays: string;
  startDate: string;
  endDate: string;
  diagnosis: string;
  vitalSigns: string;
  doctorName: string;
  sipNumber: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: MedicalData = {
  city: 'DENPASAR',
  date: '', 
  clinicName: 'KLINIK PRATAMA SEHAT BERSAMA',
  clinicAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  patientName: 'BAGUS RAMADHAN',
  patientJob: 'Karyawan Swasta',
  patientAge: '27 Tahun',
  restingDays: '3 (Tiga)',
  startDate: '', 
  endDate: '', 
  diagnosis: 'Common Cold / Febris (Demam)',
  vitalSigns: 'TD: 110/80 mmHg | Temp: 38.2°C',
  doctorName: 'dr. I MADE WIRA, S.Ked',
  sipNumber: 'SIP. 445/088/DINKES/2024'
};

export default function KetDokterSederhanaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <MedicalNoteBuilder />
    </Suspense>
  );
}

function MedicalNoteBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<MedicalData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 2);

    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: threeDaysLater.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof MedicalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const threeDaysLater = new Date(today);
        threeDaysLater.setDate(today.getDate() + 2);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            startDate: today.toISOString().split('T')[0], 
            endDate: threeDaysLater.toISOString().split('T')[0] 
        });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Klinik (A5)' : 'RS (A4)';

  const DocumentContent = () => {
    const baseFontSize = templateId === 1 ? 'text-[10pt]' : 'text-[11pt]';
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className={`bg-white font-serif text-slate-900 leading-snug w-full h-full ${baseFontSize} print:p-0`}>
        
        {/* KOP KLINIK */}
        <div className="flex items-center border-b-2 border-slate-900 pb-2 mb-4 shrink-0">
          <div className="bg-slate-900 text-white p-1.5 rounded mr-3 print:text-black print:border print:border-black print:bg-transparent">
            <Stethoscope size={20} />
          </div>
          <div className="flex-grow font-sans">
            <h1 className="text-[1.1em] font-black uppercase tracking-tight leading-none mb-1">{data.clinicName}</h1>
            <p className="text-[0.75em] italic text-slate-500 print:text-black leading-none">{data.clinicAddress}</p>
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-4 shrink-0">
          <h2 className="text-[1.2em] font-black underline uppercase tracking-widest leading-none">SURAT KETERANGAN SAKIT</h2>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow">
          <p className="mb-2">Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
          
          <div className="ml-2 mb-3 space-y-0.5 font-sans italic border-l-2 border-slate-200 pl-3 py-1 text-[0.9em] break-inside-avoid">
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.patientName}</span></div>
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Umur</span><span>:</span><span>{data.patientAge}</span></div>
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.patientJob}</span></div>
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Tanda Vital</span><span>:</span><span className="font-mono font-bold text-blue-700 print:text-black">{data.vitalSigns}</span></div>
          </div>

          <p className="mb-3 text-justify">Berdasarkan hasil pemeriksaan, pasien tersebut memerlukan istirahat selama:</p>

          <div className="text-center py-2 mb-3 bg-slate-50 border border-slate-300 rounded print:bg-transparent print:border-black break-inside-avoid">
              <p className="text-[1.2em] font-black">{data.restingDays} Hari</p>
              <p className="text-[0.9em] font-sans">
                {formatDateSafe(data.startDate)} s/d {formatDateSafe(data.endDate)}
              </p>
          </div>

          <p className="italic text-[0.9em] mb-2 break-inside-avoid">
            Diagnosis: <b>{data.diagnosis}</b>
          </p>

          <p className="text-justify break-inside-avoid">Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="mt-6 flex justify-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
          <div className="text-center w-64">
            <p className="text-[0.9em] mb-1">{data.city}, {isClient && data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}</p>
            <p className="text-[0.8em] font-bold text-slate-400 uppercase tracking-widest mb-16 print:text-black">Dokter Pemeriksa,</p>
            <p className="font-bold underline uppercase text-[9pt] leading-tight">{data.doctorName}</p>
            <p className="text-[0.7em] font-sans mt-0.5 font-bold uppercase">SIP. {data.sipNumber}</p>
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
          @page { size: ${templateId === 1 ? 'A5' : 'A4'}; margin: 0mm !important; } 
          html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
          .no-print { display: none !important; }
          .print-table { width: 100%; border-collapse: collapse; }
          .print-header-space { height: ${templateId === 1 ? '10mm' : '20mm'}; } 
          .print-footer-space { height: ${templateId === 1 ? '10mm' : '20mm'}; } 
          .print-content-wrapper { padding: 0 ${templateId === 1 ? '10mm' : '20mm'}; width: 100%; box-sizing: border-box; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Stethoscope size={16} className="text-blue-500" /> <span className="uppercase tracking-tighter">Medical Note Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold">Klinik (A5)</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold">Rumah Sakit (A4)</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* EDITOR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Medis</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Klinik / RS</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.clinicName} onChange={e => handleDataChange('clinicName', e.target.value)} placeholder="Nama Klinik" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.clinicAddress} onChange={e => handleDataChange('clinicAddress', e.target.value)} placeholder="Alamat Klinik" />
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Pasien</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} placeholder="Nama Pasien" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.patientAge} onChange={e => handleDataChange('patientAge', e.target.value)} placeholder="Umur" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.patientJob} onChange={e => handleDataChange('patientJob', e.target.value)} placeholder="Pekerjaan" />
                 </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><CalendarDays size={12}/> Istirahat</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-black focus:ring-2 focus:ring-amber-500 outline-none" value={data.restingDays} onChange={e => handleDataChange('restingDays', e.target.value)} placeholder="Jumlah Hari" />
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.diagnosis} onChange={e => handleDataChange('diagnosis', e.target.value)} placeholder="Diagnosis" />
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama Dokter" />
                 <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.sipNumber} onChange={e => handleDataChange('sipNumber', e.target.value)} placeholder="No SIP" />
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className={`origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 shadow-2xl shrink-0 ${templateId === 1 ? 'mb-[-80mm] sm:mb-[-60mm] md:mb-[-20mm] lg:mb-0' : 'mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0'}`}>
                <div style={{ width: templateId === 1 ? '148mm' : '210mm', minHeight: templateId === 1 ? '210mm' : '297mm' }} className="bg-white flex flex-col p-[15mm] sm:p-[20mm]">
                  <DocumentContent />
                </div>
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div className="print-header-space"></div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><DocumentContent /></div></td></tr></tbody>
            <tfoot><tr><td><div className="print-footer-space"></div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
// FORCE-HMR-UPDATE