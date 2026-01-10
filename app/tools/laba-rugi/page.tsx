'use client';

import { useState, Suspense, useMemo, useEffect } from 'react';
import { 
  Printer, ArrowLeft, TrendingUp, TrendingDown, 
  Plus, Trash2, PieChart, Landmark, CalendarDays, Wallet, Edit3, Eye, LayoutTemplate, Check, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function LabaRugiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Laporan Keuangan...</div>}>
      <ProfitLossBuilder />
    </Suspense>
  );
}

function ProfitLossBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  const [data, setData] = useState({
    businessName: 'TOKO BERKAH UMKM',
    ownerName: 'BUDI SANTOSO',
    period: 'Januari 2026',
    city: 'Jakarta',
    date: '',
    
    // PENDAPATAN
    revenues: [
      { desc: 'Penjualan Produk Utama', amount: 25000000 },
      { desc: 'Pendapatan Jasa Layanan', amount: 5000000 }
    ],
    
    // BEBAN / BIAYA
    expenses: [
      { desc: 'Harga Pokok Penjualan (HPP)', amount: 15000000 },
      { desc: 'Gaji Karyawan', amount: 3000000 },
      { desc: 'Sewa Tempat & Listrik', amount: 1500000 },
      { desc: 'Biaya Pemasaran', amount: 500000 }
    ]
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // --- LOGIKA KALKULASI ---
  const totals = useMemo(() => {
    const totalRevenue = data.revenues.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const totalExpense = data.expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const netProfit = totalRevenue - totalExpense;
    return { totalRevenue, totalExpense, netProfit };
  }, [data]);

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  // --- MANIPULASI ITEM ---
  const addItem = (type: 'revenues' | 'expenses') => {
    setData({ ...data, [type]: [...data[type], { desc: '', amount: 0 }] });
  };

  const removeItem = (type: 'revenues' | 'expenses', idx: number) => {
    const newList = [...data[type]];
    newList.splice(idx, 1);
    setData({ ...data, [type]: newList });
  };

  const updateItem = (type: 'revenues' | 'expenses', idx: number, field: string, val: any) => {
    const newList = [...data[type]];
    // @ts-ignore
    newList[idx][field] = val;
    setData({ ...data, [type]: newList });
  };

  const TEMPLATES = [
    { id: 1, name: "Format Standar", desc: "Laporan Laba Rugi sederhana" },
    { id: 2, name: "Format Detail", desc: "Cocok untuk presentasi bisnis" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const ReportContent = () => (
    <div className="bg-white flex flex-col box-border font-sans text-[10.5pt] leading-normal text-slate-900 p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
      
      {/* HEADER */}
      <div className="text-center border-b-2 border-slate-900 pb-4 mb-8 shrink-0">
        <h1 className="text-xl font-black uppercase tracking-widest">{data.businessName}</h1>
        <h2 className="text-lg font-bold text-slate-600 uppercase">LAPORAN LABA RUGI SEDERHANA</h2>
        <p className="text-sm font-medium tracking-tighter">Periode: {data.period}</p>
      </div>

      <div className="space-y-8 flex-grow overflow-hidden">
        {/* PENDAPATAN */}
        <section>
          <div className="bg-slate-900 text-white px-4 py-2 flex justify-between items-center mb-2 print:bg-black print:text-white">
            <h3 className="text-xs font-black uppercase tracking-widest">A. Pendapatan (Revenue)</h3>
            <span className="text-xs font-bold">Total Pendapatan</span>
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

        {/* BEBAN */}
        <section>
          <div className="bg-slate-900 text-white px-4 py-2 flex justify-between items-center mb-2 print:bg-black print:text-white">
            <h3 className="text-xs font-black uppercase tracking-widest">B. Beban Operasional (Expenses)</h3>
            <span className="text-xs font-bold">Total Biaya</span>
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

        {/* LABA BERSIH */}
        <section className={`p-6 rounded-xl border-4 ${totals.netProfit >= 0 ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-500'} print:bg-transparent print:border-black`}>
           <div className="flex justify-between items-center">
              <div>
                 <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 print:text-black">Laba / (Rugi) Bersih</h4>
                 <p className="text-2xl font-black tracking-tighter uppercase">
                    {totals.netProfit >= 0 ? 'Surplus Bersih' : 'Defisit Bersih'}
                 </p>
              </div>
              <div className="text-right">
                 <p className={`text-2xl font-black ${totals.netProfit >= 0 ? 'text-emerald-700' : 'text-red-700'} print:text-black`}>
                    {formatRupiah(totals.netProfit)}
                 </p>
              </div>
           </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 mt-8 flex justify-between items-end border-t pt-8 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="text-center w-56 opacity-50">
            <PieChart size={32} className="mx-auto text-slate-300 print:text-black" />
            <p className="text-[8px] font-bold uppercase mt-1">Financial Analysis Report</p>
         </div>
         <div className="text-center w-64">
            <p className="text-xs mb-14">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</p>
            <p className="font-bold underline uppercase text-sm leading-none">{data.ownerName}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest print:text-black">Pemilik Usaha</p>
         </div>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <PieChart size={16} className="text-blue-500" /> <span>PROFIT LOSS BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Landmark size={12}/> Identitas Bisnis</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.businessName} onChange={e => handleDataChange('businessName', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Pemilik" />
                    <input className="w-full p-2 border rounded text-xs" value={data.period} onChange={e => handleDataChange('period', e.target.value)} placeholder="Periode Laporan" />
                 </div>
              </div>

              {/* EDITOR PENDAPATAN */}
              <div className="space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-widest flex items-center gap-2"><TrendingUp size={12}/> Pendapatan</h3>
                    <button onClick={() => addItem('revenues')} className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">+ Tambah</button>
                 </div>
                 {data.revenues.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center group">
                       <input className="flex-1 p-2 border rounded text-xs" value={item.desc} onChange={e => updateItem('revenues', idx, 'desc', e.target.value)} placeholder="Keterangan" />
                       <input type="number" className="w-24 p-2 border rounded text-xs font-bold" value={item.amount} onChange={e => updateItem('revenues', idx, 'amount', parseInt(e.target.value) || 0)} />
                       <button onClick={() => removeItem('revenues', idx)} className="text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button>
                    </div>
                 ))}
              </div>

              {/* EDITOR BEBAN */}
              <div className="space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-red-600 tracking-widest flex items-center gap-2"><TrendingDown size={12}/> Beban / Biaya</h3>
                    <button onClick={() => addItem('expenses')} className="text-[9px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase">+ Tambah</button>
                 </div>
                 {data.expenses.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center group">
                       <input className="flex-1 p-2 border rounded text-xs" value={item.desc} onChange={e => updateItem('expenses', idx, 'desc', e.target.value)} placeholder="Keterangan" />
                       <input type="number" className="w-24 p-2 border rounded text-xs font-bold" value={item.amount} onChange={e => updateItem('expenses', idx, 'amount', parseInt(e.target.value) || 0)} />
                       <button onClick={() => removeItem('expenses', idx)} className="text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button>
                    </div>
                 ))}
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <ReportContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <ReportContent />
         </div>
      </div>

    </div>
  );
}