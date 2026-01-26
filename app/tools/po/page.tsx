'use client';

/**
 * FILE: PurchaseOrderPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Purchase Order (PO)
 * FEATURES:
 * - Dual Template (Industrial vs Corporate)
 * - Auto Calculation (Subtotal, Tax, Total)
 * - Dynamic Item List
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Truck, Building2, Calendar, FileText, Percent, ChevronDown, Check, Edit3, Eye, RotateCcw, X
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: POData = {
  no: `PO/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
  date: '', // Diisi useEffect
  deliveryDate: '', // Diisi useEffect
  
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

// --- 3. KOMPONEN UTAMA ---
export default function PurchaseOrderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Sistem PO...</div>}>
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
  const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const total = subtotal + taxAmount;

  // HANDLERS
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
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, deliveryDate: nextWeek });
        setLogo(null);
    }
  };

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Industrial (Standard)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Corporate (Modern)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Industrial' : 'Corporate';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif' : 'font-sans'}`}>
      
      {/* HEADER PO */}
      <div className="flex justify-between items-start mb-8 border-b-2 border-slate-900 pb-4 shrink-0">
        <div className="flex items-center gap-4">
          {logo ? (
            <img src={logo} className="h-16 w-16 object-contain block print:block" />
          ) : (
            <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 print:hidden">
              <Building2 size={24} />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold uppercase leading-none">{data.companyName}</h1>
            <div className="text-[8pt] text-slate-600 whitespace-pre-line leading-tight mt-1 print:text-black">{data.companyInfo}</div>
          </div>
        </div>
        <div className="text-right">
          <h2 className={`text-3xl font-black uppercase tracking-tighter ${templateId === 2 ? 'text-blue-800 print:text-black' : ''}`}>Purchase Order</h2>
          <div className="text-sm font-bold mt-1 font-mono">No: {data.no}</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest print:text-black">{data.date}</div>
        </div>
      </div>

      {/* VENDOR & SHIP INFO */}
      <div className="grid grid-cols-2 gap-6 mb-6 text-[9.5pt] shrink-0">
        <div className={`p-3 border ${templateId === 2 ? 'border-blue-100 bg-blue-50/30 print:bg-transparent print:border-black' : 'border-slate-900'}`}>
          <div className={`font-black uppercase text-[8pt] mb-2 border-b ${templateId === 2 ? 'text-blue-800 border-blue-100 print:text-black print:border-black' : 'border-slate-900'}`}>Vendor / Supplier</div>
          <div className="font-bold text-sm">{data.vendorName}</div>
          <div>{data.vendorContact}</div>
          <div className="text-slate-600 italic leading-tight mt-1 print:text-black">{data.vendorAddress}</div>
        </div>
        <div className={`p-3 border ${templateId === 2 ? 'border-blue-100 bg-blue-50/30 print:bg-transparent print:border-black' : 'border-slate-900'}`}>
          <div className={`font-black uppercase text-[8pt] mb-2 border-b ${templateId === 2 ? 'text-blue-800 border-blue-100 print:text-black print:border-black' : 'border-slate-900'}`}>Ship To (Kirim Ke)</div>
          <div className="font-bold text-sm">{data.shipToName}</div>
          <div className="text-xs">Via: <span className="font-bold uppercase">{data.shipVia}</span></div>
          <div className="text-slate-600 leading-tight mt-1 print:text-black">{data.shipToAddress}</div>
        </div>
      </div>

      {/* TABLE ITEMS */}
      <div className="flex-grow overflow-hidden mb-6">
        <table className="w-full border-collapse text-[9.5pt]">
          <thead>
            <tr className={`${templateId === 2 ? 'bg-blue-800 text-white' : 'bg-slate-900 text-white'} uppercase text-[8pt] font-black print:bg-transparent print:text-black`}>
              <th className="p-2 border border-slate-700 w-10 print:border-black">#</th>
              <th className="p-2 border border-slate-700 text-left print:border-black">Description</th>
              <th className="p-2 border border-slate-700 w-16 print:border-black">Qty</th>
              <th className="p-2 border border-slate-700 w-24 print:border-black">Price</th>
              <th className="p-2 border border-slate-700 w-32 print:border-black">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => (
              <tr key={idx} className="border-b border-slate-200 print:border-black">
                <td className="p-2 text-center border-x border-slate-200 print:border-black">{idx + 1}</td>
                <td className="p-2 font-medium border-r border-slate-200 uppercase print:border-black">{item.name}</td>
                <td className="p-2 text-center border-r border-slate-200 print:border-black">{item.qty} {item.unit}</td>
                <td className="p-2 text-right border-r border-slate-200 print:border-black">{item.price.toLocaleString()}</td>
                <td className="p-2 text-right font-bold border-r border-slate-200 print:border-black">{(item.qty * item.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTAL & FOOTER */}
      <div className="shrink-0 mt-auto" style={{ pageBreakInside: 'avoid' }}>
        <div className="flex justify-between items-start gap-10">
          <div className="flex-1">
            <div className="font-black uppercase text-[8pt] border-b border-slate-200 mb-2 print:border-black">Notes & Instructions</div>
            <div className="text-[8pt] text-slate-600 whitespace-pre-line italic leading-tight print:text-black">{data.notes}</div>
          </div>
          <div className="w-64 space-y-1 text-[10pt]">
            <div className="flex justify-between border-b border-slate-100 pb-1 print:border-black"><span>Subtotal</span><span>{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between border-b border-slate-100 pb-1 print:border-black"><span>PPN ({data.taxRate}%)</span><span>{taxAmount.toLocaleString()}</span></div>
            <div className={`flex justify-between p-2 font-black text-lg ${templateId === 2 ? 'bg-blue-800 text-white' : 'bg-slate-900 text-white'} print:bg-transparent print:text-black print:border print:border-black`}>
              <span>TOTAL</span><span>{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end border-t border-slate-100 pt-8 print:border-slate-900">
            <div className="text-[8pt] text-slate-400 italic max-w-[300px] print:text-black">Delivery Required By: {isClient && data.deliveryDate ? new Date(data.deliveryDate).toLocaleDateString('id-ID') : '...'}</div>
            <div className="text-center w-56">
               <p className="text-[8pt] font-black uppercase text-slate-400 mb-16 tracking-widest print:text-black">Authorized Signature</p>
               <p className="font-bold underline uppercase text-sm leading-none">{data.signer}</p>
               <p className="text-[9pt] text-slate-500 mt-1 print:text-black">{data.signerJob}</p>
            </div>
        </div>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400 uppercase tracking-widest text-xs">Initializing...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <FileText size={16} className="text-blue-500" /> <span>PO Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Order</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Identitas Pembeli</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus Logo</button>}
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.companyInfo} onChange={e => handleDataChange('companyInfo', e.target.value)} placeholder="Alamat & Kontak" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Truck size={12}/> Detail Vendor & Logistik</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Nama Supplier" />
                 <input className="w-full p-2 border rounded text-xs" value={data.vendorContact} onChange={e => handleDataChange('vendorContact', e.target.value)} placeholder="Kontak Supplier" />
                 <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.vendorAddress} onChange={e => handleDataChange('vendorAddress', e.target.value)} placeholder="Alamat Supplier" />
                 
                 <div className="grid grid-cols-2 gap-2 border-t pt-2">
                    <input className="w-full p-2 border rounded text-xs font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No PO" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.deliveryDate} onChange={e => handleDataChange('deliveryDate', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-emerald-600">Item Order</h3>
                    <button onClick={addItem} className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">+ TAMBAH</button>
                 </div>
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded border relative group">
                       <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                       <input className="w-full p-1 bg-transparent border-b mb-2 text-xs font-bold" placeholder="Nama Barang/Jasa" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                       <div className="grid grid-cols-3 gap-2">
                          <input type="number" className="w-full p-1 border rounded text-[10px] text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                          <input className="w-full p-1 border rounded text-[10px] text-center uppercase" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                          <input type="number" className="w-full p-1 border rounded text-[10px] text-right" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                       </div>
                    </div>
                 ))}
                 <div className="pt-2 border-t flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2"><Percent size={12}/> Pajak (PPN %)</label>
                    <input type="number" className="w-16 p-1 border rounded text-xs font-bold text-center" value={data.taxRate} onChange={e => handleDataChange('taxRate', Number(e.target.value))} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-500 border-b pb-1 flex items-center gap-2"><Edit3 size={12}/> Catatan & Otoritas</h3>
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.notes} onChange={e => handleDataChange('notes', e.target.value)} placeholder="Catatan Tambahan" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.signer} onChange={e => handleDataChange('signer', e.target.value)} placeholder="Nama Penandatangan" />
                    <input className="w-full p-2 border rounded text-xs" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan" />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                    <DocumentContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
