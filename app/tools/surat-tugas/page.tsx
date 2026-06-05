'use client';

/**
 * FILE: SuratTugasPage.tsx
 * STATUS: PRODUCTION READY (FIXED TS ERROR 2322)
 * DESC: Generator Surat Perintah Tugas (Multi-Personel)
 * FIX: Mengganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build.
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, RotateCcw,
  Trash2, ChevronDown, Eye, Edit3, X, ImagePlus,
  MapPin, Calendar, Building2, UserCircle2, Briefcase, FileText, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface Staff {
  name: string;
  id: string;
  position: string;
}

interface TaskData {
  compName: string;
  compInfo: string;
  city: string;
  date: string;
  no: string;
  taskTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  staffs: Staff[];
  instruction: string;
  signerName: string;
  signerJob: string;
  cc: string;
}

// --- 2. GLOBAL CONSTANTS ---
const TEMPLATES = [
  { id: 1, name: "Format Corporate", desc: "Layout formal dengan tabel" },
  { id: 2, name: "Format Modern", desc: "Desain blok kontemporer" }
];

// --- 3. DATA DEFAULT ---
const INITIAL_DATA: TaskData = {
  compName: 'PT. TEKNOLOGI CIPTA MANDIRI',
  compInfo: 'Gedung Cyber Lt. 12, Jl. Kuningan Barat, Jakarta Selatan\nTelp: 021-555-0123 | Email: hrd@tcm.id',
  city: 'Jakarta',
  date: '', 
  no: '045/HRD-ST/I/2026',
  taskTitle: 'Audit Tahunan Kantor Cabang',
  location: 'Surabaya & Malang',
  startDate: '2026-01-15',
  endDate: '2026-01-18',
  staffs: [
    { name: 'RAHMAT HIDAYAT', id: 'NIK-10293', position: 'Senior Auditor' },
    { name: 'SISKA AMELIA', id: 'NIK-10442', position: 'Staff Keuangan' }
  ],
  instruction: 'Melakukan pemeriksaan laporan keuangan tahunan dan verifikasi aset fisik di kantor cabang. Seluruh biaya perjalanan dinas ditanggung oleh perusahaan.',
  signerName: 'HENDRA WIJAYA, S.E.',
  signerJob: 'Direktur Operasional',
  cc: '1. Arsip HRD\n2. Departemen Keuangan' 
};

export default function SuratTugasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <SuratTugasBuilder />
    </Suspense>
  );
}

function SuratTugasBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<TaskData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof TaskData, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleStaffChange = (idx: number, field: keyof Staff, val: string) => {
    const newStaffs = [...data.staffs];
    newStaffs[idx][field] = val;
    setData({ ...data, staffs: newStaffs });
  };

  const addStaff = () => setData({ ...data, staffs: [...data.staffs, { name: '', id: '', position: '' }] });
  const removeStaff = (idx: number) => {
    const temp = [...data.staffs];
    if(temp.length > 1) {
        temp.splice(idx, 1);
        setData({ ...data, staffs: temp });
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset semua data surat tugas?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
        
        {/* KOP SURAT */}
        <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 text-center font-sans">
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
          <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8 tracking-widest text-slate-900">SURAT PERINTAH TUGAS</h2>
          <p className="text-[10pt] mt-4 font-mono font-bold text-slate-400 print:text-black uppercase tracking-widest">Nomor: {data.no}</p>
        </div>

        {/* BODY SURAT */}
        <div className="space-y-6 overflow-visible text-justify leading-relaxed flex-grow">
          <p>Direksi <strong>{data.compName}</strong> dengan ini memberikan perintah dan penugasan kepada karyawan yang namanya tercantum di bawah ini:</p>
          
          <div className="overflow-hidden border-2 border-slate-900 rounded-xl break-inside-avoid">
            <table className="w-full border-collapse text-[9.5pt]">
                <thead>
                    <tr className="bg-slate-900 text-white font-bold print:bg-transparent print:text-black print:border-b-2 print:border-black">
                        <th className="py-3 w-12 text-center border-r border-slate-700 print:border-black">NO</th>
                        <th className="py-3 text-left px-4 border-r border-slate-700 print:border-black">NAMA LENGKAP / NIK</th>
                        <th className="py-3 text-left px-4">JABATAN</th>
                    </tr>
                </thead>
                <tbody>
                    {data.staffs.map((s, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50 print:bg-transparent border-t border-slate-100 print:border-black'}>
                            <td className="py-3 text-center border-r border-slate-100 print:border-black font-bold">{i + 1}</td>
                            <td className="py-3 px-4 border-r border-slate-100 print:border-black">
                                <div className="font-black uppercase text-slate-900 leading-tight">{s.name || '...'}</div>
                                <div className="text-[8pt] font-mono text-blue-600 print:text-black font-bold tracking-tighter">{s.id || '...'}</div>
                            </td>
                            <td className="py-3 px-4 font-medium uppercase text-[9pt]">{s.position || '...'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          <div className="space-y-4 pt-4 font-sans text-[10pt]">
              <div className="grid grid-cols-[140px_10px_1fr] break-inside-avoid">
                <span className="font-bold uppercase text-[8px] tracking-widest text-slate-400">Maksud Tugas</span>
                <span>:</span>
                <span className="font-black text-slate-900 underline decoration-blue-200 underline-offset-4 uppercase">{data.taskTitle}</span>
              </div>
              <div className="grid grid-cols-[140px_10px_1fr] break-inside-avoid">
                <span className="font-bold uppercase text-[8px] tracking-widest text-slate-400">Lokasi Tujuan</span>
                <span>:</span>
                <span className="font-bold text-slate-700">{data.location}</span>
              </div>
              <div className="grid grid-cols-[140px_10px_1fr] break-inside-avoid">
                <span className="font-bold uppercase text-[8px] tracking-widest text-slate-400">Waktu Pelaksanaan</span>
                <span>:</span>
                <span className="font-black text-emerald-700 print:text-black">
                    {formatDateSafe(data.startDate)} s.d. {formatDateSafe(data.endDate)}
                </span>
              </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-900 italic text-[10pt] leading-relaxed print:bg-transparent print:border-2 print:border-black break-inside-avoid shadow-inner print:shadow-none">
              <p className="font-black not-italic uppercase text-[8px] tracking-[0.3em] mb-2 text-slate-400">Instruksi Khusus:</p>
              "{data.instruction}"
          </div>

          <p>Demikian surat tugas ini diterbitkan untuk dilaksanakan dengan penuh tanggung jawab sesuai dengan kebijakan operasional perusahaan yang berlaku.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-8 pt-8 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex justify-end text-center font-sans">
              <div className="w-80 flex flex-col h-44">
                 <p className="text-[10pt] mb-1 font-bold text-slate-400">{data.city}, {formatDateSafe(data.date)}</p>
                 <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-1">{data.signerJob},</p>
                 <div className="mt-auto">
                    <p className="font-black underline uppercase tracking-tight leading-none text-[11pt] text-slate-900">{data.signerName}</p>
                    <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-tighter italic">Authorized Signature</p>
                 </div>
              </div>
            </div>
            {data.cc && (
               <div className="text-[8.5pt] font-sans text-slate-300 print:text-black border-t border-slate-50 pt-4 mt-6 italic">
                  <p className="font-black uppercase text-[7pt] tracking-widest mb-1 not-italic">Tembusan Yth:</p>
                  <span className="whitespace-pre-line leading-tight">{data.cc}</span>
               </div>
            )}
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* FIX: Ganti styled-jsx ke dangerouslySetInnerHTML */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white !important; margin: 0 !important; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Briefcase size={16} /> <span>Official Task Letter Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-widest border border-slate-700">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden p-1">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative text-left">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Penugasan</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kop Instansi</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} placeholder="Nama Perusahaan" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.compInfo} onChange={e => handleDataChange('compInfo', e.target.value)} placeholder="Alamat & Kontak" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Personel Tugas</h3>
                 {data.staffs.map((s, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 space-y-3 relative group">
                        <button onClick={() => removeStaff(idx)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        <input className="w-full p-2 bg-white border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={s.name} onChange={e => handleStaffChange(idx, 'name', e.target.value)} placeholder="Nama Lengkap" />
                        <div className="grid grid-cols-2 gap-3">
                            <input className="w-full p-2 bg-white border rounded-lg text-[10px] focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={s.id} onChange={e => handleStaffChange(idx, 'id', e.target.value)} placeholder="NIK/ID" />
                            <input className="w-full p-2 bg-white border rounded-lg text-[10px] focus:ring-2 focus:ring-emerald-500 outline-none" value={s.position} onChange={e => handleStaffChange(idx, 'position', e.target.value)} placeholder="Jabatan" />
                        </div>
                    </div>
                 ))}
                 <button onClick={addStaff} className="w-full py-3 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 font-black hover:bg-blue-50 text-[10px] uppercase transition-all tracking-widest">+ Tambah Personel</button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Detail Misi & Administrasi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-black focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.taskTitle} onChange={e => handleDataChange('taskTitle', e.target.value)} placeholder="Maksud Penugasan" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.location} onChange={e => handleDataChange('location', e.target.value)} placeholder="Lokasi Tujuan" />
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Mulai</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Selesai</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.instruction} onChange={e => handleDataChange('instruction', e.target.value)} placeholder="Instruksi Operasional Khusus..." />
                 <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Penyetuju" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No. Surat" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-slate-500 outline-none" value={data.cc} onChange={e => handleDataChange('cc', e.target.value)} placeholder="Tembusan (CC)..." />
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
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
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