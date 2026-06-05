'use client';

/**
 * FILE: CashReportPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Laporan Kas Kecil (Petty Cash)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Wallet, TrendingUp, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface Transaction {
  id: number;
  date: string;
  desc: string;
  type: 'in' | 'out';
  amount: number;
}

interface CashData {
  title: string;
  period: string;
  companyName: string;
  initialBalance: number;
  transactions: Transaction[];
  signer: string;
  signerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: CashData = {
  title: 'LAPORAN KAS KECIL (PETTY CASH)',
  period: 'Periode: Januari 2026',
  companyName: 'TOKO SEMBAKO MAKMUR',
  initialBalance: 5000000, 
  
  transactions: [
    { id: 1, date: '2026-01-02', desc: 'Terima pembayaran tunai Inv-001', type: 'in', amount: 1500000 },
    { id: 2, date: '2026-01-03', desc: 'Beli ATK dan Kertas', type: 'out', amount: 250000 },
    { id: 3, date: '2026-01-05', desc: 'Biaya konsumsi rapat', type: 'out', amount: 150000 },
    { id: 4, date: '2026-01-05', desc: 'Penjualan harian', type: 'in', amount: 3200000 },
  ],

  signer: 'Budi Santoso',
  signerJob: 'Bendahara'
};

// --- 3. KOMPONEN UTAMA ---
export default function CashReportPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Kas...</div>}>
      <CashToolBuilder />
    </Suspense>
  );
}

function CashToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<CashData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ARITMATIKA KAS
  const totalIn = data.transactions.filter(t => t.type === 'in').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = data.transactions.filter(t => t.type === 'out').reduce((acc, curr) => acc + curr.amount, 0);
  const finalBalance = data.initialBalance + totalIn - totalOut;

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleTxChange = (idx: number, field: keyof Transaction, val: any) => {
    const newTx = [...data.transactions];
    // @ts-ignore
    newTx[idx][field] = val;
    setData({ ...data, transactions: newTx });
  };

  const addTx = () => {
    setData({
      ...data,
      transactions: [...data.transactions, { 
        id: Date.now(), 
        date: new Date().toISOString().split('T')[0], 
        desc: '', 
        type: 'out', 
        amount: 0 
      }]
    });
  };

  const removeTx = (idx: number) => {
    const newTx = [...data.transactions];
    newTx.splice(idx, 1);
    setData({ ...data, transactions: newTx });
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA });
        setLogo(null);
    }
  };

  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 border-b-2 border-slate-800 pb-4 mb-6 shrink-0">
            {logo && <img src={logo} className="h-16 w-auto object-contain" alt="Logo" />}
            <div className={`${logo ? '' : 'text-center w-full'}`}>
                <h1 className="text-xl font-black uppercase text-slate-800 tracking-wide leading-none">{data.companyName}</h1>
                <h2 className="text-lg font-bold text-blue-700 uppercase mt-2">{data.title}</h2>
                <p className="text-sm text-slate-500 font-sans">{data.period}</p>
            </div>
        </div>

        {/* SUMMARY BOXES */}
        <div className="grid grid-cols-4 gap-4 mb-6 shrink-0 text-[10pt] font-sans">
            <div className="bg-slate-50 print:bg-white p-2 rounded border border-slate-200 text-center">
                <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Saldo Awal</div>
                <div className="font-bold text-slate-700">Rp {data.initialBalance.toLocaleString()}</div>
            </div>
            <div className="bg-emerald-50 print:bg-white p-2 rounded border border-emerald-200 text-center">
                <div className="text-[9px] font-bold text-emerald-600 uppercase mb-1">Total Masuk</div>
                <div className="font-bold text-emerald-700">Rp {totalIn.toLocaleString()}</div>
            </div>
            <div className="bg-red-50 print:bg-white p-2 rounded border border-red-200 text-center">
                <div className="text-[9px] font-bold text-red-600 uppercase mb-1">Total Keluar</div>
                <div className="font-bold text-red-700">Rp {totalOut.toLocaleString()}</div>
            </div>
            <div className="bg-blue-50 print:bg-white p-2 rounded border border-blue-200 text-center">
                <div className="text-[9px] font-bold text-blue-600 uppercase mb-1">Saldo Akhir</div>
                <div className="font-black text-blue-800">Rp {finalBalance.toLocaleString()}</div>
            </div>
        </div>

        {/* TEMPLATE 1: TABEL AKUNTANSI */}
        {templateId === 1 && (
            <div className="mb-8 flex-grow">
                <table className="w-full border-collapse border border-black text-[10pt]">
                    <thead>
                        <tr className="bg-slate-100 text-center font-bold">
                            <th className="border border-black py-2 w-8 text-[9px]">NO</th>
                            <th className="border border-black py-2 w-24 text-[9px]">TANGGAL</th>
                            <th className="border border-black py-2 text-[9px]">KETERANGAN</th>
                            <th className="border border-black py-2 w-24 text-[9px]">MASUK</th>
                            <th className="border border-black py-2 w-24 text-[9px]">KELUAR</th>
                            <th className="border border-black py-2 w-28 text-[9px]">SALDO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-slate-50 print:bg-transparent italic">
                            <td className="border border-black py-1 text-center">-</td>
                            <td className="border border-black py-1 text-center">-</td>
                            <td className="border border-black py-1 px-2 font-bold">Saldo Awal</td>
                            <td className="border border-black py-1 px-2 text-right">-</td>
                            <td className="border border-black py-1 px-2 text-right">-</td>
                            <td className="border border-black py-1 px-2 text-right font-bold">{data.initialBalance.toLocaleString()}</td>
                        </tr>
                        {(() => {
                            let currentBalance = data.initialBalance;
                            return data.transactions.map((tx, idx) => {
                                if (tx.type === 'in') currentBalance += tx.amount;
                                else currentBalance -= tx.amount;
                                return (
                                    <tr key={tx.id}>
                                        <td className="border border-black py-1 text-center">{idx + 1}</td>
                                        <td className="border border-black py-1 text-center">{tx.date}</td>
                                        <td className="border border-black py-1 px-2">{tx.desc}</td>
                                        <td className="border border-black py-1 px-2 text-right">{tx.type === 'in' ? tx.amount.toLocaleString() : '-'}</td>
                                        <td className="border border-black py-1 px-2 text-right">{tx.type === 'out' ? tx.amount.toLocaleString() : '-'}</td>
                                        <td className="border border-black py-1 px-2 text-right font-bold">{currentBalance.toLocaleString()}</td>
                                    </tr>
                                );
                            });
                        })()}
                    </tbody>
                </table>
            </div>
        )}

        {/* TEMPLATE 2: MODERN */}
        {templateId === 2 && (
            <div className="mb-8 font-sans flex-grow">
                <div className="divide-y divide-slate-100">
                    {(() => {
                        let currentBalance = data.initialBalance;
                        return data.transactions.map((tx) => {
                            if (tx.type === 'in') currentBalance += tx.amount;
                            else currentBalance -= tx.amount;
                            return (
                                <div key={tx.id} className="flex justify-between py-3 items-center text-sm border-b">
                                    <div className="w-24 text-slate-400 text-xs">{tx.date}</div>
                                    <div className="flex-1 px-4 font-medium text-slate-700">{tx.desc}</div>
                                    <div className={`w-28 text-right font-bold ${tx.type === 'in' ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {tx.type === 'in' ? '+' : '-'} {tx.amount.toLocaleString()}
                                    </div>
                                    <div className="w-28 text-right text-slate-400 text-xs font-mono">{currentBalance.toLocaleString()}</div>
                                </div>
                            )
                        });
                    })()}
                </div>
            </div>
        )}

        {/* SIGNATURE */}
        <div className="flex justify-end mt-auto pt-8 break-inside-avoid">
            <div className="text-center w-48 font-sans">
                <div className="text-[10px] uppercase text-slate-400 font-bold mb-16 tracking-widest">Penanggung Jawab,</div>
                <div className="font-bold border-b border-black pb-1 uppercase">{data.signer}</div>
                <div className="text-[10px] mt-1 text-slate-500 uppercase">{data.signerJob}</div>
            </div>
        </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Wallet size={16} className="text-emerald-500" /> <span>Cash Report Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                <LayoutTemplate size={14} className="text-blue-400" /> {templateId === 1 ? 'Ledger' : 'Statement'} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Klasik Akuntansi {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Statement Modern {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Transaksi</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all overflow-hidden" onClick={() => fileInputRef.current?.click()}>
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <Upload size={16} className="text-slate-300" />}
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    <input className="flex-1 p-2 border rounded text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.companyName} onChange={e => setData({...data, companyName: e.target.value})} placeholder="Nama Toko/PT" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">SALDO AWAL</label><input type="number" className="w-full p-2 border rounded text-xs font-black text-blue-600 bg-blue-50" value={data.initialBalance} onChange={e => setData({...data, initialBalance: parseInt(e.target.value) || 0})} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">PERIODE</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.period} onChange={e => setData({...data, period: e.target.value})} placeholder="Januari 2026" /></div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center"><label className="text-[10px] font-black uppercase text-slate-400">Daftar Transaksi</label><button onClick={addTx} className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">+ BARU</button></div>
                 {data.transactions.map((tx, idx) => (
                   <div key={tx.id} className="bg-slate-50 p-3 rounded-lg border relative group animate-in slide-in-from-right-2">
                      <div className="flex gap-2 mb-2">
                        <input type="date" className="w-28 p-1.5 border rounded text-[10px]" value={tx.date} onChange={e => handleTxChange(idx, 'date', e.target.value)} />
                        <select className={`flex-1 p-1 border rounded text-[10px] font-bold ${tx.type === 'in' ? 'text-emerald-600' : 'text-red-600'}`} value={tx.type} onChange={e => handleTxChange(idx, 'type', e.target.value)}><option value="in">MASUK (+)</option><option value="out">KELUAR (-)</option></select>
                      </div>
                      <input className="w-full p-1.5 border rounded mb-2 text-xs" value={tx.desc} onChange={e => handleTxChange(idx, 'desc', e.target.value)} placeholder="Keterangan..." />
                      <input type="number" className="w-full p-1.5 border rounded text-xs font-bold" value={tx.amount} onChange={e => handleTxChange(idx, 'amount', parseInt(e.target.value) || 0)} placeholder="Jumlah Rp" />
                      <button onClick={() => removeTx(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"><Trash2 size={12}/></button>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}