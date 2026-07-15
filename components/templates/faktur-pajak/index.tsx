'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Plus, Trash2, Eye, LayoutTemplate, Building2, ReceiptText
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface InvoiceItem {
  desc: string;
  qty: number;
  price: number;
}

interface InvoiceData {
  invoiceNo: string;
  date: string;
  dueDate: string;
  city: string;
  
  // Vendor (Penjual)
  vendorName: string;
  vendorAddress: string;
  vendorNpwp: string;
  
  // Client (Pembeli)
  clientName: string;
  clientAddress: string;
  clientNpwp: string;
  
  // Items
  items: InvoiceItem[];
  
  // Pajak & Total
  taxRate: number; // PPN %
  withholdingTax: number; // PPh %
  note: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: InvoiceData = {
  invoiceNo: 'INV/2026/001',
  date: '', 
  dueDate: '',
  city: 'JAKARTA',
  
  vendorName: 'CV. MEDIA KREATIF NUSANTARA',
  vendorAddress: 'Ruko Green Lake No. 12, Cengkareng, Jakarta Barat',
  vendorNpwp: '01.234.567.8-012.000',
  
  clientName: 'PT. TEKNOLOGI JAYA ABADI',
  clientAddress: 'SCBD Lot 10, Jakarta Selatan',
  clientNpwp: '02.987.654.3-015.000',
  
  items: [
    { desc: 'Jasa Pembuatan Website Company Profile', qty: 1, price: 5000000 },
    { desc: 'Hosting & Domain (1 Tahun)', qty: 1, price: 1500000 }
  ],
  
  taxRate: 11,
  withholdingTax: 0,
  note: 'Pembayaran melalui Rekening BCA 123456789 a.n CV Media Kreatif Nusantara'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-sans leading-snug text-[10pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function FakturPajakUMKMPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Faktur Editor...</div>}>
      <TaxInvoiceBuilder />
    </Suspense>
  );
}

function TaxInvoiceBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<InvoiceData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: prev.date || today,
        dueDate: prev.dueDate || today
    }));
  }, []);

  const subTotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const ppnAmount = (subTotal * data.taxRate) / 100;
  const pphAmount = (subTotal * data.withholdingTax) / 100;
  const grandTotal = subTotal + ppnAmount - pphAmount;

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  
  const handleDataChange = (field: keyof InvoiceData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleAddItem = () => {
    setData(prev => ({ ...prev, items: [...prev.items, { desc: '', qty: 1, price: 0 }] }));
  };
  
  const handleRemoveItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };
  
  const updateItem = (index: number, field: keyof InvoiceItem, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[index][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, dueDate: today });
    }
  };

  const formatDateSafe = (dateStr: string) => {
    if(!dateStr) return '-';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle: 'long'});
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6 shrink-0 break-inside-avoid">
        <div>
          <h1 className={`text-2xl font-black ${templateId === 2 ? 'text-blue-700' : 'text-slate-900'}`}>FAKTUR PAJAK / INVOICE</h1>
          <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider">No: {data.invoiceNo}</p>
        </div>
        <div className="text-right">
          <h2 className="font-bold text-lg leading-tight uppercase">{data.vendorName}</h2>
          <p className="text-[10px] text-slate-500 max-w-[250px] mt-1">{data.vendorAddress}</p>
          <p className="text-[10px] font-bold mt-1">NPWP: {data.vendorNpwp}</p>
        </div>
      </div>

      {/* INFORMASI PIHAK */}
      <div className="grid grid-cols-2 gap-10 mb-8 shrink-0 break-inside-avoid">
        <div>
          <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Ditujukan Kepada:</h3>
          <p className="font-bold text-sm uppercase">{data.clientName}</p>
          <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">{data.clientAddress}</p>
          <p className="text-[10px] font-bold mt-1 italic">NPWP: {data.clientNpwp || '-'}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <table className="w-full text-[10px]">
            <tbody className="divide-y divide-slate-200">
              <tr><td className="py-1.5 text-slate-500 font-bold uppercase tracking-tighter">Tanggal Faktur</td><td className="text-right font-bold">{formatDateSafe(data.date)}</td></tr>
              <tr><td className="py-1.5 text-slate-500 font-bold uppercase tracking-tighter">Jatuh Tempo</td><td className="text-right font-bold text-rose-600">{formatDateSafe(data.dueDate)}</td></tr>
              <tr><td className="py-1.5 text-slate-500 font-bold uppercase tracking-tighter">Status Pajak</td><td className="text-right font-bold text-emerald-600 uppercase">Input Pajak UMKM</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TABEL ITEM */}
      <div className="flex-grow">
        <table className="w-full mb-8 border-collapse">
          <thead>
            <tr className={`${templateId === 2 ? 'bg-blue-700 text-white' : 'bg-slate-900 text-white'} uppercase text-[9px] font-bold`}>
              <th className="p-3 text-left border-none">Deskripsi Produk / Jasa</th>
              <th className="p-3 text-center w-16 border-none">Qty</th>
              <th className="p-3 text-right w-32 border-none">Harga</th>
              <th className="p-3 text-right w-32 border-none">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 border-b-2 border-slate-900">
            {data.items.map((item, idx) => (
              <tr key={idx} className="text-[11px] break-inside-avoid">
                <td className="p-3 align-top font-medium uppercase">{item.desc}</td>
                <td className="p-3 align-top text-center">{item.qty}</td>
                <td className="p-3 align-top text-right">{formatRupiah(item.price)}</td>
                <td className="p-3 align-top text-right font-bold">{formatRupiah(item.qty * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div className="flex justify-end mb-12 break-inside-avoid">
          <div className="w-72">
            <table className="w-full text-[11px]">
              <tbody>
                <tr><td className="py-1.5 text-slate-500">Subtotal</td><td className="text-right font-bold">{formatRupiah(subTotal)}</td></tr>
                <tr className="text-emerald-600 font-medium"><td className="py-1.5 uppercase tracking-tighter">PPN ({data.taxRate}%)</td><td className="text-right font-bold">+ {formatRupiah(ppnAmount)}</td></tr>
                {data.withholdingTax > 0 && (
                  <tr className="text-rose-600 font-medium"><td className="py-1.5">PPh 23 ({data.withholdingTax}%)</td><td className="text-right font-bold">- {formatRupiah(pphAmount)}</td></tr>
                )}
                <tr className={`${templateId === 2 ? 'bg-blue-50 text-blue-900' : 'bg-slate-100 text-slate-900'} border-t-2 border-slate-900`}>
                  <td className="p-3 font-black uppercase text-[10px]">Grand Total</td>
                  <td className="p-3 text-right font-black text-sm underline decoration-double">{formatRupiah(grandTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 grid grid-cols-2 gap-10 items-end break-inside-avoid">
        <div>
          <h4 className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">Catatan/Instruksi:</h4>
          <div className="text-[10px] text-slate-600 bg-slate-50 p-3 rounded border border-dashed border-slate-200 min-h-[60px] leading-relaxed">
            {data.note}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-[10px] mb-20">{data.city}, {formatDateSafe(data.date)}</p>
          <p className="font-bold text-xs uppercase underline underline-offset-4">{data.vendorName}</p>
          <p className="text-[9px] text-slate-500 mt-1">Authorized Signature</p>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Faktur Pajak</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Enterprise Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
               <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors">
                  <LayoutTemplate size={16}/> {templateId === 1 ? 'Standar' : 'Modern'}
               </button>
               {showTemplateMenu && (
                 <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
                        <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
                        Faktur Standar
                    </button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
                        <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
                        Modern (Biru)
                    </button>
                 </div>
               )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

 <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative ">
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
            <div>
              <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                <ReceiptText size={18} className="text-emerald-600" /> Editor Faktur
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lengkapi data transaksi</p>
            </div>
            <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-lg transition-colors" title="Reset Formulir">
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {/* 1. Header Invoice */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">1. Header Faktur</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. Invoice</label>
                <input type="text" value={data.invoiceNo} onChange={(e) => handleDataChange('invoiceNo', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tgl. Invoice</label>
                  <input type="date" value={data.date} onChange={(e) => handleDataChange('date', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jatuh Tempo</label>
                  <input type="date" value={data.dueDate} onChange={(e) => handleDataChange('dueDate', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            {/* 2. Pihak Penjual */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">2. Data Penjual (Vendor)</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Vendor</label>
                <input type="text" value={data.vendorName} onChange={(e) => handleDataChange('vendorName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Vendor</label>
                <textarea value={data.vendorAddress} onChange={(e) => handleDataChange('vendorAddress', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NPWP Vendor</label>
                  <input type="text" value={data.vendorNpwp} onChange={(e) => handleDataChange('vendorNpwp', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kota Penerbitan</label>
                  <input type="text" value={data.city} onChange={(e) => handleDataChange('city', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            {/* 3. Pihak Pembeli */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">3. Data Klien (Client)</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Klien</label>
                <input type="text" value={data.clientName} onChange={(e) => handleDataChange('clientName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Klien</label>
                <textarea value={data.clientAddress} onChange={(e) => handleDataChange('clientAddress', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NPWP Klien</label>
                <input type="text" value={data.clientNpwp} onChange={(e) => handleDataChange('clientNpwp', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            {/* 4. Daftar Item */}
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-100 p-2 rounded border-l-4 border-emerald-600">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">Daftar Item / Produk</h3>
                <button onClick={handleAddItem} className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1.5 rounded flex items-center gap-1 font-bold uppercase tracking-wider transition-colors shadow-sm">
                  <Plus size={12} /> Tambah Item
                </button>
              </div>

              <div className="space-y-3">
                {data.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm relative group hover:border-slate-300 transition-colors">
                    <button onClick={() => handleRemoveItem(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 transition-colors p-1" title="Hapus Item">
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-12 gap-3 mt-1">
                      <div className="col-span-12">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Deskripsi</label>
                        <input type="text" value={item.desc} onChange={(e) => updateItem(idx, 'desc', e.target.value)} className="w-full p-2 bg-slate-50 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Nama jasa/barang" />
                      </div>
                      <div className="col-span-4">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Qty</label>
                        <input type="number" value={item.qty} onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value) || 0)} className="w-full p-2 bg-slate-50 text-xs border border-slate-200 rounded text-center font-bold focus:ring-1 focus:ring-blue-500 outline-none" />
                      </div>
                      <div className="col-span-8">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Harga Satuan (Rp)</label>
                        <input type="number" value={item.price} onChange={(e) => updateItem(idx, 'price', parseInt(e.target.value) || 0)} className="w-full p-2 bg-slate-50 text-xs border border-slate-200 rounded text-right font-mono font-bold text-emerald-700 focus:ring-1 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Pajak & Catatan */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-blue-800 text-sm">5. Konfigurasi Pajak & Catatan</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tarif PPN (%)</label>
                  <input type="number" value={data.taxRate} onChange={(e) => handleDataChange('taxRate', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tarif PPh 23 (%) - Potongan</label>
                  <input type="number" value={data.withholdingTax} onChange={(e) => handleDataChange('withholdingTax', parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Catatan Tambahan / Instruksi Bayar</label>
                <textarea value={data.note} onChange={(e) => handleDataChange('note', e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div className="pb-10"></div>
          </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Faktur Pajak" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT DENGAN POSISI YANG BENAR UNTUK MENGHINDARI BUG BLANK PRINT */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
