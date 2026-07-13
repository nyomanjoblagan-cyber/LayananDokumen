'use client';

/**
 * FILE: TandaTerimaBarangPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Tanda Terima Barang / Delivery Order
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML & Filler Rows Logic
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, PackageCheck, Building2, UserCircle2, 
  PlusCircle, Trash2, X, PenTool, ShieldCheck, Truck, ClipboardList,
  ChevronDown, Check, LayoutTemplate, Edit3, Eye, ImagePlus, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor Tanda Terima...</div>}>
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
    if(data.items.length > 1) {
        const newItems = [...data.items];
        newItems.splice(idx, 1);
        setData({ ...data, items: newItems });
    }
  };
  const updateItem = (idx: number, field: keyof ReceiptItem, val: string) => {
    const newItems = [...data.items];
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset semua data tanda terima?')) {
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
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-sans' : 'font-serif text-[11pt]'}`}>
        
        {/* HEADER / KOP */}
        <div className="flex justify-between items-start border-b-4 border-slate-900 pb-6 mb-8 shrink-0">
          <div className="flex gap-6">
            {logo ? (
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
            ) : (
              <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                  <Building2 size={32} />
              </div>
            )}
            <div className="flex-grow text-left">
              <h1 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2 text-blue-900 print:text-black">{data.senderName}</h1>
              <p className="text-[9pt] text-slate-500 italic leading-tight print:text-black max-w-[400px]">{data.senderAddress}</p>
              <p className="text-[9pt] font-bold text-slate-400 mt-1 print:text-black uppercase tracking-widest">Phone: {data.senderPhone}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-900 mb-1">TANDA TERIMA</h2>
            <div className="bg-slate-900 text-white px-3 py-1 text-[9pt] font-mono font-bold print:border print:border-black print:text-black print:bg-transparent">
                No: {data.docNo}
            </div>
          </div>
        </div>

        {/* INFO PIHAK */}
        <div className="grid grid-cols-2 gap-10 mb-8 text-[10pt] shrink-0 font-sans">
           <div className="space-y-1 text-left border-l-4 border-blue-600 pl-4 py-1">
              <p className="font-black text-[8px] text-slate-300 uppercase tracking-widest mb-1">Ditujukan Kepada / Penerima:</p>
              <p className="font-black text-[12pt] uppercase text-slate-900 leading-tight">{data.receiverName}</p>
              <p className="italic text-slate-600 print:text-black leading-snug text-[9.5pt]">"{data.receiverAddress}"</p>
              <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-tighter">HP: {data.receiverPhone}</p>
           </div>
           <div className="space-y-1 text-right flex flex-col justify-center">
              <p className="font-black text-[8px] text-slate-300 uppercase tracking-widest mb-1">Informasi Logistik:</p>
              <p className="text-[11pt] font-medium">Tanggal: <strong>{formatDateSafe(data.date)}</strong></p>
              <p className="text-[10pt] uppercase tracking-widest text-slate-400 font-bold">{data.city}, Indonesia</p>
           </div>
        </div>

        {/* TABEL BARANG */}
        <div className="overflow-visible text-left flex-grow">
          <table className="w-full border-collapse border-2 border-slate-900 text-[10pt]">
             <thead className="bg-slate-900 text-white uppercase font-black text-[8pt] tracking-widest print:bg-slate-50 print:text-black print:border-b-2">
               <tr>
                   <th className="border border-slate-700 p-3 w-12 text-center print:border-black">NO</th>
                   <th className="border border-slate-700 p-3 text-left px-4 print:border-black">DESKRIPSI / NAMA BARANG</th>
                   <th className="border border-slate-700 p-3 w-20 text-center print:border-black">QTY</th>
                   <th className="border border-slate-700 p-3 w-24 text-center print:border-black">SATUAN</th>
                   <th className="border border-slate-700 p-3 text-left px-4 print:border-black">KETERANGAN</th>
               </tr>
             </thead>
             <tbody>
               {data.items.map((item, i) => (
                   <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50 print:bg-transparent'}>
                      <td className="border border-slate-200 p-3 text-center print:border-black font-bold">{i + 1}</td>
                      <td className="border border-slate-200 p-3 px-4 font-black uppercase text-slate-900 print:border-black">{item.name || '...'}</td>
                      <td className="border border-slate-200 p-3 text-center font-bold text-blue-700 print:text-black print:border-black">{item.qty || '0'}</td>
                      <td className="border border-slate-200 p-3 text-center uppercase text-[8pt] font-black print:border-black">{item.unit || '-'}</td>
                      <td className="border border-slate-200 p-3 px-4 italic text-slate-600 text-[9pt] print:border-black">{item.note}</td>
                   </tr>
               ))}
               {/* Filler Rows agar tabel terlihat penuh profesional */}
               {[...Array(Math.max(1, 12 - data.items.length))].map((_, i) => (
                  <tr key={i} className="h-10"><td className="border border-slate-100 print:border-black" colSpan={5}></td></tr>
               ))}
             </tbody>
          </table>
          <div className="mt-4 flex justify-between items-start">
            <p className="text-[7.5pt] italic text-slate-400 print:text-black leading-tight max-w-[400px]">
                * Periksa kembali barang sebelum menandatangi surat ini. Barang yang sudah diterima dalam kondisi baik tidak dapat dikembalikan / ditukar kecuali ada perjanjian tertulis sebelumnya.
            </p>
            <div className="text-[9pt] font-black uppercase tracking-widest text-slate-300">Logistic Copy</div>
          </div>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-8 pt-6 border-t-2 border-slate-100 print:border-slate-900 break-inside-avoid">
          <table className="w-full table-fixed text-[10pt] text-center font-sans">
            <tbody>
              <tr className="font-black text-[8pt] text-slate-300 uppercase tracking-[0.3em] print:text-black">
                <td className="pb-4">Hormat Kami,</td>
                <td className="pb-4">Petugas Pengantar,</td>
                <td className="pb-4">Pihak Penerima,</td>
              </tr>
              <tr className="h-28">
                <td className="align-bottom italic text-slate-300 text-[7pt] pb-2 print:text-black opacity-30">Stamp Here / Stempel PT</td>
                <td></td>
                <td></td>
              </tr>
              <tr className="font-black underline uppercase text-slate-900">
                <td>{data.senderName.split(' ')[0]} Admin</td>
                <td>({data.delivererName})</td>
                <td>({data.receiverSignName})</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <PackageCheck size={16} /> <span>Receipt Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-widest border border-slate-700">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden p-1">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Tanda Terima</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Pengirim</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} placeholder="Nama PT/Toko" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderAddress} onChange={e => handleDataChange('senderAddress', e.target.value)} placeholder="Alamat Pengirim" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Penerima</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} placeholder="Nama Penerima" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.receiverPhone} onChange={e => handleDataChange('receiverPhone', e.target.value)} placeholder="Nomor HP" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} placeholder="Alamat Tujuan / Proyek" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-2"><ClipboardList size={12}/> Daftar Barang</h3>
                    <button onClick={addItem} className="bg-amber-100 text-amber-700 p-1 px-3 rounded-lg text-[10px] font-black hover:bg-amber-600 hover:text-white transition-all">+ ITEM</button>
                 </div>
                 <div className="space-y-4">
                    {data.items.map((item, idx) => (
                       <div key={idx} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 relative group space-y-3">
                          <button onClick={() => removeItem(idx)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                          <input className="w-full p-2 bg-white border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} placeholder="Nama Item" />
                          <div className="grid grid-cols-3 gap-2">
                             <input className="p-2 bg-white border rounded-lg text-xs text-center font-black" value={item.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} placeholder="Qty" />
                             <input className="p-2 bg-white border rounded-lg text-xs text-center uppercase" value={item.unit} onChange={e => updateItem(idx, 'unit', e.target.value)} placeholder="Unit" />
                             <input className="p-2 bg-white border rounded-lg text-[10px]" value={item.note} onChange={e => updateItem(idx, 'note', e.target.value)} placeholder="Note" />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Truck size={12}/> Otorisasi Akhir</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.delivererName} onChange={e => handleDataChange('delivererName', e.target.value)} placeholder="Nama Pengantar" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.receiverSignName} onChange={e => handleDataChange('receiverSignName', e.target.value)} placeholder="Nama Penerima (TTD)" />
                 </div>
                 <div className="space-y-1 pt-2">
                    <label className="text-[9px] font-bold text-slate-400">TGL PENYERAHAN</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}