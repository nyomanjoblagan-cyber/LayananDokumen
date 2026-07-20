'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: KonfirmasiOrderPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator B2B Procurement Document (Purchase Order / Order Confirmation)
 */

import React, { useState, Suspense, useEffect, Fragment } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, 
  Building2, ShoppingBag, Plus, Trash2, ShieldCheck, 
  FileText, Truck, Percent, Briefcase
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface OrderItem {
  id: string;
  desc: string;
  qty: number;
  unit: string;
  price: number;
  discount: number;
}

interface ProcurementData {
  docType: 'ORDER CONFIRMATION' | 'PURCHASE ORDER';
  docNo: string;
  docDate: string;
  estDeliveryDate: string;
  
  issuerName: string;
  issuerAddress: string;
  issuerContact: string;
  issuerEmail: string;
  issuerTaxId: string; // NPWP

  recipientName: string;
  recipientAddress: string;
  recipientContact: string;
  recipientEmail: string;

  items: OrderItem[];
  
  taxRate: number; 
  shippingFee: number;
  downPayment: number;
  
  shippingMethod: string;
  paymentTerms: string; 
  notes: string;
  termsAndConditions: string;

  authorizedSignName: string;
  authorizedSignTitle: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ProcurementData = {
  docType: 'ORDER CONFIRMATION',
  docNo: 'PO/2026/08/001-A',
  docDate: '2026-08-01',
  estDeliveryDate: '2026-08-15',
  
  issuerName: 'PT. NUSANTARA MAKMUR SEJAHTERA',
  issuerAddress: 'Gedung Menara Merdeka Lt. 14\nJl. Jend. Sudirman Kav 21, Jakarta Selatan 12920',
  issuerContact: '+62 21 5551234',
  issuerEmail: 'procurement@nusantaramakmur.co.id',
  issuerTaxId: '01.234.567.8-091.000',

  recipientName: 'PT. KREATIF LOGISTIK SOLUSINDO',
  recipientAddress: 'Kawasan Industri Cikarang Blok B-12\nBekasi, Jawa Barat 17530',
  recipientContact: 'Bpk. Ahmad (Sales Director)',
  recipientEmail: 'sales@kreatiflogistik.co.id',

  items: [
    { id: '1', desc: 'Enterprise Server Rack 42U - Heavy Duty', qty: 2, unit: 'Unit', price: 15500000, discount: 0 },
    { id: '2', desc: 'Cisco Catalyst 9300 Switch 48-port', qty: 4, unit: 'Unit', price: 28000000, discount: 2000000 },
    { id: '3', desc: 'Installation & Network Setup Services', qty: 1, unit: 'Lot', price: 12000000, discount: 0 },
  ],
  
  taxRate: 11,
  shippingFee: 1500000,
  downPayment: 0,
  
  shippingMethod: 'Vendor Delivery Fleet',
  paymentTerms: 'Net 30 Days after Invoice Date',
  notes: 'Harap melampirkan Faktur Pajak yang sah saat penagihan tagihan ini.',
  termsAndConditions: '1. Barang yang dikirim harus 100% baru dan sesuai dengan spesifikasi di atas.\n2. Keterlambatan pengiriman akan dikenakan denda keterlambatan sebesar 1‰ (satu permil) per hari kalender.\n3. Garansi perangkat minimal 1 (satu) tahun sejak Berita Acara Serah Terima (BAST) ditandatangani.',

  authorizedSignName: 'Budi Santoso',
  authorizedSignTitle: 'Chief Procurement Officer'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[10pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function KonfirmasiOrderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor B2B...</div>}>
      <OrderBuilder />
    </Suspense>
  );
}

function OrderBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<ProcurementData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'company' | 'items' | 'terms'>('company');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 14);
    
    setData(prev => ({ 
        ...prev, 
        docDate: today,
        estDeliveryDate: nextWeek.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof ProcurementData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const updateItem = (id: string, field: keyof OrderItem, val: any) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: val } : item)
    }));
  };

  const addItem = () => {
    const newItem: OrderItem = {
      id: Math.random().toString(36).substr(2, 9),
      desc: 'Item Baru',
      qty: 1,
      unit: 'Pcs',
      price: 0,
      discount: 0
    };
    setData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (id: string) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, docDate: today });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  // Kalkulasi
  const subTotal = data.items.reduce((sum, item) => sum + ((item.price - item.discount) * item.qty), 0);
  const taxAmount = (subTotal * data.taxRate) / 100;
  const grandTotal = subTotal + taxAmount + data.shippingFee;
  const amountDue = grandTotal - data.downPayment;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        {/* HEADER */}
        <div className="flex justify-between items-start border-b-[3px] border-slate-900 pb-4 mb-6 break-inside-avoid">
            <div className="w-1/2">
                <h1 className="font-black text-2xl uppercase tracking-widest text-slate-900">{data.issuerName}</h1>
                <div className="text-xs text-slate-700 mt-2 whitespace-pre-line leading-relaxed">{data.issuerAddress}</div>
                <div className="text-xs text-slate-600 mt-1">Telp: {data.issuerContact} | Email: {data.issuerEmail}</div>
                <div className="text-xs text-slate-600">NPWP: {data.issuerTaxId}</div>
            </div>
            <div className="w-1/2 text-right">
                <h2 className="font-black text-3xl uppercase tracking-wider text-slate-900 mb-2">{data.docType}</h2>
                <div className="inline-block bg-slate-100 p-3 rounded-lg border border-slate-200 text-left w-56 text-sm">
                    <div className="flex justify-between mb-1"><span className="font-bold text-slate-600">No. Dokumen:</span> <span className="font-mono font-bold">{data.docNo}</span></div>
                    <div className="flex justify-between mb-1"><span className="font-bold text-slate-600">Tanggal:</span> <span>{formatDateSafe(data.docDate)}</span></div>
                </div>
            </div>
        </div>

        {/* VENDOR INFO */}
        <div className="mb-6 bg-slate-50 border border-slate-200 p-4 rounded-lg">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Tujuan (Vendor/Supplier):</h3>
            <p className="font-black uppercase text-sm mb-1">{data.recipientName}</p>
            <div className="text-xs text-slate-700 whitespace-pre-line mb-1">{data.recipientAddress}</div>
            <div className="text-xs text-slate-700">UP: <span className="font-bold">{data.recipientContact}</span> | Email: {data.recipientEmail}</div>
        </div>

        {/* ITEMS TABLE */}
        <div className="mb-6">
            <table className="w-full text-xs">
                <thead>
                    <tr className="bg-slate-900 text-white uppercase tracking-wider">
                        <th className="py-2 px-3 text-left w-10">No</th>
                        <th className="py-2 px-3 text-left">Deskripsi Barang / Jasa</th>
                        <th className="py-2 px-3 text-center w-20">Qty</th>
                        <th className="py-2 px-3 text-right w-32">Harga Satuan</th>
                        <th className="py-2 px-3 text-right w-24">Diskon</th>
                        <th className="py-2 px-3 text-right w-36">Total</th>
                    </tr>
                </thead>
                <tbody className="border-b border-slate-300">
                    {data.items.map((item, index) => {
                        const itemTotal = (item.price - item.discount) * item.qty;
                        return (
                            <tr key={item.id} className="border-b border-slate-100 last:border-0 align-top">
                                <td className="py-3 px-3 text-center font-bold text-slate-500">{index + 1}</td>
                                <td className="py-3 px-3 font-semibold">{item.desc}</td>
                                <td className="py-3 px-3 text-center">{item.qty} <span className="text-[10px] text-slate-500">{item.unit}</span></td>
                                <td className="py-3 px-3 text-right font-mono">{formatCurrency(item.price)}</td>
                                <td className="py-3 px-3 text-right font-mono text-rose-600">{item.discount > 0 ? formatCurrency(item.discount) : '-'}</td>
                                <td className="py-3 px-3 text-right font-mono font-bold">{formatCurrency(itemTotal)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

        {/* TOTALS & TERMS */}
        <div className="flex gap-6 mb-8">
            {/* TERMS */}
            <div className="w-3/5 text-xs">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4">
                    <h3 className="font-bold text-blue-800 uppercase tracking-wider mb-2">Informasi Pengiriman & Pembayaran</h3>
                    <table className="w-full">
                        <tbody>
                            <tr><td className="w-32 py-1 text-slate-600 font-bold">Metode Pengiriman</td><td className="w-4">:</td><td className="py-1 font-semibold">{data.shippingMethod}</td></tr>
                            <tr><td className="w-32 py-1 text-slate-600 font-bold">Est. Tgl Pengiriman</td><td className="w-4">:</td><td className="py-1 font-semibold text-rose-700">{formatDateSafe(data.estDeliveryDate)}</td></tr>
                            <tr><td className="w-32 py-1 text-slate-600 font-bold">Termin Pembayaran</td><td className="w-4">:</td><td className="py-1 font-semibold">{data.paymentTerms}</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Syarat & Ketentuan:</h3>
                <div className="text-slate-600 whitespace-pre-line leading-relaxed text-[11px] mb-4">{data.termsAndConditions}</div>
                
                <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Catatan Khusus:</h3>
                <div className="text-slate-600 italic text-[11px]">{data.notes}</div>
            </div>

            {/* TOTALS */}
            <div className="w-2/5">
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-slate-200">
                            <td className="py-2 text-slate-600 font-bold">Subtotal</td>
                            <td className="py-2 text-right font-mono font-bold">{formatCurrency(subTotal)}</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                            <td className="py-2 text-slate-600 font-bold">PPN ({data.taxRate}%)</td>
                            <td className="py-2 text-right font-mono">{formatCurrency(taxAmount)}</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                            <td className="py-2 text-slate-600 font-bold">Biaya Pengiriman</td>
                            <td className="py-2 text-right font-mono">{formatCurrency(data.shippingFee)}</td>
                        </tr>
                        <tr className="bg-slate-900 text-white">
                            <td className="py-3 px-3 font-black uppercase tracking-wider">Total Pesanan</td>
                            <td className="py-3 px-3 text-right font-mono font-black text-lg">{formatCurrency(grandTotal)}</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                            <td className="py-2 text-slate-600 font-bold">Uang Muka (DP)</td>
                            <td className="py-2 text-right font-mono text-rose-600">({formatCurrency(data.downPayment)})</td>
                        </tr>
                        <tr className="bg-emerald-50">
                            <td className="py-3 px-3 font-black uppercase text-emerald-900">Sisa Tagihan</td>
                            <td className="py-3 px-3 text-right font-mono font-black text-emerald-900 text-lg">{formatCurrency(amountDue)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* SIGNATURES */}
        <div className="mt-12 pt-6 border-t-[3px] border-slate-900 flex justify-between text-center break-inside-avoid">
            <div className="w-64">
                <p className="mb-2 font-bold uppercase text-xs">{data.issuerName}</p>
                <p className="text-[10px] text-slate-500 mb-16">Authorized Signature</p>
                <p className="font-bold underline uppercase">{data.authorizedSignName}</p>
                <p className="text-xs">{data.authorizedSignTitle}</p>
            </div>
            
            <div className="w-64">
                <p className="mb-2 font-bold uppercase text-xs text-slate-500">{data.recipientName}</p>
                <p className="text-[10px] text-slate-500 mb-16">Accepted & Confirmed By</p>
                <p className="font-bold uppercase text-slate-300">___________________________</p>
                <p className="text-xs text-slate-400">Name / Title / Date</p>
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
              <ArrowLeftCircle size={20} className="text-amber-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">B2B Procurement</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-amber-600" /> Data Order</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('company')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'company' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Instansi</button>
                <button onClick={() => setActiveTab('items')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'items' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Barang</button>
                <button onClick={() => setActiveTab('terms')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'terms' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. S&K</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'company' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Tipe Dokumen
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Dokumen</label>
                            <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none font-bold" value={data.docType} onChange={e => handleDataChange('docType', e.target.value)}>
                                <option value="ORDER CONFIRMATION">ORDER CONFIRMATION</option>
                                <option value="PURCHASE ORDER">PURCHASE ORDER</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Dokumen</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Dokumen</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.docDate} onChange={e => handleDataChange('docDate', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Est. Tanggal Kirim</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none text-rose-700 font-bold" value={data.estDeliveryDate} onChange={e => handleDataChange('estDeliveryDate', e.target.value)} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Pembeli / Pemesan (Issuer)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Kop)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.issuerName} onChange={e => handleDataChange('issuerName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.issuerAddress} onChange={e => handleDataChange('issuerAddress', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.issuerContact} onChange={e => handleDataChange('issuerContact', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.issuerEmail} onChange={e => handleDataChange('issuerEmail', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPWP Perusahaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.issuerTaxId} onChange={e => handleDataChange('issuerTaxId', e.target.value)} />
                        </div>
                        <div className="border-t pt-3">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penanda Tangan Pemesan</label>
                            <div className="flex gap-3">
                                <input className="w-1/2 bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.authorizedSignName} onChange={e => handleDataChange('authorizedSignName', e.target.value)} placeholder="Nama Terang" />
                                <input className="w-1/2 bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.authorizedSignTitle} onChange={e => handleDataChange('authorizedSignTitle', e.target.value)} placeholder="Jabatan" />
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-slate-600"/> Data Tujuan (Vendor / Supplier)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Vendor / Penerima</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.recipientName} onChange={e => handleDataChange('recipientName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Vendor</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.recipientAddress} onChange={e => handleDataChange('recipientAddress', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak / UP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.recipientContact} onChange={e => handleDataChange('recipientContact', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Vendor</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.recipientEmail} onChange={e => handleDataChange('recipientEmail', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
                  </>
              )}

              {activeTab === 'items' && (
                  <div className="space-y-4">
                      {data.items.map((item, index) => (
                          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 relative border-l-4 border-l-amber-500">
                              <h3 className="text-xs font-black uppercase text-amber-800 tracking-tight border-b pb-2 border-slate-100 flex justify-between">
                                  <span>Barang/Jasa #{index + 1}</span>
                                  {data.items.length > 1 && (
                                      <button onClick={() => removeItem(item.id)} className="text-rose-500 hover:text-rose-700 flex items-center gap-1"><Trash2 size={12}/> Hapus</button>
                                  )}
                              </h3>
                              <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deskripsi Lengkap</label>
                                  <textarea className="w-full bg-amber-50/30 p-3 border border-amber-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none font-semibold" value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-3 gap-3">
                                  <div className="col-span-2">
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Harga Satuan (Rp)</label>
                                      <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={item.price} onChange={e => updateItem(item.id, 'price', Number(e.target.value))} />
                                  </div>
                                  <div>
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Diskon (Rp)</label>
                                      <input type="number" className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold font-mono text-rose-700 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={item.discount} onChange={e => updateItem(item.id, 'discount', Number(e.target.value))} />
                                  </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                  <div>
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kuantitas (Qty)</label>
                                      <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={item.qty} onChange={e => updateItem(item.id, 'qty', Number(e.target.value))} />
                                  </div>
                                  <div>
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Satuan</label>
                                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={item.unit} onChange={e => updateItem(item.id, 'unit', e.target.value)} placeholder="Unit, Pcs, Lot, dll" />
                                  </div>
                              </div>
                          </div>
                      ))}
                      
                      <button onClick={addItem} className="w-full py-4 rounded-xl border-2 border-dashed border-amber-300 text-amber-700 font-bold text-sm hover:bg-amber-50 hover:border-amber-500 transition-colors flex justify-center items-center gap-2">
                          <Plus size={18} /> Tambah Barang / Jasa
                      </button>
                  </div>
              )}

              {activeTab === 'terms' && (
                  <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Percent size={14} className="text-blue-600"/> Pajak & Biaya Tambahan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Persentase Pajak (PPN %)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.taxRate} onChange={e => handleDataChange('taxRate', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Biaya Pengiriman (Rp)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.shippingFee} onChange={e => handleDataChange('shippingFee', Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Uang Muka / Down Payment (Rp)</label>
                            <input type="number" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-rose-700" value={data.downPayment} onChange={e => handleDataChange('downPayment', Number(e.target.value))} />
                        </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Truck size={14} className="text-slate-600"/> Pengiriman & S&K
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pengiriman</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.shippingMethod} onChange={e => handleDataChange('shippingMethod', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Termin Pembayaran</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={data.paymentTerms} onChange={e => handleDataChange('paymentTerms', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Catatan Khusus</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none italic" value={data.notes} onChange={e => handleDataChange('notes', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Syarat & Ketentuan Umum</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed" value={data.termsAndConditions} onChange={e => handleDataChange('termsAndConditions', e.target.value)} />
                        </div>
                    </div>
                  </div>
                  </>
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
              <PrintWrapper documentName="B2B_Order" price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
