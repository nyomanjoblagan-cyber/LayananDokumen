'use client';

/**
 * FILE: PerintahBayarPage.tsx
 * STATUS: FIXED PREVIEW & FULL CODE
 * DESC: Generator Surat Perintah Bayar (Payment Order)
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Banknote, Building2, UserCircle2, 
  CalendarDays, Wallet, Receipt, CreditCard, Edit3, Eye,
  LayoutTemplate, ChevronDown, Check, ImagePlus, X, RotateCcw
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 text-xs uppercase tracking-widest">Memuat Editor SPB...</div>}>
      <PaymentOrderBuilder />
    </Suspense>
  );
}

function PaymentOrderBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<PaymentData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PaymentData, val: any) => setData(prev => ({ ...prev, [field]: val }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(confirm('Reset semua data pembayaran?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const activeTemplateName = templateId === 1 ? 'Format Corporate' : 'Format Internal';

  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* HEADER KOP */}
      <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 text-left">
        <div className="flex-shrink-0">
          {logo ? (
            <img src={logo} alt="Logo" className="w-18 h-18 object-contain block print:block" />
          ) : (
            <div className="p-3 bg-slate-900 text-white rounded shrink-0 print:border print:border-black print:text-black print:bg-transparent print:hidden">
              <Building2 size={32} />
            </div>
          )}
        </div>
        <div className="flex-grow">
           <h1 className="text-xl font-black uppercase tracking-tighter leading-none print:text-black">{data.companyName}</h1>
           <p className="text-[9pt] font-sans mt-1 text-slate-500 print:text-black italic leading-tight">{data.companyAddress}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PERINTAH BAYAR (SPB)</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.docNo}</p>
      </div>

      {/* BODY - Menggunakan overflow-visible agar preview HP tidak menelan teks bawah */}
      <div className="space-y-6 text-left overflow-visible">
        <p>Kepada Yth. <b>{data.treasurerName} ({data.treasurerJob})</b>,</p>
        <p>Harap melakukan pembayaran dana tunai/transfer dengan rincian sebagai berikut:</p>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 print:bg-transparent print:border-black">
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Dibayarkan Kepada</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.recipientName}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Sejumlah Dana</span><span>:</span><span className="font-bold text-lg text-emerald-700 print:text-black">{formatRupiah(data.amount)}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr] italic text-[10pt] text-slate-500 print:text-black border-t border-slate-100 pt-2 print:border-black"><span>Terbilang</span><span>:</span><span className="font-medium uppercase"># {data.amountText} #</span></div>
           
           <div className="pt-2 space-y-1.5 border-t border-dashed border-slate-300 print:border-black">
              <h4 className="text-[8pt] font-black text-slate-400 uppercase tracking-widest print:text-black">Informasi Rekening Tujuan:</h4>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Bank Tujuan</span><span>:</span><span>{data.recipientBank}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor Rekening</span><span>:</span><span className="font-mono font-bold tracking-widest">{data.recipientAccount}</span></div>
           </div>
        </div>

        <div className="space-y-2">
           <h4 className="font-bold text-[9pt] uppercase tracking-wide">Untuk Keperluan:</h4>
           <p className="text-[10pt] bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400 italic leading-relaxed text-justify print:bg-transparent print:border print:border-black">
              "{data.purpose}"
           </p>
        </div>

        <p className="text-sm italic">Demikian perintah ini diberikan untuk segera dilaksanakan dan dipertanggungjawabkan sebagaimana mestinya.</p>
      </div>

      {/* AREA TANDA TANGAN */}
      <div className="mt-auto pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="grid grid-cols-2 gap-10 text-center">
            <div className="flex flex-col h-40">
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Pihak Penyetuju,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.approverName}</p>
                  <p className="text-[9pt] font-sans mt-1">{data.approverJob}</p>
               </div>
            </div>

            <div className="flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Penerima Perintah,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.treasurerName}</p>
                  <p className="text-[9pt] font-sans mt-1 italic">Bendahara Keuangan</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Banknote size={16} /> <span>Payment Order Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-2 text-slate-900">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 rounded-lg text-sm font-medium hover:bg-blue-50 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>Format Corporate</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 rounded-lg text-sm font-medium hover:bg-blue-50 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>Format Internal</button>
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print SPB</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 text-left">
                <h2 className="font-bold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-tight"><Edit3 size={16} /> Data Pembayaran</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar text-left font-sans">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
                 <div className="flex items-center gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus</button>}
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                 <textarea className="w-full p-2 border rounded text-xs h-14 resize-none leading-tight" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor SPB" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Wallet size={12}/> Rincian Dana</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.recipientName} onChange={e => handleDataChange('recipientName', e.target.value)} placeholder="Nama Penerima" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold text-emerald-600" type="number" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} placeholder="Jumlah Rp" />
                    <input className="w-full p-2 border rounded text-xs" value={data.recipientBank} onChange={e => handleDataChange('recipientBank', e.target.value)} placeholder="Nama Bank" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-mono" value={data.recipientAccount} onChange={e => handleDataChange('recipientAccount', e.target.value)} placeholder="Nomor Rekening" />
                 <textarea className="w-full p-2 border rounded text-[10px] h-14 resize-none leading-tight italic" value={data.amountText} onChange={e => handleDataChange('amountText', e.target.value)} placeholder="Terbilang..." />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Receipt size={12}/> Otorisasi & Perihal</h3>
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Pembayaran" />
                 <div className="grid grid-cols-2 gap-2 border-t pt-4">
                    <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.approverName} onChange={e => handleDataChange('approverName', e.target.value)} placeholder="Nama Penyetuju" />
                    <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.treasurerName} onChange={e => handleDataChange('treasurerName', e.target.value)} placeholder="Nama Bendahara" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <DocumentContent />
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden"><DocumentContent /></div>
    </div>
  );
}
