'use client';

/**
 * FILE: PerjanjianDamaiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Perdamaian (Settlement Agreement)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  HeartHandshake, ShieldAlert, Users, Scale, CalendarDays, FileText, User, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Compact Rapi';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0 font-serif text-slate-900 leading-normal text-[11pt]">
        {/* TEMPLATE 1: FORMAL (2 HALAMAN) */}
        {templateId === 1 && (
          <>
            {/* HALAMAN 1 */}
            <div className="bg-white flex flex-col box-border p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto mb-8 print:mb-0">
                <div className="text-center mb-8 pb-4 border-b-2 border-black shrink-0">
                  <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN PERDAMAIAN</h1>
                </div>

                <div className="flex-grow">
                  <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

                  <div className="ml-4 mb-4 text-sm shrink-0 break-inside-avoid">
                    <table className="w-full leading-snug">
                        <tbody>
                          <tr><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p1Name}</td></tr>
                          <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top font-mono">{data.p1Nik}</td></tr>
                          <tr><td className="align-top">Pekerjaan</td><td className="align-top">:</td><td className="align-top">{data.p1Job}</td></tr>
                          <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                        </tbody>
                    </table>
                    <div className="mt-1 italic">Bertindak untuk dan atas nama pribadi, selanjutnya disebut <strong>PIHAK PERTAMA</strong>.</div>
                  </div>

                  <div className="ml-4 mb-6 text-sm shrink-0 break-inside-avoid">
                    <table className="w-full leading-snug">
                        <tbody>
                          <tr><td className="w-24 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p2Name}</td></tr>
                          <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top font-mono">{data.p2Nik}</td></tr>
                          <tr><td className="align-top">Pekerjaan</td><td className="align-top">:</td><td className="align-top">{data.p2Job}</td></tr>
                          <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                        </tbody>
                    </table>
                    <div className="mt-1 italic">Bertindak untuk dan atas nama pribadi, selanjutnya disebut <strong>PIHAK KEDUA</strong>.</div>
                  </div>

                  <p className="mb-4 text-justify">Kedua Belah Pihak secara sadar mengakui telah terjadi peristiwa <strong>{data.incidentTitle}</strong> pada tanggal {formatDateSafe(data.incidentDate)} dengan rincian:</p>
                  <div className="bg-slate-50 p-4 border rounded italic text-sm mb-6 print:bg-transparent print:border-black break-inside-avoid">
                    "{data.incidentDetail}"
                  </div>

                  <p className="mb-6 text-justify">Bahwa atas peristiwa tersebut, PARA PIHAK sepakat berdamai dengan ketentuan sebagai berikut:</p>

                  <div className="mb-4 break-inside-avoid">
                    <div className="text-center font-bold uppercase mb-2 text-sm underline">PASAL 1: KESEPAKATAN GANTI RUGI</div>
                    <p className="text-sm text-justify">PIHAK PERTAMA bersedia memberikan ganti rugi kepada PIHAK KEDUA sebesar <strong>{data.compensation}</strong> ({data.compensationText}) sebagai bentuk tanggung jawab. {data.settlementDetail}</p>
                  </div>
                </div>

                <div className="text-right mt-auto text-[10px] text-slate-300 italic">Halaman 1 dari 2</div>
            </div>

            {/* HALAMAN 2 */}
            <div className="bg-white flex flex-col box-border p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
                <div className="space-y-8 text-justify pt-4 flex-grow">
                  <div className="break-inside-avoid">
                      <div className="text-center font-bold uppercase mb-2 text-sm underline">PASAL 2: PENGHENTIAN TUNTUTAN</div>
                      <p className="text-sm">Dengan ditandatanganinya surat ini, PIHAK KEDUA menyatakan permasalahan telah <strong>SELESAI</strong>. PIHAK KEDUA tidak akan melakukan tuntutan hukum apapun, baik Perdata maupun Pidana.</p>
                  </div>
                  <div className="break-inside-avoid">
                      <div className="text-center font-bold uppercase mb-2 text-sm underline">PASAL 3: KEKELUARGAAN</div>
                      <p className="text-sm">PARA PIHAK sepakat untuk saling memaafkan dan menjalin hubungan baik di masa depan, serta tidak akan saling mengungkit kembali permasalahan ini.</p>
                  </div>

                  {data.additionalClause && (
                    <div className="break-inside-avoid">
                      <div className="text-center font-bold uppercase mb-2 text-sm underline">PASAL 4: LAIN-LAIN</div>
                      <p className="text-sm whitespace-pre-wrap">{data.additionalClause}</p>
                    </div>
                  )}

                  <p className="mt-8 text-sm italic">Demikian surat perjanjian ini dibuat dalam keadaan sadar tanpa paksaan dari pihak manapun.</p>
                </div>

                <div className="mt-12 shrink-0 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
                  <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12">
                      <div>
                          <p className="mb-2 font-bold uppercase text-[10px] text-slate-400">Pihak Pertama</p>
                          <div className="h-24 flex flex-col justify-end">
                            <div className="border border-slate-200 w-24 h-14 mx-auto mb-[-2.5rem] flex items-center justify-center text-[7px] text-slate-300 italic uppercase">Materai</div>
                            <p className="font-bold underline uppercase relative z-10">{data.p1Name}</p>
                          </div>
                      </div>
                      <div>
                          <p className="mb-2 font-bold uppercase text-[10px] text-slate-400">Pihak Kedua</p>
                          <div className="h-24 flex flex-col justify-end">
                             <p className="font-bold underline uppercase">{data.p2Name}</p>
                          </div>
                      </div>
                  </div>

                  <div className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-4">Saksi-Saksi</div>
                  <div className="grid grid-cols-2 gap-8 text-center text-xs">
                      <div>
                          <p className="mb-12 border-b border-slate-200 w-3/4 mx-auto"></p>
                          <p>( {data.witness1} )</p>
                      </div>
                      <div>
                          <p className="mb-12 border-b border-slate-200 w-3/4 mx-auto"></p>
                          <p>( {data.witness2} )</p>
                      </div>
                  </div>
                </div>
                <div className="text-right mt-auto text-[10px] text-slate-300 italic">Halaman 2 dari 2</div>
            </div>
          </>
        )}

        {/* TEMPLATE 2: COMPACT (1 HALAMAN) */}
        {templateId === 2 && (
          <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
              <div className="text-center mb-10 border-b-4 border-slate-900 pb-2 shrink-0">
                <h1 className="font-black text-2xl uppercase tracking-tighter">SURAT PERNYATAAN DAMAI</h1>
              </div>
              <p className="mb-4 text-justify text-sm">Pada hari ini {data.day}, {formatDateSafe(data.date)}, bertempat di {data.city}, PARA PIHAK sepakat berdamai atas insiden <strong>{data.incidentTitle}</strong>:</p>

              <div className="grid grid-cols-2 gap-6 mb-6 text-[9pt] shrink-0 break-inside-avoid">
                <div className="border-l-4 border-emerald-500 p-3 bg-slate-50 rounded-r-xl print:bg-transparent print:border-2">
                  <div className="font-black uppercase mb-1 text-emerald-700">PIHAK I</div>
                  <b>{data.p1Name}</b><br/>{data.p1Nik}<br/>{data.p1Address}
                </div>
                <div className="border-l-4 border-blue-500 p-3 bg-slate-50 rounded-r-xl print:bg-transparent print:border-2">
                  <div className="font-black uppercase mb-1 text-blue-700">PIHAK II</div>
                  <b>{data.p2Name}</b><br/>{data.p2Nik}<br/>{data.p2Address}
                </div>
              </div>

              <div className="mb-6 border-2 border-dashed border-slate-200 p-5 text-sm italic text-slate-600 bg-slate-50/50 print:bg-transparent print:border-black shrink-0 break-inside-avoid">
                " {data.incidentDetail} "
              </div>

              <div className="text-[11pt] text-justify space-y-6 flex-grow">
                <p>PIHAK I memberikan ganti rugi sebesar <strong>{data.compensation}</strong>. Dengan ini permasalahan dinyatakan selesai secara kekeluargaan.</p>
                <p>PARA PIHAK tidak akan melakukan tuntutan hukum di kemudian hari. {data.additionalClause}</p>
                <p>Demikian surat pernyataan ini dibuat agar dapat dipergunakan semestinya.</p>
              </div>

              <div className="mt-12 shrink-0 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between text-center mb-16 text-sm">
                    <div className="w-48">
                        <p className="mb-4 font-bold uppercase text-[10px] text-slate-300">Pihak I</p>
                        <div className="border border-slate-200 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-300 italic">MATERAI</div>
                        <p className="font-bold underline uppercase">{data.p1Name}</p>
                    </div>
                    <div className="w-48">
                        <p className="mb-4 font-bold uppercase text-[10px] text-slate-300">Pihak II</p>
                        <div className="h-12 mb-2"></div>
                        <p className="font-bold underline uppercase">{data.p2Name}</p>
                    </div>
                  </div>

                  <div className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest border-t pt-4">Saksi: {data.witness1} & {data.witness2}</div>
              </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <HeartHandshake size={16} className="text-emerald-500" /> <span>Settlement Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Legal Formal (2 Hal) {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Compact Rapi (1 Hal) {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Legal</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Pertama</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} placeholder="NIK" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat Lengkap" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Kedua</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="NIK" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Lengkap" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><ShieldAlert size={12}/> Detail Insiden</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none" value={data.incidentTitle} onChange={e => handleDataChange('incidentTitle', e.target.value)} placeholder="Judul Masalah" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-red-500 outline-none leading-relaxed" value={data.incidentDetail} onChange={e => handleDataChange('incidentDetail', e.target.value)} placeholder="Kronologi Singkat..." />
                 <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.incidentDate} onChange={e => handleDataChange('incidentDate', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Scale size={12}/> Kesepakatan Damai</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-black text-amber-600 focus:ring-2 focus:ring-amber-500 outline-none" value={data.compensation} onChange={e => handleDataChange('compensation', e.target.value)} placeholder="Nominal Ganti Rugi" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none" value={data.settlementDetail} onChange={e => handleDataChange('settlementDetail', e.target.value)} placeholder="Cara Penyelesaian..." />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}