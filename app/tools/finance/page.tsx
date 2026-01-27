'use client';

/**
 * FILE: FinancePage.tsx
 * STATUS: FULL VERSION - ANTI SHADOW PRINT
 */

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  User, CreditCard, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. HELPER: TERBILANG ---
const terbilang = (angka: number): string => {
  const bil = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  if (angka < 12) return " " + bil[angka];
  if (angka < 20) return terbilang(angka - 10) + " Belas";
  if (angka < 100) return terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
  if (angka < 200) return " Seratus" + terbilang(angka - 100);
  if (angka < 1000) return terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
  if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
  if (angka < 1000000000) return terbilang(Math.floor(angka / 1000000)) + " Juta" + terbilang(angka % 1000000);
  return "";
};

// --- 2. TYPE DEFINITIONS ---
interface Item {
  id: number;
  name: string;
  qty: number;
  price: number;
}

interface FinanceData {
  no: string;
  date: string;
  senderName: string;
  senderInfo: string;
  receiverName: string;
  receiverInfo: string;
  items: Item[];
  notes: string;
  city: string;
  signer: string;
  footerNote: string;
}

// --- 3. DATA DEFAULT ---
const INITIAL_DATA: FinanceData = {
  no: 'INV/2026/001',
  date: '', 
  senderName: 'BORCELLE FOOD',
  senderInfo: 'Jl. Raya Merdeka No. 45, Jakarta Selatan\nWhatsApp: 0812-3456-7890',
  receiverName: 'PT. Teknologi Maju',
  receiverInfo: 'Gedung Menara 1, Lt. 5\nJl. Sudirman, Jakarta',
  items: [
    { id: 1, name: 'Jasa Katering (Paket Premium)', qty: 50, price: 50000 },
    { id: 2, name: 'Biaya Layanan & Pengiriman', qty: 1, price: 150000 },
  ],
  notes: 'Mohon transfer ke BCA 123-456-789 a.n Borcelle Food.',
  city: 'DENPASAR',
  signer: 'Manager Keuangan',
  footerNote: 'Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.'
};

export default function FinancePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Studio Dokumen...</div>}>
      <FinanceToolBuilder />
    </Suspense>
  );
}

function FinanceToolBuilder() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode'); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeDocType, setActiveDocType] = useState<'invoice' | 'nota' | 'kuitansi'>('invoice');
  const [mobileMode, setMobileMode] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<FinanceData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));

    if (modeParam === 'nota') setActiveDocType('nota');
    else if (modeParam === 'kwitansi' || modeParam === 'kuitansi') setActiveDocType('kuitansi');
    else setActiveDocType('invoice');
    
    setTemplateId(1); 
  }, [modeParam]);

  const total = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const terbilangText = total > 0 ? `${terbilang(total)} Rupiah` : 'Nol Rupiah';

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };
  
  const handleItemChange = (idx: number, field: keyof Item, val: any) => {
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

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  const TEMPLATES = {
    invoice: [ { id: 1, name: "Formal Korporat", desc: "Header biru tegas" }, { id: 2, name: "Standar Profesional", desc: "Desain minimalis bersih" } ],
    nota: [ { id: 1, name: "Nota Toko (Ritel)", desc: "Grid garis klasik penuh" }, { id: 2, name: "Nota Jasa (Service)", desc: "Tampilan ringkas tanpa grid" } ],
    kuitansi: [ { id: 1, name: "Kuitansi Modern", desc: "Format vertikal elegan" }, { id: 2, name: "Kuitansi Dinas", desc: "Format buku cek klasik" } ]
  };

  // @ts-ignore
  const currentTemplates = TEMPLATES[activeDocType] || TEMPLATES['invoice'];
  const activeTemplateName = currentTemplates.find((t: any) => t.id === templateId)?.name;

  const getPaperDimensions = () => {
    if (activeDocType === 'nota') return { w: '105mm', h: '148mm' };
    if (activeDocType === 'kuitansi') return { w: '210mm', h: '99mm' };
    return { w: '210mm', h: '297mm' };
  };
  const dims = getPaperDimensions();

  const DocumentContent = () => (
    <div className="bg-white print:shadow-none print:border-none shadow-2xl mx-auto overflow-hidden relative border border-slate-200" style={{ width: dims.w, minHeight: dims.h }}>
      
      {/* 1. INVOICE */}
      {activeDocType === 'invoice' && (
          <div className="h-full flex flex-col text-[#1e293b] p-[10mm] md:p-[15mm]">
            <div className="flex justify-between items-start mb-10">
              <div className="w-[60%]">
                  <h1 className="text-4xl font-extrabold text-[#1e40af] tracking-tight mb-2">INVOICE</h1>
                  <div className="text-xs text-slate-500">
                    <p className="font-bold text-slate-700">No: {data.no}</p>
                    <p className="font-bold text-slate-700">Tgl: {data.date}</p>
                  </div>
              </div>
              <div className="w-[40%] text-right">
                  {logo && <img src={logo} className="h-16 w-auto object-contain mb-2 ml-auto" alt="logo" />}
                  <div className="font-bold text-lg text-slate-800">{data.senderName}</div>
                  <div className="text-xs text-slate-500 whitespace-pre-line">{data.senderInfo}</div>
              </div>
            </div>
            <div className="mb-8 p-4 bg-slate-50 print:bg-white border-l-4 border-blue-600 text-sm">
              <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Tagihan Kepada:</p>
              <div className="text-lg font-bold text-slate-800">{data.receiverName}</div>
              <div className="text-sm text-slate-500 whitespace-pre-line">{data.receiverInfo}</div>
            </div>
            <div className="mb-8">
              <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-blue-800 text-blue-800">
                        <th className="py-2 text-left">Deskripsi</th>
                        <th className="py-2 text-center w-16">Qty</th>
                        <th className="py-2 text-right w-32">Harga</th>
                        <th className="py-2 text-right w-32">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item) => (
                        <tr key={item.id} className="border-b border-slate-200 text-[13px]">
                          <td className="py-3 font-medium">{item.name}</td>
                          <td className="py-3 text-center">{item.qty}</td>
                          <td className="py-3 text-right">{item.price.toLocaleString()}</td>
                          <td className="py-3 text-right font-bold text-slate-700">{(item.qty * item.price).toLocaleString()}</td>
                        </tr>
                    ))}
                  </tbody>
              </table>
            </div>
            <div className="mt-auto">
              <div className="flex justify-end mb-10">
                  <div className="w-1/2 text-right border-t-2 border-slate-200 pt-2">
                    <span className="font-bold text-slate-600 mr-4">TOTAL</span>
                    <span className="font-bold text-2xl text-blue-800">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
              </div>
              <div className="flex justify-between items-end border-t border-slate-200 pt-6">
                  <div className="w-[60%] text-xs text-slate-500">
                    <p className="font-bold text-slate-700 uppercase mb-1">Catatan:</p>
                    <p className="whitespace-pre-line">{data.notes}</p>
                  </div>
                  <div className="text-center w-[30%]">
                    <p className="text-xs mb-16">{data.city}, {data.date}</p>
                    <p className="font-bold text-sm border-b border-slate-400 pb-1">{data.signer}</p>
                  </div>
              </div>
            </div>
          </div>
      )}

      {/* 2. NOTA */}
      {activeDocType === 'nota' && (
        <div className="h-full flex flex-col p-[5mm] md:p-[8mm]">
            <div className="flex gap-3 mb-4 border-b-[2px] border-[#658525] pb-3">
                <div className="w-10 h-10 shrink-0">
                  {logo ? <img src={logo} className="w-full h-full object-contain" alt="logo" /> : <div className="w-full h-full bg-[#8fab3a] rounded-full flex items-center justify-center text-white font-bold text-xs">LG</div>}
                </div>
                <div className="flex-1">
                  <div className="font-black text-sm text-[#4a6118] uppercase leading-none mb-1">{data.senderName}</div>
                  <div className="text-[8px] text-slate-500 whitespace-pre-line">{data.senderInfo}</div>
                </div>
            </div>
            <div className="flex justify-between items-end mb-2 text-[10px]">
                <div><span className="font-bold text-slate-700">Nota No.</span> <span className="font-mono">{data.no}</span></div>
                <div className="text-right space-y-1">
                  <div>Tgl: {data.date}</div>
                  <div>Kpd: <span className="font-bold">{data.receiverName}</span></div>
                </div>
            </div>
            <table className="w-full text-[9px] mb-2" style={{borderCollapse: 'collapse'}}>
                <thead className="bg-slate-100 print:bg-white">
                  <tr>
                      <th style={{border: '1px solid black', padding: '4px'}}>NO</th>
                      <th style={{border: '1px solid black', padding: '4px'}}>BARANG</th>
                      <th style={{border: '1px solid black', padding: '4px'}}>QTY</th>
                      <th style={{border: '1px solid black', padding: '4px'}}>HARGA</th>
                      <th style={{border: '1px solid black', padding: '4px'}}>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, idx) => (
                      <tr key={item.id}>
                        <td style={{border: '1px solid black', padding: '4px', textAlign: 'center'}}>{idx + 1}</td>
                        <td style={{border: '1px solid black', padding: '4px'}}>{item.name}</td>
                        <td style={{border: '1px solid black', padding: '4px', textAlign: 'center'}}>{item.qty}</td>
                        <td style={{border: '1px solid black', padding: '4px', textAlign: 'right'}}>{item.price.toLocaleString()}</td>
                        <td style={{border: '1px solid black', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>{(item.qty * item.price).toLocaleString()}</td>
                      </tr>
                  ))}
                </tbody>
            </table>
            <div className="flex justify-end mb-4">
                <div className="border border-black p-1 px-3 bg-slate-100 print:bg-white font-bold text-xs">
                  TOTAL: Rp {total.toLocaleString('id-ID')}
                </div>
            </div>
            <div className="mt-auto flex justify-between items-end text-[9px]">
                <div className="text-center"><p className="mb-8">Tanda Terima,</p><p>( ..................... )</p></div>
                <div className="text-center"><p className="mb-8">Hormat Kami,</p><p className="font-bold">{data.signer}</p></div>
            </div>
        </div>
      )}

      {/* 3. KUITANSI */}
      {activeDocType === 'kuitansi' && (
        <div className="h-full flex flex-col justify-center p-6 bg-[#fdfaf6] print:bg-white">
            <div className="border-2 border-slate-800 p-4 h-full flex flex-col relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black italic underline">KUITANSI</h2>
                    <div className="font-mono text-xs">No: {data.no}</div>
                </div>
                <div className="space-y-4 text-sm flex-1">
                    <div className="flex border-b border-dotted border-slate-400 pb-1">
                        <span className="w-32 shrink-0">Sudah Terima Dari:</span>
                        <span className="font-bold">{data.receiverName}</span>
                    </div>
                    <div className="flex border-b border-dotted border-slate-400 pb-1">
                        <span className="w-32 shrink-0">Banyaknya Uang:</span>
                        <span className="font-bold italic bg-slate-100 print:bg-white px-2"># {terbilangText} #</span>
                    </div>
                    <div className="flex border-b border-dotted border-slate-400 pb-1">
                        <span className="w-32 shrink-0">Untuk Pembayaran:</span>
                        <span>{data.items.map(i => i.name).join(', ')}</span>
                    </div>
                </div>
                <div className="flex justify-between items-end mt-6">
                    <div className="text-2xl font-black bg-slate-800 text-white print:text-black print:bg-transparent print:border-2 print:border-black px-6 py-2">
                        Rp {total.toLocaleString('id-ID')}
                    </div>
                    <div className="text-center">
                        <div className="text-xs mb-10">{data.city}, {data.date}</div>
                        <div className="font-bold underline">{data.signer}</div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800">
      <style jsx global>{`
        @media print {
            @page { size: A4; margin: 0; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; }
            #print-only-root { display: block !important; width: 100%; position: absolute; top: 0; left: 0; z-index: 9999; }
            .print-table { width: 100%; border-collapse: collapse; }
            .print-content-wrapper { padding: 0 15mm; }
            * { box-shadow: none !important; -webkit-print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <div className="flex bg-slate-800 p-1 rounded-lg">
              {['invoice', 'nota', 'kuitansi'].map((t) => (
                <button key={t} onClick={() => setActiveDocType(t as any)} className={`px-4 py-1 rounded text-[10px] font-bold uppercase ${activeDocType === t ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleReset} className="p-2 text-slate-400 hover:text-red-400"><RotateCcw size={18} /></button>
            <button onClick={() => window.print()} className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-bold text-xs flex items-center gap-2"><Printer size={16} /> PRINT</button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1600px] mx-auto p-6 flex flex-col md:flex-row gap-6 h-[calc(100vh-64px)] overflow-hidden">
        {/* INPUT SIDEBAR */}
        <div className="no-print w-full md:w-[400px] bg-white rounded-xl border p-4 overflow-y-auto space-y-6">
           <div className="space-y-4">
              <div className="w-16 h-16 rounded border-2 border-dashed flex items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                 {logo ? <img src={logo} className="w-full h-full object-contain" alt="logo" /> : <Upload size={20} className="text-slate-300" />}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
              <input type="text" className="w-full p-2 border rounded text-sm" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} placeholder="Nama Usaha" />
              <textarea className="w-full p-2 border rounded text-xs h-20" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} placeholder="Alamat & Kontak" />
              <div className="grid grid-cols-2 gap-2">
                 <input type="text" className="p-2 border rounded text-xs" value={data.no} onChange={e => setData({...data, no: e.target.value})} placeholder="Nomor" />
                 <input type="date" className="p-2 border rounded text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
              </div>
           </div>
           <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center"><label className="text-[10px] font-bold text-slate-500 uppercase">Item</label><button onClick={addItem} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">+ Tambah</button></div>
              {data.items.map((item, idx) => (
                 <div key={item.id} className="bg-slate-50 p-2 rounded border relative">
                    <input type="text" className="w-full bg-transparent border-b text-xs mb-2 outline-none" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} placeholder="Nama Barang..." />
                    <div className="flex gap-2">
                       <input type="number" className="w-12 p-1 border rounded text-xs" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                       <input type="number" className="flex-1 p-1 border rounded text-xs text-right" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                       <button onClick={() => removeItem(idx)} className="text-red-400"><Trash2 size={14} /></button>
                    </div>
                 </div>
              ))}
           </div>
           <div className="border-t pt-4 space-y-3">
              <input type="text" className="w-full p-2 border rounded text-sm" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} placeholder="Penerima" />
              <textarea className="w-full p-2 border rounded text-xs h-16" value={data.receiverInfo} onChange={e => setData({...data, receiverInfo: e.target.value})} placeholder="Alamat Penerima" />
              <div className="grid grid-cols-2 gap-2">
                 <input type="text" className="p-2 border rounded text-xs" value={data.city} onChange={e => setData({...data, city: e.target.value})} placeholder="Kota" />
                 <input type="text" className="p-2 border rounded text-xs" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} placeholder="Nama Penandatangan" />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="no-print flex-1 bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto">
          <div className="origin-top scale-[0.6] sm:scale-100"><DocumentContent /></div>
        </div>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><DocumentContent /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
