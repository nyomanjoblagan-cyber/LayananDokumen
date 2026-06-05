'use client';

/**
 * FILE: RujukanMedisPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Rujukan Medis / Pasien
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Stethoscope, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, HeartPulse, Activity,
  ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ReferralData {
  city: string;
  date: string;
  docNo: string;
  
  // FASKES AWAL
  faskesName: string;
  faskesAddress: string;
  faskesPhone: string;
  
  // TUJUAN
  targetHospital: string;
  targetSpecialist: string;
  
  // PASIEN
  patientName: string;
  patientNik: string;
  patientAge: string;
  patientGender: string;
  bpjsNumber: string;
  
  // MEDIS
  diagnosis: string;
  medicalHistory: string;
  vitalSigns: string;
  
  // DOKTER
  doctorName: string;
  sipNumber: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ReferralData = {
  city: 'DENPASAR',
  date: '', 
  docNo: 'REF/MED/BPJS/I/2026/012',
  
  faskesName: 'KLINIK PRATAMA WARGA SEHAT',
  faskesAddress: 'Jl. Teuku Umar No. 101, Denpasar, Bali',
  faskesPhone: '(0361) 998877',
  
  targetHospital: 'RSUP PROF. DR. I.G.N.G. NGOERAH (SANGLAH)',
  targetSpecialist: 'Spesialis Penyakit Dalam / Kardiologi',
  
  patientName: 'BAGUS RAMADHAN',
  patientNik: '5171010101990001',
  patientAge: '27 Tahun',
  patientGender: 'Laki-laki',
  bpjsNumber: '0001234567890',
  
  diagnosis: 'Suspect Coronary Artery Disease (CAD) / Angina Pektoris Tidak Stabil',
  medicalHistory: 'Nyeri dada kiri menjalar ke lengan kiri sejak 2 hari, sesak napas saat aktivitas berat. Riwayat hipertensi terkontrol.',
  vitalSigns: 'TD: 150/90 mmHg, HR: 98x/mnt, Temp: 36.5°C',
  
  doctorName: 'dr. I MADE WIRA, S.Ked',
  sipNumber: 'SIP. 445/088/DINKES/2024'
};

export default function RujukanMedisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <ReferralBuilder />
    </Suspense>
  );
}

function ReferralBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ReferralData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ReferralData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-rose-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-rose-50 text-rose-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-rose-500' : 'bg-slate-300'}`}></div> 
            Format Formal (RS/BPJS)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-rose-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-rose-50 text-rose-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-rose-500' : 'bg-slate-300'}`}></div> 
            Format Ringkas (Klinik)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Formal' : 'Format Ringkas';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* KOP KLINIK / FASKES */}
        <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-6 text-center shrink-0 font-sans">
          <h1 className="text-[16pt] font-black leading-tight uppercase tracking-tighter italic text-slate-900">{data.faskesName}</h1>
          <p className="text-[9pt] mt-1 italic leading-tight text-slate-500 print:text-black">{data.faskesAddress} | Telp: {data.faskesPhone}</p>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 shrink-0 leading-tight">
          <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-8 tracking-widest">SURAT RUJUKAN PASIEN</h2>
          <p className="text-[9pt] font-sans mt-3 italic font-bold text-slate-400 print:text-black">Nomor: {data.docNo}</p>
        </div>

        {/* BODY SURAT */}
        <div className="space-y-6 flex-grow overflow-hidden text-left leading-relaxed">
          <div className="font-sans text-[10pt] space-y-1">
            <p>Yth. Sejawat Dokter,</p>
            <p className="font-bold uppercase tracking-tight text-rose-700 print:text-black">Bagian {data.targetSpecialist}</p>
            <p className="font-bold text-slate-900">{data.targetHospital}</p>
            <p className="italic text-slate-400">Di Tempat</p>
          </div>

          <p>Mohon pemeriksaan dan penanganan medis lebih lanjut terhadap pasien di bawah ini:</p>
          
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase text-slate-900 tracking-tight">{data.patientName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK / No. BPJS</span><span>:</span><span className="font-mono">{data.patientNik} / {data.bpjsNumber}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Umur / Kelamin</span><span>:</span><span>{data.patientAge} / {data.patientGender}</span></div>
          </div>

          <div className="space-y-5">
            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-rose-600 print:bg-transparent print:border-2 print:border-black break-inside-avoid">
               <p className="font-black text-[9px] uppercase text-rose-600 tracking-[0.2em] mb-2">Diagnosis Sementara:</p>
               <p className="font-black text-[11pt] leading-snug">"{data.diagnosis}"</p>
            </div>

            <div className="grid grid-cols-1 gap-6 font-sans text-[10pt] break-inside-avoid">
               <div>
                  <p className="font-black uppercase text-[8px] tracking-widest text-slate-400 mb-2 underline decoration-rose-200 underline-offset-4">Anamnesa & Pemeriksaan Fisik:</p>
                  <p className="text-slate-700 print:text-black leading-relaxed text-justify">{data.medicalHistory}</p>
               </div>
               <div className="pt-4 border-t border-slate-100 print:border-black">
                  <p className="font-black uppercase text-[8px] tracking-widest text-slate-400 mb-2">Tanda Vital (Vital Signs):</p>
                  <p className="bg-slate-900 text-white px-4 py-2 rounded-lg inline-block font-mono text-[11pt] print:bg-transparent print:text-black print:border-2 print:border-black">{data.vitalSigns}</p>
               </div>
            </div>
          </div>

          <p className="text-justify leading-relaxed">Demikian rujukan ini kami sampaikan agar pasien mendapatkan pelayanan spesialistik yang diperlukan. Atas kerja sama Sejawat, kami ucapkan terima kasih.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10 pt-8 border-t border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
           <div className="flex justify-end text-center font-sans">
              <div className="w-80 flex flex-col h-44">
                 <p className="text-[10pt] mb-1 font-bold text-slate-400">{data.city}, {formatDateSafe(data.date)}</p>
                 <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-1">Dokter Pemeriksa,</p>
                 <div className="mt-auto">
                    <p className="font-black underline uppercase tracking-tight leading-none text-[11pt] text-slate-900">{data.doctorName}</p>
                    <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-tighter">SIP. {data.sipNumber}</p>
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
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-rose-400 uppercase tracking-tighter italic">
               <HeartPulse size={16} /> <span>Medical Referral Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Rujukan</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Rujukan</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Fasilitas Pengirim</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-rose-500 outline-none uppercase" value={data.faskesName} onChange={e => handleDataChange('faskesName', e.target.value)} placeholder="Nama Klinik / Faskes" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.faskesAddress} onChange={e => handleDataChange('faskesAddress', e.target.value)} placeholder="Alamat & Telepon" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="No. Surat" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.faskesPhone} onChange={e => handleDataChange('faskesPhone', e.target.value)} placeholder="Telp Klinik" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Identitas Pasien</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} placeholder="Nama Pasien" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.patientNik} onChange={e => handleDataChange('patientNik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.bpjsNumber} onChange={e => handleDataChange('bpjsNumber', e.target.value)} placeholder="No. BPJS" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientAge} onChange={e => handleDataChange('patientAge', e.target.value)} placeholder="Umur" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientGender} onChange={e => handleDataChange('patientGender', e.target.value)} placeholder="Kelamin" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Activity size={12}/> Keterangan Medis</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold text-rose-600 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.diagnosis} onChange={e => handleDataChange('diagnosis', e.target.value)} placeholder="Diagnosis Utama" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.medicalHistory} onChange={e => handleDataChange('medicalHistory', e.target.value)} placeholder="Keterangan Klinis (Anamnesa)" />
                 <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.vitalSigns} onChange={e => handleDataChange('vitalSigns', e.target.value)} placeholder="Tanda Vital (cth: TD, HR, Temp)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Tujuan & Otoritas</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none" value={data.targetHospital} onChange={e => handleDataChange('targetHospital', e.target.value)} placeholder="Rumah Sakit Tujuan" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.targetSpecialist} onChange={e => handleDataChange('targetSpecialist', e.target.value)} placeholder="Spesialis Tujuan" />
                 <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama Dokter Pemeriksa" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.sipNumber} onChange={e => handleDataChange('sipNumber', e.target.value)} placeholder="No. SIP Dokter" />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
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