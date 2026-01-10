'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, UserCircle2, 
  FlaskConical, CalendarDays, ClipboardCheck, Landmark, Search,
  LayoutTemplate, ChevronDown, Check, ArrowLeftCircle, Edit3, Eye, FileText
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function BebasNarkobaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Laboratorium...</div>}>
      <DrugTestBuilder />
    </Suspense>
  );
}

function DrugTestBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Surabaya',
    date: new Date().toISOString().split('T')[0],
    docNo: 'LAK/BN/2026/01/055',
    
    // PEMERIKSA (LAB/KLINIK)
    clinicName: 'KLINIK MEDIKA PRATAMA',
    clinicAddress: 'Jl. Raya Darmo No. 120, Surabaya, Jawa Timur',
    examinerName: 'dr. Hendra Setiawan, Sp.PK',
    examinerNip: '19850412 201503 1 002',

    // PASIEN
    patientName: 'RIZKY RAMADHAN',
    patientNik: '3578010101980005',
    patientAddress: 'Jl. Gubeng Kertajaya V No. 10, Surabaya',
    patientJob: 'Mahasiswa / Calon Karyawan',
    patientBirth: 'Surabaya, 12 April 1998',
    
    // HASIL TES (6 PARAMETER STANDAR)
    results: [
      { parameter: 'Amphetamine (AMP)', result: 'NEGATIF' },
      { parameter: 'Methamphetamine (MET)', result: 'NEGATIF' },
      { parameter: 'Cocaine (COC)', result: 'NEGATIF' },
      { parameter: 'Morphine (MOP)', result: 'NEGATIF' },
      { parameter: 'Marijuana (THC)', result: 'NEGATIF' },
      { parameter: 'Benzodiazepines (BZO)', result: 'NEGATIF' },
    ],
    
    purpose: 'Persyaratan Melamar Pekerjaan / Pendaftaran Studi.'
  });

  // HANDLERS
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const toggleResult = (idx: number) => {
    const newResults = [...data.results];
    newResults[idx].result = newResults[idx].result === 'NEGATIF' ? 'POSITIF' : 'NEGATIF';
    setData({ ...data, results: newResults });
  };

  // --- KOMPONEN ISI SURAT ---
  const ContentInside = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: LAB REPORT (Compact) ---
      return (
        <div className="font-serif text-[10.5pt] leading-snug text-slate-900">
           {/* KOP KLINIK */}
           <div className="flex items-center gap-4 border-b-4 border-double border-slate-900 pb-3 mb-6 shrink-0">
              <div className="p-2 bg-blue-600 text-white rounded-full shrink-0 print:text-black print:bg-transparent print:border print:border-black">
                 <FlaskConical size={28} />
              </div>
              <div className="flex-grow">
                 <h1 className="text-lg font-black uppercase tracking-tighter leading-none">{data.clinicName}</h1>
                 <p className="text-[9pt] font-sans mt-1 text-slate-500 font-bold uppercase tracking-widest print:text-black">Laboratorium & Medical Check Up Center</p>
                 <p className="text-[8pt] font-sans text-slate-400 print:text-black">{data.clinicAddress}</p>
              </div>
           </div>

           <div className="text-center mb-6 shrink-0">
              <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-widest">SURAT KETERANGAN BEBAS NARKOBA</h2>
              <p className="text-[10pt] font-sans mt-1">Nomor: {data.docNo}</p>
           </div>

           <div className="space-y-4 flex-grow">
              <p className="text-justify italic">Berdasarkan pemeriksaan laboratorium urin yang telah dilakukan secara teliti terhadap:</p>
              
              <div className="ml-4 space-y-1 font-sans text-sm border-l-2 border-slate-200 pl-4">
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.patientName}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.patientNik}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>TTL</span><span>:</span><span>{data.patientBirth}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.patientJob}</span></div>
                 <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.patientAddress}</span></div>
              </div>

              <div className="mt-4">
                 <h4 className="text-center font-bold font-sans text-xs uppercase mb-2 tracking-widest bg-slate-100 py-1 border border-slate-200">Hasil Pemeriksaan Laboratorium</h4>
                 <table className="w-full border-collapse border border-slate-300 font-sans text-xs">
                    <thead>
                       <tr className="bg-slate-50 uppercase">
                          <th className="border border-slate-300 p-1.5 text-left">Parameter Tes</th>
                          <th className="border border-slate-300 p-1.5 text-center w-32">Metode</th>
                          <th className="border border-slate-300 p-1.5 text-center w-32">Hasil</th>
                       </tr>
                    </thead>
                    <tbody>
                       {data.results.map((r, i) => (
                          <tr key={i}>
                             <td className="border border-slate-300 p-1.5">{r.parameter}</td>
                             <td className="border border-slate-300 p-1.5 text-center text-slate-400 uppercase text-[9px]">Rapid Test Kit</td>
                             <td className={`border border-slate-300 p-1.5 text-center font-black ${r.result === 'POSITIF' ? 'text-red-600' : 'text-emerald-600'}`}>{r.result}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div className="space-y-3 pt-2">
                 <p className="text-justify font-sans text-[10pt] leading-relaxed">
                    Menerangkan bahwa pada saat dilakukan pemeriksaan, yang bersangkutan dinyatakan <b className="uppercase">{data.results.some(r => r.result === 'POSITIF') ? 'TERINDIKASI POSITIF' : 'BEBAS / NEGATIF'}</b> dari penyalahgunaan Narkotika, Psikotropika, dan Zat Adiktif lainnya.
                 </p>
                 <p className="text-sm italic bg-slate-50 p-2 border border-dashed border-slate-300">Surat keterangan ini dipergunakan untuk: <b>{data.purpose}</b></p>
              </div>
           </div>

           {/* TANDA TANGAN (Grouped: Anti Potong) */}
           <div className="shrink-0 mt-8 flex justify-between items-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center w-48">
                 <div className="border-2 border-dashed border-slate-200 rounded-lg p-3 opacity-50">
                    <ShieldCheck size={32} className="mx-auto text-slate-400" />
                    <p className="text-[7px] font-black uppercase mt-1">Authentic Lab Report</p>
                 </div>
              </div>
              <div className="text-center w-64 font-sans">
                 <p className="text-xs mb-14">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
                 <p className="font-bold underline uppercase text-sm leading-none">{data.examinerName}</p>
                 <p className="text-[9pt] text-slate-500 mt-1 uppercase">SIP: {data.examinerNip}</p>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: DOCTOR CERTIFICATE (Compact) ---
      return (
        <div className="font-sans text-[10.5pt] text-slate-800 leading-snug">
           <div className="border-b-2 border-emerald-500 pb-3 mb-6 flex justify-between items-end">
              <div>
                 <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">Health Certificate</h1>
                 <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Drug Free Statement</p>
              </div>
              <div className="text-right">
                 <p className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">No: {data.docNo}</p>
              </div>
           </div>

           <div className="mb-6">
              <p className="mb-3">Yang bertanda tangan di bawah ini, Dokter Pemeriksa pada <strong>{data.clinicName}</strong>, menerangkan dengan sesungguhnya bahwa:</p>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                 <div className="grid grid-cols-[100px_10px_1fr] gap-y-1 text-sm">
                    <span className="font-bold text-slate-500">Nama</span><span>:</span><span className="font-bold uppercase">{data.patientName}</span>
                    <span className="font-bold text-slate-500">Umur/Tgl Lahir</span><span>:</span><span>{data.patientBirth}</span>
                    <span className="font-bold text-slate-500">Pekerjaan</span><span>:</span><span>{data.patientJob}</span>
                    <span className="font-bold text-slate-500">Alamat</span><span>:</span><span>{data.patientAddress}</span>
                 </div>
              </div>

              <p className="mb-3">Telah dilakukan pemeriksaan fisik dan laboratorium urin (Screening Test) dengan hasil sebagai berikut:</p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
                 {data.results.map((r, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-200 pb-1">
                       <span className="text-sm font-medium">{r.parameter}</span>
                       <span className={`text-xs font-black px-2 py-0.5 rounded ${r.result === 'POSITIF' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>{r.result}</span>
                    </div>
                 ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-center mb-6">
                 <p className="text-sm text-emerald-800 font-medium">Kesimpulan Pemeriksaan:</p>
                 <p className="text-lg font-black text-emerald-700 uppercase mt-1">TIDAK DITEMUKAN TANDA-TANDA PENGGUNAAN NARKOBA</p>
              </div>

              <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
           </div>

           {/* TTD Grouped */}
           <div className="mt-8 flex justify-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center">
                 <p className="text-xs mb-16">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
                 <p className="font-black uppercase border-b-2 border-slate-900 inline-block pb-1">{data.examinerName}</p>
                 <p className="text-xs font-bold text-slate-400 mt-1">Dokter Pemeriksa</p>
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Lab Narkoba <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Lab' : 'Format Dokter'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && (
                     <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-50">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Format Lab</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Format Dokter</button>
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

               {/* KLINIK */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FlaskConical size={12}/> Klinik & Dokter</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Klinik/RS</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold" value={data.clinicName} onChange={e => handleDataChange('clinicName', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Klinik</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.clinicAddress} onChange={e => handleDataChange('clinicAddress', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Dokter</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.examinerName} onChange={e => handleDataChange('examinerName', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">SIP/NIP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.examinerNip} onChange={e => handleDataChange('examinerNip', e.target.value)} /></div>
                     </div>
                  </div>
               </div>

               {/* PASIEN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Data Pasien</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Pasien</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.patientNik} onChange={e => handleDataChange('patientNik', e.target.value)} /></div>
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">TTL / Umur</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.patientBirth} onChange={e => handleDataChange('patientBirth', e.target.value)} /></div>
                     </div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pekerjaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.patientJob} onChange={e => handleDataChange('patientJob', e.target.value)} /></div>
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none" value={data.patientAddress} onChange={e => handleDataChange('patientAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* HASIL TES */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ClipboardCheck size={12}/> Hasil Pemeriksaan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                     <p className="text-[10px] text-slate-400 italic mb-2">Klik tombol untuk mengubah hasil (Negatif/Positif)</p>
                     {data.results.map((r, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2">
                           <span className="text-xs font-medium">{r.parameter}</span>
                           <button 
                              onClick={() => toggleResult(idx)}
                              className={`px-3 py-1 rounded text-[10px] font-black transition-colors ${r.result === 'NEGATIF' ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                           >
                              {r.result}
                           </button>
                        </div>
                     ))}
                  </div>
               </div>

               {/* FOOTER */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileText size={12}/> Penutup</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                     <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Keperluan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-20 resize-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nomor Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} /></div>
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