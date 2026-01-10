'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, AlertTriangle, 
  Megaphone, ShieldAlert, Mail, ChevronDown, Check, Edit3, Eye, X,
  Building2, CreditCard 
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Penagihan...</div>}>
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

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `COLL/2026/${Math.floor(Math.random() * 1000)}`,
    date: '',
    senderName: 'PT. KARYA MAJU SENTOSA',
    senderInfo: 'Jl. Industri Raya No. 88, Cikarang\nEmail: finance@kms.com | WA: 0812-9999-7777',
    receiverName: 'Bapak Hartono',
    receiverCompany: 'CV. SUMBER REJEKI',
    receiverAddress: 'Jl. Ahmad Yani No. 45, Surabaya',
    invoiceRef: 'INV-2025-099',
    invoiceDate: '2025-12-20',
    dueDate: '2026-01-20',
    amount: 15000000,
    daysOverdue: 5,
    subject: 'Pengingat Pembayaran Invoice No. INV-2025-099',
    body: 'Kami ingin mengingatkan bahwa Invoice No. INV-2025-099 tertanggal 2025-12-20 telah jatuh tempo pada tanggal 2026-01-20. Mungkin invoice ini terlewat dari perhatian Bapak/Ibu. Mohon konfirmasi jika pembayaran telah dilakukan.',
    paymentInfo: 'Pembayaran dapat ditransfer ke:\nBCA 123-456-7890 a.n PT Karya Maju Sentosa',
    signer: 'Siti Aminah',
    signerJob: 'Finance Manager'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Surat Resmi (Standard)", desc: "Format formal dengan kop surat" },
    { id: 2, name: "Modern Notice", desc: "Desain visual menonjolkan nominal" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:transform print:scale-[0.95] print:origin-top">
        {templateId === 1 && (
            <div className="h-full flex flex-col">
                <div className="flex items-center gap-6 border-b-4 border-slate-800 pb-3 mb-8 shrink-0">
                    <div className="w-16 h-16 flex items-center justify-center shrink-0">
                        {logo ? <img src={logo} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 font-bold rounded">LOGO</div>}
                    </div>
                    <div className="flex-1 text-center">
                        <h1 className="text-2xl font-black uppercase text-slate-900 tracking-wide mb-1">{data.senderName}</h1>
                        <div className="text-xs text-slate-600 whitespace-pre-line leading-tight">{data.senderInfo}</div>
                    </div>
                </div>

                <div className="flex justify-between text-sm mb-8 shrink-0">
                    <div>
                        <div>No: {data.no}</div>
                        <div>Hal: <strong>{data.subject}</strong></div>
                    </div>
                    <div className="text-right">
                        {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}
                    </div>
                </div>

                <div className="mb-8 text-sm shrink-0">
                    <p>Kepada Yth,</p>
                    <p className="font-bold">{data.receiverName}</p>
                    <p>{data.receiverCompany}</p>
                    <p className="max-w-xs">{data.receiverAddress}</p>
                </div>

                <div className="flex-grow text-sm text-justify whitespace-pre-line leading-relaxed overflow-hidden">
                    Dengan hormat,
                    {"\n\n"}
                    {data.body}
                </div>

                <div className="mt-8 border border-slate-300 rounded p-4 bg-slate-50 print:bg-transparent text-sm shrink-0">
                    <p className="font-bold border-b border-slate-300 pb-2 mb-2">Rincian Kewajiban:</p>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        <span className="text-slate-500">Nomor Invoice</span><span className="font-mono font-bold">{data.invoiceRef}</span>
                        <span className="text-slate-500">Jatuh Tempo</span><span className="text-red-600 font-bold">{data.dueDate}</span>
                        <span className="text-slate-500">Total Tagihan</span><span className="font-bold">Rp {data.amount.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <div className="mt-8 text-sm whitespace-pre-line leading-relaxed bg-blue-50 print:bg-transparent p-4 border-l-4 border-blue-500 shrink-0">
                    <strong>Informasi Pembayaran:</strong>{"\n"}
                    {data.paymentInfo}
                </div>

                <div className="mt-12 flex justify-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
                    <div className="text-center w-48">
                        <p className="mb-20">Hormat Kami,</p>
                        <p className="font-bold underline uppercase">{data.signer}</p>
                        <p className="text-sm font-sans">{data.signerJob}</p>
                    </div>
                </div>
            </div>
        )}

        {templateId === 2 && (
            <div className="flex flex-col h-full font-sans">
                <div className={`h-4 w-full mb-8 shrink-0 ${severity === 1 ? 'bg-emerald-500' : severity === 2 ? 'bg-amber-500' : 'bg-red-600'}`}></div>
                <div className="flex justify-between items-start mb-12 shrink-0">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-1">
                            {severity === 1 ? 'PAYMENT REMINDER' : severity === 2 ? 'OVERDUE NOTICE' : 'FINAL NOTICE'}
                        </h1>
                        <div className="text-sm text-slate-500 font-mono">Ref: {data.no}</div>
                    </div>
                    <div className="text-right">
                        {logo && <img src={logo} className="h-12 w-auto object-contain mb-2 ml-auto" />}
                        <div className="font-bold text-slate-800 uppercase">{data.senderName}</div>
                    </div>
                </div>

                <div className="flex gap-12 mb-12 text-sm shrink-0">
                    <div className="w-1/2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Attention To</h3>
                        <div className="font-bold text-lg text-slate-800 uppercase">{data.receiverName}</div>
                        <div className="font-medium text-slate-600">{data.receiverCompany}</div>
                        <div className="text-xs text-slate-500 mt-1">{data.receiverAddress}</div>
                    </div>
                    <div className="w-1/2 text-right">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Amount Due</h3>
                        <div className={`text-4xl font-black ${severity === 3 ? 'text-red-600' : 'text-slate-800'}`}>
                            Rp {data.amount.toLocaleString('id-ID')}
                        </div>
                        <div className="text-red-500 font-bold mt-1 text-xs">
                            Jatuh Tempo: {data.dueDate} ({data.daysOverdue} Hari Terlambat)
                        </div>
                    </div>
                </div>

                <div className="flex-grow text-sm leading-relaxed whitespace-pre-line text-slate-700 overflow-hidden mb-10">
                    {data.body}
                </div>

                <div className="bg-slate-50 print:bg-transparent p-6 rounded-lg border border-slate-200 mb-12 shrink-0">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Payment Details</h4>
                    <div className="whitespace-pre-line text-sm text-slate-600 font-mono">
                        {data.paymentInfo}
                    </div>
                </div>

                <div className="mt-auto flex justify-between items-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
                    <div className="text-xs text-slate-400 italic max-w-sm">
                        Mohon abaikan surat ini jika pembayaran telah dilakukan dalam 24 jam terakhir.
                    </div>
                    <div className="text-right">
                        <div className="font-serif italic text-2xl text-slate-400 mb-2">Sincerely,</div>
                        <div className="font-bold text-slate-800 uppercase">{data.signer}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{data.signerJob}</div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <AlertTriangle size={16} className="text-red-500" /> <span>COLLECTION LETTER BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900 font-sans">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Megaphone size={12}/> Tingkat Ketegasan</h3>
                 <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => applyTone(1)} className={`p-2 rounded border flex flex-col items-center gap-1 transition-all ${severity === 1 ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white text-slate-400 hover:bg-slate-50'}`}><Mail size={16}/><span className="text-[9px] font-bold">Ramah</span></button>
                    <button onClick={() => applyTone(2)} className={`p-2 rounded border flex flex-col items-center gap-1 transition-all ${severity === 2 ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white text-slate-400 hover:bg-slate-50'}`}><Megaphone size={16}/><span className="text-[9px] font-bold">Tegas</span></button>
                    <button onClick={() => applyTone(3)} className={`p-2 rounded border flex flex-col items-center gap-1 transition-all ${severity === 3 ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white text-slate-400 hover:bg-slate-50'}`}><ShieldAlert size={16}/><span className="text-[9px] font-bold">Keras</span></button>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Info Pengirim</h3>
                 <div className="flex items-center gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                        {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={16} className="text-slate-300" />}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><CreditCard size={12}/> Detail Tagihan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} placeholder="Nama Klien" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.invoiceRef} onChange={e => setData({...data, invoiceRef: e.target.value})} placeholder="No Invoice" />
                    <input className="w-full p-2 border rounded text-xs font-bold text-red-600" type="number" value={data.amount} onChange={e => setData({...data, amount: Number(e.target.value)})} />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Jatuh Tempo</label>
                        <input className="w-full p-2 border rounded text-xs" type="date" value={data.dueDate} onChange={e => setData({...data, dueDate: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Terlambat (Hari)</label>
                        <input className="w-full p-2 border rounded text-xs" type="number" value={data.daysOverdue} onChange={e => setData({...data, daysOverdue: Number(e.target.value)})} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Edit3 size={12}/> Narasi Surat</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.subject} onChange={e => setData({...data, subject: e.target.value})} placeholder="Subjek Surat" />
                 <textarea className="w-full p-2 border rounded text-xs h-32 resize-none leading-relaxed" value={data.body} onChange={e => setData({...data, body: e.target.value})} />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.paymentInfo} onChange={e => setData({...data, paymentInfo: e.target.value})} placeholder="Info Pembayaran" />
              </div>

              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <DocumentContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}