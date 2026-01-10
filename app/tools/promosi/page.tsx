'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, TrendingUp, Building2, UserCircle2, 
  Award, LayoutTemplate, ChevronDown, ImagePlus, X, PenTool, 
  CheckCircle2, ShieldCheck, Edit3, Eye, Check
} from 'lucide-react';
import Link from 'next/link';

export default function PromosiJabatanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <PromotionBuilder />
    </Suspense>
  );
}

function PromotionBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: '',
    docNo: 'REK-PROM/HRD/2026/005',
    companyName: 'PT. INOVASI TEKNOLOGI NEGERI',
    companyAddress: 'Cyber Tower Lt. 10, Kuningan\nJakarta Selatan, 12950\nTelp: (021) 222-3333',
    employeeName: 'DIAN SASTRAWIDJAYA',
    employeeId: 'EMP-2023-882',
    currentPosition: 'Senior Graphic Designer',
    newPosition: 'Art Director',
    department: 'Creative & Branding',
    refName: 'SETIAWAN BUDI, M.BA.',
    refJob: 'Chief Creative Officer',
    verifierName: 'BAGIAN HRD',
    verifierJob: 'Human Resources Dept.',
    performance: 'Sangat Baik (A)',
    strengths: 'Memiliki kemampuan kepemimpinan yang kuat.',
    achievement: 'Meningkatkan efisiensi alur kerja sebesar 30%.'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Formal Korporat", desc: "Bahasa hukum & lugas" },
    { id: 2, name: "Modern Clean", desc: "Desain minimalis" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      <div className="flex items-start gap-6 border-b-2 border-slate-900 pb-4 mb-6 shrink-0">
        {logo ? (
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain shrink-0" />
        ) : (
          <div className="w-16 h-16 bg-slate-50 rounded flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-300 shrink-0 no-print">
            <Building2 size={28} />
          </div>
        )}
        <div className="flex-grow text-left">
           <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">{data.companyName}</h1>
           <div className="text-[8.5pt] font-sans text-slate-600 whitespace-pre-line leading-tight italic">{data.companyAddress}</div>
        </div>
      </div>

      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT REKOMENDASI PROMOSI</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.docNo}</p>
      </div>

      <div className="space-y-6 flex-grow overflow-hidden text-left">
        <p>Saya yang bertanda tangan di bawah ini:</p>
        <div className="ml-8 space-y-1 text-sm font-sans italic border-l-2 border-slate-200 pl-4">
           <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold">{data.refName}</span></div>
           <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.refJob}</span></div>
        </div>
        <p>Memberikan rekomendasi promosi jabatan kepada:</p>
        <div className="ml-8 space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-sm print:bg-transparent print:border-black">
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Karyawan</span><span>:</span><span className="font-bold uppercase">{data.employeeName}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan Baru</span><span>:</span><span className="font-bold text-blue-700 underline print:text-black">{data.newPosition}</span></div>
        </div>
        <p className="text-justify leading-relaxed">Berdasarkan hasil evaluasi, yang bersangkutan memiliki predikat <b>{data.performance}</b> dengan kontribusi: <i>{data.achievement}</i>.</p>
        <p>Demikian surat ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="grid grid-cols-2 gap-10 text-center">
            <div className="flex flex-col h-32">
               <p className="uppercase text-[8.5pt] font-black text-slate-400 print:text-black">Diverifikasi,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase text-[10pt]">{data.verifierName}</p>
                  <p className="text-[8pt] italic">{data.verifierJob}</p>
               </div>
            </div>
            <div className="flex flex-col h-32">
               <p className="text-[9pt] font-bold mb-1">{data.city}, {data.date}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 print:text-black">Hormat Saya,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase text-[10pt]">{data.refName}</p>
                  <p className="text-[8pt] italic">{data.refJob}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print, header, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Award size={16} /> <span>Recommendation Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 font-sans overflow-hidden">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
        {/* SIDEBAR */}
        <div className={`w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full no-print ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Perusahaan</h3>
              <div className="flex items-center gap-4">
                 {logo ? (
                    <div className="relative w-14 h-14 border rounded overflow-hidden group shrink-0">
                       <img src={logo} className="w-full h-full object-contain" />
                       <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                    </div>
                 ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-14 h-14 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 transition-all shrink-0"><ImagePlus size={20} /></button>
                 )}
                 <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
              </div>
           </div>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><PenTool size={12}/> Tanda Tangan</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.refName} onChange={e => handleDataChange('refName', e.target.value)} placeholder="Nama Atasan (Kanan)" />
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.verifierName} onChange={e => handleDataChange('verifierName', e.target.value)} placeholder="Nama Verifikator (Kiri)" />
           </div>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Karyawan</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.employeeName} onChange={e => handleDataChange('employeeName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.newPosition} onChange={e => handleDataChange('newPosition', e.target.value)} placeholder="Jabatan Baru" />
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV - HIDDEN IN PRINT */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 mobile-nav">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT ONLY ROOT */}
      <div id="print-only-root" className="hidden">
         <DocumentContent />
      </div>
    </div>
  );
}