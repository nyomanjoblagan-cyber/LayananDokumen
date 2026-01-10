'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Building2, Plus, Trash2, ReceiptText, Percent, Users,
  ArrowLeftCircle, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function FakturPajakUMKMPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Invoice Editor...</div>}>
      <TaxInvoiceBuilder />
    </Suspense>
  );
}

function TaxInvoiceBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    invoiceNo: 'INV/2026/001',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    city: 'Jakarta',
    
    // VENDOR (PENJUAL)
    vendorName: 'CV. MEDIA KREATIF NUSANTARA',
    vendorAddress: 'Ruko Green Lake No. 12, Cengkareng, Jakarta Barat',
    vendorNpwp: '01.234.567.8-012.000',
    
    // CLIENT (PEMBELI)
    clientName: 'PT. TEKNOLOGI JAYA ABADI',
    clientAddress: 'SCBD Lot 10, Jakarta Selatan',
    clientNpwp: '02.987.654.3-015.000',
    
    // ITEMS
    items: [
      { desc: 'Jasa Pembuatan Website Company Profile', qty: 1, price: 5000000 },
      { desc: 'Hosting & Domain (1 Tahun)', qty: 1, price: 1500000 }
    ],
    
    // PAJAK & TOTAL
    taxRate: 11, // PPN %
    withholdingTax: 0, // PPh %
    note: 'Pembayaran melalui Rekening BCA 123456789 a.n CV Media Kreatif Nusantara'
  });

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
    <div className={`bg-white mx-auto flex flex-col box-border font-sans text-slate-900 leading-snug`}>
      
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
              <tr key={idx} className="text-[11px]" style={{ pageBreakInside: 'avoid' }}>
                <td className="p-3 align-top font-medium uppercase">{item.desc}</td>
                <td className="p-3 align-top text-center">{item.qty}</td>
                <td className="p-3 align-top text-right">{formatRupiah(item.price)}</td>
                <td className="p-3 align-top text-right font-bold">{formatRupiah(item.qty * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS (Break Avoid) */}
        <div className="flex justify-end mb-12" style={{ pageBreakInside: 'avoid' }}>
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
      <div className="shrink-0 grid grid-cols-2 gap-10 items-end" style={{ pageBreakInside: 'avoid' }}>
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
        <p className="text-[8px] text-slate-300 uppercase tracking-widest font-bold">Generated by LayananDokumen.com • Digital UMKM Invoice</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* --- JURUS TABLE WRAPPER (Print Fix) --- */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; display: block !important; }
          #print-only-root { display: block !important; width: 100%; height: auto; position: absolute; top: 0; left: 0; z-index: 9999; background: white; }
          
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 10mm; } 
          .print-table tfoot { height: 10mm; } 
          .print-content-wrapper { padding: 0 20mm; }
          
          tr, .keep-together { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Invoice UMKM <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Faktur Standar' : 'Modern UMKM'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Faktur Standar</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Modern UMKM</button>
                     </div>
                  )}
               </div>
               <div className="relative md:hidden"><button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">Tampilan <ChevronDown size={14}/></button></div>
               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               {/* VENDOR */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Penerbit UMKM</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama UMKM</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NPWP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono" value={data.vendorNpwp} onChange={e => handleDataChange('vendorNpwp', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.vendorAddress} onChange={e => handleDataChange('vendorAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* CLIENT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Users size={12}/> Pelanggan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Client</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NPWP Client</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono" value={data.clientNpwp} onChange={e => handleDataChange('clientNpwp', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Client</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.clientAddress} onChange={e => handleDataChange('clientAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* ITEMS */}
               <div className="space-y-3">
                  <div className="flex justify-between items-center px-1"><h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><ReceiptText size={12}/> Daftar Item</h3><button onClick={handleAddItem} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"><Plus size={10}/> Tambah</button></div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     {data.items.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 relative group">
                           <button onClick={() => handleRemoveItem(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><Trash2 size={12}/></button>
                           <input className="w-full p-1.5 border border-slate-200 rounded text-xs font-bold mb-2 bg-white" placeholder="Nama Produk" value={item.desc} onChange={e => updateItem(idx, 'desc', e.target.value)} />
                           <div className="grid grid-cols-2 gap-2">
                              <input className="w-full p-1.5 border border-slate-200 rounded text-xs bg-white" type="number" placeholder="Qty" value={item.qty} onChange={e => updateItem(idx, 'qty', parseInt(e.target.value) || 0)} />
                              <input className="w-full p-1.5 border border-slate-200 rounded text-xs bg-white" type="number" placeholder="Harga Satuan" value={item.price} onChange={e => updateItem(idx, 'price', parseInt(e.target.value) || 0)} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* PAJAK & TOTAL */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Percent size={12}/> Pajak & Total</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">PPN (%)</label><input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.taxRate} onChange={e => handleDataChange('taxRate', parseInt(e.target.value) || 0)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">PPh 23 (%)</label><input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.withholdingTax} onChange={e => handleDataChange('withholdingTax', parseInt(e.target.value) || 0)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Catatan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-20 resize-none" value={data.note} onChange={e => handleDataChange('note', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-200">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">No. Invoice</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.invoiceNo} onChange={e => handleDataChange('invoiceNo', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Invoice</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                     </div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <FacturContent />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL (FIX: TABLE WRAPPER) --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><FacturContent /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}