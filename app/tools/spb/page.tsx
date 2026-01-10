'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Banknote, Building2, UserCircle2, 
  CalendarDays, Wallet, Receipt, CreditCard, Edit3, Eye,
  LayoutTemplate, ChevronDown, Check, ImagePlus, X
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function PerintahBayarPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor SPB...</div>}>
      <PaymentOrderBuilder />
    </Suspense>
  );
}

function PaymentOrderBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  
  // STATE LOGO
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
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
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const TEMPLATES = [
    { id: 1, name: "Format Corporate", desc: "Layout resmi dengan KOP" },
    { id: 2, name: "Format Internal", desc: "Layout ringkas untuk memo" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* HEADER KOP DENGAN LOGO DINAMIS */}
      <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex-shrink-0">
          {logo ? (
            <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
          ) : (
            <div className="p-3 bg-slate-900 text-white rounded shrink-0 print:border print:border-black print:text-black print:bg-transparent">
              <Building2 size={32} />
            </div>
          )}
        </div>
        <div className="text-left flex-grow">
           <h1 className="text-xl font-black uppercase tracking-tighter leading-none">{data.companyName}</h1>
           <p className="text-[9pt] font-sans mt-1 text-slate-500 print:text-black italic">{data.companyAddress}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PERINTAH BAYAR (SPB)</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="space-y-6 flex-grow overflow-hidden text-left">
        <p>Kepada Yth. <b>{data.treasurerName} ({data.treasurerJob})</b>,</p>
        <p>Harap melakukan pembayaran dana tunai/transfer dengan rincian sebagai berikut:</p>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 print:bg-transparent print:border-black">
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Dibayarkan Kepada</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.recipientName}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr]"><span>Sejumlah Dana</span><span>:</span><span className="font-bold text-lg text-emerald-700 print:text-black">{formatRupiah(data.amount)}</span></div>
           <div className="grid grid-cols-[160px_10px_1fr] italic text-[10pt] text-slate-500 print:text-black border-t border-slate-100 pt-2"><span>Terbilang</span><span>:</span><span className="font-medium uppercase"># {data.amountText} #</span></div>
           
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

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-8 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
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
          @page { size: A4; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print, header, .mobile-nav { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs font-sans">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Banknote size={16} /> <span>Payment Order Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative font-sans">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

           {/* EDIT LOGO SECTION */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
              <div className="flex items-center gap-4">
                 {logo ? (
                    <div className="relative w-16 h-16 border rounded overflow-hidden group shrink-0">
                       <img src={logo} className="w-full h-full object-contain" />
                       <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                    </div>
                 ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 transition-all shrink-0"><ImagePlus size={20} /></button>
                 )}
                 <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50 leading-tight" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left text-xs">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Penerima</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.recipientName} onChange={e => handleDataChange('recipientName', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs font-bold text-emerald-600" type="number" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.recipientBank} onChange={e => handleDataChange('recipientBank', e.target.value)} placeholder="Bank" />
              </div>
              <input className="w-full p-2 border rounded text-xs font-mono" value={data.recipientAccount} onChange={e => handleDataChange('recipientAccount', e.target.value)} placeholder="No. Rekening" />
              <textarea className="w-full p-2 border rounded text-[10px] h-14 italic leading-tight" value={data.amountText} onChange={e => handleDataChange('amountText', e.target.value)} placeholder="Terbilang..." />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Receipt size={12}/> Otorisasi</h3>
              <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Pembayaran" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.approverName} onChange={e => handleDataChange('approverName', e.target.value)} placeholder="Nama Penyetuju" />
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.treasurerName} onChange={e => handleDataChange('treasurerName', e.target.value)} placeholder="Nama Bendahara" />
              </div>
              <div className="grid grid-cols-2 gap-2 border-t pt-4">
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                 <input type="date" className="w-full p-2 border rounded text-xs font-bold" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 mobile-nav">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}