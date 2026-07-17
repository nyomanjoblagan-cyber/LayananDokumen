'use client';

/**
 * FILE: IzinBarangTemplate.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Gate Pass (Keluar Masuk Barang)
 */

import React, { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeftCircle, PackageOpen, Edit3, Eye, 
  RotateCcw, ArrowRightLeft, Building2, UserCircle2, 
  Search, Plus, Trash2, Box
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface BarangItem {
  id: string;
  namaBarang: string;
  qty: number;
  satuan: string;
  keterangan: string;
}

interface IzinBarangData {
  // Header
  namaPerusahaan: string;
  departemenAsal: string;
  
  // Surat Info
  jenisGatePass: string;
  nomorSurat: string;
  tanggal: string;
  jam: string;
  
  // Pembawa / Tujuan
  pembawaBarang: string;
  nopolKendaraan: string;
  tujuan: string;
  keperluan: string;
  
  // Penandatangan
  namaPemohon: string;
  jabatanPemohon: string;
  namaPemeriksa: string;
  namaPenerima: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IzinBarangData = {
  namaPerusahaan: 'PT. PABRIK MANUFAKTUR SENTOSA',
  departemenAsal: 'Warehouse & Logistics Dept.',
  
  jenisGatePass: 'Keluar (Outward)',
  nomorSurat: 'GP-OUT/26/07-0045',
  tanggal: '', // di set by useEffect
  jam: '14:30 WIB',
  
  pembawaBarang: 'Agus Setiawan (Driver)',
  nopolKendaraan: 'B 9988 XYZ',
  tujuan: 'PT. Subcon Vendor Makmur - Cikarang',
  keperluan: 'Pengiriman material setengah jadi untuk proses finishing dan coating.',
  
  namaPemohon: 'Budi Santoso',
  jabatanPemohon: 'Warehouse SPV',
  namaPemeriksa: 'Security Guard',
  namaPenerima: 'Agus Setiawan'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[10pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function IzinBarangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Gate Pass...</div>}>
      <IzinBarangBuilder />
    </Suspense>
  );
}

function IzinBarangBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IzinBarangData>(INITIAL_DATA);
  const [items, setItems] = useState<BarangItem[]>([
    { id: '1', namaBarang: 'Besi Plat Galvanis 2mm', qty: 50, satuan: 'Lembar', keterangan: 'Kondisi Baik' },
    { id: '2', namaBarang: 'Cat Epoxy Primer', qty: 10, satuan: 'Kaleng', keterangan: 'Lot #12345' },
    { id: '3', namaBarang: 'Thinner', qty: 5, satuan: 'Drum', keterangan: '-' }
  ]);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggal: today }));
  }, []);

  const handleDataChange = (field: keyof IzinBarangData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
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

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggal: today });
        setItems([
          { id: '1', namaBarang: 'Besi Plat Galvanis 2mm', qty: 50, satuan: 'Lembar', keterangan: 'Kondisi Baik' },
        ]);
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="flex flex-col border border-black p-4 break-inside-avoid">
          {/* HEADER PERUSAHAAN */}
          <div className="text-center border-b-2 border-black pb-4 mb-4">
            <h1 className="text-xl font-black uppercase tracking-wider">{data.namaPerusahaan}</h1>
            <p className="text-sm font-semibold mt-1">GATE PASS / SURAT JALAN {data.jenisGatePass.split(' ')[0].toUpperCase()}</p>
          </div>

          {/* METADATA DOKUMEN */}
          <div className="grid grid-cols-2 gap-4 mb-6 border-b border-black pb-4">
            <div>
              <table className="text-[10pt] w-full">
                <tbody>
                  <tr><td className="w-32 py-1 font-semibold">No. Dokumen</td><td className="w-4">:</td><td className="font-bold">{data.nomorSurat}</td></tr>
                  <tr><td className="py-1 font-semibold">Dept. Asal</td><td>:</td><td>{data.departemenAsal}</td></tr>
                  <tr><td className="py-1 font-semibold">Jenis Gate Pass</td><td>:</td><td>{data.jenisGatePass}</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="text-[10pt] w-full">
                <tbody>
                  <tr><td className="w-24 py-1 font-semibold">Tanggal</td><td className="w-4">:</td><td>{formatDateSafe(data.tanggal)}</td></tr>
                  <tr><td className="py-1 font-semibold">Jam Keluar/Msk</td><td>:</td><td>{data.jam}</td></tr>
                  <tr><td className="py-1 font-semibold">No. Polisi</td><td>:</td><td className="font-bold">{data.nopolKendaraan}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* INFORMASI TUJUAN */}
          <div className="mb-6">
            <table className="text-[10pt] w-full">
              <tbody>
                <tr>
                  <td className="w-40 py-1 font-semibold align-top">Dikirim Ke / Tujuan</td>
                  <td className="w-4 align-top">:</td>
                  <td className="font-bold uppercase align-top">{data.tujuan}</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold align-top">Pembawa Barang</td>
                  <td className="align-top">:</td>
                  <td className="align-top">{data.pembawaBarang}</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold align-top">Keperluan</td>
                  <td className="align-top">:</td>
                  <td className="align-top text-justify">{data.keperluan}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TABEL BARANG */}
          <div className="mb-8">
            <h3 className="font-bold mb-2">Rincian Barang:</h3>
            <table className="w-full border-collapse border border-black text-[10pt]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-2 w-12 text-center">No</th>
                  <th className="border border-black p-2 text-left">Nama / Deskripsi Barang</th>
                  <th className="border border-black p-2 w-20 text-center">Qty</th>
                  <th className="border border-black p-2 w-24 text-center">Satuan</th>
                  <th className="border border-black p-2 w-48 text-left">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-black p-2 text-center">{index + 1}</td>
                    <td className="border border-black p-2">{item.namaBarang || '-'}</td>
                    <td className="border border-black p-2 text-center">{item.qty}</td>
                    <td className="border border-black p-2 text-center">{item.satuan}</td>
                    <td className="border border-black p-2">{item.keterangan || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SIGNATURES */}
          <div className="grid grid-cols-3 gap-4 text-center text-[10pt] break-inside-avoid pt-4">
            <div>
              <p className="font-semibold mb-16">Dibuat & Disetujui Oleh,</p>
              <p className="font-bold underline">{data.namaPemohon}</p>
              <p>{data.jabatanPemohon}</p>
            </div>
            <div>
              <p className="font-semibold mb-16">Diperiksa (Security),</p>
              <p className="font-bold underline">{data.namaPemeriksa}</p>
              <p>Security Officer</p>
            </div>
            <div>
              <p className="font-semibold mb-16">Dibawa / Diterima Oleh,</p>
              <p className="font-bold underline">{data.namaPenerima}</p>
              <p>Pembawa Barang</p>
            </div>
          </div>
          
          <div className="mt-8 text-[8pt] text-gray-500 italic border-t border-gray-300 pt-2">
            * Surat ini berlaku sebagai izin sah pengeluaran/pemasukan barang di area pabrik.<br/>
            * Lembar Putih: Ekspedisi/Security, Lembar Merah: Keuangan, Lembar Kuning: Arsip Gudang.
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
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Izin Keluar Barang</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Eye size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-purple-600" /> Editor Gate Pass</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {/* TIPE & INFO DOKUMEN */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <ArrowRightLeft size={14} className="text-purple-600"/> Tipe & Info Dokumen
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Perusahaan / Entitas</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.namaPerusahaan} onChange={e => handleDataChange('namaPerusahaan', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Gate Pass</label>
                      <select className="w-full bg-purple-50 p-2.5 border border-purple-200 rounded-xl text-sm font-bold text-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.jenisGatePass} onChange={e => handleDataChange('jenisGatePass', e.target.value)}>
                        <option value="Keluar (Outward)">Barang Keluar (Outward)</option>
                        <option value="Masuk (Inward)">Barang Masuk (Inward)</option>
                        <option value="Pindah (Transfer)">Pindah Lokasi (Transfer)</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Surat</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none uppercase" value={data.nomorSurat} onChange={e => handleDataChange('nomorSurat', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Dept. Asal</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.departemenAsal} onChange={e => handleDataChange('departemenAsal', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.tanggal} onChange={e => handleDataChange('tanggal', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jam Proses</label>
                          <input type="time" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.jam} onChange={e => handleDataChange('jam', e.target.value)} />
                        </div>
                    </div>
                 </div>
              </div>

              {/* LOKASI & PEMBAWA */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <UserCircle2 size={14} className="text-emerald-600"/> Lokasi & Pembawa
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Tujuan</label>
                      <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tujuan} onChange={e => handleDataChange('tujuan', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keperluan / Keterangan Umum</label>
                      <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.keperluan} onChange={e => handleDataChange('keperluan', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pembawa</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pembawaBarang} onChange={e => handleDataChange('pembawaBarang', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Polisi (Kendaraan)</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase font-bold" value={data.nopolKendaraan} onChange={e => handleDataChange('nopolKendaraan', e.target.value)} />
                        </div>
                    </div>
                 </div>
              </div>

              {/* LIST BARANG */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2">
                      <Box size={14} className="text-amber-600"/> Daftar Barang
                    </h3>
                    <button onClick={addItem} className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
                      <Plus size={12} /> Tambah Barang
                    </button>
                 </div>
                 
                 <div className="space-y-4">
                    {items.map((item, idx) => (
                      <div key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
                        <button onClick={() => removeItem(item.id)} className="absolute -top-2 -right-2 bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg shadow-sm transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={14} />
                        </button>
                        <div className="flex items-center gap-2 mb-3">
                           <span className="bg-slate-200 text-slate-500 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">{idx + 1}</span>
                           <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Item Barang</h4>
                        </div>
                        <div className="space-y-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Barang / Deskripsi</label>
                              <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={item.namaBarang} onChange={e => handleItemChange(item.id, 'namaBarang', e.target.value)} placeholder="Misal: Monitor Dell 24 inch" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kuantitas (Qty)</label>
                                  <input type="number" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', parseInt(e.target.value) || 0)} min="1" />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Satuan</label>
                                  <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={item.satuan} onChange={e => handleItemChange(item.id, 'satuan', e.target.value)} placeholder="Pcs, Unit, Box" />
                                </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keterangan Tambahan</label>
                              <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={item.keterangan} onChange={e => handleItemChange(item.id, 'keterangan', e.target.value)} placeholder="Opsional" />
                            </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* PENANDATANGAN */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <UserCircle2 size={14} className="text-sky-600"/> Penandatangan
                 </h3>
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pemohon</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.namaPemohon} onChange={e => handleDataChange('namaPemohon', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pemohon</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.jabatanPemohon} onChange={e => handleDataChange('jabatanPemohon', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Security / Pemeriksa</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.namaPemeriksa} onChange={e => handleDataChange('namaPemeriksa', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penerima</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.namaPenerima} onChange={e => handleDataChange('namaPenerima', e.target.value)} />
                        </div>
                    </div>
                 </div>
              </div>

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat_Izin_Keluar_Masuk_Barang" price={15000} />
           </div>

        </div>
      </main>

    </div>
  );
}
