'use client';

import React, { useState, useRef, useEffect } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { Banknote, FileSignature, Coins } from 'lucide-react';

export default function TerbilangTemplate() {
  const [data, setData] = useState({
    // Meta
    noKwitansi: 'KWT/2026/07-0089',
    tempatTanggal: 'Jakarta, 13 Juli 2026',
    namaPerusahaan: 'PT. TEKNOLOGI DIGITAL ASIA',
    
    // Transaksi
    telahDiterimaDari: 'PT. MAKMUR SEJAHTERA',
    uangSejumlah: 125500000,
    untukPembayaran: 'Pembayaran DP 50% Project Pengembangan Aplikasi Web E-Commerce B2B (PO Ref: RMS-2026-045)',
    
    // Penandatangan
    namaPenerima: 'Andi Wijaya',
    jabatanPenerima: 'Finance Manager'
  });

  const [terbilangStr, setTerbilangStr] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) || 0 : e.target.value });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Fungsi Terbilang Bahasa Indonesia
  const terbilang = (angka: number): string => {
    const bilangan = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let hasil = "";

    if (angka < 12) {
      hasil = " " + bilangan[angka];
    } else if (angka < 20) {
      hasil = terbilang(angka - 10) + " Belas";
    } else if (angka < 100) {
      hasil = terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
    } else if (angka < 200) {
      hasil = " Seratus" + terbilang(angka - 100);
    } else if (angka < 1000) {
      hasil = terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
    } else if (angka < 2000) {
      hasil = " Seribu" + terbilang(angka - 1000);
    } else if (angka < 1000000) {
      hasil = terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
    } else if (angka < 1000000000) {
      hasil = terbilang(Math.floor(angka / 1000000)) + " Juta" + terbilang(angka % 1000000);
    } else if (angka < 1000000000000) {
      hasil = terbilang(Math.floor(angka / 1000000000)) + " Miliar" + terbilang(angka % 1000000000);
    } else if (angka < 1000000000000000) {
      hasil = terbilang(Math.floor(angka / 1000000000000)) + " Triliun" + terbilang(angka % 1000000000000);
    }

    return hasil.trim();
  };

  useEffect(() => {
    if (data.uangSejumlah > 0) {
      setTerbilangStr(terbilang(data.uangSejumlah) + " Rupiah");
    } else {
      setTerbilangStr("Nol Rupiah");
    }
  }, [data.uangSejumlah]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Form */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <Banknote className="w-5 h-5 text-green-600" />
          Kwitansi & Terbilang
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Info Dokumen</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan Penerbit</label>
                <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. Kwitansi</label>
                  <input type="text" name="noKwitansi" value={data.noKwitansi} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tempat, Tanggal</label>
                  <input type="text" name="tempatTanggal" value={data.tempatTanggal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Coins className="w-4 h-4" /> Data Transaksi
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-400 mb-1">Telah Diterima Dari</label>
                <input type="text" name="telahDiterimaDari" value={data.telahDiterimaDari} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700 shadow-sm">
                <div className="mb-2">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Uang Sejumlah (Rp)</label>
                  <input type="number" name="uangSejumlah" value={data.uangSejumlah} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-lg font-bold font-mono text-green-700 dark:text-green-400" />
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Terbilang (Otomatis):</span>
                  <div className="text-sm italic font-medium text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700">
                    {terbilangStr}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-400 mb-1">Untuk Pembayaran</label>
                <textarea name="untukPembayaran" value={data.untukPembayaran} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none text-sm leading-relaxed"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <FileSignature className="w-4 h-4" /> Penandatangan
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Penerima</label>
                <input type="text" name="namaPenerima" value={data.namaPenerima} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan</label>
                <input type="text" name="jabatanPenerima" value={data.jabatanPenerima} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview Area */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <PrintWrapper printRef={printRef}>
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto flex flex-col" style={{ width: '210mm', minHeight: '148.5mm', padding: '15mm', fontFamily: '"Arial", sans-serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A5 landscape; margin: 10mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; width: 100% !important; min-height: auto !important; }
              }
              .kuitansi-border { border: 2px solid #111827; }
              .kuitansi-line { border-bottom: 1px dotted #4b5563; }
            `}} />

            <div className="kuitansi-border flex-1 p-6 flex flex-col relative bg-orange-50/20">
              {/* Background Watermark (Optional) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <span className="text-[120px] font-black transform -rotate-12 uppercase">{data.namaPerusahaan}</span>
              </div>

              {/* Header */}
              <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-4 relative z-10">
                <div className="w-1/2">
                  <h1 className="text-2xl font-black uppercase tracking-wider text-gray-900 leading-none">{data.namaPerusahaan}</h1>
                  <p className="text-[9pt] mt-1 italic font-medium">Official Payment Receipt</p>
                </div>
                <div className="w-1/2 text-right">
                  <h2 className="text-3xl font-black uppercase tracking-widest text-gray-400">KWITANSI</h2>
                  <p className="font-mono mt-1 text-[11pt] font-bold">No. {data.noKwitansi}</p>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-6 relative z-10 text-[11.5pt] flex-1">
                {/* Diterima Dari */}
                <div className="flex">
                  <div className="w-48 font-bold">Telah Diterima Dari</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 kuitansi-line font-bold text-[13pt] uppercase">{data.telahDiterimaDari}</div>
                </div>

                {/* Terbilang */}
                <div className="flex">
                  <div className="w-48 font-bold">Uang Sejumlah</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 kuitansi-line">
                    <div className="bg-gray-100 border border-gray-300 py-2 px-4 italic font-bold text-gray-800 leading-snug">
                      "{terbilangStr}"
                    </div>
                  </div>
                </div>

                {/* Untuk Pembayaran */}
                <div className="flex">
                  <div className="w-48 font-bold align-top pt-1">Untuk Pembayaran</div>
                  <div className="w-4 align-top pt-1">:</div>
                  <div className="flex-1 kuitansi-line leading-relaxed pb-1 min-h-[3rem]">
                    {data.untukPembayaran}
                  </div>
                </div>
              </div>

              {/* Footer / Nominal & TTD */}
              <div className="flex justify-between items-end mt-8 relative z-10">
                <div className="w-1/2">
                  <div className="bg-white border-2 border-black inline-block">
                    <div className="flex items-center">
                      <div className="bg-gray-800 text-white font-bold px-4 py-3 text-[14pt]">Rp</div>
                      <div className="px-6 py-3 font-mono font-black text-[18pt]">{formatCurrency(data.uangSejumlah)},-</div>
                    </div>
                  </div>
                </div>
                
                <div className="w-64 text-center">
                  <p className="mb-1 text-[11pt]">{data.tempatTanggal}</p>
                  <p className="mb-20 text-[11pt] font-bold">Penerima,</p>
                  
                  <div className="relative">
                    {/* Stamp Placeholder */}
                    <div className="absolute left-1/2 -top-16 -translate-x-1/2 w-24 h-24 border-[3px] border-blue-800 rounded-full flex flex-col items-center justify-center opacity-30 transform -rotate-12 pointer-events-none">
                      <span className="text-[7px] font-bold uppercase tracking-widest">{data.namaPerusahaan}</span>
                      <span className="text-[12px] font-black text-blue-800 my-1">FINANCE</span>
                    </div>
                    <p className="font-bold underline uppercase text-[11.5pt]">{data.namaPenerima}</p>
                    <p className="text-[10pt] text-gray-600">{data.jabatanPenerima}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </PrintWrapper>
      </div>
    </div>
  );
}
