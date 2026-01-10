'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Heart, Droplets, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Activity, CalendarDays, ClipboardCheck,
  LayoutTemplate, ChevronDown, Check, ArrowLeftCircle, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function DonorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Donor...</div>}>
      <DonorBuilder />
    </Suspense>
  );
}

function DonorBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: new Date().toISOString().split('T')[0],
    docNo: 'DONOR/PMI-DPS/2026/01/442',
    
    // INSTANSI (PMI / RS)
    institutionName: 'PALANG MERAH INDONESIA (PMI) KOTA DENPASAR',
    institutionAddress: 'Jl. Imam Bonjol No. 182, Denpasar, Bali',
    
    // DATA DONOR
    donorName: 'BAGUS RAMADHAN',
    donorNik: '5171010101990001',
    bloodType: 'O (Positif)',
    
    // DETAIL KEGIATAN
    donorType: 'Donor Darah Sukarela', // atau 'Donor Organ Pasca-Mangkat'
    donorTime: '09:00 WITA',
    location: 'Unit Transfusi Darah (UTD) PMI Denpasar',
    
    // PERNYATAAN / KETERANGAN
    statement: 'Telah mendonorkan darahnya secara sukarela untuk kepentingan kemanusiaan. Yang bersangkutan disarankan untuk beristirahat dari aktivitas fisik berat selama 24 jam ke depan.',

    // PETUGAS / DOKTER
    officerName: 'dr. I MADE WIRA',
    officerId: 'NIP. 19850101 201001 1 004'
  });

  // HANDLERS
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Format PMI (Resmi)", desc: "Standar Unit Transfusi Darah" },
    { id: 2, name: "Format RS (Medis)", desc: "Laporan medis rumah sakit" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: PMI STANDARD ---
      return (
        <div className="font-serif text-[11pt] text-slate-900 leading-relaxed">
           
           {/* KOP PMI */}
           <div className="flex items-center border-b-4 border-double border-red-600 pb-3 mb-8">
              <div className="bg-red-600 text-white p-3 rounded-full mr-4 print:bg-white print:text-red-600 print:border-2 print:border-red-600">
                 <Droplets size={32} />
              </div>
              <div className="flex-grow">
                 <h1 className="text-[14pt] font-black uppercase tracking-tighter text-red-600">{data.institutionName}</h1>
                 <p className="text-[9pt] font-sans italic text-slate-500">{data.institutionAddress}</p>
              </div>
              <div className="text-right border-l-2 pl-4 border-red-100">
                 <p className="text-[16pt] font-black text-red-600 leading-none">{data.bloodType}</p>
                 <p className="text-[7pt] font-sans uppercase font-bold tracking-widest text-slate-400">Gol. Darah</p>
              </div>
           </div>

           {/* JUDUL */}
           <div className="text-center mb-10">
              <h2 className="text-xl font-black underline uppercase tracking-[0.2em] leading-none text-slate-800">SURAT KETERANGAN DONOR</h2>
              <p className="text-[10pt] font-sans mt-2 italic text-slate-500">Nomor: {data.docNo}</p>
           </div>

           {/* BODY */}
           <div className="space-y-6 flex-grow">
              <p>Pihak <b>{data.institutionName}</b> menerangkan dengan sebenarnya bahwa:</p>
              
              <div className="ml-8 space-y-1.5 font-sans text-[10.5pt] border-l-4 border-red-100 pl-6 italic">
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Donor</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.donorName}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.donorNik}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Jenis Donor</span><span>:</span><span className="font-bold text-red-600 uppercase">{data.donorType}</span></div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] space-y-2">
                 <p>Telah melakukan pengambilan {data.donorType.toLowerCase()} pada:</p>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Hari, Tanggal</span><span>:</span><span className="font-bold">{new Date(data.date).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Waktu / Lokasi</span><span>:</span><span>{data.donorTime} / {data.location}</span></div>
              </div>

              <p className="text-justify indent-8 leading-relaxed">
                 {data.statement}
              </p>

              <p>Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya, termasuk sebagai bukti ijin istirahat bagi instansi/tempat bekerja.</p>
           </div>

           {/* TANDA TANGAN */}
           <div className="mt-12 flex justify-between items-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="w-32 h-32 border-2 border-dashed border-slate-200 flex items-center justify-center text-center p-2 rounded">
                 <p className="text-[7pt] text-slate-300 font-sans uppercase">Stempel<br/>Resmi Instansi</p>
              </div>
              <div className="text-center w-72">
                 <p className="text-[10pt] mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                 <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">Petugas Unit Transfusi,</p>
                 <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.officerName}</p>
                 <p className="text-[8pt] font-sans mt-1">{data.officerId}</p>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: HOSPITAL REPORT (Modern) ---
      return (
        <div className="font-sans text-[10.5pt] text-slate-800 leading-snug">
           
           {/* HEADER MODERN */}
           <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-8">
              <div className="flex items-center gap-3">
                 <div className="bg-slate-900 text-white p-2 rounded"><Activity size={24}/></div>
                 <div>
                    <h1 className="text-lg font-black uppercase tracking-tight leading-none">{data.institutionName}</h1>
                    <p className="text-[9pt] text-slate-500">Medical Report Center</p>
                 </div>
              </div>
              <div className="text-right text-[9pt]">
                 <p className="font-mono">{data.docNo}</p>
                 <p>{data.date}</p>
              </div>
           </div>

           <div className="mb-8">
              <h2 className="text-xl font-bold uppercase text-slate-900 mb-6">Laporan Donasi Medis</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                 <div className="space-y-1">
                    <p className="text-[9pt] font-bold text-slate-400 uppercase">Nama Pendonor</p>
                    <p className="font-bold text-lg uppercase">{data.donorName}</p>
                    <p className="text-sm text-slate-500">{data.donorNik}</p>
                 </div>
                 <div className="space-y-1 text-right">
                    <p className="text-[9pt] font-bold text-slate-400 uppercase">Golongan Darah</p>
                    <p className="font-black text-3xl text-red-600">{data.bloodType}</p>
                 </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
                 <h3 className="font-bold text-sm mb-3 border-b pb-2">Detail Prosedur</h3>
                 <div className="grid grid-cols-[120px_10px_1fr] gap-y-2 text-sm">
                    <span>Jenis Tindakan</span><span>:</span><span className="font-bold">{data.donorType}</span>
                    <span>Lokasi</span><span>:</span><span>{data.location}</span>
                    <span>Catatan Medis</span><span>:</span><span className="italic text-slate-600">"{data.statement}"</span>
                 </div>
              </div>

              <p className="text-justify text-sm leading-relaxed">
                 Dokumen ini menyatakan bahwa pendonor tersebut di atas telah menyelesaikan prosedur donasi dengan baik dan dalam kondisi stabil pasca tindakan. Disarankan istirahat cukup dan konsumsi cairan lebih banyak.
              </p>
           </div>

           <div className="mt-12 pt-4 border-t border-slate-900 flex justify-between items-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-xs text-slate-400 max-w-[200px]">
                 *Dokumen ini sah dan diterbitkan secara elektronik oleh sistem informasi medis {data.institutionName}.
              </div>
              <div className="text-right">
                 <p className="text-sm font-bold mb-16">Dokter Penanggung Jawab</p>
                 <p className="font-black text-lg border-b-2 border-slate-900 inline-block pb-1">{data.officerName}</p>
                 <p className="text-xs font-bold text-slate-400 mt-1">{data.officerId}</p>
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Surat Donor <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format PMI' : 'Format RS'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Format PMI</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Format RS</button>
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

               {/* INSTANSI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Unit Transfusi / RS</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Unit/RS</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.institutionName} onChange={e => handleDataChange('institutionName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.institutionAddress} onChange={e => handleDataChange('institutionAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* DONOR */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Data Pendonor</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase" value={data.donorName} onChange={e => handleDataChange('donorName', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.donorNik} onChange={e => handleDataChange('donorNik', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Golongan Darah</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-black text-red-600" value={data.bloodType} onChange={e => handleDataChange('bloodType', e.target.value)} /></div>
                     </div>
                  </div>
               </div>

               {/* KEGIATAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Heart size={12}/> Detail Donor</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Jenis Donor</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.donorType} onChange={e => handleDataChange('donorType', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Waktu</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.donorTime} onChange={e => handleDataChange('donorTime', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Lokasi</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.location} onChange={e => handleDataChange('location', e.target.value)} /></div>
                  </div>
               </div>

               {/* KETERANGAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ClipboardCheck size={12}/> Keterangan & Petugas</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Catatan Medis</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-20 resize-none" value={data.statement} onChange={e => handleDataChange('statement', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Petugas</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold" value={data.officerName} onChange={e => handleDataChange('officerName', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP/ID</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.officerId} onChange={e => handleDataChange('officerId', e.target.value)} /></div>
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