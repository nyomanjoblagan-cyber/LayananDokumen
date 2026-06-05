'use client';

/**
 * FILE: KonfirmasiPesananPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Konfirmasi Pesanan (Order Confirmation)
 * FIX: Menambahkan variabel 'activeTemplateName' yang hilang dan fix TS 2322.
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, PackageCheck, CalendarDays, ShoppingBag, 
  Plus, Trash2, Edit3, Eye, LayoutTemplate, Check, ChevronDown, 
  Building2, UserCircle2, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface OrderItem {
  name: string;
  qty: number;
  unit: string;
  price: number;
}

interface OrderData {
  city: string;
  date: string;
  orderNo: string;
  vendorName: string;
  vendorAddress: string;
  clientName: string;
  clientContact: string;
  clientAddress: string;
  items: OrderItem[];
  estDelivery: string;
  shippingMethod: string;
  notes: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: OrderData = {
  city: 'JAKARTA',
  date: '', 
  orderNo: 'OC/2026/01/0012',
  vendorName: 'PT. KREATIF LOGISTIK NUSANTARA',
  vendorAddress: 'Jl. Ahmad Yani No. 88, Bekasi, Jawa Barat',
  clientName: 'PT. MAJU MUNDUR SEJAHTERA',
  clientContact: 'Ibu Sarah (Procurement)',
  clientAddress: 'Sudirman Central Business District (SCBD), Jakarta Selatan',
  items: [
    { name: 'Kertas HVS A4 80gr', qty: 50, unit: 'Rim', price: 55000 },
    { name: 'Tinta Printer Epson 003 Black', qty: 10, unit: 'Botol', price: 95000 },
  ],
  estDelivery: '',
  shippingMethod: 'Kurir Internal Perusahaan',
  notes: 'Harga sudah termasuk PPN 11%. Barang akan dikirim setelah PO resmi kami terima.'
};

export default function KonfirmasiPesananPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <OrderConfirmationBuilder />
    </Suspense>
  );
}

function OrderConfirmationBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<OrderData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        estDelivery: nextWeek.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof OrderData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', qty: 1, unit: 'Unit', price: 0 }]
    }));
  };
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleItemChange = (idx: number, field: keyof OrderItem, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            estDelivery: nextWeek.toISOString().split('T')[0] 
        });
    }
  };

  // FIX ERROR 2304: Deklarasi variabel yang hilang
  const activeTemplateName = templateId === 1 ? 'Standar Bisnis' : 'Invoice Style';

  const subTotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const OCContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'long' });
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-sans text-[10pt] leading-normal text-slate-900 w-[210mm] min-h-[296mm] p-[20mm] print:p-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {templateId === 1 && (
          <>
            <div className="flex justify-between items-start border-b-4 border-slate-800 pb-4 mb-8 shrink-0">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-800 text-white rounded">
                    <PackageCheck size={32} />
                 </div>
                 <div>
                    <h1 className="text-xl font-black uppercase tracking-tighter leading-none">{data.vendorName}</h1>
                    <p className="text-[9pt] text-slate-500 mt-1">{data.vendorAddress}</p>
                 </div>
              </div>
              <div className="text-right">
                 <div className="bg-blue-600 text-white px-3 py-1 rounded text-[9pt] font-black uppercase inline-block">Order Confirmation</div>
                 <p className="text-[10pt] mt-1 font-mono font-bold text-slate-600">#{data.orderNo}</p>
              </div>
            </div>

            <div className="flex-grow">
              <div className="grid grid-cols-2 gap-12 mb-8 break-inside-avoid">
                 <div>
                    <h4 className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">Klien:</h4>
                    <p className="font-bold text-[11pt] uppercase">{data.clientName}</p>
                    <p className="text-[10pt]">{data.clientContact}</p>
                    <p className="text-[10pt] text-slate-600 mt-1 leading-snug">{data.clientAddress}</p>
                 </div>
                 <div className="text-right">
                    <h4 className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">Detail:</h4>
                    <p className="text-[10pt]">Tanggal: <b>{formatDateSafe(data.date)}</b></p>
                    <p className="text-[10pt]">Est. Kirim: <b>{formatDateSafe(data.estDelivery)}</b></p>
                    <p className="text-[10pt] text-blue-700 font-bold uppercase mt-1">{data.shippingMethod}</p>
                 </div>
              </div>

              <table className="w-full border-collapse text-[10pt] mb-8">
                 <thead>
                    <tr className="bg-slate-100 border-y-2 border-slate-800">
                       <th className="p-2 text-left uppercase text-[9pt] font-bold">Deskripsi Barang</th>
                       <th className="p-2 text-center uppercase text-[9pt] font-bold w-20">Qty</th>
                       <th className="p-2 text-right uppercase text-[9pt] font-bold w-32">Harga</th>
                       <th className="p-2 text-right uppercase text-[9pt] font-bold w-36">Total</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-200">
                    {data.items.map((item, idx) => (
                       <tr key={idx} className="break-inside-avoid">
                          <td className="p-2 font-medium">{item.name}</td>
                          <td className="p-2 text-center">{item.qty} {item.unit}</td>
                          <td className="p-2 text-right">{formatRupiah(item.price)}</td>
                          <td className="p-2 text-right font-bold">{formatRupiah(item.qty * item.price)}</td>
                       </tr>
                    ))}
                 </tbody>
                 <tfoot>
                    <tr className="bg-slate-50 border-t-2 border-slate-800">
                       <td colSpan={3} className="p-3 text-right font-bold uppercase text-[9pt]">Total Estimasi</td>
                       <td className="p-3 text-right font-black text-[12pt]">{formatRupiah(subTotal)}</td>
                    </tr>
                 </tfoot>
              </table>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-[10pt] italic text-blue-900 leading-relaxed break-inside-avoid">
                 <span className="font-bold not-italic text-[9pt] uppercase block mb-1">Catatan:</span>
                 "{data.notes}"
              </div>
            </div>

            <div className="shrink-0 mt-8 flex justify-between items-end border-t pt-8 border-slate-800 break-inside-avoid">
               <div className="text-center w-48">
                  <p className="mb-16 text-[9pt] uppercase font-bold text-slate-500">Diterima Oleh,</p>
                  <p className="text-[10pt] font-bold border-b border-slate-300 pb-1 uppercase">{data.clientName}</p>
               </div>
               <div className="text-center w-48">
                  <p className="mb-16 text-[9pt] uppercase font-bold text-slate-500">Hormat Kami,</p>
                  <p className="text-[10pt] font-bold border-b border-slate-300 pb-1 uppercase">{data.vendorName}</p>
               </div>
            </div>
          </>
        )}

        {templateId === 2 && (
          <div className="flex flex-col h-full border-4 double border-slate-800 p-6">
             <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-800 border-dashed shrink-0">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">{data.vendorName}</h1>
                    <p className="text-[10pt] mt-1 font-medium">{data.vendorAddress}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-black text-slate-300 uppercase">ORDER CONFIRMATION</h2>
                    <p className="font-mono font-bold text-lg mt-1">#{data.orderNo}</p>
                </div>
             </div>

             <div className="flex-grow font-sans">
                <div className="bg-slate-100 p-4 mb-6 border border-slate-300 break-inside-avoid">
                   <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-[10pt]">
                      <div className="font-bold uppercase text-slate-700">Kepada</div><div>:</div><div className="font-bold uppercase">{data.clientName}</div>
                      <div className="font-bold uppercase text-slate-700">Up</div><div>:</div><div>{data.clientContact}</div>
                      <div className="font-bold uppercase text-slate-700 align-top">Alamat</div><div className="align-top">:</div><div className="align-top">{data.clientAddress}</div>
                   </div>
                </div>

                <table className="w-full border-2 border-slate-800 mb-6 text-[10pt]">
                   <thead>
                      <tr className="bg-slate-800 text-white">
                         <th className="p-2 border border-slate-800 text-left">ITEM DESCRIPTION</th>
                         <th className="p-2 border border-slate-800 text-center w-16">QTY</th>
                         <th className="p-2 border border-slate-800 text-right w-36">SUBTOTAL</th>
                      </tr>
                   </thead>
                   <tbody>
                      {data.items.map((item, idx) => (
                         <tr key={idx} className="break-inside-avoid">
                            <td className="p-2 border border-slate-800">{item.name}</td>
                            <td className="p-2 border border-slate-800 text-center">{item.qty} {item.unit}</td>
                            <td className="p-2 border border-slate-800 text-right font-bold">{formatRupiah(item.qty * item.price)}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>

                <div className="flex justify-end mb-8 break-inside-avoid">
                   <div className="w-64 border-2 border-slate-800 p-2">
                      <div className="flex justify-between items-center">
                         <span className="font-bold uppercase">Grand Total</span>
                         <span className="font-black text-lg">{formatRupiah(subTotal)}</span>
                      </div>
                   </div>
                </div>
                <div className="text-[10pt] italic break-inside-avoid">Note: {data.notes}</div>
             </div>

             <div className="mt-auto pt-10 flex justify-between text-center break-inside-avoid font-sans">
                <div className="w-40 border-t border-black pt-1 font-bold uppercase text-[9pt]">{data.clientName}</div>
                <div className="w-40 border-t border-black pt-1 font-bold uppercase text-[9pt]">{data.vendorName}</div>
             </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0mm !important; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <PackageCheck size={16} className="text-blue-400" /> <span className="uppercase tracking-widest">Order Creator</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold`}>Standar Bisnis</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold`}>Invoice Style</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Vendor</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Nama Perusahaan" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.vendorAddress} onChange={e => handleDataChange('vendorAddress', e.target.value)} placeholder="Alamat Vendor" />
                 <input className="w-full p-2 border rounded-lg text-xs font-mono" value={data.orderNo} onChange={e => handleDataChange('orderNo', e.target.value)} placeholder="No Order" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Klien</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} placeholder="Nama Klien" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.clientAddress} onChange={e => handleDataChange('clientAddress', e.target.value)} placeholder="Alamat Klien" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-2"><ShoppingBag size={12}/> Items</h3>
                    <button onClick={addItem} className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest">+ Item</button>
                 </div>
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border relative group animate-in slide-in-from-right-2">
                       <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"><Trash2 size={12}/></button>
                       <input className="w-full p-1 bg-transparent border-b mb-2 text-xs font-bold" placeholder="Item Name" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                       <div className="grid grid-cols-3 gap-2">
                          <input type="number" className="p-1 border rounded text-[10px]" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                          <input className="p-1 border rounded text-[10px]" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                          <input type="number" className="p-1 border rounded text-[10px]" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <OCContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><OCContent /></div></div>
    </div>
  );
}