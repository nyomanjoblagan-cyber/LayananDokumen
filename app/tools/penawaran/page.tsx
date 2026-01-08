'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Building2, Briefcase, FileText, Calendar, Percent, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function QuotationPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Penawaran...</div>}>
      <QuotationToolBuilder />
    </Suspense>
  );
}

function QuotationToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `QUO/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
    subject: 'Penawaran Harga Pengadaan',
    senderName: 'PT. DIGITAL SOLUSI',
    senderInfo: 'Gedung Cyber 2, Lt. 10, Jl. Rasuna Said, Jakarta\nEmail: sales@digisolusi.com | WA: 0812-9999-8888',
    receiverName: 'Bapak Hartono',
    receiverCompany: 'CV. MAJU MUNDUR JAYA ABADI',
    receiverAddress: 'Jl. Industri Raya No. 45, Kawasan Industri Cikarang',
    opening: 'Dengan hormat,\nBersama surat ini, kami bermaksud mengajukan penawaran harga untuk kebutuhan pengadaan barang/jasa dengan rincian sebagai berikut:',
    items: [
      { id: 1, name: 'Server Rack 42U - High Performance', qty: 2, price: 15000000 },
      { id: 2, name: 'Jasa Instalasi & Konfigurasi Network', qty: 1, price: 5000000 },
    ],
    taxRate: 11,
    terms: '1. Harga sudah termasuk pengiriman wilayah Jakarta.\n2. Pembayaran DP 50%, pelunasan setelah barang diterima.\n3. Garansi barang 1 tahun.',
    closing: 'Demikian penawaran ini kami sampaikan. Kami menunggu kabar baik dari Bapak/Ibu. Terima kasih.',
    city: 'Jakarta',
    signer: 'Budi Santoso, S.Kom',
    signerJob: 'Marketing Manager'
  });

  const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const total = subtotal + taxAmount;

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };
  const handleItemChange = (idx: number, field: string, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };
  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), name: '', qty: 1, price: 0 }] });
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };

  const TEMPLATES = [
    { id: 1, name: "Surat Resmi (Padat)", desc: "Format dinas standar, layout efisien" },
    { id: 2, name: "Modern Proposal", desc: "Tampilan tabel bersih" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (ANTI SCROLLBAR) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[20mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* TAMPILAN PRINT (LOCKED) */
      print:fixed print:top-0 print:left-0 
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 print:p-[20mm] 
      print:overflow-hidden /* KUNCI UTAMA */
      print:z-[9999]
      
      /* SCALING AMAN */
      print:transform print:scale-[0.95] print:origin-top
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT - TOTAL RESET */}
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Penawaran</h1>
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
          
          {/* Identitas Pengirim */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Building2 size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Kop / Pengirim</h3>
             </div>
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
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold focus:border-blue-500 outline-none" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat & Kontak</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none focus:border-blue-500 outline-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Penerima & Meta */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Briefcase size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Penerima & Perihal</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Perihal / Subject</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-bold focus:border-blue-500 outline-none" value={data.subject} onChange={e => setData({...data, subject: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-mono" value={data.no} onChange={e => setData({...data, no: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Tujuan (Klien)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-medium" placeholder="Nama Penerima" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} />
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" placeholder="Nama Perusahaan" value={data.receiverCompany} onChange={e => setData({...data, receiverCompany: e.target.value})} />
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" placeholder="Alamat" value={data.receiverAddress} onChange={e => setData({...data, receiverAddress: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Isi & Tabel */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <FileText size={14} className="text-blue-600" />
                   <h3 className="text-xs font-bold text-slate-700 uppercase">Isi & Harga</h3>
                </div>
                <button onClick={addItem} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"><Plus size={10} /> Tambah</button>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Pembuka</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none focus:border-blue-500 outline-none" value={data.opening} onChange={e => setData({...data, opening: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                   {data.items.map((item, idx) => (
                      <div key={item.id} className="bg-slate-50 p-2 rounded border border-slate-200 relative group">
                         <div className="mb-2">
                            <input type="text" className="w-full bg-transparent border-b border-slate-300 text-xs font-medium focus:border-blue-500 outline-none pb-1" placeholder="Nama Barang..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                         </div>
                         <div className="flex gap-2">
                            <div className="flex-1">
                               <span className="text-[9px] text-slate-400 uppercase">Qty</span>
                               <input type="number" className="w-full bg-white border border-slate-300 rounded text-xs p-1 text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                            </div>
                            <div className="flex-[2]">
                               <span className="text-[9px] text-slate-400 uppercase">Harga</span>
                               <input type="number" className="w-full bg-white border border-slate-300 rounded text-xs p-1 text-right" value={item.price} onChange={e => handleItemChange(idx, 'price', e.target.value)} />
                            </div>
                         </div>
                         <button onClick={() => removeItem(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={12} /></button>
                      </div>
                   ))}
                </div>

                <div className="bg-blue-50 p-3 rounded border border-blue-100 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Percent size={14} className="text-blue-600" />
                      <label className="text-[10px] font-bold text-blue-700 uppercase">Pajak (PPN %)</label>
                   </div>
                   <input type="number" className="w-16 p-1 border border-blue-200 rounded text-xs text-right font-bold" value={data.taxRate} onChange={e => setData({...data, taxRate: Number(e.target.value)})} />
                </div>
             </div>
          </div>

          {/* Penutup */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Calendar size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Ketentuan & TTD</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Berlaku Sampai</label>
                   <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.validUntil} onChange={e => setData({...data, validUntil: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Syarat & Ketentuan</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-24 resize-none focus:border-blue-500 outline-none" value={data.terms} onChange={e => setData({...data, terms: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Penutup</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none focus:border-blue-500 outline-none" value={data.closing} onChange={e => setData({...data, closing: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => setData({...data, city: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penanda Tangan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} />
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs mt-1" placeholder="Jabatan" value={data.signerJob} onChange={e => setData({...data, signerJob: e.target.value})} />
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full print:block">
          
          {/* WRAPPER KERTAS */}
          <Kertas>
            
            {/* TEMPLATE 1: SURAT RESMI (COMPACT & FIT) */}
            {templateId === 1 && (
              <div className="h-full flex flex-col">
                {/* Header / Kop - Jarak dikurangi */}
                <div className="flex items-center gap-6 border-b-4 border-slate-800 pb-3 mb-6">
                   <div className="w-16 h-16 flex items-center justify-center shrink-0">
                      {logo ? <img src={logo} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 font-bold rounded">LOGO</div>}
                   </div>
                   <div className="flex-1 text-center">
                      <h1 className="text-xl font-black uppercase text-slate-900 tracking-wide mb-1">{data.senderName}</h1>
                      <div className="text-xs text-slate-600 whitespace-pre-line leading-tight">{data.senderInfo}</div>
                   </div>
                </div>

                {/* Info Surat - Jarak dikurangi */}
                <div className="flex justify-between items-start mb-6 text-sm">
                   <div className="space-y-0.5">
                      <div>Nomor : {data.no}</div>
                      <div>Lamp : -</div>
                      <div className="font-bold">Perihal : {data.subject}</div>
                   </div>
                   <div className="text-right">
                      {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
                   </div>
                </div>

                {/* Penerima - Jarak dikurangi */}
                <div className="mb-6 text-sm">
                   <p className="font-bold">Kepada Yth,</p>
                   <p className="font-bold">{data.receiverName}</p>
                   <p>{data.receiverCompany}</p>
                   <p className="max-w-xs">{data.receiverAddress}</p>
                </div>

                {/* Pembuka */}
                <div className="mb-4 text-sm text-justify whitespace-pre-line leading-relaxed">
                   {data.opening}
                </div>

                {/* Tabel Harga - Padding dikecilkan */}
                <div className="mb-4">
                   <table className="w-full border-collapse border border-slate-900 text-[13px]">
                      <thead>
                         <tr className="bg-slate-100">
                            <th className="border border-slate-900 py-1.5 px-2 text-center w-10">No</th>
                            <th className="border border-slate-900 py-1.5 px-2 text-left">Deskripsi Barang / Jasa</th>
                            <th className="border border-slate-900 py-1.5 px-2 text-center w-14">Qty</th>
                            <th className="border border-slate-900 py-1.5 px-2 text-right w-32">Harga Satuan</th>
                            <th className="border border-slate-900 py-1.5 px-2 text-right w-36">Total</th>
                         </tr>
                      </thead>
                      <tbody>
                         {data.items.map((item, idx) => (
                            <tr key={item.id}>
                               <td className="border border-slate-900 py-1.5 px-2 text-center">{idx + 1}</td>
                               <td className="border border-slate-900 py-1.5 px-2">{item.name}</td>
                               <td className="border border-slate-900 py-1.5 px-2 text-center">{item.qty}</td>
                               <td className="border border-slate-900 py-1.5 px-2 text-right">Rp {item.price.toLocaleString('id-ID')}</td>
                               <td className="border border-slate-900 py-1.5 px-2 text-right font-medium">Rp {(item.qty * item.price).toLocaleString('id-ID')}</td>
                            </tr>
                         ))}
                      </tbody>
                      <tfoot>
                         {data.taxRate > 0 && (
                           <>
                             <tr>
                                <td colSpan={4} className="border border-slate-900 py-1.5 px-2 text-right font-bold">Subtotal</td>
                                <td className="border border-slate-900 py-1.5 px-2 text-right font-bold">Rp {subtotal.toLocaleString('id-ID')}</td>
                             </tr>
                             <tr>
                                <td colSpan={4} className="border border-slate-900 py-1.5 px-2 text-right font-bold">PPN ({data.taxRate}%)</td>
                                <td className="border border-slate-900 py-1.5 px-2 text-right font-bold">Rp {taxAmount.toLocaleString('id-ID')}</td>
                             </tr>
                           </>
                         )}
                         <tr className="bg-slate-100">
                            <td colSpan={4} className="border border-slate-900 py-1.5 px-2 text-right font-black">GRAND TOTAL</td>
                            <td className="border border-slate-900 py-1.5 px-2 text-right font-black">Rp {total.toLocaleString('id-ID')}</td>
                         </tr>
                      </tfoot>
                   </table>
                </div>

                {/* Syarat & Penutup */}
                <div className="mb-6 text-sm">
                   <p className="font-bold underline mb-1">Syarat & Ketentuan:</p>
                   <div className="whitespace-pre-line leading-relaxed pl-4 text-slate-700 text-xs">
                      {data.terms}
                   </div>
                   <p className="mt-1 italic text-xs text-red-600">* Penawaran ini berlaku hingga tanggal: {new Date(data.validUntil).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                </div>

                <div className="mb-8 text-sm text-justify whitespace-pre-line leading-relaxed">
                   {data.closing}
                </div>

                {/* TTD - Lebar dinamis & align right */}
                <div className="flex justify-end mt-auto">
                   <div className="text-center min-w-[200px] px-4">
                      <p className="mb-20">Hormat Kami,</p>
                      <p className="font-bold underline">{data.signer}</p>
                      <p className="text-sm">{data.signerJob}</p>
                   </div>
                </div>
              </div>
            )}

            {/* TEMPLATE 2: MODERN PROPOSAL (COMPACT) */}
            {templateId === 2 && (
              <div className="flex flex-col h-full font-sans">
                 {/* Modern Header - Jarak dikurangi */}
                 <div className="flex justify-between items-start mb-8">
                    <div className="space-y-2">
                       {logo && <img src={logo} className="h-10 w-auto object-contain" />}
                       <div>
                          <h2 className="font-bold text-xl text-blue-700">{data.senderName}</h2>
                          <div className="text-xs text-slate-500 whitespace-pre-line border-l-2 border-blue-200 pl-2">{data.senderInfo}</div>
                       </div>
                    </div>
                    <div className="text-right">
                       <h1 className="text-3xl font-light uppercase tracking-widest text-slate-800 mb-1">PENAWARAN</h1>
                       <div className="text-sm font-bold text-blue-600">{data.no}</div>
                       <div className="text-xs text-slate-500 mt-0.5">Tanggal: {data.date}</div>
                       <div className="text-xs text-slate-500">Valid Sampai: {data.validUntil}</div>
                    </div>
                 </div>

                 <div className="flex gap-12 mb-8">
                    <div className="w-1/2">
                       <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ditujukan Kepada</h3>
                       <div className="font-bold text-sm text-slate-800">{data.receiverName}</div>
                       <div className="font-medium text-xs text-slate-600">{data.receiverCompany}</div>
                       <div className="text-xs text-slate-500 mt-0.5">{data.receiverAddress}</div>
                    </div>
                    <div className="w-1/2">
                       <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Perihal</h3>
                       <div className="text-sm font-medium text-slate-800 border-b border-slate-200 pb-1">{data.subject}</div>
                    </div>
                 </div>

                 {/* Modern Table - Padding dikurangi */}
                 <div className="mb-6">
                    <table className="w-full">
                       <thead>
                          <tr className="border-b-2 border-blue-600 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                             <th className="py-2 text-left">Deskripsi</th>
                             <th className="py-2 text-center w-16">Qty</th>
                             <th className="py-2 text-right w-28">Harga</th>
                             <th className="py-2 text-right w-28">Total</th>
                          </tr>
                       </thead>
                       <tbody className="text-[13px]">
                          {data.items.map((item) => (
                             <tr key={item.id} className="border-b border-slate-100">
                                <td className="py-2 font-medium text-slate-700">{item.name}</td>
                                <td className="py-2 text-center text-slate-500">{item.qty}</td>
                                <td className="py-2 text-right text-slate-500">{item.price.toLocaleString()}</td>
                                <td className="py-2 text-right font-bold text-slate-800">{(item.qty * item.price).toLocaleString()}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 <div className="flex justify-end mb-8">
                    <div className="w-1/2 bg-slate-50 p-4 rounded-lg">
                       <div className="flex justify-between mb-1 text-xs text-slate-600">
                          <span>Subtotal</span><span>Rp {subtotal.toLocaleString()}</span>
                       </div>
                       {data.taxRate > 0 && (
                          <div className="flex justify-between mb-1 text-xs text-slate-600">
                             <span>Pajak ({data.taxRate}%)</span><span>Rp {taxAmount.toLocaleString()}</span>
                          </div>
                       )}
                       <div className="flex justify-between mt-2 pt-2 border-t border-slate-200 font-bold text-lg text-blue-700">
                          <span>Total</span><span>Rp {total.toLocaleString()}</span>
                       </div>
                    </div>
                 </div>

                 <div className="mt-auto">
                    <div className="mb-6 text-xs text-slate-600">
                       <h4 className="font-bold text-slate-800 mb-1">Syarat & Ketentuan:</h4>
                       <div className="whitespace-pre-line pl-3 border-l-2 border-slate-200">{data.terms}</div>
                    </div>
                    
                    <div className="flex justify-between items-end pt-4 border-t border-slate-200">
                       <div className="text-[10px] text-slate-400 italic max-w-sm">
                          Dokumen ini dibuat secara otomatis dan sah tanpa materai basah jika disetujui melalui email.
                       </div>
                       <div className="text-right">
                          <div className="font-['Caveat',cursive] text-2xl text-slate-400 mb-1">Approved</div>
                          <div className="font-bold text-sm text-slate-800">{data.signer}</div>
                          <div className="text-[10px] text-slate-500 uppercase">{data.signerJob}</div>
                       </div>
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