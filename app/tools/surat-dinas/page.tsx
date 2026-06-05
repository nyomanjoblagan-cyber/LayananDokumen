'use client';

/**
 * FILE: OfficialLetterPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Dinas Resmi dengan KOP dan Tembusan
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML & Stabilisasi Scope Variabel
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, X, Image as ImageIcon, 
  ChevronDown, Check, LayoutTemplate, Building2, 
  Mail, Users, FileText, Calendar, Plus, Trash2, Edit3, Eye, ImagePlus, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface OfficialLetterData {
  compName: string;
  compAddress: string;
  city: string;
  date: string;
  no: string;
  lampiran: string;
  perihal: string;
  receiver: string;
  receiverAddress: string;
  opening: string;
  eventDetails: string;
  closing: string;
  signerName: string;
  signerNIP: string;
  signerJob: string;
  cc: string[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: OfficialLetterData = {
  compName: 'DINAS PENDIDIKAN DAN KEBUDAYAAN',
  compAddress: 'Jl. Jenderal Sudirman No. 10, Jakarta Pusat\nTelp: (021) 555-7777 | Email: info@disdik.go.id',
  city: 'Jakarta',
  date: '',
  no: '005/UND/I/2026',
  lampiran: '-',
  perihal: 'Undangan Rapat Evaluasi Tahunan',
  receiver: 'Bapak/Ibu Kepala Sekolah\nSe-DKI Jakarta',
  receiverAddress: 'Di Tempat',
  opening: 'Dengan hormat,\n\nSehubungan dengan telah berakhirnya Tahun Anggaran 2025, kami bermaksud mengundang Bapak/Ibu untuk hadir dalam rapat evaluasi kinerja yang akan diselenggarakan pada:',
  eventDetails: 'Hari/Tanggal : Senin, 20 Januari 2026\nWaktu : 09.00 WIB s.d Selesai\nTempat : Aula Utama Gedung A, Lantai 2\nAgenda : Laporan Pertanggungjawaban & Rencana Kerja 2026',
  closing: 'Mengingat pentingnya acara tersebut, kami mohon kehadiran Bapak/Ibu tepat pada waktunya.\n\nDemikian undangan ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.',
  signerName: 'Dr. H. Budi Santoso, M.Pd',
  signerNIP: 'NIP. 19800101 200501 1 001',
  signerJob: 'Kepala Dinas',
  cc: ['Bupati/Walikota (sebagai laporan)', 'Arsip']
};

export default function OfficialLetterPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <OfficialLetterBuilder />
    </Suspense>
  );
}

function OfficialLetterBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<OfficialLetterData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof OfficialLetterData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const applyPreset = (type: 'meeting' | 'assignment' | 'permission') => {
    if (type === 'meeting') {
      setData(prev => ({
        ...prev,
        no: '005/UND/HRD/I/2026',
        perihal: 'Undangan Rapat Koordinasi',
        opening: 'Dengan hormat,\n\nMengharap kehadiran Bapak/Ibu pada rapat koordinasi bulanan yang akan dilaksanakan pada:',
        eventDetails: 'Hari/Tanggal : Senin, 20 Januari 2026\nWaktu : 13.00 WIB - Selesai\nTempat : Ruang Meeting Lt. 3\nAgenda : Pembahasan Target Q1 2026',
        closing: 'Demikian undangan ini kami sampaikan. Atas perhatiannya diucapkan terima kasih.'
      }));
    } else if (type === 'assignment') {
      setData(prev => ({
        ...prev,
        no: '090/ST/OPS/I/2026',
        perihal: 'Surat Perintah Tugas',
        opening: 'Yang bertanda tangan di bawah ini memberikan tugas kepada nama-nama terlampir untuk melakukan perjalanan dinas dalam rangka survei lapangan.',
        eventDetails: 'Tujuan : Cabang Surabaya & Malang\nDurasi : 3 (Tiga) Hari\nTanggal : 25 - 27 Januari 2026',
        closing: 'Demikian surat tugas ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.'
      }));
    } else if (type === 'permission') {
      setData(prev => ({
        ...prev,
        no: '012/IZIN/GA/I/2026',
        perihal: 'Permohonan Izin Penggunaan Tempat',
        opening: 'Dengan hormat,\n\nSehubungan dengan akan diadakannya kegiatan "Family Gathering 2026", kami bermaksud memohon izin penggunaan area lapangan yang Bapak/Ibu kelola.',
        eventDetails: 'Kegiatan : Family Gathering Karyawan\nTanggal : Sabtu, 15 Februari 2026\nWaktu : 07.00 - 15.00 WIB\nPeserta : +/- 100 Orang',
        closing: 'Besar harapan kami agar permohonan ini dapat dikabulkan. Atas kerjasamanya kami ucapkan terima kasih.'
      }));
    }
  };

  const handleCCChange = (idx: number, val: string) => {
    const newCC = [...data.cc];
    newCC[idx] = val;
    setData({ ...data, cc: newCC });
  };
  const addCC = () => setData({ ...data, cc: [...data.cc, ''] });
  const removeCC = (idx: number) => {
    const newCC = [...data.cc];
    newCC.splice(idx, 1);
    setData({ ...data, cc: newCC });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        setLogo(null);
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  const activeTemplateName = templateId === 1 ? "Instansi Pemerintah" : "Modern Corporate";

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Instansi Pemerintah (Serif)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Modern Corporate (Sans)
        </button>
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* KOP SURAT */}
        <div className={`flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 ${templateId === 1 ? 'text-center' : 'text-left'}`}>
          {logo ? (
            <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
          ) : (
            <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
              <Building2 size={32} />
            </div>
          )}
          <div className="flex-grow">
            <h1 className="text-[15pt] font-black uppercase leading-tight tracking-tight mb-1 text-slate-900">{data.compName}</h1>
            <p className="text-[9pt] font-sans whitespace-pre-line text-slate-500 print:text-black italic leading-tight">{data.compAddress}</p>
          </div>
        </div>

        {/* METADATA */}
        <div className="space-y-6 text-left font-sans">
          <div className="flex justify-between items-start text-[10pt]">
              <div className="space-y-0.5">
                  <p>Nomor : {data.no}</p>
                  <p>Lampiran : {data.lampiran}</p>
                  <p>Perihal : <strong>{data.perihal}</strong></p>
              </div>
              <p className="text-right">{data.city}, {formatDateSafe(data.date)}</p>
          </div>

          <div className="pt-4 space-y-1">
            <p>Yth. <strong>{data.receiver}</strong></p>
            <p className="whitespace-pre-line">{data.receiverAddress}</p>
          </div>

          {/* ISI SURAT */}
          <div className="pt-4 space-y-4 text-justify leading-relaxed overflow-visible">
            <p className="whitespace-pre-line">{data.opening}</p>
            
            <div className="ml-10 bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 print:bg-transparent print:border-2 print:border-black font-mono text-[9.5pt] whitespace-pre-line leading-relaxed italic shadow-inner print:shadow-none">
              {data.eventDetails}
            </div>

            <p className="whitespace-pre-line">{data.closing}</p>
          </div>
        </div>

        {/* AREA TANDA TANGAN */}
        <div className="mt-auto pt-10 border-t-2 border-slate-50 print:border-black break-inside-avoid">
          <div className="flex justify-end text-center font-sans">
            <div className="w-80 flex flex-col h-44">
              <p className="font-bold mb-1 uppercase tracking-widest text-[9pt] text-slate-400 print:text-black">{data.signerJob},</p>
              <div className="mt-auto">
                <p className="font-black underline uppercase text-[11pt] tracking-tighter text-slate-900 leading-none">{data.signerName}</p>
                <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-widest">{data.signerNIP}</p>
              </div>
            </div>
          </div>

          {/* TEMBUSAN */}
          {data.cc.length > 0 && (
            <div className="mt-8 text-[8.5pt] font-sans border-t border-slate-50 pt-4 print:border-black">
              <p className="font-black underline mb-1 italic uppercase text-slate-300 print:text-black">Tembusan Yth:</p>
              <ol className="list-decimal ml-5 text-slate-500 print:text-black space-y-0.5">
                {data.cc.map((item, idx) => (
                  item && <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>
          )}
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
          body { background: white !important; margin: 0 !important; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
          <div className="flex items-center gap-4 px-4 h-full">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeftCircle size={20} className="text-emerald-400" /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Mail size={16} /> <span>Official Letter Builder</span>
            </div>
          </div>
          <div className="absolute right-4 flex items-center gap-3 h-full">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180' : ''} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg transition-all active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print Surat</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Surat</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 grid grid-cols-3 gap-2">
                 <button onClick={() => applyPreset('meeting')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm hover:bg-emerald-600 hover:text-white transition-all">RAPAT</button>
                 <button onClick={() => applyPreset('assignment')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm hover:bg-blue-600 hover:text-white transition-all">TUGAS</button>
                 <button onClick={() => applyPreset('permission')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm hover:bg-amber-600 hover:text-white transition-all">IZIN</button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kop Instansi</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} placeholder="Nama Instansi" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.compAddress} onChange={e => handleDataChange('compAddress', e.target.value)} placeholder="Alamat & Kontak" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Mail size={12}/> Metadata & Penerima</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No. Surat" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.perihal} onChange={e => handleDataChange('perihal', e.target.value)} placeholder="Perihal" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.receiver} onChange={e => handleDataChange('receiver', e.target.value)} placeholder="Nama/Jabatan Penerima" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Isi Narasi</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.opening} onChange={e => handleDataChange('opening', e.target.value)} placeholder="Kalimat Pembuka..." />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-32 focus:ring-2 focus:ring-amber-500 outline-none font-mono" value={data.eventDetails} onChange={e => handleDataChange('eventDetails', e.target.value)} placeholder="Detail (Waktu/Tempat)..." />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} placeholder="Kalimat Penutup..." />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Plus size={12}/> Tembusan (CC)</h3>
                 {data.cc.map((item, idx) => (
                   <div key={idx} className="flex gap-2">
                     <input className="flex-1 p-2 border rounded text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={item} onChange={e => handleCCChange(idx, e.target.value)} placeholder={`Tembusan ${idx+1}`} />
                     <button onClick={() => removeCC(idx)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={16}/></button>
                   </div>
                 ))}
                 <button onClick={addCC} className="w-full py-2 border-2 border-dashed rounded-lg text-[10px] font-bold text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all">+ TAMBAH TEMBUSAN</button>
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
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-bold font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE