'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Plus, Trash2, LayoutTemplate, Building2, ReceiptText, UserCircle2, Coins
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
  
  vendorName: string;
  vendorAddress: string;
  vendorNpwp: string;
  
  clientName: string;
  clientAddress: string;
  clientNpwp: string;
  
  items: InvoiceItem[];
  
  taxRate: number;
  withholdingTax: number;
  note: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: InvoiceData = {
  invoiceNo: 'INV/2026/001',
  date: '', 
  dueDate: '',
  city: 'Jakarta',
  
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

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[10pt]' : 'font-sans text-[9pt]'}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function FakturPajakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Faktur Editor...</div>}>
      <FakturBuilder />
    </Suspense>
  );
}

function FakturBuilder() {
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

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset faktur ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, dueDate: today });
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: Number(e.target.value) });
  };

  const updateItem = (index: number, field: keyof InvoiceItem, val: string | number) => {
      const newItems = [...data.items];
      newItems[index] = { ...newItems[index], [field]: val };
      setData({ ...data, items: newItems });
  };
  const addItem = () => setData({ ...data, items: [...data.items, { desc: '', qty: 1, price: 0 }] });
  const removeItem = (index: number) => {
      if(data.items.length <= 1) return;
      setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };
  const formatDate = (dateStr: string) => {
      if(!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal (Serif)' : 'Modern Premium (Sans)';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[9999]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 1 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 2 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Modern Premium (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => {
      const subtotal = data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
      const taxAmount = subtotal * (data.taxRate / 100);
      const whtAmount = subtotal * (data.withholdingTax / 100);
      const grandTotal = subtotal + taxAmount - whtAmount;

      return (
        <Kertas templateId={templateId}>
          {/* HEADER INVOICE */}
          <div className="flex justify-between items-start border-b-[3px] border-black pb-4 mb-6 break-inside-avoid">
              <div className="w-1/2 pr-4">
                  <h1 className="font-black text-2xl uppercase tracking-wider text-black mb-1">INVOICE / FAKTUR</h1>
                  <p className="font-bold text-[12pt]">{data.vendorName}</p>
                  <p className="text-slate-700 mt-1 whitespace-pre-wrap">{data.vendorAddress}</p>
                  <p className="mt-1"><span className="font-bold">NPWP:</span> {data.vendorNpwp}</p>
              </div>
              <div className="w-1/2 text-right">
                  <div className="inline-block text-left bg-slate-50 border border-slate-300 p-3 rounded-lg w-full max-w-[250px] ml-auto">
                      <div className="flex justify-between mb-1">
                          <span className="text-slate-500 font-bold">No. Invoice</span>
                          <span className="font-black">{data.invoiceNo}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                          <span className="text-slate-500 font-bold">Tanggal</span>
                          <span className="font-medium">{formatDate(data.date)}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-slate-500 font-bold">Jatuh Tempo</span>
                          <span className="font-medium text-red-600">{formatDate(data.dueDate)}</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* INFO KLIEN */}
          <div className="mb-8 break-inside-avoid">
              <p className="font-bold text-slate-500 uppercase tracking-widest text-[8pt] mb-2">Tagihan Kepada:</p>
              <h2 className="font-black text-[12pt] uppercase">{data.clientName}</h2>
              <p className="mt-1 max-w-[300px] whitespace-pre-wrap">{data.clientAddress}</p>
              <p className="mt-1"><span className="font-bold">NPWP:</span> {data.clientNpwp}</p>
          </div>

          {/* TABEL ITEM */}
          <div className="mb-6">
              <table className="w-full border-collapse border border-slate-300">
                  <thead>
                      <tr className="bg-slate-100 font-bold uppercase text-[8pt] tracking-widest text-slate-700">
                          <th className="border border-slate-300 p-3 text-left w-12">No</th>
                          <th className="border border-slate-300 p-3 text-left">Deskripsi Barang / Jasa</th>
                          <th className="border border-slate-300 p-3 text-center w-16">Qty</th>
                          <th className="border border-slate-300 p-3 text-right w-32">Harga Satuan</th>
                          <th className="border border-slate-300 p-3 text-right w-40">Total</th>
                      </tr>
                  </thead>
                  <tbody>
                      {data.items.map((item, idx) => (
                          <tr key={idx} className="border-b border-slate-200 break-inside-avoid">
                              <td className="border-x border-slate-300 p-3 text-center align-top">{idx + 1}</td>
                              <td className="border-x border-slate-300 p-3 align-top font-medium">{item.desc}</td>
                              <td className="border-x border-slate-300 p-3 text-center align-top">{item.qty}</td>
                              <td className="border-x border-slate-300 p-3 text-right align-top">{formatCurrency(item.price)}</td>
                              <td className="border-x border-slate-300 p-3 text-right align-top font-bold">{formatCurrency(item.qty * item.price)}</td>
                          </tr>
                      ))}
                      {/* Empty rows to fill space if needed */}
                      {data.items.length < 5 && Array(5 - data.items.length).fill(0).map((_, idx) => (
                          <tr key={'empty-'+idx} className="border-b border-slate-200">
                              <td className="border-x border-slate-300 p-3">&nbsp;</td>
                              <td className="border-x border-slate-300 p-3">&nbsp;</td>
                              <td className="border-x border-slate-300 p-3">&nbsp;</td>
                              <td className="border-x border-slate-300 p-3">&nbsp;</td>
                              <td className="border-x border-slate-300 p-3">&nbsp;</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          {/* TOTAL & CATATAN */}
          <div className="flex justify-between items-start break-inside-avoid">
              <div className="w-1/2 pr-6">
                  <p className="font-bold text-slate-500 uppercase tracking-widest text-[8pt] mb-2">Catatan Pembayaran:</p>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded whitespace-pre-wrap min-h-[80px]">
                      {data.note}
                  </div>
              </div>
              <div className="w-1/2 w-max-[300px]">
                  <table className="w-full text-right">
                      <tbody>
                          <tr>
                              <td className="py-2 pr-4 font-bold text-slate-600">Subtotal</td>
                              <td className="py-2 font-bold w-40">{formatCurrency(subtotal)}</td>
                          </tr>
                          {data.taxRate > 0 && (
                          <tr>
                              <td className="py-2 pr-4 font-medium text-slate-500">PPN ({data.taxRate}%)</td>
                              <td className="py-2">{formatCurrency(taxAmount)}</td>
                          </tr>
                          )}
                          {data.withholdingTax > 0 && (
                          <tr>
                              <td className="py-2 pr-4 font-medium text-slate-500">PPh ({data.withholdingTax}%)</td>
                              <td className="py-2 text-red-600">-{formatCurrency(whtAmount)}</td>
                          </tr>
                          )}
                          <tr className="border-t-2 border-black">
                              <td className="py-3 pr-4 font-black uppercase text-[12pt]">Total Tagihan</td>
                              <td className="py-3 font-black text-[12pt] bg-amber-200">{formatCurrency(grandTotal)}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

          {/* TANDA TANGAN */}
          <div className="mt-12 flex justify-end break-inside-avoid">
              <div className="text-center w-[200px]">
                  <p className="mb-1">{data.city}, {formatDate(data.date)}</p>
                  <p className="font-bold mb-4">{data.vendorName}</p>
                  <div className="h-24"></div>
                  <div className="border-b border-black w-full mb-1"></div>
                  <p className="text-[8pt] uppercase tracking-widest text-slate-500">Authorized Signature</p>
              </div>
          </div>
        </Kertas>
      );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Faktur Pajak/Invoice</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-sky-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <ReceiptText size={18} className="text-sky-600" /> Editor Faktur B2B
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INFORMASI FAKTUR */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <ReceiptText size={14} className="text-amber-600"/> Data Faktur
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Invoice</label>
                        <input type="text" name="invoiceNo" value={data.invoiceNo} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Invoice</label>
                            <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jatuh Tempo</label>
                            <input type="date" name="dueDate" value={data.dueDate} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-red-600 font-bold focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penerbitan</label>
                        <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

                {/* 2. VENDOR (PENJUAL) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-sky-600"/> Penjual (Vendor)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Penjual</label>
                        <input type="text" name="vendorName" value={data.vendorName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPWP Penjual</label>
                        <input type="text" name="vendorNpwp" value={data.vendorNpwp} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-sky-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Penjual</label>
                        <textarea name="vendorAddress" value={data.vendorAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-sky-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 3. KLIEN (PEMBELI) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-emerald-600"/> Pembeli (Klien)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Pembeli</label>
                        <input type="text" name="clientName" value={data.clientName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NPWP Pembeli</label>
                        <input type="text" name="clientNpwp" value={data.clientNpwp} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Pembeli</label>
                        <textarea name="clientAddress" value={data.clientAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-emerald-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 4. ITEM BARANG/JASA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-2"><Coins size={14} className="text-purple-600"/> Item Tagihan</span>
                    <button onClick={addItem} className="text-[10px] bg-purple-100 text-purple-700 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-purple-200 transition-colors"><Plus size={12}/> Tambah</button>
                  </h3>
                  <div className="space-y-4">
                      {data.items.map((item, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group">
                              <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-sm"><Trash2 size={12}/></button>
                              <div className="space-y-3">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deskripsi Item</label>
                                    <input type="text" value={item.desc} onChange={(e) => updateItem(idx, 'desc', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Nama barang/jasa" />
                                  </div>
                                  <div className="grid grid-cols-3 gap-3">
                                      <div className="col-span-1">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">QTY</label>
                                        <input type="number" min="1" value={item.qty} onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value)||0)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-center focus:ring-2 focus:ring-purple-500 outline-none" />
                                      </div>
                                      <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Harga Satuan (Rp)</label>
                                        <input type="number" min="0" value={item.price} onChange={(e) => updateItem(idx, 'price', parseInt(e.target.value)||0)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-right focus:ring-2 focus:ring-purple-500 outline-none" />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                </div>

                {/* 5. PAJAK & CATATAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <ReceiptText size={14} className="text-rose-600"/> Pajak & Catatan
                  </h3>
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">PPN (%)</label>
                            <input type="number" name="taxRate" value={data.taxRate} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-rose-800 text-center focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">PPh Potongan (%)</label>
                            <input type="number" name="withholdingTax" value={data.withholdingTax} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-rose-800 text-center focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Catatan Pembayaran (Info Rekening)</label>
                        <textarea name="note" value={data.note} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-24 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Faktur Pajak B2B" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
