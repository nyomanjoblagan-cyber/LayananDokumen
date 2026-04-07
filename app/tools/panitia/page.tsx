'use client';

/**
 * FILE: PernyataanPenyelenggaraPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pernyataan Penyelenggara Kegiatan
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, Building2, UserCircle2, 
  CalendarDays, ClipboardCheck, Info, Edit3, Eye, Check, LayoutTemplate, ChevronDown, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

// --- 1. TYPE DEFINITIONS ---
interface StatementData {
  city: string;
  date: string;
  docNo: string;
  
  organizerName: string;
  picName: string;
  picPosition: string;
  picNik: string;
  picAddress: string;
  
  eventName: string;
  eventDate: string;
  eventLocation: string;
  
  clauses: string[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: StatementData = {
  city: 'DENPASAR',
  date: '', 
  docNo: '02/SPP/EVENT/I/2026',
  
  organizerName: 'PT. KREATIF ANAK BANGSA',
  picName: 'BAGUS RAMADHAN',
  picPosition: 'Ketua Panitia Pelaksana',
  picNik: '5171010101990001',
  picAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara, Bali',
  
  eventName: 'FESTIVAL MUSIK AKHIR PEKAN 2026',
  eventDate: '15 Februari 2026',
  eventLocation: 'Lapangan Niti Mandala Renon, Denpasar',
  
  clauses: [
    'Menjamin keamanan, ketertiban, dan kebersihan di lokasi selama acara berlangsung.',
    'Bertanggung jawab penuh atas segala risiko yang timbul akibat penyelenggaraan acara tersebut.',
    'Mematuhi seluruh regulasi dan peraturan perundang-undangan yang berlaku di wilayah setempat.',
    'Tidak akan melakukan kegiatan yang melanggar norma kesusilaan atau ketertiban umum.'
  ]
};

// --- 3. KOMPONEN UTAMA ---
export default function PernyataanPenyelenggaraPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <StatementBuilder />
    </Suspense>
  );
}

function StatementBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<StatementData>(INITIAL_DATA);
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof StatementData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const StatementContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* JUDUL UTAMA */}
        <div className="text-center mb-10 shrink-0">
          <h1 className="text-[18pt] font-black underline uppercase decoration-2 underline-offset-8 leading-tight tracking-tight">SURAT PERNYATAAN</h1>
          <p className="text-[10pt] font-sans mt-4 italic uppercase tracking-[0.2em] text-slate-400 print:text-black">Tanggung Jawab Penyelenggaraan Kegiatan</p>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow space-y-6">
          <p>Saya yang bertanda tangan di bawah ini:</p>
          
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 print:border-slate-300 break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.picName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.picPosition}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Instansi</span><span>:</span><span className="font-bold">{data.organizerName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.picNik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.picAddress}</span></div>
          </div>

          <p className="text-justify">Menyatakan dengan sadar dan penuh tanggung jawab selaku penyelenggara kegiatan <strong>{data.eventName}</strong>, bahwa kami berkomitmen untuk:</p>

          <ul className="ml-8 space-y-2">
              {data.clauses.map((clause, idx) => (
                  <li key={idx} className="flex gap-4 break-inside-avoid">
                      <span className="font-bold text-slate-300 print:text-black">{idx + 1}.</span>
                      <span className="text-[10.5pt]">{clause}</span>
                  </li>
              ))}
          </ul>

          <p className="indent-10 text-justify">
              Pernyataan ini dibuat sebagai kelengkapan syarat administrasi perizinan kegiatan. Apabila di kemudian hari ditemukan pelanggaran terhadap komitmen di atas, saya bersedia mempertanggungjawabkannya sesuai dengan hukum dan peraturan yang berlaku.
          </p>

          <p>Demikian surat pernyataan ini dibuat dengan sebenar-benarnya tanpa ada paksaan dari pihak manapun.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="mt-12 pt-10 shrink-0 text-center break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                <td className="w-1/2"></td>
                <td className="text-center align-top font-sans">
                  <p className="text-[11pt] mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                  <p className="uppercase text-[8pt] font-black text-slate-400 mb-2 tracking-widest print:text-black">Pembuat Pernyataan,</p>
                  <div className="flex flex-col items-center justify-center h-32 mt-4">
                     <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-300 italic mb-4 uppercase">Materai</div>
                     <p className="font-bold underline uppercase text-[11pt] font-serif tracking-tight">{data.picName}</p>
                     <p className="text-[9pt] font-sans opacity-60 leading-tight print:opacity-100">{data.picPosition}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
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
               <ShieldCheck size={16} className="text-blue-500" /> <span>Event Guarantor Builder</span>
            </div>
          </div>
          <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Penanggung Jawab</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.picName} onChange={e => handleDataChange('picName', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.picPosition} onChange={e => handleDataChange('picPosition', e.target.value)} placeholder="Jabatan (cth: Ketua Panitia)" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.organizerName} onChange={e => handleDataChange('organizerName', e.target.value)} placeholder="Nama Organisasi" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.picNik} onChange={e => handleDataChange('picNik', e.target.value)} placeholder="NIK" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.picAddress} onChange={e => handleDataChange('picAddress', e.target.value)} placeholder="Alamat Lengkap" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><CalendarDays size={12}/> Event Info</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} placeholder="Judul Kegiatan" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} placeholder="Tanggal Pelaksanaan" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.eventLocation} onChange={e => handleDataChange('eventLocation', e.target.value)} placeholder="Lokasi Acara" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><ClipboardCheck size={12}/> Legitimasi</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota TTD" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <StatementContent />
            </div>
            <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><StatementContent /></div></div>
    </div>
  );
}