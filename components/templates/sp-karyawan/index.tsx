'use client';

/**
 * FILE: SPPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Peringatan (SP 1, 2, 3) Karyawan
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML & Import PenTool
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, AlertTriangle, 
  ShieldAlert, Calendar, User, Building2, ChevronDown, Check, Edit3, Eye, X, ImagePlus, RotateCcw,
  ArrowLeftCircle, PenTool // FIX: Import PenTool ditambahkan
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SPData {
  no: string;
  date: string;
  validUntil: string;
  
  // Perusahaan
  compName: string;
  compInfo: string;
  
  // Karyawan
  empName: string;
  empId: string;
  empDiv: string;
  empTitle: string;
  
  // Pelanggaran
  violationTitle: string;
  violationDesc: string;
  sanction: string;
  
  // Penandatangan
  signer: string;
  signerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SPData = {
  no: `SP-001/HRD/2026`,
  date: '', 
  validUntil: '', 
  
  compName: 'PT. MAJU MUNDUR SEJAHTERA',
  compInfo: 'Jl. Jend. Sudirman Kav. 1, Jakarta Selatan\nEmail: hrd@majumundur.com',
  
  empName: 'BUDI SANTOSO',
  empId: 'NIK-2023005',
  empDiv: 'Sales & Marketing',
  empTitle: 'Sales Executive',
  
  violationTitle: 'Ketidakhadiran Tanpa Keterangan (Alpha)',
  violationDesc: 'Saudara tidak masuk kerja tanpa keterangan (Alpha) selama 3 (tiga) hari berturut-turut pada tanggal 10, 11, dan 12 Januari 2026, serta tidak dapat dihubungi oleh atasan.',
  
  sanction: 'Selama masa berlaku SP 1 ini (6 bulan), Perusahaan akan memantau kinerja Saudara. Tunjangan tidak tetap akan dipotong sesuai kebijakan.',
  
  signer: 'SISKA AMELIA',
  signerJob: 'HRD Manager'
};

export default function SPPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Memuat Sistem HRD...</div>}>
      <SPToolBuilder />
    </Suspense>
  );
}

function SPToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [spLevel, setSpLevel] = useState<1 | 2 | 3>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<SPData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const sixMonths = new Date(new Date().setMonth(today.getMonth() + 6));
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        validUntil: sixMonths.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof SPData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const applySPLevel = (level: 1 | 2 | 3) => {
    setSpLevel(level);
    let newSanction = '';
    
    if (level === 1) {
      newSanction = 'Selama masa berlaku SP 1 ini (6 bulan), Perusahaan akan memantau kinerja Saudara. Tunjangan tidak tetap akan dipotong sesuai kebijakan.';
    } else if (level === 2) {
      newSanction = 'SP 2 ini diterbitkan karena Saudara mengulangi kesalahan saat masa SP 1 masih berlaku. Sanksi administratif berupa penundaan kenaikan gaji akan diberlakukan.';
    } else {
      newSanction = 'INI ADALAH PERINGATAN TERAKHIR (SP 3). Jika Saudara melakukan pelanggaran sekali lagi dalam bentuk apapun, Perusahaan akan melakukan Pemutusan Hubungan Kerja (PHK).';
    }

    setData(prev => ({
      ...prev,
      no: `SP-00${level}/HRD/2026`,
      sanction: newSanction
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const sixMonths = new Date(new Date().setMonth(today.getMonth() + 6));
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0],
            validUntil: sixMonths.toISOString().split('T')[0]
        });
        setLogo(null);
        setSpLevel(1);
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Formal' : 'Format Modern';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
        
        {/* KOP PERUSAHAAN */}
        <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 font-sans">
            {logo ? (
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
            ) : (
              <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                 <Building2 size={32} />
              </div>
            )}
            <div className="flex-grow text-left">
                <h1 className="text-[16pt] font-black uppercase leading-tight tracking-tighter text-slate-900">{data.compName}</h1>
                <p className="text-[8.5pt] mt-1 italic text-slate-500 print:text-black leading-tight whitespace-pre-line">{data.compInfo}</p>
            </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 shrink-0 leading-tight font-sans">
            <h2 className={`text-xl font-black underline uppercase decoration-2 underline-offset-8 tracking-widest ${spLevel === 3 ? 'text-red-700 print:text-black' : 'text-slate-900'}`}>SURAT PERINGATAN {spLevel}</h2>
            <p className="text-[10pt] mt-4 font-bold text-slate-400 print:text-black uppercase tracking-widest font-mono">Nomor: {data.no}</p>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow space-y-6 overflow-hidden text-justify leading-relaxed">
            <p>Surat Peringatan ini diberikan kepada karyawan yang identitasnya tersebut di bawah ini:</p>
            
            <div className="ml-8 space-y-1.5 font-sans italic border-l-4 border-slate-100 pl-8 py-1 break-inside-avoid print:border-slate-300">
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold text-slate-900 uppercase tracking-tight">{data.empName}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK / ID</span><span>:</span><span className="font-mono">{data.empId}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan / Divisi</span><span>:</span><span>{data.empTitle} - {data.empDiv}</span></div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2 break-inside-avoid">
                    <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">1. Dasar Pelanggaran</p>
                    <div className="ml-4 space-y-2">
                      <p>Bahwa Saudara <strong>{data.empName}</strong> telah melakukan tindakan indisipliner / pelanggaran tata tertib perusahaan berupa: <span className="font-bold text-rose-700 print:text-black underline">{data.violationTitle}</span>.</p>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 italic text-[10pt] print:bg-transparent print:border-black leading-relaxed">
                        "{data.violationDesc}"
                      </div>
                    </div>
                </div>

                <div className="space-y-2 break-inside-avoid">
                    <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">2. Sanksi & Konsekuensi</p>
                    <div className="ml-4 space-y-3">
                        <p className="font-bold text-slate-900">{data.sanction}</p>
                        <p className="italic text-[9pt] text-slate-500 print:text-black">
                          Surat Peringatan ini berlaku efektif mulai tanggal <strong>{formatDateSafe(data.date)}</strong> sampai dengan <strong>{formatDateSafe(data.validUntil)}</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <p>Demikian Surat Peringatan ini diterbitkan agar menjadi perhatian serius dan bahan evaluasi bagi Saudara untuk memperbaiki kinerja serta perilaku di masa mendatang guna menghindari sanksi yang lebih berat.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10 pt-10 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
             <div className="grid grid-cols-2 gap-10 text-center font-sans">
                <div className="flex flex-col h-44">
                   <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-[0.2em] mb-1">Manajemen,</p>
                   <div className="mt-auto">
                      <p className="font-black underline uppercase tracking-tight leading-none text-[11pt] text-slate-900">{data.signer}</p>
                      <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-tighter">{data.signerJob}</p>
                   </div>
                </div>
                <div className="flex flex-col h-44">
                   <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-[0.2em] mb-1">Karyawan Penerima,</p>
                   <div className="mt-auto">
                      <p className="font-black underline uppercase tracking-tight leading-none text-[11pt] text-slate-900">{data.empName}</p>
                      <p className="text-[9pt] font-bold text-slate-400 mt-1 uppercase tracking-tighter italic">Tanda Tangan & Nama Terang</p>
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
          body { background: white !important; margin: 0; padding: 0; min-width: 210mm; }
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
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-tighter italic">
               <ShieldAlert size={16} /> <span>Employee Warning Letter Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Formal {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Modern {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak SP</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor SP</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-red-800 flex items-center gap-2"><AlertTriangle size={12}/> Level Peringatan</h3>
                 <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => applySPLevel(1)} className={`p-2 rounded-lg text-[10px] font-black shadow-sm transition-all ${spLevel === 1 ? 'bg-amber-500 text-white' : 'bg-white text-slate-600'}`}>SP 1</button>
                    <button onClick={() => applySPLevel(2)} className={`p-2 rounded-lg text-[10px] font-black shadow-sm transition-all ${spLevel === 2 ? 'bg-orange-600 text-white' : 'bg-white text-slate-600'}`}>SP 2</button>
                    <button onClick={() => applySPLevel(3)} className={`p-2 rounded-lg text-[10px] font-black shadow-sm transition-all ${spLevel === 3 ? 'bg-red-700 text-white' : 'bg-white text-slate-600'}`}>SP 3</button>
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} placeholder="Nama PT" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.compInfo} onChange={e => handleDataChange('compInfo', e.target.value)} placeholder="Alamat & Kontak Perusahaan" />
              </div>

              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Data Karyawan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} placeholder="Nama Lengkap" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.empId} onChange={e => handleDataChange('empId', e.target.value)} placeholder="NIK / ID" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.empDiv} onChange={e => handleDataChange('empDiv', e.target.value)} placeholder="Divisi" />
                 </div>
              </div>

              <div className="space-y-4 border-t pt-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><ShieldAlert size={12}/> Deskripsi Pelanggaran</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-black focus:ring-2 focus:ring-amber-500 outline-none" value={data.violationTitle} onChange={e => handleDataChange('violationTitle', e.target.value)} placeholder="Judul Kasus" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.violationDesc} onChange={e => handleDataChange('violationDesc', e.target.value)} placeholder="Kronologi Pelanggaran..." />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-red-500 outline-none font-bold" value={data.sanction} onChange={e => handleDataChange('sanction', e.target.value)} placeholder="Sanksi Administratif..." />
                 <div className="grid grid-cols-2 gap-3 pt-2">
                   <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No. Surat" />
                   <div className="space-y-1">
                      <label className="text-[8px] font-bold text-slate-400">S/D TANGGAL</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.validUntil} onChange={e => handleDataChange('validUntil', e.target.value)} />
                   </div>
                 </div>
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
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold text-xs uppercase">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>Editor</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>Preview</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}