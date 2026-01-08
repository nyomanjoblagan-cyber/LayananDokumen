'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  ShieldCheck, Building2, UserCircle2, CalendarDays, FileText, 
  Settings, Award, Clock
} from 'lucide-react';
import Link from 'next/link';

export default function SuratJaminanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Garansi...</div>}>
      <WarrantyBuilder />
    </Suspense>
  );
}

function WarrantyBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
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
    purchaseDate: '2026-01-05',
    
    // DETAIL GARANSI
    duration: '12 Bulan (1 Tahun)',
    coverage: 'Kerusakan pada komponen internal (Hardware) dan jasa perbaikan. Tidak termasuk kerusakan akibat kelalaian penggunaan, bencana alam, atau modifikasi pihak ketiga.',
    claimMethod: 'Menghubungi layanan pelanggan kami dan melampirkan kartu garansi asli beserta bukti pembelian.'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Sertifikat Garansi (Gold)", desc: "Layout elegan dengan border" },
    { id: 2, name: "Surat Jaminan (Formal)", desc: "Standar surat resmi perusahaan" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const WarrantyContent = () => (
    <div className={`bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] ${templateId === 1 ? 'border-8 border-double border-slate-200' : ''}`} 
         style={{ width: '210mm', minHeight: '296mm', color: '#1e293b' }}>
      
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
                 <p className="text-xs text-slate-500">Mulai: {new Date(data.purchaseDate).toLocaleDateString('id-ID', {dateStyle:'long'})}</p>
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
      <div className="shrink-0 mt-12 flex justify-between items-end border-t-2 border-slate-100 pt-8">
         <div className="text-center w-48">
            <div className="p-2 border-2 border-dashed border-slate-200 rounded-lg mb-2 opacity-50">
               <Settings size={24} className="mx-auto text-slate-400" />
               <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">Verification Stamp Area</p>
            </div>
         </div>
         <div className="text-center w-64">
            <p className="text-xs text-slate-500 mb-14">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
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

  return (
    <div className="min-h-screen bg-slate-200 font-sans">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: auto !important; margin: 0 !important; padding: 0 !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
          }
        }
      `}</style>

      {/* UI ROOT */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <div className="h-6 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-amber-400" />
              <h1 className="font-black text-sm uppercase tracking-tighter">Warranty <span className="text-slate-500 font-normal">Certificate Builder</span></h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 min-w-[180px] justify-between transition-all hover:bg-slate-700 text-slate-300">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="truncate font-bold">{activeTemplateName}</span>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-slate-200 z-[999] overflow-hidden text-slate-800">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => {setTemplateId(t.id); setShowTemplateMenu(false)}} className={`w-full text-left p-4 text-xs hover:bg-blue-50 border-b last:border-0 ${templateId === t.id ? 'bg-blue-50 border-l-4 border-blue-600 font-bold' : ''}`}>
                      {t.name}
                      <p className="text-[10px] text-slate-400 font-normal">{t.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95">
              <Printer size={16} /> Print Garansi
            </button>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-6 scrollbar-thin text-slate-900">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Penerbit Garansi</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Nama Perusahaan" />
                <input className="w-full p-2 border rounded text-xs" value={data.vendorPhone} onChange={e => handleDataChange('vendorPhone', e.target.value)} placeholder="No. Telepon" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Pelanggan</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} placeholder="Nama Pelanggan" />
                <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.clientAddress} onChange={e => handleDataChange('clientAddress', e.target.value)} placeholder="Alamat Pelanggan" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Objek Garansi</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.productName} onChange={e => handleDataChange('productName', e.target.value)} placeholder="Nama Produk/Jasa" />
                <input className="w-full p-2 border rounded text-xs font-mono" value={data.serialNumber} onChange={e => handleDataChange('serialNumber', e.target.value)} placeholder="Serial Number / ID" />
                <div className="grid grid-cols-2 gap-2">
                   <div><label className="text-[9px] font-bold">Masa Garansi</label><input className="w-full p-2 border rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} /></div>
                   <div><label className="text-[9px] font-bold">Tgl Pembelian</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.purchaseDate} onChange={e => handleDataChange('purchaseDate', e.target.value)} /></div>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Settings size={12}/> Syarat & Ketentuan</h3>
                <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.coverage} onChange={e => handleDataChange('coverage', e.target.value)} placeholder="Cakupan Garansi..." />
                <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.claimMethod} onChange={e => handleDataChange('claimMethod', e.target.value)} placeholder="Cara Klaim..." />
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.6] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <WarrantyContent />
             </div>
          </div>
        </div>
      </div>

      {/* PRINT ONLY ROOT */}
      <div id="print-only-root" className="hidden">
         <WarrantyContent />
      </div>

    </div>
  );
}