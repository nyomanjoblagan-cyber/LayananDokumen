'use client';

/**
 * FILE: IzinSekolahPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Izin Sekolah & WhatsApp Integration
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import PrintWrapper from '@/components/PrintWrapper';
import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Calendar, Stethoscope, MessageCircle, Check, ChevronDown, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SchoolData {
  city: string;
  date: string;
  schoolName: string;
  teacherName: string;
  studentName: string;
  studentClass: string;
  studentNis: string;
  reasonType: string;
  reasonDetail: string;
  startDate: string;
  endDate: string;
  duration: string;
  parentName: string;
  parentPhone: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SchoolData = {
  city: 'JAKARTA',
  date: '', 
  schoolName: 'SMP NEGERI 1 JAKARTA',
  teacherName: 'Bapak/Ibu Wali Kelas 7A',
  studentName: 'MUHAMMAD RIZKY',
  studentClass: '7A',
  studentNis: '12345',
  reasonType: 'Sakit',
  reasonDetail: 'sedang sakit demam tinggi dan flu',
  startDate: '', 
  endDate: '', 
  duration: '1',
  parentName: 'BUDI SANTOSO',
  parentPhone: '0812-3456-7890'
};

export default function IzinSekolahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Sekolah...</div>}>
      <SchoolPermitBuilder />
    </Suspense>
  );
}

function SchoolPermitBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState<SchoolData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: today,
        startDate: today,
        endDate: today 
    }));
  }, []);

  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return '...';
    try {
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return dateStr; }
  };

  const handleDataChange = (field: keyof SchoolData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, startDate: today, endDate: today });
    }
  };

  const applyPreset = (type: 'sakit' | 'acara' | 'duka') => {
    if (type === 'sakit') {
      setData(prev => ({
        ...prev,
        reasonType: 'Sakit',
        reasonDetail: 'sedang dalam kondisi kurang sehat (Demam/Flu) dan disarankan istirahat.'
      }));
    } else if (type === 'acara') {
      setData(prev => ({
        ...prev,
        reasonType: 'Izin',
        reasonDetail: 'ada kepentingan keluarga (Pernikahan Saudara Kandung) di luar kota.'
      }));
    } else if (type === 'duka') {
      setData(prev => ({
        ...prev,
        reasonType: 'Izin',
        reasonDetail: 'sedang berduka cita atas meninggalnya anggota keluarga kami.'
      }));
    }
  };

  const copyToWhatsApp = () => {
    const text = `Assalamu’alaikum Wr. Wb.

Yth. ${data.teacherName}
${data.schoolName}

Dengan ini kami selaku orang tua/wali murid memberitahukan bahwa anak kami:

Nama: ${data.studentName}
Kelas: ${data.studentClass}

Mulai hari ini, ${formatDateIndo(data.startDate)}, tidak dapat mengikuti kegiatan belajar mengajar dikarenakan ${data.reasonDetail}.

Mohon kiranya Bapak/Ibu dapat memberikan izin. Terima kasih.

Hormat kami,
${data.parentName}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[25mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
        
        {templateId === 1 && (
            <>
                <div className="text-right mb-8 shrink-0">
                   {data.city}, {formatDateIndo(data.date)}
                </div>

                <div className="mb-8 leading-snug shrink-0">
                   <div>Yth. {data.teacherName}</div>
                   <div className="font-bold uppercase tracking-tight">{data.schoolName}</div>
                   <div>di Tempat</div>
                </div>

                <div className="space-y-4 flex-grow">
                   <p>Dengan hormat,</p>
                   <p>Saya yang bertanda tangan di bawah ini, saya orang tua/wali murid dari:</p>

                   <div className="ml-8 mb-4">
                      <table className="w-full leading-relaxed">
                         <tbody>
                            <tr><td className="w-32">Nama</td><td className="w-4">:</td><td className="font-bold uppercase">{data.studentName}</td></tr>
                            <tr><td>Kelas</td><td>:</td><td>{data.studentClass}</td></tr>
                            {data.studentNis && <tr><td>NIS</td><td>:</td><td>{data.studentNis}</td></tr>}
                         </tbody>
                      </table>
                   </div>

                   <p className="text-justify leading-relaxed">
                      Memberitahukan bahwa anak kami tersebut tidak dapat mengikuti kegiatan belajar seperti biasa, terhitung mulai <strong>{formatDateIndo(data.startDate)}</strong> sampai dengan <strong>{formatDateIndo(data.endDate)}</strong> ({data.duration} hari).
                   </p>

                   <p className="text-justify leading-relaxed">
                      Hal tersebut dikarenakan anak kami {data.reasonDetail}.
                   </p>

                   <p>Demikian surat izin ini kami sampaikan. Atas perhatian Bapak/Ibu Guru, kami ucapkan terima kasih.</p>
                </div>

                <div className="flex justify-end text-center mt-8 mb-4 break-inside-avoid">
                   <div className="w-64">
                      <p className="mb-24">Hormat kami,</p>
                      <p className="font-bold underline uppercase leading-none">{data.parentName}</p>
                      <p className="text-xs mt-1 italic">{data.parentPhone}</p>
                   </div>
                </div>
            </>
        )}

        {templateId === 2 && (
            <>
                <div className="text-right mb-8 shrink-0">
                   {data.city}, {formatDateIndo(data.date)}
                </div>
                <div className="mb-8 leading-snug shrink-0">
                   <div>Kepada Yth, Bapak/Ibu Guru</div>
                   <div className="font-bold">{data.schoolName}</div>
                </div>
                <div className="space-y-4 flex-grow">
                   <p>Dengan ini menerangkan bahwa:</p>
                   <div className="ml-8 mb-4">
                      <table className="w-full">
                         <tbody>
                            <tr><td className="w-32 font-bold">Siswa</td><td className="w-4">:</td><td className="uppercase">{data.studentName}</td></tr>
                            <tr><td className="font-bold">Kelas</td><td>:</td><td>{data.studentClass}</td></tr>
                         </tbody>
                      </table>
                   </div>
                   <p className="text-justify">
                      Tidak dapat mengikuti pelajaran pada <strong>{formatDateIndo(data.startDate)}</strong> dikarenakan <strong>SAKIT</strong>. Bersama surat ini turut kami lampirkan keterangan medis yang diperlukan.
                   </p>
                   <p>Terima kasih atas pengertian Bapak/Ibu.</p>
                </div>
                <div className="flex justify-end text-center mt-8 mb-4 break-inside-avoid">
                   <div className="w-64"><p className="mb-24">Orang Tua / Wali,</p><p className="font-bold underline uppercase">{data.parentName}</p></div>
                </div>
            </>
        )}
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* GLOBAL CSS PRINT - FIXED TypeScript 2322 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <User size={16} className="text-emerald-500" /> <span>SCHOOL PERMIT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={copyToWhatsApp} className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-black uppercase shadow-lg transition-all active:scale-95">
               {copied ? <Check size={16}/> : <MessageCircle size={16}/>} {copied ? 'Tersalin!' : 'Copy WA'}
            </button>
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                <LayoutTemplate size={14} className="text-blue-400" /> {templateId === 1 ? 'Surat Resmi' : 'Lamp. Sakit'} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Surat Resmi {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Lampiran Sakit {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32">
              <div className="bg-emerald-50 p-3 rounded-xl grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('sakit')} className="bg-white p-2 rounded text-[9px] font-bold shadow-sm">SAKIT</button>
                <button onClick={() => applyPreset('acara')} className="bg-white p-2 rounded text-[9px] font-bold shadow-sm">ACARA</button>
                <button onClick={() => applyPreset('duka')} className="bg-white p-2 rounded text-[9px] font-bold shadow-sm">DUKA</button>
              </div>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg text-sm font-bold" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} placeholder="Nama Siswa" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-2 border rounded-lg text-sm" value={data.studentClass} onChange={e => handleDataChange('studentClass', e.target.value)} placeholder="Kelas" />
                  <input className="w-full p-2 border rounded-lg text-sm" value={data.studentNis} onChange={e => handleDataChange('studentNis', e.target.value)} placeholder="NIS (Opsional)" />
                </div>
                <textarea className="w-full p-2 border rounded-lg text-xs h-20" value={data.reasonDetail} onChange={e => handleDataChange('reasonDetail', e.target.value)} placeholder="Detail Alasan..." />
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">MULAI</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                  <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">SAMPAI</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <input className="w-full p-2 border rounded-lg text-sm font-bold" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Orang Tua" />
                <input className="w-full p-2 border rounded-lg text-sm" value={data.schoolName} onChange={e => handleDataChange('schoolName', e.target.value)} placeholder="Nama Sekolah" />
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE