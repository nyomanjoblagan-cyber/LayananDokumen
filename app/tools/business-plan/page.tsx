'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Lightbulb, Building2, TrendingUp, 
  X, PenTool, PieChart, Users, Banknote, Rocket, Target, BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function BusinessPlanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Business Plan Builder...</div>}>
      <PlanBuilder />
    </Suspense>
  );
}

function PlanBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    
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

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const PlanContent = () => (
    <div className="bg-white mx-auto box-border p-[25mm] print:p-[15mm] text-slate-900 font-sans shadow-sm print:shadow-none min-h-[297mm]" 
         style={{ width: '210mm' }}>
      
      {/* HEADER - MODERN BUSINESS STYLE */}
      <div className="flex flex-col items-center mb-12 shrink-0 border-b-8 border-blue-900 pb-8">
        <div className="bg-blue-900 text-white p-4 rounded-2xl mb-4">
           <Rocket size={40} />
        </div>
        <h1 className="text-[24pt] font-black uppercase tracking-tighter leading-none text-blue-900">{data.companyName}</h1>
        <p className="text-[11pt] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2 italic">{data.tagline}</p>
      </div>

      {/* SECTION 1: EXECUTIVE SUMMARY */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="space-y-4">
            <h2 className="text-[12pt] font-black uppercase text-blue-900 border-l-4 border-blue-900 pl-3 flex items-center gap-2">
                <Target size={18} /> Problem
            </h2>
            <p className="text-[10pt] leading-relaxed text-slate-700">{data.problem}</p>
        </div>
        <div className="space-y-4">
            <h2 className="text-[12pt] font-black uppercase text-blue-900 border-l-4 border-blue-900 pl-3 flex items-center gap-2">
                <Lightbulb size={18} /> Solution
            </h2>
            <p className="text-[10pt] leading-relaxed text-slate-700">{data.solution}</p>
        </div>
      </div>

      {/* SECTION 2: MARKET & REVENUE */}
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-10">
        <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
                <h2 className="text-[11pt] font-black uppercase text-slate-900 flex items-center gap-2">
                    <Users size={18} className="text-blue-600" /> Target Market
                </h2>
                <p className="text-[9.5pt] leading-relaxed italic">{data.targetMarket}</p>
                <div className="pt-2 border-t border-slate-200">
                    <p className="text-[8pt] font-bold uppercase text-slate-400">Market Size:</p>
                    <p className="text-[10pt] font-bold text-blue-800">{data.marketSize}</p>
                </div>
            </div>
            <div className="space-y-4">
                <h2 className="text-[11pt] font-black uppercase text-slate-900 flex items-center gap-2">
                    <BarChart3 size={18} className="text-blue-600" /> Revenue Stream
                </h2>
                <p className="text-[9.5pt] leading-relaxed">{data.revenueStream}</p>
                <div className="pt-2 border-t border-slate-200">
                    <p className="text-[8pt] font-bold uppercase text-slate-400">Funding Needed:</p>
                    <p className="text-[12pt] font-black text-emerald-700">{data.fundingNeed}</p>
                </div>
            </div>
        </div>
      </div>

      {/* SECTION 3: KEY TEAM */}
      <div className="mb-12">
        <h2 className="text-[12pt] font-black uppercase text-blue-900 mb-4 flex items-center gap-2">
            <PieChart size={18} /> Operational Team
        </h2>
        <p className="text-[10pt] leading-relaxed text-slate-700 p-4 border rounded-xl bg-white shadow-sm italic">
            {data.team}
        </p>
      </div>

      {/* FOOTER / SIGNATURE */}
      <div className="mt-auto pt-10 border-t border-slate-100 flex justify-between items-end">
        <div className="text-[8pt] text-slate-400 font-mono">
           Document ID: BP-{data.companyName.substring(0,3)}-2026
        </div>
        <div className="text-center">
            <p className="text-[10pt] mb-20">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
            <p className="font-black underline uppercase text-[11pt] text-blue-900">{data.owner}</p>
            <p className="text-[8pt] font-bold uppercase text-slate-400 tracking-widest mt-1">Founder / CEO</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; overflow: visible !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2 italic">
               <TrendingUp size={18} /> Business <span className="text-white not-italic opacity-40 font-normal italic">Plan Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Export to PDF
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Company Info</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs italic" value={data.tagline} onChange={e => handleDataChange('tagline', e.target.value)} />
             </div>
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Lightbulb size={12}/> The Concept</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed" value={data.problem} onChange={e => handleDataChange('problem', e.target.value)} placeholder="Problem..." />
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none leading-relaxed" value={data.solution} onChange={e => handleDataChange('solution', e.target.value)} placeholder="Solution..." />
             </div>
             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Banknote size={12}/> Money & Scale</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none" value={data.revenueStream} onChange={e => handleDataChange('revenueStream', e.target.value)} placeholder="How you make money?" />
                <input className="w-full p-3 border rounded-xl text-xs font-black text-emerald-700" value={data.fundingNeed} onChange={e => handleDataChange('fundingNeed', e.target.value)} placeholder="Funding Needed" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-95 transition-transform shadow-2xl">
                <PlanContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <PlanContent />
      </div>
    </div>
  );
}