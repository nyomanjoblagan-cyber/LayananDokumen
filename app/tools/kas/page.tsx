'use client';

/**
 * FILE: CashReportPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Laporan Kas Kecil (Petty Cash)
 * FEATURES:
 * - Dual Template (Classic Ledger vs Modern Statement)
 * - Auto Calculation (In/Out/Balance)
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Wallet, TrendingUp, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Kas...</div>}>
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

  // HITUNGAN
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
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA });
        setLogo(null);
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Tabel Akuntansi (Klasik)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Mutasi Modern (Statement)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Tabel Akuntansi' : 'Mutasi Modern';

  // --- KOMPONEN KERTAS ---
  const DocumentContent = () => (
    // FIX: Added 'print:p-[20mm]'
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 border-b-2 border-slate-800 pb-4 mb-6 shrink-0">
            {logo && <img src={logo} className="h-16 w-auto object-contain" />}
            <div className={`${logo ? '' : 'text-center w-full'}`}>
                <h1 className="text-xl font-black uppercase text-slate-800 tracking-wide">{data.companyName}</h1>
                <h2 className="text-lg font-bold text-blue-700 uppercase mt-1">{data.title}</h2>
                <p className="text-sm text-slate-500">{data.period}</p>
            </div>
        </div>

        {/* SUMMARY BOXES */}
        <div className="grid grid-cols-4 gap-4 mb-6 shrink-0 text-sm">
            <div className="bg-slate-50 print:bg-white p-2 rounded border border-slate-200 text-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Saldo Awal</div>
                <div className="font-bold text-slate-700">Rp {data.initialBalance.toLocaleString()}</div>
            </div>
            <div className="bg-emerald-50 print:bg-white p-2 rounded border border-emerald-200 text-center">
                <div className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Total Masuk</div>
                <div className="font-bold text-emerald-700">Rp {totalIn.toLocaleString()}</div>
            </div>
            <div className="bg-red-50 print:bg-white p-2 rounded border border-red-200 text-center">
                <div className="text-[10px] font-bold text-red-600 uppercase mb-1">Total Keluar</div>
                <div className="font-bold text-red-700">Rp {totalOut.toLocaleString()}</div>
            </div>
            <div className="bg-blue-50 print:bg-white p-2 rounded border border-blue-200 text-center">
                <div className="text-[10px] font-bold text-blue-600 uppercase mb-1">Saldo Akhir</div>
                <div className="font-black text-blue-800">Rp {finalBalance.toLocaleString()}</div>
            </div>
        </div>

        {/* TEMPLATE 1: TABEL AKUNTANSI */}
        {templateId === 1 && (
            <div className="mb-8 flex-grow">
                <table className="w-full border-collapse border border-black text-[10pt]">
                    <thead>
                        <tr className="bg-slate-200 print:bg-slate-100 text-center font-bold">
                            <th className="border border-black py-2 w-8">NO</th>
                            <th className="border border-black py-2 w-24">TANGGAL</th>
                            <th className="border border-black py-2">KETERANGAN</th>
                            <th className="border border-black py-2 w-24 bg-emerald-100 print:bg-transparent">MASUK</th>
                            <th className="border border-black py-2 w-24 bg-red-100 print:bg-transparent">KELUAR</th>
                            <th className="border border-black py-2 w-28 bg-slate-100 print:bg-transparent">SALDO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Initial Balance */}
                        <tr className="bg-slate-50 print:bg-transparent">
                            <td className="border border-black py-1 text-center">-</td>
                            <td className="border border-black py-1 text-center">-</td>
                            <td className="border border-black py-1 px-2 font-bold italic">Saldo Awal</td>
                            <td className="border border-black py-1 px-2 text-right">-</td>
                            <td className="border border-black py-1 px-2 text-right">-</td>
                            <td className="border border-black py-1 px-2 text-right font-bold">{data.initialBalance.toLocaleString()}</td>
                        </tr>
                        {/* Loop Transactions */}
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
                                        <td className="border border-black py-1 px-2 text-right text-emerald-700 print:text-black font-medium">{tx.type === 'in' ? tx.amount.toLocaleString() : '-'}</td>
                                        <td className="border border-black py-1 px-2 text-right text-red-700 print:text-black font-medium">{tx.type === 'out' ? tx.amount.toLocaleString() : '-'}</td>
                                        <td className="border border-black py-1 px-2 text-right font-bold bg-slate-50 print:bg-transparent">{currentBalance.toLocaleString()}</td>
                                    </tr>
                                );
                            });
                        })()}
                        {/* Filler Rows */}
                        {[...Array(Math.max(0, 5 - data.transactions.length))].map((_, i) => (
                            <tr key={`fill-${i}`} className="h-6">
                                <td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black bg-slate-50 print:bg-transparent"></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-slate-200 print:bg-slate-100 font-bold">
                            <td colSpan={3} className="border border-black py-2 px-2 text-right">TOTAL</td>
                            <td className="border border-black py-2 px-2 text-right">{totalIn.toLocaleString()}</td>
                            <td className="border border-black py-2 px-2 text-right">{totalOut.toLocaleString()}</td>
                            <td className="border border-black py-2 px-2 text-right">{finalBalance.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )}

        {/* TEMPLATE 2: MUTASI MODERN */}
        {templateId === 2 && (
            <div className="mb-8 font-sans flex-grow">
                <div className="flex justify-between items-center py-3 border-b border-slate-200 text-xs text-slate-500">
                    <span>Saldo Awal Periode Ini</span>
                    <span className="font-bold text-slate-800 text-sm">Rp {data.initialBalance.toLocaleString()}</span>
                </div>

                <div className="divide-y divide-slate-100">
                    {(() => {
                        let currentBalance = data.initialBalance;
                        return data.transactions.map((tx) => {
                            if (tx.type === 'in') currentBalance += tx.amount;
                            else currentBalance -= tx.amount;

                            return (
                                <div key={tx.id} className="flex justify-between py-3 items-center text-sm">
                                    <div className="w-24 text-slate-500 text-xs">{tx.date}</div>
                                    <div className="flex-1 px-4 font-medium text-slate-700">{tx.desc}</div>
                                    <div className={`w-28 text-right font-bold ${tx.type === 'in' ? 'text-emerald-600 print:text-black' : 'text-red-600 print:text-black'}`}>
                                        {tx.type === 'in' ? '+' : '-'} {tx.amount.toLocaleString()}
                                    </div>
                                    <div className="w-28 text-right text-slate-400 text-xs font-mono">
                                        {currentBalance.toLocaleString()}
                                    </div>
                                </div>
                            )
                        });
                    })()}
                </div>

                <div className="flex justify-between items-center py-4 border-t-2 border-slate-800 mt-4">
                    <span className="font-bold text-slate-800 uppercase tracking-wide">Saldo Akhir</span>
                    <span className="font-black text-xl text-blue-700 print:text-black">Rp {finalBalance.toLocaleString()}</span>
                </div>
            </div>
        )}

        {/* SIGNATURE */}
        <div className="flex justify-end mt-auto pt-8 shrink-0" style={{ pageBreakInside: 'avoid' }}>
            <div className="text-center w-48">
                <div className="text-xs mb-16">Dibuat & Diperiksa Oleh,</div>
                <div className="font-bold border-b border-slate-300 print:border-black pb-1 uppercase">{data.signer}</div>
                <div className="text-xs mt-1 text-slate-500 print:text-black uppercase">{data.signerJob}</div>
            </div>
        </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
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
               <Wallet size={16} className="text-emerald-500" /> <span>CASH REPORT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
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
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Transaksi</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <Wallet size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Informasi Umum</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                          {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                       </div>
                       <div className="flex-1">
                          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                          <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Logo</button>
                          {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 block mt-1">Hapus Logo</button>}
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan / Toko</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.companyName} onChange={e => setData({...data, companyName: e.target.value})} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Judul Laporan</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Periode Laporan</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" placeholder="Contoh: Januari 2026" value={data.period} onChange={e => setData({...data, period: e.target.value})} />
                    </div>
                 </div>
              </div>

              {/* Saldo & Transaksi */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <TrendingUp size={14} className="text-blue-600" />
                       <h3 className="text-xs font-bold text-slate-700 uppercase">Arus Kas</h3>
                    </div>
                    <button onClick={addTx} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1 font-bold"><Plus size={10}/> Transaksi Baru</button>
                 </div>
                 
                 <div className="p-4 space-y-4">
                    <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                       <label className="text-[10px] font-bold text-emerald-700 uppercase mb-1 block">Saldo Awal (Rp)</label>
                       <input type="number" className="w-full bg-white p-2 border border-emerald-200 rounded text-sm font-bold text-emerald-800" value={data.initialBalance} onChange={e => setData({...data, initialBalance: Number(e.target.value)})} />
                    </div>

                    <div className="space-y-3">
                       {data.transactions.map((tx, idx) => (
                          <div key={tx.id} className="bg-slate-50 p-3 rounded border border-slate-200 relative group transition-all hover:shadow-sm">
                             <div className="flex gap-2 mb-2">
                                <input type="date" className="w-28 p-1.5 border border-slate-300 rounded text-xs bg-white" value={tx.date} onChange={e => handleTxChange(idx, 'date', e.target.value)} />
                                <select 
                                  className={`flex-1 p-1.5 border rounded text-xs font-bold ${tx.type === 'in' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                                  value={tx.type} 
                                  onChange={e => handleTxChange(idx, 'type', e.target.value)}
                                >
                                   <option value="in">MASUK (+)</option>
                                   <option value="out">KELUAR (-)</option>
                                </select>
                             </div>
                             <div className="mb-2">
                                <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs bg-white placeholder-slate-400" placeholder="Keterangan transaksi..." value={tx.desc} onChange={e => handleTxChange(idx, 'desc', e.target.value)} />
                             </div>
                             <div>
                                <div className="relative">
                                   <span className="absolute left-2 top-1.5 text-xs text-slate-400">Rp</span>
                                   <input type="number" className="w-full pl-8 p-1.5 border border-slate-300 rounded text-sm font-medium bg-white" value={tx.amount} onChange={e => handleTxChange(idx, 'amount', Number(e.target.value))} />
                                </div>
                             </div>
                             <button onClick={() => removeTx(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={12} /></button>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Penanggung Jawab</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signerJob} onChange={e => setData({...data, signerJob: e.target.value})} />
                       </div>
                    </div>
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                   <div className="print-content-wrapper p-[20mm]">
                      <DocumentContent />
                   </div>
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
         <div style={{ width: '210mm', minHeight: 'auto' }} className="bg-white flex flex-col">
             <div className="print-content-wrapper p-[20mm]">
                <DocumentContent />
             </div>
         </div>
      </div>

    </div>
  );
}
