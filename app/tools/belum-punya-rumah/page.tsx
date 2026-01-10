'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Home, UserCircle2, ShieldCheck, MapPin, CalendarDays, FileText,
  ArrowLeftCircle, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function BelumPunyaRumahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <HomeDeclarationBuilder />
    </Suspense>
  );
}

function HomeDeclarationBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Sleman',
    date: new Date().toISOString().split('T')[0],
    
    // DATA IDENTITAS
    name: 'AGUS SETIAWAN',
    nik: '3404020101920005',
    placeBirth: 'Yogyakarta',
    dateBirth: '1992-08-20',
    job: 'Karyawan Swasta',
    address: 'Jl. Palagan Tentara Pelajar No. 45, Sariharjo, Ngaglik, Sleman',
    
    // TUJUAN
    purpose: 'Persyaratan Pengajuan KPR Bersubsidi (FLPP) melalui Bank Tabungan Negara (BTN).',
    
    // KETUA RT/RW
    rt: '04',
    rw: '12',
    kelurahan: 'Sariharjo'
  });

  // HANDLERS
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: FORMAL MATERAI (Compact) ---
      return (
        <div className="font-serif text-[10.5pt] leading-snug text-slate-900">
           {/* JUDUL */}
           <div className="text-center mb-6 pb-2 border-b-2 border-black">
              <h1 className="font-black text-lg uppercase tracking-wider underline underline-offset-4">SURAT PERNYATAAN BELUM MEMILIKI RUMAH</h1>
           </div>

           <div className="space-y-4 text-justify">
              <p>Saya yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-4 space-y-1 bg-slate-50 p-3 border border-slate-200 rounded">
                 <table className="w-full">
                    <tbody>
                       <tr><td className="w-36 font-bold">Nama Lengkap</td><td className="w-3">:</td><td className="font-bold uppercase">{data.name}</td></tr>
                       <tr><td>NIK</td><td>:</td><td>{data.nik}</td></tr>
                       <tr><td>Tempat/Tgl Lahir</td><td>:</td><td>{data.placeBirth}, {new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle:'long'})}</td></tr>
                       <tr><td>Pekerjaan</td><td>:</td><td>{data.job}</td></tr>
                       <tr><td className="align-top">Alamat (KTP)</td><td className="align-top">:</td><td>{data.address}</td></tr>
                    </tbody>
                 </table>
              </div>

              <div className="space-y-3 pt-2">
                 <p>Dengan ini menyatakan dengan sesungguhnya bahwa:</p>
                 <div className="bg-emerald-50 p-4 border border-emerald-200 rounded text-center">
                    <p className="font-bold text-emerald-800 uppercase tracking-wide text-sm">SAMPAI SAAT INI SAYA BELUM MEMILIKI RUMAH</p>
                    <p className="text-xs text-emerald-600 mt-1">(Baik rumah pribadi maupun rumah warisan/hibah)</p>
                 </div>
                 <p>
                    Bahwa saya belum pernah menerima subsidi pemilikan rumah dari Pemerintah, dan surat pernyataan ini saya buat untuk memenuhi persyaratan permohonan Kredit Pemilikan Rumah (KPR) Bersubsidi / FLPP.
                 </p>
              </div>

              <p className="bg-slate-50 p-2 border border-dashed border-slate-300 italic text-sm">
                 Tujuan Penggunaan: <strong>{data.purpose}</strong>
              </p>

              <p>
                 Demikian pernyataan ini saya buat dengan sebenarnya, penuh kesadaran, dan tanpa paksaan dari pihak manapun. Apabila di kemudian hari pernyataan ini tidak benar, saya bersedia mengembalikan seluruh fasilitas subsidi yang telah saya terima dan dituntut sesuai hukum yang berlaku.
              </p>
           </div>

           {/* TANDA TANGAN (Compact Group) */}
           <div className="mt-8 pt-4 border-t border-slate-300" style={{ pageBreakInside: 'avoid' }}>
              <p className="text-right mb-6">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
              
              <div className="flex justify-between items-end">
                 <div className="text-center w-56">
                    <p className="mb-14 font-bold uppercase text-[9pt] text-slate-500">Mengetahui,<br/>Ketua RT {data.rt} / RW {data.rw}</p>
                    <div className="border-b border-black w-32 mx-auto"></div>
                    <p className="text-[9pt] mt-1 font-bold">(........................................)</p>
                 </div>

                 <div className="text-center w-56">
                    <p className="mb-2 font-bold uppercase text-xs">Yang Membuat Pernyataan,</p>
                    <div className="border border-slate-400 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[7px] text-slate-400 italic bg-slate-50">
                       MATERAI<br/>10.000
                    </div>
                    <p className="font-bold underline uppercase text-sm">{data.name}</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: SEDERHANA (Simple) ---
      return (
        <div className="font-sans text-[10.5pt] leading-snug text-slate-800">
           <div className="border-b-2 border-emerald-500 pb-3 mb-6">
              <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">Pernyataan Belum Punya Rumah</h1>
              <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Home Ownership Statement</p>
           </div>

           <div className="space-y-4">
              <p>Saya yang bertanda tangan di bawah ini:</p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid gap-2 text-sm">
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">Nama Lengkap</span><span>:</span><span className="font-black uppercase">{data.name}</span>
                 </div>
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">NIK</span><span>:</span><span className="font-mono">{data.nik}</span>
                 </div>
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">Pekerjaan</span><span>:</span><span>{data.job}</span>
                 </div>
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">Alamat</span><span>:</span><span>{data.address}</span>
                 </div>
              </div>

              <div className="space-y-3 py-2">
                 <p className="font-bold text-slate-700 border-l-4 border-emerald-500 pl-3">MENYATAKAN BAHWA:</p>
                 <div className="bg-white border border-slate-200 p-4 rounded-lg text-center shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status Kepemilikan Properti</p>
                    <p className="font-black text-slate-900 text-base uppercase">BELUM MEMILIKI RUMAH TINGGAL SENDIRI</p>
                 </div>
                 <p className="text-justify font-medium">
                    Sampai saat ini saya masih berstatus mengontrak/menumpang dan belum memiliki hak milik atas tanah dan bangunan perumahan dimanapun.
                 </p>
              </div>

              <p className="italic text-slate-500 text-sm border-t border-dashed border-slate-300 pt-3">
                 Surat ini dibuat untuk keperluan: <strong>{data.purpose}</strong>
              </p>
           </div>

           <div className="mt-8 flex justify-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center">
                 <p className="text-xs mb-16 font-bold uppercase tracking-widest">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
                 <p className="font-black text-sm uppercase border-b-2 border-slate-900 inline-block pb-1">{data.name}</p>
                 <p className="text-xs text-slate-400 mt-1">Pembuat Pernyataan</p>
              </div>
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Belum Punya Rumah <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Formal (Bank/KPR)' : 'Sederhana (Umum)'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Formal (Bank/KPR)</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Sederhana (Umum)</button>
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

               {/* IDENTITAS */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Identitas Pemohon</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Lahir</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} /></div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pekerjaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.job} onChange={e => handleDataChange('job', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                  </div>
               </div>

               {/* TUJUAN & PEJABAT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldCheck size={12}/> Legalitas & Tujuan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tujuan Surat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} /></div>
                     <div className="pt-2 border-t border-dashed border-slate-200 space-y-2">
                        <label className="text-[10px] font-bold text-slate-500">Mengetahui (Opsional)</label>
                        <div className="grid grid-cols-3 gap-2">
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} placeholder="RT" />
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} placeholder="RW" />
                           <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.kelurahan} onChange={e => handleDataChange('kelurahan', e.target.value)} placeholder="Desa" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kota Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                     </div>
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