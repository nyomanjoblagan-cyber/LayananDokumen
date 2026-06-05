'use client';

/**
 * FILE: PurchaseOrderPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Purchase Order (PO) dengan kalkulasi otomatis
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Truck, Building2, Calendar, FileText, Percent, ChevronDown, Check, Edit3, Eye, RotateCcw, X, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  
  // Footer
  notes: string;
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
  notes: '1. Mohon lampirkan Invoice & Surat Jalan saat pengiriman.\n2. Barang harus diterima sebelum jam 16.00 WIB.\n3. Pembayaran TOP 30 Hari.',
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
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif' : 'font-sans'}`}>
        
        {/* HEADER PO */}
        <div className="flex justify-between items-start mb-8 border-b-2 border-slate-900 pb-4 shrink-0">
          <div className="flex items-center gap-4">
            {logo ? (
              <img src={logo} className="h-16 w-16 object-contain block" alt="Logo" />
            ) : (
              <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 print:hidden">
                <Building2 size={24} />
              </div>
            )}
            <div className="font-sans">
              <h1 className="text-xl font-black uppercase leading-tight tracking-tighter">{data.companyName}</h1>
              <div className="text-[8pt] text-slate-500 whitespace-pre-line leading-tight mt-1">{data.companyInfo}</div>
            </div>
          </div>
          <div className="text-right font-sans">
            <h2 className={`text-4xl font-black uppercase tracking-tighter leading-none mb-1 ${templateId === 2 ? 'text-blue-700 print:text-black' : 'text-slate-900'}`}>Purchase Order</h2>
            <div className="text-sm font-bold font-mono">NO: {data.no}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">{formatDateSafe(data.date)}</div>
          </div>
        </div>

        {/* VENDOR & SHIP INFO */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-[9.5pt] shrink-0 font-sans break-inside-avoid">
          <div className={`p-4 border-l-4 rounded-r-xl ${templateId === 2 ? 'bg-slate-50 border-blue-600' : 'bg-slate-50 border-slate-900'} print:bg-transparent print:border-2`}>
            <div className="font-black uppercase text-[8pt] text-slate-400 mb-2 tracking-widest">Supplier Information</div>
            <div className="font-black text-slate-900 uppercase text-sm">{data.vendorName}</div>
            <div className="font-bold text-blue-600">{data.vendorContact}</div>
            <div className="text-slate-600 italic leading-snug mt-2">{data.vendorAddress}</div>
          </div>
          <div className={`p-4 border-l-4 rounded-r-xl ${templateId === 2 ? 'bg-slate-50 border-blue-600' : 'bg-slate-50 border-slate-900'} print:bg-transparent print:border-2`}>
            <div className="font-black uppercase text-[8pt] text-slate-400 mb-2 tracking-widest">Shipping Details</div>
            <div className="font-black text-slate-900 uppercase text-sm">{data.shipToName}</div>
            <div className="text-[10px] mt-1">Delivery Via: <span className="font-black uppercase text-emerald-600">{data.shipVia}</span></div>
            <div className="text-slate-600 leading-snug mt-1">{data.shipToAddress}</div>
          </div>
        </div>

        {/* TABLE ITEMS */}
        <div className="flex-grow overflow-hidden mb-6">
          <table className="w-full border-collapse text-[10pt] font-sans">
            <thead>
              <tr className={`${templateId === 2 ? 'bg-blue-700 text-white' : 'bg-slate-900 text-white'} uppercase text-[8pt] font-black print:bg-transparent print:text-black border-b-2 border-black`}>
                <th className="p-3 text-left w-12">#</th>
                <th className="p-3 text-left">Description of Goods/Services</th>
                <th className="p-3 text-center w-24">Quantity</th>
                <th className="p-3 text-right w-32">Unit Price</th>
                <th className="p-3 text-right w-40">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-100 print:border-black break-inside-avoid">
                  <td className="p-3 font-bold text-slate-300 print:text-black">0{idx + 1}</td>
                  <td className="p-3 font-black text-slate-900 uppercase">{item.name}</td>
                  <td className="p-3 text-center font-bold">{item.qty} {item.unit}</td>
                  <td className="p-3 text-right">{item.price.toLocaleString('id-ID')}</td>
                  <td className="p-3 text-right font-black">{(item.qty * item.price).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAL & FOOTER */}
        <div className="shrink-0 mt-auto break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex justify-between items-start gap-12 font-sans">
            <div className="flex-1">
              <div className="font-black uppercase text-[8pt] text-slate-400 tracking-widest border-b-2 border-slate-50 mb-3">Special Instructions</div>
              <div className="text-[9pt] text-slate-600 whitespace-pre-line italic leading-relaxed print:text-black">{data.notes}</div>
            </div>
            <div className="w-80 space-y-2 text-[10pt]">
              <div className="flex justify-between text-slate-400 font-bold uppercase text-[9px]"><span>Subtotal Excl. Tax</span><span className="text-slate-900">{subtotal.toLocaleString('id-ID')}</span></div>
              <div className="flex justify-between text-slate-400 font-bold uppercase text-[9px]"><span>Value Added Tax ({data.taxRate}%)</span><span className="text-slate-900">{taxAmount.toLocaleString('id-ID')}</span></div>
              <div className={`flex justify-between p-4 font-black text-2xl rounded-2xl ${templateId === 2 ? 'bg-blue-700 text-white' : 'bg-slate-900 text-white'} print:bg-transparent print:text-black print:border-2 print:border-black`}>
                <span>TOTAL</span><span>{total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-between items-end border-t-2 border-slate-50 pt-8 print:border-slate-900 font-sans">
              <div className="text-[8pt] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Truck size={16} className="text-emerald-500" />
                <span>Delivery Required: {formatDateSafe(data.deliveryDate)}</span>
              </div>
              <div className="text-center w-64">
                 <p className="text-[10px] font-black uppercase text-slate-300 mb-16 tracking-[0.3em]">Authorized Procurement</p>
                 <p className="font-black underline uppercase text-base leading-none text-slate-900">{data.signer}</p>
                 <p className="text-[10px] font-bold text-blue-600 mt-2 uppercase tracking-tighter">{data.signerJob}</p>
              </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

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

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Order Details</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Purchaser Info</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <Upload size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Company Name" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><Truck size={12}/> Vendor & Shipping</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Supplier Name" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.shipToName} onChange={e => handleDataChange('shipToName', e.target.value)} placeholder="Ship To Warehouse" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="PO Number" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.deliveryDate} onChange={e => handleDataChange('deliveryDate', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Order Items</h3>
                    <button onClick={addItem} className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold uppercase">+ Item</button>
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
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
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
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE