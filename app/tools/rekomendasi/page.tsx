'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  UserPlus, Building2, Star, ChevronDown, Check, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function RekomendasiKerjaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Rekomendasi...</div>}>
      <RekomendasiToolBuilder />
    </Suspense>
  );
}

function RekomendasiToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `SRK/HRD/I/2026/089`,
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    
    // PERUSAHAAN
    compName: 'PT. KREATIF DIGITAL SOLUSINDO',
    compAddr: 'Gedung Wisma Mulia Lt. 25, Kav. 42\nJl. Gatot Subroto, Jakarta Selatan',
    
    // PENANDA TANGAN
    signerName: 'Bambang Sudjatmiko, S.Kom',
    signerJob: 'Chief Technology Officer',

    // KARYAWAN
    empName: 'Arief Kurniawan',
    empPosition: 'Senior Frontend Developer',
    
    // ISI REKOMENDASI
    strengths: 'kemampuan problem solving yang luar biasa, kepemimpinan tim yang solid, serta penguasaan teknologi React dan Next.js yang sangat mendalam',
    achievement: 'berhasil memimpin migrasi infrastruktur website perusahaan yang meningkatkan kecepatan load hingga 40%',
    attitude: 'Sangat disiplin, memiliki integritas tinggi, dan mampu bekerja di bawah tekanan dengan hasil yang memuaskan',
    
    closing: 'Saya merekomendasikan Saudara Arief Kurniawan tanpa keraguan kepada perusahaan manapun yang membutuhkan tenaga profesional handal. Kami mendoakan yang terbaik bagi karir beliau di masa depan.'
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleDataChange = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  const TEMPLATES = [
    { id: 1, name: "Formal Executive", desc: "Format profesional dengan kop surat tengah" },
    { id: 2, name: "Modern Testimonial", desc: "Layout bersih dengan aksen modern" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (STABIL) ---
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
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white text-sm">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; overflow: visible !important; }
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
              <Star size={16} /> Rekomendasi Kerja
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
             <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2 border-b pb-2"><Building2 size={14}/> Kop Perusahaan</h3>
             <div className="flex items-center gap-4">
                <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden">
                   {logo ? <img src={logo} className="w-full h-full object-contain" alt="logo" /> : <Upload size={20} className="text-slate-300" />}
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </div>
                <input type="text" className="flex-1 p-2 border rounded text-xs font-bold" placeholder="Nama PT" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
             </div>
             <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" placeholder="Alamat & Kontak" value={data.compAddr} onChange={e => handleDataChange('compAddr', e.target.value)} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
             <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2 border-b pb-2"><UserPlus size={14}/> Detail Karyawan</h3>
             <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><label className="text-[10px] font-bold text-slate-400 uppercase">Nama Karyawan</label><input type="text" className="w-full p-2 border rounded text-xs font-bold" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} /></div>
                <div className="col-span-2"><label className="text-[10px] font-bold text-slate-400 uppercase">Jabatan Terakhir</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} /></div>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans text-xs">
             <h3 className="text-[10px] font-bold text-slate-700 uppercase flex items-center gap-2 border-b pb-2"><Star size={14}/> Testimoni Performa</h3>
             <div><label className="text-[9px] font-bold text-slate-400 uppercase">Keahlian Utama (Skill)</label><textarea className="w-full p-2 border rounded text-[11px] h-20" value={data.strengths} onChange={e => handleDataChange('strengths', e.target.value)} /></div>
             <div><label className="text-[9px] font-bold text-slate-400 uppercase">Prestasi Menonjol</label><textarea className="w-full p-2 border rounded text-[11px] h-20" value={data.achievement} onChange={e => handleDataChange('achievement', e.target.value)} /></div>
             <div><label className="text-[9px] font-bold text-slate-400 uppercase">Sikap & Integritas</label><textarea className="w-full p-2 border rounded text-[11px] h-16" value={data.attitude} onChange={e => handleDataChange('attitude', e.target.value)} /></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
             <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2 border-b pb-2"><FileText size={14}/> Penutup & Legalitas</h3>
             <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Nama Pemberi Rekomendasi</label><input type="text" className="w-full p-2 border rounded text-xs font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Jabatan</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Nomor Surat</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Tanggal</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
             </div>
          </div>

        </div>

        {/* PREVIEW AREA */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
          <Kertas>
            {templateId === 1 ? (
              /* TEMPLATE 1: FORMAL EXECUTIVE */
              <div className="flex flex-col h-full font-serif text-[11.5pt] leading-normal text-justify">
                <div className="flex items-center justify-center gap-6 border-b-[3px] border-double border-slate-900 pb-4 mb-8 shrink-0">
                  {logo && <img src={logo} className="h-16 w-auto object-contain" alt="logo" />}
                  <div className="text-center flex-1">
                    <h1 className="text-xl font-black uppercase text-slate-900 leading-none mb-2">{data.compName}</h1>
                    <div className="text-[9pt] font-sans whitespace-pre-line text-slate-600 leading-tight">{data.compAddr}</div>
                  </div>
                </div>

                <div className="text-center mb-8 shrink-0">
                  <h2 className="text-lg font-bold uppercase underline tracking-widest decoration-1">SURAT REKOMENDASI KERJA</h2>
                  <div className="text-sm font-sans italic">Nomor: {data.no}</div>
                </div>

                <div className="flex-grow">
                  <p className="mb-6">Saya yang bertanda tangan di bawah ini:</p>
                  
                  <div className="ml-8 mb-6 space-y-1">
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold">{data.signerName}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.signerJob}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Instansi</span><span>:</span><span>{data.compName}</span></div>
                  </div>

                  <p className="mb-6 leading-relaxed">Dengan ini memberikan rekomendasi kerja kepada:</p>

                  <div className="ml-8 mb-8 space-y-1">
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase tracking-wide">{data.empName}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan Terakhir</span><span>:</span><span>{data.empPosition}</span></div>
                  </div>

                  <div className="space-y-4">
                    <p>Berdasarkan pengamatan saya selama bekerja bersama, Saudara {data.empName} telah menunjukkan kontribusi yang sangat baik, di antaranya adalah {data.strengths}.</p>
                    <p>Selain itu, yang bersangkutan memiliki catatan prestasi yang patut diapresiasi, di mana beliau {data.achievement}. Dari sisi kepribadian, Saudara {data.empName} dikenal sebagai individu yang {data.attitude}.</p>
                    <p>{data.closing}</p>
                  </div>
                </div>

                <div className="shrink-0 mt-12 pb-4">
                  <div className="flex justify-end text-center">
                    <div className="w-64">
                        <p className="mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                        <p className="mb-16 font-bold uppercase">Hormat saya,</p>
                        <p className="font-bold underline uppercase leading-none">{data.signerName}</p>
                        <p className="text-sm font-sans mt-1">{data.signerJob}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TEMPLATE 2: MODERN TESTIMONIAL */
              <div className="flex flex-col h-full font-sans text-[10pt] leading-relaxed">
                <div className="flex justify-between items-start mb-12 border-b border-slate-200 pb-6 shrink-0">
                  <div className="flex items-center gap-4">
                    {logo ? <img src={logo} className="h-10 w-auto" alt="logo" /> : <div className="p-2 bg-emerald-600 rounded text-white font-black">LD</div>}
                    <div>
                      <h1 className="text-lg font-black text-slate-900 uppercase tracking-tighter">{data.compName}</h1>
                      <div className="text-[8pt] text-emerald-600 font-bold uppercase tracking-widest">HR Department</div>
                    </div>
                  </div>
                  <div className="text-right text-[8pt] text-slate-400 max-w-[200px] whitespace-pre-line leading-tight">{data.compAddr}</div>
                </div>

                <div className="flex-grow">
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Letter of Recommendation</h2>
                    <p className="text-slate-400 font-mono text-xs">Ref ID: {data.no}</p>
                  </div>

                  <p className="mb-8 text-slate-600 italic leading-relaxed text-lg">
                    "I am writing this letter to highly recommend <span className="text-slate-900 font-bold not-italic underline decoration-emerald-500 underline-offset-4">{data.empName}</span> for any future professional endeavors."
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="text-[8pt] font-black text-emerald-600 uppercase tracking-widest mb-2">Core Strengths</h4>
                      <p className="text-slate-700 leading-relaxed">{data.strengths}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="text-[8pt] font-black text-emerald-600 uppercase tracking-widest mb-2">Key Achievement</h4>
                      <p className="text-slate-700 leading-relaxed">{data.achievement}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="text-[8pt] font-black text-emerald-600 uppercase tracking-widest mb-2">Soft Skills</h4>
                      <p className="text-slate-700 leading-relaxed">{data.attitude}</p>
                    </div>
                  </div>

                  <p className="text-slate-700 mb-8">{data.closing}</p>
                </div>

                <div className="mt-auto pt-10 flex justify-between items-end border-t border-slate-100 pb-4">
                  <div className="text-[7.5pt] text-slate-400 italic max-w-[280px]">
                    This recommendation is provided based on genuine performance evaluation during tenure at {data.compName}.
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-12">{data.city}, {new Date(data.date).toLocaleDateString('id-ID')}</p>
                    <p className="font-black text-slate-900 text-lg leading-none uppercase">{data.signerName}</p>
                    <p className="text-[8pt] text-emerald-600 font-bold uppercase tracking-widest mt-1">{data.signerJob}</p>
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