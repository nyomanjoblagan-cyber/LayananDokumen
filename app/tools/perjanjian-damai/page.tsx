'use client';

/**
 * FILE: PerjanjianDamaiPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Perjanjian Perdamaian (Settlement Agreement)
 * FEATURES:
 * - Dual Template (Full Legal Formal vs Compact)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  HeartHandshake, ShieldAlert, Users, Scale, CalendarDays, FileText, User, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface SettlementData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1 (Pelaku/Penanggung)
  p1Name: string;
  p1Age: string;
  p1Job: string;
  p1Nik: string;
  p1Address: string;
  
  // Pihak 2 (Korban/Penerima)
  p2Name: string;
  p2Age: string;
  p2Job: string;
  p2Nik: string;
  p2Address: string;
  
  // Insiden
  incidentTitle: string;
  incidentDate: string;
  incidentDetail: string;
  
  // Kesepakatan
  compensation: string;
  compensationText: string;
  settlementDetail: string;
  additionalClause: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SettlementData = {
  day: 'SENIN',
  date: '', // Diisi useEffect
  city: 'JAKARTA',
  
  p1Name: 'BUDI SANTOSO', 
  p1Age: '45', 
  p1Job: 'Wiraswasta', 
  p1Nik: '3171010101780001', 
  p1Address: 'Jl. Merdeka No. 10, RT 01/02, Tebet, Jakarta Selatan',
  
  p2Name: 'ANDI WIJAYA', 
  p2Age: '32', 
  p2Job: 'Karyawan Swasta', 
  p2Nik: '3171020202920005',
  p2Address: 'Jl. Sudirman No. 45, Kuningan, Jakarta Selatan',
  
  incidentTitle: 'Kecelakaan Lalu Lintas',
  incidentDate: '2026-01-05',
  incidentDetail: 'Kecelakaan lalu lintas ringan di area Parkir Mal Senayan yang mengakibatkan kerusakan pada bemper depan mobil Pihak Kedua serta lecet pada pintu samping mobil Pihak Pertama.',
  
  compensation: 'Rp 2.500.000,-',
  compensationText: 'Dua Juta Lima Ratus Ribu Rupiah',
  settlementDetail: 'Pihak Pertama memberikan biaya ganti rugi secara tunai dan menanggung seluruh biaya perbaikan kendaraan Pihak Kedua di bengkel resmi.',
  additionalClause: 'Kedua belah pihak saling memaafkan dan tidak akan melakukan tuntutan hukum di kemudian hari.',
  
  witness1: 'HENDRA SAPUTRA (Ketua RT)', 
  witness2: 'SITI AMINAH (Saksi Mata)'
};

// --- 3. KOMPONEN UTAMA ---
export default function PerjanjianDamaiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Legal Editor...</div>}>
      <DamaiBuilder />
    </Suspense>
  );
}

function DamaiBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SettlementData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof SettlementData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Legal Formal (2 Halaman)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Compact Rapi (1 Halaman)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Compact Rapi';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="flex flex-col gap-8 print:gap-0 font-serif text-slate-900 leading-normal text-[11pt]">
      {/* TEMPLATE 1: FORMAL (2 HALAMAN) */}
      {templateId === 1 && (
        <>
          {/* HALAMAN 1 */}
          <div className="bg-white flex flex-col box-border p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto mb-8 print:mb-0">
              <div className="text-center mb-8 pb-4 border-b-2 border-black shrink-0">
                <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN PERDAMAIAN</h1>
              </div>

              <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

              <div className="ml-4 mb-4 text-sm shrink-0">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p1Name}</td></tr>
                      <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top">{data.p1Nik}</td></tr>
                      <tr><td className="align-top">Pekerjaan</td><td className="align-top">:</td><td className="align-top">{data.p1Job}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK PERTAMA</strong>.</div>
              </div>

              <div className="ml-4 mb-6 text-sm shrink-0">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p2Name}</td></tr>
                      <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top">{data.p2Nik}</td></tr>
                      <tr><td className="align-top">Pekerjaan</td><td className="align-top">:</td><td className="align-top">{data.p2Job}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK KEDUA</strong>.</div>
              </div>

              <p className="mb-4 text-justify">Kedua Belah Pihak secara sadar mengakui telah terjadi peristiwa <strong>{data.incidentTitle}</strong> pada tanggal {isClient && data.incidentDate ? new Date(data.incidentDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''} dengan rincian:</p>
              <div className="bg-slate-50 p-4 border rounded italic text-sm mb-6 print:bg-transparent print:border-black">
                "{data.incidentDetail}"
              </div>

              <p className="mb-4 text-justify">Bahwa atas peristiwa tersebut, Kedua Belah Pihak telah sepakat untuk berdamai dengan ketentuan sebagai berikut:</p>

              <div className="mb-4">
                <div className="text-center font-bold uppercase mb-2">PASAL 1<br/>KESEPAKATAN GANTI RUGI</div>
                <p className="text-sm text-justify">PIHAK PERTAMA bersedia memberikan ganti rugi/kompensasi kepada PIHAK KEDUA sebesar <strong>{data.compensation}</strong> ({data.compensationText}) sebagai bentuk pertanggungjawaban atas kerugian yang dialami. {data.settlementDetail}</p>
              </div>

              <div className="text-right mt-auto text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
          </div>

          {/* HALAMAN 2 */}
          <div className="bg-white flex flex-col box-border p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
              <div className="space-y-6 text-justify pt-4">
                <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL 2<br/>PENGHENTIAN TUNTUTAN</div>
                    <p className="text-sm">Dengan ditandatanganinya surat ini, maka PIHAK KEDUA menyatakan bahwa permasalahan ini telah <strong>SELESAI</strong>. PIHAK KEDUA tidak akan melakukan tuntutan hukum apapun di kemudian hari, baik secara Perdata maupun Pidana.</p>
                </div>
                <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL 3<br/>KEKELUARGAAN</div>
                    <p className="text-sm">Kedua Belah Pihak sepakat untuk saling memaafkan dan menjalin hubungan baik di masa depan, serta tidak akan saling mengungkit kembali permasalahan ini.</p>
                </div>

                {data.additionalClause && (
                  <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL 4<br/>LAIN-LAIN</div>
                    <p className="text-sm whitespace-pre-wrap">{data.additionalClause}</p>
                  </div>
                )}

                <p className="mt-8 text-sm">Demikian surat perjanjian perdamaian ini dibuat dalam keadaan sadar, sehat jasmani dan rohani, tanpa ada paksaan dari pihak manapun.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="mt-12 shrink-0" style={{ pageBreakInside: 'avoid' }}>
                <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12">
                    <div>
                        <p className="mb-2 font-bold uppercase">Pihak Pertama</p>
                        <p className="text-xs mb-16">{data.p1Name}</p>
                        <div className="border border-slate-300 w-24 h-14 mx-auto mb-[-3.5rem] mt-[-3rem] flex items-center justify-center text-[8px] text-slate-400 italic print:border-black print:text-black">MATERAI</div>
                        <p className="font-bold underline uppercase relative z-10">{data.p1Name}</p>
                    </div>
                    <div>
                        <p className="mb-2 font-bold uppercase">Pihak Kedua</p>
                        <p className="text-xs mb-16">{data.p2Name}</p>
                        <p className="font-bold underline uppercase">{data.p2Name}</p>
                    </div>
                </div>

                <div className="text-center text-xs">
                    <p className="mb-4 font-bold">SAKSI-SAKSI</p>
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                        <div>
                            <p className="mb-8 border-b border-black w-3/4 mx-auto"></p>
                            <p>( {data.witness1} )</p>
                        </div>
                        <div>
                            <p className="mb-8 border-b border-black w-3/4 mx-auto"></p>
                            <p>( {data.witness2} )</p>
                        </div>
                    </div>
                </div>
              </div>

              <div className="text-right mt-auto text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
          </div>
        </>
      )}

      {/* TEMPLATE 2: COMPACT (1 HALAMAN) */}
      {templateId === 2 && (
        <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
            <div className="text-center mb-6 border-b-2 border-black pb-2 shrink-0">
              <h1 className="font-bold text-xl uppercase underline">SURAT PERNYATAAN DAMAI</h1>
            </div>
            <p className="mb-4 text-justify text-sm">Pada hari ini {data.day}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'}) : ''}, bertempat di {data.city}, kami yang bertanda tangan di bawah ini sepakat berdamai atas peristiwa <strong>{data.incidentTitle}</strong>:</p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-[10px] shrink-0">
              <div className="border border-black p-2 rounded">
                <div className="font-bold uppercase mb-1 border-b border-black">Pihak I</div>
                Nama: {data.p1Name}<br/>NIK: {data.p1Nik}<br/>Alamat: {data.p1Address}
              </div>
              <div className="border border-black p-2 rounded">
                <div className="font-bold uppercase mb-1 border-b border-black">Pihak II</div>
                Nama: {data.p2Name}<br/>NIK: {data.p2Nik}<br/>Alamat: {data.p2Address}
              </div>
            </div>

            <div className="mb-4 border border-black p-4 text-xs italic bg-slate-50 print:bg-transparent shrink-0">
              " {data.incidentDetail} "
            </div>

            <div className="text-sm text-justify space-y-4 flex-grow">
              <p>Pihak I memberikan ganti rugi sebesar <strong>{data.compensation}</strong>. Dengan ini permasalahan dinyatakan selesai secara kekeluargaan.</p>
              <p>Kedua Pihak tidak akan melakukan tuntutan hukum di kemudian hari. {data.additionalClause}</p>
              <p className="pt-2">Demikian surat pernyataan ini dibuat agar dapat dipergunakan semestinya.</p>
            </div>

            <div className="mt-12 shrink-0" style={{ pageBreakInside: 'avoid' }}>
                <div className="flex justify-between text-center mb-12 text-sm">
                <div className="w-40">
                    <p className="mb-4 font-bold uppercase">Pihak I</p>
                    <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-300 italic print:border-black print:text-black">MATERAI</div>
                    <p className="font-bold underline uppercase">{data.p1Name}</p>
                </div>
                <div className="w-40">
                    <p className="mb-16 font-bold uppercase">Pihak Kedua</p>
                    <p className="font-bold underline uppercase">{data.p2Name}</p>
                </div>
                </div>

                <div className="text-center text-xs">
                <p className="mb-10 font-bold underline uppercase">Saksi-Saksi</p>
                <div className="flex justify-center gap-12">
                    <div>( {data.witness1} )</div>
                    <div>( {data.witness2} )</div>
                </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
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
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <HeartHandshake size={16} className="text-emerald-500" /> <span>SETTLEMENT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Perjanjian</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><CalendarDays size={12}/> Waktu & Lokasi</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Hari" />
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                 </div>
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Para Pihak</h3>
                 <div className="space-y-4">
                    <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-2">
                       <label className="text-[9px] font-bold text-emerald-700 uppercase">Pihak I (Pelaku/Penanggung)</label>
                       <input className="w-full p-2 border rounded text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama" />
                       <input className="w-full p-2 border rounded text-xs" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="NIK" />
                       <input className="w-full p-2 border rounded text-xs" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Pekerjaan" />
                       <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat" />
                    </div>
                    <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 space-y-2">
                       <label className="text-[9px] font-bold text-blue-700 uppercase">Pihak II (Korban/Penerima)</label>
                       <input className="w-full p-2 border rounded text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama" />
                       <input className="w-full p-2 border rounded text-xs" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="NIK" />
                       <input className="w-full p-2 border rounded text-xs" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Pekerjaan" />
                       <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat" />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><ShieldAlert size={12}/> Masalah & Kronologi</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.incidentTitle} onChange={e => handleDataChange('incidentTitle', e.target.value)} placeholder="Judul Masalah" />
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.incidentDetail} onChange={e => handleDataChange('incidentDetail', e.target.value)} placeholder="Kronologi Singkat" />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.incidentDate} onChange={e => handleDataChange('incidentDate', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Scale size={12}/> Kesepakatan</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.compensation} onChange={e => handleDataChange('compensation', e.target.value)} placeholder="Nominal" />
                    <input className="w-full p-2 border rounded text-xs" value={data.compensationText} onChange={e => handleDataChange('compensationText', e.target.value)} placeholder="Terbilang" />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.settlementDetail} onChange={e => handleDataChange('settlementDetail', e.target.value)} placeholder="Detail Ganti Rugi" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.additionalClause} onChange={e => handleDataChange('additionalClause', e.target.value)} placeholder="Pasal Tambahan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 flex items-center gap-2"><Users size={12}/> Saksi-Saksi</h3>
                 <input className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi I" />
                 <input className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi II" />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
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
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
