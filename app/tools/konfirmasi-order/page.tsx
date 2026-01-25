'use client';

/**
 * FILE: KonfirmasiPesananPage.tsx
 * STATUS: FINAL FIXED (COLOR PRINT & CLEAN PREVIEW)
 * DESC: Generator Konfirmasi Pesanan
 * FIXES: 
 * - Mengaktifkan 'print-color-adjust: exact' agar warna background/teks tercetak.
 * - Menghapus class 'print:text-black' pada elemen berwarna agar tetap berwarna.
 * - Membersihkan wrapper preview agar tidak terlihat seperti 2 kertas tertumpuk.
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, PackageCheck, CalendarDays, ShoppingBag, 
  Plus, Trash2, Edit3, Eye, LayoutTemplate, Check, ChevronDown, 
  Building2, UserCircle2, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
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

  const subTotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Standar Bisnis
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Invoice Style
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Standar Bisnis' : 'Invoice Style';

  // --- KOMPONEN ISI SURAT ---
  const OCContent = () => (
    // FIX: Menggunakan p-[20mm] yang konsisten untuk Print & Preview.
    // Menghapus wrapper ganda di parent.
    <div className="bg-white flex flex-col box-border font-sans text-[10pt] leading-normal text-slate-900 w-[210mm] min-h-[296mm] p-[20mm] shadow-2xl print:shadow-none print:m-0 print:w-full print:h-auto mx-auto">
      
      {/* ---------------- TEMPLATE 1: STANDAR BISNIS ---------------- */}
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
               {/* WARNA BIRU DIPERTAHANKAN SAAT PRINT */}
               <div className="bg-blue-600 text-white px-3 py-1 rounded text-[9pt] font-black uppercase inline-block">Order Confirmation</div>
               <p className="text-[10pt] mt-1 font-mono font-bold text-slate-600">#{data.orderNo}</p>
            </div>
          </div>

          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-12 mb-8">
               <div>
                  <h4 className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">Kepada (Klien):</h4>
                  <p className="font-bold text-[11pt] uppercase">{data.clientName}</p>
                  <p className="text-[10pt]">{data.clientContact}</p>
                  <p className="text-[10pt] text-slate-600 mt-1 leading-snug">{data.clientAddress}</p>
               </div>
               <div className="text-right">
                  <h4 className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">Detail Order:</h4>
                  <p className="text-[10pt]">Tanggal: <b>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</b></p>
                  <p className="text-[10pt]">Est. Kirim: <b>{isClient && data.estDelivery ? new Date(data.estDelivery).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</b></p>
                  <p className="text-[10pt] text-blue-700 font-bold uppercase mt-1">{data.shippingMethod}</p>
               </div>
            </div>

            <table className="w-full border-collapse text-[10pt] mb-8">
               <thead>
                  {/* WARNA BACKGROUND TABLE HEADER DIPERTAHANKAN */}
                  <tr className="bg-slate-100 border-y-2 border-slate-800">
                     <th className="p-2 text-left uppercase text-[9pt] font-bold">Deskripsi Barang</th>
                     <th className="p-2 text-center uppercase text-[9pt] font-bold w-20">Qty</th>
                     <th className="p-2 text-right uppercase text-[9pt] font-bold w-32">Harga</th>
                     <th className="p-2 text-right uppercase text-[9pt] font-bold w-36">Total</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-200">
                  {data.items.map((item, idx) => (
                     <tr key={idx}>
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

            {/* WARNA BACKGROUND NOTES DIPERTAHANKAN */}
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-[10pt] italic text-blue-900 leading-relaxed">
               <span className="font-bold not-italic text-[9pt] uppercase block mb-1">Catatan:</span>
               "{data.notes}"
            </div>
          </div>

          <div className="shrink-0 mt-8 flex justify-between items-end border-t pt-8 border-slate-800" style={{ pageBreakInside: 'avoid' }}>
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

      {/* ---------------- TEMPLATE 2: INVOICE STYLE ---------------- */}
      {templateId === 2 && (
        <div className="flex flex-col h-full border-4 double border-slate-800 p-6">
           <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-800 border-dashed">
              <div>
                 <h1 className="text-3xl font-black uppercase tracking-tighter">{data.vendorName}</h1>
                 <p className="text-[10pt] mt-1 font-medium">{data.vendorAddress}</p>
              </div>
              <div className="text-right">
                 <h2 className="text-2xl font-black text-slate-300 uppercase">ORDER CONFIRMATION</h2>
                 <p className="font-mono font-bold text-lg mt-1">{data.orderNo}</p>
                 <p className="text-[10pt]">{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</p>
              </div>
           </div>

           <div className="flex-grow">
              <div className="bg-slate-100 p-4 mb-6 border border-slate-300">
                 <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-[10pt]">
                    <div className="font-bold">KEPADA</div><div>:</div><div className="font-bold uppercase">{data.clientName}</div>
                    <div className="font-bold">UP</div><div>:</div><div>{data.clientContact}</div>
                    <div className="font-bold align-top">ALAMAT</div><div className="align-top">:</div><div className="align-top">{data.clientAddress}</div>
                 </div>
              </div>

              <table className="w-full border-2 border-slate-800 mb-6 text-[10pt]">
                 <thead>
                    <tr className="bg-slate-800 text-white">
                       <th className="p-2 border border-slate-800 text-left">ITEM</th>
                       <th className="p-2 border border-slate-800 text-center w-16">QTY</th>
                       <th className="p-2 border border-slate-800 text-right w-32">HARGA</th>
                       <th className="p-2 border border-slate-800 text-right w-36">SUBTOTAL</th>
                    </tr>
                 </thead>
                 <tbody>
                    {data.items.map((item, idx) => (
                       <tr key={idx}>
                          <td className="p-2 border border-slate-800">{item.name}</td>
                          <td className="p-2 border border-slate-800 text-center">{item.qty} {item.unit}</td>
                          <td className="p-2 border border-slate-800 text-right">{formatRupiah(item.price)}</td>
                          <td className="p-2 border border-slate-800 text-right font-bold">{formatRupiah(item.qty * item.price)}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>

              <div className="flex justify-end mb-8">
                 <div className="w-64 border-2 border-slate-800 p-2">
                    <div className="flex justify-between items-center">
                       <span className="font-bold">TOTAL IDR</span>
                       <span className="font-black text-lg">{formatRupiah(subTotal)}</span>
                    </div>
                 </div>
              </div>

              <div className="mb-4">
                 <p className="font-bold text-[10pt] border-b border-black inline-block mb-1">PENGIRIMAN:</p>
                 <p className="text-[10pt]">Estimasi: {isClient && data.estDelivery ? new Date(data.estDelivery).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</p>
                 <p className="text-[10pt]">Metode: {data.shippingMethod}</p>
              </div>

              <div className="text-[10pt] italic">
                 Note: {data.notes}
              </div>
           </div>

           <div className="mt-auto pt-10 flex justify-between text-center shrink-0" style={{ pageBreakInside: 'avoid' }}>
              <div className="w-40">
                 <p className="mb-16 font-bold">Disetujui,</p>
                 <p className="border-t border-black pt-1 font-bold">{data.clientName}</p>
              </div>
              <div className="w-40">
                 <p className="mb-16 font-bold">Hormat Kami,</p>
                 <p className="border-t border-black pt-1 font-bold">{data.vendorName}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          /* MEMAKSA WARNA TERCETAK */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <PackageCheck size={16} className="text-blue-500" /> <span>ORDER CONFIRMATION BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pesanan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Vendor (Penerbit)</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.vendorAddress} onChange={e => handleDataChange('vendorAddress', e.target.value)} placeholder="Alamat Vendor" />
                 <input className="w-full p-2 border rounded text-xs font-mono" value={data.orderNo} onChange={e => handleDataChange('orderNo', e.target.value)} placeholder="No. Order" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Klien (Pelanggan)</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.clientContact} onChange={e => handleDataChange('clientContact', e.target.value)} placeholder="Kontak (PIC)" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.clientAddress} onChange={e => handleDataChange('clientAddress', e.target.value)} placeholder="Alamat Klien" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-2"><ShoppingBag size={12}/> Item Pesanan</h3>
                    <button onClick={addItem} className="text-[9px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold flex items-center gap-1 hover:bg-blue-200"><Plus size={10}/> Tambah</button>
                 </div>
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 rounded border relative group">
                       <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                       <input className="w-full p-1 bg-transparent border-b mb-1 text-xs font-bold" placeholder="Nama Produk" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                       <div className="grid grid-cols-3 gap-1">
                          <input type="number" className="p-1 border rounded text-[10px]" placeholder="Qty" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value))} />
                          <input className="p-1 border rounded text-[10px]" placeholder="Satuan" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                          <input type="number" className="p-1 border rounded text-[10px]" placeholder="Harga" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value))} />
                       </div>
                    </div>
                 ))}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><CalendarDays size={12}/> Pengiriman & Catatan</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded text-[10px]" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-[10px]" value={data.estDelivery} onChange={e => handleDataChange('estDelivery', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.shippingMethod} onChange={e => handleDataChange('shippingMethod', e.target.value)} placeholder="Metode Kirim" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.notes} onChange={e => handleDataChange('notes', e.target.value)} placeholder="Catatan Tambahan" />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }}>
                    <OCContent />
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
            <OCContent />
         </div>
      </div>

    </div>
  );
}
