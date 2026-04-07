'use client';

/**
 * FILE: IzinBarangPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Izin Keluar/Masuk Barang (Gate Pass)
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Truck, UserCircle2, Package, ClipboardList, Plus, Trash2,
  Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI (Pastikan path ini benar di projek Anda)
import DocumentServices from '@/components/DocumentServices';

// --- 1. TYPE DEFINITIONS ---
interface Item {
  name: string;
  qty: string;
  unit: string;
  note: string;
}

interface GatePassData {
  city: string;
  date: string;
  type: string; // KELUAR atau MASUK
  noSurat: string;
  carrierName: string;
  carrierPhone: string;
  vehicleNo: string;
  companyOrigin: string;
  items: Item[];
  destination: string;
  authorizedBy: string;
  authorizedJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: GatePassData = {
  city: 'JAKARTA',
  date: '', 
  type: 'KELUAR',
  noSurat: 'SKMB/001/I/2026',
  carrierName: 'BUDI SETIADI',
  carrierPhone: '0812-7788-9900',
  vehicleNo: 'B 1234 ABC',
  companyOrigin: 'PT. LOGISTIK JAYA',
  items: [
    { name: 'Laptop MacBook Pro 14"', qty: '2', unit: 'Unit', note: 'Perbaikan' },
    { name: 'Monitor LG 24"', qty: '5', unit: 'Unit', note: 'Mutasi Kantor' },
  ],
  destination: 'Gudang Cabang Bekasi',
  authorizedBy: 'SURYONO M.S.',
  authorizedJob: 'Head of Security / Ops'
};

export default function IzinBarangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <IzinBarangBuilder />
    </Suspense>
  );
}

function IzinBarangBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<GatePassData>(INITIAL_DATA);
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof GatePassData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const addItem = () => {
    setData(prev => ({ ...prev, items: [...prev.items, { name: '', qty: '', unit: '', note: '' }] }));
  };
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleItemChange = (idx: number, field: keyof Item, val: string) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Formal (Gate Pass)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Simpel (Surat Jalan)
        </button>
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle:'full'});
    };

    return (
      <div className="bg-white mx-auto flex flex-col box-border font-sans text-slate-900 p-[20mm] print:p-0" 
           style={{ width: '210mm', minHeight: '296mm' }}>
        
        {templateId === 1 && (
          <div className="flex flex-col h-full">
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-8">
                  <div>
                      <h1 className="text-xl font-black uppercase tracking-tighter italic">Layanan<span className="text-emerald-600">Dokumen</span></h1>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Logistics & Gate Pass Division</p>
                  </div>
                  <div className="text-right">
                      <div className={`px-4 py-1 rounded text-white font-black text-sm mb-1 ${data.type === 'KELUAR' ? 'bg-red-600 print:text-black print:border print:border-black' : 'bg-emerald-600 print:text-black print:border print:border-black'}`}>
                          IZIN {data.type} BARANG
                      </div>
                      <p className="text-[10pt] font-mono font-bold">No: {data.noSurat}</p>
                  </div>
              </div>

              <div className="space-y-6 flex-grow">
                  <div className="grid grid-cols-2 gap-8 text-[10pt]">
                      <div className="space-y-2">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase border-b pb-1">Detail Pembawa</h4>
                          <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.carrierName}</span></div>
                          <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Kendaraan</span><span>:</span><span className="font-mono">{data.vehicleNo}</span></div>
                          <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Asal/PT</span><span>:</span><span>{data.companyOrigin}</span></div>
                      </div>
                      <div className="space-y-2">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase border-b pb-1">Waktu & Tujuan</h4>
                          <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Tanggal</span><span>:</span><span>{formatDateSafe(data.date)}</span></div>
                          <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Lokasi</span><span>:</span><span>{data.city}</span></div>
                          <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Tujuan</span><span>:</span><span>{data.destination}</span></div>
                      </div>
                  </div>

                  <div className="mt-8">
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
                                  <tr key={idx} className="border-b border-slate-200 break-inside-avoid">
                                      <td className="p-2 text-center">{idx + 1}</td>
                                      <td className="p-2 font-bold uppercase">{item.name}</td>
                                      <td className="p-2 text-center">{item.qty}</td>
                                      <td className="p-2 text-center uppercase text-xs">{item.unit}</td>
                                      <td className="p-2 italic text-slate-600 text-sm">{item.note}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>

                  <div className="mt-6 bg-slate-50 p-4 border border-dashed border-slate-300 rounded text-xs text-slate-500 italic text-justify break-inside-avoid">
                      "Dengan ini menyatakan bahwa barang-barang tersebut di atas telah diperiksa dan diizinkan untuk {data.type === 'KELUAR' ? 'dikeluarkan dari' : 'masuk ke'} area perusahaan/instansi."
                  </div>
              </div>

              <div className="shrink-0 mt-12 break-inside-avoid">
                  <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-20">
                          <p className="text-xs font-black uppercase border-b pb-1">Pembawa</p>
                          <p className="text-sm font-bold underline uppercase">{data.carrierName}</p>
                      </div>
                      <div className="space-y-20">
                          <p className="text-xs font-black uppercase border-b pb-1">Security</p>
                          <p className="text-sm font-bold text-slate-300">( ............................ )</p>
                      </div>
                      <div className="space-y-20">
                          <p className="text-xs font-black uppercase border-b pb-1">Pemberi Izin</p>
                          <div className="relative">
                              <p className="text-sm font-bold underline uppercase">{data.authorizedBy}</p>
                              <p className="text-[9px] text-slate-500 uppercase">{data.authorizedJob}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )}

        {templateId === 2 && (
          <div className="flex flex-col h-full font-serif text-black">
              <div className="text-center border-b-4 border-double border-black pb-4 mb-6">
                 <h1 className="text-2xl font-bold uppercase tracking-widest">SURAT JALAN</h1>
                 <p className="text-sm">NO: {data.noSurat}</p>
              </div>

              <div className="flex justify-between items-start mb-6 text-sm">
                 <div className="w-1/2">
                    <p>Kepada Yth,</p>
                    <p className="font-bold uppercase">{data.destination}</p>
                    <p>{data.city}</p>
                 </div>
                 <div className="w-1/2 text-right">
                    <p>Tanggal: {formatDateSafe(data.date)}</p>
                    <p>Kendaraan: <strong>{data.vehicleNo}</strong></p>
                 </div>
              </div>

              <table className="w-full border-collapse border border-black text-sm mb-6">
                 <thead>
                    <tr className="bg-slate-200">
                       <th className="border border-black p-2 text-center w-10">No</th>
                       <th className="border border-black p-2 text-left">Nama Barang</th>
                       <th className="border border-black p-2 text-center w-20">Banyaknya</th>
                    </tr>
                 </thead>
                 <tbody>
                    {data.items.map((item, idx) => (
                       <tr key={idx} className="break-inside-avoid">
                          <td className="border border-black p-2 text-center">{idx + 1}</td>
                          <td className="border border-black p-2 font-bold uppercase">{item.name}</td>
                          <td className="border border-black p-2 text-center">{item.qty} {item.unit}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>

              <div className="mt-auto flex justify-between text-center text-sm break-inside-avoid">
                 <div className="w-40"><p className="mb-16">Penerima,</p><p>( ............ )</p></div>
                 <div className="w-40"><p className="mb-16">Sopir,</p><p className="font-bold underline">{data.carrierName}</p></div>
                 <div className="w-40"><p className="mb-16">Hormat Kami,</p><p className="font-bold underline">{data.authorizedBy}</p></div>
              </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 shrink-0 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
             <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2">
                <ArrowLeftCircle size={20} className="text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
             </Link>
             <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
             <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
                <Truck size={16} /> <span className="uppercase tracking-widest">Gate Pass Creator</span>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                  <LayoutTemplate size={14} className="text-blue-400" /> {templateId === 1 ? 'Formal' : 'Simpel'} <ChevronDown size={12} />
                </button>
                {showTemplateMenu && <TemplateMenu />}
             </div>
             <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95">
                <Printer size={16}/> Cetak
             </button>
          </div>
      </div>

      <main className="max-w-[1600px] mx-auto p-4 flex flex-col md:flex-row gap-6 h-[calc(100vh-64px)] overflow-hidden relative">
        {/* EDITOR */}
        <div className={`no-print w-full md:w-[450px] bg-white rounded-xl border flex flex-col h-full transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-xl">
                <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors"><RotateCcw size={16}/></button>
            </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 md:pb-10">
              <div className="bg-slate-50 p-2 rounded-xl grid grid-cols-2 gap-2 border">
                  <button onClick={() => handleDataChange('type', 'KELUAR')} className={`py-2 rounded-lg text-[10px] font-bold ${data.type === 'KELUAR' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-slate-400'}`}>KELUAR</button>
                  <button onClick={() => handleDataChange('type', 'MASUK')} className={`py-2 rounded-lg text-[10px] font-bold ${data.type === 'MASUK' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-400'}`}>MASUK</button>
              </div>

              <div className="space-y-4">
                  <input className="w-full p-2.5 border rounded-lg text-sm font-bold uppercase" value={data.carrierName} onChange={e => handleDataChange('carrierName', e.target.value)} placeholder="Nama Pembawa" />
                  <div className="grid grid-cols-2 gap-3">
                      <input className="w-full p-2.5 border rounded-lg text-xs" value={data.vehicleNo} onChange={e => handleDataChange('vehicleNo', e.target.value)} placeholder="No. Polisi" />
                      <input className="w-full p-2.5 border rounded-lg text-xs" value={data.companyOrigin} onChange={e => handleDataChange('companyOrigin', e.target.value)} placeholder="Asal Perusahaan" />
                  </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                 <div className="flex justify-between items-center"><label className="text-[10px] font-black uppercase text-slate-400">Daftar Barang</label><button onClick={addItem} className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">+ TAMBAH</button></div>
                 {data.items.map((item, idx) => (
                   <div key={idx} className="bg-slate-50 p-3 rounded-lg border relative group animate-in slide-in-from-right-2">
                      <input className="w-full p-1 bg-transparent border-b border-slate-200 mb-2 text-xs font-bold uppercase focus:ring-0 outline-none" placeholder="Nama Barang..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                        <input className="w-full p-2 bg-white border rounded text-xs" placeholder="Qty (cth: 10)" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                        <input className="w-full p-2 bg-white border rounded text-xs" placeholder="Satuan (cth: Dus)" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                      </div>
                      <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"><Trash2 size={12}/></button>
                   </div>
                 ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                 <input className="w-full p-2.5 border rounded-lg text-sm" value={data.destination} onChange={e => handleDataChange('destination', e.target.value)} placeholder="Tujuan Barang" />
                 <input className="w-full p-2.5 border rounded-lg text-sm font-bold uppercase" value={data.authorizedBy} onChange={e => handleDataChange('authorizedBy', e.target.value)} placeholder="Nama Penanggung Jawab" />
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
           <div className="origin-top transition-transform duration-300 transform scale-[0.35] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-120%] sm:mb-[-100mm] md:mb-[-40mm] lg:mb-[-10mm] xl:mb-10 mt-2 xl:mt-0 shadow-2xl shrink-0">
                <DocumentContent />
           </div>
        </div>

        <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden">
         <DocumentContent />
      </div>
    </div>
  );
}