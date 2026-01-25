'use client';

/**
 * FILE: IzinKeramaianPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Izin Keramaian (Polisi / Lingkungan)
 * FEATURES:
 * - Dual Template (Police Permit vs Neighbor Consent)
 * - Smart Presets (Wedding, Concert, Sports)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  PartyPopper, Music, Trophy, User, CalendarDays,
  Edit3, Eye, ShieldAlert, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface PermitData {
  city: string;
  date: string;
  
  // Tujuan Surat
  policeStation: string;
  policeAddress: string;
  
  // Data Pemohon
  name: string;
  umur: string;
  job: string;
  address: string;
  phone: string;
  nik: string;

  // Data Acara
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventPlace: string;
  eventEnt: string;
  audience: string;
  
  // Penutup
  closing: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PermitData = {
  city: 'DEPOK',
  date: '', // Diisi useEffect
  
  policeStation: 'KAPOLSEK CILODONG',
  policeAddress: 'Jl. Raya Jakarta-Bogor No. KM 39',
  
  name: 'BUDI SANTOSO',
  umur: '45',
  job: 'Wiraswasta',
  address: 'Jl. H. Dimun Raya RT 01/04, Cilodong',
  phone: '0812-3456-7890',
  nik: '3276010101800001',

  eventName: 'RESEPSI PERNIKAHAN (PUTRI KAMI)',
  eventDate: '', // Diisi useEffect
  eventTime: '08.00 s/d 17.00 WIB',
  eventPlace: 'Halaman Rumah (Alamat sda)',
  eventEnt: 'Musik Organ Tunggal & Sound System',
  audience: '+/- 200 Tamu Undangan',
  
  closing: 'Besar harapan kami agar Bapak dapat memberikan izin keramaian demi kelancaran acara tersebut. Kami siap menjaga ketertiban dan keamanan selama acara berlangsung.'
};

// --- 3. KOMPONEN UTAMA ---
export default function IzinKeramaianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Perizinan...</div>}>
      <CrowdPermitBuilder />
    </Suspense>
  );
}

function CrowdPermitBuilder() {
  // --- STATE SYSTEM ---
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
    if(confirm('Reset formulir ke awal?')) {
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

  // --- TEMPLATE MENU COMPONENT ---
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

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="w-full h-full text-slate-900 font-serif text-[11pt]">
      
      {templateId === 1 ? (
          // TEMPLATE 1: SURAT KE POLISI (DIPADATKAN)
          <div className="flex flex-col h-full">
              <div className="text-right mb-4">
                  {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}
              </div>

              <div className="mb-4">
                  <div className="flex">
                      <div className="w-[80px]">Perihal</div>
                      <div className="font-bold underline">: Permohonan Izin Keramaian</div>
                  </div>
                  <div className="flex">
                      <div className="w-[80px]">Lampiran</div>
                      <div>: 1 (Satu) Berkas</div>
                  </div>
              </div>

              <div className="mb-6">
                  <p>Kepada Yth,</p>
                  <p className="font-bold uppercase">{data.policeStation}</p>
                  <p>Di -</p>
                  <p className="pl-4 underline">Tempat</p>
              </div>

              <div className="flex-grow space-y-2 text-justify">
                  <p>Dengan hormat,</p>
                  <p>Yang bertanda tangan di bawah ini:</p>
                  
                  <div className="ml-6 mb-4 text-[11pt]">
                      <table className="w-full leading-snug">
                          <tbody>
                              <tr><td className="w-32 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.name}</td></tr>
                              <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top">{data.nik}</td></tr>
                              <tr><td className="align-top">Umur</td><td className="align-top">:</td><td className="align-top">{data.umur} Tahun</td></tr>
                              <tr><td className="align-top">Pekerjaan</td><td className="align-top">:</td><td className="align-top">{data.job}</td></tr>
                              <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.address}</td></tr>
                              <tr><td className="align-top">No. HP</td><td className="align-top">:</td><td className="align-top">{data.phone}</td></tr>
                          </tbody>
                      </table>
                  </div>

                  <p>
                      Dengan ini mengajukan permohonan <strong>IZIN KERAMAIAN</strong> untuk menyelenggarakan kegiatan dengan rincian sebagai berikut:
                  </p>

                  <div className="ml-6 mb-4 text-[11pt]">
                      <table className="w-full leading-snug">
                          <tbody>
                              <tr><td className="w-32 align-top">Nama Acara</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.eventName}</td></tr>
                              <tr><td className="align-top">Hari / Tanggal</td><td className="align-top">:</td><td className="align-top">{isClient && data.eventDate ? new Date(data.eventDate).toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'}) : '...'}</td></tr>
                              <tr><td className="align-top">Waktu</td><td className="align-top">:</td><td className="align-top">{data.eventTime}</td></tr>
                              <tr><td className="align-top">Tempat</td><td className="align-top">:</td><td className="align-top">{data.eventPlace}</td></tr>
                              <tr><td className="align-top">Hiburan</td><td className="align-top">:</td><td className="align-top">{data.eventEnt}</td></tr>
                              <tr><td className="align-top">Jml. Undangan</td><td className="align-top">:</td><td className="align-top">{data.audience}</td></tr>
                          </tbody>
                      </table>
                  </div>

                  <p className="indent-8">{data.closing}</p>
                  <p className="indent-8">Demikian surat permohonan ini kami sampaikan. Atas perhatian dan izin yang diberikan, kami ucapkan terima kasih.</p>
              </div>

              <div className="flex justify-end text-center mt-8 mb-10" style={{ pageBreakInside: 'avoid' }}>
                  <div className="w-64">
                      <p className="mb-20 font-bold">Pemohon / Penanggung Jawab,</p>
                      <p className="font-bold underline uppercase">{data.name}</p>
                  </div>
              </div>
          </div>
      ) : (
          // TEMPLATE 2: IZIN LINGKUNGAN (DIPADATKAN)
          <div className="flex flex-col h-full">
              <div className="text-center mb-6 border-b-2 border-black pb-2">
                  <h2 className="text-xl font-bold uppercase underline tracking-widest">SURAT IZIN LINGKUNGAN</h2>
              </div>

              <p className="mb-4 text-justify">
                  Kami yang bertanda tangan di bawah ini, warga tetangga (lingkungan) di sekitar lokasi kegiatan, menyatakan dengan sesungguhnya bahwa kami <strong>TIDAK KEBERATAN</strong> dengan diadakannya kegiatan:
              </p>

              <div className="bg-slate-50 border border-slate-300 p-3 mb-4 text-sm rounded">
                  <table className="w-full leading-snug">
                      <tbody>
                          <tr><td className="w-32 py-0.5 font-bold">Acara</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.eventName}</td></tr>
                          <tr><td className="py-0.5 font-bold">Hari/Tanggal</td><td className="py-0.5">:</td><td className="py-0.5">{isClient && data.eventDate ? new Date(data.eventDate).toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'}) : '...'}</td></tr>
                          <tr><td className="py-0.5 font-bold">Hiburan</td><td className="py-0.5">:</td><td className="py-0.5">{data.eventEnt}</td></tr>
                          <tr><td className="py-0.5 font-bold">Tuan Rumah</td><td className="py-0.5">:</td><td className="py-0.5 uppercase">{data.name}</td></tr>
                      </tbody>
                  </table>
              </div>

              <p className="mb-4 text-justify text-sm">
                  Demikian surat pernyataan ini kami tanda tangani dengan sukarela tanpa paksaan, untuk digunakan sebagai persyaratan pengurusan Izin Keramaian.
              </p>

              <div className="mb-6 flex-grow">
                  <table className="w-full border-collapse border border-black text-sm">
                      <thead>
                          <tr className="bg-slate-100">
                              <th className="border border-black py-1 w-10">No</th>
                              <th className="border border-black py-1">Nama Tetangga</th>
                              <th className="border border-black py-1 w-32">Tanda Tangan</th>
                          </tr>
                      </thead>
                      <tbody>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <tr key={num} className="h-8">
                                  <td className="border border-black text-center">{num}.</td>
                                  <td className="border border-black px-2"></td>
                                  <td className="border border-black px-2 text-[9px] text-slate-300 align-bottom">{num}...</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>

              <div className="flex justify-between text-center mt-auto text-sm" style={{ pageBreakInside: 'avoid' }}>
                  <div className="w-48">
                      <p className="mb-16">Mengetahui,<br/>Ketua RT .....</p>
                      <p className="border-b border-black inline-block w-full"></p>
                  </div>
                  <div className="w-48">
                      <p className="mb-16">Mengetahui,<br/>Ketua RW .....</p>
                      <p className="border-b border-black inline-block w-full"></p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Surat Permohonan' : 'Izin Lingkungan';

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
          .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          .print-table thead { height: 15mm; display: table-header-group; } 
          .print-table tfoot { height: 15mm; display: table-footer-group; } 
          .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
          tr, .break-inside-avoid { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <ShieldAlert size={16} /> <span>CROWD PERMIT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT (SLIDING ANIMATION) */}
        <div className={`no-print w-full md:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Perizinan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              {/* Quick Preset */}
              <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                   <PartyPopper size={14} className="text-emerald-600" />
                   <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis (Preset)</h3>
                </div>
                <div className="p-4 grid grid-cols-3 gap-2">
                   <button onClick={() => applyPreset('wedding')} className="bg-white hover:bg-pink-100 border border-pink-200 text-pink-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors">
                      <PartyPopper size={14}/> Hajatan
                   </button>
                   <button onClick={() => applyPreset('concert')} className="bg-white hover:bg-purple-100 border border-purple-200 text-purple-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors">
                      <Music size={14}/> Konser
                   </button>
                   <button onClick={() => applyPreset('sport')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors">
                      <Trophy size={14}/> Lomba
                   </button>
                </div>
              </div>

              {/* Form Data Pemohon */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-emerald-600 tracking-widest"><User size={14}/> Data Pemohon</h3>
                 <div className="space-y-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Lengkap" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                    <div className="grid grid-cols-2 gap-2">
                       <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} />
                       <input className="w-full p-2 border rounded text-xs" placeholder="Umur" value={data.umur} onChange={e => handleDataChange('umur', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                       <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.job} onChange={e => handleDataChange('job', e.target.value)} />
                       <input className="w-full p-2 border rounded text-xs" placeholder="No HP" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} />
                    </div>
                    <textarea className="w-full p-2 border rounded text-xs h-16" placeholder="Alamat" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
                 </div>
              </div>

              {/* Form Detail Acara */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><CalendarDays size={14}/> Detail Acara</h3>
                 <div className="space-y-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Acara" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} />
                    <div className="grid grid-cols-2 gap-2">
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} />
                       <input className="w-full p-2 border rounded text-xs" placeholder="Waktu (Jam)" value={data.eventTime} onChange={e => handleDataChange('eventTime', e.target.value)} />
                    </div>
                    <input className="w-full p-2 border rounded text-xs" placeholder="Lokasi Acara" value={data.eventPlace} onChange={e => handleDataChange('eventPlace', e.target.value)} />
                    <input className="w-full p-2 border rounded text-xs" placeholder="Hiburan (Jika ada)" value={data.eventEnt} onChange={e => handleDataChange('eventEnt', e.target.value)} />
                    <input className="w-full p-2 border rounded text-xs" placeholder="Jumlah Undangan" value={data.audience} onChange={e => handleDataChange('audience', e.target.value)} />
                 </div>
              </div>

              {/* Form Tujuan & Penutup (Hanya di Template 1) */}
              {templateId === 1 && (
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                     <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-purple-600 tracking-widest"><ShieldAlert size={14}/> Tujuan Surat</h3>
                     <div className="space-y-2">
                        <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Tujuan (Kapolsek/Kapolres)" value={data.policeStation} onChange={e => handleDataChange('policeStation', e.target.value)} />
                        <input className="w-full p-2 border rounded text-xs" placeholder="Alamat Kantor Polisi" value={data.policeAddress} onChange={e => handleDataChange('policeAddress', e.target.value)} />
                        <div className="grid grid-cols-2 gap-2 pt-2">
                           <input className="w-full p-2 border rounded text-xs" placeholder="Kota Surat" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                           <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                        <textarea className="w-full p-2 border rounded text-xs h-24" placeholder="Kalimat Penutup" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} />
                     </div>
                  </div>
              )}
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* --- PREVIEW AREA (ALWAYS RENDERED BEHIND SIDEBAR) --- */}
        <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                   <div className="print-content-wrapper p-[20mm]">
                      <DocumentContent />
                   </div>
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

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
            <div className="print-content-wrapper p-[20mm]">
               <DocumentContent />
            </div>
         </div>
      </div>

    </div>
  );
}
