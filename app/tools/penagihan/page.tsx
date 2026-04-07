'use client';

/**
 * FILE: CollectionPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Penagihan (Collection Letter) dengan Tone Selector
 * FIX: Menambahkan properti 'city' yang hilang pada interface CollectionData (TS 2339)
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, AlertTriangle, 
  Megaphone, ShieldAlert, Mail, ChevronDown, Check, Edit3, Eye, X,
  Building2, CreditCard, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

// --- 1. TYPE DEFINITIONS ---
interface CollectionData {
  no: string;
  date: string;
  city: string; // FIX: Menambahkan city ke interface
  
  // Pengirim
  senderName: string;
  senderInfo: string;
  
  // Penerima
  receiverName: string;
  receiverCompany: string;
  receiverAddress: string;
  
  // Tagihan
  invoiceRef: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  daysOverdue: number;
  
  // Isi
  subject: string;
  body: string;
  paymentInfo: string;
  signer: string;
  signerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: CollectionData = {
  no: `COLL/2026/${Math.floor(Math.random() * 1000)}`,
  date: '', 
  city: 'JAKARTA', // FIX: Inisialisasi city
  
  senderName: 'PT. KARYA MAJU SENTOSA',
  senderInfo: 'Jl. Industri Raya No. 88, Cikarang\nEmail: finance@kms.com | WA: 0812-9999-7777',
  
  receiverName: 'BAPAK HARTONO',
  receiverCompany: 'CV. SUMBER REJEKI',
  receiverAddress: 'Jl. Ahmad Yani No. 45, Surabaya',
  
  invoiceRef: 'INV-2025-099',
  invoiceDate: '2025-12-20',
  dueDate: '2026-01-20',
  amount: 15000000,
  daysOverdue: 5,
  
  subject: 'Pengingat Pembayaran Invoice No. INV-2025-099',
  body: 'Kami ingin mengingatkan dengan hormat bahwa Invoice No. INV-2025-099 telah jatuh tempo. Mungkin invoice ini terlewat dari perhatian Bapak/Ibu. Mohon konfirmasi jika pembayaran telah dilakukan.',
  paymentInfo: 'Pembayaran dapat ditransfer ke:\nBCA 123-456-7890 a.n PT Karya Maju Sentosa',
  signer: 'SITI AMINAH',
  signerJob: 'Finance Manager'
};

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Penagihan...</div>}>
      <CollectionToolBuilder />
    </Suspense>
  );
}

function CollectionToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [severity, setSeverity] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<CollectionData>(INITIAL_DATA);
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof CollectionData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
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
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
        setSeverity(1);
    }
  };

  const applyTone = (level: 1 | 2 | 3) => {
    setSeverity(level);
    let newSubject = '';
    let newBody = '';

    if (level === 1) {
      newSubject = `Pengingat Pembayaran Invoice No. ${data.invoiceRef}`;
      newBody = `Kami ingin mengingatkan dengan hormat bahwa Invoice No. ${data.invoiceRef} sebesar Rp ${data.amount.toLocaleString('id-ID')} telah jatuh tempo pada tanggal ${data.dueDate}.\n\nKami mengerti kesibukan Bapak/Ibu mungkin menyebabkan hal ini terlewat. Mohon segera melakukan pembayaran atau kirimkan bukti transfer jika sudah dibayarkan.`;
    } else if (level === 2) {
      newSubject = `PERINGATAN 1: Tunggakan Invoice No. ${data.invoiceRef}`;
      newBody = `Melalui surat ini kami sampaikan bahwa pembayaran untuk Invoice No. ${data.invoiceRef} telah melewati batas waktu (Overdue) selama ${data.daysOverdue} hari.\n\nKami mohon kerjasamanya untuk segera menyelesaikan pembayaran ini guna menghindari terganggunya layanan/suplai barang dari kami. Mohon abaikan surat ini jika pembayaran telah dilakukan.`;
    } else {
      newSubject = `FINAL NOTICE: Penyelesaian Kewajiban Pembayaran`;
      newBody = `SANGAT PENTING. Kami mencatat belum ada pembayaran untuk Invoice No. ${data.invoiceRef} yang sudah jatuh tempo sejak ${data.dueDate}.\n\nIni adalah peringatan terakhir sebelum kami menyerahkan masalah ini ke departemen hukum/kolektor eksternal. Kami harap itikad baik Bapak/Ibu untuk menyelesaikan kewajiban ini dalam waktu 3x24 jam sejak surat ini diterbitkan.`;
    }
    setData(prev => ({ ...prev, subject: newSubject, body: newBody }));
  };

  const activeTemplateName = templateId === 1 ? 'Surat Resmi' : 'Modern Notice';

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
                <div className="flex items-center gap-6 border-b-4 border-slate-800 pb-3 mb-8 shrink-0 font-sans">
                   <div className="w-16 h-16 flex items-center justify-center shrink-0">
                      {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <div className="w-full h-full bg-slate-100 border-2 border-dashed flex items-center justify-center text-[10px] text-slate-400">LOGO</div>}
                   </div>
                   <div className="flex-1 text-center">
                      <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight leading-none mb-1">{data.senderName}</h1>
                      <div className="text-[9pt] text-slate-500 whitespace-pre-line leading-tight">{data.senderInfo}</div>
                   </div>
                </div>

                <div className="flex justify-between text-sm mb-8 shrink-0 font-sans">
                   <div>
                      <div>No: {data.no}</div>
                      <div>Hal: <strong>{data.subject}</strong></div>
                   </div>
                   <div className="text-right">{data.city}, {formatDateSafe(data.date)}</div>
                </div>

                <div className="mb-8 text-sm shrink-0 font-sans">
                   <p>Kepada Yth,</p>
                   <p className="font-bold text-lg">{data.receiverName}</p>
                   <p className="font-bold text-slate-600">{data.receiverCompany}</p>
                   <p className="max-w-xs">{data.receiverAddress}</p>
                </div>

                <div className="flex-grow text-[11pt] text-justify whitespace-pre-line leading-relaxed mb-8">
                   Dengan hormat,{"\n\n"}
                   {data.body}
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 shrink-0 print:bg-transparent print:border-black break-inside-avoid">
                   <p className="font-bold border-b border-slate-300 pb-2 mb-3 text-xs uppercase tracking-widest text-slate-500 font-sans">Rincian Tunggakan:</p>
                   <div className="grid grid-cols-[140px_10px_1fr] text-sm gap-y-1 font-sans">
                      <span>Nomor Invoice</span><span>:</span><span className="font-mono font-bold">{data.invoiceRef}</span>
                      <span>Jatuh Tempo</span><span>:</span><span className="text-red-600 font-bold">{data.dueDate}</span>
                      <span>Total Tagihan</span><span>:</span><span className="font-black text-lg">Rp {data.amount.toLocaleString('id-ID')}</span>
                   </div>
                </div>

                <div className="text-sm whitespace-pre-line leading-relaxed bg-blue-50 p-5 border-l-4 border-blue-500 shrink-0 print:bg-transparent print:border-black break-inside-avoid font-sans">
                   <strong className="text-blue-800 uppercase text-[10px] tracking-widest block mb-1">Informasi Pembayaran:</strong>
                   {data.paymentInfo}
                </div>

                <div className="shrink-0 mt-12 flex justify-end text-center break-inside-avoid font-sans">
                   <div className="w-56">
                      <p className="mb-20 font-bold uppercase text-[10px] tracking-widest text-slate-400">Finance Department,</p>
                      <p className="font-bold underline uppercase text-sm font-serif">{data.signer}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">{data.signerJob}</p>
                   </div>
                </div>
            </div>
        )}

        {templateId === 2 && (
            <div className="flex flex-col h-full font-sans text-[10.5pt]">
               <div className={`h-4 w-full mb-8 shrink-0 ${severity === 1 ? 'bg-emerald-500' : severity === 2 ? 'bg-amber-500' : 'bg-red-600'} print:bg-black`}></div>
               <div className="flex justify-between items-start mb-12 shrink-0">
                  <div>
                      <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1 uppercase">
                         {severity === 1 ? 'Payment Reminder' : severity === 2 ? 'Overdue Notice' : 'Final Demand'}
                      </h1>
                      <div className="text-xs text-slate-400 font-mono">Reference: {data.no}</div>
                  </div>
                  <div className="text-right">
                     {logo && <img src={logo} className="h-10 w-auto ml-auto mb-2" alt="Logo" />}
                     <div className="font-black text-slate-900 uppercase text-sm">{data.senderName}</div>
                  </div>
               </div>

               <div className="flex gap-12 mb-12 shrink-0 break-inside-avoid">
                  <div className="w-1/2">
                      <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Bill To:</h3>
                      <div className="font-black text-xl text-slate-900 uppercase leading-none mb-1">{data.receiverName}</div>
                      <div className="font-bold text-slate-500 uppercase text-xs mb-2">{data.receiverCompany}</div>
                      <div className="text-xs text-slate-400 leading-snug">{data.receiverAddress}</div>
                  </div>
                  <div className="w-1/2 text-right">
                      <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Outstanding Amount:</h3>
                      <div className={`text-4xl font-black ${severity === 3 ? 'text-red-600' : 'text-slate-900'} leading-none mb-2`}>
                         Rp {data.amount.toLocaleString('id-ID')}
                      </div>
                      <div className="text-red-500 font-bold text-[10px] uppercase tracking-tighter">
                         Due Date: {data.dueDate} ({data.daysOverdue} Days Past Due)
                      </div>
                  </div>
               </div>

               <div className="flex-grow text-[11pt] leading-relaxed whitespace-pre-line text-slate-700 mb-10 text-justify italic border-l-4 border-slate-100 pl-8">
                  {data.body}
               </div>

               <div className="bg-slate-900 text-white p-8 rounded-3xl mb-12 shrink-0 print:bg-transparent print:text-black print:border-2 print:border-black break-inside-avoid">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-50">Settlement Instructions</h4>
                  <div className="whitespace-pre-line text-sm font-mono leading-loose">
                     {data.paymentInfo}
                  </div>
               </div>

               <div className="mt-auto flex justify-between items-end shrink-0 break-inside-avoid">
                  <div className="text-[8pt] text-slate-400 max-w-[300px] leading-tight">
                     Please disregard this notice if payment has been settled within the last 48 hours. For inquiries, contact our finance desk.
                  </div>
                  <div className="text-right">
                     <p className="text-[10pt] text-slate-400 font-bold uppercase tracking-widest mb-16">{data.city}, {formatDateSafe(data.date)}</p>
                     <p className="font-black text-slate-900 text-xl leading-none uppercase tracking-tight">{data.signer}</p>
                     <p className="text-[10px] text-blue-600 font-black mt-2 uppercase tracking-widest">{data.signerJob}</p>
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
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
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
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <AlertTriangle size={16} className="text-red-500" /> <span>Collection Letter Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Standard Letter {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Modern Notice {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-slate-900 rounded-xl p-4 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><Megaphone size={12}/> Tone Penagihan</h3>
                 <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => applyTone(1)} className={`py-2 rounded-lg text-[10px] font-bold border-2 transition-all ${severity === 1 ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>RAMAH</button>
                    <button onClick={() => applyTone(2)} className={`py-2 rounded-lg text-[10px] font-bold border-2 transition-all ${severity === 2 ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>TEGAS</button>
                    <button onClick={() => applyTone(3)} className={`py-2 rounded-lg text-[10px] font-bold border-2 transition-all ${severity === 3 ? 'bg-red-600 border-red-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>KERAS</button>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Perusahaan</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <Upload size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} placeholder="Nama PT" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" type="date" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><CreditCard size={12}/> Detail Hutang</h3>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-bold" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} placeholder="Nama Klien" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.invoiceRef} onChange={e => handleDataChange('invoiceRef', e.target.value)} placeholder="No Invoice" />
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">NOMINAL</label><input type="number" className="w-full p-2 border rounded-lg text-xs font-black text-red-600" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">JATUH TEMPO</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.dueDate} onChange={e => handleDataChange('dueDate', e.target.value)} /></div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Edit3 size={12}/> Narasi</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-32 focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.body} onChange={e => handleDataChange('body', e.target.value)} />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 focus:ring-2 focus:ring-amber-500 outline-none" value={data.paymentInfo} onChange={e => handleDataChange('paymentInfo', e.target.value)} placeholder="Metode Pembayaran..." />
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}