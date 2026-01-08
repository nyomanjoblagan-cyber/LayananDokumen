'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  User, CreditCard, FileText, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function FinancePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Studio Dokumen...</div>}>
      <FinanceToolBuilder />
    </Suspense>
  );
}

function FinanceToolBuilder() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode'); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [activeTab, setActiveTab] = useState<'invoice' | 'nota' | 'kuitansi'>('invoice');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: 'INV/2026/001',
    date: '',
    senderName: 'BORCELLE FOOD',
    senderInfo: 'Jl. Raya Merdeka No. 45, Jakarta Selatan\nWhatsApp: 0812-3456-7890',
    receiverName: 'PT. Teknologi Maju',
    receiverInfo: 'Gedung Menara 1, Lt. 5\nJl. Sudirman, Jakarta',
    items: [
      { id: 1, name: 'Jasa Katering (Paket Premium)', qty: 50, price: 50000 },
      { id: 2, name: 'Biaya Layanan & Pengiriman', qty: 1, price: 150000 },
    ],
    notes: 'Mohon transfer ke BCA 123-456-789 a.n Borcelle Food.',
    city: 'Jakarta',
    signer: 'Manager Keuangan',
    footerNote: 'Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.'
  });

  // INITIALIZATION
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));

    if (modeParam === 'nota') setActiveTab('nota');
    else if (modeParam === 'kwitansi' || modeParam === 'kuitansi') setActiveTab('kuitansi');
    else setActiveTab('invoice');
    
    setTemplateId(1); 
  }, [modeParam]);

  const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const total = subtotal; 

  const terbilang = (angka: number): string => {
    const bil = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    if (angka < 12) return " " + bil[angka];
    if (angka < 20) return terbilang(angka - 10) + " Belas";
    if (angka < 100) return terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
    if (angka < 200) return " Seratus" + terbilang(angka - 100);
    if (angka < 1000) return terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
    if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
    if (angka < 1000000000) return terbilang(Math.floor(angka / 1000000)) + " Juta" + terbilang(angka % 1000000);
    return "";
  };
  const terbilangText = total > 0 ? `${terbilang(total)} Rupiah` : 'Nol Rupiah';

  // HANDLERS
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
  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), name: '', qty: 1, price: 0 }] });
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };

  const TEMPLATES = {
    invoice: [ { id: 1, name: "Formal Korporat", desc: "Header biru tegas" }, { id: 2, name: "Standar Profesional", desc: "Desain minimalis bersih" } ],
    nota: [ { id: 1, name: "Nota Toko (Ritel)", desc: "Grid garis klasik penuh" }, { id: 2, name: "Nota Jasa (Service)", desc: "Tampilan ringkas tanpa grid" } ],
    kuitansi: [ { id: 1, name: "Kuitansi Modern", desc: "Format vertikal elegan" }, { id: 2, name: "Kuitansi Dinas", desc: "Format buku cek klasik" } ]
  };
  // @ts-ignore
  const currentTemplates = TEMPLATES[activeTab] || TEMPLATES['invoice'];
  const activeTemplateName = currentTemplates.find((t: any) => t.id === templateId)?.name;

  // --- UKURAN KERTAS (DIMENSI) ---
  const getPaperDimensions = () => {
    if (activeTab === 'nota') return { w: '105mm', h: '148mm', class: 'w-[105mm] min-h-[148mm]' }; // A6 Fixed
    if (activeTab === 'kuitansi') return { w: '210mm', h: '99mm', class: 'w-[210mm] min-h-[99mm]' }; // 1/3 A4
    return { w: '210mm', h: '297mm', class: 'w-[210mm] min-h-[297mm]' }; // A4
  };

  const dims = getPaperDimensions();

  // --- CSS PRINT: PAKSA UKURAN HALAMAN SESUAI TIPE ---
  const getPageStyle = () => {
    if (activeTab === 'nota') return `@page { size: 105mm 148mm; margin: 0; }`;
    if (activeTab === 'kuitansi') return `@page { size: 210mm 99mm; margin: 0; }`;
    return `@page { size: A4; margin: 0; }`;
  };

  if (!isClient) return <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center text-slate-400">Memuat Formulir...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          ${getPageStyle()}
          
          body { 
            background: white; 
            margin: 0; 
            padding: 0; 
          }
          
          /* HIDE EVERYTHING ELSE */
          .no-print, header, nav, aside, .sidebar-input { 
            display: none !important; 
          }

          /* FORCE PRINT CONTAINER SIZE & VISIBILITY */
          .print-container {
            display: flex !important;
            visibility: visible !important;
            width: ${dims.w} !important;
            height: ${dims.h} !important;
            min-height: ${dims.h} !important;
            max-height: ${dims.h} !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            box-shadow: none !important;
            border: none !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }

          /* FORCE BLACK BORDER FOR TABLES */
          table, th, td, .border-black {
            border-color: #000 !important;
          }
          
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
              {[{ id: 'invoice', label: 'Invoice (A4)' }, { id: 'nota', label: 'Nota (A6)' }, { id: 'kuitansi', label: 'Kuitansi' }].map((tab) => (
                <button 
                  key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Dokumen</div>
                  {currentTemplates.map((t: any) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="no-print w-full lg:w-[400px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Identitas & Transaksi</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                      {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                   </div>
                   <div className="flex-1">
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Logo</button>
                      {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 block mt-1">Hapus Logo</button>}
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Usaha</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm focus:border-blue-500 outline-none" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat & Kontak</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none focus:border-blue-500 outline-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-mono" value={data.no} onChange={e => setData({...data, no: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Penerima (Klien)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-medium focus:border-blue-500 outline-none" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} />
                </div>
                {activeTab !== 'kuitansi' && (
                  <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Penerima</label>
                      <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none focus:border-blue-500 outline-none" value={data.receiverInfo} onChange={e => setData({...data, receiverInfo: e.target.value})} />
                  </div>
                )}
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <CreditCard size={14} className="text-blue-600" />
                   <h3 className="text-xs font-bold text-slate-700 uppercase">Item Transaksi</h3>
                </div>
                <button onClick={addItem} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"><Plus size={10} /> Tambah</button>
             </div>
             <div className="p-2 space-y-2">
                {data.items.map((item, idx) => (
                   <div key={item.id} className="bg-slate-50 p-2 rounded border border-slate-200 relative">
                      <div className="mb-2">
                         <input type="text" className="w-full bg-transparent border-b border-slate-300 text-xs font-medium focus:border-blue-500 outline-none pb-1" placeholder="Nama Item..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                      </div>
                      <div className="flex gap-2">
                         <div className="flex-1">
                            <span className="text-[9px] text-slate-400 uppercase">Qty</span>
                            <input type="number" className="w-full bg-white border border-slate-300 rounded text-xs p-1 text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                         </div>
                         <div className="flex-[2]">
                            <span className="text-[9px] text-slate-400 uppercase">Harga</span>
                            <input type="number" className="w-full bg-white border border-slate-300 rounded text-xs p-1 text-right" value={item.price} onChange={e => handleItemChange(idx, 'price', e.target.value)} />
                         </div>
                      </div>
                      <button onClick={() => removeItem(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={12} /></button>
                   </div>
                ))}
             </div>
             <div className="bg-slate-100 px-4 py-2 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">Total</span>
                <span className="text-sm font-bold text-slate-800">Rp {total.toLocaleString('id-ID')}</span>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <User size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Footer & TTD</h3>
             </div>
             <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => setData({...data, city: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Penanda Tangan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Catatan</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.notes} onChange={e => setData({...data, notes: e.target.value})} />
                </div>
                {activeTab === 'nota' && (
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Footer Nota</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.footerNote} onChange={e => setData({...data, footerNote: e.target.value})} />
                   </div>
                )}
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto overflow-x-hidden">
          
          <div className={`print-container bg-white shadow-2xl ${dims.class} relative flex flex-col box-border border border-slate-200`}>
            
            {/* 1. INVOICE (A4) - RECOVERED LAYOUT */}
            {activeTab === 'invoice' && (
               <div className="h-full flex flex-col text-[#1e293b] p-[15mm]">
                 {templateId === 1 && (
                   <>
                     {/* Header */}
                     <div className="flex justify-between items-start mb-10">
                        <div className="w-[60%]">
                           <h1 className="text-4xl font-extrabold text-[#1e40af] tracking-tight mb-2">INVOICE</h1>
                           <div className="text-xs text-slate-500">
                              <p className="font-bold text-slate-700">No: {data.no}</p>
                              <p className="font-bold text-slate-700">Tgl: {data.date}</p>
                           </div>
                        </div>
                        <div className="w-[40%] text-right">
                           {logo && <img src={logo} className="h-16 w-auto object-contain mb-2 ml-auto" />}
                           <div className="font-bold text-lg text-slate-800">{data.senderName}</div>
                           <div className="text-xs text-slate-500 whitespace-pre-line">{data.senderInfo}</div>
                        </div>
                     </div>

                     {/* Receiver */}
                     <div className="mb-8 p-4 bg-slate-50 border-l-4 border-blue-600">
                        <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Tagihan Kepada:</p>
                        <div className="text-lg font-bold text-slate-800">{data.receiverName}</div>
                        <div className="text-sm text-slate-500 whitespace-pre-line">{data.receiverInfo}</div>
                     </div>

                     {/* Table */}
                     <div className="mb-8">
                        <table className="w-full text-sm border-collapse">
                           <thead>
                              <tr className="border-b-2 border-blue-800 text-blue-800">
                                 <th className="py-2 text-left">Deskripsi</th>
                                 <th className="py-2 text-center w-16">Qty</th>
                                 <th className="py-2 text-right w-32">Harga</th>
                                 <th className="py-2 text-right w-32">Total</th>
                              </tr>
                           </thead>
                           <tbody>
                              {data.items.map((item) => (
                                 <tr key={item.id} className="border-b border-slate-200 text-[13px]">
                                    <td className="py-3 font-medium">{item.name}</td>
                                    <td className="py-3 text-center">{item.qty}</td>
                                    <td className="py-3 text-right">{item.price.toLocaleString()}</td>
                                    <td className="py-3 text-right font-bold text-slate-700">{(item.qty * item.price).toLocaleString()}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>

                     {/* Footer & Total */}
                     <div className="mt-auto">
                        <div className="flex justify-end mb-10">
                           <div className="w-1/2">
                              <div className="flex justify-between py-2 border-b-2 border-slate-200">
                                 <span className="font-bold text-slate-600">TOTAL</span>
                                 <span className="font-bold text-2xl text-blue-800">Rp {total.toLocaleString('id-ID')}</span>
                              </div>
                           </div>
                        </div>

                        <div className="flex justify-between items-end border-t border-slate-200 pt-6">
                           <div className="w-[60%] text-xs text-slate-500">
                              <p className="font-bold text-slate-700 uppercase mb-1">Catatan:</p>
                              <p className="whitespace-pre-line">{data.notes}</p>
                           </div>
                           <div className="text-center w-[30%]">
                              <p className="text-xs mb-16">{data.city}, {data.date}</p>
                              <p className="font-bold text-sm border-b border-slate-400 pb-1">{data.signer}</p>
                           </div>
                        </div>
                     </div>
                   </>
                 )}
                 {templateId === 2 && (
                   <div className="h-full flex flex-col">
                      {/* Header Simple */}
                      <div className="border-b border-slate-300 pb-6 mb-8 flex justify-between items-center">
                         <div>
                            <h1 className="text-3xl font-light uppercase tracking-widest text-slate-800">Invoice</h1>
                            <div className="text-xs mt-2 space-y-1 text-slate-500">
                               <p>No: <span className="font-bold text-slate-700">{data.no}</span></p>
                               <p>Tgl: <span className="font-bold text-slate-700">{data.date}</span></p>
                            </div>
                         </div>
                         <div className="text-right">
                            <div className="font-bold text-xl">{data.senderName}</div>
                            {logo && <img src={logo} className="h-10 w-auto object-contain ml-auto mt-1 opacity-70" />}
                         </div>
                      </div>

                      {/* Info */}
                      <div className="flex justify-between mb-8">
                         <div className="w-1/2">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Kepada:</p>
                            <p className="font-bold">{data.receiverName}</p>
                            <p className="text-sm text-slate-500">{data.receiverInfo}</p>
                         </div>
                         <div className="w-1/2 text-right">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Dari:</p>
                            <p className="text-sm text-slate-500 whitespace-pre-line">{data.senderInfo}</p>
                         </div>
                      </div>

                      {/* Table */}
                      <table className="w-full text-sm border-collapse mb-8">
                         <thead className="bg-slate-100">
                            <tr>
                               <th className="py-2 px-2 text-left font-bold text-slate-600">Item</th>
                               <th className="py-2 px-2 text-center font-bold text-slate-600">Qty</th>
                               <th className="py-2 px-2 text-right font-bold text-slate-600">Harga</th>
                               <th className="py-2 px-2 text-right font-bold text-slate-600">Total</th>
                            </tr>
                         </thead>
                         <tbody>
                            {data.items.map((item) => (
                               <tr key={item.id} className="border-b border-slate-100">
                                  <td className="py-3 px-2">{item.name}</td>
                                  <td className="py-3 px-2 text-center">{item.qty}</td>
                                  <td className="py-3 px-2 text-right">{item.price.toLocaleString()}</td>
                                  <td className="py-3 px-2 text-right font-bold">{(item.qty * item.price).toLocaleString()}</td>
                               </tr>
                            ))}
                         </tbody>
                      </table>

                      {/* Footer */}
                      <div className="mt-auto">
                         <div className="flex justify-end mb-8">
                            <div className="w-1/2 text-right">
                               <p className="text-sm text-slate-500">Total Pembayaran</p>
                               <p className="text-3xl font-light text-slate-800">Rp {total.toLocaleString('id-ID')}</p>
                            </div>
                         </div>
                         <div className="border-t border-slate-300 pt-4 text-xs text-slate-500 flex justify-between items-end">
                            <div className="w-2/3 whitespace-pre-line">{data.notes}</div>
                            <div className="text-center">
                               <div className="mb-10 font-bold">Hormat Kami,</div>
                               <div>{data.signer}</div>
                            </div>
                         </div>
                      </div>
                   </div>
                 )}
               </div>
            )}

            {/* 2. NOTA (A6) - FIXED TABLE GRID */}
            {activeTab === 'nota' && (
              <div className="h-full flex flex-col p-[8mm]">
                {templateId === 1 && (
                   <>
                     <div className="flex gap-3 mb-4 border-b-[2px] border-[#658525] pb-3">
                        <div className="w-10 h-10 shrink-0">
                           {logo ? <img src={logo} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-[#8fab3a] rounded-full flex items-center justify-center text-white font-bold text-xs">LG</div>}
                        </div>
                        <div className="flex-1">
                           <div className="font-black text-base text-[#4a6118] uppercase leading-none mb-1">{data.senderName}</div>
                           <div className="text-[9px] text-slate-500 leading-tight whitespace-pre-line">{data.senderInfo}</div>
                        </div>
                     </div>

                     <div className="flex justify-between items-end mb-2 text-[10px]">
                        <div><span className="font-bold text-slate-700">Nota No.</span> <span className="font-mono">{data.no}</span></div>
                        <div className="text-right space-y-1">
                           <div><span className="text-slate-500">Tgl:</span> {data.date}</div>
                           <div><span className="text-slate-500">Kpd:</span> <span className="font-bold">{data.receiverName}</span></div>
                        </div>
                     </div>

                     {/* TABLE HTML MURNI (FIXED BORDER) */}
                     <table className="w-full text-[9px] mb-2" style={{borderCollapse: 'collapse', width: '100%'}}>
                        <thead className="bg-slate-100">
                           <tr>
                              <th style={{border: '1px solid black', padding: '4px', textAlign: 'center', width: '25px'}}>NO</th>
                              <th style={{border: '1px solid black', padding: '4px', textAlign: 'center'}}>NAMA BARANG</th>
                              <th style={{border: '1px solid black', padding: '4px', textAlign: 'center', width: '35px'}}>QTY</th>
                              <th style={{border: '1px solid black', padding: '4px', textAlign: 'center', width: '60px'}}>HARGA</th>
                              <th style={{border: '1px solid black', padding: '4px', textAlign: 'center', width: '60px'}}>TOTAL</th>
                           </tr>
                        </thead>
                        <tbody>
                           {data.items.map((item, idx) => (
                              <tr key={item.id}>
                                 <td style={{border: '1px solid black', padding: '4px', textAlign: 'center'}}>{idx + 1}</td>
                                 <td style={{border: '1px solid black', padding: '4px'}}>{item.name}</td>
                                 <td style={{border: '1px solid black', padding: '4px', textAlign: 'center'}}>{item.qty}</td>
                                 <td style={{border: '1px solid black', padding: '4px', textAlign: 'right'}}>{item.price.toLocaleString()}</td>
                                 <td style={{border: '1px solid black', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>{(item.qty * item.price).toLocaleString()}</td>
                              </tr>
                           ))}
                           {/* Filler Rows */}
                           {[...Array(Math.max(0, 8 - data.items.length))].map((_, i) => (
                              <tr key={`fill-${i}`}>
                                 <td style={{border: '1px solid black', padding: '4px', height: '18px'}}></td>
                                 <td style={{border: '1px solid black', padding: '4px'}}></td>
                                 <td style={{border: '1px solid black', padding: '4px'}}></td>
                                 <td style={{border: '1px solid black', padding: '4px'}}></td>
                                 <td style={{border: '1px solid black', padding: '4px'}}></td>
                              </tr>
                           ))}
                        </tbody>
                     </table>

                     <div className="flex justify-end mb-4">
                        <div className="flex border border-black bg-slate-100 text-[10px] font-bold">
                           <div className="px-2 py-1 border-r border-black">JUMLAH TOTAL</div>
                           <div className="px-2 py-1 min-w-[80px] text-right bg-white">Rp {total.toLocaleString('id-ID')}</div>
                        </div>
                     </div>

                     <div className="mt-auto flex justify-between items-end text-[9px]">
                        <div className="text-center"><p className="mb-6">Tanda Terima,</p><p>( ......................... )</p></div>
                        <div className="text-center w-[40%] text-[8px] italic text-slate-500 leading-tight px-2">{data.footerNote}</div>
                        <div className="text-center"><p className="mb-6">Hormat Kami,</p><p className="font-bold">{data.signer}</p></div>
                     </div>
                   </>
                )}

                {templateId === 2 && (
                   <div className="h-full flex flex-col">
                      <div className="flex items-center gap-3 border-b-4 border-blue-500 pb-2 mb-4">
                         {logo && <img src={logo} alt="Logo" className="h-12 w-auto" />}
                         <div className="flex-1">
                            <div className="font-bold text-xl text-blue-600 mb-1">{data.senderName}</div>
                            <div className="text-[9px] text-slate-500 whitespace-pre-line">{data.senderInfo}</div>
                         </div>
                      </div>
                      <div className="bg-slate-100 p-2 rounded mb-4 space-y-1 text-[10px]">
                         <div className="flex"><span className="w-16 font-bold text-slate-600">Pelanggan</span>: {data.receiverName}</div>
                         <div className="flex"><span className="w-16 font-bold text-slate-600">Tanggal</span>: {data.date}</div>
                         <div className="flex"><span className="w-16 font-bold text-slate-600">No Nota</span>: {data.no}</div>
                      </div>
                      <table className="w-full mb-4 text-[10px]">
                         <thead className="bg-blue-600 text-white">
                            <tr><th className="py-1 px-2 text-left rounded-l">Layanan</th><th className="py-1 px-2 text-right rounded-r">Biaya</th></tr>
                         </thead>
                         <tbody className="divide-y divide-blue-100">
                            {data.items.map((item) => (
                               <tr key={item.id}>
                                  <td className="py-2 px-2"><div className="font-bold">{item.name}</div><div className="text-[9px] text-slate-500">{item.qty} x {item.price.toLocaleString()}</div></td>
                                  <td className="py-2 px-2 text-right font-bold">{(item.qty * item.price).toLocaleString()}</td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                      <div className="mt-auto">
                         <div className="flex justify-end mb-4">
                            <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded text-right">
                               <span className="text-xs font-bold text-blue-800">TOTAL: Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                         </div>
                         <div className="bg-blue-600 text-white text-center py-1 text-[9px] rounded-b font-medium">Terima kasih atas kepercayaan Anda!</div>
                      </div>
                   </div>
                )}
              </div>
            )}

            {/* 3. KUITANSI (1/3 A4) - RECOVERED VERTICAL SIDEBAR */}
            {activeTab === 'kuitansi' && (
               <div className="h-full flex flex-col justify-center">
                  {templateId === 1 && (
                    <div className="h-full flex flex-row p-0 overflow-hidden">
                      {/* VERTICAL SIDEBAR YANG STABIL */}
                      <div className="w-[50px] bg-[#334155] flex flex-col items-center justify-center text-white shrink-0">
                         <h1 className="text-2xl font-black tracking-[0.2em] -rotate-90 whitespace-nowrap">KUITANSI</h1>
                      </div>
                      
                      {/* CONTENT */}
                      <div className="flex-1 flex flex-col justify-between p-6 bg-[#fdfaf6]">
                         <div className="flex justify-between items-start border-b border-slate-300 pb-2 mb-2">
                            <div className="text-sm font-bold font-mono">No: {data.no}</div>
                            <div className="text-right">
                               <div className="font-bold text-[#c2410c]">{data.senderName}</div>
                            </div>
                         </div>

                         <div className="space-y-3 text-sm">
                            <div className="flex items-baseline">
                               <span className="w-28 font-bold text-slate-600">Telah Terima Dari</span>
                               <span className="flex-1 border-b border-dotted border-slate-400 px-2 font-medium">{data.receiverName}</span>
                            </div>
                            <div className="flex items-baseline">
                               <span className="w-28 font-bold text-slate-600">Uang Sejumlah</span>
                               <span className="flex-1 border-b border-dotted border-slate-400 px-2 font-bold italic bg-slate-100"># {terbilangText} #</span>
                            </div>
                            <div className="flex items-baseline">
                               <span className="w-28 font-bold text-slate-600">Untuk Pembayaran</span>
                               <span className="flex-1 border-b border-dotted border-slate-400 px-2">{data.items.map(i => i.name).join(', ')}</span>
                            </div>
                         </div>

                         <div className="flex justify-between items-end mt-4">
                            <div className="bg-[#c2410c] text-white px-6 py-2 font-bold text-lg rounded-tl-xl rounded-br-xl shadow-md">
                               Rp {total.toLocaleString('id-ID')}
                            </div>
                            <div className="text-center">
                               <div className="text-xs mb-8">{data.city}, {data.date}</div>
                               <div className="font-bold text-sm border-b border-slate-400 pb-1">{data.signer}</div>
                            </div>
                         </div>
                      </div>
                    </div>
                  )}
                  {templateId === 2 && (
                    <div className="h-full border-2 border-emerald-800 p-1 bg-[#f0fff4] text-emerald-900 absolute inset-0 m-0 box-border">
                        <div className="h-full border border-emerald-600 p-6 flex flex-col justify-between relative">
                           <div className="flex justify-between items-center relative z-10"><h2 className="font-serif font-bold text-2xl underline decoration-double">KUITANSI</h2><div className="font-mono text-xs font-bold">No: {data.no}</div></div>
                           <div className="space-y-2 font-serif relative z-10 text-emerald-950 text-sm">
                              <div className="flex items-end"><span className="w-32">Sudah terima dari :</span><div className="flex-1 border-b border-dotted border-emerald-800 font-bold px-2">{data.receiverName}</div></div>
                              <div className="flex items-end"><span className="w-32">Banyaknya uang :</span><div className="flex-1 border-b border-dotted border-emerald-800 bg-emerald-100/50 px-2 font-bold italic capitalize"># {terbilangText} #</div></div>
                              <div className="flex items-end"><span className="w-32">Untuk pembayaran :</span><div className="flex-1 border-b border-dotted border-emerald-800 px-2">{data.items.map(i => i.name).join(', ')}</div></div>
                           </div>
                           <div className="flex justify-between items-end relative z-10 mt-2">
                              <div className="border-2 border-emerald-800 rounded px-4 py-2 font-bold text-lg bg-white shadow-sm">Rp {total.toLocaleString('id-ID')}</div>
                              <div className="text-center">
                                 <div className="text-xs mb-10">{data.city}, {data.date}</div>
                                 <div className="font-bold underline decoration-dotted">{data.signer}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}