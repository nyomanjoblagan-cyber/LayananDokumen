'use client';

import { useState, Suspense, useMemo } from 'react';
import { 
  Printer, ArrowLeft, TrendingUp, TrendingDown, 
  Plus, Trash2, PieChart, Landmark, CalendarDays, Wallet
} from 'lucide-react';
import Link from 'next/link';

export default function LabaRugiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Laporan Keuangan...</div>}>
      <ProfitLossBuilder />
    </Suspense>
  );
}

function ProfitLossBuilder() {
  const [data, setData] = useState({
    businessName: 'TOKO BERKAH UMKM',
    ownerName: 'BUDI SANTOSO',
    period: 'Januari 2026',
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    
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

  const ReportContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border font-sans text-[10.5pt] leading-normal text-slate-900 print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm]" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* HEADER */}
      <div className="text-center border-b-2 border-slate-900 pb-4 mb-8 shrink-0">
        <h1 className="text-xl font-black uppercase tracking-widest">{data.businessName}</h1>
        <h2 className="text-lg font-bold text-slate-600 uppercase">LAPORAN LABA RUGI SEDERHANA</h2>
        <p className="text-sm font-medium tracking-tighter">Periode: {data.period}</p>
      </div>

      <div className="space-y-8 flex-grow">
        {/* PENDAPATAN */}
        <section>
          <div className="bg-slate-900 text-white px-4 py-2 flex justify-between items-center mb-2">
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
             <div className="flex justify-between px-4 py-2 font-black bg-slate-50 border-t border-slate-900 mt-2">
                <span>TOTAL PENDAPATAN</span>
                <span className="text-blue-700">{formatRupiah(totals.totalRevenue)}</span>
             </div>
          </div>
        </section>

        {/* BEBAN */}
        <section>
          <div className="bg-slate-900 text-white px-4 py-2 flex justify-between items-center mb-2">
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
             <div className="flex justify-between px-4 py-2 font-black bg-slate-50 border-t border-slate-900 mt-2">
                <span>TOTAL BEBAN</span>
                <span className="text-red-600">({formatRupiah(totals.totalExpense)})</span>
             </div>
          </div>
        </section>

        {/* LABA BERSIH */}
        <section className={`p-6 rounded-xl border-4 ${totals.netProfit >= 0 ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-500'}`}>
           <div className="flex justify-between items-center">
              <div>
                 <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Laba / (Rugi) Bersih</h4>
                 <p className="text-2xl font-black tracking-tighter uppercase">
                    {totals.netProfit >= 0 ? 'Surplus Bersih' : 'Defisit Bersih'}
                 </p>
              </div>
              <div className="text-right">
                 <p className={`text-2xl font-black ${totals.netProfit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                    {formatRupiah(totals.netProfit)}
                 </p>
              </div>
           </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 mt-8 flex justify-between items-end border-t pt-8">
         <div className="text-center w-56 opacity-50">
            <PieChart size={32} className="mx-auto text-slate-300" />
            <p className="text-[8px] font-bold uppercase mt-1">Financial Analysis Report</p>
         </div>
         <div className="text-center w-64">
            <p className="text-xs mb-14">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
            <p className="font-bold underline uppercase text-sm leading-none">{data.ownerName}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Pemilik Usaha</p>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* UI ROOT */}
      <div id="ui-root" className="flex flex-col h-screen no-print font-sans">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2">
              <PieChart size={18} /> Profit & Loss Builder
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg">
            <Printer size={16} /> Print Laporan
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-6 scrollbar-thin text-slate-900">
             <div className="space-y-4">
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
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20">
             <div className="origin-top scale-[0.6] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <ReportContent />
             </div>
          </div>
        </div>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <ReportContent />
      </div>
    </div>
  );
}