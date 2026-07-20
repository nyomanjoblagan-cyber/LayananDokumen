'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: TandaTerimaPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Tanda Terima Barang / Dokumen / Pembayaran
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  PackageCheck, Building2, UserCircle2, PlusCircle, Trash2, ClipboardList
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ReceiptItem {
  id: string;
  name: string;
  qty: string;
  unit: string;
  note: string;
}

interface ReceiptData {
  city: string;
  date: string;
  docNo: string;
  
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  
  delivererName: string;
  receiverSignName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ReceiptData = {
  city: 'Denpasar',
  date: '2026-07-13', 
  docNo: 'DO/BWC/2026/01/044',
  
  senderName: 'PT. BANGUN WARGA CEMERLANG',
  senderAddress: 'Jl. Gatot Subroto No. 45, Denpasar, Bali',
  senderPhone: '(0361) 223344',
  
  receiverName: 'MADE WIRA KUSUMA',
  receiverAddress: 'Proyek Renovasi Villa Seminyak, Badung',
  receiverPhone: '0812-3456-7890',
  
  delivererName: 'AHMAD JUNAIDI',
  receiverSignName: 'MADE WIRA KUSUMA'
};

const INITIAL_ITEMS: ReceiptItem[] = [
  { id: '1', name: 'Semen Gresik 50kg', qty: '50', unit: 'Sak', note: 'Kondisi Baik' },
  { id: '2', name: 'Besi Beton 10mm', qty: '20', unit: 'Batang', note: 'Standar SNI' }
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
export default function TandaTerimaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Tanda Terima...</div>}>
      <ReceiptBuilder />
    </Suspense>
  );
}

function ReceiptBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'pengirim' | 'penerima' | 'item' | 'ttd'>('pengirim');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<ReceiptData>(INITIAL_DATA);
  const [items, setItems] = useState<ReceiptItem[]>(INITIAL_ITEMS);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof ReceiptData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (id: string, field: keyof ReceiptItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    const newItem: ReceiptItem = { id: Date.now().toString(), name: '', qty: '1', unit: 'Pcs', note: '' };
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
      <div className="flex justify-between items-start border-b-[3px] border-black pb-4 mb-6">
        <div className="flex-1">
            <h1 className="text-2xl font-black uppercase tracking-widest text-slate-800">{data.senderName}</h1>
            <p className="text-sm mt-1">{data.senderAddress}</p>
            <p className="text-sm">Tlp: {data.senderPhone}</p>
        </div>
        <div className="text-right">
            <h2 className="text-2xl font-bold uppercase tracking-widest">TANDA TERIMA</h2>
            <p className="text-sm font-bold mt-1">No. {data.docNo}</p>
            <p className="text-sm">Tgl: {formatDateDisplay(data.date)}</p>
        </div>
      </div>

      {/* INFO PENERIMA */}
      <div className="mb-6 border border-black p-4 text-sm">
        <p className="font-bold underline mb-2 uppercase">Diterima Oleh / Diserahkan Kepada:</p>
        <div className="flex mb-1"><div className="w-32">Nama / Instansi</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.receiverName}</div></div>
        <div className="flex mb-1"><div className="w-32">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.receiverAddress}</div></div>
        <div className="flex mb-1"><div className="w-32">No. Telp/HP</div><div className="w-4">:</div><div className="flex-1">{data.receiverPhone}</div></div>
      </div>

      <div className="text-justify mb-2 text-sm">
        <p>Telah diterima dengan baik dan lengkap barang/dokumen/pembayaran dengan rincian sebagai berikut:</p>
      </div>

      {/* TABEL ITEM */}
      <div className="mb-8">
        <table className="w-full border-collapse border border-black text-sm">
            <thead>
                <tr className="bg-gray-100 print:bg-gray-100">
                    <th className="border border-black p-2 text-center w-12">No.</th>
                    <th className="border border-black p-2 text-left">Nama / Uraian</th>
                    <th className="border border-black p-2 text-center w-24">Jumlah</th>
                    <th className="border border-black p-2 text-center w-24">Satuan</th>
                    <th className="border border-black p-2 text-left w-48">Keterangan</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                    <tr key={item.id}>
                        <td className="border border-black p-2 text-center">{i + 1}</td>
                        <td className="border border-black p-2">{item.name}</td>
                        <td className="border border-black p-2 text-center font-bold">{item.qty}</td>
                        <td className="border border-black p-2 text-center">{item.unit}</td>
                        <td className="border border-black p-2">{item.note}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-between px-8 break-inside-avoid mt-8 text-sm">
        <div className="text-center w-48">
            <p className="mb-2">Yang Menyerahkan,</p>
            <div className="h-24 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">({data.delivererName})</p>
        </div>
        <div className="text-center w-48">
            <p className="mb-2">Penerima,</p>
            <div className="h-24 flex justify-center items-center"></div>
            <p className="font-bold underline uppercase">({data.receiverSignName})</p>
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
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Tanda Terima Barang</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><PackageCheck size={18} className="text-blue-600" /> Editor Tanda Terima</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('pengirim')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pengirim' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Pengirim</button>
                <button onClick={() => setActiveTab('penerima')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'penerima' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>Penerima</button>
                <button onClick={() => setActiveTab('item')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'item' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Rincian</button>
                <button onClick={() => setActiveTab('ttd')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ttd' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>TTD</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'pengirim' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Pengirim / Penyerah
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan / Instansi Pengirim</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.senderName} onChange={e => handleChange('senderName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Instansi</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.senderAddress} onChange={e => handleChange('senderAddress', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak / No Telp</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.senderPhone} onChange={e => handleChange('senderPhone', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Dokumen</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.docNo} onChange={e => handleChange('docNo', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'penerima' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Data Penerima
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama / Instansi Penerima</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverName} onChange={e => handleChange('receiverName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Penerima</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverAddress} onChange={e => handleChange('receiverAddress', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telp / HP Penerima</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverPhone} onChange={e => handleChange('receiverPhone', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'item' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ClipboardList size={14} className="text-emerald-600"/> Rincian Barang / Dokumen
                    </h3>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={item.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative group">
                                <button onClick={() => removeItem(item.id)} className="absolute -top-3 -right-3 bg-red-100 text-red-500 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-colors border border-red-200" title="Hapus Item">
                                    <Trash2 size={12} />
                                </button>
                                <div className="mb-3">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Uraian (Barang/Uang/Dokumen)</label>
                                    <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={item.name} onChange={e => handleItemChange(item.id, 'name', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jumlah</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Satuan</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={item.unit} onChange={e => handleItemChange(item.id, 'unit', e.target.value)} placeholder="Lembar/Pcs"/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keterangan</label>
                                        <input className="w-full bg-white p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={item.note} onChange={e => handleItemChange(item.id, 'note', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-emerald-200 text-emerald-500 font-bold text-sm uppercase rounded-xl hover:bg-emerald-50 hover:border-emerald-400 transition-colors flex items-center justify-center gap-2">
                            <PlusCircle size={16} /> Tambah Rincian
                        </button>
                    </div>
                  </div>
              )}

              {activeTab === 'ttd' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Edit3 size={14} className="text-rose-600"/> Pengesahan Tanda Tangan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pihak Yang Menyerahkan (Kurir/Sopir/Pengirim)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.delivererName} onChange={e => handleChange('delivererName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pihak Yang Menerima</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.receiverSignName} onChange={e => handleChange('receiverSignName', e.target.value)} />
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
              <PrintWrapper documentName={`TandaTerima_${data.receiverName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
