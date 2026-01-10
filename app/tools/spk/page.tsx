'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  ShieldCheck, FileText, ChevronDown, Check, Edit3, Eye, ImagePlus, X, Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function SPKPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor SPK...</div>}>
      <SPKBuilder />
    </Suspense>
  );
}

function SPKBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    compName: 'PT. TEKNOLOGI CIPTA MANDIRI',
    compAddress: 'Jl. Merdeka No. 123, Jakarta Selatan\nTelp: (021) 888-9999 | Email: office@tcm.co.id',
    city: 'Jakarta',
    date: '',
    no: '001/SPK/I/2026',
    clientName: 'Ahmad Subarjo',
    clientAddress: 'Perumahan Indah Permai Bekasi',
    projectName: 'Pembuatan Website E-Commerce',
    contractValue: '15.000.000',
    duration: '30 Hari Kalender',
    scope: '1. Desain UI/UX Responsive\n2. Pengembangan Frontend & Backend\n3. Integrasi Payment Gateway\n4. Hosting & Domain Setup',
    signerName: 'Bambang Hartanto',
    signerJob: 'Direktur Utama',
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
    { id: 1, name: "Format Klasik", desc: "Kop tengah dengan garis ganda" },
    { id: 2, name: "Format Modern", desc: "Layout bersih, rata kiri" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* HEADER KOP */}
      <div className={`flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 ${templateId === 1 ? 'flex-row text-center' : 'flex-row-reverse text-left'}`}>
        {logo ? (
          <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
        ) : (
          <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0 print:border print:border-black">
            <Briefcase size={32} />
          </div>
        )}
        <div className="flex-grow">
          <h1 className="text-xl font-black uppercase tracking-tight leading-none mb-2">{data.compName}</h1>
          <p className="text-[9pt] font-sans whitespace-pre-line text-slate-500 print:text-black italic leading-tight">{data.compAddress}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PERINTAH KERJA (SPK)</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.no}</p>
      </div>

      {/* BODY SURAT */}
      <div className="space-y-6 flex-grow overflow-hidden text-left">
        <p>Pada hari ini, bertanda tangan di bawah ini kami memberikan tugas instruksi kerja kepada:</p>
        
        <div className="ml-8 space-y-1 font-sans italic border-l-4 border-emerald-100 pl-4 print:border-slate-300">
          <div className="grid grid-cols-[140px_10px_1fr]"><span>Penerima Tugas</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.clientName}</span></div>
          <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.clientAddress}</span></div>
        </div>

        <p>Untuk segera melaksanakan pekerjaan dengan ketentuan sebagai berikut:</p>

        <table className="w-full border-collapse border border-slate-900 font-sans text-[10pt]">
          <tbody>
            <tr>
              <td className="border border-slate-900 p-3 font-bold bg-slate-50 w-[30%] uppercase tracking-tighter">Nama Proyek</td>
              <td className="border border-slate-900 p-3">{data.projectName}</td>
            </tr>
            <tr>
              <td className="border border-slate-900 p-3 font-bold bg-slate-50 uppercase tracking-tighter">Nilai Kontrak</td>
              <td className="border border-slate-900 p-3 font-bold text-emerald-700 print:text-black italic underline decoration-double">Rp {data.contractValue}</td>
            </tr>
            <tr>
              <td className="border border-slate-900 p-3 font-bold bg-slate-50 uppercase tracking-tighter">Waktu Pengerjaan</td>
              <td className="border border-slate-900 p-3">{data.duration}</td>
            </tr>
          </tbody>
        </table>

        <div className="space-y-2">
          <p className="font-bold underline uppercase text-[9pt] tracking-widest">Lingkup Pekerjaan:</p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 whitespace-pre-line italic leading-relaxed text-[10pt] print:bg-transparent print:border-black">
            {data.scope}
          </div>
        </div>

        <p className="text-justify leading-relaxed">Demikian Surat Perintah Kerja ini dibuat untuk dilaksanakan dengan penuh tanggung jawab sesuai dengan standar kualitas yang telah disepakati.</p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
        <div className="grid grid-cols-2 gap-10 text-center">
          <div className="flex flex-col h-40">
            <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Penerima Tugas,</p>
            <div className="mt-auto">
              <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.clientName}</p>
              <p className="text-[8pt] mt-1 italic opacity-50 print:opacity-100">Kontraktor / Vendor</p>
            </div>
          </div>

          <div className="flex flex-col h-40">
            <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
            <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Pemberi Tugas,</p>
            <div className="mt-auto">
              <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.signerName}</p>
              <p className="text-[9pt] font-sans mt-1">{data.signerJob}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print, .mobile-nav { display: none !important; }
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <FileText size={16} /> <span>Work Order Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative font-sans">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print SPK</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Briefcase size={12}/> Kop Perusahaan</h3>
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
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50 leading-tight" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.compAddress} onChange={e => handleDataChange('compAddress', e.target.value)} placeholder="Alamat & Kontak" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Edit3 size={12}/> Rincian Proyek</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.projectName} onChange={e => handleDataChange('projectName', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs font-bold text-emerald-600" value={data.contractValue} onChange={e => handleDataChange('contractValue', e.target.value)} placeholder="Nilai Kontrak" />
                 <input className="w-full p-2 border rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} placeholder="Waktu" />
              </div>
              <input className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="Nomor SPK" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><ShieldCheck size={12}/> Penandatangan</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} placeholder="Penerima Tugas" />
              <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.scope} onChange={e => handleDataChange('scope', e.target.value)} placeholder="Lingkup Pekerjaan" />
              <div className="grid grid-cols-2 gap-2 border-t pt-4">
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Pemberi" />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12 shadow-2xl">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV (SERAGAM) */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 mobile-nav">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}