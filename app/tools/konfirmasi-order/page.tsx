'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, CheckCircle2, Building2, UserCircle2, 
  PackageCheck, CalendarDays, ShoppingBag, Plus, Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function KonfirmasiPesananPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Pesanan...</div>}>
      <OrderConfirmationBuilder />
    </Suspense>
  );
}

function OrderConfirmationBuilder() {
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
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
    estDelivery: '2026-01-12',
    shippingMethod: 'Kurir Internal Perusahaan',
    notes: 'Harga sudah termasuk PPN 11%. Barang akan dikirim setelah PO resmi kami terima.'
  });

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

  const OCContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border font-sans text-[10.5pt] leading-normal text-slate-900 print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm]" 
         style={{ width: '210mm', height: '290mm', position: 'relative' }}>
      
      {/* HEADER */}
      <div className="flex justify-between items-start border-b-4 border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-slate-900 text-white rounded">
              <PackageCheck size={28} />
           </div>
           <div>
              <h1 className="text-lg font-black uppercase tracking-tighter leading-none">{data.vendorName}</h1>
              <p className="text-[8pt] text-slate-500 mt-1">{data.vendorAddress}</p>
           </div>
        </div>
        <div className="text-right">
           <div className="bg-blue-600 text-white px-3 py-1 rounded text-[9pt] font-black uppercase inline-block">Order Confirmation</div>
           <p className="text-[9pt] mt-1 font-mono font-bold">Ref: {data.orderNo}</p>
        </div>
      </div>

      <div className="space-y-6 flex-grow">
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-1">
              <h4 className="text-[9pt] font-black text-slate-400 uppercase tracking-widest border-b">Pelanggan:</h4>
              <p className="font-bold text-sm uppercase">{data.clientName}</p>
              <p className="text-xs">{data.clientContact}</p>
              <p className="text-[9pt] text-slate-500">{data.clientAddress}</p>
           </div>
           <div className="space-y-1 text-right">
              <h4 className="text-[9pt] font-black text-slate-400 uppercase tracking-widest border-b">Info Pesanan:</h4>
              <p className="text-xs">Tanggal: <b>{new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'long'})}</b></p>
              <p className="text-xs">Est. Pengiriman: <b>{new Date(data.estDelivery).toLocaleDateString('id-ID', {dateStyle:'long'})}</b></p>
              <p className="text-xs text-blue-600 font-bold uppercase">{data.shippingMethod}</p>
           </div>
        </div>

        <div>
           <table className="w-full border-collapse">
              <thead>
                 <tr className="bg-slate-100 border-y border-slate-900">
                    <th className="p-2 text-left text-[9pt] uppercase">Deskripsi Produk</th>
                    <th className="p-2 text-center text-[9pt] uppercase w-20">Qty</th>
                    <th className="p-2 text-right text-[9pt] uppercase w-32">Harga</th>
                    <th className="p-2 text-right text-[9pt] uppercase w-32">Subtotal</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {data.items.map((item, idx) => (
                    <tr key={idx}>
                       <td className="p-2 text-sm font-medium">{item.name}</td>
                       <td className="p-2 text-center text-sm">{item.qty} {item.unit}</td>
                       <td className="p-2 text-right text-sm">{formatRupiah(item.price)}</td>
                       <td className="p-2 text-right text-sm font-bold">{formatRupiah(item.qty * item.price)}</td>
                    </tr>
                 ))}
                 <tr className="bg-slate-50 border-t-2 border-slate-900">
                    <td colSpan={3} className="p-3 text-right font-black uppercase text-xs">Total Estimasi Pesanan</td>
                    <td className="p-3 text-right font-black text-base">{formatRupiah(subTotal)}</td>
                 </tr>
              </tbody>
           </table>
        </div>

        <div className="space-y-2 pt-4">
           <h4 className="text-[9pt] font-black text-slate-400 uppercase tracking-widest">Catatan Penting:</h4>
           <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-xs text-blue-900 leading-relaxed italic">
              {data.notes}
           </div>
        </div>
      </div>

      <div className="shrink-0 mt-8 flex justify-between items-end border-t pt-8">
         <div className="text-center w-56">
            <p className="mb-14 text-[9pt] uppercase font-bold text-slate-400">Penerima Pesanan</p>
            <div className="w-40 border-b border-slate-300 mx-auto"></div>
            <p className="text-[9pt] mt-1 font-bold">Marketing / Sales</p>
         </div>
         <div className="text-center w-56">
            <p className="text-xs mb-14 uppercase text-slate-500 font-bold tracking-tighter">Disetujui Pelanggan</p>
            <div className="w-40 border-b border-slate-300 mx-auto"></div>
            <p className="text-[9pt] mt-1 uppercase font-bold">{data.clientName}</p>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* EDITOR UI */}
      <div id="ui-root" className="flex flex-col h-screen no-print font-sans">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all active:scale-95"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2">
              <CheckCircle2 size={18} /> Order Confirmation
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all active:scale-95">
            <Printer size={16} /> Print Konfirmasi
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[400px] bg-white border-r overflow-y-auto p-5 space-y-6 text-slate-900 scrollbar-thin">
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Nomor & Vendor</h3>
                <input className="w-full p-2 border rounded text-xs" value={data.orderNo} onChange={e => handleDataChange('orderNo', e.target.value)} />
                <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} />
             </div>
             
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex justify-between items-center">
                   <span>Item Pesanan</span>
                   <button onClick={addItem} className="bg-blue-600 text-white p-1 rounded"><Plus size={12}/></button>
                </h3>
                {data.items.map((item, idx) => (
                   <div key={idx} className="p-3 bg-slate-50 rounded border relative group">
                      <button onClick={() => removeItem(idx)} className="absolute -top-1 -right-1 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100"><Trash2 size={12}/></button>
                      <input className="w-full p-1 bg-transparent border-b text-xs font-bold mb-2" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} placeholder="Nama Item" />
                      <div className="grid grid-cols-3 gap-1">
                         <input type="number" className="p-1 border rounded text-[10px]" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                         <input className="p-1 border rounded text-[10px]" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                         <input type="number" className="p-1 border rounded text-[10px]" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                      </div>
                   </div>
                ))}
             </div>

             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Detail Kirim & Catatan</h3>
                <input type="date" className="w-full p-2 border rounded text-xs" value={data.estDelivery} onChange={e => handleDataChange('estDelivery', e.target.value)} />
                <textarea className="w-full p-2 border rounded text-xs h-20 resize-none font-sans" value={data.notes} onChange={e => handleDataChange('notes', e.target.value)} placeholder="Catatan Tambahan..." />
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-10 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <OCContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <OCContent />
      </div>
    </div>
  );
}