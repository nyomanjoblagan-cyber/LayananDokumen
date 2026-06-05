'use client';

/**
 * FILE: SuratKuasaPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Kuasa (Power of Attorney) Multi-Purpose
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML & Stabilisasi Scope Variabel
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, RotateCcw,
  User, UserCheck, FileText, Scroll, Car, GraduationCap, Banknote, 
  ChevronDown, Check, Edit3, Eye, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface KuasaData {
  city: string;
  date: string;
  pemberiName: string;
  pemberiNik: string;
  pemberiJob: string;
  pemberiAddress: string;
  penerimaName: string;
  penerimaNik: string;
  penerimaJob: string;
  penerimaAddress: string;
  purposeTitle: string;
  purposeDetail: string;
}

// --- 2. GLOBAL CONSTANTS ---
const TEMPLATES = [
  { id: 1, name: "Format Klasik", desc: "Layout standar satu halaman" },
  { id: 2, name: "Format Modern", desc: "Layout blok kontemporer" }
];

// --- 3. DATA DEFAULT ---
const INITIAL_DATA: KuasaData = {
  city: 'Jakarta',
  date: '',
  pemberiName: 'BUDI SANTOSO',
  pemberiNik: '3171010101800001',
  pemberiJob: 'Wiraswasta',
  pemberiAddress: 'Jl. Merdeka No. 45, Jakarta Pusat',
  penerimaName: 'ANDI SAPUTRA',
  penerimaNik: '3201010101950002',
  penerimaJob: 'Karyawan Swasta',
  penerimaAddress: 'Jl. Kemenangan No. 10, Bekasi',
  purposeTitle: 'PENGAMBILAN BPKB KENDARAAN BERMOTOR',
  purposeDetail: 'Untuk mengambil Buku Pemilik Kendaraan Bermotor (BPKB) dengan rincian:\n\nMerk/Type : Honda Vario 125\nNo. Polisi : B 1234 XXX\nNo. Rangka : MH1JM123456789\nAtas Nama : Budi Santoso',
};

export default function SuratKuasaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor Kuasa...</div>}>
      <KuasaToolBuilder />
    </Suspense>
  );
}

function KuasaToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<KuasaData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof KuasaData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const applyPreset = (type: 'bpkb' | 'ijazah' | 'gaji' | 'umum') => {
    let title = '';
    let detail = '';
    if (type === 'bpkb') {
      title = 'PENGAMBILAN BPKB KENDARAAN';
      detail = 'Untuk mengambil Buku Pemilik Kendaraan Bermotor (BPKB) di SAMSAT/Leasing [...] dengan rincian:\nMerk : ...\nNo. Polisi : ...\nNo. Rangka : ...\nAtas Nama : ...';
    } else if (type === 'ijazah') {
      title = 'PENGAMBILAN IJAZAH';
      detail = 'Untuk mengambil Ijazah Asli dan Transkrip Nilai pada:\nInstansi : ...\nJurusan : ...\nLulus Tahun : ...\nNomor Ijazah : ...';
    } else if (type === 'gaji') {
      title = 'PENGAMBILAN DANA / GAJI';
      detail = 'Untuk mengambil uang gaji/pensiun bulan [...] pada:\nBank/Kantor : ...\nJumlah : Rp ...\nNomor Rekening : ...';
    } else {
      title = 'PENGAMBILAN DOKUMEN';
      detail = 'Untuk mengambil dokumen berupa [...] yang berada di [...] dengan nomor referensi [...].';
    }
    setData(prev => ({ ...prev, purposeTitle: title, purposeDetail: detail }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        <div className={`text-center mb-10 shrink-0 ${templateId === 1 ? 'border-b-4 border-double border-slate-900 pb-4' : 'border-b-2 border-slate-100 pb-4 print:border-black'}`}>
          <h1 className="text-2xl font-black underline uppercase tracking-[0.3em] leading-none text-slate-900">SURAT KUASA</h1>
        </div>

        <div className="space-y-6 flex-grow text-justify leading-relaxed">
          <p>Saya yang bertanda tangan di bawah ini (Pemberi Kuasa):</p>
          <div className="ml-8 space-y-1.5 font-sans italic border-l-4 border-slate-100 pl-8 py-1 break-inside-avoid print:border-slate-300">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase text-slate-900 not-italic">{data.pemberiName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK / No. KTP</span><span>:</span><span className="font-mono not-italic">{data.pemberiNik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span className="not-italic leading-snug">{data.pemberiAddress}</span></div>
          </div>

          <p>Dengan ini memberikan kuasa penuh kepada (Penerima Kuasa):</p>
          <div className="ml-8 space-y-1.5 font-sans italic border-l-4 border-blue-100 pl-8 py-1 break-inside-avoid print:border-slate-300">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase text-slate-900 not-italic">{data.penerimaName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK / No. KTP</span><span>:</span><span className="font-mono not-italic">{data.penerimaNik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span className="not-italic leading-snug">{data.penerimaAddress}</span></div>
          </div>

          <div className="space-y-6 pt-6">
            <p className="font-black text-center underline uppercase text-[10pt] tracking-[0.4em] italic text-slate-400 print:text-black">---------------- KHUSUS ----------------</p>
            <p>Untuk dan atas nama Pemberi Kuasa melakukan <strong>{data.purposeTitle}</strong> dengan rincian instruksi sebagai berikut:</p>
            <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-100 print:bg-transparent print:border-2 print:border-black break-inside-avoid shadow-inner print:shadow-none italic text-[11pt] whitespace-pre-line leading-relaxed text-slate-800 print:text-black">
              {data.purposeDetail}
            </div>
          </div>

          <p className="pt-4">Segala akibat dan tanggung jawab yang timbul sehubungan dengan pemberian kuasa ini menjadi tanggung jawab sepenuhnya dari Pemberi Kuasa. Demikian surat kuasa ini saya buat dalam keadaan sadar dan tanpa paksaan dari pihak manapun.</p>
        </div>

        <div className="shrink-0 mt-10 pt-10 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="grid grid-cols-2 gap-10 text-center font-sans">
              <div className="flex flex-col h-44">
                  <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-1">Penerima Kuasa,</p>
                  <div className="mt-auto">
                     <p className="font-black underline uppercase text-[11pt] tracking-tight text-slate-900">{data.penerimaName}</p>
                     <p className="text-[9pt] font-bold text-slate-400 mt-1 italic tracking-tighter">Penerima Tugas</p>
                  </div>
              </div>

              <div className="flex flex-col h-44">
                  <p className="text-[10pt] font-bold text-slate-400 mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                  <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-1">Pemberi Kuasa,</p>
                  <div className="mt-auto flex flex-col items-center">
                     <div className="border border-slate-200 w-24 h-16 flex items-center justify-center text-[7pt] text-slate-300 italic mb-4 uppercase">Materai 10.000</div>
                     <p className="font-black underline uppercase text-[11pt] tracking-tighter text-slate-900">{data.pemberiName}</p>
                  </div>
              </div>
            </div>
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
          body { background: white !important; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Scroll size={16} /> <span>Surat Kuasa Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden p-1">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Kuasa</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-2"><Check size={12}/> Pilih Jenis Kuasa</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => applyPreset('bpkb')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex items-center gap-2 hover:bg-emerald-600 hover:text-white transition-all"><Car size={14}/> AMBIL BPKB</button>
                    <button onClick={() => applyPreset('ijazah')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all"><GraduationCap size={14}/> AMBIL IJAZAH</button>
                    <button onClick={() => applyPreset('gaji')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex items-center gap-2 hover:bg-amber-600 hover:text-white transition-all"><Banknote size={14}/> AMBIL GAJI</button>
                    <button onClick={() => applyPreset('umum')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm flex items-center gap-2 hover:bg-slate-600 hover:text-white transition-all"><FileText size={14}/> LAINNYA</button>
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak I (Pemberi)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiName} onChange={e => handleDataChange('pemberiName', e.target.value)} placeholder="Nama Anda" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.pemberiNik} onChange={e => handleDataChange('pemberiNik', e.target.value)} placeholder="NIK Pemberi" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiAddress} onChange={e => handleDataChange('pemberiAddress', e.target.value)} placeholder="Alamat Sesuai KTP" />
              </div>

              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCheck size={12}/> Pihak II (Penerima)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaName} onChange={e => handleDataChange('penerimaName', e.target.value)} placeholder="Nama Yang Diberi Kuasa" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.penerimaNik} onChange={e => handleDataChange('penerimaNik', e.target.value)} placeholder="NIK Penerima" />
              </div>

              <div className="space-y-4 border-t pt-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Keperluan & Administrasi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-black focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.purposeTitle} onChange={e => handleDataChange('purposeTitle', e.target.value)} placeholder="Judul Kuasa (Khusus)" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-32 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed italic" value={data.purposeDetail} onChange={e => handleDataChange('purposeDetail', e.target.value)} placeholder="Detail Instruksi Kuasa..." />
                 <div className="grid grid-cols-2 gap-3 pt-2">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota TTD" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
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