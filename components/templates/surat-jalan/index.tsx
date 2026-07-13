'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { Truck, Package, Plus, Trash2, Box } from 'lucide-react';

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
    // Perusahaan Pengirim
    namaPerusahaan: 'PT. LINTAS LOGISTIK NUSANTARA',
    alamatPerusahaan: 'Kawasan Industri MM2100 Blok C-3, Cikarang Barat, Bekasi 17530',
    kontakPerusahaan: 'Telp: (021) 898-7766 | Email: operasional@lintaslogistik.co.id',
    
    // Info Surat Jalan
    nomorSJ: 'SJ-LLN/2026/07/088',
    tanggal: '13 Juli 2026',
    noPO: 'PO-MJU-26-0042',
    
    // Penerima
    namaPenerima: 'PT. MAKMUR JAYA UTAMA',
    alamatPenerima: 'Jl. Rungkut Industri Raya No. 45\nKawasan SIER, Surabaya 60293',
    upPenerima: 'Bpk. Herman (Warehouse Manager)',
    
    // Armada & Pengemudi
    jenisKendaraan: 'Truk Fuso Box',
    nopol: 'B 9988 XYZ',
    namaSopir: 'Agus Setiawan',
    noSegel: 'SGL-88776655',
    
    // Penandatangan
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

  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id: string, field: keyof SJItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    const newItem: SJItem = {
      id: Date.now().toString(),
      kodeBarang: '',
      namaBarang: '',
      qty: 1,
      satuan: 'Pcs',
      keterangan: ''
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Form */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg print:hidden h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-600" />
          Editor Surat Jalan
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Info Dokumen</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Surat Jalan</label>
                <input type="text" name="nomorSJ" value={data.nomorSJ} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="text" name="tanggal" value={data.tanggal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. PO / Ref</label>
                  <input type="text" name="noPO" value={data.noPO} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4" /> Penerima
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan Penerima</label>
                <input type="text" name="namaPenerima" value={data.namaPenerima} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">U.P (Penerima)</label>
                <input type="text" name="upPenerima" value={data.upPenerima} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Pengiriman</label>
                <textarea name="alamatPenerima" value={data.alamatPenerima} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4" /> Data Armada & Sopir
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-400 mb-1">Jenis Kendaraan</label>
                  <input type="text" name="jenisKendaraan" value={data.jenisKendaraan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-400 mb-1">No. Polisi</label>
                  <input type="text" name="nopol" value={data.nopol} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-400 mb-1">Nama Sopir</label>
                  <input type="text" name="namaSopir" value={data.namaSopir} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-400 mb-1">No. Segel (Bila Ada)</label>
                  <input type="text" name="noSegel" value={data.noSegel} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4" /> Daftar Barang
              </h3>
              <button onClick={addItem} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded flex items-center gap-1 transition">
                <Plus className="w-3 h-3" /> Tambah
              </button>
            </div>
            
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md relative shadow-sm">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700" title="Hapus Barang">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-2 mt-2">
                    <div className="col-span-12 md:col-span-4">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Kode</label>
                      <input type="text" value={item.kodeBarang} onChange={(e) => handleItemChange(item.id, 'kodeBarang', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Kode Barang" />
                    </div>
                    <div className="col-span-12 md:col-span-8">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Nama Barang</label>
                      <input type="text" value={item.namaBarang} onChange={(e) => handleItemChange(item.id, 'namaBarang', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Nama/Deskripsi Barang" />
                    </div>
                    
                    <div className="col-span-4 md:col-span-3">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Qty</label>
                      <input type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', parseInt(e.target.value) || 0)} className="w-full p-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 text-center" />
                    </div>
                    <div className="col-span-4 md:col-span-3">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Satuan</label>
                      <input type="text" value={item.satuan} onChange={(e) => handleItemChange(item.id, 'satuan', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 text-center" placeholder="Pcs/Unit" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Keterangan (Opsional)</label>
                      <input type="text" value={item.keterangan} onChange={(e) => handleItemChange(item.id, 'keterangan', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Keterangan..." />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Penutup & TTD</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catatan Pengiriman</label>
                <textarea name="catatan" value={data.catatan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase mb-1">Ttd Pengirim</label>
                  <input type="text" name="pengirimTtd" value={data.pengirimTtd} onChange={handleChange} className="w-full p-1.5 text-xs border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase mb-1">Ttd Sopir</label>
                  <input type="text" name="sopirTtd" value={data.sopirTtd} onChange={handleChange} className="w-full p-1.5 text-xs border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 uppercase mb-1">Ttd Penerima</label>
                  <input type="text" name="penerimaTtd" value={data.penerimaTtd} onChange={handleChange} className="w-full p-1.5 text-xs border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview Area */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <PrintWrapper printRef={printRef}>
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', fontFamily: 'Arial, sans-serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 15mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
              .sj-table th { padding: 8px; border: 1px solid #000; background-color: #f3f4f6; text-align: center; font-size: 10pt; font-weight: bold; }
              .sj-table td { padding: 6px 8px; border: 1px solid #000; font-size: 10pt; }
            `}} />

            {/* Kop Surat */}
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

            {/* Header Info */}
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
                    <tr>
                      <td className="py-1">Tanggal</td>
                      <td>:</td>
                      <td>{data.tanggal}</td>
                    </tr>
                    <tr>
                      <td className="py-1">No. PO / Referensi</td>
                      <td>:</td>
                      <td className="font-mono">{data.noPO || '-'}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="py-2"></td>
                    </tr>
                    <tr>
                      <td className="py-1">Kendaraan</td>
                      <td>:</td>
                      <td>{data.jenisKendaraan}</td>
                    </tr>
                    <tr>
                      <td className="py-1">No. Polisi</td>
                      <td>:</td>
                      <td className="font-bold">{data.nopol}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Sopir</td>
                      <td>:</td>
                      <td>{data.namaSopir}</td>
                    </tr>
                    <tr>
                      <td className="py-1">No. Segel</td>
                      <td>:</td>
                      <td className="font-mono">{data.noSegel || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Note Pembuka */}
            <p className="text-[10pt] mb-2">Harap diterima dengan baik barang-barang tersebut di bawah ini:</p>

            {/* Table Barang */}
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
                    <tr key={item.id} className="h-8">
                      <td className="text-center">{idx + 1}</td>
                      <td className="font-mono text-[9pt] text-center">{item.kodeBarang}</td>
                      <td>{item.namaBarang}</td>
                      <td className="text-center font-bold">{item.qty}</td>
                      <td className="text-center">{item.satuan}</td>
                      <td>{item.keterangan}</td>
                    </tr>
                  ))}
                  {/* Empty rows filler if items are few */}
                  {Array.from({ length: Math.max(0, 8 - items.length) }).map((_, idx) => (
                    <tr key={`empty-${idx}`} className="h-8">
                      <td></td><td></td><td></td><td></td><td></td><td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Catatan */}
            <div className="mb-8 border border-gray-400 p-2 text-[9pt] italic">
              <strong>Catatan:</strong> {data.catatan}
            </div>

            {/* Tanda Tangan */}
            <div className="grid grid-cols-3 gap-4 text-center text-[10pt] mt-4">
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

            <div className="mt-16 text-[8pt] flex justify-between text-gray-500 border-t border-gray-300 pt-2">
              <span>Lembar 1: Penagihan | Lembar 2: Arsip Pengirim | Lembar 3: Arsip Penerima</span>
              <span>Dokumen Surat Jalan Cetak</span>
            </div>
            
          </div>
        </PrintWrapper>
      </div>
    </div>
  );
}
