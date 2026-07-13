'use client';

import React, { useState, useRef, useMemo } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { Wallet, Calculator, Plus, Trash2, Calendar } from 'lucide-react';

interface KasTransaction {
  id: string;
  tanggal: string;
  noBukti: string;
  keterangan: string;
  debit: number;
  kredit: number;
}

export default function BukuKasTemplate() {
  const [data, setData] = useState({
    namaPerusahaan: 'PT. MAJU BERSAMA',
    judulLaporan: 'Buku Kas Harian',
    periode: 'Juli 2026',
    saldoAwal: 5000000,
    disiapkanOleh: 'Siti Aminah',
    disetujuiOleh: 'Budi Santoso',
  });

  const [transactions, setTransactions] = useState<KasTransaction[]>([
    { id: '1', tanggal: '01/07/26', noBukti: 'BKM-001', keterangan: 'Penjualan Tunai Toko', debit: 2500000, kredit: 0 },
    { id: '2', tanggal: '02/07/26', noBukti: 'BKK-001', keterangan: 'Bayar Listrik PLN & Air', debit: 0, kredit: 1250000 },
    { id: '3', tanggal: '05/07/26', noBukti: 'BKK-002', keterangan: 'Beli ATK Kantor', debit: 0, kredit: 350000 },
    { id: '4', tanggal: '08/07/26', noBukti: 'BKM-002', keterangan: 'Pencairan Piutang PT X', debit: 4000000, kredit: 0 },
  ]);

  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) || 0 : e.target.value });
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

  const formatCurrency = (amount: number) => {
    if (amount === 0) return '-';
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Form */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-emerald-600" />
          Editor Buku Kas
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Info Laporan</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perusahaan / Entitas</label>
                <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Laporan</label>
                  <input type="text" name="judulLaporan" value={data.judulLaporan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Periode</label>
                  <input type="text" name="periode" value={data.periode} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Saldo Awal (Rp)</label>
                <input type="number" name="saldoAwal" value={data.saldoAwal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Transaksi
              </h3>
              <div className="flex gap-2">
                <button onClick={() => addTransaction('debit')} className="text-[10px] bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded flex items-center gap-1 transition">
                  <Plus className="w-3 h-3" /> Masuk
                </button>
                <button onClick={() => addTransaction('kredit')} className="text-[10px] bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded flex items-center gap-1 transition">
                  <Plus className="w-3 h-3" /> Keluar
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div key={tx.id} className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md relative shadow-sm">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => removeTransaction(tx.id)} className="text-gray-400 hover:text-red-500" title="Hapus Transaksi">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-2 mt-1">
                    <div className="col-span-12 md:col-span-5">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Tgl & No. Bukti</label>
                      <div className="flex gap-1">
                        <input type="text" value={tx.tanggal} onChange={(e) => handleTxChange(tx.id, 'tanggal', e.target.value)} className="w-1/2 p-1.5 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 text-center" placeholder="DD/MM/YY" />
                        <input type="text" value={tx.noBukti} onChange={(e) => handleTxChange(tx.id, 'noBukti', e.target.value)} className="w-1/2 p-1.5 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 text-center" placeholder="BKM-01" />
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Keterangan</label>
                      <input type="text" value={tx.keterangan} onChange={(e) => handleTxChange(tx.id, 'keterangan', e.target.value)} className="w-full p-1.5 text-xs border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Keterangan transaksi" />
                    </div>
                    
                    <div className="col-span-6">
                      <label className="block text-[10px] font-bold text-green-600 uppercase">Debit (Masuk)</label>
                      <input type="number" value={tx.debit || ''} onChange={(e) => handleTxChange(tx.id, 'debit', parseInt(e.target.value) || 0)} className="w-full p-1.5 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 text-right font-mono text-green-700 dark:text-green-400" />
                    </div>
                    <div className="col-span-6">
                      <label className="block text-[10px] font-bold text-red-600 uppercase">Kredit (Keluar)</label>
                      <input type="number" value={tx.kredit || ''} onChange={(e) => handleTxChange(tx.id, 'kredit', parseInt(e.target.value) || 0)} className="w-full p-1.5 text-xs border rounded dark:bg-gray-700 dark:border-gray-600 text-right font-mono text-red-700 dark:text-red-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <div className="flex justify-between text-sm font-bold text-blue-900 dark:text-blue-200">
                <span>Saldo Akhir:</span>
                <span className="font-mono">Rp {formatCurrency(saldoAkhir)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Pengesahan</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dibuat Oleh</label>
                <input type="text" name="disiapkanOleh" value={data.disiapkanOleh} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Disetujui Oleh</label>
                <input type="text" name="disetujuiOleh" value={data.disetujuiOleh} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview Area */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <div className="flex flex-col items-center w-full">
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', fontFamily: 'Arial, sans-serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 15mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .kas-table { width: 100%; border-collapse: collapse; }
              .kas-table th { padding: 6px 4px; border: 1px solid #000; background-color: #f3f4f6; text-align: center; font-size: 9pt; font-weight: bold; }
              .kas-table td { padding: 4px 6px; border: 1px solid #000; font-size: 9pt; vertical-align: middle; }
              .kas-table .angka { text-align: right; font-family: 'Courier New', Courier, monospace; letter-spacing: 0.05em; font-weight: 600; }
            `}} />

            {/* Header Laporan */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold uppercase tracking-wider mb-1" style={{ fontSize: '16pt' }}>{data.namaPerusahaan}</h1>
              <h2 className="text-lg font-bold uppercase underline tracking-widest">{data.judulLaporan}</h2>
              <p className="text-sm mt-1">Periode: <strong>{data.periode}</strong></p>
            </div>

            {/* Table Kas */}
            <div className="mb-8 min-h-[400px]">
              <table className="kas-table">
                <thead>
                  <tr>
                    <th className="w-12">Tgl</th>
                    <th className="w-20">No. Bukti</th>
                    <th>Uraian / Keterangan</th>
                    <th className="w-24">Debit (Rp)</th>
                    <th className="w-24">Kredit (Rp)</th>
                    <th className="w-24">Saldo (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Saldo Awal */}
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="text-right font-bold italic pr-4">Saldo Awal</td>
                    <td className="angka text-green-700 bg-green-50/20">{data.saldoAwal > 0 ? formatCurrency(data.saldoAwal) : '-'}</td>
                    <td className="angka"></td>
                    <td className="angka font-bold bg-gray-100">{formatCurrency(data.saldoAwal)}</td>
                  </tr>

                  {/* Transactions */}
                  {calculatedTransactions.map((tx, idx) => (
                    <tr key={tx.id}>
                      <td className="text-center text-xs">{tx.tanggal}</td>
                      <td className="text-center font-mono text-xs">{tx.noBukti}</td>
                      <td>{tx.keterangan}</td>
                      <td className="angka">{formatCurrency(tx.debit)}</td>
                      <td className="angka">{formatCurrency(tx.kredit)}</td>
                      <td className="angka font-bold bg-gray-50/50">{formatCurrency(tx.saldo)}</td>
                    </tr>
                  ))}

                  {/* Empty rows filler if items are few */}
                  {Array.from({ length: Math.max(0, 15 - calculatedTransactions.length) }).map((_, idx) => (
                    <tr key={`empty-${idx}`} className="h-6">
                      <td></td><td></td><td></td><td></td><td></td><td className="bg-gray-50/50"></td>
                    </tr>
                  ))}

                  {/* Totals */}
                  <tr className="font-bold border-t-2 border-black bg-gray-100">
                    <td colSpan={3} className="text-center uppercase tracking-wider py-2">Total Mutasi & Saldo Akhir</td>
                    <td className="angka text-green-700 py-2">{formatCurrency(totalDebit)}</td>
                    <td className="angka text-red-700 py-2">{formatCurrency(totalKredit)}</td>
                    <td className="angka bg-gray-200 border-l-2 border-black py-2 text-[10pt]">{formatCurrency(saldoAkhir)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Rekapitulasi */}
            <div className="flex justify-between items-start mb-12">
              <div className="w-1/3 border border-black p-3 bg-gray-50 text-[9pt]">
                <p className="font-bold border-b border-black pb-1 mb-2 text-center uppercase">Ringkasan</p>
                <div className="flex justify-between mb-1">
                  <span>Saldo Awal:</span>
                  <span className="font-mono font-bold">Rp {formatCurrency(data.saldoAwal)}</span>
                </div>
                <div className="flex justify-between mb-1 text-green-700">
                  <span>Penerimaan:</span>
                  <span className="font-mono">Rp {formatCurrency(totalDebit)}</span>
                </div>
                <div className="flex justify-between mb-1 text-red-700">
                  <span>Pengeluaran:</span>
                  <span className="font-mono">Rp {formatCurrency(totalKredit)}</span>
                </div>
                <div className="flex justify-between mt-2 pt-1 border-t border-black font-bold">
                  <span>Saldo Akhir:</span>
                  <span className="font-mono">Rp {formatCurrency(saldoAkhir)}</span>
                </div>
              </div>
              
              <div className="w-2/3 flex justify-end gap-16 pr-8 text-[10pt]">
                <div className="text-center w-32">
                  <p className="mb-20">Disiapkan Oleh,</p>
                  <p className="font-bold underline uppercase">{data.disiapkanOleh}</p>
                  <p className="text-[8pt] text-gray-500">Kasir / Finance</p>
                </div>
                <div className="text-center w-32">
                  <p className="mb-20">Disetujui Oleh,</p>
                  <p className="font-bold underline uppercase">{data.disetujuiOleh}</p>
                  <p className="text-[8pt] text-gray-500">Manajer Keuangan</p>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 text-center text-[8pt] text-gray-500 border-t border-gray-300 pt-2">
              Buku Kas dicetak secara otomatis dari Sistem Keuangan {data.namaPerusahaan}.
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
