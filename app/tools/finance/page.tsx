'use client';

/**
 * FILE: FinancePage.tsx
 * STATUS: PRODUCTION READY (FIXED DEPLOY)
 * FEATURES: 
 * - Multi-mode Document Switcher
 * - Timezone Safe Date Formatting
 * - Memory-Leak Safe Logo Upload
 * - Integrated Saweria Donation Modal
 */

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  User, CreditCard, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link'; // FIXED: Sebelumnya 'next/ru-link' yang bikin gagal deploy

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
  const modeParam = searchParams.get('mode'); 
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

  // Memory Leak Prevention & Initial Setup
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));

    if (modeParam === 'nota') setActiveDocType('nota');
    else if (modeParam === 'kwitansi' || modeParam === 'kuitansi') setActiveDocType('kuitansi');
    else setActiveDocType('invoice');

    return () => {
      if (logo) URL.revokeObjectURL(logo);
    };
  }, [modeParam]); 

  const total = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
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
      if (logo) {
        URL.revokeObjectURL(logo);
        setLogo(null);
      }
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

  const DocumentContent = () => (
    <div className="bg-white print:shadow-none print:border-none shadow-2xl mx-auto overflow-hidden relative border border-slate-200" style={{ width: dims.w, minHeight: dims.h }}>
      {activeDocType === 'invoice' && (
        <div className="h-full flex flex-col text-[#1e293b] p-[10mm] md:p-[15mm]">
          <div className="flex justify-between items-start mb-10 shrink-0">
            <div className="w-[60%]">
              <h1 className={`text-4xl font-extrabold ${templateId === 1 ? 'text-[#1e40af]' : 'text-slate-900'} tracking-tight mb-2`}>INVOICE</h1>
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
            <div className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">{data.receiverInfo}</div>
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
                <span className="font-bold text-slate-600 uppercase text-xs">Total</span>
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
      {/* NOTA & KUITANSI logic remains same but ensuring safety */}
      {activeDocType === 'nota' && (
        <div className="h-full flex flex-col p-[8mm] text-slate-900">
           <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3 mb-4 shrink-0">
             <div className="flex gap-3">
               {logo && <img src={logo} className="w-12 h-12 object-contain grayscale" alt="logo" />}
               <div><h1 className="font-black text-lg leading-none uppercase">{data.senderName}</h1><p className="text-[8px] text-slate-500 leading-tight whitespace-pre-line mt-1">{data.senderInfo}</p></div>
             </div>
             <div className="text-right"><h2 className="text-2xl font-black italic text-slate-300 -mt-2">NOTA</h2><p className="font-mono text-[9px] font-bold">No: {data.no}</p></div>
           </div>
           <table className="w-full text-[10px] border-collapse flex-grow">
              <thead className="bg-slate-100 uppercase text-[8px] font-bold">
                <tr><th className="border border-slate-900 p-1.5 w-[30px]">NO</th><th className="border border-slate-900 p-1.5 text-left">ITEM</th><th className="border border-slate-900 p-1.5 w-[40px]">QTY</th><th className="border border-slate-900 p-1.5 w-[70px]">HARGA</th><th className="border border-slate-900 p-1.5 w-[80px]">TOTAL</th></tr>
              </thead>
              <tbody>
                {data.items.map((item, i) => (
                  <tr key={item.id}><td className="border border-slate-900 p-1.5 text-center">{i+1}</td><td className="border border-slate-900 p-1.5 uppercase">{item.name}</td><td className="border border-slate-900 p-1.5 text-center">{item.qty}</td><td className="border border-slate-900 p-1.5 text-right">{item.price.toLocaleString()}</td><td className="border border-slate-900 p-1.5 text-right font-bold">{(item.qty * item.price).toLocaleString()}</td></tr>
                ))}
              </tbody>
           </table>
           <div className="mt-4 shrink-0 flex justify-end">
              <div className="flex border-2 border-slate-900 font-black text-xs uppercase">
                <div className="px-3 py-1.5 bg-slate-900 text-white">Grand Total</div>
                <div className="px-4 py-1.5 bg-white min-w-[100px] text-right">Rp {total.toLocaleString('id-ID')}</div>
              </div>
           </div>
        </div>
      )}
      {activeDocType === 'kuitansi' && (
        <div className="h-full flex flex-col p-[8mm]">
          <div className="border-2 border-slate-900 p-6 flex-grow flex flex-col justify-between">
            <div className="flex justify-between items-center border-b pb-4">
              <h1 className="text-2xl font-black italic">KUITANSI</h1>
              <div className="font-mono text-xs font-bold">No. {data.no}</div>
            </div>
            <div className="space-y-6 text-sm font-serif py-6">
               <div className="flex items-baseline gap-4"><span className="w-36 uppercase text-[9px] font-bold text-slate-400">Sudah Terima Dari</span><div className="flex-1 border-b border-dotted border-slate-400 px-2 font-bold uppercase">{data.receiverName}</div></div>
               <div className="flex items-baseline gap-4"><span className="w-36 uppercase text-[9px] font-bold text-slate-400">Banyaknya Uang</span><div className="flex-1 border-b border-dotted border-slate-400 bg-slate-50 px-2 font-bold italic text-slate-700"># {terbilangText} #</div></div>
               <div className="flex items-baseline gap-4"><span className="w-36 uppercase text-[9px] font-bold text-slate-400">Untuk Pembayaran</span><div className="flex-1 border-b border-dotted border-slate-400 px-2 uppercase">{data.items.map(i => i.name).join(', ')}</div></div>
            </div>
            <div className="flex justify-between items-end">
              <div className="bg-slate-900 text-white px-8 py-3 text-2xl font-black shadow-lg">Rp {total.toLocaleString('id-ID')}</div>
              <div className="text-center w-64">
                <p className="text-[10px] mb-14 uppercase font-bold text-slate-400">{data.city}, {formatDateSafe(data.date)}</p>
                <p className="font-black border-b-2 border-slate-900 uppercase text-sm pb-1">{data.signer}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800">
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
              <div className="bg-slate-800 p-1.5 rounded-full group-hover:bg-slate-700">
                <ArrowLeft size={16} />
              </div>
              <span className="text-sm font-medium hidden md:inline">Dashboard</span>
            </Link>
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
              {['invoice', 'nota', 'kuitansi'].map((tab) => (
                <button 
                  key={tab} onClick={() => { setActiveDocType(tab as any); setTemplateId(1); }}
                  className={`px-4 py-1.5 rounded-md text-[10px] md:text-xs font-bold uppercase transition-all ${activeDocType === tab ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleReset} className="p-2 text-slate-400 hover:text-red-400"><RotateCcw size={18} /></button>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg">
              <Printer size={16} /> <span className="hidden sm:inline">Cetak</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6 h-[calc(100vh-64px)] overflow-hidden">
        <div className={`no-print w-full md:w-[400px] bg-white rounded-xl border border-slate-200 flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileMode === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer bg-slate-50 overflow-hidden" onClick={() => fileInputRef.current?.click()}>
                    {logo ? <img src={logo} className="w-full h-full object-contain" alt="logo" /> : <Upload size={20} className="text-slate-300" />}
                  </div>
                  <div className="flex-1">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Pasang Logo</button>
                  </div>
                </div>
                <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} placeholder="Nama Usaha" />
                <textarea className="w-full p-2.5 border border-slate-200 rounded-lg text-xs h-20 focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} placeholder="Alamat & Kontak" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-mono" value={data.no} onChange={e => setData({...data, no: e.target.value})} placeholder="No. Dokumen" />
                  <input type="date" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase text-slate-400">Daftar Item</label>
                  <button onClick={addItem} className="text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded-full font-bold">+ ITEM</button>
                </div>
                {data.items.map((item, idx) => (
                  <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative group">
                    <input type="text" className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs font-bold mb-2 outline-none" placeholder="Nama Barang..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                    <div className="flex gap-2">
                      <input type="number" className="w-20 bg-white border border-slate-200 rounded-lg text-xs p-2 text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                      <input type="number" className="flex-1 bg-white border border-slate-200 rounded-lg text-xs p-2 text-right font-mono" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                    </div>
                    <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full border border-slate-200 shadow-sm"><Trash2 size={12} /></button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} placeholder="Penerima" />
                <textarea className="w-full p-2.5 border border-slate-200 rounded-lg text-xs h-16 outline-none" value={data.receiverInfo} onChange={e => setData({...data, receiverInfo: e.target.value})} placeholder="Alamat Penerima" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs uppercase" value={data.city} onChange={e => setData({...data, city: e.target.value})} placeholder="Kota" />
                  <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold uppercase" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} placeholder="Penanda Tangan" />
                </div>
              </div>
           </div>
        </div>

        <div className="no-print flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative">
          <div className="origin-top transition-transform duration-300 transform scale-[0.35] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 mb-[-120%] sm:mb-[-100mm] md:mb-[-40mm] lg:mb-[-10mm] xl:mb-10 mt-2 xl:mt-0 shadow-2xl">
             <DocumentContent />
          </div>
        </div>

        <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
          <button onClick={() => setMobileMode('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileMode === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
          <button onClick={() => setMobileMode('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileMode === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <DocumentContent />
      </div>
    </div>
  );
}
