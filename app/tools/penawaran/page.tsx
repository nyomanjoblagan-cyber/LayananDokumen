'use client';

/**
 * FILE: QuotationPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Penawaran Harga (Quotation) Profesional
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Building2, Briefcase, FileText, Calendar, Percent, ChevronDown, Check, Edit3, Eye, X, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface QuoteItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

interface QuoteData {
  no: string;
  date: string;
  validUntil: string;
  subject: string;
  
  // Pengirim
  senderName: string;
  senderInfo: string;
  
  // Penerima
  receiverName: string;
  receiverCompany: string;
  receiverAddress: string;
  
  // Isi
  opening: string;
  items: QuoteItem[];
  taxRate: number;
  terms: string;
  closing: string;
  city: string;
  signer: string;
  signerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: QuoteData = {
  no: `QUO/${new Date().getFullYear()}/001`,
  date: '', 
  validUntil: '', 
  subject: 'Penawaran Harga Pengadaan Perangkat IT',
  
  senderName: 'PT. DIGITAL SOLUSI NUSANTARA',
  senderInfo: 'Gedung Cyber 2, Lt. 10, Jl. Rasuna Said, Jakarta\nEmail: sales@digisolusi.com | WA: 0812-9999-8888',
  
  receiverName: 'BAPAK HARTONO',
  receiverCompany: 'CV. MAJU MUNDUR JAYA ABADI',
  receiverAddress: 'Jl. Industri Raya No. 45, Kawasan Industri Cikarang',
  
  opening: 'Dengan hormat,\nBersama surat ini, kami bermaksud mengajukan penawaran harga untuk kebutuhan pengadaan barang/jasa dengan rincian sebagai berikut:',
  items: [
    { id: 1, name: 'Server Rack 42U - High Performance', qty: 2, price: 15000000 },
    { id: 2, name: 'Jasa Instalasi & Konfigurasi Network', qty: 1, price: 5000000 },
  ],
  taxRate: 11,
  terms: '1. Harga sudah termasuk pengiriman wilayah Jabodetabek.\n2. Pembayaran DP 50%, pelunasan setelah barang diterima.\n3. Garansi barang 1 tahun.',
  closing: 'Demikian penawaran ini kami sampaikan. Kami menunggu kabar baik dari Bapak/Ibu. Terima kasih.',
  city: 'JAKARTA',
  signer: 'BUDI SANTOSO, S.Kom',
  signerJob: 'Marketing Manager'
};

export default function QuotationPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Penawaran...</div>}>
      <QuotationToolBuilder />
    </Suspense>
  );
}

function QuotationToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<QuoteData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const valid = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today, validUntil: valid }));
  }, []);

  // CALCULATIONS
  const subtotal = data.items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price)), 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const total = subtotal + taxAmount;

  // HANDLERS
  const handleDataChange = (field: keyof QuoteData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };
  
  const handleItemChange = (idx: number, field: keyof QuoteItem, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setData(prev => ({ 
        ...prev, 
        items: [...prev.items, { id: Date.now(), name: '', qty: 1, price: 0 }] 
    }));
  };
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        const valid = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, validUntil: valid });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? 'Surat Resmi' : 'Modern Proposal';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {templateId === 1 && (
          <div className="h-full flex flex-col">
              <div className="flex items-center gap-6 border-b-4 border-slate-800 pb-3 mb-6 shrink-0 font-sans">
                  <div className="w-16 h-16 flex items-center justify-center shrink-0">
                      {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <div className="font-bold text-slate-200 uppercase text-[8px] border-2 border-dashed p-2">LOGO</div>}
                  </div>
                  <div className="flex-1 text-center">
                      <h1 className="text-xl font-black uppercase text-slate-900 leading-tight tracking-tight">{data.senderName}</h1>
                      <div className="text-[8pt] text-slate-500 whitespace-pre-line leading-tight">{data.senderInfo}</div>
                  </div>
              </div>

              <div className="flex justify-between text-sm mb-6 shrink-0 font-sans">
                  <div className="space-y-0.5">
                      <div>Nomor : {data.no}</div>
                      <div className="font-bold uppercase text-blue-700 print:text-black">Perihal : {data.subject}</div>
                  </div>
                  <div className="text-right">{data.city}, {formatDateSafe(data.date)}</div>
              </div>

              <div className="mb-6 text-sm shrink-0 font-sans">
                  <p>Kepada Yth,</p>
                  <p className="font-bold text-lg">{data.receiverName}</p>
                  <p className="font-bold text-slate-600">{data.receiverCompany}</p>
                  <p className="max-w-xs">{data.receiverAddress}</p>
              </div>

              <div className="mb-4 text-[11pt] text-justify whitespace-pre-line leading-relaxed">
                  {data.opening}
              </div>

              <div className="flex-grow overflow-hidden mb-6">
                  <table className="w-full border-collapse border border-slate-900 text-[10pt] font-sans">
                      <thead>
                          <tr className="bg-slate-100 print:bg-transparent">
                              <th className="border border-slate-900 py-1.5 px-2 text-center w-10">No</th>
                              <th className="border border-slate-900 py-1.5 px-2 text-left">Deskripsi Barang / Jasa</th>
                              <th className="border border-slate-900 py-1.5 px-2 text-center w-14">Qty</th>
                              <th className="border border-slate-900 py-1.5 px-2 text-right w-32">Harga</th>
                              <th className="border border-slate-900 py-1.5 px-2 text-right w-36">Total</th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.items.map((item, idx) => (
                              <tr key={idx} className="break-inside-avoid">
                                  <td className="border border-slate-900 py-1 px-2 text-center">{idx + 1}</td>
                                  <td className="border border-slate-900 py-1 px-2 font-medium">{item.name}</td>
                                  <td className="border border-slate-900 py-1 px-2 text-center">{item.qty}</td>
                                  <td className="border border-slate-900 py-1 px-2 text-right">{item.price.toLocaleString('id-ID')}</td>
                                  <td className="border border-slate-900 py-1 px-2 text-right font-bold">{(item.qty * item.price).toLocaleString('id-ID')}</td>
                              </tr>
                          ))}
                      </tbody>
                      <tfoot>
                          <tr className="bg-slate-50 print:bg-transparent break-inside-avoid">
                              <td colSpan={4} className="border border-slate-900 py-1 px-2 text-right font-bold uppercase text-[9px]">Subtotal</td>
                              <td className="border border-slate-900 py-1 px-2 text-right font-bold">{subtotal.toLocaleString('id-ID')}</td>
                          </tr>
                          {data.taxRate > 0 && (
                              <tr className="break-inside-avoid">
                                  <td colSpan={4} className="border border-slate-900 py-1 px-2 text-right text-[9px]">PPN ({data.taxRate}%)</td>
                                  <td className="border border-slate-900 py-1 px-2 text-right">{taxAmount.toLocaleString('id-ID')}</td>
                              </tr>
                          )}
                          <tr className="bg-slate-900 text-white print:text-black print:bg-transparent break-inside-avoid">
                              <td colSpan={4} className="border border-slate-900 py-2 px-2 text-right font-black uppercase">Grand Total (IDR)</td>
                              <td className="border border-slate-900 py-2 px-2 text-right font-black text-lg">{total.toLocaleString('id-ID')}</td>
                          </tr>
                      </tfoot>
                  </table>
              </div>

              <div className="mb-6 text-[10pt] shrink-0 break-inside-avoid">
                  <p className="font-bold underline mb-1">Syarat & Ketentuan:</p>
                  <div className="whitespace-pre-line leading-snug text-slate-700 text-xs pl-4 border-l-2 border-slate-200">
                      {data.terms}
                  </div>
                  <p className="mt-2 italic text-xs text-red-600 print:text-black">* Berlaku hingga: {formatDateSafe(data.validUntil)}</p>
              </div>

              <div className="mt-auto flex justify-end shrink-0 break-inside-avoid font-sans">
                  <div className="text-center w-64">
                      <p className="mb-20">Hormat Kami,</p>
                      <p className="font-bold underline uppercase">{data.signer}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">{data.signerJob}</p>
                  </div>
              </div>
          </div>
        )}

        {templateId === 2 && (
          <div className="h-full flex flex-col font-sans">
              <div className="flex justify-between items-start mb-10 shrink-0">
                  <div className="space-y-4">
                      {logo ? <img src={logo} className="h-10 w-auto object-contain" alt="Logo" /> : <div className="text-3xl font-black text-blue-600">QUO.</div>}
                      <div>
                          <h2 className="font-black text-xl text-slate-900 leading-none">{data.senderName}</h2>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">Official Quote</div>
                      </div>
                  </div>
                  <div className="text-right">
                      <h1 className="text-5xl font-black text-slate-100 uppercase leading-none mb-4 print:text-black">Proposal</h1>
                      <div className="space-y-0.5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          <div className="font-mono">REF: {data.no}</div>
                          <div>DATE: {data.date}</div>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-10 mb-10 shrink-0 break-inside-avoid">
                  <div className="bg-slate-900 text-white p-6 rounded-3xl print:bg-transparent print:text-black print:border-2 print:border-black">
                      <h3 className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-3">Client Information</h3>
                      <div className="font-black text-lg uppercase leading-tight mb-1">{data.receiverName}</div>
                      <div className="font-bold text-sm opacity-80 mb-2">{data.receiverCompany}</div>
                      <div className="text-[10px] opacity-60 leading-relaxed">{data.receiverAddress}</div>
                  </div>
                  <div className="p-6">
                      <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Project Scope</h3>
                      <div className="font-black text-slate-800 border-b-4 border-blue-600 pb-2 text-xl leading-tight">{data.subject}</div>
                  </div>
              </div>

              <div className="flex-grow overflow-hidden mb-8">
                  <table className="w-full">
                      <thead>
                          <tr className="border-b-2 border-slate-900 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <th className="py-4 text-left">Description</th>
                              <th className="py-4 text-center w-20">Qty</th>
                              <th className="py-4 text-right w-32">Price</th>
                              <th className="py-4 text-right w-40">Amount</th>
                          </tr>
                      </thead>
                      <tbody className="text-[11pt]">
                          {data.items.map((item, idx) => (
                              <tr key={idx} className="border-b border-slate-50 print:border-black break-inside-avoid">
                                  <td className="py-5 font-black text-slate-900">{item.name}</td>
                                  <td className="py-5 text-center text-slate-500">{item.qty}</td>
                                  <td className="py-5 text-right text-slate-500">{item.price.toLocaleString()}</td>
                                  <td className="py-5 text-right font-black text-slate-900">{(item.qty * item.price).toLocaleString()}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>

              <div className="flex justify-end mb-10 shrink-0 break-inside-avoid">
                  <div className="w-80 space-y-3 bg-slate-50 p-6 rounded-3xl border border-slate-100 print:bg-transparent print:border-black">
                      <div className="flex justify-between text-xs font-bold text-slate-400 uppercase"><span>Subtotal</span><span>Rp {subtotal.toLocaleString()}</span></div>
                      {data.taxRate > 0 && <div className="flex justify-between text-xs font-bold text-slate-400 uppercase"><span>VAT ({data.taxRate}%)</span><span>Rp {taxAmount.toLocaleString()}</span></div>}
                      <div className="flex justify-between font-black text-2xl pt-3 border-t border-slate-200 text-slate-900">
                          <span>TOTAL</span>
                          <span>{total.toLocaleString()}</span>
                      </div>
                  </div>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-end shrink-0 break-inside-avoid">
                  <div className="text-[9pt] text-slate-400 italic max-w-sm leading-relaxed">
                      Quotation validity: 14 days from issue date ({data.validUntil}).
                      <br/>Subject to terms and conditions of service.
                  </div>
                  <div className="text-right">
                      <div className="font-serif italic text-3xl text-slate-200 mb-2 print:text-black">Confirmed by,</div>
                      <div className="font-black text-slate-900 text-xl leading-none uppercase tracking-tight">{data.signer}</div>
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-2">{data.signerJob}</div>
                  </div>
              </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <FileText size={16} className="text-blue-500" /> <span className="uppercase tracking-widest">Quotation Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Surat Resmi {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Modern Proposal {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Penawaran</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Pengirim</h3>
                 <div className="flex items-center gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <Upload size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} placeholder="Nama PT" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Klien</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} placeholder="Nama Klien" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.receiverCompany} onChange={e => handleDataChange('receiverCompany', e.target.value)} placeholder="Nama Perusahaan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-2"><Plus size={12}/> Item Penawaran</h3>
                    <button onClick={addItem} className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase">+ Item</button>
                 </div>
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded border relative group animate-in slide-in-from-right-2">
                       <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"><Trash2 size={12}/></button>
                       <input className="w-full p-1 bg-transparent border-b mb-2 text-xs font-bold" placeholder="Item Name" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                       <div className="grid grid-cols-2 gap-2">
                          <input type="number" className="p-1.5 border rounded text-xs" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                          <input type="number" className="p-1.5 border rounded text-xs text-right" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                       </div>
                    </div>
                 ))}
                 <div className="pt-2 border-t flex items-center gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">PPN (%)</label>
                    <input type="number" className="w-20 p-1 border rounded text-xs font-bold text-blue-600" value={data.taxRate} onChange={e => handleDataChange('taxRate', Number(e.target.value))} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}