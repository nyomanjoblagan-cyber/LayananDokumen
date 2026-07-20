'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: PurchaseOrderPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Pesanan (Purchase Order)
 */

import React, { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Building2, Truck, FileText, ShoppingCart, 
  Trash2, Plus
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. TYPE DEFINITIONS ---
interface POItem {
  id: number;
  name: string;
  qty: number;
  unit: string;
  price: number;
}

interface POData {
  no: string;
  date: string;
  deliveryDate: string;
  
  companyName: string;
  companyInfo: string;
  
  vendorName: string;
  vendorContact: string;
  vendorAddress: string;
  
  shipToName: string;
  shipToAddress: string;
  shipVia: string;
  
  items: POItem[];
  taxRate: number;
  
  notes: string;
  termsPayment: string;
  termsDelivery: string;
  signer: string;
  signerJob: string;
  city: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: POData = {
  no: `PO/${new Date().getFullYear()}/001`,
  date: '2026-08-01', 
  deliveryDate: '2026-08-10', 
  city: 'JAKARTA',
  
  companyName: 'PT. KARYA MAJU SENTOSA',
  companyInfo: 'Jl. Industri Raya No. 88, Cikarang\nEmail: procurement@kms.com | Telp: 021-8999-7777',
  
  vendorName: 'CV. BESI BAJA UTAMA',
  vendorContact: 'IBU RATNA SARI',
  vendorAddress: 'Jl. Logam No. 12, Jakarta Utara',
  
  shipToName: 'Gudang Pusat Cikarang',
  shipToAddress: 'Kawasan Industri Jababeka II, Blok C-15, Cikarang',
  shipVia: 'Truk Engkel (Vendor)',
  
  items: [
    { id: 1, name: 'Besi Beton Ulir 13mm (SNI)', qty: 200, unit: 'Batang', price: 85000 },
    { id: 2, name: 'Semen Portland (50kg)', qty: 50, unit: 'Sak', price: 65000 },
  ],
  
  taxRate: 11,
  notes: '1. Mohon lampirkan Invoice & Surat Jalan saat pengiriman.\n2. Barang harus diterima sebelum jam 16.00 WIB.',
  termsPayment: '30 Days After Invoice Received',
  termsDelivery: 'DDP (Delivered Duty Paid) Gudang Cikarang',
  signer: 'BUDI SANTOSO',
  signerJob: 'Procurement Manager'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[9pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PurchaseOrderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor PO...</div>}>
      <POToolBuilder />
    </Suspense>
  );
}

function POToolBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<POData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'vendor' | 'item' | 'terms'>('info');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split("T")[0] }));
  }, []);

  const handleChange = (field: keyof POData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (index: number, field: keyof POItem, val: string | number) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: val };
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: '', qty: 1, unit: 'Pcs', price: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    if (data.items.length <= 1) return;
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form PO ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split("T")[0] });
        setLogo(null);
    }
  };

  const formatDateSafe = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (data.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER KOP SURAT */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6 break-inside-avoid">
        <div className="flex gap-4 items-center">
            {logo && (
              <img src={logo} alt="Logo Perusahaan" className="h-16 w-auto object-contain print:h-20" />
            )}
            <div>
              <h1 className="font-bold text-xl uppercase tracking-wider text-slate-900">{data.companyName}</h1>
              <p className="text-slate-600 whitespace-pre-line leading-snug mt-1">{data.companyInfo}</p>
            </div>
        </div>
        <div className="text-right">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">PURCHASE ORDER</h2>
            <div className="mt-2 text-slate-700">
                <p><span className="font-bold">PO Number:</span> {data.no}</p>
                <p><span className="font-bold">Date:</span> {formatDateSafe(data.date)}</p>
            </div>
        </div>
      </div>

      {/* ALAMAT VENDOR & PENGIRIMAN */}
      <div className="flex gap-8 mb-6">
          {/* VENDOR */}
          <div className="flex-1 bg-slate-50 p-4 border border-slate-200">
              <h3 className="font-bold text-xs uppercase text-slate-500 mb-2">TO (VENDOR):</h3>
              <p className="font-bold text-sm uppercase">{data.vendorName}</p>
              <p className="font-bold">{data.vendorContact}</p>
              <p className="whitespace-pre-line leading-snug mt-1">{data.vendorAddress}</p>
          </div>
          {/* SHIP TO */}
          <div className="flex-1 bg-slate-50 p-4 border border-slate-200">
              <h3 className="font-bold text-xs uppercase text-slate-500 mb-2">SHIP TO:</h3>
              <p className="font-bold text-sm uppercase">{data.shipToName}</p>
              <p className="whitespace-pre-line leading-snug mt-1">{data.shipToAddress}</p>
          </div>
      </div>

      {/* DETAIL PO */}
      <div className="mb-6">
          <table className="w-full border-collapse border border-slate-900 text-center">
              <thead>
                  <tr className="bg-slate-100">
                      <th className="border border-slate-900 py-1.5 px-2 font-bold uppercase">Shipping Method</th>
                      <th className="border border-slate-900 py-1.5 px-2 font-bold uppercase">Delivery Terms</th>
                      <th className="border border-slate-900 py-1.5 px-2 font-bold uppercase">Payment Terms</th>
                      <th className="border border-slate-900 py-1.5 px-2 font-bold uppercase">Req. Delivery Date</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className="border border-slate-900 py-2 px-2">{data.shipVia}</td>
                      <td className="border border-slate-900 py-2 px-2">{data.termsDelivery}</td>
                      <td className="border border-slate-900 py-2 px-2">{data.termsPayment}</td>
                      <td className="border border-slate-900 py-2 px-2">{formatDateSafe(data.deliveryDate)}</td>
                  </tr>
              </tbody>
          </table>
      </div>

      {/* TABEL ITEM */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-slate-900">
            <thead>
                <tr className="bg-slate-900 text-white">
                    <th className="border border-slate-900 py-2 px-2 w-10">QTY</th>
                    <th className="border border-slate-900 py-2 px-2 w-16">UNIT</th>
                    <th className="border border-slate-900 py-2 px-2 text-left">DESCRIPTION</th>
                    <th className="border border-slate-900 py-2 px-2 w-32 text-right">UNIT PRICE</th>
                    <th className="border border-slate-900 py-2 px-2 w-32 text-right">TOTAL</th>
                </tr>
            </thead>
            <tbody>
                {data.items.map((item, idx) => (
                    <tr key={idx} className="">
                        <td className="border border-slate-900 py-2 px-2 text-center">{item.qty}</td>
                        <td className="border border-slate-900 py-2 px-2 text-center">{item.unit}</td>
                        <td className="border border-slate-900 py-2 px-2">{item.name}</td>
                        <td className="border border-slate-900 py-2 px-2 text-right">{formatCurrency(item.price)}</td>
                        <td className="border border-slate-900 py-2 px-2 text-right">{formatCurrency(item.qty * item.price)}</td>
                    </tr>
                ))}
                
                {/* SPACING */}
                <tr className="">
                    <td className="border-l border-r border-slate-900 h-24"></td>
                    <td className="border-l border-r border-slate-900 h-24"></td>
                    <td className="border-l border-r border-slate-900 h-24"></td>
                    <td className="border-l border-r border-slate-900 h-24"></td>
                    <td className="border-l border-r border-slate-900 h-24"></td>
                </tr>
            </tbody>
        </table>

        {/* TOTALS */}
        <div className="flex border-b border-l border-r border-slate-900">
            {/* NOTES */}
            <div className="w-3/5 border-r border-slate-900 p-3">
                <p className="font-bold text-xs uppercase mb-1">Notes / Instructions:</p>
                <p className="whitespace-pre-line text-xs">{data.notes}</p>
            </div>
            
            {/* CALCULATION */}
            <div className="w-2/5 p-0 bg-slate-50">
                <div className="flex justify-between p-2 border-b border-slate-300">
                    <span className="font-bold">SUBTOTAL</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between p-2 border-b border-slate-300">
                    <span className="font-bold">TAX ({data.taxRate}%)</span>
                    <span>{formatCurrency(calculateTax())}</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-200">
                    <span className="font-bold text-lg">TOTAL</span>
                    <span className="font-bold text-lg">{formatCurrency(calculateTotal())}</span>
                </div>
            </div>
        </div>
      </div>

      {/* SIGNATURE */}
      <div className="flex justify-end text-center break-inside-avoid mt-8 pr-4">
        <div className="w-64">
            <p className="mb-2">Authorized Signature:</p>
            <div className="h-20"></div>
            <p className="font-bold underline uppercase">{data.signer}</p>
            <p className="uppercase text-xs">{data.signerJob}</p>
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
              <ArrowLeftCircle size={20} className="text-pink-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Purchase Order</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2">
                Upload Logo
            </button>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-900/50 active:scale-95 flex items-center gap-2 transition-all">
                <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-pink-600" /> Form PO</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'info' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Info</button>
                <button onClick={() => setActiveTab('vendor')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'vendor' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Vendor</button>
                <button onClick={() => setActiveTab('item')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'item' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Items</button>
                <button onClick={() => setActiveTab('terms')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'terms' ? 'bg-white border-t-2 border-pink-500 text-pink-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Terms</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'info' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Perusahaan (Pembeli)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Anda</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.companyName} onChange={e => handleChange('companyName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Info Alamat & Kontak Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.companyInfo} onChange={e => handleChange('companyInfo', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor PO</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.no} onChange={e => handleChange('no', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal PO</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'vendor' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-6 border-l-4 border-l-blue-500">
                    
                    <div>
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100 mb-4">
                        <Truck size={14} className="text-blue-600"/> Vendor (Supplier)
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Vendor</label>
                                <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.vendorName} onChange={e => handleChange('vendorName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak Vendor (Nama PIC / Telp)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.vendorContact} onChange={e => handleChange('vendorContact', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Vendor</label>
                                <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.vendorAddress} onChange={e => handleChange('vendorAddress', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100 mb-4">
                        <Building2 size={14} className="text-blue-600"/> Pengiriman (Ship To)
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Tujuan (Gudang/Proyek)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.shipToName} onChange={e => handleChange('shipToName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Pengiriman</label>
                                <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.shipToAddress} onChange={e => handleChange('shipToAddress', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'item' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2">
                            <ShoppingCart size={14} className="text-emerald-600"/> Item Pesanan
                        </h3>
                        <button onClick={addItem} className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-700 shadow-md flex items-center gap-1"><Plus size={14}/> Tambah Item</button>
                    </div>
                    
                    <div className="space-y-4 mt-4">
                        {data.items.map((item, index) => (
                            <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative">
                                <button onClick={() => removeItem(index)} className="absolute top-2 right-2 p-1.5 text-rose-400 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-colors"><Trash2 size={14}/></button>
                                <div className="space-y-3 pr-8">
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Nama Barang / Deskripsi</label>
                                        <input 
                                            className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-emerald-500" 
                                            value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Qty</label>
                                            <input 
                                                type="number"
                                                className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500" 
                                                value={item.qty} onChange={e => handleItemChange(index, 'qty', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Satuan</label>
                                            <input 
                                                className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500" 
                                                value={item.unit} onChange={e => handleItemChange(index, 'unit', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Harga Satuan</label>
                                            <input 
                                                type="number"
                                                className="w-full bg-white p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500" 
                                                value={item.price} onChange={e => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>
              )}

              {activeTab === 'terms' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-pink-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-pink-600"/> Ketentuan & TTD
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Shipping Method (Expedisi)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.shipVia} onChange={e => handleChange('shipVia', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Req. Delivery Date</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.deliveryDate} onChange={e => handleChange('deliveryDate', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Payment Terms (Termin Bayar)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.termsPayment} onChange={e => handleChange('termsPayment', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Delivery Terms (FOB/DDP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.termsDelivery} onChange={e => handleChange('termsDelivery', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Catatan Khusus (Notes)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.notes} onChange={e => handleChange('notes', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pajak (Tax) %</label>
                                <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.taxRate} onChange={e => handleChange('taxRate', parseFloat(e.target.value) || 0)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-100 my-4"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat (Authorized Signer)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.signer} onChange={e => handleChange('signer', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.signerJob} onChange={e => handleChange('signerJob', e.target.value)} />
                            </div>
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
              <PrintWrapper documentName={`Purchase_Order_${data.no.replace(/\//g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
