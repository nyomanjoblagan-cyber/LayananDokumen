'use client';

/**
 * FILE: KetDokterSederhanaPage.tsx
 * STATUS: FINAL FIXED (A5 PRINT CLEAN)
 * DESC: Generator Surat Keterangan Sakit
 * FIXES: 
 * - @page margin 0mm !important -> Hapus tulisan header/footer browser.
 * - Hapus padding internal saat print agar tidak double margin.
 * - Dynamic Page Size (A5/A4).
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Stethoscope, Building2, UserCircle2, 
  CalendarDays, Check, ChevronDown, LayoutTemplate, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
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

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Klinik (A5)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format RS (A4)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Klinik (A5)' : 'Format RS (A4)';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const baseFontSize = templateId === 1 ? 'text-[10pt]' : 'text-[11pt]';

    return (
      // FIX: print:p-0 (Menghapus padding internal saat print, karena sudah dihandle Table Wrapper)
      <div className={`bg-white font-serif text-slate-900 leading-snug w-full h-full ${baseFontSize} print:p-0`}>
        
        {/* KOP KLINIK */}
        <div className="flex items-center border-b-2 border-slate-900 pb-2 mb-4 shrink-0">
          <div className="bg-slate-900 text-white p-1.5 rounded mr-3 print:text-black print:border print:border-black print:bg-transparent">
            <Stethoscope size={20} />
          </div>
          <div className="flex-grow">
            <h1 className="text-[1.1em] font-black uppercase tracking-tight leading-none mb-1">{data.clinicName}</h1>
            <p className="text-[0.8em] font-sans italic text-slate-600 print:text-black leading-none">{data.clinicAddress}</p>
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-4 shrink-0">
          <h2 className="text-[1.2em] font-black underline uppercase tracking-widest leading-none">SURAT KETERANGAN SAKIT</h2>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow">
          <p className="mb-2">Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
          
          <div className="ml-2 mb-3 space-y-0.5 font-sans italic border-l-2 border-slate-200 pl-3 py-1 text-[0.9em]">
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.patientName}</span></div>
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Umur</span><span>:</span><span>{data.patientAge}</span></div>
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.patientJob}</span></div>
              <div className="grid grid-cols-[80px_5px_1fr]"><span>Tanda Vital</span><span>:</span><span className="font-mono font-bold text-blue-700 print:text-black">{data.vitalSigns}</span></div>
          </div>

          <p className="mb-3 text-justify">Berdasarkan hasil pemeriksaan medis, pasien tersebut dalam kondisi <b>kurang sehat (Sakit)</b> sehingga memerlukan istirahat selama:</p>

          <div className="text-center py-2 mb-3 bg-slate-50 border border-slate-300 rounded print:bg-transparent print:border-black">
             <p className="text-[1.2em] font-black">
               {data.restingDays} Hari
             </p>
             <p className="text-[0.9em] font-sans">
               {isClient && data.startDate ? new Date(data.startDate).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'}) : '...'} s/d {isClient && data.endDate ? new Date(data.endDate).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'}) : '...'}
             </p>
          </div>

          <p className="italic text-[0.9em] mb-2">
            Diagnosis: <b>{data.diagnosis}</b>
          </p>

          <p className="text-justify">Demikian surat keterangan ini dibuat untuk dipergunakan sebagai ijin beristirahat/sakit.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="mt-6 flex justify-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
          <div className="text-center w-64">
            <p className="text-[0.9em] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}</p>
            <p className="text-[0.8em] font-bold text-slate-500 uppercase tracking-widest mb-16 print:text-black">Dokter Pemeriksa,</p>
            <p className="font-bold underline uppercase text-[9pt] leading-tight">{data.doctorName}</p>
            <p className="text-[0.7em] font-sans mt-0.5 font-bold">SIP. {data.sipNumber}</p>
          </div>
        </div>
      </div>
    );
  };

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          /* FIX: Force Margin 0mm untuk menghilangkan Header/Footer Browser */
          @page { 
            size: ${templateId === 1 ? 'A5' : 'A4'}; 
            margin: 0mm !important; 
          }
          html, body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important; 
          }
          .no-print { display: none !important; }
          
          /* TABLE WRAPPER STRATEGY */
          .print-table { width: 100%; border-collapse: collapse; }
          
          /* Margin Atas & Bawah dibuat via Spacer Table */
          .print-header-space { height: ${templateId === 1 ? '10mm' : '20mm'}; }
          .print-footer-space { height: ${templateId === 1 ? '10mm' : '20mm'}; }
          
          /* Margin Kiri & Kanan via Padding Content Wrapper */
          .print-content-wrapper { padding: 0 ${templateId === 1 ? '10mm' : '20mm'}; }
          
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
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Stethoscope size={16} className="text-blue-500" /> <span>MEDICAL NOTE BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Medis</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><Building2 size={12}/> Klinik</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.clinicName} onChange={e => handleDataChange('clinicName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.clinicAddress} onChange={e => handleDataChange('clinicAddress', e.target.value)} placeholder="Alamat Klinik" />
                 <input className="w-full p-2 border rounded text-xs" value={data.vitalSigns} onChange={e => handleDataChange('vitalSigns', e.target.value)} placeholder="Tanda Vital (TD, Suhu)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Pasien</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.patientAge} onChange={e => handleDataChange('patientAge', e.target.value)} placeholder="Umur" />
                    <input className="w-full p-2 border rounded text-xs" value={data.patientJob} onChange={e => handleDataChange('patientJob', e.target.value)} placeholder="Pekerjaan" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><CalendarDays size={12}/> Durasi Istirahat</h3>
                 <input className="w-full p-2 border rounded text-xs font-black" value={data.restingDays} onChange={e => handleDataChange('restingDays', e.target.value)} placeholder="Jumlah Hari" />
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded text-[10px]" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-[10px]" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.diagnosis} onChange={e => handleDataChange('diagnosis', e.target.value)} placeholder="Diagnosa" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama Dokter" />
                 <input className="w-full p-2 border rounded text-xs" value={data.sipNumber} onChange={e => handleDataChange('sipNumber', e.target.value)} placeholder="No SIP" />
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota Praktek" />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               {/* LOGIKA SKALA:
                  - Preview diberi scale lebih kecil agar muat di layar
               */}
               <div className={`origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 shadow-2xl flex flex-col items-center ${templateId === 1 ? 'mb-[-90mm] md:mb-[-40mm] lg:mb-0' : 'mb-[-130mm] md:mb-[-20mm] lg:mb-0'}`}>
                 <div style={{ width: templateId === 1 ? '148mm' : '210mm', minHeight: templateId === 1 ? '210mm' : '297mm' }} className="bg-white flex flex-col">
                    {/* VISUAL PADDING FOR PREVIEW (Hanya tampil di preview, karena di print pakai Table Wrapper) */}
                    <div style={{ padding: templateId === 1 ? '10mm' : '20mm' }}>
                       <DocumentContent />
                    </div>
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

      {/* PRINT AREA (TABLE WRAPPER) */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div className="print-header-space"></div></td></tr></thead>
            <tbody>
                <tr>
                    <td>
                        <div className="print-content-wrapper">
                            <DocumentContent />
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot><tr><td><div className="print-footer-space"></div></td></tr></tfoot>
         </table>
      </div>

    </div>
  );
}
