'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Eye, LayoutTemplate, Banknote, Building2, ChevronDown, Scale
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PaymentData {
  city: string;
  date: string;
  docNo: string;
  companyName: string;
  companyAddress: string;
  recipientName: string;
  recipientBank: string;
  recipientAccount: string;
  amount: number;
  amountText: string;
  purpose: string;
  approverName: string;
  approverJob: string;
  treasurerName: string;
  treasurerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PaymentData = {
  city: 'JAKARTA',
  date: '',
  docNo: 'SPB/FIN/001/I/2026',
  companyName: 'PT. DINAMIKA CIPTA MANDIRI',
  companyAddress: 'Gedung Office 8, Lantai 12, Senopati, Jakarta Selatan',
  recipientName: 'RIZKY RAMADHAN',
  recipientBank: 'Bank Central Asia (BCA)',
  recipientAccount: '123-456-7890',
  amount: 15500000,
  amountText: 'Lima Belas Juta Lima Ratus Ribu Rupiah',
  purpose: 'Pembayaran tagihan invoice vendor IT support periode bulan Desember 2025.',
  approverName: 'HENDRA KUSUMA',
  approverJob: 'Direktur Operasional',
  treasurerName: 'SITI AMINAH',
  treasurerJob: 'Bendahara Keuangan'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-sans leading-normal text-[10pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PerintahBayarPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Perintah Bayar...</div>}>
      <PaymentOrderBuilder />
    </Suspense>
  );
}

function PaymentOrderBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PaymentData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PaymentData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER / KOP */}
      <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8 shrink-0 break-inside-avoid">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center print:border-2 print:border-black print:text-black print:bg-white rounded-sm shrink-0">
            <Building2 size={32} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">{data.companyName}</h1>
            <p className="text-[9pt] text-slate-600 print:text-black max-w-[250px] leading-snug mt-1">{data.companyAddress}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-black uppercase tracking-widest text-slate-900">Payment Voucher</h2>
          <p className="text-[9pt] tracking-[0.2em] text-slate-500 print:text-black mt-1 font-bold">SURAT PERINTAH BAYAR</p>
          
          <table className="mt-4 ml-auto text-left text-[9pt] border-collapse">
            <tbody>
              <tr>
                <td className="py-1 pr-4 font-bold text-slate-500 print:text-black uppercase text-[8pt]">Doc No.</td>
                <td className="py-1 font-mono font-bold">{data.docNo}</td>
              </tr>
              <tr>
                <td className="py-1 pr-4 font-bold text-slate-500 print:text-black uppercase text-[8pt]">Date</td>
                <td className="py-1">{data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric'}) : ''}</td>
              </tr>
              <tr>
                <td className="py-1 pr-4 font-bold text-slate-500 print:text-black uppercase text-[8pt]">Location</td>
                <td className="py-1">{data.city}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BODY / TABULAR DATA */}
      <div className="flex-grow space-y-6">
        <table className="w-full border-collapse border-2 border-black text-[10pt] break-inside-avoid">
          <tbody>
            {/* Pay To */}
            <tr className="border-b border-black">
              <td className="border-r border-black p-4 font-black w-1/4 bg-slate-100 print:bg-white uppercase tracking-wider text-[9pt]">Pay To<br/><span className="font-normal text-[8pt] text-slate-500 print:text-black">Kepada</span></td>
              <td className="p-4 font-black text-[12pt] uppercase">{data.recipientName}</td>
            </tr>
            
            {/* Bank Info */}
            <tr className="border-b border-black">
              <td className="border-r border-black p-4 font-black w-1/4 bg-slate-100 print:bg-white uppercase tracking-wider text-[9pt]">Bank Details<br/><span className="font-normal text-[8pt] text-slate-500 print:text-black">Info Rekening</span></td>
              <td className="p-4">
                <div className="grid grid-cols-[120px_10px_1fr] gap-y-2">
                  <span className="text-slate-500 print:text-black uppercase text-[8pt] font-bold self-center">Bank Name</span>
                  <span className="self-center">:</span>
                  <span className="font-bold">{data.recipientBank}</span>
                  
                  <span className="text-slate-500 print:text-black uppercase text-[8pt] font-bold self-center">Account No.</span>
                  <span className="self-center">:</span>
                  <span className="font-mono font-black text-[11pt] tracking-wider">{data.recipientAccount}</span>
                </div>
              </td>
            </tr>

            {/* Amount */}
            <tr className="border-b border-black">
              <td className="border-r border-black p-4 font-black w-1/4 bg-slate-100 print:bg-white uppercase tracking-wider text-[9pt]">Amount<br/><span className="font-normal text-[8pt] text-slate-500 print:text-black">Nominal</span></td>
              <td className="p-4">
                <div className="text-2xl font-black mb-3">{formatRupiah(data.amount)}</div>
                <div className="bg-slate-50 print:bg-white p-3 border border-dashed border-slate-300 print:border-black">
                  <span className="text-slate-500 print:text-black uppercase text-[8pt] font-bold mr-2">In Words:</span>
                  <span className="font-bold italic capitalize leading-relaxed text-[10.5pt]"># {data.amountText} #</span>
                </div>
              </td>
            </tr>

            {/* Purpose */}
            <tr>
              <td className="border-r border-black p-4 font-black w-1/4 bg-slate-100 print:bg-white uppercase tracking-wider text-[9pt] align-top">Description<br/><span className="font-normal text-[8pt] text-slate-500 print:text-black">Keperluan</span></td>
              <td className="p-4 min-h-[100px] align-top leading-relaxed text-[10.5pt]">
                {data.purpose}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FOOTER / TTD / APPROVAL MATRIX */}
      <div className="mt-12 break-inside-avoid">
         <table className="w-full border-collapse border-2 border-black text-center table-fixed">
            <thead>
               <tr className="bg-slate-100 print:bg-white border-b border-black uppercase text-[8pt] font-black tracking-widest text-slate-600 print:text-black">
                  <td className="border-r border-black p-3">Prepared By</td>
                  <td className="border-r border-black p-3">Reviewed By</td>
                  <td className="p-3">Approved By</td>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td className="border-r border-black h-32 align-bottom p-4">
                     <div className="font-black underline uppercase tracking-tight text-[10pt] truncate">{data.treasurerName}</div>
                     <div className="text-[8pt] font-bold text-slate-500 print:text-black uppercase mt-1 truncate">{data.treasurerJob}</div>
                  </td>
                  <td className="border-r border-black h-32 align-bottom p-4">
                     <div className="font-black underline uppercase tracking-tight text-[10pt]">___________________</div>
                     <div className="text-[8pt] font-bold text-slate-500 print:text-black uppercase mt-1">Finance Manager</div>
                  </td>
                  <td className="h-32 align-bottom p-4">
                     <div className="font-black underline uppercase tracking-tight text-[10pt] truncate">{data.approverName}</div>
                     <div className="text-[8pt] font-bold text-slate-500 print:text-black uppercase mt-1 truncate">{data.approverJob}</div>
                  </td>
               </tr>
            </tbody>
         </table>
         <div className="mt-4 flex justify-between text-[7pt] text-slate-400 print:text-black uppercase font-mono font-bold tracking-widest">
           <span>Form ID: FIN-SPB-001/REV.2</span>
           <span>Generated on: {isClient ? new Date().toLocaleString('en-GB') : ''}</span>
         </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-indigo-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Perintah Bayar</h1>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Enterprise Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-indigo-600 hover:bg-indigo-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:hidden">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[450px] lg:w-[500px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <Banknote size={18} className="text-indigo-600" /> Editor SPB
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-indigo-500 transition-colors p-2 hover:bg-indigo-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                
                {/* SECTION 1 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 bg-slate-100 p-2 rounded border-l-4 border-slate-600 text-sm flex items-center gap-2">
                    <Building2 size={14}/> Corporate Entity
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Company Name</label>
                      <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none uppercase" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Address</label>
                      <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 h-16 resize-none focus:ring-2 focus:ring-indigo-500 outline-none" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Document No.</label>
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none uppercase" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Location</label>
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 bg-indigo-50 p-2 rounded border-l-4 border-indigo-600 text-sm flex items-center gap-2">
                    <Banknote size={14}/> Beneficiary Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Payee Name</label>
                      <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none uppercase" value={data.recipientName} onChange={e => handleDataChange('recipientName', e.target.value)} />
                    </div>
                    
                    <div className="grid grid-cols-[1fr_2fr] gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bank</label>
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" value={data.recipientBank} onChange={e => handleDataChange('recipientBank', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Account No.</label>
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" value={data.recipientAccount} onChange={e => handleDataChange('recipientAccount', e.target.value)} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Amount (IDR)</label>
                      <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-black text-emerald-600 focus:ring-2 focus:ring-indigo-500 outline-none" type="number" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Amount in Words</label>
                      <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-[10px] text-slate-600 italic focus:ring-2 focus:ring-indigo-500 outline-none" value={data.amountText} onChange={e => handleDataChange('amountText', e.target.value)} placeholder="Terbilang..." />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Description / Purpose</label>
                      <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 h-24 focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed resize-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* SECTION 3 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 bg-amber-50 p-2 rounded border-l-4 border-amber-600 text-sm flex items-center gap-2">
                    <ChevronDown size={14}/> Approval Matrix
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Prepared By</label>
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none uppercase" value={data.treasurerName} onChange={e => handleDataChange('treasurerName', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Job Title</label>
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" value={data.treasurerJob} onChange={e => handleDataChange('treasurerJob', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Approved By</label>
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none uppercase" value={data.approverName} onChange={e => handleDataChange('approverName', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Job Title</label>
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" value={data.approverJob} onChange={e => handleDataChange('approverJob', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pb-10"></div>
            </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Payment Voucher" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
