'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, UserCircle2, X, PenTool, 
  ShieldCheck, FileWarning, MapPin, GraduationCap, Ban,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function TidakStudiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <NoStudyBuilder />
    </Suspense>
  );
}

function NoStudyBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '',
    name: 'BAGUS RAMADHAN',
    nik: '5171010101990001',
    placeBirth: 'Denpasar',
    dateBirth: '1999-12-25',
    address: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
    purpose: 'Melamar Pekerjaan di PT. Teknologi Indonesia Makmur',
    statementBody: 'Menyatakan dengan sebenarnya bahwa pada saat ini saya TIDAK SEDANG MENEMPUH PENDIDIKAN FORMAL (sekolah/kuliah) di instansi manapun baik negeri maupun swasta.',
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Format Standar", desc: "Layout formal surat pernyataan" },
    { id: 2, name: "Format Ringkas", desc: "Desain minimalis & padat" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* JUDUL */}
      <div className="text-center mb-12 shrink-0 leading-tight">
        <h1 className="text-xl font-black underline uppercase decoration-1 underline-offset-8 tracking-widest">SURAT PERNYATAAN</h1>
        <p className="text-[10pt] font-sans mt-4 italic uppercase tracking-[0.2em] text-slate-500 print:text-black">Tidak Sedang Menempuh Pendidikan</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow space-y-8 overflow-hidden text-left">
        <p>Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 space-y-1.5 font-sans border-l-4 border-slate-100 pl-6 italic print:border-slate-300">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.name}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {isClient && data.dateBirth ? new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Sesuai KTP</span><span>:</span><span>{data.address}</span></div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 print:bg-transparent print:border-black">
          <p className="text-justify leading-relaxed indent-8 font-medium italic text-[11.5pt]">
            "{data.statementBody}"
          </p>
        </div>

        <p className="leading-relaxed">
          Surat pernyataan ini saya buat dengan penuh kesadaran tanpa paksaan dari pihak manapun, sebagai salah satu syarat untuk: <br/><b className="text-blue-800 print:text-black">{data.purpose}</b>.
        </p>

        <p className="text-justify leading-relaxed">
          Demikian pernyataan ini saya buat dengan sebenar-benarnya. Apabila di kemudian hari ditemukan bahwa data atau pernyataan ini tidak benar, maka saya bersedia menerima sanksi sesuai dengan ketentuan hukum yang berlaku.
        </p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
        <div className="flex justify-end text-center">
          <div className="w-72 flex flex-col h-40">
            <p className="text-[10pt] mb-1 font-bold">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
            <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Yang Membuat Pernyataan,</p>
            <div className="mt-auto flex flex-col items-center">
               <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-300 italic mb-2 print:border-black print:text-black uppercase">Materai 10.000</div>
               <p className="font-bold underline uppercase text-base tracking-tight leading-none">{data.name}</p>
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
          .no-print, header, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV (SERAGAM) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-tighter italic">
               <Ban size={16} /> <span>No-Study Statement Builder</span>
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
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all font-sans">
              <Printer size={16} /> <span className="hidden md:inline">Print Surat</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Identitas Diri</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50 leading-tight" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} placeholder="Tempat Lahir" />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Lengkap" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileWarning size={12}/> Pernyataan</h3>
              <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed italic" value={data.statementBody} onChange={e => handleDataChange('statementBody', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Surat" />
              <div className="grid grid-cols-2 gap-2 border-t pt-4">
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
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
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}