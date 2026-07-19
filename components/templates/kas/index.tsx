'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: KasPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Buku Kas Harian / Laporan Keuangan
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  Wallet, Calculator, Plus, Trash2, CalendarDays, BookOpen
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface KasTransaction {
  id: string;
  tanggal: string;
  noBukti: string;
  keterangan: string;
  debit: number;
  kredit: number;
}

interface KasData {
  namaPerusahaan: string;
  judulLaporan: string;
  periode: string;
  saldoAwal: number;
  disiapkanOleh: string;
  disetujuiOleh: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: KasData = {
  namaPerusahaan: 'PT. MAJU BERSAMA TECHNOLOGY',
  judulLaporan: 'BUKU KAS HARIAN',
  periode: 'Juli 2026',
  saldoAwal: 5000000,
  disiapkanOleh: 'Siti Aminah',
  disetujuiOleh: 'Budi Santoso',
};

const INITIAL_TX: KasTransaction[] = [
  { id: '1', tanggal: '01/07/26', noBukti: 'BKM-001', keterangan: 'Penjualan Tunai Toko', debit: 2500000, kredit: 0 },
  { id: '2', tanggal: '02/07/26', noBukti: 'BKK-001', keterangan: 'Bayar Listrik PLN & Air', debit: 0, kredit: 1250000 },
  { id: '3', tanggal: '05/07/26', noBukti: 'BKK-002', keterangan: 'Beli ATK Kantor', debit: 0, kredit: 350000 },
  { id: '4', tanggal: '08/07/26', noBukti: 'BKM-002', keterangan: 'Pencairan Piutang PT XYZ', debit: 4000000, kredit: 0 },
];

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[10pt]">
    {children}
  </div>
);

// --- 4. HELPER FUNCTIONS ---
const formatCurrency = (amount: number) => {
  if (amount === 0) return '-';
  return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
};

// --- 5. KOMPONEN UTAMA ---
export default function BukuKasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Laporan Kas...</div>}>
      <BukuKasBuilder />
    </Suspense>
  );
}

function BukuKasBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<KasData>(INITIAL_DATA);
  const [transactions, setTransactions] = useState<KasTransaction[]>(INITIAL_TX);
  const [activeTab, setActiveTab] = useState<'pengaturan' | 'transaksi'>('transaksi');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof KasData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleTxChange = (id: string, field: keyof KasTransaction, value: any) => {
    setTransactions(transactions.map(tx => tx.id === id ? { ...tx, [field]: value } : tx));
  };

  const addTransaction = (type: 'debit' | 'kredit') => {
    const newTx: KasTransaction = {
      id: Date.now().toString(),
      tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' }),
      noBukti: '',
      keterangan: '',
      debit: type === 'debit' ? 100000 : 0,
      kredit: type === 'kredit' ? 100000 : 0,
    };
    setTransactions([...transactions, newTx]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset laporan ke data awal?')) {
        setData({ ...INITIAL_DATA });
        setTransactions([...INITIAL_TX]);
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const totalDebit = transactions.reduce((sum, tx) => sum + (Number(tx.debit) || 0), 0);
    const totalKredit = transactions.reduce((sum, tx) => sum + (Number(tx.kredit) || 0), 0);
    const saldoAkhir = data.saldoAwal + totalDebit - totalKredit;

    return (
      <Kertas>
        {/* HEADER LAPORAN */}
        <div className="text-center border-b-2 border-black pb-4 mb-6 break-inside-avoid">
            <h1 className="text-xl font-black uppercase tracking-widest">{data.namaPerusahaan}</h1>
            <h2 className="text-lg font-bold uppercase mt-1">{data.judulLaporan}</h2>
            <p className="text-sm mt-1 uppercase">Periode: {data.periode}</p>
        </div>

        {/* TABEL TRANSAKSI */}
        <div className="mb-8">
            <table className="w-full border-collapse border border-black text-[9pt]">
                <thead>
                    <tr className="bg-gray-100 font-bold uppercase">
                        <th className="border border-black p-2 w-16 text-center">Tgl</th>
                        <th className="border border-black p-2 w-24 text-center">No Bukti</th>
                        <th className="border border-black p-2">Keterangan</th>
                        <th className="border border-black p-2 w-32 text-right">Penerimaan (Debit)</th>
                        <th className="border border-black p-2 w-32 text-right">Pengeluaran (Kredit)</th>
                        <th className="border border-black p-2 w-32 text-right">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {/* BARIS SALDO AWAL */}
                    <tr className="font-semibold bg-gray-50 break-inside-avoid">
                        <td className="border border-black p-2 text-center">-</td>
                        <td className="border border-black p-2 text-center">-</td>
                        <td className="border border-black p-2">SALDO AWAL</td>
                        <td className="border border-black p-2 text-right">-</td>
                        <td className="border border-black p-2 text-right">-</td>
                        <td className="border border-black p-2 text-right">{formatCurrency(data.saldoAwal)}</td>
                    </tr>

                    {/* BARIS TRANSAKSI DINAMIS */}
                    {transactions.map((tx, index) => {
                        // Hitung running balance
                        const runningBalance = data.saldoAwal + 
                            transactions.slice(0, index + 1).reduce((sum, t) => sum + (Number(t.debit) || 0), 0) -
                            transactions.slice(0, index + 1).reduce((sum, t) => sum + (Number(t.kredit) || 0), 0);
                        
                        return (
                            <tr key={tx.id} className="break-inside-avoid">
                                <td className="border border-black p-2 text-center">{tx.tanggal}</td>
                                <td className="border border-black p-2 text-center">{tx.noBukti}</td>
                                <td className="border border-black p-2">{tx.keterangan}</td>
                                <td className="border border-black p-2 text-right">{formatCurrency(tx.debit)}</td>
                                <td className="border border-black p-2 text-right">{formatCurrency(tx.kredit)}</td>
                                <td className="border border-black p-2 text-right font-medium">{formatCurrency(runningBalance)}</td>
                            </tr>
                        );
                    })}

                    {/* BARIS TOTAL */}
                    <tr className="font-bold bg-gray-100 break-inside-avoid">
                        <td colSpan={3} className="border border-black p-2 text-right uppercase">Total Mutasi</td>
                        <td className="border border-black p-2 text-right text-emerald-700">{formatCurrency(totalDebit)}</td>
                        <td className="border border-black p-2 text-right text-rose-700">{formatCurrency(totalKredit)}</td>
                        <td className="border border-black p-2 bg-gray-200"></td>
                    </tr>
                    <tr className="font-black bg-gray-200 text-[10pt] break-inside-avoid">
                        <td colSpan={5} className="border border-black p-2 text-right uppercase">SALDO AKHIR PERIODE INI</td>
                        <td className="border border-black p-2 text-right">{formatCurrency(saldoAkhir)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-end gap-16 text-center mt-12 break-inside-avoid">
            <div className="w-48">
                <p className="mb-16">Dibuat Oleh,</p>
                <p className="font-bold underline uppercase">{data.disiapkanOleh}</p>
                <p className="text-xs mt-1">Admin / Kasir</p>
            </div>
            <div className="w-48">
                <p className="mb-16">Disetujui Oleh,</p>
                <p className="font-bold underline uppercase">{data.disetujuiOleh}</p>
                <p className="text-xs mt-1">Manager / Pimpinan</p>
            </div>
        </div>
      </Kertas>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Buku Kas Harian</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-sky-600" /> Input Kas</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('pengaturan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pengaturan' ? 'bg-white border-t-2 border-slate-700 text-slate-800' : 'text-slate-500 hover:bg-slate-200'}`}>1. Pengaturan & Saldo</button>
                <button onClick={() => setActiveTab('transaksi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'transaksi' ? 'bg-white border-t-2 border-sky-500 text-sky-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Mutasi Transaksi</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pengaturan' && (
                <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <BookOpen size={14} className="text-slate-600"/> Kop Laporan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan / Toko</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.namaPerusahaan} onChange={e => handleDataChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Judul Laporan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.judulLaporan} onChange={e => handleDataChange('judulLaporan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Periode / Tanggal</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.periode} onChange={e => handleDataChange('periode', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Wallet size={14} className="text-emerald-600"/> Saldo & Pengesahan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saldo Awal (Rp)</label>
                            <input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.saldoAwal} onChange={e => handleDataChange('saldoAwal', Number(e.target.value))} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Disiapkan Oleh (Admin/Kasir)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.disiapkanOleh} onChange={e => handleDataChange('disiapkanOleh', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Disetujui Oleh (Manager)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.disetujuiOleh} onChange={e => handleDataChange('disetujuiOleh', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'transaksi' && (
                 <div className="space-y-4">
                    {/* SUMMARY CARDS */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Total Penerimaan (Debit)</p>
                            <p className="text-lg font-black text-emerald-700">Rp {formatCurrency(transactions.reduce((sum, tx) => sum + (Number(tx.debit) || 0), 0))}</p>
                        </div>
                        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                            <p className="text-[9px] font-bold text-rose-600 uppercase tracking-wider mb-1">Total Pengeluaran (Kredit)</p>
                            <p className="text-lg font-black text-rose-700">Rp {formatCurrency(transactions.reduce((sum, tx) => sum + (Number(tx.kredit) || 0), 0))}</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => addTransaction('debit')} className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-2 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-1 transition-colors"><Plus size={14}/> Tambah Pemasukan</button>
                        <button onClick={() => addTransaction('kredit')} className="flex-1 bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-2 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-1 transition-colors"><Plus size={14}/> Tambah Pengeluaran</button>
                    </div>

                    <div className="space-y-3 mt-4">
                        {transactions.map((tx, index) => (
                            <div key={tx.id} className={`bg-white rounded-xl shadow-sm border p-4 relative ${tx.debit > 0 ? 'border-l-4 border-emerald-500 border-t-slate-200 border-r-slate-200 border-b-slate-200' : 'border-l-4 border-rose-500 border-t-slate-200 border-r-slate-200 border-b-slate-200'}`}>
                                <button onClick={() => removeTransaction(tx.id)} className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 size={14}/></button>
                                
                                <div className="grid grid-cols-2 gap-2 mb-2 pr-6">
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Tgl</label>
                                        <input className="w-full bg-slate-50 p-1.5 border border-slate-200 rounded text-xs focus:bg-white outline-none" value={tx.tanggal} onChange={e => handleTxChange(tx.id, 'tanggal', e.target.value)} placeholder="01/07/26" />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase">No Bukti</label>
                                        <input className="w-full bg-slate-50 p-1.5 border border-slate-200 rounded text-xs focus:bg-white outline-none" value={tx.noBukti} onChange={e => handleTxChange(tx.id, 'noBukti', e.target.value)} placeholder="BKM-001" />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase">Keterangan</label>
                                    <input className="w-full bg-slate-50 p-1.5 border border-slate-200 rounded text-xs focus:bg-white outline-none" value={tx.keterangan} onChange={e => handleTxChange(tx.id, 'keterangan', e.target.value)} placeholder="Uraian transaksi..." />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-[9px] font-bold text-emerald-600 uppercase">Masuk (Debit)</label>
                                        <input type="number" className="w-full bg-emerald-50 p-1.5 border border-emerald-200 rounded text-xs font-bold text-emerald-700 focus:bg-white outline-none" value={tx.debit} onChange={e => handleTxChange(tx.id, 'debit', Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-rose-600 uppercase">Keluar (Kredit)</label>
                                        <input type="number" className="w-full bg-rose-50 p-1.5 border border-rose-200 rounded text-xs font-bold text-rose-700 focus:bg-white outline-none" value={tx.kredit} onChange={e => handleTxChange(tx.id, 'kredit', Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Buku_Kas_Harian" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
