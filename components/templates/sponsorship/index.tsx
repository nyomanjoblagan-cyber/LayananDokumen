'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: SponsorshipPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Proposal Sponsorship Event (Sponsorship Pitch Letter)
 */

import React, { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, UserCircle2, 
  Briefcase, Zap, Banknote, Target, ShieldCheck, ImagePlus
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SponsorData {
  city: string;
  date: string;
  docNo: string;
  
  // Organisasi
  orgName: string;
  orgAddress: string;
  contactPerson: string;
  
  // Event
  eventName: string;
  eventDate: string;
  eventLocation: string;
  targetAudience: string;
  
  // Target Sponsor
  targetCompany: string;
  companyAddress: string;
  
  // Penawaran
  packageSelected: string;
  benefitSummary: string;
  investmentValue: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SponsorData = {
  city: 'DENPASAR',
  date: '2026-07-13', 
  docNo: '04/SPONSOR/HIMATIKA/I/2026',
  
  orgName: 'HIMPUNAN MAHASISWA TEKNOLOGI INFORMASI',
  orgAddress: 'Kampus Sudirman, Jl. PB Sudirman, Denpasar, Bali',
  contactPerson: 'BAGUS RAMADHAN (0812-3456-7890)',
  
  eventName: 'TECHFEST 2026: INNOVATION FOR BALI',
  eventDate: '25 - 27 Maret 2026',
  eventLocation: 'Gedung Ksirarnawa, Art Center Denpasar',
  targetAudience: '1.500 Mahasiswa & Pelaku Industri Kreatif',
  
  targetCompany: 'MARKETING MANAGER PT. TELKOM INDONESIA',
  companyAddress: 'Jl. Teuku Umar No. 10, Denpasar',
  
  packageSelected: 'PLATINUM SPONSORSHIP',
  benefitSummary: 'Pemasangan Logo Utama di Backdrop acara, Ad-Lips oleh MC setiap 30 menit, Space Stand 3x3m di area utama, dan publikasi eksklusif di seluruh media sosial resmi event.',
  investmentValue: 'Rp 15.000.000,-'
};

function formatDateDisplay(dateStr: string) {
    if(!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        }
    } catch {}
    return dateStr;
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SponsorshipPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Sponsorship...</div>}>
      <SponsorshipBuilder />
    </Suspense>
  );
}

function SponsorshipBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'event' | 'sponsor' | 'paket'>('event');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<SponsorData>(INITIAL_DATA);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof SponsorData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER / KOP */}
      <div className="flex justify-between items-center border-b-[3px] border-black pb-4 mb-8">
        <div className="flex-1">
            <h1 className="text-xl font-black uppercase tracking-widest text-slate-800">{data.orgName}</h1>
            <p className="text-sm mt-1">{data.orgAddress}</p>
            <p className="text-sm">CP: {data.contactPerson}</p>
        </div>
        <div className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 cursor-pointer overflow-hidden rounded-xl print:border-none print:bg-transparent transition-colors hover:bg-slate-100 shrink-0" onClick={() => fileInputRef.current?.click()}>
            {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain" /> : <div className="text-center print:hidden"><ImagePlus size={24} className="mx-auto mb-1"/><span className="text-[8px] font-bold uppercase tracking-wider block">Add Logo</span></div>}
            <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
        </div>
      </div>

      {/* META SURAT */}
      <div className="mb-8 flex justify-between items-start text-sm break-inside-avoid">
        <div>
            <p className="mb-1">Nomor : {data.docNo}</p>
            <p className="mb-1">Hal : <strong>Penawaran Kerjasama / Sponsorship</strong></p>
            <p className="mb-4">Lamp. : 1 (satu) Berkas Proposal</p>
            
            <p>Kepada Yth,</p>
            <p className="font-bold uppercase">{data.targetCompany}</p>
            <p>{data.companyAddress}</p>
        </div>
        <div className="text-right">
            <p>{data.city}, {formatDateDisplay(data.date)}</p>
        </div>
      </div>

      <div className="mb-6 text-justify">
        <p className="mb-4">Dengan hormat,</p>
        <p className="mb-4">
            Sehubungan dengan akan diadakannya kegiatan <strong>"{data.eventName}"</strong> yang diselenggarakan oleh {data.orgName}, kami bermaksud menawarkan kesempatan emas kepada Perusahaan yang Bapak/Ibu pimpin untuk berpartisipasi sebagai Mitra Sponsor kami.
        </p>
      </div>

      {/* DETAIL EVENT */}
      <div className="mb-6 pl-4 border-l-2 border-slate-400 ml-4">
        <div className="flex mb-1"><div className="w-40 font-bold">Nama Event</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.eventName}</div></div>
        <div className="flex mb-1"><div className="w-40">Waktu Pelaksanaan</div><div className="w-4">:</div><div className="flex-1">{data.eventDate}</div></div>
        <div className="flex mb-1"><div className="w-40">Lokasi Kegiatan</div><div className="w-4">:</div><div className="flex-1">{data.eventLocation}</div></div>
        <div className="flex mb-1"><div className="w-40">Target Peserta</div><div className="w-4">:</div><div className="flex-1">{data.targetAudience}</div></div>
      </div>

      <div className="mb-8 text-justify">
        <p className="mb-4">
            Kami meyakini bahwa keterlibatan Perusahaan Bapak/Ibu dalam kegiatan ini akan memberikan eksposur yang sangat baik dan meningkatkan <i>brand awareness</i> di kalangan peserta serta masyarakat luas.
        </p>
        
        <p className="font-bold mt-6 mb-2 underline">PENAWARAN KAMI:</p>
        <div className="bg-gray-100 p-4 border border-gray-300 print:border-black print:bg-white text-sm">
            <p className="font-bold text-lg mb-2 text-center">{data.packageSelected}</p>
            <p className="text-center font-bold mb-4">Nilai Investasi: {data.investmentValue}</p>
            <p className="font-bold mb-1">Benefit/Kompensasi:</p>
            <p className="whitespace-pre-line leading-relaxed">{data.benefitSummary}</p>
        </div>
        
        <p className="mt-6 mb-4">
            Detail lebih lanjut mengenai konsep acara dan paket sponsorship secara menyeluruh telah kami lampirkan dalam proposal terlampir. Kami sangat terbuka untuk mendiskusikan bentuk kerjasama lain yang dapat disesuaikan (<i>customized</i>) dengan tujuan promosi Perusahaan Bapak/Ibu.
        </p>
        <p>
            Demikian surat penawaran kerjasama ini kami sampaikan. Atas perhatian, waktu, dan partisipasi Bapak/Ibu, kami ucapkan terima kasih yang sebesar-besarnya.
        </p>
      </div>

      {/* TANDA TANGAN */}
      <div className="mt-12">
        <p className="mb-2">Hormat kami,</p>
        <p className="mb-2 font-bold uppercase">Panitia Pelaksana</p>
        <div className="h-24"></div>
        <p className="font-bold underline uppercase">{data.contactPerson.split('(')[0].trim()}</p>
        <p className="text-sm">Ketua Panitia / Sponsorship Division</p>
      </div>
    </Kertas>
  );

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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Proposal Sponsorship</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Penawaran</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Target size={18} className="text-emerald-600" /> Editor Pitching</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('event')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'event' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Organisasi & Event</button>
                <button onClick={() => setActiveTab('sponsor')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'sponsor' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>Tujuan Sponsor</button>
                <button onClick={() => setActiveTab('paket')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'paket' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Penawaran</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'event' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Briefcase size={14} className="text-slate-600"/> Data Event & Organisasi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Organisasi / Panitia</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.orgName} onChange={e => handleChange('orgName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sekretariat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.orgAddress} onChange={e => handleChange('orgAddress', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Contact Person (Nama & No HP)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.contactPerson} onChange={e => handleChange('contactPerson', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Detail Event</h4>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Event</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.eventName} onChange={e => handleChange('eventName', e.target.value)} />
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl / Waktu Event</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.eventDate} onChange={e => handleChange('eventDate', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi / Venue</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.eventLocation} onChange={e => handleChange('eventLocation', e.target.value)} />
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Audiens & Jumlah Estimasi</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.targetAudience} onChange={e => handleChange('targetAudience', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'sponsor' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-blue-600"/> Target Perusahaan / Sponsor
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan / Nama Instansi Yang Dituju</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.targetCompany} onChange={e => handleChange('targetCompany', e.target.value)} placeholder="Contoh: HRD MANAGER PT. MAJU JAYA" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.companyAddress} onChange={e => handleChange('companyAddress', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.docNo} onChange={e => handleChange('docNo', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'paket' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Banknote size={14} className="text-amber-600"/> Paket Penawaran & Benefit
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Paket Sponsorship</label>
                            <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.packageSelected} onChange={e => handleChange('packageSelected', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nilai Investasi (Rp / In-Kind)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.investmentValue} onChange={e => handleChange('investmentValue', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Benefit & Kompensasi yang Didapat</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.benefitSummary} onChange={e => handleChange('benefitSummary', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Sponsorship_${data.orgName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
