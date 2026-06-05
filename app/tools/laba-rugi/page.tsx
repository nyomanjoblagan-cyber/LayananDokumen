'use client';

/**
 * FILE: LabaRugiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Laporan Laba Rugi UMKM
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useMemo, useEffect } from 'react';
import { 
  Printer, ArrowLeft, TrendingUp, TrendingDown, 
  Plus, Trash2, PieChart, Landmark, CalendarDays, Wallet, Edit3, Eye, LayoutTemplate, Check, ChevronDown, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface FinancialItem {
  desc: string;
  amount: number;
}

interface ReportData {
  businessName: string;
  ownerName: string;
  period: string;
  city: string;
  date: string;
  revenues: FinancialItem[];
  expenses: FinancialItem[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ReportData = {
  businessName: 'TOKO BERKAH UMKM',
  ownerName: 'BUDI SANTOSO',
  period: 'Januari 2026',
  city: 'JAKARTA',
  date: '', 
  
  revenues: [
    { desc: 'Penjualan Produk Utama', amount: 25000000 },
    { desc: 'Pendapatan Jasa Layanan', amount: 5000000 }
  ],
  
  expenses: [
    { desc: 'Harga Pokok Penjualan (HPP)', amount: 15000000 },
    { desc: 'Gaji Karyawan', amount: 3000000 },
    { desc: 'Sewa Tempat & Listrik', amount: 1500000 },
    { desc: 'Biaya Pemasaran', amount: 500000 }
  ]
};

export default function LabaRugiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Laporan Keuangan...</div>}>
      <ProfitLossBuilder />
    </Suspense>
  );
}

function ProfitLossBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ReportData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ReportData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const totals = useMemo(() => {
    const totalRevenue = data.revenues.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const totalExpense = data.expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const netProfit = totalRevenue - totalExpense;
    return { totalRevenue, totalExpense, netProfit };
  }, [data]);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const addItem = (type: 'revenues' | 'expenses') => {
    setData({ ...data, [type]: [...data[type], { desc: '', amount: 0 }] });
  };

  const removeItem = (type: 'revenues' | 'expenses', idx: number) => {
    const newList = [...data[type]];
    newList.splice(idx, 1);
    setData({ ...data, [type]: newList });
  };

  const updateItem = (type: 'revenues' | 'expenses', idx: number, field: keyof FinancialItem, val: any) => {
    const newList = [...data[type]];
    // @ts-ignore
    newList[idx][field] = val;
    setData({ ...data, [type]: newList });
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Standar' : 'Format Detail';

  const ReportContent = () => (
    <div className="bg-white flex flex-col box-border font-sans text-[10.5pt] leading-normal text-slate-900 w-[210mm] min-h-[296mm] p-[20mm] print:p-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      {/* HEADER */}
      <div className="text-center border-b-2 border-slate-900 pb-4 mb-8 shrink-0">
        <h1 className="text-xl font-black uppercase tracking-widest">{data.businessName}</h1>
        <h2 className="text-lg font-bold text-slate-600 uppercase">LAPORAN LABA RUGI</h2>
        <p className="text-sm font-medium tracking-tighter">Periode: {data.period}</p>
      </div>

      <div className="flex-grow">
        {/* TEMPLATE 1: LIST */}
        {templateId === 1 && (
          <div className="space-y-8">
            <section className="break-inside-avoid">
              <div className="bg-slate-900 text-white px-4 py-2 flex justify-between items-center mb-2 print:bg-black">
                <h3 className="text-xs font-black uppercase tracking-widest">A. Pendapatan (Revenue)</h3>
              </div>
              <div className="space-y-1">
                  {data.revenues.map((item, idx) => (
                    <div key={idx} className="flex justify-between px-4 py-1 border-b border-slate-100 italic">
                       <span>{item.desc || 'Tanpa Keterangan'}</span>
                       <span>{formatRupiah(item.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between px-4 py-2 font-black bg-slate-50 border-t border-slate-900 mt-2 print:bg-transparent print:border-black">
                    <span>TOTAL PENDAPATAN</span>
                    <span className="text-blue-700 print:text-black">{formatRupiah(totals.totalRevenue)}</span>
                  </div>
              </div>
            </section>

            <section className="break-inside-avoid">
              <div className="bg-slate-900 text-white px-4 py-2 flex justify-between items-center mb-2 print:bg-black">
                <h3 className="text-xs font-black uppercase tracking-widest">B. Beban Operasional</h3>
              </div>
              <div className="space-y-1">
                  {data.expenses.map((item, idx) => (
                    <div key={idx} className="flex justify-between px-4 py-1 border-b border-slate-100 italic">
                       <span>{item.desc || 'Tanpa Keterangan'}</span>
                       <span>({formatRupiah(item.amount)})</span>
                    </div>
                  ))}
                  <div className="flex justify-between px-4 py-2 font-black bg-slate-50 border-t border-slate-900 mt-2 print:bg-transparent print:border-black">
                    <span>TOTAL BEBAN</span>
                    <span className="text-red-600 print:text-black">({formatRupiah(totals.totalExpense)})</span>
                  </div>
              </div>
            </section>

            <section className={`p-6 rounded-xl border-4 break-inside-avoid ${totals.netProfit >= 0 ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-500'} print:bg-transparent print:border-black`}>
               <div className="flex justify-between items-center">
                  <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 print:text-black">Laba / (Rugi) Bersih</h4>
                      <p className="text-2xl font-black tracking-tighter uppercase">{totals.netProfit >= 0 ? 'Surplus Bersih' : 'Defisit Bersih'}</p>
                  </div>
                  <p className={`text-2xl font-black ${totals.netProfit >= 0 ? 'text-emerald-700' : 'text-red-700'} print:text-black`}>{formatRupiah(totals.netProfit)}</p>
               </div>
            </section>
          </div>
        )}

        {/* TEMPLATE 2: TABEL */}
        {templateId === 2 && (
          <div className="break-inside-avoid">
             <table className="w-full border-collapse border border-black text-sm mb-8">
                <thead>
                   <tr className="bg-slate-200">
                      <th className="border border-black p-2 text-left w-2/3">KETERANGAN</th>
                      <th className="border border-black p-2 text-right">JUMLAH (IDR)</th>
                   </tr>
                </thead>
                <tbody>
                   <tr><td colSpan={2} className="border border-black p-2 font-bold bg-slate-50">I. PENDAPATAN</td></tr>
                   {data.revenues.map((item, idx) => (
                      <tr key={`rev-${idx}`}><td className="border-x border-black p-2 pl-6">{item.desc}</td><td className="border-x border-black p-2 text-right">{formatRupiah(item.amount)}</td></tr>
                   ))}
                   <tr><td className="border border-black p-2 font-bold text-right">Total Pendapatan</td><td className="border border-black p-2 text-right font-bold">{formatRupiah(totals.totalRevenue)}</td></tr>
                   <tr><td colSpan={2} className="border border-black p-2 font-bold bg-slate-50">II. BEBAN OPERASIONAL</td></tr>
                   {data.expenses.map((item, idx) => (
                      <tr key={`exp-${idx}`}><td className="border-x border-black p-2 pl-6">{item.desc}</td><td className="border-x border-black p-2 text-right">{formatRupiah(item.amount)}</td></tr>
                   ))}
                   <tr className="bg-slate-100 font-black">
                      <td className="border border-black p-4 text-right uppercase text-lg">{totals.netProfit >= 0 ? 'LABA BERSIH' : 'RUGI BERSIH'}</td>
                      <td className="border border-black p-4 text-right text-lg">{formatRupiah(totals.netProfit)}</td>
                   </tr>
                </tbody>
             </table>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="shrink-0 mt-8 flex justify-between items-end border-t pt-8 border-slate-200 print:border-black break-inside-avoid">
         <div className="text-center w-56 opacity-50"><PieChart size={32} className="mx-auto text-slate-300 print:text-black"/><p className="text-[8px] font-bold uppercase mt-1">Financial Analysis Report</p></div>
         <div className="text-center w-64">
            <p className="text-xs mb-14">{data.city}, {isClient && data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</p>
            <p className="font-bold underline uppercase text-sm leading-none">{data.ownerName}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest print:text-black">Pemilik Usaha</p>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0mm !important; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <PieChart size={16} className="text-blue-500" /> <span>Profit Loss Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Standar {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Detail {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Finansial</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Landmark size={12}/> Identitas Bisnis</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.businessName} onChange={e => handleDataChange('businessName', e.target.value)} placeholder="Nama Toko/PT" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Pemilik" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.period} onChange={e => handleDataChange('period', e.target.value)} placeholder="Periode" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-blue-600 flex items-center gap-2"><TrendingUp size={12}/> Pendapatan</h3>
                    <button onClick={() => addItem('revenues')} className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest">+ Item</button>
                 </div>
                 {data.revenues.map((item, idx) => (
                    <div key={idx} className="flex gap-2 group animate-in slide-in-from-right-2">
                       <input className="flex-1 p-1.5 border rounded text-xs" value={item.desc} onChange={e => updateItem('revenues', idx, 'desc', e.target.value)} placeholder="Sumber dana..." />
                       <input type="number" className="w-24 p-1.5 border rounded text-xs font-bold" value={item.amount} onChange={e => updateItem('revenues', idx, 'amount', parseInt(e.target.value) || 0)} />
                       <button onClick={() => removeItem('revenues', idx)} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                    </div>
                 ))}
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-red-600 flex items-center gap-2"><TrendingDown size={12}/> Beban</h3>
                    <button onClick={() => addItem('expenses')} className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest">+ Item</button>
                 </div>
                 {data.expenses.map((item, idx) => (
                    <div key={idx} className="flex gap-2 group animate-in slide-in-from-right-2">
                       <input className="flex-1 p-1.5 border rounded text-xs" value={item.desc} onChange={e => updateItem('expenses', idx, 'desc', e.target.value)} placeholder="Nama biaya..." />
                       <input type="number" className="w-24 p-1.5 border rounded text-xs font-bold" value={item.amount} onChange={e => updateItem('expenses', idx, 'amount', parseInt(e.target.value) || 0)} />
                       <button onClick={() => removeItem('expenses', idx)} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <ReportContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><ReportContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE