'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, AlertTriangle, 
  Megaphone, ShieldAlert, Mail, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Penagihan...</div>}>
      <CollectionToolBuilder />
    </Suspense>
  );
}

function CollectionToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  
  // Tingkat Ketegasan (1=Ramah, 2=Tegas, 3=Keras)
  const [severity, setSeverity] = useState<1 | 2 | 3>(1);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `COLL/2026/${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString().split('T')[0],
    
    // PENGIRIM
    senderName: 'PT. KARYA MAJU SENTOSA',
    senderInfo: 'Jl. Industri Raya No. 88, Cikarang\nEmail: finance@kms.com | WA: 0812-9999-7777',
    
    // PENERIMA
    receiverName: 'Bapak Hartono',
    receiverCompany: 'CV. SUMBER REJEKI',
    receiverAddress: 'Jl. Ahmad Yani No. 45, Surabaya',
    
    // DETAIL HUTANG
    invoiceRef: 'INV-2025-099',
    invoiceDate: '2025-12-20',
    dueDate: '2026-01-20',
    amount: 15000000,
    daysOverdue: 5,
    
    // ISI SURAT (Dinamis)
    subject: 'Pengingat Pembayaran Invoice No. INV-2025-099',
    body: 'Kami ingin mengingatkan bahwa Invoice No. INV-2025-099 tertanggal 2025-12-20 telah jatuh tempo pada tanggal 2026-01-20. Mungkin invoice ini terlewat dari perhatian Bapak/Ibu. Mohon konfirmasi jika pembayaran telah dilakukan.',
    
    paymentInfo: 'Pembayaran dapat ditransfer ke:\nBCA 123-456-7890 a.n PT Karya Maju Sentosa',
    
    signer: 'Siti Aminah',
    signerJob: 'Finance Manager'
  });

  // LOGIC GENERATE TEXT BERDASARKAN SEVERITY
  const applyTone = (level: 1 | 2 | 3) => {
    setSeverity(level);
    let newSubject = '';
    let newBody = '';

    if (level === 1) { // RAMAH
      newSubject = `Pengingat Pembayaran Invoice No. ${data.invoiceRef}`;
      newBody = `Kami ingin mengingatkan dengan hormat bahwa Invoice No. ${data.invoiceRef} sebesar Rp ${data.amount.toLocaleString('id-ID')} telah jatuh tempo pada tanggal ${data.dueDate}.\n\nKami mengerti kesibukan Bapak/Ibu mungkin menyebabkan hal ini terlewat. Mohon segera melakukan pembayaran atau kirimkan bukti transfer jika sudah dibayarkan.`;
    } 
    else if (level === 2) { // TEGAS
      newSubject = `PERINGATAN 1: Tunggakan Invoice No. ${data.invoiceRef}`;
      newBody = `Melalui surat ini kami sampaikan bahwa pembayaran untuk Invoice No. ${data.invoiceRef} telah melewati batas waktu (Overdue) selama ${data.daysOverdue} hari.\n\nKami mohon kerjasamanya untuk segera menyelesaikan pembayaran ini guna menghindari terganggunya layanan/suplai barang dari kami. Mohon abaikan surat ini jika pembayaran telah dilakukan.`;
    } 
    else { // KERAS
      newSubject = `FINAL NOTICE: Penyelesaian Kewajiban Pembayaran`;
      newBody = `SANGAT PENTING. Kami mencatat belum ada pembayaran untuk Invoice No. ${data.invoiceRef} yang sudah jatuh tempo sejak ${data.dueDate}.\n\nIni adalah peringatan terakhir sebelum kami menyerahkan masalah ini ke departemen hukum/kolektor eksternal. Kami harap itikad baik Bapak/Ibu untuk menyelesaikan kewajiban ini dalam waktu 3x24 jam sejak surat ini diterbitkan.`;
    }

    setData(prev => ({ ...prev, subject: newSubject, body: newBody }));
  };

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const TEMPLATES = [
    { id: 1, name: "Surat Resmi (Standard)", desc: "Format surat formal dengan kop" },
    { id: 2, name: "Modern Notice", desc: "Desain visual yang menonjolkan nominal" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (FINAL ANTI SCROLLBAR) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[20mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* TAMPILAN PRINT (LOCKED 1 PAGE) */
      print:fixed print:top-0 print:left-0 
      print:w-full print:h-screen
      print:shadow-none print:mb-0 
      print:p-[20mm] 
      print:overflow-hidden /* KUNCI UTAMA */
      print:z-[9999]
      
      /* SKALA 95% AGAR MUAT */
      print:transform print:scale-[0.95] print:origin-top
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS KHUSUS PRINT - MATIKAN SCROLLBAR TOTAL */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          
          body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white; 
            overflow: hidden !important; /* HILANGKAN SCROLL DI BODY */
          }

          /* HILANGKAN VISUAL SCROLLBAR */
          ::-webkit-scrollbar { display: none !important; width: 0 !important; }
          * { -ms-overflow-style: none !important; scrollbar-width: none !important; }

          header, nav, .no-print { display: none !important; }
          
          /* WARNA TEXT JELAS */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Penagihan</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[180px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <LayoutTemplate size={14} className="text-blue-400" />
                  <span>{activeTemplateName}</span>
                </div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Surat</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Cetak PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          {/* Tone Selector (Fitur Utama) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-700 uppercase">Tingkat Ketegasan (Isi Otomatis)</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button 
                  onClick={() => applyTone(1)}
                  className={`p-2 rounded border flex flex-col items-center gap-2 transition-all ${severity === 1 ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-500'}`}
                >
                   <Mail size={18} />
                   <span className="text-[10px] font-bold">Ramah</span>
                </button>
                <button 
                  onClick={() => applyTone(2)}
                  className={`p-2 rounded border flex flex-col items-center gap-2 transition-all ${severity === 2 ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-500'}`}
                >
                   <Megaphone size={18} />
                   <span className="text-[10px] font-bold">Tegas</span>
                </button>
                <button 
                  onClick={() => applyTone(3)}
                  className={`p-2 rounded border flex flex-col items-center gap-2 transition-all ${severity === 3 ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-500'}`}
                >
                   <ShieldAlert size={18} />
                   <span className="text-[10px] font-bold">Keras</span>
                </button>
             </div>
          </div>

          {/* Identitas Pengirim */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                    {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                  </div>
                  <div className="flex-1">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Logo</button>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 block mt-1">Hapus Logo</button>}
                  </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan Anda</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat & Kontak</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Data Tagihan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-700 uppercase">Detail Tagihan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Penerima (Klien)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-medium" placeholder="Nama Klien" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} />
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm mt-1" placeholder="Perusahaan Klien" value={data.receiverCompany} onChange={e => setData({...data, receiverCompany: e.target.value})} />
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none mt-1" placeholder="Alamat Klien" value={data.receiverAddress} onChange={e => setData({...data, receiverAddress: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Invoice</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.invoiceRef} onChange={e => setData({...data, invoiceRef: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Total Tagihan (Rp)</label>
                      <input type="number" className="w-full p-2 border border-slate-300 rounded text-xs font-bold text-red-600" value={data.amount} onChange={e => setData({...data, amount: Number(e.target.value)})} />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Jatuh Tempo</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.dueDate} onChange={e => setData({...data, dueDate: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Hari Terlambat</label>
                      <input type="number" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.daysOverdue} onChange={e => setData({...data, daysOverdue: Number(e.target.value)})} />
                   </div>
                </div>
             </div>
          </div>

          {/* Isi & Penutup */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Perihal / Subject</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold" value={data.subject} onChange={e => setData({...data, subject: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Isi Surat (Bisa diedit)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-32 resize-none" value={data.body} onChange={e => setData({...data, body: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Info Pembayaran (Bank)</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.paymentInfo} onChange={e => setData({...data, paymentInfo: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Penanda Tangan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signerJob} onChange={e => setData({...data, signerJob: e.target.value})} />
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full print:block">
          
          <Kertas>
            
            {/* TEMPLATE 1: SURAT RESMI STANDARD */}
            {templateId === 1 && (
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-6 border-b-4 border-slate-800 pb-3 mb-8">
                   <div className="w-16 h-16 flex items-center justify-center shrink-0">
                      {logo ? <img src={logo} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 font-bold rounded">LOGO</div>}
                   </div>
                   <div className="flex-1 text-center">
                      <h1 className="text-2xl font-black uppercase text-slate-900 tracking-wide mb-1">{data.senderName}</h1>
                      <div className="text-xs text-slate-600 whitespace-pre-line leading-tight">{data.senderInfo}</div>
                   </div>
                </div>

                <div className="flex justify-between text-sm mb-8">
                   <div>
                      <div>No: {data.no}</div>
                      <div>Hal: <strong>{data.subject}</strong></div>
                   </div>
                   <div className="text-right">
                      {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
                   </div>
                </div>

                <div className="mb-8 text-sm">
                   <p>Kepada Yth,</p>
                   <p className="font-bold">{data.receiverName}</p>
                   <p>{data.receiverCompany}</p>
                   <p className="max-w-xs">{data.receiverAddress}</p>
                </div>

                <div className="mb-8 text-sm text-justify whitespace-pre-line leading-relaxed">
                   Dengan hormat,
                   {'\n\n'}
                   {data.body}
                </div>

                {/* Detail Tabel Hutang */}
                <div className="mb-8 border border-slate-300 rounded p-4 bg-slate-50 print:bg-transparent text-sm">
                   <p className="font-bold border-b border-slate-300 pb-2 mb-2">Rincian Kewajiban:</p>
                   <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-slate-500">Nomor Invoice</span><span className="font-mono font-bold">{data.invoiceRef}</span>
                      <span className="text-slate-500">Tanggal Invoice</span><span>{data.invoiceDate}</span>
                      <span className="text-slate-500">Jatuh Tempo</span><span className="text-red-600 font-bold">{data.dueDate}</span>
                      <span className="text-slate-500">Total Tagihan</span><span className="font-bold">Rp {data.amount.toLocaleString('id-ID')}</span>
                   </div>
                </div>

                <div className="mb-8 text-sm whitespace-pre-line leading-relaxed bg-blue-50 print:bg-transparent p-4 border-l-4 border-blue-500">
                   <strong>Informasi Pembayaran:</strong>{'\n'}
                   {data.paymentInfo}
                </div>

                <div className="flex justify-end mt-auto">
                   <div className="text-center w-48">
                      <p className="mb-20">Hormat Kami,</p>
                      <p className="font-bold underline">{data.signer}</p>
                      <p className="text-sm">{data.signerJob}</p>
                   </div>
                </div>
              </div>
            )}

            {/* TEMPLATE 2: MODERN NOTICE (Visually Striking) */}
            {templateId === 2 && (
              <div className="flex flex-col h-full font-sans">
                 
                 {/* Visual Header */}
                 <div className={`h-4 w-full mb-8 ${severity === 1 ? 'bg-emerald-500' : severity === 2 ? 'bg-amber-500' : 'bg-red-600'}`}></div>

                 <div className="flex justify-between items-start mb-12">
                    <div>
                       <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-1">
                          {severity === 1 ? 'PAYMENT REMINDER' : severity === 2 ? 'OVERDUE NOTICE' : 'FINAL NOTICE'}
                       </h1>
                       <div className="text-sm text-slate-500">Ref: {data.no}</div>
                    </div>
                    <div className="text-right">
                       {logo && <img src={logo} className="h-12 w-auto object-contain mb-2 ml-auto" />}
                       <div className="font-bold text-slate-800">{data.senderName}</div>
                       <div className="text-xs text-slate-500">{data.date}</div>
                    </div>
                 </div>

                 <div className="flex gap-12 mb-12 text-sm">
                    <div className="w-1/2">
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Attention To</h3>
                       <div className="font-bold text-lg text-slate-800">{data.receiverName}</div>
                       <div className="font-medium text-slate-600">{data.receiverCompany}</div>
                       <div className="text-xs text-slate-500 mt-1">{data.receiverAddress}</div>
                    </div>
                    <div className="w-1/2 text-right">
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Amount Due</h3>
                       <div className={`text-4xl font-black ${severity === 3 ? 'text-red-600' : 'text-slate-800'}`}>
                          Rp {data.amount.toLocaleString('id-ID')}
                       </div>
                       <div className="text-red-500 font-bold mt-1 text-xs">
                          Jatuh Tempo: {data.dueDate} ({data.daysOverdue} Hari Lewat)
                       </div>
                    </div>
                 </div>

                 <div className="mb-10 text-sm leading-relaxed whitespace-pre-line text-slate-700">
                    {data.body}
                 </div>

                 <div className="bg-slate-50 print:bg-transparent p-6 rounded-lg border border-slate-200 mb-12">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Payment Details</h4>
                    <div className="whitespace-pre-line text-sm text-slate-600">
                       {data.paymentInfo}
                    </div>
                 </div>

                 <div className="mt-auto flex justify-between items-end">
                    <div className="text-xs text-slate-400 italic max-w-sm">
                       Mohon abaikan surat ini jika pembayaran telah dilakukan dalam 24 jam terakhir.
                    </div>
                    <div className="text-right">
                       <div className="font-['Caveat',cursive] text-3xl text-slate-400 mb-2">Sincerely,</div>
                       <div className="font-bold text-slate-800">{data.signer}</div>
                       <div className="text-xs text-slate-500 uppercase">{data.signerJob}</div>
                    </div>
                 </div>
              </div>
            )}

          </Kertas>

        </div>
      </div>
    </div>
  );
}