'use client';

import React, { useState, useRef } from 'react';
import PrintWrapper from '@/components/PrintWrapper';
import { PackageOpen, ArrowRightLeft, UserCheck, Search } from 'lucide-react';

interface BarangItem {
  id: string;
  namaBarang: string;
  qty: number;
  satuan: string;
  keterangan: string;
}

export default function IzinBarangTemplate() {
  const [data, setData] = useState({
    // Header
    namaPerusahaan: 'PT. PABRIK MANUFAKTUR SENTOSA',
    departemenAsal: 'Warehouse & Logistics Dept.',
    
    // Surat Info
    jenisGatePass: 'Keluar (Outward)',
    nomorSurat: 'GP-OUT/26/07-0045',
    tanggal: '13 Juli 2026',
    jam: '14:30 WIB',
    
    // Pembawa / Tujuan
    pembawaBarang: 'Agus Setiawan (Driver)',
    nopolKendaraan: 'B 9988 XYZ',
    tujuan: 'PT. Subcon Vendor Makmur - Cikarang',
    keperluan: 'Pengiriman material setengah jadi untuk proses finishing dan coating.',
    
    // Penandatangan
    namaPemohon: 'Budi Santoso',
    jabatanPemohon: 'Warehouse SPV',
    namaPemeriksa: 'Security Guard',
    namaPenerima: 'Agus Setiawan'
  });

  const [items, setItems] = useState<BarangItem[]>([
    { id: '1', namaBarang: 'Besi Plat Galvanis 2mm', qty: 50, satuan: 'Lembar', keterangan: 'Kondisi Baik' },
    { id: '2', namaBarang: 'Cat Epoxy Primer', qty: 10, satuan: 'Kaleng', keterangan: 'Lot #12345' },
    { id: '3', namaBarang: 'Thinner', qty: 5, satuan: 'Drum', keterangan: '-' }
  ]);

  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id: string, field: keyof BarangItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), namaBarang: '', qty: 1, satuan: 'Pcs', keterangan: '' }]);
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
          <ArrowRightLeft className="w-5 h-5 text-purple-600" />
          Editor Gate Pass
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Tipe & Info Dokumen</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perusahaan / Entitas</label>
                <input type="text" name="namaPerusahaan" value={data.namaPerusahaan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Gate Pass</label>
                  <select name="jenisGatePass" value={data.jenisGatePass} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold text-purple-700">
                    <option value="Keluar (Outward)">Barang Keluar (Outward)</option>
                    <option value="Masuk (Inward)">Barang Masuk (Inward)</option>
                    <option value="Pindah (Transfer)">Pindah Lokasi (Transfer)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Gate Pass</label>
                  <input type="text" name="nomorSurat" value={data.nomorSurat} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dept. Asal</label>
                  <input type="text" name="departemenAsal" value={data.departemenAsal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="text" name="tanggal" value={data.tanggal} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Waktu / Jam</label>
                  <input type="text" name="jam" value={data.jam} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <PackageOpen className="w-4 h-4" /> Detail Pengiriman
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-purple-700 dark:text-purple-400 mb-1">Tujuan / Asal Barang</label>
                <input type="text" name="tujuan" value={data.tujuan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-purple-700 dark:text-purple-400 mb-1">Pembawa Barang (Kurir/Sopir)</label>
                  <input type="text" name="pembawaBarang" value={data.pembawaBarang} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-700 dark:text-purple-400 mb-1">No. Polisi Kendaraan</label>
                  <input type="text" name="nopolKendaraan" value={data.nopolKendaraan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700 dark:text-purple-400 mb-1">Keperluan / Keterangan</label>
                <textarea name="keperluan" value={data.keperluan} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-16 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider flex items-center gap-2">
                <Search className="w-4 h-4" /> Daftar Barang
              </h3>
              <button onClick={addItem} className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded">Tambah Barang</button>
            </div>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md relative">
                  <div className="absolute top-2 right-2">
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 text-xs font-bold">Hapus</button>
                  </div>
                  <div className="grid grid-cols-12 gap-2 mt-2">
                    <div className="col-span-12">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Nama/Deskripsi Barang</label>
                      <input type="text" value={item.namaBarang} onChange={(e) => handleItemChange(item.id, 'namaBarang', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div className="col-span-4">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Qty</label>
                      <input type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', parseInt(e.target.value) || 0)} className="w-full p-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 text-center" />
                    </div>
                    <div className="col-span-4">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Satuan</label>
                      <input type="text" value={item.satuan} onChange={(e) => handleItemChange(item.id, 'satuan', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 text-center" />
                    </div>
                    <div className="col-span-4">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Ket</label>
                      <input type="text" value={item.keterangan} onChange={(e) => handleItemChange(item.id, 'keterangan', e.target.value)} className="w-full p-1.5 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 text-center" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Pengesahan
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Pemohon/Pengirim</label>
                <input type="text" name="namaPemohon" value={data.namaPemohon} onChange={handleChange} className="w-full p-1.5 text-xs border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <input type="text" name="jabatanPemohon" value={data.jabatanPemohon} onChange={handleChange} className="w-full p-1.5 text-xs border rounded-md mt-1 dark:bg-gray-700 dark:border-gray-600" placeholder="Jabatan" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Pembawa</label>
                <input type="text" name="namaPenerima" value={data.namaPenerima} onChange={handleChange} className="w-full p-1.5 text-xs border rounded-md dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Pemeriksa/Security</label>
                <input type="text" name="namaPemeriksa" value={data.namaPemeriksa} onChange={handleChange} className="w-full p-1.5 text-xs border rounded-md dark:bg-gray-700 dark:border-gray-600" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Preview Area */}
      <div className="w-full md:w-2/3 flex justify-center pb-12 overflow-x-auto custom-scrollbar">
        <div className="flex flex-col items-center w-full">
          <div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '148.5mm', padding: '15mm', fontFamily: 'Arial, sans-serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A5 landscape; margin: 10mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; width: 100% !important; min-height: auto !important; }
              }
              .gp-table th { padding: 6px; border: 1px solid #000; background-color: #f3f4f6; text-align: center; font-size: 10pt; font-weight: bold; }
              .gp-table td { padding: 4px 6px; border: 1px solid #000; font-size: 10pt; vertical-align: middle; }
            `}} />

            {/* Header Form */}
            <div className="flex border-2 border-black mb-4">
              <div className="w-1/3 border-r-2 border-black p-2 flex flex-col justify-center items-center text-center bg-gray-50">
                <h1 className="font-bold text-[11pt] uppercase">{data.namaPerusahaan}</h1>
                <p className="text-[9pt]">{data.departemenAsal}</p>
              </div>
              <div className="w-1/3 border-r-2 border-black p-2 flex flex-col justify-center items-center text-center">
                <h2 className="font-black text-[14pt] uppercase tracking-widest">GATE PASS</h2>
                <div className="px-3 py-1 bg-black text-white text-[9pt] font-bold uppercase rounded-sm mt-1 inline-block">
                  {data.jenisGatePass}
                </div>
              </div>
              <div className="w-1/3 p-2 text-[10pt] flex flex-col justify-center">
                <div className="flex justify-between mb-1">
                  <span className="font-bold">No.</span>
                  <span className="font-mono font-bold">{data.nomorSurat}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Tanggal</span>
                  <span>{data.tanggal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jam</span>
                  <span>{data.jam}</span>
                </div>
              </div>
            </div>

            {/* Info Ekspedisi */}
            <div className="mb-4">
              <table className="w-full text-[10pt] border border-gray-300">
                <tbody>
                  <tr>
                    <td className="p-2 border-r border-b border-gray-300 bg-gray-50 font-bold w-32">Tujuan / Asal</td>
                    <td className="p-2 border-b border-gray-300 font-bold uppercase">{data.tujuan}</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-b border-gray-300 bg-gray-50 font-bold">Keperluan</td>
                    <td className="p-2 border-b border-gray-300">{data.keperluan}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="p-0">
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="p-2 border-r border-gray-300 bg-gray-50 font-bold w-32">Pembawa Barang</td>
                            <td className="p-2 border-r border-gray-300 w-1/3">{data.pembawaBarang}</td>
                            <td className="p-2 border-r border-gray-300 bg-gray-50 font-bold w-24">No. Polisi</td>
                            <td className="p-2 font-bold">{data.nopolKendaraan}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tabel Barang */}
            <div className="mb-4">
              <p className="text-[9pt] italic mb-1 font-bold">Rincian Barang:</p>
              <table className="w-full border-collapse gp-table">
                <thead>
                  <tr>
                    <th className="w-10">No.</th>
                    <th>Nama Barang / Deskripsi</th>
                    <th className="w-20">Qty</th>
                    <th className="w-20">Satuan</th>
                    <th className="w-40">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td>{item.namaBarang}</td>
                      <td className="text-center font-bold">{item.qty}</td>
                      <td className="text-center">{item.satuan}</td>
                      <td>{item.keterangan}</td>
                    </tr>
                  ))}
                  {/* Empty rows to fill space */}
                  {Array.from({ length: Math.max(0, 5 - items.length) }).map((_, idx) => (
                    <tr key={`empty-${idx}`} className="h-7">
                      <td></td><td></td><td></td><td></td><td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pengesahan */}
            <div className="grid grid-cols-4 gap-2 text-center text-[9pt] border border-black p-2 mt-auto">
              <div className="border-r border-gray-300 pb-2">
                <p className="mb-16 font-bold uppercase">Dibuat Oleh,</p>
                <p className="font-bold underline uppercase">{data.namaPemohon}</p>
                <p className="text-[8pt]">{data.jabatanPemohon}</p>
              </div>
              <div className="border-r border-gray-300 pb-2">
                <p className="mb-16 font-bold uppercase">Disetujui Oleh,</p>
                <p className="text-gray-400">.......................</p>
                <p className="text-[8pt]">Kepala Departemen</p>
              </div>
              <div className="border-r border-gray-300 pb-2">
                <p className="mb-16 font-bold uppercase">Pembawa Barang,</p>
                <p className="font-bold underline uppercase">{data.namaPenerima}</p>
                <p className="text-[8pt]">Kurir / Sopir</p>
              </div>
              <div className="pb-2">
                <p className="mb-16 font-bold uppercase">Diperiksa Oleh,</p>
                <div className="relative inline-block">
                  <div className="absolute left-1/2 -top-10 -translate-x-1/2 w-16 h-16 border-2 border-red-600 rounded-full flex flex-col items-center justify-center opacity-30 transform -rotate-12 pointer-events-none">
                    <span className="text-[6px] font-bold text-red-600 uppercase">SECURITY</span>
                    <span className="text-[10px] font-black text-red-600 my-1">PASSED</span>
                  </div>
                  <p className="font-bold underline uppercase">{data.namaPemeriksa}</p>
                </div>
                <p className="text-[8pt]">Security / Pos Jaga</p>
              </div>
            </div>
            
            <div className="mt-2 text-[7pt] text-right text-gray-500 italic">
              * Dokumen ini wajib ditunjukkan kepada petugas keamanan (Security) saat pemeriksaan di pintu gerbang.
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
