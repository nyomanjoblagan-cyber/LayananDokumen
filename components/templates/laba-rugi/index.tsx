'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Eye, LayoutTemplate, Calculator, DollarSign, FileSpreadsheet, Activity, Scale
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface IncomeStatementData {
  companyName: string;
  periodEnd: string;
  currency: string;
  
  // Revenues
  grossSales: number;
  salesReturns: number;
  salesDiscounts: number;
  
  // COGS
  beginningInventory: number;
  purchases: number;
  freightIn: number;
  endingInventory: number;
  
  // Selling Expenses
  advertising: number;
  salesSalaries: number;
  deliveryExpense: number;
  otherSelling: number;
  
  // Admin Expenses
  officeSalaries: number;
  rent: number;
  utilities: number;
  depreciation: number;
  insurance: number;
  otherAdmin: number;
  
  // Other
  interestIncome: number;
  interestExpense: number;
  gainOnSaleOfAssets: number;
  otherIncomeExpense: number;
  
  // Tax
  taxRatePercentage: number;
  
  // Signatures
  preparedBy: string;
  approvedBy: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IncomeStatementData = {
  companyName: 'PT. MAJU JAYA BERSAMA',
  periodEnd: '31 Desember 2026',
  currency: 'IDR',
  
  // Revenues
  grossSales: 1500000000,
  salesReturns: 25000000,
  salesDiscounts: 15000000,
  
  // COGS
  beginningInventory: 200000000,
  purchases: 800000000,
  freightIn: 15000000,
  endingInventory: 180000000,
  
  // Selling Expenses
  advertising: 45000000,
  salesSalaries: 120000000,
  deliveryExpense: 35000000,
  otherSelling: 10000000,
  
  // Admin Expenses
  officeSalaries: 150000000,
  rent: 60000000,
  utilities: 24000000,
  depreciation: 40000000,
  insurance: 12000000,
  otherAdmin: 15000000,
  
  // Other
  interestIncome: 5000000,
  interestExpense: 25000000,
  gainOnSaleOfAssets: 0,
  otherIncomeExpense: 0,
  
  // Tax
  taxRatePercentage: 22,
  
  // Signatures
  preparedBy: 'Andi Kusuma',
  approvedBy: 'Budi Santoso'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] print:p-0 text-black font-sans leading-snug text-[10pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function LabaRugiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Laba Rugi...</div>}>
      <LabaRugiBuilder />
    </Suspense>
  );
}

function LabaRugiBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IncomeStatementData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNumChange = (field: keyof IncomeStatementData, val: string) => {
    setData(prev => ({ ...prev, [field]: Number(val) || 0 }));
  };

  const handleTextChange = (field: keyof IncomeStatementData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculations
  const netSales = data.grossSales - data.salesReturns - data.salesDiscounts;
  const totalCogs = data.beginningInventory + data.purchases + data.freightIn - data.endingInventory;
  const grossProfit = netSales - totalCogs;
  
  const totalSellingExpenses = data.advertising + data.salesSalaries + data.deliveryExpense + data.otherSelling;
  const totalAdminExpenses = data.officeSalaries + data.rent + data.utilities + data.depreciation + data.insurance + data.otherAdmin;
  const totalOperatingExpenses = totalSellingExpenses + totalAdminExpenses;
  
  const operatingIncome = grossProfit - totalOperatingExpenses;
  
  const netOtherIncomeExpense = data.interestIncome - data.interestExpense + data.gainOnSaleOfAssets + data.otherIncomeExpense;
  
  const earningsBeforeTax = operatingIncome + netOtherIncomeExpense;
  const incomeTaxExpense = earningsBeforeTax > 0 ? (earningsBeforeTax * data.taxRatePercentage) / 100 : 0;
  const netIncome = earningsBeforeTax - incomeTaxExpense;

  const DocumentContent = () => (
    <Kertas>
        <style dangerouslySetInnerHTML={{__html: `
          .row-hover:hover { background-color: #f3f4f6; }
        `}} />

        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-black pb-4 break-inside-avoid">
          <h1 className="text-2xl font-bold uppercase tracking-wider mb-1" style={{ fontSize: '18pt' }}>{data.companyName}</h1>
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-800" style={{ fontSize: '14pt' }}>Laporan Laba Rugi</h2>
          <p className="text-sm italic mt-1 text-slate-700">Untuk Periode yang Berakhir pada {data.periodEnd}</p>
          <p className="text-xs text-slate-600 mt-1">(Disajikan dalam Rupiah)</p>
        </div>

        {/* Content Table */}
        <div className="w-full text-[10pt] leading-tight px-4 break-inside-auto">
          
          {/* REVENUES */}
          <div className="mb-4 break-inside-avoid">
            <div className="font-bold border-b border-black mb-1 uppercase">Pendapatan</div>
            <div className="flex justify-between py-1 row-hover">
              <span>Penjualan Bruto</span>
              <span className="font-mono">{formatCurrency(data.grossSales)}</span>
            </div>
            <div className="flex justify-between py-1 text-red-700 row-hover">
              <span className="pl-4">Dikurangi: Retur Penjualan</span>
              <span className="font-mono">({formatCurrency(data.salesReturns)})</span>
            </div>
            <div className="flex justify-between py-1 text-red-700 row-hover">
              <span className="pl-4">Dikurangi: Potongan Penjualan</span>
              <span className="font-mono">({formatCurrency(data.salesDiscounts)})</span>
            </div>
            <div className="flex justify-between py-1 mt-1 font-bold border-t border-slate-400">
              <span>Penjualan Bersih</span>
              <span className="font-mono">{formatCurrency(netSales)}</span>
            </div>
          </div>

          {/* COGS */}
          <div className="mb-4 break-inside-avoid">
            <div className="font-bold border-b border-black mb-1 uppercase mt-4">Harga Pokok Penjualan</div>
            <div className="flex justify-between py-1 row-hover">
              <span>Persediaan Awal</span>
              <span className="font-mono">{formatCurrency(data.beginningInventory)}</span>
            </div>
            <div className="flex justify-between py-1 row-hover">
              <span className="pl-4">Pembelian</span>
              <span className="font-mono">{formatCurrency(data.purchases)}</span>
            </div>
            <div className="flex justify-between py-1 row-hover">
              <span className="pl-4">Beban Angkut Pembelian</span>
              <span className="font-mono">{formatCurrency(data.freightIn)}</span>
            </div>
            <div className="flex justify-between py-1 text-red-700 row-hover">
              <span className="pl-4">Dikurangi: Persediaan Akhir</span>
              <span className="font-mono">({formatCurrency(data.endingInventory)})</span>
            </div>
            <div className="flex justify-between py-1 mt-1 font-bold border-t border-slate-400 text-red-700">
              <span>Total Harga Pokok Penjualan</span>
              <span className="font-mono">({formatCurrency(totalCogs)})</span>
            </div>
          </div>

          {/* GROSS PROFIT */}
          <div className="flex justify-between py-2 px-2 font-bold text-[11pt] bg-slate-200 border-y-2 border-black mb-6 break-inside-avoid print:bg-slate-200" style={{WebkitPrintColorAdjust: "exact"}}>
            <span className="uppercase">Laba Kotor</span>
            <span className="font-mono">{formatCurrency(grossProfit)}</span>
          </div>

          {/* OPERATING EXPENSES */}
          <div className="mb-4 flex flex-col md:flex-row gap-4 break-inside-avoid">
            <div className="flex-1">
              <div className="font-bold border-b border-slate-400 mb-1 italic text-[9pt]">Beban Penjualan</div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Beban Iklan</span><span className="font-mono">{formatCurrency(data.advertising)}</span>
              </div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Gaji Bagian Penjualan</span><span className="font-mono">{formatCurrency(data.salesSalaries)}</span>
              </div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Beban Pengiriman</span><span className="font-mono">{formatCurrency(data.deliveryExpense)}</span>
              </div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Lain-lain</span><span className="font-mono">{formatCurrency(data.otherSelling)}</span>
              </div>
              <div className="flex justify-between py-[4px] mt-1 font-bold border-t border-dashed border-slate-300">
                <span>Total Beban Penjualan</span><span className="font-mono">{formatCurrency(totalSellingExpenses)}</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="font-bold border-b border-slate-400 mb-1 italic text-[9pt]">Beban Administrasi & Umum</div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Gaji Bagian Kantor</span><span className="font-mono">{formatCurrency(data.officeSalaries)}</span>
              </div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Beban Sewa</span><span className="font-mono">{formatCurrency(data.rent)}</span>
              </div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Beban Utilitas</span><span className="font-mono">{formatCurrency(data.utilities)}</span>
              </div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Beban Penyusutan</span><span className="font-mono">{formatCurrency(data.depreciation)}</span>
              </div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Beban Asuransi</span><span className="font-mono">{formatCurrency(data.insurance)}</span>
              </div>
              <div className="flex justify-between py-[2px] row-hover">
                <span>Lain-lain</span><span className="font-mono">{formatCurrency(data.otherAdmin)}</span>
              </div>
              <div className="flex justify-between py-[4px] mt-1 font-bold border-t border-dashed border-slate-300">
                <span>Total Beban Admin & Umum</span><span className="font-mono">{formatCurrency(totalAdminExpenses)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between py-1 mt-2 font-bold border-t border-slate-400 text-red-700 break-inside-avoid">
            <span>Total Beban Operasional</span>
            <span className="font-mono">({formatCurrency(totalOperatingExpenses)})</span>
          </div>

          {/* OPERATING INCOME */}
          <div className="flex justify-between py-2 px-2 font-bold text-[11pt] bg-slate-100 border-y border-black mb-6 mt-4 break-inside-avoid print:bg-slate-100" style={{WebkitPrintColorAdjust: "exact"}}>
            <span className="uppercase">Laba Operasional</span>
            <span className="font-mono">{formatCurrency(operatingIncome)}</span>
          </div>

          {/* OTHER INCOME AND EXPENSES */}
          <div className="mb-4 break-inside-avoid">
            <div className="font-bold border-b border-black mb-1 uppercase mt-4">Pendapatan dan (Beban) Lain-lain</div>
            <div className="flex justify-between py-1 row-hover">
              <span>Pendapatan Bunga</span>
              <span className="font-mono">{formatCurrency(data.interestIncome)}</span>
            </div>
            <div className="flex justify-between py-1 text-red-700 row-hover">
              <span>Beban Bunga</span>
              <span className="font-mono">({formatCurrency(data.interestExpense)})</span>
            </div>
            {data.gainOnSaleOfAssets > 0 && (
              <div className="flex justify-between py-1 row-hover">
                <span>Keuntungan Penjualan Aset</span>
                <span className="font-mono">{formatCurrency(data.gainOnSaleOfAssets)}</span>
              </div>
            )}
            {data.otherIncomeExpense !== 0 && (
              <div className="flex justify-between py-1 row-hover">
                <span>Lain-lain</span>
                <span className="font-mono">{formatCurrency(data.otherIncomeExpense)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 mt-1 font-bold border-t border-slate-400">
              <span>Total Pendapatan (Beban) Lain-lain</span>
              <span className="font-mono">{formatCurrency(netOtherIncomeExpense)}</span>
            </div>
          </div>

          {/* EARNINGS BEFORE TAX */}
          <div className="flex justify-between py-1 px-2 font-bold bg-slate-50 border-t-2 border-slate-400 mb-2 mt-4 break-inside-avoid print:bg-slate-50" style={{WebkitPrintColorAdjust: "exact"}}>
            <span className="uppercase">Laba Sebelum Pajak</span>
            <span className="font-mono">{formatCurrency(earningsBeforeTax)}</span>
          </div>

          {/* TAX */}
          <div className="flex justify-between py-1 px-2 text-red-700 mb-4 row-hover break-inside-avoid">
            <span className="uppercase">Beban Pajak Penghasilan ({data.taxRatePercentage}%)</span>
            <span className="font-mono">({formatCurrency(incomeTaxExpense)})</span>
          </div>

          {/* NET INCOME */}
          <div className="flex justify-between py-3 px-4 font-bold text-[13pt] border-y-4 border-double border-black mt-6 break-inside-avoid">
            <span className="uppercase tracking-wider">Laba Bersih</span>
            <span className={`font-mono ${netIncome < 0 ? 'text-red-700' : ''}`}>
              {netIncome < 0 ? `(${formatCurrency(Math.abs(netIncome))})` : formatCurrency(netIncome)}
            </span>
          </div>

        </div>
        
        {/* Signatures */}
        <div className="mt-16 flex justify-between px-16 text-[10pt] break-inside-avoid shrink-0">
          <div className="text-center">
            <p className="mb-20">Disiapkan Oleh,</p>
            <p className="font-bold underline">{data.preparedBy}</p>
            <p>Manajer Keuangan</p>
          </div>
          <div className="text-center">
            <p className="mb-20">Disetujui Oleh,</p>
            <p className="font-bold underline">{data.approvedBy}</p>
            <p>Direktur Utama</p>
          </div>
        </div>
        
        <div className="mt-12 text-center text-[8pt] text-slate-500 border-t border-slate-300 pt-2 break-inside-avoid shrink-0">
          Dokumen ini dihasilkan secara otomatis oleh sistem.
        </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Laporan Laba Rugi</h1>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Enterprise Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:hidden">
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
            <div>
              <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                <Calculator size={18} className="text-emerald-600" /> Editor Laba Rugi
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lengkapi data nominal</p>
            </div>
            <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-lg transition-colors" title="Reset Formulir">
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-slate-600 text-sm">Identitas Perusahaan</h3>
              <div className="space-y-3">
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Perusahaan</label>
                    <input type="text" value={data.companyName} onChange={(e) => handleTextChange('companyName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Periode</label>
                    <input type="text" value={data.periodEnd} onChange={(e) => handleTextChange('periodEnd', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-emerald-50 p-2 rounded border-l-4 border-emerald-600 text-sm text-emerald-900">Pendapatan</h3>
              <div className="space-y-3">
                 <div>
                    <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Penjualan Bruto</label>
                    <input type="number" value={data.grossSales} onChange={(e) => handleNumChange('grossSales', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1">Retur Penjualan</label>
                    <input type="number" value={data.salesReturns} onChange={(e) => handleNumChange('salesReturns', e.target.value)} className="w-full bg-slate-50 border border-rose-200 rounded-lg p-2 text-sm font-mono text-right text-rose-600 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1">Diskon Penjualan</label>
                    <input type="number" value={data.salesDiscounts} onChange={(e) => handleNumChange('salesDiscounts', e.target.value)} className="w-full bg-slate-50 border border-rose-200 rounded-lg p-2 text-sm font-mono text-right text-rose-600 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-amber-50 p-2 rounded border-l-4 border-amber-600 text-sm text-amber-900">Harga Pokok Penjualan</h3>
              <div className="space-y-3">
                 <div>
                    <label className="block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Persediaan Awal</label>
                    <input type="number" value={data.beginningInventory} onChange={(e) => handleNumChange('beginningInventory', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Pembelian</label>
                    <input type="number" value={data.purchases} onChange={(e) => handleNumChange('purchases', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Beban Angkut Pembelian</label>
                    <input type="number" value={data.freightIn} onChange={(e) => handleNumChange('freightIn', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1">Persediaan Akhir</label>
                    <input type="number" value={data.endingInventory} onChange={(e) => handleNumChange('endingInventory', e.target.value)} className="w-full bg-slate-50 border border-rose-200 rounded-lg p-2 text-sm font-mono text-right text-rose-600 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-rose-50 p-2 rounded border-l-4 border-rose-600 text-sm text-rose-900">Beban Penjualan</h3>
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Beban Iklan</label>
                    <input type="number" value={data.advertising} onChange={(e) => handleNumChange('advertising', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Gaji Sales</label>
                    <input type="number" value={data.salesSalaries} onChange={(e) => handleNumChange('salesSalaries', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Pengiriman</label>
                    <input type="number" value={data.deliveryExpense} onChange={(e) => handleNumChange('deliveryExpense', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Lainnya</label>
                    <input type="number" value={data.otherSelling} onChange={(e) => handleNumChange('otherSelling', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-orange-50 p-2 rounded border-l-4 border-orange-600 text-sm text-orange-900">Beban Administrasi & Umum</h3>
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Gaji Kantor</label>
                    <input type="number" value={data.officeSalaries} onChange={(e) => handleNumChange('officeSalaries', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-orange-500 outline-none" />
                 </div>
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Beban Sewa</label>
                    <input type="number" value={data.rent} onChange={(e) => handleNumChange('rent', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-orange-500 outline-none" />
                 </div>
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Listrik / Air</label>
                    <input type="number" value={data.utilities} onChange={(e) => handleNumChange('utilities', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-orange-500 outline-none" />
                 </div>
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Penyusutan</label>
                    <input type="number" value={data.depreciation} onChange={(e) => handleNumChange('depreciation', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-orange-500 outline-none" />
                 </div>
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Asuransi</label>
                    <input type="number" value={data.insurance} onChange={(e) => handleNumChange('insurance', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-orange-500 outline-none" />
                 </div>
                 <div className="flex items-center gap-3">
                    <label className="w-1/3 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Lainnya</label>
                    <input type="number" value={data.otherAdmin} onChange={(e) => handleNumChange('otherAdmin', e.target.value)} className="w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-orange-500 outline-none" />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-blue-50 p-2 rounded border-l-4 border-blue-600 text-sm text-blue-900">Lain-lain & Pajak</h3>
              <div className="space-y-3">
                 <div>
                    <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Pendapatan Bunga</label>
                    <input type="number" value={data.interestIncome} onChange={(e) => handleNumChange('interestIncome', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1">Beban Bunga</label>
                    <input type="number" value={data.interestExpense} onChange={(e) => handleNumChange('interestExpense', e.target.value)} className="w-full bg-slate-50 border border-rose-200 rounded-lg p-2 text-sm font-mono text-right text-rose-600 focus:ring-2 focus:ring-rose-500 outline-none" />
                 </div>
                 <div className="flex items-center gap-3">
                    <label className="w-1/2 block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Persen Pajak (%)</label>
                    <input type="number" value={data.taxRatePercentage} onChange={(e) => handleNumChange('taxRatePercentage', e.target.value)} className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono text-right text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-slate-600 text-sm">Penandatangan</h3>
              <div className="space-y-3">
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Disiapkan Oleh (Manajer Keu.)</label>
                    <input type="text" value={data.preparedBy} onChange={(e) => handleTextChange('preparedBy', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-slate-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Disetujui Oleh (Direktur Utama)</label>
                    <input type="text" value={data.approvedBy} onChange={(e) => handleTextChange('approvedBy', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-slate-500 outline-none" />
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
         <PrintWrapper documentName="Laporan_Laba_Rugi" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
