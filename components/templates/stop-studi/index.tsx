'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, UserCircle2, Edit3, RotateCcw,
  Building, FileText, ChevronDown, CheckCircle2, ShieldCheck,
  LayoutTemplate, School, FileSignature
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

interface StopStudyData {
  // Institusi
  univName: string;
  facultyName: string;
  univAddress: string;
  univContact: string;
  
  // Surat
  letterNumber: string;
  letterDate: string;

  // Mahasiswa
  studentName: string;
  studentNim: string;
  studentProdi: string;
  studentPlaceBirth: string;
  studentDateBirth: string;
  studentSemester: string;
  reason: string;
  skNumber: string;

  // Penandatangan
  signeePosition: string;
  signeeName: string;
  signeeNip: string;
}

const INITIAL_DATA: StopStudyData = {
  univName: 'UNIVERSITAS TEKNOLOGI NUSANTARA',
  facultyName: 'FAKULTAS ILMU KOMPUTER',
  univAddress: 'Jl. Pendidikan No. 123, Kota Denpasar, Bali 80111',
  univContact: 'Telp: (0361) 123456 | Email: info@utn.ac.id | Web: www.utn.ac.id',

  letterNumber: '045/UN.UTN/FIK/KM.01/2026',
  letterDate: '',

  studentName: 'GELANG PRAMANA PUTRA',
  studentNim: '20101150012',
  studentProdi: 'S1 Teknik Informatika',
  studentPlaceBirth: 'Denpasar',
  studentDateBirth: '2001-08-15',
  studentSemester: 'Genap 2025/2026',
  reason: 'Mengundurkan Diri',
  skNumber: 'SK Rektor No. 102/UN.UTN/2026',

  signeePosition: 'Dekan Fakultas Ilmu Komputer',
  signeeName: 'Dr. Ir. Budi Santoso, M.Kom.',
  signeeNip: '197508172005011002'
};

export default function StopStudiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <StopStudiBuilder />
    </Suspense>
  );
}

function StopStudiBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<StopStudyData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, letterDate: today }));
  }, []);

  const handleDataChange = (field: keyof StopStudyData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, letterDate: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Akademik A' : 'Format Akademik B';

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-indigo-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-indigo-500' : 'bg-slate-300'}`}></div> 
            Format Standar (SK)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-indigo-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-indigo-500' : 'bg-slate-300'}`}></div> 
            Format Keterangan Sederhana
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
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[11pt]'}`}>
        
        {/* KOP SURAT */}
        <div className="border-b-[3px] border-black pb-4 mb-8 flex flex-col items-center text-center shrink-0">
          <h2 className="text-xl font-bold uppercase tracking-wider text-slate-900">{data.univName}</h2>
          <h3 className="text-2xl font-black uppercase tracking-widest text-slate-900 mt-1">{data.facultyName}</h3>
          <p className="text-[10pt] mt-2 font-sans text-slate-700 print:text-black">{data.univAddress}</p>
          <p className="text-[9pt] font-sans text-slate-600 print:text-black">{data.univContact}</p>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-10 shrink-0 leading-tight">
          <h1 className="text-xl font-black underline uppercase tracking-widest text-slate-900">
            {templateId === 1 ? 'SURAT KETERANGAN BERHENTI STUDI' : 'SURAT KETERANGAN PENGUNDURAN DIRI'}
          </h1>
          <p className="text-[11pt] mt-1 font-bold">Nomor: {data.letterNumber}</p>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow space-y-6 overflow-hidden text-justify leading-relaxed">
          <p>
            Dekan {data.facultyName} {data.univName}, dengan ini menerangkan bahwa:
          </p>
          
          <div className="ml-8 space-y-2 py-2 break-inside-avoid text-[11pt] font-medium">
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase text-slate-900">{data.studentName}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Nomor Induk Mahasiswa</span><span>:</span><span className="font-mono">{data.studentNim}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Program Studi</span><span>:</span><span>{data.studentProdi}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.studentPlaceBirth}, {formatDateSafe(data.studentDateBirth)}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Semester Terakhir</span><span>:</span><span>{data.studentSemester}</span></div>
          </div>

          <p>
            Berdasarkan {data.skNumber} dan catatan akademik yang ada pada kami, nama tersebut di atas dinyatakan <strong>Telah Berhenti Studi / {data.reason}</strong> sebagai mahasiswa {data.facultyName} {data.univName} terhitung sejak tanggal ditetapkan surat ini.
          </p>

          {templateId === 1 && (
            <p>
              Segala bentuk administrasi dan kewajiban akademik yang bersangkutan telah diselesaikan. Mahasiswa tersebut tidak lagi berhak menggunakan fasilitas dan mengatasnamakan institusi dalam bentuk apapun.
            </p>
          )}

          <p>
            Demikian surat keterangan ini dibuat dengan sesungguhnya untuk dapat dipergunakan sebagaimana mestinya.
          </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-12 pt-8 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex justify-end text-left">
            <div className="w-[300px]">
              <p className="mb-1">{data.univName.split(' ')[0] === 'UNIVERSITAS' ? data.univName.split(' ')[1] || 'Kota' : 'Kota'}, {formatDateSafe(data.letterDate)}</p>
              <p className="font-bold mb-1">{data.signeePosition},</p>
              <div className="mt-24">
                 <p className="font-black underline uppercase text-[11pt]">{data.signeeName}</p>
                 <p className="text-[11pt] font-mono mt-1">NIP. {data.signeeNip}</p>
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
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-indigo-400 uppercase tracking-tighter italic">
               <School size={16} /> <span>Surat Keterangan Berhenti Studi</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-indigo-600 hover:bg-indigo-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
               <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-indigo-500" /> Editor Konten</h2>
               <button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building size={12}/> Kop & Institusi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-indigo-500 outline-none" value={data.univName} onChange={e => handleDataChange('univName', e.target.value)} placeholder="Nama Universitas" />
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-indigo-500 outline-none" value={data.facultyName} onChange={e => handleDataChange('facultyName', e.target.value)} placeholder="Nama Fakultas / Biro" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-indigo-500 outline-none" value={data.univAddress} onChange={e => handleDataChange('univAddress', e.target.value)} placeholder="Alamat Institusi" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.univContact} onChange={e => handleDataChange('univContact', e.target.value)} placeholder="Kontak (Telp/Email/Web)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Data Mahasiswa</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.studentNim} onChange={e => handleDataChange('studentNim', e.target.value)} placeholder="NIM / NPM" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.studentProdi} onChange={e => handleDataChange('studentProdi', e.target.value)} placeholder="Program Studi" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.studentPlaceBirth} onChange={e => handleDataChange('studentPlaceBirth', e.target.value)} placeholder="Tempat Lahir" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.studentDateBirth} onChange={e => handleDataChange('studentDateBirth', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Detail Pemberhentian</h3>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none font-bold" value={data.letterNumber} onChange={e => handleDataChange('letterNumber', e.target.value)} placeholder="Nomor Surat" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.studentSemester} onChange={e => handleDataChange('studentSemester', e.target.value)} placeholder="Semester (Cth: Ganjil 2025/2026)" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.letterDate} onChange={e => handleDataChange('letterDate', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Alasan (Cth: Mengundurkan Diri)" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.skNumber} onChange={e => handleDataChange('skNumber', e.target.value)} placeholder="Dasar SK / Referensi" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 tracking-widest flex items-center gap-2"><FileSignature size={12}/> Pejabat Penandatangan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none font-bold" value={data.signeePosition} onChange={e => handleDataChange('signeePosition', e.target.value)} placeholder="Jabatan (Cth: Dekan)" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.signeeName} onChange={e => handleDataChange('signeeName', e.target.value)} placeholder="Nama Pejabat" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.signeeNip} onChange={e => handleDataChange('signeeNip', e.target.value)} placeholder="NIP / NIDN" />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="SK_Berhenti_Studi" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}