'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Building2, Briefcase, FileText, Calendar, Percent, ChevronDown, Check, Edit3, Eye, X
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function QuotationPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Penawaran...</div>}>
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

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `QUO/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
    date: '',
    validUntil: '',
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

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const valid = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today, validUntil: valid }));
  }, []);

  // CALCULATIONS
  const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const total = subtotal + taxAmount;

  // HANDLERS
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });
  
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Surat Resmi (Standard)", desc: "Format dinas standar, layout efisien" },
    { id: 2, name: "Modern Proposal", desc: "Tampilan tabel bersih & visual" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:transform print:scale-[0.95] print:origin-top">
        {templateId === 1 && (
            <div className="h-full flex flex-col">
                <div className="flex items-center gap-6 border-b-4 border-slate-800 pb-3 mb-6 shrink-0">
                    <div className="w-16 h-16 flex items-center justify-center shrink-0">
                        {logo ? <img src={logo} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 font-bold rounded">LOGO</div>}
                    </div>
                    <div className="flex-1 text-center">
                        <h1 className="text-xl font-black uppercase text-slate-900 tracking-wide mb-1">{data.senderName}</h1>
                        <div className="text-[9pt] text-slate-600 whitespace-pre-line leading-tight">{data.senderInfo}</div>
                    </div>
                </div>

                <div className="flex justify-between text-sm mb-6 shrink-0">
                    <div className="space-y-0.5">
                        <div>Nomor : {data.no}</div>
                        <div className="font-bold uppercase text-blue-700 print:text-black">Perihal : {data.subject}</div>
                    </div>
                    <div className="text-right">
                        {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}
                    </div>
                </div>

                <div className="mb-6 text-sm shrink-0">
                    <p>Kepada Yth,</p>
                    <p className="font-bold">{data.receiverName}</p>
                    <p>{data.receiverCompany}</p>
                    <p className="max-w-xs">{data.receiverAddress}</p>
                </div>

                <div className="mb-4 text-sm text-justify whitespace-pre-line leading-relaxed shrink-0">
                    {data.opening}
                </div>

                <div className="flex-grow overflow-hidden mb-6">
                    <table className="w-full border-collapse border border-slate-900 text-[12px]">
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
                                <tr key={idx}>
                                    <td className="border border-slate-900 py-1 px-2 text-center">{idx + 1}</td>
                                    <td className="border border-slate-900 py-1 px-2 font-medium">{item.name}</td>
                                    <td className="border border-slate-900 py-1 px-2 text-center">{item.qty}</td>
                                    <td className="border border-slate-900 py-1 px-2 text-right">{item.price.toLocaleString('id-ID')}</td>
                                    <td className="border border-slate-900 py-1 px-2 text-right font-bold">{(item.qty * item.price).toLocaleString('id-ID')}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-slate-50 print:bg-transparent">
                                <td colSpan={4} className="border border-slate-900 py-1 px-2 text-right font-bold uppercase text-[10px]">Subtotal</td>
                                <td className="border border-slate-900 py-1 px-2 text-right font-bold">{subtotal.toLocaleString('id-ID')}</td>
                            </tr>
                            {data.taxRate > 0 && (
                                <tr>
                                    <td colSpan={4} className="border border-slate-900 py-1 px-2 text-right text-[10px]">PPN ({data.taxRate}%)</td>
                                    <td className="border border-slate-900 py-1 px-2 text-right">{taxAmount.toLocaleString('id-ID')}</td>
                                </tr>
                            )}
                            <tr className="bg-slate-900 text-white print:text-black print:bg-transparent">
                                <td colSpan={4} className="border border-slate-900 py-2 px-2 text-right font-black uppercase">Grand Total (IDR)</td>
                                <td className="border border-slate-900 py-2 px-2 text-right font-black text-lg">{total.toLocaleString('id-ID')}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="mb-6 text-sm shrink-0">
                    <p className="font-bold underline mb-1">Syarat & Ketentuan:</p>
                    <div className="whitespace-pre-line leading-tight text-slate-700 text-xs pl-4 border-l-2 border-slate-200">
                        {data.terms}
                    </div>
                    <p className="mt-2 italic text-xs text-red-600 print:text-black">* Penawaran ini berlaku hingga: {isClient && data.validUntil ? new Date(data.validUntil).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</p>
                </div>

                <div className="mb-8 text-sm shrink-0 text-justify italic">
                    {data.closing}
                </div>

                <div className="mt-auto flex justify-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
                    <div className="text-center w-64">
                        <p className="mb-20">Hormat Kami,</p>
                        <p className="font-bold underline uppercase">{data.signer}</p>
                        <p className="text-sm font-sans text-slate-500">{data.signerJob}</p>
                    </div>
                </div>
            </div>
        )}

        {templateId === 2 && (
            <div className="h-full flex flex-col font-sans">
                {/* MODERN HEADER */}
                <div className="flex justify-between items-start mb-10 shrink-0">
                    <div className="space-y-4">
                        {logo ? <img src={logo} className="h-12 w-auto object-contain" /> : <div className="text-2xl font-black text-blue-600">QUO.</div>}
                        <div>
                            <h2 className="font-black text-2xl text-slate-900 leading-none">{data.senderName}</h2>
                            <div className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Official Quotation</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <h1 className="text-4xl font-black text-slate-200 uppercase leading-none mb-4">Proposal</h1>
                        <div className="space-y-0.5 text-xs text-slate-500">
                            <div className="font-mono">Ref: {data.no}</div>
                            <div>Date: {data.date}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mb-10 shrink-0">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Prepared For</h3>
                        <div className="font-bold text-slate-900 uppercase">{data.receiverName}</div>
                        <div className="text-sm font-medium text-slate-700">{data.receiverCompany}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{data.receiverAddress}</div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject</h3>
                        <div className="font-bold text-slate-800 border-b-2 border-blue-600 pb-1">{data.subject}</div>
                    </div>
                </div>

                <div className="flex-grow overflow-hidden mb-6">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-slate-100 text-[10px] font-black text-slate-400 uppercase">
                                <th className="py-3 text-left">Description</th>
                                <th className="py-3 text-center w-20">Qty</th>
                                <th className="py-3 text-right w-32">Price</th>
                                <th className="py-3 text-right w-32">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {data.items.map((item, idx) => (
                                <tr key={idx} className="border-b border-slate-50">
                                    <td className="py-4 font-bold text-slate-800">{item.name}</td>
                                    <td className="py-4 text-center text-slate-500">{item.qty}</td>
                                    <td className="py-4 text-right text-slate-500">{item.price.toLocaleString()}</td>
                                    <td className="py-4 text-right font-black text-slate-900">{(item.qty * item.price).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mb-10 shrink-0">
                    <div className="w-72 space-y-2 bg-slate-900 text-white p-6 rounded-2xl print:bg-transparent print:text-black print:border print:border-black">
                        <div className="flex justify-between text-xs opacity-60"><span>Subtotal</span><span>Rp {subtotal.toLocaleString()}</span></div>
                        {data.taxRate > 0 && <div className="flex justify-between text-xs opacity-60"><span>VAT ({data.taxRate}%)</span><span>Rp {taxAmount.toLocaleString()}</span></div>}
                        <div className="flex justify-between font-black text-xl pt-2 border-t border-white/20 print:border-black">
                            <span>TOTAL</span>
                            <span>{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
                    <div className="text-[9px] text-slate-400 max-w-[300px] leading-relaxed">
                        Terms & Conditions: {data.terms.substring(0, 100)}...
                        <br/>This quotation is valid until {data.validUntil}.
                    </div>
                    <div className="text-right">
                        <div className="font-serif italic text-2xl text-slate-300 mb-2">Approved by,</div>
                        <div className="font-black text-slate-900 uppercase leading-none">{data.signer}</div>
                        <div className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-1">{data.signerJob}</div>
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
               <FileText size={16} className="text-blue-500" /> <span>QUOTATION BUILDER</span>
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
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Pengirim</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                        {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={16} className="text-slate-300" />}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} placeholder="Alamat & Kontak" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Briefcase size={12}/> Klien / Penerima</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} placeholder="Nama Penerima" />
                 <input className="w-full p-2 border rounded text-xs" value={data.receiverCompany} onChange={e => handleDataChange('receiverCompany', e.target.value)} placeholder="Nama Perusahaan" />
                 <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} placeholder="Alamat Klien" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-2"><Plus size={12}/> Item Penawaran</h3>
                    <button onClick={addItem} className="text-[9px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold uppercase hover:bg-blue-200 transition-colors">Tambah Item</button>
                 </div>
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded border relative group">
                        <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                        <input className="w-full p-1 bg-transparent border-b mb-2 text-xs font-bold" placeholder="Nama Barang/Jasa" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-0.5"><label className="text-[8px] font-bold text-slate-400 uppercase">Qty</label><input type="number" className="w-full p-1 border rounded text-xs text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} /></div>
                            <div className="space-y-0.5"><label className="text-[8px] font-bold text-slate-400 uppercase">Harga</label><input type="number" className="w-full p-1 border rounded text-xs text-right" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} /></div>
                        </div>
                    </div>
                 ))}
                 <div className="pt-2 border-t">
                    <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 mb-2"><Percent size={12}/> Pajak (PPN %)</label>
                    <input type="number" className="w-full p-2 border rounded text-xs font-bold" value={data.taxRate} onChange={e => handleDataChange('taxRate', Number(e.target.value))} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Calendar size={12}/> Administrasi</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Tanggal Terbit</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Berlaku Sampai</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.validUntil} onChange={e => handleDataChange('validUntil', e.target.value)} /></div>
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="Nomor Surat" />
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.terms} onChange={e => handleDataChange('terms', e.target.value)} placeholder="Syarat & Ketentuan" />
                 <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.signer} onChange={e => handleDataChange('signer', e.target.value)} placeholder="Nama TTD" />
                    <input className="w-full p-2 border rounded text-xs" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan" />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
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

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}