'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, 
  User, Building2, FileText, ChevronDown, Check, LayoutTemplate
} from 'lucide-react';
import Link from 'next/link';

export default function PaktaIntegritasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Pakta...</div>}>
      <PaktaToolBuilder />
    </Suspense>
  );
}

function PaktaToolBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    name: 'Rahmat Hidayat, S.T.',
    nik: '3171020304900002',
    position: 'Manajer Operasional',
    institution: 'PT. TEKNOLOGI CIPTA MANDIRI',
    address: 'Jl. Gatot Subroto No. 123, Jakarta Selatan',
    points: [
      "Tidak akan melakukan praktik Korupsi, Kolusi, dan Nepotisme (KKN).",
      "Akan melaporkan kepada pihak yang berwenang apabila mengetahui adanya indikasi KKN di lingkungan kerja.",
      "Akan melaksanakan tugas dan wewenang dengan penuh tanggung jawab, jujur, serta berdedikasi tinggi.",
      "Menghindari pertentangan kepentingan (conflict of interest) dalam pelaksanaan tugas.",
      "Akan memberi contoh dalam kepatuhan terhadap peraturan perundang-undangan dalam melaksanakan tugas.",
      "Apabila saya melanggar hal-hal tersebut di atas, saya bersiap menghadapi konsekuensi hukum, moral, dan administratif."
    ],
  });

  const handleDataChange = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  const TEMPLATES = [
    { id: 1, name: "Format Klasik (Instansi)", desc: "Standar baku instansi pemerintah/BUMN" },
    { id: 2, name: "Format Modern (Corporate)", desc: "Tampilan bersih untuk perusahaan swasta" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] mx-auto text-[#1e293b] font-serif leading-relaxed text-[11pt] relative box-border mb-12 flex flex-col
      print:w-[210mm] print:h-auto print:min-h-0 print:shadow-none print:m-0 print:p-[20mm] print:static print:block
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; overflow: visible !important; height: auto !important; }
          header, nav, aside, button, .no-print { display: none !important; }
          #main-content { padding: 0 !important; margin: 0 !important; display: block !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} /> Pakta Integritas
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 overflow-hidden text-slate-700 font-sans">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 border-b last:border-0 transition-colors">
                      <div className="font-bold">{t.name}</div>
                      <div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg">
              <Printer size={16} /> Cetak
            </button>
          </div>
        </div>
      </div>

      <div id="main-content" className="max-w-[1600px] mx-auto p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* SIDEBAR INPUT */}
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
             <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2 border-b pb-2"><User size={14}/> Penanda Tangan</h3>
             <div><label className="text-[10px] font-bold text-slate-400 uppercase">Nama Lengkap</label><input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
             <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">NIK</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Jabatan</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.position} onChange={e => handleDataChange('position', e.target.value)} /></div>
             </div>
             <div><label className="text-[10px] font-bold text-slate-400 uppercase">Instansi</label><input type="text" className="w-full p-2 border rounded text-sm font-bold" value={data.institution} onChange={e => handleDataChange('institution', e.target.value)} /></div>
             <div><label className="text-[10px] font-bold text-slate-400 uppercase">Alamat</label><textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
             <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2 border-b pb-2"><FileText size={14}/> Lokasi & Tanggal</h3>
             <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Kota</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Tanggal</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
             </div>
          </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
          <Kertas>
            {templateId === 1 ? (
              /* TEMPLATE 1: KLASIK */
              <div className="flex flex-col h-full font-serif text-[12pt] leading-normal text-justify">
                <div className="text-center mb-8 shrink-0">
                   <h1 className="font-black text-xl uppercase tracking-widest underline decoration-2 underline-offset-4">PAKTA INTEGRITAS</h1>
                </div>

                <div className="shrink-0">
                  <p className="mb-6">Saya yang bertanda tangan di bawah ini:</p>
                  <div className="ml-8 mb-8 space-y-2">
                    <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.position}</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Instansi</span><span>:</span><span>{data.institution}</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                  </div>
                  <p className="mb-4">Menyatakan dengan sebenarnya bahwa saya:</p>
                </div>

                <div className="ml-4 mb-6 space-y-3 flex-grow">
                   {data.points.map((point, idx) => (
                     <div key={idx} className="flex gap-3">
                        <span className="shrink-0">{idx + 1}.</span>
                        <span>{point}</span>
                     </div>
                   ))}
                </div>

                <div className="shrink-0 mt-6 pb-6">
                  <p className="mb-8">Demikian pernyataan ini saya buat dengan sebenar-benarnya dan penuh rasa tanggung jawab.</p>
                  <div className="flex justify-end text-center">
                    <div className="w-64">
                        <p className="mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                        <p className="mb-4 font-bold uppercase">Pembuat Pernyataan,</p>
                        
                        {/* MATERAI DIPERKECIL UNTUK RUANG AMAN */}
                        <div className="h-16 flex items-center justify-center border border-dashed border-slate-300 text-[9px] text-slate-400 mb-2 bg-slate-50/50">
                          MATERAI 10.000
                        </div>
                        
                        <p className="font-bold underline uppercase">{data.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TEMPLATE 2: MODERN */
              <div className="flex flex-col h-full font-sans text-[10.5pt] leading-relaxed">
                <div className="flex justify-between items-start mb-12 border-b-2 border-slate-900 pb-4 shrink-0">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 rounded text-white"><ShieldCheck size={24}/></div>
                      <h1 className="text-2xl font-black uppercase tracking-tighter">Integrity Pact</h1>
                   </div>
                   <div className="text-right">
                      <div className="font-bold text-slate-900 uppercase">{data.institution}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Standard Document</div>
                   </div>
                </div>

                <div className="grid grid-cols-[140px_1fr] gap-x-6 gap-y-4 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100 shrink-0">
                   <div className="text-slate-400 font-bold uppercase text-[9px] tracking-widest pt-1">Information</div>
                   <div className="space-y-1">
                      <h2 className="text-xl font-black text-slate-900 uppercase leading-none">{data.name}</h2>
                      <p className="text-emerald-600 font-bold text-sm uppercase">{data.position}</p>
                      <p className="text-slate-500 text-xs">{data.nik} — {data.address}</p>
                   </div>
                </div>

                <h3 className="font-black text-slate-900 uppercase text-sm mb-6 flex items-center gap-2 shrink-0">
                   <div className="w-6 h-1 bg-emerald-500"></div> SAKSI DAN PERNYATAAN
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12 flex-grow">
                   {data.points.map((point, idx) => (
                     <div key={idx} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                           {idx + 1}
                        </div>
                        <p className="text-slate-600 text-sm italic">"{point}"</p>
                     </div>
                   ))}
                </div>

                <div className="mt-auto pt-10 flex justify-between items-end border-t border-slate-100 pb-6 shrink-0">
                   <div className="text-[8pt] text-slate-400 italic max-w-[280px]">
                      This document serves as a binding commitment to professional ethics and corporate governance.
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-12">{data.city}, {new Date(data.date).toLocaleDateString('id-ID')}</p>
                      <p className="font-black text-slate-900 text-lg leading-none uppercase">{data.name}</p>
                      <div className="w-full h-0.5 bg-slate-900 mt-1"></div>
                   </div>
                </div>
              </div>
            )}
          </Kertas>
        </div>
      </div>
    </div>
  );
}