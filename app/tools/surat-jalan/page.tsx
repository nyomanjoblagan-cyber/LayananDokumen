'use client';

/**
 * FILE: DeliveryOrderPage.tsx
 * STATUS: FINAL & FIXED (Full consistency)
 * DESC: Generator Surat Jalan / Delivery Order Logistik
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Truck, Building2, User, Package, MapPin, ChevronDown, Check, Edit3, Eye, ImagePlus, X, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface DeliveryItem {
  id: number;
  name: string;
  qty: number;
  unit: string;
  remarks: string;
}

interface DOData {
  no: string;
  date: string;
  refPo: string;
  senderName: string;
  senderInfo: string;
  receiverName: string;
  receiverContact: string;
  receiverAddress: string;
  driverName: string;
  vehicleNo: string;
  expedition: string;
  items: DeliveryItem[];
  notes: string;
  signerWarehouse: string;
  signerDriver: string;
  signerReceiver: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DOData = {
  no: `DO/2026/001`,
  date: '', 
  refPo: 'PO-2026-001',
  senderName: 'PT. LOGISTIK MAJU JAYA',
  senderInfo: 'Kawasan Industri Pulogadung Blok A3\nJakarta Timur | Telp: 021-460-1234',
  receiverName: 'TOKO BANGUNAN SEJAHTERA',
  receiverContact: 'Bpk. Herman',
  receiverAddress: 'Jl. Raya Bogor KM 28, Cibinong\nJawa Barat',
  driverName: 'Asep Sunandar',
  vehicleNo: 'B 9876 TXT',
  expedition: 'Armada Sendiri (Truck Engkel)',
  items: [
    { id: 1, name: 'Semen Tiga Roda (50kg)', qty: 100, unit: 'Sak', remarks: 'Segel Utuh' },
    { id: 2, name: 'Cat Tembok Putih (25kg)', qty: 20, unit: 'Pail', remarks: '' },
  ],
  notes: '1. Barang harus diperiksa saat penerimaan.\n2. Komplain setelah supir meninggalkan lokasi tidak dilayani.',
  signerWarehouse: 'Admin Gudang',
  signerDriver: 'Supir / Kurir',
  signerReceiver: 'Penerima Barang'
};

export default function DeliveryOrderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Sistem Logistik...</div>}>
      <DOToolBuilder />
    </Suspense>
  );
}

function DOToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<DOData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof DOData, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (idx: number, field: keyof DeliveryItem, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };

  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), name: '', qty: 1, unit: 'Pcs', remarks: '' }] });
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };

  const handleReset = () => {
    if(confirm('Reset semua data surat jalan?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? "Format Gudang" : "Modern Delivery";

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* HEADER */}
      <div className="flex justify-between items-start border-b-4 border-double border-slate-900 pb-4 mb-6 shrink-0">
        <div className="flex items-center gap-4">
           {logo ? (
              <img src={logo} alt="Logo" className="w-16 h-16 object-contain shrink-0 block print:block" />
           ) : (
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0 print:hidden">
                 <Truck size={32} />
              </div>
           )}
           <div className="text-left">
              <h1 className="text-[14pt] font-black uppercase leading-none print:text-black">{data.senderName}</h1>
              <p className="text-[8pt] font-sans mt-1 text-slate-600 print:text-black italic whitespace-pre-line leading-tight">{data.senderInfo}</p>
           </div>
        </div>
        <div className="text-right">
           <h2 className="text-xl font-black uppercase tracking-widest border-2 border-black px-4 py-1 inline-block mb-1">SURAT JALAN</h2>
           <div className="text-[9pt] font-sans font-bold">No: {data.no}</div>
           <div className="text-[8pt] font-sans">Tanggal: {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'medium'}) : ''}</div>
        </div>
      </div>

      {/* METADATA BAR */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-[9pt] text-left shrink-0">
        <div className="border border-black p-3 bg-slate-50 print:bg-transparent">
            <p className="font-black text-blue-800 print:text-black uppercase border-b border-black mb-2 pb-1 text-[8pt]">Kirim Ke / Ship To:</p>
            <p className="font-bold text-[10pt] uppercase">{data.receiverName}</p>
            <p className="font-medium">{data.receiverContact}</p>
            <p className="whitespace-pre-line mt-1 leading-tight">{data.receiverAddress}</p>
        </div>
        <div className="border border-black p-3">
            <p className="font-black uppercase border-b border-black mb-2 pb-1 text-[8pt]">Transport & Ref:</p>
            <div className="grid grid-cols-[80px_10px_1fr]"><span>Supir</span><span>:</span><span className="font-bold">{data.driverName}</span></div>
            <div className="grid grid-cols-[80px_10px_1fr]"><span>No. Polisi</span><span>:</span><span className="font-bold uppercase">{data.vehicleNo}</span></div>
            <div className="grid grid-cols-[80px_10px_1fr]"><span>Via</span><span>:</span><span>{data.expedition}</span></div>
            <div className="grid grid-cols-[80px_10px_1fr]"><span>Ref PO</span><span>:</span><span className="font-bold">{data.refPo}</span></div>
        </div>
      </div>

      {/* ITEM TABLE */}
      <div className="overflow-visible">
        <table className="w-full border-collapse border border-black text-[9.5pt]">
            <thead>
                <tr className="bg-slate-100 print:bg-slate-50 text-center font-bold">
                    <th className="border border-black py-2 w-10">No</th>
                    <th className="border border-black py-2 text-left px-3">Nama Barang / Deskripsi</th>
                    <th className="border border-black py-2 w-20">Qty</th>
                    <th className="border border-black py-2 w-20">Satuan</th>
                    <th className="border border-black py-2 w-32">Keterangan</th>
                </tr>
            </thead>
            <tbody>
                {data.items.map((item, idx) => (
                    <tr key={item.id}>
                        <td className="border border-black py-2 text-center">{idx + 1}</td>
                        <td className="border border-black py-2 px-3 font-medium">{item.name}</td>
                        <td className="border border-black py-2 text-center font-bold">{item.qty}</td>
                        <td className="border border-black py-2 text-center uppercase text-[8pt]">{item.unit}</td>
                        <td className="border border-black py-2 px-3 italic text-[8.5pt]">{item.remarks}</td>
                    </tr>
                ))}
                {/* Filler Rows to Maintain Height */}
                {[...Array(Math.max(1, 10 - data.items.length))].map((_, i) => (
                    <tr key={i} className="h-8">
                        <td className="border border-black"></td><td className="border border-black"></td>
                        <td className="border border-black"></td><td className="border border-black"></td>
                        <td className="border border-black"></td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* FOOTER & TANDA TANGAN */}
      <div className="mt-auto pt-6">
        <div className="border border-black p-2 text-[8.5pt] mb-6 text-left">
            <span className="font-bold underline uppercase">Catatan:</span>
            <p className="whitespace-pre-line italic mt-1 leading-tight">{data.notes}</p>
        </div>
        
        <div className="grid grid-cols-3 border border-black text-center text-[9pt]">
            <div className="border-r border-black p-2 h-32 flex flex-col">
                <p className="font-bold mb-1 uppercase tracking-tighter">{data.signerWarehouse}</p>
                <div className="mt-auto">( ............................ )</div>
            </div>
            <div className="border-r border-black p-2 h-32 flex flex-col">
                <p className="font-bold mb-1 uppercase tracking-tighter">{data.signerDriver}</p>
                <div className="mt-auto">( ............................ )</div>
            </div>
            <div className="p-2 h-32 flex flex-col">
                <p className="font-bold mb-1 uppercase tracking-tighter">{data.signerReceiver}</p>
                <div className="mt-auto">( ............................ )</div>
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
               <Truck size={16} /> <span>Delivery Order Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans p-1">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print DO</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="flex justify-between items-center border-b pb-2 text-left">
                <h2 className="font-bold text-slate-700 uppercase text-xs tracking-widest flex items-center gap-2"><Edit3 size={16}/> Editor Surat Jalan</h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors"><RotateCcw size={16}/></button>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Info Pengirim</h3>
              <div className="flex items-center gap-4">
                 <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden shrink-0">
                    {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={20} className="text-slate-300" />}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                 </div>
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} placeholder="Nama Perusahaan" />
              </div>
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.senderInfo} onChange={e => handleDataChange('senderInfo', e.target.value)} placeholder="Alamat & Kontak Pengirim" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Package size={12}/> Daftar Barang</h3>
              <div className="space-y-2">
                {data.items.map((item, idx) => (
                    <div key={item.id} className="flex gap-2 items-center bg-slate-50 p-2 rounded border group">
                        <input className="flex-1 p-1 bg-transparent text-xs border-b outline-none" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} placeholder="Nama Barang" />
                        <input className="w-10 p-1 bg-white border rounded text-xs text-center" type="number" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                        <button onClick={() => removeItem(idx)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                    </div>
                ))}
              </div>
              <button onClick={addItem} className="w-full py-2 border-2 border-dashed rounded-lg text-blue-600 font-bold hover:bg-blue-50 text-[10px] uppercase">+ Tambah Barang</button>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Truck size={12}/> Logistik & Penerima</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} placeholder="Penerima" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} placeholder="Alamat Tujuan" />
              <div className="grid grid-cols-2 gap-2">
                <input className="p-2 border rounded text-xs" value={data.driverName} onChange={e => handleDataChange('driverName', e.target.value)} placeholder="Supir" />
                <input className="p-2 border rounded text-xs uppercase" value={data.vehicleNo} onChange={e => handleDataChange('vehicleNo', e.target.value)} placeholder="No. Polisi" />
              </div>
              <input className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No. Surat Jalan" />
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <DocumentContent />
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden"><DocumentContent /></div>
    </div>
  );
}
