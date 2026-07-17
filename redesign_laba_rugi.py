import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\laba-rugi\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: LabaRugiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Dokumen Laporan Laba Rugi (Income Statement)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Building2, Calculator, Wallet, Percent, FileText, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
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
  preparedBy: 'Andi Kusuma (Finance Mgr)',
  approvedBy: 'Budi Santoso (Direktur)'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function LabaRugiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Finansial...</div>}>
      <FinancialBuilder />
    </Suspense>
  );
}

function FinancialBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IncomeStatementData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'revCogs' | 'opex' | 'other'>('info');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof IncomeStatementData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset laporan keuangan ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
  };

  const formatCurrency = (num: number) => {
      // Bracket format for negative numbers (Accounting style)
      if (num < 0) return `(${formatNumber(Math.abs(num))})`;
      return formatNumber(num);
  };

  // --- KALKULASI FINANSIAL SAKTI ---
  const netSales = data.grossSales - data.salesReturns - data.salesDiscounts;
  const costOfGoodsSold = data.beginningInventory + data.purchases + data.freightIn - data.endingInventory;
  const grossProfit = netSales - costOfGoodsSold;
  
  const totalSellingExpenses = data.advertising + data.salesSalaries + data.deliveryExpense + data.otherSelling;
  const totalAdminExpenses = data.officeSalaries + data.rent + data.utilities + data.depreciation + data.insurance + data.otherAdmin;
  const totalOperatingExpenses = totalSellingExpenses + totalAdminExpenses;
  
  const operatingIncome = grossProfit - totalOperatingExpenses;
  
  const totalOtherIncome = data.interestIncome + data.gainOnSaleOfAssets + data.otherIncomeExpense;
  const totalOtherExpenses = data.interestExpense;
  const netOtherIncomeExpense = totalOtherIncome - totalOtherExpenses;
  
  const incomeBeforeTax = operatingIncome + netOtherIncomeExpense;
  const taxExpense = incomeBeforeTax > 0 ? (incomeBeforeTax * (data.taxRatePercentage / 100)) : 0;
  const netIncome = incomeBeforeTax - taxExpense;

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => {
    return (
      <Kertas>
        {/* KOP / JUDUL */}
        <div className="text-center mb-8 border-b-2 border-slate-900 pb-4 break-inside-avoid">
            <h1 className="font-black text-2xl uppercase tracking-widest text-slate-900">{data.companyName}</h1>
            <h2 className="font-bold text-lg uppercase tracking-wider text-slate-700 mt-1">Laporan Laba Rugi (Income Statement)</h2>
            <p className="text-sm font-semibold text-slate-500 uppercase mt-1">Periode Berakhir pada {data.periodEnd}</p>
            <p className="text-xs text-slate-500 mt-1">(Dalam {data.currency})</p>
        </div>

        {/* TABEL LABA RUGI ACCOUNTING FORMAT */}
        <div className="mb-8 break-inside-avoid">
            <table className="w-full text-[11px] font-sans">
                <tbody>
                    {/* PENDAPATAN (REVENUE) */}
                    <tr><td colSpan={3} className="font-black uppercase pb-2 text-slate-900">Pendapatan (Revenues)</td></tr>
                    <tr><td className="pl-4 pb-1">Penjualan Kotor (Gross Sales)</td><td className="w-8">Rp</td><td className="text-right font-mono pb-1">{formatCurrency(data.grossSales)}</td></tr>
                    <tr><td className="pl-4 pb-1">Retur Penjualan (Sales Returns)</td><td className="w-8"></td><td className="text-right font-mono text-rose-700 pb-1">{formatCurrency(-data.salesReturns)}</td></tr>
                    <tr><td className="pl-4 pb-1">Potongan Penjualan (Sales Discounts)</td><td className="w-8 border-b border-black"></td><td className="text-right font-mono text-rose-700 border-b border-black pb-1">{formatCurrency(-data.salesDiscounts)}</td></tr>
                    <tr><td className="font-bold pl-8 pb-4">Penjualan Bersih (Net Sales)</td><td className="w-8 font-bold">Rp</td><td className="text-right font-mono font-bold pb-4">{formatCurrency(netSales)}</td></tr>

                    {/* HPP (COGS) */}
                    <tr><td colSpan={3} className="font-black uppercase pb-2 text-slate-900">Harga Pokok Penjualan (Cost of Goods Sold)</td></tr>
                    <tr><td className="pl-4 pb-1">Persediaan Awal (Beginning Inventory)</td><td className="w-8">Rp</td><td className="text-right font-mono pb-1">{formatCurrency(data.beginningInventory)}</td></tr>
                    <tr><td className="pl-4 pb-1">Pembelian (Purchases)</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.purchases)}</td></tr>
                    <tr><td className="pl-4 pb-1">Biaya Angkut Pembelian (Freight In)</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.freightIn)}</td></tr>
                    <tr><td className="pl-4 pb-1">Persediaan Akhir (Ending Inventory)</td><td className="w-8 border-b border-black"></td><td className="text-right font-mono text-rose-700 border-b border-black pb-1">{formatCurrency(-data.endingInventory)}</td></tr>
                    <tr><td className="font-bold pl-8 pb-4">Total HPP (Total COGS)</td><td className="w-8 font-bold border-b-2 border-black">Rp</td><td className="text-right font-mono font-bold border-b-2 border-black pb-4 text-rose-800">{formatCurrency(-costOfGoodsSold)}</td></tr>

                    {/* LABA KOTOR */}
                    <tr className="bg-slate-100"><td className="font-black uppercase py-2 pl-2">Laba Kotor (Gross Profit)</td><td className="w-8 font-black py-2">Rp</td><td className="text-right font-mono font-black text-[13px] py-2 pr-2">{formatCurrency(grossProfit)}</td></tr>
                    <tr><td colSpan={3} className="h-4"></td></tr>

                    {/* BIAYA OPERASIONAL (OPEX) */}
                    <tr><td colSpan={3} className="font-black uppercase pb-2 text-slate-900">Biaya Operasional (Operating Expenses)</td></tr>
                    
                    {/* Selling Expenses */}
                    <tr><td colSpan={3} className="font-bold italic pl-4 pb-1 text-slate-700">Biaya Penjualan (Selling Expenses):</td></tr>
                    <tr><td className="pl-8 pb-1">Biaya Iklan (Advertising)</td><td className="w-8">Rp</td><td className="text-right font-mono pb-1">{formatCurrency(data.advertising)}</td></tr>
                    <tr><td className="pl-8 pb-1">Gaji Bagian Penjualan (Sales Salaries)</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.salesSalaries)}</td></tr>
                    <tr><td className="pl-8 pb-1">Biaya Pengiriman (Delivery Expense)</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.deliveryExpense)}</td></tr>
                    <tr><td className="pl-8 pb-1">Biaya Penjualan Lainnya</td><td className="w-8 border-b border-black"></td><td className="text-right font-mono border-b border-black pb-1">{formatCurrency(data.otherSelling)}</td></tr>
                    <tr><td className="font-bold pl-12 pb-3 text-slate-700">Total Biaya Penjualan</td><td className="w-8 font-bold text-slate-700">Rp</td><td className="text-right font-mono font-bold pb-3 text-slate-700">{formatCurrency(totalSellingExpenses)}</td></tr>

                    {/* Admin Expenses */}
                    <tr><td colSpan={3} className="font-bold italic pl-4 pb-1 text-slate-700">Biaya Administrasi & Umum (G&A Expenses):</td></tr>
                    <tr><td className="pl-8 pb-1">Gaji Kantor (Office Salaries)</td><td className="w-8">Rp</td><td className="text-right font-mono pb-1">{formatCurrency(data.officeSalaries)}</td></tr>
                    <tr><td className="pl-8 pb-1">Sewa (Rent)</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.rent)}</td></tr>
                    <tr><td className="pl-8 pb-1">Utilitas (Listrik/Air/Internet)</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.utilities)}</td></tr>
                    <tr><td className="pl-8 pb-1">Penyusutan (Depreciation)</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.depreciation)}</td></tr>
                    <tr><td className="pl-8 pb-1">Asuransi (Insurance)</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.insurance)}</td></tr>
                    <tr><td className="pl-8 pb-1">Biaya Admin Lainnya</td><td className="w-8 border-b border-black"></td><td className="text-right font-mono border-b border-black pb-1">{formatCurrency(data.otherAdmin)}</td></tr>
                    <tr><td className="font-bold pl-12 pb-3 text-slate-700">Total Biaya Admin & Umum</td><td className="w-8 font-bold text-slate-700">Rp</td><td className="text-right font-mono font-bold pb-3 text-slate-700">{formatCurrency(totalAdminExpenses)}</td></tr>
                    
                    <tr><td className="font-bold pl-4 pb-4">Total Biaya Operasional</td><td className="w-8 font-bold border-b-2 border-black">Rp</td><td className="text-right font-mono font-bold border-b-2 border-black pb-4 text-rose-800">{formatCurrency(-totalOperatingExpenses)}</td></tr>

                    {/* LABA OPERASIONAL */}
                    <tr className="bg-slate-100"><td className="font-black uppercase py-2 pl-2">Laba Operasional (Operating Income)</td><td className="w-8 font-black py-2">Rp</td><td className="text-right font-mono font-black text-[13px] py-2 pr-2">{formatCurrency(operatingIncome)}</td></tr>
                    <tr><td colSpan={3} className="h-4"></td></tr>

                    {/* LAIN-LAIN */}
                    <tr><td colSpan={3} className="font-black uppercase pb-2 text-slate-900">Pendapatan (Beban) Lain-lain</td></tr>
                    <tr><td className="pl-4 pb-1">Pendapatan Bunga (Interest Income)</td><td className="w-8">Rp</td><td className="text-right font-mono pb-1">{formatCurrency(data.interestIncome)}</td></tr>
                    <tr><td className="pl-4 pb-1">Keuntungan Penjualan Aset</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.gainOnSaleOfAssets)}</td></tr>
                    <tr><td className="pl-4 pb-1">Pendapatan (Beban) Lainnya</td><td className="w-8"></td><td className="text-right font-mono pb-1">{formatCurrency(data.otherIncomeExpense)}</td></tr>
                    <tr><td className="pl-4 pb-1">Beban Bunga (Interest Expense)</td><td className="w-8 border-b border-black"></td><td className="text-right font-mono text-rose-700 border-b border-black pb-1">{formatCurrency(-data.interestExpense)}</td></tr>
                    
                    {/* EBT & TAX */}
                    <tr><td className="font-bold pl-4 py-3">Laba Sebelum Pajak (EBT)</td><td className="w-8 font-bold py-3">Rp</td><td className="text-right font-mono font-bold py-3">{formatCurrency(incomeBeforeTax)}</td></tr>
                    <tr><td className="pl-4 pb-1">Beban Pajak Penghasilan (Tax Expense - {data.taxRatePercentage}%)</td><td className="w-8 border-b border-black">Rp</td><td className="text-right font-mono text-rose-700 border-b border-black pb-1">{formatCurrency(-taxExpense)}</td></tr>

                    {/* NET INCOME */}
                    <tr className="bg-emerald-50"><td className="font-black uppercase py-3 pl-2 text-emerald-900 border-b-4 border-double border-emerald-900">LABA BERSIH (NET INCOME)</td><td className="w-8 font-black py-3 text-emerald-900 border-b-4 border-double border-emerald-900">Rp</td><td className="text-right font-mono font-black text-lg py-3 pr-2 text-emerald-900 border-b-4 border-double border-emerald-900">{formatCurrency(netIncome)}</td></tr>
                </tbody>
            </table>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-between text-center break-inside-avoid mt-12 pt-6">
            <div className="w-64">
                <p className="mb-2 font-bold text-xs uppercase text-slate-500">Disiapkan Oleh:</p>
                <div className="h-16"></div>
                <p className="font-bold underline">{data.preparedBy}</p>
            </div>
            
            <div className="w-64">
                <p className="mb-2 font-bold text-xs uppercase text-slate-500">Disetujui Oleh:</p>
                <div className="h-16"></div>
                <p className="font-bold underline">{data.approvedBy}</p>
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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Laporan Laba Rugi</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-emerald-600" /> Financial Input</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'info' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Info</button>
                <button onClick={() => setActiveTab('revCogs')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'revCogs' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Rev & COGS</button>
                <button onClick={() => setActiveTab('opex')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'opex' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. OPEX</button>
                <button onClick={() => setActiveTab('other')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'other' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Lainnya</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'info' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Informasi Perusahaan & Laporan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Kop)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Periode Laporan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.periodEnd} onChange={e => handleDataChange('periodEnd', e.target.value)} placeholder="Misal: 31 Des 2026" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mata Uang</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none font-bold font-mono" value={data.currency} onChange={e => handleDataChange('currency', e.target.value)} placeholder="IDR, USD, dll" />
                            </div>
                        </div>
                        <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Disiapkan Oleh (Nama & Jabatan)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.preparedBy} onChange={e => handleDataChange('preparedBy', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Disetujui Oleh (Nama & Jabatan)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.approvedBy} onChange={e => handleDataChange('approvedBy', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'revCogs' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <TrendingUp size={14} className="text-emerald-600"/> Pendapatan (Revenues)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penjualan Kotor (Gross Sales)</label>
                            <input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-emerald-900" value={data.grossSales} onChange={e => handleDataChange('grossSales', Number(e.target.value))} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Retur Penjualan (-)</label>
                                <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-rose-700" value={data.salesReturns} onChange={e => handleDataChange('salesReturns', Number(e.target.value))} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Potongan Penjualan (-)</label>
                                <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-rose-700" value={data.salesDiscounts} onChange={e => handleDataChange('salesDiscounts', Number(e.target.value))} />
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Wallet size={14} className="text-blue-600"/> Harga Pokok Penjualan (COGS)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Persediaan Awal</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.beginningInventory} onChange={e => handleDataChange('beginningInventory', Number(e.target.value))} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pembelian</label>
                                <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.purchases} onChange={e => handleDataChange('purchases', Number(e.target.value))} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Biaya Angkut Masuk</label>
                                <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.freightIn} onChange={e => handleDataChange('freightIn', Number(e.target.value))} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Persediaan Akhir (-)</label>
                            <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-rose-700" value={data.endingInventory} onChange={e => handleDataChange('endingInventory', Number(e.target.value))} />
                        </div>
                    </div>
                  </div>
                  </>
              )}

              {activeTab === 'opex' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Calculator size={14} className="text-rose-600"/> Biaya Penjualan (Selling Expenses)
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Biaya Iklan</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.advertising} onChange={e => handleDataChange('advertising', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Gaji Penjualan</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.salesSalaries} onChange={e => handleDataChange('salesSalaries', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Biaya Pengiriman</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.deliveryExpense} onChange={e => handleDataChange('deliveryExpense', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Biaya Jual Lainnya</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.otherSelling} onChange={e => handleDataChange('otherSelling', Number(e.target.value))} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-purple-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-purple-600"/> Biaya Admin & Umum (G&A)
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Gaji Kantor / Admin</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.officeSalaries} onChange={e => handleDataChange('officeSalaries', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Beban Sewa</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.rent} onChange={e => handleDataChange('rent', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Beban Utilitas (Listrik/Air)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.utilities} onChange={e => handleDataChange('utilities', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penyusutan Aset</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.depreciation} onChange={e => handleDataChange('depreciation', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Beban Asuransi</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.insurance} onChange={e => handleDataChange('insurance', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Beban Admin Lainnya</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.otherAdmin} onChange={e => handleDataChange('otherAdmin', Number(e.target.value))} />
                        </div>
                    </div>
                  </div>
                  </>
              )}

              {activeTab === 'other' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Percent size={14} className="text-amber-600"/> Pendapatan Lain-lain & Pajak
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pendapatan Bunga (+)</label>
                            <input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-emerald-800" value={data.interestIncome} onChange={e => handleDataChange('interestIncome', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Beban Bunga (-)</label>
                            <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-rose-700" value={data.interestExpense} onChange={e => handleDataChange('interestExpense', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keuntungan Jual Aset (+)</label>
                            <input type="number" className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-emerald-800" value={data.gainOnSaleOfAssets} onChange={e => handleDataChange('gainOnSaleOfAssets', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lain-lain Bersih (+/-)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.otherIncomeExpense} onChange={e => handleDataChange('otherIncomeExpense', Number(e.target.value))} />
                        </div>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-3">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tarif Pajak Penghasilan (%)</label>
                        <input type="number" className="w-full bg-amber-50 p-3 border border-amber-200 rounded-xl text-lg font-black focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-amber-800" value={data.taxRatePercentage} onChange={e => handleDataChange('taxRatePercentage', Number(e.target.value))} />
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
              <PrintWrapper documentName={`Laba_Rugi_${data.companyName.replace(/\\s+/g, '_')}`} price={35000} />
           </div>

        </div>
      </main>

    </div>
  );
}
"""
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
