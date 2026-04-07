'use client';

/**
 * FILE: FinancePage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * FEATURES: 
 * - Multi-mode Document Switcher (Invoice, Nota, Kuitansi)
 * - Full Editor & Preview UI
 * - Timezone Safe Date Formatting
 * - Integrated Saweria Donation Modal
 */

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  User, CreditCard, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link'; // FIXED: Standar Next.js Link

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

// --- 1. HELPER: TERBILANG ---
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

// --- 2. TYPE DEFINITIONS ---
interface Item {
  id: number;
  name: string;
  qty: number;
  price: number;
}

interface FinanceData {
  no: string;
  date: string;
  senderName: string;
  senderInfo: string;
  receiverName: string;
  receiverInfo: string;
  items: Item[];
  notes: string;
  city: string;
  signer: string;
  footerNote: string;
}

// --- 3. DATA DEFAULT ---
const INITIAL_DATA: FinanceData = {
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
  city: 'DENPASAR',
  signer: 'Manager Keuangan',
  footerNote: 'Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.'
};

export default function FinancePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Studio Dokumen...</div>}>
      <FinanceToolBuilder />
    </Suspense>
  );
}

function FinanceToolBuilder() {
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [activeDocType, setActiveDocType] = useState<'invoice' | 'nota' | 'kuitansi'>('invoice');
  const [mobileMode, setMobileMode] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<FinanceData>(INITIAL_DATA);
  const [showDonation, setShowDonation] = useState(false);

  // Hydration Fix & Initial Data Loading
  useEffect(() => {
    setIsClient(true);
    const modeParam = searchParams.get('mode');
    const today = new Date().toISOString().split('T')[0];
    
    setData(prev => ({ ...prev, date: today }));

    if (modeParam === 'nota') setActiveDocType('nota');
    else if (modeParam === 'kwitansi' || modeParam === 'kuitansi') setActiveDocType('kuitansi');
    else setActiveDocType('invoice');

    return () => {
      if (logo) URL.revokeObjectURL(logo);
    };
  }, [searchParams]);

  if (!isClient) return null; // CRITICAL: Stop build error from Hydration mismatch

  const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const total = subtotal; 
  const terbilangText = total > 0 ? `${terbilang(total)} Rupiah` : 'Nol Rupiah';

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (logo) URL.revokeObjectURL(logo);
      setLogo(URL.createObjectURL(file));
    }
  };
  
  const handleItemChange = (idx: number, field: keyof Item, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };
  
  const addItem = () => setData(prev => ({ ...prev, items: [...prev.items, { id: Date.now(), name: '', qty: 1, price: 0 }] }));
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleReset = () => {
    if(window.confirm('Reset formulir ke awal?')) {
      setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
      setLogo(null);
    }
  };

  const TEMPLATES = {
    invoice: [ { id: 1, name: "Formal Korporat", desc: "Header biru tegas" }, { id: 2, name: "Standar Profesional", desc: "Desain minimalis bersih" } ],
    nota: [ { id: 1, name: "Nota Toko (Ritel)", desc: "Grid garis klasik penuh" } ],
    kuitansi: [ { id: 1, name: "Kuitansi Modern", desc: "Format vertikal elegan" } ]
  };

  // @ts-ignore
  const currentTemplates = TEMPLATES[activeDocType] || TEMPLATES['invoice'];
  const activeTemplateName = currentTemplates.find((t: any) => t.id === templateId)?.name || "Default";

  const dims = (activeDocType === 'nota') ? { w: '105mm', h: '148mm' } : 
               (activeDocType === 'kuitansi') ? { w: '210mm', h: '99mm' } : 
               { w: '210mm', h: '297mm' };

  const formatDateSafe = (dateStr: string) => {
    if(!dateStr) return '-';
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'long' });
    } catch { return dateStr; }
  };

  // --- KOMPONEN DOKUMEN (FULL STYLING) ---
  const DocumentContent = () => (
    <div className="bg-white print:shadow-none print:border-none shadow-2xl mx-auto overflow-hidden relative border border-slate-200" style={{ width: dims.w, minHeight: dims.h }}>
      {activeDocType === 'invoice' && (
        <div className="h-full flex flex-col text-[#1e293b] p-[10mm] md:p-[15mm]">
          <div className="flex justify-between items-start mb-10 shrink-0">
            <div className="w-[60%]">
              <h1 className={`text-4xl font-extrabold ${templateId === 1 ? 'text-[#1e40af]' : 'text-slate-900'} tracking-tight mb-2 uppercase`}>Invoice</h1>
              <div className="text-xs text-slate-500 font-mono">
                <p className="font-bold text-slate-700">No: {data.no}</p>
                <p className="font-bold text-slate-700">Tgl: {formatDateSafe(data.date)}</p>
              </div>
            </div>
            <div className="w-[40%] text-right">
              {logo && <img src={logo} className="h-16 w-auto object-contain mb-2 ml-auto grayscale" alt="logo" />}
              <div className="font-bold text-lg text-slate-800 uppercase">{data.senderName}</div>
              <div className="text-[10px] text-slate-500 whitespace-pre-line leading-relaxed">{data.senderInfo}</div>
            </div>
          </div>
          <div className={`mb-8 p-4 bg-slate-50 print:bg-white border-l-4 ${templateId === 1 ? 'border-blue-600' : 'border-slate-900'} text-sm break-inside-avoid`}>
            <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Tagihan Kepada:</p>
            <div className="text-lg font-bold text-slate-800 uppercase">{data.receiverName}</div>
            <div className="text-[11px] text-slate-500 whitespace-pre-line leading-relaxed">{data.receiverInfo}</div>
          </div>
          <div className="flex-grow">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className={`border-b-2 ${templateId === 1 ? 'border-blue-800 text-blue-800' : 'border-slate-900 text-slate-900'} uppercase text-[10px]`}>
                  <th className="py-2 text-left">Deskripsi</th>
                  <th className="py-2 text-center w-16">Qty</th>
                  <th className="py-2 text-right w-32">Harga</th>
                  <th className="py-2 text-right w-32">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.items.map((item) => (
                  <tr key={item.id} className="text-[12px] break-inside-avoid">
                    <td className="py-3 font-medium uppercase">{item.name}</td>
                    <td className="py-3 text-center tabular-nums">{item.qty}</td>
                    <td className="py-3 text-right tabular-nums">{item.price.toLocaleString()}</td>
                    <td className="py-3 text-right font-bold text-slate-700 tabular-nums">{(item.qty * item.price).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-auto shrink-0 pt-6">
            <div className="flex justify-end mb-8 break-inside-avoid">
              <div className="w-1/2 border-t-2 border-slate-900 pt-2 flex justify-between items-center">
                <span className="font-bold text-slate-600 uppercase text-xs">Grand Total</span>
                <span className="font-bold text-2xl text-blue-800 tabular-nums">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div className="flex justify-between items-end border-t border-slate-200 pt-6 break-inside-avoid">
              <div className="w-[60%] text-[10px] text-slate-500 italic">
                <p className="font-bold text-slate-700 uppercase mb-1 not-italic">Catatan:</p>
                <p className="whitespace-pre-line leading-relaxed">{data.notes}</p>
              </div>
              <div className="text-center w-[35%]">
                <p className="text-[10px] mb-16 uppercase">{data.city}, {formatDateSafe(data.date)}</p>
                <p className="font-bold text-sm border-b border-slate-400 pb-1 uppercase">{data.signer}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeDocType === 'nota' && (
        <div className="h-full flex flex-col p-[8mm] text-slate-900 font-sans">
           <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3 mb-4 shrink-0">
             <div className="flex gap-3">
               {logo && <img src={logo} className="w-12 h-12 object-contain grayscale" alt="logo" />}
               <div><h1 className="font-black text-lg leading-none uppercase">{data.senderName}</h1><p className="text-[8px] text-slate-500 leading-tight whitespace-pre-line mt-1">{data.senderInfo}</p></div>
             </div>
             <div className="text-right"><h2 className="text-2xl font-black italic text-slate-300 -mt-2">NOTA</h2><p className="font-mono text-[9px] font-bold">No: {data.no}</p></div>
           </div>
           <div className="flex justify-between text-[10px] mb-4">
              <div><p className="text-slate-400 uppercase text-[8px]">Kepada:</p><p className="font-bold uppercase">{data.receiverName}</p></div>
              <div className="text-right"><p className="text-slate-400 uppercase text-[8px]">Tanggal:</p><p className="font-bold">{formatDateSafe(data.date)}</p></div>
           </div>
           <table className="w-full text-[10px] border-collapse flex-grow">
              <thead className="bg-slate-100 uppercase text-[8px] font-bold">
                <tr><th className="border border-slate-900 p-1.5 w-[30px]">NO</th><th className="border border-slate-900 p-1.5 text-left">NAMA BARANG</th><th className="border border-slate-900 p-1.5 w-[40px]">QTY</th><th className="border border-slate-900 p-1.5 w-[70px]">HARGA</th><th className="border border-slate-900 p-1.5 w-[80px]">TOTAL</th></tr>
              </thead>
              <tbody>
                {data.items.map((item, i) => (
                  <tr key={item.id}><td className="border border-slate-900 p-1.5 text-center">{i+1}</td><td className="border border-slate-900 p-1.5 uppercase font-medium">{item.name}</td><td className="border border-slate-900 p-1.5 text-center">{item.qty}</td><td className="border border-slate-900 p-1.5 text-right">{item.price.toLocaleString()}</td><td className="border border-slate-900 p-1.5 text-right font-bold">{(item.qty * item.price).toLocaleString()}</td></tr>
                ))}
                {[...Array(Math.max(0, 10 - data.items.length))].map((_, i) => (
                  <tr key={i}><td className="border border-slate-900 p-1.5 h-[26px]"></td><td className="border border-slate-900 p-1.5"></td><td className="border border-slate-900 p-1.5"></td><td className="border border-slate-900 p-1.5"></td><td className="border border-slate-900 p-1.5"></td></tr>
                ))}
              </tbody>
           </table>
           <div className="mt-4 shrink-0 flex justify-end">
              <div className="flex border-2 border-slate-900 font-black text-xs uppercase">
                <div className="px-3 py-1.5 bg-slate-900 text-white">Grand Total</div>
                <div className="px-4 py-1.5 bg-white min-w-[100px] text-right">Rp {total.toLocaleString('id-ID')}</div>
              </div>
           </div>
           <div className="flex justify-between items-end mt-4 text-[9px] uppercase font-bold text-slate-400 px-2">
              <div className="text-center w-24"><p className="mb-10">Penerima</p><div className="border-b border-slate-300"></div></div>
              <p className="italic lowercase font-normal text-[8px]">{data.footerNote}</p>
              <div className="text-center w-24"><p className="mb-10">Hormat Kami</p><p className="text-slate-900">{data.signer}</p></div>
           </div>
        </div>
      )}

      {activeDocType === 'kuitansi' && (
        <div className="h-full flex flex-col p-[8mm] bg-white">
          <div className="border-4 border-double border-slate-900 p-6 flex-grow flex flex-col justify-between">
            <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4">
              <h1 className="text-3xl font-black italic tracking-tighter">KUITANSI</h1>
              <div className="text-right"><p className="font-mono text-xs font-bold">No. {data.no}</p><p className="text-[10px] font-bold uppercase">{data.senderName}</p></div>
            </div>
            <div className="space-y-6 py-10 font-serif">
               <div className="flex items-baseline gap-4"><span className="w-40 uppercase text-[10px] font-bold text-slate-400">Sudah Terima Dari</span><div className="flex-1 border-b border-dotted border-slate-400 px-2 font-bold uppercase text-sm">{data.receiverName}</div></div>
               <div className="flex items-baseline gap-4"><span className="w-40 uppercase text-[10px] font-bold text-slate-400">Banyaknya Uang</span><div className="flex-1 border-b border-dotted border-slate-400 bg-slate-50 px-2 font-bold italic text-slate-700 text-sm"># {terbilangText} #</div></div>
               <div className="flex items-baseline gap-4"><span className="w-40 uppercase text-[10px] font-bold text-slate-400">Untuk Pembayaran</span><div className="flex-1 border-b border-dotted border-slate-400 px-2 uppercase text-sm">{data.items.map(i => i.name).join(', ')}</div></div>
            </div>
            <div className="flex justify-between items-end">
              <div className="bg-slate-900 text-white px-8 py-4 text-3xl font-black shadow-xl rounded-sm">Rp {total.toLocaleString('id-ID')}</div>
              <div className="text-center w-64">
                <p className="text-[10px] mb-14 uppercase font-bold text-slate-500">{data.city}, {formatDateSafe(data.date)}</p>
                <p className="font-black border-b-2 border-slate-900 uppercase text-sm pb-1 leading-none">{data.signer}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800">
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 shrink-0 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
             <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
               <ArrowLeftCircle size={20} className="text-emerald-400"/>
               <span className="text-xs font-black uppercase tracking-widest hidden md:inline">Dashboard</span>
             </Link>
             <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
             <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                {(['invoice', 'nota', 'kuitansi'] as const).map((t) => (
                  <button 
                    key={t} onClick={() => { setActiveDocType(t); setTemplateId(1); }}
                    className={`px-5 py-1.5 rounded-md text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeDocType === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handleReset} className="p-2 text-slate-400 hover:text-red-400 transition-colors"><RotateCcw size={18}/></button>
             <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg flex items-center gap-2">
                <Printer size={16}/> Cetak
             </button>
          </div>
      </div>

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6 h-[calc(100vh-64px)] overflow-hidden relative">
        {/* EDITOR SIDEBAR */}
        <div className={`no-print w-full md:w-[450px] bg-white rounded-xl border border-slate-200 flex flex-col h-full absolute md:relative z-10 transition-transform shadow-xl md:shadow-none ${mobileMode === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
              <h3 className="text-xs font-black uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-600"/> Data Dokumen</h3>
              <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-tighter">{activeDocType}</span>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 md:pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer bg-slate-50 overflow-hidden hover:border-blue-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
                    {logo ? <img src={logo} className="w-full h-full object-contain" alt="logo" /> : <Upload size={20} className="text-slate-300" />}
                  </div>
                  <div className="flex-1">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Ganti Logo Usaha</button>
                    <p className="text-[9px] text-slate-400 uppercase mt-1">Rasio 1:1 Rekomendasi</p>
                  </div>
                </div>
                <input className="w-full p-2.5 border rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} placeholder="Nama Bisnis Anda" />
                <textarea className="w-full p-2.5 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} placeholder="Alamat & Kontak Bisnis" />
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <input className="w-full p-2.5 border rounded-lg text-xs font-mono" value={data.no} onChange={e => setData({...data, no: e.target.value})} placeholder="No. Dokumen" />
                  <input type="date" className="w-full p-2.5 border rounded-lg text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1"><CreditCard size={14}/> Daftar Item</label>
                  <button onClick={addItem} className="text-[10px] bg-blue-600 text-white px-4 py-1.5 rounded-full font-black shadow-lg shadow-blue-100">+ ITEM</button>
                </div>
                <div className="space-y-3">
                  {data.items.map((item, idx) => (
                    <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative group animate-in slide-in-from-right-2">
                      <input className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs font-bold mb-2 outline-none" placeholder="Nama Barang/Jasa..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                      <div className="flex gap-2">
                        <input type="number" className="w-20 bg-white border border-slate-200 rounded-lg text-xs p-2 text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                        <input type="number" className="flex-1 bg-white border border-slate-200 rounded-lg text-xs p-2 text-right font-mono" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                      </div>
                      <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <input className="w-full p-2.5 border rounded-lg text-sm font-bold uppercase" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} placeholder="Penerima / Klien" />
                <textarea className="w-full p-2.5 border rounded-lg text-xs h-16 outline-none" value={data.receiverInfo} onChange={e => setData({...data, receiverInfo: e.target.value})} placeholder="Alamat Penerima" />
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <input className="w-full p-2.5 border rounded-lg text-xs uppercase" value={data.city} onChange={e => setData({...data, city: e.target.value})} placeholder="Kota Terbit" />
                  <input className="w-full p-2.5 border rounded-lg text-xs font-bold uppercase" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} placeholder="Penanda Tangan" />
                </div>
                <textarea className="w-full p-2.5 border rounded-lg text-xs h-20 italic bg-slate-50" value={data.notes} onChange={e => setData({...data, notes: e.target.value})} placeholder="Catatan Tambahan / Instruksi Bayar" />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileMode === 'editor' ? 'hidden md:flex' : 'flex'}`}>
          <div className="origin-top transition-transform duration-300 transform scale-[0.35] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-120%] sm:mb-[-100mm] md:mb-[-40mm] lg:mb-[-10mm] xl:mb-10 mt-2 xl:mt-0 shadow-2xl shrink-0">
             <DocumentContent />
          </div>
        </div>

        {/* COMPONENT SERVICES (IKLAN & MODAL DONASI) */}
        <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
      </main>

      {/* MOBILE NAV TOGGLE */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1.5 shadow-2xl border border-white/10">
          <button onClick={() => setMobileMode('editor')} className={`flex-1 rounded-xl text-xs font-black tracking-widest flex items-center justify-center gap-2 transition-all ${mobileMode === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> EDITOR</button>
          <button onClick={() => setMobileMode('preview')} className={`flex-1 rounded-xl text-xs font-black tracking-widest flex items-center justify-center gap-2 transition-all ${mobileMode === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden">
         <DocumentContent />
      </div>
    </div>
  );
}