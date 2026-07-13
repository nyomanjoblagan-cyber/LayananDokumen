'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Truck, Building2, Calendar, FileText, Percent, ChevronDown, Check, Edit3, Eye, RotateCcw, X, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

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
  
  // Perusahaan
  companyName: string;
  companyInfo: string;
  
  // Vendor
  vendorName: string;
  vendorContact: string;
  vendorAddress: string;
  
  // Ship To
  shipToName: string;
  shipToAddress: string;
  shipVia: string;
  
  // Items & Money
  items: POItem[];
  taxRate: number;
  
  // Terms & Footer
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
  date: '', 
  deliveryDate: '', 
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

export default function PurchaseOrderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Sistem PO...</div>}>
      <POToolBuilder />
    </Suspense>
  );
}

function POToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<POData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today, deliveryDate: nextWeek }));
  }, []);

  // CALCULATIONS
  const subtotal = data.items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price)), 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const total = subtotal + taxAmount;

  const handleDataChange = (field: keyof POData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (idx: number, field: keyof POItem, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setData(prev => ({ 
        ...prev, 
        items: [...prev.items, { id: Date.now(), name: '', qty: 1, unit: 'Pcs', price: 0 }] 
    }));
  };

  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, deliveryDate: nextWeek });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? 'Industrial' : 'Corporate';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas className={templateId === 1 ? 'font-serif' : 'font-sans'}>
        {/* HEADER PO */}
        <div className="flex justify-between items-start mb-6 border-b-2 border-slate-900 pb-4 shrink-0">
          <div className="flex items-center gap-4">
            {logo ? (
              <img src={logo} className="h-16 w-16 object-contain block" alt="Logo" />
            ) : (
              <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 print:hidden">
                <Building2 size={24} />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-black uppercase leading-tight tracking-tighter text-slate-900">{data.companyName}</h1>
              <div className="text-[9pt] text-slate-600 whitespace-pre-line leading-tight mt-1">{data.companyInfo}</div>
            </div>
          </div>
          <div className="text-right">
            <h2 className={`text-3xl font-black uppercase tracking-tighter leading-none mb-1 ${templateId === 2 ? 'text-blue-800' : 'text-slate-900'}`}>PURCHASE ORDER</h2>
            <div className="text-sm font-bold font-mono text-slate-800">{data.no}</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Date: {formatDateSafe(data.date)}</div>
          </div>
        </div>

        {/* VENDOR & SHIP INFO */}
        <div className="grid grid-cols-2 gap-6 mb-6 text-[9.5pt] shrink-0 break-inside-avoid">
          <div className={`p-4 border border-slate-300 rounded-lg ${templateId === 2 ? 'bg-slate-50 border-l-4 border-l-blue-600' : 'bg-transparent border-l-4 border-l-slate-900'}`}>
            <div className="font-bold uppercase text-[8pt] text-slate-500 mb-2 tracking-widest">To (Vendor):</div>
            <div className="font-black text-slate-900 uppercase text-sm">{data.vendorName}</div>
            <div className="font-bold text-slate-700 mt-1">Attn: {data.vendorContact}</div>
            <div className="text-slate-600 leading-snug mt-1">{data.vendorAddress}</div>
          </div>
          <div className={`p-4 border border-slate-300 rounded-lg ${templateId === 2 ? 'bg-slate-50 border-l-4 border-l-emerald-600' : 'bg-transparent border-l-4 border-l-slate-900'}`}>
            <div className="font-bold uppercase text-[8pt] text-slate-500 mb-2 tracking-widest">Ship To:</div>
            <div className="font-black text-slate-900 uppercase text-sm">{data.shipToName}</div>
            <div className="text-slate-600 leading-snug mt-1">{data.shipToAddress}</div>
            <div className="text-[10px] mt-2 font-bold text-slate-700">Delivery Via: <span className="uppercase text-emerald-600">{data.shipVia}</span></div>
          </div>
        </div>

        {/* TABLE ITEMS */}
        <div className="flex-grow mb-6">
          <table className="w-full border-collapse text-[10pt]">
            <thead>
              <tr className={`${templateId === 2 ? 'bg-blue-800 text-white border-blue-800' : 'bg-slate-900 text-white border-slate-900'} uppercase text-[8pt] font-black border`}>
                <th className="p-2 text-center w-10 border-r border-slate-700">#</th>
                <th className="p-2 text-left border-r border-slate-700">Description of Goods/Services</th>
                <th className="p-2 text-center w-20 border-r border-slate-700">Qty</th>
                <th className="p-2 text-center w-20 border-r border-slate-700">Unit</th>
                <th className="p-2 text-right w-28 border-r border-slate-700">Unit Price</th>
                <th className="p-2 text-right w-32">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, idx) => (
                <tr key={idx} className="border-b border-x border-slate-300 break-inside-avoid">
                  <td className="p-2 text-center text-slate-600 border-r border-slate-300">{idx + 1}</td>
                  <td className="p-2 font-bold text-slate-900 border-r border-slate-300">{item.name}</td>
                  <td className="p-2 text-center border-r border-slate-300">{item.qty}</td>
                  <td className="p-2 text-center border-r border-slate-300">{item.unit}</td>
                  <td className="p-2 text-right border-r border-slate-300">{item.price.toLocaleString('id-ID')}</td>
                  <td className="p-2 text-right font-bold text-slate-900">{(item.qty * item.price).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS & TERMS */}
        <div className="grid grid-cols-12 gap-6 break-inside-avoid shrink-0">
          <div className="col-span-7 space-y-4">
            <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
              <div className="font-bold uppercase text-[8pt] text-slate-500 mb-1 border-b border-slate-200 pb-1">Terms & Conditions</div>
              <div className="grid grid-cols-3 gap-2 text-[9pt] mt-2">
                <div className="text-slate-500 font-bold">Payment Terms:</div>
                <div className="col-span-2 text-slate-900 font-semibold">{data.termsPayment}</div>
                <div className="text-slate-500 font-bold">Delivery Terms:</div>
                <div className="col-span-2 text-slate-900 font-semibold">{data.termsDelivery}</div>
                <div className="text-slate-500 font-bold">Delivery Date:</div>
                <div className="col-span-2 text-slate-900 font-semibold text-emerald-700">{formatDateSafe(data.deliveryDate)}</div>
              </div>
            </div>
            
            <div>
              <div className="font-bold uppercase text-[8pt] text-slate-500 mb-1">Special Notes / Instructions:</div>
              <div className="text-[9pt] text-slate-700 whitespace-pre-line leading-relaxed">{data.notes}</div>
            </div>
          </div>
          
          <div className="col-span-5">
            <div className="border border-slate-300 rounded-lg overflow-hidden">
              <div className="flex justify-between p-2 border-b border-slate-200 text-[10pt]">
                <span className="font-bold text-slate-600">Subtotal</span>
                <span className="font-bold text-slate-900">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between p-2 border-b border-slate-200 text-[10pt]">
                <span className="font-bold text-slate-600">VAT / PPN ({data.taxRate}%)</span>
                <span className="font-bold text-slate-900">Rp {taxAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className={`flex justify-between p-3 text-[12pt] font-black ${templateId === 2 ? 'bg-blue-800 text-white' : 'bg-slate-900 text-white'}`}>
                <span>TOTAL</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNATURES */}
        <div className="mt-12 flex justify-end shrink-0 break-inside-avoid">
          <div className="text-center w-64">
             <p className="text-[9pt] font-black uppercase text-slate-500 tracking-widest mb-16">Authorized Signature</p>
             <p className="font-black underline uppercase text-[11pt] text-slate-900">{data.signer}</p>
             <p className="text-[9pt] font-bold text-slate-600 mt-1">{data.signerJob}</p>
          </div>
        </div>
      </Kertas>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `\n@media print {\n  @page { size: A4; margin: 15mm; } \n  body { background: white; margin: 0; padding: 0; width: 100%; }\n  .no-print { display: none !important; }\n  #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }\n  .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }\n  .break-before-auto { break-before: auto !important; page-break-before: auto !important; }\n  * { box-sizing: border-box !important; }\n}\n` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <FileText size={16} className="text-blue-500" /> <span>Purchase Order Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Industrial Standard {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Corporate Modern {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print PO</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Order Details</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:hidden print:overflow-visible print:bg-white">
              
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Purchaser Info</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <Upload size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Company Name" />
                      <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none h-16 resize-none" value={data.companyInfo} onChange={e => handleDataChange('companyInfo', e.target.value)} placeholder="Company Info" />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><Truck size={12}/> Vendor & Shipping</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Supplier Name" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.vendorContact} onChange={e => handleDataChange('vendorContact', e.target.value)} placeholder="Supplier Contact (Attn)" />
                 <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none h-16 resize-none" value={data.vendorAddress} onChange={e => handleDataChange('vendorAddress', e.target.value)} placeholder="Supplier Address" />
                 
                 <div className="border-t pt-3 mt-3"></div>
                 
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none" value={data.shipToName} onChange={e => handleDataChange('shipToName', e.target.value)} placeholder="Ship To Name" />
                 <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none h-16 resize-none" value={data.shipToAddress} onChange={e => handleDataChange('shipToAddress', e.target.value)} placeholder="Ship To Address" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.shipVia} onChange={e => handleDataChange('shipVia', e.target.value)} placeholder="Ship Via (e.g. Trucking)" />
                 
                 <div className="grid grid-cols-2 gap-2 mt-3 border-t pt-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="PO Number" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.deliveryDate} onChange={e => handleDataChange('deliveryDate', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-purple-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Terms & Conditions</h3>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.termsPayment} onChange={e => handleDataChange('termsPayment', e.target.value)} placeholder="Payment Terms (e.g., Net 30)" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.termsDelivery} onChange={e => handleDataChange('termsDelivery', e.target.value)} placeholder="Delivery Terms (e.g., DDP)" />
                 <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none h-20 resize-none" value={data.notes} onChange={e => handleDataChange('notes', e.target.value)} placeholder="Special Notes/Instructions" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-600 border-b pb-1 tracking-widest flex items-center gap-2"><Edit3 size={12}/> Signatures</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none" value={data.signer} onChange={e => handleDataChange('signer', e.target.value)} placeholder="Signer Name" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Signer Job Title" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Order Items</h3>
                    <button onClick={addItem} className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold uppercase hover:bg-emerald-500 transition-colors">+ Item</button>
                 </div>
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border group relative animate-in slide-in-from-right-2">
                       <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Trash2 size={12}/></button>
                       <input className="w-full p-1 bg-transparent border-b text-xs font-bold uppercase focus:border-emerald-500 outline-none" placeholder="Item Description" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                       <div className="grid grid-cols-3 gap-2 mt-2">
                          <input type="number" className="p-1 border rounded text-[10px] text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                          <input className="p-1 border rounded text-[10px] text-center uppercase" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} placeholder="Unit" />
                          <input type="number" className="p-1 border rounded text-[10px] text-right" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                       </div>
                    </div>
                 ))}
                 <div className="pt-2 border-t flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">VAT / PPN (%)</label>
                    <input type="number" className="w-16 p-1 border rounded text-xs font-black text-center text-blue-600" value={data.taxRate} onChange={e => handleDataChange('taxRate', Number(e.target.value))} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW area */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
