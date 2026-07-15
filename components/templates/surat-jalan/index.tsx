'use client';

/**
 * FILE: SuratJalanTemplate.tsx
 * STATUS: PRODUCTION READY (PRINT CUT-OFF FIXED)
 * DESC: Generator Surat Jalan (Delivery Order) B2B
 * FEATURES:
 * - Natural Flow Print Architecture (No Clipping)
 */

import React, { useState } from 'react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { Truck, Package, Plus, Trash2, Box, Printer, ArrowLeftCircle } from 'lucide-react';

interface SJItem {
  id: string;
  kodeBarang: string;
  namaBarang: string;
  qty: number;
  satuan: string;
  keterangan: string;
}

export default function SuratJalanTemplate() {
  const [data, setData] = useState({
    namaPerusahaan: 'PT. LINTAS LOGISTIK NUSANTARA',
    alamatPerusahaan: 'Kawasan Industri MM2100 Blok C-3, Cikarang Barat, Bekasi 17530',
    kontakPerusahaan: 'Telp: (021) 898-7766 | Email: operasional@lintaslogistik.co.id',
    nomorSJ: 'SJ-LLN/2026/07/088',
    tanggal: '13 Juli 2026',
    noPO: 'PO-MJU-26-0042',
    namaPenerima: 'PT. MAKMUR JAYA UTAMA',
    alamatPenerima: 'Jl. Rungkut Industri Raya No. 45\nKawasan SIER, Surabaya 60293',
    upPenerima: 'Bpk. Herman (Warehouse Manager)',
    jenisKendaraan: 'Truk Fuso Box',
    nopol: 'B 9988 XYZ',
    namaSopir: 'Agus Setiawan',
    noSegel: 'SGL-88776655',
    penerimaTtd: 'Herman',
    sopirTtd: 'Agus Setiawan',
    pengirimTtd: 'Budi Warehouse',
    catatan: 'Barang harap dicek kesesuaiannya dengan Delivery Order. Komplain maksimal 1x24 jam setelah barang diterima.'
  });

  const [items, setItems] = useState<SJItem[]>([
    { id: '1', kodeBarang: 'PART-A001', namaBarang: 'Engine Block Assembly V8', qty: 2, satuan: 'Unit', keterangan: 'Kondisi Baik' },
    { id: '2', kodeBarang: 'ACC-B099', namaBarang: 'Radiator Coolant 5L', qty: 50, satuan: 'Jerigen', keterangan: '-' },
    { id: '3', kodeBarang: 'TOOL-X12', namaBarang: 'Hydraulic Jack 10T', qty: 5, satuan: 'Pcs', keterangan: 'Box Kayu' }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id: string, field: keyof SJItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    const newItem: SJItem = { id: Date.now().toString(), kodeBarang: '', namaBarang: '', qty: 1, satuan: 'Pcs', keterangan: '' };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* 
        CSS PRINT FIXED (THE BULLETPROOF PATCH) 
        html, body dipaksa h-auto agar tidak kepotong.
        #print-only-root dikembalikan ke static flow.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
        .sj-table th { padding: 8px; border: 1px solid #000; background-color: #f3f4f6; text-align: center; font-size: 10pt; font-weight: bold; }
        .sj-table td { padding: 6px 8px; border: 1px solid #000; font-size: 10pt; }
      ` }} />

      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-indigo-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Surat Jalan <span className="text-indigo-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95">
                 <Printer size={18}/> <span className="hidden sm:inline">Cetak Dokumen</span>
               </button>
            </div>
         </div>
      </header>

      {/* REVISI KRUSIAL: print:h-auto print:overflow-visible print:block membebaskan tinggi saat print */}
      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block">
        
        {/* Sidebar Form */}
        <div className="no-print w-full md:w-[480px] lg:w-[540px] bg-white border-r border-slate-200 flex flex-col h-full z-10">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="font-bold text-slate-700 flex items-center gap-2"><Truck size={18} className="text-indigo-600" /> Form Surat Jalan</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-700 mb-3 text-xs uppercase tracking-wider">Info Dokumen</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Nomor Surat Jalan</label>
                  <input type="text" name="nomorSJ" value={data.nomorSJ} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-md bg-white font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Tanggal</label>
                    <input type="text" name="tanggal" value={data.tanggal} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">No. PO / Ref</label>
                    <input type="text" name="noPO" value={data.noPO} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-700 mb-3 text-xs uppercase tracking-wider flex items-center gap-2"><Box size={14} /> Penerima</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Nama Perusahaan Penerima</label>
                  <input type="text" name="namaPenerima" value={data.namaPenerima} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-md bg-white font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">U.P (Penerima)</label>
                  <input type="text" name="upPenerima" value={data.upPenerima} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Alamat Pengiriman</label>
                  <textarea name="alamatPenerima" value={data.alamatPenerima} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-md bg-white h-20 resize-none text-sm focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h3 className="font-semibold text-indigo-800 mb-3 text-xs uppercase tracking-wider flex items-center gap-2"><Truck size={14} /> Data Armada</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-indigo-700 mb-1">Jenis Kendaraan</label>
                    <input type="text" name="jenisKendaraan" value={data.jenisKendaraan} onChange={handleChange} className="w-full p-2 border border-indigo-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-indigo-700 mb-1">No. Polisi</label>
                    <input type="text" name="nopol" value={data.nopol} onChange={handleChange} className="w-full p-2 border border-indigo-200 rounded-md bg-white font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-indigo-700 mb-1">Nama Sopir</label>
                    <input type="text" name="namaSopir" value={data.namaSopir} onChange={handleChange} className="w-full p-2 border border-indigo-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-indigo-700 mb-1">No. Segel</label>
                    <input type="text" name="noSegel" value={data.noSegel} onChange={handleChange} className="w-full p-2 border border-indigo-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2"><Package size={14} /> Barang</h3>
                <button onClick={addItem} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded flex items-center gap-1 transition shadow-sm">
                  <Plus size={14} /> Tambah
                </button>
              </div>
              
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="p-3 bg-white border border-slate-200 rounded-lg relative shadow-sm">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded" title="Hapus Barang">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-2 mt-2">
                      <div className="col-span-12 md:col-span-4">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Kode</label>
                        <input type="text" value={item.kodeBarang} onChange={(e) => handleItemChange(item.id, 'kodeBarang', e.target.value)} className="w-full p-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Kode" />
                      </div>
                      <div className="col-span-12 md:col-span-8">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Nama Barang</label>
                        <input type="text" value={item.namaBarang} onChange={(e) => handleItemChange(item.id, 'namaBarang', e.target.value)} className="w-full p-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nama/Deskripsi" />
                      </div>
                      <div className="col-span-4 md:col-span-3">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Qty</label>
                        <input type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', parseInt(e.target.value) || 0)} className="w-full p-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-center" />
                      </div>
                      <div className="col-span-4 md:col-span-3">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Satuan</label>
                        <input type="text" value={item.satuan} onChange={(e) => handleItemChange(item.id, 'satuan', e.target.value)} className="w-full p-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-center" placeholder="Pcs" />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Keterangan</label>
                        <input type="text" value={item.keterangan} onChange={(e) => handleItemChange(item.id, 'keterangan', e.target.value)} className="w-full p-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Opsional" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-700 mb-3 text-xs uppercase tracking-wider">Penutup & TTD</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Catatan</label>
                  <textarea name="catatan" value={data.catatan} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-md bg-white h-16 resize-none text-sm focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-medium text-slate-500 uppercase mb-1">Ttd Pengirim</label>
                    <input type="text" name="pengirimTtd" value={data.pengirimTtd} onChange={handleChange} className="w-full p-1.5 text-xs border border-slate-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-slate-500 uppercase mb-1">Ttd Sopir</label>
                    <input type="text" name="sopirTtd" value={data.sopirTtd} onChange={handleChange} className="w-full p-1.5 text-xs border border-slate-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-slate-500 uppercase mb-1">Ttd Penerima</label>
                    <input type="text" name="penerimaTtd" value={data.penerimaTtd} onChange={handleChange} className="w-full p-1.5 text-xs border border-slate-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* REVISI KRUSIAL: print:h-auto print:overflow-visible melepaskan pengekangan tinggi */}
        <div className="flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full">
           
          <div id="print-only-root" className="bg-white text-black shadow-2xl print:shadow-none print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', fontFamily: 'Arial, sans-serif' }}>
            
            <div className="flex border-b-2 border-black pb-3 mb-6">
              <div className="w-16 h-16 bg-gray-200 border border-gray-400 flex items-center justify-center mr-4">
                <span className="text-gray-500 font-bold text-[10px] text-center leading-tight">LOGO</span>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold uppercase tracking-wider text-blue-900" style={{ fontSize: '16pt' }}>{data.namaPerusahaan}</h1>
                <p className="text-[9pt]">{data.alamatPerusahaan}</p>
                <p className="text-[9pt]">{data.kontakPerusahaan}</p>
              </div>
              <div className="text-right w-48 pt-2">
                <h2 className="text-2xl font-black uppercase tracking-widest border-2 border-black px-2 py-1 inline-block" style={{ letterSpacing: '0.2em' }}>SURAT JALAN</h2>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-[10pt]">
              <div className="w-1/2 pr-4">
                <p className="font-bold mb-1">Kepada Yth:</p>
                <p className="font-bold uppercase text-[11pt]">{data.namaPenerima}</p>
                <div className="whitespace-pre-line mt-1 h-12">{data.alamatPenerima}</div>
                <p className="mt-2">UP: <strong>{data.upPenerima}</strong></p>
              </div>
              <div className="w-1/2 pl-4 border-l border-gray-300">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-32 py-1 font-bold">No. Surat Jalan</td>
                      <td className="w-4">:</td>
                      <td className="font-bold text-[11pt]">{data.nomorSJ}</td>
                    </tr>
                    <tr><td className="py-1">Tanggal</td><td>:</td><td>{data.tanggal}</td></tr>
                    <tr><td className="py-1">No. PO / Ref</td><td>:</td><td className="font-mono">{data.noPO || '-'}</td></tr>
                    <tr><td colSpan={3} className="py-2"></td></tr>
                    <tr><td className="py-1">Kendaraan</td><td>:</td><td>{data.jenisKendaraan}</td></tr>
                    <tr><td className="py-1">No. Polisi</td><td>:</td><td className="font-bold">{data.nopol}</td></tr>
                    <tr><td className="py-1">Sopir</td><td>:</td><td>{data.namaSopir}</td></tr>
                    <tr><td className="py-1">No. Segel</td><td>:</td><td className="font-mono">{data.noSegel || '-'}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-[10pt] mb-2">Harap diterima dengan baik barang-barang tersebut di bawah ini:</p>

            <div className="mb-6 min-h-[250px]">
              <table className="w-full border-collapse sj-table">
                <thead>
                  <tr>
                    <th className="w-12">No.</th>
                    <th className="w-32">Kode Barang</th>
                    <th>Nama / Deskripsi Barang</th>
                    <th className="w-20">Qty</th>
                    <th className="w-20">Satuan</th>
                    <th className="w-40">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} className="h-8 break-inside-avoid">
                      <td className="text-center">{idx + 1}</td>
                      <td className="font-mono text-[9pt] text-center">{item.kodeBarang}</td>
                      <td>{item.namaBarang}</td>
                      <td className="text-center font-bold">{item.qty}</td>
                      <td className="text-center">{item.satuan}</td>
                      <td>{item.keterangan}</td>
                    </tr>
                  ))}
                  {Array.from({ length: Math.max(0, 8 - items.length) }).map((_, idx) => (
                    <tr key={`empty-${idx}`} className="h-8"><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-8 border border-gray-400 p-2 text-[9pt] italic break-inside-avoid">
              <strong>Catatan:</strong> {data.catatan}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-[10pt] mt-4 break-inside-avoid">
              <div>
                <p className="mb-20">Penerima,</p>
                <p className="font-bold underline">{data.penerimaTtd}</p>
                <p className="text-[8pt] text-gray-500">(Tanda Tangan & Cap)</p>
              </div>
              <div>
                <p className="mb-20">Sopir / Pengirim,</p>
                <p className="font-bold underline">{data.sopirTtd}</p>
                <p className="text-[8pt] text-gray-500">(Tanda Tangan)</p>
              </div>
              <div>
                <p className="mb-20">Hormat Kami,</p>
                <div className="relative inline-block text-center">
                  <div className="absolute -left-6 -top-12 w-20 h-20 border-2 border-blue-800 rounded-full flex items-center justify-center opacity-30 transform -rotate-12">
                    <span className="text-[7px] font-bold text-blue-800">WAREHOUSE<br/>DEPT</span>
                  </div>
                  <p className="font-bold underline">{data.pengirimTtd}</p>
                </div>
                <p className="text-[8pt] text-gray-500">Bag. Gudang</p>
              </div>
            </div>

            <div className="mt-16 text-[8pt] flex justify-between text-gray-500 border-t border-gray-300 pt-2 break-inside-avoid">
              <span>Lembar 1: Penagihan | Lembar 2: Arsip Pengirim | Lembar 3: Arsip Penerima</span>
              <span>Dokumen Surat Jalan Cetak</span>
            </div>
          </div>
          
          <div className="no-print mt-8 w-full max-w-[210mm] mx-auto pb-20">
            <PrintWrapper documentName="Surat Jalan B2B" price={15000} />
          </div>

        </div>
      </main>
    </div>
  );
}