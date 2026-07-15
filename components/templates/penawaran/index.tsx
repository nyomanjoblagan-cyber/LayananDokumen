'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Building2, Briefcase, FileText, Calendar, Percent, ChevronDown, Check, Edit3, Eye, X, RotateCcw, ArrowLeftCircle, CheckSquare, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

interface QuoteItem {
  id: number;
  name: string;
  description: string;
  qty: number;
  price: number;
}

interface QuoteData {
  no: string;
  date: string;
  validUntil: string;
  subject: string;
  
  senderName: string;
  senderInfo: string;
  
  receiverName: string;
  receiverTitle: string;
  receiverCompany: string;
  receiverAddress: string;
  
  executiveSummary: string;
  items: QuoteItem[];
  taxRate: number;
  discount: number;
  terms: string;
  acceptanceProcedure: string;
  
  city: string;
  signer: string;
  signerJob: string;
}

const INITIAL_DATA: QuoteData = {
  no: `B2B-QUO/${new Date().getFullYear()}/001`,
  date: '', 
  validUntil: '', 
  subject: 'Proposal Pengadaan & Implementasi Sistem Enterprise',
  
  senderName: 'PT. TEKNOLOGI ENTERPRISE NUSANTARA',
  senderInfo: 'Enterprise Tower, Lt. 15, SCBD Jakarta\nEmail: enterprise@teknologi.com | Telp: (021) 888-9999',
  
  receiverName: 'BAPAK DIREKTUR UTAMA',
  receiverTitle: 'Chief Executive Officer',
  receiverCompany: 'PT. KORPORAT BESAR INDONESIA',
  receiverAddress: 'Gedung Korporat Lt. 8, Jl. Sudirman Kav. 50, Jakarta Selatan',
  
  executiveSummary: 'Merujuk pada diskusi sebelumnya, kami mengajukan proposal solusi komprehensif yang dirancang khusus untuk meningkatkan efisiensi operasional dan skalabilitas sistem di perusahaan Bapak/Ibu. Solusi ini mencakup pengadaan perangkat keras kelas enterprise, lisensi perangkat lunak, serta layanan implementasi profesional.',
  items: [
    { id: 1, name: 'Enterprise Server Node', description: 'Dual Intel Xeon Gold, 256GB RAM, 4TB NVMe SSD', qty: 3, price: 150000000 },
    { id: 2, name: 'Professional Services', description: 'Instalasi, Konfigurasi, dan Migrasi Data (Lumpsum)', qty: 1, price: 75000000 },
    { id: 3, name: 'Annual Maintenance Support', description: '24/7 SLA 4 Hours On-Site Support (1 Tahun)', qty: 1, price: 50000000 },
  ],
  taxRate: 11,
  discount: 0,
  terms: '1. Termin Pembayaran: 40% Down Payment, 40% User Acceptance Test (UAT), 20% Go-Live.\n2. Waktu Pekerjaan: 45 Hari Kerja terhitung sejak PO diterbitkan.\n3. Harga sudah termasuk biaya pengiriman dan asuransi (Franco Jakarta).\n4. Segala pajak yang timbul akibat transaksi ini menjadi tanggung jawab masing-masing pihak sesuai ketentuan yang berlaku.',
  acceptanceProcedure: 'Untuk menyetujui penawaran ini, mohon tandatangani dokumen ini pada kolom yang telah disediakan dan kirimkan kembali beserta Purchase Order (PO) resmi.',
  city: 'JAKARTA',
  signer: 'HENDRA WIJAYA, M.T.',
  signerJob: 'Enterprise Account Director'
};

export default function QuotationPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor B2B...</div>}>
      <QuotationToolBuilder />
    </Suspense>
  );
}

function QuotationToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<QuoteData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const valid = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today, validUntil: valid }));
  }, []);

  const subtotal = data.items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price)), 0);
  const discountAmount = data.discount;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * data.taxRate) / 100;
  const total = taxableAmount + taxAmount;

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
        items: [...prev.items, { id: Date.now(), name: '', description: '', qty: 1, price: 0 }] 
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
    if(typeof window !== 'undefined' && window.confirm('Reset B2B formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        const valid = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, validUntil: valid });
        setLogo(null);
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
          <div className="h-full flex flex-col font-sans">
              {/* HEADER */}
              <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-4 mb-8 shrink-0">
                  <div className="w-20 h-20 flex items-center justify-center shrink-0">
                      {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <div className="font-bold text-slate-300 uppercase text-[10px] border-2 border-dashed p-2">LOGO</div>}
                  </div>
                  <div className="flex-1">
                      <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight">{data.senderName}</h1>
                      <div className="text-[9pt] text-slate-600 whitespace-pre-line leading-relaxed mt-1">{data.senderInfo}</div>
                  </div>
                  <div className="text-right">
                      <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter print:text-black">PROPOSAL</h2>
                      <div className="text-[10pt] font-bold text-slate-500 mt-1">REF: {data.no}</div>
                      <div className="text-[9pt] text-slate-500">Date: {formatDateSafe(data.date)}</div>
                  </div>
              </div>

              {/* RECIPIENT & SUBJECT */}
              <div className="grid grid-cols-2 gap-8 mb-8 shrink-0">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg print:bg-transparent print:border-slate-400 break-inside-avoid">
                      <h3 className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest mb-3">Prepared For:</h3>
                      <div className="font-black text-lg text-slate-900 leading-tight">{data.receiverName}</div>
                      <div className="text-[10pt] font-bold text-slate-700">{data.receiverTitle}</div>
                      <div className="text-[10pt] font-bold text-slate-800 mt-2">{data.receiverCompany}</div>
                      <div className="text-[9pt] text-slate-600 mt-1 leading-relaxed">{data.receiverAddress}</div>
                  </div>
                  <div className="flex flex-col justify-center break-inside-avoid">
                      <h3 className="text-[9pt] font-bold text-slate-400 uppercase tracking-widest mb-2">Project Name:</h3>
                      <div className="font-black text-xl text-slate-900 leading-snug border-l-4 border-blue-600 pl-4">{data.subject}</div>
                  </div>
              </div>

              {/* EXECUTIVE SUMMARY */}
              <div className="mb-8 text-[10.5pt] text-justify whitespace-pre-line leading-relaxed text-slate-800 shrink-0 break-inside-avoid">
                  {data.executiveSummary}
              </div>

              {/* FINANCIAL PROPOSAL / COST BREAKDOWN */}
              <div className="mb-8">
                  <h3 className="text-[11pt] font-black uppercase text-slate-900 border-b-2 border-slate-900 pb-2 mb-4 break-inside-avoid">Investment Breakdown</h3>
                  <table className="w-full border-collapse border border-slate-300 text-[9.5pt]">
                      <thead>
                          <tr className="bg-slate-100 print:bg-transparent">
                              <th className="border border-slate-300 py-2 px-3 text-center w-10 uppercase font-black text-[8pt] tracking-wider">No</th>
                              <th className="border border-slate-300 py-2 px-3 text-left uppercase font-black text-[8pt] tracking-wider">Description of Goods / Services</th>
                              <th className="border border-slate-300 py-2 px-3 text-center w-16 uppercase font-black text-[8pt] tracking-wider">Qty</th>
                              <th className="border border-slate-300 py-2 px-3 text-right w-32 uppercase font-black text-[8pt] tracking-wider">Unit Price (IDR)</th>
                              <th className="border border-slate-300 py-2 px-3 text-right w-36 uppercase font-black text-[8pt] tracking-wider">Total (IDR)</th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.items.map((item, idx) => (
                              <tr key={idx} className="break-inside-avoid align-top">
                                  <td className="border border-slate-300 py-2 px-3 text-center font-medium">{idx + 1}</td>
                                  <td className="border border-slate-300 py-2 px-3">
                                      <div className="font-bold text-slate-900 text-[10pt] mb-1">{item.name}</div>
                                      <div className="text-slate-600 text-[8.5pt] leading-snug">{item.description}</div>
                                  </td>
                                  <td className="border border-slate-300 py-2 px-3 text-center">{item.qty}</td>
                                  <td className="border border-slate-300 py-2 px-3 text-right">{item.price.toLocaleString('id-ID')}</td>
                                  <td className="border border-slate-300 py-2 px-3 text-right font-bold">{(item.qty * item.price).toLocaleString('id-ID')}</td>
                              </tr>
                          ))}
                      </tbody>
                      <tfoot>
                          <tr className="bg-slate-50 print:bg-transparent break-inside-avoid">
                              <td colSpan={4} className="border border-slate-300 py-1.5 px-3 text-right font-bold text-[9pt]">Subtotal</td>
                              <td className="border border-slate-300 py-1.5 px-3 text-right font-bold">{subtotal.toLocaleString('id-ID')}</td>
                          </tr>
                          {data.discount > 0 && (
                              <tr className="break-inside-avoid text-red-600 print:text-black">
                                  <td colSpan={4} className="border border-slate-300 py-1.5 px-3 text-right text-[9pt]">Discount</td>
                                  <td className="border border-slate-300 py-1.5 px-3 text-right">- {discountAmount.toLocaleString('id-ID')}</td>
                              </tr>
                          )}
                          {data.taxRate > 0 && (
                              <tr className="break-inside-avoid">
                                  <td colSpan={4} className="border border-slate-300 py-1.5 px-3 text-right text-[9pt]">VAT ({data.taxRate}%)</td>
                                  <td className="border border-slate-300 py-1.5 px-3 text-right">{taxAmount.toLocaleString('id-ID')}</td>
                              </tr>
                          )}
                          <tr className="bg-slate-900 text-white print:text-black print:bg-transparent break-inside-avoid">
                              <td colSpan={4} className="border border-slate-900 print:border-black py-3 px-3 text-right font-black uppercase text-[10pt]">Total Investment (IDR)</td>
                              <td className="border border-slate-900 print:border-black py-3 px-3 text-right font-black text-[12pt]">{total.toLocaleString('id-ID')}</td>
                          </tr>
                      </tfoot>
                  </table>
              </div>

              {/* COMMERCIAL TERMS */}
              <div className="mb-8 shrink-0 break-inside-avoid">
                  <h3 className="text-[11pt] font-black uppercase text-slate-900 border-b-2 border-slate-900 pb-2 mb-3">Commercial Terms & Conditions</h3>
                  <div className="whitespace-pre-line leading-relaxed text-slate-700 text-[9.5pt] pl-4 border-l-4 border-slate-200">
                      {data.terms}
                  </div>
                  <div className="mt-3 text-[9pt] font-bold text-red-600 print:text-black bg-red-50 print:bg-transparent p-2 rounded-md inline-block">
                      * This proposal is valid until: {formatDateSafe(data.validUntil)}
                  </div>
              </div>

              {/* ACCEPTANCE PROCEDURE */}
              <div className="mb-12 shrink-0 break-inside-avoid">
                  <h3 className="text-[11pt] font-black uppercase text-slate-900 border-b-2 border-slate-900 pb-2 mb-3">Next Steps / Acceptance</h3>
                  <div className="text-slate-800 text-[9.5pt] mb-4">
                      {data.acceptanceProcedure}
                  </div>
              </div>

              {/* SIGNATURES */}
              <div className="mt-auto grid grid-cols-2 gap-8 shrink-0 break-inside-avoid text-[10pt]">
                  <div className="text-center">
                      <p className="mb-24">{data.city}, {formatDateSafe(data.date)}<br/>Submitted by,</p>
                      <p className="font-black uppercase border-b border-slate-400 inline-block px-4 pb-1 mb-1">{data.signer}</p>
                      <p className="font-bold text-slate-600 uppercase text-[8pt]">{data.signerJob}</p>
                      <p className="text-[8pt] text-slate-500 mt-1">{data.senderName}</p>
                  </div>
                  <div className="text-center">
                      <p className="mb-24">Accepted and Approved by,</p>
                      <p className="font-black uppercase border-b border-slate-400 inline-block px-4 pb-1 mb-1">{data.receiverName}</p>
                      <p className="font-bold text-slate-600 uppercase text-[8pt]">{data.receiverTitle}</p>
                      <p className="text-[8pt] text-slate-500 mt-1">{data.receiverCompany}</p>
                  </div>
              </div>
          </div>
      </Kertas>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
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
               <ShieldCheck size={16} className="text-blue-500" /> <span className="uppercase tracking-widest">B2B Enterprise Proposal</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print / Export PDF</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* EDITOR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> B2B Data Entry</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500" title="Reset"><RotateCcw size={16}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:hidden print:overflow-visible print:bg-white">
              
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Vendor / Pengirim</h3>
                 <div className="flex items-center gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <Upload size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <div className="flex-1 space-y-2">
                        <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} placeholder="Nama Perusahaan Vendor" />
                    </div>
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" rows={2} value={data.senderInfo} onChange={e => handleDataChange('senderInfo', e.target.value)} placeholder="Alamat & Kontak Vendor" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Klien / Penerima</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} placeholder="Nama PIC Klien" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.receiverTitle} onChange={e => handleDataChange('receiverTitle', e.target.value)} placeholder="Jabatan PIC" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.receiverCompany} onChange={e => handleDataChange('receiverCompany', e.target.value)} placeholder="Nama Perusahaan Klien" />
                 <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" rows={2} value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} placeholder="Alamat Perusahaan Klien" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Overview & Referensi</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-[9px] text-slate-500 font-bold uppercase">No. Dokumen</label>
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.no} onChange={e => handleDataChange('no', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[9px] text-slate-500 font-bold uppercase">Tgl Dokumen</label>
                        <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                 </div>
                 <div>
                    <label className="text-[9px] text-slate-500 font-bold uppercase">Project Subject</label>
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none" value={data.subject} onChange={e => handleDataChange('subject', e.target.value)} placeholder="Judul Proposal / Penawaran" />
                 </div>
                 <div>
                    <label className="text-[9px] text-slate-500 font-bold uppercase">Executive Summary</label>
                    <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed" rows={4} value={data.executiveSummary} onChange={e => handleDataChange('executiveSummary', e.target.value)} placeholder="Latar belakang dan ringkasan eksekutif..." />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-2"><Plus size={12}/> Detail RAB (Rencana Anggaran)</h3>
                    <button onClick={addItem} className="text-[9px] bg-amber-600 text-white px-2 py-0.5 rounded font-bold uppercase">+ Tambah</button>
                 </div>
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded border relative group animate-in slide-in-from-right-2">
                       <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"><Trash2 size={12}/></button>
                       <input className="w-full p-1.5 bg-white border rounded mb-2 text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Nama Barang / Jasa" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                       <textarea className="w-full p-1.5 bg-white border rounded mb-2 text-xs focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Spesifikasi / Deskripsi Detail" rows={2} value={item.description} onChange={e => handleItemChange(idx, 'description', e.target.value)} />
                       <div className="grid grid-cols-2 gap-2">
                          <div>
                              <label className="text-[9px] text-slate-500 font-bold uppercase">Qty</label>
                              <input type="number" className="w-full p-1.5 bg-white border rounded text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                          </div>
                          <div>
                              <label className="text-[9px] text-slate-500 font-bold uppercase">Harga Satuan</label>
                              <input type="number" className="w-full p-1.5 bg-white border rounded text-xs text-right focus:ring-2 focus:ring-amber-500 outline-none" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                          </div>
                       </div>
                    </div>
                 ))}
                 
                 <div className="pt-2 border-t space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">Diskon Nominal (Rp)</label>
                        <input type="number" className="w-32 p-1.5 border rounded text-xs font-bold text-red-600 text-right focus:ring-2 focus:ring-amber-500 outline-none" value={data.discount} onChange={e => handleDataChange('discount', Number(e.target.value))} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">PPN (%)</label>
                        <input type="number" className="w-32 p-1.5 border rounded text-xs font-bold text-blue-600 text-right focus:ring-2 focus:ring-amber-500 outline-none" value={data.taxRate} onChange={e => handleDataChange('taxRate', Number(e.target.value))} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-purple-600 border-b pb-1 tracking-widest flex items-center gap-2"><CheckSquare size={12}/> Syarat & Ketentuan</h3>
                 <div>
                    <label className="text-[9px] text-slate-500 font-bold uppercase flex items-center gap-1"><Calendar size={10}/> Berlaku Hingga</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none" value={data.validUntil} onChange={e => handleDataChange('validUntil', e.target.value)} />
                 </div>
                 <div>
                    <label className="text-[9px] text-slate-500 font-bold uppercase">Termin & Kondisi (T&C)</label>
                    <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none leading-relaxed" rows={5} value={data.terms} onChange={e => handleDataChange('terms', e.target.value)} placeholder="Termin pembayaran, garansi, waktu pengerjaan..." />
                 </div>
                 <div>
                    <label className="text-[9px] text-slate-500 font-bold uppercase">Prosedur Acceptance (Penerimaan)</label>
                    <textarea className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-purple-500 outline-none leading-relaxed" rows={3} value={data.acceptanceProcedure} onChange={e => handleDataChange('acceptanceProcedure', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 tracking-widest flex items-center gap-2"><Edit3 size={12}/> Otorisasi Tanda Tangan</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-[9px] text-slate-500 font-bold uppercase">Kota TTD</label>
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Jakarta" />
                    </div>
                    <div>
                        <label className="text-[9px] text-slate-500 font-bold uppercase">Nama Penandatangan</label>
                        <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none font-bold" value={data.signer} onChange={e => handleDataChange('signer', e.target.value)} placeholder="Nama Lengkap" />
                    </div>
                 </div>
                 <div>
                    <label className="text-[9px] text-slate-500 font-bold uppercase">Jabatan</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Direktur Utama" />
                 </div>
              </div>

           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
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
         <PrintWrapper documentName="Proposal-B2B" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
