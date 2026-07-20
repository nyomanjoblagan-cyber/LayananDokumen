'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: PenelitianPage.tsx
 * STATUS: PRODUCTION READY
 * DESC: Generator Surat Rekomendasi/Izin Penelitian dari Kesbangpol/Dinas
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Search, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, FileSearch, Edit3, Eye, Check, ChevronDown, RotateCcw, ArrowLeftCircle, FileText
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ResearchData {
  city: string;
  date: string;
  docNo: string;
  
  // PEMERINTAHAN (KOP SURAT)
  govName: string;
  agencyName: string;
  agencyAddress: string;
  agencyContact: string;
  
  // SURAT ASAL (KAMPUS)
  originUniversity: string;
  originLetterNo: string;
  originLetterDate: string;

  // TUJUAN PENELITIAN
  targetOffice: string;
  targetAddress: string;

  // DATA MAHASISWA
  studentName: string;
  studentId: string;
  department: string;
  address: string;
  
  // DETAIL PENELITIAN
  researchTitle: string;
  researchLocation: string;
  duration: string;
  members: string;
  
  // PENGESAH
  signerTitle: string;
  signerName: string;
  signerNip: string;
  signerRank: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ResearchData = {
  city: 'DENPASAR',
  date: '', 
  docNo: '070/123/KESBANGPOL/2026',
  
  govName: 'PEMERINTAH PROVINSI BALI',
  agencyName: 'BADAN KESATUAN BANGSA DAN POLITIK',
  agencyAddress: 'Jl. Kapten Tantular No. 1, Renon, Denpasar, Bali',
  agencyContact: 'Telp. (0361) 227298, Email: kesbangpol@baliprov.go.id',
  
  originUniversity: 'Universitas Udayana (UNUD)',
  originLetterNo: '044/UNUD/FT/I/2026',
  originLetterDate: '10 Juli 2026',

  targetOffice: 'Kepala Dinas Komunikasi dan Informatika Provinsi Bali',
  targetAddress: 'Jl. D.I. Panjaitan No. 7, Renon, Denpasar',

  studentName: 'BAGUS RAMADHAN',
  studentId: '2208561001',
  department: 'Teknologi Informasi',
  address: 'Jl. Raya Kampus Unud, Jimbaran',
  
  researchTitle: 'Analisis Keamanan Jaringan Menggunakan Metode Zero Trust Architecture pada Sistem Pemerintahan.',
  researchLocation: 'Dinas Komunikasi dan Informatika Provinsi Bali',
  duration: '15 Juli 2026 s/d 15 Oktober 2026',
  members: '1 (Satu) Orang',
  
  signerTitle: 'KEPALA BADAN KESATUAN BANGSA DAN POLITIK',
  signerName: 'DRS. I WAYAN WIDYANA, M.SI',
  signerRank: 'Pembina Utama Muda',
  signerNip: '19700101 199503 1 002'
};

// --- 3. KOMPONEN UTAMA ---
export default function PenelitianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Izin Riset...</div>}>
      <ResearchBuilder />
    </Suspense>
  );
}

function ResearchBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useFormSync<ResearchData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ResearchData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Standar Kesbangpol' : 'Dinas PMTSP';

  const ResearchContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* TEMPLATE KESBANGPOL STANDAR */}
        <div className="flex flex-col h-full">
            {/* KOP SURAT */}
            <div className="flex flex-col items-center border-b-[3px] border-black pb-3 mb-1 shrink-0 text-center font-sans relative">
                {/* GARIS GANDA KOP */}
                <div className="absolute bottom-[-5px] left-0 right-0 border-b border-black"></div>
                <h2 className="text-[14pt] font-black uppercase leading-tight tracking-tight">{data.govName}</h2>
                <h1 className="text-[16pt] font-black uppercase leading-tight mt-1">{data.agencyName}</h1>
                <p className="text-[10pt] mt-2 text-slate-800 print:text-black">{data.agencyAddress}</p>
                <p className="text-[9pt] mt-0.5 text-slate-800 print:text-black">{data.agencyContact}</p>
            </div>

            <div className="flex justify-between mb-4 mt-6 text-[11pt] shrink-0 font-sans">
                <div className="space-y-0.5">
                    <div className="grid grid-cols-[80px_10px_1fr]"><span>Nomor</span><span>:</span><span>{data.docNo}</span></div>
                    <div className="grid grid-cols-[80px_10px_1fr]"><span>Lampiran</span><span>:</span><span>-</span></div>
                    <div className="grid grid-cols-[80px_10px_1fr]"><span>Perihal</span><span>:</span><span className="font-bold underline">Rekomendasi Penelitian</span></div>
                </div>
                <div className="text-right">
                    <p>{data.city}, {formatDateSafe(data.date)}</p>
                </div>
            </div>

            <div className="mb-6 text-[11pt] shrink-0">
                <p>Kepada Yth,</p>
                <p><b>{data.targetOffice}</b></p>
                <p>di -</p>
                <p className="indent-4">{data.targetAddress}</p>
            </div>

            <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
                <p className="mb-3 indent-8">
                  Berdasarkan Surat dari {data.originUniversity} Nomor: {data.originLetterNo} tanggal {data.originLetterDate} perihal Permohonan Izin Penelitian, dengan ini kami memberikan rekomendasi kepada:
                </p>
                
                <div className="ml-8 mb-4 space-y-1 font-sans text-[11pt]">
                    <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.studentName}</span></div>
                    <div className="grid grid-cols-[160px_10px_1fr]"><span>NIM / NIK</span><span>:</span><span>{data.studentId}</span></div>
                    <div className="grid grid-cols-[160px_10px_1fr]"><span>Program Studi / Jurusan</span><span>:</span><span>{data.department}</span></div>
                    <div className="grid grid-cols-[160px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                    <div className="grid grid-cols-[160px_10px_1fr]"><span>Jumlah Peserta</span><span>:</span><span>{data.members}</span></div>
                </div>

                <p className="mb-3">Untuk melakukan Penelitian / Pengambilan Data di instansi/wilayah Saudara, dengan rincian sebagai berikut:</p>
                
                <div className="ml-8 mb-4 space-y-2 font-sans text-[11pt]">
                    <div className="grid grid-cols-[160px_10px_1fr]"><span>Judul Penelitian</span><span>:</span><span className="font-bold">"{data.researchTitle}"</span></div>
                    <div className="grid grid-cols-[160px_10px_1fr]"><span>Lokasi Penelitian</span><span>:</span><span>{data.researchLocation}</span></div>
                    <div className="grid grid-cols-[160px_10px_1fr]"><span>Lama Penelitian</span><span>:</span><span>{data.duration}</span></div>
                </div>

                <p className="mb-2">Dengan ketentuan sebagai berikut:</p>
                <ol className="list-decimal list-outside ml-10 mb-4 space-y-1">
                  <li>Sebelum melakukan kegiatan agar melapor kepada pejabat setempat.</li>
                  <li>Pelaksanaan kegiatan tidak menyimpang dari tujuan semula serta mentaati peraturan perundang-undangan yang berlaku.</li>
                  <li>Tidak melakukan kegiatan yang bersifat politis yang dapat mengganggu stabilitas keamanan dan ketertiban.</li>
                  <li>Setelah selesai melakukan kegiatan agar menyerahkan 1 (satu) copy hasil kegiatan/penelitian kepada {data.agencyName}.</li>
                  <li>Surat Rekomendasi ini dapat dicabut atau dibatalkan apabila yang bersangkutan tidak mentaati ketentuan sebagaimana tersebut di atas.</li>
                </ol>

                <p>Demikian Surat Rekomendasi ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
            </div>

            <div className="mt-auto pt-8 shrink-0">
                <table className="w-full table-fixed font-sans text-[11pt]">
                <tbody>
                    <tr>
                    <td className="w-1/2"></td>
                    <td className="text-center">
                        <p className="font-bold mb-1">{data.signerTitle}</p>
                        <p className="font-bold mb-20">{data.city.toUpperCase()}</p>
                        <div className="flex flex-col items-center">
                            <p className="font-bold underline uppercase tracking-tight">{data.signerName}</p>
                            <p className="">{data.signerRank}</p>
                            <p className="">NIP. {data.signerNip}</p>
                        </div>
                    </td>
                    </tr>
                </tbody>
                </table>
                <div className="mt-8 text-[9pt] font-sans">
                  <p className="font-bold underline mb-1">Tembusan Yth:</p>
                  <ol className="list-decimal list-inside">
                    <li>Gubernur / Bupati / Walikota (sebagai laporan)</li>
                    <li>{data.originUniversity}</li>
                    <li>Yang bersangkutan</li>
                    <li>Arsip</li>
                  </ol>
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
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .{ page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
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
               <FileSearch size={16} className="text-blue-500" /> <span>Rekomendasi Kesbangpol Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Standar Kesbangpol {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Dinas PMTSP {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Surat</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           
 <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:flex print:overflow-visible print:bg-white">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Instansi Penerbit (Kop Surat)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.govName} onChange={e => handleDataChange('govName', e.target.value)} placeholder="Misal: PEMERINTAH PROVINSI BALI" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase" value={data.agencyName} onChange={e => handleDataChange('agencyName', e.target.value)} placeholder="Misal: BADAN KESATUAN BANGSA DAN POLITIK" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.agencyAddress} onChange={e => handleDataChange('agencyAddress', e.target.value)} placeholder="Alamat Instansi" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.agencyContact} onChange={e => handleDataChange('agencyContact', e.target.value)} placeholder="Kontak Instansi" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Dokumen & Surat Asal</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 mb-1 block">No Surat</label>
                      <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-none uppercase" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 mb-1 block">Kota/Tgl Cetak</label>
                      <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 mb-1 block">Kampus/Instansi Pemohon</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.originUniversity} onChange={e => handleDataChange('originUniversity', e.target.value)} />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 mb-1 block">No Surat Kampus</label>
                      <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.originLetterNo} onChange={e => handleDataChange('originLetterNo', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 mb-1 block">Tgl Surat Kampus</label>
                      <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.originLetterDate} onChange={e => handleDataChange('originLetterDate', e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Mahasiswa & Riset</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} placeholder="Nama Peneliti" />
                 <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Prodi" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Mahasiswa" />
                 
                 <div className="pt-2"></div>
                 <label className="text-[10px] text-slate-500 mb-1 block font-bold">Judul & Lokasi</label>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none italic" value={data.researchTitle} onChange={e => handleDataChange('researchTitle', e.target.value)} placeholder="Judul Riset" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.researchLocation} onChange={e => handleDataChange('researchLocation', e.target.value)} placeholder="Lokasi Penelitian" />
                 <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} placeholder="Lama Penelitian" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.members} onChange={e => handleDataChange('members', e.target.value)} placeholder="Jumlah Peserta" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><MapPin size={12}/> Tujuan Surat (Yth)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.targetOffice} onChange={e => handleDataChange('targetOffice', e.target.value)} placeholder="Tujuan Instansi" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-amber-500 outline-none" value={data.targetAddress} onChange={e => handleDataChange('targetAddress', e.target.value)} placeholder="Alamat Tujuan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Penandatangan (Kepala)</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.signerTitle} onChange={e => handleDataChange('signerTitle', e.target.value)} placeholder="Jabatan" />
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Kepala" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.signerRank} onChange={e => handleDataChange('signerRank', e.target.value)} placeholder="Pangkat/Gol" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.signerNip} onChange={e => handleDataChange('signerNip', e.target.value)} placeholder="NIP" />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
 <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:flex print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <ResearchContent />
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
         <PrintWrapper documentName="Rekomendasi_Penelitian" price={5000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><ResearchContent /></div></div>
    </div>
  );
}
