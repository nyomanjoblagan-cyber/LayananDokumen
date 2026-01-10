'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Award, FileText, Mail, Phone,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function RekomendasiDosenPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <RecommendationBuilder />
    </Suspense>
  );
}

function RecommendationBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '',
    docNo: 'REF/088/UNUD/FT/I/2026',
    lecturerName: 'DR. I MADE WIRA, S.T., M.T.',
    lecturerNip: '19800101 200501 1 003',
    lecturerPosition: 'Ketua Program Studi Teknologi Informasi',
    lecturerEmail: 'madewira@unud.ac.id',
    university: 'UNIVERSITAS UDAYANA (UNUD)',
    studentName: 'BAGUS RAMADHAN',
    studentId: '2208561001',
    studentGpa: '3.85 / 4.00',
    purpose: 'Pendaftaran Beasiswa LPDP Tahap I 2026',
    relationship: 'Dosen Pembimbing Akademik dan Dosen Pengampu Mata Kuliah Pemrograman Web.',
    strengths: 'Memiliki kemampuan analisis yang tajam, sangat mahir dalam pengembangan perangkat lunak, serta memiliki etos kerja dan kedisiplinan yang luar biasa tinggi.',
    closingStatement: 'Saya memberikan rekomendasi tertinggi bagi yang bersangkutan tanpa ragu sedikitpun.'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Formal Akademik", desc: "Format standar Kemenristek" },
    { id: 2, name: "Modern Reference", desc: "Layout bersih & kontemporer" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* KOP UNIVERSITAS */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-6 text-center shrink-0">
        <h2 className="text-[11pt] font-black uppercase leading-tight tracking-tighter italic">KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</h2>
        <h1 className="text-[14pt] font-black uppercase leading-tight mt-1">{data.university}</h1>
        <p className="text-[9pt] font-sans mt-1 italic uppercase tracking-widest text-slate-500 print:text-black">Fakultas Teknik - Program Studi Teknologi Informasi</p>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT REKOMENDASI AKADEMIK</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="space-y-6 flex-grow overflow-hidden text-left">
        <p>Saya yang bertanda tangan di bawah ini:</p>
        <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.lecturerName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIP/NIDN</span><span>:</span><span>{data.lecturerNip}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.lecturerPosition}</span></div>
        </div>

        <p>Memberikan rekomendasi kepada mahasiswa di bawah ini:</p>
        <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.studentName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIM</span><span>:</span><span>{data.studentId}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Indeks Prestasi</span><span>:</span><span className="font-bold">{data.studentGpa}</span></div>
        </div>

        <p className="text-justify leading-relaxed">
            Saya telah mengenal yang bersangkutan selama masa studinya sebagai <b>{data.relationship}</b>. Selama interaksi kami, saya mengamati bahwa Saudara/i {data.studentName.split(' ')[0]} {data.strengths}
        </p>

        <p className="text-justify leading-relaxed font-medium">
            Berdasarkan performa akademik dan karakter yang ditunjukkan, saya yakin bahwa yang bersangkutan akan sukses dan memberikan kontribusi positif dalam <b>{data.purpose}</b>. {data.closingStatement}
        </p>
        
        <p>Demikian surat rekomendasi ini kami buat agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="flex justify-end text-center">
            <div className="w-72 flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Pemberi Rekomendasi,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.lecturerName}</p>
                  <p className="text-[9pt] font-sans mt-1">NIP. {data.lecturerNip}</p>
                  <p className="text-[8pt] font-sans text-slate-500 lowercase italic">{data.lecturerEmail}</p>
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
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <GraduationCap size={16} /> <span>Academic Referee Builder</span>
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
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Info Dosen</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.lecturerName} onChange={e => handleDataChange('lecturerName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.lecturerNip} onChange={e => handleDataChange('lecturerNip', e.target.value)} placeholder="NIP/NIDN" />
              <input className="w-full p-2 border rounded text-xs" value={data.lecturerEmail} onChange={e => handleDataChange('lecturerEmail', e.target.value)} placeholder="Email Resmi" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Mahasiswa</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM" />
                 <input className="w-full p-2 border rounded text-xs" value={data.studentGpa} onChange={e => handleDataChange('studentGpa', e.target.value)} placeholder="IPK" />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Award size={12}/> Poin Rekomendasi</h3>
              <input className="w-full p-2 border rounded text-xs" value={data.relationship} onChange={e => handleDataChange('relationship', e.target.value)} placeholder="Hubungan Akademik" />
              <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.strengths} onChange={e => handleDataChange('strengths', e.target.value)} placeholder="Kelebihan/Analisis Karakter" />
              <input className="w-full p-2 border rounded text-xs" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Rekomendasi" />
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV (SERAGAM) */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 mobile-nav">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}