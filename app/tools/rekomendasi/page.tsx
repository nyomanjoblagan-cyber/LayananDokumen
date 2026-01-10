'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  UserPlus, Building2, Star, ChevronDown, Check, FileText, Edit3, Eye, ImagePlus, X
} from 'lucide-react';
import Link from 'next/link';

export default function RekomendasiKerjaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <RekomendasiToolBuilder />
    </Suspense>
  );
}

function RekomendasiToolBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `SRK/HRD/I/2026/089`,
    city: 'Jakarta',
    date: '',
    compName: 'PT. KREATIF DIGITAL SOLUSINDO',
    compAddr: 'Gedung Wisma Mulia Lt. 25, Kav. 42\nJl. Gatot Subroto, Jakarta Selatan',
    signerName: 'Bambang Sudjatmiko, S.Kom',
    signerJob: 'Chief Technology Officer',
    empName: 'Arief Kurniawan',
    empPosition: 'Senior Frontend Developer',
    strengths: 'kemampuan problem solving yang luar biasa, kepemimpinan tim yang solid, serta penguasaan teknologi React dan Next.js yang sangat mendalam',
    achievement: 'berhasil memimpin migrasi infrastruktur website perusahaan yang meningkatkan kecepatan load hingga 40%',
    attitude: 'Sangat disiplin, memiliki integritas tinggi, dan mampu bekerja di bawah tekanan dengan hasil yang memuaskan',
    closing: 'Saya merekomendasikan Saudara Arief Kurniawan tanpa keraguan kepada perusahaan manapun yang membutuhkan tenaga profesional handal. Kami mendoakan yang terbaik bagi karir beliau di masa depan.'
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
    { id: 1, name: "Formal Executive", desc: "Format profesional (Kop Tengah)" },
    { id: 2, name: "Modern Letter", desc: "Layout bersih (Aksen Emerald)" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI DOKUMEN (STRICT 1 PAGE) ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11.5pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: FORMAL */
        <>
          <div className="flex items-center justify-center gap-6 border-b-[3px] border-double border-slate-900 pb-4 mb-8 shrink-0">
            {logo && <img src={logo} className="h-16 w-auto object-contain shrink-0" alt="logo" />}
            <div className="text-center flex-1">
              <h1 className="text-xl font-black uppercase text-slate-900 leading-none mb-2">{data.compName}</h1>
              <div className="text-[9pt] font-sans whitespace-pre-line text-slate-600 leading-tight italic">{data.compAddr}</div>
            </div>
          </div>

          <div className="text-center mb-8 shrink-0 leading-tight">
            <h2 className="text-lg font-bold uppercase underline tracking-widest">SURAT REKOMENDASI KERJA</h2>
            <p className="text-[10pt] font-sans mt-1 italic uppercase tracking-widest text-slate-500">Nomor: {data.no}</p>
          </div>

          <div className="flex-grow space-y-6 text-justify overflow-hidden">
            <p>Saya yang bertanda tangan di bawah ini:</p>
            <div className="ml-8 space-y-1 font-sans text-sm border-l-2 border-slate-100 pl-4">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold">{data.signerName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.signerJob}</span></div>
            </div>

            <p>Dengan ini memberikan rekomendasi penuh kepada:</p>
            <div className="ml-8 space-y-1 font-sans text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 print:bg-transparent">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Karyawan</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.empName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan Terakhir</span><span>:</span><span>{data.empPosition}</span></div>
            </div>

            <div className="space-y-4 leading-relaxed">
              <p>Selama bekerja di <b>{data.compName}</b>, Saudara {data.empName} telah menunjukkan {data.strengths}.</p>
              <p>Beliau juga memiliki catatan prestasi yang luar biasa, di mana beliau {data.achievement}. Secara personal, beliau adalah individu yang {data.attitude}.</p>
              <p>{data.closing}</p>
            </div>
          </div>
        </>
      ) : (
        /* TEMPLATE 2: MODERN */
        <>
          <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-6 shrink-0">
            <div className="flex items-center gap-4">
              {logo ? <img src={logo} className="h-10 w-auto" alt="logo" /> : <div className="p-2 bg-emerald-600 rounded text-white font-black">LD</div>}
              <div>
                <h1 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">{data.compName}</h1>
                <div className="text-[8pt] text-emerald-600 font-bold uppercase tracking-widest">Employee Recommendation</div>
              </div>
            </div>
            <div className="text-right text-[8pt] text-slate-400 max-w-[200px] whitespace-pre-line leading-tight">{data.compAddr}</div>
          </div>

          <div className="flex-grow space-y-10">
            <div className="mb-4">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Recommendation</h2>
              <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Ref: {data.no}</p>
            </div>

            <p className="text-slate-600 italic leading-relaxed text-lg border-l-4 border-emerald-500 pl-6">
              "I highly recommend <span className="text-slate-900 font-bold not-italic underline decoration-emerald-500 underline-offset-4 uppercase">{data.empName}</span> for any future professional endeavors based on their exceptional performance."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              <div className="bg-slate-50 p-4 rounded-2xl print:bg-transparent print:border">
                <h4 className="text-[8pt] font-black text-emerald-600 uppercase tracking-widest mb-2">Core Strengths</h4>
                <p className="text-[9pt] text-slate-700 leading-relaxed">{data.strengths}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl print:bg-transparent print:border">
                <h4 className="text-[8pt] font-black text-emerald-600 uppercase tracking-widest mb-2">Key Achievement</h4>
                <p className="text-[9pt] text-slate-700 leading-relaxed">{data.achievement}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl print:bg-transparent print:border">
                <h4 className="text-[8pt] font-black text-emerald-600 uppercase tracking-widest mb-2">Attitude</h4>
                <p className="text-[9pt] text-slate-700 leading-relaxed">{data.attitude}</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">{data.closing}</p>
          </div>
        </>
      )}

      {/* FOOTER SIGNATURE (NORMAL FLOW) */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
        <div className="flex justify-end text-center">
          <div className="w-64">
            <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</p>
            <p className="mb-20 font-bold uppercase text-[9pt] text-slate-400 print:text-black">Best Regards,</p>
            <p className="font-bold underline uppercase text-base tracking-tight leading-none">{data.signerName}</p>
            <p className="text-sm font-sans mt-1 text-slate-500 uppercase tracking-tighter print:text-black">{data.signerJob}</p>
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
               <ArrowLeft size={18} /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Star size={16} /> <span>Recommendation Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 font-sans overflow-hidden">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Surat</div>
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
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
              <div className="flex items-center gap-4">
                 <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 bg-slate-50 border-2 border-dashed rounded cursor-pointer flex items-center justify-center relative shrink-0">
                    {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                 </div>
                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.compAddr} onChange={e => handleDataChange('compAddr', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserPlus size={12}/> Detail Karyawan</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} placeholder="Jabatan Terakhir" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Star size={12}/> Poin Rekomendasi</h3>
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.strengths} onChange={e => handleDataChange('strengths', e.target.value)} placeholder="Keahlian Utama" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.achievement} onChange={e => handleDataChange('achievement', e.target.value)} placeholder="Prestasi" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Legalitas</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Penanda Tangan" />
              <input className="w-full p-2 border rounded text-xs" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No Surat" />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (RE-FIXED FOR MOBILE) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV */}
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