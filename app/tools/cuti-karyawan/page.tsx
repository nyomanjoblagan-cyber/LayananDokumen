'use client';

/**
 * FILE: IzinCutiPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Izin Cuti / Sakit
 * FEATURES:
 * - Auto Days Calculation (Hitung Hari Otomatis)
 * - Auto Reason Generator (Tahunan/Sakit/Hamil)
 * - Dual Template (Formal vs Modern)
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useMemo, useEffect } from 'react';
import { 
  Printer, ArrowLeft, CalendarDays, UserCircle2, 
  Stethoscope, Baby, Palmtree, LayoutTemplate, ChevronDown, Check,
  Info, FileText, BadgeCheck, ArrowLeftCircle, Edit3, Eye, Briefcase, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface LeaveData {
  city: string;
  date: string;
  name: string;
  empId: string;
  position: string;
  department: string;
  startDate: string;
  endDate: string;
  reason: string;
  substitute: string;
  managerName: string;
  managerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LeaveData = {
  city: 'BANDUNG',
  date: '', // Diisi useEffect
  name: 'ANISA PUTRI',
  empId: 'EMP-99021',
  position: 'Senior Accounting',
  department: 'Finance & Tax',
  startDate: '2026-02-01',
  endDate: '2026-02-03',
  reason: 'Mengambil hak cuti tahunan untuk keperluan acara keluarga di luar kota.',
  substitute: 'RENDI ARISANDI',
  managerName: 'BAMBANG HERMAWAN',
  managerJob: 'HR Manager'
};

// --- 3. KOMPONEN UTAMA ---
export default function IzinCutiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Izin...</div>}>
      <LeaveRequestBuilder />
    </Suspense>
  );
}

function LeaveRequestBuilder() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [leaveType, setLeaveType] = useState<'Tahunan' | 'Hamil' | 'Sakit'>('Tahunan');
  const [data, setData] = useState<LeaveData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- LOGIC ---
  const handleDataChange = (field: keyof LeaveData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  // Logic Ganti Kategori & Auto Text
  const handleCategoryChange = (type: 'Tahunan' | 'Hamil' | 'Sakit') => {
    setLeaveType(type);
    let newReason = '';
    
    if (type === 'Tahunan') {
       newReason = 'Mengambil hak cuti tahunan untuk keperluan acara keluarga / liburan.';
    } else if (type === 'Hamil') {
       newReason = 'Persiapan persalinan dan pemulihan pasca melahirkan sesuai HPL dokter.';
    } else if (type === 'Sakit') {
       newReason = 'Kondisi kesehatan menurun (Demam/Flu) dan disarankan dokter untuk istirahat total.';
    }

    setData(prev => ({ ...prev, reason: newReason }));
  };

  // Hitung Selisih Hari
  const diffDays = useMemo(() => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, [data.startDate, data.endDate]);

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Klasik Korporat
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Minimalis
        </button>
    </div>
  );

  // --- ICON HELPER ---
  const getIcon = () => {
    if (leaveType === 'Hamil') return <Baby size={32} />;
    if (leaveType === 'Sakit') return <Stethoscope size={32} />;
    return <Palmtree size={32} />;
  };

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    // Format Tanggal
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    if (templateId === 1) {
      // === TEMPLATE 1: KLASIK KORPORAT ===
      return (
        <div className="font-serif text-[11pt] text-black leading-relaxed">
           
           <div className="text-right text-[11pt] mb-10">
              <p className="font-bold">{data.city}, {formatDate(data.date)}</p>
           </div>

           <div className="mb-8 space-y-1">
              <p>Hal: <b>Permohonan Izin {leaveType === 'Tahunan' ? 'Cuti Tahunan' : (leaveType === 'Sakit' ? 'Sakit (Medical Leave)' : 'Cuti Melahirkan')}</b></p>
              <div className="pt-4">
                 <p>Kepada Yth,</p>
                 <p className="font-bold uppercase">Bapak/Ibu {data.managerName}</p>
                 <p>{data.managerJob}</p>
                 <p className="font-medium">Di Tempat</p>
              </div>
           </div>

           <div className="space-y-4 flex-grow text-justify">
              <p>Dengan hormat,</p>
              <p>Saya yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-4 space-y-1 bg-slate-50 p-3 border border-slate-200 rounded text-[11pt]">
                 <table className="w-full">
                    <tbody>
                       <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.name}</td></tr>
                       <tr><td className="align-top">Nomor Induk</td><td className="align-top">:</td><td className="align-top">{data.empId}</td></tr>
                       <tr><td className="align-top">Jabatan</td><td className="align-top">:</td><td className="align-top">{data.position}</td></tr>
                       <tr><td className="align-top">Departemen</td><td className="align-top">:</td><td className="align-top">{data.department}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p>
                 Bermaksud mengajukan permohonan <b>{leaveType === 'Sakit' ? 'IZIN SAKIT' : 'CUTI KERJA'}</b> selama <b>{diffDays} hari kerja</b>, terhitung mulai tanggal <b>{formatDate(data.startDate)}</b> sampai dengan <b>{formatDate(data.endDate)}</b>.
              </p>
              
              <div className="bg-slate-50 p-3 border-l-4 border-black italic text-[11pt] text-justify rounded-r">
                 Alasan: "{data.reason}"
              </div>
              
              <p>
                 Selama saya tidak berada di tempat, tanggung jawab pekerjaan sementara akan saya delegasikan kepada rekan kerja saya: <strong>{data.substitute}</strong>.
              </p>
              
              <p>Demikian permohonan ini saya ajukan. Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih.</p>
           </div>

           <div className="shrink-0 mt-12 grid grid-cols-2 gap-10 text-center" style={{ pageBreakInside: 'avoid' }}>
              <div className="space-y-24">
                 <p className="uppercase text-[10pt] font-bold text-slate-500">Menyetujui,</p>
                 <div>
                    <p className="font-bold underline uppercase">{data.managerName}</p>
                    <p className="text-[10pt]">{data.managerJob}</p>
                 </div>
              </div>
              <div className="space-y-24">
                 <p className="uppercase text-[10pt] font-bold text-slate-500">Hormat Saya,</p>
                 <div>
                    <p className="font-bold underline uppercase">{data.name}</p>
                    <p className="text-[10pt]">Pemohon</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // === TEMPLATE 2: MODERN MINIMALIS ===
      return (
        <div className="font-sans text-[10.5pt] text-slate-900 leading-snug h-full flex flex-col pt-6">
           
           {/* HEADER MODERN */}
           <div className="flex justify-between items-center mb-8 border-b-4 border-slate-900 pb-6">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-slate-900 text-white rounded-2xl shadow print:text-black print:bg-transparent print:border-2 print:border-black">
                    {getIcon()}
                 </div>
                 <div>
                    <h1 className="text-2xl font-black tracking-tighter uppercase leading-none italic">Leave Form</h1>
                    <p className="text-[9px] font-black text-blue-600 tracking-[0.3em] uppercase mt-1">ID: {data.empId}</p>
                 </div>
              </div>
              <div className="text-right">
                 <div className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[8pt] font-black mb-1 inline-block border border-amber-200">PENDING APPROVAL</div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase">{data.city}, {formatDate(data.date)}</p>
              </div>
           </div>

           {/* INFO GRID */}
           <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                 <p className="text-[8pt] font-black text-slate-400 uppercase mb-1">Applicant</p>
                 <p className="font-bold text-slate-900 text-sm uppercase">{data.name}</p>
                 <p className="text-[9pt] text-slate-500">{data.position}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                 <p className="text-[8pt] font-black text-slate-400 uppercase mb-1">Duration</p>
                 <p className="font-bold text-slate-900 text-sm">{diffDays} Days</p>
                 <p className="text-[9pt] text-slate-500">{formatDate(data.startDate)} - {formatDate(data.endDate)}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                 <p className="text-[8pt] font-black text-slate-400 uppercase mb-1">Delegated To</p>
                 <p className="font-bold text-slate-900 text-sm uppercase">{data.substitute}</p>
                 <p className="text-[9pt] text-slate-500">Back-up Person</p>
              </div>
           </div>

           <div className="flex-grow space-y-6">
              <div>
                 <h4 className="text-[9pt] font-black uppercase text-slate-300 mb-2 tracking-widest flex items-center gap-2">
                    <FileText size={12}/> Statement of Purpose
                 </h4>
                 <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-sm italic leading-relaxed text-slate-700 text-justify">
                    "Saya mengajukan izin <b>{leaveType}</b> dengan alasan <b>{data.reason}</b>. Saya menyadari kewajiban saya dan telah melakukan koordinasi serah terima tugas dengan tim terkait untuk memastikan produktivitas tetap terjaga selama absennya saya."
                 </div>
              </div>
              <div className="flex items-start gap-2 text-slate-400 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                 <Info size={14} className="shrink-0 mt-0.5" />
                 <p className="text-[9pt] leading-relaxed">Formulir ini sah jika telah ditandatangani oleh atasan langsung dan diserahkan ke HRD.</p>
              </div>
           </div>

           <div className="shrink-0 pt-8 border-t border-slate-100 flex justify-between items-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="space-y-4">
                 <div className="w-40 h-20 border-b-2 border-slate-200"></div>
                 <div>
                    <p className="text-[8pt] font-black uppercase text-slate-300 tracking-widest">Approved By</p>
                    <p className="text-[10pt] font-bold uppercase text-slate-700">{data.managerName}</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none border-b-2 border-blue-600 inline-block pb-1">{data.name}</p>
                 <p className="text-[8pt] font-bold text-blue-600 uppercase tracking-widest mt-1">Applicant Signature</p>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT FIXED */}
      <style jsx global>{`
        @media print {
            @page { size: A4 portrait; margin: 0; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 15mm; display: table-header-group; } 
            .print-table tfoot { height: 15mm; display: table-footer-group; } 
            .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
            tr, .keep-together { page-break-inside: avoid !important; break-inside: avoid; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Surat Cuti <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Klasik Korporat' : 'Modern Minimalis'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               {/* MOBILE MENU TRIGGER */}
               <div className="relative md:hidden">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">
                    Template <ChevronDown size={14}/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Cuti</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               {/* 1. KATEGORI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b pb-1">Jenis Cuti</h3>
                  <div className="grid grid-cols-3 gap-2">
                      {(['Tahunan', 'Hamil', 'Sakit'] as const).map(type => (
                         <button key={type} onClick={() => handleCategoryChange(type)} className={`py-2 text-[10px] font-black rounded-lg border transition-all uppercase tracking-tighter ${leaveType === type ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>
                            {type}
                         </button>
                      ))}
                  </div>
               </div>

               {/* 2. KARYAWAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Data Karyawan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nomor Induk (NIK)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.empId} onChange={e => handleDataChange('empId', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Departemen</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.department} onChange={e => handleDataChange('department', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Jabatan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.position} onChange={e => handleDataChange('position', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. WAKTU */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><CalendarDays size={12}/> Jadwal Cuti</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Mulai Cuti</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Selesai Cuti</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alasan Cuti</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Delegasi Tugas (Backup)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.substitute} onChange={e => handleDataChange('substitute', e.target.value)} /></div>
                  </div>
               </div>

               {/* 4. ATASAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Briefcase size={12}/> Persetujuan Atasan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Manager/HRD</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.managerName} onChange={e => handleDataChange('managerName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Jabatan Manager</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.managerJob} onChange={e => handleDataChange('managerJob', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kota Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
