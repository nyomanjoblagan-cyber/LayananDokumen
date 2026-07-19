'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Plus, Trash2, LayoutTemplate, Building2, ReceiptText, UserCircle2, Coins, Landmark
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface Item {
  id: number;
  name: string;
  qty: number;
  price: number;
}

interface FinanceData {
  no: string;
  date: string;
  dueDate: string;
  senderName: string;
  senderInfo: string;
  receiverName: string;
  receiverInfo: string;
  items: Item[];
  notes: string;
  bankDetails: string;
  terms: string;
  taxRate: number;
  city: string;
  signer: string;
  signerRole: string;
  footerNote: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: FinanceData = {
  no: 'INV/B2B/2026/001',
  date: '', 
  dueDate: '',
  senderName: 'PT. BORCELLE NUSA MANDIRI',
  senderInfo: 'Gedung Borcelle Tower Lt. 12\nJl. Jend. Sudirman Kav. 45, Jakarta Selatan 12920\nTelp: (021) 1234-5678 | Email: finance@borcelle.co.id\nNPWP: 01.234.567.8-901.000',
  receiverName: 'PT. TEKNOLOGI MAJU BERSAMA',
  receiverInfo: 'Gedung Menara Inovasi Lt. 5\nJl. MH Thamrin No. 10, Jakarta Pusat 10350\nAttn: Finance Department',
  items: [
    { id: 1, name: 'Enterprise Software License (Annual)', qty: 1, price: 150000000 },
    { id: 2, name: 'Implementation & Training Services', qty: 1, price: 25000000 },
    { id: 3, name: 'Premium SLA Support (12 Months)', qty: 12, price: 5000000 },
  ],
  taxRate: 11,
  notes: 'Tagihan ini mencakup biaya lisensi dan layanan untuk periode 2026-2027.',
  bankDetails: 'Bank Central Asia (BCA)\nKCU Sudirman\nNo. Rekening: 123-456-7890\nAtas Nama: PT. BORCELLE NUSA MANDIRI',
  terms: '1. Pembayaran jatuh tempo 30 hari sejak tanggal invoice.\n2. Keterlambatan pembayaran dikenakan denda 2% per bulan.\n3. Harap mencantumkan Nomor Invoice pada berita transfer.\n4. Bukti potong PPh Pasal 23 (jika ada) dikirimkan maksimal tanggal 15 bulan berikutnya.',
  city: 'Jakarta',
  signer: 'Anindita Wijaya',
  signerRole: 'Finance Director',
  footerNote: 'Dokumen ini sah dan diterbitkan secara elektronik, tidak memerlukan stempel basah.'
};

// --- HELPER TERBILANG ---
const terbilang = (angka: number): string => {
  const bil = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  if (angka < 12) return " " + bil[angka];
  if (angka < 20) return terbilang(angka - 10) + " Belas";
  if (angka < 100) return terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
  if (angka < 200) return " Seratus" + terbilang(angka - 100);
  if (angka < 1000) return terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
  if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
  if (angka < 1000000000) return terbilang(Math.floor(angka / 1000000)) + " Juta" + terbilang(angka % 1000000);
  if (angka < 1000000000000) return terbilang(Math.floor(angka / 1000000000)) + " Miliar" + terbilang(angka % 1000000000);
  return "";
};

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId, className = '' }: { children: React.ReactNode, templateId: number, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[10pt]' : 'font-sans text-[9pt]'} ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function FinancePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Finance Editor...</div>}>
      <FinanceBuilder />
    </Suspense>
  );
}

function FinanceBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<FinanceData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [docType, setDocType] = useState<'invoice' | 'kuitansi' | 'nota'>('invoice');
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: prev.date || today,
        dueDate: prev.dueDate || today
    }));
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset faktur ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, dueDate: today });
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: Number(e.target.value) });
  };

  const updateItem = (index: number, field: keyof Item, val: string | number) => {
      const newItems = [...data.items];
      newItems[index] = { ...newItems[index], [field]: val };
      setData({ ...data, items: newItems });
  };
  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), name: '', qty: 1, price: 0 }] });
  const removeItem = (index: number) => {
      if(data.items.length <= 1) return;
      setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };
  const formatDate = (dateStr: string) => {
      if(!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal (Serif)' : 'Modern Premium (Sans)';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[9999]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 1 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 2 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Modern Premium (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => {
      const subtotal = data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
      const taxAmount = docType === 'invoice' ? subtotal * (data.taxRate / 100) : 0;
      const grandTotal = subtotal + taxAmount;
      const terbilangText = terbilang(grandTotal) + " Rupiah";

      // --- INVOICE VIEW ---
      if (docType === 'invoice') {
          return (
            <Kertas templateId={templateId}>
              <div className="flex justify-between items-start border-b-[3px] border-black pb-4 mb-6 break-inside-avoid">
                  <div className="w-1/2 pr-4">
                      <h1 className="font-black text-3xl uppercase tracking-wider text-black mb-1">INVOICE</h1>
                      <p className="font-bold text-[12pt]">{data.senderName}</p>
                      <p className="text-slate-700 mt-1 whitespace-pre-wrap">{data.senderInfo}</p>
                  </div>
                  <div className="w-1/2 text-right">
                      <div className="inline-block text-left bg-slate-50 border border-slate-300 p-3 rounded-lg w-full max-w-[250px] ml-auto">
                          <div className="flex justify-between mb-1">
                              <span className="text-slate-500 font-bold">No. Invoice</span>
                              <span className="font-black">{data.no}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                              <span className="text-slate-500 font-bold">Tanggal</span>
                              <span className="font-medium">{formatDate(data.date)}</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-slate-500 font-bold">Jatuh Tempo</span>
                              <span className="font-medium text-red-600">{formatDate(data.dueDate)}</span>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="mb-8 break-inside-avoid">
                  <p className="font-bold text-slate-500 uppercase tracking-widest text-[8pt] mb-2">Tagihan Kepada:</p>
                  <h2 className="font-black text-[12pt] uppercase">{data.receiverName}</h2>
                  <p className="mt-1 max-w-[300px] whitespace-pre-wrap">{data.receiverInfo}</p>
              </div>

              <div className="mb-6">
                  <table className="w-full border-collapse border border-slate-300">
                      <thead>
                          <tr className="bg-slate-100 font-bold uppercase text-[8pt] tracking-widest text-slate-700">
                              <th className="border border-slate-300 p-3 text-left w-12">No</th>
                              <th className="border border-slate-300 p-3 text-left">Deskripsi Barang / Jasa</th>
                              <th className="border border-slate-300 p-3 text-center w-16">Qty</th>
                              <th className="border border-slate-300 p-3 text-right w-32">Harga Satuan</th>
                              <th className="border border-slate-300 p-3 text-right w-40">Total</th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.items.map((item, idx) => (
                              <tr key={idx} className="border-b border-slate-200 break-inside-avoid">
                                  <td className="border-x border-slate-300 p-3 text-center align-top">{idx + 1}</td>
                                  <td className="border-x border-slate-300 p-3 align-top font-medium">{item.name}</td>
                                  <td className="border-x border-slate-300 p-3 text-center align-top">{item.qty}</td>
                                  <td className="border-x border-slate-300 p-3 text-right align-top">{formatCurrency(item.price)}</td>
                                  <td className="border-x border-slate-300 p-3 text-right align-top font-bold">{formatCurrency(item.qty * item.price)}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>

              <div className="flex justify-between items-start break-inside-avoid">
                  <div className="w-1/2 pr-6">
                      <p className="font-bold text-slate-500 uppercase tracking-widest text-[8pt] mb-2">Terbilang:</p>
                      <div className="p-3 bg-slate-100 border border-slate-300 rounded whitespace-pre-wrap font-black uppercase text-sm italic mb-4">
                          {terbilangText}
                      </div>
                      <p className="font-bold text-slate-500 uppercase tracking-widest text-[8pt] mb-2">Informasi Pembayaran:</p>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded whitespace-pre-wrap text-sm mb-4">
                          {data.bankDetails}
                      </div>
                      <p className="font-bold text-slate-500 uppercase tracking-widest text-[8pt] mb-2">Syarat & Ketentuan:</p>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded whitespace-pre-wrap text-xs">
                          {data.terms}
                      </div>
                  </div>
                  <div className="w-1/2 w-max-[300px]">
                      <table className="w-full text-right mb-8">
                          <tbody>
                              <tr>
                                  <td className="py-2 pr-4 font-bold text-slate-600">Subtotal</td>
                                  <td className="py-2 font-bold w-40">{formatCurrency(subtotal)}</td>
                              </tr>
                              {data.taxRate > 0 && (
                              <tr>
                                  <td className="py-2 pr-4 font-medium text-slate-500">PPN ({data.taxRate}%)</td>
                                  <td className="py-2">{formatCurrency(taxAmount)}</td>
                              </tr>
                              )}
                              <tr className="border-t-2 border-black">
                                  <td className="py-3 pr-4 font-black uppercase text-[12pt]">Total Tagihan</td>
                                  <td className="py-3 font-black text-[12pt] bg-emerald-200">{formatCurrency(grandTotal)}</td>
                              </tr>
                          </tbody>
                      </table>
                      <div className="text-center w-[200px] ml-auto break-inside-avoid">
                          <p className="mb-1">{data.city}, {formatDate(data.date)}</p>
                          <p className="font-bold mb-4">{data.senderName}</p>
                          <div className="h-24"></div>
                          <p className="font-bold underline uppercase">{data.signer}</p>
                          <p className="text-sm">{data.signerRole}</p>
                      </div>
                  </div>
              </div>
              <div className="mt-8 text-center text-xs text-slate-500 border-t border-slate-300 pt-4">
                 {data.footerNote}
              </div>
            </Kertas>
          );
      }
      
      // --- KUITANSI VIEW ---
      if (docType === 'kuitansi') {
          return (
            <Kertas templateId={templateId}>
               <div className="border-[4px] border-double border-slate-800 p-8 min-h-[400px]">
                   <div className="flex justify-between items-center border-b-[2px] border-slate-800 pb-4 mb-6">
                      <div className="w-2/3">
                          <h1 className="font-black text-3xl uppercase tracking-widest mb-1">KUITANSI PEMBAYARAN</h1>
                          <p className="font-bold text-[11pt]">{data.senderName}</p>
                      </div>
                      <div className="w-1/3 text-right">
                          <p className="text-sm"><span className="font-bold">No. Kuitansi:</span> {data.no}</p>
                          <p className="text-sm"><span className="font-bold">Tanggal:</span> {formatDate(data.date)}</p>
                      </div>
                   </div>
                   
                   <table className="w-full text-lg mb-8">
                       <tbody>
                           <tr>
                               <td className="py-3 font-bold w-48 align-top">Telah terima dari</td>
                               <td className="py-3 w-4 align-top">:</td>
                               <td className="py-3 align-top font-bold uppercase">{data.receiverName}</td>
                           </tr>
                           <tr>
                               <td className="py-3 font-bold align-top">Uang Sebanyak</td>
                               <td className="py-3 align-top">:</td>
                               <td className="py-3 align-top">
                                   <div className="bg-slate-100 border border-slate-300 p-4 font-black italic uppercase">
                                       "{terbilangText}"
                                   </div>
                               </td>
                           </tr>
                           <tr>
                               <td className="py-3 font-bold align-top">Untuk Pembayaran</td>
                               <td className="py-3 align-top">:</td>
                               <td className="py-3 align-top whitespace-pre-wrap">{data.notes}</td>
                           </tr>
                       </tbody>
                   </table>

                   <div className="flex justify-between items-end mt-12">
                       <div className="bg-emerald-100 border-2 border-emerald-600 px-6 py-4 font-black text-2xl">
                           {formatCurrency(grandTotal)}
                       </div>
                       <div className="text-center w-[250px]">
                          <p className="mb-1">{data.city}, {formatDate(data.date)}</p>
                          <p className="font-bold mb-4">{data.senderName}</p>
                          <div className="h-24"></div>
                          <p className="font-bold underline uppercase">{data.signer}</p>
                          <p className="text-sm">{data.signerRole}</p>
                      </div>
                   </div>
               </div>
            </Kertas>
          )
      }

      // --- NOTA VIEW ---
      return (
        <Kertas templateId={templateId} className="max-w-[150mm] !mx-auto">
            <div className="text-center mb-6 border-b-2 border-dashed border-slate-500 pb-4">
                <h1 className="font-black text-xl uppercase tracking-widest">{data.senderName}</h1>
                <p className="text-sm whitespace-pre-wrap mt-1">{data.senderInfo}</p>
            </div>
            
            <div className="flex justify-between mb-6 text-sm">
                <div>
                    <p><b>Nota:</b> {data.no}</p>
                    <p><b>Kepada:</b> {data.receiverName}</p>
                </div>
                <div className="text-right">
                    <p><b>Tanggal:</b> {formatDate(data.date)}</p>
                </div>
            </div>

            <table className="w-full mb-6 text-sm">
                <thead>
                    <tr className="border-b-2 border-slate-800">
                        <th className="py-2 text-left w-12">Qty</th>
                        <th className="py-2 text-left">Item</th>
                        <th className="py-2 text-right">Harga</th>
                        <th className="py-2 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, idx) => (
                        <tr key={idx} className="border-b border-dashed border-slate-300">
                            <td className="py-2 text-left align-top">{item.qty}</td>
                            <td className="py-2 text-left align-top">{item.name}</td>
                            <td className="py-2 text-right align-top">{formatCurrency(item.price)}</td>
                            <td className="py-2 text-right align-top font-bold">{formatCurrency(item.qty * item.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end mb-8 text-sm">
                <table className="w-[200px]">
                    <tbody>
                        <tr>
                            <td className="py-1 font-bold">Total</td>
                            <td className="py-1 text-right font-black">{formatCurrency(grandTotal)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="text-center text-xs border-t-2 border-dashed border-slate-500 pt-4">
                <p>Terima kasih atas kepercayaan Anda.</p>
                <p>Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.</p>
                <p className="font-bold mt-2">Hormat Kami,</p>
                <p className="mt-8 uppercase underline">{data.signer}</p>
            </div>
        </Kertas>
      )
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Finance Suite</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <select value={docType} onChange={(e) => setDocType(e.target.value as any)} className="bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-white outline-none cursor-pointer">
                <option value="invoice">Invoice</option>
                <option value="kuitansi">Kuitansi</option>
                <option value="nota">Nota</option>
            </select>
            <div className="relative hidden md:block">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-sky-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <Landmark size={18} className="text-sky-600" /> Editor Finansial
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INFORMASI DOKUMEN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <ReceiptText size={14} className="text-amber-600"/> Data Dokumen
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Dokumen (Invoice/Kuitansi/Nota)</label>
                        <input type="text" name="no" value={data.no} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                            <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jatuh Tempo (Khusus Invoice)</label>
                            <input type="date" name="dueDate" value={data.dueDate} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-red-600 font-bold focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penerbitan</label>
                        <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

                {/* 2. PENGIRIM (PENJUAL) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-sky-600"/> Penjual (Vendor)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Penjual</label>
                        <input type="text" name="senderName" value={data.senderName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Informasi Lengkap (Alamat & Kontak)</label>
                        <textarea name="senderInfo" value={data.senderInfo} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-sky-800 h-24 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 3. KLIEN (PEMBELI) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-emerald-600"/> Pembeli (Klien)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan Pembeli</label>
                        <input type="text" name="receiverName" value={data.receiverName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Informasi Lengkap (Alamat)</label>
                        <textarea name="receiverInfo" value={data.receiverInfo} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-emerald-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 4. ITEM BARANG/JASA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-2"><Coins size={14} className="text-purple-600"/> Item Penjualan</span>
                    <button onClick={addItem} className="text-[10px] bg-purple-100 text-purple-700 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-purple-200 transition-colors"><Plus size={12}/> Tambah</button>
                  </h3>
                  <div className="space-y-4">
                      {data.items.map((item, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group">
                              <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-sm"><Trash2 size={12}/></button>
                              <div className="space-y-3">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deskripsi Item</label>
                                    <input type="text" value={item.name} onChange={(e) => updateItem(idx, 'name', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Nama barang/jasa" />
                                  </div>
                                  <div className="grid grid-cols-3 gap-3">
                                      <div className="col-span-1">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">QTY</label>
                                        <input type="number" min="1" value={item.qty} onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value)||0)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-center focus:ring-2 focus:ring-purple-500 outline-none" />
                                      </div>
                                      <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Harga Satuan (Rp)</label>
                                        <input type="number" min="0" value={item.price} onChange={(e) => updateItem(idx, 'price', parseInt(e.target.value)||0)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-right focus:ring-2 focus:ring-purple-500 outline-none" />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                </div>

                {/* 5. PAJAK & INFO LAINNYA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <ReceiptText size={14} className="text-rose-600"/> Info Lainnya & Pajak
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">PPN (%)</label>
                        <input type="number" name="taxRate" value={data.taxRate} onChange={handleNumberChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Catatan Tujuan Pembayaran (Untuk Kuitansi)</label>
                        <textarea name="notes" value={data.notes} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Info Rekening Bank (Untuk Invoice)</label>
                        <textarea name="bankDetails" value={data.bankDetails} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Syarat & Ketentuan (Untuk Invoice)</label>
                        <textarea name="terms" value={data.terms} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-24 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Catatan Footer Resmi</label>
                        <textarea name="footerNote" value={data.footerNote} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>
                
                {/* 6. PENANDATANGAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Edit3 size={14} className="text-orange-600"/> Penandatangan
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama TTD</label>
                        <input type="text" name="signer" value={data.signer} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-orange-800 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan TTD</label>
                        <input type="text" name="signerRole" value={data.signerRole} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-orange-800 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Finance Suite" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
