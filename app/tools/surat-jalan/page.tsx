'use client';

/**
 * FILE: SuratTugasPage.tsx
 * STATUS: FINAL & FIXED (Build Error TEMPLATES Resolved)
 * DESC: Generator Surat Perintah Tugas (Multi-Personel)
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, RotateCcw,
  Trash2, ChevronDown, Eye, Edit3, X, ImagePlus,
  MapPin, Calendar, Building2, UserCircle2, Briefcase, FileText
} from 'lucide-react';
import Link from 'next/link';

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

// --- 2. TEMPLATE DEFINITIONS (Ditaruh di luar agar bisa diakses global oleh semua komponen) ---
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
  location: 'Cabang Surabaya & Malang',
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Surat Tugas...</div>}>
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
    temp.splice(idx, 1);
    setData({ ...data, staffs: temp });
  };

  const handleReset = () => {
    if(confirm('Reset semua data surat tugas?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
      
      {/* KOP SURAT */}
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
      <div className="text-center mb-6 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest print:text-black">SURAT PERINTAH TUGAS</h2>
        <p className="text-[9pt] font-sans mt-1 font-bold print:text-black">Nomor: {data.no}</p>
      </div>

      {/* BODY SURAT */}
      <div className="space-y-4 overflow-visible text-left">
        <p>Direksi <b>{data.compName}</b> dengan ini memberikan perintah penugasan kepada karyawan berikut:</p>
        
        <table className="w-full border-collapse border border-slate-900 text-[9.5pt]">
            <thead>
                <tr className="bg-slate-50 text-center font-bold print:bg-transparent">
                    <th className="border border-slate-900 py-2 w-10 text-center">No</th>
                    <th className="border border-slate-900 py-2 text-left px-3">Nama Lengkap / NIK</th>
                    <th className="border border-slate-900 py-2 text-left px-3">Jabatan</th>
                </tr>
            </thead>
            <tbody>
                {data.staffs.map((s, i) => (
                    <tr key={i}>
                        <td className="border border-slate-900 py-2 text-center">{i + 1}</td>
                        <td className="border border-slate-900 py-2 px-3">
                            <div className="font-bold uppercase leading-tight">{s.name || '...'}</div>
                            <div className="text-[8pt] font-mono text-slate-500 print:text-black">{s.id || '...'}</div>
                        </td>
                        <td className="border border-slate-900 py-2 px-3">{s.position || '...'}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="space-y-2 pt-2 text-[10pt]">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Maksud Tugas</span><span>:</span><span className="font-bold underline italic">{data.taskTitle}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Lokasi Tugas</span><span>:</span><span className="font-bold">{data.location}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Waktu Pelaksanaan</span><span>:</span><span className="font-bold uppercase text-[9pt]">
                {isClient && data.startDate ? new Date(data.startDate).toLocaleDateString('id-ID', {dateStyle:'medium'}) : ''} s.d. {isClient && data.endDate ? new Date(data.endDate).toLocaleDateString('id-ID', {dateStyle:'medium'}) : ''}
            </span></div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 italic text-[9.5pt] leading-relaxed print:bg-transparent print:border-black">
            <b>Instruksi Khusus:</b><br/>
            "{data.instruction}"
        </div>

        <p className="text-justify leading-relaxed">Demikian surat tugas ini diterbitkan untuk dilaksanakan dengan penuh tanggung jawab dan dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* FOOTER & TANDA TANGAN */}
      <div className="mt-auto pt-6 border-t border-slate-100 print:border-black">
         <div className="flex justify-end text-center">
            <div className="w-80 flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">{data.signerJob},</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.signerName}</p>
               </div>
            </div>
         </div>
         {data.cc && (
             <div className="text-[8.5pt] font-sans text-slate-500 print:text-black border-t pt-2 mt-4 italic">
                <b>Tembusan Yth:</b><br/>
                <span className="whitespace-pre-line leading-tight">{data.cc}</span>
             </div>
         )}
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0 text-left">
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Briefcase size={16} /> <span>Official Task Letter Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative font-sans text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans p-1">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print Letter</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 uppercase text-xs tracking-widest flex items-center gap-2"><Edit3 size={16}/> Editor Surat Tugas</h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar text-left font-sans">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi / Kop</h3>
                 <div className="flex items-center gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus</button>}
                 </div>
                 <input className="flex-1 w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.compInfo} onChange={e => handleDataChange('compInfo', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Personel Tugas</h3>
                 {data.staffs.map((s, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border space-y-2 relative group">
                        <button onClick={() => removeStaff(idx)} className="absolute top-2 right-2 text-red-400"><Trash2 size={14}/></button>
                        <input className="w-full p-1.5 bg-white border rounded text-xs font-bold uppercase" value={s.name} onChange={e => handleStaffChange(idx, 'name', e.target.value)} placeholder="Nama Lengkap" />
                        <div className="grid grid-cols-2 gap-2">
                            <input className="w-full p-1.5 bg-white border rounded text-[10px]" value={s.id} onChange={e => handleStaffChange(idx, 'id', e.target.value)} placeholder="NIK/ID" />
                            <input className="w-full p-1.5 bg-white border rounded text-[10px]" value={s.position} onChange={e => handleStaffChange(idx, 'position', e.target.value)} placeholder="Jabatan" />
                        </div>
                    </div>
                 ))}
                 <button onClick={addStaff} className="w-full py-2 border-2 border-dashed rounded-lg text-blue-600 font-bold hover:bg-blue-50 text-[10px] uppercase">+ Tambah Personel</button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 pb-10 text-xs">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Detail Misi</h3>
                 <input className="w-full p-2 border rounded font-bold" value={data.taskTitle} onChange={e => handleDataChange('taskTitle', e.target.value)} placeholder="Judul Tugas" />
                 <input className="w-full p-2 border rounded" value={data.location} onChange={e => handleDataChange('location', e.target.value)} placeholder="Lokasi Tugas" />
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase">Mulai</label><input type="date" className="w-full p-2 border rounded" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase">Selesai</label><input type="date" className="w-full p-2 border rounded" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                 </div>
                 <textarea className="w-full p-2 border rounded h-20 resize-none leading-relaxed" value={data.instruction} onChange={e => handleDataChange('instruction', e.target.value)} placeholder="Instruksi Khusus" />
                 <div className="grid grid-cols-2 gap-2 border-t pt-4">
                    <input className="w-full p-2 border rounded font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Pejabat" />
                    <input className="w-full p-2 border rounded" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan" />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <DocumentContent />
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden"><DocumentContent /></div>
    </div>
  );
}
