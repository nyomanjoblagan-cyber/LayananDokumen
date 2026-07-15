'use client';

import React, { useState, Suspense, useEffect, useMemo } from 'react';
import { Printer, ArrowLeftCircle, Edit3, RotateCcw, Plus, Trash2, Wallet, Calculator } from 'lucide-react';
import Link from 'next/link';
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

// --- 2. KERTAS MUTLAK (Standard Kloter 3) ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-sans leading-relaxed text-[10pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 3. HELPER FUNCTIONS ---
const formatCurrency = (amount: number) => {
  if (amount === 0) return '-';
  return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
};

export default function BukuKasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Laporan...</div>}>
      <BukuKasToolBuilder />
    </Suspense>
  );
}

function BukuKasToolBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<KasData>(INITIAL_DATA);
  const [transactions, setTransactions] = useState<KasTransaction[]>(INITIAL_TX);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setData(prev => ({ ...prev, [name]: type === 'number' ? Number(value) || 0 : value }));
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
        setData(INITIAL_DATA);
        setTransactions(INITIAL_TX);
    }
  };

  // Calculations
  const calculatedTransactions = useMemo(() => {
    let currentSaldo = data.saldoAwal;
    return transactions.map(tx => {
      currentSaldo = currentSaldo + (tx.debit || 0) - (tx.kredit || 0);
      return { ...tx, saldo: currentSaldo };
    });
  }, [data.saldoAwal, transactions]);

  const totalDebit = transactions.reduce((sum, tx) => sum + (tx.debit || 0), 0);
  const totalKredit = transactions.reduce((sum, tx) => sum + (tx.kredit || 0), 0);
  const saldoAkhir = data.saldoAwal + totalDebit - totalKredit;

  const DocumentContent = () => (
    <Kertas>
      {/* KOP LAPORAN */}
      <div className="text-center mb-6 break-inside-avoid">
        <h1 className="text-xl font-bold uppercase tracking-widest mb-1 text-slate-900 font-serif">{data.namaPerusahaan}</h1>
        <h2 className="text-lg font-bold uppercase underline tracking-widest text-slate-800">{data.judulLaporan}</h2>
        <p className="text-sm mt-1 font-semibold text-slate-700">Periode: {data.periode}</p>
      </div>

      {/* TABLE KAS */}
      <div className="mb-8 min-h-[400px]">
        <table className="w-full border-collapse border border-slate-900 text-sm">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-slate-900 p-2 text-center w-16 font-bold">Tgl</th>
              <th className="border border-slate-900 p-2 text-center w-24 font-bold">No. Bukti</th>
              <th className="border border-slate-900 p-2 text-center font-bold">Uraian / Keterangan</th>
              <th className="border border-slate-900 p-2 text-center w-32 font-bold">Debit (Rp)</th>
              <th className="border border-slate-900 p-2 text-center w-32 font-bold">Kredit (Rp)</th>
              <th className="border border-slate-900 p-2 text-center w-32 font-bold">Saldo (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {/* Saldo Awal */}
            <tr className="bg-slate-50">
              <td colSpan={3} className="border border-slate-900 p-2 text-right font-bold italic pr-4">Saldo Awal</td>
              <td className="border border-slate-900 p-2 text-right font-mono font-semibold text-emerald-700">{data.saldoAwal > 0 ? formatCurrency(data.saldoAwal) : '-'}</td>
              <td className="border border-slate-900 p-2 text-right font-mono font-semibold">-</td>
              <td className="border border-slate-900 p-2 text-right font-mono font-bold bg-slate-100">{formatCurrency(data.saldoAwal)}</td>
            </tr>

            {/* Transactions */}
            {calculatedTransactions.map((tx) => (
              <tr key={tx.id}>
                <td className="border border-slate-900 p-2 text-center text-xs align-top">{tx.tanggal}</td>
                <td className="border border-slate-900 p-2 text-center font-mono text-xs align-top">{tx.noBukti}</td>
                <td className="border border-slate-900 p-2 align-top text-justify leading-relaxed">{tx.keterangan}</td>
                <td className="border border-slate-900 p-2 text-right font-mono align-top">{formatCurrency(tx.debit)}</td>
                <td className="border border-slate-900 p-2 text-right font-mono align-top">{formatCurrency(tx.kredit)}</td>
                <td className="border border-slate-900 p-2 text-right font-mono font-bold bg-slate-50 align-top">{formatCurrency(tx.saldo)}</td>
              </tr>
            ))}

            {/* Empty rows filler */}
            {Array.from({ length: Math.max(0, 15 - calculatedTransactions.length) }).map((_, idx) => (
              <tr key={`empty-${idx}`} className="h-8">
                <td className="border border-slate-900"></td>
                <td className="border border-slate-900"></td>
                <td className="border border-slate-900"></td>
                <td className="border border-slate-900"></td>
                <td className="border border-slate-900"></td>
                <td className="border border-slate-900 bg-slate-50"></td>
              </tr>
            ))}

            {/* Totals */}
            <tr className="font-bold border-t-2 border-slate-900 bg-slate-100">
              <td colSpan={3} className="border border-slate-900 p-2 text-center uppercase tracking-widest text-sm">Total Mutasi & Saldo Akhir</td>
              <td className="border border-slate-900 p-2 text-right font-mono text-emerald-700">{formatCurrency(totalDebit)}</td>
              <td className="border border-slate-900 p-2 text-right font-mono text-rose-700">{formatCurrency(totalKredit)}</td>
              <td className="border border-slate-900 p-2 text-right font-mono text-base border-l-2 bg-slate-200 decoration-double underline">{formatCurrency(saldoAkhir)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* REKAPITULASI & PENGESAHAN */}
      <div className="flex justify-between items-start mb-8 break-inside-avoid">
        {/* Ringkasan Box */}
        <div className="w-[45%] border-2 border-slate-900 p-4 bg-slate-50 text-sm shadow-sm rounded-sm">
          <p className="font-bold border-b border-slate-900 pb-2 mb-3 text-center uppercase tracking-widest text-slate-800">Ringkasan Mutasi</p>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-slate-600">Saldo Awal</span>
            <span className="font-mono font-bold">Rp {formatCurrency(data.saldoAwal)}</span>
          </div>
          <div className="flex justify-between mb-2 text-emerald-700">
            <span className="font-semibold">Total Pemasukan</span>
            <span className="font-mono">Rp {formatCurrency(totalDebit)}</span>
          </div>
          <div className="flex justify-between mb-3 text-rose-700">
            <span className="font-semibold">Total Pengeluaran</span>
            <span className="font-mono">Rp {formatCurrency(totalKredit)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-900 font-bold text-base">
            <span className="uppercase text-slate-800">Saldo Akhir</span>
            <span className="font-mono underline decoration-double">Rp {formatCurrency(saldoAkhir)}</span>
          </div>
        </div>
        
        {/* Tanda Tangan */}
        <div className="w-[50%] flex justify-end gap-8 pr-4">
          <div className="text-center w-36">
            <p className="mb-20 text-sm font-semibold">Disiapkan Oleh,</p>
            <p className="font-bold underline uppercase">{data.disiapkanOleh}</p>
            <p className="text-xs text-slate-500 font-medium">Kasir / Finance</p>
          </div>
          <div className="text-center w-36">
            <p className="mb-20 text-sm font-semibold">Disetujui Oleh,</p>
            <p className="font-bold underline uppercase">{data.disetujuiOleh}</p>
            <p className="text-xs text-slate-500 font-medium">Manajer Keuangan</p>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-8 text-center text-xs text-slate-500 border-t border-slate-300 pt-3 italic break-inside-avoid">
        Dokumen Buku Kas Harian ini dicetak secara otomatis dari Sistem Keuangan {data.namaPerusahaan}.
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Buku Kas Harian</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Enterprise Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Laporan</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

 <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative ">
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
            <div>
              <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                <Wallet size={18} className="text-emerald-600" /> Editor Data Kas
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Kelola Pemasukan & Pengeluaran</p>
            </div>
            <button onClick={handleReset} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Reset Formulir">
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            
            {/* 1. Header Laporan */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">1. Header Laporan</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Perusahaan / Entitas</label>
                <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Judul Laporan</label>
                  <input type="text" name="judulLaporan" value={data.judulLaporan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Periode Laporan</label>
                  <input type="text" name="periode" value={data.periode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Saldo Awal (Rp)</label>
                <input type="number" name="saldoAwal" value={data.saldoAwal} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold font-mono text-emerald-700 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            {/* 2. Daftar Transaksi */}
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-100 p-2 rounded border-l-4 border-emerald-600">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Calculator size={16} /> Mutasi Kas
                </h3>
                <div className="flex gap-2">
                  <button onClick={() => addTransaction('debit')} className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1.5 rounded flex items-center gap-1 font-bold uppercase tracking-wider transition-colors shadow-sm">
                    <Plus size={12} /> Debit
                  </button>
                  <button onClick={() => addTransaction('kredit')} className="text-[10px] bg-rose-600 hover:bg-rose-700 text-white px-2 py-1.5 rounded flex items-center gap-1 font-bold uppercase tracking-wider transition-colors shadow-sm">
                    <Plus size={12} /> Kredit
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm relative group hover:border-slate-300 transition-colors">
                    <button onClick={() => removeTransaction(tx.id)} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 transition-colors p-1" title="Hapus Transaksi">
                      <Trash2 size={14} />
                    </button>
                    
                    <div className="grid grid-cols-12 gap-3 mt-1">
                      <div className="col-span-5">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Tgl</label>
                        <input type="text" value={tx.tanggal} onChange={(e) => handleTxChange(tx.id, 'tanggal', e.target.value)} className="w-full p-2 bg-slate-50 text-xs border border-slate-200 rounded text-center font-semibold focus:ring-1 focus:ring-blue-500 outline-none" placeholder="DD/MM/YY" />
                      </div>
                      <div className="col-span-7 pr-6">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">No. Bukti</label>
                        <input type="text" value={tx.noBukti} onChange={(e) => handleTxChange(tx.id, 'noBukti', e.target.value)} className="w-full p-2 bg-slate-50 text-xs border border-slate-200 rounded font-mono text-center focus:ring-1 focus:ring-blue-500 outline-none" placeholder="BKM-..." />
                      </div>
                      
                      <div className="col-span-12">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Keterangan / Uraian</label>
                        <input type="text" value={tx.keterangan} onChange={(e) => handleTxChange(tx.id, 'keterangan', e.target.value)} className="w-full p-2 bg-slate-50 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Deskripsi transaksi..." />
                      </div>
                      
                      <div className="col-span-6">
                        <label className="block text-[9px] font-bold text-emerald-600 uppercase">Debit (+ Masuk)</label>
                        <input type="number" value={tx.debit || ''} onChange={(e) => handleTxChange(tx.id, 'debit', parseInt(e.target.value) || 0)} className="w-full p-2 bg-emerald-50 text-xs border border-emerald-100 rounded text-right font-mono font-bold text-emerald-700 focus:ring-1 focus:ring-emerald-500 outline-none" placeholder="0" />
                      </div>
                      <div className="col-span-6">
                        <label className="block text-[9px] font-bold text-rose-600 uppercase">Kredit (- Keluar)</label>
                        <input type="number" value={tx.kredit || ''} onChange={(e) => handleTxChange(tx.id, 'kredit', parseInt(e.target.value) || 0)} className="w-full p-2 bg-rose-50 text-xs border border-rose-100 rounded text-right font-mono font-bold text-rose-700 focus:ring-1 focus:ring-rose-500 outline-none" placeholder="0" />
                      </div>
                    </div>
                  </div>
                ))}

                {transactions.length === 0 && (
                  <div className="text-center p-6 bg-slate-50 border border-slate-200 border-dashed rounded-lg text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    Belum ada transaksi mutasi
                  </div>
                )}
              </div>
            </div>

            {/* 3. Pengesahan Laporan */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">3. Pengesahan Laporan</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Disiapkan Oleh</label>
                  <input type="text" name="disiapkanOleh" value={data.disiapkanOleh} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Disetujui Oleh</label>
                  <input type="text" name="disetujuiOleh" value={data.disetujuiOleh} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="pb-10"></div>
          </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Laporan Buku Kas" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT DENGAN POSISI YANG BENAR UNTUK MENGHINDARI BUG BLANK PRINT */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
