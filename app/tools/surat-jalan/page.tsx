'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Truck, Building2, User, Package, MapPin, ChevronDown, Check, Edit3, Eye, ImagePlus, X
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function DeliveryOrderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Sistem Logistik...</div>}>
      <DOToolBuilder />
    </Suspense>
  );
}

function DOToolBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `DO/2026/001`,
    date: '',
    refPo: 'PO-2026-001',
    senderName: 'PT. LOGISTIK MAJU JAYA',
    senderInfo: 'Kawasan Industri Pulogadung Blok A3\nJakarta Timur | Telp: 021-460-1234',
    receiverName: 'Toko Bangunan Sejahtera',
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

  const handleItemChange = (idx: number, field: string, val: any) => {
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

  const TEMPLATES = [
    { id: 1, name: "Format Gudang", desc: "Tabel tegas & kotak tanda tangan" },
    { id: 2, name: "Modern Delivery", desc: "Layout bersih untuk logistik corporate" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* HEADER SURAT */}
      <div className="flex justify-between items-start border-b-4 border-double border-slate-900 pb-4 mb-6 shrink-0">
        <div className="flex items-center gap-4">
           {logo ? (
              <img src={logo} alt="Logo" className="w-16 h-16 object-contain shrink-0" />
           ) : (
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0 no-print">
                 <Truck size={32} />
              </div>
           )}
           <div className="text-left">
              <h1 className="text-[14pt] font-black uppercase leading-none">{data.senderName}</h1>
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
      <div className="grid grid-cols-2 gap-4 mb-6 text-[9pt] text-left">
        <div className="border border-black p-3 bg-slate-50 print:bg-transparent">
            <p className="font-black text-blue-800 print:text-black uppercase border-b border-black mb-2 pb-1">Kirim Ke / Ship To:</p>
            <p className="font-bold text-[10pt] uppercase">{data.receiverName}</p>
            <p className="font-medium">{data.receiverContact}</p>
            <p className="whitespace-pre-line mt-1">{data.receiverAddress}</p>
        </div>
        <div className="border border-black p-3">
            <p className="font-black uppercase border-b border-black mb-2 pb-1">Transport & Ref:</p>
            <div className="grid grid-cols-[80px_10px_1fr]"><span>Supir</span><span>:</span><span className="font-bold">{data.driverName}</span></div>
            <div className="grid grid-cols-[80px_10px_1fr]"><span>No. Polisi</span><span>:</span><span className="font-bold uppercase">{data.vehicleNo}</span></div>
            <div className="grid grid-cols-[80px_10px_1fr]"><span>Via</span><span>:</span><span>{data.expedition}</span></div>
            <div className="grid grid-cols-[80px_10px_1fr]"><span>Ref PO</span><span>:</span><span className="font-bold">{data.refPo}</span></div>
        </div>
      </div>

      {/* ITEM TABLE */}
      <div className="flex-grow overflow-hidden">
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
                {/* Empty Filler Rows */}
                {[...Array(Math.max(1, 8 - data.items.length))].map((_, i) => (
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
      <div className="shrink-0 mt-6">
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
          .no-print, header, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV (SERAGAM) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Truck size={16} /> <span>Logistics DO Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative font-sans text-left">
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
              <Printer size={16} /> <span className="hidden md:inline">Print DO</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Info Gudang</h3>
              <div className="flex items-center gap-4">
                 {logo ? (
                    <div className="relative w-14 h-14 border rounded overflow-hidden group shrink-0">
                       <img src={logo} className="w-full h-full object-contain" />
                       <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                    </div>
                 ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-14 h-14 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 transition-all shrink-0"><ImagePlus size={20} /></button>
                 )}
                 <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} />
              </div>
              <input className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No. Surat Jalan" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left text-xs">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Package size={12}/> Barang Kiriman</h3>
              {data.items.map((item, idx) => (
                <div key={item.id} className="flex gap-2 items-center bg-slate-50 p-2 rounded border">
                   <input className="flex-1 p-1 bg-transparent border-b outline-none" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} placeholder="Nama Barang" />
                   <input className="w-12 p-1 bg-white border rounded text-center" type="number" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                   <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                </div>
              ))}
              <button onClick={addItem} className="w-full py-2 border-2 border-dashed rounded-lg text-blue-600 font-bold hover:bg-blue-50">+ Tambah Barang</button>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Truck size={12}/> Pengiriman</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} placeholder="Penerima" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.driverName} onChange={e => handleDataChange('driverName', e.target.value)} placeholder="Supir" />
                 <input className="w-full p-2 border rounded text-xs uppercase" value={data.vehicleNo} onChange={e => handleDataChange('vehicleNo', e.target.value)} placeholder="Plat Nomor" />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12 shadow-2xl">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV (SERAGAM) */}
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