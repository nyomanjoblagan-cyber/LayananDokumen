'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { FileSpreadsheet, Calculator } from 'lucide-react';

export default function LabaRugiTemplate() {
  const [data, setData] = useState({
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
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: Number(e.target.value) || 0 });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
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

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Editor Sidebar */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-600" />
          Editor Laba Rugi
        </h2>
        
        <div className="space-y-5">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Identitas</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan</label>
                <input type="text" name="companyName" value={data.companyName} onChange={handleTextChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Periode</label>
                <input type="text" name="periodEnd" value={data.periodEnd} onChange={handleTextChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800">
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3 text-sm uppercase tracking-wider">Pendapatan</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-1">Penjualan Bruto</label>
                <input type="number" name="grossSales" value={data.grossSales} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-right" />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-1">Retur Penjualan</label>
                <input type="number" name="salesReturns" value={data.salesReturns} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-right text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-1">Diskon Penjualan</label>
                <input type="number" name="salesDiscounts" value={data.salesDiscounts} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-right text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-3 text-sm uppercase tracking-wider">HPP (COGS)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">Persediaan Awal</label>
                <input type="number" name="beginningInventory" value={data.beginningInventory} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-right" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">Pembelian</label>
                <input type="number" name="purchases" value={data.purchases} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-right" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">Ongkos Kirim Masuk</label>
                <input type="number" name="freightIn" value={data.freightIn} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-right" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">Persediaan Akhir</label>
                <input type="number" name="endingInventory" value={data.endingInventory} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-right text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg border border-rose-100 dark:border-rose-800">
            <h3 className="font-semibold text-rose-800 dark:text-rose-300 mb-3 text-sm uppercase tracking-wider">Beban Operasional</h3>
            <h4 className="text-xs font-bold text-rose-600 mb-2">Beban Penjualan</h4>
            <div className="space-y-2 mb-4">
              <input type="number" placeholder="Iklan" name="advertising" value={data.advertising} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
              <input type="number" placeholder="Gaji Sales" name="salesSalaries" value={data.salesSalaries} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
              <input type="number" placeholder="Pengiriman" name="deliveryExpense" value={data.deliveryExpense} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
              <input type="number" placeholder="Lainnya" name="otherSelling" value={data.otherSelling} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
            </div>
            <h4 className="text-xs font-bold text-rose-600 mb-2">Beban Administrasi & Umum</h4>
            <div className="space-y-2">
              <input type="number" placeholder="Gaji Kantor" name="officeSalaries" value={data.officeSalaries} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
              <input type="number" placeholder="Sewa" name="rent" value={data.rent} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
              <input type="number" placeholder="Listrik/Air" name="utilities" value={data.utilities} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
              <input type="number" placeholder="Penyusutan" name="depreciation" value={data.depreciation} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
              <input type="number" placeholder="Asuransi" name="insurance" value={data.insurance} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
              <input type="number" placeholder="Lainnya" name="otherAdmin" value={data.otherAdmin} onChange={handleNumChange} className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 font-mono text-right" />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-sm uppercase tracking-wider">Pajak & Lain-Lain</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Pendapatan Bunga</label>
                <input type="number" name="interestIncome" value={data.interestIncome} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 font-mono text-right" />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Beban Bunga</label>
                <input type="number" name="interestExpense" value={data.interestExpense} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 font-mono text-right text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Persentase Pajak Penghasilan (%)</label>
                <input type="number" name="taxRatePercentage" value={data.taxRatePercentage} onChange={handleNumChange} className="w-full p-2 border rounded-md dark:bg-gray-700 font-mono text-right" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <div className="flex flex-col items-center w-full">
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', fontFamily: 'Arial, sans-serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 15mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .row-hover:hover { background-color: #f3f4f6; }
            `}} />

            {/* Header */}
            <div className="text-center mb-8 border-b-2 border-black pb-4">
              <h1 className="text-2xl font-bold uppercase tracking-wider mb-1" style={{ fontSize: '18pt' }}>{data.companyName}</h1>
              <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800" style={{ fontSize: '14pt' }}>Laporan Laba Rugi</h2>
              <p className="text-sm italic mt-1">Untuk Periode yang Berakhir pada {data.periodEnd}</p>
              <p className="text-xs text-gray-600 mt-1">(Disajikan dalam Rupiah)</p>
            </div>

            {/* Content Table */}
            <div className="w-full text-[10pt] leading-tight px-4">
              
              {/* REVENUES */}
              <div className="mb-4">
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
                <div className="flex justify-between py-1 mt-1 font-bold border-t border-gray-400">
                  <span>Penjualan Bersih</span>
                  <span className="font-mono">{formatCurrency(netSales)}</span>
                </div>
              </div>

              {/* COGS */}
              <div className="mb-4">
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
                <div className="flex justify-between py-1 mt-1 font-bold border-t border-gray-400 text-red-700">
                  <span>Total Harga Pokok Penjualan</span>
                  <span className="font-mono">({formatCurrency(totalCogs)})</span>
                </div>
              </div>

              {/* GROSS PROFIT */}
              <div className="flex justify-between py-2 px-2 font-bold text-[11pt] bg-gray-200 border-y-2 border-black mb-6">
                <span className="uppercase">Laba Kotor</span>
                <span className="font-mono">{formatCurrency(grossProfit)}</span>
              </div>

              {/* OPERATING EXPENSES */}
              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="font-bold border-b border-gray-400 mb-1 italic text-[9pt]">Beban Penjualan</div>
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
                  <div className="flex justify-between py-[4px] mt-1 font-bold border-t border-dashed border-gray-300">
                    <span>Total Beban Penjualan</span><span className="font-mono">{formatCurrency(totalSellingExpenses)}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="font-bold border-b border-gray-400 mb-1 italic text-[9pt]">Beban Administrasi & Umum</div>
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
                  <div className="flex justify-between py-[4px] mt-1 font-bold border-t border-dashed border-gray-300">
                    <span>Total Beban Admin & Umum</span><span className="font-mono">{formatCurrency(totalAdminExpenses)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between py-1 mt-2 font-bold border-t border-gray-400 text-red-700">
                <span>Total Beban Operasional</span>
                <span className="font-mono">({formatCurrency(totalOperatingExpenses)})</span>
              </div>

              {/* OPERATING INCOME */}
              <div className="flex justify-between py-2 px-2 font-bold text-[11pt] bg-gray-100 border-y border-black mb-6 mt-4">
                <span className="uppercase">Laba Operasional</span>
                <span className="font-mono">{formatCurrency(operatingIncome)}</span>
              </div>

              {/* OTHER INCOME AND EXPENSES */}
              <div className="mb-4">
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
                <div className="flex justify-between py-1 mt-1 font-bold border-t border-gray-400">
                  <span>Total Pendapatan (Beban) Lain-lain</span>
                  <span className="font-mono">{formatCurrency(netOtherIncomeExpense)}</span>
                </div>
              </div>

              {/* EARNINGS BEFORE TAX */}
              <div className="flex justify-between py-1 px-2 font-bold bg-gray-50 border-t-2 border-gray-400 mb-2 mt-4">
                <span className="uppercase">Laba Sebelum Pajak</span>
                <span className="font-mono">{formatCurrency(earningsBeforeTax)}</span>
              </div>

              {/* TAX */}
              <div className="flex justify-between py-1 px-2 text-red-700 mb-4 row-hover">
                <span className="uppercase">Beban Pajak Penghasilan ({data.taxRatePercentage}%)</span>
                <span className="font-mono">({formatCurrency(incomeTaxExpense)})</span>
              </div>

              {/* NET INCOME */}
              <div className="flex justify-between py-3 px-4 font-bold text-[13pt] border-y-4 border-double border-black mt-6">
                <span className="uppercase tracking-wider">Laba Bersih</span>
                <span className={`font-mono ${netIncome < 0 ? 'text-red-700' : ''}`}>
                  {netIncome < 0 ? `(${formatCurrency(Math.abs(netIncome))})` : formatCurrency(netIncome)}
                </span>
              </div>

            </div>
            
            {/* Signatures */}
            <div className="mt-16 flex justify-between px-16 text-[10pt]">
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
            
            <div className="mt-12 text-center text-[8pt] text-gray-500 border-t border-gray-300 pt-2">
              Dokumen ini dihasilkan secara otomatis oleh sistem.
            </div>
          </div>
                  <div className="no-print mt-8 mb-4">
            <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-emerald-600 transition-all cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Cetak / Print
            </button>
            <PrintWrapper documentName="Cetak_Dokumen" price={15000} />
          </div>
        </div>
      </div>
    </div>
  );
}
