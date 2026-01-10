'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Building2, Calendar, PenTool, HeartHandshake, Briefcase, ChevronDown, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function ResignPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Surat...</div>}>
      <ResignToolBuilder />
    </Suspense>
  );
}

function ResignToolBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    signDate: '',
    lastDate: '', 
    empName: 'Ahmad Fauzi',
    empPosition: 'Senior Marketing Executive',
    empDept: 'Divisi Pemasaran',
    managerName: 'Bapak Budi Santoso',
    managerTitle: 'HRD Manager',
    companyName: 'PT. MAJU MUNDUR SEJAHTERA',
    companyAddress: 'Gedung Cyber, Jl. Rasuna Said, Jakarta',
    opening: 'Melalui surat ini, saya bermaksud untuk menyampaikan permohonan pengunduran diri saya dari jabatan Senior Marketing Executive di PT. Maju Mundur Sejahtera.',
    reason: 'Keputusan ini saya ambil setelah pertimbangan matang untuk melanjutkan pengembangan karir saya di tempat yang baru. Saya ingin mengucapkan terima kasih yang sebesar-besarnya atas kesempatan dan kepercayaan yang telah diberikan selama saya bekerja di sini.',
    handover: 'Saya akan tetap melaksanakan tugas dan tanggung jawab saya hingga hari terakhir bekerja. Saya juga berkomitmen untuk membantu proses transisi dan serah terima pekerjaan kepada rekan yang menggantikan agar operasional tetap berjalan lancar.',
    closing: 'Saya memohon maaf jika ada kesalahan yang pernah saya perbuat selama bekerja. Semoga PT. Maju Mundur Sejahtera semakin sukses dan berkembang di masa depan.'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const oneMonth = new Date(new Date().setDate(today.getDate() + 30));
    setData(prev => ({ 
        ...prev, 
        signDate: today.toISOString().split('T')[0],
        lastDate: oneMonth.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const applyReason = (type: 'standard' | 'career' | 'personal') => {
    if (type === 'standard') {
      setData(prev => ({
        ...prev,
        opening: `Melalui surat ini, saya bermaksud menyampaikan pengunduran diri saya sebagai ${prev.empPosition} di ${prev.companyName}.`,
        reason: `Saya mengucapkan terima kasih yang tulus atas kesempatan kerja yang telah diberikan kepada saya selama ini. Saya telah belajar banyak hal dan bangga bisa menjadi bagian dari perusahaan ini.`,
        handover: `Sesuai ketentuan One Month Notice, saya akan tetap bekerja secara profesional hingga tanggal efektif pengunduran diri saya.`
      }));
    } else if (type === 'career') {
      setData(prev => ({
        ...prev,
        opening: `Dengan hormat, bersama surat ini saya mengajukan pengunduran diri dari posisi ${prev.empPosition} di ${prev.companyName}.`,
        reason: `Keputusan berat ini saya ambil karena saya telah menerima penawaran kesempatan karir baru yang sejalan dengan rencana pengembangan profesional saya kedepan. Terima kasih atas bimbingan Bapak/Ibu selama ini yang sangat berharga bagi karir saya.`,
        handover: `Saya berkomitmen penuh untuk menyelesaikan seluruh tanggungan pekerjaan dan membantu proses handover kepada pengganti saya sebelum hari terakhir saya bekerja.`
      }));
    } else if (type === 'personal') {
      setData(prev => ({
        ...prev,
        opening: `Saya yang bertanda tangan di bawah ini, ${prev.empName}, bermaksud mengajukan pengunduran diri dari ${prev.companyName}.`,
        reason: `Adapun alasan pengunduran diri ini dikarenakan adanya urusan pribadi/keluarga yang mengharuskan saya untuk tidak lagi dapat bekerja secara penuh waktu. Saya sangat berterima kasih atas pengertian dan dukungan perusahaan selama ini.`,
        handover: `Saya akan memastikan seluruh tugas saya diserahterimakan dengan baik agar tidak mengganggu kinerja tim yang saya tinggalkan.`
      }));
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Formal Standard", desc: "Format baku korporat" },
    { id: 2, name: "Modern Direct", desc: "Layout bersih & personal" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* TANGGAL & PERIHAL */}
      <div className="text-right mb-8 shrink-0">
        <p>{data.city}, {isClient && data.signDate ? new Date(data.signDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</p>
      </div>

      <div className="mb-8 shrink-0 text-left">
        <p>Perihal: <b>Pengunduran Diri</b></p>
        <div className="mt-4 leading-relaxed">
          Kepada Yth,<br/>
          <b>{data.managerName}</b><br/>
          {data.managerTitle} {data.companyName}<br/>
          <span className="text-sm italic text-slate-500 print:text-black">{data.companyAddress}</span>
        </div>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow space-y-5 text-justify overflow-hidden leading-relaxed">
        <p>Dengan hormat,</p>
        <p className="whitespace-pre-line">{data.opening}</p>
        
        <div className="bg-slate-50 p-4 border-l-4 border-slate-300 italic font-medium print:bg-transparent print:border-black">
          "Terhitung sejak tanggal <b>{isClient && data.lastDate ? new Date(data.lastDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</b>, saya sudah tidak lagi menjadi bagian dari perusahaan."
        </div>

        <p className="whitespace-pre-line">{data.reason}</p>
        <p className="whitespace-pre-line">{data.handover}</p>
        <p className="whitespace-pre-line">{data.closing}</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
        <div className="flex justify-end text-center">
          <div className="w-64">
            <p className="mb-20 font-bold uppercase text-[9pt] text-slate-400 print:text-black tracking-widest">Hormat Saya,</p>
            <p className="font-bold underline uppercase text-base tracking-tight leading-none">{data.empName}</p>
            <p className="text-[9pt] text-slate-500 mt-1 uppercase print:text-black">{data.empPosition}</p>
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

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <HeartHandshake size={16} /> <span>Resignation Builder</span>
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
           <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3">
              <h3 className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-2"><Check size={12}/> Pilih Alasan (Quick Fill)</h3>
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={() => applyReason('standard')} className="bg-white p-2 rounded border border-emerald-200 text-[8px] font-bold hover:bg-emerald-100">STANDAR</button>
                 <button onClick={() => applyReason('career')} className="bg-white p-2 rounded border border-blue-200 text-[8px] font-bold hover:bg-blue-100">KARIR</button>
                 <button onClick={() => applyReason('personal')} className="bg-white p-2 rounded border border-amber-200 text-[8px] font-bold hover:bg-amber-100">PRIBADI</button>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Identitas Anda</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} placeholder="Jabatan" />
              <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Calendar size={12}/> Tanggal Efektif</h3>
              <div className="space-y-1">
                 <label className="text-[9px] font-bold text-slate-400">HARI TERAKHIR KERJA</label>
                 <input type="date" className="w-full p-2 border rounded text-xs font-black" value={data.lastDate} onChange={e => handleDataChange('lastDate', e.target.value)} />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><PenTool size={12}/> Isi Konten</h3>
              <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Alasan Resign" />
              <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} placeholder="Penutup" />
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