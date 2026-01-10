'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  UserCircle2, FileWarning, CalendarDays, FileText, Landmark, Users,
  ArrowLeftCircle, Edit3, Eye, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function BedaNamaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Pernyataan...</div>}>
      <BedaNamaBuilder />
    </Suspense>
  );
}

function BedaNamaBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Sleman',
    date: new Date().toISOString().split('T')[0],
    
    // Identitas KTP (Yang Benar)
    nameKtp: 'MUHAMMAD RIZKY RAMADHAN',
    nik: '3404010101950003',
    placeBirth: 'Yogyakarta',
    dateBirth: '1995-02-15',
    job: 'Karyawan Swasta',
    address: 'Jl. Magelang KM 5, Mlati, Sleman, Yogyakarta',
    
    // Dokumen Beda (Yang Salah/Beda)
    documentType: 'Ijazah Sarjana (S1)',
    nameOnDoc: 'M. RIZKY RAMADHAN',
    
    // Keperluan
    purpose: 'Persyaratan pengurusan administrasi pembuatan Paspor di Kantor Imigrasi Kelas I Yogyakarta.',
    
    // Saksi
    witness1: 'Sudarsono (Ketua RT)',
    witness2: 'Dwi Astuti (Ibu Kandung)'
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
              <h1 className="font-black text-lg uppercase tracking-wider underline underline-offset-4">SURAT PERNYATAAN BEDA NAMA</h1>
           </div>

           <div className="space-y-3 text-justify">
              <p>Saya yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-4 space-y-1 bg-slate-50 p-3 border border-slate-200 rounded">
                 <table className="w-full">
                    <tbody>
                       <tr><td className="w-36 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.nameKtp}</td></tr>
                       <tr><td>NIK</td><td>:</td><td>{data.nik}</td></tr>
                       <tr><td>Tempat/Tgl Lahir</td><td>:</td><td>{data.placeBirth}, {new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle:'long'})}</td></tr>
                       <tr><td>Pekerjaan</td><td>:</td><td>{data.job}</td></tr>
                       <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td>{data.address}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p>Dengan ini menyatakan dengan sesungguhnya bahwa:</p>

              <div className="ml-2 space-y-3 border-l-4 border-slate-400 pl-4 py-1">
                 <div>
                    <p>1. Nama yang tertulis di <strong>KTP / Kartu Keluarga</strong> saya adalah:</p>
                    <div className="font-black text-base uppercase mt-1">"{data.nameKtp}"</div>
                 </div>
                 <div>
                    <p>2. Sedangkan nama yang tertulis di <strong>{data.documentType}</strong> adalah:</p>
                    <div className="font-black text-base uppercase mt-1 text-red-800">"{data.nameOnDoc}"</div>
                 </div>
              </div>

              <p>
                 Bahwa nama <strong>{data.nameKtp}</strong> dan <strong>{data.nameOnDoc}</strong> adalah nama dari <strong>SATU ORANG YANG SAMA</strong> (diri saya sendiri). Perbedaan penulisan tersebut terjadi karena kebiasaan penulisan/kesalahan administrasi dan bukan merupakan unsur kesengajaan untuk memalsukan identitas.
              </p>

              <p className="bg-slate-50 p-2 border border-dashed border-slate-300 italic text-sm">
                 Surat pernyataan ini saya buat guna melengkapi persyaratan: <strong>{data.purpose}</strong>.
              </p>

              <p>
                 Demikian surat pernyataan ini saya buat dengan keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan dari pihak manapun. Apabila dikemudian hari ternyata pernyataan ini tidak benar, saya bersedia dituntut sesuai dengan hukum yang berlaku.
              </p>
           </div>

           {/* TANDA TANGAN (Compact Group) */}
           <div className="mt-8 pt-4 border-t border-slate-300" style={{ pageBreakInside: 'avoid' }}>
              <p className="text-right mb-6">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
              
              <div className="flex justify-between items-end">
                 <div className="text-center">
                    <p className="mb-8 font-bold uppercase text-[9pt] text-slate-500">Saksi-Saksi:</p>
                    <div className="flex flex-col gap-6 text-left">
                       <div className="border-b border-black w-40 pb-1 text-sm font-bold">1. {data.witness1}</div>
                       <div className="border-b border-black w-40 pb-1 text-sm font-bold">2. {data.witness2}</div>
                    </div>
                 </div>

                 <div className="text-center w-56">
                    <p className="mb-2 font-bold uppercase text-xs">Yang Membuat Pernyataan,</p>
                    <div className="border border-slate-400 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[7px] text-slate-400 italic bg-slate-50">
                       MATERAI<br/>10.000
                    </div>
                    <p className="font-bold underline uppercase text-sm">{data.nameKtp}</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: MODERN SIMPLE (Compact) ---
      return (
        <div className="font-sans text-[10.5pt] leading-snug text-slate-800">
           <div className="border-b-2 border-emerald-500 pb-3 mb-6">
              <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">Pernyataan Kesamaan Identitas</h1>
              <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Identity Clarification Statement</p>
           </div>

           <div className="space-y-4">
              <p>Kepada Yth. Pihak Yang Berkepentingan,</p>
              <p>Saya yang bertanda tangan di bawah ini:</p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid gap-2 text-sm">
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">Nama Lengkap</span><span>:</span><span className="font-black uppercase">{data.nameKtp}</span>
                 </div>
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">NIK</span><span>:</span><span className="font-mono">{data.nik}</span>
                 </div>
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">Alamat</span><span>:</span><span>{data.address}</span>
                 </div>
              </div>

              <div className="space-y-3">
                 <p className="font-bold text-slate-700 border-l-4 border-emerald-500 pl-3">MENGKLARIFIKASI BAHWA:</p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 p-3 rounded-lg text-center shadow-sm">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Nama di KTP</p>
                       <p className="font-black text-slate-900 text-sm">{data.nameKtp}</p>
                    </div>
                    <div className="bg-white border border-red-200 p-3 rounded-lg text-center shadow-sm">
                       <p className="text-[10px] font-bold text-red-400 uppercase mb-1">Nama di {data.documentType}</p>
                       <p className="font-black text-red-600 text-sm">{data.nameOnDoc}</p>
                    </div>
                 </div>
                 <p className="text-justify font-medium bg-emerald-50 p-3 rounded border border-emerald-100">
                    Merupakan <u>SATU ORANG YANG SAMA</u>. Perbedaan penulisan nama tersebut tidak menggugurkan validitas kepemilikan dokumen saya.
                 </p>
              </div>

              <p className="italic text-slate-500 text-sm border-t border-dashed border-slate-300 pt-3">
                 Surat ini dibuat untuk keperluan: <strong>{data.purpose}</strong>
              </p>
           </div>

           <div className="mt-8 flex justify-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center">
                 <p className="text-xs mb-16 font-bold uppercase tracking-widest">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
                 <p className="font-black text-sm uppercase border-b-2 border-slate-900 inline-block pb-1">{data.nameKtp}</p>
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Beda Nama <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Materai' : 'Format Modern'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Format Materai</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Format Modern</button>
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
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Identitas (Sesuai KTP)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold" value={data.nameKtp} onChange={e => handleDataChange('nameKtp', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Lahir</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pekerjaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.job} onChange={e => handleDataChange('job', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                  </div>
               </div>

               {/* PERBEDAAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldAlert size={12}/> Data Perbedaan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Dokumen Pembanding (Ijazah/KK/Paspor)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.documentType} onChange={e => handleDataChange('documentType', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Tertulis Beda</label><input className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm font-bold text-red-700 bg-red-50" value={data.nameOnDoc} onChange={e => handleDataChange('nameOnDoc', e.target.value)} /></div>
                  </div>
               </div>

               {/* KEPERLUAN & SAKSI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileText size={12}/> Penutup</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Untuk Keperluan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Saksi 1</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Saksi 2</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} /></div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Surat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
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