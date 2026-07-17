'use client';

/**
 * FILE: IzinKeramaianPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - ENTERPRISE FORMAT)
 * DESC: Generator Surat Izin Keramaian (Polisi/Desa)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw,
  UserCircle2, CalendarDays, BookOpen, AlertOctagon, UserCheck
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface IzinKeramaianData {
  letterCity: string;
  letterDate: string;
  recipientTitle: string;
  recipientLocation: string;
  
  applicantName: string;
  applicantNik: string;
  applicantBirthPlace: string;
  applicantBirthDate: string;
  applicantJob: string;
  applicantAddress: string;
  applicantPhone: string;
  
  eventName: string;
  eventDay: string;
  eventDate: string;
  eventTimeStart: string;
  eventTimeEnd: string;
  eventLocation: string;
  entertainmentType: string;
  crowdEstimate: string;
  
  alcoholProhibition: string;
  politicalActivity: string;
  willingToDisperse: string;
  
  villageName: string;
  villageHead: string;
  koramilHead: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IzinKeramaianData = {
  letterCity: 'Sleman',
  letterDate: '',
  recipientTitle: 'Kepala Kepolisian Sektor (Kapolsek) Ngaglik',
  recipientLocation: 'Sleman',
  
  applicantName: 'BUDI SANTOSO',
  applicantNik: '3404051234567890',
  applicantBirthPlace: 'Sleman',
  applicantBirthDate: '1985-04-12',
  applicantJob: 'Wiraswasta / Ketua Panitia',
  applicantAddress: 'Desa Sardonoharjo, Kec. Ngaglik, Kab. Sleman',
  applicantPhone: '081234567890',
  
  eventName: 'Pentas Seni Budaya dan Dangdut',
  eventDay: 'Sabtu',
  eventDate: '',
  eventTimeStart: '19:00',
  eventTimeEnd: '23:30',
  eventLocation: 'Lapangan Desa Sardonoharjo',
  entertainmentType: 'Panggung Prajurit & Orkes Dangdut',
  crowdEstimate: '500 Orang',
  
  alcoholProhibition: 'ya',
  politicalActivity: 'bebas',
  willingToDisperse: 'ya',
  
  villageName: 'Sardonoharjo',
  villageHead: 'H. Sudirman, S.E.',
  koramilHead: 'Kapt. Inf. Agus Yulianto'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function IzinKeramaianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <IzinKeramaianBuilder />
    </Suspense>
  );
}

function IzinKeramaianBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IzinKeramaianData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    setData(prev => ({ 
      ...prev, 
      letterDate: today,
      eventDate: nextWeek.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof IzinKeramaianData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setData({ 
          ...INITIAL_DATA, 
          letterDate: today,
          eventDate: nextWeek.toISOString().split('T')[0]
        });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        {/* TANGGAL SURAT */}
        <div className="text-right mb-6">
          <p>{data.letterCity}, {formatDateSafe(data.letterDate)}</p>
        </div>
        
        {/* KEPADA */}
        <div className="mb-8">
          <p>Kepada Yth,</p>
          <p className="font-bold uppercase">{data.recipientTitle}</p>
          <p>di -</p>
          <p className="ml-8">{data.recipientLocation}</p>
        </div>
        
        {/* PEMBUKA */}
        <div className="mb-6">
          <p className="mb-2">Dengan hormat,</p>
          <p>Yang bertanda tangan di bawah ini:</p>
        </div>
        
        {/* DATA PEMOHON */}
        <div className="ml-8 mb-6 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 break-inside-avoid">
            <div className="grid grid-cols-[170px_10px_1fr] mb-1">
              <span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.applicantName}</span>
            </div>
            <div className="grid grid-cols-[170px_10px_1fr] mb-1">
              <span>NIK</span><span>:</span><span>{data.applicantNik}</span>
            </div>
            <div className="grid grid-cols-[170px_10px_1fr] mb-1">
              <span>Tempat, Tgl Lahir</span><span>:</span><span>{data.applicantBirthPlace}, {formatDateSafe(data.applicantBirthDate)}</span>
            </div>
            <div className="grid grid-cols-[170px_10px_1fr] mb-1">
              <span>Pekerjaan</span><span>:</span><span>{data.applicantJob}</span>
            </div>
            <div className="grid grid-cols-[170px_10px_1fr] mb-1 align-top">
              <span>Alamat</span><span>:</span><span>{data.applicantAddress}</span>
            </div>
            <div className="grid grid-cols-[170px_10px_1fr] mb-1">
              <span>No. Telepon / HP</span><span>:</span><span>{data.applicantPhone}</span>
            </div>
        </div>
        
        <div className="mb-6">
          <p className="text-justify">
            Bersama surat ini, kami memohon izin untuk mengadakan keramaian umum / kegiatan kemasyarakatan dalam rangka <strong>{data.eventName}</strong>, yang akan dilaksanakan pada:
          </p>
        </div>
        
        {/* DATA ACARA */}
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 font-sans text-[10pt] mb-6 break-inside-avoid">
            <div className="grid grid-cols-[170px_10px_1fr] mb-1.5">
              <span>Hari / Tanggal</span><span>:</span><span className="font-bold">{data.eventDay}, {formatDateSafe(data.eventDate)}</span>
            </div>
            <div className="grid grid-cols-[170px_10px_1fr] mb-1.5">
              <span>Waktu Pelaksanaan</span><span>:</span><span>Pukul {data.eventTimeStart} s/d {data.eventTimeEnd} WIB</span>
            </div>
            <div className="grid grid-cols-[170px_10px_1fr] mb-1.5">
              <span>Tempat Acara</span><span>:</span><span>{data.eventLocation}</span>
            </div>
            <div className="grid grid-cols-[170px_10px_1fr] mb-1.5">
              <span>Bentuk Hiburan/Kegiatan</span><span>:</span><span>{data.entertainmentType}</span>
            </div>
            <div className="grid grid-cols-[170px_10px_1fr] mb-1.5">
              <span>Perkiraan Undangan/Massa</span><span>:</span><span>{data.crowdEstimate}</span>
            </div>
        </div>
        
        <div className="mb-4 break-inside-avoid">
          <p>Dalam pelaksanaan kegiatan tersebut, kami sebagai pihak penyelenggara menyatakan dan menjamin bahwa:</p>
          <ol className="list-decimal ml-8 mt-2 space-y-2 text-justify">
            <li>Akan mentaati segala ketentuan hukum dan ketertiban umum yang berlaku.</li>
            {data.alcoholProhibition === 'ya' && (
              <li><strong>TIDAK AKAN</strong> menyediakan, menjual, maupun membiarkan adanya minuman keras (miras), narkotika, obat-obatan terlarang, serta perjudian dalam bentuk apapun di area kegiatan.</li>
            )}
            {data.politicalActivity === 'bebas' && (
              <li>Kegiatan ini murni bersifat hiburan/sosial dan <strong>TIDAK MENGANDUNG</strong> unsur kampanye politik praktis yang dilarang.</li>
            )}
            <li>Sanggup menjaga keamanan, ketertiban, kebersihan, dan keselamatan warga di sekitar lokasi kegiatan.</li>
            {data.willingToDisperse === 'ya' && (
              <li><strong>BERSEDIA DIBUBARKAN</strong> secara sepihak oleh aparat Kepolisian atau pihak yang berwajib apabila terjadi kerusuhan, perkelahian, atau pelanggaran terhadap ketentuan yang berlaku, dan kami tidak akan menuntut ganti rugi dalam bentuk apapun.</li>
            )}
          </ol>
        </div>
        
        <div className="mb-10 text-justify break-inside-avoid">
          <p>
            Demikian surat permohonan dan pernyataan ini kami buat dengan sebenar-benarnya dalam keadaan sadar dan tanpa paksaan. Atas perhatian, kebijaksanaan, serta izin yang diberikan, kami ucapkan terima kasih.
          </p>
        </div>
        
        {/* TANDA TANGAN */}
        <div className="break-inside-avoid">
            <div className="flex justify-between items-start text-center mb-16">
              <div className="w-[45%]">
                <p>Mengetahui,</p>
                <p className="mb-2">Kepala Desa {data.villageName}</p>
                <div className="h-20"></div>
                <p className="font-bold underline uppercase">{data.villageHead}</p>
              </div>
              <div className="w-[45%]">
                <p>Hormat Kami,</p>
                <p className="mb-2">Pemohon / Ketua Panitia</p>
                <div className="h-6"></div>
                <div className="w-24 h-14 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <p className="font-bold underline uppercase">{data.applicantName}</p>
              </div>
            </div>
            
            <div className="text-center">
              <p>Mengetahui,</p>
              <p className="mb-2">Danramil / Babinsa setempat</p>
              <div className="h-20"></div>
              <p className="font-bold underline uppercase">{data.koramilHead}</p>
            </div>
        </div>
      </Kertas>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Izin Keramaian</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Eye size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-sky-600" /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {/* TUJUAN SURAT */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <BookOpen size={14} className="text-blue-600"/> Tujuan Surat
                 </h3>
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota/Tempat Terbit</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.letterCity} onChange={e => handleDataChange('letterCity', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.letterDate} onChange={e => handleDataChange('letterDate', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kepada Yth</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.recipientTitle} onChange={e => handleDataChange('recipientTitle', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Di (Lokasi Penerima)</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.recipientLocation} onChange={e => handleDataChange('recipientLocation', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* DATA PEMOHON */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <UserCircle2 size={14} className="text-emerald-600"/> Data Pemohon (Penanggung Jawab)
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (No. KTP)</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantNik} onChange={e => handleDataChange('applicantNik', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantBirthPlace} onChange={e => handleDataChange('applicantBirthPlace', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Lahir</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantBirthDate} onChange={e => handleDataChange('applicantBirthDate', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan / Jabatan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantJob} onChange={e => handleDataChange('applicantJob', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / HP</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.applicantPhone} onChange={e => handleDataChange('applicantPhone', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed" value={data.applicantAddress} onChange={e => handleDataChange('applicantAddress', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* DATA ACARA */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <CalendarDays size={14} className="text-purple-600"/> Data Acara & Kegiatan
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Acara / Kegiatan</label>
                      <input className="w-full bg-purple-50 p-2.5 border border-purple-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hari Acara</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.eventDay} onChange={e => handleDataChange('eventDay', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Acara</label>
                          <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Waktu Mulai</label>
                          <input type="time" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.eventTimeStart} onChange={e => handleDataChange('eventTimeStart', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Waktu Selesai</label>
                          <input type="time" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.eventTimeEnd} onChange={e => handleDataChange('eventTimeEnd', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi / Tempat Acara</label>
                      <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-12 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.eventLocation} onChange={e => handleDataChange('eventLocation', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Hiburan / Kegiatan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.entertainmentType} onChange={e => handleDataChange('entertainmentType', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Estimasi Massa/Undangan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none" value={data.crowdEstimate} onChange={e => handleDataChange('crowdEstimate', e.target.value)} />
                        </div>
                    </div>
                 </div>
              </div>

              {/* KOMITMEN & PERATURAN */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <AlertOctagon size={14} className="text-rose-600"/> Komitmen Keamanan
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Larangan Miras/Judi?</label>
                      <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-rose-500" value={data.alcoholProhibition} onChange={e => handleDataChange('alcoholProhibition', e.target.value)}>
                        <option value="ya">Ya, Dilarang Keras</option>
                        <option value="tidak">Tidak Dicantumkan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Aktivitas Politik?</label>
                      <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-rose-500" value={data.politicalActivity} onChange={e => handleDataChange('politicalActivity', e.target.value)}>
                        <option value="bebas">Bebas dari kampanye politik</option>
                        <option value="ada">Ada unsur politik (Hati-hati)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bersedia Dibubarkan Paksa jika Rusuh?</label>
                      <select className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold text-rose-700 outline-none focus:bg-white focus:ring-2 focus:ring-rose-500" value={data.willingToDisperse} onChange={e => handleDataChange('willingToDisperse', e.target.value)}>
                        <option value="ya">Ya, Bersedia Dibubarkan (Wajib Polisi)</option>
                        <option value="tidak">Tidak</option>
                      </select>
                    </div>
                 </div>
              </div>

              {/* PIHAK TERKAIT */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                   <UserCheck size={14} className="text-amber-600"/> Pihak Mengetahui
                 </h3>
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Desa / Kelurahan</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.villageName} onChange={e => handleDataChange('villageName', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kepala Desa</label>
                          <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} />
                        </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Danramil / Babinsa (Opsional)</label>
                      <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.koramilHead} onChange={e => handleDataChange('koramilHead', e.target.value)} />
                    </div>
                 </div>
              </div>

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat_Izin_Keramaian" price={15000} />
           </div>

        </div>
      </main>

    </div>
  );
}
