'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Lightbulb, Building2, TrendingUp, 
  X, PenTool, PieChart, Users, Banknote, Rocket, Target, BarChart3,
  LayoutTemplate, ChevronDown, Check, ArrowLeftCircle, Edit3, Eye, FileText
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function BusinessPlanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Business Plan Builder...</div>}>
      <PlanBuilder />
    </Suspense>
  );
}

function PlanBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: new Date().toISOString().split('T')[0],
    
    // INFO BISNIS
    companyName: 'BALI TECH LOGISTICS (BTL)',
    tagline: 'Smart Solutions for Island Distribution',
    owner: 'BAGUS RAMADHAN',
    industry: 'Logistik & Teknologi (SaaS)',

    // EXECUTIVE SUMMARY
    problem: 'Mahalnya biaya distribusi antar wilayah di Bali akibat sistem logistik tradisional yang tidak terintegrasi.',
    solution: 'Platform agregator logistik berbasis AI yang mengoptimalkan rute dan muatan kendaraan secara real-time.',
    
    // MARKET ANALYSIS
    targetMarket: 'UMKM Lokal Bali, Distributor Ritel, dan Sektor Pariwisata.',
    marketSize: 'Estimasi 50.000 UMKM di Bali dengan kebutuhan logistik harian.',
    competitors: 'Jasa logistik konvensional dan kurir instan yang belum memiliki optimasi rute cerdas.',

    // REVENUE MODEL
    revenueStream: 'Komisi 10% per transaksi dan Paket Langganan Premium (SaaS) untuk korporasi.',
    fundingNeed: 'Rp 500.000.000,- (Untuk Pengembangan App & Marketing)',

    // TIM KUNCI
    team: 'CEO (Bagus Ramadhan), CTO (Expert Software Engineer), Head of Operations (Logistics Specialist).'
  });

  // HANDLERS
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: MODERN CANVAS (One Page) ---
      return (
        <div className="font-sans text-slate-900 leading-normal h-full flex flex-col">
           {/* HEADER */}
           <div className="flex flex-col items-center mb-8 shrink-0 border-b-4 border-blue-900 pb-6">
              <div className="bg-blue-900 text-white p-3 rounded-2xl mb-3 print:bg-transparent print:text-blue-900 print:border print:border-blue-900">
                 <Rocket size={32} />
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tighter leading-none text-blue-900 text-center">{data.companyName}</h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mt-2 italic text-center">{data.tagline}</p>
           </div>

           <div className="flex-grow space-y-6">
              {/* ROW 1: PROBLEM & SOLUTION */}
              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h2 className="text-xs font-black uppercase text-blue-900 flex items-center gap-2 mb-2"><Target size={14} /> The Problem</h2>
                    <p className="text-[9pt] leading-relaxed text-slate-700 text-justify">{data.problem}</p>
                 </div>
                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h2 className="text-xs font-black uppercase text-blue-900 flex items-center gap-2 mb-2"><Lightbulb size={14} /> Our Solution</h2>
                    <p className="text-[9pt] leading-relaxed text-blue-900 text-justify">{data.solution}</p>
                 </div>
              </div>

              {/* ROW 2: MARKET & REVENUE */}
              <div className="grid grid-cols-3 gap-6">
                 <div className="col-span-2 space-y-4">
                    <div>
                       <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-1 mb-2 flex items-center gap-2"><Users size={14} className="text-blue-600"/> Target Market</h2>
                       <p className="text-[9pt] leading-relaxed italic">{data.targetMarket}</p>
                       <p className="text-[8pt] font-bold text-blue-800 mt-1">Size: {data.marketSize}</p>
                    </div>
                    <div>
                       <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-1 mb-2 flex items-center gap-2"><BarChart3 size={14} className="text-emerald-600"/> Business Model</h2>
                       <p className="text-[9pt] leading-relaxed">{data.revenueStream}</p>
                    </div>
                 </div>
                 
                 <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex flex-col justify-center text-center">
                    <h2 className="text-[9px] font-bold uppercase text-emerald-800 mb-2">Funding Needed</h2>
                    <p className="text-xl font-black text-emerald-600 leading-tight">{data.fundingNeed}</p>
                 </div>
              </div>

              {/* ROW 3: TEAM */}
              <div>
                 <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-1 mb-2 flex items-center gap-2"><PieChart size={14} className="text-amber-600"/> Operational Team</h2>
                 <p className="text-[9pt] leading-relaxed text-slate-700 bg-white border border-slate-100 p-3 rounded-lg shadow-sm italic">{data.team}</p>
              </div>
           </div>

           {/* FOOTER */}
           <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-[8pt] text-slate-400 font-mono">
                 ID: BP-{data.companyName.substring(0,3).toUpperCase()}-2026
              </div>
              <div className="text-center">
                 <p className="text-[9pt] mb-12">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                 <p className="font-black underline uppercase text-[10pt] text-blue-900">{data.owner}</p>
                 <p className="text-[8pt] font-bold uppercase text-slate-400 tracking-widest mt-1">Founder / CEO</p>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: TEXT DOCUMENT (Formal Proposal) ---
      return (
        <div className="font-serif text-[11pt] leading-relaxed text-slate-900">
           <div className="text-center mb-10 border-b-2 border-black pb-4">
              <h1 className="text-2xl font-bold uppercase tracking-wide">PROPOSAL RENCANA BISNIS</h1>
              <h2 className="text-lg font-bold uppercase mt-2">{data.companyName}</h2>
           </div>

           <div className="space-y-6 text-justify">
              <div>
                 <h3 className="font-bold uppercase text-sm border-b border-slate-400 pb-1 mb-2">1. Ringkasan Eksekutif</h3>
                 <p className="mb-2"><strong>Masalah:</strong> {data.problem}</p>
                 <p><strong>Solusi:</strong> {data.solution}</p>
              </div>

              <div>
                 <h3 className="font-bold uppercase text-sm border-b border-slate-400 pb-1 mb-2">2. Analisis Pasar</h3>
                 <p className="mb-2">Target pasar kami adalah {data.targetMarket}</p>
                 <p>Potensi pasar saat ini diperkirakan mencapai {data.marketSize}. Pesaing utama dalam industri ini meliputi {data.competitors}.</p>
              </div>

              <div>
                 <h3 className="font-bold uppercase text-sm border-b border-slate-400 pb-1 mb-2">3. Model Pendapatan & Keuangan</h3>
                 <p className="mb-2">Pendapatan utama perusahaan berasal dari {data.revenueStream}.</p>
                 <p>Untuk mencapai target pertumbuhan tahap awal, kami membutuhkan pendanaan sebesar <strong>{data.fundingNeed}</strong>.</p>
              </div>

              <div>
                 <h3 className="font-bold uppercase text-sm border-b border-slate-400 pb-1 mb-2">4. Manajemen Tim</h3>
                 <p>Perusahaan dijalankan oleh tim profesional yang terdiri dari: {data.team}.</p>
              </div>
           </div>

           <div className="mt-12 flex justify-end text-center" style={{ pageBreakInside: 'avoid' }}>
              <div>
                 <p className="mb-20">Hormat Kami,</p>
                 <p className="font-bold underline uppercase">{data.owner}</p>
                 <p className="text-sm">Direktur Utama</p>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* --- JURUS TABLE WRAPPER (Print Fix) --- */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; display: block !important; }
          #print-only-root { display: block !important; width: 100%; height: auto; position: absolute; top: 0; left: 0; z-index: 9999; background: white; }
          
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 20mm; } 
          .print-table tfoot { height: 20mm; } 
          .print-content-wrapper { padding: 0 20mm; }
          
          tr, .keep-together { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Business Plan <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Canvas (Modern)' : 'Proposal (Formal)'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Canvas (Modern)</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Proposal (Formal)</button>
                     </div>
                  )}
               </div>
               <div className="relative md:hidden"><button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">Tampilan <ChevronDown size={14}/></button></div>
               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               {/* INFO BISNIS */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Info Perusahaan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Bisnis</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tagline / Slogan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs italic" value={data.tagline} onChange={e => handleDataChange('tagline', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pemilik (CEO)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.owner} onChange={e => handleDataChange('owner', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Industri</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.industry} onChange={e => handleDataChange('industry', e.target.value)} /></div>
                     </div>
                  </div>
               </div>

               {/* KONSEP */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Lightbulb size={12}/> Konsep Bisnis</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Masalah (Problem)</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.problem} onChange={e => handleDataChange('problem', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Solusi (Solution)</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.solution} onChange={e => handleDataChange('solution', e.target.value)} /></div>
                  </div>
               </div>

               {/* PASAR & UANG */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><TrendingUp size={12}/> Pasar & Finansial</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Target Pasar</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.targetMarket} onChange={e => handleDataChange('targetMarket', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Ukuran Pasar (Market Size)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.marketSize} onChange={e => handleDataChange('marketSize', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Sumber Pendapatan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.revenueStream} onChange={e => handleDataChange('revenueStream', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kebutuhan Dana</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-emerald-600" value={data.fundingNeed} onChange={e => handleDataChange('fundingNeed', e.target.value)} /></div>
                  </div>
               </div>

               {/* TIM */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Users size={12}/> Tim & Lokasi</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tim Inti</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.team} onChange={e => handleDataChange('team', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kota</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                     </div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL (FIX: TABLE WRAPPER) --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}