'use client';

/**
 * FILE: SPPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Peringatan (SP 1, 2, 3) Karyawan
 * FEATURES:
 * - Dual Template (Formal Legal vs Modern Clean)
 * - Auto Date Logic (Issue Date & Expiry +6 Months)
 * - Quick SP Level Selector (Auto Content)
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, AlertTriangle, 
  ShieldAlert, Calendar, User, Building2, ChevronDown, Check, Edit3, Eye, X, ImagePlus, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
  date: '', // Diisi useEffect
  validUntil: '', // Diisi useEffect
  
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

// --- 3. KOMPONEN UTAMA ---
export default function SPPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Sistem HRD...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
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

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Formal
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Modern
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Formal' : 'Format Modern';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[10pt]' : 'font-sans text-[10pt]'}`}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: FORMAL */
        <div className="flex flex-col h-full">
            {/* KOP */}
            <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-3 mb-6 shrink-0 text-center">
                {logo ? (
                  <img src={logo} alt="Logo" className="w-18 h-18 object-contain shrink-0 block print:block" />
                ) : (
                  <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                    <Building2 size={32} />
                  </div>
                )}
                <div className="flex-grow">
                  <h1 className="text-[16pt] font-black uppercase leading-tight tracking-tight print:text-black">{data.compName}</h1>
                  <p className="text-[8pt] font-sans mt-1 italic text-slate-600 print:text-black leading-tight whitespace-pre-line">{data.compInfo}</p>
                </div>
            </div>

            {/* JUDUL */}
            <div className="text-center mb-6 shrink-0 leading-tight uppercase">
                <h2 className={`text-lg font-black underline decoration-1 underline-offset-4 tracking-widest ${spLevel === 3 ? 'text-red-700 print:text-black' : 'print:text-black'}`}>SURAT PERINGATAN {spLevel}</h2>
                <p className="text-[9pt] font-sans mt-1 font-bold print:text-black">Nomor: {data.no}</p>
            </div>

            {/* ISI */}
            <div className="flex-grow space-y-5 overflow-hidden text-left">
                <p>Surat Peringatan ini diberikan kepada karyawan yang identitasnya tersebut di bawah ini:</p>
                
                <div className="ml-8 space-y-1 font-sans italic border-l-4 border-slate-100 pl-6 print:border-slate-300">
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.empName}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK / ID</span><span>:</span><span>{data.empId}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan / Divisi</span><span>:</span><span>{data.empTitle} - {data.empDiv}</span></div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <p className="font-bold uppercase text-[9pt] border-b border-slate-200 w-fit pb-0.5 print:border-black">1. Dasar Pelanggaran:</p>
                        <p className="text-justify leading-relaxed ml-4">Bahwa Saudara <b>{data.empName}</b> telah melakukan tindakan indisipliner / pelanggaran tata tertib perusahaan berupa: <span className="font-bold">{data.violationTitle}</span>.</p>
                        <p className="bg-slate-50 p-3 rounded border border-slate-200 italic text-[9pt] ml-4 print:bg-transparent print:border-black leading-normal">"{data.violationDesc}"</p>
                    </div>

                    <div className="space-y-1">
                        <p className="font-bold uppercase text-[9pt] border-b border-slate-200 w-fit pb-0.5 print:border-black">2. Sanksi & Konsekuensi:</p>
                        <div className="text-justify ml-4 space-y-2">
                            <p>{data.sanction}</p>
                            <p>Surat Peringatan ini berlaku efektif mulai tanggal <b>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</b> sampai dengan <b>{isClient && data.validUntil ? new Date(data.validUntil).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</b>.</p>
                        </div>
                    </div>
                </div>

                <p className="text-justify leading-relaxed">Demikian Surat Peringatan ini diterbitkan agar dapat menjadi perhatian dan bahan evaluasi diri bagi Saudara untuk memperbaiki kinerja dan kedisiplinan di masa mendatang.</p>
            </div>

            {/* TTD */}
            <div className="shrink-0 mt-8 pt-6 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
                 <div className="grid grid-cols-2 gap-10 text-center">
                    <div className="flex flex-col h-40">
                       <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Manajemen,</p>
                       <div className="mt-auto">
                          <p className="font-bold underline uppercase tracking-tight leading-none text-[10.5pt]">{data.signer}</p>
                          <p className="text-[9pt] font-sans mt-1">{data.signerJob}</p>
                       </div>
                    </div>
                    <div className="flex flex-col h-40">
                       <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Penerima,</p>
                       <div className="mt-auto">
                          <p className="font-bold underline uppercase tracking-tight leading-none text-[10.5pt]">{data.empName}</p>
                          <p className="text-[9pt] font-sans mt-1 italic">Karyawan</p>
                       </div>
                    </div>
                 </div>
            </div>
        </div>
      ) : (
        /* TEMPLATE 2: MODERN */
        <div className="flex flex-col h-full font-sans">
            <div className="flex justify-between items-start mb-8 border-l-4 border-red-600 pl-6 py-2 shrink-0 print:border-black">
               <div>
                  <h1 className="text-2xl font-black uppercase tracking-tighter leading-none text-slate-900 print:text-black">{data.compName}</h1>
                  <p className="text-xs font-bold text-red-600 uppercase tracking-widest mt-1 print:text-black">Disciplinary Action Notice</p>
               </div>
               <div className="text-right text-xs">
                  <p className="font-mono">Ref: {data.no}</p>
                  <p>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID') : '...'}</p>
               </div>
            </div>

            <div className="flex-grow space-y-6 text-justify">
               <div className="bg-red-50 p-4 border border-red-100 rounded print:bg-transparent print:border-black">
                  <h2 className="text-xl font-bold text-red-700 uppercase mb-1 print:text-black">SURAT PERINGATAN {spLevel}</h2>
                  <p className="text-sm">Ditujukan kepada: <strong>{data.empName}</strong> ({data.empDiv})</p>
               </div>

               <div>
                  <h3 className="text-sm font-bold uppercase text-slate-500 mb-2 print:text-black">1. Pelanggaran</h3>
                  <p className="font-bold mb-1">{data.violationTitle}</p>
                  <p className="italic text-slate-600 print:text-black">"{data.violationDesc}"</p>
               </div>

               <div>
                  <h3 className="text-sm font-bold uppercase text-slate-500 mb-2 print:text-black">2. Tindakan Disipliner</h3>
                  <p>{data.sanction}</p>
                  <p className="mt-2 text-xs text-slate-500 print:text-black">Masa berlaku SP: {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID') : ''} s/d {isClient && data.validUntil ? new Date(data.validUntil).toLocaleDateString('id-ID') : ''}</p>
               </div>

               <p className="text-sm pt-4 border-t border-slate-200 print:border-black">
                  Harap diperhatikan bahwa kegagalan untuk memperbaiki kinerja atau perilaku dapat mengakibatkan tindakan disipliner lebih lanjut, hingga pemutusan hubungan kerja.
               </p>
            </div>

            <div className="mt-12 flex justify-between items-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
               <div>
                  <p className="text-xs font-bold uppercase text-slate-400 mb-12 print:text-black">Diterima Oleh,</p>
                  <p className="font-bold uppercase border-b border-black inline-block pb-1">{data.empName}</p>
               </div>
               <div className="text-right">
                  <p className="text-xs font-bold uppercase text-slate-400 mb-12 print:text-black">Diterbitkan Oleh,</p>
                  <p className="font-bold uppercase border-b border-black inline-block pb-1">{data.signer}</p>
                  <p className="text-xs mt-1">{data.signerJob}</p>
               </div>
            </div>
        </div>
      )}
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-tighter italic">
               <ShieldAlert size={16} /> <span>Official Warning Letter Builder</span>
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
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print SP</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pelanggaran</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><AlertTriangle size={12}/> Tingkat Peringatan</h3>
                 <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => applySPLevel(1)} className={`p-2 border rounded text-[10px] font-bold transition-all ${spLevel === 1 ? 'bg-amber-500 text-white border-amber-600 shadow-md' : 'hover:bg-slate-50 text-slate-600'}`}>SP 1</button>
                    <button onClick={() => applySPLevel(2)} className={`p-2 border rounded text-[10px] font-bold transition-all ${spLevel === 2 ? 'bg-orange-500 text-white border-orange-600 shadow-md' : 'hover:bg-slate-50 text-slate-600'}`}>SP 2</button>
                    <button onClick={() => applySPLevel(3)} className={`p-2 border rounded text-[10px] font-bold transition-all ${spLevel === 3 ? 'bg-red-600 text-white border-red-700 shadow-md' : 'hover:bg-slate-50 text-slate-600'}`}>SP 3</button>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
                 <div className="flex items-center gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus Logo</button>}
                    <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.compInfo} onChange={e => handleDataChange('compInfo', e.target.value)} placeholder="Alamat / Kontak Perusahaan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Data Karyawan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.empId} onChange={e => handleDataChange('empId', e.target.value)} placeholder="NIK / ID" />
                    <input className="w-full p-2 border rounded text-xs" value={data.empDiv} onChange={e => handleDataChange('empDiv', e.target.value)} placeholder="Divisi" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><ShieldAlert size={12}/> Detail Kasus</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.violationTitle} onChange={e => handleDataChange('violationTitle', e.target.value)} placeholder="Judul Pelanggaran" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.violationDesc} onChange={e => handleDataChange('violationDesc', e.target.value)} placeholder="Kronologi Singkat" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed font-bold text-red-600" value={data.sanction} onChange={e => handleDataChange('sanction', e.target.value)} placeholder="Sanksi Administratif" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Calendar size={12}/> Validitas & Legalitas</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Terbit</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">S/D Tanggal</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.validUntil} onChange={e => handleDataChange('validUntil', e.target.value)} /></div>
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.signer} onChange={e => handleDataChange('signer', e.target.value)} placeholder="Nama HRD / Manager" />
                 <input className="w-full p-2 border rounded text-xs" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan Penanda Tangan" />
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
