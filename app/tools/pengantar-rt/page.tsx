'use client';

/**
 * FILE: PengantarRTPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pengantar RT/RW (KTP, SKCK, Nikah, Pindah)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, MapPin, 
  User, FileText, Heart, Shield, Truck, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RTData {
  // Wilayah
  rt: string;
  rw: string;
  village: string;
  district: string;
  city: string;
  
  // Surat
  no: string;
  date: string;
  
  // Warga
  name: string;
  nik: string;
  ttl: string;
  gender: string;
  religion: string;
  job: string;
  status: string;
  citizenship: string;
  address: string;
  
  // Isi
  purpose: string;
  remark: string;
  
  // TTD
  nameRT: string;
  nameRW: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RTData = {
  rt: '005',
  rw: '012',
  village: 'KELURAHAN SUKAMAJU',
  district: 'KECAMATAN CILODONG',
  city: 'DEPOK',
  
  no: '025 / RT.005 / I / 2026',
  date: '', 
  
  name: 'BUDI SANTOSO',
  nik: '3276010101900001',
  ttl: 'Jakarta, 01 Januari 1990',
  gender: 'Laki-laki',
  religion: 'Islam',
  job: 'Karyawan Swasta',
  status: 'Kawin',
  citizenship: 'WNI',
  address: 'Jl. Melati III No. 45, RT 005 RW 012, Sukamaju',
  
  purpose: 'Pengurusan Perpanjangan KTP Elektronik dan Pembaruan Kartu Keluarga (KK)',
  remark: '-', 
  
  nameRT: 'SUPARMAN',
  nameRW: 'H. JUNAEDI'
};

export default function PengantarRTPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem RT/RW...</div>}>
      <PengantarToolBuilder />
    </Suspense>
  );
}

function PengantarToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RTData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const applyPurpose = (type: 'ktp' | 'skck' | 'nikah' | 'pindah') => {
    let text = '';
    if (type === 'ktp') text = 'Permohonan Pembuatan / Perpanjangan KTP Elektronik dan Kartu Keluarga (KK).';
    else if (type === 'skck') text = 'Permohonan Surat Keterangan Catatan Kepolisian (SKCK) untuk melamar pekerjaan.';
    else if (type === 'nikah') text = 'Pengurusan Administrasi Pernikahan (N1, N2, N4) ke Kantor Urusan Agama (KUA).';
    else if (type === 'pindah') text = 'Permohonan Surat Keterangan Pindah Datang / Pindah Keluar Domisili.';
    setData(prev => ({ ...prev, purpose: text }));
  };

  const handleDataChange = (field: keyof RTData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Klasik' : 'Format Modern';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* HEADER / KOP */}
        <div className="text-center mb-6 shrink-0 font-sans">
            <h2 className="text-lg font-bold uppercase tracking-tight">PENGURUS RUKUN TETANGGA {data.rt} RUKUN WARGA {data.rw}</h2>
            <h1 className="text-xl font-black uppercase tracking-widest leading-none">{data.village}</h1>
            <div className="text-sm uppercase font-bold text-slate-500 print:text-black mt-1">{data.district} - {data.city}</div>
            <div className="border-t-4 border-double border-black mt-4"></div>
        </div>

        {/* JUDUL & NOMOR */}
        <div className="text-center mb-8 shrink-0">
            <h2 className="font-bold text-lg uppercase underline decoration-2 underline-offset-4">SURAT PENGANTAR</h2>
            <div className="text-sm font-bold mt-1 font-sans">Nomor: {data.no}</div>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow overflow-hidden">
            <p className="mb-4 text-justify">Yang bertanda tangan di bawah ini Ketua RT {data.rt} RW {data.rw} menerangkan dengan sebenarnya bahwa:</p>
            
            {templateId === 1 ? (
                <div className="ml-6 mb-6 break-inside-avoid">
                    <table className="w-full leading-relaxed font-sans text-[10pt]">
                        <tbody>
                            <tr><td className="w-40 py-1 font-bold text-slate-400 text-[9px] uppercase">Nama Lengkap</td><td className="w-3">:</td><td className="font-bold uppercase text-slate-900">{data.name}</td></tr>
                            <tr><td className="py-1 font-bold text-slate-400 text-[9px] uppercase">NIK / No. KTP</td><td>:</td><td className="font-mono">{data.nik}</td></tr>
                            <tr><td className="py-1 font-bold text-slate-400 text-[9px] uppercase">Tempat/Tgl Lahir</td><td>:</td><td>{data.ttl}</td></tr>
                            <tr><td className="py-1 font-bold text-slate-400 text-[9px] uppercase">Pekerjaan</td><td>:</td><td>{data.job}</td></tr>
                            <tr><td className="py-1 font-bold text-slate-400 text-[9px] uppercase">Status</td><td>:</td><td>{data.status}</td></tr>
                            <tr><td className="py-1 font-bold text-slate-400 text-[9px] uppercase">Alamat Domisili</td><td className="align-top">:</td><td className="align-top leading-snug">{data.address}</td></tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="border border-black mb-6 font-sans text-[10pt] print:border-black break-inside-avoid">
                    <div className="grid grid-cols-[160px_1fr] border-b border-black p-2 print:border-black">
                        <div className="font-bold border-r border-black print:border-black text-[9px] uppercase text-slate-400 flex items-center">Nama Lengkap</div><div className="pl-3 uppercase font-black">{data.name}</div>
                    </div>
                    <div className="grid grid-cols-[160px_1fr] border-b border-black p-2 bg-slate-50 print:bg-transparent print:border-black">
                        <div className="font-bold border-r border-black print:border-black text-[9px] uppercase text-slate-400 flex items-center">NIK</div><div className="pl-3 font-mono font-bold">{data.nik}</div>
                    </div>
                    <div className="grid grid-cols-[160px_1fr] border-b border-black p-2 print:border-black">
                        <div className="font-bold border-r border-black print:border-black text-[9px] uppercase text-slate-400 flex items-center">Pekerjaan</div><div className="pl-3">{data.job}</div>
                    </div>
                    <div className="grid grid-cols-[160px_1fr] p-2">
                        <div className="font-bold border-r border-black print:border-black text-[9px] uppercase text-slate-400 flex items-center">Alamat</div><div className="pl-3 leading-snug">{data.address}</div>
                    </div>
                </div>
            )}

            <p className="mb-4 text-justify">Benar yang bersangkutan adalah warga kami yang berdomisili di alamat tersebut di atas. Surat pengantar ini diberikan untuk keperluan:</p>

            <div className="ml-6 mb-6 p-5 bg-slate-50 border-l-4 border-slate-900 italic font-bold text-slate-800 print:bg-transparent print:border-2 print:border-black text-justify break-inside-avoid">
                "{data.purpose}"
            </div>

            {data.remark !== '-' && (
                <p className="mb-4 italic text-sm text-slate-500 print:text-black">Keterangan Tambahan: {data.remark}</p>
            )}

            <p className="mb-8 text-justify">Demikian surat pengantar ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex justify-between text-center font-sans">
                <div className="w-64">
                    <p className="mb-20 font-bold text-sm">Mengetahui,<br/>Ketua RW {data.rw}</p>
                    <p className="font-bold underline uppercase tracking-tighter text-[10pt] font-serif">{data.nameRW}</p>
                </div>
                <div className="w-64">
                    <p className="mb-1 text-[10pt]">{data.city}, {formatDateSafe(data.date)}</p>
                    <p className="mb-20 font-bold text-sm">Ketua RT {data.rt}</p>
                    <p className="font-bold underline uppercase tracking-tighter text-[10pt] font-serif">{data.nameRT}</p>
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
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <MapPin size={16} className="text-emerald-500" /> <span>RT/RW Letter Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Klasik {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Modern {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Pengantar</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 grid grid-cols-2 gap-2">
                <button onClick={() => applyPurpose('ktp')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase flex items-center justify-center gap-1"><User size={10}/> KTP/KK</button>
                <button onClick={() => applyPurpose('skck')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase flex items-center justify-center gap-1"><Shield size={10}/> SKCK</button>
                <button onClick={() => applyPurpose('nikah')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase flex items-center justify-center gap-1"><Heart size={10}/> NIKAH</button>
                <button onClick={() => applyPurpose('pindah')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase flex items-center justify-center gap-1"><Truck size={10}/> PINDAH</button>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><MapPin size={12}/> Wilayah</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} placeholder="RT" />
                  <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} placeholder="RW" />
                </div>
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} placeholder="Kelurahan" />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Data Warga</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Lengkap" />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Keperluan</h3>
                <textarea className="w-full p-2 border rounded-lg text-xs h-24 focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Surat..." />
                <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.nameRT} onChange={e => handleDataChange('nameRT', e.target.value)} placeholder="Nama Ketua RT" />
                    <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.nameRW} onChange={e => handleDataChange('nameRW', e.target.value)} placeholder="Nama Ketua RW" />
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

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
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