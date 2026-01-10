'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Truck, UserCircle2, Package, ClipboardList, Plus, Trash2,
  Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function IzinBarangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <IzinBarangBuilder />
    </Suspense>
  );
}

function IzinBarangBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: '', 
    
    // DETAIL IZIN
    type: 'KELUAR', // KELUAR atau MASUK
    noSurat: 'SKMB/001/I/2026',
    
    // PEMBAWA BARANG
    carrierName: 'BUDI SETIADI',
    carrierPhone: '0812-7788-9900',
    vehicleNo: 'B 1234 ABC',
    companyOrigin: 'PT. LOGISTIK JAYA',
    
    // DAFTAR BARANG
    items: [
      { name: 'Laptop MacBook Pro 14"', qty: '2', unit: 'Unit', note: 'Perbaikan' },
      { name: 'Monitor LG 24"', qty: '5', unit: 'Unit', note: 'Mutasi Kantor' },
    ],
    
    // LOKASI
    destination: 'Gudang Cabang Bekasi',
    authorizedBy: 'SURYONO M.S.',
    authorizedJob: 'Head of Security / Ops'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const addItem = () => setData({ ...data, items: [...data.items, { name: '', qty: '', unit: '', note: '' }] });
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };

  const handleItemChange = (idx: number, field: string, val: string) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };

  const TEMPLATES = [
    { id: 1, name: "Formal (Gate Pass)", desc: "Standar industri/kantor" },
    { id: 2, name: "Simpel (Surat Jalan)", desc: "Layout cepat & praktis" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] font-sans text-slate-900" 
         style={{ width: '210mm', minHeight: '296mm' }}>
        
        {/* KOP SURAT */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-8">
            <div>
                <h1 className="text-xl font-black uppercase tracking-tighter italic">Layanan<span className="text-emerald-600">Dokumen</span></h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Logistics & Gate Pass Division</p>
            </div>
            <div className="text-right">
                <div className={`px-4 py-1 rounded text-white font-black text-sm mb-1 ${data.type === 'KELUAR' ? 'bg-red-600' : 'bg-emerald-600'}`}>
                    IZIN {data.type} BARANG
                </div>
                <p className="text-[10pt] font-mono font-bold">No: {data.noSurat}</p>
            </div>
        </div>

        <div className="space-y-6 flex-grow">
            {/* META DATA */}
            <div className="grid grid-cols-2 gap-8 text-[10pt]">
                <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase border-b pb-1">Detail Pembawa</h4>
                    <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.carrierName}</span></div>
                    <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Kendaraan</span><span>:</span><span className="font-mono">{data.vehicleNo}</span></div>
                    <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Asal/PT</span><span>:</span><span>{data.companyOrigin}</span></div>
                </div>
                <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase border-b pb-1">Waktu & Tujuan</h4>
                    <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Tanggal</span><span>:</span><span>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'}) : '...'}</span></div>
                    <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Lokasi</span><span>:</span><span>{data.city}</span></div>
                    <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Tujuan</span><span>:</span><span>{data.destination}</span></div>
                </div>
            </div>

            {/* TABEL BARANG */}
            <div className="mt-8">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">Daftar Rincian Barang:</h4>
                <table className="w-full border-collapse text-[10pt]">
                    <thead>
                        <tr className="bg-slate-100 border-y-2 border-slate-900">
                            <th className="p-2 text-center text-xs w-12 font-black">NO</th>
                            <th className="p-2 text-left text-xs font-black">NAMA BARANG</th>
                            <th className="p-2 text-center text-xs w-20 font-black">QTY</th>
                            <th className="p-2 text-center text-xs w-24 font-black">SATUAN</th>
                            <th className="p-2 text-left text-xs font-black">KETERANGAN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, idx) => (
                            <tr key={idx} className="border-b border-slate-200">
                                <td className="p-2 text-center">{idx + 1}</td>
                                <td className="p-2 font-bold uppercase">{item.name}</td>
                                <td className="p-2 text-center">{item.qty}</td>
                                <td className="p-2 text-center uppercase text-xs">{item.unit}</td>
                                <td className="p-2 italic text-slate-600 text-sm">{item.note}</td>
                            </tr>
                        ))}
                        {/* Empty Rows Filler */}
                        {Array.from({ length: Math.max(0, 5 - data.items.length) }).map((_, i) => (
                             <tr key={`empty-${i}`} className="border-b border-slate-100 text-transparent select-none">
                                <td className="p-2">-</td><td className="p-2">-</td><td className="p-2">-</td><td className="p-2">-</td><td className="p-2">-</td>
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 bg-slate-50 p-4 border border-dashed border-slate-300 rounded text-xs text-slate-500 italic text-justify">
                "Dengan ini menyatakan bahwa barang-barang tersebut di atas telah diperiksa dan diizinkan untuk {data.type === 'KELUAR' ? 'dikeluarkan dari' : 'masuk ke'} area perusahaan/instansi. Petugas keamanan berhak melakukan pemeriksaan fisik ulang."
            </div>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-12" style={{ pageBreakInside: 'avoid' }}>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-20">
                    <p className="text-xs font-black uppercase border-b pb-1">Pembawa</p>
                    <p className="text-sm font-bold underline uppercase">{data.carrierName}</p>
                </div>
                <div className="space-y-20">
                    <p className="text-xs font-black uppercase border-b pb-1">Security (Check)</p>
                    <p className="text-sm font-bold text-slate-300">( ............................ )</p>
                </div>
                <div className="space-y-20">
                    <p className="text-xs font-black uppercase border-b pb-1">Pemberi Izin</p>
                    <div className="relative">
                        <p className="text-sm font-bold underline uppercase">{data.authorizedBy}</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-tight">{data.authorizedJob}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* GLOBAL CSS PRINT */}
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
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Truck size={16} /> <span>LOGISTICS PASS BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
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
        <div className={`no-print w-full md:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               {/* SECTION JENIS IZIN */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-emerald-600 tracking-widest"><Truck size={14}/> Jenis Izin</h3>
                  <div className="grid grid-cols-2 gap-2">
                     <button onClick={() => handleDataChange('type', 'KELUAR')} className={`py-2 rounded-lg text-xs font-bold transition-all ${data.type === 'KELUAR' ? 'bg-red-600 text-white shadow-md ring-2 ring-red-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>BARANG KELUAR</button>
                     <button onClick={() => handleDataChange('type', 'MASUK')} className={`py-2 rounded-lg text-xs font-bold transition-all ${data.type === 'MASUK' ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>BARANG MASUK</button>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-500">Nomor Surat</label>
                     <input className="w-full p-2 border rounded text-xs font-mono" value={data.noSurat} onChange={e => handleDataChange('noSurat', e.target.value)} />
                  </div>
               </div>

               {/* SECTION PEMBAWA */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><UserCircle2 size={14}/> Identitas Pembawa</h3>
                  <div className="space-y-2">
                     <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pembawa" value={data.carrierName} onChange={e => handleDataChange('carrierName', e.target.value)} />
                     <div className="grid grid-cols-2 gap-2">
                        <input className="w-full p-2 border rounded text-xs" placeholder="No. Kendaraan" value={data.vehicleNo} onChange={e => handleDataChange('vehicleNo', e.target.value)} />
                        <input className="w-full p-2 border rounded text-xs" placeholder="Instansi/PT" value={data.companyOrigin} onChange={e => handleDataChange('companyOrigin', e.target.value)} />
                     </div>
                  </div>
               </div>

               {/* SECTION BARANG */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                     <h3 className="text-[10px] font-black uppercase flex items-center gap-2 text-amber-600 tracking-widest"><Package size={14}/> Daftar Barang</h3>
                     <button onClick={addItem} className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold flex items-center gap-1 hover:bg-emerald-200 transition-colors"><Plus size={12}/> Tambah</button>
                  </div>
                  <div className="space-y-3">
                     {data.items.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative group hover:border-amber-300 transition-colors">
                           <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-white border border-red-200 text-red-500 rounded-full p-1 shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"><Trash2 size={12}/></button>
                           <input className="w-full p-1 bg-transparent border-b border-slate-200 focus:border-amber-400 outline-none mb-2 text-xs font-bold uppercase placeholder:font-normal" placeholder="Nama Barang..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                           <div className="grid grid-cols-[1fr_1fr_2fr] gap-2">
                              <input className="w-full p-1 bg-white border rounded text-[10px] text-center" placeholder="Qty" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                              <input className="w-full p-1 bg-white border rounded text-[10px] text-center uppercase" placeholder="Satuan" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                              <input className="w-full p-1 bg-white border rounded text-[10px]" placeholder="Keterangan" value={item.note} onChange={e => handleItemChange(idx, 'note', e.target.value)} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* SECTION OTORISASI */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-purple-600 tracking-widest"><ClipboardList size={14}/> Otorisasi</h3>
                  <div className="space-y-2">
                     <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pejabat Izin" value={data.authorizedBy} onChange={e => handleDataChange('authorizedBy', e.target.value)} />
                     <input className="w-full p-2 border rounded text-xs" placeholder="Jabatan" value={data.authorizedJob} onChange={e => handleDataChange('authorizedJob', e.target.value)} />
                     <div className="grid grid-cols-2 gap-2 pt-2">
                        <input className="w-full p-2 border rounded text-xs" placeholder="Kota" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                        <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                     </div>
                     <input className="w-full p-2 border rounded text-xs mt-2" placeholder="Tujuan / Gudang Tujuan" value={data.destination} onChange={e => handleDataChange('destination', e.target.value)} />
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 shadow-2xl flex flex-col items-center">
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
         <div style={{ width: '210mm', minHeight: 'auto' }} className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}