'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  ShieldCheck, Building2, UserCircle2, CalendarDays, FileText, 
  Settings, Award, Clock, Edit3, Eye, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function SuratJaminanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Garansi...</div>}>
      <WarrantyBuilder />
    </Suspense>
  );
}

function WarrantyBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor'); // Logic Mobile Tab
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: '', // Hydration fix
    warrantyNo: 'GAR/2026/01/0045',
    
    // PENERBIT (VENDOR)
    vendorName: 'CV. TEKNO MANDIRI SEJAHTERA',
    vendorAddress: 'Ruko Permata Blok B2 No. 10, Jakarta Selatan',
    vendorPhone: '021-55566677',

    // PELANGGAN
    clientName: 'PT. SINAR JAYA ABADI',
    clientAddress: 'Jl. Sudirman Kav 45-46, Jakarta Pusat',
    
    // DETAIL BARANG/JASA
    productName: 'Unit Server Rackmount PowerEdge R750',
    serialNumber: 'SN-7890-XYZ-2026',
    purchaseDate: '', // Hydration fix
    
    // DETAIL GARANSI
    duration: '12 Bulan (1 Tahun)',
    coverage: 'Kerusakan pada komponen internal (Hardware) dan jasa perbaikan. Tidak termasuk kerusakan akibat kelalaian penggunaan, bencana alam, atau modifikasi pihak ketiga.',
    claimMethod: 'Menghubungi layanan pelanggan kami dan melampirkan kartu garansi asli beserta bukti pembelian.'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: today,
        purchaseDate: today 
    }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Sertifikat Garansi (Gold)", desc: "Layout elegan dengan border" },
    { id: 2, name: "Surat Jaminan (Formal)", desc: "Standar surat resmi perusahaan" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const WarrantyContent = () => (
    <div className={`bg-white mx-auto flex flex-col box-border w-full h-full text-slate-900 p-[20mm] print:p-[20mm] ${templateId === 1 ? 'border-8 border-double border-slate-200' : ''}`} 
         style={{ minHeight: '296mm' }}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b-2 border-slate-900 pb-6 mb-8 shrink-0">
        <div className="flex items-center gap-3">
           <div className="p-3 bg-slate-900 rounded-lg text-white">
              <Award size={32} />
           </div>
           <div>
              <h1 className="text-xl font-black uppercase tracking-tighter leading-none">{data.vendorName}</h1>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Quality Assurance & Warranty Division</p>
           </div>
        </div>
        <div className="text-right">
           <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded text-[10px] font-black uppercase inline-block border border-amber-200">Official Warranty</div>
           <p className="text-[10px] mt-1 font-mono">No: {data.warrantyNo}</p>
        </div>
      </div>

      <div className="text-center mb-10 shrink-0">
        <h2 className={`text-2xl font-black uppercase tracking-widest ${templateId === 1 ? 'text-amber-600' : 'text-slate-900'}`}>SURAT JAMINAN GARANSI</h2>
        <div className="w-24 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="space-y-6 flex-grow font-serif text-[11pt] leading-relaxed">
        <p className="text-justify">Dengan ini <b>{data.vendorName}</b> memberikan jaminan kualitas dan garansi purnajual kepada pelanggan kami:</p>
        
        <div className="ml-6 space-y-1">
           <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Pelanggan</span><span>:</span><span className="font-bold">{data.clientName}</span></div>
           <div className="grid grid-cols-[140px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.clientAddress}</span></div>
        </div>

        <p>Atas pembelian produk/jasa sebagai berikut:</p>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block border-b">Detail Barang</label>
                 <p className="font-bold text-sm">{data.productName}</p>
                 <p className="text-xs font-mono text-slate-500">S/N: {data.serialNumber}</p>
              </div>
              <div className="space-y-2">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block border-b">Masa Berlaku</label>
                 <p className="font-bold text-sm text-emerald-600">{data.duration}</p>
                 <p className="text-xs text-slate-500">Mulai: {isClient && data.purchaseDate ? new Date(data.purchaseDate).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</p>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <div className="space-y-1">
              <h4 className="font-bold text-sm uppercase flex items-center gap-2"><ShieldCheck size={14} className="text-amber-500"/> Lingkup Jaminan:</h4>
              <p className="text-sm text-slate-600 italic leading-relaxed">{data.coverage}</p>
           </div>
           <div className="space-y-1">
              <h4 className="font-bold text-sm uppercase flex items-center gap-2"><Clock size={14} className="text-blue-500"/> Prosedur Klaim:</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{data.claimMethod}</p>
           </div>
        </div>

        <p className="text-sm">Demikian surat jaminan ini kami terbitkan sebagai komitmen kami terhadap kualitas produk dan kepuasan pelanggan.</p>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 mt-12 flex justify-between items-end border-t-2 border-slate-100 pt-8" style={{ pageBreakInside: 'avoid' }}>
         <div className="text-center w-48">
            <div className="p-2 border-2 border-dashed border-slate-200 rounded-lg mb-2 opacity-50">
               <Settings size={24} className="mx-auto text-slate-400" />
               <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">Verification Stamp Area</p>
            </div>
         </div>
         <div className="text-center w-64">
            <p className="text-xs text-slate-500 mb-14">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</p>
            <div className="relative inline-block">
               <div className="absolute -top-12 -left-8 w-24 h-24 border-4 border-emerald-600/20 rounded-full flex items-center justify-center -rotate-12 pointer-events-none">
                  <p className="text-[10px] font-black text-emerald-600/40 uppercase">QUALITY PASSED</p>
               </div>
               <p className="font-bold underline uppercase text-sm leading-none">{data.vendorName}</p>
               <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Authorized Signature</p>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 overflow-x-hidden">
      <style jsx global>{`
        @media print {
          /* HILANGKAN HEADER/FOOTER BROWSER DENGAN MARGIN 0 */
          @page { size: A4; margin: 0; } 
          
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          /* KONTROL HALAMAN */
          .break-inside-avoid { page-break-inside: avoid !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            z-index: 9999; 
            background: white;
          }
          
          /* Reset container untuk print */
          #print-only-root > div {
             width: 100% !important;
             min-height: auto !important; 
             margin: 0 !important;
             padding: 0 !important; /* Padding dihandle oleh class print:p-[20mm] */
             box-shadow: none !important;
             border: none !important;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Briefcase size={16} /> <span>WARRANTY EDITOR</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[160px] justify-between">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600"/>}
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

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 font-sans ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Building2 size={14}/><h3 className="text-xs font-bold uppercase">Penerbit Garansi</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Nama Perusahaan" />
              <input className="w-full p-2 border rounded text-xs" value={data.vendorPhone} onChange={e => handleDataChange('vendorPhone', e.target.value)} placeholder="No. Telepon" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><UserCircle2 size={14}/><h3 className="text-xs font-bold uppercase">Pelanggan</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} placeholder="Nama Pelanggan" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.clientAddress} onChange={e => handleDataChange('clientAddress', e.target.value)} placeholder="Alamat Pelanggan" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><FileText size={14}/><h3 className="text-xs font-bold uppercase">Objek Garansi</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.productName} onChange={e => handleDataChange('productName', e.target.value)} placeholder="Nama Produk/Jasa" />
              <input className="w-full p-2 border rounded text-xs font-mono" value={data.serialNumber} onChange={e => handleDataChange('serialNumber', e.target.value)} placeholder="Serial Number / ID" />
              <div className="grid grid-cols-2 gap-2">
                 <div><label className="text-[9px] font-bold">Masa Garansi</label><input className="w-full p-2 border rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} /></div>
                 <div><label className="text-[9px] font-bold">Tgl Pembelian</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.purchaseDate} onChange={e => handleDataChange('purchaseDate', e.target.value)} /></div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Settings size={14}/><h3 className="text-xs font-bold uppercase">Syarat & Ketentuan</h3></div>
              <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.coverage} onChange={e => handleDataChange('coverage', e.target.value)} placeholder="Cakupan Garansi..." />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.claimMethod} onChange={e => handleDataChange('claimMethod', e.target.value)} placeholder="Cara Klaim..." />
           </div>
           <div className="h-20 lg:hidden"></div>
        </div>

        {/* --- PREVIEW AREA --- */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-0 md:p-8 overflow-y-auto overflow-x-auto h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full max-w-full flex justify-center items-start pt-4 md:pt-0 min-w-[210mm] md:min-w-0">
             <div className="relative origin-top-left md:origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-0 shadow-2xl">
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                  <WarrantyContent />
                </div>
             </div>
           </div>
        </div>

      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-[100] h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
            <WarrantyContent />
         </div>
      </div>

    </div>
  );
}