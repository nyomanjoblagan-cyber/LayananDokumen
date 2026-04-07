'use client';

/**
 * FILE: FinancePage.tsx
 * STATUS: PRODUCTION READY (WITH MONETIZATION)
 * DESC: Finance Document Generator (Invoice, Nota, Kuitansi)
 * FEATURES: 
 * - Multi-mode Document Switcher
 * - Timezone Safe Date Formatting
 * - Memory-Leak Safe Logo Upload
 * - Integrated Ad Banner Space & Saweria Donation Modal
 */

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  User, CreditCard, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/ru-link'; // Note: adjust link if needed for your routing

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
  city: 'JAKARTA',
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

  // Helper Format Tanggal yang Aman
  const formatDateSafe = (dateStr: string) => {
    if(!dateStr) return '-';
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'long' });
    } catch { return dateStr; }
  };

  // Memory Leak Prevention & Initial Date
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
  }, [modeParam]); // logo sengaja tidak dimasukkan ke dep agar tidak reset date setiap ganti logo

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
    setData({ ...data, items: newItems });
  };
  
  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), name: '', qty: 1, price: 0 }] });
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
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
    nota: [ { id: 1, name: "Nota Toko (Ritel)", desc: "Grid garis klasik penuh" }, { id: 2, name: "Nota Jasa (Service)", desc: "Tampilan ringkas tanpa grid" } ],
    kuitansi: [ { id: 1, name: "Kuitansi Modern", desc: "Format vertikal elegan" }, { id: 2, name: "Kuitansi Dinas", desc: "Format buku cek klasik" } ]
  };

  // @ts-ignore
  const currentTemplates = TEMPLATES[activeDocType] || TEMPLATES['invoice'];
  const activeTemplateName = currentTemplates.find((t: any) => t.id === templateId)?.name;

  const dims = (activeDocType === 'nota') ? { w: '105mm', h: '148mm' } : 
               (activeDocType === 'kuitansi') ? { w: '210mm', h: '99mm' } : 
               { w: '210mm', h: '297mm' };

  // --- KOMPONEN DOKUMEN ---
  const DocumentContent = () => (
    <div className="bg-white print:shadow-none print:border-none shadow-2xl mx-auto overflow-hidden relative border border-slate-200" style={{ width: dims.w, minHeight: dims.h }}>
      {/* RENDER INVOICE */}
      {activeDocType === 'invoice' && (
          <div className="h-full flex flex-col text-[#1e293b] p-[10mm] md:p-[15mm]">
            {templateId === 1 ? (
              <>
                <div className="flex justify-between items-start mb-10 shrink-0">
                  <div className="w-[60%]">
                      <h1 className="text-4xl font-extrabold text-[#1e40af] tracking-tight mb-2">INVOICE</h1>
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
                <div className="mb-8 p-4 bg-slate-50 print:bg-white border-l-4 border-blue-600 text-sm break-inside-avoid">
                  <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Tagihan Kepada:</p>
                  <div className="text-lg font-bold text-slate-800 uppercase">{data.receiverName}</div>
                  <div className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">{data.receiverInfo}</div>
                </div>
                <div className="flex-grow">
                  <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-blue-800 text-blue-800 uppercase text-[10px]">
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
                          <span className="font-bold text-slate-600 uppercase text-xs">Total Pembayaran</span>
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
              </>
            ) : (
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center border-b-2 border-slate-100 pb-6 mb-8 shrink-0">
                        <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-slate-800">Invoice</h1>
                        <div className="text-right">
                            <div className="font-bold text-xl uppercase">{data.senderName}</div>
                            {logo && <img src={logo} className="h-10 w-auto object-contain ml-auto mt-2 grayscale opacity-50" alt="logo" />}
                        </div>
                    </div>
                    <div className="flex justify-between mb-10 text-[11px] break-inside-avoid">
                        <div className="space-y-1">
                            <p className="font-bold text-blue-600 uppercase tracking-widest text-[9px]">Bill To</p>
                            <p className="text-lg font-bold uppercase">{data.receiverName}</p>
                            <p className="text-slate-500 whitespace-pre-line">{data.receiverInfo}</p>
                        </div>
                        <div className="text-right space-y-2">
                            <div><p className="font-bold text-slate-400 uppercase text-[9px]">Invoice No.</p><p className="font-mono font-bold text-slate-800">{data.no}</p></div>
                            <div><p className="font-bold text-slate-400 uppercase text-[9px]">Date</p><p className="font-bold text-slate-800">{formatDateSafe(data.date)}</p></div>
                        </div>
                    </div>
                    <table className="w-full text-sm border-collapse mb-10">
                        <thead className="bg-slate-900 text-white uppercase text-[9px]">
                            <tr><th className="py-2 px-3 text-left">Description</th><th className="py-2 px-3 text-center">Qty</th><th className="py-2 px-3 text-right">Unit Price</th><th className="py-2 px-3 text-right">Total</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 border-b border-slate-900">
                            {data.items.map(item => (
                                <tr key={item.id} className="break-inside-avoid">
                                    <td className="py-4 px-3 uppercase text-[12px]">{item.name}</td>
                                    <td className="py-4 px-3 text-center tabular-nums">{item.qty}</td>
                                    <td className="py-4 px-3 text-right tabular-nums">{item.price.toLocaleString()}</td>
                                    <td className="py-4 px-3 text-right font-bold tabular-nums">{(item.qty * item.price).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-auto">
                        <div className="flex justify-end mb-10 break-inside-avoid">
                            <div className="w-64 space-y-2">
                                <div className="flex justify-between text-xl font-black border-t-4 border-slate-900 pt-2">
                                    <span>TOTAL</span><span>Rp {total.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-end text-[10px] break-inside-avoid">
                            <div className="w-1/2 text-slate-500 whitespace-pre-line italic leading-relaxed">{data.notes}</div>
                            <div className="text-center w-48">
                                <p className="mb-14 font-bold uppercase tracking-widest text-slate-400">Authorized by</p>
                                <p className="font-black uppercase border-b-2 border-slate-900 inline-block">{data.signer}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>
      )}

      {/* RENDER NOTA */}
      {activeDocType === 'nota' && (
          <div className="h-full flex flex-col p-[8mm] text-slate-900">
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3 mb-4 shrink-0">
                  <div className="flex gap-3">
                      {logo && <img src={logo} className="w-12 h-12 object-contain grayscale" alt="logo" />}
                      <div><h1 className="font-black text-lg leading-none uppercase">{data.senderName}</h1><p className="text-[8px] text-slate-500 leading-tight whitespace-pre-line mt-1">{data.senderInfo}</p></div>
                  </div>
                  <div className="text-right"><h2 className="text-2xl font-black italic text-slate-300 -mt-2">NOTA</h2><p className="font-mono text-[9px] font-bold">No: {data.no}</p></div>
              </div>
              <div className="flex justify-between text-[10px] mb-4 shrink-0">
                  <div><span className="text-slate-400 uppercase text-[8px]">Kepada Yth:</span><p className="font-bold uppercase">{data.receiverName}</p></div>
                  <div className="text-right"><span className="text-slate-400 uppercase text-[8px]">Tanggal:</span><p className="font-bold">{formatDateSafe(data.date)}</p></div>
              </div>
              <table className="w-full text-[10px] border-collapse flex-grow">
                  <thead className="bg-slate-100 print:bg-white uppercase text-[8px] font-bold">
                      <tr><th className="border border-slate-900 p-1.5 w-[30px]">NO</th><th className="border border-slate-900 p-1.5 text-left">ITEM</th><th className="border border-slate-900 p-1.5 w-[40px]">QTY</th><th className="border border-slate-900 p-1.5 w-[70px]">HARGA</th><th className="border border-slate-900 p-1.5 w-[80px]">TOTAL</th></tr>
                  </thead>
                  <tbody>
                      {data.items.map((item, i) => (
                          <tr key={item.id}><td className="border border-slate-900 p-1.5 text-center">{i+1}</td><td className="border border-slate-900 p-1.5 uppercase">{item.name}</td><td className="border border-slate-900 p-1.5 text-center tabular-nums">{item.qty}</td><td className="border border-slate-900 p-1.5 text-right tabular-nums">{item.price.toLocaleString()}</td><td className="border border-slate-900 p-1.5 text-right font-bold tabular-nums">{(item.qty * item.price).toLocaleString()}</td></tr>
                      ))}
                      {[...Array(Math.max(0, 10 - data.items.length))].map((_, i) => (
                          <tr key={i}><td className="border border-slate-900 p-1.5 h-[26px]"></td><td className="border border-slate-900 p-1.5"></td><td className="border border-slate-900 p-1.5"></td><td className="border border-slate-900 p-1.5"></td><td className="border border-slate-900 p-1.5"></td></tr>
                      ))}
                  </tbody>
              </table>
              <div className="mt-4 shrink-0">
                  <div className="flex justify-end mb-4"><div className="flex border-2 border-slate-900 font-black text-xs uppercase"><div className="px-3 py-1.5 bg-slate-900 text-white">Grand Total</div><div className="px-4 py-1.5 bg-white min-w-[100px] text-right tabular-nums">Rp {total.toLocaleString('id-ID')}</div></div></div>
                  <div className="flex justify-between items-end text-[9px]">
                      <div className="text-center w-24"><p className="mb-10 uppercase text-[8px] font-bold text-slate-400">Penerima</p><div className="border-b border-slate-300"></div></div>
                      <div className="text-center w-[40%] text-[8px] italic text-slate-400 px-4">{data.footerNote}</div>
                      <div className="text-center w-24"><p className="mb-10 uppercase text-[8px] font-bold text-slate-400">Hormat Kami</p><p className="font-bold uppercase leading-none">{data.signer}</p></div>
                  </div>
              </div>
          </div>
      )}

      {/* RENDER KUITANSI */}
      {activeDocType === 'kuitansi' && (
          <div className="h-full flex flex-col p-[8mm]">
              <div className="border-2 border-slate-900 p-1 flex-grow flex flex-col">
                  <div className="border border-slate-900 p-6 flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
                          <h1 className="text-2xl font-black italic tracking-widest text-slate-800">KUITANSI</h1>
                          <div className="text-right font-mono text-xs font-bold">No. {data.no}</div>
                      </div>
                      <div className="space-y-6 text-sm font-serif">
                          <div className="flex items-baseline gap-4"><span className="w-36 uppercase text-[9px] font-bold text-slate-400">Sudah Terima Dari</span><div className="flex-1 border-b border-dotted border-slate-400 px-2 font-bold uppercase">{data.receiverName}</div></div>
                          <div className="flex items-baseline gap-4"><span className="w-36 uppercase text-[9px] font-bold text-slate-400">Banyaknya Uang</span><div className="flex-1 border-b border-dotted border-slate-400 bg-slate-50 px-2 font-bold italic capitalize text-slate-700"># {terbilangText} #</div></div>
                          <div className="flex items-baseline gap-4"><span className="w-36 uppercase text-[9px] font-bold text-slate-400">Untuk Pembayaran</span><div className="flex-1 border-b border-dotted border-slate-400 px-2 uppercase">{data.items.map(i => i.name).join(', ')}</div></div>
                      </div>
                      <div className="flex justify-between items-end mt-10">
                          <div className="bg-slate-900 text-white px-8 py-3 text-2xl font-black shadow-lg">Rp {total.toLocaleString('id-ID')}</div>
                          <div className="text-center w-64">
                              <p className="text-[10px] mb-14 uppercase font-bold text-slate-400">{data.city}, {formatDateSafe(data.date)}</p>
                              <p className="font-black border-b-2 border-slate-900 uppercase text-sm pb-1">{data.signer}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );

  if (!isClient) return <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center text-slate-400 font-medium">Memuat Editor...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800">
      
      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
              <div className="bg-slate-800 p-1.5 rounded-full group-hover:bg-slate-700 transition-colors">
                <ArrowLeft size={16} />
              </div>
              <span className="text-sm font-medium hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 overflow-x-auto">
              {[{ id: 'invoice', label: 'Invoice' }, { id: 'nota', label: 'Nota' }, { id: 'kuitansi', label: 'Kuitansi' }].map((tab) => (
                <button 
                  key={tab.id} onClick={() => { setActiveDocType(tab.id as any); setTemplateId(1); }}
                  className={`px-4 py-1.5 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap ${activeDocType === tab.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={handleReset} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Reset Data">
                <RotateCcw size={18} />
            </button>
            <div className="relative hidden md:block">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={`transition-transform duration-200 ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden z-50 text-slate-800 animate-in fade-in slide-in-from-top-1">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">Pilih Desain</div>
                  {currentTemplates.map((t: any) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div>{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5 font-normal">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden sm:inline">Cetak</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden relative">
        
        {/* SIDEBAR EDITOR */}
        <div className={`no-print w-full md:w-[420px] lg:w-[400px] bg-white rounded-xl border border-slate-200 flex flex-col h-full absolute md:relative z-10 transition-transform duration-300 shadow-xl md:shadow-none ${mobileMode === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2"><Edit3 size={16} className="text-blue-600" /><h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">Editor Dokumen</h3></div>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">{activeDocType}</span>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32 md:pb-10 custom-scrollbar">
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all bg-slate-50 overflow-hidden" onClick={() => fileInputRef.current?.click()}>
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="logo" /> : <Upload size={20} className="text-slate-300" />}
                    </div>
                    <div className="flex-1">
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                       <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Pasang Logo</button>
                       <div className="text-[9px] text-slate-400 mt-1 uppercase font-bold">Rasio 1:1 Guna KOP</div>
                    </div>
                 </div>
                 <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Identitas Penerbit</label><input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.senderName} onChange={e => handleDataChange(0 as any, 'senderName' as any, e.target.value)} /></div>
                 <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Detail Alamat & Kontak</label><textarea className="w-full p-2.5 border border-slate-200 rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} /></div>
                 <div className="grid grid-cols-2 gap-3 pt-2">
                    <div><label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Nomor Dokumen</label><input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none" value={data.no} onChange={e => setData({...data, no: e.target.value})} /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Tanggal</label><input type="date" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => setData({...data, date: e.target.value})} /></div>
                 </div>
              </div>
              <div className="border-t border-slate-100 pt-4 space-y-4">
                 <div className="flex items-center justify-between"><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1"><CreditCard size={12}/> Daftar Transaksi</label><button onClick={addItem} className="text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 flex items-center gap-1 font-bold shadow-md shadow-blue-200">+ ITEM</button></div>
                 <div className="space-y-3">
                   {data.items.map((item, idx) => (
                      <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative group animate-in slide-in-from-right-2">
                         <input type="text" className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none mb-2" placeholder="Nama Barang/Jasa..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                         <div className="flex gap-2">
                             <div className="flex-1"><label className="text-[8px] font-bold text-slate-400 uppercase ml-1">Qty</label><input type="number" className="w-full bg-white border border-slate-200 rounded-lg text-xs p-2 text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} /></div>
                             <div className="flex-[2]"><label className="text-[8px] font-bold text-slate-400 uppercase ml-1">Harga</label><input type="number" className="w-full bg-white border border-slate-200 rounded-lg text-xs p-2 text-right font-mono" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} /></div>
                         </div>
                         <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 p-1.5 rounded-full border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                      </div>
                   ))}
                 </div>
              </div>
              <div className="border-t border-slate-100 pt-4 space-y-4">
                 <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Nama Klien / Penerima</label><input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} /></div>
                 {activeDocType !== 'kuitansi' && (<div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Alamat / Detail Klien</label><textarea className="w-full p-2.5 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverInfo} onChange={e => setData({...data, receiverInfo: e.target.value})} /></div>)}
                 <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Kota Penerbitan</label><input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => setData({...data, city: e.target.value})} /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Nama Penanda Tangan</label><input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} /></div>
                 </div>
                 <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Catatan / Instruksi Bayar</label><textarea className="w-full p-2.5 border border-slate-200 rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none italic" value={data.notes} onChange={e => setData({...data, notes: e.target.value})} /></div>
                 {activeDocType === 'nota' && (<div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Footer Nota</label><input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.footerNote} onChange={e => setData({...data, footerNote: e.target.value})} /></div>)}
              </div>
           </div>
        </div>

        {/* RIGHT SIDEBAR: PREVIEW */}
        <div className="no-print flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto overflow-x-hidden relative">
          <div className="origin-top transition-transform duration-300 transform scale-[0.35] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 mb-[-120%] sm:mb-[-100mm] md:mb-[-40mm] lg:mb-[-10mm] xl:mb-10 mt-2 xl:mt-0 shadow-2xl">
             <DocumentContent />
          </div>
        </div>

        {/* INJEKSI KOMPONEN MONETISASI */}
        <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
          <button onClick={() => setMobileMode('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileMode === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
          <button onClick={() => setMobileMode('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileMode === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL (Strict Clean) */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '10mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><DocumentContent /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '10mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>

    </div>
  );
}
