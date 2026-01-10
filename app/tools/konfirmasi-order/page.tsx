'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, CheckCircle2, Building2, UserCircle2, 
  PackageCheck, CalendarDays, ShoppingBag, Plus, Trash2, Edit3, Eye, LayoutTemplate, Check, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function KonfirmasiPesananPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Pesanan...</div>}>
      <OrderConfirmationBuilder />
    </Suspense>
  );
}

function OrderConfirmationBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: '',
    orderNo: 'OC/2026/01/0012',
    
    // PENERBIT (VENDOR)
    vendorName: 'PT. KREATIF LOGISTIK NUSANTARA',
    vendorAddress: 'Jl. Ahmad Yani No. 88, Bekasi, Jawa Barat',

    // PELANGGAN
    clientName: 'PT. MAJU MUNDUR SEJAHTERA',
    clientContact: 'Ibu Sarah (Procurement)',
    clientAddress: 'Sudirman Central Business District (SCBD), Jakarta Selatan',
    
    // ITEM PESANAN
    items: [
      { name: 'Kertas HVS A4 80gr', qty: 50, unit: 'Rim', price: 55000 },
      { name: 'Tinta Printer Epson 003 Black', qty: 10, unit: 'Botol', price: 95000 },
    ],
    
    // KETERANGAN PENGIRIMAN
    estDelivery: '',
    shippingMethod: 'Kurir Internal Perusahaan',
    notes: 'Harga sudah termasuk PPN 11%. Barang akan dikirim setelah PO resmi kami terima.'
  });

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

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const addItem = () => setData({ ...data, items: [...data.items, { name: '', qty: 1, unit: 'Unit', price: 0 }] });
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };

  const handleItemChange = (idx: number, field: string, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };

  const subTotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const TEMPLATES = [
    { id: 1, name: "Format Standar Bisnis", desc: "Tampilan profesional & bersih" },
    { id: 2, name: "Format Invoice Style", desc: "Lebih mirip tagihan resmi" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const OCContent = () => (
    <div className="bg-white flex flex-col box-border font-sans text-[10.5pt] leading-normal text-slate-900 p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
      
      {/* HEADER */}
      <div className="flex justify-between items-start border-b-4 border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-slate-900 text-white rounded print:text-black print:bg-transparent print:border print:border-black">
              <PackageCheck size={28} />
           </div>
           <div>
              <h1 className="text-lg font-black uppercase tracking-tighter leading-none">{data.vendorName}</h1>
              <p className="text-[8pt] text-slate-500 mt-1 print:text-black">{data.vendorAddress}</p>
           </div>
        </div>
        <div className="text-right">
           <div className="bg-blue-600 text-white px-3 py-1 rounded text-[9pt] font-black uppercase inline-block print:text-black print:bg-transparent print:border print:border-black">Order Confirmation</div>
           <p className="text-[9pt] mt-1 font-mono font-bold">Ref: {data.orderNo}</p>
        </div>
      </div>

      <div className="space-y-6 flex-grow overflow-hidden">
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-1">
              <h4 className="text-[9pt] font-black text-slate-400 uppercase tracking-widest border-b print:text-black print:border-black">Pelanggan:</h4>
              <p className="font-bold text-sm uppercase">{data.clientName}</p>
              <p className="text-xs">{data.clientContact}</p>
              <p className="text-[9pt] text-slate-500 print:text-black">{data.clientAddress}</p>
           </div>
           <div className="space-y-1 text-right">
              <h4 className="text-[9pt] font-black text-slate-400 uppercase tracking-widest border-b print:text-black print:border-black">Info Pesanan:</h4>
              <p className="text-xs">Tanggal: <b>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</b></p>
              <p className="text-xs">Est. Pengiriman: <b>{isClient && data.estDelivery ? new Date(data.estDelivery).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</b></p>
              <p className="text-xs text-blue-600 font-bold uppercase print:text-black">{data.shippingMethod}</p>
           </div>
        </div>

        <div>
           <table className="w-full border-collapse text-sm">
              <thead>
                 <tr className="bg-slate-100 border-y border-slate-900 print:bg-transparent print:border-black">
                    <th className="p-2 text-left text-[9pt] uppercase">Deskripsi Produk</th>
                    <th className="p-2 text-center text-[9pt] uppercase w-20">Qty</th>
                    <th className="p-2 text-right text-[9pt] uppercase w-32">Harga</th>
                    <th className="p-2 text-right text-[9pt] uppercase w-32">Subtotal</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 print:divide-slate-300">
                 {data.items.map((item, idx) => (
                    <tr key={idx}>
                       <td className="p-2 text-sm font-medium">{item.name}</td>
                       <td className="p-2 text-center text-sm">{item.qty} {item.unit}</td>
                       <td className="p-2 text-right text-sm">{formatRupiah(item.price)}</td>
                       <td className="p-2 text-right text-sm font-bold">{formatRupiah(item.qty * item.price)}</td>
                    </tr>
                 ))}
                 <tr className="bg-slate-50 border-t-2 border-slate-900 print:bg-transparent print:border-black">
                    <td colSpan={3} className="p-3 text-right font-black uppercase text-xs">Total Estimasi Pesanan</td>
                    <td className="p-3 text-right font-black text-base">{formatRupiah(subTotal)}</td>
                 </tr>
              </tbody>
           </table>
        </div>

        <div className="space-y-2 pt-4">
           <h4 className="text-[9pt] font-black text-slate-400 uppercase tracking-widest print:text-black">Catatan Penting:</h4>
           <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-xs text-blue-900 leading-relaxed italic print:bg-transparent print:text-black print:border-black">
              {data.notes}
           </div>
        </div>
      </div>

      <div className="shrink-0 mt-8 flex justify-between items-end border-t pt-8 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="text-center w-56">
            <p className="mb-14 text-[9pt] uppercase font-bold text-slate-400 print:text-black">Penerima Pesanan</p>
            <div className="w-40 border-b border-slate-300 mx-auto print:border-black"></div>
            <p className="text-[9pt] mt-1 font-bold">Marketing / Sales</p>
         </div>
         <div className="text-center w-56">
            <p className="text-xs mb-14 uppercase text-slate-500 font-bold tracking-tighter print:text-black">Disetujui Pelanggan</p>
            <div className="w-40 border-b border-slate-300 mx-auto print:border-black"></div>
            <p className="text-[9pt] mt-1 uppercase font-bold">{data.clientName}</p>
         </div>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
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
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
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
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

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
                 <div style={{ width: '210mm' }}>
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