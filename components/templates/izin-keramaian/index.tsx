'use client';

/**
 * FILE: IzinKeramaianPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Izin Keramaian (Polisi / Lingkungan)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  PartyPopper, Music, Trophy, User, CalendarDays,
  Edit3, Eye, ShieldAlert, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PermitData {
  city: string;
  date: string;
  policeStation: string;
  policeAddress: string;
  name: string;
  umur: string;
  job: string;
  address: string;
  phone: string;
  nik: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventPlace: string;
  eventEnt: string;
  audience: string;
  closing: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PermitData = {
  city: 'DEPOK',
  date: '', 
  policeStation: 'KAPOLSEK CILODONG',
  policeAddress: 'Jl. Raya Jakarta-Bogor No. KM 39',
  name: 'BUDI SANTOSO',
  umur: '45',
  job: 'Wiraswasta',
  address: 'Jl. H. Dimun Raya RT 01/04, Cilodong',
  phone: '0812-3456-7890',
  nik: '3276010101800001',
  eventName: 'RESEPSI PERNIKAHAN (PUTRI KAMI)',
  eventDate: '', 
  eventTime: '08.00 s/d 17.00 WIB',
  eventPlace: 'Halaman Rumah (Alamat sda)',
  eventEnt: 'Musik Organ Tunggal & Sound System',
  audience: '+/- 200 Tamu Undangan',
  closing: 'Besar harapan kami agar Bapak dapat memberikan izin keramaian demi kelancaran acara tersebut. Kami siap menjaga ketertiban dan keamanan selama acara berlangsung.'
};

export default function IzinKeramaianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Perizinan...</div>}>
      <CrowdPermitBuilder />
    </Suspense>
  );
}

function CrowdPermitBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PermitData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        eventDate: nextMonth.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof PermitData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const applyPreset = (type: 'wedding' | 'concert' | 'sport') => {
    if (type === 'wedding') {
        setData(prev => ({
            ...prev,
            eventName: 'RESEPSI PERNIKAHAN',
            eventEnt: 'Organ Tunggal / Akustik',
            audience: '+/- 300 Tamu Undangan',
            closing: 'Kami selaku tuan rumah menjamin kegiatan akan berjalan tertib dan mematuhi batas waktu yang ditentukan.'
        }));
    } else if (type === 'concert') {
        setData(prev => ({
            ...prev,
            policeStation: 'KAPOLRES METRO DEPOK',
            eventName: 'PENTAS SENI PEMUDA',
            eventEnt: 'Band Lokal & Guest Star',
            audience: '+/- 1000 Penonton',
            closing: 'Panitia telah berkoordinasi dengan keamanan lingkungan dan siap mematuhi protokol kepolisian.'
        }));
    } else if (type === 'sport') {
        setData(prev => ({
            ...prev,
            eventName: 'TURNAMEN FUTSAL ANTAR RW',
            eventEnt: 'Pertandingan Olahraga',
            audience: 'Peserta & Suporter Warga',
            eventPlace: 'Lapangan Futsal RW 04',
            closing: 'Kami menjamin sportivitas dan keamanan selama pertandingan berlangsung.'
        }));
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setDate(nextMonth.getDate() + 30);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            eventDate: nextMonth.toISOString().split('T')[0] 
        });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Surat Permohonan (Polisi)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Izin Lingkungan (Warga)
        </button>
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="bg-white mx-auto flex flex-col box-border font-serif text-slate-900 leading-snug text-[11pt] p-[25mm] print:p-0" 
           style={{ width: '210mm', minHeight: '296mm' }}>
        
        {templateId === 1 ? (
            <div className="flex flex-col h-full">
                <div className="text-right mb-4">
                    {data.city}, {formatDateSafe(data.date)}
                </div>
                <div className="mb-4">
                    <div className="flex"><div className="w-[80px]">Perihal</div><div className="font-bold underline">: Permohonan Izin Keramaian</div></div>
                    <div className="flex"><div className="w-[80px]">Lampiran</div><div>: 1 (Satu) Berkas</div></div>
                </div>
                <div className="mb-6">
                    <p>Kepada Yth,</p>
                    <p className="font-bold uppercase">{data.policeStation}</p>
                    <p>Di Tempat</p>
                </div>
                <div className="flex-grow space-y-2 text-justify">
                    <p>Dengan hormat,</p>
                    <p>Yang bertanda tangan di bawah ini:</p>
                    <div className="ml-6 mb-4 text-[11pt]">
                        <table className="w-full leading-snug">
                            <tbody>
                                <tr><td className="w-32 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.name}</td></tr>
                                <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top">{data.nik}</td></tr>
                                <tr><td className="align-top">Pekerjaan</td><td className="align-top">:</td><td className="align-top">{data.job}</td></tr>
                                <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.address}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p>Mengajukan permohonan izin keramaian untuk kegiatan:</p>
                    <div className="ml-6 mb-4 text-[11pt]">
                        <table className="w-full leading-snug">
                            <tbody>
                                <tr><td className="w-32 align-top">Nama Acara</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.eventName}</td></tr>
                                <tr><td className="align-top">Hari / Tanggal</td><td className="align-top">:</td><td className="align-top">{formatDateSafe(data.eventDate)}</td></tr>
                                <tr><td className="align-top">Waktu</td><td className="align-top">:</td><td className="align-top">{data.eventTime}</td></tr>
                                <tr><td className="align-top">Tempat</td><td className="align-top">:</td><td className="align-top">{data.eventPlace}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="indent-8">{data.closing}</p>
                </div>
                <div className="flex justify-end text-center mt-8 mb-10" style={{ pageBreakInside: 'avoid' }}>
                    <div className="w-64"><p className="mb-20 font-bold">Hormat Kami,</p><p className="font-bold underline uppercase">{data.name}</p></div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col h-full">
                <div className="text-center mb-6 border-b-2 border-black pb-2">
                    <h2 className="text-xl font-bold uppercase underline tracking-widest">SURAT IZIN LINGKUNGAN</h2>
                </div>
                <p className="mb-4 text-justify">Kami warga menyatakan <strong>TIDAK KEBERATAN</strong> atas kegiatan:</p>
                <div className="bg-slate-50 border border-slate-300 p-3 mb-4 text-sm rounded">
                    <p>Acara: <b>{data.eventName}</b></p>
                    <p>Tanggal: <b>{formatDateSafe(data.eventDate)}</b></p>
                    <p>Tuan Rumah: <b>{data.name}</b></p>
                </div>
                <table className="w-full border-collapse border border-black text-sm mb-6">
                    <thead><tr className="bg-slate-100">
                      <th className="border border-black py-1 w-12">No</th>
                      <th className="border border-black py-1">Nama Tetangga</th>
                      <th className="border border-black py-1 w-32">Paraf</th>
                    </tr></thead>
                    <tbody>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <tr key={num} className="h-10">
                                <td className="border border-black text-center">{num}.</td>
                                <td className="border border-black px-2"></td>
                                <td className="border border-black px-2 text-[9px] text-slate-300 align-bottom">{num}.</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between text-center mt-auto text-sm" style={{ pageBreakInside: 'avoid' }}>
                    <div className="w-48"><p className="mb-16">Mengetahui,<br/>Ketua RT</p><p className="border-b border-black"></p></div>
                    <div className="w-48"><p className="mb-16">Mengetahui,<br/>Ketua RW</p><p className="border-b border-black"></p></div>
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
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors group">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <ShieldAlert size={16} /> <span>CROWD PERMIT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                <LayoutTemplate size={14} className="text-blue-400" /> {templateId === 1 ? 'Polisi' : 'Warga'} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('wedding')} className="bg-white p-2 rounded text-[9px] font-bold shadow-sm">HAJATAN</button>
                <button onClick={() => applyPreset('concert')} className="bg-white p-2 rounded text-[9px] font-bold shadow-sm">KONSER</button>
                <button onClick={() => applyPreset('sport')} className="bg-white p-2 rounded text-[9px] font-bold shadow-sm">LOMBA</button>
              </div>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg text-sm" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-2 border rounded-lg text-sm" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                  <input className="w-full p-2 border rounded-lg text-sm" value={data.umur} onChange={e => handleDataChange('umur', e.target.value)} placeholder="Umur" />
                </div>
                <textarea className="w-full p-2 border rounded-lg text-xs h-16" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat" />
              </div>
              <div className="border-t pt-4 space-y-4">
                <input className="w-full p-2 border rounded-lg text-sm font-bold uppercase" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} placeholder="Nama Acara" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" className="w-full p-2 border rounded-lg text-sm" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} />
                  <input className="w-full p-2 border rounded-lg text-sm" value={data.eventTime} onChange={e => handleDataChange('eventTime', e.target.value)} placeholder="Waktu (08.00 - Selesai)" />
                </div>
              </div>
           </div>
        </div>

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