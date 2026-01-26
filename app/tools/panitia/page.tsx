'use client';

/**
 * FILE: PernyataanPenyelenggaraPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pernyataan Penyelenggara Kegiatan
 * FEATURES:
 * - Single Formal Template (Standard Event Permit)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, Building2, UserCircle2, 
  CalendarDays, ClipboardCheck, Info, Edit3, Eye, Check, LayoutTemplate, ChevronDown, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
  date: '', // Diisi useEffect
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <StatementBuilder />
    </Suspense>
  );
}

function StatementBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<StatementData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof StatementData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const StatementContent = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      {/* JUDUL UTAMA */}
      <div className="text-center mb-8 shrink-0">
        <h1 className="text-[18pt] font-black underline uppercase decoration-2 underline-offset-8 leading-tight">SURAT PERNYATAAN</h1>
        <p className="text-[10pt] font-sans mt-4 italic uppercase tracking-[0.2em] text-slate-500 print:text-black">Tanggung Jawab Penyelenggaraan Kegiatan</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow space-y-5">
        <p>Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 print:border-slate-300">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.picName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.picPosition}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Instansi/Organisasi</span><span>:</span><span className="font-bold">{data.organizerName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.picNik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.picAddress}</span></div>
        </div>

        <p>Menyatakan dengan sadar dan penuh tanggung jawab selaku penyelenggara kegiatan <b>{data.eventName}</b>, bahwa kami akan:</p>

        <ul className="ml-8 space-y-2">
            {data.clauses.map((clause, idx) => (
                <li key={idx} className="flex gap-4">
                    <span className="font-bold text-slate-400 print:text-black">{idx + 1}.</span>
                    <span>{clause}</span>
                </li>
            ))}
        </ul>

        <p className="indent-10 text-justify">
            Pernyataan ini dibuat sebagai syarat administrasi perizinan. Apabila di kemudian hari terjadi pelanggaran, saya bersedia menerima sanksi sesuai hukum yang berlaku di Negara Kesatuan Republik Indonesia.
        </p>

        <p>Demikian surat pernyataan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-12 pt-10 shrink-0 text-center" style={{ pageBreakInside: 'avoid' }}>
        <table className="w-full table-fixed border-collapse">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center align-top">
                <p className="text-[11pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}</p>
                <p className="uppercase text-[8pt] font-black text-slate-400 mb-2 tracking-[0.2em] print:text-black">Pembuat Pernyataan,</p>
                <div className="flex flex-col items-center justify-center h-32 mt-4">
                   <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-300 italic mb-4 print:border-black print:text-black">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.picName}</p>
                   <p className="text-[9pt] font-sans opacity-60 leading-tight print:opacity-100">{data.picPosition}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <ShieldCheck size={16} className="text-blue-500" /> <span>Event Guarantor Builder</span>
            </div>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
            <Printer size={16} /> <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pernyataan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Penanggung Jawab</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.picName} onChange={e => handleDataChange('picName', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded text-xs" value={data.picPosition} onChange={e => handleDataChange('picPosition', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.organizerName} onChange={e => handleDataChange('organizerName', e.target.value)} placeholder="Instansi/Organisasi" />
                 <input className="w-full p-2 border rounded text-xs" value={data.picNik} onChange={e => handleDataChange('picNik', e.target.value)} placeholder="NIK" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.picAddress} onChange={e => handleDataChange('picAddress', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><CalendarDays size={12}/> Info Kegiatan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} placeholder="Nama Acara" />
                 <input className="w-full p-2 border rounded text-xs" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} placeholder="Waktu Acara" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-relaxed" value={data.eventLocation} onChange={e => handleDataChange('eventLocation', e.target.value)} placeholder="Lokasi Acara" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><ClipboardCheck size={12}/> Legitimasi</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-[10px] font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                    <StatementContent />
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
            <StatementContent />
         </div>
      </div>

    </div>
  );
}
