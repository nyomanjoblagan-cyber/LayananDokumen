import React, { forwardRef } from 'react';

interface KasProps {
  data?: any;
}

export const KasTemplate = forwardRef<HTMLDivElement, KasProps>(({ data }, ref) => {
  // Default data for preview
  const defaultData = {
    companyName: "PT BINTANG SEJAHTERA",
    documentTitle: "BUKU KAS UMUM",
    period: "Periode: 1 Juli 2026 - 31 Juli 2026",
    currency: "IDR",
    transactions: [
      { id: 1, date: "01/07/2026", ref: "BKM-001", description: "Saldo Awal", debit: 15000000, credit: 0, balance: 15000000 },
      { id: 2, date: "02/07/2026", ref: "BKM-002", description: "Penerimaan piutang dari Toko Abadi", debit: 5000000, credit: 0, balance: 20000000 },
      { id: 3, date: "05/07/2026", ref: "BKK-001", description: "Pembayaran listrik & air", debit: 0, credit: 1200000, balance: 18800000 },
      { id: 4, date: "10/07/2026", ref: "BKK-002", description: "Pembelian ATK", debit: 0, credit: 350000, balance: 18450000 },
      { id: 5, date: "15/07/2026", ref: "BKK-003", description: "Pembayaran gaji karyawan", debit: 0, credit: 8000000, balance: 10450000 },
      { id: 6, date: "20/07/2026", ref: "BKM-003", description: "Penjualan tunai", debit: 12500000, credit: 0, balance: 22950000 },
      { id: 7, date: "25/07/2026", ref: "BKK-004", description: "Biaya operasional kendaraan", debit: 0, credit: 750000, balance: 22200000 },
      { id: 8, date: "28/07/2026", ref: "BKK-005", description: "Pembelian inventaris kantor", debit: 0, credit: 2500000, balance: 19700000 },
      { id: 9, date: "31/07/2026", ref: "BKK-006", description: "Biaya konsumsi rapat", debit: 0, credit: 450000, balance: 19250000 },
    ],
    signatures: [
      { role: "Dibuat Oleh,", name: "Siti Aminah", title: "Admin Keuangan" },
      { role: "Diperiksa Oleh,", name: "Budi Santoso", title: "Manager Keuangan" },
      { role: "Disetujui Oleh,", name: "Andi Wijaya", title: "Direktur Utama" }
    ]
  };

  const kasData = data || defaultData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalDebit = kasData.transactions.reduce((acc: number, curr: any) => acc + curr.debit, 0);
  const totalCredit = kasData.transactions.reduce((acc: number, curr: any) => acc + curr.credit, 0);
  const finalBalance = kasData.transactions.length > 0 ? kasData.transactions[kasData.transactions.length - 1].balance : 0;

  return (
    <div ref={ref} className="w-full bg-white text-black font-sans text-sm p-10 max-w-[210mm] mx-auto min-h-[297mm] shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-double border-black pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-gray-900">{kasData.companyName}</h1>
        <h2 className="text-xl font-bold mt-3 uppercase tracking-widest">{kasData.documentTitle}</h2>
        <p className="text-md mt-1 font-medium text-gray-700">{kasData.period}</p>
      </div>

      {/* Table */}
      <div className="mb-8 overflow-hidden rounded-sm border border-gray-800">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-900 border-b-2 border-gray-800">
              <th className="border-r border-gray-800 p-3 text-center w-12 font-bold">No</th>
              <th className="border-r border-gray-800 p-3 text-center w-28 font-bold">Tanggal</th>
              <th className="border-r border-gray-800 p-3 text-center w-28 font-bold">No. Bukti</th>
              <th className="border-r border-gray-800 p-3 text-center font-bold">Uraian / Keterangan</th>
              <th className="border-r border-gray-800 p-3 text-center w-36 font-bold">Penerimaan (Rp)</th>
              <th className="border-r border-gray-800 p-3 text-center w-36 font-bold">Pengeluaran (Rp)</th>
              <th className="p-3 text-center w-36 font-bold">Saldo (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {kasData.transactions.map((trx: any, index: number) => (
              <tr key={trx.id} className="border-b border-gray-400 hover:bg-gray-50 transition-colors">
                <td className="border-r border-gray-800 p-2 text-center text-gray-700">{index + 1}</td>
                <td className="border-r border-gray-800 p-2 text-center text-gray-700">{trx.date}</td>
                <td className="border-r border-gray-800 p-2 text-center font-medium text-gray-800">{trx.ref}</td>
                <td className="border-r border-gray-800 p-2 text-left text-gray-800">{trx.description}</td>
                <td className="border-r border-gray-800 p-2 text-right font-medium text-gray-900">
                  {trx.debit > 0 ? formatCurrency(trx.debit).replace('Rp', '').trim() : '-'}
                </td>
                <td className="border-r border-gray-800 p-2 text-right font-medium text-gray-900">
                  {trx.credit > 0 ? formatCurrency(trx.credit).replace('Rp', '').trim() : '-'}
                </td>
                <td className="p-2 text-right font-bold text-gray-900 bg-gray-50/50">
                  {formatCurrency(trx.balance).replace('Rp', '').trim()}
                </td>
              </tr>
            ))}
            
            {/* Totals Row */}
            <tr className="bg-gray-100 font-bold border-t-2 border-gray-800">
              <td colSpan={4} className="border-r border-gray-800 p-3 text-right uppercase tracking-wider text-gray-800">
                Total Mutasi
              </td>
              <td className="border-r border-gray-800 p-3 text-right text-green-700">
                {formatCurrency(totalDebit).replace('Rp', '').trim()}
              </td>
              <td className="border-r border-gray-800 p-3 text-right text-red-700">
                {formatCurrency(totalCredit).replace('Rp', '').trim()}
              </td>
              <td className="p-3 bg-gray-200"></td>
            </tr>
            <tr className="bg-gray-800 text-white font-bold">
              <td colSpan={6} className="border-r border-gray-600 p-3 text-right uppercase text-base tracking-widest">
                Saldo Akhir Periode
              </td>
              <td className="p-3 text-right text-base">
                {formatCurrency(finalBalance).replace('Rp', '').trim()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="flex justify-start mb-12">
        <div className="w-[350px] border-2 border-gray-800 p-5 rounded-lg bg-gray-50 shadow-sm relative">
          <div className="absolute -top-3 left-4 bg-white px-2 font-bold text-gray-800 border border-gray-300 rounded text-xs uppercase">
            Ringkasan Keuangan
          </div>
          <div className="flex justify-between mb-2 mt-2 items-center">
            <span className="text-gray-600 font-medium">Saldo Awal:</span>
            <span className="font-bold text-gray-900">{formatCurrency(kasData.transactions[0]?.balance || 0)}</span>
          </div>
          <div className="flex justify-between mb-2 items-center">
            <span className="text-gray-600 font-medium">Total Penerimaan:</span>
            <span className="font-bold text-green-700">+{formatCurrency(totalDebit - (kasData.transactions[0]?.debit || 0))}</span>
          </div>
          <div className="flex justify-between mb-3 items-center">
            <span className="text-gray-600 font-medium">Total Pengeluaran:</span>
            <span className="font-bold text-red-700">-{formatCurrency(totalCredit)}</span>
          </div>
          <div className="flex justify-between pt-3 border-t-2 border-dashed border-gray-400 items-center">
            <span className="font-bold uppercase tracking-wider text-gray-800">Saldo Akhir:</span>
            <span className="font-bold text-lg text-gray-900 bg-yellow-100 px-2 py-1 rounded">{formatCurrency(finalBalance)}</span>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="flex justify-between mt-16 px-4">
        {kasData.signatures.map((sig: any, index: number) => (
          <div key={index} className="flex flex-col items-center text-center w-52">
            <p className="mb-24 text-gray-700 font-medium">{sig.role}</p>
            <div className="border-b-2 border-gray-800 w-full mb-1 relative">
              <p className="font-bold text-gray-900 absolute -bottom-1 left-0 right-0">{sig.name}</p>
            </div>
            <p className="text-gray-600 text-xs mt-1">{sig.title}</p>
          </div>
        ))}
      </div>
      
      {/* Footer / Page Info */}
      <div className="mt-20 border-t border-gray-300 pt-4 flex justify-between text-xs text-gray-500 font-medium">
        <span>Sistem Layanan Dokumen Terpadu</span>
        <span>Dicetak pada: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
});

KasTemplate.displayName = 'KasTemplate';
export default KasTemplate;
