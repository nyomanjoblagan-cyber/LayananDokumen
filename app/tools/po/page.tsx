'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Truck, Building2, Calendar, FileText, Percent, ChevronDown, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function PurchaseOrderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Sistem PO...</div>}>
      <POToolBuilder />
    </Suspense>
  );
}

function POToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `PO/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
    date: '',
    deliveryDate: '', 
    companyName: 'PT. KARYA MAJU SENTOSA',
    companyInfo: 'Jl. Industri Raya No. 88, Cikarang\nEmail: procurement@kms.com | Telp: 021-8999-7777',
    vendorName: 'CV. BESI BAJA UTAMA',
    vendorContact: 'Ibu Ratna Sari',
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
    signer: 'Budi Santoso',
    signerJob: 'Procurement Manager'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today, deliveryDate: nextWeek }));
  }, []);

  // --- LOGIC HITUNGAN ---
  const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const total = subtotal + taxAmount;

  // HANDLERS
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };
  const handleItemChange = (idx: number, field: string, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };
  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), name: '', qty: 1, unit: 'Pcs', price: 0 }] });
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };

  const TEMPLATES = [
    { id: 1, name: "Industrial", desc: "Format tegas standar gudang" },
    { id: 2, name: "Corporate", desc: "Tampilan biru bersih & modern" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif' : 'font-sans'}`}>
      
      {/* HEADER PO */}
      <div className="flex justify-between items-start mb-8 border-b-2 border-slate-900 pb-4 shrink-0">
        <div className="flex items-center gap-4">
          {logo ? (
            <img src={logo} className="h-16 w-16 object-contain" />
          ) : (
            <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 no-print">
              <Building2 size={24} />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold uppercase leading-none">{data.companyName}</h1>
            <div className="text-[8pt] text-slate-600 whitespace-pre-line leading-tight mt-1">{data.companyInfo}</div>
          </div>
        </div>
        <div className="text-right">
          <h2 className={`text-3xl font-black uppercase tracking-tighter ${templateId === 2 ? 'text-blue-800' : ''}`}>Purchase Order</h2>
          <div className="text-sm font-bold mt-1 font-mono">No: {data.no}</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest">{data.date}</div>
        </div>
      </div>

      {/* VENDOR & SHIP INFO */}
      <div className="grid grid-cols-2 gap-6 mb-6 text-[9.5pt]">
        <div className={`p-3 border ${templateId === 2 ? 'border-blue-100 bg-blue-50/30' : 'border-slate-900'}`}>
          <div className={`font-black uppercase text-[8pt] mb-2 border-b ${templateId === 2 ? 'text-blue-800 border-blue-100' : 'border-slate-900'}`}>Vendor / Supplier</div>
          <div className="font-bold text-sm">{data.vendorName}</div>
          <div>{data.vendorContact}</div>
          <div className="text-slate-600 italic leading-tight mt-1">{data.vendorAddress}</div>
        </div>
        <div className={`p-3 border ${templateId === 2 ? 'border-blue-100 bg-blue-50/30' : 'border-slate-900'}`}>
          <div className={`font-black uppercase text-[8pt] mb-2 border-b ${templateId === 2 ? 'text-blue-800 border-blue-100' : 'border-slate-900'}`}>Ship To (Kirim Ke)</div>
          <div className="font-bold text-sm">{data.shipToName}</div>
          <div className="text-xs">Via: <span className="font-bold uppercase">{data.shipVia}</span></div>
          <div className="text-slate-600 leading-tight mt-1">{data.shipToAddress}</div>
        </div>
      </div>

      {/* TABLE ITEMS */}
      <div className="flex-grow overflow-hidden">
        <table className="w-full border-collapse text-[9.5pt]">
          <thead>
            <tr className={`${templateId === 2 ? 'bg-blue-800 text-white' : 'bg-slate-900 text-white'} uppercase text-[8pt] font-black`}>
              <th className="p-2 border border-slate-700 w-10">#</th>
              <th className="p-2 border border-slate-700 text-left">Description</th>
              <th className="p-2 border border-slate-700 w-16">Qty</th>
              <th className="p-2 border border-slate-700 w-24">Price</th>
              <th className="p-2 border border-slate-700 w-32">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => (
              <tr key={idx} className="border-b border-slate-200">
                <td className="p-2 text-center border-x border-slate-200">{idx + 1}</td>
                <td className="p-2 font-medium border-r border-slate-200 uppercase">{item.name}</td>
                <td className="p-2 text-center border-r border-slate-200">{item.qty} {item.unit}</td>
                <td className="p-2 text-right border-r border-slate-200">{item.price.toLocaleString()}</td>
                <td className="p-2 text-right font-bold border-r border-slate-200">{(item.qty * item.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTAL & FOOTER */}
      <div className="shrink-0 mt-6" style={{ pageBreakInside: 'avoid' }}>
        <div className="flex justify-between items-start gap-10">
          <div className="flex-1">
            <div className="font-black uppercase text-[8pt] border-b border-slate-200 mb-2">Notes & Instructions</div>
            <div className="text-[8pt] text-slate-600 whitespace-pre-line italic leading-tight">{data.notes}</div>
          </div>
          <div className="w-64 space-y-1 text-[10pt]">
            <div className="flex justify-between border-b border-slate-100 pb-1"><span>Subtotal</span><span>{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between border-b border-slate-100 pb-1"><span>PPN ({data.taxRate}%)</span><span>{taxAmount.toLocaleString()}</span></div>
            <div className={`flex justify-between p-2 font-black text-lg ${templateId === 2 ? 'bg-blue-800 text-white' : 'bg-slate-900 text-white'}`}>
              <span>TOTAL</span><span>{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end border-t border-slate-100 pt-8 print:border-slate-900">
           <div className="text-[8pt] text-slate-400 italic max-w-[300px]">Delivery Required By: {data.deliveryDate}</div>
           <div className="text-center w-56">
              <p className="text-[8pt] font-black uppercase text-slate-400 mb-16 tracking-widest print:text-black">Authorized Signature</p>
              <p className="font-bold underline uppercase text-sm leading-none">{data.signer}</p>
              <p className="text-[9pt] text-slate-500 mt-1">{data.signerJob}</p>
           </div>
        </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV (SERAGAM) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter">
               <FileText size={16} /> <span>PO Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gaya Dokumen</div>
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[420px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Identitas Pembeli</h3>
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-slate-50 border-2 border-dashed rounded cursor-pointer flex items-center justify-center" onClick={() => fileInputRef.current?.click()}>
                    {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={16} className="text-slate-300" />}
                 </div>
                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.companyInfo} onChange={e => handleDataChange('companyInfo', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Truck size={12}/> Detail Vendor & Logistik</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Nama Supplier" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No PO" />
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
                  <input className="w-full p-1 bg-transparent border-b mb-2 text-xs font-bold" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="number" className="w-full p-1 border rounded text-[10px] text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                    <input className="w-full p-1 border rounded text-[10px] text-center uppercase" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                    <input type="number" className="w-full p-1 border rounded text-[10px] text-right" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                  </div>
                </div>
              ))}
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 flex flex-col items-center overflow-hidden h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full overflow-y-auto overflow-x-hidden flex justify-center p-4 md:p-12 h-full min-h-0 custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                 <DocumentContent />
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV (SERAGAM) */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}