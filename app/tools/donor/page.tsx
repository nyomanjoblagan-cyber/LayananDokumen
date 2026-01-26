'use client';

/**
 * FILE: DonorPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Keterangan Donor Darah
 * FEATURES:
 * - Dual Template (PMI Standard vs Hospital Report)
 * - Auto Date Format
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Heart, Droplets, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Activity, CalendarDays, ClipboardCheck,
  LayoutTemplate, ChevronDown, Check, ArrowLeftCircle, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface DonorData {
  city: string;
  date: string;
  docNo: string;
  
  // Instansi
  institutionName: string;
  institutionAddress: string;
  
  // Data Donor
  donorName: string;
  donorNik: string;
  bloodType: string;
  
  // Detail Kegiatan
  donorType: string;
  donorTime: string;
  location: string;
  
  // Pernyataan
  statement: string;

  // Petugas
  officerName: string;
  officerId: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DonorData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  docNo: 'DONOR/PMI-DPS/2026/01/442',
  
  institutionName: 'PALANG MERAH INDONESIA (PMI) KOTA DENPASAR',
  institutionAddress: 'Jl. Imam Bonjol No. 182, Denpasar, Bali',
  
  donorName: 'BAGUS RAMADHAN',
  donorNik: '5171010101990001',
  bloodType: 'O (Positif)',
  
  donorType: 'Donor Darah Sukarela',
  donorTime: '09:00 WITA',
  location: 'Unit Transfusi Darah (UTD) PMI Denpasar',
  
  statement: 'Telah mendonorkan darahnya secara sukarela untuk kepentingan kemanusiaan. Yang bersangkutan disarankan untuk beristirahat dari aktivitas fisik berat selama 24 jam ke depan.',

  officerName: 'dr. I MADE WIRA',
  officerId: 'NIP. 19850101 201001 1 004'
};

// --- 3. KOMPONEN UTAMA ---
export default function DonorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Donor...</div>}>
      <DonorBuilder />
    </Suspense>
  );
}

function DonorBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DonorData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof DonorData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format PMI (Resmi)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format RS (Medis)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format PMI' : 'Format RS';

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    // FIX: Print Padding & Layout
    // Menggunakan p-[20mm] print:p-[20mm]
    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] w-[210mm] min-h-[296mm] p-[20mm] print:p-[20mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* TEMPLATE 1: PMI STANDARD */}
        {templateId === 1 && (
          <div className="flex flex-col h-full">
            {/* KOP PMI */}
            <div className="flex items-center border-b-4 border-double border-red-600 pb-3 mb-8 shrink-0">
              <div className="bg-red-600 text-white p-3 rounded-full mr-4 print:text-red-600 print:border-2 print:border-red-600">
                 <Droplets size={32} />
              </div>
              <div className="flex-grow">
                 <h1 className="text-[14pt] font-black uppercase tracking-tighter text-red-600">{data.institutionName}</h1>
                 <p className="text-[9pt] font-sans italic text-slate-500">{data.institutionAddress}</p>
              </div>
              <div className="text-right border-l-2 pl-4 border-red-100">
                 <p className="text-[16pt] font-black text-red-600 leading-none">{data.bloodType}</p>
                 <p className="text-[7pt] font-sans uppercase font-bold tracking-widest text-slate-400">Gol. Darah</p>
              </div>
            </div>

            {/* JUDUL */}
            <div className="text-center mb-10 shrink-0">
              <h2 className="text-xl font-black underline uppercase tracking-[0.2em] leading-none text-slate-800">SURAT KETERANGAN DONOR</h2>
              <p className="text-[10pt] font-sans mt-2 italic text-slate-500">Nomor: {data.docNo}</p>
            </div>

            {/* BODY */}
            <div className="space-y-6 flex-grow text-justify px-1">
              <p>Pihak <b>{data.institutionName}</b> menerangkan dengan sebenarnya bahwa:</p>
              
              <div className="ml-8 space-y-1.5 font-sans text-[10.5pt] border-l-4 border-red-100 pl-6 italic">
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Donor</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.donorName}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.donorNik}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Jenis Donor</span><span>:</span><span className="font-bold text-red-600 uppercase">{data.donorType}</span></div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] space-y-2 print:bg-transparent print:border-black">
                 <p>Telah melakukan pengambilan {data.donorType.toLowerCase()} pada:</p>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Hari, Tanggal</span><span>:</span><span className="font-bold">{new Date(data.date).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Waktu / Lokasi</span><span>:</span><span>{data.donorTime} / {data.location}</span></div>
              </div>

              <p className="text-justify indent-8 leading-relaxed">
                 {data.statement}
              </p>

              <p>Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya, termasuk sebagai bukti ijin istirahat bagi instansi/tempat bekerja.</p>
            </div>

            {/* TANDA TANGAN */}
            <div className="mt-12 flex justify-between items-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
              <div className="w-32 h-32 border-2 border-dashed border-slate-200 flex items-center justify-center text-center p-2 rounded print:border-black">
                 <p className="text-[7pt] text-slate-300 font-sans uppercase print:text-black">Stempel<br/>Resmi Instansi</p>
              </div>
              <div className="text-center w-72">
                 <p className="text-[10pt] mb-1">{data.city}, {formatDate(data.date)}</p>
                 <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase print:text-black">Petugas Unit Transfusi,</p>
                 <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.officerName}</p>
                 <p className="text-[8pt] font-sans mt-1">{data.officerId}</p>
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATE 2: HOSPITAL REPORT */}
        {templateId === 2 && (
          <div className="font-sans text-[10.5pt] text-slate-800 leading-snug flex flex-col h-full">
            {/* HEADER MODERN */}
            <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-8 shrink-0">
              <div className="flex items-center gap-3">
                 <div className="bg-slate-900 text-white p-2 rounded print:text-black print:bg-transparent"><Activity size={24}/></div>
                 <div>
                    <h1 className="text-lg font-black uppercase tracking-tight leading-none">{data.institutionName}</h1>
                    <p className="text-[9pt] text-slate-500 print:text-black">Medical Report Center</p>
                 </div>
              </div>
              <div className="text-right text-[9pt]">
                 <p className="font-mono">{data.docNo}</p>
                 <p>{formatDate(data.date)}</p>
              </div>
            </div>

            <div className="mb-8 flex-grow">
              <h2 className="text-xl font-bold uppercase text-slate-900 mb-6">Laporan Donasi Medis</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                 <div className="space-y-1">
                    <p className="text-[9pt] font-bold text-slate-400 uppercase print:text-black">Nama Pendonor</p>
                    <p className="font-bold text-lg uppercase">{data.donorName}</p>
                    <p className="text-sm text-slate-500 print:text-black">{data.donorNik}</p>
                 </div>
                 <div className="space-y-1 text-right">
                    <p className="text-[9pt] font-bold text-slate-400 uppercase print:text-black">Golongan Darah</p>
                    <p className="font-black text-3xl text-red-600">{data.bloodType}</p>
                 </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 print:bg-transparent print:border-black">
                 <h3 className="font-bold text-sm mb-3 border-b pb-2">Detail Prosedur</h3>
                 <div className="grid grid-cols-[120px_10px_1fr] gap-y-2 text-sm">
                    <span>Jenis Tindakan</span><span>:</span><span className="font-bold">{data.donorType}</span>
                    <span>Lokasi</span><span>:</span><span>{data.location}</span>
                    <span>Catatan Medis</span><span>:</span><span className="italic text-slate-600 print:text-black">"{data.statement}"</span>
                 </div>
              </div>

              <p className="text-justify text-sm leading-relaxed">
                 Dokumen ini menyatakan bahwa pendonor tersebut di atas telah menyelesaikan prosedur donasi dengan baik dan dalam kondisi stabil pasca tindakan. Disarankan istirahat cukup dan konsumsi cairan lebih banyak.
              </p>
            </div>

            <div className="mt-12 pt-4 border-t border-slate-900 flex justify-between items-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-xs text-slate-400 max-w-[200px] print:text-black">
                 *Dokumen ini sah dan diterbitkan secara elektronik oleh sistem informasi medis {data.institutionName}.
              </div>
              <div className="text-right">
                 <p className="text-sm font-bold mb-16">Dokter Penanggung Jawab</p>
                 <p className="font-black text-lg border-b-2 border-slate-900 inline-block pb-1">{data.officerName}</p>
                 <p className="text-xs font-bold text-slate-400 mt-1 print:text-black">{data.officerId}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:m-0">
      
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
               <Heart size={16} className="text-red-500" /> <span>DONOR LETTER BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
              {/* 1. INSTANSI */}
              <div className="space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Unit Transfusi / RS</h3>
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Unit/RS</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.institutionName} onChange={e => handleDataChange('institutionName', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.institutionAddress} onChange={e => handleDataChange('institutionAddress', e.target.value)} /></div>
                 </div>
              </div>

              {/* 2. DONOR */}
              <div className="space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Data Pendonor</h3>
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.donorName} onChange={e => handleDataChange('donorName', e.target.value)} /></div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.donorNik} onChange={e => handleDataChange('donorNik', e.target.value)} /></div>
                       <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Golongan Darah</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-black text-red-600" value={data.bloodType} onChange={e => handleDataChange('bloodType', e.target.value)} /></div>
                    </div>
                 </div>
              </div>

              {/* 3. KEGIATAN */}
              <div className="space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Heart size={12}/> Detail Donor</h3>
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Jenis Donor</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.donorType} onChange={e => handleDataChange('donorType', e.target.value)} /></div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Waktu</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.donorTime} onChange={e => handleDataChange('donorTime', e.target.value)} /></div>
                       <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                    </div>
                    <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Lokasi</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.location} onChange={e => handleDataChange('location', e.target.value)} /></div>
                 </div>
              </div>

              {/* 4. KETERANGAN */}
              <div className="space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ClipboardCheck size={12}/> Keterangan & Petugas</h3>
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Catatan Medis</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-20 resize-none" value={data.statement} onChange={e => handleDataChange('statement', e.target.value)} /></div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Petugas</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" value={data.officerName} onChange={e => handleDataChange('officerName', e.target.value)} /></div>
                       <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP/ID</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.officerId} onChange={e => handleDataChange('officerId', e.target.value)} /></div>
                    </div>
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
                    <ContentInside />
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
            <ContentInside />
         </div>
      </div>

    </div>
  );
}
