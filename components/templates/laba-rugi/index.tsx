import React from 'react';

// Interfaces for Corporate P&L Data Structure
export interface ProfitAndLossData {
  companyName: string;
  periodEnd: string;
  currency: string;
  revenues: {
    grossSales: number;
    salesReturns: number;
    salesDiscounts: number;
  };
  cogs: {
    beginningInventory: number;
    purchases: number;
    freightIn: number;
    endingInventory: number;
    totalCogs?: number; // Calculated if not provided
  };
  operatingExpenses: {
    sellingExpenses: {
      advertising: number;
      salesSalaries: number;
      deliveryExpense: number;
      otherSelling: number;
    };
    generalAdminExpenses: {
      officeSalaries: number;
      rent: number;
      utilities: number;
      depreciation: number;
      insurance: number;
      otherAdmin: number;
    };
  };
  otherIncomeExpenses: {
    interestIncome: number;
    interestExpense: number;
    gainOnSaleOfAssets: number;
    other: number;
  };
  tax: {
    incomeTaxExpense: number;
  };
}

export interface ProfitAndLossProps {
  data: ProfitAndLossData;
  className?: string;
}

const formatCurrency = (amount: number, currency: string = 'Rp') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('Rp', currency).trim();
};

export const CorporateProfitAndLoss: React.FC<ProfitAndLossProps> = ({ data, className = '' }) => {
  // Calculations
  const netSales = data.revenues.grossSales - data.revenues.salesReturns - data.revenues.salesDiscounts;
  
  const totalCogs = data.cogs.totalCogs !== undefined 
    ? data.cogs.totalCogs 
    : (data.cogs.beginningInventory + data.cogs.purchases + data.cogs.freightIn - data.cogs.endingInventory);

  const grossProfit = netSales - totalCogs;

  const totalSellingExpenses = Object.values(data.operatingExpenses.sellingExpenses).reduce((a, b) => a + b, 0);
  const totalAdminExpenses = Object.values(data.operatingExpenses.generalAdminExpenses).reduce((a, b) => a + b, 0);
  const totalOperatingExpenses = totalSellingExpenses + totalAdminExpenses;

  const operatingIncome = grossProfit - totalOperatingExpenses;

  const netOtherIncomeExpense = data.otherIncomeExpenses.interestIncome 
                              - data.otherIncomeExpenses.interestExpense 
                              + data.otherIncomeExpenses.gainOnSaleOfAssets 
                              + data.otherIncomeExpenses.other;

  const earningsBeforeTax = operatingIncome + netOtherIncomeExpense;
  const netIncome = earningsBeforeTax - data.tax.incomeTaxExpense;

  return (
    <div className={`max-w-4xl mx-auto p-8 bg-white text-gray-900 shadow-xl border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="text-center mb-10 border-b-2 border-gray-800 pb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-gray-900 mb-2">{data.companyName}</h1>
        <h2 className="text-xl font-semibold uppercase tracking-widest text-gray-700">Laporan Laba Rugi</h2>
        <p className="text-sm text-gray-500 italic mt-2">Untuk Periode yang Berakhir pada {data.periodEnd}</p>
        <p className="text-xs text-gray-400 mt-1">(Disajikan dalam {data.currency})</p>
      </div>

      {/* Table Content */}
      <div className="w-full text-sm">
        
        {/* REVENUES */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 border-b border-gray-300 mb-2 uppercase">Pendapatan</h3>
          <div className="flex justify-between py-1 px-2 hover:bg-gray-50">
            <span>Penjualan Bruto</span>
            <span>{formatCurrency(data.revenues.grossSales)}</span>
          </div>
          <div className="flex justify-between py-1 px-2 text-red-600 hover:bg-red-50">
            <span className="pl-4">Dikurangi: Retur Penjualan</span>
            <span>({formatCurrency(data.revenues.salesReturns)})</span>
          </div>
          <div className="flex justify-between py-1 px-2 text-red-600 hover:bg-red-50">
            <span className="pl-4">Dikurangi: Potongan Penjualan</span>
            <span>({formatCurrency(data.revenues.salesDiscounts)})</span>
          </div>
          <div className="flex justify-between py-2 px-2 font-bold bg-gray-100 border-t border-gray-300 mt-2">
            <span>Penjualan Bersih</span>
            <span>{formatCurrency(netSales)}</span>
          </div>
        </div>

        {/* COGS */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 border-b border-gray-300 mb-2 uppercase">Harga Pokok Penjualan</h3>
          <div className="flex justify-between py-1 px-2 hover:bg-gray-50">
            <span>Persediaan Awal</span>
            <span>{formatCurrency(data.cogs.beginningInventory)}</span>
          </div>
          <div className="flex justify-between py-1 px-2 hover:bg-gray-50">
            <span className="pl-4">Pembelian</span>
            <span>{formatCurrency(data.cogs.purchases)}</span>
          </div>
          <div className="flex justify-between py-1 px-2 hover:bg-gray-50">
            <span className="pl-4">Beban Angkut Pembelian</span>
            <span>{formatCurrency(data.cogs.freightIn)}</span>
          </div>
          <div className="flex justify-between py-1 px-2 text-red-600 hover:bg-red-50">
            <span className="pl-4">Dikurangi: Persediaan Akhir</span>
            <span>({formatCurrency(data.cogs.endingInventory)})</span>
          </div>
          <div className="flex justify-between py-2 px-2 font-bold bg-gray-100 border-t border-gray-300 mt-2 text-red-700">
            <span>Total Harga Pokok Penjualan</span>
            <span>({formatCurrency(totalCogs)})</span>
          </div>
        </div>

        {/* GROSS PROFIT */}
        <div className="flex justify-between py-3 px-3 font-bold text-lg bg-gray-800 text-white border-y-2 border-gray-900 mb-8 rounded-sm shadow-sm">
          <span className="uppercase">Laba Kotor</span>
          <span>{formatCurrency(grossProfit)}</span>
        </div>

        {/* OPERATING EXPENSES */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 border-b border-gray-300 mb-2 uppercase">Beban Operasional</h3>
          
          <h4 className="font-semibold text-gray-700 mt-3 mb-1 px-2 italic">Beban Penjualan</h4>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Beban Iklan</span>
            <span>{formatCurrency(data.operatingExpenses.sellingExpenses.advertising)}</span>
          </div>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Gaji Bagian Penjualan</span>
            <span>{formatCurrency(data.operatingExpenses.sellingExpenses.salesSalaries)}</span>
          </div>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Beban Pengiriman</span>
            <span>{formatCurrency(data.operatingExpenses.sellingExpenses.deliveryExpense)}</span>
          </div>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Beban Penjualan Lainnya</span>
            <span>{formatCurrency(data.operatingExpenses.sellingExpenses.otherSelling)}</span>
          </div>
          <div className="flex justify-between py-2 px-4 font-semibold bg-gray-50 border-t border-gray-200 mt-1">
            <span>Total Beban Penjualan</span>
            <span>{formatCurrency(totalSellingExpenses)}</span>
          </div>

          <h4 className="font-semibold text-gray-700 mt-4 mb-1 px-2 italic">Beban Administrasi dan Umum</h4>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Gaji Bagian Kantor</span>
            <span>{formatCurrency(data.operatingExpenses.generalAdminExpenses.officeSalaries)}</span>
          </div>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Beban Sewa</span>
            <span>{formatCurrency(data.operatingExpenses.generalAdminExpenses.rent)}</span>
          </div>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Beban Utilitas</span>
            <span>{formatCurrency(data.operatingExpenses.generalAdminExpenses.utilities)}</span>
          </div>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Beban Penyusutan</span>
            <span>{formatCurrency(data.operatingExpenses.generalAdminExpenses.depreciation)}</span>
          </div>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Beban Asuransi</span>
            <span>{formatCurrency(data.operatingExpenses.generalAdminExpenses.insurance)}</span>
          </div>
          <div className="flex justify-between py-1 px-4 hover:bg-gray-50">
            <span>Beban Administrasi Lainnya</span>
            <span>{formatCurrency(data.operatingExpenses.generalAdminExpenses.otherAdmin)}</span>
          </div>
          <div className="flex justify-between py-2 px-4 font-semibold bg-gray-50 border-t border-gray-200 mt-1">
            <span>Total Beban Administrasi dan Umum</span>
            <span>{formatCurrency(totalAdminExpenses)}</span>
          </div>

          <div className="flex justify-between py-2 px-2 font-bold bg-gray-100 border-t border-gray-300 mt-3 text-red-700">
            <span>Total Beban Operasional</span>
            <span>({formatCurrency(totalOperatingExpenses)})</span>
          </div>
        </div>

        {/* OPERATING INCOME */}
        <div className="flex justify-between py-3 px-3 font-bold text-lg bg-blue-50 border-y-2 border-blue-200 mb-8 rounded-sm shadow-sm text-blue-900">
          <span className="uppercase">Laba Operasional</span>
          <span>{formatCurrency(operatingIncome)}</span>
        </div>

        {/* OTHER INCOME AND EXPENSES */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 border-b border-gray-300 mb-2 uppercase">Pendapatan dan (Beban) Lain-lain</h3>
          <div className="flex justify-between py-1 px-2 hover:bg-gray-50">
            <span>Pendapatan Bunga</span>
            <span>{formatCurrency(data.otherIncomeExpenses.interestIncome)}</span>
          </div>
          <div className="flex justify-between py-1 px-2 text-red-600 hover:bg-red-50">
            <span>Beban Bunga</span>
            <span>({formatCurrency(data.otherIncomeExpenses.interestExpense)})</span>
          </div>
          <div className="flex justify-between py-1 px-2 hover:bg-gray-50">
            <span>Keuntungan Penjualan Aset</span>
            <span>{formatCurrency(data.otherIncomeExpenses.gainOnSaleOfAssets)}</span>
          </div>
          <div className="flex justify-between py-1 px-2 hover:bg-gray-50">
            <span>Lain-lain</span>
            <span>{formatCurrency(data.otherIncomeExpenses.other)}</span>
          </div>
          <div className="flex justify-between py-2 px-2 font-bold bg-gray-100 border-t border-gray-300 mt-2">
            <span>Total Pendapatan (Beban) Lain-lain</span>
            <span>{formatCurrency(netOtherIncomeExpense)}</span>
          </div>
        </div>

        {/* EARNINGS BEFORE TAX */}
        <div className="flex justify-between py-2 px-2 font-bold bg-gray-200 border-t-2 border-gray-400 mb-2">
          <span className="uppercase">Laba Sebelum Pajak</span>
          <span>{formatCurrency(earningsBeforeTax)}</span>
        </div>

        {/* TAX */}
        <div className="flex justify-between py-1 px-2 text-red-600 mb-4 hover:bg-red-50">
          <span className="uppercase">Beban Pajak Penghasilan</span>
          <span>({formatCurrency(data.tax.incomeTaxExpense)})</span>
        </div>

        {/* NET INCOME */}
        <div className="flex justify-between py-4 px-4 font-bold text-2xl bg-green-50 border-y-4 border-green-600 mt-8 rounded-sm shadow-md">
          <span className="uppercase text-green-900">Laba Bersih</span>
          <span className={netIncome >= 0 ? 'text-green-700' : 'text-red-600'}>
            {netIncome < 0 ? `(${formatCurrency(Math.abs(netIncome))})` : formatCurrency(netIncome)}
          </span>
        </div>

      </div>
      
      {/* Footer / Signatures */}
      <div className="mt-16 flex justify-between px-8">
        <div className="text-center">
          <p className="mb-16 text-sm text-gray-600">Disiapkan Oleh,</p>
          <div className="border-b-2 border-gray-800 w-48 mx-auto"></div>
          <p className="mt-2 text-sm font-bold uppercase text-gray-800">Manajer Keuangan</p>
        </div>
        <div className="text-center">
          <p className="mb-16 text-sm text-gray-600">Disetujui Oleh,</p>
          <div className="border-b-2 border-gray-800 w-48 mx-auto"></div>
          <p className="mt-2 text-sm font-bold uppercase text-gray-800">Direktur Utama</p>
        </div>
      </div>
      
      <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-200 pt-4">
        Dokumen ini dihasilkan secara otomatis oleh sistem LayananDokumen.
      </div>
    </div>
  );
};

export default CorporateProfitAndLoss;
