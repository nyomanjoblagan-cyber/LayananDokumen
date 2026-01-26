'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Banknote, Building2, LayoutTemplate, ChevronDown, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

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

const INITIAL_DATA: PaymentData = {
  city: 'JAKARTA',
  date: '',
  docNo: 'SPB/001/I/2026',
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

export default function PerintahBayarPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 text-xs">Loading...</div>}>
      <PaymentOrderBuilder />
    </Suspense>
  );
}

function PaymentOrderBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PaymentData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof PaymentData, val: any) => setData(prev => ({ ...prev, [field]: val }));
  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const handleReset = () => {
    if(confirm('Reset formulir?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto font-sans text-[10.5pt]">
      
      <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="p-3 bg-slate-900 text-white rounded shrink-0 print:border print:border-black print:text-black print:bg-transparent"><Building2 size={32} /></div>
        <div className="text-left flex-grow">
           <h1 className="text-xl font-black uppercase tracking-tighter leading-none print:text-black">{data.companyName}</h1>
           <p className="text-[9pt] mt-1 text-slate-500 print:text-black italic leading-tight">{data.companyAddress}</p>
        </div>
      </div>

      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PERINTAH BAYAR (SPB)</h2>
        <p className="text-[9pt] mt-1 italic font-bold">Nomor: {data.docNo}</p>
      </div>

      <div className="space-y-6 text-left overflow-visible">
        <p>Kepada Yth. <b>{data.treasurerName} ({data.treasurerJob})</b>,</p>
        <p>Harap melakukan pembayaran dana tunai/transfer dengan rincian sebagai berikut:</p>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 print:bg-transparent print:border-black">
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Dibayarkan Kepada</span><span>:</span><span className="font-bold uppercase">{data.recipientName}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Sejumlah Dana</span><span>:</span><span className="font-bold text-lg text-emerald-700 print:text-black">{formatRupiah(data.amount)}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr] italic text-[10pt] text-slate-500 print:text-black border-t pt-2"><span>Terbilang</span><span>:</span><span className="font-medium uppercase"># {data.amountText} #</span></div>
           <div className="pt-2 border-t border-dashed border-slate-300 print:border-black text-[9pt]">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Bank Tujuan</span><span>:</span><span>{data.recipientBank}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor Rekening</span><span>:</span><span className="font-mono font-bold">{data.recipientAccount}</span></div>
           </div>
        </div>

        <div className="space-y-2">
           <h4 className="font-bold text-[9pt] uppercase">Untuk Keperluan:</h4>
           <p className="text-[10pt] bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400 italic print:bg-transparent print:border print:border-black">"{data.purpose}"</p>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-slate-100 print:border-black">
         <div className="grid grid-cols-2 gap-10 text-center">
            <div className="flex flex-col h-40">
               <p className="uppercase text-[8.5pt] font-black text-slate-400 print:text-black mb-1">Pihak Penyetuju,</p>
               <div className="mt-auto"><p className="font-bold underline uppercase text-[11pt]">{data.approverName}</p><p className="text-[9pt]">{data.approverJob}</p></div>
            </div>
            <div className="flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 print:text-black mb-1">Bendahara,</p>
               <div className="mt-auto"><p className="font-bold underline uppercase text-[11pt]">{data.treasurerName}</p><p className="text-[9pt] italic">Penerima Perintah</p></div>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white">
      <style jsx global>{`@media print {@page {size: A4 portrait; margin: 0;} body {background: white;} .no-print {display: none !important;} #print-only-root {display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999;}}`}</style>
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 font-bold uppercase text-xs"><ArrowLeft size={18} /> Dashboard</Link>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase italic"><Banknote size={16} /> Payment Order</div>
        </div>
        <button onClick={() => window.print()} className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg flex items-center gap-2"><Printer size={16}/> Print</button>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        <div className={`no-print w-full lg:w-[400px] bg-white border-r overflow-y-auto p-4 space-y-4 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="font-bold text-slate-700 text-sm">EDITOR SPB</h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button>
            </div>
            <input className="w-full p-2 border rounded text-xs" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Company Name" />
            <input className="w-full p-2 border rounded text-xs" value={data.recipientName} onChange={e => handleDataChange('recipientName', e.target.value)} placeholder="Recipient" />
            <input className="w-full p-2 border rounded text-xs" type="number" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} placeholder="Amount" />
            <textarea className="w-full p-2 border rounded text-xs h-24" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Payment Purpose" />
        </div>

        <div className={`flex-1 bg-slate-200/50 relative overflow-hidden flex justify-center ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
            <div className="overflow-y-auto w-full flex justify-center p-4 md:p-12">
               <div className="origin-top transition-transform scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 shadow-2xl h-fit">
                 <DocumentContent />
               </div>
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1.5 z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}>Preview</button>
      </div>

      <div id="print-only-root" className="hidden"><DocumentContent /></div>
    </div>
  );
}
