'use client';

/**
 * FILE: RawatInapPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Keterangan Rawat Inap (Hospital Inpatient Certificate)
 * FEATURES:
 * - Dual Template (Standard vs Compact)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Bed, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, CalendarRange, Thermometer, FileText,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface InpatientData {
  city: string;
  date: string;
  docNo: string;
  
  // RUMAH SAKIT
  hospitalName: string;
  hospitalAddress: string;
  
  // PASIEN
  patientName: string;
  patientNik: string;
  patientAge: string;
  patientAddress: string;
  
  // PERAWATAN
  admissionDate: string;
  dischargeDate: string;
  roomName: string;
  diagnosis: string;
  
  // DOKTER
  doctorName: string;
  sipNumber: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: InpatientData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  docNo: 'SKRI/RSBM/2026/01/088',
  
  hospitalName: 'RSUD BALI MANDARA',
  hospitalAddress: 'Jl. Bypass Ngurah Rai No. 548, Sanur, Denpasar Selatan',
  
  patientName: 'BAGUS RAMADHAN',
  patientNik: '5171010101990001',
  patientAge: '27 Tahun',
  patientAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  
  admissionDate: '2026-01-05',
  dischargeDate: '2026-01-08',
  roomName: 'Ruang Amerta - Kamar 302',
  diagnosis: 'Demam Berdarah Dengue (DBD) dengan Trombositopenia berat, membutuhkan observasi cairan dan monitoring trombosit secara berkala selama masa perawatan.',
  
  doctorName: 'dr. I MADE WIRA, Sp.PD',
  sipNumber: 'SIP. 445/112/DINKES/2024'
};

// --- 3. KOMPONEN UTAMA ---
export default function RawatInapPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <InpatientBuilder />
    </Suspense>
  );
}

function InpatientBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<InpatientData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof InpatientData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-rose-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-rose-50 text-rose-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-rose-500' : 'bg-slate-300'}`}></div> 
            Format Standar
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-rose-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-rose-50 text-rose-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-rose-500' : 'bg-slate-300'}`}></div> 
            Format Ringkas
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Standar' : 'Format Ringkas';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* KOP RUMAH SAKIT */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-6 text-center shrink-0">
        <h1 className="text-[16pt] font-black uppercase leading-tight tracking-tighter">{data.hospitalName}</h1>
        <p className="text-[9pt] font-sans mt-1 italic leading-relaxed text-slate-600 print:text-black">{data.hospitalAddress}</p>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT KETERANGAN RAWAT INAP</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="space-y-6 flex-grow overflow-hidden text-left">
        <p>Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Pasien</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.patientName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Umur</span><span>:</span><span>{data.patientAge}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.patientAddress}</span></div>
        </div>

        <p>Telah menjalani perawatan intensif (Rawat Inap) di <b>{data.hospitalName}</b> terhitung sejak:</p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] space-y-1.5 print:bg-transparent print:border-black">
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Tanggal Masuk</span><span>:</span><span className="font-bold">{isClient && data.admissionDate ? new Date(data.admissionDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Tanggal Keluar</span><span>:</span><span className="font-bold">{isClient && data.dischargeDate ? new Date(data.dischargeDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr]"><span>Ruang Rawat</span><span>:</span><span>{data.roomName}</span></div>
            <div className="grid grid-cols-[150px_10px_1fr] text-rose-700 print:text-black"><span>Diagnosis Medis</span><span>:</span><span className="font-black italic">"{data.diagnosis}"</span></div>
        </div>

        <p className="text-justify leading-relaxed">
          Surat keterangan ini diberikan atas permintaan yang bersangkutan untuk dipergunakan sebagai kelengkapan administrasi, klaim asuransi, bukti izin sakit, atau keperluan lainnya yang sah secara hukum.
        </p>

        <p>Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="flex justify-end text-center">
            <div className="w-72 flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Dokter Penanggung Jawab,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.doctorName}</p>
                  <p className="text-[9pt] font-sans mt-1">SIP/NIP. {data.sipNumber}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400 uppercase tracking-widest text-xs">Initializing...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-rose-400 uppercase tracking-tighter italic">
               <Bed size={16} /> <span>Inpatient Certificate Builder</span>
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
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-rose-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Rawat Inap</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Fasilitas Kesehatan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.hospitalName} onChange={e => handleDataChange('hospitalName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.hospitalAddress} onChange={e => handleDataChange('hospitalAddress', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Pasien</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.patientNik} onChange={e => handleDataChange('patientNik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded text-xs" value={data.patientAge} onChange={e => handleDataChange('patientAge', e.target.value)} placeholder="Umur" />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.patientAddress} onChange={e => handleDataChange('patientAddress', e.target.value)} placeholder="Alamat Pasien" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 flex items-center gap-2"><CalendarRange size={12}/> Detail Rawat</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Masuk</label>
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.admissionDate} onChange={e => handleDataChange('admissionDate', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Keluar</label>
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.dischargeDate} onChange={e => handleDataChange('dischargeDate', e.target.value)} />
                    </div>
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.roomName} onChange={e => handleDataChange('roomName', e.target.value)} placeholder="Ruangan" />
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.diagnosis} onChange={e => handleDataChange('diagnosis', e.target.value)} placeholder="Diagnosis Medis" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><PenTool size={12}/> Penandatangan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama Dokter" />
                 <input className="w-full p-2 border rounded text-xs" value={data.sipNumber} onChange={e => handleDataChange('sipNumber', e.target.value)} placeholder="NIP / SIP" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded text-xs font-bold" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
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
