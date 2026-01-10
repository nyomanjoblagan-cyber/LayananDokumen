'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Handshake, Building2, UserCircle2, 
  MapPin, ShoppingCart, CalendarRange, Scale, LayoutTemplate, 
  ChevronDown, Check, ArrowLeftCircle, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function PerjanjianResellerPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Perjanjian...</div>}>
      <ContractBuilder />
    </Suspense>
  );
}

function ContractBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    contractNo: 'SPK/RES/2026/088',
    
    // PIHAK PERTAMA (SUPPLIER)
    providerName: 'CV. PANGAN MAJU JAYA',
    providerOwner: 'Andi Wijaya',
    providerAddress: 'Kawasan Niaga Sudirman Blok C5, Jakarta Pusat',

    // PIHAK KEDUA (RESELLER)
    resellerName: 'SITI AMINAH',
    resellerStore: 'Toko Berkah Utama',
    resellerAddress: 'Jl. Raya Bogor KM 24, Ciracas, Jakarta Timur',
    
    // KETENTUAN
    region: 'Jabodetabek',
    target: 'Minimal 100 unit per bulan',
    paymentTerms: 'Cash Before Delivery (CBD)',
    duration: '12 (Dua Belas) Bulan'
  });

  const TEMPLATES = [
    { id: 1, name: "Perjanjian Resmi", desc: "Format Legal Kontrak Kerjasama" },
    { id: 2, name: "Surat Penunjukan", desc: "Format SPK Distributor Tunggal" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: PERJANJIAN RESMI (Formal) ---
      return (
        <div className="font-serif text-[10.5pt] leading-relaxed text-slate-900">
           {/* JUDUL */}
           <div className="text-center mb-8 shrink-0">
              <h1 className="text-lg font-black underline uppercase decoration-2 underline-offset-4">SURAT PERJANJIAN KERJASAMA DISTRIBUTOR</h1>
              <p className="text-[10pt] font-sans mt-1">Nomor: {data.contractNo}</p>
           </div>

           {/* ISI SURAT */}
           <div className="space-y-4 text-justify flex-grow">
              <p>Pada hari ini, tanggal <b>{new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</b>, yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-4 space-y-4">
                 <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <p>1. <b>{data.providerOwner}</b>, bertindak atas nama <b>{data.providerName}</b>, berkedudukan di {data.providerAddress}. Selanjutnya disebut sebagai <b>PIHAK PERTAMA (Supplier)</b>.</p>
                 </div>
                 <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <p>2. <b>{data.resellerName}</b>, pemilik <b>{data.resellerStore}</b>, beralamat di {data.resellerAddress}. Selanjutnya disebut sebagai <b>PIHAK KEDUA (Reseller)</b>.</p>
                 </div>
              </div>

              <p>Kedua belah pihak sepakat untuk mengikatkan diri dalam perjanjian kerjasama dengan ketentuan sebagai berikut:</p>

              <div className="space-y-4 ml-2 border-l-4 border-slate-300 pl-4 py-2">
                 <div>
                    <p className="font-bold uppercase text-[9pt] text-slate-500 mb-1">Pasal 1: Wilayah & Hak Jual</p>
                    <p>Pihak Pertama memberikan hak kepada Pihak Kedua untuk mendistribusikan produk di wilayah <b>{data.region}</b>. Pihak Kedua wajib menjaga nama baik produk dan perusahaan Pihak Pertama.</p>
                 </div>
                 <div>
                    <p className="font-bold uppercase text-[9pt] text-slate-500 mb-1">Pasal 2: Harga & Pembayaran</p>
                    <p>Pihak Kedua wajib mengikuti kebijakan harga yang ditetapkan oleh Pihak Pertama. Sistem pembayaran dilakukan secara <b>{data.paymentTerms}</b> sebelum barang dikirimkan.</p>
                 </div>
                 <div>
                    <p className="font-bold uppercase text-[9pt] text-slate-500 mb-1">Pasal 3: Target Penjualan</p>
                    <p>Pihak Kedua berkomitmen untuk mencapai target penjualan sebesar <b>{data.target}</b> sebagai syarat evaluasi perpanjangan kontrak.</p>
                 </div>
                 <div>
                    <p className="font-bold uppercase text-[9pt] text-slate-500 mb-1">Pasal 4: Masa Berlaku</p>
                    <p>Perjanjian ini berlaku untuk jangka waktu <b>{data.duration}</b> dan dapat diperpanjang melalui kesepakatan tertulis kedua belah pihak.</p>
                 </div>
              </div>
           </div>

           {/* TANDA TANGAN */}
           <div className="shrink-0 mt-8 pt-4 border-t border-slate-900" style={{ pageBreakInside: 'avoid' }}>
              <div className="grid grid-cols-2 gap-10 text-center">
                 <div>
                    <p className="mb-20 font-bold uppercase text-[9pt]">Pihak Pertama (Supplier)</p>
                    <p className="font-bold underline uppercase">{data.providerOwner}</p>
                    <p className="text-[9pt] italic">Direktur Utama</p>
                 </div>
                 <div>
                    <p className="mb-20 font-bold uppercase text-[9pt]">Pihak Kedua (Reseller)</p>
                    <p className="font-bold underline uppercase">{data.resellerName}</p>
                    <p className="text-[9pt] italic">Pemilik Toko</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: SURAT PENUNJUKAN (SPK) ---
      return (
        <div className="font-sans text-[10.5pt] text-slate-900 leading-relaxed">
           <div className="border-b-4 border-double border-slate-900 pb-4 mb-8 text-center">
              <h1 className="text-xl font-black uppercase tracking-wide">{data.providerName}</h1>
              <p className="text-sm">{data.providerAddress}</p>
           </div>

           <div className="text-center mb-8">
              <h2 className="text-lg font-bold underline uppercase">SURAT PENUNJUKAN DISTRIBUTOR</h2>
              <p className="text-sm font-bold">No: {data.contractNo}</p>
           </div>

           <div className="space-y-6">
              <p>Dengan ini, Manajemen <b>{data.providerName}</b> menunjuk secara resmi:</p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                 <h3 className="font-black text-xl uppercase text-slate-800 mb-1">{data.resellerStore}</h3>
                 <p className="text-lg font-bold text-slate-600 mb-2">({data.resellerName})</p>
                 <p className="text-sm italic">{data.resellerAddress}</p>
              </div>

              <p className="text-center font-bold">SEBAGAI DISTRIBUTOR RESMI / AUTHORIZED RESELLER</p>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-sm">
                 <p className="font-bold text-emerald-800 mb-2">Ketentuan Penunjukan:</p>
                 <ul className="list-disc ml-5 space-y-1 text-emerald-900">
                    <li>Wilayah Pemasaran: <b>{data.region}</b></li>
                    <li>Target Penjualan: <b>{data.target}</b></li>
                    <li>Masa Berlaku: <b>{data.duration}</b></li>
                 </ul>
              </div>

              <p className="text-justify text-sm">
                 Surat penunjukan ini berlaku efektif sejak tanggal ditandatangani dan dapat dicabut sewaktu-waktu apabila Pihak Kedua melanggar ketentuan perusahaan atau tidak mencapai target yang ditetapkan selama 3 bulan berturut-turut.
              </p>
           </div>

           <div className="mt-12 text-right" style={{ pageBreakInside: 'avoid' }}>
              <p className="mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
              <p className="mb-20 font-bold">Hormat Kami,</p>
              <p className="font-bold underline uppercase">{data.providerOwner}</p>
              <p className="text-xs font-bold text-slate-500">Business Development Manager</p>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* --- JURUS TABLE WRAPPER (Print Fix) --- */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; display: block !important; }
          #print-only-root { display: block !important; width: 100%; height: auto; position: absolute; top: 0; left: 0; z-index: 9999; background: white; }
          
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 20mm; } 
          .print-table tfoot { height: 20mm; } 
          .print-content-wrapper { padding: 0 20mm; }
          
          tr, .keep-together { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Kontrak Reseller <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Perjanjian Resmi' : 'Surat Penunjukan'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Perjanjian Resmi</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Surat Penunjukan</button>
                     </div>
                  )}
               </div>
               <div className="relative md:hidden"><button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">Tampilan <ChevronDown size={14}/></button></div>
               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               {/* PIHAK 1 */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Pihak Pertama (Supplier)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Perusahaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.providerName} onChange={e => handleDataChange('providerName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pemilik / Penanggung Jawab</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.providerOwner} onChange={e => handleDataChange('providerOwner', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.providerAddress} onChange={e => handleDataChange('providerAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* PIHAK 2 */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Pihak Kedua (Reseller)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.resellerName} onChange={e => handleDataChange('resellerName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Toko</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" value={data.resellerStore} onChange={e => handleDataChange('resellerStore', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.resellerAddress} onChange={e => handleDataChange('resellerAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* KETENTUAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Scale size={12}/> Syarat & Ketentuan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Wilayah</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.region} onChange={e => handleDataChange('region', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Durasi Kontrak</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Target Penjualan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.target} onChange={e => handleDataChange('target', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Sistem Pembayaran</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.paymentTerms} onChange={e => handleDataChange('paymentTerms', e.target.value)} /></div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL (FIX: TABLE WRAPPER) --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}