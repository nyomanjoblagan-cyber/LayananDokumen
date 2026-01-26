'use client';

/**
 * FILE: TandaTerimaBarangPage.tsx
 * STATUS: FINAL & FIXED PREVIEW
 * DESC: Generator Tanda Terima Barang / Receipt dengan Daftar Item Dinamis
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, PackageCheck, Building2, UserCircle2, 
  PlusCircle, Trash2, X, PenTool, ShieldCheck, Truck, ClipboardList,
  ChevronDown, Check, LayoutTemplate, Edit3, Eye, ImagePlus, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface ReceiptItem {
  name: string;
  qty: string;
  unit: string;
  note: string;
}

interface ReceiptData {
  city: string;
  date: string;
  docNo: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  items: ReceiptItem[];
  delivererName: string;
  receiverSignName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ReceiptData = {
  city: 'Denpasar',
  date: '', 
  docNo: 'DO/BWC/2026/01/044',
  senderName: 'PT. BANGUN WARGA CEMERLANG',
  senderAddress: 'Jl. Gatot Subroto No. 45, Denpasar, Bali',
  senderPhone: '(0361) 223344',
  receiverName: 'MADE WIRA KUSUMA',
  receiverAddress: 'Proyek Renovasi Villa Seminyak, Badung',
  receiverPhone: '0812-3456-7890',
  items: [
    { name: 'Semen Gresik 50kg', qty: '50', unit: 'Sak', note: 'Kondisi Baik' },
    { name: 'Besi Beton 10mm', qty: '20', unit: 'Batang', note: 'Standar SNI' }
  ],
  delivererName: 'AHMAD JUNAIDI',
  receiverSignName: 'MADE WIRA KUSUMA'
};

export default function TandaTerimaBarangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Tanda Terima...</div>}>
      <ReceiptBuilder />
    </Suspense>
  );
}

function ReceiptBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<ReceiptData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof ReceiptData, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => setData({ ...data, items: [...data.items, { name: '', qty: '', unit: '', note: '' }] });
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };
  const updateItem = (idx: number, field: keyof ReceiptItem, val: string) => {
    const newItems = [...data.items];
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };

  const handleReset = () => {
    if(confirm('Reset semua data tanda terima?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Format Industri", desc: "Layout tabel tegas & tebal" },
    { id: 2, name: "Format Modern", desc: "Tampilan bersih & minimalis" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-sans' : 'font-serif text-[11pt]'}`}>
      
      {/* HEADER / KOP */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6 shrink-0">
        <div className="flex gap-4">
          {logo ? (
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain block print:block" />
          ) : (
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0 print:hidden">
                <Building2 size={32} />
            </div>
          )}
          <div className="flex-grow text-left">
            <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1 text-blue-800 print:text-black">{data.senderName}</h1>
            <p className="text-[8pt] text-slate-500 italic leading-tight print:text-black">{data.senderAddress}</p>
            <p className="text-[8pt] text-slate-500 print:text-black">Telp: {data.senderPhone}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-black uppercase tracking-widest text-slate-800 print:text-black">TANDA TERIMA</h2>
          <p className="text-[10pt] font-bold">No: {data.docNo}</p>
        </div>
      </div>

      {/* INFO PIHAK */}
      <div className="grid grid-cols-2 gap-10 mb-6 text-[10pt] shrink-0">
         <div className="space-y-1 text-left">
            <p className="font-bold border-b text-[8pt] text-slate-400 uppercase tracking-widest mb-1 print:text-black">Penerima:</p>
            <p className="font-black text-[11pt] uppercase">{data.receiverName}</p>
            <p className="italic text-slate-600 print:text-black leading-tight text-[9pt]">{data.receiverAddress}</p>
            <p className="text-[9pt]">HP: {data.receiverPhone}</p>
         </div>
         <div className="space-y-1 text-right font-sans">
            <p className="font-bold border-b text-[8pt] text-slate-400 uppercase tracking-widest mb-1 print:text-black">Detail Pengiriman:</p>
            <p>Tanggal: <b>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</b></p>
            <p>Kota: {data.city}</p>
         </div>
      </div>

      {/* TABEL BARANG */}
      <div className="overflow-visible text-left">
        <table className="w-full border-collapse border border-slate-900 text-[10pt]">
           <thead className="bg-slate-100 uppercase font-black text-[9pt] print:bg-slate-50">
             <tr>
                 <th className="border border-slate-900 p-2 w-10 text-center">No</th>
                 <th className="border border-slate-900 p-2 text-left px-3">Deskripsi Barang</th>
                 <th className="border border-slate-900 p-2 w-20 text-center">Qty</th>
                 <th className="border border-slate-900 p-2 w-20 text-center">Satuan</th>
                 <th className="border border-slate-900 p-2 text-left px-3">Keterangan</th>
             </tr>
           </thead>
           <tbody>
             {data.items.map((item, i) => (
                 <tr key={i} className="h-10">
                    <td className="border border-slate-900 p-2 text-center">{i + 1}</td>
                    <td className="border border-slate-900 p-2 px-3 font-bold">{item.name || '...'}</td>
                    <td className="border border-slate-900 p-2 text-center">{item.qty || '0'}</td>
                    <td className="border border-slate-900 p-2 text-center uppercase text-[8pt]">{item.unit || '-'}</td>
                    <td className="border border-slate-900 p-2 px-3 italic text-slate-600 text-[9pt]">{item.note}</td>
                 </tr>
             ))}
             {/* Filler Rows */}
             {[...Array(Math.max(1, 10 - data.items.length))].map((_, i) => (
                <tr key={i} className="h-10"><td className="border border-slate-900" colSpan={5}></td></tr>
             ))}
           </tbody>
        </table>
        <p className="text-[7pt] italic mt-4 text-slate-400 print:text-black">* Barang yang sudah diterima dalam kondisi baik tidak dapat dikembalikan tanpa perjanjian.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-auto pt-4 border-t-2 border-slate-100 print:border-slate-900">
        <table className="w-full table-fixed text-[10pt] text-center">
          <tbody>
            <tr className="font-black text-[8pt] text-slate-400 uppercase tracking-widest print:text-black">
              <td className="pb-4">Hormat Kami,</td>
              <td className="pb-4">Pengantar,</td>
              <td className="pb-4">Penerima,</td>
            </tr>
            <tr className="h-24">
              <td className="align-bottom italic text-slate-300 text-[7pt] pb-2 print:text-black opacity-30">Stempel Toko</td>
              <td></td>
              <td></td>
            </tr>
            <tr className="font-bold underline uppercase">
              <td>{data.senderName.split(' ')[0]} ...</td>
              <td>({data.delivererName})</td>
              <td>({data.receiverSignName})</td>
            </tr>
          </tbody>
        </table>
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
          .no-print, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <PackageCheck size={16} /> <span>Receipt Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans p-1">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print Receipt</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="flex justify-between items-center border-b pb-2 text-left font-sans">
                <h2 className="font-bold text-slate-700 uppercase text-xs tracking-widest flex items-center gap-2"><Edit3 size={16}/> Editor Tanda Terima</h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors"><RotateCcw size={16}/></button>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Info Pengirim</h3>
              <div className="flex items-center gap-4">
                 <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden shrink-0">
                    {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={20} className="text-slate-300" />}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                 </div>
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} placeholder="Nama Toko/PT" />
              </div>
              <input className="w-full p-2 border rounded text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="No. Tanda Terima" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left text-xs">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Info Penerima</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} placeholder="Alamat Tujuan" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <div className="flex justify-between items-center border-b pb-1">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-2"><ClipboardList size={12}/> Daftar Barang</h3>
                 <button onClick={addItem} className="bg-amber-100 text-amber-700 p-1 px-2 rounded-md text-[10px] font-bold">+ TAMBAH</button>
              </div>
              <div className="space-y-3">
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border relative group space-y-2">
                       <button onClick={() => removeItem(idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                       <input className="w-full p-1 border-b bg-transparent text-xs font-bold focus:outline-none focus:border-blue-500" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} placeholder="Nama Barang" />
                       <div className="grid grid-cols-3 gap-2">
                          <input className="w-full p-1 border rounded text-[10px] bg-white text-center" value={item.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} placeholder="Qty" />
                          <input className="w-full p-1 border rounded text-[10px] bg-white text-center" value={item.unit} onChange={e => updateItem(idx, 'unit', e.target.value)} placeholder="Unit" />
                          <input className="w-full p-1 border rounded text-[10px] bg-white" value={item.note} onChange={e => updateItem(idx, 'note', e.target.value)} placeholder="Ket" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
              <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Truck size={12}/> Otoritas</h3>
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-[10px]" value={data.delivererName} onChange={e => handleDataChange('delivererName', e.target.value)} placeholder="Nama Pengantar" />
                 <input className="w-full p-2 border rounded text-[10px]" value={data.receiverSignName} onChange={e => handleDataChange('receiverSignName', e.target.value)} placeholder="Nama Penerima" />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <DocumentContent />
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden"><DocumentContent /></div>
    </div>
  );
}
