'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Building2, Plus, Trash2, ReceiptText, Percent, Users
} from 'lucide-react';
import Link from 'next/link';

export default function FakturPajakUMKMPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Invoice Editor...</div>}>
      <TaxInvoiceBuilder />
    </Suspense>
  );
}

function TaxInvoiceBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const [data, setData] = useState({
    invoiceNo: 'INV/2026/001',
    date: new Date().toISOString().split('T')[0],
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
  });

  // --- DEFINISI TEMPLATE & VARIABEL (FIX ERROR) ---
  const TEMPLATES = [
    { id: 1, name: "Faktur Standar (Formal)", desc: "Layout profesional bersih" },
    { id: 2, name: "Modern UMKM (Biru)", desc: "Layout dengan aksen warna" }
  ];
  
  const activeTemplate = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
  const activeTemplateName = activeTemplate.name;

  // --- LOGIKA HITUNG ---
  const subTotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const ppnAmount = (subTotal * data.taxRate) / 100;
  const pphAmount = (subTotal * data.withholdingTax) / 100;
  const grandTotal = subTotal + ppnAmount - pphAmount;

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const handleAddItem = () => setData({ ...data, items: [...data.items, { desc: '', qty: 1, price: 0 }] });
  const handleRemoveItem = (index: number) => setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  const updateItem = (index: number, field: string, val: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: val };
    setData({ ...data, items: newItems });
  };

  // --- KOMPONEN ISI FAKTUR (UNIFIED) ---
  const FacturContent = () => (
    <div className={`bg-white mx-auto flex flex-col box-border font-sans print:m-0 print:border-none print:shadow-none p-[15mm]`} 
         style={{ width: '210mm', minHeight: '296mm', color: '#1e293b' }}>
      
      {/* HEADER */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6 shrink-0">
        <div>
          <h1 className={`text-2xl font-black ${templateId === 2 ? 'text-blue-700' : 'text-slate-900'}`}>FAKTUR PAJAK / INVOICE</h1>
          <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider">No: {data.invoiceNo}</p>
        </div>
        <div className="text-right">
          <h2 className="font-bold text-lg leading-tight uppercase">{data.vendorName}</h2>
          <p className="text-[10px] text-slate-500 max-w-[250px] mt-1">{data.vendorAddress}</p>
          <p className="text-[10px] font-bold mt-1">NPWP: {data.vendorNpwp}</p>
        </div>
      </div>

      {/* INFORMASI PIHAK */}
      <div className="grid grid-cols-2 gap-10 mb-8 shrink-0">
        <div>
          <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Ditujukan Kepada:</h3>
          <p className="font-bold text-sm uppercase">{data.clientName}</p>
          <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">{data.clientAddress}</p>
          <p className="text-[10px] font-bold mt-1 italic">NPWP: {data.clientNpwp || '-'}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <table className="w-full text-[10px]">
            <tbody className="divide-y divide-slate-200">
              <tr><td className="py-1.5 text-slate-500 font-bold uppercase tracking-tighter">Tanggal Faktur</td><td className="text-right font-bold">{new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</td></tr>
              <tr><td className="py-1.5 text-slate-500 font-bold uppercase tracking-tighter">Jatuh Tempo</td><td className="text-right font-bold text-red-600">{data.dueDate ? new Date(data.dueDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '-'}</td></tr>
              <tr><td className="py-1.5 text-slate-500 font-bold uppercase tracking-tighter">Status Pajak</td><td className="text-right font-bold text-emerald-600 uppercase">Input Pajak UMKM</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TABEL ITEM */}
      <div className="flex-grow">
        <table className="w-full mb-8 border-collapse">
          <thead>
            <tr className={`${templateId === 2 ? 'bg-blue-700 text-white' : 'bg-slate-900 text-white'} uppercase text-[9px] font-bold`}>
              <th className="p-3 text-left border-none">Deskripsi Produk / Jasa</th>
              <th className="p-3 text-center w-16 border-none">Qty</th>
              <th className="p-3 text-right w-32 border-none">Harga</th>
              <th className="p-3 text-right w-32 border-none">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 border-b-2 border-slate-900">
            {data.items.map((item, idx) => (
              <tr key={idx} className="text-[11px]">
                <td className="p-3 align-top font-medium uppercase">{item.desc}</td>
                <td className="p-3 align-top text-center">{item.qty}</td>
                <td className="p-3 align-top text-right">{formatRupiah(item.price)}</td>
                <td className="p-3 align-top text-right font-bold">{formatRupiah(item.qty * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div className="flex justify-end mb-12">
          <div className="w-72">
            <table className="w-full text-[11px]">
              <tbody>
                <tr><td className="py-1.5 text-slate-500">Subtotal</td><td className="text-right font-bold">{formatRupiah(subTotal)}</td></tr>
                <tr className="text-emerald-600 font-medium"><td className="py-1.5 uppercase tracking-tighter">PPN ({data.taxRate}%)</td><td className="text-right font-bold">+ {formatRupiah(ppnAmount)}</td></tr>
                {data.withholdingTax > 0 && (
                  <tr className="text-red-600 font-medium"><td className="py-1.5">PPh 23 ({data.withholdingTax}%)</td><td className="text-right font-bold">- {formatRupiah(pphAmount)}</td></tr>
                )}
                <tr className={`${templateId === 2 ? 'bg-blue-50 text-blue-900' : 'bg-slate-100 text-slate-900'} border-t-2 border-slate-900`}>
                  <td className="p-3 font-black uppercase text-[10px]">Grand Total</td>
                  <td className="p-3 text-right font-black text-sm">{formatRupiah(grandTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 grid grid-cols-2 gap-10 items-end">
        <div>
          <h4 className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">Catatan/Instruksi:</h4>
          <div className="text-[10px] text-slate-600 bg-slate-50 p-3 rounded border border-dashed border-slate-200 min-h-[60px] leading-relaxed">
            {data.note}
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] mb-16 uppercase tracking-widest text-slate-500">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
          <div className="border-b border-slate-300 w-48 mx-auto mb-1"></div>
          <p className="font-bold uppercase text-[11px] leading-tight">{data.vendorName}</p>
          <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Authorized Signature</p>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-slate-100 mt-10 shrink-0">
        <p className="text-[8px] text-slate-300 uppercase tracking-widest font-bold">Generated by BantuWarga Legal Platform • Digital UMKM Invoice</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200">
      
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { 
            height: auto !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important; 
            overflow: visible !important;
          }
          #ui-root { display: none !important; }
          #print-only-container { 
            display: block !important; 
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
          }
        }
      `}</style>

      {/* --- UI EDITOR (HIDDEN ON PRINT) --- */}
      <div id="ui-root" className="flex flex-col h-screen no-print font-sans">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-2xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <div className="h-6 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <ReceiptText size={20} className="text-emerald-400" />
              <h1 className="font-black text-sm uppercase tracking-tighter">Tax Invoice <span className="text-slate-500 font-normal">UMKM Edition</span></h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 min-w-[180px] justify-between transition-all hover:bg-slate-700">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-slate-200 z-[999] overflow-hidden">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => {setTemplateId(t.id); setShowTemplateMenu(false)}} className={`w-full text-left p-4 text-xs hover:bg-blue-50 border-b last:border-0 ${templateId === t.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'text-slate-700'}`}>
                      <div className="font-black uppercase tracking-tighter text-[10px]">{t.name}</div>
                      <div className="text-slate-400 mt-0.5 text-[9px]">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> Print Faktur
            </button>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-6 scrollbar-thin font-sans text-slate-900">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Penerbit UMKM</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Nama UMKM" />
                <input className="w-full p-2 border rounded text-xs" value={data.vendorNpwp} onChange={e => handleDataChange('vendorNpwp', e.target.value)} placeholder="NPWP UMKM" />
                <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.vendorAddress} onChange={e => handleDataChange('vendorAddress', e.target.value)} placeholder="Alamat" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Users size={12}/> Pelanggan</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} placeholder="Nama Client" />
                <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.clientAddress} onChange={e => handleDataChange('clientAddress', e.target.value)} placeholder="Alamat" />
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-1">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Daftar Item</h3>
                   <button onClick={handleAddItem} className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">+ Tambah</button>
                </div>
                {data.items.map((item, idx) => (
                   <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative space-y-2 group">
                      <button onClick={() => handleRemoveItem(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                      <input className="w-full p-1.5 text-xs bg-white border rounded" placeholder="Nama Produk/Jasa" value={item.desc} onChange={e => updateItem(idx, 'desc', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input type="number" className="w-full p-1.5 text-xs bg-white border rounded" placeholder="Qty" value={item.qty} onChange={e => updateItem(idx, 'qty', parseInt(e.target.value) || 0)} />
                         <input type="number" className="w-full p-1.5 text-xs bg-white border rounded" placeholder="Harga" value={item.price} onChange={e => updateItem(idx, 'price', parseInt(e.target.value) || 0)} />
                      </div>
                   </div>
                ))}
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Percent size={12}/> Pajak & Info</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div><label className="text-[9px] font-bold uppercase text-slate-500">PPN (%)</label><input type="number" className="w-full p-2 border rounded text-xs" value={data.taxRate} onChange={e => handleDataChange('taxRate', parseInt(e.target.value) || 0)} /></div>
                   <div><label className="text-[9px] font-bold uppercase text-slate-500">PPh 23 (%)</label><input type="number" className="w-full p-2 border rounded text-xs" value={data.withholdingTax} onChange={e => handleDataChange('withholdingTax', parseInt(e.target.value) || 0)} /></div>
                </div>
                <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.note} onChange={e => handleDataChange('note', e.target.value)} placeholder="Instruksi Pembayaran..." />
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.6] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <FacturContent />
             </div>
          </div>
        </div>
      </div>

      {/* --- AREA PRINT MURNI (HIDDEN ON SCREEN) --- */}
      <div id="print-only-container" className="hidden">
         <FacturContent />
      </div>

    </div>
  );
}