'use client';

/**
 * FILE: SuratJalanPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Jalan (Delivery Order) B2B
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Box, UserCheck, 
  Truck, Building2, UserCircle2, CalendarDays, MapPin
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SJItem {
  id: string;
  kodeBarang: string;
  namaBarang: string;
  qty: number;
  satuan: string;
  keterangan: string;
}

interface SuratJalanData {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  kontakPerusahaan: string;
  
  nomorSJ: string;
  tanggal: string;
  noPO: string;
  
  namaPenerima: string;
  alamatPenerima: string;
  upPenerima: string;
  
  jenisKendaraan: string;
  nopol: string;
  namaSopir: string;
  noSegel: string;
  
  penerimaTtd: string;
  sopirTtd: string;
  pengirimTtd: string;
  
  catatan: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SuratJalanData = {
  namaPerusahaan: 'PT. LINTAS LOGISTIK NUSANTARA',
  alamatPerusahaan: 'Kawasan Industri MM2100 Blok C-3, Cikarang Barat, Bekasi 17530',
  kontakPerusahaan: 'Telp: (021) 898-7766 | Email: operasional@lintaslogistik.co.id',
  nomorSJ: 'SJ-LLN/2026/07/088',
  tanggal: '2026-07-13',
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
};

const INITIAL_ITEMS: SJItem[] = [
  { id: '1', kodeBarang: 'PART-A001', namaBarang: 'Engine Block Assembly V8', qty: 2, satuan: 'Unit', keterangan: 'Kondisi Baik' },
  { id: '2', kodeBarang: 'ACC-B099', namaBarang: 'Radiator Coolant 5L', qty: 50, satuan: 'Jerigen', keterangan: '-' },
  { id: '3', kodeBarang: 'TOOL-X12', namaBarang: 'Hydraulic Jack 10T', qty: 5, satuan: 'Pcs', keterangan: 'Box Kayu' }
];

function formatDateDisplay(dateStr: string) {
    if(!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        }
    } catch {}
    return dateStr;
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratJalanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Jalan...</div>}>
      <SuratJalanBuilder />
    </Suspense>
  );
}

function SuratJalanBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pengirim' | 'penerima' | 'barang' | 'ekspedisi' | 'ttd'>('pengirim');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SuratJalanData>(INITIAL_DATA);
  const [items, setItems] = useState<SJItem[]>(INITIAL_ITEMS);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof SuratJalanData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
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

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
        setItems(INITIAL_ITEMS);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER */}
      <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
        <div className="flex-1">
            <h1 className="text-2xl font-black uppercase tracking-widest">{data.namaPerusahaan}</h1>
            <p className="text-sm mt-1">{data.alamatPerusahaan}</p>
            <p className="text-sm">{data.kontakPerusahaan}</p>
        </div>
        <div className="text-right">
            <h2 className="text-3xl font-bold uppercase tracking-widest text-slate-400">SURAT JALAN</h2>
            <p className="text-sm font-bold mt-1">No: {data.nomorSJ}</p>
            <p className="text-sm">Tgl: {formatDateDisplay(data.tanggal)}</p>
        </div>
      </div>

      {/* INFO PENGIRIMAN */}
      <div className="flex justify-between items-start mb-6 text-sm break-inside-avoid">
        <div className="w-1/2 pr-4">
            <div className="border border-black p-3 h-full">
                <p className="font-bold mb-2 underline">TUJUAN PENGIRIMAN:</p>
                <p className="font-bold">{data.namaPenerima}</p>
                <p className="whitespace-pre-line">{data.alamatPenerima}</p>
                <p className="mt-2"><strong>U.P.:</strong> {data.upPenerima}</p>
            </div>
        </div>
        <div className="w-1/2 pl-4">
            <div className="border border-black p-3 h-full">
                <p className="font-bold mb-2 underline">DETAIL ARMADA:</p>
                <div className="flex"><div className="w-24">No. PO</div><div>: {data.noPO}</div></div>
                <div className="flex"><div className="w-24">Kendaraan</div><div>: {data.jenisKendaraan}</div></div>
                <div className="flex"><div className="w-24">No. Polisi</div><div>: {data.nopol}</div></div>
                <div className="flex"><div className="w-24">Nama Supir</div><div>: {data.namaSopir}</div></div>
                <div className="flex"><div className="w-24">No. Segel</div><div>: {data.noSegel}</div></div>
            </div>
        </div>
      </div>

      <div className="text-justify mb-2 break-inside-avoid text-sm">
        <p>Bersama surat ini, kami kirimkan barang-barang sebagai berikut:</p>
      </div>

      {/* TABEL BARANG */}
      <div className="mb-6 break-inside-avoid">
        <table className="w-full border-collapse border border-black text-sm">
            <thead>
                <tr className="bg-gray-100 print:bg-gray-100">
                    <th className="border border-black p-2 text-center w-12">No.</th>
                    <th className="border border-black p-2 text-left w-32">Kode Barang</th>
                    <th className="border border-black p-2 text-left">Deskripsi Barang</th>
                    <th className="border border-black p-2 text-center w-20">Qty</th>
                    <th className="border border-black p-2 text-center w-24">Satuan</th>
                    <th className="border border-black p-2 text-left w-40">Keterangan</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                    <tr key={item.id}>
                        <td className="border border-black p-2 text-center">{i + 1}</td>
                        <td className="border border-black p-2 font-mono text-xs">{item.kodeBarang}</td>
                        <td className="border border-black p-2">{item.namaBarang}</td>
                        <td className="border border-black p-2 text-center font-bold">{item.qty}</td>
                        <td className="border border-black p-2 text-center">{item.satuan}</td>
                        <td className="border border-black p-2">{item.keterangan}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="mb-8 text-sm break-inside-avoid">
        <p className="font-bold underline">Catatan / Keterangan:</p>
        <p>{data.catatan}</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-2 break-inside-avoid mt-8 text-sm">
        <div className="text-center w-48">
            <p className="mb-2 font-bold uppercase">Penerima</p>
            <div className="h-24 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">({data.penerimaTtd})</p>
            <p className="text-xs">Tgl: ............................</p>
        </div>
        <div className="text-center w-48">
            <p className="mb-2 font-bold uppercase">Sopir / Kurir</p>
            <div className="h-24 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">({data.sopirTtd})</p>
            <p className="text-xs">Tgl: ............................</p>
        </div>
        <div className="text-center w-48">
            <p className="mb-2 font-bold uppercase">Pengirim</p>
            <div className="h-24 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">({data.pengirimTtd})</p>
            <p className="text-xs">Tgl: ............................</p>
        </div>
      </div>
    </Kertas>
  );

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
              <ArrowLeftCircle size={20} className="text-indigo-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Jalan / Delivery Order</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Truck size={18} className="text-indigo-600" /> Editor Pengiriman</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('pengirim')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pengirim' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pengirim</button>
                <button onClick={() => setActiveTab('penerima')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'penerima' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Penerima</button>
                <button onClick={() => setActiveTab('ekspedisi')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ekspedisi' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Ekspedisi</button>
                <button onClick={() => setActiveTab('barang')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'barang' ? 'bg-white border-t-2 border-indigo-500 text-indigo-700' : 'text-slate-500 hover:bg-slate-200'}`}>Barang</button>
                <button onClick={() => setActiveTab('ttd')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ttd' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>TTD</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pengirim' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Perusahaan Pengirim
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Pengirim</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak Perusahaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kontakPerusahaan} onChange={e => handleChange('kontakPerusahaan', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat Jalan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nomorSJ} onChange={e => handleChange('nomorSJ', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Pengiriman</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggal} onChange={e => handleChange('tanggal', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor PO / Referensi (Opsional)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.noPO} onChange={e => handleChange('noPO', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'penerima' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-emerald-600"/> Data Penerima / Kustomer
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Penerima</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.namaPenerima} onChange={e => handleChange('namaPenerima', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Pengiriman (Delivery Address)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alamatPenerima} onChange={e => handleChange('alamatPenerima', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">U.P. (Nama Kontak Penerima)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.upPenerima} onChange={e => handleChange('upPenerima', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ekspedisi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Truck size={14} className="text-amber-600"/> Data Armada & Ekspedisi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kendaraan / Armada</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.jenisKendaraan} onChange={e => handleChange('jenisKendaraan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Polisi / Plat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.nopol} onChange={e => handleChange('nopol', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Sopir / Ekspedisi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaSopir} onChange={e => handleChange('namaSopir', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Segel (Opsional)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.noSegel} onChange={e => handleChange('noSegel', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'barang' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-indigo-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Box size={14} className="text-indigo-600"/> Daftar Barang Kiriman
                    </h3>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={item.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative group">
                                <button onClick={() => removeItem(item.id)} className="absolute -top-3 -right-3 bg-red-100 text-red-500 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-colors border border-red-200" title="Hapus Barang">
                                    X
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kode Barang</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none" value={item.kodeBarang} onChange={e => handleItemChange(item.id, 'kodeBarang', e.target.value)} placeholder="Contoh: SKU-123"/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Barang</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" value={item.namaBarang} onChange={e => handleItemChange(item.id, 'namaBarang', e.target.value)} placeholder="Nama Produk"/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Qty</label>
                                        <input type="number" className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Satuan</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={item.satuan} onChange={e => handleItemChange(item.id, 'satuan', e.target.value)} placeholder="Unit/Pcs/Kg"/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keterangan</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={item.keterangan} onChange={e => handleItemChange(item.id, 'keterangan', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-indigo-200 text-indigo-500 font-bold text-sm uppercase rounded-xl hover:bg-indigo-50 hover:border-indigo-400 transition-colors">
                            + Tambah Barang
                        </button>
                    </div>
                  </div>
              )}

              {activeTab === 'ttd' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Edit3 size={14} className="text-rose-600"/> Pengesahan & Catatan
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama TTD Pengirim</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.pengirimTtd} onChange={e => handleChange('pengirimTtd', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama TTD Sopir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.sopirTtd} onChange={e => handleChange('sopirTtd', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama TTD Penerima</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.penerimaTtd} onChange={e => handleChange('penerimaTtd', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Catatan Pengiriman</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.catatan} onChange={e => handleChange('catatan', e.target.value)} />
                        </div>
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
              <PrintWrapper documentName={`SuratJalan_${data.nomorSJ.split('/').join('_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
